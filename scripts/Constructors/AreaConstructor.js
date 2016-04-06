//************************************************
//**************** AREA CONSTRUCTOR **************
//************************************************
function AreaConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var col = new Color();

    this.getCode = function() {
        return "area";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        var len = c.length;
        if ((len > 1) && (c[0] === c[len - 1])) {
            return true;
        }
        return false;
    };



    this.newObj = function(_zc, _C) {
        var a = new AreaObject(_zc.getConstruction(), "_Poly", _C);
        a.setOpacity(_zc.prefs.opacity.area);
        return (a);
    };

    this.preview = function(ev, zc) {

        var ctx = zc.getContext();
        col.set(zc.prefs.color.area);
        col.setOpacity(zc.prefs.opacity.area);
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.fillStyle = col.getRGBA();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        var c = this.getCList();
        var len = c.length;
        ctx.moveTo(this.getC(0).getX(), this.getC(0).getY());
        for (var i = 1; i < len; i++) {
            ctx.lineTo(this.getC(i).getX(), this.getC(i).getY());
        }
        ctx.lineTo(zc.mouseX(ev), zc.mouseY(ev));
        ctx.stroke();
        ctx.fill();
    };
}
