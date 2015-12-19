/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function CenterPanel(_canvas, _w, _h) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var height = _h;
    var width = _w;


    me.setAttr("className", "centerPanel");
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

    me.init = function() {
        var t = me.getOwnerBounds();
        me.setBounds(t.left + (t.width - width) / 2, t.top + (t.height - height) / 2, width, height);
    };

    me.init();
}
