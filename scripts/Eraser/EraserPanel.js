function EraserPanel(_canvas, _man) {
    var me = this;
    $U.extend(this, new Panel(_canvas));
    var canvas = _canvas;
    var man = _man;
    me.setAttr("className", "erase_messageDIV");
    me.transition("scale", 0.2);

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    var ShowHiddensCallback = function(val) {
        man.filters.global = val;
        man.refreshDisplay();
    }

    var cbApplyAll = new Checkbox(me.getDocObject(), 0, 0, 250, 35, man.filters.global, $L.erase_ckb_show_hidden, ShowHiddensCallback);
    cbApplyAll.setTextColor("#252525");

}
