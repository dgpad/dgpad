Blockly.Blocks['dgpad_tex_2'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["binom", "binom"],
                ["color", "color"],
                ["dbinom", "dbinom"],
                ["dfrac", "dfrac"],
                ["frac", "frac"],
                ["rule", "rule"],
                ["tbinom", "tbinom"],
                ["tfrac", "tfrac"]
            ]), "NAME");
        this.appendValueInput("FIRST")
            .setCheck(null);
        this.appendValueInput("SECOND")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, "String");
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        // this.setColour(135);
        this.colour_ = "#DAC185";
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_tex_1'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["overrightarrow", "overrightarrow"],
                ["overline", "overline"],
                ["acute", "acute"],
                ["bar", "bar"],
                ["Bbb", "Bbb"],
                ["begin", "begin"],
                ["Big", "Big"],
                ["big", "big"],
                ["bigg", "bigg"],
                ["Bigg", "Bigg"],
                ["biggl", "biggl"],
                ["Biggl", "Biggl"],
                ["biggm", "biggm"],
                ["Biggm", "Biggm"],
                ["biggr", "biggr"],
                ["Biggr", "Biggr"],
                ["Bigl", "Bigl"],
                ["bigl", "bigl"],
                ["bigm", "bigm"],
                ["Bigm", "Bigm"],
                ["Bigr", "Bigr"],
                ["bigr", "bigr"],
                ["bold", "bold"],
                ["breve", "breve"],
                ["check", "check"],
                ["ddot", "ddot"],
                ["dot", "dot"],
                ["end", "end"],
                ["frak", "frak"],
                ["grave", "grave"],
                ["hat", "hat"],
                ["kern", "kern"],
                ["left", "left"],
                ["llap", "llap"],
                ["mathbb", "mathbb"],
                ["mathbf", "mathbf"],
                ["mathcal", "mathcal"],
                ["mathfrak", "mathfrak"],
                ["mathit", "mathit"],
                ["mathrm", "mathrm"],
                ["mathscr", "mathscr"],
                ["mathsf", "mathsf"],
                ["mathtt", "mathtt"],
                ["phantom", "phantom"],
                ["right", "right"],
                ["rlap", "rlap"],
                ["sqrt", "sqrt"],
                ["text", "text"],
                ["tilde", "tilde"],
                ["underline", "underline"],
                ["vec", "vec"]
            ]), "NAME")
            .appendField(" ");
        this.appendValueInput("FIRST")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, "String");
        // this.setColour(135);
        this.colour_ = "#DAC185";
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};



Blockly.Blocks['dgpad_tex_0'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["arccos", "arccos"],
                ["arcsin", "arcsin"],
                ["arctan", "arctan"],
                ["arg", "arg"],
                ["bigcap", "bigcap"],
                ["bigcup", "bigcup"],
                ["bigodot", "bigodot"],
                ["bigoplus", "bigoplus"],
                ["bigotimes", "bigotimes"],
                ["bigsqcup", "bigsqcup"],
                ["biguplus", "biguplus"],
                ["bigvee", "bigvee"],
                ["bigwedge", "bigwedge"],
                ["choose", "choose"],
                ["coprod", "coprod"],
                ["cos", "cos"],
                ["cosh", "cosh"],
                ["cot", "cot"],
                ["coth", "coth"],
                ["cr", "cr"],
                ["csc", "csc"],
                ["deg", "deg"],
                ["det", "det"],
                ["dim", "dim"],
                ["displaystyle", "displaystyle"],
                ["exp", "exp"],
                ["footnotesize", "footnotesize"],
                ["gcd", "gcd"],
                ["hom", "hom"],
                ["huge", "huge"],
                ["Huge", "Huge"],
                ["iiint", "iiint"],
                ["iint", "iint"],
                ["inf", "inf"],
                ["int", "int"],
                ["intop", "intop"],
                ["KaTeX", "KaTeX"],
                ["ker", "ker"],
                ["Large", "Large"],
                ["LARGE", "LARGE"],
                ["large", "large"],
                ["lg", "lg"],
                ["lim", "lim"],
                ["liminf", "liminf"],
                ["limsup", "limsup"],
                ["ln", "ln"],
                ["log", "log"],
                ["max", "max"],
                ["min", "min"],
                ["normalsize", "normalsize"],
                ["oint", "oint"],
                ["over", "over"],
                ["Pr", "Pr"],
                ["prod", "prod"],
                ["scriptscriptstyle", "scriptscriptstyle"],
                ["scriptsize", "scriptsize"],
                ["scriptstyle", "scriptstyle"],
                ["sec", "sec"],
                ["sin", "sin"],
                ["sinh", "sinh"],
                ["small", "small"],
                ["smallint", "smallint"],
                ["sum", "sum"],
                ["sup", "sup"],
                ["tan", "tan"],
                ["tanh", "tanh"],
                ["textstyle", "textstyle"],
                ["tiny", "tiny"],
                ["times", "times"]
            ]), "NAME")
            .appendField(" ");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        // this.setColour(135);
        this.colour_ = "#DAC185";
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.Blocks['dgpad_output_precision'] = {
  init: function() {
    this.appendDummyInput()
        .appendField($L.blockly.number_precision)
        .appendField(new Blockly.FieldNumber(2, 0, 14, 1), "VAL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};




// Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH=new Blockly.FieldImage($APP_PATH + "NotPacked/images/tex/text.png", 10, 10, "*")

Blockly.Blocks['dgpad_tex'] = {

    init: function() {
        // this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
        // this.setColour(135);
        this.colour_ = "#DAC185";
        this.itemCount_ = 2;
        this.updateShape_();
        this.setOutput(true, 'String');
        var mut = new Blockly.Mutator(['text_create_join_item']);
        this.setMutator(mut);
        // this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);
    },
    mutationToDom: function() {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('text_create_join_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('text_create_join_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField(this.newQuote_(true))
                .appendField(this.newQuote_(false));
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tex/TeX.png", 30, 28, "*"));
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    },
    newQuote_: Blockly.Blocks['text'].newQuote_
};



Blockly.Blocks['text_join'] = {
  /**
   * Block for creating a string made up of any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, 'String');
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);
  },
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(new Blockly.FieldImage($APP_PATH + "NotPacked/images/tex/text.png", 30, 30, "*"));
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};
