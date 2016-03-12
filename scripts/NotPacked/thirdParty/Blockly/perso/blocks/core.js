Blockly.Blocks['math_constant'] = {
  init: function() {
    var CONSTANTS =
        [['\u03c0', 'PI'],
         ['e', 'E'],
         ['i', 'CPLX'],
         ['\u03c6', 'GOLDEN_RATIO'],
         ['sqrt(2)', 'SQRT2'],
         ['sqrt(\u00bd)', 'SQRT1_2'],
         ['\u221e', 'INFINITY']];
    this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, 'Number');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(CONSTANTS), 'CONSTANT');
    this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP);
  }
};