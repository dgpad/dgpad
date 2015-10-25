function CoincidencePanel(_canvas, _ev, _t) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var x = canvas.mouseX(_ev)+5;
    var y = canvas.mouseY(_ev)-45;
    var width = 270;
    var height = 190;

    me.setAttr("className", "coincidencePanel");
    me.transition("scale", 0.2);
    
    var exec=function(_o){
        me.close();
        var cn=canvas.getConstruction();
        cn.clearIndicated();
        cn.clearSelected();
        cn.addSelected(_o);
        canvas.paint(_ev);
        canvas.initTools(_ev, _o);
    }
    
    var coincidenceList = new CoincidenceListPanel(me, _t,exec);
    
    var closeIfNeeded=function(ev){
        var x0=canvas.mouseX(ev);
        var y0=canvas.mouseY(ev);
        if (x0<x || y0<y || x0>(x+width) || y0>(y+height)) {
            me.close();
            canvas.stopChrono();
        }
    }

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            if (me.getDocObject().parentNode !== null) {
                canvas.getDocObject().parentNode.removeChild(me.getDocObject());
            }
            window.removeEventListener('mousedown', closeIfNeeded, false);
            window.removeEventListener('touchstart', closeIfNeeded, false);
        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        me.setBounds(x, y, width, height);
        window.addEventListener('mousedown', closeIfNeeded, false);
        window.addEventListener('touchstart', closeIfNeeded, false);
    };
    
    me.init();
    me.show();

}


function CoincidenceListPanel(_panel,_t,_exec){
    var me=this;
    $U.extend(this, new Panel(_panel.getDocObject()));
    me.setAttr("className", "coincidenceListDIV bulle");
    
    var viewportmask=new Panel(me);
    viewportmask.setAttr("className", "coincidenceListViewportMask");

    var viewport = new Panel(me);
    viewport.setAttr("className", "coincidenceListViewport");

    var title = new Label(me);
    title.setText($L.coincidence_message+" : "+$L.coincidence_select.replace("$1",_t.length));
    title.setBounds(10, 10, 230, 40);
    
    var mousedown = function(ev) {
        ev.preventDefault();
        setTimeout(function() {
            ev.target.className = "coincidenceLIclassSel";
            _exec(ev.target.obj);
        }, 1);
    };
    
        for (var i=0,len=_t.length;i<len;i++){
        var p = new GUIElement(me, "p");
        if (_t[i].isHidden()) p.setStyle("color","#777");
        else  p.setStyle("color",_t[i].getColor().getHEX());
        p.setAttr("obj",_t[i]);
        var txt=_t[i].getName()+": "+$L.object[_t[i].getCode()];
        p.setAttr("innerHTML", txt);
        p.setAttr("onmousedown", mousedown);
        viewport.addContent(p);
    }
    
    viewportmask.addContent(viewport);
    me.addContent(title);
    me.addContent(viewportmask);
    
    me.show();
}