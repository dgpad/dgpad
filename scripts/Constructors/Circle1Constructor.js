//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function Circle1Constructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var R = 0;
    
    this.getCode = function() {
        return "circle1";
    };
    
    this.getInitials = function() {
        return ["point"];
    };

    this.selectCreatePoint = function(zc, ev) {
    };

    this.newObj = function(_zc, _C) {
        return new Circle1Object(_zc.getConstruction(), "_C", _C[0], R);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        R = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev));
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(this.getC(0).getX(), this.getC(0).getY(), R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    };
}