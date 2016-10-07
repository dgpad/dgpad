Blockly.JavaScript['turtle_angle_input'] = function(block) {
    var angle_angle = block.getFieldValue('ANGLE');
    // TODO: Assemble JavaScript into code variable.
    var code = angle_angle;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['turtle_move'] = function(block) {
    var dir = block.getFieldValue('DIR');
    var units = block.getFieldValue('UNITS');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    value = (dir === "moveBackward") ? ("-" + value) : value;
    var cod = "TURTLE_MV(" + value + "," + (units === "px") + ");\n";
    // Blockly.dgpad.ZC.blocklyManager()
    return cod;
};


Blockly.JavaScript['turtle_turn'] = function(block) {
    var dir = block.getFieldValue('DIR');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    value = (dir === "turnRight") ? ("-" + value) : value;
    var cod = "TURTLE_TURN(" + value + ");\n";
    return cod;
};


Blockly.JavaScript['turtle_rotate'] = function(block) {
    var dir = block.getFieldValue('DIR');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    value = (dir === "rotate_bottom") ? ("-" + value) : value;
    value = (dir === "rotate_left") ? ("-" + value) : value;
    var cod = "TURTLE_ROTATE(" + value + "," + ((dir === "rotate_top") || (dir === "rotate_bottom")) + ");\n";
    return cod;
};

Blockly.JavaScript['turtle_pen'] = function(block) {
    var dir = block.getFieldValue('PEN');
    var cod = "TURTLE_UP(" + (dir === "penUp") + ");\n";
    return cod;
};



Blockly.JavaScript['turtle_colour'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'N', Blockly.JavaScript.ORDER_ATOMIC);
    var cod = "TURTLE_COLOUR(" + value + ");\n";
    return cod;
};

Blockly.JavaScript['turtle_fill'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'OP', Blockly.JavaScript.ORDER_ATOMIC);
    value = (value < 0) ? 0 : ((value > 100) ? 100 : value);
    var cod = "TURTLE_FILL(" + value + ");\n";
    return cod;
};

Blockly.JavaScript['turtle_colour_increment'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'COL', Blockly.JavaScript.ORDER_ATOMIC);
    var cod = "TURTLE_COLOUR_INCREMENT(" + value + ");\n";
    return cod;
};

Blockly.JavaScript['turtle_width'] = function(block) {
    var what = block.getFieldValue('WHAT');
    var value = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);
    if (value <= 0) value = "1e-13";
    var inst = (what === "pen") ? "TURTLE_WIDTH" : "TURTLE_POINTS_WIDTH";
    var cod = inst + "(" + value + ");\n";
    return cod;
};


Blockly.JavaScript['turtle_width_increment'] = function(block) {
    var what = block.getFieldValue('WHAT');

    var value = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);
    var inst = (what === "pen") ? "TURTLE_WIDTH_INCREMENT" : "TURTLE_POINTS_WIDTH_INCREMENT";
    var cod = cod = inst + "(" + value + ");\n";
    return cod;
};


Blockly.JavaScript['turtle_turn_pt'] = function(block) {
    var dropdown_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var cod = "TURTLE_ROTATE_PT(" + dropdown_name + ");\n";
    return cod;
};

Blockly.JavaScript['turtle_join_pt'] = function(block) {
    var dropdown_name = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var cod = "TURTLE_JOIN_PT(" + dropdown_name + ");\n";
    return cod;
};


Blockly.JavaScript['turtle_position'] = function(block) {
    var code = 'TURTLE_POS()';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turtle_reset_angles'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'TURTLE_RESET();\n';
    return code;
};

Blockly.JavaScript['turtle_get'] = function(block) {
    var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_name = block.getFieldValue('NAME');
    var code = 'TURTLE_GET("' + dropdown_name + '",' + value_num + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turtle_length'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = 'TURTLE_LENGTH("' + dropdown_name + '")';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['turtle_print'] = function(block) {
    var txt = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    // if ((txt.length > 2) && (txt.charAt(0) === "'") && (txt.charAt(txt.length - 1) === "'")) {
    //     txt = txt.substr(1, txt.length - 2);
    // }
    var code = "TURTLE_PRINT(" + txt + ");\n";
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

Blockly.JavaScript['turtle_font'] = function(block) {
    var font = block.getFieldValue('FONT');
    var size = block.getFieldValue('FONTSIZE');
    var face = block.getFieldValue('FONTSTYLE');
    var align = block.getFieldValue('FONTALIGN');
    var cod = "TURTLE_FONT('" + font + "'," + size + ",'" + face + "','" + align + "');\n";
    return cod;
};


Blockly.JavaScript['turtle_img'] = function(block) {
    var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
    var value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
    var value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ATOMIC);
    var value_o = Blockly.JavaScript.valueToCode(block, 'o', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "TURTLE_PRINT_IMG(" + value_url + "," + value_w + "," + value_h + "," + value_z + "," + value_o + ");\n";
    return code;
};
