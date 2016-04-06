function progressBar(_canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var canvas = _canvas;
    var ctx = canvas.getContext('2d');
    var bw = canvas.getWidth(),
        bh = 3;
    var ww = canvas.getWidth(),
        hh = 3;
    //    var bw = 450, bh = 10;
    //    var ww = 500, hh = 30;
    var ll = 0;
    var tt = canvas.getHeight() - hh - canvas.prefs.controlpanel.size;
    //    var ll = (canvas.getWidth() - ww) / 2;
    //    var tt = (canvas.getHeight() - hh) / 2;
    var me = this;
    me.setAttr("className", "progressPanel");
    me.setBounds(ll, tt, ww, hh);
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

    //        this.show = function() {
    //        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    ////        me.applyTransitionIN();
    //    };
    //    this.close = function() {
    ////        me.applyTransitionOUT();
    //        canvas.getDocObject().parentNode.removeChild(me.getDocObject());
    //    };

    var bar = new GUIElement(me, "div");
    bar.setAttr("className", "progressBar");
    bar.setAbsolute();
    bar.setBounds((ww - bw) / 2, (hh - bh) / 2, bw, bh);
    //    bar.getDocObject().innerHTML="voucou";

    var moveableBar = new GUIElement(me, "div");
    moveableBar.setAttr("className", "moveprogressBar");
    moveableBar.setBounds(0, 0, 50, bh);
    bar.addContent(moveableBar);


    me.addContent(bar);

    me.move = function(_pc) {

        var w = bw * _pc;
        //        ctx.fillStyle="#FF0000";
        //        ctx.beginPath();
        //        ctx.rect(0, 0, w, bh);
        //        ctx.fill();

        //        if (w>200) alert("coucou");
        //        bar.getDocObject().innerHTML=w;
        //        alert(w);
        //        var ctx=bar.getDocObject().getContext('2d');
        //        ctx.fillStyle="#FF0000";
        //        ctx.beginPath();
        //        ctx.rect(0, 0, w, bh);
        //        ctx.fill();
        //        console.log(w);
        moveableBar.setBounds(0, 0, w, bh);
    };

    me.show();
}
