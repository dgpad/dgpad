

function CenterObject(_construction, _name, _C) {
    $U.extend(this, new PointObject(_construction, _name));   // Héritage
//    this.setHidden(true);
    var C = _C;


//    this.setParent(C);

    this.startDrag = function () {
    };
    this.dragTo = function () {
    };
    this.compute = function () {
    };
    this.isMoveable=function(){
        return false;
    };
    this.setFillStyle = function() {
        this.forceFillStyle(this.prefs.color.point_inter);
    };

    this.getSource = function (src) {
        src.geomWrite(false, this.getName(), "Center", C.getVarName());
    };

}