function MainCalcPanel(_man, _canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var height = $P.CalcPanelHeight;
    var me = this;
    var man = _man;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var txtman = new CustomTexts(me);
    var scl = ($U.isMobile.mobilePhone()) ? $P.MobileScale - 0.05 : 1;
    var OBJ = null; // Objet à éditer
    var E1, E2, MIN, MAX;

    me.setAttr("className", "mainCalcPanel");
    //    me.setStyles("background: " + $U.browserCode() + "-linear-gradient(bottom, #9c9ba6, #57575f);box-shadow: inset 0 -1px 0 0 #bfbfbf;border-bottom: 1px solid #303236");
    me.transition("translate_y", 0.2, -height);

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };
    this.close = function() {
        me.cancel();
        E1.hide();
        E2.hide();
        MIN.hide();
        MAX.hide();
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
        txtman.close();
    };


    (function() {
        var t = me.getOwnerBounds();
        me.setBounds(0, 0, t.width, height);
    })();



    txtman.focus = function() {
        man.activateBtns(true);
        showBtns();
    };

    txtman.filterKB = function(_standardON) {
        //        console.log("filterKB");
        if (man.getCustomKB()) {
            if (_standardON)
                man.getCustomKB().close();
            else
                man.getCustomKB().show();
        }


    };

    var initInputs = function() {
        E1 = txtman.add("E =", 10, 6, 740 * scl, 22);
        E2 = txtman.add($L.calc_text, 10, 39, 740 * scl, 22);
        MIN = txtman.add("min =", 780 * scl, 6, 230 * scl, 22);
        MAX = txtman.add("max =", 780 * scl, 39, 230 * scl, 22);
        E1.show();
        E2.hide();
        MIN.hide();
        MAX.hide();
        me.addContent(E1);
        me.addContent(E2);
        me.addContent(MIN);
        me.addContent(MAX);

    }

    initInputs();

    var clearChangeFilters = function() {
        E1.setChangedFilter(function() {});
        E2.setChangedFilter(function() {});
        MIN.setChangedFilter(function() {});
        MAX.setChangedFilter(function() {});
    }

    var showKB = function() {
        txtman.showKB();
    }
    me.cancel = function() {
        txtman.deactiveAll();
        clearChangeFilters();
        if (OBJ) {
            if (editObj) {
                for (var i = 0; i < editObj.length; i++) {
                    editObj[i]();
                }
            } else {
                Cn.safelyDelete(OBJ);
                OBJ = null;
            }
            me.valid();
        }
    };
    me.valid = function() {
        txtman.deactiveAll();
        clearChangeFilters();
        E1.setText("");
        E2.setText("");
        MIN.setText("");
        MAX.setText("");
        E1.setLabel("E =");
        E2.setLabel($L.calc_text);
        MIN.setLabel("min =");
        MAX.setLabel("max =");
        E1.show();
        E2.hide();
        MIN.hide();
        MAX.hide();
        hideBtns();
        man.activateBtns(false);
        txtman.setFirst(true);
        setTimeout(function() {
            txtman.deactiveAll();
        }, 1);

        if ((OBJ) && (OBJ.getE1) && (OBJ.getE1().isDxyztFunc())) {
            OBJ.setE1(OBJ.getE1().get() + "(" + OBJ.getE1().value().getVars() + ")");
        }
        if (OBJ)
            OBJ.computeChilds();
        canvas.paint();
        OBJ = null;
        editObj = null;
    };

    var transformToList = function(_segs) {
        if (OBJ === null)
            return;
        OBJ.compute();
        var list = OBJ.getE1().getPointList();
        if (list.length > 0) {
            var LST = new ListObject(Cn, "_List", OBJ);
            LST.setSegmentsSize(_segs);
            canvas.addObject(LST);
            me.valid();
        } else {
            var o = new PointObject(Cn, "_P", 0, 0);
            o.setEXY(OBJ.getE1().getSource());
            canvas.addObject(o);
            o.compute();
            me.cancel();
            editObj = null;
        }
    };

    var transformToPoints = function() {
        transformToList(0);
    };

    var transformToSegments = function() {
        transformToList(1);
    };

    var transformToFunc = function() {
        if (OBJ === null)
            return;
        var vs = (OBJ.getE1().isDxyztFunc()) ? OBJ.getE1().value().getVars() : OBJ.getE1().getVars();
        var src = OBJ.getVarName() + "(" + vs + ")";
        var o = new CurvusObject(Cn, "_f", OBJ.getMinSource(), OBJ.getMaxSource(), src);
        o.setColor(OBJ.getColor().getRGBA());
        canvas.addObject(o);
        me.valid();
    };

    // All this messy global code because old android versions (<4.4) need 
    // an "a href" link to open the virtual keyboard... Beside, there were
    // a lot of focus problem to solve to unify behavior in various android
    // version :

    var set_href = function(_bool) {
        if ($U.isOldAndroid()) {
            if ($APPLICATION)
                var lnk = (_bool) ? "http://keyboardshow" : "http://keyboardhide";
            //            var lnk = (_bool) ? "http://www.google.fr" : "javascript:void(0)";
            else
                var lnk = (_bool) ? "javascript:$STANDARD_KBD.show()" : "javascript:void(0)";
            KBBtn.setAttr("href", lnk);
        } else {
            if (_bool) {
                KBBtn_img.removeDownEvent($STANDARD_KBD.hide);
                KBBtn_img.addDownEvent($STANDARD_KBD.show);
            } else {
                KBBtn_img.removeDownEvent($STANDARD_KBD.show);
                KBBtn_img.addDownEvent($STANDARD_KBD.hide);
            }
        }
    };


    $STANDARD_KBD.setbtn = function() {
        set_href(true);
    };
    $STANDARD_KBD.show = function() {
        var act = txtman.getActive();
        if (act !== null) {
            var inp = act.getInput();
            if (inp.style.getPropertyValue('visibility') !== "visible") {
                set_href(false);
                inp.style.setProperty('visibility', 'visible');
                txtman.filterKB(true);
                txtman.setKeyEvents(true);
                inp.value = act.getText();
                inp.focus();
                inp.setSelectionRange(act.getSel().getSelStart(), act.getSel().getSelEnd());
            }
        }
    };
    $STANDARD_KBD.hide = function() {
        var act = txtman.getActive();
        if (act !== null) {
            act.getInput().blur();
        }
    };
    var s_left = me.getBounds().width - 160;
    var s_top = 130;
    var bleft = me.getBounds().width - 250;
    var btop = 80;
    var bwidth = 40;
    var bgap = 25;

    var segBtn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToSegments, bleft - bwidth - bgap, btop, bwidth, bwidth);
    segBtn.addImage($APP_PATH + "NotPacked/images/tools/segment.svg");

    var pointBtn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToPoints, bleft, btop, bwidth, bwidth);
    pointBtn.addImage($APP_PATH + "NotPacked/images/tools/point.svg");

    var func1Btn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToFunc, bleft, btop, bwidth, bwidth);
    func1Btn.addImage($APP_PATH + "NotPacked/images/tools/function.svg");
    bleft += bwidth + bgap;
    var validBtn = new ImageElt(me, "NotPacked/images/calc/valid.svg", me.valid, bleft, btop, bwidth, bwidth);
    // var validBtn = new ImageElt(me, "NotPacked/images/tools/function.svg", me.valid, bleft, btop, bwidth, bwidth);
    bleft += bwidth + bgap;
    var cancelBtn = new ImageElt(me, "NotPacked/images/calc/cancel.svg", me.cancel, bleft, btop, bwidth, bwidth);
    // var cancelBtn = new ImageElt(me, "NotPacked/images/tools/function.svg", me.cancel, bleft, btop, bwidth, bwidth);
    bleft += bwidth + bgap;

    var KBBtn = new GUIElement(me, "a");
    KBBtn.setStyles("position:absolute;border:3px");
    KBBtn.setBounds(bleft, btop + (bwidth - 30) / 2, 48, 30);
    var KBBtn_img = new ImageElt(KBBtn, "NotPacked/images/calc/keyboard.png", null, 0, 0, 48, 30);
    // var KBBtn_img = new ImageElt(KBBtn, "NotPacked/images/tools/function.svg", null, 0, 0, 48, 30);
    set_href(true);
    var doc = ($APPLICATION) ? window.parent.document.body : window.document.body;
    doc.appendChild(KBBtn.getDocObject());
    var deg_slider = null;

    var showDegSlider = function() {
        deg_slider = new slider(me.getDocObject(), s_left, s_top, 150, 50, 0, 1, 0, function(_v) {
            Cn.setDEG(_v === 1);
            Cn.computeAll();
            canvas.paint();
        });
        deg_slider.setDiscrete(true);
        deg_slider.setValueWidth(65);
        deg_slider.setFontSize(14);
        deg_slider.setHeights(14, 20);
        deg_slider.setBackgroundColor("rgba(0,0,0,0)");
        deg_slider.setLabel("RAD", 60);
        deg_slider.setTextColor("#252525");
        deg_slider.setTabValues([
            [0, "DEG"],
            [1, "DEG"]
        ]);
        deg_slider.setValue(1 * Cn.isDEG());
    };


    var showBtns = function() {
        validBtn.show();
        cancelBtn.show();
        KBBtn_img.show();
        showDegSlider();
    };
    var hideBtns = function() {
        segBtn.hide();
        pointBtn.hide();
        func1Btn.hide();
        validBtn.hide();
        cancelBtn.hide();
        KBBtn_img.hide();
        if (deg_slider)
            me.getDocObject().removeChild(deg_slider.getDocObject());
        deg_slider = null;
    };
    hideBtns();
    me.show();


    me.insertText = function(_st) {
        txtman.insertText(_st);
    };

    var setPointBtn = function() {
        if ((OBJ === null) || (OBJ.getCode() !== "expression") || (!OBJ.getE1()))
            return;
        var oneValidValue = OBJ.getE1().getValidValue();
        if (!oneValidValue)
            return;
        var v = OBJ.getE1().getVars().length;
        if ((v === undefined) || (v > 0))
            return;
        if (!$U.isArray(oneValidValue))
            return;
        if ($U.isPoint(oneValidValue) || $U.isPointArrayWithNaN(oneValidValue)) {
            pointBtn.show();
            if ($U.isPointArrayWithNaN(oneValidValue))
                segBtn.show();
        }
    };
    var setFuncBtn = function() {
        if ((OBJ === null) || (OBJ.getCode() !== "expression") || (!OBJ.getE1()))
            return;
        var oneValidValue = OBJ.getE1().getValidValue();

        if (!oneValidValue)
            return;
        if (($U.isArray(oneValidValue)) && (oneValidValue.length !== 2))
            return;
        var v = (OBJ.getE1().isDxyztFunc()) ? OBJ.getE1().value().getVars().length : OBJ.getE1().getVars().length;
        if ((v === undefined) || (v !== 1))
            return;
        func1Btn.show();
    };
    var mainFilter = function() {
        pointBtn.hide();
        segBtn.hide();
        func1Btn.hide();
        setPointBtn();
        setFuncBtn();
        if ((OBJ !== null) && (OBJ.getCode() === "function") && (OBJ.getE1())) {
            E1.setLabel(OBJ.getName() + "(" + OBJ.getE1().getVars() + ") =");
        }
        if ((OBJ !== null) && (OBJ.getCode() === "expression") && (OBJ.getE1()))
            OBJ.refresh();
        return;
    };

    var cFilter = function(_proc, _p1, _p2, _p3) {
        return function(_t) {
            _proc(_t, _p1, _p2, _p3);
            mainFilter();
            if (OBJ) {
                if (Cn.is3D())
                    Cn.computeAll();
                else {
                    OBJ.compute();
                    OBJ.computeChilds();
                }
            }
            canvas.paint();
        }
    }

    var editFilter = function(_proc, _p1, _p2, _p3) {
        return function() {
            _proc(_p1, _p2, _p3);
        }
    }

    me.createObj = function() {
        OBJ = new ExpressionObject(Cn, "_E", "", "", "", "", 50, 120);
        canvas.namesManager.setName(OBJ);
        OBJ.setT("");
        var r = Math.random() * 128;
        var g = Math.random() * 128;
        var b = Math.random() * 128;
        OBJ.setRGBColor(r, g, b);
        canvas.addObject(OBJ);
        E2.setPreferredKB(1);
        E1.setLabel(OBJ.getVarName() + " =");
        E2.setText(OBJ.getText());
        E1.setChangedFilter(cFilter(OBJ.setE1));
        E2.setChangedFilter(cFilter(OBJ.setT));
        MIN.setChangedFilter(cFilter(OBJ.setMin));
        MAX.setChangedFilter(cFilter(OBJ.setMax));
        E1.show();
        E2.show();
        MIN.show();
        MAX.show();
        Cn.compute();
        canvas.paint();
    }

    var editObj = null;
    me.edit = function(_obj) {
        if (OBJ !== null) {
            txtman.insertText(_obj.getVarName());
            txtman.nextCar();
        } else {
            OBJ = _obj;
            switch (OBJ.getCode()) {
                case "expression":
                    txtman.setFirst(false);
                    editObj = [editFilter(OBJ.setE1, OBJ.getE1().getSource().replace(/\\\"/g, "\"")),
                        editFilter(OBJ.setT, OBJ.getText()),
                        editFilter(OBJ.setMin, OBJ.getMinSource()),
                        editFilter(OBJ.setMax, OBJ.getMaxSource())
                    ];
                    E2.setPreferredKB(1);
                    var t = OBJ.getE1().getSource().replace(/\\/g, "");
                    E1.setText(t);
                    MIN.setText(OBJ.getMinSource());
                    MAX.setText(OBJ.getMaxSource());
                    E2.setText(OBJ.getText());
                    E1.show();
                    E2.show();
                    MIN.show();
                    MAX.show();
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    MIN.setChangedFilter(cFilter(OBJ.setMin));
                    MAX.setChangedFilter(cFilter(OBJ.setMax));
                    E2.setChangedFilter(cFilter(OBJ.setT));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(t.length, t.length);
                    break;
                case "list":
                    var _o = OBJ;
                    OBJ = null;
                    me.edit(_o.getEXP());
                    return;
                    break;
                case "function":
                    txtman.setFirst(false);
                    editObj = [editFilter(OBJ.setE1, OBJ.getE1().getSource()),
                        editFilter(OBJ.setMin, OBJ.getMinSource()),
                        editFilter(OBJ.setMax, OBJ.getMaxSource())
                    ];
                    E2.setPreferredKB(0);
                    E1.setText(OBJ.getE1().getSource());
                    MIN.setText(OBJ.getMinSource());
                    MAX.setText(OBJ.getMaxSource());
                    E1.show();
                    E2.hide();
                    MIN.show();
                    MAX.show();
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    MIN.setChangedFilter(cFilter(OBJ.setMin));
                    MAX.setChangedFilter(cFilter(OBJ.setMax));
                    E1.setLabel(OBJ.getName() + "(" + OBJ.getE1().getVars() + ") =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getE1().getSource().length, OBJ.getE1().getSource().length);
                    break;
                case "fixedangle":
                    txtman.setFirst(false);
                    var ex = OBJ.getExp();
                    editObj = [editFilter(OBJ.setE1, ex)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getExp().length, OBJ.getExp().length);
                    break;
                case "circle1":
                    txtman.setFirst(false);
                    var ex = OBJ.getRX() ? OBJ.getRX().getSource() : OBJ.getR();
                    editObj = [editFilter(OBJ.setRX, ex)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    ex = OBJ.getRX() ? ex : Cn.coordsSystem.l(ex);
                    OBJ.setRX("" + ex);
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setRX));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getRX().getSource().length, OBJ.getRX().getSource().length);
                    break;
                case "point":
                    // Si le point est flottant ou n'est pas libre, on ne l'édite pas :
                    if ((!OBJ.getEXY()) && ((OBJ.getParentLength() > 0) || (OBJ.getFloat()))) {
                        OBJ = null;
                        return;
                    }
                    txtman.setFirst(false);
                    var ex = OBJ.getEXY() ? OBJ.getEXY().getSource() : OBJ.getX();
                    var ey = OBJ.getY();
                    editObj = [editFilter(OBJ.setEXY, ex, ey)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    ex = OBJ.getEXY() ? ex : "[" + Cn.coordsSystem.x(ex) + "," + Cn.coordsSystem.y(ey) + "]";
                    OBJ.setEXY(ex);
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setEXY));
                    E1.setLabel("[X,Y] =");
                    txtman.activate(E1);
                    var t = "" + E1.getText() + "";
                    E1.setSelectionRange(t.length, t.length);
                    break;
                default:
                    OBJ = null;
                    break;
            }
            mainFilter();

        }

    }

}
