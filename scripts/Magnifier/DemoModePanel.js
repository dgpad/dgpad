function DemoModePanel(_canvas, _touchNum) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    me.setAttr("className", "pointerDIV");
    me.transition("scale", 0.1);
    me.setTouchNumber(_touchNum);
    me.setPreventDefault(false);
    var docObject = me.getDocObject();

    var dragmove = function(ev) {
        if (ev) {
            var w = docObject.offsetWidth;
            var h = docObject.offsetHeight;
            me.setStyle("left", (ev.pageX - w / 2) + "px");
            me.setStyle("top", (ev.pageY - h / 2) + "px");
        }
    };
    var dragdown = function(ev) {
        if (ev) {
            var w = docObject.offsetWidth;
            var h = docObject.offsetHeight;
            me.setStyle("left", (ev.pageX - w / 2) + "px");
            me.setStyle("top", (ev.pageY - h / 2) + "px");
            me.applyTransitionIN();
        }
    };
    var dragup = function(ev) {
        me.applyTransitionOUT();
    };
    me.removeEvents = function() {
        me.removeMoveEvent(dragmove, window);
        me.removeUpEvent(dragup, window);
        me.removeDownEvent(dragdown, window);
    };

    me.addDownEvent(dragdown, window);
    me.addMoveEvent(dragmove, window);
    me.addUpEvent(dragup, window);

    document.body.parentNode.appendChild(me.getDocObject());

}