// Blockly.JavaScript.scrub_ = function(block, code) {
//   var commentCode = '';
//   // Only collect comments for blocks that aren't inline.
//   if (!block.outputConnection || !block.outputConnection.targetConnection) {
//     // Collect comment for this block.
//     var comment = block.getCommentText();
//     if (comment) {
//       commentCode += Blockly.JavaScript.prefixLines(comment, '// ') + '\n';
//     }
//     // Collect comments for all value arguments.
//     // Don't collect comments for nested statements.
//     for (var x = 0; x < block.inputList.length; x++) {
//       if (block.inputList[x].type == Blockly.INPUT_VALUE) {
//         var childBlock = block.inputList[x].connection.targetBlock();
//         if (childBlock) {
//           var comment = Blockly.JavaScript.allNestedComments(childBlock);
//           if (comment) {
//             commentCode += Blockly.JavaScript.prefixLines(comment, '// ');
//           }
//         }
//       }
//     }
//   }
//   var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
//   var nextCode = Blockly.JavaScript.blockToCode(nextBlock);
//   console.log(code);
//   return commentCode + code + nextCode;
// };

// Blockly.Generator.prototype.blockToCode = function(block) {
//     if (!block) {
//         return '';
//     }
//     if (block.disabled) {
//         // Skip past this block if it is disabled.
//         return this.blockToCode(block.getNextBlock());
//     }

//     var func = this[block.type];
//     goog.asserts.assertFunction(func,
//         'Language "%s" does not know how to generate code for block type "%s".',
//         this.name_, block.type);
//     // First argument to func.call is the value of 'this' in the generator.
//     // Prior to 24 September 2013 'this' was the only way to access the block.
//     // The current prefered method of accessing the block is through the second
//     // argument to func.call, which becomes the first parameter to the generator.
//     var code = func.call(block, block);

//     // if (!goog.isArray(code)) {console.log(code)};


//     if (goog.isArray(code)) {
//         // Value blocks return tuples of code and operator order.
//         goog.asserts.assert(block.outputConnection,
//             'Expecting string from statement block "%s".', block.type);
//         // console.log("array="+code);
//         return [this.scrub_(block, code[0]), code[1]];
//     } else if (goog.isString(code)) {
//         if (this.STATEMENT_PREFIX) {
//             code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\'') +
//                 code;
//         }
//         // console.log("string="+code);
//         return this.scrub_(block, code);
//     } else if (code === null) {
//         // Block has handled code generation itself.
//         return '';
//     } else {
//         goog.asserts.fail('Invalid code generated: %s', code);
//     }
// };

// Blockly.Generator.prototype.workspaceToCode = function(workspace) {
//     if (!workspace) {
//         // Backwards compatability from before there could be multiple workspaces.
//         console.warn('No workspace specified in workspaceToCode call.  Guessing.');
//         workspace = Blockly.getMainWorkspace();
//     }
//     var code = [];
//     this.init(workspace);
//     var blocks = workspace.getTopBlocks(true);
//     for (var x = 0, block; block = blocks[x]; x++) {
//         var line = this.blockToCode(block);
//         if (goog.isArray(line)) {
//             // Value blocks return tuples of code and operator order.
//             // Top-level blocks don't care about operator order.
//             line = line[0];
//         } else console.log(line);
//         if (line) {
//             if (block.outputConnection && this.scrubNakedValue) {
//                 // This block is a naked value.  Ask the language's code generator if
//                 // it wants to append a semicolon, or something.
//                 line = this.scrubNakedValue(line);
//             }
//             code.push(line);
//         }
//         // console.log("*****");
//         // console.log(line);
//     }
//     // console.log(code);
//     code = code.join('\n'); // Blank line between each section.
//     code = this.finish(code);
//     // Final scrubbing of whitespace.
//     code = code.replace(/^\s+\n/, '');
//     code = code.replace(/\n\s+$/, '\n');
//     code = code.replace(/[ \t]+\n/g, '\n');
//     return code;
// };


// Blockly.Blocks['procedures_defnoreturn'].init = function() {
//     var nameField = new Blockly.FieldTextInput(
//         Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
//         Blockly.Procedures.rename);
//     nameField.setSpellcheck(false);
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
//         .appendField(nameField, 'NAME')
//         .appendField('', 'PARAMS');
//     this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
//     if (Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
//         this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
//     }
//     this.setColour(Blockly.Blocks.procedures.HUE);
//     this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
//     this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
//     this.arguments_ = [];
//     this.setStatements_(true);
//     this.statementConnection_ = null;
// }

// Blockly.Blocks['procedures_defnoreturn'].setStatements_ = function(hasStatements) {
//     if (this.hasStatements_ === hasStatements) {
//         return;
//     }
//     if (hasStatements) {


