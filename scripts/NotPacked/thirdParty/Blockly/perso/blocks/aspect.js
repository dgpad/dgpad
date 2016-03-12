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
