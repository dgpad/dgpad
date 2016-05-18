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
    var arrow = null; // Flèches en bout de segments
    var colors = ["#ffffff", "#cccccc", "#c0c0c0", "#999999", "#666666", "#333333", "#000000", "#ffcccc", "#ff6666", "#ff0000", "#cc0000", "#990000", "#660000", "#330000", "#ffcc99", "#ff9966", "#ff9900", "#ff6600", "#cc6600", "#993300", "#663300", "#ffff99", "#ffff66", "#ffcc66", "#ffcc33", "#cc9933", "#996633", "#663333", "#ffffcc", "#ffff33", "#ffff00", "#ffcc00", "#999900", "#666600", "#333300", "#99ff99", "#66ff99", "#33ff33", "#33cc00", "#009900", "#006600", "#003300", "#99ffff", "#33ffff", "#66cccc", "#00cccc", "#339999", "#336666", "#003333", "#ccffff", "#66ffff", "#33ccff", "#3366ff", "#3333ff", "#000099", "#000066", "#ccccff", "#9999ff", "#6666cc", "#6633ff", "#6600cc", "#333399", "#330099", "#ffccff", "#ff99ff", "#cc66cc", "#cc33cc", "#993399", "#663366", "#330033"];

    me.setArrow = function(_t) {
        arrow = (_t && (_t.length === 2) && (_t[0]) && (_t[1])) ? _t : null;
    }
    me.getArrow = function() {
        return arrow;
    }

    // me.setArrow(16,5);


    var initPtab = function() {
        // var lst = EXP.getValue();
        var lst = EXP.getE1().forcevalue();
        //         console.log(lst[0]);
        // console.log("initPtab : " + me.getName() + "  " + lst.length);
        Ptab.length = 0;

        var rr = me.getColor().getR();
        var gg = me.getColor().getG();
        var bb = me.getColor().getB();
        var ss = segSize;
        var ps = me.getRealsize();
        var cn = 54;
        // var points = 0;
        var oldColStop = 0;

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
                // points++;
                Ptab.push({
                    x: xx,
                    y: yy,
                    r: rr,
                    g: gg,
                    b: bb,
                    rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                    sz: ss, // segment size
                    pz: ps // point size
                });
            } else if (lst[i].length === 3) {
                if (isNaN(lst[i][0]) && isNaN(lst[i][1]) && isNaN(lst[i][2])) {
                    Ptab.push({
                        x: NaN,
                        y: NaN,
                        r: rr,
                        g: gg,
                        b: bb,
                        rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                        sz: ss, // segment size
                        pz: ps // point size
                    });
                } else {
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
                    // points++;
                    Ptab.push({
                        x: xx,
                        y: yy,
                        r: rr,
                        g: gg,
                        b: bb,
                        rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                        sz: ss, // segment size
                        pz: ps // point size
                    });
                }

            } else if (lst[i].length === 4) {
                if (lst[i][0] === 0) {
                    // Un élément [0,r,g,b] signale un breakpoint de dégradé de couleur :
                    // console.log("*********** : Ptab.length=" + Ptab.length + "  oldColStop=" + oldColStop);
                    if (Ptab.length > oldColStop) {
                        var iR = (lst[i][1] - rr) / (Ptab.length - oldColStop);
                        var iG = (lst[i][2] - gg) / (Ptab.length - oldColStop);
                        var iB = (lst[i][3] - bb) / (Ptab.length - oldColStop);
                        for (var j = oldColStop + 1; j < Ptab.length; j++) {
                            var k = j - oldColStop;
                            var nr = Math.round(rr + k * iR);
                            var ng = Math.round(gg + k * iG);
                            var nb = Math.round(bb + k * iB);
                            Ptab[j].r = nr;
                            Ptab[j].g = ng;
                            Ptab[j].b = nb;
                            Ptab[j].rgb = "rgb(" + nr + "," + ng + "," + nb + ")";
                        }
                    }
                    rr = lst[i][1];
                    gg = lst[i][2];
                    bb = lst[i][3];
                    oldColStop = Ptab.length;
                } else if (lst[i][0] === 1) {
                    // Un élément [1,r,g,b] signale un breakpoint de changement de couleur :
                    // console.log("*********** : Ptab.length=" + Ptab.length + "  oldColStop=" + oldColStop);
                    rr = lst[i][1];
                    gg = lst[i][2];
                    bb = lst[i][3];
                } else if (lst[i][0] === 2) {
                    // Un élément [2,0,0,n] signale un breakpoint de changement de couleur
                    // numéroté n dans la palette 7x10
                    cn = (lst[i][3] - 1) % 70; // La couleur tortue commence à 1 et non pas à 0
                    var _rgb = $U.hexToRGB(colors[cn]);
                    rr = _rgb.r;
                    gg = _rgb.g;
                    bb = _rgb.b;
                } else if (lst[i][0] === 3) {
                    // Un élément [3,0,0,i] signale un incrément de couleur
                    // (cn+i) dans la palette 7x10
                    cn = (cn + lst[i][3]) % 70;
                    var _rgb = $U.hexToRGB(colors[cn]);
                    rr = _rgb.r;
                    gg = _rgb.g;
                    bb = _rgb.b;
                } else if (lst[i][0] === 4) {
                    // Un élément [4,0,0,op] signale l'ordre de remplir avec une opacité de op%
                    Ptab[Ptab.length - 1].fill = lst[i][3] / 100;

                } else if (lst[i][0] === 10) {
                    // Un élément [10,0,0,sz] signale un breakpoint de taille de crayon :
                    ss = lst[i][3];
                } else if (lst[i][0] === 11) {
                    // Un élément [11,0,0,inc] signale un incrément de taille de crayon :
                    ss += lst[i][3];
                } else if (lst[i][0] === 12) {
                    // Un élément [10,0,0,sz] signale un breakpoint de taille de crayon :
                    ps = lst[i][3];
                } else if (lst[i][0] === 13) {
                    // Un élément [11,0,0,inc] signale un incrément de taille de crayon :
                    ps += lst[i][3];
                }
            } else {
                // Sinon il y a erreur dans l'expression:
                Ptab.length = 0;
                return;
            }
        }
        // console.log("*********");
        // for (var i = 0; i < Ptab.length; i++) {
        //     console.log("Ptab[" + i + "].r=" + Ptab[i].r);
        //     console.log("Ptab[" + i + "].g=" + Ptab[i].g);
        //     console.log("Ptab[" + i + "].b=" + Ptab[i].b);
        // }
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
        // console.log("Ptab="+Ptab);
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
        // console.log("projectAlpha :" + Ptab[nb].x + "  " + Ptab[nb].y);
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
        ctx.arc(Ptab[i].x, Ptab[i].y, Ptab[i].pz, 0, Math.PI * 2, true);
        // ctx.arc(Ptab[i].x, Ptab[i].y, me.getRealsize(), 0, Math.PI * 2, true);
    };
    var paintCross = function(i, ctx) {
        var sz = Ptab[i].pz * 0.9;
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y - sz);
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y + sz);
    };
    var paintSquare = function(i, ctx) {
        var sz = Ptab[i].pz * 1.8;
        ctx.rect(Ptab[i].x - sz / 2, Ptab[i].y - sz / 2, sz, sz);
    };
    var paintDiamond = function(i, ctx) {
        var sz = Ptab[i].pz * 1.3;
        ctx.moveTo(Ptab[i].x, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x - sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y - sz);
    };
    var paintArrow = function(x1, y1, x2, y2, ctx) {
        var rot = -Math.atan2(x2 - x1, y2 - y1);
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.translate(x2, y2);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrow[1], -arrow[0]);
        ctx.lineTo(arrow[1], -arrow[0]);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    var paintPoint = paintCircle;


    this.paintObject = function(ctx) {
        var hilite = (ctx.strokeStyle === this.prefs.color.hilite);
        if ((segSize > 0) && (Ptab.length > 0)) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // remplissage des polygones :
            ctx.beginPath();
            ctx.lineWidth = segSize;
            ctx.moveTo(Ptab[0].x, Ptab[0].y);
            for (var aa = 1, len = Ptab.length; aa < len; aa++) {
                var p = Ptab[aa];
                if (isNaN(p.x) || isNaN(p.y) || (p.fill)) {
                    if (p.fill) {
                        ctx.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + "," + p.fill + ")";
                        ctx.lineTo(p.x, p.y);
                        // console.log("******break******");
                        // console.log("aa=" + aa+";lineto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                        // console.log("*****************");
                        aa--
                    }
                    ctx.fill();
                    ctx.beginPath();
                    aa++
                    if (aa < len)
                        ctx.moveTo(p.x, p.y);
                    // console.log("aa=" + aa+";moveto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                } else {
                    ctx.lineTo(p.x, p.y);
                    // console.log("aa=" + aa+";lineto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                }
            }
            ctx.fill();
            ctx.beginPath();
            ctx.lineWidth = segSize;
            if (hilite) {
                for (var i = 1, len = Ptab.length; i < len; i++) {
                    if (isNaN(Ptab[i].x) || isNaN(Ptab[i].y)) {
                        i++
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(Ptab[i - 1].x, Ptab[i - 1].y);
                        ctx.lineTo(Ptab[i].x, Ptab[i].y);
                        ctx.stroke();
                    }
                }
            } else {
                for (var i = 1, len = Ptab.length; i < len; i++) {
                    if (isNaN(Ptab[i].x) || isNaN(Ptab[i].y)) {
                        i++
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(Ptab[i - 1].x, Ptab[i - 1].y);
                        ctx.strokeStyle = Ptab[i - 1].rgb;
                        ctx.lineWidth = Ptab[i - 1].sz;
                        ctx.lineTo(Ptab[i].x, Ptab[i].y);
                        ctx.stroke();
                        if (arrow) paintArrow(Ptab[i - 1].x, Ptab[i - 1].y, Ptab[i].x, Ptab[i].y, ctx);
                    }
                }
            }
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
        }

        // dessin des points :
        var opaque = (me.getOpacity() > 0);
        if (!opaque) ctx.fillStyle = fillStyle;
        ctx.lineWidth = me.prefs.size.pointborder;
        if (hilite) {
            for (var i = 0, len = Ptab.length; i < len; i++) {
                ctx.beginPath();
                paintPoint(i, ctx);
                ctx.fill();
                ctx.stroke();
            }
        } else {
            if (opaque) {
                var glob_alpha = ctx.globalAlpha;
                for (var i = 0, len = Ptab.length; i < len; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = Ptab[i].rgb;
                    ctx.fillStyle = Ptab[i].rgb;
                    ctx.globalAlpha = me.getOpacity();
                    paintPoint(i, ctx);
                    ctx.fill();
                    ctx.globalAlpha = glob_alpha;
                    ctx.stroke();
                }
            } else {
                for (var i = 0, len = Ptab.length; i < len; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = Ptab[i].rgb;
                    paintPoint(i, ctx);
                    ctx.fill();
                    ctx.stroke();
                }
            }

        }

    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "List", EXP.getVarName());
    };

}
