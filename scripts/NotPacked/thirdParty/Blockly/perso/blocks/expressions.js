Blockly.Blocks['dgpad_set_object'] = {
    getdropdown: function(_t) {
        var props = Blockly.dgpad.CN.getObjectsFromType(_t);
        var tab = [];
        for (var i = 0; i < props.length; i++) {
            if (props[i].getName() !== Blockly.getObj().getName())
                tab.push([props[i].getName(), props[i].getName()]);
        };
        if (tab.length === 0) tab.push(["?", null]);
        return (new Blockly.FieldDropdown(tab));
    },
    init: function() {
        var types = [];
        for (key in $L.blockly.o2) {
            types.push([$L.blockly.o2[key], key])
        }
        // Avoid blockly to automatically transform dropdown menu :
        types[0][0] = " " + types[0][0];
        // console.log(types);
        var drop = new Blockly.FieldDropdown(types, function(option) {
            this.sourceBlock_.updateShape_(option);
        });
        this.appendDummyInput()
            .appendField($L.blockly.fixvalue);
        this.appendDummyInput('obj_type')
            .appendField(drop, "TYPE");
        this.appendDummyInput()
            .appendField(" ");
        this.appendDummyInput('obj_name')
            .appendField(this.getdropdown("expression"), "NAME");
        this.appendValueInput('obj_val')
            .appendField("à");
        this.setInputsInline(true);
        // this.setOutput(true, null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    updateShape_: function(tpe) {
        if (this.getInput('obj_name')) {
            this.removeInput('obj_name');
        };
        if (this.getInput('obj_val')) {
            this.removeInput('obj_val');
        };
        try {
            this.appendDummyInput('obj_name')
                .appendField(this.getdropdown(tpe), "NAME");
            this.appendValueInput('obj_val')
                .appendField("à");
        } catch (e) {}
    },
    getName: function(_o) {
        this.getInput('obj_type').fieldRow[0].setValue(_o.getCode());
        this.updateShape_(_o.getCode());
        this.getInput('obj_name').fieldRow[0].setValue(_o.getName());
        console.log(_o.getName());
    }
};



Blockly.Blocks['dgpad_get_object'] = {
    getdropdown: function(_t) {
        var props = Blockly.dgpad.CN.getObjectsFromType(_t);
        var tab = [];
        for (var i = 0; i < props.length; i++) {
            if (props[i].getName() !== Blockly.getObj().getName())
                tab.push([props[i].getName(), props[i].getName()]);
        };
        if (tab.length === 0) tab.push(["? ", null]);
        return (new Blockly.FieldDropdown(tab));
    },
    init: function() {
        var types = [];
        for (key in $L.blockly.o) {
            types.push([$L.blockly.o[key], key])
        }
        // Avoid blockly to automatically transform dropdown menu :
        types[0][0] = " " + types[0][0];
        // console.log(types);
        var drop = new Blockly.FieldDropdown(types, function(option) {
            this.sourceBlock_.updateShape_(option);
        });
        this.appendDummyInput()
            .appendField($L.blockly.value);
        this.appendDummyInput('obj_type')
            .appendField(drop, "TYPE");
        this.appendDummyInput()
            .appendField(" ");
        this.appendDummyInput('obj_name')
            .appendField(this.getdropdown("expression"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    updateShape_: function(tpe) {
        if (this.getInput('obj_name')) {
            this.removeInput('obj_name');
        };
        try {
            this.appendDummyInput('obj_name')
                .appendField(this.getdropdown(tpe), "NAME");
        } catch (e) {}
    },
    getName: function(_o) {
        this.getInput('obj_type').fieldRow[0].setValue(_o.getCode());
        this.updateShape_(_o.getCode());
        this.getInput('obj_name').fieldRow[0].setValue(_o.getName());
        // console.log(_o.getName());
    }
};

Blockly.Blocks['dgpad_expression_input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(" Expression")
            .appendField(new Blockly.FieldTextInput("(1+sqrt(5))/2"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_return'] = {
    init: function() {
        this.appendValueInput("NAME")
            .appendField($L.blockly.var_return);
        this.setPreviousStatement(true);
        // this.setInputsInline(true);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_print'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField($L.blockly.print);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[$L.blockly.withlf, "a"], [$L.blockly.withoutlf, "b"]]), "NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
