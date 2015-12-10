/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function PropertiesPanel(_canvas) {
    var me = this;
    var canvas = _canvas;
    $U.extend(this, new VerticalBorderPanel(canvas, 240, false));
    me.setBounds(me.getBounds().left + 15, -5, 0, 0); // Le fond n'est pas affiché

    me.show();

    me.getCS = function () {
        return canvas.getConstruction().coordsSystem;
    };

    me.setMagnifierMode = function (_val) {
        canvas.magnifyManager.setMagnifierMode(_val);
    };
    me.getMagnifierMode = function () {
        return canvas.magnifyManager.getMagnifierMode();
    };
    me.setDegree = function (_val) {
        canvas.getConstruction().setDEG(_val);
        canvas.getConstruction().computeAll();
        canvas.paint();
    };
    me.getDegree = function (_val) {
        return canvas.getConstruction().isDEG();
    };
    me.setDemoMode = function (_val) {
        canvas.demoModeManager.setDemoMode(_val);
    };
    me.getDemoMode = function () {
        return canvas.demoModeManager.getDemoMode();
    };
    me.getBackgroundColor = function () {
        return canvas.getBackground();
    };
    me.setBackgroundColor = function (val) {
        return canvas.setBackground(val);
    };

    var props_name = new props_namePanel(me);
    var props_color = new props_colorPanel(me);
    var props_grid = new props_gridPanel(me);
    var props_message = new props_messagePanel(me);
    // Une ineptie necessaire parce que sinon le clavier virtuel
    // de l'ipad change la position du panneau de propriété :
    if (Object.touchpad) {
        window.scrollTo(0, 0);
    }

    props_message.show();

    me.showProperties = function (_obj) {
        if ($U.isMobile.mobilePhone()) {
            props_color.clearContent();
            props_message.clearContent();
        }

        props_message.close();
        if (_obj.getCode().startsWith("axis")) {
            if ($U.isMobile.mobilePhone())
                props_color.clearContent();
            props_color.close();
            props_name.close();
            props_grid.show();
            props_grid.set();
        } else {
            props_grid.close();
            if (_obj.getCode() === "expression_cursor")
                props_name.close();
            else
                props_name.set(_obj);

            props_color.set(_obj);
            // Une ineptie necessaire parce que sinon le clavier virtuel
            // de l'ipad change la position du panneau de propriété :
            if (Object.touchpad) {
                window.scrollTo(0, 0);
            }
        }
    };
//
    me.compute = function () {
        canvas.getConstruction().computeAll();
    };
    me.repaint = function () {
        canvas.paint();
    };


    me.setAllSize = function (_type, _sze) {
        canvas.getConstruction().setAllSize(_type, _sze);
    };
    me.setAllColor = function (_type, _sze) {
        canvas.getConstruction().setAllColor(_type, _sze);
    };
    me.setAllOpacity = function (_type, _sze) {
        canvas.getConstruction().setAllOpacity(_type, _sze);
    };
    me.setAllLayer = function (_type, _sze) {
        canvas.getConstruction().setAllLayer(_type, _sze);
    };
    me.setAllPtShape = function (_shape) {
        canvas.getConstruction().setAllPtShape(_shape);
    };
    me.setAllFontSize = function (_type, _sze) {
        canvas.getConstruction().setAllFontSize(_type, _sze);
    };
    me.setAllPrecision = function (_type, _sze) {
        canvas.getConstruction().setAllPrecision(_type, _sze);
    };
    me.setAllIncrement = function (_type, _sze) {
        canvas.getConstruction().setAllIncrement(_type, _sze);
    };
    me.setAllDash = function (_type, _sze) {
        canvas.getConstruction().setAllDash(_type, _sze);
    };
    me.setAll360 = function (_type, _360) {
        canvas.getConstruction().setAll360(_type, _360);
    };
    me.setAllNoMouse = function (_type, _sze) {
        canvas.getConstruction().setAllNoMouse(_type, _sze);
    };
    me.setTrack = function (_o, _val) {
        if (_val)
            canvas.trackManager.add(_o);
        else
            canvas.trackManager.remove(_o);
    };
    me.setAllTrack = function (_type, _val) {
        canvas.trackManager.setAllTrack(_type, _val);
    };

}




