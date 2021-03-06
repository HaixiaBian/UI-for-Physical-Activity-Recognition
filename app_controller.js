/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The AppController Class brings together the Block
 * Factory, Block Library, and Block Exporter functionality into a single web
 * app.
 *
 * @author quachtina96 (Tina Quach)
 */
goog.require('Blockly.Generator');

/**
 * Controller for the Blockly Factory
 * @constructor
 */
AppController = function() {
  // Initialize Block Library
  this.blockLibraryName = 'blockLibrary';
  this.blockLibraryController =
      new BlockLibraryController(this.blockLibraryName);
  this.blockLibraryController.populateBlockLibrary();
  this.blockLibraryController.populateBlockLibrary_del();

  // // Construct Workspace Factory Controller.
  // this.workspaceFactoryController = new WorkspaceFactoryController
  //     ('workspacefactory_toolbox', 'toolbox_blocks', 'preview_blocks');
  // 
  // // Initialize Block Exporter
  // this.exporter =
  //     new BlockExporterController(this.blockLibraryController.storage);

  // Map of tab type to the div element for the tab.
  this.tabMap = Object.create(null);
  this.tabMap[AppController.BLOCK_FACTORY] =
      document.getElementById('blockFactory_tab');
  // this.tabMap[AppController.WORKSPACE_FACTORY] =
  //     document.getElementById('workspaceFactory_tab');
  // this.tabMap[AppController.EXPORTER] =
  //     document.getElementById('blocklibraryExporter_tab');

  // Last selected tab.
  this.lastSelectedTab = null;
  // Selected tab.
  this.selectedTab = AppController.BLOCK_FACTORY;
  
  this.toolbox = null;
  //this.hasExactMatch = false;
  this.rootDef = null;

  this.blockmoved_dx = 0;
  this.origin_scrollX = null;

  this.defState = 'activity';
};

// Constant values representing the three tabs in the controller.
AppController.BLOCK_FACTORY = 'BLOCK_FACTORY';
// AppController.WORKSPACE_FACTORY = 'WORKSPACE_FACTORY';
// AppController.EXPORTER = 'EXPORTER';

/**
 * Tied to the 'Import Block Library' button. Imports block library from file to
 * Block Factory. Expects user to upload a single file of JSON mapping each
 * block type to its XML text representation.
 */
AppController.prototype.importBlockLibraryFromFile = function() {
  var self = this;
  var files = document.getElementById('files');
  // If the file list is empty, the user likely canceled in the dialog.
  if (files.files.length > 0) {
    BlocklyDevTools.Analytics.onImport(
        BlocklyDevTools.Analytics.BLOCK_FACTORY_LIBRARY,
        { format: BlocklyDevTools.Analytics.FORMAT_XML });

    // The input tag doesn't have the "multiple" attribute
    // so the user can only choose 1 file.
    var file = files.files[0];
    var fileReader = new FileReader();

    // Create a map of block type to XML text from the file when it has been
    // read.
    fileReader.addEventListener('load', function(event) {
      var fileContents = event.target.result;
      // Create empty object to hold the read block library information.
      var blockXmlTextMap = Object.create(null);
      try {
        // Parse the file to get map of block type to XML text.
        blockXmlTextMap = self.formatBlockLibraryForImport_(fileContents);
      } catch (e) {
        var message = 'Could not load your block library file.\n'
        window.alert(message + '\nFile Name: ' + file.name);
        return;
      }

      // Create a new block library storage object with inputted block library.
      var blockLibStorage = new BlockLibraryStorage(
          self.blockLibraryName, blockXmlTextMap);

      // Update block library controller with the new block library
      // storage.
      self.blockLibraryController.setBlockLibraryStorage(blockLibStorage);
      // Update the block library dropdown.
      self.blockLibraryController.populateBlockLibrary();
      // Update the exporter's block library storage.
      self.exporter.setBlockLibraryStorage(blockLibStorage);
    });
    // Read the file.
    fileReader.readAsText(file);
  }
};

/**
 * Tied to the 'Export Block Library' button. Exports block library to file that
 * contains JSON mapping each block type to its XML text representation.
 */
AppController.prototype.exportBlockLibraryToFile = function() {
  // Get map of block type to XML.
  var blockLib = this.blockLibraryController.getBlockLibrary();
  // Concatenate the XMLs, each separated by a blank line.
  var blockLibText = this.formatBlockLibraryForExport_(blockLib);
  // Get file name.
  var filename = prompt('Enter the file name under which to save your block ' +
      'library.', 'library.xml');
  // Download file if all necessary parameters are provided.
  if (filename) {
    FactoryUtils.createAndDownloadFile(blockLibText, filename, 'xml');
    BlocklyDevTools.Analytics.onExport(
        BlocklyDevTools.Analytics.BLOCK_FACTORY_LIBRARY,
        { format: BlocklyDevTools.Analytics.FORMAT_XML });
  } else {
    var msg = 'Could not export Block Library without file name under which ' +
      'to save library.';
    BlocklyDevTools.Analytics.onWarning(msg);
    alert(msg);
  }
};

/**
 * Converts an object mapping block type to XML to text file for output.
 * @param {!Object} blockXmlMap Object mapping block type to XML.
 * @return {string} XML text containing the block XMLs.
 * @private
 */
AppController.prototype.formatBlockLibraryForExport_ = function(blockXmlMap) {
  // Create DOM for XML.
  var xmlDom = Blockly.utils.xml.createElement('xml');

  // Append each block node to XML DOM.
  for (var blockType in blockXmlMap) {
    var blockXmlDom = Blockly.Xml.textToDom(blockXmlMap[blockType]);
    var blockNode = blockXmlDom.firstElementChild;
    xmlDom.appendChild(blockNode);
  }

  // Return the XML text.
  return Blockly.Xml.domToText(xmlDom);
};

/**
 * Converts imported block library to an object mapping block type to block XML.
 * @param {string} xmlText String representation of an XML with each block as
 *    a child node.
 * @return {!Object} Object mapping block type to XML text.
 * @private
 */
AppController.prototype.formatBlockLibraryForImport_ = function(xmlText) {
  var inputXml = Blockly.Xml.textToDom(xmlText);
  // Convert the live HTMLCollection of child Elements into a static array,
  // since the addition to editorWorkspaceXml below removes it from inputXml.
  var inputChildren = Array.from(inputXml.children);

  // Create empty map. The line below creates a  truly empty object. It doesn't
  // have built-in attributes/functions such as length or toString.
  var blockXmlTextMap = Object.create(null);

  // Populate map.
  for (var i = 0, blockNode; blockNode = inputChildren[i]; i++) {
    // Add outer XML tag to the block for proper injection in to the
    // main workspace.
    // Create DOM for XML.
    var editorWorkspaceXml = Blockly.utils.xml.createElement('xml');
    editorWorkspaceXml.appendChild(blockNode);

    xmlText = Blockly.Xml.domToText(editorWorkspaceXml);
    // All block types should be lowercase.
    var blockType = this.getBlockTypeFromXml_(xmlText).toLowerCase();
    // Some names are invalid so fix them up.
    blockType = FactoryUtils.cleanBlockType(blockType);

    blockXmlTextMap[blockType] = xmlText;
  }

  return blockXmlTextMap;
};

/**
 * Extracts out block type from XML text, the kind that is saved in block
 * library storage.
 * @param {string} xmlText A block's XML text.
 * @return {string} The block type that corresponds to the provided XML text.
 * @private
 */
AppController.prototype.getBlockTypeFromXml_ = function(xmlText) {
  var xmlDom = Blockly.Xml.textToDom(xmlText);
  // Find factory base block.
  var factoryBaseBlockXml = xmlDom.getElementsByTagName('block')[0];
  // Get field elements from factory base.
  var fields = factoryBaseBlockXml.getElementsByTagName('field');
  for (var i = 0; i < fields.length; i++) {
    // The field whose name is 'NAME' holds the block type as its value.
    if (fields[i].getAttribute('name') == 'NAME') {
      return fields[i].childNodes[0].nodeValue;
    }
  }
};
	
