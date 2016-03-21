function BubblePanel(_canvas, _manager, _ev, _t, _title, _w, _h, _titleheight) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var x = canvas.mouseX(_ev) + 5;
    var y = canvas.mouseY(_ev) - 45;
    var width = _w;
    var height = _h;

    me.setAttr("className", "coincidencePanel");
    me.transition("scale", 0.2);

    var longpressList = new BubbleListPanel(me, _t, width, height, _titleheight, _title);

    var closeIfNeeded = function(ev) {
        var x0 = canvas.mouseX(ev);
        var y0 = canvas.mouseY(ev);
        if (x0 < x || y0 < y || x0 > (x + width) || y0 > (y + height)) {
            me.close();
        }
    };

    me.isVisible = function() {
        return (me.getDocObject().parentNode !== null);
    }

    me.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    me.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            if (me.getDocObject().parentNode !== null) {
                canvas.getDocObject().parentNode.removeChild(me.getDocObject());
            }
            var action = ($U.isMobile.any()) ? 'touchstart' : 'mousedown';
            window.removeEventListener(action, closeIfNeeded, false);
            _manager.close();
        }, 300);
    };

    me.exec = function(_any) {
        _manager.exec(_any);
        me.close();
    };

    me.init = function() {
        // var t = me.getOwnerBounds();
        me.setBounds(x, y, width, height);
        var action = ($U.isMobile.any()) ? 'touchstart' : 'mousedown';
        window.addEventListener(action, closeIfNeeded, false);
    };

    me.init();
    me.show();

}


function BubbleListPanel(_panel, _t, _w, _h, _titleheight, _title) {
    var me = this;
    $U.extend(this, new Panel(_panel.getDocObject()));
    me.setAttr("className", "coincidenceListDIV bulle");
    me.setBounds(10, 10, _w - 20, _h - 20);

    var viewportmask = new Panel(me);
    viewportmask.setAttr("className", "coincidenceListViewportMask");
    viewportmask.setBounds(10, _titleheight, _w - 40, _h - (_titleheight + 35));

    var viewport = new Panel(me);
    viewport.setAttr("className", "coincidenceListViewport");
    viewport.setBounds(-1, -1, _w + 10, _h - (_titleheight + 35));

    var title = new Label(me);
    title.setText(_title);
    title.setBounds(10, 10, _w - 40, _titleheight);

    var exec = function(ev) {
        ev.preventDefault();
        setTimeout(function() {
            _panel.close();
            ev.target.className = "coincidenceLIclassSel";
            _panel.exec(ev.target.obj);
        }, 1);
    };

    for (var i = 0, len = _t.length; i < len; i++) {
        var p = new GUIElement(me, "div");
        p.setAttr("obj", _t[i][1]);
        p.setAttr("innerHTML", _t[i][0]);
        p.setStyle("color", _t[i][2]);
        p.getDocObject().addEventListener('click', exec, false);
        viewport.addContent(p);
    }

    viewportmask.addContent(viewport);
    me.addContent(title);
    me.addContent(viewportmask);

    me.show();
     
}