function  props_panel(_owner) {
    $U.extend(this, new Panel(_owner.getDocObject()));
    this.obj = null;
    this.owner = _owner;

    this.set = function (_obj) {
        this.obj = _obj;
        this.setObj();
    };

// callback function :
    this.setObj = function () {
    };

    this.repaint = function () {
        this.owner.repaint();
    };
    this.compute = function () {
        this.owner.compute();
    };
}
;

function props_messagePanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    me.setAttr("className", "props_messageDIV");
    me.transition("translate_x", 0.2, 200);

    var ch = 20;
    var t1 = new Label(me);
    t1.setText($L.props_grid_message);
    t1.setStyles("color:#252525;font-style: italic");
    t1.setBounds(0, 20, 220, 20);
    me.addContent(t1);
    ch += 50;

    var t2 = new Label(me);
    t2.setText($L.props_grid_general + " :");
    t2.setStyles("font-weight:bold;font-size:16px;color:#252525");
    t2.setBounds(0, ch, 220, 20);
    me.addContent(t2);
    ch += 30;

    var DEMOcallback = function (val) {
//        $U.setDemoMode(val);
        _owner.setDemoMode(val);
    };
    var MAGNIFIERcallback = function (val) {
        _owner.setMagnifierMode(val);
    };
    var COLORcallback = function (val) {
        _owner.setBackgroundColor(val)
    };
    var DEGREEcallback = function (val) {
        _owner.setDegree(val);
    };

    var cp = new ColorPicker(me.getDocObject(), 10, ch, 200, 200);
    cp.setHEXcallback(COLORcallback);
    cp.setHEX(_owner.getBackgroundColor());
    ch += 210;

    var cbDemoMode = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getDemoMode(), $L.props_grid_general_demo, DEMOcallback);
    cbDemoMode.setTextColor("#252525");
    ch += 30;

    var cbMagnifier = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getMagnifierMode(), $L.props_general_magnifier, MAGNIFIERcallback);
    cbMagnifier.setTextColor("#252525");
    ch += 30;

    var cbDegree = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getDegree(), $L.props_general_degree, DEGREEcallback);
    cbMagnifier.setTextColor("#252525");

}


