//************************************************
//************** CIRCLE OBJECT *******************
//************************************************
function CircleObject(_construction, _name, _P1, _P2) {
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, _P1));   // Héritage
    $U.extend(this, new MoveableObject(_construction));                                      // Héritage
    var me = this;
    this.setDefaults("circle");
    this.P2 = _P2;
    this.setParent(this.P1, this.P2)

    this.getCode = function() {
        return "circle";
    };

    this.getP2 = function() {
        return this.P2;
    };

    this.redefine = function(_old, _new) {
        if (_old === this.P2) {
            this.addParent(_new);
            this.P2 = _new;
        } else if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
        }
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(me.R));
    };

    this.fixIntersection = function(_x, _y, _P) {
        var isNear = this.P2.near(_x, _y);
        if (isNear)
            _P.setAway(this.P2);
        return isNear;
    };


    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((this.P1.getParentLength() === 0) && (this.P2.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.P1.setXY(this.P1.getX() + vx, this.P1.getY() + vy);
        this.P2.setXY(this.P2.getX() + vx, this.P2.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.computeChilds();
    };



    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.P1.getX(), this.P1.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };


    this.compute = function() {
        this.R = $U.computeRay(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY());
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle", this.P1.getVarName(), this.P2.getVarName());
    };



}
;