/**
 * Add click handlers to each tab to allow switching between the Block Factory,
 * Workspace Factory, and Block Exporter tab.
 * @param {!Object} tabMap Map of tab name to div element that is the tab.
 */
AppController.prototype.addTabHandlers = function(tabMap) {
  var self = this;
  for (var tabName in tabMap) {
    var tab = tabMap[tabName];
    // Use an additional closure to correctly assign the tab callback.
    tab.addEventListener('click', self.makeTabClickHandler_(tabName));
  }
};

/**
 * Set the selected tab.
 * @param {string} tabName AppController.BLOCK_FACTORY,
 *    AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
 * @private
 */
AppController.prototype.setSelected_ = function(tabName) {
  this.lastSelectedTab = this.selectedTab;
  this.selectedTab = tabName;
};

/**
 * Creates the tab click handler specific to the tab specified.
 * @param {string} tabName AppController.BLOCK_FACTORY,
 *    AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
 * @return {!Function} The tab click handler.
 * @private
 */
AppController.prototype.makeTabClickHandler_ = function(tabName) {
  var self = this;
  return function() {
    self.setSelected_(tabName);
    self.onTab();
  };
};

/**
 * Called on each tab click. Hides and shows specific content based on which tab
 * (Block Factory, Workspace Factory, or Exporter) is selected.
 */
AppController.prototype.onTab = function() {
  // Get tab div elements.
  var blockFactoryTab = this.tabMap[AppController.BLOCK_FACTORY];
  var exporterTab = this.tabMap[AppController.EXPORTER];
  var workspaceFactoryTab = this.tabMap[AppController.WORKSPACE_FACTORY];

  // Warn user if they have unsaved changes when leaving Block Factory.
  if (this.lastSelectedTab == AppController.BLOCK_FACTORY &&
      this.selectedTab != AppController.BLOCK_FACTORY) {

    var hasUnsavedChanges =
        !FactoryUtils.savedBlockChanges(this.blockLibraryController);
    if (hasUnsavedChanges) {
      var msg = 'You have unsaved changes in Block Factory.';
      var continueAnyway = confirm(msg);
      BlocklyDevTools.Analytics.onWarning(msg);
      if (!continueAnyway) {
        // If the user doesn't want to switch tabs with unsaved changes,
        // stay on Block Factory Tab.
        this.setSelected_(AppController.BLOCK_FACTORY);
        this.lastSelectedTab = AppController.BLOCK_FACTORY;
        return;
      }
    }
  }

  // Only enable key events in workspace factory if workspace factory tab is
  // selected.
  this.workspaceFactoryController.keyEventsEnabled =
      this.selectedTab == AppController.WORKSPACE_FACTORY;

  // Turn selected tab on and other tabs off.
  this.styleTabs_();

  if (this.selectedTab == AppController.EXPORTER) {
    BlocklyDevTools.Analytics.onNavigateTo('Exporter');

    // Hide other tabs.
    FactoryUtils.hide('workspaceFactoryContent');
    FactoryUtils.hide('blockFactoryContent');
    // Show exporter tab.
    FactoryUtils.show('blockLibraryExporter');

    // Need accurate state in order to know which blocks are used in workspace
    // factory.
    this.workspaceFactoryController.saveStateFromWorkspace();

    // Update exporter's list of the types of blocks used in workspace factory.
    var usedBlockTypes = this.workspaceFactoryController.getAllUsedBlockTypes();
    this.exporter.setUsedBlockTypes(usedBlockTypes);

    // Update exporter's block selector to reflect current block library.
    this.exporter.updateSelector();

    // Update the exporter's preview to reflect any changes made to the blocks.
    this.exporter.updatePreview();

  } else if (this.selectedTab ==  AppController.BLOCK_FACTORY) {
    BlocklyDevTools.Analytics.onNavigateTo('BlockFactory');

    // Hide other tabs.
    FactoryUtils.hide('blockLibraryExporter');
    FactoryUtils.hide('workspaceFactoryContent');
    // Show Block Factory.
    FactoryUtils.show('blockFactoryContent');

  } else if (this.selectedTab == AppController.WORKSPACE_FACTORY) {
    // TODO: differentiate Workspace and Toolbox editor, based on the other tab state.
    BlocklyDevTools.Analytics.onNavigateTo('WorkspaceFactory');

    // Hide other tabs.
    FactoryUtils.hide('blockLibraryExporter');
    FactoryUtils.hide('blockFactoryContent');
    // Show workspace factory container.
    FactoryUtils.show('workspaceFactoryContent');
    // Update block library category.
    var categoryXml = this.exporter.getBlockLibraryCategory();
    var blockTypes = this.blockLibraryController.getStoredBlockTypes();
    this.workspaceFactoryController.setBlockLibCategory(categoryXml,
        blockTypes);
  }

  // Resize to render workspaces' toolboxes correctly for all tabs.
  window.dispatchEvent(new Event('resize'));
};

/**
 * Called on each tab click. Styles the tabs to reflect which tab is selected.
 * @private
 */
AppController.prototype.styleTabs_ = function() {
  for (var tabName in this.tabMap) {
    if (this.selectedTab == tabName) {
      this.tabMap[tabName].classList.replace('taboff', 'tabon');
    } else {
      this.tabMap[tabName].classList.replace('tabon', 'taboff');
    }
  }
};

/**
 * Assign button click handlers for the exporter.
 */
AppController.prototype.assignExporterClickHandlers = function() {
  var self = this;
  document.getElementById('button_setBlocks').addEventListener('click',
      function() {
        self.openModal('dropdownDiv_setBlocks');
      });

  document.getElementById('dropdown_addAllUsed').addEventListener('click',
      function() {
        self.exporter.selectUsedBlocks();
        self.exporter.updatePreview();
        self.closeModal();
      });

  document.getElementById('dropdown_addAllFromLib').addEventListener('click',
      function() {
        self.exporter.selectAllBlocks();
        self.exporter.updatePreview();
        self.closeModal();
      });

  document.getElementById('clearSelectedButton').addEventListener('click',
      function() {
        self.exporter.clearSelectedBlocks();
        self.exporter.updatePreview();
      });

  // Export blocks when the user submits the export settings.
  document.getElementById('exporterSubmitButton').addEventListener('click',
      function() {
        self.exporter.export();
      });
};

/**
 * Assign change listeners for the exporter. These allow for the dynamic update
 * of the exporter preview.
 */
AppController.prototype.assignExporterChangeListeners = function() {
  var self = this;

  var blockDefCheck = document.getElementById('blockDefCheck');
  var genStubCheck = document.getElementById('genStubCheck');

  // Select the block definitions and generator stubs on default.
  blockDefCheck.checked = true;
  genStubCheck.checked = true;

  // Checking the block definitions checkbox displays preview of code to export.
  document.getElementById('blockDefCheck').addEventListener('change',
      function(e) {
        self.ifCheckedEnable(blockDefCheck.checked,
            ['blockDefs', 'blockDefSettings']);
      });

  // Preview updates when user selects different block definition format.
  document.getElementById('exportFormat').addEventListener('change',
      function(e) {
        self.exporter.updatePreview();
      });

  // Checking the generator stub checkbox displays preview of code to export.
  document.getElementById('genStubCheck').addEventListener('change',
      function(e) {
        self.ifCheckedEnable(genStubCheck.checked,
            ['genStubs', 'genStubSettings']);
      });

  // Preview updates when user selects different generator stub language.
  document.getElementById('exportLanguage').addEventListener('change',
      function(e) {
        self.exporter.updatePreview();
      });
};

/**
 * If given checkbox is checked, enable the given elements.  Otherwise, disable.
 * @param {boolean} enabled True if enabled, false otherwise.
 * @param {!Array.<string>} idArray Array of element IDs to enable when
 *    checkbox is checked.
 */
AppController.prototype.ifCheckedEnable = function(enabled, idArray) {
  for (var i = 0, id; id = idArray[i]; i++) {
    var element = document.getElementById(id);
    if (enabled) {
      element.classList.remove('disabled');
    } else {
      element.classList.add('disabled');
    }
    var fields = element.querySelectorAll('input, textarea, select');
    for (var j = 0, field; field = fields[j]; j++) {
      field.disabled = !enabled;
    }
  }
};