function props_gridPanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    var CS = this.owner.getCS();
    var ch = 120; // Color picker height
    me.setAttr("className", $U.isMobile.mobilePhone() ? "props_gridDIV_Mobile" : "props_gridDIV");
    me.transition("translate_x", 0.2, 200);

    var title = new Label(me);
    title.setText($L.props_grid_title);
    title.setStyle("color", "#252525");
    title.setBounds(0, 10, 220, 20);

    var HEXcallback = function (_c) {
        CS.setColor(_c);
        me.repaint();
    }
    if (!$U.isMobile.mobilePhone()) {
        var cp = new ColorPicker(me.getDocObject(), 10, 40, 200, ch);
        cp.setHEXcallback(HEXcallback);
        ch += 50;
    } else
        ch = 40;


    var FONTcallback = function (_s) {
        CS.setFontSize(_s);
        me.repaint();
    }
    var sFont = new slider(me.getDocObject(), 10, ch, 200, 40, 6, 60, CS.getFontSize(), FONTcallback);
    sFont.setValueWidth(40);
    sFont.setLabel($L.props_font, 110);
    sFont.setTextColor("#252525");
    sFont.setValuePrecision(1);
    sFont.setBackgroundColor("rgba(0,0,0,0)");
    ch += 40;

    var AXIScallback = function (_s) {
        CS.setAxisWidth(_s);
        me.repaint();
    }
    var sAxis = new slider(me.getDocObject(), 10, ch, 200, 40, 0.5, 10, CS.getAxisWidth(), AXIScallback);
    sAxis.setValueWidth(40);
    sAxis.setLabel($L.props_axis_size, 110);
    sAxis.setTextColor("#252525");
    sAxis.setValuePrecision(0.5);
    sAxis.setBackgroundColor("rgba(0,0,0,0)");
    ch += 40;
    var GRIDcallback = function (_s) {
        CS.setGridWidth(_s);
        me.repaint();
    }
    var sAxis = new slider(me.getDocObject(), 10, ch, 200, 40, 0.1, 2, CS.getGridWidth(), GRIDcallback);
    sAxis.setValueWidth(40);
    sAxis.setLabel($L.props_grid_size, 110);
    sAxis.setTextColor("#252525");
    sAxis.setValuePrecision(0.1);
    sAxis.setBackgroundColor("rgba(0,0,0,0)");
    ch += 50;


    var SHGRIDcallback = function (_s) {
        CS.showGrid(_s);
        me.repaint();
    }
    var cbshowCS = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isGrid(), $L.props_grid_show, SHGRIDcallback);
    cbshowCS.setTextColor("#252525");
    ch += 30;

    var OXcallback = function (_s) {
        CS.showOx(_s);
        me.repaint();
    }
    var cbshowOX = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isOx(), $L.props_ox_show, OXcallback);
    cbshowOX.setTextColor("#252525");
    ch += 30;

    var OYcallback = function (_s) {
        CS.showOy(_s);
        me.repaint();
    }
    var cbshowOY = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isOy(), $L.props_oy_show, OYcallback);
    cbshowOY.setTextColor("#252525");
    ch += 30;

    var LockXcallback = function (_s) {
        CS.setlockOx(_s);
        me.repaint();
    }
    var cblockX = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.islockOx(), $L.props_ox_lock, LockXcallback);
    cblockX.setTextColor("#252525");
    ch += 30;

    var LockYcallback = function (_s) {
        CS.setlockOy(_s);
        me.repaint();
    }
    var cblockY = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.islockOy(), $L.props_oy_lock, LockYcallback);
    cblockY.setTextColor("#252525");
    ch += 30;

    var CenterZcallback = function (_s) {
        CS.setCenterZoom(_s);
        me.repaint();
    };

    var cbcenterzoom = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isCenterZoom(), $L.props_center_zoom, CenterZcallback);
    cbcenterzoom.setTextColor("#252525");


    this.setObj = function () {
        if (!$U.isMobile.mobilePhone()) {
            cp.setHEX(CS.getColor());
        }
    };

    me.addContent(title);
}


function props_namePanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    me.setAttr("className", "props_nameDIV");
    me.transition("translate_x", 0.2, 200);


    var input = new InputText(me);
    input.setBounds(10, 10, 100, 25);
    me.addContent(input);

    var show_callback = function (_val) {
        me.obj.setShowName(_val);
        me.repaint();
    }

    var show = new Checkbox(me.getDocObject(), 130, 8, 100, 30, false, $L.props_showname, show_callback);
    show.setTextColor("#252525");

    input.valid_callback = function (_t) {
    };

    input.keyup_callback = function (_t) {
        me.obj.setName(_t);
        me.obj.setShowName(true);
        show.setValue(true);
        me.obj.refreshChildsNames();
        me.repaint();
    };


    this.focus = function () {
        input.focus();
        input.selectAll();
    };

    this.setObj = function () {
        input.setText(me.obj.getName());
        show.setValue(me.obj.getShowName());
        if (me.isVisible()) {
            if (!Object.touchpad) {
                me.focus();
            }
        } else {
            me.show();
            if (!Object.touchpad) {
                setTimeout(function () {
                    me.focus();
                }, 300);
            }
        }
    };
}

