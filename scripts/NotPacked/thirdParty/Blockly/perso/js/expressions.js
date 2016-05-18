Blockly.JavaScript['dgpad_window_props'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_name + '()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_distance'] = function(block) {
    var value_from = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC);
    var value_to = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC);
    if ((value_from === "") || (value_to === "")) return "";
    var code = 'd(' + value_from + ',' + value_to + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['dgpad_coordinate'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_name = block.getFieldValue('NAME');
    var code = '(' + dropdown_name + ')[' + dropdown_type + ']';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_return'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'return (' + value_name + ');\n';
    return code;
};

Blockly.JavaScript['dgpad_get_object_short'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    Blockly.dgpad.PARS.push(dropdown_name);
    var code = dropdown_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_get_point_short'] = Blockly.JavaScript['dgpad_get_object_short'];
Blockly.JavaScript['dgpad_get_point_short_turtle'] = Blockly.JavaScript['dgpad_get_object_short'];

Blockly.JavaScript['dgpad_get_object'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var dropdown_name = block.getFieldValue('NAME');
    Blockly.dgpad.PARS.push(dropdown_name);
    var code = dropdown_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_set_object'] = function(block) {
    var name = block.getFieldValue('NAME');
    var arg0 = Blockly.JavaScript.valueToCode(block, 'obj_val');
    if (arg0 === "") return "";
    Blockly.dgpad.VARS.push(name);
    var loopVar = 'blockly_var_' + Blockly.JavaScript.variableDB_.getDistinctName(
        'temp_var', Blockly.Variables.NAME_TYPE);
    var code = "var " + loopVar + " = " + arg0 + " ;\n";
    code += 'SET_EXP("' + name + '",' + loopVar + ');\n';
    return code;
};

Blockly.JavaScript['dgpad_expression_input'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var code = text_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_pt2d'] = function(block) {
    var value_a0 = Blockly.JavaScript.valueToCode(block, 'a0', Blockly.JavaScript.ORDER_ATOMIC);
    var value_a1 = Blockly.JavaScript.valueToCode(block, 'a1', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '[' + value_a0 + ',' + value_a1 + ']';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_pt3d'] = function(block) {
    var value_a0 = Blockly.JavaScript.valueToCode(block, 'a0', Blockly.JavaScript.ORDER_ATOMIC);
    var value_a1 = Blockly.JavaScript.valueToCode(block, 'a1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_a2 = Blockly.JavaScript.valueToCode(block, 'a2', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '[' + value_a0 + ',' + value_a1 + ',' + value_a2 + ']';
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['dgpad_print'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_name = block.getFieldValue('NAME');
    if (dropdown_name === "a") return ('Println(' + value_name + ');\n');
    else return ('Print(' + value_name + ');\n');
};