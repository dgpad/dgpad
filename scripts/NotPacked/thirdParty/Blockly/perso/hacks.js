Blockly.ContextMenu.origin_show = Blockly.ContextMenu.show;


Blockly.WorkspaceSvg.prototype.preloadAudio_ = function() {
    for (var name in this.SOUNDS_) {
        var sound = this.SOUNDS_[name];
        sound.volume = .01;
        sound.play();
        // this trick to avoid an error message in google-chrome :
        setTimeout(function() {
            sound.pause();
        }, 100);
        // iOS can only process one sound at a time.  Trying to load more than one
        // corrupts the earlier ones.  Just load one and leave the others uncached.
        if (goog.userAgent.IPAD || goog.userAgent.IPHONE) {
            break;
        }
    }
};


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
            text: $L.blockly.saveSVG,
            enabled: true,
            callback: Blockly.custom_menu_print
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
    // console.log(this.sourceBlock_.type);
    if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
            goog.userAgent.IPAD)) {
        var tpe = (this.sourceBlock_.type === "math_number") ? "number" : "text";
        $U.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_, tpe, inputCallback);
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



Blockly.FieldVariable.prototype.classValidator = function(text) {
    var me = this;
    var renameCallback = function(_oldvar, _newvar) {
        var workspace = me.sourceBlock_.workspace;
        workspace.renameVariable(oldVar, _newvar);
        if (_oldvar === '') me.setValue(_newvar);
    };
    var workspace = this.sourceBlock_.workspace;
    if (text == Blockly.Msg.RENAME_VARIABLE) {
        var oldVar = this.getText();
        Blockly.hideChaff();
        $U.prompt(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar), oldVar, "text", renameCallback);
        return null;
    } else if (text == Blockly.Msg.DELETE_VARIABLE.replace('%1',
            this.getText())) {
        workspace.deleteVariable(this.getText());
        return null;
    }
    return undefined;
};


Blockly.Variables.createVariable = function(workspace) {
    var createCallback = function(_oldvar, _newvar) {
        if (_newvar) {
            if (workspace.variableIndexOf(_newvar) != -1) {
                window.alert(Blockly.Msg.VARIABLE_ALREADY_EXISTS.replace('%1',
                    _newvar.toLowerCase()));
            } else {
                workspace.createVariable(_newvar);
            }
        }
    };
    $U.prompt(Blockly.Msg.NEW_VARIABLE_TITLE, "", "text", createCallback);
};




Blockly.Flyout.prototype.show = function(xmlList) {
    this.hide();
    this.clearOldBlocks_();

    if (xmlList == Blockly.Variables.NAME_TYPE) {
        // Special category for variables.
        xmlList =
            Blockly.Variables.flyoutCategory(this.workspace_.targetWorkspace);
    } else if (xmlList == Blockly.Procedures.NAME_TYPE) {
        // Special category for procedures.
        xmlList =
            Blockly.Procedures.flyoutCategory(this.workspace_.targetWorkspace);
    } else if (xmlList == Blockly.Globals.NAME_TYPE) {
        // Special category for procedures.
        xmlList =
            Blockly.Globals.flyoutCategory(this.workspace_.targetWorkspace);
    }

    this.svgGroup_.style.display = 'block';
    // Create the blocks to be shown in this flyout.
    var contents = [];
    var gaps = [];
    this.permanentlyDisabled_.length = 0;
    for (var i = 0, xml; xml = xmlList[i]; i++) {
        if (xml.tagName) {
            var tagName = xml.tagName.toUpperCase();
            var default_gap = this.horizontalLayout_ ? this.GAP_X : this.GAP_Y;
            if (tagName == 'BLOCK') {
                var curBlock = Blockly.Xml.domToBlock(xml, this.workspace_);
                if (curBlock.disabled) {
                    // Record blocks that were initially disabled.
                    // Do not enable these blocks as a result of capacity filtering.
                    this.permanentlyDisabled_.push(curBlock);
                }
                contents.push({ type: 'block', block: curBlock });
                var gap = parseInt(xml.getAttribute('gap'), 10);
                gaps.push(isNaN(gap) ? default_gap : gap);
            } else if (xml.tagName.toUpperCase() == 'SEP') {
                // Change the gap between two blocks.
                // <sep gap="36"></sep>
                // The default gap is 24, can be set larger or smaller.
                // This overwrites the gap attribute on the previous block.
                // Note that a deprecated method is to add a gap to a block.
                // <block type="math_arithmetic" gap="8"></block>
                var newGap = parseInt(xml.getAttribute('gap'), 10);
                // Ignore gaps before the first block.
                if (!isNaN(newGap) && gaps.length > 0) {
                    gaps[gaps.length - 1] = newGap;
                } else {
                    gaps.push(default_gap);
                }
            } else if (tagName == 'BUTTON') {
                var label = xml.getAttribute('text');
                var curButton = new Blockly.FlyoutButton(this.workspace_,
                    this.targetWorkspace_, label);
                contents.push({ type: 'button', button: curButton });
                gaps.push(default_gap);
            }
        }
    }

    this.layout_(contents, gaps);

    // IE 11 is an incompetent browser that fails to fire mouseout events.
    // When the mouse is over the background, deselect all blocks.
    var deselectAll = function() {
        var topBlocks = this.workspace_.getTopBlocks(false);
        for (var i = 0, block; block = topBlocks[i]; i++) {
            block.removeSelect();
        }
    };

    this.listeners_.push(Blockly.bindEvent_(this.svgBackground_, 'mouseover',
        this, deselectAll));

    if (this.horizontalLayout_) {
        this.height_ = 0;
    } else {
        this.width_ = 0;
    }
    this.reflow();

    this.filterForCapacity_();

    // Correctly position the flyout's scrollbar when it opens.
    this.position();

    this.reflowWrapper_ = this.reflow.bind(this);
    this.workspace_.addChangeListener(this.reflowWrapper_);
};