function props_colorPanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    var ch = 100; // Color picker height
    var cp = null; // Color picker
    var sOpacity = null;
    var sSize = null;
    var segSize = null;
    var sLayer = null;
    var sFont = null;
    var sPrec = null;
    var sInc = null;
    var pShape = null;
    var cbApplyAll = null;
    var cbDash = null;
    var cbNomouse = null;
    var cbTrack = null;
    var setall = false;




    me.setAttr("className", $U.isMobile.mobilePhone() ? "props_colorDIV_Mobile" : "props_colorDIV");
    me.transition("translate_x", 0.2, 200);

    var HEXcallback = function (_hex) {
        if (setall)
            _owner.setAllColor(me.obj.getFamilyCode(), _hex);
        else
            me.obj.setColor(_hex);
        me.repaint();
    };

    var BOcallback = function (_val) {
        if (setall)
            _owner.setAllOpacity(me.obj.getFamilyCode(), _val);
        else
            me.obj.setOpacity(_val);
        me.repaint();
    };

    var SZcallback = function (_val) {
        if (setall)
            _owner.setAllSize(me.obj.getFamilyCode(), _val);
        else {
            if ((me.obj.getCode() === "list") && (_val === 0) && (me.obj.getSegmentsSize() === 0)) {
                me.obj.setSegmentsSize(0.1);
                segSize.setValue(0.1);
            }
            me.obj.setSize(_val);
        }
        me.repaint();
    };
    var SegSZcallback = function (_val) {
        if ((_val === 0) && (me.obj.getSize() === 0)) {
            me.obj.setSize(0.1);
            sSize.setValue(0.1);
        }
        me.obj.setSegmentsSize(_val);
        me.obj.computeChilds();
        me.repaint();
    };
    var LAYcallback = function (_val) {
        if (setall)
            _owner.setAllLayer(me.obj.getFamilyCode(), _val);
        else
            me.obj.setLayer(_val);
        me.repaint();
    };

    var FONTcallback = function (_val) {
        if (setall)
            _owner.setAllFontSize(me.obj.getFamilyCode(), _val);
        else
            me.obj.setFontSize(_val);
        me.repaint();
    };


    var PRECcallback = function (_val) {
        if (setall)
            _owner.setAllPrecision(me.obj.getFamilyCode(), _val);
        else {
            me.obj.setPrecision(_val);
            if ((me.obj.getCode() === "locus") || (me.obj.getCode() === "quadric")) {
                me.obj.compute();
            }
        }
        me.repaint();
    };
    var INCCcallback = function (_val) {
        if (setall)
            _owner.setAllIncrement(me.obj.getFamilyCode(), _val);
        else
            me.obj.setIncrement(_val);
        me.compute();
        me.repaint();
    };

    var PSHAPEcallback = function (_val) {
        if (setall)
            _owner.setAllPtShape(_val);
        else
            me.obj.setShape(_val);
        me.repaint();
    };
    var APALLcallback = function (_val) {
        setall = _val;
    };
    var DSHcallback = function (_val) {
        if (setall)
            _owner.setAllDash(me.obj.getFamilyCode(), _val);
        else
            me.obj.setDash(_val);
        me.repaint();
    };
    var m360callback = function (_val) {
        if (setall)
            _owner.setAll360(me.obj.getFamilyCode(), _val);
        else
            me.obj.set360(_val);
        me.compute();
        me.repaint();
    };
    
    var NOMOUSEcallback = function (_val) {
        if (setall)
            _owner.setAllNoMouse(me.obj.getFamilyCode(), _val);
        else
            me.obj.setNoMouseInside(_val);
        me.repaint();
    };
    var TRKcallback = function (_val) {
        if (setall)
            _owner.setAllTrack(me.obj.getFamilyCode(), _val);
        else
            _owner.setTrack(me.obj, _val);
    };

    var precVal = function (val) {
        if (val === -1)
            return val;
        else
            return $U.log(val);
    };


    me.setPickerColor = function (_hex) {
        if (!$U.isMobile.mobilePhone())
            cp.setHEX(_hex);
        HEXcallback(_hex);
    };


    me.setObj = function () {
        me.clearContent();
        ch = 140;

        if (!$U.isMobile.mobilePhone()) {
            cp = new ColorPicker(me.getDocObject(), 10, 10, 200, ch);
            cp.setHEXcallback(HEXcallback);
            cp.setHEX(me.obj.getColor().getHEX());
            ch += 25;
        } else
            ch = 10;

        if ($U.isMobile.mobilePhone()) {
            new props_generic_color(me, "rgb(0,0,178)", 10, ch, 24);
            new props_generic_color(me, "rgb(0,124,124)", 51, ch, 24);
            new props_generic_color(me, "rgb(0,124,0)", 92, ch, 24);
            new props_generic_color(me, "rgb(150,100,0)", 133, ch, 24);
            new props_generic_color(me, "rgb(180,0,0)", 174, ch, 24);
            ch += 34;
        }

        if (!$U.isMobile.mobilePhone()) {
            pShape = new ImageGroup(me.getDocObject(), 10, ch, 200, 25
                    , $APP_PATH + "NotPacked/images/pointshape/bgOff.svg", $APP_PATH + "NotPacked/images/pointshape/bgOn.svg", PSHAPEcallback);
            pShape.setImageSize(25);
            pShape.setMargin(15);
            pShape.setHspace(25);
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/circle.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/cross.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/diamond.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/square.svg");
            pShape.select(me.obj.getShape());
            ch += 30;
        }

        var sh = 35;
        sSize = new slider(me.getDocObject(), 10, ch, 200, sh, 0.5, 25, me.obj.getSize(), SZcallback);
        sSize.setValueWidth(40);
        sSize.setLabel($L.props_size, 80);
        sSize.setTextColor("#252525");
        sSize.setValuePrecision(0.5);
        sSize.setBackgroundColor("rgba(0,0,0,0)");
        sSize.setValue(me.obj.getSize());


        if (me.obj.getCode() === "list") {
            ch += sh;
            sSize.setMin(0);
            sSize.setMax(6);
            sSize.setValuePrecision(0.1);
            sSize.setValue(me.obj.getSize());
            segSize = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 6, me.obj.getSegmentsSize(), SegSZcallback);
            segSize.setValueWidth(40);
            segSize.setLabel($L.props_segment_size, 80);
            segSize.setTextColor("#252525");
            segSize.setValuePrecision(0.1);
            segSize.setBackgroundColor("rgba(0,0,0,0)");
        }

        ch += sh;
        sOpacity = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 1, me.obj.getOpacity(), BOcallback);
        sOpacity.setValueWidth(40);
        sOpacity.setLabel($L.props_opacity, 80);
        sOpacity.setTextColor("#252525");
        sOpacity.setValuePrecision(0.01);
        sOpacity.setBackgroundColor("rgba(0,0,0,0)");
        sOpacity.setValue(me.obj.getOpacity());

        ch += sh;
        sLayer = new slider(me.getDocObject(), 10, ch, 200, sh, -8, 8, me.obj.getLayer(), LAYcallback);
        sLayer.setValueWidth(40);
        sLayer.setLabel($L.props_layer, 80);
        sLayer.setTextColor("#252525");
        sLayer.setValuePrecision(1);
        sLayer.setBackgroundColor("rgba(0,0,0,0)");
        sLayer.setValue(me.obj.getLayer());

        ch += sh;
        sFont = new slider(me.getDocObject(), 10, ch, 200, sh, 6, 60, me.obj.getFontSize(), FONTcallback);
        sFont.setValueWidth(40);
        sFont.setLabel($L.props_font, 80);
        sFont.setTextColor("#252525");
        sFont.setValuePrecision(1);
        sFont.setBackgroundColor("rgba(0,0,0,0)");
        sFont.setValue(me.obj.getFontSize());

        ch += sh;

        sPrec = new slider(me.getDocObject(), 10, ch, 200, sh, -1, 13, 0, PRECcallback);
        sPrec.setValueWidth(40);
        sPrec.setTextColor("#252525");
        sPrec.setValuePrecision(1);
        sPrec.setBackgroundColor("rgba(0,0,0,0)");
        if ((me.obj.getCode() === "locus") || (me.obj.getCode() === "quadric")) {
            sPrec.setTabValues([[1, $L.Locus_density_min], 5, 10, 20, 50, 100, 200, 500, 1000, 1500, 2000, [5000, $L.Locus_density_max]]);
            sPrec.setValue(me.obj.getPrecision());
            sPrec.setLabel($L.Locus_density, 80);
        } else {
            sPrec.setTabValues([[-1, $L.props_length_none], 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
            sPrec.setValue(precVal(me.obj.getPrecision()));
            sPrec.setLabel($L.props_length, 80);
        }

        ch += sh;
        var cbh = 30;
        if ((me.obj.getCode() === "angle") || (me.obj.getCode() === "fixedangle")) {
            cbDash = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_360, m360callback);
            cbDash.setTextColor("#252525");
            cbDash.setValue(me.obj.is360());
            ch += cbh;
        } else {
            sInc = new slider(me.getDocObject(), 10, ch, 200, sh, -4, 4, 0, INCCcallback);
            sInc.setTabValues([[0, $L.props_inc_free], 0.001, 0.01, 0.1, 0.5, 1, 2, 5, 10, 100, 1000]);
            sInc.setValue(me.obj.getIncrement());
            sInc.setValueWidth(40);
            sInc.setLabel($L.props_inc, 80);
            sInc.setTextColor("#252525");
            sInc.setValuePrecision(1);
            sInc.setBackgroundColor("rgba(0,0,0,0)");
            sInc.setValue(me.obj.getIncrement());
            ch += sh;
        }



        
        
        cbDash = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_dash, DSHcallback);
        cbDash.setTextColor("#252525");
        cbDash.setValue(me.obj.isDash());

        if (!$U.isMobile.mobilePhone()) {
            ch += cbh;
            cbNomouse = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_nomouse, NOMOUSEcallback);
            cbNomouse.setTextColor("#252525");
            cbNomouse.setValue(me.obj.isNoMouseInside());
        }

        if (me.obj.getCode() !== "list") {
            ch += cbh;
            cbTrack = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_track, TRKcallback);
            cbTrack.setTextColor("#252525");
            cbTrack.setValue(me.obj.isTrack());
        }
        ch += cbh;
        cbApplyAll = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_applyall + $L.object.family[me.obj.getFamilyCode()], APALLcallback);
        cbApplyAll.setTextColor("#252525");
        cbApplyAll.setText($L.props_applyall + $L.object.family[me.obj.getFamilyCode()]);
        cbApplyAll.setValue(setall = false);


        me.show();
    };
}



function props_generic_color(_owner, _col, _left, _top, _width) {
    var me = this;
    var col = new Color();
    col.set(_col);
    var lambda = 0.4;
    var r = Math.round(255 * (1 - lambda) + lambda * col.getR());
    var g = Math.round(255 * (1 - lambda) + lambda * col.getG());
    var b = Math.round(255 * (1 - lambda) + lambda * col.getB());
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    $U.extend(this, new GUIElement(_owner, "div"));
    me.setStyle("background-color", rgb);
    me.setStyle("border-color", _col);
    me.setStyle("border-width", "4px");
    me.setStyle("border-style", "solid");
    me.setStyle("border-radius", "16px");
    me.setAbsolute();
    me.setBounds(_left, _top, _width, _width);

    var proc = function () {
        _owner.setPickerColor(col.getHEX());
    };

    me.addDownEvent(proc);

    _owner.addContent(me);

}
;