//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function QuadricObject(_construction, _name, _P1, _P2, _P3, _P4, _P5) {
    $U.extend(this, new ConstructionObject(_construction, _name));
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var Cn = _construction;
    // Récupération de l'objet Math situé dans le scope de la fenêtre de l'interpréteur
    // pour le calcul sur les complexes :
    var MTH = Cn.getInterpreter().getMath();
    var P = [_P1, _P2, _P3, _P4, _P5];
    var X = [0, 0, 0, 0, 0, 0]; // Coefficient de l'équation de la conique
    this.setParent(_P1, _P2, _P3, _P4, _P5);

    var NB = 500;
    var Ptab = []; // Tableau de tableaux représentant les parties connexes de la conique
    var PtabRow = []; // Tous les points de la conique
    var MIN, MAX, STEP;

    var FOCI = [];

    this.getCoeffs = function() {
        return X;
    };
    this.setDefaults("quadric");

    this.getCode = function() {
        return "quadric";
    };
    this.getFamilyCode = function() {
        return "quadric";
    };
    this.isInstanceType = function(_c) {
        return (_c === "quadric");
    };

    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc";
    };

    this.getPrecision = function() {
        return NB;
    };
    this.getRealPrecision = function() {
        return NB;
    };
    this.setPrecision = function(_prec) {
        _prec = parseInt(_prec);
        NB = (_prec === 0) ? 1000 : _prec; // Compatibilité avec les anciens lieux
    };

    this.setPrecision(500);

    // Seulement pour les macros :
    var getMacroFunc = function(nme, vn, i) {
        return function(src) {
            src.geomWrite(false, nme, "DefinitionPoint", vn, i);
        };
    };
    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        for (var i = 0, len = P.length; i < len; i++) {
            var Pt = P[i];
            Pt.setMacroMode(1);
            Pt.setMacroSource(getMacroFunc(Pt.getVarName(), vn, i));
        }
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        var fl = false;
        for (var i = 0; i < P.length; i++) {
            fl = fl || P[i].Flag;
        }
        return fl;
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        return P[_i];
    }

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0, len = PtabRow.length; i < len; i++) {
            if ($U.isNearToPoint(PtabRow[i].x, PtabRow[i].y, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };

    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((_P1.getParentLength() === 0) && (_P2.getParentLength() === 0) &&
            (_P3.getParentLength() === 0) && (_P4.getParentLength() === 0) &&
            (_P5.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        _P1.setXY(_P1.getX() + vx, _P1.getY() + vy);
        _P2.setXY(_P2.getX() + vx, _P2.getY() + vy);
        _P3.setXY(_P3.getX() + vx, _P3.getY() + vy);
        _P4.setXY(_P4.getX() + vx, _P4.getY() + vy);
        _P5.setXY(_P5.getX() + vx, _P5.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        Cn.computeChilds(P);
    };



    var intersectQuadricQuadricXY = function(TAB) {
        // pour ax^2 + bxy + cy^2 + dx + ey + f = 0
        var a0 = X[0],
            b0 = X[4],
            c0 = X[1],
            d0 = X[2],
            e0 = X[3],
            f0 = X[5];
        var a1 = TAB[0],
            b1 = TAB[4],
            c1 = TAB[1],
            d1 = TAB[2],
            e1 = TAB[3],
            f1 = TAB[5];
        // Si les deux coniques sont homothétiques (cas courant en 3D) :
        if ((Math.abs(a0 / a1 - c0 / c1) < 1e-10)) {
            d1 = d1 * (a0 / a1) - d0;
            e1 = e1 * (a0 / a1) - e0;
            f1 = f1 * (a0 / a1) - f0;

            var c01 = (c0 * d1 * d1 - b0 * d1 * e1 + a0 * e1 * e1);
            var c02 = (e1 * e1 * f0 - e0 * e1 * f1 + c0 * f1 * f1);
            var c03 = (-d1 * e0 * e1 + d0 * e1 * e1 + 2 * c0 * d1 * f1 - b0 * e1 * f1);
            var c04 = (c03 * c03 - 4 * c01 * c02);
            var c05 = d1 * e0 * e1 - d0 * e1 * e1 - 2 * c0 * d1 * f1 + b0 * e1 * f1;
            var c06 = (2 * c01);

            var x0 = (c05 - Math.sqrt(c04)) / c06;
            var x1 = (c05 + Math.sqrt(c04)) / c06;
            var y0 = (-f1 - d1 * x0) / e1;
            var y1 = (-f1 - d1 * x1) / e1;

            return [
                [x0, y0],
                [x1, y1],
                [NaN, NaN],
                [NaN, NaN]
            ];
        }

        var k1 = -a1 * b0 * b1 * c0 + a0 * b1 * b1 * c0 + a1 * a1 * c0 * c0 + a1 * b0 * b0 * c1 - a0 * b0 * b1 * c1 - 2 * a0 * a1 * c0 * c1 + a0 * a0 * c1 * c1;
        var k2 = b1 * b1 * c0 * d0 - b0 * b1 * c1 * d0 - 2 * a1 * c0 * c1 * d0 + 2 * a0 * c1 * c1 * d0 - b0 * b1 * c0 * d1 + 2 * a1 * c0 * c0 * d1 + b0 * b0 * c1 * d1 - 2 * a0 * c0 * c1 * d1 - a1 * b1 * c0 * e0 + 2 * a1 * b0 * c1 * e0 - a0 * b1 * c1 * e0 - a1 * b0 * c0 * e1 + 2 * a0 * b1 * c0 * e1 - a0 * b0 * c1 * e1;
        var k3 = c1 * c1 * d0 * d0 - 2 * c0 * c1 * d0 * d1 + c0 * c0 * d1 * d1 - b1 * c1 * d0 * e0 - b1 * c0 * d1 * e0 + 2 * b0 * c1 * d1 * e0 + a1 * c1 * e0 * e0 + 2 * b1 * c0 * d0 * e1 - b0 * c1 * d0 * e1 - b0 * c0 * d1 * e1 - a1 * c0 * e0 * e1 - a0 * c1 * e0 * e1 + a0 * c0 * e1 * e1 + b1 * b1 * c0 * f0 - b0 * b1 * c1 * f0 - 2 * a1 * c0 * c1 * f0 + 2 * a0 * c1 * c1 * f0 - b0 * b1 * c0 * f1 + 2 * a1 * c0 * c0 * f1 + b0 * b0 * c1 * f1 - 2 * a0 * c0 * c1 * f1;
        var k4 = c1 * d1 * e0 * e0 - c1 * d0 * e0 * e1 - c0 * d1 * e0 * e1 + c0 * d0 * e1 * e1 + 2 * c1 * c1 * d0 * f0 - 2 * c0 * c1 * d1 * f0 - b1 * c1 * e0 * f0 + 2 * b1 * c0 * e1 * f0 - b0 * c1 * e1 * f0 - 2 * c0 * c1 * d0 * f1 + 2 * c0 * c0 * d1 * f1 - b1 * c0 * e0 * f1 + 2 * b0 * c1 * e0 * f1 - b0 * c0 * e1 * f1;
        var k5 = -c1 * e0 * e1 * f0 + c0 * e1 * e1 * f0 + c1 * c1 * f0 * f0 + c1 * e0 * e0 * f1 - c0 * e0 * e1 * f1 - 2 * c0 * c1 * f0 * f1 + c0 * c0 * f1 * f1;
        var u1 = k2 / (4 * k1);
        var u2 = (k2 * k2) / (4 * k1 * k1) - 2 * k3 / (3 * k1);
        var u3 = (k2 * k2) / (2 * k1 * k1) - 4 * k3 / (3 * k1);
        var u4 = (-k2 * k2 * k2) / (k1 * k1 * k1) + (4 * k2 * k3) / (k1 * k1) - (8 * k4) / k1;
        var p1 = k3 * k3 - 3 * k2 * k4 + 12 * k1 * k5;
        var p2 = 2 * k3 * k3 * k3 - 9 * k2 * k3 * k4 + 27 * k1 * k4 * k4 + 27 * k2 * k2 * k5 - 72 * k1 * k3 * k5;

        var q1 = MTH.csqrt([-4 * p1 * p1 * p1 + p2 * p2, 0]);
        q1 = MTH.plus(q1[0], [p2, 0]);
        q1 = MTH.power(q1, 1 / 3);
        q1 = q1[0];

        var cub2 = Math.pow(2, 1 / 3);

        var r1 = MTH.quotient([cub2 * p1, 0], MTH.times([3 * k1, 0], q1));
        r1 = MTH.plus(r1, MTH.quotient(q1, [3 * cub2 * k1, 0]));

        var sa = MTH.plus([u2, 0], r1);
        sa = MTH.quotient(MTH.csqrt(sa)[0], 2);

        var sb = MTH.minus([u3, 0], r1);
        sb = MTH.minus(sb, MTH.quotient([u4, 0], MTH.times(8, sa)));
        sb = MTH.quotient(MTH.csqrt(sb)[0], 2);

        var sc = MTH.minus([u3, 0], r1);
        sc = MTH.plus(sc, MTH.quotient([u4, 0], MTH.times(8, sa)));
        sc = MTH.quotient(MTH.csqrt(sc)[0], 2);

        var XX = [];
        var cu1 = [-u1, 0];

        XX[0] = MTH.minus(cu1, sa);
        XX[0] = MTH.minus(XX[0], sb);

        XX[1] = MTH.minus(cu1, sa);
        XX[1] = MTH.plus(XX[1], sb);

        XX[2] = MTH.plus(cu1, sa);
        XX[2] = MTH.minus(XX[2], sc);

        XX[3] = MTH.plus(cu1, sa);
        XX[3] = MTH.plus(XX[3], sc);

        var points = [];
        var A = c0,
            B, C, AA = c1,
            BB, CC;
        for (var i = 0; i < 4; i++) {
            if (Math.abs(XX[i][1]) > 1e-5) {
                // Un complexe rencontré, ie une intersection non existante :
                points.push([NaN, NaN]);
            } else {
                B = b0 * XX[i][0] + e0;
                C = a0 * XX[i][0] * XX[i][0] + d0 * XX[i][0] + f0;
                BB = b1 * XX[i][0] + e1;
                CC = a1 * XX[i][0] * XX[i][0] + d1 * XX[i][0] + f1;

                var denom = A * BB - B * AA;
                if (Math.abs(denom) < 1E-20) {
                    points.push([NaN, NaN]);
                } else {
                    var y = (C * AA - A * CC) / denom; //formule de Dominique Tournès
                    points.push([XX[i][0], y]);
                }
            }
        }
        return (points);
    }


    // Pour le preview dans PointConstructor :
    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("quadric")) {
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            var p = _x,
                q = _y;
            var dmin = NaN;
            var pos = 0;
            for (var i = 0; i < Pts.length; i++) {
                var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
                if ((isNaN(dmin)) || (dd < dmin)) {
                    dmin = dd;
                    pos = i;
                }
            }
            return [Pts[pos][0], Pts[pos][1]];
        }
    }


    // Actualisation de la position pour le compute du point :
    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("quadric")) {
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            _P.setXY(Pts[_P.getOrder()][0], Pts[_P.getOrder()][1]);
        }
    };

    // Pour la création de l'objet dans PointConstructor :
    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("quadric")) {
            //            console.log("_C.getCoeffs()=" + _C.getCoeffs());
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            var p = _P.getX(),
                q = _P.getY();
            var dmin = NaN;
            var pos = 0;
            for (var i = 0; i < Pts.length; i++) {
                //                console.log("i=" + i + "  Pts[i][0]=" + Pts[i][0]);
                var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
                if ((isNaN(dmin)) || (dd < dmin)) {
                    dmin = dd;
                    pos = i;
                }
            }

            _P.setOrder(pos);
            _P.setXY(Pts[pos][0], Pts[pos][1]);
        }
    }

    this.projectXY = function(p, q) {
        // Le système à résoudre pour trouver le projeté d'un point
        // sur une conique se ramène à la recherche de l'intersection
        // de deux coniques :
        var Pts = intersectQuadricQuadricXY([X[4] / 2, -X[4] / 2, X[3] / 2 - p * X[4] / 2 + X[0] * q, X[4] / 2 * q - p * X[1] - X[2] / 2, X[1] - X[0], X[2] / 2 * q - p * X[3] / 2]);
        var dmin = NaN;
        var pos = 0;
        for (var i = 0; i < Pts.length; i++) {
            var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
            if ((isNaN(dmin)) || (dd < dmin)) {
                dmin = dd;
                pos = i;
            }

        }
        return Pts[pos];
    }

    // Ancienne méthode laissée là pour comparaison 
    this.projectXY2 = function(_x, _y) {
        var xAB = (PtabRow[0].x - _x),
            yAB = (PtabRow[0].y - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1, len = PtabRow.length; i < len; i++) {
            xAB = (PtabRow[i].x - _x);
            yAB = (PtabRow[i].y - _y);
            d1 = xAB * xAB + yAB * yAB;
            if (d1 < d2) {
                k = i;
                d2 = d1;
            }
        }
        return [PtabRow[k].x, PtabRow[k].y];
    };

    this.project = function(p) {
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var G = p.getAlpha();
        if (($U.isArray(G)) && (G.length === 2)) {
            var AA = P[0];
            var BB = P[1];
            var CC = P[2];
            var xa = AA.getX(),
                ya = AA.getY();
            var xb = BB.getX(),
                yb = BB.getY();
            var xc = CC.getX(),
                yc = CC.getY();
            var xm = xa + G[0] * (xb - xa) + G[1] * (xc - xa);
            var ym = ya + G[0] * (yb - ya) + G[1] * (yc - ya);
            p.setXY(xm, ym);
            this.project(p);
            //            if ((p.getX() !== xm) || (p.getY() !== ym)) {
            //                this.setAlpha(p);
            //            }
        } else {
            // Compatibilité avec les "anciennes" figures :
            if (PtabRow.length === 0)
                return;
            var k = p.getAlpha();
            if (k < 0)
                k = 0;
            if (k > (PtabRow.length - 1))
                k = PtabRow.length - 1;
            p.setXY(PtabRow[k].x, PtabRow[k].y);
            this.setAlpha(p);
        }
    };

    this.setAlpha = function(p) {
        var AA = P[0];
        var BB = P[1];
        var CC = P[2];
        var a = BB.getX() - AA.getX();
        var b = CC.getX() - AA.getX();
        var c = p.getX() - AA.getX();
        var d = BB.getY() - AA.getY();
        var e = CC.getY() - AA.getY();
        var f = p.getY() - AA.getY();
        var det = a * e - d * b;
        if (det !== 0) {
            p.setAlpha([(c * e - b * f) / det, (a * f - c * d) / det]);
        }
    };


    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var step = 1;
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < NB; i++) {
            Ptab.push({
                "alpha": i,
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
        if (PtabRow[a] !== undefined)
            p.setXY(PtabRow[a].x, PtabRow[a].y);
    };

    this.center = function() {
        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        //        var a = X[0], b = X[4] / 2, c = X[1], d = X[2] / 2, e = X[3] / 2, f = X[5];
        //        var det = a * c - b * b;
        //        var x0 = (b * e - c * d) / det;
        //        var y0 = (b * d - a * e) / det;
        //        x0 = Cn.coordsSystem.x(x0);
        //        y0 = Cn.coordsSystem.y(y0);
        //        return [x0, y0];
        var M = MTH.quotient(MTH.plus(FOCI[0], FOCI[1]), 2);
        return Cn.coordsSystem.xy(M);
    };

    this.foci = function() {
        //        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        //        var a = X[0], b = X[4] / 2, c = X[1], d = X[2] / 2, e = X[3] / 2, f = X[5];
        //        var A = [b * b - a * c, 0];
        //        var B = [c * d - b * e, a * e - b * d];
        //        var C = [e * e - d * d + f * (a - c), 2 * (b * f - d * e)];
        //
        ////         Résolution de l'équation complexe Az^2+2Bz+C=0 :
        ////         Racine du discriminant réduit :
        //        var SQ = MTH.csqrt(MTH.minus(MTH.times(B, B), MTH.times(A, C)))[0];
        //        var z1 = MTH.quotient(MTH.plus(B, SQ), A);
        //        var z2 = MTH.quotient(MTH.minus(B, SQ), A);
        //        return [Cn.coordsSystem.xy(z1), Cn.coordsSystem.xy(z2)];
        return [Cn.coordsSystem.xy(FOCI[0]), Cn.coordsSystem.xy(FOCI[1])];
    };

    //    this.projectAlpha = function(p) {
    //        if (PtabRow.length===0) return;
    //        var k = p.getAlpha();
    //        if (k < 0) k = 0;
    //        if (k > (PtabRow.length - 1)) k = PtabRow.length - 1;
    //        p.setXY(PtabRow[k].x, PtabRow[k].y);
    //    };
    //
    //    this.setAlpha = function(p) {
    //        var xAB = 0, yAB = 0;
    //        for (var i = 0, len = PtabRow.length; i < len; i++) {
    //            xAB = (PtabRow[i].x - p.getX()), yAB = (PtabRow[i].y - p.getY());
    //            if ((xAB === 0) && (yAB === 0)) {
    //                p.setAlpha(i);
    //                return;
    //            }
    //        }
    //    };

    this.paintObject = function(ctx) {
        for (var i = 0, len1 = Ptab.length; i < len1; i++) {
            var tab = Ptab[i];
            ctx.beginPath();
            ctx.moveTo(tab[0].x, tab[0].y);
            for (var k = 0, len2 = tab.length; k < len2; k++) {
                ctx.lineTo(tab[k].x, tab[k].y);
            }
            ctx.stroke();
            ctx.fill();
        }
    };



    var computeMinMaxStep = function() {
        MIN = -1;
        MAX = Cn.getBounds().width + 2;
        STEP = (MAX - MIN) / NB;
    };

    var computeUpper = function() {
        var y = NaN;
        var tab = [];
        for (var x = MIN; x < MAX; x += STEP) {
            if (Math.abs(X[1]) > 1e-13) {
                var p = (X[3] + x * X[4]) / X[1],
                    q = (X[0] * x * x + X[2] * x + X[5]) / X[1];
                var h = p * p / 4 - q;
                y = -p / 2 - Math.sqrt(h);
            } else {
                y = NaN;
            }
            if (isNaN(y)) {
                if (tab.length > 0) {
                    Ptab.push(tab);
                    tab = [];
                }
            } else
                tab.push({
                    x: x,
                    y: y
                });
        }
        if (tab.length > 0)
            Ptab.push(tab);
    };

    var computeLower = function() {
        var y = NaN;
        var tab = [];
        for (var x = MIN; x < MAX; x += STEP) {
            if (Math.abs(X[1]) > 1e-13) {
                var p = (X[3] + x * X[4]) / X[1],
                    q = (X[0] * x * x + X[2] * x + X[5]) / X[1];
                var h = p * p / 4 - q;
                y = -p / 2 + Math.sqrt(h);
            } else {
                y = -(X[0] * x * x + X[2] * x + X[5]) / (X[3] + X[4] * x);
            }
            if (isNaN(y)) {
                if (tab.length > 0) {
                    Ptab.push(tab);
                    tab = [];
                }
            } else
                tab.push({
                    x: x,
                    y: y
                });
        }
        if (tab.length > 0)
            Ptab.push(tab);
    };


    var analysePartiesConnexes = function() {
        var dis = X[4] * X[4] - 4 * X[0] * X[1];
        if (dis < 0) {
            // Il s'agit d'une ellipse (b2-4ac<0) :
            if (Ptab.length === 2) {
                Ptab[0] = Ptab[0].concat(Ptab[1].reverse());
                Ptab[0].push({
                    x: Ptab[0][0].x,
                    y: Ptab[0][0].y
                });
                Ptab.splice(1, 1);
            }
        } else {
            // Il s'agit d'une hyperbole (ou parabole) :
            if (Ptab.length === 4) {
                Ptab[0] = Ptab[0].concat(Ptab[2].reverse());
                Ptab[1].reverse();
                Ptab[1] = Ptab[1].concat(Ptab[3]);
                Ptab.splice(2, 2);
            }
        }

    }


    this.compute = function() {
        var x01 = P[1].getX() - P[0].getX(),
            y01 = P[1].getY() - P[0].getY();
        var x02 = P[2].getX() - P[0].getX(),
            y02 = P[2].getY() - P[0].getY();
        var x03 = P[3].getX() - P[0].getX(),
            y03 = P[3].getY() - P[0].getY();
        var x04 = P[4].getX() - P[0].getX(),
            y04 = P[4].getY() - P[0].getY();
        // Test très grossier (rapidité) pour le cas ou les trois
        // premiers points sont alignés, on fait comme si les 5 l'étaient
        // et on affiche un segment (pour la 3D) :
        if ((Math.abs(x01 * y02 - x02 * y01) < 1e-10) || (Math.abs(x01 * y03 - x03 * y01) < 1e-10) || (Math.abs(x01 * y04 - x04 * y01) < 1e-10)) {
            var x0 = Math.min(P[0].getX(), P[1].getX(), P[2].getX(), P[3].getX(), P[4].getX());
            var y0 = Math.max(P[0].getY(), P[1].getY(), P[2].getY(), P[3].getY(), P[4].getY());
            var x1 = Math.max(P[0].getX(), P[1].getX(), P[2].getX(), P[3].getX(), P[4].getX());
            var y1 = Math.min(P[0].getY(), P[1].getY(), P[2].getY(), P[3].getY(), P[4].getY());
            Ptab = [];
            PtabRow = [];
            var tab = [];
            tab.push({
                x: x0,
                y: y0
            });
            tab.push({
                x: x1,
                y: y1
            });
            Ptab.push(tab);
            return;
        }
        var A = [];
        for (var i = 0; i < 5; i++) {
            var x = P[i].getX(),
                y = P[i].getY();
            A[i] = [x * x, y * y, x, y, x * y, 1];
            var sum = 0;
            for (var j = 0; j < 6; j++) {
                sum += A[i][j] * A[i][j];
            }
            sum = Math.sqrt(sum);
            for (var j = 0; j < 6; j++) {
                A[i][j] /= sum;
            }
        }
        var r = 0;
        var colindex = [];
        for (var c = 0; c < 6; c++) {
            if (r >= 5) {
                colindex[c] = -1;
                continue;
            }
            var max = Math.abs(A[r][c]);
            var imax = r;
            for (var i = r + 1; i < 5; i++) {
                var h = Math.abs(A[i][c]);
                if (h > max) {
                    max = h;
                    imax = i;
                }
            }
            if (max > 1e-13) {
                if (imax != r) {
                    var h = A[imax];
                    A[imax] = A[r];
                    A[r] = h;
                }
                for (var i = r + 1; i < 5; i++) {
                    var lambda = A[i][c] / A[r][c];
                    for (var j = c + 1; j < 6; j++) {
                        A[i][j] -= lambda * A[r][j];
                    }
                }
                colindex[c] = r;
                r++;
            } else {
                colindex[c] = -1;
            }
        }

        for (var j = 5; j >= 0; j--) {
            if (colindex[j] < 0) {
                X[j] = 1;
            } else {
                var h = 0;
                var i = colindex[j];
                for (var k = j + 1; k < 6; k++) {
                    h += A[i][k] * X[k];
                }
                X[j] = -h / A[i][j];
            }
        }
        var sum = 0;
        for (var i = 0; i <= 5; i++) {
            sum += Math.abs(X[i]);
        }
        //        if (sum<1e-10) {
        //            Valid=false;
        //        }
        for (var i = 0; i <= 5; i++) {
            X[i] /= sum;
            // Ce qui suit ressemble à un gag, pourtant il semble que l'epsilon au lieu de 0 en coeffs permet
            // de surmonter les effets de bord dans des cas particuliers (ex. hyperbole equilatère/parabole)
            // sans pour autant porter atteinte à la précision des coordonnées des points d'intersections
            // qui restent fiables à 1e-12, soit la précision maximale affichée du logiciel :
            //            X[i]=n(X[i]);
        }

        // Calcul des coordonnées des foyers de la conique (double pour parabole) :

        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        var a = X[0],
            b = X[4] / 2,
            c = X[1],
            d = X[2] / 2,
            e = X[3] / 2,
            f = X[5];
        var A = [b * b - a * c, 0];
        var B = [c * d - b * e, a * e - b * d];
        var C = [e * e - d * d + f * (a - c), 2 * (b * f - d * e)];

        if (Math.abs(A[0]) < 1e-20) {
            // Il s'agit d'une parabole, résolution de -2Bz+C=0 :
            var z0 = MTH.quotient(C, MTH.times(2, B));
            FOCI = [z0, z0];
        } else {
            // Il s'agit d'une ellipse ou d'une hyperbole.
            // Résolution de l'équation complexe Az^2-2Bz+C=0 :
            // Racine du discriminant réduit :
            var SQ = MTH.csqrt(MTH.minus(MTH.times(B, B), MTH.times(A, C)))[0];
            var z1 = MTH.quotient(MTH.plus(B, SQ), A);
            var z2 = MTH.quotient(MTH.minus(B, SQ), A);
            FOCI = [z1, z2];
        }


        //        var a = X[0], b = X[4], c = X[1], d = X[2], e = X[3], f = X[5];
        //        console.log("det="+((a*c-b*b/4)*f+b*e*d/4-c*d*d/4-a*e*e/4));

        //        console.log(" X[0]=" + X[0] + " X[1]=" + X[1] + " X[2]=" + X[2] + " X[3]=" + X[3] + " X[4]=" + X[4] + " X[5]=" + X[5]);

        computeMinMaxStep();
        Ptab = [];
        computeUpper();
        computeLower();
        analysePartiesConnexes();
        PtabRow = [];
        // Regroupement en un seul tableau de toutes les parties connexes
        // de la conique :
        for (var i = 0; i < Ptab.length; i++) {
            PtabRow = PtabRow.concat(Ptab[i]);
        }

        //        console.log("x0="+X[0]+" x1="+X[1]+" x2="+X[2]+" x3="+X[3]+" x4="+X[4]+" x5="+X[5]);
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Quadric", P[0].getVarName(), P[1].getVarName(), P[2].getVarName(), P[3].getVarName(), P[4].getVarName());
    };



}
