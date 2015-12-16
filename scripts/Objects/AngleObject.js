//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function AngleObject(_construction, _name, _P1, _P2, _P3) {
    $U.extend(this, new ConstructionObject(_construction, _name));                           // Héritage
    $U.extend(this, new MoveableObject(_construction));                                                     // Héritage
    var me = this;
    var A = _P1;
    var O = _P2;
    var C = _P3;
    var R = 30;
    var AOC = 0; // mesure de l'angle AOC orienté positif (dans [0;2π[) :
    var AOC180 = 0; // mesure de l'angle AOC (dans [0;π[) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π[)
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π[)
    var trigo = true; // sens de dessin de l'arc ( comment va-t-on de A à C)
    var valid = true;
    var Cn = _construction;
    var deg_coef = 180 / Math.PI;
    var mode360 = false;



    this.setParent(A, O, C);

    this.redefine = function (_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === O) {
            this.addParent(_new);
            O = _new;
        } else if (_old === C) {
            this.addParent(_new);
            C = _new;
        }
    };
    this.is360 = function () {
        return mode360;
    };
    this.set360 = function (_360) {
        mode360 = _360;
    };
    this.getValue = function () {
        var a= mode360 ? AOC : AOC180;
        return (Cn.isDEG()) ? (a * deg_coef) : a;
    };
    this.getCode = function () {
        return "angle";
    };
    this.getFamilyCode = function () {
        return "angle";
    };
    //Obsolete :
    this.dragObject = function (_x, _y) {
        var vx = _x - O.getX();
        var vy = _y - O.getY();
        R = Math.sqrt(vx * vx + vy * vy);
    };
    this.compute_dragPoints = function (_x, _y) {
        var vx = _x - O.getX();
        var vy = _y - O.getY();
        R = Math.sqrt(vx * vx + vy * vy);
    };
    this.computeDrag = function () {
    };

    this.paintLength = function (ctx) {
        if (valid) {
            if ($U.approximatelyEqual(AOC180, $U.halfPI))
                return;
            ctx.save();
            var b = $U.d(O, A);
            var a = $U.d(O, C);
            var k = b / (a + b);
            var x = A.getX() + k * (C.getX() - A.getX()) - O.getX();
            var y = A.getY() + k * (C.getY() - A.getY()) - O.getY();

            var a = Math.atan2(y, x);
            var r = R + this.prefs.fontmargin + this.getRealsize() / 2;
            ctx.textAlign = "left";


            var prec = this.getPrecision();
            var display = (mode360) ? AOC : AOC180;
            display = display * 180 / Math.PI;
            display = Math.round(display * prec) / prec;
            if (display > 180)
                a += Math.PI;

            if ((a < -$U.halfPI) || (a > $U.halfPI)) {
                a += Math.PI;
                r = -r;
                ctx.textAlign = "right";
            }

            ctx.fillStyle = ctx.strokeStyle;
            ctx.translate(O.getX(), O.getY());
            ctx.rotate(a);

            ctx.fillText($L.number(display) + "°", r, this.getFontSize() / 2);
            ctx.restore();
        }
    };
//    this.setPrecision(1);


    this.paintObject = function (ctx) {
        if (valid) {
            ctx.beginPath();
            if ($U.approximatelyEqual(AOC180, $U.halfPI)) {
                var cto = R * Math.cos(-toAngle), sto = R * Math.sin(-toAngle);
                var cfrom = R * Math.cos(-fromAngle), sfrom = R * Math.sin(-fromAngle);
                ctx.moveTo(O.getX() + cto, O.getY() + sto);
                ctx.lineTo(O.getX() + cto + cfrom, O.getY() + sto + sfrom);
                ctx.lineTo(O.getX() + cfrom, O.getY() + sfrom);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(O.getX(), O.getY());
                ctx.lineTo(O.getX() + cto, O.getY() + sto);
                ctx.lineTo(O.getX() + cfrom, O.getY() + sfrom);
                ctx.fill();
            } else {
                ctx.arc(O.getX(), O.getY(), R, -fromAngle, -toAngle, trigo);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(O.getX() + R * Math.cos(-toAngle), O.getY() + R * Math.sin(-toAngle));
                ctx.lineTo(O.getX(), O.getY());
                ctx.lineTo(O.getX() + R * Math.cos(-fromAngle), O.getY() + R * Math.sin(-fromAngle));
                ctx.fill();
            }
        }

    };

    this.compute = function () {
        var t = $U.computeAngleParams(A.getX(), A.getY(), O.getX(), O.getY(), C.getX(), C.getY());
        fromAngle = t.startAngle;
        toAngle = t.endAngle;
        trigo = mode360 ? true : t.Trigo;
        AOC = t.AOC;
        AOC180 = t.AOC180;
        valid = !isNaN(fromAngle);
//        console.log("fromA="+fromAngle+" toA="+toAngle+" trig="+trigo+" AOC="+AOC);
    };


    this.getSource = function (src) {
        src.geomWrite(false, this.getName(), "Angle", A.getVarName(), O.getVarName(), C.getVarName());
    };

    this.mouseInside = function (ev) {
        return $U.isNearToArc(O.getX(), O.getY(), AOC, fromAngle, toAngle, trigo, R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.setDefaults("angle");

}