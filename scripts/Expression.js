function Expression(_obj, _s, _oneDX) {
    var me = this;

    var obj = _obj;
//    var vname = (_vars === undefined) ? "" : _vars;  // var name, like "x" or "t" or "x,y" or nothing
    var Cn = obj.getCn();
    var interpreter = Cn.getInterpreter();
    var symbolic = new SymbolicCompute(Cn);
    var DX = null;
    var DY = null;
    var DZ = null;
    var DT = null;
    var DXYZT = null; // Chaîne représentant la dérivée suivant x ou y ou etc...
    var NaNstr = NaN.toString();
    var init, lastInstruction, vnames, f, VALUE;
    var isFuncCall = false; // Y-a-t-il un appel à des fonctions utilisateurs dans l'expression ?
    var isvar = function(_v) {
        return (new RegExp("(\\W|^)\\b" + _v + "\\b([^\\(]|$)").test(lastInstruction))
    }
    Expression.ALL.push(me);

    var parseInit = function() {

//        console.log(init.js);

        // Remplacement dans le init.js de toute partie d'expression contenant des dx par la dérivée :
        init.js = init.jsbackup.replace(/(EX_getObj\(\d+\))((\.d[xyzt]{1}\(\))*)((\.d[xyzt]{1})\(([xyzt]{1}(,[xyzt]{1})*)\))+/g, function(_m, _e1, _e2, _e3, _e4, _e5, _e6) {
            if (_e2 === undefined)
                _e2 = "";
            var ex = new Expression(obj, "" + _e1 + _e2 + _e5 + "()");
            return ex.value().js();
        });

        // Remplacement de tous les appels à des expressions (par exemple E1(x)) par le source de ces expressions
        // ******** Il manque la composition : à travailler ci-dessous 
        init.js = init.js.replace(/((EX_funcValue\((\d+)\))\(([xyzt](,[xyzt])*)\))/g, function(m, e1, e2, e3, e4, e5) {
            var ex = interpreter.getEXPS()[parseInt(e3)];
            if (e4 !== ex.getE1().getVars())
                return e1;
            var ex2 = new Expression(obj, ex.getE1().get());
            return ex2.js();
        });

        isFuncCall = (init.js !== init.jsbackup);





        // Si la chaine contient des dx (exemple : E1.dx.dy(x,y,z)), on réactualise les variables
        // comme étant celles de l'expression ciblée (E1 dans l'exemple) :
        init.user = init.user.replace(/((\w+).d[xyzt](.d[xyzt])*)\(([xyzt]*(,[xyzt])*)\)/g, function(m, g1, g2, g3, g4, g5) {
            var ex = Cn.find(g2);
            if ((ex) && (ex.getE1)) {

                return g1 + "(" + ex.getE1().getVars() + ")";
            } else {
                return g1 + "(" + g4 + ")";
            }
        });

        // Si la chaine contient des dx (exemple : EX_getObj(0).dx().dy(x,y,z)), on réactualise les variables
        // comme étant celles de l'expression ciblée (EX_getObj(0) dans l'exemple) :
        init.pseudo = init.pseudo.replace(/((EX_getObj\(\d+\))((\.d[xyzt]\(\))*)(\.d[xyzt]))\(([xyzt]*(,[xyzt])*)\)/g, function(m, g1, g2, g3, g4, g5, g6) {
            var expr = new Expression(obj, "" + g2);
            var ex = expr.value();
            if ((ex) && (ex.getE1)) {
                return g1 + "(" + ex.getE1().getVars() + ")";
            } else {
                return g1 + "(" + g6 + ")";
            }
        });


//        console.log("init.js="+init.js+"  init.pseudo="+init.pseudo);
        lastInstruction = (function() {
            var t = init.js.split(";");
            return t[t.length - 1];
        })();
        vnames = (function() {
            var vn = [];
            if (isvar("x"))
                vn.push("x");
            if (isvar("y"))
                vn.push("y");
            if (isvar("z"))
                vn.push("z");
            if (isvar("t"))
                vn.push("t");
            return vn.join(",");
        })();
        f = interpreter.CreateFunctionFromExpression(init.js, vnames);
        VALUE = null;
    };



    me.setText = function(_src) {
//        console.log("avant : "+obj.getName());
        init = interpreter.ExpressionInit(obj, _src + "");
        parseInit();
//        console.log("après : "+obj.getName());
    };

    me.setText(_s);




    me.setDxyzt = function() {
        var st = init.jsbackup;
        st = st.replace(/(\.d[xyzt]{1})\([^\)]+\)$/, "$1()");
        DXYZT = new Expression(obj, st);
    };

    me.getDxyzt = function() {
        return DXYZT.value().get();
    };

    me.getVars = function() {
        return vnames;
    };

    // Appelée uniquement lors d'une modification de l'expression par
    // l'utilisateur :
    me.compute = function() {
        // Si il s'agit d'une expressions sans variable, on précalcule.
        // Ceci est notamment très utile pour les expressions contenant
        // un programme avec de grosses boucles qui au final délivrent un tableau :
        VALUE = (vnames === "") ? f() : null;

        if (isFuncCall)
            parseInit();
        DX = null;
        DY = null;
        DZ = null;
        DT = null;
    };

    me.value = function(x, y, z, t) {
        if (VALUE)
            return VALUE;
        if (vnames === "")
            return (VALUE = f());
        return f(x, y, z, t);
    };

    me.dx = function(x, y, z, t) {
        if (DX === null)
            DX = new Expression(obj, symbolic.derivate(init.js, "x"));
        if (arguments.length === 0)
            return DX;
        return DX.value(x, y, z, t);
    };
    me.dy = function(x, y, z, t) {
        if (DY === null)
            DY = new Expression(obj, symbolic.derivate(init.js, "y"));
        if (arguments.length === 0)
            return DY;
        return DY.value(x, y, z, t);
    };
    me.dz = function(x, y, z, t) {
        if (DZ === null)
            DZ = new Expression(obj, symbolic.derivate(init.js, "z"));
        if (arguments.length === 0)
            return DZ;
        return DZ.value(x, y, z, t);
    };
    me.dt = function(x, y, z, t) {
        if (DT === null)
            DT = new Expression(obj, symbolic.derivate(init.js, "t"));
        if (arguments.length === 0)
            return DT;
        return DT.value(x, y, z, t);
    };





    // Methode appelée pour la réinitialisation des parents (voir ExpressionObject) :
    me.refresh = function() {
        var src = me.getSource().replace(/\\\"/g, "\"");
        me.setText(src);
    };

    // Methode appelée lorsqu'on change le nom d'un objet (dans le panneau de prop.)
    // et que cet objet est impliqué dans l'expression :
    me.refreshNames = function() {
        me.refresh();
        me.compute();
    };



    // setValue pour les curseurs d'expressions :
    me.setValue = function(_val) {
        init = interpreter.ExpressionInit(obj, _val + "");
        lastInstruction = _val + "";
        vnames = "";
        f = interpreter.CreateFunctionFromExpression(init.js, vnames);
        VALUE = _val;
    };


    me.isText = function() {
        return (lastInstruction.indexOf("\"") !== -1);
    };

    me.isFunc = function() {
        return (vnames !== "");
    };

    me.isDxyztFunc = function() {
        return /^EX_getObj\(\d+\)(\.d[xyzt]{1}\(\))+$/.test(init.jsbackup);
    };

    me.isDxyztDef = function() {
        return /^EX_getObj\(\d+\)(\.d[xyzt]{1}\(\))*(\.d[xyzt]{1}\([^\)]+\))+$/.test(init.jsbackup);
    };

    me.isEmpty = function() {
        return (init.user === "");
    };

    me.isNum = function() {
//        if (!VALUE) return false;
        return ((vnames === "") && (!isNaN(f())));
    };

    me.isArray = function() {
        return ($U.isArray(f(1, 1, 1, 1)));
    };

    me.is3DArray = function() {
        var t = f(1, 1, 1, 1);
        if ($U.isArray(t)) {
            for (var k = 0; k < t.length; k++) {
                if (t[k].length !== 3)
                    return false;
            }
            return true;
        }
        return false;
    };

    me.getPointList = function() {
        var val = me.getValidValue();
        var tab = [];
        if (!$U.isPointArrayWithNaN(val))
            return tab;
        for (var i = 0; i < val.length; i++) {
            tab.push(obj.getVarName() + "[" + i + "]");
        }
        return tab;
    };




    // Pas fier du tout de ceci :
    me.getValidValue = function() {
        if (VALUE)
            return VALUE;
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * 100 - 50;
            var y = Math.random() * 100 - 50;
            var z = Math.random() * 100 - 50;
            var t = Math.random() * 100 - 50;
            var res = f(x, y, z, t);
            if ((res !== undefined) && (res.toString() !== NaNstr))
                return res;
        }
        return null;
    };

    me.fix = function() {
        if (f(1, 2, 3, 4) === undefined) {
            me.setText(_s);
//            init = interpreter.ExpressionInit(obj, _s + "");
//            f = interpreter.CreateFunctionFromExpression(init.js, vnames);
        }
    };

    me.get = function() {
        return init.user;
    };

    me.js = function() {
        return init.js;
    };

    me.getUnicodeSource = function() {
        var s = interpreter.ExpressionSrc(init.pseudo);
        s = s.replace(/\"([^\"]*)\"/g, function(m, t) {
            return ("\"" + $U.native2ascii(t) + "\"");
        });
        return s;
    };

    me.getSource = function() {
        return interpreter.ExpressionSrc(init.pseudo);
    };
}

Expression.ALL = [];


// A chaque fois qu'un objet est rajouté à la figure (ObjectConstructor)
// On parcours toutes les expressions de la figure pour chercher celle
// provoquant une erreur de référence : on essaie alors de les reconstruire :
Expression.fixAll = function() {
    for (var i = 0; i < Expression.ALL.length; i++) {
        Expression.ALL[i].fix();
    }
}

