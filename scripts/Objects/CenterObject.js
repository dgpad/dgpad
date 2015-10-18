

function CenterObject(_construction, _name, _C) {
    $U.extend(this, new PointObject(_construction, _name));   // Héritage
//    this.setHidden(true);
    var C = _C;


//    this.setParent(C);

    this.compute = function() {
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Center", C.getVarName());
    };

}