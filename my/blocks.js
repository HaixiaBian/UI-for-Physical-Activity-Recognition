
'use strict';

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

Blockly.defineBlocksWithJsonArray([{
  "type": "pa_place",
  "message0": "I perform this PA only %1 in a certain place or places %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pa_place",
      "check": "place"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "place",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "place",
      "options": [
        [
          "Home",
          "Home"
        ],
        [
          "Office",
          "Office"
        ],
        [
          "School",
          "School"
        ],
        [
          "Gym",
          "Gym"
        ],
        [
          "Grocery store",
          "Grocery store"
        ]
      ]
    }
  ],
  "output": "place",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_time",
  "message0": "I perform this PA only %1 at a certain time or times %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pa_place",
      "check": "time"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_day",
  "message0": "I perform this PA only %1 at a certain day or days %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pa_place",
      "check": "day"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 60,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "day",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "day",
      "options": [
        [
          "Monday",
          "Monday"
        ],
        [
          "Tuesday",
          "Tuesday"
        ],
        [
          "Wednesday",
          "Wednesday"
        ],
        [
          "Thursday",
          "Thursday"
        ],
        [
          "Friday",
          "Friday"
        ],
        [
          "Saturday",
          "Saturday"
        ],
        [
          "Sunday",
          "Sunday"
        ]
      ]
    }
  ],
  "output": "day",
  "colour": 60,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "time",
  "message0": "%1 : %2 - %3 %4 %5",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "hour",
      "options": [
        [
          "12",
          "12"
        ],
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ],
        [
          "8",
          "8"
        ],
        [
          "9",
          "9"
        ],
        [
          "10",
          "10"
        ],
        [
          "11",
          "11"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "minute",
      "options": [
        [
          "00",
          "00"
        ],
        [
          "15",
          "15"
        ],
        [
          "30",
          "30"
        ],
        [
          "45",
          "45"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "hour2",
      "options": [
        [
          "12",
          "12"
        ],
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ],
        [
          "8",
          "8"
        ],
        [
          "9",
          "9"
        ],
        [
          "10",
          "10"
        ],
        [
          "11",
          "11"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "minute2",
      "options": [
        [
          "00",
          "00"
        ],
        [
          "15",
          "15"
        ],
        [
          "30",
          "30"
        ],
        [
          "45",
          "45"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "ampm",
      "options": [
        [
          "a.m.",
          "am"
        ],
        [
          "p.m.",
          "pm"
        ]
      ]
    }
  ],
  "output": "time",
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "multiple_places",
  "message0": "any of %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "any_of",
      "check": "place"
    },
    {
      "type": "input_value",
      "name": "any_of2",
      "check": "place"
    }
  ],
  "output": "place",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "otherplace",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "OtherPlace",
      "text": "Other place"
    }
  ],
  "output": "place",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "checkbox",
  "message0": "I perform this PA only %1 in a certain place or places %2 %3 Home %4 %5 Office %6 %7 School %8 %9 Other %10",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Home",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Office",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "School",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Other",
      "checked": true
    },
    {
      "type": "field_input",
      "name": "11",
      "text": "..."
    }
  ],
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "single",
  "message0": "It usually lasts only for a certain duration %1 similar to duration of %2 %3 If you choose other, please write it here: %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "duration",
      "options": [
        [
          "eating",
          "eating"
        ],
        [
          "running",
          "running"
        ],
        [
          "other",
          "other"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "other",
      "text": "default"
    }
  ],
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "home",
  "message0": "Home",
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "school",
  "message0": "School",
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "office",
  "message0": "Office",
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "other",
  "message0": "Other %1",
  "args0": [
    {
      "type": "field_input",
      "name": "Other",
      "text": "..."
    }
  ],
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "places",
  "message0": "I perform this PA only %1  in a certain place or place %2 %3 %4 %5 %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "p1"
    },
    {
      "type": "input_value",
      "name": "p2"
    },
    {
      "type": "input_value",
      "name": "p3"
    },
    {
      "type": "input_value",
      "name": "p4"
    }
  ],
  "output": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "duration",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_number",
      "name": "NUM",
      "value": 1,
      "min": 1,
      "precision": 1
    },
    {
      "type": "field_dropdown",
      "name": "UNIT",
      "options": [
        [
          "hour",
          "h"
        ],
        [
          "minute",
          "m"
        ],
        [
          "second",
          "s"
        ]
      ]
    }
  ],
  "output": "duration",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "duration_sim",
  "message0": "similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACT",
      "check": "du_sim"
    }
  ],
  "output": "duration",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "br_gt",
  "message0": "higher than %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACT",
      "check": "br"
    }
  ],
  "output": "br_constrain",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "br_lt",
  "message0": "lower than %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACT",
      "check": "br"
    }
  ],
  "output": "br_constrain",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "br_sim",
  "message0": "similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACT",
      "check": "br"
    }
  ],
  "output": "br_constrain",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "br_normal",
  "message0": "normal",
  "output": "br_constrain",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "br_act",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ACT",
      "options": [
        [
          "walking",
          "walking"
        ],
        [
          "climbing stairs",
          "climbing stairs"
        ]
      ]
    }
  ],
  "output": "br",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "op_and",
  "message0": "AND %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x"
    },
    {
      "type": "input_value",
      "name": "y"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "op_or",
  "message0": "OR %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x"
    },
    {
      "type": "input_value",
      "name": "y"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "op_not",
  "message0": "NOT %1",
  "args0": [
    {
      "type": "input_value",
      "name": "x"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_before",
  "message0": "Before %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
    {
          "type": "input_value",
          "name": "y",
          "check": "activity"
        }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_after",
  "message0": "After %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
    {
          "type": "input_value",
          "name": "y",
          "check": "activity"
        }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_meets",
  "message0": "Meets %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
    {
          "type": "input_value",
          "name": "y",
          "check": "activity"
        }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_overlaps",
  "message0": "Overlaps %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
         {
               "type": "input_value",
               "name": "y",
               "check": "activity"
             }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_starts",
  "message0": "Starts %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
         {
               "type": "input_value",
               "name": "y",
               "check": "activity"
             }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "temporal_order_during",
  "message0": "During %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "x",
      "check": "activity"
    },
         {
               "type": "input_value",
               "name": "y",
               "check": "activity"
             }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ex_object_iron",
  "message0": "Iron",
  "inputsInline": false,
  "output": "ex_object",
  "colour": 150,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ex_object_bike",
  "message0": "Bike",
  "inputsInline": false,
  "output": "ex_object",
  "colour": 150,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ex_object_fryingpan",
  "message0": "Frying Pan",
  "inputsInline": false,
  "output": "ex_object",
  "colour": 150,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ex_object_stove",
  "message0": "Stove",
  "inputsInline": false,
  "output": "ex_object",
  "colour": 150,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "duration_act",
  "message0": " %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ACT",
      "options": [
        [
          "eating",
          "eating"
        ],
        [
          "running",
          "running"
        ]
      ]
    }
  ],
  "output": "du_sim",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_ankle",
  "message0": "Left ankle %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_ankle",
  "message0": "Right ankle %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_wrist",
  "message0": "Right wrist %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_wrist",
  "message0": "Left wrist %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_thigh",
  "message0": "Left thigh %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_thigh",
  "message0": "Right thigh %1",
  "args0": [
    {
      "type": "input_value",
      "name": "movement"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ass_similar_to",
  "message0": "Similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "sim"
    }
  ],
  "output": null,
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ass_different_from",
  "message0": "different from %1",
  "args0": [
    {
      "type": "input_value",
      "name": "diff"
    }
  ],
  "output": null,
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ass_greater_than",
  "message0": "greater than %1",
  "args0": [
    {
      "type": "input_value",
      "name": "gt"
    }
  ],
  "output": null,
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ass_lower_than",
  "message0": "lower than %1",
  "args0": [
    {
      "type": "input_value",
      "name": "lt"
    }
  ],
  "output": null,
  "colour": 240,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "activity",
  "message0": "Activity %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "DESC"
    }
  ],
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_in_place",
  "message0": "In place %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pa_place",
      "check": "place"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_at_time",
  "message0": "At time %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pa_time",
      "check": "time"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_at_day",
  "message0": "At day %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pa_day",
      "check": "day"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 60,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_last_for",
  "message0": "Last for %1",
  "args0": [
    {
      "type": "input_value",
      "name": "duration",
      "check": "duration"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_br",
  "message0": "Breathing rate %1",
  "args0": [
    {
      "type": "input_value",
      "name": "BR",
      "check": "br_constrain"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_object",
  "message0": "Use %1",
  "args0": [
    {
      "type": "input_value",
      "name": "OBJ",
      "check": "ex_object"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 150,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pa_on_day",
  "message0": "On day %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pa_day",
      "check": "day"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 60,
  "tooltip": "",
  "helpUrl": "",
},
{
  "type": "pa_activity_defined",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": "activity_name"
    }
  ],
  "output": "activity",
  "colour": 300,
  "tooltip": "",
  "helpUrl": "",
  "mutator": "pa_activity_mutator",
},
{
  "type": "del_remind",
  "message0": "This activity has been deleted!",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pos_still",
  "message0": "Completly still:  %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pos",
      "options": [
        [
          "parallel to ground",
          "parallel"
        ],
        [
          "pointing towards ground",
          "down"
        ],
        [
          "pointing up",
          "up"
        ]
      ]
    }
  ],
  "output": "pose",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "occa_moving",
  "message0": "occasionally moving %1 without any order or pattern:   %2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "pos",
      "options": [
        [
          "parallel to ground",
          "parallel"
        ],
        [
          "pointing towards ground",
          "down"
        ],
        [
          "pointing up",
          "up"
        ]
      ]
    }
  ],
  "output": "pose",
  "colour": 180,
  "tooltip": "occasionally moving but without any order or pattern",
  "helpUrl": ""
},
{
  "type": "rate",
  "message0": "the rate is similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": [
        "body_part",
        "activity"
      ]
    }
  ],
  "previousStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_arc",
  "message0": "in an arc %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "PLANE",
      "check": "plane"
    }
  ],
  "previousStatement": "manner",
  "nextStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_circle",
  "message0": "in a circle %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "PLANE",
      "check": "plane"
    }
  ],
  "previousStatement": "manner",
  "nextStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_line",
  "message0": "in a line %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "PLANE",
      "check": "plane"
    }
  ],
  "previousStatement": "manner",
  "nextStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_up_down",
  "message0": "up to down or vice versa",
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_front_back",
  "message0": "front to back or vice versa of body",
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_left_right",
  "message0": "left to right or vise versa of body",
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_up_level",
  "message0": "up to parallel-to-ground or vice versa",
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_down_level",
  "message0": "down to parallel-to-ground or vice versa",
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_pattern",
  "message0": "in a pattern %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "PATTERN",
      "check": [
        "manner",
        "rate"
      ]
    }
  ],
  "output": "pattern",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_plane_sim",
  "message0": "the plane is similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACT",
      "check": [
        "body_part",
        "activity"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "plane",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_rate_sim",
  "message0": "the rate is similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "OTHER",
      "check": [
        "body_part",
        "activity"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_ankle_ref",
  "message0": "Left ankle",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_ankle_ref",
  "message0": "Right ankle",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_wrist_ref",
  "message0": "Right wrist",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_wrist_ref",
  "message0": "Left wrist",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "left_thigh_ref",
  "message0": "Left thigh",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "right_thigh_ref",
  "message0": "Right thigh",
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "body_part_activity_ref",
  "message0": "a different body part %1 in a different activity %2",
  "args0": [
    {
      "type": "input_value",
      "name": "BODYPART"
    },
    {
      "type": "input_value",
      "name": "ACT"
    }
  ],
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "same_body_part_activity_ref",
  "message0": "the same body part %1 in a different activity %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ACT"
    }
  ],
  "output": "body_part",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "mov_manner_sim",
  "message0": "the manner is similar to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "OTHER",
      "check": [
        "body_part",
        "activity"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "pattern",
  "nextStatement": "rate",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
}]);


var PA_ACTIVITY_MUTATOR_MIXIN = {

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  //suppressPrefixSuffix: true,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    return null;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    // var containerBlock = workspace.newBlock('controls_if_if');
    // containerBlock.initSvg();
    // return containerBlock;
	var xml = blocklyFactory.blockLibraryController.storage.getBlockXml(this.getFieldValue("NAME"));
	//xml = Blockly.Xml.textToDom(xml);
	if (xml) {
		Blockly.Xml.domToWorkspace(xml, workspace);
		var containerBlock = workspace.getTopBlocks()[0];
		return containerBlock;
	} else {
		var containerBlock = workspace.newBlock('del_remind');
		containerBlock.initSvg();
		return containerBlock;
	}
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
  },
};

Blockly.Extensions.registerMutator('pa_activity_mutator',
    PA_ACTIVITY_MUTATOR_MIXIN, myMutatorFn,
    null);

