//************************************************
//***************** AREA OBJECT ******************
//************************************************
function AreaObject(_construction, _name, _Ptab) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var Cn = _construction;
    var Ptab = [];
    this.setParent();
    //    this.setOpacity(0.2);
    this.setDefaults("area");
    this.blocks.setMode(["onmousedown", "ondrag", "onmouseup"], "ondrag");
    var valid = true;
    var X = NaN,
        Y = NaN; // Coordonnées du barycentre (utilisées pour l'aire)
    var A = NaN;
    var onBounds = false;
    for (var i = 0, len = _Ptab.length; i < len - 1; i++) {
        this.addParent(_Ptab[i]);
        Ptab.push(_Ptab[i]);
    }

    this.redefine = function(_old, _new) {
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if (_old === Ptab[i]) {
                this.addParent(_new);
                Ptab[i] = _new;
                return;
            }
        }
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("area")) {
            // Si l'autre objet est aussi un polygone :
            return true;
        }
        return false;
    };
    this.isInstanceType = function(_c) {
        return (_c === "area");
    };
    this.getFamilyCode = function() {
        return "area";
    };
    this.getCode = function() {
        return "area";
    };
    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc,@depends,@blockly";
    };
    this.barycenter = function() {
        var len = Ptab.length;
        var xg = 0,
            yg = 0;
        for (var i = 0; i < len; i++) {
            xg += Ptab[i].getX();
            yg += Ptab[i].getY();
        }
        return [Cn.coordsSystem.x(xg / len), Cn.coordsSystem.y(yg / len)];
    };
    this.barycenter3D = function() {
        var len = Ptab.length;
        var xg = 0,
            yg = 0,
            zg = 0;
        for (var i = 0; i < len; i++) {
            var t = Ptab[i].coords3D();
            xg += t[0];
            yg += t[1];
            zg += t[2];
        }
        return [xg / len, yg / len, zg / len];
    };
    // Seulement pour les macros :
    var getMacroFunc = function(nme, vn, i) {
        return function(src) {
            src.geomWrite(false, nme, "DefinitionPoint", vn, i);
        };
    };
    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        for (var i = 0, len = Ptab.length; i < len; i++) {
            var Pt = Ptab[i];
            Pt.setMacroMode(1);
            var nme = Pt.getName();
            Pt.setMacroSource(getMacroFunc(Pt.getName(), vn, i));
        }
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        var fl = false;
        for (var i = 0; i < Ptab.length; i++) {
            fl = fl || Ptab[i].Flag;
        }
        return fl;
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        return Ptab[_i];
    }

    var isInside = function(poly, x, y) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].getY() <= y && y < poly[j].getY()) || (poly[j].getY() <= y && y < poly[i].getY())) && (x < (poly[j].getX() - poly[i].getX()) * (y - poly[i].getY()) / (poly[j].getY() - poly[i].getY()) + poly[i].getX()) && (c = !c);
        return c;
    };
    this.mouseInside = function(ev) {
        if (!valid)
            return false;
        if (this.getOpacity()) {
            return isInside(Ptab, this.mouseX(ev), this.mouseY(ev));
        }
        for (var i = 0, len = Ptab.length - 1, x = this.mouseX(ev), y = this.mouseY(ev), ov = this.getOversize(); i < len; i++) {
            if ($U.isNearToSegment(Ptab[i].getX(), Ptab[i].getY(), Ptab[i + 1].getX(), Ptab[i + 1].getY(), x, y, ov))
                return true;
        }
        return $U.isNearToSegment(Ptab[0].getX(), Ptab[0].getY(), Ptab[i].getX(), Ptab[i].getY(), x, y, ov);
    };
    this.dragObject = function(_x, _y) {
        //        console.log("dragTo !");
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        var len = Ptab.length;
        for (var i = 0; i < len; i++) {
            Ptab[i].setXY(Ptab[i].getX() + vx, Ptab[i].getY() + vy);
        }
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        Cn.computeChilds(Ptab);
    };

    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    // Renvoie les caractéristiques du côté contenant
    // un point donné :
    var getEdge = function(_xp, _yp) {
        var xp = _xp,
            yp = _yp;
        var x0 = Ptab[0].getX(),
            y0 = Ptab[0].getY();
        var x1 = Ptab[1].getX(),
            y1 = Ptab[1].getY();
        var hmin = 0;
        var AM = Math.sqrt((x0 - xp) * (x0 - xp) + (y0 - yp) * (y0 - yp));
        var MB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
        var AB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        var nMB = MB;
        var nMA, nAB;
        for (var i = 2, len = Ptab.length; i < len; i++) {
            x0 = x1;
            y0 = y1;
            x1 = Ptab[i].getX();
            y1 = Ptab[i].getY();
            nAM = nMB;
            nMB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
            nAB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
            if ((nAM + nMB - nAB) < (AM + MB - AB)) {
                hmin = i - 1;
                AM = nAM;
                MB = nMB;
                AB = nAB;
            }
        }
        x0 = x1;
        y0 = y1;
        x1 = Ptab[0].getX();
        y1 = Ptab[0].getY();
        nAM = nMB;
        nMB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
        nAB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        if ((nAM + nMB - nAB) < (AM + MB - AB)) {
            hmin = i - 1;
            AM = nAM;
            MB = nMB;
            AB = nAB;
        }
        var hmax = (hmin === Ptab.length - 1) ? 0 : hmin + 1;
        return {
            "min": hmin,
            "max": hmax,
            "AM": AM,
            "MB": MB,
            "AB": AB
        };
    };

    this.getAlphaBounds = function(anim, _p) {
        if (Ptab.length > 1) {
            if (!anim.hasOwnProperty("min")) {
                // Recherche du segment contenant le point :
                var c = getEdge(_p.getX(), _p.getY());
                anim.min = c.min;
                anim.max = c.max;
                anim.AM = c.AM;
                anim.AB = c.AB;
            }
            var inc =
                anim.direction * (anim.speed * anim.delay / 1000);
            anim.AM += inc;
            if (anim.AM > anim.AB) {
                anim.AM = anim.AM - anim.AB;
                anim.min = anim.max;
                anim.max = (anim.min === Ptab.length - 1) ? 0 : anim.min + 1;
                anim.AB = $U.d(Ptab[anim.min], Ptab[anim.max]);
            } else if (anim.AM < 0) {
                anim.max = anim.min;
                anim.min = (anim.max === 0) ? Ptab.length - 1 : anim.max - 1;
                anim.AB = $U.d(Ptab[anim.min], Ptab[anim.max]);
                anim.AM = anim.AB + anim.AM;
            }
            var x = Ptab[anim.min].getX() + (anim.AM / anim.AB) * (Ptab[anim.max].getX() - Ptab[anim.min].getX());
            var y = Ptab[anim.min].getY() + (anim.AM / anim.AB) * (Ptab[anim.max].getY() - Ptab[anim.min].getY());
            _p.setXY(x, y);
            this.setAlpha(_p);
        };
        return null;
    };

    this.getAnimationSpeedTab = function() {
        return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000,1500];
    };

    this.getAnimationParams = function(x0, y0, mx, my) {
        var d = Math.sqrt((mx - x0) * (mx - x0) + (my - y0) * (my - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;
        var c = getEdge(x0, y0);
        var xp = Ptab[c.min].getX();
        var yp = Ptab[c.min].getY();
        var ps = (xp - x0) * (mx - x0) + (yp - y0) * (my - y0);
        var dir = (ps > 0) ? 1 : -1;
        var px = fce[f] + " px/s";
        return {
            message: px + "",
            speed: fce[f],
            direction: dir,
            ar: false
        }
    }

    // ****************************************
    // ****************************************

    this.setBoundaryMode = function(_P) {
        var c = this.projectXY(_P.getX(), _P.getY());
        var d = (_P.getX() - c[0]) * (_P.getX() - c[0]) + (_P.getY() - c[1]) * (_P.getY() - c[1]);
        _P.setOnBoundary(d < 50);
    };


    var contains = function(x, y) {
        var npoints = Ptab.length;
        if (npoints <= 2) {
            return false;
        }
        var hits = 0;
        var lastx = Ptab[npoints - 1].getX(),
            lasty = Ptab[npoints - 1].getY();
        var curx = 0,
            cury = 0;
        var test1, test2, leftx;
        for (var i = 0; i < npoints; lastx = curx, lasty = cury, i++) {
            var p = Ptab[i];
            curx = p.getX();
            cury = p.getY();
            if (cury === lasty) {
                continue;
            }
            if (curx < lastx) {
                if (x >= lastx) {
                    continue;
                }
                leftx = curx;
            } else {
                if (x >= curx) {
                    continue;
                }
                leftx = lastx;
            }

            if (cury < lasty) {
                if (y < cury || y >= lasty) {
                    continue;
                }
                if (x < leftx) {
                    hits++;
                    continue;
                }
                test1 = x - curx;
                test2 = y - cury;
            } else {
                if (y < lasty || y >= cury) {
                    continue;
                }
                if (x < leftx) {
                    hits++;
                    continue;
                }
                test1 = x - lastx;
                test2 = y - lasty;
            }

            if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
                hits++;
            }
        }

        return ((hits & 1) !== 0);
    };


    this.projectXY = function(x, y) {
        var p = Ptab[0];
        var x1 = p.getX(),
            y1 = p.getY();
        var xstart = x1,
            ystart = y1;
        var count = 0;
        var xmin = x1,
            ymin = y1,
            dmin = 1e20,
            hmin = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            p = Ptab[i];
            var x2 = p.getX(),
                y2 = p.getY();
            var dx = x2 - x1,
                dy = y2 - y1;
            var r = dx * dx + dy * dy;
            if (r > 1e-5) {
                var h = dx * (x - x1) / r + dy * (y - y1) / r;
                if (h > 1) {
                    h = 1;
                } else if (h < 0) {
                    h = 0;
                }
                var xh = x1 + h * dx,
                    yh = y1 + h * dy;
                var dist = Math.sqrt((x - xh) * (x - xh) + (y - yh) * (y - yh));
                if (dist < dmin) {
                    dmin = dist;
                    xmin = xh;
                    ymin = yh;
                    hmin = count + h;
                }
            }
            count++;
            x1 = x2;
            y1 = y2;
        }

        var x2 = xstart,
            y2 = ystart;
        var dx = x2 - x1,
            dy = y2 - y1;
        var r = dx * dx + dy * dy;
        if (r > 1e-5) {
            var h = dx * (x - x1) / r + dy * (y - y1) / r;
            if (h > 1) {
                h = 1;
            } else if (h < 0) {
                h = 0;
            }
            var xh = x1 + h * dx,
                yh = y1 + h * dy;
            var dist = Math.sqrt((x - xh) * (x - xh) + (y - yh) * (y - yh));
            if (dist < dmin) {
                dmin = dist;
                xmin = xh;
                ymin = yh;
                hmin = count + h;
            }
        }
        return [xmin, ymin];
    };

    this.project = function(p) {
        var px = p.getX(),
            py = p.getY();
        if ((p.getOnBoundary()) || (!contains(px, py))) {
            var coords = this.projectXY(px, py);
            p.setXY(coords[0], coords[1]);
        }
    };
    this.projectAlpha = function(p) {
        var G = p.getAlpha();
        if (Ptab.length > 2) {
            var xa = Ptab[0].getX(),
                ya = Ptab[0].getY();
            var xb = Ptab[1].getX(),
                yb = Ptab[1].getY();
            var xc = Ptab[2].getX(),
                yc = Ptab[2].getY();
            var xm = xa + G[0] * (xb - xa) + G[1] * (xc - xa);
            var ym = ya + G[0] * (yb - ya) + G[1] * (yc - ya);
            p.setXY(xm, ym);
            this.project(p);
            if ((p.getX() !== xm) || (p.getY() !== ym)) {
                this.setAlpha(p);
            }
        }
    };
    this.setAlpha = function(p) {
        if (Ptab.length > 2) {
            var xAB = Ptab[1].getX() - Ptab[0].getX();
            var xAC = Ptab[2].getX() - Ptab[0].getX();
            var xAM = p.getX() - Ptab[0].getX();
            var yAB = Ptab[1].getY() - Ptab[0].getY();
            var yAC = Ptab[2].getY() - Ptab[0].getY();
            var yAM = p.getY() - Ptab[0].getY();
            var det = xAB * yAC - yAB * xAC;
            if (det !== 0) {
                p.setAlpha([(xAM * yAC - xAC * yAM) / det, (xAB * yAM - xAM * yAB) / det]);
            }
        }
    };


    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var PtsTab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < Ptab.length; i++) {
            PtsTab.push({
                "alpha": i,
                "x": 0,
                "y": 0,
                "x1": 0,
                "y1": 0,
                "r": 0
            });
        }
        PtsTab.push({
            "alpha": i,
            "x": 0,
            "y": 0,
            "x1": 0,
            "y1": 0,
            "r": 0
        });
        return PtsTab;
    };

    this.setLocusAlpha = function(p, a) {
        if (a < Ptab.length)
            p.setXY(Ptab[a].getX(), Ptab[a].getY());
        else if (a === Ptab.length)
            p.setXY(Ptab[0].getX(), Ptab[0].getY());
    };


    this.getValue = function() {
        return (A);
    };
    this.compute = function() {
        X = 0;
        Y = 0;
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if (isNaN(Ptab[i].getX())) {
                valid = false;
                X = NaN;
                Y = NaN;
                return;
            }
            X += Ptab[i].getX();
            Y += Ptab[i].getY();
        }
        X = X / Ptab.length;
        Y = Y / Ptab.length;
        // Calcul de l'aire :
        var sum = 0;
        var len = Ptab.length;
        for (var i = 1; i < len; i++) {
            sum += (Ptab[i].getX() - X) * (Ptab[i - 1].getY() - Y) - (Ptab[i].getY() - Y) * (Ptab[i - 1].getX() - X);
        }
        sum += (Ptab[0].getX() - X) * (Ptab[len - 1].getY() - Y) - (Ptab[0].getY() - Y) * (Ptab[len - 1].getX() - X);
        A = this.getCn().coordsSystem.a(Math.abs(sum / 2));
        valid = true;
    };
    this.paintLength = function(ctx) {
        ctx.textAlign = "center";
        ctx.fillStyle = ctx.strokeStyle;
        var prec = this.getPrecision();
        var display = Math.round(A * prec) / prec;
        ctx.fillText($L.number(display), X, Y);
        ctx.restore();
    };
    this.paintObject = function(ctx) {
        if (valid) {
            ctx.beginPath();
            var len = Ptab.length;
            ctx.moveTo(Ptab[0].getX(), Ptab[0].getY());
            for (var i = 1; i < len; i++) {
                ctx.lineTo(Ptab[i].getX(), Ptab[i].getY());
            }
            ctx.lineTo(Ptab[0].getX(), Ptab[0].getY());
            ctx.closePath();
            ctx.fill();
            //        if (this.getSize() > 0.5) ctx.stroke();
            if ((this.getSize() > 0.5) || (this.isIndicated()))
                ctx.stroke();
        }
    };
    this.getSource = function(src) {
        var len = Ptab.length;
        var pts = [];
        for (var i = 0; i < len; i++) {
            pts.push("_" + Ptab[i].getVarName());
        }
        src.geomWrite(true, this.getName(), "Polygon", pts.join(","));
    };
};
