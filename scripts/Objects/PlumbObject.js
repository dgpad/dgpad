//************************************************
//*************** PLUMB OBJECT *******************
//************************************************
function PlumbObject(_construction, _name, _L, _P1) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P1)); // Héritage

    this.L = _L;

    this.setParent(this.P1, this.L)

    this.getCode = function() {
        return "plumb";
    };


    this.isMoveable = function() {
        // Si P1 est un point libre :
        if ((this.P1.getParentLength() === 0)) return true;
        return false;
    };

    this.compute = function() {
        this.setDXDY(0, 0, this.L.getDY(), -this.L.getDX());
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Perpendicular", this.L.getVarName(), this.P1.getVarName());
    };




};
