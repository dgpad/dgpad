Blockly.JavaScript['text_append'] = function(block) {
    // Append to a variable in place.
    var varName = "blockly_var_" + Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};

Blockly.JavaScript['text'] = function(block) {
    var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));

    // unicode parsing :
    code = code.replace(/\\\\u([A-F\d]{4})/g, function(m, _s) {
        return String.fromCharCode(parseInt(_s, 16))
    });
    code = "TURTLE_TEXT(" + code + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Blockly.JavaScript['dgpad_tex'] = function(block) {
//     var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
//     // TODO: Assemble JavaScript into code variable.
//     // var code = '$$'+statements_name.trim()+'$$';

//     var code = "TURTLE_TEXT('$$" + statements_name.trim() + "$$')";

//     console.log(code);

//     // TODO: Change ORDER_NONE to the correct strength.
//     return [code, Blockly.JavaScript.ORDER_NONE];
// };


// Blockly.JavaScript['dgpad_tex_2'] = function(block) {
//     var dropdown_name = block.getFieldValue('NAME');
//     var value_first = Blockly.JavaScript.valueToCode(block, 'FIRST', Blockly.JavaScript.ORDER_ATOMIC);
//     var value_second = Blockly.JavaScript.valueToCode(block, 'SECOND', Blockly.JavaScript.ORDER_ATOMIC);
//     // TODO: Assemble JavaScript into code variable.
//     var code = "\\\\"+dropdown_name+"{'+"+value_first+"+'}{'+"+value_second+"+'}";
//     // var code = '\\\\' + dropdown_name + '{' + value_first + '}{' + value_second + '}';
//     return code;
// };

Blockly.JavaScript['dgpad_tex_2'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_first = Blockly.JavaScript.valueToCode(block, 'FIRST', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second = Blockly.JavaScript.valueToCode(block, 'SECOND', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "TURTLE_TEXT('\\\\" + dropdown_name + "{'+" + value_first + "+'}{'+" + value_second + "+'}')";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['dgpad_tex_1'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_first = Blockly.JavaScript.valueToCode(block, 'FIRST', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "TURTLE_TEXT('\\\\" + dropdown_name + "{'+" + value_first + "+'}')";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['dgpad_tex_0'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = "TURTLE_TEXT('\\\\" + dropdown_name + "')";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_tex'] = function(block) {
    var result = Blockly.JavaScript['text_join'](block);
    result[0] = "'$$'+" + result[0] + "+'$$'";
    return result;
};

Blockly.JavaScript['dgpad_output_precision'] = function(block) {
  var number_val = block.getFieldValue('VAL');
  // TODO: Assemble JavaScript into code variable.
  var code = 'SET_NUM_PRECISION('+number_val+');\n';
  return code;
};


// Blockly.JavaScript['text_join'] = function(block) {
//   // Create a string made up of any number of elements of any type.
//   var code;
//   if (block.itemCount_ == 0) {
//     return ['\'\'', Blockly.JavaScript.ORDER_ATOMIC];
//   } else if (block.itemCount_ == 1) {
//     var argument0 = Blockly.JavaScript.valueToCode(block, 'ADD0',
//         Blockly.JavaScript.ORDER_NONE) || '\'\'';
//     code = ""+argument0;
//     return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
//   } else if (block.itemCount_ == 2) {
//     var argument0 = Blockly.JavaScript.valueToCode(block, 'ADD0',
//         Blockly.JavaScript.ORDER_NONE) || '\'\'';
//     var argument1 = Blockly.JavaScript.valueToCode(block, 'ADD1',
//         Blockly.JavaScript.ORDER_NONE) || '\'\'';
//     code = argument0 + '+' + argument1;
//     return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
//   } else {
//     code = new Array(block.itemCount_);
//     for (var n = 0; n < block.itemCount_; n++) {
//       code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
//           Blockly.JavaScript.ORDER_COMMA) || '\'\'';
//     }
//     code = '[' + code.join(',') + '].join(\'\')';
//     return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
//   }
// };
