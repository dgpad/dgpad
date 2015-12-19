function ImageElt(_owner, _src, _proc, _l, _t, _w, _h) {
    var me = this;
    //    $U.extend(this, new GUIElement(_owner, "div"));
    $U.extend(this, new Panel(_owner.getDocObject()));
    me.setStyles("opacity:0");
    me.transition("opacity", 0.4);
    //    this.hide();



    me.setAbsolute();
    me.setBounds(_l, _t, _w, _h);
    me.setStyles("margin:0px;padding:0px;background-size:100%;background-repeat:no-repeat;background-image:url(" + $APP_PATH + _src + ")");
    me.addDownEvent(_proc);
    _owner.addContent(me);

    me.show = function() {
        me.setLayer(100);
        me.applyTransitionIN();
        me.addDownEvent(_proc);
    };
    me.hide = function() {
        me.setLayer(0);
        me.applyTransitionOUT();
        me.removeDownEvent(_proc);
    };


}
