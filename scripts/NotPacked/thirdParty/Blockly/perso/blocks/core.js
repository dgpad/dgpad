


Blockly.Blocks['math_constant'] = {
    init: function() {
        var CONSTANTS = [
            ['\u03c0', 'PI'],
            ['e', 'E'],
            ['i', 'CPLX'],
            ['\u03c6', 'GOLDEN_RATIO'],
            ['sqrt(2)', 'SQRT2'],
            ['sqrt(\u00bd)', 'SQRT1_2'],
            ['\u221e', 'INFINITY']
        ];
        this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(true, 'Number');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(CONSTANTS), 'CONSTANT');
        this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP);
    }
};


Blockly.Blocks['controls_repeatuntil'] = {
    init: function() {
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField($L.blockly.do);
        this.appendValueInput("BOOL")
            .setCheck("Boolean")
            .appendField(new Blockly.FieldDropdown([
                [$L.blockly.while, "while"],
                [$L.blockly.until, "until"]
            ]), "MODE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
