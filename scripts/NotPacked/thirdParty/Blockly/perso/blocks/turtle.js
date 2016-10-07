Blockly.Blocks['turtle_angle_input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldAngle(90), "ANGLE");
        this.setOutput(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['turtle_move'] = {
    init: function() {
        var DIRECTIONS = [
            ["\u2B06 " + $L.blockly.turtle.moveForward, 'moveForward'],
            ["\u2B07 " + $L.blockly.turtle.moveBackward, 'moveBackward']
        ];
        var UNITS = [
            [$L.blockly.turtle.unit_px, "px"],
            [$L.blockly.turtle.unit_un, "un"]
        ];
        this.setColour(180);
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown(UNITS), 'UNITS');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.moveTooltip);
    }
};

Blockly.Blocks['turtle_rotate'] = {
    init: function() {
        var DIRECTIONS = [
            [$L.blockly.turtle.rotate_top, 'rotate_top'],
            [$L.blockly.turtle.rotate_bottom, 'rotate_bottom'],
            [$L.blockly.turtle.rotate_left, 'rotate_left'],
            [$L.blockly.turtle.rotate_right, 'rotate_right']
        ];
        this.setColour(180);
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        // this.appendDummyInput()
        //     .appendField("°");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};


Blockly.Blocks['turtle_turn'] = {
    init: function() {
        var DIRECTIONS = [
            [$L.blockly.turtle.turnLeft, 'turnLeft'],
            [$L.blockly.turtle.turnRight, 'turnRight']

        ];
        this.setColour(180);
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
        // this.appendDummyInput()
        //     .appendField("°");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.turnTooltip);
    }
};

Blockly.Blocks['turtle_fill'] = {
    init: function() {
        this.setColour(180);
        this.appendValueInput('OP')
            .setCheck('Number')
            .appendField($L.blockly.turtle.fill);
        this.appendDummyInput()
            .appendField("%");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};


Blockly.Blocks['turtle_width'] = {
    init: function() {
        var WHAT = [
            [$L.blockly.turtle.setWidth, 'pen'],
            [$L.blockly.turtle.setPointsWidth, 'points']
        ];
        this.setColour(180);
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(WHAT), 'WHAT');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.widthTooltip);
    }
};


Blockly.Blocks['turtle_width_increment'] = {
    init: function() {
        var WHAT = [
            [$L.blockly.turtle.increment_2, 'pen'],
            [$L.blockly.turtle.increment_points_2, 'points']
        ];
        this.appendValueInput("WIDTH")
            .setCheck(null)
            .appendField($L.blockly.turtle.increment_1);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(WHAT), 'WHAT');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};





Blockly.Blocks['turtle_pen'] = {
    init: function() {
        var STATE = [
            ["\u2710 " + $L.blockly.turtle.penUp, 'penUp'],
            ["\u270E " + $L.blockly.turtle.penDown, 'penDown']
        ];
        this.setColour(180);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(STATE), 'PEN');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.penTooltip);
    }
};



// Blockly.Blocks['turtle_colour'] = {
//     init: function() {
//         this.setColour(180);
//         this.appendValueInput('COLOUR')
//             .setCheck('style')
//             .appendField($L.blockly.turtle.setColour);
//         this.setPreviousStatement(true);
//         this.setNextStatement(true);
//         this.setTooltip($L.blockly.turtle.colourTooltip);
//     }
// };

