function CustomTextInput(_man, _ownerdiv, _lbl) {
//    $U.extend(this, new GUIElement(_ownerdiv, "div"));
    $U.extend(this, new Panel(_ownerdiv.getDocObject()));
    this.setStyles("opacity:0");
    this.transition("opacity", 0.4);
    var me = this;
    var man = _man;
    var LabelWidth = 70;
    var bounds = {};
    var active = false;
    var click_on = false;
    var sel = new CustomTextSelection(me);
    var preferredKB = 0; // Clavier préféré : 0 pour custom, et 1 pour standard


//-linear-gradient(top, #eeeef0, #d3d3d9)
    me.setStyles("position:absolute;border-radius:5px;border: 1px solid #b4b4b4;background-color:#FAFAFA");
//    me.setStyles("background: " + $U.browserCode() + "-linear-gradient(top, #E1E3CD, #EFF2DA);text-shadow: 0 1px 0 #fff;display: inline-block");

    var isHidden = function () {
        return (parseInt(me.getStyle("opacity")) === 0);
    };
    this.show = function () {
        if (isHidden()) {
            me.applyTransitionIN();
            inp.addDownEvent(mousedown);
            inp.addUpEvent(mouseup, window);
            inp.addMoveEvent(mousemove);
        }
    };
    this.hide = function () {
        me.applyTransitionOUT();
        inp.removeDownEvent(mousedown);
        inp.removeUpEvent(mouseup, window);
        inp.removeMoveEvent(mousemove);
    };

    var mouseX = function (ev) {
        return (ev.pageX - bounds.left - lb.getDocObject().offsetWidth - 20);
    };

    var mousedown = function (ev) {
        man.activate(me);
        sel.mousedown(mouseX(ev));
        click_on = true;
    };

    var mouseup = function () {
        click_on = false;
    };

    var mousemove = function (ev) {
        if (click_on) {
            sel.mousemove(mouseX(ev));
        }
    };

    me.setPreferredKB = function (_kb) {
        preferredKB = _kb
    };

    me.setSelectionRange = function (_s, _e) {
        sel.setSelectionRange(_s, _e);
    };

    me.setActive = function (_b) {
        active = _b;
        sel.setActive();
        if ((!active) && (standard))
            standard.quit();
        if ((active) && (preferredKB === 1)) {
            me.showKB();
            if (standard)
                standard.getDocObject().setSelectionRange(0, 1000);
        }
        if ((active) && (preferredKB === 0))
            man.setKeyEvents(false);
    };

    me.isActive = function () {
        return active;
    };

    // Appelée à chaque fois que le texte change, quel
    // que soit le clavier choisi. A surcharger par setChangedFilter :
    var changedFilter = function (txt) {
    };
    me.setChangedFilter = function (_proc) {
        changedFilter = _proc;
    };


    var lb = new GUIElement(me, "div");
    var inp = new GUIElement(me, "div");
    var content = new GUIElement(me, "span");
    me.getInputDIV = function () {
        return inp;
    };
    me.getContentSPAN = function () {
        return content;
    };
    lb.setAttr("textContent", _lbl);
    lb.setStyles("position:absolute;left:20px;top:0px;width:" + LabelWidth + "px;background-color:rgba(0,0,0,0);padding-left:0px;font-family:Helvetica,Arial,sans-serif;font-size:18px;color:#666;outline-width:0px;border:0px;border-radius:0px");
    inp.setStyles("position:absolute;left:" + (LabelWidth + 20) + "px;z-index:1;overflow:hidden;background-color:rgba(0,0,0,0);border:0px;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left;vertical-align:middle;outline-width:0px;border-radius:0px;padding:0px");
    content.setStyles("background-color:rgba(0,0,0,0);white-space:nowrap;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left");
    var doc = inp.getDocObject();

    me.addContent(lb);
    me.addContent(sel);
    me.addContent(inp);

    var standard = null;
    setTimeout(function () {
        var doc = ($APPLICATION) ? window.parent.document.body : window.document.body;
        standard = new GUIElement(me, "input");
        var kb = standard.getDocObject();
        standard.hide();
        standard.setAttr("type", "text");
        var pos = $U.getElementOffset(lb.getDocObject());
        var stls = "left:" + (pos.left + lb.getDocObject().offsetWidth) + "px;";
        stls += "top:" + (pos.top + 1) + "px;";
        stls += "width:" + (bounds.width - 40 - lb.getDocObject().offsetWidth) + "px;";
        stls += "height:" + bounds.height + "px;";
        standard.setStyles(stls += "background-color:#FAFAFA;z-index:3;position:absolute;overflow:hidden;border:0px;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left;vertical-align:middle;outline-width:0px;border-radius:0px;padding:0px");
        kb.onblur = function () {
            man.filterKB(false);
            man.setKeyEvents(false);
            me.setText(kb.value);
            if (active)
                sel.setSelectionRange(kb.selectionStart, kb.selectionEnd);
            standard.hide();
            setTimeout($STANDARD_KBD.setbtn,5000);
        };
        kb.onkeydown = function (ev) {
        };
        kb.onkeyup = function (ev) {
            changedFilter(kb.value);
        };
        standard.quit = function () {
            kb.blur();
        };
        doc.appendChild(kb);
    }, 1);

    me.getInput = function () {
        return standard.getDocObject();
    };
    me.getSel = function () {
        return sel;
    };


    me.showKB = function () {
    };


    me.isStandardKB = function () {
        return (standard !== null);
    }

    me.setBounds = function (l, t, w, h) {
        bounds = {left: l, top: t, width: w, height: h};
        me.setStyles("left:" + l + "px;top:" + t + "px;width:" + w + "px;height:" + h + "px");
        lb.setStyles("height:" + h + "px;line-height:" + h + "px");
        inp.setBounds(LabelWidth + 20, 0, w - LabelWidth - 40, h);
        inp.setStyles("line-height:" + h + "px");
        sel.setStyles("height:" + (h - 4) + "px");

        // Tout ceci pour mesurer la largeur d'un caractère :


        content.setAttr("textContent", "abcdefghijklmnopqrstuvwxyz");
        content.setStyles("margin-left:0px")
        me.addContent(content);
        setTimeout(function () {
            sel.setCarLength(content.getDocObject().offsetWidth / 26);
            sel.setOffset(lb.getDocObject().offsetWidth + 20);
            content.setAttr("textContent", "");
            me.removeContent(content);
            inp.addContent(content);
        }, 1);
    };

    me.setLabel = function (_l) {
        lb.setAttr("textContent", _l);

//        me.setBounds(bounds.left, bounds.top, bounds.width, bounds.height);
//        setTimeout(function() {
//            sel.setSelectionRange(0, 0);
//        }, 1);

    };

    me.setText = function (txt) {
        content.setAttr("textContent", txt);
        changedFilter(txt);
    };
    me.getText = function () {
        return content.getAttr("textContent");
    };
    me.insertText = function (_st) {
        if (!active)
            return;
        sel.insertText(_st);
    };
    me.nextCar = function () {
        sel.nextCar();
    };
    me.executeCommand = function (_st) {
        sel.executeCommand(_st);
    }
}



