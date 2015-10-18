//************************************************
//*************** Axe (Ox) OBJECT ****************
//************************************************
function OXObject(_construction, _name) {
    var O = new VirtualPointObject(0, 0);
    var I = new VirtualPointObject(1, 0);
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, O, I, true));
    var CS = this.getCoordsSystem();

    this.setParent();
    this.setColor("rgba(0,0,0,0)");

    this.getCode = function() {
        return "axis-x";
    };

    this.setColor = function() {
    };
    this.setSize = function() {
    };

    this.isMoveable = function() {
        return false;
    };

    this.compute = function() {
        O.setXY(CS.getX0(), CS.getY0());
        I.setXY(O.getX() + CS.getUnit(), O.getY());
        superObject.compute();
    };

    this.mouseInside = function(ev) {
        if (CS.isCS()){
            return $U.isNearToLine(this.P1.getX(), this.P1.getY(), this.getDX(), this.getDY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
        }
        else return false;
    };
    

    this.getSource = function(src) {
        if (this.getCn().isAxisUsed())
            src.geomWrite(false, this.getName(), "X_axis");
    };

    this.getStyle = function(src) {
    };
}


