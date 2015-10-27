/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function GUIElement(_owner, _type) {
    var me = this;
    var left, top, width, height;
    me.owner = _owner;
    var docObject = document.createElement(_type);
    me.childNodes = docObject.childNodes;
    me.parentNode = docObject.parentNode;
    me.appendChild = docObject.appendChild;

    me.getDocObject = function () {
        return docObject;
    };

    me.setBounds = function (l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        docObject.style.left = l + "px";
        docObject.style.top = t + "px";
        docObject.style.width = w + "px";
        docObject.style.height = h + "px";
    };

    me.getBounds = function () {
        return {
            "left": left,
            "top": top,
            "width": width,
            "height": height
        };
    };

    me.getOwnerBounds = function () {
        var t = me.owner.offsetTop || 0;
        var l = me.owner.offsetLeft || 0;
        var w = me.owner.offsetWidth || 0;
        var h = me.owner.offsetHeight || 0;
        return {
            "left": l,
            "top": t,
            "width": w,
            "height": h
        };
    };



    me.getStyle = function (_attr) {
        return docObject.style.getPropertyValue(_attr);
    };

    me.setStyle = function (_attr, _param) {
        docObject.style.setProperty(_attr, _param);
    };

    me.setStyles = function (_st) {
        var t = _st.split(";");
        for (var i = 0, len = t.length; i < len; i++) {
            var a = t[i].split(":");
            me.setStyle(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
        }
    }

    me.getAttr = function (_attr) {
        return docObject[_attr];
    };

    me.setAttr = function (_attr, _param) {
        docObject[_attr] = _param;
    };


    me.hide = function () {
        me.setStyle("visibility", "hidden");
    };

    me.show = function () {
        me.setStyle("visibility", "visible");
    };

    me.isVisible = function () {
        return (me.getStyle("visibility") === "visible");
    };

    me.setLayer = function (_l) {
        me.setStyle("z-index", _l);
    };

    me.clearContent = function () {
        while (docObject.childNodes.length !== 0) {
            docObject.removeChild(docObject.childNodes[0]);
        }
    };

    me.hasContent = function (elt) {
//        console.log(elt.getDocObject().parentNode===docObject);
        return ((elt) && (elt.getDocObject) && (elt.getDocObject().parentNode === docObject));
    };

    me.addContent = function (elt) {
        docObject.appendChild(elt.getDocObject());
    };

    me.removeContent = function (elt) {
        try {
            docObject.removeChild(elt.getDocObject());
        } catch (e) {

        }
    };

    me.setAbsolute = function () {
        docObject.style.position = "absolute";
        docObject.style.margin = "0px";
        docObject.style.padding = "0px";
    };


    me.setPosition = function (_mode) {
        docObject.style.position = _mode;
    };

    me.setColor = function (_col) {
        docObject.style.backgroundColor = _col;
    };

    me.addImage = function (_src) {
//        var img = document.createElement("img");
        var img = new Image();
        img.style.position = "absolute";
        img.src = _src;
        img.style.left = "0px";
        img.style.top = "0px";
        img.style.width = "100%";
        img.style.height = "100%";
        docObject.appendChild(img);
    };

    me.setBackgroundImage = function (_src) {
        me.setStyle("background-image", _src);
        me.setStyle("background-size", "100%");
        me.setStyle("background-repeat", "no-repeat");
    };

//    me.addImage = function(_src, l, t, w, h) {
//        var imgObject = document.createElement("img");
////        imgObject.src = _src + "?nocache=" + Date.now();
//        imgObject.src = _src;
//        imgObject.style.left = l + "px";
//        imgObject.style.top = t + "px";
//        imgObject.style.width = w + "px";
//        imgObject.style.height = h + "px";
//        docObject.appendChild(imgObject);
//    };


    var touchNumber = 0;
    me.setTouchNumber = function (_i) {
        touchNumber = _i;
    };
    var preventDefault = true;
    me.setPreventDefault = function (_bool) {
        preventDefault = _bool;
    };

    var PadToMouseEvent = function (_touch) {
        var ev = document.createEvent("MouseEvent");
        ev.initMouseEvent("mouseup", true, true, window, 1,
                _touch.screenX, _touch.screenY,
                _touch.clientX, _touch.clientY, false,
                false, false, false, 0, null);
        return ev;
    };

    var exe = function (_p) {
        _p.MouseEvent_Function = function (ev) {
            ev.preventDefault();
            _p(ev);
        };
        return _p.MouseEvent_Function;
    };

    var exeTCH = function (_p) {
        if (preventDefault) {
            _p.TouchEvent_Function = function (tch) {
                tch.preventDefault();
                var touch = tch.touches[touchNumber] || tch.changedTouches[touchNumber];
//                var touch = tch.touches[touchNumber];
                _p(touch);
            };
        } else {
            _p.TouchEvent_Function = function (tch) {
                var touch = tch.touches[touchNumber] || tch.changedTouches[touchNumber];
//                var touch = tch.touches[touchNumber];
                _p(touch);
            };
        }
        return _p.TouchEvent_Function;
    };





    me.touch = function (tch, _procMouse) {
        tch.preventDefault();
        var touch = tch.touches[0] || tch.changedTouches[0];
        _procMouse(PadToMouseEvent(touch));
    };

    me.addDblClickEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('dblclick', exe(_proc), false);
    };

    me.addClickEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchstart', exeTCH(_proc), false);
        obj.addEventListener('click', exe(_proc), false);
    };

    me.addDownEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchstart', exeTCH(_proc), false);
        obj.addEventListener('mousedown', exe(_proc), false);
    };

    me.addMoveEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchmove', exeTCH(_proc), false);
        obj.addEventListener('mousemove', exe(_proc), false);
    };

    me.addUpEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchend', exeTCH(_proc), false);
        obj.addEventListener('mouseup', exe(_proc), false);
    };

    me.removeDownEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchstart', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mousedown', _proc.MouseEvent_Function, false);
    };

    me.removeMoveEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchmove', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mousemove', _proc.MouseEvent_Function, false);
    };

    me.removeUpEvent = function (_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchend', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mouseup', _proc.MouseEvent_Function, false);
    };



}
;


