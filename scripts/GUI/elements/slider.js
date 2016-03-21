/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function slider(_owner, _left, _top, _width, _height, _min, _max, _value, _callback) {
    var me = this;
    var tabvalues = null;
    var tablabels = null;
    var labelwidth = 0;
    var label = "";
    var valuewidth = 40;
    var fontsize = 12;
    var valueprecision = Math.round(1 / 0.01);
    var sliderheight = 6;
    var indicatorwidth = 18;
    var min = _min,
        max = _max,
        value = _value,
        sw_width;
    var discrete = false;
    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();
    var label_wrapper = createDiv();
    var slider_wrapper = createDiv();
    var value_wrapper = createDiv();
    var indicator = createDiv();
    var slider_back = createDiv();
    var slider_front = createDiv();

    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };
    var lwp = function(_p, _v) {
        label_wrapper.style.setProperty(_p, _v);
    };
    var swp = function(_p, _v) {
        slider_wrapper.style.setProperty(_p, _v);
    };
    var vwp = function(_p, _v) {
        value_wrapper.style.setProperty(_p, _v);
    };
    var ip = function(_p, _v) {
        indicator.style.setProperty(_p, _v);
    };
    var sbp = function(_p, _v) {
        slider_back.style.setProperty(_p, _v);
    };
    var sbf = function(_p, _v) {
        slider_front.style.setProperty(_p, _v);
    };
    var init = function() {
        wp("background-color", "rgba(0,0,0,1)");
        wp("position", "absolute");
        vwp("background-color", "rgba(0,0,0,0)");
        vwp("position", "absolute");
        vwp("font-family", "Helvetica, Arial, sans-serif");
        vwp("font-size", fontsize + "px");
        vwp("text-align", "center");
        vwp("line-height", _height + "px");
        vwp("overflow", "hidden");
        swp("background-color", "rgba(0,0,0,0)");
        swp("position", "absolute");
        swp("overflow", "visible");

        lwp("background-color", "rgba(0,255,0,0)");
        lwp("position", "absolute");
        lwp("font-family", "Helvetica, Arial, sans-serif");
        lwp("font-size", fontsize + "px");
        lwp("text-align", "center");
        lwp("line-height", _height + "px");

        sbp("position", "absolute");
        sbp("background-image", "linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-o-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-moz-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-webkit-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-ms-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("-moz-border-radius", "6px");
        sbp("-o-border-radius", "6px");
        sbp("-webkit-border-radius", "6px");
        sbp("border-radius", "6px");
        sbp("border", "1px solid #A7A7A7");

        sbf("position", "absolute");
        sbf("background-image", "linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-o-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-moz-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-webkit-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-ms-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("-moz-border-radius", "6px");
        sbf("-o-border-radius", "6px");
        sbf("-webkit-border-radius", "6px");
        sbf("border-radius", "6px");
        sbf("border", "1px solid #789BBF");

        ip("position", "absolute");
        ip("background-image", "linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-o-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-moz-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-webkit-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-ms-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("-moz-border-radius", (indicatorwidth / 2) + "px");
        ip("-o-border-radius", (indicatorwidth / 2) + "px");
        ip("-webkit-border-radius", (indicatorwidth / 2) + "px");
        ip("border-radius", (indicatorwidth / 2) + "px");
        ip("border", "1px solid #BEBEBE");
    }

    init();


    me.setHeights = function(_h1, _h2) {
        sliderheight = _h1;
        indicatorwidth = _h2;
        init();
        setBounds(_left, _top, _width, _height);
    };

    me.setDiscrete = function(_dis) {
        discrete = _dis;
    };

    me.setLabel = function(_t, _w) {
        label = _t;
        labelwidth = _w;
        lwp("left", "0px");
        lwp("top", "0px");
        lwp("width", _w + "px");
        lwp("height", _height + "px");
        swp("left", _w + "px");
        sw_width = (_width - valuewidth - _w);
        swp("width", sw_width + "px");
        ip("left", ((value - min) * (_width - valuewidth - _w) / (max - min) - indicatorwidth / 2) + "px");
        sbf("width", ((value - min) * (_width - valuewidth - _w) / (max - min)) + "px");
        label_wrapper.innerHTML = _t;
    };

    me.setValueWidth = function(_v) {
        valuewidth = _v;
        setBounds(_left, _top, _width, _height);
        me.setLabel(label, labelwidth);
    };

    me.setTextColor = function(_col) {
        lwp("color", _col);
        vwp("color", _col);
    };

    me.setFontSize = function(_sz) {
        fontsize = _sz;
        lwp("font-size", _sz + "px");
        vwp("font-size", _sz + "px");
    };

    me.setValuePrecision = function(_prec) {
        valueprecision = Math.round(1 / _prec);
        refreshValue();
    };

    me.setMin = function(_m) {
        min = _m;
        refreshValue();
    };

    me.setMax = function(_m) {
        max = _m;
        refreshValue();
    };

    me.setBackgroundColor = function(_col) {
        wp("background-color", _col);
    };

    var refreshValue = function() {
        value_wrapper.innerHTML = (tabvalues) ? tablabels[Math.round(value)] : me.getValue();
    };

    me.getValue = function() {
        if (tabvalues)
            return tabvalues[Math.round(value)];
        else
            return (Math.round(value * valueprecision) / valueprecision);
    };

    me.getDocObject = function() {
        return wrapper;
    }

    me.setValue = function(_val) {
        var v = (tabvalues) ? tabvalues.indexOf(_val) : _val;
        value = v;
        refreshValue();
        me.setValueWidth(valuewidth);
    };

    me.setTabValues = function(_t) {
        min = 0;
        max = _t.length - 1;
        valueprecision = 1;
        tabvalues = [];
        tablabels = [];
        for (var i = 0; i < _t.length; i++) {
            if (_t[i] instanceof Array) {
                tabvalues.push(_t[i][0]);
                tablabels.push(_t[i][1]);
            } else {
                tabvalues.push(_t[i]);
                tablabels.push(_t[i]);
            }
        }
        //        tabvalues = _t;
    };

    me.getTabValues = function() {
        return tabvalues;
    };

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
        vwp("left", (_w - valuewidth) + "px");
        vwp("top", "0px");
        vwp("width", valuewidth + "px");
        vwp("height", _h + "px");
        swp("left", "0px");
        swp("top", "0px");
        sw_width = (_w - valuewidth);
        swp("width", sw_width + "px");
        swp("height", _h + "px");
        sbp("top", ((_h - sliderheight) / 2) + "px");
        sbp("width", "100%");
        sbp("height", sliderheight + "px");
        ip("top", ((_h - indicatorwidth) / 2) + "px");
        ip("width", indicatorwidth + "px");
        ip("height", indicatorwidth + "px");
        //        console.log(value* (_w - valuewidth) / (max - min));
        ip("left", ((value - min) * (_w - valuewidth) / (max - min) - indicatorwidth / 2) + "px");
        sbf("top", ((_h - sliderheight) / 2) + "px");
        sbf("width", ((value - min) * (_w - valuewidth) / (max - min)) + "px");
        sbf("height", sliderheight + "px");
        sbf("left", "0px");
        refreshValue();
    };


    var getOffset = function(obj) {
        var obj2 = obj;
        var curtop = 0;
        var curleft = 0;
        if (document.getElementById || document.all) {
            do {
                curleft += obj.offsetLeft - obj.scrollLeft;
                curtop += obj.offsetTop - obj.scrollTop;
                obj = obj.offsetParent;
                obj2 = obj2.parentNode;
                while (obj2 !== obj) {
                    curleft -= obj2.scrollLeft;
                    curtop -= obj2.scrollTop;
                    obj2 = obj2.parentNode;
                }
            } while (obj.offsetParent)
        } else if (document.layers) {
            curtop += obj.y;
            curleft += obj.x;
        }
        //        alert("left="+curleft+" top="+curtop);
        return {
            "left": curleft,
            "top": curtop
        };
    };

    var mouseX = function(ev) {
        return (ev.pageX - getOffset(slider_wrapper).left);
    };



    var mousepressed = false;

    var mousedown = function(ev) {
        ev.preventDefault();
        mousepressed = true;
        mousemove(ev);
    };
    var touchdown = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mousedown($U.PadToMouseEvent(touch));
        }
    };


    var mousemove = function(ev) {
        ev.preventDefault();
        if (mousepressed) {
            ev = ev || window.event;
            var mouse = mouseX(ev);
            var oldval = value;

            if (mouse < 0)
                mouse = 0;
            else if (mouse > sw_width)
                mouse = sw_width;
            value = min + (mouse * (max - min) / sw_width);
            if (discrete) {
                value = Math.round(value);
                mouse = sw_width * (value - min) / (max - min);
            }
            ip("left", (mouse - indicatorwidth / 2) + "px");
            sbf("width", mouse + "px");
            refreshValue();
            if ((_callback) && (oldval !== value)) {
                var val = (tabvalues) ? tabvalues[Math.round(value)] : me.getValue();
                _callback(val);
            }
        }
    };
    var touchmove = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mousemove($U.PadToMouseEvent(touch));
        }
    };


    var mouseup = function(ev) {
        ev.preventDefault();
        mousepressed = false;
    };
    var touchup = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mouseup($U.PadToMouseEvent(touch));
        }
    };

    me.setWindowsEvents = function() {
        slider_wrapper.removeEventListener('touchstart', touchdown, false);
        slider_wrapper.removeEventListener('touchmove', touchmove, false);
        slider_wrapper.removeEventListener('mousemove', mousemove, false);
        _owner.removeEventListener('mouseup', mouseup, false);

        _owner.addEventListener('touchstart', touchdown, false);
        _owner.addEventListener('touchmove', touchmove, false);
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
    };

    me.removeWindowsEvents = function() {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    };



    slider_wrapper.addEventListener('touchstart', touchdown, false);
    slider_wrapper.addEventListener('touchmove', touchmove, false);
    _owner.addEventListener('touchend', touchup, false);
    slider_wrapper.addEventListener('mousedown', mousedown, false);
    slider_wrapper.addEventListener('mousemove', mousemove, false);
    _owner.addEventListener('mouseup', mouseup, false);

    setBounds(_left, _top, _width, _height);
    slider_wrapper.appendChild(slider_back);
    slider_wrapper.appendChild(slider_front);
    slider_wrapper.appendChild(indicator);
    wrapper.appendChild(label_wrapper);
    wrapper.appendChild(value_wrapper);
    wrapper.appendChild(slider_wrapper);
    _owner.appendChild(wrapper);
};
