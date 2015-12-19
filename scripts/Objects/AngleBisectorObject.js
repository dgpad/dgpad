//************************************************
//************ BISSECTOR OBJECT ******************
//************************************************


function AngleBisectorObject(_construction, _name, _P1, _P2, _P3) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P2)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var M = new VirtualPointObject(0, 0);
    var P1 = _P1;
    var P2 = _P2;
    var P3 = _P3;
    this.setParent(P1, P2, P3)

    this.setDefaults("ray");

    this.redefine = function(_old, _new) {
        if (_old === P1) {
            this.addParent(_new);
            P1 = _new;
        } else if (_old === P2) {
            this.addParent(_new);
            P2 = _new;
        } else if (_old === P3) {
            this.addParent(_new);
            P3 = _new;
        }
    };

    this.getCode = function() {
        return "anglebiss";
    };

    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((P1.getParentLength() === 0) && (P2.getParentLength() === 0) && (P3.getParentLength() === 0))
            return true;
        return false;
    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
    };

    // see if point inside ray
    this.checkIfValid = function(_P) {
        var dx = this.getDX();
        var dy = this.getDY();
        var xAP = _P.getX() - P2.getX();
        var yAP = _P.getY() - P2.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        M.setXY(M.getX() + vx, M.getY() + vy);
        P1.setXY(P1.getX() + vx, P1.getY() + vy);
        P2.setXY(P2.getX() + vx, P2.getY() + vy);
        P3.setXY(P3.getX() + vx, P3.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        P1.computeChilds();
        P2.computeChilds();
        P3.computeChilds();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.P1.getX(), this.P1.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
    };



    this.compute = function() {
        var b = $U.d(P2, P1);
        var a = $U.d(P2, P3);
        var k = b / (a + b);
        var x = P1.getX() + k * (P3.getX() - P1.getX());
        var y = P1.getY() + k * (P3.getY() - P1.getY());
        if ($U.isNearToPoint(x, y, P2.getX(), P2.getY(), 1e-13)) {
            x = P2.getX() + (P1.getY() - P2.getY());
            y = P2.getY() + (P2.getX() - P1.getX());
        }
        M.setXY(x, y);
        this.setDXDY(P2.getX(), P2.getY(), x, y);
        superObject.compute();
    };

    this.mouseInside = function(ev) {
        return $U.isNearToRay(P2.getX(), P2.getY(), M.getX(), M.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "AngleBisector", P1.getVarName(), P2.getVarName(), P3.getVarName());
    };


};
