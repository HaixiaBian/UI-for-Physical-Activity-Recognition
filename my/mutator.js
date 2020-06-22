
'use strict';

goog.require('Blockly.Mutator');

function MyMutator() {
  Blockly.Mutator.call(this, []);
}

MyMutator.prototype = Object.create(Blockly.Mutator.prototype);

Object.defineProperty(MyMutator.prototype, 'constructor', { 
    value: MyMutator, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });
    
MyMutator.prototype.createEditor_ = function() {
  Blockly.Mutator.prototype.createEditor_.call(this);
  this.getWorkspace().options['readOnly'] = true;
  return this.svgDialog_;
};

MyMutator.prototype.resizeBubble_ = function() {
  var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
  var workspaceSize = this.workspace_.getCanvas().getBBox();
  var width;
  if (this.block_.RTL) {
    width = -workspaceSize.x;
  } else {
    width = workspaceSize.width + workspaceSize.x;
  }
  var height = workspaceSize.height + doubleBorderWidth * 3;
  var flyout = this.workspace_.getFlyout();
  if (flyout) {
    var flyoutMetrics = flyout.getMetrics_();
    if (flyoutMetrics) {
	  height = Math.max(height, flyoutMetrics.contentHeight + 20);
    }
  }
  width += doubleBorderWidth * 3;
  // Only resize if the size difference is significant.  Eliminates shuddering.
  if (Math.abs(this.workspaceWidth_ - width) > doubleBorderWidth ||
      Math.abs(this.workspaceHeight_ - height) > doubleBorderWidth) {
    // Record some layout information for getFlyoutMetrics_.
    this.workspaceWidth_ = width;
    this.workspaceHeight_ = height;
    // Resize the bubble.
    this.bubble_.setBubbleSize(
        width + doubleBorderWidth, height + doubleBorderWidth);
    this.svgDialog_.setAttribute('width', this.workspaceWidth_);
    this.svgDialog_.setAttribute('height', this.workspaceHeight_);
  }

  if (this.block_.RTL) {
    // Scroll the workspace to always left-align.
    var translation = 'translate(' + this.workspaceWidth_ + ',0)';
    this.workspace_.getCanvas().setAttribute('transform', translation);
  }
  this.workspace_.resize();
};

// MyMutator.greeting = function() {
// 	console.log(a.height);
// };

// var a = new MyMutator();
//a.greeting();

// declare the helper function
var myMutatorFn = function() {
  // this will refer to the block
  this.setMutator(new MyMutator());
};
