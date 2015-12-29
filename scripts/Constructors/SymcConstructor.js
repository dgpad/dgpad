//************************************************
//*************** MIDPOINT CONSTRUCTOR ***********
//************************************************
function SymcConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "symc";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.createCallBack = function(zc, o) {
        zc.namesManager.setName(o);
    };

    this.newObj = function(_zc, _C) {
        return new SymcObject(_zc.getConstruction(), "_Symc", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var size = zc.prefs.size.point;
        if (Object.touchpad) {
            size *= zc.prefs.size.touchfactor;
        }
        var x = 2 * this.getC(0).getX() - zc.mouseX(ev);
        var y = 2 * this.getC(0).getY() - zc.mouseY(ev);
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    };
}
