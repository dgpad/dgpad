function NamesManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var visible = false;
    var left = 0,
        top = 0,
        width = 500,
        height = 170;

    var close = function() {
        canvas.selectNameBtn(false);
    }
    me.isVisible = function() {
        return panel.isVisible()
    }
    me.show = function() {
        panel.show()
    }
    me.hide = function() {
        panel.hide()
    }
    me.refresh = function() {
        panel.refreshkeyboard()
    }
    me.getName = function() {
        return panel.getName();
    }
    me.setName = function(_o) {
        if (panel.isVisible()) {
            _o.setName(panel.getName());
            _o.setShowName(true);
            panel.refreshkeyboard();
        }
    }
    me.replaceName = function(_o) {
        if ((panel.isVisible()) && (panel.isEditMode())) {
            _o.setName(panel.getName());
            _o.setShowName(true);
            panel.refreshkeyboard();
            return true;
        }
        return false;
    }

    left = canvas.getWidth() - width-5;
    top = canvas.getHeight() - height-canvas.prefs.controlpanel.size-5;

    var panel = new NamesPanel(window.document.body, left,top,width,height,Cn.getNames, close);

}
