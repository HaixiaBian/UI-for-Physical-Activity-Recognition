
Blockly.JavaScript['activity'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_desc = Blockly.JavaScript.statementToCode(block, 'DESC');
  // TODO: Assemble JavaScript into code variable.
  var code = '{\n'+statements_desc.slice(0,-2)+'\n}\n';
  return code;
};

var genItem = function(ctype, args) {
  //var code = '["' + ctype + '", ' + args + '],\n';
  var code = '"' + ctype + '": [' + args + '],\n';
  return code;
};

Blockly.JavaScript['pa_in_place'] = function(block) {
  var value_pa_place = Blockly.JavaScript.valueToCode(block, 'pa_place', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_pa_place) {
    value_pa_place = '""';
    return '';
  }
  var code = genItem("place", value_pa_place);
  return code;
};

Blockly.JavaScript['pa_at_time'] = function(block) {
  var value_pa_time = Blockly.JavaScript.valueToCode(block, 'pa_time', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_pa_time) {
    value_pa_time = '""';
    return '';
  }
  var code = genItem("time", value_pa_time);
  return code;
};

Blockly.JavaScript['pa_at_day'] = function(block) {
  var value_pa_day = Blockly.JavaScript.valueToCode(block, 'pa_day', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_pa_day) {
    value_pa_day = '""';
    return '';
  }
  var code = genItem("day", value_pa_day);
  return code;
};

Blockly.JavaScript['pa_on_day'] = function(block) {
  var value_pa_day = Blockly.JavaScript.valueToCode(block, 'pa_day', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_pa_day) {
    value_pa_day = '""';
    return '';
  }
  var code = genItem("day", value_pa_day);
  return code;
};

Blockly.JavaScript['pa_last_for'] = function(block) {
  var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_duration) {
    value_duration = '""';
    return '';
  }
  var code = genItem("duration", value_duration);
  return code;
};

Blockly.JavaScript['pa_br'] = function(block) {
  var value_br = Blockly.JavaScript.valueToCode(block, 'BR', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_br) {
    value_br = '""';
    return '';
  }
  var code = genItem("breathing_rate", value_br);
  return code;
};

Blockly.JavaScript['pa_object'] = function(block) {
  var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_obj) {
    value_obj = '""';
    return '';
  }
  var code = genItem("object", value_obj);
  return code;
};

Blockly.JavaScript['temporal_order_before'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("before", value_x);
  return code;
};

Blockly.JavaScript['temporal_order_after'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("after", value_x);
  return code;
};

Blockly.JavaScript['temporal_order_meets'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("meets", value_x);
  return code;
};

Blockly.JavaScript['temporal_order_overlaps'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("overlaps", value_x);
  return code;
};

Blockly.JavaScript['temporal_order_starts'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("starts", value_x);
  return code;
};

Blockly.JavaScript['temporal_order_during'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_x) {
    value_x = '""';
    return '';
  }
  var code = genItem("during", value_x);
  return code;
};

//----------------------------------------------------

Blockly.JavaScript['home'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"home"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['school'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"school"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['office'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"office"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['other'] = function(block) {
  var text_other = block.getFieldValue('Other');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + text_other + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['time'] = function(block) {
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_minute = block.getFieldValue('minute');
  var dropdown_ampm = block.getFieldValue('ampm');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + dropdown_hour + ':' + dropdown_minute + dropdown_ampm + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['day'] = function(block) {
  var dropdown_day = block.getFieldValue('day');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + dropdown_day + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['duration'] = function(block) {
  var number_num = block.getFieldValue('NUM');
  var dropdown_unit = block.getFieldValue('UNIT');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + number_num + dropdown_unit + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_sim'] = function(block) {
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"similar_to", ' + value_act + '';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['br_gt'] = function(block) {
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"gt", ' + value_act + '';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['br_lt'] = function(block) {
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"lt", ' + value_act + '';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['br_sim'] = function(block) {
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"similar_to", ' + value_act + '';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['br_normal'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"normal"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['br_act'] = function(block) {
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + dropdown_act + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['ex_object_iron'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"iron"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ex_object_bike'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"bike"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ex_object_fryingpan'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"fryingpan"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ex_object_stove'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"stove"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

Blockly.JavaScript['pa_activity_defined'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + block.getFieldValue('NAME') + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//----------------------------------------------------

//----------------------------------------------------

Blockly.JavaScript['pa_place'] = function(block) {
  var value_pa_place = Blockly.JavaScript.valueToCode(block, 'pa_place', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '["place", "' + value_pa_place + '"]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['place'] = function(block) {
  var dropdown_place = block.getFieldValue('place');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['pa_time'] = function(block) {
  var value_pa_place = Blockly.JavaScript.valueToCode(block, 'pa_place', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['pa_day'] = function(block) {
  var value_pa_place = Blockly.JavaScript.valueToCode(block, 'pa_place', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['multiple_places'] = function(block) {
  var value_any_of = Blockly.JavaScript.valueToCode(block, 'any_of', Blockly.JavaScript.ORDER_ATOMIC);
  var value_any_of2 = Blockly.JavaScript.valueToCode(block, 'any_of2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['otherplace'] = function(block) {
  var text_otherplace = block.getFieldValue('OtherPlace');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['checkbox'] = function(block) {
  var checkbox_home = block.getFieldValue('Home') == 'TRUE';
  var checkbox_office = block.getFieldValue('Office') == 'TRUE';
  var checkbox_school = block.getFieldValue('School') == 'TRUE';
  var checkbox_other = block.getFieldValue('Other') == 'TRUE';
  var text_11 = block.getFieldValue('11');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['single'] = function(block) {
  var dropdown_duration = block.getFieldValue('duration');
  var text_other = block.getFieldValue('other');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['places'] = function(block) {
  var value_p1 = Blockly.JavaScript.valueToCode(block, 'p1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_p2 = Blockly.JavaScript.valueToCode(block, 'p2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_p3 = Blockly.JavaScript.valueToCode(block, 'p3', Blockly.JavaScript.ORDER_ATOMIC);
  var value_p4 = Blockly.JavaScript.valueToCode(block, 'p4', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['op_and'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['op_or'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['op_not'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_act'] = function(block) {
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['left_ankle'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_ankle'] = function(block) {
  var value_body_parts = Blockly.JavaScript.valueToCode(block, 'body_parts', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_wrist'] = function(block) {
  var value_body_parts = Blockly.JavaScript.valueToCode(block, 'body_parts', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['left_wrist'] = function(block) {
  var value_body_parts = Blockly.JavaScript.valueToCode(block, 'body_parts', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['left_thigh'] = function(block) {
  var value_body_parts = Blockly.JavaScript.valueToCode(block, 'body_parts', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_thigh'] = function(block) {
  var value_body_parts = Blockly.JavaScript.valueToCode(block, 'body_parts', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ass_similar_to'] = function(block) {
  var value_assignments = Blockly.JavaScript.valueToCode(block, 'assignments', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ass_different_from'] = function(block) {
  var value_assignments = Blockly.JavaScript.valueToCode(block, 'assignments', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ass_greater_than'] = function(block) {
  var value_assignments = Blockly.JavaScript.valueToCode(block, 'assignments', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ass_lower_than'] = function(block) {
  var value_assignments = Blockly.JavaScript.valueToCode(block, 'assignments', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['del_remind'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};