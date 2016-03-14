Blockly.Blocks['dgpad_style_fix'] = {
    init: function() {
        this.appendDummyInput('obj_name')
            .appendField("fixer l'aspect de")
            .appendField(Blockly.dgpad.objectPopup("any"), "OBJECT")
            // .appendField(new Blockly.FieldDropdown([["moi", "OPTIONNAME"], ["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "OBJECT")
            .appendField("à");
        this.appendValueInput("NAME")
            .setCheck("style");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getName: function(_o) {
        this.getInput('obj_name').fieldRow[1].setValue(_o.getName());
    }
};

Blockly.Blocks['dgpad_style_color'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("couleur")
            .appendField(new Blockly.FieldColour("#ff0000"), "color");
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_style_color_rgb'] = {
    init: function() {
        var me = this;
        this.getVal = function(_c) {
            var inp = me.getInputTargetBlock(_c).getFieldValue('NUM');
            return (inp === null) ? 0 : parseInt(inp);
        };
        this.fixColorMenu = function() {
            var r = me.getInputTargetBlock('R').getFieldValue('NUM');
            var g = me.getInputTargetBlock('G').getFieldValue('NUM');
            var b = me.getInputTargetBlock('B').getFieldValue('NUM');
            if (r && g && b) {
                if (!this.getInput('rgb')) {
                    this.appendDummyInput("rgb")
                        .appendField(new Blockly.FieldColour("#ff0000", function(option) {
                            var bigint = parseInt(option.replace(/^#/,""), 16);
                            var r = (bigint >> 16) & 255;
                            var g = (bigint >> 8) & 255;
                            var b = bigint & 255;
                            me.getInputTargetBlock('R').setFieldValue(r, 'NUM');
                            me.getInputTargetBlock('G').setFieldValue(g, 'NUM');
                            me.getInputTargetBlock('B').setFieldValue(b, 'NUM');
                            me.frompopup = true;
                        }), "RGB_col");
                }
                r = parseInt(r);
                g = parseInt(g);
                b = parseInt(b);
                var c = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                this.setFieldValue(c, "RGB_col");
                this.frompopup = true;
            } else {
                this.removeInput('rgb');
            }
        };
        this.frompopup = false;
        this.appendDummyInput()
            .appendField("RGB");
        this.appendValueInput("R")
            .setCheck("Number");
        this.appendValueInput("G")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number");
        this.appendDummyInput("rgb")
            .appendField(new Blockly.FieldColour("#ff0000", function(option) {
                var bigint = parseInt(option.replace(/^#/,""), 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;
                me.getInputTargetBlock('R').setFieldValue(r, 'NUM');
                me.getInputTargetBlock('G').setFieldValue(g, 'NUM');
                me.getInputTargetBlock('B').setFieldValue(b, 'NUM');
                me.frompopup = true;
            }), "RGB_col");
        this.setInputsInline(true);
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function(event) {
        if (this.frompopup) {
            this.frompopup = false;
            return;
        }
        this.fixColorMenu()
    }
};

Blockly.Blocks['dgpad_style_visibility'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["caché", "1"],
                ["complètement caché", "2"],
                ["visible", "0"]
            ]), "NAME");
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dgpad_style_hidden'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("caché :");
        this.appendValueInput("H")
            .setCheck("Boolean");
        this.setInputsInline(true);
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dgpad_style_size'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("taille")
            .appendField(new Blockly.FieldTextInput("6"), "size");
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_style_layer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("calque")
            .appendField(new Blockly.FieldDropdown([
                ["0", "0"],
                ["-8", "-8"],
                ["-7", "-7"],
                ["-6", "-6"],
                ["-5", "-5"],
                ["-4", "-4"],
                ["-3", "-3"],
                ["-2", "-2"],
                ["-1", "-1"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"]
            ]), "NAME");
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
