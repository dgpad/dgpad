/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function HorizontalBorderPanel(_canvas, _h, _isTop) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas=_canvas;
    var height = _h;
    var isTop = _isTop;
    me.setAttr("className", "horizontalPanel");
//    me.transition("translate_x", 0.2, (isTop) ? -width : width);


    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
//        me.applyTransitionIN();
    };

    this.close = function() {
//        me.applyTransitionOUT();
//        setTimeout(function() {
//            me.owner.parentNode.removeChild(me.getDocObject());
//        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        if (isTop) {
            me.setBounds(t.left, t.top, t.width, height);
        }
        else {
            me.setBounds(t.left, t.top + t.height-height, t.width, height);   
        }
    };

    me.init();



};

