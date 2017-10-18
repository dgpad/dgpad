Blockly.Blocks['dgpad_create_list'] = {
    init: function() {
        this.appendDummyInput()
            .appendField($L.blockly.list_new)
            .appendField(new Blockly.FieldVariable(
                Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    contextMenuType_: 'variables_set',
    customContextMenu: function(options) {
        var option = { enabled: true };
        var name = this.getFieldValue('VAR');
        option.text = this.contextMenuMsg_.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', this.contextMenuType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
    }
};


Blockly.Blocks['dgpad_stop_list'] = {
    init: function() {
        this.appendDummyInput()
            .appendField($L.blockly.stop_list)
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dgpad_get_list'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("[");
        this.appendValueInput("INDEX")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("]");
        this.setOutput(true, null);
        this.setColour(260);
        this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM + '  ' + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace('%1', '#1'));
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dgpad_set_list'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("[");
        this.appendValueInput("INDEX")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("] = ");
        this.appendValueInput("VALUE")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM + '  ' + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace('%1', '#1'));
        this.setHelpUrl('');
    }
};

Blockly.Blocks['dgpad_push'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField($L.blockly.push_add);
        this.appendDummyInput()
            .appendField($L.blockly.push_end)
            .appendField(new Blockly.FieldVariable("item"), "VARNAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};