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

// if ($U.lang() === "FR") {
//     Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER = "attendre un nombre avec";
//     Blockly.Msg.TEXT_PROMPT_TYPE_TEXT = "attendre un texte avec";
// }

Blockly.Blocks['number_prompt'] = {
    /**
     * Block for prompt function (external message).
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour(20);
        this.appendValueInput('TEXT')
            .appendField($L.blockly.waitfor);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['text_alert'] = {
    /**
     * Block for prompt function (external message).
     * @this Blockly.Block
     */
    init: function() {
        // this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.appendValueInput('TEXT')
            .appendField($L.blockly.displayalert);
        // this.setOutput(true, 'Number');
    }
};


// Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER

// Blockly.Blocks['text_prompt_ext'] = {
//     /**
//      * Block for prompt function (external message).
//      * @this Blockly.Block
//      */
//     init: function() {
//         var TYPES = [
//             [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER'],
//             [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT']
//         ];
//         this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
//         this.setColour(Blockly.Blocks.math.HUE);
//         // Assign 'this' to a variable for use in the closures below.
//         var thisBlock = this;
//         var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
//             thisBlock.updateType_(newOp);
//         });
//         this.appendValueInput('TEXT')
//             .appendField(dropdown, 'TYPE');
//         this.setOutput(true, 'String');
//         this.setTooltip(function() {
//             return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
//                 Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
//                 Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
//         });
//     },
//     /**
//      * Modify this block to have the correct output type.
//      * @param {string} newOp Either 'TEXT' or 'NUMBER'.
//      * @private
//      * @this Blockly.Block
//      */
//     updateType_: function(newOp) {
//         this.outputConnection.setCheck(newOp == 'NUMBER' ? 'Number' : 'String');
//     },
//     /**
//      * Create XML to represent the output type.
//      * @return {!Element} XML storage element.
//      * @this Blockly.Block
//      */
//     mutationToDom: function() {
//         var container = document.createElement('mutation');
//         container.setAttribute('type', this.getFieldValue('TYPE'));
//         return container;
//     },
//     /**
//      * Parse XML to restore the output type.
//      * @param {!Element} xmlElement XML storage element.
//      * @this Blockly.Block
//      */
//     domToMutation: function(xmlElement) {
//         this.updateType_(xmlElement.getAttribute('type'));
//     }
// };
