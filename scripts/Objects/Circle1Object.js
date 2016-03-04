//************************************************
//************** CIRCLE 1 OBJECT *****************
//************************************************
function Circle1Object(_construction, _name, _P1, _R) {
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, _P1)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    this.setDefaults("circle");
    this.R = _R;
    var RX = null;
    var isStr = $U.isStr;
    this.setParent(this.P1);

    me.getRX = function() {
        return RX;
    };
    // setExp pour les widgets :
    me.setExp = me.setRX = function(ex) {
        if (isStr(ex)) {
            // Si ex et ey sont des expressions :
            me.setParent(me.P1);
            RX = Expression.delete(RX);
            RX = new Expression(me, ex);
            me.isMoveable = function() {
                return false;
            };
            me.compute = computeFixed;
            me.getSource = getSourceFixed;
        } else {
            // Si ex et ey sont des nombres :
            RX = Expression.delete(RX);
            me.R = ex;
            me.isMoveable = function() {
                return true;
            };
            me.compute = computeGeom;
            me.getSource = getSourceGeom;
            me.setParent(me.P1)
        }
        //        me.compute();
        //        me.computeChilds();
    };

    me.getExp = function() {
        return me.getRX().getSource();
    };

    me.getR = function() {
        return me.R;
    }

    this.redefine = function(_old, _new) {
        if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
        }
    };

    this.getCode = function() {
        return "circle1";
    };

    this.getAssociatedTools = function() {
        var at = "@callproperty,@calltrash,point";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable())
            at += ",@objectmover";
        at += ",@callcalc";
        return at;
    };

    this.isMoveable = function() {
        return true;
    };

    // Obsolete :
    this.dragObject = function(_x, _y) {
        this.R = Math.sqrt((_x - this.P1.getX()) * (_x - this.P1.getX()) + (_y - this.P1.getY()) * (_y - this.P1.getY()));
    };

    this.compute_dragPoints = function(_x, _y) {
        this.R = Math.sqrt((_x - this.P1.getX()) * (_x - this.P1.getX()) + (_y - this.P1.getY()) * (_y - this.P1.getY()));
    };


    this.computeDrag = function() {
        this.computeChilds();
    };

    this.setZoom = function(_h) {
        this.R *= _h;
    };

    this.getValue = function() {
        if (RX)
            return RX.value();
        return (me.getCn().coordsSystem.l(me.R));
    };



    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.P1.getX(), this.P1.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };


    var computeGeom = function() {};

    var computeFixed = function() {
        RX.compute();
        me.R = me.getCn().coordsSystem.lx(RX.value());
    };

    this.compute = computeGeom;

    this.refreshNames = function() {
        if (RX)
            RX.refreshNames();
    };

    var getSourceGeom = function(src) {
        src.geomWrite(false, me.getName(), "Circle1", this.P1.getVarName(), me.getCn().coordsSystem.l(me.R));
    };

    var getSourceFixed = function(src) {
        src.geomWrite(false, me.getName(), "Circle1", me.P1.getVarName(), "\"" + RX.getSource() + "\"");
    };



    me.getSource = getSourceGeom;



};
