function DeleteAll(_canvas) {
    var me = this;
    var canvas = _canvas;
    var tmargin = 20;
    var w = 250;
    var h = 30;

    var btn = new Button(canvas);
//    btn.setBounds((canvas.getWidth() - w) / 2, tmargin, w, h);
    btn.setText($L.clear_all);
    btn.setStyles("line-height:30px;vertical-align: middle;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 14px Arial, Helvetica, sans-serif;-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;color: #252525;border: 2px solid #b4b4b4;background-color: rgba(230,230,230,0.9)");
   

    var exe = function(ev) {
        canvas.selectArrowBtn();
        canvas.quit();
        canvas.undoManager.clear();
        canvas.undoManager.deleteObjs(canvas.getConstruction().elements());
        canvas.getConstruction().deleteAll();
//        canvas.macrosManager.clearTools();
        canvas.textManager.clear();
        canvas.getDocObject().style.visibility = "visible";
        canvas.paint();
    }
    btn.addDownEvent(exe);

    me.show = function() {
        btn.setBounds((canvas.getWidth() - w) / 2, tmargin, w, h);
        canvas.getDocObject().parentNode.appendChild(btn.getDocObject());
    };

    me.hide = function() {
        if (btn.getDocObject().parentNode) {
            canvas.getDocObject().parentNode.removeChild(btn.getDocObject());
        }
    };


}