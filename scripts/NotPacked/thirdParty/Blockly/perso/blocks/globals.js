Blockly.getGlobalDropdown = function() {
    var nmes = Blockly.Globals.NAMES();
    var drop = [];
    drop.push([Blockly.Msg.VARIABLES_DEFAULT_NAME, Blockly.Msg.VARIABLES_DEFAULT_NAME]);
    for (var i = 0; i < nmes.length; i++) {
        drop.push([nmes[i], nmes[i]]);
    };
    drop.push([Blockly.Msg.RENAME_VARIABLE, Blockly.Msg.RENAME_VARIABLE]);
    drop.push([Blockly.Msg.NEW_VARIABLE, Blockly.Msg.NEW_VARIABLE]);
    return drop;
}

Blockly.globalDropdownChange = function(source, text) {
    var me = source;
    var renameCallback = function(_oldvar, _newvar) {
        Blockly.Globals.RENAME(_oldvar, _newvar);
        me.menuGenerator_ = Blockly.getGlobalDropdown();
        me.setValue(_newvar);
    };
    if (text == Blockly.Msg.RENAME_VARIABLE) {
        var oldVar = me.getText();
        if (oldVar == Blockly.Msg.VARIABLES_DEFAULT_NAME) {
            $U.prompt(Blockly.Msg.NEW_VARIABLE_TITLE, '', "text", renameCallback);
        } else {
            $U.prompt(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar), oldVar, "text", renameCallback);
        }
        return null;
    } else if (text == Blockly.Msg.NEW_VARIABLE) {
        $U.prompt(Blockly.Msg.NEW_VARIABLE_TITLE, '', "text", renameCallback);
        return null;
    }
    return undefined;
};



Blockly.Blocks['dgpad_global_get'] = {
    init: function() {
        var menu = new Blockly.FieldDropdown(Blockly.getGlobalDropdown(), function(option) {
            Blockly.globalDropdownChange(menu, option);
        });
        this.appendDummyInput()
            .appendField(menu, "VAR");
        this.setOutput(true, null);
        this.setColour(200);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};



Blockly.Blocks['dgpad_global_set'] = {
    init: function() {
        var menu = new Blockly.FieldDropdown(Blockly.getGlobalDropdown(), function(option) {
            Blockly.globalDropdownChange(menu, option);
        });
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField($L.blockly.globales_fix)
            .appendField(menu, "VAR")
            .appendField($L.blockly.globales_to);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

// Blockly.Blocks['dgpad_global_inc'] = {
//     init: function() {
//         var menu = new Blockly.FieldDropdown(Blockly.getGlobalDropdown(), function(option) {
//             Blockly.globalDropdownChange(menu, option);
//         });
//         this.appendValueInput("NAME")
//             .setCheck(null)
//             .appendField($L.blockly.globales_increment)
//             .appendField(menu, "VAR")
//             .appendField($L.blockly.globales_by);
//         this.setInputsInline(false);
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(200);
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };


Blockly.Blocks['dgpad_global_inc'] = {
    init: function() {
        this.jsonInit({
            "message0": Blockly.Msg.MATH_CHANGE_TITLE,
            "args0": [{
                "type": "field_dropdown",
                "name": "VAR",
                "options": Blockly.getGlobalDropdown()
            }, {
                "type": "input_value",
                "name": "NAME",
                "check": "Number"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 200,
            "helpUrl": Blockly.Msg.MATH_CHANGE_HELPURL
        });
        var drop = this.getField('VAR');
        drop.setValidator(function(option) {
            Blockly.globalDropdownChange(drop, option);
        });
    }
};
