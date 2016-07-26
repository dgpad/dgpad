Blockly.JavaScript['text_append'] = function(block) {
    // Append to a variable in place.
    var varName = "blockly_var_" + Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};