/**
 * Assign button click handlers for the block library.
 */
AppController.prototype.assignLibraryClickHandlers = function() {
  var self = this;

  // Button for saving block to library.
  document.getElementById('saveToBlockLibraryButton').addEventListener('click',
      function() {
        self.blockLibraryController.saveToBlockLibrary();
      });

  // Button for removing selected block from library.
  document.getElementById('removeBlockFromLibraryButton').addEventListener(
    'click',
      function() {
        self.blockLibraryController.removeFromBlockLibrary();
      });

  // Button for clearing the block library.
  document.getElementById('clearBlockLibraryButton').addEventListener('click',
      function() {
        self.blockLibraryController.clearBlockLibrary();
      });

  // Hide and show the block library dropdown.
  document.getElementById('button_blockLib').addEventListener('click',
      function() {
        self.openModal('dropdownDiv_blockLib');
      });
  document.getElementById('button_DelblockLib').addEventListener('click',
      function() {
        self.openModal('dropdownDiv_DelblockLib');
      });
	  
};

/**
 * Assign button click handlers for the block factory.
 */
AppController.prototype.assignBlockFactoryClickHandlers = function() {
  var self = this;
  // Assign button event handlers for Block Factory.
  document.getElementById('localSaveButton')
      .addEventListener('click', function() {
        self.exportBlockLibraryToFile();
      });

  // document.getElementById('helpButton').addEventListener('click',
  //     function() {
  //       open('https://developers.google.com/blockly/custom-blocks/block-factory',
  //            'BlockFactoryHelp');
  //     });

  document.getElementById('files').addEventListener('change',
      function() {
        // Warn user.
        var replace = confirm('This imported block library will ' +
            'replace your current block library.');
        if (replace) {
          self.importBlockLibraryFromFile();
          // Clear this so that the change event still fires even if the
          // same file is chosen again. If the user re-imports a file, we
          // want to reload the workspace with its contents.
          this.value = null;
        }
      });

  document.getElementById('createNewBlockButton')
    .addEventListener('click', function() {
      // If there are unsaved changes warn user, check if they'd like to
      // proceed with unsaved changes, and act accordingly.
      var proceedWithUnsavedChanges =
          self.blockLibraryController.warnIfUnsavedChanges();
      if (!proceedWithUnsavedChanges) {
        return;
      }
  
      BlockFactory.showStarterBlock();
      self.blockLibraryController.setNoneSelected();
  
      // Close the Block Library Dropdown.
      self.closeModal();
    });
};


/* parse the PA definition in xml
var xmlGetInput =  function(xml) {
  return xml.getElementsByTagName('value')[0];
}
var xmlToConstrain = function(xml) {
  var ctype = xml.getAttribute('type');
  var val = xmlGetInput(xml);
  if (!val) {
    return null;
  }
  var converter_map = {
    'pa_in_place': function (val) {
      val = val.getElementsByTagName('block')[0].getAttribute('type');
      return [val];
    },
    'pa_at_time': function (val) {
      val = val.getElementsByTagName('block')[0];
      var hour = val.getElementsByTagName();
      
      return [val];
    },
  };
  if (!(ctype in converter_map)) {
    return null;
  }
  var args = converter_map[ctype](xml);
  if (args) {
    return [ctype, args];
  } else {
    return null;
  }
}
var xmlToObj = function(xml) {
  var objmap = {
    'block': function(xml) {
      var obj = new Object();
      obj.statements = [];
      obj.inputs = [];
      obj.fields = {};
    }
  };
}
var xmlToDef = function(xml) {
  var res = {};
  if (xml.getElementsByTagName('statement').length == 0) {
    return res;
  }
  var elem = xml.getElementsByTagName('statement')[0];
  while (elem) {
    var block = elem.children[0];
    console.log(block.getAttribute('type'));
    cons = xmlToConstrain(block);
    if (cons) {
      res[cons[0]] = cons[1];
    }
    elem = block.getElementsByTagName('next')[0];
  }
  console.log(res);
  return res;
}
*/
/* parse the PA definition in block objects
var blockToConstrain = function(block) {
  var ctype = block.type;
  var converter_map = {
    'pa_in_place': function (block) {
      var val = block.getChildren()[0];
      if (!val) {
        return null;
      }
      val = val.type;
      return [val];
    },
    'pa_at_time': function (block) {
      var val = block.getChildren()[0];
      if (!val) {
        return null;
      }
      var hour = val.getFieldValue('hour');
      var minute = val.getFieldValue('minute');
      var ampm = val.getFieldValue('ampm');
      
      return [hour+":"+minute+ampm];
    },
  };
  if (!(ctype in converter_map)) {
    return null;
  }
  var args = converter_map[ctype](block);
  if (args) {
    return [ctype, args];
  } else {
    return null;
  }
}
var blockToDef = function(defblock) {
  var res = {};
  var block = defblock.getChildren()[0];
  while (block) {
    console.log(block.type);
    cons = blockToConstrain(block);
    if (cons) {
      res[cons[0]] = cons[1];
    }
    block = block.getNextBlock();
  }
  console.log(res);
  return res;
}
*/

// Check whether two blocks are same on common categories
var matchBlock = function(src, target) {
  for (k in src) {
    if (!(k in target)) {
      return false;
    }
    var v1 = src[k];
    var v2 = target[k];
    if (JSON.stringify(v1) != JSON.stringify(v2)) {
      return false;
    }
  }
  return true;
};

// Check whether two blocks are exactly the same
var matchExact = function(src, target) {
  for (k in src) {
    if (!(k in target)) {
      return false;
    }
    var v1 = src[k];
    var v2 = target[k];
    if (JSON.stringify(v1) != JSON.stringify(v2)) {
      return false;
    }
  }
  // check whether one pa have additional categories
  for (k in target) {
    if (!(k in src)) {
      return false;
    }
  }
  return true;
};

// get root block of the workspace
AppController.prototype.getRootBlock = function(block) {
  var root_block = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  return root_block;
};

// get the whole PA definition in JSON format
AppController.prototype.getRootDef = function() {
  return this.rootDef;
  var root_block = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  if (root_block) {
    // generate JSON code with generators for javascript
    var block_code = Blockly.JavaScript.blockToCode(root_block);
    try {
      var block_def = JSON.parse(block_code);
    } catch (e) {
      return [];
    }
    root_def = block_def;
  } else {
    root_def = this.rootDef;
  }
  return root_def;
}

var allBP = [
  'left_ankle', 'right_ankle',
  'left_wrist', 'right_wrist',
  'left_thigh', 'right_thigh'
];

// add definitions in def as children of node
function _addChildren(node, def) {
  if (typeof def === 'string') {
    var newnode = {id: def};
    node.children.push(newnode);
  } else if (Array.isArray(def)) {
    if (typeof def[0] === 'string') { // def is a single subtree
      var newnode = _arrayToTree(def); // create a subtree with def[0] as root
      node.children.push(newnode); // add the subtree as the child of node
    } else { // def is several subtrees
      var key_counts = {} // adding number for duplicate keys
      for (var val of def) { // each element is a subtree
        // elements could have duplicate keys
        var newnode = _arrayToTree(val, key_counts); // create a subtree with each val
        node.children.push(newnode);
      }
    }
  } else { // def is a dictionary
    // sort keys then create as subtree with each item in the dictionary
    for (var key of Object.keys(def).sort()) {
      var val = def[key];
      var newnode = {id: key, children: []};
      _addChildren(newnode, val);
      node.children.push(newnode);
    }
  }
}

// array represented tree, numbering keys
function _arrayToTree(arrdef, key_counts) {
  // arrdef[0] become key and arrdef[1:] become children of the new node
  var key = arrdef[0];
  if (key_counts) {
    if (key in key_counts) {
      key_counts[key] += 1;
      key = key + (key_counts[key]).toString();
    } else {
      key_counts[key] = 1;
    }
  }
  var node = {id: key, children: []};
  if (arrdef.length == 2) {
    _addChildren(node, arrdef[1]);
  } else {
    _addChildren(node, arrdef.slice(1));
  }
  // for (var i = 1; i < arrdef.length; i++) {
  //   var newnode = _defToTree(arrdef[i]);
  //   node.children.push(newnode);
  // }
  return node;
}


