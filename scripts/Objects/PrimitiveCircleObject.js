//************************************************
//*********** PRIMITIVECIRCLE OBJECT *************
//************************************************
function PrimitiveCircleObject(_construction, _name, _P1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var lastx, lasty, lastr; // Pour les traces
    this.P1 = _P1;
    this.R = 0;

    this.getP1 = function() {
        return this.P1;
    };
    this.getR = function() {
        return this.R;
    };


    this.isCoincident = function(_C) {
        if (_C.isInstanceType("circle")) {
            // Si les cercles (ou arcs) sont confondus :
            if ($U.approximatelyEqual(this.getR(), _C.getR()) && $U.approximatelyEqual(this.getP1().getX(), _C.getP1().getX()) && $U.approximatelyEqual(this.getP1().getY(), _C.getP1().getY())) {
                return true;
            }
        }
        return false;
    };


    this.isInstanceType = function(_c) {
        return (_c === "circle");
    };
    this.getFamilyCode = function() {
        return "circle";
    };
    this.getAssociatedTools = function() {
        var at = "@callproperty,@calltrash,point";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable()) at += ",@objectmover";
        return at;
    };

    // Necessaire pour les animations :
    this.getAlphaBounds = function() {
        return [0, $U.doublePI, 1]
    };

    this.projectXY = function(xM, yM) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xAM = xM - xA;
        var yAM = yM - yA;
        var AM = Math.sqrt(xAM * xAM + yAM * yAM);
        if (AM === 0) {
            return [xA + this.R, yA];
        } else {
            return [xA + this.R * xAM / AM, yA + this.R * yAM / AM];
        }
    };
    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };


    this.setAlpha = function(p) {
        p.setAlpha($U.angleH(p.getX() - this.P1.getX(), p.getY() - this.P1.getY()));
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var aMin = 0,
            aMax = 2 * Math.PI;
        var step = (aMax - aMin) / (_nb - 1);
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < _nb; i++) {
            Ptab.push({
                "alpha": aMin + step * i,
                "x": 0,
                "y": 0,
                "x1": 0,
                "y1": 0,
                "r": 0
            });
        }
        return Ptab;
    };

    this.setLocusAlpha = function(p, a) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };


    //// Seulement pour les macros. Permet de désigner un cercle comme initial,
    //// avec le centre comme intermédiaire automatique :
    //    this.getMacroSource = function(src) {
    //        src.geomWrite(false, this.getP1().getName(), "Center", this.getName());
    //    };

    this.setMacroAutoObject = function() {
        var p = this.getP1();
        var c = this;
        var proc = function(src) {
                src.geomWrite(false, p.getName(), "Center", c.getVarName());
            }
            // Défini le centre comme intermédiaire :
        p.setMacroMode(1);
        p.setMacroSource(proc);
    };

    // For macro process only :
    this.isAutoObjectFlags = function() {
        return (this.getP1().Flag);
    };

    // Surchargé par CircleObject et Arc3ptsObjects :
    this.fixIntersection = function() {};

    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            // Determine Circle/Circle intersection :
            var xC1 = this.getP1().getX(),
                yC1 = this.getP1().getY();
            var xC2 = _C.getP1().getX(),
                yC2 = _C.getP1().getY();
            var dx = xC2 - xC1,
                dy = yC2 - yC1;
            var r = Math.sqrt(dx * dx + dy * dy);
            var r1 = this.getR(),
                r2 = _C.getR();
            if (r > (r1 + r2))
                return null;
            if (r === 0) {}
            var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
            dx /= r;
            dy /= r;
            var x = xC1 + l * dx,
                y = yC1 + l * dy;
            var h = r1 * r1 - l * l;
            if (h < 0) {
                return null;
            }
            h = Math.sqrt(h);
            var x0 = x + h * dy,
                y0 = y - h * dx,
                x1 = x - h * dy,
                y1 = y + h * dx;
            var d0 = (_P.getX() - x0) * (_P.getX() - x0) + (_P.getY() - y0) * (_P.getY() - y0);
            var d1 = (_P.getX() - x1) * (_P.getX() - x1) + (_P.getY() - y1) * (_P.getY() - y1);
            if (d0 < d1) {
                _P.setOrder(0);
                _P.setXY(x0, y0);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(x1, y1)) _P.setAway(this.P1);
                else if (this.fixIntersection(x1, y1, _P)) null;
                else if (_C.P1.near(x1, y1)) _P.setAway(_C.P1);
                else _C.fixIntersection(x1, y1, _P);
                //                else if ((this.getCode() === "circle") && this.P2.near(x1, y1)) _P.setAway(this.P2);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :

                //                else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1)) _P.setAway(_C.P2);
                //                // Si l'un des points constituant de ce cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                if (this.P1.near(x1, y1)) _P.setAway(this.P1);
                //                else if ((this.getCode() === "circle") && this.P2.near(x1, y1)) _P.setAway(this.P2);
                //                // Si l'un des points constituant du deuxième cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                else if (_C.P1.near(x1, y1)) _P.setAway(_C.P1);
                //                else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1)) _P.setAway(_C.P2);
            } else {
                _P.setOrder(1);
                _P.setXY(x1, y1);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(x0, y0)) _P.setAway(this.P1);
                else if (this.fixIntersection(x0, y0, _P)) null;
                else if (_C.P1.near(x0, y0)) _P.setAway(_C.P1);
                else _C.fixIntersection(x0, y0, _P);
                //                // Si l'un des points constituant de ce cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                if (this.P1.near(x0, y0)) _P.setAway(this.P1);
                //                else if ((this.getCode() === "circle") && this.P2.near(x0, y0)) _P.setAway(this.P2);
                //                // Si l'un des points constituant du deuxième cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                else if (_C.P1.near(x0, y0)) _P.setAway(_C.P1);
                //                else if ((_C.getCode() === "circle") && _C.P2.near(x0, y0)) _P.setAway(_C.P2);
            }
        }
    }

    this.intersectCircleCircle = function(c2, _P) {
        // Determine Circle/Circle intersection :
        var xC1 = this.getP1().getX(),
            yC1 = this.getP1().getY();
        var xC2 = c2.getP1().getX(),
            yC2 = c2.getP1().getY();
        var dx = xC2 - xC1,
            dy = yC2 - yC1;
        var r = Math.sqrt(dx * dx + dy * dy);
        var r1 = this.getR(),
            r2 = c2.getR();
        if (r > (r1 + r2)) {
            _P.setXY(NaN, NaN);
            return;
        }
        if (r === 0) {}
        var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
        dx /= r;
        dy /= r;
        var x = xC1 + l * dx,
            y = yC1 + l * dy;
        var h = r1 * r1 - l * l;
        if (h < 0) {
            _P.setXY(NaN, NaN);
            return;
        }
        h = Math.sqrt(h);
        //        var hDX = h * dx, hDY = h * dy;

        if (_P.getAway()) {
            if (_P.getAway().near(x + h * dy, y - h * dx)) {
                _P.setXY(x - h * dy, y + h * dx);
            } else {
                _P.setXY(x + h * dy, y - h * dx);
            }
        } else {
            if (_P.getOrder() === 0) {
                _P.setXY(x + h * dy, y - h * dx);
            } else {
                _P.setXY(x - h * dy, y + h * dx);
            }
        }



        //        if (_P.getOrder() === 0) {
        //            _P.setXY(x + h * dy, y - h * dx);
        //        } else {
        //            _P.setXY(x - h * dy, y + h * dx);
        //        }
    };

    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            this.intersectCircleCircle(_C, _P);
        }
    };

    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("circle")) {
            // Determine Circle/Circle intersection :
            var xC1 = this.getP1().getX(),
                yC1 = this.getP1().getY();
            var xC2 = _C.getP1().getX(),
                yC2 = _C.getP1().getY();
            var dx = xC2 - xC1,
                dy = yC2 - yC1;
            var r = Math.sqrt(dx * dx + dy * dy);
            var r1 = this.getR(),
                r2 = _C.getR();
            if (r > (r1 + r2))
                return null;
            if (r === 0) {}
            var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
            dx /= r;
            dy /= r;
            var x = xC1 + l * dx,
                y = yC1 + l * dy;
            var h = r1 * r1 - l * l;
            if (h < 0) {
                return null;
            }
            h = Math.sqrt(h);
            var x0 = x + h * dy,
                y0 = y - h * dx,
                x1 = x - h * dy,
                y1 = y + h * dx;
            var d0 = (_x - x0) * (_x - x0) + (_y - y0) * (_y - y0);
            var d1 = (_x - x1) * (_x - x1) + (_y - y1) * (_y - y1);
            if (d0 < d1) {
                return [x0, y0];
            } else {
                return [x1, y1];
            }
        }
    };

    this.beginTrack = function() {
        lastx = this.getP1().getX();
        lasty = this.getP1().getY();
        lastr = this.getR();
    };

    this.drawTrack = function(ctx) {
        var x0 = this.getP1().getX(),
            y0 = this.getP1().getY(),
            r = this.getR();
        if (!isNaN(x0) && !isNaN(y0) && !isNaN(r)) {
            if ((x0 !== lastx) || (y0 != lasty) || (r != lastr)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';

                if (!isNaN(lastx) && !isNaN(lasty) && !isNaN(lastr)) {
                    ctx.beginPath();
                    switch (this.getCode()) {
                        case "ray":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            //                            ctx.lineTo(r, ymax);
                            break;
                        case "segment":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(this.getP2().getX(), this.getP2().getY());
                            break;
                        default:
                            ctx.beginPath();
                            ctx.arc(x0, y0, r, 0, Math.PI * 2, true);
                            break;
                    }
                    ctx.stroke();
                }
            }
        }
        lastx = x0;
        lasty = y0;
        lastr = r;
    };


    this.mouseInside = function(ev) {
        return $U.isNearToCircle(this.P1.getX(), this.P1.getY(), this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };

    // Alpha, for CaRMetal .zir translation :
    this.transformAlpha = function(_alpha) {
        return -_alpha;
    };


};
