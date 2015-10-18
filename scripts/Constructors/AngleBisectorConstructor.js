
//************************************************
//**************** AREA CONSTRUCTOR **************
//************************************************
function AngleBisectorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "anglebiss";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return (new AngleBisectorObject(_zc.getConstruction(), "_R", _C[0], _C[1], _C[2]));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        var c = this.getCList();
        var len = c.length;
        var xM = yM = xA = yA = 0;
        switch (len) {
            case 1:
                xA = zc.mouseX(ev);
                yA = zc.mouseY(ev);
                xM = c[0].getX();
                yM = c[0].getY();
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xA = c[1].getX();
                    yA = c[1].getY();
                    xM = c[0].getX();
                    yM = c[0].getY();
                    this.isSelectCreatePoint = false;
                } else {
                    var b = $U.d(c[1], c[0]);
                    var a = $U.d(c[1], zc.mouse(ev));
                    var k = b / (a + b);
                    xA = c[1].getX();
                    yA = c[1].getY();
                    xM = c[0].getX() + k * (zc.mouseX(ev) - c[0].getX());
                    yM = c[0].getY() + k * (zc.mouseY(ev) - c[0].getY());
                }
                break;
        }
        var t = $U.computeBorderPoints(xA, yA, xM - xA, yM - yA, zc.getWidth(), zc.getHeight());
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(t[2], t[3]);
        ctx.stroke();
        ctx.closePath();
    };
}