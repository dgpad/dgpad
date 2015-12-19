function DemoModeManager(_canvas) {
    var me = this;
    var fingers = [];
    var max = 3;

    me.setDemoMode = function(_demo) {
        if (_demo) {
            for (var i = 0; i < max; i++) {
                fingers[i] = new DemoModePanel(_canvas, i);
                fingers[i].applyTransitionOUT();
            }
        } else if (fingers.length > 0) {
            for (var i = 0; i < max; i++) {
                fingers[i].removeEvents();
                fingers[i].close();
                fingers[i] = null;
            }
            fingers = [];
        }
    };
    me.getDemoMode = function() {
        return (fingers.length > 0);
    };


}
