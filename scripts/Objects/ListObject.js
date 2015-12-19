// Liste de points (reliés ou non) :
function ListObject(_construction, _name, _EXP) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var me = this;
    var Cn = _construction;
    var ORG3D = null;
    var pt3D = Cn.getInterpreter().getEX().EX_point3D; // Pour les points3D
    var EXP = _EXP; // Expression contenant la liste de points (ou points3D)
    var Ptab = []; // Tableau de points
    var initPtab = function() {
        var lst = EXP.getValue();
        Ptab.length = 0;
        if (!$U.isArray(lst))
            return;
        for (var i = 0, len = lst.length; i < len; i++) {
            if (!$U.isArray(lst[i])) {
                Ptab.length = 0;
                return;
            }
            if (lst[i].length === 2) {
                // Il s'agit d'un point 2D :
                var xx = Cn.coordsSystem.px(lst[i][0]);
                var yy = Cn.coordsSystem.py(lst[i][1]);
                Ptab.push({
                    x: xx,
                    y: yy
                });
            } else if (lst[i].length === 3) {
                // Il s'agit d'un point 3D :
                if (ORG3D === null) {
                    ORG3D = Cn.get3DOrigin(me);
                    if (ORG3D === null) {
                        // Aucune origine 3D n'est détectée (erreur) :
                        Ptab.length = 0;
                        return;
                    }
                }

                //                me.set3D(true);
                var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], lst[i]);
                var xx = Cn.coordsSystem.px(c2d[0]);
                var yy = Cn.coordsSystem.py(c2d[1]);
                Ptab.push({
                    x: xx,
                    y: yy
                });
            } else {
                // Sinon il y a erreur dans l'expression:
                Ptab.length = 0;
                return;
            }
        }
    };
    initPtab();
    var fillStyle = this.prefs.color.point_free;
    var segSize = -1; // Taille des segments
    var shape = 0; // Apparence des points

    this.getEXP = function() {
        return EXP;
    }

    this.setSegmentsSize = function(val) {
        segSize = val;
    };
    this.getSegmentsSize = function() {
        return segSize;
    };

    this.setParent(EXP);
    this.setDefaults("list");

    this.getAssociatedTools = function() {
        return "@callproperty,@calltrash,@callcalc,@calllist,point";
    };

    this.isInstanceType = function(_c) {
        return (_c === "list");
    };
    this.getCode = function() {
        return "list";
    };
    this.getFamilyCode = function() {
        return "list";
    };
    this.setShape = function(_shape) {
        shape = _shape;
        switch (shape) {
            case 0:
                paintPoint = paintCircle;
                break;
            case 1:
                paintPoint = paintCross;
                break;
            case 2:
                paintPoint = paintDiamond;
                break;
            case 3:
                paintPoint = paintSquare;
                break;
        }
    };
    this.getShape = function() {
        return shape;
    };



    this.projectXY = function(x, y) {
        var p = Ptab[0];
        var x1 = p.x,
            y1 = p.y;
        var count = 0;
        var xmin = x1,
            ymin = y1,
            dmin = 1e20,
            cmin = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            p = Ptab[i];
            var x2 = p.x,
                y2 = p.y;
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
                var dist2 = (x - xh) * (x - xh) + (y - yh) * (y - yh);
                if (dist2 < dmin) {
                    dmin = dist2;
                    xmin = xh;
                    ymin = yh;
                    cmin = count;

                }
            }
            count++;
            x1 = x2;
            y1 = y2;
        }
        return [xmin, ymin];
    };

    this.project = function(p) {
        //        console.log("project");
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };
    this.projectAlpha = function(p) {
        //        console.log("projectAlpha");
        if ((Ptab.length < 2) || (segSize === -1))
            return;
        var alp = p.getAlpha();
        var nb = alp[0];
        var k = alp[1];

        // S'il y a eu changement de nature du point sur, qui passe
        // d'un comportement continue à discret :
        if ((segSize === 0) && (k !== 0)) {
            this.setAlpha(p);
            alp = p.getAlpha();
            nb = alp[0];
            k = alp[1];
        }
        if (nb < 0)
            nb = 0;
        else if (nb > (Ptab.length - 1))
            nb = Ptab.length - 1;
        if (segSize > 0)
            p.setXY(Ptab[nb].x + k * (Ptab[nb + 1].x - Ptab[nb].x), Ptab[nb].y + k * (Ptab[nb + 1].y - Ptab[nb].y));
        else
            p.setXY(Ptab[nb].x, Ptab[nb].y);
    };
    this.setAlpha = function(p) {
        if (Ptab.length < 2)
            return;
        var dmin = 1e20,
            nb = 0,
            k = 0;
        if (segSize > 0) {
            for (var i = 1, len = Ptab.length; i < len; i++) {
                var am = (Ptab[i - 1].x - p.getX()) * (Ptab[i - 1].x - p.getX()) + (Ptab[i - 1].y - p.getY()) * (Ptab[i - 1].y - p.getY());
                var mb = (Ptab[i].x - p.getX()) * (Ptab[i].x - p.getX()) + (Ptab[i].y - p.getY()) * (Ptab[i].y - p.getY());
                var ab = (Ptab[i].x - Ptab[i - 1].x) * (Ptab[i].x - Ptab[i - 1].x) + (Ptab[i].y - Ptab[i - 1].y) * (Ptab[i].y - Ptab[i - 1].y);
                var epsilon = Math.abs(Math.sqrt(ab) - Math.sqrt(am) - Math.sqrt(mb));
                if (epsilon < dmin) {
                    dmin = epsilon;
                    nb = i - 1;
                    k = Math.sqrt(am / ab);
                }
                p.setAlpha([nb, k]);
            }
        } else {
            for (var i = 0, len = Ptab.length; i < len; i++) {
                var d2 = (Ptab[i].x - p.getX()) * (Ptab[i].x - p.getX()) + (Ptab[i].y - p.getY()) * (Ptab[i].y - p.getY());
                if (d2 < dmin) {
                    dmin = d2;
                    k = i;
                }
            }
            p.setAlpha([k, 0]);
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
        return PtsTab;
    };

    this.setLocusAlpha = function(p, a) {
        if (Ptab[a] !== undefined)
            p.setXY(Ptab[a].x, Ptab[a].y);
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        if (Ptab.length > 0) {
            if ($U.isNearToPoint(Ptab[0].x, Ptab[0].y, mx, my, this.getOversize()))
                return true;
            for (var i = 1, len = Ptab.length; i < len; i++) {
                if ($U.isNearToPoint(Ptab[i].x, Ptab[i].y, mx, my, this.getOversize()))
                    return true;
                if ((segSize > 0) &&
                    ($U.isNearToSegment(Ptab[i - 1].x, Ptab[i - 1].y, Ptab[i].x, Ptab[i].y, mx, my, this.getOversize())))
                    return true;
            }
        }
        return false;
    };


    this.compute = function() {
        initPtab();
    };

    var paintCircle = function(i, ctx) {
        ctx.arc(Ptab[i].x, Ptab[i].y, me.getRealsize(), 0, Math.PI * 2, true);
    };
    var paintCross = function(i, ctx) {
        var sz = me.getRealsize() * 0.9;
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y - sz);
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y + sz);
    };
    var paintSquare = function(i, ctx) {
        var sz = me.getRealsize() * 1.8;
        ctx.rect(Ptab[i].x - sz / 2, Ptab[i].y - sz / 2, sz, sz);
    };
    var paintDiamond = function(i, ctx) {
        var sz = me.getRealsize() * 1.3;
        ctx.moveTo(Ptab[i].x, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x - sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y - sz);
    };

    var paintPoint = paintCircle;


    this.paintObject = function(ctx) {

        if ((segSize > 0) && (Ptab.length > 0)) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            // dessin des segments :
            ctx.beginPath();
            ctx.lineWidth = segSize;
            ctx.moveTo(Ptab[0].x, Ptab[0].y);
            for (var i = 1, len = Ptab.length; i < len; i++) {
                if (isNaN(Ptab[i].x) || isNaN(Ptab[i].y)) {
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    i++
                    if (i < len)
                        ctx.moveTo(Ptab[i].x, Ptab[i].y);
                } else
                    ctx.lineTo(Ptab[i].x, Ptab[i].y);
            }
            ctx.fill();
            ctx.stroke();
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
        }

        // dessin des points :
        if (me.getOpacity() === 0)
            ctx.fillStyle = fillStyle;
        ctx.lineWidth = me.prefs.size.pointborder;
        for (var i = 0, len = Ptab.length; i < len; i++) {
            ctx.beginPath();
            paintPoint(i, ctx);
            ctx.fill();
            ctx.stroke();
        }
    };





    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "List", EXP.getVarName());
    };

}
