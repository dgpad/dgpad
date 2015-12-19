//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function Arc3ptsObject(_construction, _name, _P1, _P2, _P3) {
    var M = new VirtualPointObject(0, 0);
    var M = new CenterObject(_construction, "_Center", this);
    _construction.add(M);
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, M)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    M.setParent(this);
    M.forceFillStyle(this.prefs.color.point_inter);
    M.setHidden(true);

    var A = _P1;
    var B = _P2;
    var C = _P3;
    var AOC = 0; // mesure de l'angle AOC (dans [0;2π]) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π])
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π])
    var trigo = true; // sens de dessin de l'arc ( comment va-t-on de A à C)
    this.setParent(A, B, C);



    this.setDefaults("circle");

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === B) {
            this.addParent(_new);
            B = _new;
        } else if (_old === C) {
            this.addParent(_new);
            C = _new;
        }
    };

    this.getCode = function() {
        return "arc3pts";
    };

    this.getM = function() {
        return M;
    };

    this.getA = function() {
        return A;
    };

    this.getB = function() {
        return B;
    };

    this.getC = function() {
        return C;
    };

    this.fixIntersection = function(_x, _y, _P) {
        if (A.near(_x, _y)) {
            _P.setAway(A);
            return true;
        }
        if (B.near(_x, _y)) {
            _P.setAway(B);
            return true;
        }
        if (C.near(_x, _y)) {
            _P.setAway(C);
            return true;
        }
        return false;
    };


    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        A.setMacroMode(1);
        A.setMacroSource(function(src) {
            src.geomWrite(false, A.getVarName(), "DefinitionPoint", vn, 0);
        });
        B.setMacroMode(1);
        B.setMacroSource(function(src) {
            src.geomWrite(false, B.getVarName(), "DefinitionPoint", vn, 1);
        });
        C.setMacroMode(1);
        C.setMacroSource(function(src) {
            src.geomWrite(false, C.getVarName(), "DefinitionPoint", vn, 2);
        });
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        return (A.Flag || B.Flag || C.Flag);
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        if (_i === 0)
            return A;
        if (_i === 1)
            return B;
        return C;
    };



    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((A.getParentLength() === 0) && (B.getParentLength() === 0) && (C.getParentLength() === 0))
            return true;
        return false;
    };

    // see if point inside 2 border points
    this.checkIfValid = function(_P) {
        var a = $U.angleH(_P.getX() - this.P1.getX(), _P.getY() - this.P1.getY());
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var GOM = (trigo) ? a - fromAngle : ($U.doublePI - toAngle + a);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;
        if (GOM > AOC) {
            _P.setXY(NaN, NaN);
        }
    };

    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var GOM = (trigo) ? a - fromAngle : ($U.doublePI - toAngle + a);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;

        if (GOM > AOC) {
            var m1 = ($U.doublePI - AOC) / 2;
            var m2 = (GOM - AOC);
            if (m2 < m1) {
                a = trigo * toAngle + !trigo * fromAngle;
            } else {
                a = trigo * fromAngle + !trigo * toAngle;
            }
        }

        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };

    this.setAlpha = function(p) {
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var m = $U.angleH(p.getX() - this.P1.getX(), p.getY() - this.P1.getY());
        var GOM = (trigo) ? m - fromAngle : ($U.doublePI - toAngle + m);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;

        if (GOM > AOC) {
            var m1 = ($U.doublePI - AOC) / 2;
            var m2 = (GOM - AOC);
            if (m2 < m1) {
                p.setAlpha(trigo * toAngle + !trigo * fromAngle);
            } else {
                p.setAlpha(trigo * fromAngle + !trigo * toAngle);
            }
        } else {
            p.setAlpha(m);
        }
    };


    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        M.setXY(M.getX() + vx, M.getY() + vy);
        A.setXY(A.getX() + vx, A.getY() + vy);
        B.setXY(B.getX() + vx, B.getY() + vy);
        C.setXY(C.getX() + vx, C.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.computeChilds();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(M.getX(), M.getY(), this.R, -fromAngle, -toAngle, trigo);
        ctx.fill();
        ctx.stroke();
    };



    this.compute = function() {
        var t = $U.computeArcParams(A.getX(), A.getY(), B.getX(), B.getY(), C.getX(), C.getY());
        M.setXY(t.centerX, t.centerY);
        fromAngle = t.startAngle;
        toAngle = t.endAngle;
        trigo = t.Trigo;
        AOC = t.AOC;

        this.R = $U.computeRay(M.getX(), M.getY(), A.getX(), A.getY());
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Arc3pts", A.getVarName(), B.getVarName(), C.getVarName());
    };

    this.mouseInside = function(ev) {
        return $U.isNearToArc(M.getX(), M.getY(), AOC, fromAngle, toAngle, trigo, this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
        //        return $U.isNearToArc(M.getX(), M.getY(), A.getX(), A.getY(), B.getX(), B.getY(), C.getX(), C.getY(), this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


};
