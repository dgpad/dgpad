/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TextObject(_canvas, _m, _l, _t, _w, _h) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var Cn = _canvas.getConstruction();
    me.setAttr("className", "textPanel");
    me.transition("scale", 0.2);

    var txt = _m;
    var EXPs = [];
    var SCPs = [];
    var bgcolor = new Color();
    var borderSize = 3;
    var borderRadius = 5;
    var numPrec = 1e4;
    var closebox = null;
    var jsbox = null, txbox = null, exbox = null;
    var printPanel = null;

    me.parseExpressions = function () {
        EXPs = [];
        SCPs = [];
        var t = txt.split("%");
        for (var i = 1, len = t.length; i < len; i += 2) {
            EXPs.push(_canvas.getExpression(t[i]));
        }
        t = txt.split("§");
        for (var i = 1, len = t.length; i < len; i += 2) {
            t[i] = t[i].replace(/^[^\n]*name\s*=\s*\"([^\"]*)\"/, "");
            t[i] = t[i].replace(/^[^\n]*style\s*=\s*\"([^\"]*)\"/, "");
            SCPs.push({src: t[i]});
        }
    };
    me.parseExpressions();

    var styles = null;

    me.exec = function (_i) {
        var src = SCPs[_i].src;
        var t = src.split("%");
        for (var i = 1, len = t.length; i < len; i += 2) {
            var exp = _canvas.getExpression(t[i]);
//            exp.compute();
            t[i] = "" + $U.parseArrayEnglish(exp.value(), numPrec, true);
        }
        _canvas.InterpretScript(me, t.join(""));
    };

    var closePrint = function () {
        if (printPanel)
            printPanel.close();
        printPanel = null;
    };

    me.print = function (_m) {
        if (!printPanel)
            printPanel = new PrintPanel(_canvas, closePrint);
        printPanel.setText(_m);
    };
    
    me.refreshInputs=function(){
        // convert HTMLCollection to Array :
        var inps = [].slice.call(container.getDocObject().getElementsByTagName('input'));
        var sels = container.getDocObject().getElementsByTagName('select');
        for (var n = 0; n < sels.length; n++) {
            inps.push(sels[n]);
        }
        var tas = container.getDocObject().getElementsByTagName('textarea');
        for (var n = 0; n < tas.length; n++) {
            inps.push(tas[n]);
        }
        for (var n = 0; n < inps.length; n++) {
            inps[n].ontouchstart = inps[n].onmousedown = function (ev) {
                ev.stopPropagation();
            };
            if (inps[n].hasAttribute("target")) {
                var o=inps[n].targetObject = Cn.find(inps[n].getAttribute("target"));
                if (o) {
                var evtpe = "oninput";
                switch (inps[n].type) {
                    case "select-one":
                        evtpe = "onchange";
                        inps[n].value=o.getExp();
                        break;
                    case "checkbox":
                        evtpe = "onchange";
                        inps[n].checked=o.getValue();
                        break;
                    case "button":
                        evtpe = "onmouseup";
                        break;
                    default:
                        inps[n].value=o.getExp();
                }
                
                    
                
                inps[n][evtpe] = function (ev) {
                    var obj = ev.target.targetObject;
                    if (obj) {
                        var val = ev.target.value;
                        switch (ev.target.type) {
                            case "checkbox":
                                val = ev.target.checked;
                                break;
                            case "button":
                                val = !obj.getValue();
                                break;
                        }
                        obj.setExp(val);
                        obj.compute();
                        obj.computeChilds();
                        _canvas.paint();
                    }
                }
                }
            }
        }
    };

    var setHTML = function (_t) {
        // On enlève tous les scripts injectés précédemment dans
        // ce widget :
        var scps = me.getDocObject().getElementsByTagName('script');
        for (var n = 0; n < scps.length; n++) {
            scps[n].parentNode.removeChild(scps[n]);
        }

        var tab = _t.split("§");
        for (var i = 1, len = tab.length; i < len; i += 2) {
            var k = (i - 1) / 2;
            var match = tab[i].match(/^[^\n]*name\s*=\s*\"([^\"]*)\"/);
            var nm = " value=\"" + ((match) ? match[1] : "RUN") + "\" ";
            match = tab[i].match(/^[^\n]*style\s*=\s*\"([^\"]*)\"/);
            var st = " style=\"-webkit-appearance: button;" + ((match) ? match[1] : "") + "\" ";
            match = tab[i].match(/^[^\n]*id\s*=\s*\"([^\"]*)\"/);
            var id=(match) ? " id=\""+match[1]+"\"":"";
            tab[i] = "<input type=\"button\"  ontouchend=\"$CANVAS.textManager.executeScript(" + _canvas.textManager.getPosition(me) + "," + k + ");this.blur()\" onmouseup=\"$CANVAS.textManager.executeScript(" + _canvas.textManager.getPosition(me) + "," + k + ");this.blur()\" " + nm + st + id+">";
        }
        _t = tab.join("");

        // Le tag pre est là pour conserver les espaces multiples 
        // et les retours à la ligne :
        container.setAttr("innerHTML", "<pre class=\"TeXDisplay\">" + _t + "</pre>");

        // Interprétation des balises scripts éventuellement injectées dans 
        // le source (le innerHTML ne suffit pas) :
        scps = container.getDocObject().getElementsByTagName('script');
        for (var n = 0; n < scps.length; n++) {
            var scp = document.createElement('script');
            scp.src = scps[n].src;
            scp.type = scps[n].type;
            scp.appendChild(document.createTextNode(scps[n].innerHTML));
            me.getDocObject().insertBefore(scp, container.getDocObject());
        }

        me.refreshInputs();
    };


    var container = new GUIElement(_canvas, "div");
    me.addContent(container);
    container.setAbsolute();
    container.setStyle("cursor", "move");
    setHTML(txt);


    var editBox = new GUIElement(_canvas, "textarea");
    editBox.setStyles("position:absolute;font-family:'Lucida Console';font-size:13px;line-height:20px");

    var endInput = function () {
        txt = editBox.getDocObject().value;
        me.parseExpressions();
        setHTML(txt);
        _canvas.getConstruction().computeAll();
        me.evaluateString();
    };

    editBox.getDocObject().oninput = function (ev) {
        endInput();
    };
    editBox.setStyle("width", (_w - 33) + "px");
    editBox.setStyle("height", (114) + "px");


    var deleteTeX = function () {
        _canvas.undoManager.swap(me);
        _canvas.textManager.deleteTeX(me);
    };

    var insertJS = function () {
        var js = "§ name=\"" + $L.props_text_js + "\" style=\"font-size:24px;color:blue\"\n";
        js += "for (var i=0;i<100;i++){\n";
        js += "\tA=Point(Math.random()*16-8,Math.random()*16-8)\n";
        js += "}\n"
        js += "§";
        me.addName(js);
    };
    var insertTeX = function () {
        var tx = "$\\frac{6+1}{3}\\approx2.3$";
        me.addName(tx);
    };
    var insertEXP = function () {
        var ex = "%5*2^2+9%";
        me.addName(ex);
    };

    me.noedit = function () {
        me.removeContent(editBox);
        me.removeContent(closebox);
        me.removeContent(jsbox);
        me.removeContent(txbox);
        me.removeContent(exbox);
        me.setStyle("z-index", 0);
    }

    var moveStyles = function () {
        editBox.setStyle("left", (35) + "px");
        editBox.setStyle("top", (_h + 4) + "px");
//        editBox.setStyle("width", (_w - 33) + "px");
//        editBox.setStyle("height", (114) + "px");
        if (jsbox) {
            jsbox.setStyle("left", (0) + "px");
            jsbox.setStyle("top", (_h + 4) + "px");
            txbox.setStyle("left", (0) + "px");
            txbox.setStyle("top", (_h + 44) + "px");
            exbox.setStyle("left", (0) + "px");
            exbox.setStyle("top", (_h + 84) + "px");
        }

    }

    me.setEditFocus = function () {
        setTimeout(function () {
            editBox.getDocObject().focus();
            editBox.getDocObject().setSelectionRange(0, 9999);
        }, 100);
    };

    me.doedit = function () {
        if ((!me.hasContent(editBox)) && (_canvas.getMode() === 10)) {

            me.setStyle("z-index", 3);
            editBox.setAttr("innerHTML", txt);
            me.addContent(editBox);
            closebox = new CloseBox(me, deleteTeX);
            jsbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/js.svg", 30, 30, insertJS);

            txbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/tex.svg", 30, 30, insertTeX);

            exbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/exp.svg", 30, 30, insertEXP);

            moveStyles();
        }
    };

    me.edit = function () {
        _canvas.textManager.edit(me);
    };


//    container.addClickEvent(me.edit);




    var growbox = new GUIElement(_canvas, "div");
    growbox.setAbsolute();
    growbox.setStyles("width:30px;height:30px;right:0px;bottom:0px;cursor:se-resize");
    me.addContent(growbox);

    var xx = 0, yy = 0;

    var dragmove = function (ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function (ev) {
//        me.removeContent(editBox);
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function (ev) {
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    container.addDownEvent(dragdown);
//    container.getDocObject().addEventListener('touchstart', dragdown, false);
//    container.getDocObject().addEventListener('mousedown', dragdown, false);
    container.getDocObject().addEventListener('touchstart', me.edit, false);
    container.getDocObject().addEventListener('click', me.edit, false);

    var sizemove = function (ev) {
        _w += (ev.pageX - xx);
        _h += (ev.pageY - yy);
        me.setStyle("width", _w + "px");
        me.setStyle("height", _h + "px");
        container.setStyle("width", (_w - 20) + "px");
        container.setStyle("height", (_h - 20) + "px");
        xx = ev.pageX;
        yy = ev.pageY;
        moveStyles();
        if (closebox)
            closebox.setStyle("left", (_w - 15) + "px");
    }

    var sizedown = function (ev) {
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', sizemove, false);
        window.addEventListener('touchend', sizeup, false);
        window.addEventListener('mousemove', sizemove, false);
        window.addEventListener('mouseup', sizeup, false);
    }

    var sizeup = function (ev) {
        window.removeEventListener('touchmove', sizemove, false);
        window.removeEventListener('touchend', sizeup, false);
        window.removeEventListener('mousemove', sizemove, false);
        window.removeEventListener('mouseup', sizeup, false);
    }

    growbox.addDownEvent(sizedown);
    _canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.applyTransitionIN();

    me.compute = function () {
        for (var i = 0; i < EXPs.length; i++) {
            EXPs[i].compute();
        }
    };


    me.evaluateString = function () {
        
        var t = txt.split("%");
        var changed = (t.length > 1);
        for (var i = 1, len = t.length; i < len; i += 2) {
            try {
                var k = (i - 1) / 2;
                EXPs[k].compute();
                t[i] = $U.parseArray(EXPs[k].value(), numPrec);
            } catch (e) {
            }
        }
        t = t.join("").split("$");
        changed = changed || (t.length > 1);
        for (var i = 1, len = t.length; i < len; i += 2) {
            try {
                t[i] = katex.renderToString(t[i]);
            } catch (e) {
            }
        }
        if (changed)
            setHTML(t.join(""));
    };


    me.getBounds = function () {
        return {
            "left": _l,
            "top": _t,
            "width": _w,
            "height": _h
        };
    };

    me.getColor = function () {
        return (bgcolor.getHEX());
    };
    me.setColor = function (val) {
        var op = bgcolor.getOpacity();
        bgcolor.set(val);
        bgcolor.setOpacity(op);
        me.setStyle("background-color", bgcolor.getRGBA());
        me.setStyle("border-color", bgcolor.getRGBA());
    };
    me.getOpacity = function () {
        return (bgcolor.getOpacity());
    };
    me.setOpacity = function (val) {
        bgcolor.setOpacity(val);
        me.setStyle("background-color", bgcolor.getRGBA());
        me.setStyle("border-color", bgcolor.getRGBA());
    };
    me.getBorderSize = function () {
        return borderSize;
    };
    me.setBorderSize = function (val) {
        borderSize = val;
        me.setStyle("border-width", borderSize + "px");
    };
    me.getBorderRadius = function () {
        return borderRadius;
    };
    me.setBorderRadius = function (val) {
        borderRadius = val;
        me.setStyle("border-radius", borderRadius + "px");
    };
    me.setNumPrec = function (val) {
        numPrec = Math.pow(10, val);
        me.evaluateString();
    };
    me.getNumPrec = function () {
        return Math.round(Math.log(numPrec) / Math.LN10);
    };
    me.addName = function (_n) {
        if (me.hasContent(editBox)) {
            $U.addTextToInput(editBox.getDocObject(),_n,"add");
            endInput();
        }
    };

    me.setStyles = function (_s) {
        styles = _s;
        _s = _s.split(";");
        for (var i = 0, len = _s.length; i < len; i++) {
            var e = _s[i].split(":");
            switch (e[0]) {
                case "c":// Color
                    bgcolor.set(e[1]);
                    me.setStyle("background-color", bgcolor.getRGBA());
                    me.setStyle("border-color", bgcolor.getRGBA());
                    break;
                case "s":// Border size
                    borderSize = parseFloat(e[1]);
                    me.setStyle("border-width", borderSize + "px");
                    break;
                case "r"://Border radius
                    borderRadius = parseInt(e[1]);
                    me.setStyle("border-radius", borderRadius + "px");
                    break;
                case "p"://Number precision
                    numPrec = Math.pow(10, parseInt(e[1]));
                    break;
            }
        }
    };



    me.getStyles = function () {
        var stls = "c:" + bgcolor.getRGBA();
        stls += ";s:" + borderSize;
        stls += ";r:" + borderRadius;
        stls += ";p:" + Math.round(Math.log(numPrec) / Math.LN10);
        return stls;
    };


    me.setText = function (_t) {
        txt = _t;
//        container.setAttr("innerHTML", _t);
//        console.log("set text !");
    };

    me.getRawText = function () {
        return txt;
    }

    me.getText = function () {
        var s = txt;
        if (txt.split("$").length > 1) {
            s = s.replace(/\\/g, "\\\\");
        }
        return s;
    }

    me.init = function () {
        me.setBounds(_l, _t, _w, _h);
        container.setBounds(10, 10, _w - 20, _h - 20);

    };

    me.init();

}