// create a tree sctruture from the JSON definitions
AppController.prototype.defToTree = function(blockdef) {
  var tree = {id: 'activity', children: []};
  _addChildren(tree, blockdef);
  // console.log(JSON.stringify(tree, null, "  "));
  return tree;
};

// compute the tree edit distance between two activities
AppController.prototype.editDistanceBlock = function(def1, def2) {
  var insert, remove, update;
  insert = remove = function(node) { return 0.01; }; //uplist the mathched nodes
  update = function(nodeA, nodeB) { return nodeA.id !== nodeB.id ? 1 : -1; };
  
  var tree1 = this.defToTree(def1);
  var tree2 = this.defToTree(def2);
  
  var children = function(node) { return node.children; };
  var ted = editDistance.ted(tree1, tree2, children, insert, remove, update);
  // console.log('Tree Edit Distance', ted.distance, ted.pairs(), ted.alignment());
  // console.log('Tree Edit Distance', ted.distance);
  return ted.distance;
};

// display the matched activities in the right panel
AppController.prototype.showMatches = function(matches) {
  BlockFactory.matchesWorkspace.clear();
  
  var cur_y = 10;
  for (var match of matches) {
    var xml = match[1];
    
    xml.children[0].removeAttribute('x');
    // xml.children[0].removeAttribute('y');
    xml.children[0].setAttribute('y', cur_y);
    // matches.appendChild(xml.children[0]);
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.matchesWorkspace);
    block = BlockFactory.matchesWorkspace.getBlockById(block);
    cur_y += block.height + 10;
  }
};

// get blocks in the library that matches the current activity
// this function will be registered as a change event handler to blockly
AppController.prototype.libraryMatch = function(event) {
  if (event.type == Blockly.Events.MOVE ||
      event.type == Blockly.Events.CREATE ||
      event.type == Blockly.Events.CHANGE) {
    if (!event.workspaceId) { // the event doesn't happen in a workspace
      return;
    }
    // get definition of the current activity
    var root_def = Blockly.JavaScript.workspaceToCode(BlockFactory.mainWorkspace);
    console.log(root_def);
    try {
      root_def = JSON.parse(root_def);
    } catch (e) {
      return;
    }
    this.defToTree(root_def);
    BlockFactory.matchesWorkspace.clear();
    if (Object.keys(root_def).length == 0) {
      return;
    }
    
    // compare with blocks in the library
    var allinlib = this.blockLibraryController.storage.blocks;
    //var matches = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
    //matches = Blockly.Xml.textToDom(matches);
    var matches = []
    var cur_y = 10;
    for (var pa_name in allinlib) {
      // console.log(pa_name);
      var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
      // user a hidden workspace to covert the definition
      BlockFactory.hiddenWorkspace.clear();
      var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
      block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
      BlockFactory.hiddenWorkspace.clear();
      try {
        var block_def = JSON.parse(block);
      } catch (e) {
        console.log("activity: " + pa_name + " parse failed");
        continue;
      }
      
      // if (!matchBlock(root_def, block_def)) {
      //   continue;
      // }
      // calculate the edit distance
      var d = this.editDistanceBlock(root_def, block_def);
      matches.push([d, xml]);
    }
    BlockFactory.hiddenWorkspace.clear();
    
    // Blockly.Xml.domToWorkspace(matches, BlockFactory.matchesWorkspace);
    // sort activities based on the edit distance
    matches.sort(function (m1, m2) {
      if (m1[0] > m2[0]) {
        return 1;
      } else if (m1[0] < m2[0]) {
        return -1;
      } else {
        return 0;
      }
    });
    // log edit distances
    for (elem of matches) {
      var d = elem[0];
      var xml = elem[1];
      var act_name = xml.children[0].children[0].textContent;
      console.log('Tree Edit Distance', act_name, d);
    }
    this.showMatches(matches); // display activities

    return;
  }
};

// recursively iterate def of body parts
var forEachBP = function(desc_list, callback) {
  for (var item of desc_list) {
    var key = item[0];
    var val = item[1];
    if (key == 'seq' || key == 'simul') {
      forEachBP(val, callback);
    } else {
      callback(key, val);
    }
  }
};

// recursively find a bodypart in def of body parts
var findBP = function(desc_list, bodypart, callback) {
  for (var item of desc_list) {
    var key = item[0];
    var val = item[1];
    if (key == 'seq' || key == 'simul') {
      if (findBP(val, bodypart, callback)) {
        return true;
      }
    } else {
      if (key == bodypart) {
        callback(val);
        return true;
      }
    }
  }
  return false;
};

// get body part list of the current activity for the plane definition 
AppController.prototype.getBodyPartListCurrActPlane = function(block) {
  var root_def;
  if (!block) {
    root_def = this.rootDef;
  } else {
    // var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    // BlockFactory.hiddenWorkspace.clear();
    // var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    // block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    // BlockFactory.hiddenWorkspace.clear();
    var root_block = this.getRootBlock(block);
    var block_code = Blockly.JavaScript.blockToCode(root_block);
    try {
      var block_def = JSON.parse(block_code);
    } catch (e) {
      return [];
    }
    root_def = block_def;
  }
  
  if (!('body_parts' in root_def)) {
    return [];
  }
  
  //var cur_bp = block.
  var bplist = {};
  var def = root_def['body_parts'];
  console.log(def);
  forEachBP(def, function(bodypart, bp) {
    if (bp[0] == "pattern" && ("manner" in bp[1])) {
      bplist[bodypart] = true;
    }
  });
  
  return Object.keys(bplist);
};

// get body part list except for the current activity for the plane definition 
AppController.prototype.getBodyPartListExceptCurrActPlane = function(cur_block) {
  var bplist = {};
  var allinlib = this.blockLibraryController.storage.blocks;
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  // console.log(cur_block.workspace == BlockFactory.mainWorkspace, cur_block.isInFlyout);
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    forEachBP(block_def['body_parts'], function(bodypart, bp) {
      if (bp[0] == "pattern" && ("manner" in bp[1])) {
        bplist[bodypart] = true;
      }
    });
  }
  return Object.keys(bplist);
};

// get activity list the has a bodypart definition for the plane definition 
AppController.prototype.getActivityListHasBodyPartPlane = function(cur_block, bodypart) {
  var allinlib = this.blockLibraryController.storage.blocks;
  var actlist = [];
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    findBP(block_def['body_parts'], bodypart, function(bp) {    
      if (bp[0] == "pattern" && ("manner" in bp[1])) {
        actlist.push(pa_name);
      }
    });
  }
  return actlist;
};

// get body part list of the current activity for the manner definition 
AppController.prototype.getBodyPartListCurrActManner = function(block) {
  var root_def;
  if (!block) {
    root_def = this.rootDef;
  } else {
    // var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    // BlockFactory.hiddenWorkspace.clear();
    // var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    // block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    // BlockFactory.hiddenWorkspace.clear();
    var root_block = this.getRootBlock(block);
    var block_code = Blockly.JavaScript.blockToCode(root_block);
    try {
      var block_def = JSON.parse(block_code);
    } catch (e) {
      return [];
    }
    root_def = block_def;
  }
  
  if (!('body_parts' in root_def)) {
    return [];
  }
  
  //var cur_bp = block.
  var bplist = {};
  var def = root_def['body_parts'];
  console.log(def);
  forEachBP(def, function(bodypart, bp) {
    if (bp[0] == "pattern" && ("manner" in bp[1])) {
      bplist[bodypart] = true;
    }
  });
  
  return Object.keys(bplist);
};

// get body part list except for the current activity for the manner definition 
AppController.prototype.getBodyPartListExceptCurrActManner = function(cur_block) {
  var bplist = {};
  var allinlib = this.blockLibraryController.storage.blocks;
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  // console.log(cur_block.workspace == BlockFactory.mainWorkspace, cur_block.isInFlyout);
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    forEachBP(block_def['body_parts'], function(bodypart, bp) {
      if (bp[0] == "pattern" && ("manner" in bp[1])) {
        bplist[bodypart] = true;
      }
    });
  }
  return Object.keys(bplist);
};

