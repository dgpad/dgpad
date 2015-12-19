//************************************************
//*************** LINE CONSTRUCTOR ***************
//************************************************
function LineConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "line";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        return new TwoPointsLineObject(_zc.getConstruction(), "_L", _C[0], _C[1]);
    };



    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.strokeStyle = zc.prefs.color.hilite;
        $U.drawPartialLine(ctx, this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev), true, true);
    };
}
