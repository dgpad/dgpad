function CurvusObject(_construction, _name, _a, _b, _f1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var me = this;
    var Cn = _construction;
    //    var min = new Expression(this, _a), max = new Expression(this, _b);
    var MIN = 0,
        MAX = 0,
        STEP = 0;
    var E1 = null,
        min = null,
        max = null;
    var CX = 0; // représente l'abscisse (pixel) de l'origine du repère
    var CZ = 1; // représente la valeur du zoom

    var NB = 1000; // nombre de côtés du polygone (modifié à chaque compute pour les cartésiennes)


    // Tableau d'objets de 3 propriétés : x pour abscisse
    // y pour ordonnée, d pour discontinuité repérée
    var Ptab = [];
    for (var i = 0; i < 10000; i++) {
        Ptab.push({
            x: 0,
            y: 0,
            d: false
        });
    }


    this.setDefaults("function");

    this.isInstanceType = function(_c) {
        return (_c === "function");
    };
    this.getCode = function() {
        return "function";
    };
    this.getFamilyCode = function() {
        return "function";
    };

    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc";
    };


    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0; i < NB; i++) {
            if ($U.isNearToPoint(Ptab[i].x, Ptab[i].y, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };


    this.projectXY = function(_x, _y) {
        var xAB = (Ptab[0].x - _x),
            yAB = (Ptab[0].y - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < NB; i++) {
            xAB = (Ptab[i].x - _x);
            yAB = (Ptab[i].y - _y);
            d1 = xAB * xAB + yAB * yAB;
            if ((isNaN(d2)) || (d1 < d2)) {
                k = i;
                d2 = d1;
            }
        }
        return [Ptab[k].x, Ptab[k].y];
    };

    this.project = function(p) {
        //        console.log("this.project");
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var k = (me.compute === computeCartesian) ? Math.round(Cn.coordsSystem.px(p.getAlpha())) : p.getAlpha();
        if ((k >= 0) && (k < NB))
            p.setXY(Ptab[k].x, Ptab[k].y);
        else
            p.setXY(k, Cn.coordsSystem.py(E1.value(p.getAlpha())));
    };

    this.setAlpha = function(p) {
        var xAB = 0,
            yAB = 0;
        for (var i = 0; i < NB; i++) {
            xAB = (Ptab[i].x - p.getX()), yAB = (Ptab[i].y - p.getY());
            if ((xAB === 0) && (yAB === 0)) {
                //                console.log("CX=" + CX + "  i=" + i + "  p.setAlpha(" + (i - CX) + ")");
                //                console.log("Cn.coordsSystem.x(i/2)=" + (Cn.coordsSystem.x(i / 2)));
                if (me.compute === computeCartesian)
                    p.setAlpha(Cn.coordsSystem.x(i));
                else
                    p.setAlpha(i);
                return;
            }
        }
    };

    var computeMinMaxStepCartesian = function() {
        var mn = min ? min.value() : NaN;
        var mx = max ? max.value() : NaN;
        var x0 = Cn.coordsSystem.x(0);
        var x1 = Cn.coordsSystem.x(Cn.getBounds().width);
        MIN = (isNaN(mn)) ? x0 : Math.max(mn, x0);
        MAX = (isNaN(mx)) ? x1 : Math.min(mx, x1);
        NB = Cn.coordsSystem.lx(MAX - MIN);
        STEP = (MAX - MIN) / NB;
    };


    var computeCartesian = function() {
        if (E1)
            E1.compute();
        if (min)
            min.compute();
        if (max)
            max.compute();
        computeMinMaxStepCartesian();
        var k = MIN;
        for (var i = 0; i < NB; i++) {
            Ptab[i].x = Cn.coordsSystem.px(k);
            Ptab[i].y = Cn.coordsSystem.py(E1.value(k));
            // Petit problème d'affichage sur certains navigateur lorsque
            // l'ordonnée (en pixel) est trop grande :
            if (Math.abs(Ptab[i].y) > 20000000)
                Ptab[i].y = NaN;

            k += STEP;
        }
    };


    // En chantier ci-dessous : étude naïve de la discontinuité :
    //    var computeCartesian = function() {
    //        if (E1) E1.compute();
    //        if (min) min.compute();
    //        if (max) max.compute();
    //        computeMinMaxStepCartesian();
    //        var k = MIN;
    //        var y0 = NaN;
    //        var y1 = NaN;
    //        var y2 = NaN;
    //        for (var i = 0; i < NB; i++) {
    //            y2 = E1.value(k);
    //            Ptab[i].x = Cn.coordsSystem.px(k);
    //            Ptab[i].y = Cn.coordsSystem.py(y2);
    //            Ptab[i].d = false;
    //            if (isNaN(y0)) {
    //                y0 = y2;
    //            } else if (isNaN(y1)) {
    //                y1 = y2;
    //            } else if (Math.abs((y0 + y2) / 2 - y1) > 1e-1) {
    //                // Discontinuité repérée :
    //                Ptab[i].d = true;
    //                y0 = NaN;
    //                y1 = NaN;
    //            } else {
    //                y0 = y1;
    //                y1 = y2;
    //            }
    //            k += STEP;
    //        }
    //    };

    var computeMinMaxStepParam = function() {
        var mn = min ? min.value() : NaN;
        var mx = max ? max.value() : NaN;
        MIN = (isNaN(mn)) ? 0 : mn;
        MAX = (isNaN(mx)) ? 1 : mx;
        STEP = (MAX - MIN) / NB;
    };

    var computeParametric = function() {
        if (E1)
            E1.compute();
        if (min)
            min.compute();
        if (max)
            max.compute();
        computeMinMaxStepParam();
        var k = MIN;
        for (var i = 0; i < NB; i++) {
            var t = E1.value(k);
            Ptab[i].x = Cn.coordsSystem.px(t[0]);
            Ptab[i].y = Cn.coordsSystem.py(t[1]);
            k += STEP;
        }
    };

    me.compute = null;

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0].x, Ptab[0].y);
        for (var i = 1; i < NB; i++) {
            ctx.lineTo(Ptab[i].x, Ptab[i].y);
            //            if (Ptab[i].d) ctx.moveTo(Ptab[i].x, Ptab[i].y);
            //            else ctx.lineTo(Ptab[i].x, Ptab[i].y);
        }
        ctx.stroke();
        if ((me.compute === computeCartesian) && (max) && (min)) {
            ctx.lineTo(Cn.coordsSystem.px(max.value()), Cn.coordsSystem.py(0));
            ctx.lineTo(Cn.coordsSystem.px(min.value()), Cn.coordsSystem.py(0));
        }
        ctx.fill();

    };

    this.getSource = function(src) {
        var e1 = (E1 === null) ? "" : E1.getSource();
        var mn = (min === null) ? "" : min.getSource();
        var mx = (max === null) ? "" : max.getSource();
        src.geomWrite(true, this.getName(), "Curvus", mn, mx, e1);
    };

    me.setE1 = function(_f) {
        if (E1)
            delete E1;
        E1 = new Expression(me, _f);
        me.dx = E1.dx;
        me.dy = E1.dy;
        me.dz = E1.dz;
        me.dt = E1.dt;
        if (E1.isArray()) {
            me.compute = computeParametric;
        } else {
            me.compute = computeCartesian;
        }
    };
    me.getE1 = function() {
        return E1;
    };
    me.setMin = function(_t) {
        if (min)
            delete min;
        min = new Expression(me, _t);
        me.compute();
    };
    me.getMinSource = function() {
        if (min)
            return min.getSource();
        return "";
    };
    me.setMax = function(_t) {
        if (max)
            delete max;
        max = new Expression(me, _t);
        me.compute();
    };
    me.getMaxSource = function() {
        if (max)
            return max.getSource();
        return "";
    };

    me.getValue = function(x) {
        return E1.value(x);
    };

    me.refreshNames = function() {
        if (E1)
            E1.refreshNames();
        if (min)
            min.refreshNames();
        if (max)
            max.refreshNames();
    };


    if (_f1 !== "")
        me.setE1(_f1);
    if (_a !== "")
        me.setMin(_a);
    if (_b !== "")
        me.setMax(_b);
}
