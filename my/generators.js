// Blockly.JavaScript.INDENT = '';
INDENT = Blockly.JavaScript.INDENT;
INDENT_LEN = Blockly.JavaScript.INDENT.length;

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

var genDictItem = function(ctype, args) {
  //var code = '["' + ctype + '", ' + args + '],\n';
  var code = '"' + ctype + '": {\n' + args + '\n},\n';
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

Blockly.JavaScript['body_parts'] = function(block) {
  var statements_bodypart = Blockly.JavaScript.statementToCode(block, 'BODYPART');
  // TODO: Assemble JavaScript into code variable.
  if (!statements_bodypart) {
    statements_bodypart = '""';
    return '';
  }
  var code = genDictItem("body_parts", statements_bodypart.slice(0,-2));
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

Blockly.JavaScript['left_ankle'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  var code = genItem("left_ankle", value_movement);
  return code;
};

Blockly.JavaScript['right_ankle'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  var code = genItem("right_ankle", value_movement);
  return code;
};

Blockly.JavaScript['left_wrist'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  var code = genItem("left_wrist", value_movement);
  return code;
};

Blockly.JavaScript['right_wrist'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  var code = genItem("right_wrist", value_movement);
  return code;
};

Blockly.JavaScript['left_thigh'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  var code = genItem("left_thigh", value_movement);
  return code;
};

Blockly.JavaScript['right_thigh'] = function(block) {
  var value_movement = Blockly.JavaScript.valueToCode(block, 'movement', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if (!value_movement) {
    value_movement = '""';
    return '';
  }
  // var code = '{"right_thigh": [' + value_movement + ']"},\n';
  var code = genItem("right_thigh", value_movement);
  return code;
};

Blockly.JavaScript['pos_still'] = function(block) {
  var dropdown_pos = block.getFieldValue('pos');
  // TODO: Assemble JavaScript into code variable.
  var code = '"still", "' + dropdown_pos + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['occa_moving'] = function(block) {
  var dropdown_pos = block.getFieldValue('pos');
  // TODO: Assemble JavaScript into code variable.
  var code = '"occa_moving", "' + dropdown_pos + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mov_pattern'] = function(block) {
  var statements_pattern = Blockly.JavaScript.statementToCode(block, 'PATTERN');
  // TODO: Assemble JavaScript into code variable.
  var code = '"pattern", {\n' + INDENT + statements_pattern.slice(INDENT_LEN, -2) + '\n}';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mov_motion'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var dropdown_plane = block.getFieldValue('PLANE');
  // TODO: Assemble JavaScript into code variable.
  var def = ["motion", {
    type: dropdown_type,
    plane: dropdown_plane
  }];
  var code = '"manner": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_manner_bodypart'] = function(block) {
  var dropdown_bodypart = block.getFieldValue('BODYPART');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: "current",
    bodypart: dropdown_bodypart
  }];
  var code = '"manner": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_manner_bodypart_activity'] = function(block) {
  var dropdown_bodypart = block.getFieldValue('BODYPART');
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: dropdown_act,
    bodypart: dropdown_bodypart
  }];
  var code = '"manner": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_manner_activity'] = function(block) {
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: dropdown_act,
    bodypart: "current"
  }];
  var code = '"manner": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_rate_bodypart'] = function(block) {
  var dropdown_bodypart = block.getFieldValue('BODYPART');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: "current",
    bodypart: dropdown_bodypart
  }];
  var code = '"rate": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_rate_bodypart_activity'] = function(block) {
  var dropdown_bodypart = block.getFieldValue('BODYPART');
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: dropdown_act,
    bodypart: dropdown_bodypart
  }];
  var code = '"rate": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_rate_activity'] = function(block) {
  var dropdown_act = block.getFieldValue('ACT');
  // TODO: Assemble JavaScript into code variable.
  var def = ["sim", {
    act: dropdown_act,
    bodypart: "current"
  }];
  var code = '"rate": ' + JSON.stringify(def) + ',\n';
  return code;
};

Blockly.JavaScript['mov_arc'] = function(block) {
  var statements_plane = Blockly.JavaScript.statementToCode(block, 'PLANE');
  // TODO: Assemble JavaScript into code variable.
  var code = '"arc", ' + statements_plane.slice(INDENT_LEN) + '';
  return code;
};

Blockly.JavaScript['mov_circle'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'PLANE');
  // TODO: Assemble JavaScript into code variable.
  var code = '"circle", ' + statements_plane.slice(INDENT_LEN) + '';
  return code;
};

Blockly.JavaScript['mov_line'] = function(block) {
  var statements_plane = Blockly.JavaScript.statementToCode(block, 'PLANE');
  // TODO: Assemble JavaScript into code variable.
  var code = '"line", ' + statements_plane.slice(INDENT_LEN) + '';
  return code;
};

Blockly.JavaScript['mov_up_down'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"up_down"';
  return code;
};

Blockly.JavaScript['mov_front_back'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"front_back"';
  return code;
};

Blockly.JavaScript['mov_left_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"left_right"';
  return code;
};

Blockly.JavaScript['mov_up_level'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"up_level"';
  return code;
};

Blockly.JavaScript['mov_down_level'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"down_level"';
  return code;
};

Blockly.JavaScript['mov_plane_sim'] = function(block) {
  var value_other = Blockly.JavaScript.valueToCode(block, 'OTHER', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"plane_similar_to", ' + value_other;
  return code;
};

Blockly.JavaScript['mov_manner_sim'] = function(block) {
  var value_other = Blockly.JavaScript.valueToCode(block, 'OTHER', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"manner_similar_to", ' + value_other;
  return code;
};

Blockly.JavaScript['mov_rate_sim'] = function(block) {
  var value_other = Blockly.JavaScript.valueToCode(block, 'OTHER', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '"rate_similar_to", ' + value_other;
  return code;
};

Blockly.JavaScript['rate'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['left_ankle_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"left_ankle"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_ankle_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"right_ankle"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['left_wrist_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"left_wrist"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_wrist_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"right_wrist"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['left_thigh_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"left_thigh"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['right_thigh_ref'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '"right_thigh"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['same_body_part_activity_ref'] = function(block) {
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_act;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['body_part_activity_ref'] = function(block) {
  var value_bodypart = Blockly.JavaScript.valueToCode(block, 'BODYPART', Blockly.JavaScript.ORDER_ATOMIC);
  var value_act = Blockly.JavaScript.valueToCode(block, 'ACT', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_bodypart + value_act;
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

Blockly.JavaScript['manner'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};