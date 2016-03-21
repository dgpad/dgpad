/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function VerticalBorderPanel(_canvas, _w, _isLeft) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var width = _w;
    var isLeft = _isLeft;
    me.setAttr("className", "verticalPanel");
    me.transition("translate_x", 0.2, (isLeft) ? -width : width);
    //    me.transition("translate_y", 0.2, (isLeft) ? -width : width);


    this.show = function() {
        //        document.body.parentNode.appendChild(me.getDocObject());
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            //            document.body.parentNode.removeChild(me.getDocObject());
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        if (isLeft) {
            me.setBounds(t.left + 10, t.top + 10, width, t.height - 20 - canvas.prefs.controlpanel.size);
        } else {
            me.setBounds(t.left + t.width - width - 10, t.top + 10, width, t.height - 20 - canvas.prefs.controlpanel.size);
        }
    };

    me.init();
}
