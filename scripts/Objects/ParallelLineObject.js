//************************************************
//************ PARALLELLINE OBJECT ***************
//************************************************
function ParallelLineObject(_construction, _name, _L, _P1) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P1)); // Héritage
    var Cn = _construction;

    this.L = _L;

    this.setParent(this.P1, this.L);

    this.getCode = function() {
        return "parallel";
    };

    this.isMoveable = function() {
        // Si P1 est un point libre :
        if ((this.P1.getParentLength() === 0))
            return true;
        return false;
    };

    this.compute = function() {
        //        this.setDX(this.L.getDX());
        //        this.setDY(this.L.getDY());
        this.setDXDY(0, 0, this.L.getDX(), this.L.getDY());
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Parallel", this.L.getVarName(), this.P1.getVarName());
    };


};