Blockly.Blocks['turtle_colour'] = {
    init: function() {
        var me = this;
        this.getVal = function(_c) {
            var inp = me.getInputTargetBlock(_c).getFieldValue('NUM');
            return (inp === null) ? 0 : parseInt(inp);
        };
        this.fixColorMenu = function() {
            var h = me.getInputTargetBlock('N').getFieldValue('NUM');
            if (h) {
                if (!me.getInput('rgb')) {
                    me.appendDummyInput("rgb")
                        .appendField(new Blockly.FieldColour("#ff0000", function(option) {
                            var i = Blockly.FieldColour.COLOURS.indexOf(option);
                            me.getInputTargetBlock('N').setFieldValue(i + 1, 'NUM');
                        }), "RGB_col");
                }
                // Ne surtout pas utiliser de "me.setFieldValue(c, "RGB_col")"
                // ici, cela enverrait un onchange event catastrophique ! :
                var c = Blockly.FieldColour.COLOURS[(h - 1) % 70];
                me.getField("RGB_col").colour_ = c;
                if (me.getField("RGB_col").borderRect_) {
                    me.getField("RGB_col").borderRect_.style.fill = c;
                }
            } else {
                me.removeInput('rgb');
            }
        };
        this.appendDummyInput()
            .appendField($L.blockly.turtle.setColour);
        this.appendValueInput("N")
            .setCheck("Number");
        this.appendDummyInput("rgb")
            .appendField(new Blockly.FieldColour("#ff0000", function(option) {
                var i = Blockly.FieldColour.COLOURS.indexOf(option);
                me.getInputTargetBlock('N').setFieldValue(i + 1, 'NUM');
            }), "RGB_col");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // this.setOutput(true, "style");
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function(event) {
        this.fixColorMenu()
    }
};

Blockly.Blocks['turtle_colour_increment'] = {
    init: function() {
        this.appendValueInput("COL")
            .setCheck(null)
            .appendField($L.blockly.turtle.increment_col_1);
        this.appendDummyInput()
            .appendField($L.blockly.turtle.increment_col_2);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['turtle_visibility'] = {
    init: function() {
        var STATE = [
            [$L.blockly.turtle.showTurtle, 'showTurtle'],
            [$L.blockly.turtle.hideTurtle, 'hideTurtle']
        ];
        this.setColour(180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(STATE), 'VISIBILITY');
        this.setTooltip($L.blockly.turtle.turtleVisibilityTooltip);
    }
};


Blockly.Blocks['turtle_print'] = {
    init: function() {
        this.setHelpUrl($L.blockly.turtle.printHelpUrl);
        this.setColour(180);
        this.appendValueInput('TEXT')
            .appendField($L.blockly.turtle.print);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.printTooltip);
    }
};


Blockly.Blocks['turtle_font'] = {
    init: function() {
        var FONTLIST = [
            ['Arial', 'Arial'],
            ['Courier New', 'Courier New'],
            ['Georgia', 'Georgia'],
            ['Impact', 'Impact'],
            ['Times New Roman', 'Times New Roman'],
            ['Trebuchet MS', 'Trebuchet MS'],
            ['Verdana', 'Verdana']
        ];
        var STYLE = [
            [$L.blockly.turtle.fontNormal, 'normal'],
            [$L.blockly.turtle.fontItalic, 'italic'],
            [$L.blockly.turtle.fontBold, 'bold']
        ];
        var ALIGN = [
            [$L.blockly.turtle.fontcenter, 'center'],
            [$L.blockly.turtle.fontleft, 'left'],
            [$L.blockly.turtle.fontright, 'right']
        ];
        this.setHelpUrl($L.blockly.turtle.fontHelpUrl);
        this.setColour(180);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(FONTLIST), 'FONT')
            .appendField(new Blockly.FieldNumber(30, 0, Infinity, 1),
                'FONTSIZE')
            .appendField(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE')
            .appendField(new Blockly.FieldDropdown(ALIGN), 'FONTALIGN');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip($L.blockly.turtle.fontTooltip);
    }
};

Blockly.Blocks['turtle_img'] = {
    init: function() {
        this.appendValueInput("url")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField($L.blockly.image_url);
        this.appendValueInput("w")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField($L.blockly.image_w);
        this.appendValueInput("h")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField($L.blockly.image_h);
        this.appendValueInput("z")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField($L.blockly.image_z);
        this.appendValueInput("o")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField($L.blockly.image_o);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['turtle_turn_pt'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .appendField($L.blockly.turtle.rotate_pt);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getName: function(_o) {
        var inp = this.getInputTargetBlock("VALUE");
        if (inp) inp.setFieldValue(_o.getName(), "NAME");
    }
};

Blockly.Blocks['turtle_join_pt'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .appendField($L.blockly.turtle.join_pt);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getName: function(_o) {
        var inp = this.getInputTargetBlock("VALUE");
        if (inp) inp.setFieldValue(_o.getName(), "NAME");
    }
};

Blockly.Blocks['turtle_position'] = {
    init: function() {
        this.appendDummyInput()
            .appendField($L.blockly.turtle.position);
        this.setOutput(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_reset_angles'] = {
    init: function() {
        this.appendDummyInput()
            .appendField($L.blockly.turtle.reset);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['turtle_get'] = {
    init: function() {
        var lists = Blockly.dgpad.getObjectsFromType("list");
        var drop = [];
        for (var i = 0; i < lists.length; i++) {
            var name = lists[i].getVarName();
            if (name.startsWith("blk_turtle_list_")) {
                var elt = name.replace(/^blk_turtle_list_/, "");
                drop.push([elt, elt]);
            }
        }
        if (drop.length === 0) drop.push(["? ", null]);
        this.appendValueInput("NUM")
            .setCheck(null)
            .appendField($L.blockly.turtle.getpos1);
        this.appendDummyInput()
            .appendField($L.blockly.turtle.getpos2)
            .appendField(new Blockly.FieldDropdown(drop), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getName: function(_o) {
        var lists = Blockly.dgpad.getObjectsFromType("list");
        for (var i = 0; i < lists.length; i++) {
            var name = lists[i].getVarName();
            if (name === ("blk_turtle_list_" + _o.getVarName())) {
                this.setFieldValue(_o.getVarName(), "NAME");
                return;
            }
        }
    }
};

Blockly.Blocks['turtle_length'] = {
    init: function() {
        var lists = Blockly.dgpad.getObjectsFromType("list");
        var drop = [];
        for (var i = 0; i < lists.length; i++) {
            var name = lists[i].getVarName();
            if (name.startsWith("blk_turtle_list_")) {
                var elt = name.replace(/^blk_turtle_list_/, "");
                drop.push([elt, elt]);
            }
        }
        if (drop.length === 0) drop.push(["? ", null]);
        this.appendDummyInput()
            .appendField($L.blockly.turtle.getlength)
            .appendField(new Blockly.FieldDropdown(drop), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getName: function(_o) {
        var lists = Blockly.dgpad.getObjectsFromType("list");
        for (var i = 0; i < lists.length; i++) {
            var name = lists[i].getVarName();
            if (name === ("blk_turtle_list_" + _o.getVarName())) {
                this.setFieldValue(_o.getVarName(), "NAME");
                return;
            }
        }
    }
};
