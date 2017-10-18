//************************************************
//*************** POINT OBJECT *******************
//************************************************
function PointObject(_construction, _name, _x, _y) {
    var parent = $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage


    var Cn = _construction;
    var me = this;
    var shape = 0; // 0 for circle, 1 for cross,
    var X = _x,
        Y = _y;
    var X_old = 0,
        ORG3D = null;
    var X3D = NaN,
        Y3D = NaN,
        Z3D = NaN;
    var X3D_OLD = NaN,
        Y3D_OLD = NaN,
        Z3D_OLD = NaN;
    var pt3D = Cn.getInterpreter().getEX().EX_point3D;

    var EXY = null;

    var lastX = _x,
        lastY = _y; // For TrackObject;
    var order = 0; // order, only for Intersection points 
    var inc = 0; // increment
    var macrosource = null;
    var away = null;
    var fillStyle = this.prefs.color.point_free;
    var aTXT, cosTXT, sinTXT; // angle donnant la position du nom autour du point
    var isStr = $U.isStr;
    var isArray = $U.isArray;




    var currentMagnet = null; // Pour gérer les changements de magnétisme : utilise pour
    // les traces d'objets.

    this.blocks.setMode(["onlogo", "onmousedown", "ondrag", "onmouseup", "oncompute"], "ondrag");

    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    this.isAnimationPossible = function() {
        return ((this.getParentLength() === 1) && (this.getParentAt(0).getAlphaBounds));
    }

    this.getAnimationSpeedTab = function() {
        return this.getParentAt(0).getAnimationSpeedTab();
    }

    this.getAnimationParams = function(mx, my) {
        return this.getParentAt(0).getAnimationParams(X, Y, mx, my);
    }

    this.incrementAlpha = function(anim) {
        var v = anim.speed;
        var s = anim.direction;
        var ar = anim.ar;
        var d = new Date();
        anim.delay = d.getTime() - anim.timestamp;
        anim.timestamp = d.getTime();
        // b[0] et b[1] indiquent l'intervalle Alpha
        // b[2] indique l'incrément
        var b = me.getParentAt(0).getAlphaBounds(anim, me);
        // console.log(b[2]);
        if (b) {
            Alpha += b[2];
            if (Alpha < b[0]) {
                if (ar) {
                    anim.direction *= -1;
                    Alpha = 2 * b[0] - Alpha;
                } else {
                    Alpha = b[1] + Alpha - b[0];
                }
            }
            if (Alpha > b[1]) {
                if (ar) {
                    anim.direction *= -1;
                    Alpha = 2 * b[1] - Alpha;
                } else {
                    Alpha = b[0] + Alpha - b[1];
                }
            }
            if (Alpha < b[0]) Alpha = b[0];
            if (Alpha > b[1]) Alpha = b[1];
        }
        me.blocks.evaluate("ondrag");
    };

    // ****************************************
    // ****************************************


    this.getValue = function() {

        if (EXY)
            return EXY.value();
        if (Cn.is3D()) {
            //            if (me === ORG3D)
            if (Cn.isOrigin3D(me))
                return [0, 0, 0];
            else if (me.is3D())
                return me.coords3D();
            //            else return me.coords3D();
        }
        return [me.getCn().coordsSystem.x(X), me.getCn().coordsSystem.y(Y)];
    };


    this.isMoveable = function() {
        return (this.getParentLength() < 2);
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("point")) {
            // Si les points sont confondus :
            if ($U.approximatelyEqual(X, _C.getX()) && $U.approximatelyEqual(Y, _C.getY())) {
                return true;
            }
        }
        return false;
    };

    this.setNamePosition = function(_a) {
        aTXT = _a;
        cosTXT = Math.cos(_a);
        sinTXT = Math.sin(_a);
    };

    this.getNamePosition = function() {
        return aTXT;
    };

    this.setNamePosition(0);


    this.setAway = function(_P) {
        away = _P;
    };

    this.getAway = function() {
        return away;
    };

    this.setFillStyle = function() {
        var len = this.getParentLength();
        switch (len) {
            case 0:
                // Point libre :
                fillStyle = this.prefs.color.point_free;
                break;
            case 1:
                // Point sur objet :
                fillStyle = this.prefs.color.point_on;
                break;
            case 2:
                // Point d'intersection :
                fillStyle = this.prefs.color.point_inter;
                break;
        }
    }

    this.forceFillStyle = function(_fs) {
        fillStyle = this.prefs.color.point_inter;
    };

    this.setMacroSource = function(_p) {
        macrosource = _p;
    };
    this.execMacroSource = function(_src) {
        if (!macrosource)
            return false;
        macrosource(_src);
        return true;
    };

    this.getAssociatedTools = function() {
        var at = "@namemover,@callproperty,@calltrash,segment,line,ray,midpoint,symc,perpbis,anglebiss,vector,BR,circle,circle1,circle3,circle3pts,arc3pts,area,angle,fixedangle";
        if (this.isMoveable())
            at += ",@objectmover";
        if (this.getParentLength() === 0)
            at += ",@anchor";
        else
            at += ",@noanchor";
        if ((this.getEXY()) || ((this.getParentLength() === 0) && (!this.getFloat())))
            at += ",@callcalc";
        at += ",@blockly";
        if (this.isMoveable()) {
            at += ",@pushpin";
            at += ",@magnet";
        }
        if (this.isAnimationPossible())
            at += ",@spring";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        return at;
    };

    this.setIncrement = function(_i) {
        if (this.getParentLength() < 2) {
            inc = _i;
            this.computeIncrement(X, Y);
        }
    };
    this.getIncrement = function() {
        return inc;
    };

    this.computeIncrement = function(_x, _y) {
        if (inc) {
            var x = this.getCn().coordsSystem.x(_x);
            var y = this.getCn().coordsSystem.y(_y);
            x = inc * Math.round(x / inc);
            y = inc * Math.round(y / inc);
            x = this.getCn().coordsSystem.px(x);
            y = this.getCn().coordsSystem.py(y);
            this.setXY(x, y);
        } else {
            this.setXY(_x, _y);
        }
    };

    this.isInstanceType = function(_c) {
        return (_c === "point");
    };
    this.getCode = function() {
        return "point";
    };
    this.getFamilyCode = function() {
        return "point";
    };


    this.setShape = function(_shape) {
        shape = _shape;
        switch (shape) {
            case 0:
                paintProc = paintCircle;
                break;
            case 1:
                paintProc = paintCross;
                break;
            case 2:
                paintProc = paintDiamond;
                break;
            case 3:
                paintProc = paintSquare;
                break;
        }
    };
    this.getShape = function() {
        return shape;
    };

    this.isPointOn = function() {
        return (this.getParentLength() === 1);
    };


    this.setOrder = function(_n) {
        order = _n;
    };
    this.getOrder = function() {
        return order;
    };

    // Alpha represents relative coord for point on object M :
    // For lines by two points, and segments, it's P1M= Alpha x P1P2
    // For lines by one point (parallel, perpendicular), it's PM= Alpha x U (U=unit vector of line)
    // For Circle, it's a radian in [0;2π[
    var Alpha = 0;
    this.setAlpha = function(_a) {
        // console.log("Alpha="+_a);
        Alpha = _a;
    };
    this.getAlpha = function() {
        // console.log(Alpha);
        return Alpha;
    };

    // Pour la redéfinition d'objet (par exemple Point libre/Point sur) :
    this.attachTo = function(_o) {
        this.setParentList(_o.getParent());
        this.setXY(_o.getX(), _o.getY());
        var childs = _o.getChildList();
        for (var i = 0, len = childs.length; i < len; i++) {
            childs[i].redefine(_o, this);
        }
        Cn.remove(_o);
        this.setFillStyle();
        Cn.reconstructChilds();
        this.computeChilds();
    };
    this.deleteAlpha = function() {
        var parents = this.getParent();
        this.setXY(this.getX() + 25, this.getY() - 25);
        for (var i = 0, len = parents.length; i < len; i++) {
            parents[i].deleteChild(this);
        }
        this.setParent();
        this.setFillStyle();
        Cn.reconstructChilds();
        this.computeChilds();
    };

    this.getX = function() {
        return X;
    };
    this.getY = function() {
        return Y;
    };

    this.setXY = function(x, y) {
        X = x;
        Y = y;
    };

    this.setxy = function(x, y) {
        X = Cn.coordsSystem.px(x);
        Y = Cn.coordsSystem.py(y);
    };
    this.getx = function() {
        return Cn.coordsSystem.x(X);
    };
    this.gety = function() {
        return Cn.coordsSystem.y(Y);
    };

    // Seulement pour les points magnétiques :
    this.projectMagnetAlpha = function(p) {};
    this.setMagnetAlpha = function(p) {};

    /*************************************
     ************************************* 
     ***********  3D part  ***************
     *************************************
     *************************************/

    this.setXYZ = function(_coords) {
        X3D = _coords[0];
        Y3D = _coords[1];
        Z3D = _coords[2];
        if (ORG3D === null) {
            ORG3D = Cn.get3DOrigin(me);
        }
        var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], _coords);
        X = Cn.coordsSystem.px(c2d[0]);
        Y = Cn.coordsSystem.py(c2d[1]);
    }

    this.getXYZ = function() {
        return [X3D, Y3D, Z3D];
    };

    // Abscisse sauvegardée par le 1er tour
    // de compute, correspondant à phi=phi+delta :
    this.storeX = function() {
        X_old = X;
    };

    this.getOldcoords = function() {
        return [X3D_OLD, Y3D_OLD, Z3D_OLD];
    };

    this.coords3D = function() {
        if (!isNaN(X3D))
            return [X3D_OLD = X3D, Y3D_OLD = Y3D, Z3D_OLD = Z3D];
        if (ORG3D === null) {
            ORG3D = Cn.get3DOrigin(me);
            if (ORG3D === null)
                return [NaN, NaN, NaN];
        }
        var phi = Cn.getPhi();
        var theta = Cn.getTheta();
        var stheta = Cn.sin(theta);
        var ctheta = Cn.cos(theta);
        var sphi = Cn.sin(phi[0]),
            sphid = Cn.sin(phi[1]);
        var cphi = Cn.cos(phi[0]),
            cphid = Cn.cos(phi[1]);
        var dis = sphi * cphid - sphid * cphi;
        var xO = ORG3D.getX();
        X3D_OLD = ((X_old - xO) * cphid - (X - xO) * cphi) / dis;
        Y3D_OLD = (sphi * (X - xO) - sphid * (X_old - xO)) / dis;
        Z3D_OLD = (X3D_OLD * cphid * stheta - Y3D_OLD * sphid * stheta + ORG3D.getY() - Y) / ctheta;
        X3D_OLD = Cn.coordsSystem.l(X3D_OLD);
        Y3D_OLD = Cn.coordsSystem.l(Y3D_OLD);
        Z3D_OLD = Cn.coordsSystem.l(Z3D_OLD);
        return [X3D_OLD, Y3D_OLD, Z3D_OLD];
    };

    this.coords2D = function() {
        return [Cn.coordsSystem.x(this.getX()), Cn.coordsSystem.y(this.getY())];
    };




    this.getEXY = function() {
        return EXY;
    };

    // Pour Blockly :
    parent.setExpression = this.setExpression = function(exy) {
        var elt;
        try {
            elt = JSON.parse(exy);
        } catch (e) {
            elt = exy;
        }
        if ((elt.constructor === Array) && (elt.length === 2)) {
            me.setExp(Cn.coordsSystem.px(elt[0]), Cn.coordsSystem.py(elt[1]));
        } else {
            me.setExp(exy);
        }
    }
    parent.getExpression = this.getExpression = function() {
        return me.getExp();
    }

    // exy est soit une formule (string), soit un nombre. S'il s'agit
    // d'un nombre, c'est l'abscisse et le second param
    // est l'ordonnée. S'il s'agit d'une formule, et s'il y a un second
    // param, celui-ci est un booléen qui indique s'il s'agit ou non d'un point 3D.
    // S'il n'y a pas de second param, le logiciel détermine s'il s'agit d'un
    // point 2d ou 3d.
    // setExp pour les widgets  :
    this.setExp = this.setEXY = function(exy, ey) {
        // console.log(exy);
        if (isStr(exy)) {
            // Si ex et ey sont des expressions :
            me.setParent();
            EXY = Expression.delete(EXY);
            EXY = new Expression(me, exy);
            fillStyle = me.prefs.color.point_fixed;
            me.isMoveable = function() {
                return false;
            };
            me.setXY = function(_x, _y) {};
            me.compute = computeFixed;
            me.getSource = getSourceFixed;

            var t = EXY.value();
            me.set3D((isArray(t)) && (t.length === 3));

        } else {
            // Si ex et ey sont des nombres :
            EXY = Expression.delete(EXY);
            X = exy;
            Y = ey;
            fillStyle = me.prefs.color.point_free;
            me.isMoveable = function() {
                return true;
            };
            me.setXY = function(x, y) {
                X = x;
                Y = y;
            };
            me.compute = computeGeom;
            me.getSource = getSourceGeom;
            me.setParent()
        }
    };

    this.getExp = function() {
        if ((this.getEXY) && (this.getEXY()) && this.getEXY().getSource && this.getEXY().getSource()) {
            return this.getEXY().getSource();
        } else {
            return "";
        }
    };

    this.near = function(_x, _y) {
        return ((Math.abs(X - _x) < 1E-10) && (Math.abs(Y - _y) < 1E-10));
    }

    this.dragObject = function(_x, _y) {
        this.computeIncrement(_x, _y);
        if (this.getParentLength() === 1) {
            this.getParentAt(0).project(this);
            this.getParentAt(0).setAlpha(this);
            return;
        }
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };



    var magnetsSortFilter = function(a, b) {
        var ap = a[0].isInstanceType("point");
        var bp = b[0].isInstanceType("point");
        if (ap && bp)
            return (a[1] - b[1]);
        else if (ap)
            return -1;
        else if (bp)
            return 1;
        else
            return (a[1] - b[1]);
    }

    this.computeMagnets = function() {
        var mgObj = null;
        var t = this.getMagnets();
        if (t.length === 0)
            return;
        var reps = [];
        for (var i = 0; i < t.length; i++) {
            var c = t[i][0].projectXY(X, Y);
            var pt = new VirtualPointObject(c[0], c[1]);
            t[i][0].setMagnetAlpha(pt);
            t[i][0].projectMagnetAlpha(pt);
            c[0] = pt.getX();
            c[1] = pt.getY();
            var d2 = (c[0] - X) * (c[0] - X) + (c[1] - Y) * (c[1] - Y);
            // Si la distance entre le projeté et le point
            // de coordonnées (_x,_y) est inférieure au rayon d'attaction :
            if (d2 < t[i][1] * t[i][1])
                reps.push([t[i][0], d2, c[0], c[1]]);
        }
        if (reps.length > 0) {
            reps.sort(magnetsSortFilter);
            mgObj = reps[0][0];
            this.setXY(reps[0][2], reps[0][3]);
            //            reps[0][0].setAlpha(this);
            //            reps[0][0].projectAlpha(this);
            this.computeChilds();
        }
        if (currentMagnet != mgObj) {
            currentMagnet = mgObj;
            lastX = X;
            lastY = Y;
            for (var i = 0, len = this.getChildLength(); i < len; i++) {
                this.getChildAt(i).beginTrack();
            }
        }
    };

    this.checkMagnets = function() {
        if (this.getMagnets().length) {
            this.computeMagnets();
            //            this.dragObject(X, Y);
            if (this.getParentLength() === 1) {
                this.getParentAt(0).project(this);
                this.getParentAt(0).setAlpha(this);
            }
        }
    }

    this.projectXY = function(_x, _y) {
        return [X, Y];
    };

    this.mouseInside = function(ev) {
        if (isNaN(X + Y))
            return false;
        if (((Math.abs(this.mouseX(ev) - X) < this.getOversize())) && (Math.abs(this.mouseY(ev) - Y) < this.getOversize())) {
            return true;
        }
        return false;
    };

    var computeGeom = function() {
        //        console.log(this.getName()+" len="+this.getParentLength());
        //        this.computeMagnets();
        //console.log(this.getName()+" : ");
        var len = this.getParentLength();
        if (len === 0)
            return;
        if (len === 1) {
            // This is a point on object :
            this.getParentAt(0).projectAlpha(this);
        } else if (len === 2) {
            // This is an intersection point :
            this.getParentAt(0).intersect(this.getParentAt(1), this);
            this.getParentAt(0).checkIfValid(this);
            this.getParentAt(1).checkIfValid(this);
        }
    };


    var computeFixed = function() {
        EXY.compute();
        var t = EXY.value();
        // console.log(this.getParent());
               // if (this.getName()==="M") console.log("t="+t);
        if (isArray(t)) {
            // S'il s'agit d'un point 3D :
            if (t.length === 3) {
                if (ORG3D === null) {
                    ORG3D = Cn.get3DOrigin(me);
                }
                X3D = t[0];
                Y3D = t[1];
                Z3D = t[2];
                var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], t);
                X = Cn.coordsSystem.px(c2d[0]);
                Y = Cn.coordsSystem.py(c2d[1]);
            } else {
                // Sinon on est en 2D :
                X3D = NaN;
                Y3D = NaN;
                Z3D = NaN;
                X = Cn.coordsSystem.px(t[0]);
                Y = Cn.coordsSystem.py(t[1]);
            }
        } else {
            X = NaN;
            Y = NaN;
        }
    };

    this.compute = computeGeom;

    this.refreshNames = function() {
        if (EXY)
            EXY.refreshNames();
    };


    var paintTxt = function(ctx, txt) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";

        var sz = 2 * me.getRealsize();
        var xtxt = sz * cosTXT + ctx.measureText(txt).width * (cosTXT - 1) / 2;
        var ytxt = sz * sinTXT + me.getFontSize() * (sinTXT - 1) / 2;
        ctx.fillText(txt, X + xtxt, Y - ytxt);
    }

    this.paintLength = function(ctx) {
        var prec = this.getPrecision();
        var x = $L.number(Math.round(this.getCoordsSystem().x(X) * prec) / prec);
        var y = $L.number(Math.round(this.getCoordsSystem().y(Y) * prec) / prec);
        var txt = this.getShowName() ? this.getSubName() : "";
        txt += "(" + x + $L.separator_coords + y + ")";
        paintTxt(ctx, txt);
    };

    this.paintName = function(ctx) {
        // Si une mesure doit être affichée, paintLength se chargera
        // d'afficher le nom avec :
        if (this.getPrecision() === -1)
            paintTxt(ctx, this.getSubName());
    };


    var paintCircle = function(ctx) {
        if (me.getOpacity() === 0)
            ctx.fillStyle = fillStyle;
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(X, Y, me.getRealsize(), 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };
    var paintCross = function(ctx) {
        var sz = me.getRealsize() * 0.9;
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.moveTo(X - sz, Y + sz);
        ctx.lineTo(X + sz, Y - sz);
        ctx.moveTo(X - sz, Y - sz);
        ctx.lineTo(X + sz, Y + sz);
        ctx.stroke();
    };
    var paintSquare = function(ctx) {
        var sz = me.getRealsize() * 1.8;
        if (me.getOpacity() === 0)
            ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.rect(X - sz / 2, Y - sz / 2, sz, sz);
        ctx.fill();
        ctx.stroke();
    };
    var paintDiamond = function(ctx) {
        var sz = me.getRealsize() * 1.3;
        if (me.getOpacity() === 0)
            ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.moveTo(X, Y - sz);
        ctx.lineTo(X - sz, Y);
        ctx.lineTo(X, Y + sz);
        ctx.lineTo(X + sz, Y);
        ctx.lineTo(X, Y - sz);
        ctx.fill();
        ctx.stroke();
    };

    this.beginTrack = function() {
        lastX = X;
        lastY = Y;
    };

    this.drawTrack = function(ctx) {
        if (!isNaN(X) && !isNaN(Y) && !this.isHidden()) {
            if ((X !== lastX) || (Y != lastY)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';
                if (!isNaN(lastX) && !isNaN(lastY)) {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(X, Y);
                    ctx.stroke();
                }
            }
        }
        lastX = X;
        lastY = Y;
    };

    var paintProc = paintCircle;

    this.paintObject = function(ctx) {
        paintProc(ctx);
    };

    var getSourceGeom = function(src) {
        if (this.execMacroSource(src))
            return;
        var len = this.getParentLength();
        var x = this.getCn().coordsSystem.x(this.getX());
        var y = this.getCn().coordsSystem.y(this.getY());
        switch (len) {
            case 0:
                src.geomWrite(false, this.getName(), "Point", x, y);
                break;
            case 1:
                // point sur objet :
                src.geomWrite(false, this.getName(), "PointOn", this.getParentAt(0).getVarName(), Alpha);
                //                src.geomWrite(false, this.getName(), "PointOn", this.getParentAt(0).getName(), x, y);
                break;
            case 2:
                // point d'intersection :
                if (away) {
                    src.geomWrite(false, this.getName(), "OrderedIntersection", this.getParentAt(0).getVarName(), this.getParentAt(1).getVarName(), order, away.getVarName());
                } else {
                    src.geomWrite(false, this.getName(), "OrderedIntersection", this.getParentAt(0).getVarName(), this.getParentAt(1).getVarName(), order);
                }
                break;
        }
    };

    var getSourceFixed = function(src) {
        if (this.execMacroSource(src))
            return;
        var _ex = EXY.getUnicodeSource().replace(/\n/g, "\\n");
        src.geomWrite(true, this.getName(), "Point", _ex, (me.is3D()) ? 1 : 0);
    };

    this.getSource = getSourceGeom;

    this.setDefaults("point");
};