// get activity list the has a bodypart definition for the manner definition 
AppController.prototype.getActivityListHasBodyPartManner = function(cur_block, bodypart) {
  var allinlib = this.blockLibraryController.storage.blocks;
  var actlist = [];
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    findBP(block_def['body_parts'], bodypart, function(bp) {    
      if (bp[0] == "pattern" && ("manner" in bp[1])) {
        actlist.push(pa_name);
      }
    });
  }
  return actlist;
};

// get body part list of the current activity for the rate definition 
AppController.prototype.getBodyPartListCurrActRate = function(block) {
  var root_def;
  if (!block) {
    root_def = this.rootDef;
  } else {
    // var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    // BlockFactory.hiddenWorkspace.clear();
    // var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    // block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    // BlockFactory.hiddenWorkspace.clear();
    var root_block = this.getRootBlock(block);
    var block_code = Blockly.JavaScript.blockToCode(root_block);
    try {
      var block_def = JSON.parse(block_code);
    } catch (e) {
      return [];
    }
    root_def = block_def;
  }
  
  if (!('body_parts' in root_def)) {
    return [];
  }
  
  var bplist = {};
  var def = root_def['body_parts'];
  forEachBP(def, function(bodypart, bp) {
    if (bp[0] == "pattern" || bp[0] == 'occa_moving') {
      bplist[bodypart] = true;
    }
  });
  
  return Object.keys(bplist);
};

// get body part list except for the current activity for the rate definition 
AppController.prototype.getBodyPartListExceptCurrActRate = function(cur_block) {
  var bplist = {};
  var allinlib = this.blockLibraryController.storage.blocks;
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  // console.log(cur_block.workspace == BlockFactory.mainWorkspace, cur_block.isInFlyout);
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    var def = block_def['body_parts'];
    forEachBP(def, function(bodypart, bp) {
      if (bp[0] == "pattern" || bp[0] == 'occa_moving') {
        bplist[bodypart] = true;
      }
    });
  }
  return Object.keys(bplist);
};

// get activity list the has a bodypart definition for the rate definition 
AppController.prototype.getActivityListHasBodyPartRate = function(cur_block, bodypart) {
  var allinlib = this.blockLibraryController.storage.blocks;
  var actlist = [];
  var cur_act = this.getRootBlock(cur_block).getFieldValue('NAME');
  for (var pa_name in allinlib) {
    if (pa_name == cur_act) {
      continue;
    }
    var xml = this.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      console.log("activity: " + pa_name + " parse failed");
      continue;
    }

    if (!('body_parts' in block_def)) {
      continue;
    }
    findBP(block_def['body_parts'], bodypart, function(bp) {    
      if (bp[0] == "pattern" || bp[0] == 'occa_moving') {
        actlist.push(pa_name);
      }
    });
  }
  return actlist;
};

// check whether all inputs are filled
var allInputsFilled = function(block) {
  for (var input of block.inputList) {
    if (input.type == 5) {
      continue;
    }
    if (!input.connection || !input.connection.isConnected() || input.connection.targetBlock().isShadow()) {
      return false;
    }
  }
  return true;
};
// check wheter at least on input is filled
var atLeastOneInputFilled = function(block) {
  for (var input of block.inputList) {
    if (input.type == 5) {
      continue;
    }
    if (input.connection && input.connection.isConnected() && !input.connection.targetBlock().isShadow()) {
      return true;
    }
  }
  return false;
};
// requirement for each block
var inputCheck = {
  'activity': allInputsFilled,
  'pa_in_place': allInputsFilled,
  'pa_at_time': allInputsFilled,
  'pa_on_day': allInputsFilled,
  'pa_last_for': allInputsFilled,
  'pa_br': allInputsFilled,
  'pa_object': allInputsFilled,
  'body_parts': allInputsFilled,
  'mov_sequential': allInputsFilled,
  'mov_simultaneous': allInputsFilled,
  'order_in_time': allInputsFilled,
  // 'mov_pattern_value_input': atLeastOneInputFilled,
};
// check block inputs based on requirement associated with the block type
var checkBlockInput = function(block) {
  if (block.isShadow()) {
    return true;
  }
  if (block.type in inputCheck) {
    if (!inputCheck[block.type](block)) {
      return false;
    }
  }
  // else {
  //   if (!allInputsFilled(block)) {
  //     return false;
  //   }
  // }
  return true;
};
// check inputs for all blocks
AppController.prototype.checkInputs = function(block) {
  if (!checkBlockInput(block)) {
    return false;
  }
  for (var child of block.getChildren()) {
    if (!this.checkInputs(child)) {
      return false;
    }
  }
  return true;
};

AppController.prototype.setActivityDef = function(xml) {
  BlockFactory.hiddenWorkspace.clear();
  var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
  block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
  BlockFactory.hiddenWorkspace.clear();
  try {
    var block_def = JSON.parse(block);
  } catch (e) {
    return [];
  }
  this.rootDef = block_def;
};


//AppController.prototype.updateSaveButtons = 

// update the toolbox control
AppController.prototype.updateToolbox = function() {
  BlockFactory.mainWorkspace.updateToolbox(this.toolbox);
};

// enable a block in the toolbox
AppController.prototype.enableBlock_ = function(blockType) {
  var blocks = this.toolbox.getElementsByTagName('block');
  for (var block of blocks) {
    if (block.getAttribute('type') == blockType) {
      block.removeAttribute('disabled');
      break;
    }
  }
};

// disable a block in the toolbox
AppController.prototype.disableBlock_ = function(blockType) {
  var blocks = this.toolbox.getElementsByTagName('block');
  for (var block of blocks) {
    if (block.getAttribute('type') == blockType) {
      block.setAttribute('disabled', true);
      break;
    }
  }
};

// enable all blocks in the toolbox
AppController.prototype.enableAllBlocks_ = function() {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    for (var block of category.children) {
      block.removeAttribute('disabled');
    }
  }
};

// enable all blocks in a category
AppController.prototype.enableAllBlocksInCategory_ = function(categoryName) {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (category.getAttribute('name') == categoryName) {
      for (var block of category.children) {
        block.removeAttribute('disabled');
      }
      break;
    }
  }
};

// disable all blocks in a category
AppController.prototype.disableAllBlocksInCategory_ = function(categoryName) {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (category.getAttribute('name') == categoryName) {
      for (var block of category.children) {
        block.setAttribute('disabled', true);
      }
      break;
    }
  }
};

// enable a category
AppController.prototype.enableCategory_ = function(categoryName) {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (category.getAttribute('name') == categoryName) {
      category.removeAttribute('disabled');
      break;
    }
  }
};

// enable a category
AppController.prototype.disableCategory_ = function(categoryName) {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (category.getAttribute('name') == categoryName) {
      category.setAttribute('disabled', true);
      break;
    }
  }
};

// enable all categories
AppController.prototype.enableAllCategories_ = function() {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    category.removeAttribute('disabled');
  }
};

// disable all categories
AppController.prototype.disableAllCategories_ = function() {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    category.setAttribute('disabled', true);
  }
};

// highlight enabled categories in the toolbox
AppController.prototype.highlightEnabledCategories = function() {
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (!category.getAttribute('disabled')) {
      var node = this.toolbox_.tree_.findNodeByContent(category.getAttribute('name'));
      node.element_.backgroundColor = 'white';
    }
    category.removeAttribute('disabled');
  }
};

