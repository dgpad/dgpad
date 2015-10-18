
//************************************************
//***************** ARC CONSTRUCTOR **************
//************************************************
function Arc3ptsConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    
    this.getCode = function() {
        return "arc3pts";
    };
    
    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        var no=new Arc3ptsObject(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
        no.getM().setHidden(true);
        return no;
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = r = 0;
        var yM = 0;
        var fromA, toA,trig=true;
        switch (len) {
            case 1:
                xM = (c[0].getX() + zc.mouseX(ev)) / 2;
                yM = (c[0].getY() + zc.mouseY(ev)) / 2;
                r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                fromA = $U.angleH(zc.mouseX(ev) - xM,zc.mouseY(ev) - yM);
                toA = $U.angleH(c[0].getX() - xM,c[0].getY() - yM);
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xM = (c[0].getX() + c[1].getX()) / 2;
                    yM = (c[0].getY() + c[1].getY()) / 2;
                    r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                    fromA = $U.angleH(c[1].getX() - xM,c[1].getY() - yM);
                    toA = $U.angleH(c[0].getX() - xM,c[0].getY() - yM);
                    this.isSelectCreatePoint = false;
                } else {
                    var t = $U.computeArcParams(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    xM = t.centerX;
                    yM = t.centerY;
                    fromA = t.startAngle;
                    toA = t.endAngle;
                    trig=t.Trigo;
                    var r = $U.computeRay(t.centerX, t.centerY, c[0].getX(), c[0].getY());
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(xM, yM, r, -fromA, -toA, trig);
        ctx.stroke();
    };
}