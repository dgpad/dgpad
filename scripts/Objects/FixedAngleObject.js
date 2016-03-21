//************************************************
//************ FIXED ANGLE OBJECT ****************
//************************************************
function FixedAngleObject(_construction, _name, _P1, _P2, _trigo) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P2));
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    var A = _P1;
    var O = _P2;
    var C = new VirtualPointObject(0, 0);
    var E1 = null;
    var VALUE = 0;
    var Cn = _construction;
    var R = 30;
    var AOC = 0; // mesure de l'angle AOC orienté positif (dans [0;2π[) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π[)
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π[)
    var trigo = _trigo; // Sens de l'angle
    var sel_arc, sel_ray = true;

    this.setParent(A, O);

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === O) {
            this.addParent(_new);
            O = _new;
        }
    };
    this.isTrigo = function() {
        return trigo;
    };
    this.setTrigo = function(_t) {
        trigo = _t;
    };

    this.getValue = function() {
        return E1.value();
    };
    this.getCode = function() {
        return "fixedangle";
    };
    this.getFamilyCode = function() {
        return "fixedangle";
    };
    this.setTrigo = function(_t) {
        trigo = _t
    };
    this.getTrigo = function() {
        return trigo;
    };

    this.getAssociatedTools = function() {
        var at = superObject.getAssociatedTools();
        at += ",@callcalc";
        return at;
    };

    this.getAlphaBounds = function(anim) {
        var t = superObject.getAlphaBounds(anim);
        t[0] = 0;
        return t;
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
        var xAP = _P.getX() - O.getX();
        var yAP = _P.getY() - O.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };


    // setExp pour les widgets :
    me.setExp = me.setE1 = function(_t) {
        E1 = Expression.delete(E1);
        E1 = new Expression(me, _t);
    };
    me.getExp = function() {
        return me.getE1().getSource();
    };
    me.getE1 = function() {
        return E1;
    };

    this.compute_dragPoints = function(_x, _y) {
        if (sel_arc) {
            var vx = _x - O.getX();
            var vy = _y - O.getY();
            R = Math.sqrt(vx * vx + vy * vy);
        }
    };
    this.computeDrag = function() {};

    this.paintLength = function(ctx) {
        ctx.save();
        var r = R + this.prefs.fontmargin + this.getRealsize() / 2;
        ctx.textAlign = "left";
        var prec = this.getPrecision();
        var display = VALUE;
        display = Math.round(display * prec) / prec;
        var a = trigo ? -toAngle + AOC / 2 : Math.PI - toAngle + AOC / 2;
        a = a - Math.floor(a / $U.doublePI) * $U.doublePI; // retour dans [0;2π]
        if ((a > $U.halfPI) && (a < 3 * $U.halfPI)) {
            a += Math.PI;
            r = -r;
            ctx.textAlign = "right";
        }
        ctx.fillStyle = ctx.strokeStyle;
        ctx.translate(O.getX(), O.getY());
        ctx.rotate(a);
        ctx.fillText($L.number(display) + "°", r, this.getFontSize() / 2);
        ctx.restore();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(O.getX(), O.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
        ctx.moveTo(O.getX(), O.getY());
        ctx.beginPath();
        ctx.lineTo(O.getX() + R * Math.cos(-fromAngle), O.getY() + R * Math.sin(-fromAngle));
        ctx.lineWidth = ctx.lineWidth * 3;
        ctx.arc(O.getX(), O.getY(), R, -fromAngle, -toAngle, trigo);
        ctx.stroke();
        ctx.lineTo(O.getX(), O.getY());
        ctx.fill();
    };

    this.compute = function() {
        E1.compute();
        VALUE = AOC = E1.value();
        if (Cn.isDEG())
            AOC = AOC * Math.PI / 180;
        else
            VALUE = VALUE * 180 / Math.PI;
        if (!trigo)
            AOC = -AOC;
        AOC = AOC - Math.floor(AOC / $U.doublePI) * $U.doublePI; // AOC in [0,2π[
        var x = (A.getX() - O.getX()) * Math.cos(AOC) + (A.getY() - O.getY()) * Math.sin(AOC);
        var y = (O.getX() - A.getX()) * Math.sin(AOC) + (A.getY() - O.getY()) * Math.cos(AOC);
        this.setDXDY(0, 0, x, y);
        superObject.compute();
        C.setXY(O.getX() + x, O.getY() + y);
        fromAngle = $U.angleH(A.getX() - O.getX(), A.getY() - O.getY());
        toAngle = $U.angleH(C.getX() - O.getX(), C.getY() - O.getY());
    };

    this.getSource = function(src) {
        var _ex = "\"" + E1.getUnicodeSource().replace(/\n/g, "\\n") + "\"";
        src.geomWrite(false, this.getName(), "FixedAngle", A.getVarName(), O.getVarName(), _ex, trigo);
    };

    this.mouseInside = function(ev) {
        sel_ray = $U.isNearToRay(O.getX(), O.getY(), C.getX(), C.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
        sel_arc = $U.isNearToArc(O.getX(), O.getY(), AOC, fromAngle, toAngle, trigo, R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
        return sel_arc || sel_ray
    };


    this.setDefaults("fixedangle");
}