// check whether the current definition is valid to save and update the save button accordingly
AppController.prototype.checkValidDefinition = function(root_def) {
  var self = this;
  
  var rootBlock = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  //if (!rootBlock.allInputsFilled()) {
  if (!this.checkInputs(rootBlock)) {
      //true means the definition is same in library so disable the button
      self.blockLibraryController.updateButtons(true);
      return;
  }
  
  var allinlib = self.blockLibraryController.storage.blocks;
  for (var pa_name in allinlib) {
    // console.log(pa_name);
    var xml = self.blockLibraryController.storage.getBlockXml(pa_name);
    BlockFactory.hiddenWorkspace.clear();
    var block = Blockly.Xml.domToWorkspace(xml, BlockFactory.hiddenWorkspace);
    block = Blockly.JavaScript.workspaceToCode(BlockFactory.hiddenWorkspace);
    // console.log(block);
    BlockFactory.hiddenWorkspace.clear();
    try {
      var block_def = JSON.parse(block);
    } catch (e) {
      continue;
    }
    
    if (matchExact(root_def, block_def)) {
      self.blockLibraryController.updateButtons(true);
      break;
    }
  }
};

// convert the tree to a string representation
var treeify = function(tree, indent) {
  if (!tree) {
    return '';
  }
  if (!indent) {
    var ret = tree['id'] + '\n';
  } else {
    var ret = indent.slice(0,-1) + '|-' + tree['id'] + '\n';
  }
  if (!tree.children) {
    return ret;
  }
  var n = tree.children.length;
  if (!n) {
    return ret;
  }
  for (var i = 0; i < n-1; i++) {
    ret += treeify(tree.children[i], indent+' |');
  }
  ret += treeify(tree.children[n-1], indent+'  ');
  return ret;
};

// reset the toolbox state
AppController.prototype.resetDefState = function(block) {
  this.enableAllBlocks_();
  this.enableAllCategories_();
  this.updateToolbox();
  this.defState = 'activity';
};

