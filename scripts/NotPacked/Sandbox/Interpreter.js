function Interpreter(_win, _canvas) {
    var me = this;
    var $macros = null;
    var $macroFinals = null;
    var $macromode = false;
    var $caller = null; // Objet qui appelle le script par bouton
    var namespace = {};


    me.W = _win;
    me.$U = _win.$U;
    me.Z = _canvas;
    me.C = me.Z.getConstruction();
    me.E = document.createEvent("MouseEvent");
    me.E.initMouseEvent("mousemove", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);


    var $progressBar = null;
    var $initProgress = function(_src) {
        if (_src) {
            var i = _src.indexOf("// Geometry :");
            if (i !== -1) {
                var mcrs = _src.substring(0, i);
                var geom = _src.substring(i);
                var stls = "";

                var j = geom.indexOf("// Styles :");
                if (j !== -1) {
                    stls = geom.substring(j);
                    geom = geom.substring(0, j);
                }
                var lines = geom.match(/\n/g).length;
                // Si la partie géométrie du source contient moins de 300 lignes
                // on ne coupe pas le source, et on le renvoie :
                if (lines < 300)
                    return {
                        header: _src,
                        lines: [],
                        num: 0
                    };
                // On découpe la partie géométrie par paquets de 10 instructions :
                lines = geom.replace(/(([^\n]*\n){10})/g, "$1@@@@@@").split("@@@@@@");
                // On ajoute les styles :
                lines.push(stls);
                $progressBar = new me.W.progressBar(me.Z);
                return {
                    header: mcrs,
                    lines: lines,
                    num: 0
                };
            }
        }
        return {
            header: _src,
            lines: [],
            num: 0
        };
    };


    me.setCaller = function(_o) {
        $caller = _o;
    };

    me.removeMouseEvents = function() {
        var cTag = me.Z.getDocObject();
        cTag.removeEventListener('mousemove', me.Z.mouseMoved, false);
        cTag.removeEventListener('mousedown', me.Z.mousePressed, false);
        cTag.removeEventListener('mouseup', me.Z.mouseReleased, false);
    }

    me.addMouseEvents = function() {
        var cTag = me.Z.getDocObject();
        cTag.addEventListener('mousemove', me.Z.mouseMoved, false);
        cTag.addEventListener('mousedown', me.Z.mousePressed, false);
        cTag.addEventListener('mouseup', me.Z.mouseReleased, false);
    }


    me.Interpret = function(_s) {
        clearNameSpace();
        var code = $initProgress(_s);
        $macros = null;
        // Eval is evil ? :
        try {
            eval(code.header);
            if ($progressBar) {
                me.removeMouseEvents();
                var interval = setInterval(function() {
                    if (code.num === code.lines.length) {
                        clearInterval(interval);
                        $progressBar.hide();
                        $progressBar = null;
                        clearNameSpace();
                        me.addMouseEvents();
                        me.Z.setMode(1);
                        me.C.validate(me.E);
                        me.C.computeAll();
                        me.C.clearIndicated();
                        me.C.clearSelected();
                        me.Z.paint(me.E);
                        return;
                    }
                    eval(code.lines[code.num]);
                    $progressBar.move(code.num / code.lines.length);
                    code.num = code.num + 1;
                }, 1);
            }
            // Récupération éventuelle des macros :
            if ($macros) {
                for (var i in $macros) {
                    if ($macros.hasOwnProperty(i)) {
                        me.Z.macrosManager.addTool($macros[i].name, $macros[i].parameters, $macros[i].exec);
                    }
                }
            }
        } catch (err) {
            alert(err.message);
        }
        if (!$progressBar) {
            me.C.validate(me.E);
            me.C.computeAll();
            me.Z.paint(me.E);
            clearNameSpace();

        }
    };


    me.LoadPlugins = function(_plugins) {
        clearNameSpace();
        $macros = null;
        // Eval is evil ? :
        try {
            eval(_plugins);
            // Récupération éventuelle des plugins :
            if ($macros) {
                for (var i in $macros) {
                    if ($macros.hasOwnProperty(i)) {
                        me.Z.macrosManager.addPlugin($macros[i].name, $macros[i].parameters, $macros[i].exec);
                    }
                }
            }
        } catch (err) {
            alert(err.message);
        }
        clearNameSpace();
    };

    me.InterpretMacro = function(_s) {
        clearNameSpace();
        $macromode = true;
        $macroFinals = [];
        try {
            // avant l'évaluation, on réalise une copie de tous les paramètres
            // éventuels de la fonction/macro. Cela necessite une recherche
            // regexp des paramètres et le placement des affectations
            // à l'intérieur du block fonction. Ceci est uniquement utile
            // pour le parsevariable (voir methode me.p)
            var match = _s.match(/([\s\S]*)function.*\((.*)\).*{([\s\S]*)/m);
            var s = match[1] + "function(" + match[2] + "){";
            var params = match[2].replace(/\s*/g, "").split(",");
            for (var i = 0, len = params.length; i < len; i++) {
                if (params[i] !== "") {
                    s += "\n$locvar_" + params[i] + "=" + params[i] + ";";
                }
            }
            s += match[3];
            // Eval is evil ? :
            // console.log(s);
            eval(s);
            for (var i = 0, len = $macroFinals.length; i < len; i++) {
                me.f($macroFinals[i]).setHidden(false);
            }
        } catch (err) {
            alert(err.message);
        }
        //        me.C.setDeps();
        $macromode = false;
        $macroFinals = null;
        me.C.validate(me.E);
        me.C.computeAll();
        me.Z.paint(me.E);
        clearNameSpace();
    };


    // Trouve et renvoie l'objet nommé _s :
    me.f = function(_s) {
        return me.C.find(_s);
    };

    me.fv = function(_s) {
        return me.C.findVar(_s);
    };


    me.construct = function(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    };

    // Crée un nouveau ConstructionObject, et renvoie son nom :
    me.o = function() {

        var myobj = me.W[arguments[0]];
        var args = [me.C];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var o = me.construct(myobj, args);
        if ($macromode)
            o.setHidden(2);
        //        me.Z.addObject(o);
        me.C.add(o);
        return o.getName();
    };

    // Teste si les arguments d'une fonction sont en nombre inférieur à celui attendu :
    me.t = function(expectedArgsNumber) {
        return (me.t.caller.arguments.length < expectedArgsNumber);
    };

    // Change les arguments d'une fonction en ajoutant un nom générique :
    me.a = function(code) {
        // Fonction appelante :
        var myFunc = me.a.caller;
        var args = myFunc.arguments;
        // Ajoute un nom générique en début d'arguments :
        Array.prototype.unshift.call(args, "_" + code);
        // Appelle la fonction avec le bon nombre d'arguments :
        return myFunc.apply(this, args);
    };

    // Ajoute les arguments passés à la fin des arguments d'une fonction appelante :
    me.b = function() {
        // Fonction appelante :
        var myFunc = me.b.caller;
        var args = myFunc.arguments;
        for (var i = 0, len = arguments.length; i < len; i++) {
            Array.prototype.push.call(args, arguments[i]);
        }
        // Appelle la fonction avec le bon nombre d'arguments :
        return myFunc.apply(this, args);
    };

    // parseVariable :
    me.p = function(s) {
        if (s.charAt(0) === "_") {
            var n = s.substring(1);
            if (window[n] === undefined) {
                return window["$locvar_" + n];
            } else {
                return window[n];
            }
        }
        return s;
    };

    var isStr = function(_x) {
        return (typeof _x === "string");
    };

    var GetCanvas = function() {
        return me.Z;
    };


    // Methode obsolete, maintenue pour la 
    // compatibilité des figures 3D d'avant
    // le 22 novembre 2013 :
    var Set3DConstruction = function(_b) {
        return me.C.set3DMode(_b);
    };

    var Set3D = function(_b) {
        me.C.set3D(_b);
    };

    var Text = function(_m, _l, _t, _w, _h, _stl) {
        me.Z.addText(_m, _l, _t, _w, _h, _stl);
    };

    var Input = function(_q, _i) {
        if (!_i)
            _i = "";
        return prompt(_q, _i);
    };

    var Print = function(_m) {
        if ($caller)
            $caller.print(_m);
        return null;
    };

    var Println = function(_m) {
        if ($caller)
            $caller.print(_m + "\n");
        return null;
    };

    var GetExpressionValue = function(_e, _x, _y, _z, _t) {
        var o = me.f(_e);
        return (o ? JSON.parse(me.$U.parseArrayEnglish(o.getValue(_x, _y, _z, _t))) : NaN);
    };

    var SetExpressionValue = function(_e, _m) {
        var o = me.f(_e);
        o.setExp(_m);
    };

    var Find = function(_n) {
        var o = me.f(_n);
        return (o ? o : parent.document.getElementById(_n));
    };

    var RefreshInputs = function() {
        me.Z.textManager.refreshInputs();
    };

    var Timer = function(_dlay) {
        return new me.$U.timers(_dlay)
    };

    var Coords = function(_n) {
        var o = me.f(_n);
        if (o.is3D()) {
            me.C.setcompute3D_filter(o.coords3D);
            me.C.computeAll();
            me.C.clearcompute3D_filter();
            return o.getOldcoords();
        } else {
            return o.coords2D();
        };
    };

    var Point = function(_n, _x, _y) {
        if (me.t(3))
            return me.a("P");
        if (isStr(_x))  {
            var o = me.f(me.o("PointObject", _n, 0, 0));
            o.setEXY(_x);
            return o.getName();
        }
        var px = me.C.coordsSystem.px(_x);
        var py = me.C.coordsSystem.py(_y);
        return me.o("PointObject", _n, px, py);
    };

    var PointOn = function(_n, _a, _alpha) {
        if (me.t(3))
            return me.a("P");
        var on = me.f(_a);
        var o = me.f(me.o("PointObject", _n, 0, 0));
        o.addParent(on);
        o.setAlpha(_alpha);
        on.projectAlpha(o);
        o.setFillStyle();
        return o.getName();
    };

    // Attention danger ! je viens de supprimer ces deux
    // méthode en espérant qu'elles n'ont jamais été utilisées.
    // Le nom interférait avec le scope et appeler des objets
    // X ou Y pouvait provoquer des bloquages...

    //    var X = function(_P) {
    //        return me.C.coordsSystem.x(me.f(_P).getX());
    //    };
    //
    //    var Y = function(_P) {
    //        return me.C.coordsSystem.y(me.f(_P).getY());
    //    };

    var Move = function(_P, _x, _y) {
        var o = me.f(_P);
        if (isStr(_x))  {
            o.setEXY(_x);
            return;
        };
        o.setXY(me.C.coordsSystem.px(_x), me.C.coordsSystem.py(_y));
        setTimeout(function() {
            me.C.compute();
            me.Z.paint();
        }, 1);

    };

    var InteractiveInput = function(_m, _type) {
        throw {
            name: "System Error",
            level: "Show Stopper",
            message: "Error detected. Please contact the system administrator.",
            htmlMessage: "Error detected. Please contact the <a href=\"mailto:sysadmin@acme-widgets.com\">system administrator</a>.",
            toString: function() {
                return this.name + ": " + this.message;
            }
        };
    };




    var OrderedIntersection = function(_n, _a, _b, _order, _away) {
        if (me.t(2))
            return me.a("P");
        if (me.t(3))
            return me.b(0);
        if (me.t(4))
            return me.a("P");
        var c1 = me.f(_a);
        var c2 = me.f(_b);
        var o = me.f(me.o("PointObject", _n, 0, 0));
        o.addParent(c1);
        o.addParent(c2);
        o.setOrder(_order);
        if (_away !== undefined)
            o.setAway(me.f(_away));
        o.setFillStyle();
        return o.getName();
    };

    var SetCoords = function(_x0, _y0, _u, _md3D) {
        me.C.coordsSystem.setCoords(_x0, _y0, _u, _md3D);
    };

    var Circle = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("CircleObject", _n, A, B);
    };

    var Circle1 = function(_n, _a, _r) {
        if (me.t(3))
            return me.a("C");
        var A = me.f(_a);
        if (isStr(_r)) {
            var o = me.f(me.o("Circle1Object", _n, A, 0));
            o.setRX(_r);
            return o.getName();
        }
        var r = me.C.coordsSystem.lx(_r);
        return me.o("Circle1Object", _n, A, r);
    };

    var FixedAngle = function(_n, _a, _b, _ex, _trig) {
        if (me.t(5))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var o = me.f(me.o("FixedAngleObject", _n, A, B, _trig));
        o.setExp(_ex);
        return o.getName();
    };

    var Circle3 = function(_n, _a, _b, _m) {
        if (me.t(4))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var M = me.f(_m);
        return me.o("Circle3Object", _n, A, B, M);
    };

    var Circle3pts = function(_n, _a, _b, _c) {
        if (me.t(4))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        return me.o("Circle3ptsObject", _n, A, B, C);
    };

    var Circle3pts3D = function(_n, _a, _b, _c) {
        if (me.t(4))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        return me.o("Circle3ptsObject_3D", _n, A, B, C);
    };

    var Center = function(_n, _c) {
        if (me.t(2))
            return me.a("P");
        var C = me.f(_c);
        C.getP1().setName(_n);
        if ($macromode)
            C.getP1().setHidden(1);
        return C.getP1().getName();
    };

    var Arc3pts = function(_n, _a, _b, _c) {
        if (me.t(4))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        return me.o("Arc3ptsObject", _n, A, B, C);
    };

    var Quadric = function(_n, _a, _b, _c, _d, _e) {
        if (me.t(6))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        var D = me.f(_d);
        var E = me.f(_e);
        return me.o("QuadricObject", _n, A, B, C, D, E);
    };

    var Angle = function(_n, _a, _b, _c) {
        if (me.t(4))
            return me.a("C");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        return me.o("AngleObject", _n, A, B, C);
    };

    //    var Angle180 = function (_a, _o, _c) {
    //
    //
    //    };
    //
    //    var Angle360 = function (_a, _o, _c) {
    //        console.log("Angle360");
    //        var A = me.f(_a);
    //        var O = me.f(_o);
    //        var C = me.f(_c);
    //        var xOA = A.getX() - O.getX(), yOA = A.getY() - O.getY();
    //        var xOC = C.getX() - O.getX(), yOC = C.getY() - O.getY();
    //        var start = Math.angleH(xOA, yOA);
    //        var end = Math.angleH(xOC, yOC);
    //        return (end - start)
    //    };



    var X_axis = function(_n) {
        var n = me.o("OXObject", _n);
        me.C.coordsSystem.setOX(me.C.find(n));
        return n;
    };

    var Y_axis = function(_n) {
        var n = me.o("OYObject", _n);
        me.C.coordsSystem.setOY(me.C.find(n));
        return n;
    };

    var Line = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("L");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("TwoPointsLineObject", _n, A, B);
    };

    var Ray = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("R");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("RayObject", _n, A, B);
    };

    var Segment = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("S");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("SegmentObject", _n, A, B);
    };

    var Vector = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("V");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("VectorObject", _n, A, B);
    };

    var First = function(_n, _s) {
        if (me.t(2))
            return me.a("P");
        var S = me.f(_s);
        return S.getP1().getName();
    };

    var Second = function(_n, _s) {
        if (me.t(2))
            return me.a("P");
        var S = me.f(_s);
        return S.getP2().getName();
    };

    var DefinitionPoint = function(_n, _s, _i) {
        if (me.t(3))
            return me.a("P");
        var S = me.f(_s);
        return S.getPt(_i).getName();
    };

    var Parallel = function(_n, _l, _p) {
        if (me.t(3))
            return me.a("Par");
        var L = me.f(_l);
        var P = me.f(_p);
        return me.o("ParallelLineObject", _n, L, P);
    };

    var Perpendicular = function(_n, _l, _p) {
        if (me.t(3))
            return me.a("Perp");
        var L = me.f(_l);
        var P = me.f(_p);
        return me.o("PlumbObject", _n, L, P);
    };

    var MidPoint = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("M");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("MidPointObject", _n, A, B);
    };

    var Symmetry = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("M");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("SymcObject", _n, A, B);
    };

    var Reflection = function(_n, _l, _p) {
        if (me.t(3))
            return me.a("M");
        var L = me.f(_l);
        var P = me.f(_p);
        return me.o("SymaObject", _n, L, P);
    };

    var PerpendicularBisector = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("L");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("PerpBisectorObject", _n, A, B);
    };

    var AngleBisector = function(_n, _a, _b, _c) {
        if (me.t(4))
            return me.a("L");
        var A = me.f(_a);
        var B = me.f(_b);
        var C = me.f(_c);
        return me.o("AngleBisectorObject", _n, A, B, C);
    };

    var Polygon = function(_n, _pts) {
        if (me.t(2))
            return me.a("A");
        //        console.log(_pts);
        var pts = _pts.split(",");
        for (var i = 0; i < pts.length; i++) {
            //            console.log((me.p(pts[i])));
            pts[i] = me.f(me.p(pts[i]));
        }
        pts.push(pts[0]);
        return me.o("AreaObject", _n, pts);
    };

    var Locus = function(_n, _a, _b) {
        if (me.t(3))
            return me.a("Locus");
        var A = me.f(_a);
        var B = me.f(_b);
        return me.o("LocusObject", _n, A, B);
    };

    var Curvus = function(_n, _a, _b, _t) {
        if (me.t(4))
            return me.a("f");
        return me.o("CurvusObject", _n, _a, _b, _t);
    };

    var CartesianFunction = function(_n, _a, _b, _t) {
        if (me.t(4))
            return me.a("f");
        return me.o("CurvusObject", _n, _a, _b, _t);
    };

    var ParametricFunction = function(_n, _a, _b, _t1, _t2) {
        if (me.t(5))
            return me.a("f");
        return me.o("CurvusObject", _n, _a, _b, _t1, _t2);
    };

    var Expression = function(_n, _t, _min, _max, _e, _x, _y) {
        if (me.t(5))
            return me.a("E");
        var px = me.C.coordsSystem.px(_x);
        var py = me.C.coordsSystem.py(_y);
        return me.o("ExpressionObject", _n, _t, _min, _max, _e, px, py);
    };

    var ExpressionOn = function(_n, _t, _min, _max, _e, _a, _alpha) {
        if (me.t(5))
            return me.a("E");
        var on = me.f(_a);
        var ex = me.f(me.o("ExpressionObject", _n, _t, _min, _max, _e, 0, 0));
        ex.attachTo(on);
        ex.setAlpha(_alpha);
        on.projectAlpha(ex);
        return ex.getName();
    };

    var List = function(_n, _exp) {
        if (me.t(2))
            return me.a("List");
        var _E = me.f(_exp);
        return me.o("ListObject", _n, _E);
    };

    var parseBoolean = function(val) {
        return !!JSON.parse(String(val).toLowerCase());
    }

    var STL = function(_n, _s) {
        var o = me.f(_n);
        _s = _s.split(";");
        for (var i = 0, len = _s.length; i < len; i++) {
            var e = _s[i].split(":");
            e[1] = me.p(e[1]);
            switch (e[0]) {
                case "c": // Color
                    o.setColor(e[1]);
                    break;
                case "h": // Hidden
                    o.setHidden(e[1]);
                    break;
                case "o": // Opacity
                    o.setOpacity(parseFloat(e[1]));
                    break;
                case "s": // Size
                    o.setSize(parseFloat(e[1]));
                    break;
                case "sn": // Show name
                    o.setShowName(e[1]);
                    break;
                case "f": // Font size
                    o.setFontSize(parseInt(e[1]));
                    break;
                case "l": // Layer
                    o.setLayer(parseInt(e[1]));
                    break;
                case "p": // Précision numérique
                    o.setPrecision(e[1]);
                    break;
                case "sp": // Forme des points
                    o.setShape(parseInt(e[1]));
                    break;
                case "i": // Incrément
                    o.setIncrement(parseFloat(e[1]));
                    break;
                case "sb": // Sur le contour d'un polygone
                    o.setOnBoundary(e[1]);
                    break;
                case "dh": // Pointillés
                    o.setDash(parseBoolean(e[1]));
                    break;
                case "nmi": // No Mouse Inside (Inerte)
                    o.setNoMouseInside(parseBoolean(e[1]));
                    break;
                case "np": // Position du nom des objets
                    o.setNamePosition(e[1]);
                    break;
                case "am": // Angle mode : 360° or not
                    o.set360(parseBoolean(e[1]));
                    break;
                case "tk": // Trace de l'objet
                    if (e[1]) {
                        setTimeout(function() {
                            me.Z.trackManager.add(o, true);
                        }, 1);
                    }
                    break;
                case "fl": // Objet flottant
                    if (e[1]) {
                        o.setFloat(true);
                        o.free = function() {
                            return false;
                        }
                    }
                    break;
                case "cPT": // Point d'un curseur d'expression
                    var stls = me.$U.base64_decode(e[1]);
                    STL(o.getcPTName(), stls);
                    break;
                case "cL": // Point d'un curseur d'expression
                    o.setCursorLength(parseInt(e[1]));
                    break;
                case "sg": // With segments (for list objects)
                    o.setSegmentsSize(e[1]);
                    break;
                case "mg": // Magnétisme des objets
                    var t = eval("[" + e[1] + "]");
                    for (var k = 0; k < t.length; k++) {
                        t[k][0] = me.C.find(t[k][0]);
                    };
                    o.setMagnets(t);
                    break;
                case "dp": // Dépendance des objets
                    var t = e[1].substring(1, e[1].length - 1).split(",");
                    for (var k = 0; k < t.length; k++) {
                        try {
                            t[k] = eval(t[k]);
                            t[k] = me.C.find(t[k]);
                        } catch (e) {
                            try {
                                t[k] = eval("$locvar_" + t[k]);
                                t[k] = me.C.find(t[k]);
                            } catch (e) {
                                console.log("Polygon dependance error !")
                            }
                        }
                    }
                    o.setDragPoints(t);
                    break;
            }
        }
    };

    var SetGeneralStyle = function(_s) {
        _s = _s.split(";");
        for (var i = 0, len = _s.length; i < len; i++) {
            var e = _s[i].split(":");
            switch (e[0]) {
                case "background-color":
                    me.Z.setBackground(e[1]);
                    break;
                case "degree":
                    me.C.setDEG(e[1] === "true")
            }
        }
    };


    var SetCoordsStyle = function(_s) {
        _s = _s.split(";");
        var cs = me.C.coordsSystem;
        for (var i = 0, len = _s.length; i < len; i++) {
            var e = _s[i].split(":");
            switch (e[0]) {
                case "is3D": // Obsolète
                    me.C.set3DMode(e[1] === "true");
                    break;
                case "3Dmode":
                    me.C.set3D(e[1] === "true");
                    break;
                case "isAxis":
                    cs.showCS(e[1] === "true");
                    break;
                case "isGrid":
                    cs.showGrid(e[1] === "true");
                    break;
                case "isOx":
                    cs.showOx(e[1] === "true");
                    break;
                case "isOy":
                    cs.showOy(e[1] === "true");
                    break;
                case "isLockOx":
                    cs.setlockOx(e[1] === "true");
                    break;
                case "isLockOy":
                    cs.setlockOy(e[1] === "true");
                    break;
                case "centerZoom":
                    cs.setCenterZoom(e[1] === "true");
                    break;
                case "color":
                    cs.setColor(e[1]);
                    break;
                case "fontSize":
                    cs.setFontSize(parseInt(e[1]));
                    break;
                case "axisWidth":
                    cs.setAxisWidth(parseFloat(e[1]));
                    break;
                case "gridWidth":
                    cs.setGridWidth(parseFloat(e[1]));
                    break;
            }
        }
    };


    /********************************************************************************
     ********************************************************************************
     * ***********************          EXPRESSIONS            **********************
     ******************************************************************************** 
     ********************************************************************************
     */


    var EX = {}; // Expressions
    var EXPS = []; // Tableau de stockage des objets impliqués dans les expressions élémentaires

    me.CreateFunctionFromExpression = function(_s, _v) {
        //        if (_s === "") _s = "NaN";
        var t = _s.split(";");
        t[t.length - 1] = "return (" + t[t.length - 1] + ");";
        var s = t.join(";");
        var f = null;
        // Si f renvoie "undefined" c'est qu'il y a une erreur de
        // référence : par exemple x(A) où A n'existe pas dans la
        // figure. Dans tous les autres cas d'erreur, f renvoie NaN.
        try {
            f = eval('(function(' + _v + '){try{with(Math){with(EX){' + s + '}}}catch(e){return undefined;}})');
            //            f = eval('(function(' + _v + '){try{with(Math){with(EX){' + s + '}}}catch(e){return undefined;}})');
        } catch (e) {
            f = eval('(function(){return NaN})');
        }
        return f;
    };










    var pushEXP = function(_o) {
        var i = EXPS.indexOf(_o);
        if (i === -1) {
            EXPS.push(_o);
            return (EXPS.length - 1);
        }
        return i;
    };

    var getEXP = function(_i) {
        return EXPS[_i];
    };

    me.getEXPS = function() {
        return EXPS;
    }

    var isValidParenthesis = function(_s) {
        var parentheses = 0;
        var crochets = 0;
        var REGsequence = [];
        for (var i = 0, len = _s.length; i < len; i++) {
            if (_s.charAt(i) === "(")
                parentheses++;
            if (_s.charAt(i) === "[")
                crochets++;
            else {
                if (_s.charAt(i) === ")") {
                    parentheses--;
                    REGsequence.push(/(\([^\(\)]*\))/);
                }
                if (_s.charAt(i) === "]") {
                    crochets--;
                    REGsequence.push(/(\[[^\[\]]*\])/);
                }
            }
            if ((parentheses < 0) || (crochets < 0))
                return null;
        }
        if ((parentheses === 0) && (crochets === 0))
            return REGsequence;
        return null;
    };


    var transformOpposite = function(_st) {
        //        if (!isValidParenthesis(_st)) return _st;
        //        var allExp = _st.split(";");
        //        var _s = allExp[allExp.length - 1];


        _st = _st.replace(/\-([\d\.]+)/g, function(m, _d1) {
            return "+(-" + _d1 + ")";
        });
        return _st;
    }






    var operatorReplace = function(_st) {
        var regs = isValidParenthesis(_st);
        if (regs) {

            // Remplacement des signes "-" par "0-"
            // devant certains caractères spéciaux :
            _st = _st.replace(/^\s*-/g, "0-");
            _st = _st.replace(/\(\s*-/g, "(0-");
            _st = _st.replace(/\[\s*-/g, "[0-");
            _st = _st.replace(/,\s*-/g, ",0-");
            _st = _st.replace(/\?\s*-/g, "?0-");
            _st = _st.replace(/:\s*-/g, ":0-");

            var tab = [];
            var mask = "___mainMask___";

            for (var i = 0; i < regs.length; i++) {
                _st = _st.replace(regs[i], function(m, t) {
                    tab.push(t);
                    return (mask + (tab.length - 1));
                });
            }

            // Ce qui reste de la chaine est mis en mask pour initialiser
            // le replace recursif :
            tab.push(_st);
            _st = mask + (tab.length - 1);

            var tabOp = [];
            var maskOp = "___joker_replaceOp___";

            // Toutes les expressions dans tab commencent et terminent
            // par des parenthèses, mais sans aucune parenthèse intérieure.
            // On peut donc appliquer des règles de priorité simples
            // (ça tombe bien, les parcours regex se font de gauche à droite !) :
            for (var i = 0, len = tab.length; i < len; i++) {
                tab[i] = replaceOp(tab[i], "\\^", tabOp, maskOp);
                tab[i] = replaceOp(tab[i], "\\*|\\/", tabOp, maskOp);
                tab[i] = replaceOp(tab[i], "\\+|\\-", tabOp, maskOp);
                while (tab[i].indexOf(maskOp) > -1) {
                    // On remplace le joker par sa vraie valeur, et dans le
                    // même temps on remplace le caret par la fonction pow :
                    tab[i] = tab[i].replace(new RegExp(maskOp + "(\\d+)", "g"), function(m, d) {
                        return tabOp[d];
                    });
                }
                // console.log("***tab[" + i + "]=" + tab[i]);
            }

            while (_st.indexOf(mask) > -1) {
                // On remplace le joker par sa vraie valeur, et dans le
                // même temps on remplace l'opérateur par la fonction correspondante :
                _st = _st.replace(new RegExp(mask + "(\\d+)", "g"), function(m, d) {
                    return tab[d];
                });
            }
            return _st;
        }
    };

    var replaceOp = function(_s, _op, _atom, _mask) {
        var ops = {
            "^": "power",
            "*": "times",
            "/": "quotient",
            "+": "plus",
            "-": "minus"
        };
        var s0 = "";
        var s1 = _s;
        while ((s0 !== s1)) {
            s0 = s1;
            s1 = s1.replace(new RegExp("([a-zA-Z0-9_.]*)(" + _op + ")([a-zA-Z0-9_.]*)", ""), function(_m, _d1, _o, _d2) {
                _atom.push(ops[_o] + "(" + _d1 + "," + _d2 + ")");
                return (_mask + (_atom.length - 1));
            });
        }
        return s1;
    };

    var addTimesSymbol = function(_s) {
        // PI a pour valeur unicode : \u03C0
        _s = _s.replace(/Angle360/g, "Angle360_"); // avoid conflict with 3(x+2) rule
        _s = _s.replace(/Angle180/g, "Angle180_"); // avoid conflict with 3(x+2) rule

        _s = _s.replace(/(^|[^A-Za-z])(\d+|\u03C0+)\s*([A-Za-z]+|\u03C0+)/g, "$1$2*$3"); // Du type 2x -> 2*x
        _s = _s.replace(/\)\s*\(/g, ")*("); // Du type (x+1)(x+2) -> (x+1)*(x+2)
        _s = _s.replace(/(\d+|\u03C0)\s*\(/g, "$1*("); // Du type 3(x+2) -> 3*(x+2)
        _s = _s.replace(/\)\s*([A-Za-z]+)/g, ")*$1"); // Du type (x+2)sin(a) -> (x+2)*sin(a)
        _s = _s.replace(/\b([xyzt]{1})([xyzt]{1})\b/g, "$1*$2"); // Du type xy -> x*y

        _s = _s.replace(/Angle180_/g, "Angle180");
        _s = _s.replace(/Angle360_/g, "Angle360");
        return _s;
    };

    var functionReplace = function(_s) {
        var tabExpr = [];
        var maskExpr = "___EXPR___";
        if (!isValidParenthesis(_s))
            return _s;
        // Remplacement des expressions sans variable : E1 -> ___EXPR___n
        // et mise du contenu en mémoire tabExpr[n]="funcValue(E1)()"
        _s = _s.replace(/\b(\w+)\b([^\(]|$)/g, function(m, _n, _e) {
            var o = (window[_n] === undefined) ? me.fv(window["$locvar_" + _n]) : me.fv(window[_n]);
            if (o === undefined)
                o = me.fv(_n);
            if (o === undefined)
                return (_n + _e);
            //            console.log("trouvé !!!");
            //            if ((o === undefined) || (o.getCode() !== "expression")) return (_n + _e);
            if ("." === _e.charAt(0))
                tabExpr.push("getObj(" + _n + ")");
            else
                tabExpr.push("funcValue(" + _n + ")__()");
            return (maskExpr + (tabExpr.length - 1) + _e);
        });

        // Remplacement des fonctions d'une variable : f1(<param>) -> funcValue(f1)(<param>)
        // Voir explications dans caretReplace :
        var tabFunc = [];
        var maskFunc = "___FUNC___";
        while (_s.indexOf("(") > -1) {
            _s = _s.replace(/(\([^\(\)]*\))/g, function(m, t) {
                tabFunc.push(t);
                return (maskFunc + (tabFunc.length - 1));
            });
        }
        tabFunc.push(_s);
        _s = maskFunc + (tabFunc.length - 1);
        while (_s.indexOf(maskFunc) > -1) {
            _s = _s.replace(new RegExp("(\\w+)" + maskFunc + "(\\d+)", "g"), function(m, _n, _d) {
                var o = (window[_n] === undefined) ? me.fv(window["$locvar_" + _n]) : me.fv(window[_n]);
                if (o === undefined)
                    o = me.fv(_n);
                if (o === undefined)
                    return _n + maskFunc + _d;
                //                if ((o === undefined) || ((o.getCode() !== "function") && (o.getCode() !== "expression"))) return _n + maskFunc + _d;
                return "funcValue(" + _n + ")__" + maskFunc + _d;
            });
            _s = _s.replace(new RegExp(maskFunc + "(\\d+)", "g"), function(m, _d) {
                return tabFunc[_d];
            });
        }

        // Rétablissement des expressions sans variable : ___EXPR___n -> funcValue(E1)()
        _s = _s.replace(new RegExp(maskExpr + "(\\d+)", "g"), function(m, _d) {
            return tabExpr[_d];
        });
        return _s;
    };

    // parseExpression dans le contexte de cette window :
    var pe = function(_o, _n) {
        //        console.log("name="+_o.getName()+"  n="+_n);
        _n = _n.replace(/\s/g, "");

        if ((_o.getName) && (_o.getName() === _n)) {
            //            console.log("name=" + _o.getName() + "  n=" + _n);
            return pushEXP(_o);
        } else {
            var o = (window[_n] === undefined) ? me.fv(window["$locvar_" + _n]) : me.fv(window[_n]);
            if (o === undefined)
                o = me.fv(_n);
            if (o === undefined)
                return _n;
            if ((_o) && (_o.getParent) && (_o.getParent().indexOf(o) === -1))
                _o.addParent(o);
            return pushEXP(o);
        }
    };

    var EXinit = function(_c) {
        var _n = EX[_c].length; // nombre de paramètres de la fonction
        var c = _c.split("_")[1];
        var r = "\\b" + c + "\\b\\(([^\\)]*)";
        for (var i = 1; i < _n; i++) {
            r += ",([^\\)]*)";
        }
        r += "\\)";
        var rg = new RegExp(r, "g");
        return function(_o, _s) {
            return _s.replace(rg, function(m) {
                var res = _c + "(" + pe(_o, arguments[1]);
                for (var i = 2; i < (_n + 1); i++) {
                    res += "," + pe(_o, arguments[i]);
                }
                res += ")";
                return res;
            });
        };
    };


    me.ExpressionInit = function(_o, _s) {

        // ******* SPARADRAP : je ne comprends pas pourquoi des EX_funcValue(5)
        // traînent dans le source utilisateur de certaines expressions (de dérivées).
        // On nettoie donc tout ça pour remplacer par le nom actuel
        _s = _s.replace(/(EX_funcValue\((\d+)\))/g, function(m, g1, g2) {
            var ex = EXPS[parseInt(g2)];
            return ex.getName();
        });


        var s = _s;
        //        console.log("ExpressionInit !!! : "+s);
        // Sauvegarde des toutes les parties texte de l'expression :
        var txts = [];
        var maskTxts = "___TEXTES___";
        var stt = s;
        var s2 = s.replace(/(\"[^\"]*\")/g, function(m, t) {
            txts.push(t);
            return (maskTxts + (txts.length - 1));
        });
        s2 = functionReplace(s2);
        s2 = EXinit("EX_funcValue")(_o, s2);
        s2 = EXinit("EX_getObj")(_o, s2);
        // Remplacement des fonctions personnelles x,y,etc... 
        // par une notation interne EX_x,EX_y,etc... :
        for (var f in EX) {
            var myF = f.split("_")[1];
            s2 = s2.replace(new RegExp("(\\W|^)\\s*" + myF + "\\s*\\(", "g"), "$1" + f + "(");
        }

        // s3 contient une forme intermédiaire de l'expression. Il s'agit d'une chaine du type
        // "EX_y(EX_funcValue(0)__())+x^2" lorsque l'utilisateur a entré "y(P1)+x^2".
        // Cette chaine correspond au paramètre "pseudo" de l'objet renvoyé, qui sera
        // utilisé pour délivrer le source de l'expression :
        var s3 = s2.replace(new RegExp(maskTxts + "(\\d+)", "g"), function(m, _d) {
            return txts[_d];
        });

        if (isValidParenthesis(s2)) {
            // On ne touche que la dernière partie de la suite
            // d'instruction (après le dernier ";") :
            var allExp = s2.split(";");
            var _s2 = allExp[allExp.length - 1];


            _s2 = addTimesSymbol(_s2);
            _s2 = _s2.replace(/\u03C0/g, "PI");
            _s2 = _s2.replace(/\bi\b/g, "[0,1]");

            _s2 = operatorReplace(_s2);

            allExp[allExp.length - 1] = _s2;
            s2 = allExp.join(";");
        }

        // nécessaire pour rétablir le code functionReplace qui évite
        // la multiplication entre les parenthèses d'un calcul d'image :
        s2 = s2.replace(/\)__\(/g, ")(");


        // Remplacement des ".dx." , ".dy." etc... par ".dx()." , ".dy()." etc...
        var reg = new RegExp("\\.d([xyzt]{1})\\.");
        while (reg.test(s2))
            s2 = s2.replace(reg, ".d$1().");
        s2 = s2.replace(/\.d([xyzt]{1})\s*$/, ".d$1()");


        // Restitution de tous les textes :
        s2 = s2.replace(new RegExp(maskTxts + "(\\d+)", "g"), function(m, _d) {
            return txts[_d];
        });



        //        if ((s2 !== "") && ((isValidParenthesis(s2)))) {
        //            console.log("***user result = " + s);
        //            console.log("pseudo result = " + s3);
        //            console.log("main result = " + s2);
        //            console.log("name : " + _o.getName());
        //        }


        return {
            user: s,
            pseudo: s3,
            js: s2,
            jsbackup: s2
        };
    };



    // Renvoie le source de l'expression. Principalement,
    // il s'agit de remplacer la représentation numérique 
    // interne par le nom actuel des objets.
    me.ExpressionSrc = function(_s) {
        var s = _s;
        while (s.indexOf("EX_funcValue") !== -1) {
            s = s.replace(/EX_funcValue\((\d+)\)__\(([^\)]*)\)/, function(_m, _d1, _d2) {
                var _n = EXPS[_d1].getVarName();
                if (_d2 !== "")
                    _n += "(" + _d2 + ")";
                return _n;
            });
        }
        while (s.indexOf("EX_getObj") !== -1) {
            s = s.replace(/EX_getObj\((\d+)\)./, function(_m, _d1) {
                var _n = EXPS[_d1].getVarName() + ".";
                return _n;
            });
        }
        s = s.replace(/EX_/g, "");
        s = s.replace(/\"/g, "\\\"");
        return s;
    };

    var isArray = function(_a) {
        return (Object.prototype.toString.call(_a) === '[object Array]');
    };


    Math.test = function(_test, _valtrue, _valfalse) {
        if (_test)
            return _valtrue;
        else
            return _valfalse;
    };

    Math.IF = function(_test, _valtrue, _valfalse) {
        if (_test)
            return _valtrue;
        else
            return _valfalse;
    };


    // Renvoie l'angle que forme un vecteur (x;y) avec l'horizontale
    // dans l'intervalle [0;2π[ orienté dans le sens trigo :
    Math.angleH = function(x, y) {
        if (y < 0)
            return 2 * Math.PI - Math.atan2(-y, x);
        else
            return -Math.atan2(-y, x);
    };

    Math.crossProduct = function(_a, _b) {
        if ((isArray(_a)) && (_a.length === 3) && (isArray(_b)) && (_b.length === 3)) {
            return [_a[1] * _b[2] - _a[2] * _b[1], _a[2] * _b[0] - _a[0] * _b[2], _a[0] * _b[1] - _a[1] * _b[0]];
        }
        return NaN;
    };

    Math.unitVector = function(_a) {
        if (isArray(_a)) {
            var _n = 0;
            var res = [];
            for (var i = 0; i < _a.length; i++) {
                _n += _a[i] * _a[i];
            }
            _n = Math.sqrt(_n);
            for (var i = 0; i < _a.length; i++) {
                res.push(_a[i] / _n);
            }
            return res;
        }
        return NaN;
    };

    Math.distance = function(_a, _b) {
        if ((isArray(_a)) && (isArray(_b)) && (_a.length === _b.length)) {
            var d = 0;
            for (var i = 0; i < _a.length; i++) {
                d += (_a[i] - _b[i]) * (_a[i] - _b[i]);
            }
            return Math.sqrt(d);
        }
        return NaN;
    };

    Math.gcd = function(a, b) {
        if ((!isNaN(a)) && (!isNaN(b)))
            return ((b == 0) ? a : Math.gcd(b, a % b));
        return NaN;
    };


    Math.csqrt = function(a) {
        if (!isNaN(a)) {
            if (a < 0)
                return Math.csqrt([a, 0]);
            else
                return Math.sqrt(a);
        } else if ((isArray(a)) && (a.length === 2)) {
            var res = [];
            // Determination de l'argument générique :
            var arg = Math.angleH(a[0], a[1]) / 2;
            // Determination du module générique :
            var mod = Math.pow(Math.sqrt((a[0] * a[0]) + (a[1] * a[1])), 1 / 2);
            res.push([mod * Math.cos(arg), mod * Math.sin(arg)]);
            res.push([mod * Math.cos(arg + Math.PI), mod * Math.sin(arg + Math.PI)]);
            return res;
        }
        return NaN;
    };

    Math.power = function(a, b) {
        if ((!isNaN(a)) && (!isNaN(b)))
            return Math.pow(a, b);
        // Si a est un complexe et b un nombre :
        if ((!isNaN(b)) && (isArray(a)) && (a.length === 2)) {
            var invb = (b === 0) ? 0 : 1 / b;
            // S'il s'agit d'une racine b-ième :
            if ((Math.round(invb) === invb) && (invb > 1)) {
                var res = [];
                // Determination de l'argument générique :
                var arg = Math.angleH(a[0], a[1]) * b;
                // Determination du module générique :
                var mod = Math.pow(Math.sqrt((a[0] * a[0]) + (a[1] * a[1])), b);
                var inc = Math.doublePI * b;
                for (var k = 0; k < invb; k++) {
                    res.push([mod * Math.cos(arg + k * inc), mod * Math.sin(arg + k * inc)]);
                }
                return res;
            } else {
                // Determination de l'argument du resultat :
                var arg = Math.angleH(a[0], a[1]) * b;
                // Determination du module du resultat :
                var mod = Math.pow(Math.sqrt((a[0] * a[0]) + (a[1] * a[1])), b);
                return [mod * Math.cos(arg), mod * Math.sin(arg)];
            }

        }
        return NaN;
    };

    Math.plus = function(_a, _b) {
        if ((!isNaN(_a)) && (!isNaN(_b)))
            return _a + _b;
        var a = (!isNaN(_a)) ? [_a, 0] : _a;
        var b = (!isNaN(_b)) ? [_b, 0] : _b;
        if ((isArray(a)) && (isArray(b)) && (a.length === b.length)) {
            var t = [];
            for (var i = 0, len = a.length; i < len; i++) {
                t.push(Math.plus(a[i], b[i]));
            }
            return t;
        }
        if (isStr(_a) || (isStr(_b)))
            return (_a + _b); // Concaténation de chaine
        return NaN;
    };


    Math.minus = function(_a, _b) {
        if ((!isNaN(_a)) && (!isNaN(_b)))
            return _a - _b;
        var a = (!isNaN(_a)) ? [_a, 0] : _a;
        var b = (!isNaN(_b)) ? [_b, 0] : _b;
        if ((isArray(a)) && (isArray(b)) && (a.length === b.length)) {
            var t = [];
            for (var i = 0, len = a.length; i < len; i++) {
                t.push(Math.minus(a[i], b[i]));
            }
            return t;
        }
        return NaN;
    };
    Math.times = function(a, b) {
        if ((!isNaN(a)) && (!isNaN(b)))
            return a * b;
        // Si les deux sont des complexes :
        if ((isArray(a)) && (isArray(b)) && (a.length === b.length) && (a.length === 2)) {
            return ([a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]);
        }
        if ((!isNaN(a)) && (isArray(b))) {
            var t = [];
            for (var i = 0, len = b.length; i < len; i++) {
                t.push(Math.times(a, b[i]));
            }
            return t;
        }
        if ((!isNaN(b)) && (isArray(a))) {
            var t = [];
            for (var i = 0, len = a.length; i < len; i++) {
                t.push(Math.times(b, a[i]));
            }
            return t;
        }
        return NaN;
    };
    Math.quotient = function(a, b) {
        if ((!isNaN(a)) && (!isNaN(b)))
            return a / b;
        // Si les deux sont des complexes :
        if ((isArray(a)) && (isArray(b)) && (a.length === b.length) && (a.length === 2)) {
            return ([(a[0] * b[0] + a[1] * b[1]) / (b[0] * b[0] + b[1] * b[1]), (a[1] * b[0] - a[0] * b[1]) / (b[0] * b[0] + b[1] * b[1])]);
        }
        if ((!isNaN(b)) && (isArray(a))) {
            var t = [];
            for (var i = 0, len = a.length; i < len; i++) {
                t.push(Math.quotient(a[i], b));

            }
            return t;
        }
        // Si a est un nombre et b un complexe :
        if ((!isNaN(a)) && (isArray(b)) && (b.length === 2)) {
            return Math.quotient([a, 0], b);
        }
        return NaN;
    };

    Math.mod = function(_a) {
        var a = (!isNaN(_a)) ? [_a, 0] : _a;
        // Si a est un complexe :
        if ((isArray(a)) && (a.length === 2)) {
            return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        }
        return NaN;
    };

    Math.conj = function(_a) {
        var a = (!isNaN(_a)) ? [_a, 0] : _a;
        // Si a est un complexe :
        if ((isArray(a)) && (a.length === 2)) {
            return ([a[0], -a[1]]);
        }
        return NaN;
    };

    Math.arg = function(_a) {
        var a = (!isNaN(_a)) ? [_a, 0] : _a;
        // Si a est un complexe :
        if ((isArray(a)) && (a.length === 2)) {
            return (Math.angleH(a[0], a[1]));
        }
        return NaN;
    };

    Math.Angle360 = function(_a, _o, _c) {
        var xOA = _a[0] - _o[0],
            yOA = _a[1] - _o[1];
        var xOC = _c[0] - _o[0],
            yOC = _c[1] - _o[1];
        var start = Math.angleH(xOA, yOA);
        var end = Math.angleH(xOC, yOC);
        var a = end - start;
        a = a - Math.floor(a / Math.doublePI) * Math.doublePI;
        return (a)
    };

    Math.Angle180 = function(_a, _o, _c) {
        var a = Math.Angle360(_a, _o, _c);
        return ((a < Math.simplePI) ? a : Math.doublePI - a)
    };

    Math.deg_coeff = Math.PI / 180;
    Math.rcos = Math.cos;
    Math.rsin = Math.sin;
    Math.rtan = Math.tan;
    Math.racos = Math.acos;
    Math.rasin = Math.asin;
    Math.ratan = Math.atan;
    Math.rangleH = Math.angleH;
    Math.doublePI = 2 * Math.PI;
    Math.simplePI = Math.PI;
    Math.coef3D = 0.015;

    me.setDegreeMode = function(_d) {
        if (_d) {
            Math.cos = function(_a) {
                return Math.rcos(_a * Math.deg_coeff);
            };
            Math.sin = function(_a) {
                return Math.rsin(_a * Math.deg_coeff);
            };
            Math.tan = function(_a) {
                return Math.rtan(_a * Math.deg_coeff);
            };
            Math.acos = function(_a) {
                return (Math.racos(_a) / Math.deg_coeff);
            };
            Math.asin = function(_a) {
                return (Math.rasin(_a) / Math.deg_coeff);
            };
            Math.atan = function(_a) {
                return (Math.ratan(_a) / Math.deg_coeff);
            };
            Math.angleH = function(x, y) {
                if (y < 0)
                    return (2 * Math.PI - Math.atan2(-y, x)) * 180 / Math.PI;
                else
                    return (-Math.atan2(-y, x)) * 180 / Math.PI;
            };
            Math.doublePI = 360;
            Math.simplePI = 180;
            Math.coef3D = 0.859436693;
        } else {
            Math.cos = Math.rcos;
            Math.sin = Math.rsin;
            Math.tan = Math.rtan;
            Math.acos = Math.racos;
            Math.asin = Math.rasin;
            Math.atan = Math.ratan;
            Math.angleH = Math.rangleH;
            Math.doublePI = 2 * Math.PI;
            Math.simplePI = Math.PI;
            Math.coef3D = 0.015;
        }
    };

    me.setDegreeMode(me.C.isDEG());



    // Ici, attention aux noms des fonctions : après le underscore, le nom
    // de la fonction telle que le tape l'utilisateur (et tel qu'il est écrit
    // dans le source, et avant, c'est "EX".

    // Distance entre deux points :
    EX.EX_d = function(_a, _b) {
        if ((isArray(_a)) && (isArray(_b))) {
            if ((_a.length === 2) && (_b.length === 2))
                return Math.sqrt((_b[0] - _a[0]) * (_b[0] - _a[0]) + (_b[1] - _a[1]) * (_b[1] - _a[1]));
            else if ((_a.length === 3) && (_b.length === 3))
                return Math.sqrt((_b[0] - _a[0]) * (_b[0] - _a[0]) + (_b[1] - _a[1]) * (_b[1] - _a[1]) + (_b[2] - _a[2]) * (_b[2] - _a[2]));
        }
        return NaN;
    };

    // Abscisse d'un point :
    EX.EX_x = function(_a) {
        if ((isArray(_a)) && (_a.length > 0))
            return _a[0];
        return NaN;
    };

    // Ordonnée d'un point
    EX.EX_y = function(_a) {
        if ((isArray(_a)) && (_a.length > 1))
            return _a[1];
        return NaN;
    };

    EX.EX_windoww = function() {
        return me.C.coordsSystem.l(me.C.getWidth());
    };
    EX.EX_windowh = function() {
        return me.C.coordsSystem.l(me.C.getHeight());
    };
    EX.EX_windowcx = function() {
        return me.C.coordsSystem.x(me.C.getWidth() / 2);
    };
    EX.EX_windowcy = function() {
        return me.C.coordsSystem.y(me.C.getHeight() / 2);
    };
    EX.EX_pixel = function() {
        return me.C.coordsSystem.getUnit();
    };



    var COORDS_X0 = me.C.coordsSystem.getX0;
    var COORDS_Y0 = me.C.coordsSystem.getY0;

    EX.EX_phi = function() {
        return COORDS_X0() * Math.coef3D;
    };
    EX.EX_theta = function() {
        return COORDS_Y0() * Math.coef3D;
    };

    EX.EX_restrictPhi = function(_t) {
        if (_t.length === 2)
            me.C.coordsSystem.restrictPhi([_t[0] / 0.015 + 0.000001, _t[1] / 0.015 - 0.000001]);
        else
            me.C.coordsSystem.restrictPhi([]);
        return _t;
    };
    EX.EX_restrictTheta = function(_t) {
        if (_t.length === 2)
            me.C.coordsSystem.restrictTheta([_t[0] / 0.015 + 0.000001, _t[1] / 0.015 - 0.000001]);
        else
            me.C.coordsSystem.restrictTheta([]);
        return _t;
    };
    EX.EX_point3D = function(_o, _v) {
        var fi = EX.EX_phi();
        var th = EX.EX_theta();
        var cfi = Math.cos(fi),
            sfi = Math.sin(fi);
        var cth = Math.cos(th),
            sth = Math.sin(th);
        return [_o[0] + _v[0] * (sfi) + _v[1] * (cfi), _o[1] + _v[0] * (-cfi * sth) + _v[1] * (sfi * sth) + _v[2] * (cth)];
    };


    //    EX.EX_windoww=9;

    // Uniquement à usage interne. L'utilisateur écrit f3(2), et
    // l'interpréteur transforme en EX_funcValue(f3)(2) :
    EX.EX_funcValue = function(_e) {
        return EXPS[_e].getValue;
    };

    EX.EX_getObj = function(_e) {
        return EXPS[_e];
    };

    me.getEX = function() {
        return EX;
    };

    me.getMath = function() {
        return Math;
    };


    // Copie le namespace de cette iframe onload (voir canvas) :
    me.copyNameSpace = function() {
        for (var key in window) {
            namespace[key] = key;
        }
    };


    var clearNameSpace = function() {
        for (var key in window) {
            if (!namespace.hasOwnProperty(key)) {
                delete window[key];
            }
        }
    };


}
