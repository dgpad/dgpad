function ImageGroup(_owner, _left, _top, _width, _height, _bgOff, _bgOn, _callback) {
    var me = this;
    var imgsize = 32;
    var margin = 5;
    var hspace = 20;
    var imgnum = 0;
    var bgimageOff = _bgOff;
    var bgimageOn = _bgOn;
    var selected = null;

    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();




    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };

    var mousedown = function(ev) {
        ev.preventDefault();
        if (selected)
            selected.toggle();
        ev.currentTarget.toggle();
        selected = ev.currentTarget;
        if (_callback)
            _callback(selected.num);
    };

    me.setImageSize = function(_s) {
        imgsize = _s;
    };
    me.setMargin = function(_s) {
        margin = _s;
    };
    me.setHspace = function(_s) {
        hspace = _s;
    };

    me.select = function(_num) {
        for (var i = 0, len = wrapper.childNodes.length; i < len; i++) {
            if (wrapper.childNodes[i].num === _num) {
                if (selected)
                    selected.toggle();
                wrapper.childNodes[i].toggle();
                selected = wrapper.childNodes[i];
            }
        }
    };

    me.deselectAll = function() {
        if (selected)
            selected.toggle();
        selected = null;
    }

    me.addImage = function(_src, _nobackground) {
        var img_wrapper = createDiv();
        var img = document.createElement("img");
        img_wrapper.num = imgnum;
        var ip = function(_p, _v) {
            img.style.setProperty(_p, _v);
        };
        var iwp = function(_p, _v) {
            img_wrapper.style.setProperty(_p, _v);
        };
        img.src = _src;

        img_wrapper.on = false;
        img_wrapper.toggle = (_nobackground) ? function() {} : function() {
            if (img_wrapper.on)
                iwp("background-image", "url('" + bgimageOff + "')");
            else
                iwp("background-image", "url('" + bgimageOn + "')");
            img_wrapper.on = !img_wrapper.on;
        };
        iwp("position", "absolute");
        iwp("left", (margin + (hspace + imgsize) * imgnum) + "px");
        iwp("top", ((_height - imgsize) / 2) + "px");
        iwp("width", imgsize + "px");
        iwp("height", imgsize + "px");
        if (!_nobackground) {
            iwp("background-color", "rgba(0,0,0,0)");
            iwp("background-size", "100%");
            //        iwp("background-position", "center");
            iwp("background-repeat", "no-repeat");
            iwp("background-image", "url('" + bgimageOff + "')");
        }
        ip("position", "absolute");
        ip("left", "0px");
        ip("top", "0px");
        ip("width", imgsize + "px");
        ip("height", imgsize + "px");
        img_wrapper.addEventListener('touchstart', mousedown, false);
        img_wrapper.addEventListener('mousedown', mousedown, false);
        img_wrapper.appendChild(img);
        wrapper.appendChild(img_wrapper);
        imgnum++;
    };

    wp("background-color", "rgba(0,0,0,0)");
    wp("position", "absolute");

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
    };

    setBounds(_left, _top, _width, _height);
    _owner.appendChild(wrapper);
};
