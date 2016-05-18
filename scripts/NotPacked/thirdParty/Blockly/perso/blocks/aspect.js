Blockly.Blocks['dgpad_style_fix'] = {
    init: function() {
        this.appendDummyInput('obj_name')
            .appendField($L.blockly.turtle.fixaspect_1)
            .appendField(Blockly.dgpad.objectPopup("any"), "OBJECT")
            // .appendField(new Blockly.FieldDropdown([["moi", "OPTIONNAME"], ["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "OBJECT")
            .appendField($L.blockly.turtle.fixaspect_2);
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
                if (!me.getInput('rgb')) {
                    me.appendDummyInput("rgb")
                        .appendField(new Blockly.FieldColour("#ff0000", function(option) {
                            var bigint = parseInt(option.replace(/^#/, ""), 16);
                            var r = (bigint >> 16) & 255;
                            var g = (bigint >> 8) & 255;
                            var b = bigint & 255;
                            me.getInputTargetBlock('R').setFieldValue(r, 'NUM');
                            me.getInputTargetBlock('G').setFieldValue(g, 'NUM');
                            me.getInputTargetBlock('B').setFieldValue(b, 'NUM');

                        }), "RGB_col");
                }
                r = parseInt(r);
                g = parseInt(g);
                b = parseInt(b);
                var c = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                // Ne surtout pas utiliser de "me.setFieldValue(c, "RGB_col")"
                // ici, cela enverrait un onchange event catastrophique ! :
                me.getField("RGB_col").colour_ = c;
                if (me.getField("RGB_col").borderRect_) {
                    me.getField("RGB_col").borderRect_.style.fill = c;
                }
            } else {
                me.removeInput('rgb');
            }
        };

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
                var bigint = parseInt(option.replace(/^#/, ""), 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;
                me.getInputTargetBlock('R').setFieldValue(r, 'NUM');
                me.getInputTargetBlock('G').setFieldValue(g, 'NUM');
                me.getInputTargetBlock('B').setFieldValue(b, 'NUM');

            }), "RGB_col");
        this.setInputsInline(true);
        this.setOutput(true, "style");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function(event) {
        this.fixColorMenu()
    }
};


// Blockly.Blocks['dgpad_style_general'] = {
//     init: function() {
//         this.appendValueInput("NAME")
//             .appendField(new Blockly.FieldDropdown([
//                 ["caché", "setHidden"],
//                 ["taille", "setSize"],
//                 ["calque", "setLayer"],
//                 ["police", "setFontSize"],
//                 ["précision", "setPrecision"],
//                 ["incrément", "setIncrement"],
//                 ["calque", "setLayer"],
//                 ["calque", "setLayer"]
//             ]), "NAME");
//         this.setOutput(true, "style");
//         this.setColour(65);
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };

Blockly.dgpad_style_block = function(_v) {
    return ({
        init: function() {
            this.appendValueInput("NAME")
                .appendField(_v);
            this.setOutput(true, "style");
            this.setColour(65);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    });
}

Blockly.Blocks['dgpad_style_opacity'] = Blockly.dgpad_style_block($L.blockly.turtle.opacity);
Blockly.Blocks['dgpad_style_visibility'] = Blockly.dgpad_style_block($L.blockly.turtle.hidden);
Blockly.Blocks['dgpad_style_size'] = Blockly.dgpad_style_block($L.blockly.turtle.size);
Blockly.Blocks['dgpad_style_layer'] = Blockly.dgpad_style_block($L.blockly.turtle.layer);
Blockly.Blocks['dgpad_style_font'] = Blockly.dgpad_style_block($L.blockly.turtle.font);
Blockly.Blocks['dgpad_style_precision'] = Blockly.dgpad_style_block($L.blockly.turtle.precision);
Blockly.Blocks['dgpad_style_increment'] = Blockly.dgpad_style_block($L.blockly.turtle.increment);
Blockly.Blocks['dgpad_style_dash'] = Blockly.dgpad_style_block($L.blockly.turtle.dash);
Blockly.Blocks['dgpad_style_nomouse'] = Blockly.dgpad_style_block($L.blockly.turtle.inanimate);


Blockly.Blocks['dgpad_style_arrow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField($L.blockly.turtle.arrow);
    this.appendValueInput("w")
        .setCheck(null);
    this.appendValueInput("h")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "style");
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