// Blockly.Flyout.prototype.show = function(xmlList) {
//     this.hide();
//     // Delete any blocks from a previous showing.
//     var blocks = this.workspace_.getTopBlocks(false);
//     for (var i = 0, block; block = blocks[i]; i++) {
//         if (block.workspace == this.workspace_) {
//             block.dispose(false, false);
//         }
//     }
//     // Delete any background buttons from a previous showing.
//     for (var i = 0, rect; rect = this.buttons_[i]; i++) {
//         goog.dom.removeNode(rect);
//     }
//     this.buttons_.length = 0;

//     // console.log(xmlList);

//     if (xmlList == Blockly.Variables.NAME_TYPE) {
//         // Special category for variables.
//         xmlList =
//             Blockly.Variables.flyoutCategory(this.workspace_.targetWorkspace);
//     } else if (xmlList == Blockly.Procedures.NAME_TYPE) {
//         // Special category for procedures.
//         xmlList =
//             Blockly.Procedures.flyoutCategory(this.workspace_.targetWorkspace);
//     } else if (xmlList == Blockly.Globals.NAME_TYPE) {
//         // Special category for procedures.
//         xmlList =
//             Blockly.Globals.flyoutCategory(this.workspace_.targetWorkspace);
//     }

//     var margin = this.CORNER_RADIUS;
//     this.svgGroup_.style.display = 'block';
//     // Create the blocks to be shown in this flyout.
//     var blocks = [];
//     var gaps = [];
//     this.permanentlyDisabled_.length = 0;
//     for (var i = 0, xml; xml = xmlList[i]; i++) {
//         if (xml.tagName && xml.tagName.toUpperCase() == 'BLOCK') {
//             var block = Blockly.Xml.domToBlock(this.workspace_, xml);
//             if (block.disabled) {
//                 // Record blocks that were initially disabled.
//                 // Do not enable these blocks as a result of capacity filtering.
//                 this.permanentlyDisabled_.push(block);
//             }
//             blocks.push(block);
//             var gap = parseInt(xml.getAttribute('gap'), 10);
//             gaps.push(isNaN(gap) ? margin * 3 : gap);
//         }
//     }

//     // Lay out the blocks vertically.
//     var cursorY = margin;
//     for (var i = 0, block; block = blocks[i]; i++) {
//         var allBlocks = block.getDescendants();
//         for (var j = 0, child; child = allBlocks[j]; j++) {
//             // Mark blocks as being inside a flyout.  This is used to detect and
//             // prevent the closure of the flyout if the user right-clicks on such a
//             // block.
//             child.isInFlyout = true;
//         }
//         block.render();
//         var root = block.getSvgRoot();
//         var blockHW = block.getHeightWidth();
//         var x = this.RTL ? 0 : margin / this.workspace_.scale +
//             Blockly.BlockSvg.TAB_WIDTH;
//         block.moveBy(x, cursorY);
//         cursorY += blockHW.height + gaps[i];

//         // Create an invisible rectangle under the block to act as a button.  Just
//         // using the block as a button is poor, since blocks have holes in them.
//         var rect = Blockly.createSvgElement('rect', { 'fill-opacity': 0 }, null);
//         // Add the rectangles under the blocks, so that the blocks' tooltips work.
//         this.workspace_.getCanvas().insertBefore(rect, block.getSvgRoot());
//         block.flyoutRect_ = rect;
//         this.buttons_[i] = rect;

//         if (this.autoClose) {
//             this.listeners_.push(Blockly.bindEvent_(root, 'mousedown', null,
//                 this.createBlockFunc_(block)));
//         } else {
//             this.listeners_.push(Blockly.bindEvent_(root, 'mousedown', null,
//                 this.blockMouseDown_(block)));
//         }
//         this.listeners_.push(Blockly.bindEvent_(root, 'mouseover', block,
//             block.addSelect));
//         this.listeners_.push(Blockly.bindEvent_(root, 'mouseout', block,
//             block.removeSelect));
//         this.listeners_.push(Blockly.bindEvent_(rect, 'mousedown', null,
//             this.createBlockFunc_(block)));
//         this.listeners_.push(Blockly.bindEvent_(rect, 'mouseover', block,
//             block.addSelect));
//         this.listeners_.push(Blockly.bindEvent_(rect, 'mouseout', block,
//             block.removeSelect));
//     }

//     // IE 11 is an incompetant browser that fails to fire mouseout events.
//     // When the mouse is over the background, deselect all blocks.
//     var deselectAll = function(e) {
//         var blocks = this.workspace_.getTopBlocks(false);
//         for (var i = 0, block; block = blocks[i]; i++) {
//             block.removeSelect();
//         }
//     };
//     this.listeners_.push(Blockly.bindEvent_(this.svgBackground_, 'mouseover',
//         this, deselectAll));

//     this.width_ = 0;
//     this.reflow();

//     this.filterForCapacity_();

//     // Fire a resize event to update the flyout's scrollbar.
//     Blockly.fireUiEventNow(window, 'resize');
//     this.reflowWrapper_ = this.reflow.bind(this);
//     this.workspace_.addChangeListener(this.reflowWrapper_);
// };
