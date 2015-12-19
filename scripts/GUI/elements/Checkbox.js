function Checkbox(_owner, _left, _top, _width, _height, _value, _label, _callback) {
    var me = this;
    var boxwidth = 16;
    var value;

    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();
    var box_wrapper = createDiv();
    var label_wrapper = createDiv();
    var checkbox = createDiv();
    var tick = createDiv();

    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };
    var bwp = function(_p, _v) {
        box_wrapper.style.setProperty(_p, _v);
    };
    var lwp = function(_p, _v) {
        label_wrapper.style.setProperty(_p, _v);
    };
    var cbp = function(_p, _v) {
        checkbox.style.setProperty(_p, _v);
    };
    var tp = function(_p, _v) {
        tick.style.setProperty(_p, _v);
    };

    wp("background-color", "rgba(0,0,0,0)");
    wp("position", "absolute");

    bwp("background-color", "rgba(255,0,0,0)");
    bwp("position", "absolute");
    bwp("overflow", "visible");

    lwp("background-color", "rgba(0,255,0,0)");
    lwp("position", "absolute");
    lwp("font-family", "Helvetica, Arial, sans-serif");
    lwp("font-size", "13px");
    lwp("text-align", "left");
    lwp("line-height", _height + "px");
    lwp("white-space", "nowrap");
    lwp("overflow", "hidden");

    cbp("position", "absolute");
    cbp("background-color", "rgba(255,255,255,1)");
    cbp("background", "-webkit-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-moz-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-o-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-ms-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("-webkit-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-moz-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-o-box-shadow", "inset 1px 1px 2px rgba(0,0,0,.3), inset 0 0 0 1px rgba(0,0,0,.1)");
    cbp("-o-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("box-shadow", "inset 1px 1px 2px rgba(0,0,0,.2), inset 0 0 0 1px rgba(0,0,0,.1)");
    cbp("box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-webkit-border-radius", ".3rem");
    cbp("-moz-border-radius", ".3rem");
    cbp("-o-border-radius", "3px");
    cbp("-o-border-radius", ".3rem");
    cbp("border-radius", "3px");
    cbp("border-radius", ".3rem");

    tp("position", "absolute");
    tp("left", ".4rem");
    tp("width", "1.4rem");
    tp("height", ".6rem");
    tp("border-style", "solid");
    tp("border-color", "#01C30C");
    tp("border-width", "0 0 .2rem .3rem");
    tp("-webkit-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-moz-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-o-box-shadow", "-1px 1px 1px 0 rgba(0,0,0,.4)");
    tp("-o-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("box-shadow", "-1px 1px 1px 0 rgba(0,0,0,.4)");
    tp("box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(1)");
    tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("-webkit-transform-origin", "0 100%");
    tp("-moz-transform-origin", "0 100%");
    tp("-o-transform-origin", "0 100%");
    tp("transform-origin", "0 100%");


    me.setTextColor = function(_col) {
        lwp("color", _col);
    };

    me.setText = function(_t) {
        label_wrapper.innerHTML = _t;
    };

    me.getValue = function() {
        return value;
    };

    me.setValue = function(_val) {
        value = _val;
        if (value) {
            tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(1)");
            tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
            tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
            tp("transform", "rotate(-40deg) skewX(-30deg) scale(1)");
        } else {
            tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(0)");
            tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(0)");
            tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(0)");
            tp("transform", "rotate(-40deg) skewX(-30deg) scale(0)");
        }
    };

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
        bwp("left", "0px");
        bwp("top", "0px");
        bwp("width", _height + "px");
        bwp("height", _height + "px");
        lwp("left", _height + "px");
        lwp("top", "0px");
        lwp("width", (_width - _height) + "px");
        lwp("height", _height + "px");
        cbp("left", ((_height - boxwidth) / 2) + "px");
        cbp("top", ((_height - boxwidth) / 2) + "px");
        cbp("width", boxwidth + "px");
        cbp("height", boxwidth + "px");
        label_wrapper.innerHTML = _label;
    };

    setBounds(_left, _top, _width, _height);
    me.setValue(_value);


    var mousedown = function(ev) {
        ev.preventDefault();
        me.setValue(!value);
        if (_callback)
            _callback(value);
    };

    wrapper.addEventListener('touchstart', mousedown, false);
    wrapper.addEventListener('mousedown', mousedown, false);

    checkbox.appendChild(tick);
    box_wrapper.appendChild(checkbox);
    wrapper.appendChild(box_wrapper);
    wrapper.appendChild(label_wrapper);
    _owner.appendChild(wrapper);
};
