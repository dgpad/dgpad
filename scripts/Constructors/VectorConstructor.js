//************************************************
//*************** VECTOR CONSTRUCTOR *************
//************************************************
function VectorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "vector";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        var a = new VectorObject(_zc.getConstruction(), "_V", _C[0], _C[1]);
        a.setOpacity(_zc.prefs.opacity.vector);
        return a;
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var x1 = this.getC(0).getX(),
            y1 = this.getC(0).getY();
        var x2 = zc.mouseX(ev),
            y2 = zc.mouseY(ev);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineCap = 'butt';
        var headlen = zc.prefs.size.vectorhead;
        var angle = Math.atan2(y2 - y1, x2 - x1);
        var c1 = Math.cos(angle - Math.PI / 8);
        var s1 = Math.sin(angle - Math.PI / 8);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 8), y2 - headlen * Math.sin(angle + Math.PI / 8));
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();
        ctx.fill();



    };
}
