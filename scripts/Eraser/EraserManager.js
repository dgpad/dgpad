function EraserManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var panel = null;

    me.filters = {
        "global": true
    };


    me.refreshDisplay = function() {
        var t = canvas.getConstruction().elements();
        var m = me.filters.global ? 2 : 1;
        for (var i = 0, len = t.length; i < len; i++) {
            t[i].setMode(m);
        }
        canvas.paint();
    }


    // On a cliqué sur l'icône Gomme :
    me.showPanel = function() {
        if (!panel) {
            panel = new EraserPanel(canvas, me);
            panel.show();
            setTimeout(function() {
                me.refreshDisplay();
            }, 1);
        }
    };

    me.hidePanel = function() {
        if (panel) {
            panel.close();
            panel = null;
        }
    };

}
