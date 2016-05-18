function LongpressManager(_canvas) {
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var me = this;
    var panel = null;
    var x = 0;
    var y = 0;

    var newExp = function(_ex) {
        var OBJ = new ExpressionObject(Cn, "_a", "", "", "", _ex, x, y);
        if (canvas.namesManager.isVisible())
            canvas.namesManager.setName(OBJ);
        else
            OBJ.setName(getName("abcdefghijklmnopqrsuvw"));
        OBJ.setT("");
        var r = Math.random() * 128;
        var g = Math.random() * 128;
        var b = Math.random() * 128;
        OBJ.setRGBColor(r, g, b);
        canvas.addObject(OBJ);
        return OBJ;
    };

    var newList = function(_ex) {
        var OBJ = new ListObject(Cn, "_l", _ex);
        OBJ.setSegmentsSize(0);
        var c = _ex.getColor();
        OBJ.setRGBColor(c.getR(), c.getG(), c.getB());
        canvas.addObject(OBJ);
        return OBJ;
    };

    var getList = function() {
        var cx = Cn.coordsSystem.x(Cn.getWidth() / 2);
        var cy = Cn.coordsSystem.y(Cn.getHeight() / 2);
        var l = Cn.coordsSystem.l(Cn.getHeight()) / 4;
        var L = l * (1 + Math.sqrt(5)) / 2;
        // var str="["+(cx-L/2)+","+(cy-l/2)+"]";
        var t = [
            [cx - L / 2, cy - l / 2],
            [cx + L / 2, cy - l / 2],
            [cx + L / 2, cy + l / 2],
            [cx - L / 2, cy + l / 2],
            [cx - L / 2, cy - l / 2]
        ];
        for (var i = 0; i < t.length; i++) {
            t[i] = "[" + t[i].toString() + "]";
        };
        return "[" + t.toString() + "]";
    };

    var createExp = function() {
        newExp("(1+sqrt(5))/2");
        Cn.compute();
        canvas.paint();
    };

    var createExpPts = function() {
        newList(newExp(getList()));
        Cn.compute();
        canvas.paint();
    };

    var createExpSegs = function() {
        var OBJ = newList(newExp(getList()));
        OBJ.setSegmentsSize(1);
        Cn.compute();
        canvas.paint();
    };

    var getName = function(_t) {
        var t = _t.match(/.{1,1}/g);
        for (var i = 0; i < t.length; i++) {
            if (!Cn.find(t[i])) return t[i];
        }
        return t[0];
    }

    var createIntCursor = function() {
        var OBJ = newExp("");
        if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
        OBJ.setMin("0");
        OBJ.setMax("10");
        OBJ.setIncrement(1);
        Cn.compute();
        canvas.paint();
    };

    var createContCursor = function() {
        var OBJ = newExp("0");
        if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
        OBJ.setMin("-10");
        OBJ.setMax("10");
        Cn.compute();
        canvas.paint();
    };

    var createEditWidget = function() {
        canvas.addText($L.edit_widget_name + " : <input id=\"exp_name\" interactiveinput=\"replace\">\n\n\u00a7  name=\"" + $L.edit_widget_edit + "\" style=\"font-size:18px;padding: 5px 10px;background: #4479BA;color: #FFF;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);\"\nvar exp_n=Find(\"exp_name\");\nvar exp_e=Find(\"exp_edit\");\nexp_e.setAttribute(\"target\",exp_n.value);\nRefreshInputs();\n\n\u00a7\n\n<textarea id=\"exp_edit\" target=\"aa\" style=\"width:500px;height:400px\"></textarea>\n", x, y, 550, 530, "c:rgba(59,79,115,0.18);s:3;r:15;p:4");
    };

    var createBlocklyButton = function() {
        $U.prompt($L.create_blockly_program_change_message, $L.create_blockly_program_name, "text", function(_old, _new) {
            if (_new === "") _new = _old;
            var OBJ = new BlocklyButtonObject(Cn, "blk_btn", _new, x, y);
            OBJ.setOpacity(canvas.prefs.opacity.blockly_button);
            canvas.addObject(OBJ);
            Cn.compute();
            canvas.paint();
            canvas.blocklyManager.edit(OBJ);
        }, 450, 165, 430);
    };


    var tab = [
        [$L.create_blockly_button, createBlocklyButton],
        [$L.create_exp, createExp],
        [$L.create_exp_pts, createExpPts],
        [$L.create_exp_segs, createExpSegs],
        [$L.create_cursor_int, createIntCursor],
        [$L.create_cursor_cont, createContCursor],
        [$L.create_widget_edit, createEditWidget]
    ];

    var close = function() {
        panel = null;
    };

    var exec = function(_proc) {
        _proc();
    };

    me.isVisible = function() {
        return (panel && panel.isVisible());
    };

    me.show = function(ev) {
        x = canvas.mouseX(ev);
        y = canvas.mouseY(ev);
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;
        panel = new BubblePanel(canvas, exec, close, ev, tab, $L.longpress_message, 270, 240, 30);
    };




}
