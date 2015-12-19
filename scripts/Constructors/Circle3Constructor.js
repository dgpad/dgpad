//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function Circle3Constructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "circle3";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return new Circle3Object(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var r;
        ctx.beginPath();
        switch (len) {
            case 1:
                r = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev));
                ctx.arc(zc.mouseX(ev), zc.mouseY(ev), r, 0, Math.PI * 2, true);
                break;
            case 2:
                r = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), this.getC(1).getX(), this.getC(1).getY());
                if (this.isSelectCreatePoint) {
                    ctx.arc(this.getC(1).getX(), this.getC(1).getY(), r, 0, Math.PI * 2, true);
                    this.isSelectCreatePoint = false;
                } else {
                    ctx.arc(zc.mouseX(ev), zc.mouseY(ev), r, 0, Math.PI * 2, true);
                }
                break;
        }
        ctx.stroke();
    };
}
