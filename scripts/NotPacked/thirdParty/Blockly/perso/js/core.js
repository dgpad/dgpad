// Blockly.JavaScript['controls_whileUntil'] = function(block) {

//     var until = block.getFieldValue('MODE') == 'UNTIL';
//     var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
//         until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
//         Blockly.JavaScript.ORDER_NONE) || 'false';
//     var branch = Blockly.JavaScript.statementToCode(block, 'DO');
//     branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
//     if (until) {
//         argument0 = '!' + argument0;
//     }
//     var cod = "setTimeout(function(){if (" + argument0 + ") {\n" + branch + "\nsetTimeout(arguments.callee,0)\n}\n},0);";
//     return cod;
// }

Blockly.JavaScript['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': ['plus', Blockly.JavaScript.ORDER_ADDITION],
        'MINUS': ['minus', Blockly.JavaScript.ORDER_SUBTRACTION],
        'MULTIPLY': ['times', Blockly.JavaScript.ORDER_MULTIPLICATION],
        'DIVIDE': ['quotient', Blockly.JavaScript.ORDER_DIVISION],
        'POWER': ['power', Blockly.JavaScript.ORDER_COMMA] // Handle power separately.
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

    var code = operator + "(" + argument0 + "," + argument1 + ")";
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['variables_get'] = function(block) {
    // Variable getter.
    var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    code = "GET('blockly_var_"+ code + "')";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
 

Blockly.JavaScript['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return 'SET("blockly_var_' + varName + '",' + argument0 + ');\n';
    // return varName + ' = ' + argument0 + ';\n';
};
