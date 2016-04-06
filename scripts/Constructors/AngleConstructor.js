//************************************************
//***************** ARC CONSTRUCTOR **************
//************************************************
function AngleConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "angle";
    };
    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return (new AngleObject(_zc.getConstruction(), "_A", _C[0], _C[1], _C[2]));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = 0;
        var yM = 0;
        var fromA, toA, trig = true;
        switch (len) {
            case 1:
                xM = zc.mouseX(ev);
                yM = zc.mouseY(ev);
                fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                fromA = fromA - Math.PI / 6;
                toA = fromA + Math.PI / 3;
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xM = c[1].getX();
                    yM = c[1].getY();
                    fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                    fromA = fromA - Math.PI / 6;
                    toA = fromA + Math.PI / 3;
                    this.isSelectCreatePoint = false;
                } else {
                    xM = c[1].getX();
                    yM = c[1].getY();
                    var t = $U.computeAngleParams(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    fromA = t.startAngle;
                    toA = t.endAngle;
                    trig = t.Trigo;
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.angle;
        ctx.beginPath();
        ctx.arc(xM, yM, 30, -fromA, -toA, trig);
        ctx.stroke();
    };
}
