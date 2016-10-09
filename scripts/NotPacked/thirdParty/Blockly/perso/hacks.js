Blockly.ContextMenu.origin_show = Blockly.ContextMenu.show;

Blockly.Field.prototype.maxDisplayLength = 20;


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

// Change l'aspect des rubriques de la toolbox :
Blockly.Toolbox.prototype.addColour_ = function(opt_tree) {
    var tree = opt_tree || this.tree_;
    var children = tree.getChildren();
    for (var i = 0, child; child = children[i]; i++) {
        var element = child.getRowElement();
        if (element) {
            if (element.getAttribute("class") === "blocklyTreeSeparator") {
                element.style["outline"] = '2px solid #fff';
                element.style["margin"] = "0px";
                element.style["height"] = "15px";
                element.style["line-height"] = "15px";
            } else {
                element.style["border-right"] = '8px solid ' + (child.hexColour || '#ddd');
                element.style["outline"] = '2px solid #fff';
                element.style["margin"] = "0px";
                element.style["height"] = "40px";
                element.style["line-height"] = "40px";
                element.style["font-weight"] = "bold";
                element.style["color"] = (child.hexColour || '#ddd');
            }
        }
        this.addColour_(child);
    }
};


// Modification de cette méthode pour enlever les bordures 3D
// de tous les blocs et rendre ainsi un look flat :
Blockly.BlockSvg.prototype.renderDraw_ = function(iconWidth, inputRows) {
  this.startHat_ = false;
  // Reset the height to zero and let the rendering process add in
  // portions of the block height as it goes. (e.g. hats, inputs, etc.)
  this.height = 0;
  // Should the top and bottom left corners be rounded or square?
  if (this.outputConnection) {
    this.squareTopLeftCorner_ = true;
    this.squareBottomLeftCorner_ = true;
  } else {
    this.squareTopLeftCorner_ = false;
    this.squareBottomLeftCorner_ = false;
    // If this block is in the middle of a stack, square the corners.
    if (this.previousConnection) {
      var prevBlock = this.previousConnection.targetBlock();
      if (prevBlock && prevBlock.getNextBlock() == this) {
        this.squareTopLeftCorner_ = true;
      }
    } else if (Blockly.BlockSvg.START_HAT) {
      // No output or previous connection.
      this.squareTopLeftCorner_ = true;
      this.startHat_ = true;
      this.height += Blockly.BlockSvg.START_HAT_HEIGHT;
      inputRows.rightEdge = Math.max(inputRows.rightEdge, 100);
    }
    var nextBlock = this.getNextBlock();
    if (nextBlock) {
      this.squareBottomLeftCorner_ = true;
    }
  }

  // Assemble the block's path.
  var steps = [];
  var inlineSteps = [];
  // The highlighting applies to edges facing the upper-left corner.
  // Since highlighting is a two-pixel wide border, it would normally overhang
  // the edge of the block by a pixel. So undersize all measurements by a pixel.
  var highlightSteps = [];
  var highlightInlineSteps = [];

  this.renderDrawTop_(steps, highlightSteps, inputRows.rightEdge);
  var cursorY = this.renderDrawRight_(steps, highlightSteps, inlineSteps,
      highlightInlineSteps, inputRows, iconWidth);
  this.renderDrawBottom_(steps, highlightSteps, cursorY);
  this.renderDrawLeft_(steps, highlightSteps);

  var pathString = steps.join(' ') + '\n' + inlineSteps.join(' ');
  this.svgPath_.setAttribute('d', pathString);
  this.svgPath_.setAttribute('stroke', this.svgPath_.getAttribute("fill"));
  this.svgPath_.setAttribute('stroke-width', "0.6");
  this.svgPathDark_=null;
  this.svgPathLight_=null;
};

