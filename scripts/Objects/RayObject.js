//************************************************
//*************** RAY OBJECT *********************
//************************************************
function RayObject(_construction, _name, _P1, _P2) {
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, _P1, _P2, true)); // Héritage
    this.setParent(this.P1, this.P2);
    this.setDefaults("ray");

    this.getCode = function() {
        return "ray";
    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
    };

    this.isInstanceType = function(_c) {
        return ((_c === "line") || (_c === "ray"));
    };

    // see if point inside ray
    this.checkIfValid = function(_P) {
        var dx = this.getDX();
        var dy = this.getDY();
        var xAP = _P.getX() - this.P1.getX();
        var yAP = _P.getY() - this.P1.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };


    this.mouseInside = function(ev) {
        return $U.isNearToRay(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.paintObject = function(ctx) {
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.P1.getX(), this.P1.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
        ctx.lineCap = 'butt';
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Ray", this.P1.getVarName(), this.P2.getVarName());
    };


};
