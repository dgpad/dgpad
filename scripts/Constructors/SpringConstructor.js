//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function SpringConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/spring_const.svg";
    img.h = 30;
    var fce_seg = [0, 1, 5, 10, 25, 50, 100, 200, 300, 500, 800, 1000, 1500];
    var fce_exp = [0, 1, 5, 10, 20, 50, 100, 200, 500, 1000, 1500];
    var fce_cir_deg = [0, 1, 6, 10, 30, 45, 60, 70, 90, 180, 270, 360];
    var fce_cir_rad = [];
    for (var i = 0; i < fce_cir_deg.length; i++) {
        fce_cir_rad.push(fce_cir_deg[i] * Math.PI / 180);
    }
    var fce = fce_seg;
    var f = 0;
    var ar = false;
    var dir = 1;
    var max = 500;

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
        zc.getConstruction().addAnimation(Obj, fce[f], dir, ar);
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
        if (this.getC(0).getCode() === "point") {
            if (this.getC(0).getParentAt(0).getCode() === "segment") {
                fce = fce_seg;
                f = Math.floor(d / (max / fce.length));
                if (f >= fce.length) f = fce.length - 1;
                var xp = this.getC(0).getParentAt(0).getP1().getX();
                var yp = this.getC(0).getParentAt(0).getP1().getY();
                var ps = (xp - x0) * (x1 - x0) + (yp - y0) * (y1 - y0);
                dir = (ps > 0) ? 1 : -1;
                var dop = Math.sqrt((xp - x0) * (xp - x0) + (yp - y0) * (yp - y0));
                var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
                var cs = ps / (dop * dom);
                ar = (Math.abs(cs) < 0.707);
                message = ar ? fce[f] + " px/s \u21C4" : fce[f] + " px/s";
            } else if (this.getC(0).getParentAt(0).isInstanceType("circle")) {
                ar = false;
                fce = fce_cir_rad;
                f = Math.floor(d / (max / fce.length));
                if (f >= fce.length) f = fce.length - 1;
                var xp = this.getC(0).getParentAt(0).getP1().getX();
                var yp = this.getC(0).getParentAt(0).getP1().getY();
                var ps = (yp - y0) * (x1 - xp) + (x0 - xp) * (y1 - yp);
                dir = (ps > 0) ? 1 : -1;
                message = fce_cir_deg[f] + " deg/s";
            }
        } else if (this.getC(0).getCode() === "expression") {
            fce = fce_exp;
            ar = false;
            f = Math.floor(d / (max / fce.length));
            if (f >= fce.length) f = fce.length - 1;
            message = fce[f];
            var ang = $U.angleH(x1 - x0, y1 - y0);
            dir = ((ang > Math.PI / 2) && (ang < 3 * Math.PI / 2)) ? 1 : -1;
            if (this.getC(0).isCursor()) {
                ar = ((ang > Math.PI / 4) && (ang < 3 * Math.PI / 4)) || ((ang > 5 * Math.PI / 4) && (ang < 7 * Math.PI / 4));
                if (ar) message += " \u21C4"

            } else message += " u/s";
        }
        ctx.fillText(message, 0, -img.h / 2);
        ctx.restore();
    };
}
