Blockly.JavaScript['dgpad_style_fix'] = function(block) {
    var dropdown_object = block.getFieldValue('OBJECT');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if (value_name === "") return "";
    value_name = value_name.replace(/^\((.*)\)$/, "$1");
    var code = "" + dropdown_object + ".me()" + value_name+";\n";
    console.log(code);
    return code;
};

Blockly.JavaScript['dgpad_style_color'] = function(block) {
    var colour_color = block.getFieldValue('color');
    var code = '.setColor("' + colour_color + '")';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_style_visibility'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = '.setHidden(' + dropdown_name + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_style_size'] = function(block) {
    var text_size = block.getFieldValue('size');
    var code = '.setSize(' + text_size + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['dgpad_style_layer'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = '.setLayer(' + dropdown_name + ')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};
