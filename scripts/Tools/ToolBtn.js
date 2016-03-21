function ToolBtn(_canvas, _oc, _procDown, _procUp) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var oc = _oc;
    var code = oc.getCode();
    var procDown = _procDown;
    var procUp = _procUp;

    var docObject = me.getDocObject();

    switch (oc.getType()) {
        case 0:
            me.addImage($APP_PATH + "NotPacked/images/tools/bg_standard2.svg");
            break;
        case 1:
            me.addImage($APP_PATH + "NotPacked/images/tools/bg_property2.svg");
            break;
    }


    //    $U.preloadImage($APP_PATH + "NotPacked/images/tools/" + code + ".svg");
    me.addImage($APP_PATH + "NotPacked/images/tools/" + code + ".svg");

    //console.log($APP_PATH + "NotPacked/images/tools/" + code + ".svg");

    me.transition("scale", 0.1);

    canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.setBounds(-500, -500, 10, 10);
    me.applyTransitionOUT();

    docObject.addEventListener('touchstart', function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            var ev = $U.PadToMouseEvent(touch);
            procDown(ev);
        }
    }, false);
    docObject.addEventListener('touchmove', function(tch) {
        tch.preventDefault();
        canvas.touchMoved(tch);
    }, false);
    docObject.addEventListener('touchend', function(tch) {
        tch.preventDefault();
        canvas.touchEnd(tch);
    }, false);
    docObject.addEventListener('mousedown', procDown, false);
    docObject.addEventListener('mouseup', procUp, false);

    this.show = function() {
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
    };

    this.hide = function() {
        me.applyTransitionOUT();
    };

    this.init = function(l, t, w, h) {
        var b = me.getOwnerBounds();
        me.setBounds(b.left + l, b.top + t, w, h);
        me.show();
    };

}
