Blockly.JavaScript['dgpad_global_get'] = function(block) {
  var dropdown_name = block.getFieldValue('VAR');
  var code = 'GLOBAL_GET("'+dropdown_name+'")';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['dgpad_global_set'] = function(block) {
  var dropdown_name = block.getFieldValue('VAR');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'GLOBAL_SET("'+dropdown_name+'",'+value_name+');\n';
  return code;
};

Blockly.JavaScript['dgpad_global_inc'] = function(block) {
  var dropdown_name = block.getFieldValue('VAR');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'GLOBAL_INC("'+dropdown_name+'",'+value_name+');\n';
  return code;
};