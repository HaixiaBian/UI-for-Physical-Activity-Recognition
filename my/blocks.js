Blockly.Blocks['pa_place'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I perform this PA only");
    this.appendValueInput("pa_place")
        .setCheck("place")
        .appendField("in a certain place or places");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['place'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Home","Home"], ["Office","Office"], ["School","School"], ["Gym","Gym"], ["Grocery store","Grocery store"]]), "place");
    this.setOutput(true, "place");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I perform this PA only");
    this.appendValueInput("pa_place")
        .setCheck("time")
        .appendField("at a certain time or times");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I perform this PA only");
    this.appendValueInput("pa_place")
        .setCheck("day")
        .appendField("at a certain day or days");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Monday","Monday"], ["Tuesday","Tuesday"], ["Wednesday","Wednesday"], ["Thursday","Thursday"], ["Friday","Friday"], ["Saturday","Saturday"], ["Sunday","Sunday"]]), "day");
    this.setOutput(true, "day");
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["12","12"], ["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["11","11"]]), "clock")
        .appendField(":")
        .appendField(new Blockly.FieldDropdown([["00","0"], ["15","15"], ["30","30"], ["45","45"]]), "NAME")
        .appendField(new Blockly.FieldDropdown([["a.m.","am"], ["p.m.","pm"]]), "ampm");
    this.setOutput(true, "time");
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['multiple_places'] = {
  init: function() {
    this.appendValueInput("any_of")
        .setCheck("place")
        .appendField("any of");
    this.appendValueInput("any_of2")
        .setCheck("place");
    this.setOutput(true, "place");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['otherplace'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Other place"), "OtherPlace");
    this.setOutput(true, "place");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['checkbox'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I perform this PA only");
    this.appendDummyInput()
        .appendField("in a certain place or places");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Home")
        .appendField("Home");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Office")
        .appendField("Office");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "School")
        .appendField("School");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Other")
        .appendField("Other")
        .appendField(new Blockly.FieldTextInput("..."), "11");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['single'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("It usually lasts only for a certain duration");
    this.appendDummyInput()
        .appendField("similar to duration of")
        .appendField(new Blockly.FieldDropdown([["eating","eating"], ["running","running"], ["other","other"]]), "duration");
    this.appendDummyInput()
        .appendField("If you choose other, please write it here:")
        .appendField(new Blockly.FieldTextInput("default"), "other");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Home");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['school'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("School");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['office'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Office");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['other'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Other")
        .appendField(new Blockly.FieldTextInput("..."), "Other");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['places'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I perform this PA only");
    this.appendDummyInput()
        .appendField(" in a certain place or place");
    this.appendValueInput("p1")
        .setCheck(null);
    this.appendValueInput("p2")
        .setCheck(null);
    this.appendValueInput("p3")
        .setCheck(null);
    this.appendValueInput("p4")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['duration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), "NUM")
        .appendField(new Blockly.FieldDropdown([["hour","h"], ["minute","m"], ["second","s"]]), "UNIT");
    this.setOutput(true, "duration");
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['duration_sim'] = {
  init: function() {
    this.appendValueInput("ACT")
        .setCheck("activity")
        .appendField("similar to");
    this.setOutput(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['br_gt'] = {
  init: function() {
    this.appendValueInput("ACT")
        .setCheck("br")
        .appendField("higher than");
    this.setOutput(true, "br_constrain");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['br_lt'] = {
  init: function() {
    this.appendValueInput("ACT")
        .setCheck("br")
        .appendField("lower than");
    this.setOutput(true, "br_constrain");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['br_sim'] = {
  init: function() {
    this.appendValueInput("ACT")
        .setCheck("br")
        .appendField("similar to");
    this.setOutput(true, "br_constrain");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['br_normal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("normal");
    this.setOutput(true, "br_constrain");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['br_act'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["walking","walking"], ["climbing stairs","climbing stairs"]]), "ACT");
    this.setOutput(true, "br");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['op_and'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(null)
        .appendField("AND");
    this.appendValueInput("y")
        .setCheck(null);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['op_or'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(null)
        .appendField("OR");
    this.appendValueInput("y")
        .setCheck(null);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['op_not'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(null)
        .appendField("NOT");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_before'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("Before");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_after'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("After");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_meets'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("Meets");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_overlaps'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("Overlaps");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_starts'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("Starts");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['temporal_order_during'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("activity")
        .appendField("During");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ex_object_iron'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Iron");
    this.setInputsInline(false);
    this.setOutput(true, "ex_object");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ex_object_bike'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bike");
    this.setInputsInline(false);
    this.setOutput(true, "ex_object");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ex_object_fryingpan'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Frying Pan");
    this.setInputsInline(false);
    this.setOutput(true, "ex_object");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ex_object_stove'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stove");
    this.setInputsInline(false);
    this.setOutput(true, "ex_object");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['duration_act'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldDropdown([["eating","eating"], ["running","running"]]), "ACT");
    this.setOutput(true, "duration");
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['left_ankle'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("Left ankle");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['right_ankle'] = {
  init: function() {
    this.appendValueInput("body_parts")
        .setCheck(null)
        .appendField("Right ankle");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['right_wrist'] = {
  init: function() {
    this.appendValueInput("body_parts")
        .setCheck(null)
        .appendField("Right wrist");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['left_wrist'] = {
  init: function() {
    this.appendValueInput("body_parts")
        .setCheck(null)
        .appendField("Left wrist");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['left_thigh'] = {
  init: function() {
    this.appendValueInput("body_parts")
        .setCheck(null)
        .appendField("Left thigh");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['right_thigh'] = {
  init: function() {
    this.appendValueInput("body_parts")
        .setCheck(null)
        .appendField("Right thigh");
    this.setOutput(true, "body_parts");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ass_similar_to'] = {
  init: function() {
    this.appendValueInput("assignments")
        .setCheck(null)
        .appendField("Similar to");
    this.setOutput(true, "assignments");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ass_different_from'] = {
  init: function() {
    this.appendValueInput("assignments")
        .setCheck(null)
        .appendField("different from");
    this.setOutput(true, "assignments");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ass_greater_than'] = {
  init: function() {
    this.appendValueInput("assignments")
        .setCheck(null)
        .appendField("greater than");
    this.setOutput(true, "assignments");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ass_lower_than'] = {
  init: function() {
    this.appendValueInput("assignments")
        .setCheck(null)
        .appendField("lower than");
    this.setOutput(true, "assignments");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['activity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Activity")
        .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendStatementInput("DESC")
        .setCheck(null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_in_place'] = {
  init: function() {
    this.appendValueInput("pa_place")
        .setCheck("place")
        .appendField("In place");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_at_time'] = {
  init: function() {
    this.appendValueInput("pa_time")
        .setCheck("time")
        .appendField("At time");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_at_day'] = {
  init: function() {
    this.appendValueInput("pa_day")
        .setCheck("day")
        .appendField("At day");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_last_for'] = {
  init: function() {
    this.appendValueInput("duration")
        .setCheck("duration")
        .appendField("Last for");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_br'] = {
  init: function() {
    this.appendValueInput("BR")
        .setCheck("br_constrain")
        .appendField("Breathing rate");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_object'] = {
  init: function() {
    this.appendValueInput("OBJ")
        .setCheck("ex_object")
        .appendField("Use");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_on_day'] = {
  init: function() {
    this.appendValueInput("pa_day")
        .setCheck("day")
        .appendField("On day");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pa_activity_defined'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("activity_name"), "NAME");
    this.setOutput(true, "activity");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};