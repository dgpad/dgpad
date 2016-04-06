Blockly.Blocks['dgpad_construction'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(" " + $L.blockly.construction + " :")
            .appendField("        ")
            .appendField("" + $L.blockly.cn_auto + " :")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "auto");
        this.appendStatementInput("CONTENT");
        this.setColour(330);
        this.setTooltip('');
        this.setDeletable(false);
    }
};

Blockly.Blocks['dgpad_anglebiss'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/anglebiss.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField("Bissectrice de")
            .appendField(new Blockly.FieldTextInput("A"), "a")
            .appendField(new Blockly.FieldTextInput("B"), "b")
            .appendField(new Blockly.FieldTextInput("C"), "c");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

Blockly.Blocks['dgpad_plumb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/plumb.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField("Perpendiculaire à")
            .appendField(new Blockly.FieldTextInput("(A B)"), "a")
            .appendField("passant par")
            .appendField(new Blockly.FieldTextInput("C"), "c");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

Blockly.Blocks['dgpad_segment'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/segment.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField("Segment [")
            .appendField(new Blockly.FieldTextInput("A"), "a")
            .appendField(new Blockly.FieldTextInput("B"), "b")
            .appendField("]");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['dgpad_droite'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/line.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField("Droite(")
            .appendField(new Blockly.FieldTextInput("A"), "a")
            .appendField(new Blockly.FieldTextInput("B"), "b")
            .appendField(")");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['dgpad_circle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/line.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField("Cercle")
            .appendField(new Blockly.FieldTextInput("C1"), "a")
            .appendField("de centre")
            .appendField(new Blockly.FieldTextInput("B"), "b")
            .appendField("passant par")
            .appendField(new Blockly.FieldTextInput("C"), "c");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

Blockly.Blocks['dgpad_point'] = {
    // firstadd: true,
    init: function() {
        var props = [
            [$L.blockly.pt_base, "base"],
            [$L.blockly.pt_on, "pointon"],
            [$L.blockly.pt_inter, "intersect"],
            [$L.blockly.pt_coords, "coords"],
            [$L.blockly.pt_exp, "exp"]
        ];
        var dropdown = new Blockly.FieldDropdown(props, function(option) {
            this.sourceBlock_.updateShape_(option);
        });
        this.blocktype = "point";
        var bnds = Blockly.dgpad.getBounds();
        var right = bnds.l + bnds.w;
        this.cx = Blockly.dgpad.CN.coordsSystem.x(right) + Math.random() * Blockly.dgpad.CN.coordsSystem.l((Blockly.dgpad.ZC.getWidth() - right));
        this.cx = Math.round(this.cx * 10) / 10;
        this.cy = Blockly.dgpad.CN.coordsSystem.y(0) - Math.random() * Blockly.dgpad.CN.coordsSystem.l(Blockly.dgpad.ZC.getHeight());
        this.cy = Math.round(this.cy * 10) / 10;
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tools/point.svg", 25, 25, "*"))
            .appendField(new Blockly.FieldCheckbox("TRUE"), "visible")
            .appendField(new Blockly.FieldTextInput(Blockly.dgpad.getName()), "name")
            .appendField(" : " + $L.blockly.pt_type)
            .appendField(dropdown, "behavior");
        this.setPreviousStatement(true, "dgpad");
        this.setNextStatement(true, "dgpad");
        this.setInputsInline(true);
        this.setColour(290);
        this.setTooltip('');
    },
    dragto: function(_x, _y) {
        this.cx = Blockly.dgpad.CN.coordsSystem.x(_x);
        this.cy = Blockly.dgpad.CN.coordsSystem.y(_y);
        // console.log(this.name()+" : x="+this.cx+" y="+this.cy);
    },
    onselect: function() {

    },
    onchange: function() {
        if (this.isInConstruction()) {
            var obj = Blockly.dgpad.CN.find(this.name());
            if (obj) {
                // obj.setBlockObj(this);
            };
            if (this.firstadd) {
                Blockly.dgpad.addName(this.name());
                Blockly.dgpad.refresh();
                this.firstadd = false;
            }
        }
    },
    // mutationToDom: function() {
    //     var container = document.createElement('mutation');
    //     var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    //     container.setAttribute('divisor_input', divisorInput);
    //     return container;
    // },
    // domToMutation: function(xmlElement) {
    //     var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    //     this.updateShape_(divisorInput);
    // },
    updateShape_: function(tpe) {
        if (this.getInput('obj')) {
            this.removeInput('obj');
        }
        this.blocktype = tpe;
        switch (tpe) {
            case "pointon":
                this.appendDummyInput('obj')
                    .appendField(" ")
                    .appendField(new Blockly.FieldTextInput("C1"), "obj1");
                break;
            case "intersect":
                this.appendDummyInput('obj')
                    .appendField(" ")
                    .appendField(new Blockly.FieldTextInput("d"), "obj1")
                    .appendField(" " + $L.blockly.pt_andof + " ")
                    .appendField(new Blockly.FieldTextInput("z"), "obj2");
                break;
            case "coords":
                this.appendDummyInput('obj')
                    .appendField("x=")
                    .appendField(new Blockly.FieldTextInput(this.cx), "obj1")
                    .appendField(" " + $L.blockly.pt_and + " y=")
                    .appendField(new Blockly.FieldTextInput(this.cy), "obj2");
                break;
            case "exp":
                this.appendDummyInput('obj')
                    .appendField(" ")
                    .appendField(new Blockly.FieldTextInput(" "), "obj1");
                break;
        }
    }
};
