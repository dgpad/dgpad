//************************************************
//*************** MIDPOINT CONSTRUCTOR ***********
//************************************************
function MidPointConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "midpoint";
    };

    this.getInitials = function() {
        return ["point,segment"];
    };

    // Si le premier constituant est un segment, alors
    // il s'agit d'une construction instantannée
    this.isInstantTool = function() {
        return (this.getC(0).isInstanceType("segment"));
    };

    this.createCallBack = function(zc, o) {
        if (zc.nameDialog) {
            o.setName(zc.nameDialog.getName());
            o.setShowName(true);
            zc.nameDialog.actualiseBtns();
        }
    };

    this.newObj = function(_zc, _C) {
        var first = this.getC(0);
        if (first.isInstanceType("segment")) {
            _C = [first.P1, first.P2];
        }
        return new MidPointObject(_zc.getConstruction(), "_M", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        if (this.isInstantTool()) return;
        var size = zc.prefs.size.point;
        if (Object.touchpad) {
            size *= zc.prefs.size.touchfactor;
        }
        var x = (this.getC(0).getX() + zc.mouseX(ev)) / 2;
        var y = (this.getC(0).getY() + zc.mouseY(ev)) / 2;

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
