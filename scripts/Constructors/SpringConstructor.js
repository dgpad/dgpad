//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function SpringConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/spring_const.svg";
    img.h = 30;


    // var fce = $P.fce_seg;
    // var f = 0;
    // var ar = false;
    // var dir = 1;
    // var max = 500;

    this.getCode = function() {
        return "spring";
    };

    this.getType = function() {
        return 1;
    };

    this.getInitials = function() {
        return ["point"];
    };
    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        var Obj = this.getC(0);
        var p = Obj.getAnimationParams(zc.mouseX(ev), zc.mouseY(ev));
        zc.getConstruction().addAnimation(Obj, p.speed, p.direction, p.ar);
        zc.getConstruction().remove(this.getC(1));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        var x0 = this.getC(0).getX();
        var y0 = this.getC(0).getY();
        var x1 = zc.mouseX(ev);
        var y1 = zc.mouseY(ev);
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var a = Math.atan2(y1 - y0, x1 - x0);
        ctx.save();
        ctx.translate(x0, y0);
        ctx.rotate(a);
        ctx.drawImage(img, 0, -img.h / 2, d, img.h);
        ctx.restore();
        ctx.save();
        if ((a < -$U.halfPI) || (a > $U.halfPI)) {
            a += Math.PI;
        }
        ctx.translate((x0 + x1) / 2, (y0 + y1) / 2);
        ctx.rotate(a);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(100,100,100,1)";
        ctx.font = "24px Arial";
        var message = "";
        var p = this.getC(0).getAnimationParams(x1, y1);
        
        ctx.fillText(p.message, 0, -img.h / 2);
        ctx.restore();
    };
}
