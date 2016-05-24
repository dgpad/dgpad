//************************************************
//********* CIRCLE 3 pts OBJECT ******************
//************************************************


function Circle3ptsObject_3D(_construction, _name, _P1, _P2, _P3) {
    var Cn = _construction;
    var M = new CenterObject(_construction, "_Center", this);
    _construction.add(M);

    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage

    var me = this;
    var A = _P1;
    var B = _P2;
    var C = _P3;
    var R = 0;
    this.setParent(A, B, C);
    M.setParent(this);

    var NB = 500;
    var Ptab = [];
    var phi = Cn.getInterpreter().getEX().EX_phi;
    var theta = Cn.getInterpreter().getEX().EX_theta;

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

    this.setDefaults("circle");

    this.getCode = function() {
        return "circle3pts3D";
    };
    this.getFamilyCode = function() {
        return "circle3pts3D";
    };
    this.isInstanceType = function(_c) {
        return (_c === "circle3pts3D");
    };
    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash";
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(R));
    };

    this.getP1 = function() {
        return M;
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if ($U.isNearToPoint(Ptab[i][0][0], Ptab[i][0][1], mx, my, this.getOversize()))
                return true;
        }
        return false;
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var inc = 5 * Math.round(anim.direction * (anim.speed * anim.delay / 1000));
        return [0, Ptab.length - 1, inc]
    };

    this.getAnimationSpeedTab = function() {
        return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;

        var xAB = (Ptab[0][0][0] - x0),
            yAB = (Ptab[0][0][1] - y0);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < Ptab.length; i++) {
            xAB = (Ptab[i][0][0] - x0);
            yAB = (Ptab[i][0][1] - y0);
            d1 = xAB * xAB + yAB * yAB;
            if ((d1 < d2) || isNaN(d2)) {
                k = i;
                d2 = d1;
            }
        }
        var xp = Ptab[k - 1][0][0];
        var yp = Ptab[k - 1][0][1];
        var ps = (xp - x0) * (x1 - x0) + (yp - y0) * (y1 - y0);
        var dir = (ps > 0) ? 1 : -1;
        // var dop = Math.sqrt((xp - x0) * (xp - x0) + (yp - y0) * (yp - y0));
        // var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        // var cs = ps / (dop * dom);
        // var aller_retour = (Math.abs(cs) < 0.707);
        var pcent = Math.round(100 * fce[f] / fce[fce.length - 1])+"%";

        return {
            message: pcent + "",
            speed: fce[f],
            direction: dir,
            ar: false
        }
    }

    // ****************************************
    // ****************************************


    this.projectXY = function(_x, _y) {
        var xAB = (Ptab[0][0][0] - _x),
            yAB = (Ptab[0][0][1] - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            xAB = (Ptab[i][0][0] - _x);
            yAB = (Ptab[i][0][1] - _y);
            d1 = xAB * xAB + yAB * yAB;
            if (d1 < d2) {
                k = i;
                d2 = d1;
            }
        }
        return k;
    };

    this.project = function(p) {
        var k = this.projectXY(p.getX(), p.getY());
        p.setXYZ(Ptab[k][1]);
    };

    this.projectAlpha = function(p) {
        if (Ptab.length > 0) {
            if (p.getAlpha() < Ptab.length)
                p.setXYZ(Ptab[p.getAlpha()][1]);
            else {
                p.setXYZ(Ptab[Ptab.length - 1][1]);
            }
        }

    };

    this.setAlpha = function(p) {
        p.setAlpha(this.projectXY(p.getX(), p.getY()));
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
        return false;
    };


    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0][0][0], Ptab[0][0][1]);
        for (var i = 1, len = Ptab.length; i < len; i++) {
            ctx.lineTo(Ptab[i][0][0], Ptab[i][0][1]);
        }
        ctx.lineTo(Ptab[0][0][0], Ptab[0][0][1]);
        ctx.stroke();
        ctx.fill();
    };


    this.compute = function() {
        var org = Cn.get3DOrigin(me);
        var orgX = Cn.coordsSystem.x(org.getX());
        var orgY = Cn.coordsSystem.y(org.getY());
        var fi = phi();
        var th = theta();
        var cfi = Cn.cos(fi),
            sfi = Cn.sin(fi);
        var cth = Cn.cos(th),
            sth = Cn.sin(th);

        var pt = function(_v) {
            return [orgX + _v[0] * (sfi) + _v[1] * (cfi), orgY + _v[0] * (-cfi * sth) + _v[1] * (sfi * sth) + _v[2] * (cth)];
        };
        var px = Cn.coordsSystem.px;
        var py = Cn.coordsSystem.py;

        var a = A.coords3D();
        var b = B.coords3D();
        var c = C.coords3D();
        var a2 = (c[0] - b[0]) * (c[0] - b[0]) + (c[1] - b[1]) * (c[1] - b[1]) + (c[2] - b[2]) * (c[2] - b[2]);
        var b2 = (c[0] - a[0]) * (c[0] - a[0]) + (c[1] - a[1]) * (c[1] - a[1]) + (c[2] - a[2]) * (c[2] - a[2]);
        var c2 = (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]);

        // Determination du centre :
        var alpha = a2 * (-a2 + b2 + c2);
        var beta = b2 * (a2 - b2 + c2);
        var gamma = c2 * (a2 + b2 - c2);
        var sum = alpha + beta + gamma;
        var t = [];
        t[0] = a[0] + (beta / sum) * (b[0] - a[0]) + (gamma / sum) * (c[0] - a[0]);
        t[1] = a[1] + (beta / sum) * (b[1] - a[1]) + (gamma / sum) * (c[1] - a[1]);
        t[2] = a[2] + (beta / sum) * (b[2] - a[2]) + (gamma / sum) * (c[2] - a[2]);
        M.setXYZ(t);

        // Determination des points du cercle par l'équation barycentrique
        // de ce cercle :
        var tab = [],
            tbc = [],
            tca = [];
        var step = 1 / NB;
        var k, x, y, z, inter, coef;
        for (var i = 0; i < NB; i++) {
            // Tracé de l'arc AB :
            k = i * step;
            inter = b2 * (1 - k) + a2 * k;
            coef = inter / (inter - c2 * k * (1 - k));
            x = c[0] + coef * (a[0] - c[0] + k * (b[0] - a[0]));
            y = c[1] + coef * (a[1] - c[1] + k * (b[1] - a[1]));
            z = c[2] + coef * (a[2] - c[2] + k * (b[2] - a[2]));
            c2d = pt([x, y, z]);
            tab.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);
            // Tracé de l'arc BC :
            inter = c2 * (1 - k) + b2 * k;
            coef = inter / (inter - a2 * k * (1 - k));
            x = a[0] + coef * (b[0] - a[0] + k * (c[0] - b[0]));
            y = a[1] + coef * (b[1] - a[1] + k * (c[1] - b[1]));
            z = a[2] + coef * (b[2] - a[2] + k * (c[2] - b[2]));
            c2d = pt([x, y, z]);
            tbc.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);
            // Tracé de l'arc CA :
            inter = a2 * (1 - k) + c2 * k;
            coef = inter / (inter - b2 * k * (1 - k));
            x = b[0] + coef * (c[0] - b[0] + k * (a[0] - c[0]));
            y = b[1] + coef * (c[1] - b[1] + k * (a[1] - c[1]));
            z = b[2] + coef * (c[2] - b[2] + k * (a[2] - c[2]));
            c2d = pt([x, y, z]);
            tca.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);

        }
        // Concaténation des trois arcs en un seul tableau.
        // Chaque élément de ce tableau est un tableau regroupant
        // les coordonnées 2d et 3d du point : [[x,y],[x3d,y3d,z3d]]
        Ptab = tab;
        Ptab = Ptab.concat(tbc);
        Ptab = Ptab.concat(tca);
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle3pts3D", _P1.getVarName(), _P2.getVarName(), _P3.getVarName());
    };


};
