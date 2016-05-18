//************************************************
//********** PerpBisectorObject OBJECT ***********
//************************************************
function PerpBisectorObject(_construction, _name, _A1, _A2) {
    var M = new VirtualPointObject(0, 0);
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, M)); // Héritage

    this.A1 = _A1;
    this.A2 = _A2;

    this.setParent(this.A1, this.A2)

    this.getCode = function() {
        return "perpbis";
    };


    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((this.A1.getParentLength() === 0) && (this.A2.getParentLength() === 0)) return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.A1.setXY(this.A1.getX() + vx, this.A1.getY() + vy);
        this.A2.setXY(this.A2.getX() + vx, this.A2.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };

    this.compute = function() {
        var xA = this.A1.getX(),
            yA = this.A1.getY();
        var xB = this.A2.getX(),
            yB = this.A2.getY();
        M.setXY((xA + xB) / 2, (yA + yB) / 2);
        this.setDXDY(0, 0, yA - yB, xB - xA);
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "PerpendicularBisector", this.A1.getVarName(), this.A2.getVarName());
    };


};
