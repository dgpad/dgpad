function MagnifierManager(_canvas) {
    var me = this;
    var panel = null;
    me.setMagnifierMode = function(_magn) {
        if (_magn) {
            panel = new MagnifierPanel(_canvas);
            panel.show();
        } else if (panel) {
            panel.close();
            panel = null;
        }
    };
    me.getMagnifierMode = function() {
        return (panel !== null);
    };
    me.hide = function() {
        if (panel) panel.setStyle("visibility", "hidden");
    };
    me.show = function() {
        if (panel) panel.setStyle("visibility", "visible");
    };
    me.magnifierPaint = function(coords) {
        if (panel) {
            panel.magnifierPaint(coords);
        }
    };
    me.setMagnifierMode(Object.touchpad);
}