function CustomTextSelection(_ti) {
    $U.extend(this, new GUIElement(_ti, "div"));
    var me = this;
    var ti = _ti;
    var offsetX = 0;
    var clickpos = NaN, selStart = NaN, selEnd = NaN, selStartX = NaN, selEndX = NaN;
    var blinkvar = NaN;
    var ONECAR = NaN;
    var marginOffsetX = 0;

    me.setStyles("pointer-events:none;z-index:2;visibility:hidden;position:absolute;background-color:blue;left:0px;top:2px;width:3px");
    me.setOffset = function (_x) {
        offsetX = _x;
    };

    var setMarginOffset = function () {
        if (selStartX > ti.getInputDIV().getBounds().width) {
            marginOffsetX = ti.getInputDIV().getBounds().width - selStartX;
            ti.getContentSPAN().setStyles("margin-left:" + marginOffsetX + "px");
        } else {
            ti.getContentSPAN().setStyles("margin-left:0px");
            marginOffsetX = 0;
        }
    }

    var display = function (_withOffset) {
        if (_withOffset)
            setMarginOffset();
        if (isNaN(selStart)) {
            clearInterval(blinkvar);
            blinkvar = NaN;
            me.setStyles("visibility:hidden;left:" + (offsetX + marginOffsetX) + "px;width:0px");
        } else {
            if (selStart === selEnd) {
                if (isNaN(blinkvar)) {
                    me.setStyle("visibility", "visible");
                    blinkvar = setInterval(blink, 500);
                }
                me.setStyles("background-color:rgba(0,0,255,1);left:" + (selStartX + offsetX + marginOffsetX) + "px;width:3px");
            } else {
                clearInterval(blinkvar);
                blinkvar = NaN;
                me.setStyles("visibility:visible;background-color:rgba(0,0,255,0.2);left:" + (selStartX + offsetX + marginOffsetX) + "px;width:" + (selEndX - selStartX) + "px");
            }
        }
//        console.log("display:" + selStartX); 
    };
    var blink = function () {
        if (me.getStyle("visibility") === "hidden")
            me.setStyle("visibility", "visible");
        else
            me.setStyle("visibility", "hidden");
    };

    me.setHide = function (_h) {
        if (_h)
            me.setStyle("display", "none");
        else {
            me.setStyle("display", "inline");
            me.setStyle("visibility", "visible");
//            console.log("show !!!");
        }

    }

    me.nextCar = function () {
        if (selStart < ti.getText().length) {
            selStart++;
            selStartX = ONECAR * selStart;
            selEnd = selStart;
            selEndX = selStartX;
            clickpos = selStart;
            display(true);
        }
    };
    me.getSelStart = function () {
        return selStart;
    };
    me.getSelEnd = function () {
        return selEnd;
    };
    me.setSelectionRange = function (_start, _end) {
        selStart = _start;
        selStartX = ONECAR * selStart;
        selEnd = _end;
        selEndX = ONECAR * selEnd;
        clickpos = selStart;
        display(true);
    };
    me.setCarLength = function (x) {
        ONECAR = x;
    };
    me.getCarLength = function () {
        return ONECAR;
    }
    me.mousedown = function (x) {
        if (!ti.isActive())
            return;
        x = x - marginOffsetX;
        selStart = Math.round(x / ONECAR);
        if (selStart > ti.getText().length)
            selStart = ti.getText().length;
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        display(false);
    };
    me.mousemove = function (x) {
        if (!ti.isActive())
            return;
        x = x - marginOffsetX;
        var xpos = Math.round(x / ONECAR);
        if (xpos < 0)
            xpos = 0;
        selStart = Math.min(xpos, clickpos);
        selEnd = Math.max(xpos, clickpos);
        if (selEnd > ti.getText().length)
            selEnd = ti.getText().length;
        selStartX = ONECAR * selStart;
        selEndX = ONECAR * selEnd;
        display(false);
    };

    me.setActive = function () {
        if (!ti.isActive()) {
            selStart = NaN, selEnd = NaN, selStartX = NaN, selEndX = NaN;
            display(true);
        }
    };

    me.getText = function () {
        return (ti.getText().substring(selStart, selEnd));
    };

    me.executeCommand = function (_st) {
        switch (_st) {
            case "DEL":
                if (selStart > 0) {
                    var s = ti.getText();
                    if (selStart === selEnd) {
                        var before = s.slice(0, selStart - 1);
                        var after = s.slice(selEnd);
                    } else {
                        var before = s.slice(0, selStart);
                        var after = s.slice(selEnd);

                    }
                    ti.setText(before + after);
                    selStart = before.length;
//                    selStart--;
                }
                break;
            case "CLR":
                ti.setText("");
                selStart = 0;
                break;
            case "LEFT":
                if (selStart > 0)
                    selStart--;
                break;
            case "RIGHT":
                if (selStart < ti.getText().length)
                    selStart++;
                break;
        }
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        me.setStyle("visibility", "visible");
        display(true);
    }

    var command = function (_st) {
        if (_st.indexOf("cmd_") !== 0)
            return false;
        _st = _st.replace("cmd_", "");
        switch (_st) {
            case "DEL":
                me.executeCommand("DEL");
                break;
            case "CLR":
                me.executeCommand("CLR");
                break;
            case "◀":
                me.executeCommand("LEFT");
                break;
            case "▶":
                me.executeCommand("RIGHT");
                break;
        }
        return true;
    };

    var particularCases = function (_st) {
        var s = ti.getText();
        var before = s.slice(0, selStart);
        var middle = s.substring(selStart, selEnd);
        var after = s.slice(selEnd);
        switch (_st) {
            case "( )":
                ti.setText(before + "(" + middle + ")" + after);
                selStart += (middle.length === 0) ? 1 : middle.length + 2;
                return true;
                break;
            case "[ ]":
                ti.setText(before + "[" + middle + "]" + after);
                selStart += (middle.length === 0) ? 1 : middle.length + 2;
                return true;
                break;
        }
        return false;
    };

    me.insertText = function (_st) {
        if (!command(_st)) {
            if (!particularCases(_st)) {
                var s = ti.getText();
                var before = s.slice(0, selStart);
                var middle = s.substring(selStart, selEnd);
                var after = s.slice(selEnd);
                if (_st.indexOf("@") === -1) {
                    middle = _st;
                    selStart += _st.length;
                } else {
                    var empty = (middle === "");
                    middle = _st.replace("@", middle);
                    selStart += empty ? middle.length - (_st.length - _st.indexOf("@") - 1) : middle.length;
                }
                ti.setText(before + middle + after);
            }
        }
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        me.setStyle("visibility", "visible");
        display(true);
    };


}