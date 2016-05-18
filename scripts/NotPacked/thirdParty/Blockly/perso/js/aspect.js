Blockly.JavaScript['dgpad_style_fix'] = function(block) {
    var dropdown_object = block.getFieldValue('OBJECT');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if (value_name === "") return "";
    value_name = value_name.replace(/^\((.*)\)$/, "$1");
    var code = 'BLK_STL("' + dropdown_object + '",' + value_name + ");\n"
    return code;
};



Blockly.JavaScript['dgpad_style_color_rgb'] = function(block) {
    var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
    var value_g = Blockly.JavaScript.valueToCode(block, 'G', Blockly.JavaScript.ORDER_ATOMIC);
    var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '"setRGBColor",[' + value_r + ',' + value_g + ',' + value_b + ']';
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.dgpad_style_block_js = function(_cmd) {
    return (function(block) {
        var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
        var code = '"' + _cmd + '",[' + value_name + ']';
        return [code, Blockly.JavaScript.ORDER_NONE];
    });
}
Blockly.JavaScript['dgpad_style_visibility'] = Blockly.dgpad_style_block_js("setHidden");
Blockly.JavaScript['dgpad_style_size'] = Blockly.dgpad_style_block_js("setSize");
Blockly.JavaScript['dgpad_style_layer'] = Blockly.dgpad_style_block_js("setLayer");
Blockly.JavaScript['dgpad_style_font'] = Blockly.dgpad_style_block_js("setFontSize");
Blockly.JavaScript['dgpad_style_precision'] = Blockly.dgpad_style_block_js("setPrecision");
Blockly.JavaScript['dgpad_style_increment'] = Blockly.dgpad_style_block_js("setIncrement");
Blockly.JavaScript['dgpad_style_dash'] = Blockly.dgpad_style_block_js("setDash");
Blockly.JavaScript['dgpad_style_nomouse'] = Blockly.dgpad_style_block_js("setNoMouseInside");
Blockly.JavaScript['dgpad_style_opacity'] = Blockly.dgpad_style_block_js("setOpacity");


Blockly.JavaScript['dgpad_style_arrow'] = function(block) {
  var value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
  var value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '"setArrow",[[' + value_w + ',' + value_h + ']]';
  return [code, Blockly.JavaScript.ORDER_NONE];
};