
// Dans blocks/turtle.js

Blockly.Blocks['turtle_colour_rgb'] = {
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
            .appendField($L.blockly.turtle.setColour);
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

// Dans js/turtle.js

Blockly.JavaScript['turtle_colour_rgb'] = function(block) {
    var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
    var value_g = Blockly.JavaScript.valueToCode(block, 'G', Blockly.JavaScript.ORDER_ATOMIC);
    var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
    var cod = "TURTLE_COLOUR_RGB(" + value_r + ',' + value_g + ',' + value_b + ");\n";
    return cod;
};


// Dans interpreter.js

    var TURTLE_COLOUR_RGB = function(_r, _g, _b) {
        var t = TURTLE_VARS;
        var last = t.TAB.pop();
        t.TAB.push([1, _r, _g, _b]);
        t.TAB.push(last);
    };

// Dans Blockly_toolbox.js 

< block type = "turtle_colour_rgb" >
    < value name = "R" >
    < shadow type = "math_number" >
    < field name = "NUM" > 200 < /field> < /shadow> < /value> < value name = "G" >
    < shadow type = "math_number" >
    < field name = "NUM" > 150 < /field> < /shadow> < /value> < value name = "B" >
    < shadow type = "math_number" >
    < field name = "NUM" > 25 < /field> < /shadow> < /value> < /block>





// POUR HACKER L'INPUT ANGLE ET LE TRANSFORMER EN INPUT POURCENT :
Blockly.FieldAngle.HALF = 100;
Blockly.FieldAngle.WRAP = 100;
Blockly.FieldAngle.ROUND = 5;
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;


Blockly.FieldAngle.prototype.showEditor_ = function() {
    var noFocus =
        goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    Blockly.FieldAngle.superClass_.showEditor_.call(this, noFocus);
    var div = Blockly.WidgetDiv.DIV;
    if (!div.firstChild) {
        // Mobile interface uses window.prompt.
        return;
    }
    // Build the SVG DOM.
    var svg = Blockly.createSvgElement('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:html': 'http://www.w3.org/1999/xhtml',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'version': '1.1',
        'height': (Blockly.FieldAngle.HALF * 2) + 'px',
        'width': (Blockly.FieldAngle.HALF * 2) + 'px'
    }, div);
    var circle = Blockly.createSvgElement('circle', {
        'cx': Blockly.FieldAngle.HALF,
        'cy': Blockly.FieldAngle.HALF,
        'r': Blockly.FieldAngle.RADIUS,
        'class': 'blocklyAngleCircle'
    }, svg);
    this.gauge_ = Blockly.createSvgElement('path', { 'class': 'blocklyAngleGauge' }, svg);
    this.line_ = Blockly.createSvgElement('line', {
        'x1': Blockly.FieldAngle.HALF,
        'y1': Blockly.FieldAngle.HALF,
        'class': 'blocklyAngleLine'
    }, svg);
    // Draw markers around the edge.
    for (var a = 0; a < 100; a += 5) {
        Blockly.createSvgElement('line', {
            'x1': Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS,
            'y1': Blockly.FieldAngle.HALF,
            'x2': Blockly.FieldAngle.HALF + Blockly.FieldAngle.RADIUS -
                (a % 10 == 0 ? 10 : 5),
            'y2': Blockly.FieldAngle.HALF,
            'class': 'blocklyAngleMarks',
            'transform': 'rotate(' + (a * 3.6) + ',' +
                Blockly.FieldAngle.HALF + ',' + Blockly.FieldAngle.HALF + ')'
        }, svg);
    }
    svg.style.marginLeft = (15 - Blockly.FieldAngle.RADIUS) + 'px';
    this.clickWrapper_ =
        Blockly.bindEvent_(svg, 'click', this, Blockly.WidgetDiv.hide);
    this.moveWrapper1_ =
        Blockly.bindEvent_(circle, 'mousemove', this, this.onMouseMove);
    this.moveWrapper2_ =
        Blockly.bindEvent_(this.gauge_, 'mousemove', this, this.onMouseMove);
    this.updateGraph_();
};

/**
 * Set the angle to match the mouse's position.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldAngle.prototype.onMouseMove = function(e) {
    var bBox = this.gauge_.ownerSVGElement.getBoundingClientRect();
    var dx = e.clientX - bBox.left - Blockly.FieldAngle.HALF;
    var dy = e.clientY - bBox.top - Blockly.FieldAngle.HALF;
    var angle = Math.atan(-dy / dx);
    if (isNaN(angle)) {
        // This shouldn't happen, but let's not let this error propogate further.
        return;
    }
    angle = goog.math.toDegrees(angle);
    // 0: East, 90: North, 180: West, 270: South.
    if (dx < 0) {
        angle += 180;
    } else if (dy > 0) {
        angle += 360;
    }
    if (Blockly.FieldAngle.CLOCKWISE) {
        angle = Blockly.FieldAngle.OFFSET + 360 - angle;
    } else {
        angle -= Blockly.FieldAngle.OFFSET;
    }
    angle = angle * 100 / 360;
    if (Blockly.FieldAngle.ROUND) {
        angle = Math.round(angle / Blockly.FieldAngle.ROUND) *
            Blockly.FieldAngle.ROUND;
    }
    angle = angle * 3.6;
    // angle = Blockly.FieldAngle.angleValidator(angle*3.6);
    Blockly.FieldTextInput.htmlInput_.value = angle / 3.6;
    this.setValue(angle);
    this.validate_();
    this.resizeEditor_();
};
