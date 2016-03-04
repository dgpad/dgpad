Blockly.JavaScript['dgpad_create_list'] = function(block) {
    var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.

    return 'SET("blockly_var_' + variable_varname + '",[]);\n';

    // var code = "var " + variable_varname + '=[];\n';
    // return code;
};

Blockly.JavaScript['dgpad_stop_list'] = function(block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    var code = 'GET("blockly_var_' + variable_name + '").push([NaN,NaN,NaN]);\n';
    // var code = variable_name + '.push([NaN,NaN,NaN]);\n';
    return code;
};


Blockly.JavaScript['dgpad_push'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var variable_varname = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VARNAME'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    value_name = value_name.replace(/^\((.*)\)$/, "$1");
    var code = 'GET("blockly_var_' + variable_varname + '").push(' + value_name + ');\n';
    // var code = variable_varname + '.push(' + value_name + ');\n';
    return code;
};