//         this.appendStatementInput('STACK')
//             .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
//         this.appendDummyInput('GLOBAL')
//             .appendField("global")
//             .appendField(new Blockly.FieldCheckbox("TRUE"), "GLOB");
//         if (this.getInput('RETURN')) {
//             this.moveInputBefore('STACK', 'RETURN');
//             this.moveInputBefore('GLOBAL', 'RETURN');
//         }


//     } else {
//         this.removeInput('STACK', true);
//     }
//     this.hasStatements_ = hasStatements;
// }

// Blockly.Blocks['procedures_defreturn'].setStatements_ = Blockly.Blocks['procedures_defnoreturn'].setStatements_;


// Blockly.Procedures.allProcedures = function(root) {
//   var blocks = root.getAllBlocks();
//   var proceduresReturn = [];
//   var proceduresNoReturn = [];
//   for (var i = 0; i < blocks.length; i++) {
//     if (blocks[i].getProcedureDef) {
//       var tuple = blocks[i].getProcedureDef();
//       if (tuple) {
//         if (tuple[2]) {
//           proceduresReturn.push(tuple);
//         } else {
//           proceduresNoReturn.push(tuple);
//         }
//       }
//     }
//   }
//   // proceduresNoReturn.push(["blabla",["aa","bb"],false]);
//   proceduresNoReturn.sort(Blockly.Procedures.procTupleComparator_);
//   proceduresReturn.sort(Blockly.Procedures.procTupleComparator_);
//   console.log(proceduresNoReturn);
//   return [proceduresNoReturn, proceduresReturn];
// };


Blockly.ContextMenu.origin_show = Blockly.ContextMenu.show;


Blockly.ContextMenu.show = function(e, options, rtl) {
    options.unshift({
        text: $L.blockly.paste,
        enabled: true,
        callback: Blockly.custom_menu_paste
    });
    // Si on a cliqué-droit sur le background ;
    if (e.target.className.baseVal === "blocklyMainBackground") {
        options.unshift({
            text: $L.blockly.copyall,
            enabled: true,
            callback: Blockly.custom_menu_copyAll
        });
        options.push({
            text: $L.blockly.displaySource,
            enabled: true,
            callback: Blockly.custom_menu_printSource
        });
    } else {
        options.unshift({
            text: $L.blockly.copyselected,
            enabled: true,
            callback: Blockly.custom_menu_copySel
        });
    };
    Blockly.ContextMenu.origin_show(e, options, rtl);
}


Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput) {
    var me = this;
    this.workspace_ = this.sourceBlock_.workspace;
    var quietInput = opt_quietInput || false;
    var inputCallback = function(_old, _new) {
        if (me.sourceBlock_ && me.validator_) {
            var override = me.validator_(_new);
            if (override !== undefined) {
                _new = override;
            }
        }
        me.setValue(_new);
    };
    if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
            goog.userAgent.IPAD)) {
        $U.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_, "number", inputCallback);
        return;
    }
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
    var div = Blockly.WidgetDiv.DIV;
    // Create the input.
    var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
    htmlInput.setAttribute('spellcheck', this.spellcheck_);
    var fontSize =
        (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
    div.style.fontSize = fontSize;
    htmlInput.style.fontSize = fontSize;
    /** @type {!HTMLInputElement} */
    Blockly.FieldTextInput.htmlInput_ = htmlInput;
    div.appendChild(htmlInput);

    htmlInput.value = htmlInput.defaultValue = this.text_;
    htmlInput.oldValue_ = null;
    this.validate_();
    this.resizeEditor_();
    if (!quietInput) {
        htmlInput.focus();
        htmlInput.select();
    }

    // Bind to keydown -- trap Enter without IME and Esc to hide.
    htmlInput.onKeyDownWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
    // Bind to keyup -- trap Enter; resize after every keystroke.
    htmlInput.onKeyUpWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
    // Bind to keyPress -- repeatedly resize when holding down a key.
    htmlInput.onKeyPressWrapper_ =
        Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
    htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
    this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};


Blockly.FieldVariable.dropdownChange = function(text) {
    var me = this;
    var renameCallback = function(_oldvar, _newvar) {
        var workspace = me.sourceBlock_.workspace;
        Blockly.Variables.renameVariable(_oldvar, _newvar, workspace);
        // If it's a new variable name :
        if (_oldvar === '') me.setValue(_newvar);
    };

    if (text == Blockly.Msg.RENAME_VARIABLE) {
        var oldVar = this.getText();
        $U.prompt(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar), oldVar, "text", renameCallback);
        return null;
    } else if (text == Blockly.Msg.NEW_VARIABLE) {
        $U.prompt(Blockly.Msg.NEW_VARIABLE_TITLE, '', "text", renameCallback);
        return null;
    }
    return undefined;
};
