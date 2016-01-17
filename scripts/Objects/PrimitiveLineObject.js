//************************************************
//************ PRIMITIVELINE OBJECT **************
//************************************************
function PrimitiveLineObject(_construction, _name, _P1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var Cn = _construction;

    this.P1 = _P1;

    this.setDefaults("line");

    // Vecteur directeur normé (en 2D) :
    var DX = 0,
        DY = 0;
    // Vecteur directeur normé (en 2D et 3D) :
    var NDX = 0,
        NDY = 0;



    // Frontières du canvas à prendre en compte pour le "paintObject" de la droite :
    var xmin, ymin, xmax, ymax;

    var lastxmin, lastymin, lastxmax, lastymax;

    this.getAssociatedTools = function() {

        var at = "@callproperty,@calltrash,point,parallel,plumb,syma";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable())
            at += ",@objectmover";
        return at;
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("line")) {
            // Si les droites (segments) sont confondus :
            if ($U.approximatelyEqual(NDX, _C.getNDX()) && $U.approximatelyEqual(NDY, _C.getNDY())) {
                return true;
            } else if ($U.approximatelyEqual(-NDX, _C.getNDX()) && $U.approximatelyEqual(-NDY, _C.getNDY())) {
                return true;
            }
        }
        return false;
    };

    this.getXmax = function() {
        return xmax;
    };
    this.getYmax = function() {
        return ymax;
    };
    this.getXmin = function() {
        return xmin;
    };
    this.getYmin = function() {
        return ymin;
    };

    this.isInstanceType = function(_c) {
        return (_c === "line");
    };
    this.getFamilyCode = function() {
        return "line";
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();

        var w = this.getWidth();
        var h = this.getHeight();
        var dx = NDX;
        var dy = NDY;

        var tsort = function(a, b) {
            return (a - b)
        }

        var t = (dy === 0) ? [-xA / dx, (w - xA) / dx] :
            ((dx === 0) ? [-yA / dy, (h - yA) / dy] : [-xA / dx, (w - xA) / dx, -yA / dy, (h - yA) / dy]);
        t.sort(tsort);
        if (t.length === 4) {
            t.splice(0, 1);
            t.splice(2, 1);
        }
        var d = Math.sqrt((t[1] - t[0]) * (t[1] - t[0]) * (dx * dx + dy * dy));
        var inc = Math.abs(t[1] - t[0]) * anim.direction * (anim.speed * anim.delay / 1000) / d;
        return [t[0], t[1], inc]
    };

    this.getAnimationSpeedTab = function() {
        return [0, 1, 5, 10, 25, 50, 100, 200, 300, 500, 800, 1000, 1500];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (400 / fce.length));
        if (f >= fce.length) f = fce.length - 1;
        var ps = NDX * (x1 - x0) + NDY * (y1 - y0);
        var dir = (ps > 0) ? -1 : 1;
        var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var aller_retour = (Math.abs(ps / dom) < 0.707);
        return {
            message: aller_retour ? fce[f] + " px/s \u21C4" : fce[f] + " px/s",
            speed: fce[f],
            direction: dir,
            ar: aller_retour
        }
    }

    // ****************************************
    // ****************************************

    this.setDXDY = function(_x0, _y0, _x1, _y1) {
        DX = _x1 - _x0;
        DY = _y1 - _y0;
        var n = Math.sqrt(DX * DX + DY * DY);
        NDX = DX / n;
        NDY = DY / n;
        // En 2D, on normalise :
        if (!this.is3D()) {
            DX = NDX;
            DY = NDY;
        }
    };

    this.getNDX = function() {
        return NDX;
    };
    this.getNDY = function() {
        return NDY;
    };
    this.getDX = function() {
        return DX;
    };
    this.getDY = function() {
        return DY;
    };
    this.getP1 = function() {
        return this.P1;
    };

    this.mouseInside = function(ev) {
        return $U.isNearToLine(this.P1.getX(), this.P1.getY(), NDX, NDY, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.P1.setXY(this.P1.getX() + vx, this.P1.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };

    // Calcule les coordonnées du symétrique d'un point _M par rapport à moi :
    this.reflect = function(_M, _P) {
        var x1 = this.P1.getX();
        var y1 = this.P1.getY();
        var x2 = _M.getX();
        var y2 = _M.getY();
        var dxy = NDX * NDY;
        var dx2 = NDX * NDX;
        var dy2 = NDY * NDY;
        var d = dx2 + dy2;
        var xP = (2 * dxy * (y2 - y1) + dy2 * (2 * x1 - x2) + dx2 * x2) / d;
        var yP = (2 * dxy * (x2 - x1) + dx2 * (2 * y1 - y2) + dy2 * y2) / d;
        _P.setXY(xP, yP);
    };



    this.intersectLineCircle = function(_C, _P) {
        var x = _C.getP1().getX(),
            y = _C.getP1().getY();
        var r = _C.getR();
        var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;

        // Si le cercle et la droite sont tangents :
        if (Math.abs(r - Math.abs(d)) < 1e-12) {
            var c = this.projectXY(x, y);
            _P.setXY(c[0], c[1]);
            return;
        }

        x -= d * NDY;
        y += d * NDX;
        var h = r * r - d * d;



        if (h >= 0) {
            h = Math.sqrt(h);
            var hDX = h * NDX,
                hDY = h * NDY;

            if (_P.getAway()) {
                if (_P.getAway().near(x + hDX, y + hDY)) {
                    _P.setXY(x - hDX, y - hDY);
                } else {
                    _P.setXY(x + hDX, y + hDY);
                }
            } else {
                if (_P.getOrder() === 0) {
                    _P.setXY(x + hDX, y + hDY);
                } else {
                    _P.setXY(x - hDX, y - hDY);
                }
            }
        } else {
            _P.setXY(NaN, NaN);
        }
    };

    this.intersectLineLine = function(_D, _P) {
        var dxA = NDX,
            dyA = NDY,
            dxB = _D.getNDX(),
            dyB = _D.getNDY();
        var det = dxB * dyA - dxA * dyB;
        if (det !== 0) {
            var A = this.P1,
                B = _D.P1;
            var num1 = dyA * A.getX() - dxA * A.getY();
            var num2 = dxB * B.getY() - dyB * B.getX();
            _P.setXY((dxB * num1 + dxA * num2) / det, (dyB * num1 + dyA * num2) / det);
        }
    };

    var intersectLineQuadricXY = function(_Q) {
        // compute the intersection coordinates of a line with a quadric
        // done with XCAS :
        var X = _Q.getCoeffs();
        var M = -NDY,
            N2 = NDX,
            P = -(M * _P1.getX() + N2 * _P1.getY());
        var A = X[0],
            B = X[1],
            C = X[2],
            D = X[3],
            E = X[4],
            F = X[5];
        var x1 = 0,
            x2 = 0,
            y1 = 0,
            y2 = 0;
        if (N2 != 0) {
            var part1 = -2 * B * M * P - C * N2 * N2 + D * M * N2 + E * N2 * P;
            var part2 = Math.abs(N2) * Math.sqrt(-2 * M * D * N2 * C + 4 * P * D * A * N2 + 4 * P * M * B * C + 4 * E * M * N2 * F - 2 * E * P * N2 * C - 2 * E * P * M * D - 4 * M * M * B * F - 4 * P * P * A * B - 4 * A * N2 * N2 * F + N2 * N2 * C * C + M * M * D * D + E * E * P * P);

            var part3 = 2 * A * N2 * N2 + 2 * B * M * M + (-2 * E) * M * N2;
            x1 = (part1 + part2) / part3;
            if (isNaN(x1)) {
                return [];
            }
            y1 = (-M * x1 - P) / N2;
            x2 = (part1 - part2) / part3;
            y2 = (-M * x2 - P) / N2;
            if (((x2 - x1) / NDX) < 0) {
                return [x2, y2, x1, y1];
            }
        } else {
            x1 = -P / M;
            x2 = x1;
            var part1 = -D * M * M + E * M * P;
            var part2 = Math.abs(M) * Math.sqrt(4 * P * M * B * C - 2 * E * P * M * D - 4 * M * M * B * F - 4 * P * P * A * B + M * M * D * D + E * E * P * P);
            var part3 = 2 * M * M * B;
            y1 = (part1 + part2) / part3;
            if (isNaN(y1)) {
                return [];
            }
            y2 = (part1 - part2) / part3;
            if (((y2 - y1) / NDY) < 0) {
                return [x2, y2, x1, y1];
            }
        }
        return [x1, y1, x2, y2];
    }

    this.intersectLineQuadric = function(_Q, _P) {
        var c = intersectLineQuadricXY(_Q);
        if (c.length === 0) {
            _P.setXY(NaN, NaN);
        } else {
            if (_P.getAway()) {
                if (_P.getAway().near(c[0], c[1])) {
                    _P.setXY(c[2], c[3]);
                } else {
                    _P.setXY(c[0], c[1]);
                }
            } else {
                if (_P.getOrder() === 0) {
                    _P.setXY(c[0], c[1]);
                } else {
                    _P.setXY(c[2], c[3]);
                }
            }
        }
    }








    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("line")) {
            this.intersectLineLine(_C, _P);
        } else if (_C.isInstanceType("circle")) {
            this.intersectLineCircle(_C, _P);
        } else if (_C.isInstanceType("quadric")) {
            this.intersectLineQuadric(_C, _P);
        }
    };

    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            var x = _C.getP1().getX(),
                y = _C.getP1().getY();
            var r = _C.getR();
            var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;
            x -= d * NDY;
            y += d * NDX;
            var h = r * r - d * d;
            if (h > 0) {
                h = Math.sqrt(h);
                var x0 = x + h * NDX,
                    y0 = y + h * NDY,
                    x1 = x - h * NDX,
                    y1 = y - h * NDY;
                var d0 = (_P.getX() - x0) * (_P.getX() - x0) + (_P.getY() - y0) * (_P.getY() - y0);
                var d1 = (_P.getX() - x1) * (_P.getX() - x1) + (_P.getY() - y1) * (_P.getY() - y1);
                if (d0 < d1) {
                    _P.setOrder(0);
                    _P.setXY(x0, y0);
                    // Si l'un des points constituant de la droite est sur l'autre
                    // intersection, il faut en rester loin :
                    if (this.P1.near(x1, y1))
                        _P.setAway(this.P1);
                    else if ((this.getCode() === "line") && this.P2.near(x1, y1))
                        _P.setAway(this.P2);
                    // Si l'un des points constituant du cercle est sur l'autre
                    // intersection, il faut en rester loin :
                    else if (_C.P1.near(x1, y1))
                        _P.setAway(_C.P1);
                    else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1))
                        _P.setAway(_C.P2);
                } else {
                    _P.setOrder(1);
                    _P.setXY(x1, y1);
                    // Si l'un des points constituant de la droite est sur l'autre
                    // intersection, il faut en rester loin :
                    if (this.P1.near(x0, y0))
                        _P.setAway(this.P1);
                    else if ((this.getCode() === "line") && this.P2.near(x0, y0))
                        _P.setAway(this.P2);
                    // Si l'un des points constituant du cercle est sur l'autre
                    // intersection, il faut en rester loin :
                    else if (_C.P1.near(x0, y0))
                        _P.setAway(_C.P1);
                    else if ((_C.getCode() === "circle") && _C.P2.near(x0, y0))
                        _P.setAway(_C.P2);
                }
            }
        } else if (_C.isInstanceType("quadric")) {
            //            console.log("yes !!");
            var c = intersectLineQuadricXY(_C);
            var d0 = (_P.getX() - c[0]) * (_P.getX() - c[0]) + (_P.getY() - c[1]) * (_P.getY() - c[1]);
            var d1 = (_P.getX() - c[2]) * (_P.getX() - c[2]) + (_P.getY() - c[3]) * (_P.getY() - c[3]);
            if (d0 < d1) {
                _P.setOrder(0);
                _P.setXY(c[0], c[1]);
                // Si l'un des points constituant de la droite est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(c[2], c[3]))
                    _P.setAway(this.P1);
                else if ((this.getCode() === "line") && this.P2.near(c[2], c[3]))
                    _P.setAway(this.P2);
            } else {
                _P.setOrder(1);
                _P.setXY(c[2], c[3]);
                // Si l'un des points constituant de la droite est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(c[0], c[1]))
                    _P.setAway(this.P1);
                else if ((this.getCode() === "line") && this.P2.near(c[0], c[1]))
                    _P.setAway(this.P2);
            }
        }
    };


    // Calcule les coordonnées du symétrique d'un point P(_x;_y) par rapport à moi :
    this.reflectXY = function(_x, _y) {
        var x1 = this.P1.getX();
        var y1 = this.P1.getY();
        var dxy = NDX * NDY;
        var dx2 = NDX * NDX;
        var dy2 = NDY * NDY;
        var d = dx2 + dy2;
        var xM = (2 * dxy * (_y - y1) + dy2 * (2 * x1 - _x) + dx2 * _x) / d;
        var yM = (2 * dxy * (_x - x1) + dx2 * (2 * y1 - _y) + dy2 * _y) / d;
        return [xM, yM];
    };

    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("circle")) {
            var x = _C.getP1().getX(),
                y = _C.getP1().getY();
            var r = _C.getR();
            var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;
            x -= d * NDY;
            y += d * NDX;
            var h = r * r - d * d;
            if (h > 0) {
                h = Math.sqrt(h);
                var x0 = x + h * NDX,
                    y0 = y + h * NDY,
                    x1 = x - h * NDX,
                    y1 = y - h * NDY;
                var d0 = (_x - x0) * (_x - x0) + (_y - y0) * (_y - y0);
                var d1 = (_x - x1) * (_x - x1) + (_y - y1) * (_y - y1);
                if (d0 < d1) {
                    return [x0, y0];
                } else {
                    return [x1, y1];
                }
            }
        } else if (_C.isInstanceType("line")) {
            var dxA = NDX,
                dyA = NDY,
                dxB = _C.getNDX(),
                dyB = _C.getNDY();
            var det = dxB * dyA - dxA * dyB;
            if (det !== 0) {
                var A = this.P1,
                    B = _C.P1;
                var num1 = dyA * A.getX() - dxA * A.getY();
                var num2 = dxB * B.getY() - dyB * B.getX();
                return [(dxB * num1 + dxA * num2) / det, (dyB * num1 + dyA * num2) / det];
            }
        } else if (_C.isInstanceType("quadric")) {
            var c = intersectLineQuadricXY(_C);
            var d0 = (_x - c[0]) * (_x - c[0]) + (_y - c[1]) * (_y - c[1]);
            var d1 = (_x - c[2]) * (_x - c[2]) + (_y - c[3]) * (_y - c[3]);
            if (d0 < d1) {
                return [c[0], c[1]];
            } else {
                return [c[2], c[3]];
            }
        }
    };




    this.projectXY = function(_x, _y) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var AB2 = DX * DX + DY * DY;
        var ABMA = DX * (xA - _x) + DY * (yA - _y);
        return [xA - (DX * ABMA) / AB2, yA - (DY * ABMA) / AB2];
    };

    this.project = function(p) {
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        p.setXY(xA + a * DX, yA + a * DY);
    };

    this.setAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xp = p.getX();
        var yp = p.getY();
        if (Math.abs(xA - xp) > 1e-12) {
            p.setAlpha((xp - xA) / DX);
        } else if (Math.abs(yA - yp) > 1e-12) {
            p.setAlpha((yp - yA) / DY);
        } else {
            p.setAlpha(0);
        }
    };



    var f1 = function(x) {
        return (x * x * x);
    };

    var sign = function(x) {
        if (x < 0)
            return -1;
        else
            return 1;
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb, _linear) {
        var f = null;
        if (_linear) {
            f = function(x) {
                return x;
            };
        } else {
            f = f1;
        }
        var aMax = Math.floor(_nb / 2),
            aMin = -aMax;
        var fmax = f(aMax);
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = aMin; i < aMax; i++) {
            var a = sign(i) * Math.abs(f(i) / fmax) * 1000;
            Ptab.push({
                "alpha": a,
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
        p.setXY(xA + a * NDX, yA + a * NDY);
    };





    this.compute = function() {
        var t = $U.computeBorderPoints(this.P1.getX(), this.P1.getY(), NDX, NDY, this.getWidth(), this.getHeight());
        xmin = t[0];
        ymin = t[1];
        xmax = t[2];
        ymax = t[3];
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(xmin, ymin);
        ctx.lineTo(xmax, ymax);
        ctx.stroke();
    };


    this.beginTrack = function() {
        var t = $U.computeBorderPoints(this.P1.getX(), this.P1.getY(), NDX, NDY, this.getWidth(), this.getHeight());
        lastxmin = t[0];
        lastymin = t[1];
        lastxmax = t[2];
        lastymax = t[3];
    };

    this.drawTrack = function(ctx) {
        if (!isNaN(xmin) && !isNaN(ymin) && !isNaN(xmax) && !isNaN(ymax)) {
            if ((xmin !== lastxmin) || (ymin != lastymin) || (xmax != lastxmax) || (ymax != lastymax)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';

                if (!isNaN(lastxmin) && !isNaN(lastymin) && !isNaN(lastxmax) && !isNaN(lastymax)) {
                    ctx.beginPath();
                    switch (this.getCode()) {
                        case "ray":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(xmax, ymax);
                            break;
                        case "segment":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(this.getP2().getX(), this.getP2().getY());
                            break;
                        default:
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(xmax, ymax);
                            break;
                    }

                    ctx.stroke();
                }
            }
        }
        lastxmin = xmin;
        lastymin = ymin;
        lastxmax = xmax;
        lastymax = ymax;
    };



    // Alpha, dans le repère coordsSystem de l'objet Construction.
    // (for CaRMetal .zir translation)
    this.transformAlpha = function(_alpha) {
        var x = this.getCn().coordsSystem.x(NDX) - this.getCn().coordsSystem.x(0);
        var y = this.getCn().coordsSystem.y(NDY) - this.getCn().coordsSystem.y(0);
        return _alpha * Math.sqrt(x * x + y * y);
    };


};
