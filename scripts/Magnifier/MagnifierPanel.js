function MagnifierPanel(_canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var _l = $P.MagnifierBounds.l,
        _t = $P.MagnifierBounds.t,
        _w = $P.MagnifierBounds.w,
        _h = $P.MagnifierBounds.w;
    var cW = $P.MagnifierBounds.captureWidth;
    me.setStyles("position:absolute;overflow:hidden;z-index:8;background-size:" + _w + "px " + _h + "px");
    me.setStyle("background-image", "url('" + $APP_PATH + "NotPacked/images/tools/loupe5.svg')");
    me.transition("scale", 0.2);

    var cnvs = new GUIElement(me, "canvas");
    cnvs.setStyles("position:absolute");
    cnvs.width = _w;
    cnvs.height = _h;
    me.addContent(cnvs);
    var ctx = cnvs.getDocObject().getContext('2d');

    var xx = 0,
        yy = 0;

    var dragmove = function(ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    };

    var dragdown = function(ev) {
        xx = ev.pageX;
        yy = ev.pageY;
        me.addMoveEvent(dragmove, window);
        me.addUpEvent(dragup, window);
    };

    var dragup = function(ev) {
        me.removeMoveEvent(dragmove, window);
        me.removeUpEvent(dragup, window);
    };

    me.addDownEvent(dragdown);

    _canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.applyTransitionIN();


    me.getBounds = function() {
        return {
            "left": _l,
            "top": _t,
            "width": _w,
            "height": _h
        };
    };

    me.init = function() {
        me.setBounds(_l, _t, _w, _h);
    };

    me.magnifierPaint = function(coords) {
        ctx.beginPath();
        ctx.clearRect(0, 0, _w, _h);
        if ((coords) && (!isNaN(coords.x)) && (!isNaN(coords.y)))
            if ((coords) && (!isNaN(coords.x)) && (!isNaN(coords.y)))
                ctx.drawImage(_canvas.getDocObject(),
                    coords.x - cW/2, coords.y - cW/2, cW, cW, 0, 0, _w, _h);
    };


    me.init();

}
