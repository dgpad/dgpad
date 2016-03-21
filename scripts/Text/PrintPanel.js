function PrintPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var www = 450;
    var hhh = 300;

    $U.extend(this, new CenterPanel(canvas, www, hhh));
    var lbl = new Label(me);
    //    lbl.setStyles("font-size:18px;color:black");
    lbl.setText("<p style='line-height:100%'><span style='font-size:18px;color:black'>" + $L.props_text_console + "</span></p>");
    lbl.setBounds(0, 0, www, 40);
    me.addContent(lbl);

    var editBox = new GUIElement(_canvas, "textarea");
    editBox.setStyles("position:absolute;-webkit-box-sizing: border-box;box-sizing: border-box;-moz-box-sizing: border-box;font-family:'Lucida Console';resize:none;font-size:18px;line-height:20px");
    editBox.setStyle("max-width", (www - 20) + "px");
    editBox.setStyle("min-width", (www - 20) + "px");
    editBox.setBounds(10, 40, (www - 20), (hhh - 50));
    me.addContent(editBox);

    me.setStyle("cursor", "move");

    var close = function() {
        _closeProc();
    };

    me.show();

    new CloseBox(me, close);

    me.setText = function(_m) {
        editBox.getDocObject().value += _m;
        editBox.getDocObject().scrollTop = editBox.getDocObject().scrollHeight;
    };

    var xx = 0,
        yy = 0,
        _l = me.getBounds().left,
        _t = me.getBounds().top;

    var dragmove = function(ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function(ev) {
        //        me.removeContent(editBox);
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    //    container.addDownEvent(dragdown);
    me.getDocObject().addEventListener('touchstart', dragdown, false);
    me.getDocObject().addEventListener('mousedown', dragdown, false);

}