// handle the new added block based on the current state and
// change the current state of the toolbox
AppController.prototype.handleDefState = function(block) {
  var self = this;
  var toolbox = BlockFactory.mainWorkspace.toolbox_;
  var stateHandlers = {
    null: function(block) {
      if (block.type == 'activity') {
        self.defState = 'activity';
        self.enableAllCategories_();
      }
    },
    activity: function(block) {
      // place
      if (block.type == 'pa_in_place') {
        var cur_category = 'My places';
        //self.disableAllBlocksInCategory_(cur_category);
        self.disableBlock_('pa_in_place');
        self.disableBlock_('location_change');
        self.disableBlock_('loc_ch_yes');
        self.disableBlock_('loc_ch_no');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'location_change') {
        var cur_category = 'My places';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('loc_ch_yes');
        self.enableBlock_('loc_ch_no');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'pa_at_time') {
        var cur_category = 'Time of the day';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('time');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.enableCategory_('Combinations');
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'pa_on_day') {
        var cur_category = 'Day of the week';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('day');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'pa_last_for') {
        var cur_category = 'Duration';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('duration');
        self.enableBlock_('duration_sim');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.enableCategory_('Comparisons');
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'pa_br') {
        var cur_category = 'Breathing rate';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('br_normal');
        //self.enableBlock_('br_act');
        self.updateToolbox();
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.enableCategory_('Comparisons');
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'pa_object') {
        var cur_category = 'External';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('ex_object_iron');
        self.enableBlock_('ex_object_bike');
        self.enableBlock_('ex_object_fryingpan');
        self.enableBlock_('ex_object_stove');
        self.enableBlock_('ex_object_pasta_container');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'close_to') {
        var cur_category = 'External';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('ex_person_child');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'body_parts') {
        var cur_category = 'Body parts';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('left_ankle');
        self.enableBlock_('right_ankle');
        self.enableBlock_('left_wrist');
        self.enableBlock_('right_wrist');
        self.enableBlock_('left_thigh');
        self.enableBlock_('right_thigh');
        self.enableBlock_('torso');
        self.enableBlock_('mov_sequential');
        self.enableBlock_('mov_simultaneous');
        self.enableBlock_('mov_sequential_with_option');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      } else if (block.type == 'left_ankle' ||
                 block.type == 'right_ankle' ||
                 block.type == 'left_wrist' ||
                 block.type == 'right_wrist' ||
                 block.type == 'left_thigh' ||
                 block.type == 'right_thigh' ||
                 block.type == 'torso') {
        this.body_parts(block);
      } else if (block.type == 'order_in_time') {
        var cur_category = 'Order in time';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('temporal_order_before_leftoutput');
        self.enableBlock_('temporal_order_after_leftoutput');
        self.enableBlock_('temporal_order_meets_leftoutput');
        self.enableBlock_('temporal_order_overlaps_leftoutput');
        self.enableBlock_('temporal_order_starts_leftoutput');
        self.enableBlock_('temporal_order_during_leftoutput');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      }
    },
    pa_in_place: function(block) {
      if (block.type == 'home' ||
          block.type == 'school' ||
          block.type == 'office' ||
          block.type == 'work' ||
          block.type == 'room') {
        self.enableAllBlocksInCategory_('My places');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    location_change: function(block) {
      if (block.type == 'loc_ch_yes' ||
          block.type == 'loc_ch_no') {
        self.enableAllBlocksInCategory_('My places');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    pa_at_time: function(block) {
      if (block.type == 'time') {
        self.enableAllBlocksInCategory_('Time of the day');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'op_and' ||
                 block.type == 'op_or') {
        var cur_category = 'Combinations';
        self.disableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory('Time of the day');
        self.defState = 'time_op';
      } else if (block.type == 'op_not') {
        var cur_category = 'Combinations';
        self.disableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory('Time of the day');
        self.defState = 'time_op';
      }
    },
    time_op: function(block) {
      if (block.type == 'time') {
        toolbox.selectCategory('Time of the day');
        self.defState = 'time_op2';
      }
    },
    time_op2: function(block) {
      if (block.type == 'time') {
        self.enableAllBlocksInCategory_('Time of the day');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    pa_on_day: function(block) {
      if (block.type == 'day') {
        self.enableAllBlocksInCategory_('Day of the week');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    pa_last_for: function(block) {
      if (block.type == 'duration') {
        self.enableAllBlocksInCategory_('Duration');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'duration_sim') {
        var cur_category = 'Duration';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('duration_act');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = block.type;
      }
    },
    duration_sim: function(block) {
      if (block.type == 'duration_act') {
        self.enableAllBlocksInCategory_('Duration');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    pa_br: function(block) {
      if (block.type == 'br_normal') {
        self.enableAllBlocksInCategory_('Breathing rate');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'ass_similar_to' ||
                 block.type == 'ass_different_from' ||
                 block.type == 'ass_greater_than' ||
                 block.type == 'ass_lower_than') {
        var cur_category = 'Activities as blocks';
        //self.disableAllBlocksInCategory_(cur_category);
        //self.enableBlock_('duration_act');
        //self.updateToolbox();
        self.disableAllCategories_();
        self.enableCategory_('Breathing rate');
        self.enableBlock_('br_normal');
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'br_comp';
      }
    },
    br_comp: function(block) {
      if (block.type == 'pa_activity_defined' ||
          block.type == 'br_normal') {
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    pa_object: function(block) {
      if (block.type == 'ex_object_iron' ||
          block.type == 'ex_object_bike' ||
          block.type == 'ex_object_fryingpan' ||
          block.type == 'ex_object_stove' ||
          block.type == 'ex_object_pasta_container') {
        self.enableAllBlocksInCategory_('External');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    close_to: function(block) {
      if (block.type == 'ex_person_child') {
        self.enableAllBlocksInCategory_('External');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      }
    },
    body_parts: function(block) {
      if (block.type == 'left_ankle' ||
          block.type == 'right_ankle' ||
          block.type == 'left_wrist' ||
          block.type == 'right_wrist' ||
          block.type == 'left_thigh' ||
          block.type == 'right_thigh' ||
          block.type == 'torso') {
        var cur_category = 'Body parts';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('pos_still');
        self.enableBlock_('occa_moving');
        self.enableBlock_('mov_pattern_value_input');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'bp_movement';
      } else if (block.type == 'mov_sequential'||
                 block.type == 'mov_simultaneous'||
                 block.type == 'mov_sequential_with_option') {
        toolbox.selectCategory('Body parts');
      }
    },
    bp_movement: function(block) {
      if (block.type == 'pos_still' ||
          block.type == 'occa_moving') {
        self.enableAllBlocksInCategory_('Body parts');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'mov_pattern_value_input') {
        var cur_category = 'Body parts';
        self.disableAllBlocksInCategory_(cur_category);
        self.enableBlock_('mov_motion_type');
        self.enableBlock_('mov_manner_bodypart_left_output');
        self.enableBlock_('mov_manner_activity_left_output');
        self.enableBlock_('mov_manner_bodypart_activity_left_output');
        self.enableBlock_('mov_rate_bodypart_left_output');
        self.enableBlock_('mov_rate_activity_left_output');
        self.enableBlock_('mov_rate_bodypart_activity_left_output');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'mov_pattern';
      }
    },
    mov_pattern: function(block) {
      if (block.type == 'mov_motion_type') {
        var cur_category = 'Body parts';
        self.disableBlock_('mov_motion_type');
        self.disableBlock_('mov_manner_bodypart_left_output');
        self.disableBlock_('mov_manner_activity_left_output');
        self.disableBlock_('mov_manner_bodypart_activity_left_output');
        self.enableBlock_('mov_motion_plane');
        self.enableBlock_('mov_motion_plane_sim_bodypart');
        self.enableBlock_('mov_motion_plane_sim_activity');
        self.enableBlock_('mov_motion_plane_sim_bodypart_activity');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'mov_pattern_t';
      } else if (block.type == 'mov_manner_bodypart_left_output' ||
                 block.type == 'mov_manner_activity_left_output' ||
                 block.type == 'mov_manner_bodypart_activity_left_output') {
        self.enableAllBlocksInCategory_('Body parts');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'mov_rate_bodypart_left_output' ||
                 block.type == 'mov_rate_activity_left_output' ||
                 block.type == 'mov_rate_bodypart_activity_left_output') {
        var cur_category = 'Body parts';
        self.disableBlock_('mov_rate_bodypart_left_output');
        self.disableBlock_('mov_rate_activity_left_output');
        self.disableBlock_('mov_rate_bodypart_activity_left_output');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
      }
    },
    mov_pattern_t: function(block) {
      if (block.type == 'mov_motion_plane' ||
          block.type == 'mov_motion_plane_sim_bodypart' ||
          block.type == 'mov_motion_plane_sim_activity' ||
          block.type == 'mov_motion_plane_sim_bodypart_activity') {
        self.enableAllBlocksInCategory_('Body parts');
        self.enableAllCategories_();
        self.updateToolbox();
        self.defState = 'activity';
      } else if (block.type == 'mov_rate_bodypart_left_output' ||
                 block.type == 'mov_rate_activity_left_output' ||
                 block.type == 'mov_rate_bodypart_activity_left_output') {
        var cur_category = 'Body parts';
        self.disableBlock_('mov_rate_bodypart_left_output');
        self.disableBlock_('mov_rate_activity_left_output');
        self.disableBlock_('mov_rate_bodypart_activity_left_output');
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
      }
    },
    order_in_time: function(block) {
      if (block.type == 'temporal_order_before_leftoutput' ||
          block.type == 'temporal_order_after_leftoutput' ||
          block.type == 'temporal_order_meets_leftoutput' ||
          block.type == 'temporal_order_overlaps_leftoutput' ||
          block.type == 'temporal_order_starts_leftoutput' ||
          block.type == 'temporal_order_during_leftoutput') {
        self.enableAllBlocksInCategory_('Order in time');
        var cur_category = 'Activities as blocks';
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'order_in_time_rel';
      }
    },
    order_in_time_rel: function(block) {
      if (block.type == 'pa_activity_defined') {
        var cur_category = 'Activities as blocks';
        self.disableAllCategories_();
        self.enableCategory_(cur_category);
        self.updateToolbox();
        toolbox.selectCategory(cur_category);
        self.defState = 'order_in_time_act1';
      }
    },
    order_in_time_act1: function(block) {
      if (block.type == 'pa_activity_defined') {
        var cur_category = 'Activities as blocks';
        self.defState = 'activity';
      }
    }
  };
  if (this.defState in stateHandlers) {
    console.log('handle block', block.type);
    stateHandlers[this.defState](block);
    console.log('state', this.defState);
  } else {
  }
};

/* enable all blocks that are valid to add to the current definition
AppController.prototype.enableEligibleBlocks = function() {
  //var uniqueBlocks = ;
  var w = BlockFactory.mainWorkspace;
  var blocks = FactoryUtils.getRootBlock(w).getDescendants();
  for (var block of blocks) {
    // if (block.type in )
  }
  var categories = this.toolbox.getElementsByTagName('category');
  for (var category of categories) {
    if (category.getAttribute('name') == categoryName) {
      for (var block of category.children) {
        block.removeAttribute('disabled');
      }
      break;
    }
  }

};
*/


/**
 * Add event listeners for the block factory.
 */
AppController.prototype.addBlockFactoryEventListeners = function() {
  // // Update code on changes to block being edited.
  // BlockFactory.mainWorkspace.addChangeListener(BlockFactory.updateLanguage);

  // Disable blocks not attached to the activity block.
  BlockFactory.mainWorkspace.addChangeListener(Blockly.Events.disableOrphans);

  // Update the buttons on the screen based on whether
  // changes have been saved.
  var self = this;
  // BlockFactory.mainWorkspace.addChangeListener(function() {
  //   self.blockLibraryController.updateButtons(FactoryUtils.savedBlockChanges(
  //       self.blockLibraryController));
  //   });
  BlockFactory.mainWorkspace.addChangeListener(function(event) {
    // move workspace when open categories
    if (event.type != Blockly.Events.UI) {
      return;
    }
    if (event.element != 'category' && event.element != 'selected') {
      return;
    }

    var w = BlockFactory.mainWorkspace;
    
    if (event.element == 'selected') {
      if (!event.oldValue || w.getBlockById(event.oldValue)) {
        return;
      }
    }
    
    var root_block = FactoryUtils.getRootBlock(w);
    var oldx = root_block.getRelativeToSurfaceXY().x;
    if (event.element == 'category' && event.newValue) { // expanded category
      // get flyout width and current position of root block
      var fl = w.getFlyout();
      var flw = fl.getWidth();

      // move definition blocks, record move dis
      var dx = - w.scrollX + flw;
      if (dx < 0 && self.origin_scrollX == null) {
        return;
      }

      if (self.origin_scrollX == null) {
        self.origin_scrollX = w.scrollX;
      } else {
        if (self.origin_scrollX > w.scrollX + dx) {
          w.scroll(self.origin_scrollX, w.scrollY);
          self.blockmoved_dx = 0;
          self.origin_scrollX = null;
          return;
        }
      }
      //root_block.moveBy(dx, 0);
      w.scroll(w.scrollX + dx, w.scrollY);
      self.blockmoved_dx += dx;

    } else {
      var dx = self.blockmoved_dx;
      
      
      if (event.newValue) {
        var block = w.getBlockById(event.newValue);
        if (block) {
          console.log('old pos', block.getRelativeToSurfaceXY());
          console.log('moveby', dx)
          //block.moveBy(dx, 0);
          console.log('new pos', block.getRelativeToSurfaceXY());
        }
      }
      
      //if (dx) {
        //root_block.moveBy(-dx, 0);
      console.log('old scroll', w.scrollX);
      console.log('scrollto', self.origin_scrollX);
      w.scroll(self.origin_scrollX, w.scrollY);
      console.log('new scroll', w.scrollX);
      //}
      self.blockmoved_dx = 0;
      self.origin_scrollX = null;
      
      //self.highlightEnabledCategories();
      //w.toolbox_.enableAll();
    }

  });

  BlockFactory.mainWorkspace.addChangeListener(function(event) {
    // handle toolbox state when adding or removing a block
    if (event.type != Blockly.Events.MOVE &&
        event.type != Blockly.Events.CREATE &&
        event.type != Blockly.Events.DELETE &&
        event.type != Blockly.Events.CHANGE) {
      return;
    }
    var block = BlockFactory.mainWorkspace.getBlockById(event.blockId);
    //console.log(block);
    if ((event.type == Blockly.Events.CREATE || event.type == Blockly.Events.MOVE) &&
        event.newParentId) {
      self.handleDefState(block);
    }
    
    if ((event.type == Blockly.Events.MOVE || event.type == Blockly.Events.DELETE) &&
        !event.newParentId) {
      self.resetDefState();
    }
  });

  BlockFactory.mainWorkspace.addChangeListener(function(event) {
    if (event.type != Blockly.Events.MOVE &&
        event.type != Blockly.Events.CREATE &&
        event.type != Blockly.Events.DELETE &&
        event.type != Blockly.Events.CHANGE) {
      return;
    }
    if (!event.workspaceId) {
      return;
    }
    
    self.blockLibraryController.updateButtons(
        FactoryUtils.savedBlockChanges(self.blockLibraryController));
      
    var root_def = Blockly.JavaScript.workspaceToCode(BlockFactory.mainWorkspace);
    // console.log(root_def);
    try {
      root_def = JSON.parse(root_def);
    } catch (e) {
      return;
    }
    
    self.rootDef = root_def;
    
    self.checkValidDefinition(root_def);
    
    var tree = self.defToTree(root_def);
    console.log(treeify(tree, ''));
  
    var elems = Array.prototype.slice.call(toolbox.getElementsByTagName('block'), 0);
    var mov_manner_bodypart = elems.find(function (el) {
      return el.getAttribute('type') == 'mov_manner_bodypart';
    });
    if (mov_manner_bodypart) {
      if (!('body_parts' in root_def) || Object.keys(root_def['body_parts']).length <= 1) {
        mov_manner_bodypart.setAttribute('disabled', true);
      } else {
        mov_manner_bodypart.setAttribute('disabled', false);
      }
      self.updateToolbox();
    }
      
    function updateBlocks(blocks) {
      for (var i = 0, block; block = blocks[i]; i++) {
        block.customUpdate && block.customUpdate();
      }
    }
    updateBlocks(BlockFactory.mainWorkspace.getAllBlocks(false), true);
    //updateBlocks(BlockFactory.mainWorkspace.flyout_.workspace_.getAllBlocks(false));
  });
  
  BlockFactory.mainWorkspace.addChangeListener(function(event) {
    self.libraryMatch(event);
  });

  // document.getElementById('direction')
  //     .addEventListener('change', BlockFactory.updatePreview);
  // document.getElementById('languageTA')
  //     .addEventListener('change', BlockFactory.manualEdit);
  // document.getElementById('languageTA')
  //     .addEventListener('keyup', BlockFactory.manualEdit);
  // document.getElementById('format')
  //     .addEventListener('change', BlockFactory.formatChange);
  // document.getElementById('language')
  //     .addEventListener('change', BlockFactory.updatePreview);
};

/**
 * Handle Blockly Storage with App Engine.
 */
AppController.prototype.initializeBlocklyStorage = function() {
  BlocklyStorage.HTTPREQUEST_ERROR =
      'There was a problem with the request.\n';
  BlocklyStorage.LINK_ALERT =
      'Share your blocks with this link:\n\n%1';
  BlocklyStorage.HASH_ERROR =
      'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
  BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
      'Perhaps it was created with a different version of Blockly?';
  var linkButton = document.getElementById('linkButton');
  linkButton.style.display = 'inline-block';
  linkButton.addEventListener('click',
      function() {
          BlocklyStorage.link(BlockFactory.mainWorkspace);});
  BlockFactory.disableEnableLink();
};

AppController.prototype.clearBlocklyStorage = function() {
};

/**
 * Handle resizing of elements.
 */
AppController.prototype.onresize = function(event) {
  // if (this.selectedTab == AppController.BLOCK_FACTORY) {
    // Handle resizing of Block Factory elements.
    var expandList = [
      //document.getElementById('blocklyPreviewContainer'),
      document.getElementById('blockly'),
      document.getElementById('blocklyMatches'),
      //document.getElementById('blocklyMask'),
      //document.getElementById('preview'),
      //document.getElementById('languagePre'),
      //document.getElementById('languageTA'),
      //document.getElementById('generatorPre'),
    ];
    for (var i = 0, expand; expand = expandList[i]; i++) {
      expand.style.width = (expand.parentNode.offsetWidth - 2) + 'px';
      expand.style.height = (expand.parentNode.offsetHeight - 2) + 'px';
    }
  // } else if (this.selectedTab == AppController.EXPORTER) {
  //   // Handle resize of Exporter block options.
  //   this.exporter.view.centerPreviewBlocks();
  // }
};

/**
 * Handler for the window's 'beforeunload' event. When a user has unsaved
 * changes and refreshes or leaves the page, confirm that they want to do so
 * before actually refreshing.
 * @param {!Event} e beforeunload event.
 */
AppController.prototype.confirmLeavePage = function(e) {
  BlocklyDevTools.Analytics.sendQueued();
  if ((!BlockFactory.isStarterBlock() &&
      !FactoryUtils.savedBlockChanges(blocklyFactory.blockLibraryController)) ||
      blocklyFactory.workspaceFactoryController.hasUnsavedChanges()) {

    var confirmationMessage = 'You will lose any unsaved changes. ' +
        'Are you sure you want to exit this page?';
    BlocklyDevTools.Analytics.onWarning(confirmationMessage);
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
};

/**
 * Show a modal element, usually a dropdown list.
 * @param {string} id ID of element to show.
 */
AppController.prototype.openModal = function(id) {
  Blockly.hideChaff();
  this.modalName_ = id;
  document.getElementById(id).style.display = 'block';
  document.getElementById('modalShadow').style.display = 'block';
};

/**
 * Hide a previously shown modal element.
 */
AppController.prototype.closeModal = function() {
  var id = this.modalName_;
  if (!id) {
    return;
  }
  document.getElementById(id).style.display = 'none';
  document.getElementById('modalShadow').style.display = 'none';
  this.modalName_ = null;
};

/**
 * Name of currently open modal.
 * @type {string?}
 * @private
 */
AppController.prototype.modalName_ = null;

/**
 * Initialize Blockly and layout.  Called on page load.
 */
AppController.prototype.init = function() {
  var self = this;
  // Handle Blockly Storage with App Engine.
  if ('BlocklyStorage' in window) {
    this.initializeBlocklyStorage();
  }

  // Assign click handlers.
  // this.assignExporterClickHandlers();
  this.assignLibraryClickHandlers();
  this.assignBlockFactoryClickHandlers();
  // Hide and show the block library dropdown.
  document.getElementById('modalShadow').addEventListener('click',
      function() {
        self.closeModal();
      });

  this.onresize();
  window.addEventListener('resize', function() {
    self.onresize();
  });

  // Inject Block Factory Main Workspace.
  var toolbox = document.getElementById('toolbox');
  this.toolbox = toolbox;
  BlockFactory.mainWorkspace = Blockly.inject('blockly',
      {collapse: false,
       toolbox: toolbox,
       comments: false,
       disable: false,
       media: 'blockly/media/'});
  BlockFactory.matchesWorkspace = Blockly.inject('blocklyMatches',
      {collapse: false,
       comments: false,
       disable: false,
       scrollbars: true,
       readOnly: true,
       media: 'blockly/media/'});
  BlockFactory.hiddenWorkspace = Blockly.inject('hiddenWorkspace',
      {collapse: false,
       toolbox: false,
       comments: false,
       disable: false,
       media: 'blockly/media/'});

  // // Add tab handlers for switching between Block Factory and Block Exporter.
  // this.addTabHandlers(this.tabMap);

  // // Assign exporter change listeners.
  // this.assignExporterChangeListeners();

  // Create the root block on Block Factory main workspace.
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1),
                               BlockFactory.mainWorkspace);
  } else {
    BlockFactory.showStarterBlock();
  }
  BlockFactory.mainWorkspace.clearUndo();

  // Add Block Factory event listeners.
  this.addBlockFactoryEventListeners();
  
  BlockFactory.mainWorkspace.registerToolboxCategoryCallback(
		'DEFINED_ACTIVITIES', activitiesFlyoutCallback);

  // // Workspace Factory init.
  // WorkspaceFactoryInit.initWorkspaceFactory(this.workspaceFactoryController);
};
