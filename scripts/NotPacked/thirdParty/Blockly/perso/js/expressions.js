Blockly.JavaScript['dgpad_get_object'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var dropdown_name = block.getFieldValue('NAME');
    Blockly.dgpad.PARS.push(dropdown_name);
    var code = dropdown_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_set_object'] = function(block) {
    var name = block.getFieldValue('NAME');
    var arg0 = Blockly.JavaScript.valueToCode(block, 'obj_val') || '0';
    Blockly.dgpad.VARS.push(name);
    var code = "SET(\"blockly_temp_var\"," + arg0 + ");\n";
    // code += 'SetExpressionValue("' + name + '",GET(\"blockly_temp_var\"));\n';
    code += 'SET_EXP("' + name + '",GET(\"blockly_temp_var\"));\n';
    return code;
};

Blockly.JavaScript['dgpad_expression_input'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var code = text_name;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_return'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'return (' + value_name + ');\n';
    return code;
};

Blockly.JavaScript['dgpad_print'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_name = block.getFieldValue('NAME');
    if (dropdown_name === "a") return ('Println(' + value_name + ');\n');
    else return ('Print(' + value_name + ');\n');
};
