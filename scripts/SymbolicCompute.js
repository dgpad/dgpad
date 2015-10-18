function SymbolicCompute(_cn) {
    var me = this;
    var Cn = _cn;
    var EXPS = Cn.getInterpreter().getEXPS();

    var isNum = function(_s) {
        return (new RegExp("^\\d+\\.*\\d*$").test(_s))
    }

    var isVar = function(_s) {
        return (new RegExp("^[xyzt]{1}$").test(_s))
    }

    var contains = function(_s, _t) {
        _s = "" + _s;
        _t = _t.split(",");
        var res = false;
        for (var i = 0; i < _t.length; i++) {
            res = res || (_s.indexOf(_t[i]) !== -1)
        }
        return res;
    }

    var userFromCode = function(_t, _m, _s) {
        var st = _s.split(_m);
        if (st.length === 1) return st[0]; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        if (st[0] === "") return userFromCode(_t, _m, p);
        var f = st[0]; // La fonction : comme "plus", "times", "cos"
        p = p.split(","); // On transforme les paramètres en tableau
        var v = [];
        for (var i = 0; i < p.length; i++) {
            p[i] = "" + p[i];
            v[i] = userFromCode(_t, _m, p[i]);
            if (isNum(v[i])) v[i] = parseFloat(v[i]);
        }
        switch (f) {
            case "plus":
                return v[0] + "+" + v[1];
                break;
            case "minus":
                if (contains(v[1], "+,-")) v[1] = "(" + v[1] + ")";
                if (v[0] === 0) return "-" + v[1];
                return v[0] + "-" + v[1];
                break;
            case "times":
                if (contains(v[0], "+,-")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,/")) v[1] = "(" + v[1] + ")";
                return v[0] + "*" + v[1];
                break;
            case "quotient":
                if (contains(v[0], "+,-")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,*,/")) v[1] = "(" + v[1] + ")";
                return v[0] + "/" + v[1];
                break;
            case "power":
                if (contains(v[0], "+,-,*,/")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,*,/,^")) v[1] = "(" + v[1] + ")";
                return v[0] + "^" + v[1];
                break;
            default:
                return f + "(" + v[0] + ")";
        }
    };

    var simplifyFromCode = function(_t, _m, _s) {
        var st = _s.split(_m);
        if (st.length === 1) return st[0]; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        if (st[0] === "") return simplifyFromCode(_t, _m, p);
        var f = st[0]; // La fonction : comme "plus", "times", "cos"
        p = p.split(","); // On transforme les paramètres en tableau
        var v = [];
        for (var i = 0; i < p.length; i++) {
            p[i] = "" + p[i];
            v[i] = simplifyFromCode(_t, _m, p[i]);
            if (isNum(v[i])) v[i] = parseFloat(v[i]);
        }

        switch (f) {
            case "plus":
                if (v[0] === 0) return v[1];
                if (v[1] === 0) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return v[0] + v[1];
                return "plus(" + v[0] + "," + v[1] + ")";
                break;
            case "minus":
                if (v[1] === 0) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return (v[0] - v[1]);
                if (v[0] === v[1]) return 0;
                return "minus(" + v[0] + "," + v[1] + ")";
                break;
            case "times":
                if ((v[0] === 0) || (v[1] === 0)) return 0;
                if (v[0] === 1) return v[1];
                if (v[1] === 1) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return (v[0] * v[1]);
                if ((!isNaN(v[1])) && (isNaN(v[0]))) return "times(" + v[1] + "," + v[0] + ")";
                return "times(" + v[0] + "," + v[1] + ")";
                break;
            case "quotient":
                if (v[0] === 0) return 0;
                if (v[1] === 1) return v[0];
                if (v[0] === v[1]) return 1;
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) {
                    var l = 1e13 * (v[0] / v[1]);
                    if (l === Math.round(l)) return v[0] / v[1];
                }
                if ((!isNaN(v[1])) && (isNaN(v[0]))) {
                    var l = 1e13 * (1 / v[1]);
                    if (l === Math.round(l)) return "times(" + (1 / v[1]) + "," + v[0] + ")";
                    return "times(quotient(1," + v[1] + ")," + v[0] + ")";
                }




                return "quotient(" + v[0] + "," + v[1] + ")";
                break;
            case "power":
//                if (v[1] === "1") return v[0];
                if (v[0] === 0) return 1;
                if (v[1] === 1) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return Math.pow(v[0], v[1]);
                return "power(" + v[0] + "," + v[1] + ")";
                break;
            default:
                return _s;
//            default:
//                return f + "(" + simplifyFromCode(_t, _m, _t[parseInt(st[1])]) + ")";
        }

    };


    var derivateFromCode = function(_t, _m, _s, _v) {
//        console.log("****derivateFromCode="+_s);
        if (_s === _v) return 1;
//        if (_s.indexOf(mask)===-1) return 0;

        var st = _s.split(_m);
        if (st.length === 1) return 0; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        // on renvoie la dérivée du tout. 
        if (st[0] === "") return derivateFromCode(_t, _m, p, _v);

        var f = st[0]; // La fonction : comme "plus", "times", "cos"


        p = p.split(","); // On transforme les paramètres en tableau
        var dp = [];
        var allCte = true;
        for (var i = 0; i < p.length; i++) {
            dp[i] = derivateFromCode(_t, _m, p[i], _v);
            allCte = allCte && (dp[i] === 0);
        }
        ;
        if (allCte) return 0;




        switch (f) {
            case "plus":
                if (dp[0] === 0) return dp[1];
                if (dp[1] === 0) return dp[0];
                // u' + v' :
                return "plus(" + dp[0] + "," + dp[1] + ")";
                break;
            case "minus":
                if (dp[1] === 0) return dp[0];
                // u' - v' :
                return "minus(" + dp[0] + "," + dp[1] + ")";
                break;
            case "times":
                if ((dp[0] === 1) && (dp[1] === 0)) return p[1];
                if ((dp[1] === 1) && (dp[0] === 0)) return p[0];
                if ((dp[0] === 1) && (dp[1] === 1)) return "plus(" + p[0] + "," + p[1] + ")";
                if (dp[0] === 0) return "times(" + p[0] + "," + dp[1] + ")";
                if (dp[1] === 0) return "times(" + p[1] + "," + dp[0] + ")";
                // u'v + uv' :
                return "plus(times(" + dp[0] + "," + p[1] + "),times(" + p[0] + "," + dp[1] + "))";
                break;
            case "power":
                if ((dp[0] === 1) && (dp[1] === 0)) return "times(" + p[1] + ",power(" + p[0] + ",minus(" + p[1] + ",1)))";
                if (dp[1] === 0) return "times(times(" + p[1] + "," + dp[0] + "),power(" + p[0] + ",minus(" + p[1] + ",1)))";
                return "times(power(" + p[0] + "," + p[1] + "),plus(times(" + dp[1] + "," + "log(" + p[0] + ")),times(" + p[1] + ",quotient(" + dp[0] + "," + p[0] + "))))";
                break;
            case "quotient":
                if ((dp[0] === 1) && (dp[1] === 0)) return "quotient(1," + p[1] + ")";
                if ((dp[0] === 0) && (dp[1] === 1)) return "quotient(minus(0," + p[0] + "),power(" + p[1] + ",2))";
                if ((dp[0] === 1) && (dp[1] === 1)) return "quotient(minus(" + p[1] + "," + p[0] + "),power(" + p[1] + ",2))";
                if (dp[1] === 0) return "quotient(" + dp[0] + "," + p[1] + ")";
                return "quotient(minus(times(" + dp[0] + "," + p[1] + "),times(" + p[0] + "," + dp[1] + ")),power(" + p[1] + ",2))";
                break;
            case "cos":
                return "times(minus(0," + dp[0] + "),sin(" + p[0] + "))";
                break;
            case "sin":
                return "times(" + dp[0] + ",cos(" + p[0] + "))";
                break;
            case "tan":
                return "times(" + dp[0] + ",plus(1,power(tan(" + p[0] + "),2)))";
                break;
            case "sqrt":
                return "quotient(" + dp[0] + ",times(2,sqrt(" + p[0] + ")))";
                break;
                case "abs":
                return "times(" + dp[0] + ",quotient(abs(" + p[0] + ")," + p[0] + "))";
                break;
            case "log":
                return "quotient(" + dp[0] + "," + p[0] + ")";
                break;
            case "exp":
                return "times(" + dp[0] + ",exp(" + p[0] + "))";
                break;
            case "asin":
                return "quotient(" + dp[0] + ",sqrt(minus(1,power(" + p[0] + ",2))))";
                break;
            case "acos":
                return "minus(0,quotient(" + dp[0] + ",sqrt(minus(1,power(" + p[0] + ",2)))))";
                break;
            case "atan":
                return "quotient(" + dp[0] + ",plus(1,power(" + p[0] + ",2)))";
                break;
        }

//        
//        _s = _s.replace(new RegExp(mask + "(\\d+)", "g"), function(m, _d) {
//            return tabExpr[_d];
//        });
        return 0;

    }



    var prepareMaskFromCode = function(_m, _s) {
        _s = "" + _s;
        var tab = [];
        while (_s.indexOf("(") > -1) {
            _s = _s.replace(/\(([^\(\)]*)\)/, function(m, t) {
                tab.push(t);
                return (_m + (tab.length - 1));
            });
        }
        tab.push(_s);
        return tab;
    }

    var restituteCodeFromMask = function(_t, _m, _s) {
        _s = "" + _s;
        while (_s.indexOf(_m) !== -1) {
            // Restitution de tous les textes :
            _s = _s.replace(new RegExp(_m + "(\\d+)", "g"), function(m, _d) {
                return "(" + _t[_d] + ")";
            });
        }
        return _s;
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

    me.userCode = function(_s) {
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var simpl = userFromCode(tab, mask, tab[tab.length - 1]);
        _s = restituteCodeFromMask(tab, mask, simpl);

        _s = _s.replace(/EX_funcValue\((\d+)\)\(([^\)]*)\)/g, function(_m, _n, _p) {
            if (_p === "") return EXPS[_n].getVarName();
            return EXPS[_n].getVarName() + "(" + _p + ")";
        });
        _s = _s.replace(/EX_getObj\((\d+)\)/g, function(_m, _n) {
            return EXPS[_n].getVarName();
        });

//        console.log("me.userCode : " + _s);
        var str;
        do {
            str = _s;
//            // Remplacement des divisions et multiplications de nombres par le quotient ou produit :
//            _s = _s.replace(/(^|[^\^]{1})(\b\d+\.*\d*\b)(\*|\/)(\b\d+\.*\d*\b)([^\^]{1}|$)/g, function(_m, _c, _n1,_op, _n2, _c2) {
//                _n1 = parseFloat(_n1);
//                _n2 = parseFloat(_n2);
//                var r=(_op==="*")?(_n1 * _n2):(_n1 / _n2);
//                return "" + _c + r + _c2;
//            });
            // Remplacement des puissances de nombres :
            _s = _s.replace(/(\b\d+\.*\d*\b)\^(\b\d+\.*\d*\b)/g, function(_m, _n1, _n2) {
                _n1 = parseFloat(_n1);
                _n2 = parseFloat(_n2);
                var r = Math.round(Math.pow(_n1, _n2) * 1e13) / 1e13;
                return "" + r;
            });



            // Remplacement des multiplications de nombres par le produit :
            _s = _s.replace(/(^|[^\^\/]{1})(\b\d+\.*\d*\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, function(_m, _c, _n1, _n2, _c2) {
                _n1 = parseFloat(_n1);
                _n2 = parseFloat(_n2);
                var r = Math.round(_n1 * _n2 * 1e13) / 1e13;
                return "" + _c + r + _c2;
            });
//            // Remplacement des divisions de nombres par le quotient :
//            _s = _s.replace(/([^\^]{1})(\b\d+\.*\d*\b)\/(\b\d+\.*\d*\b)([^\^]{1})/g, function(_m, _c,_n1, _n2,_c2) {
//                _n1 = parseFloat(_n1);
//                _n2 = parseFloat(_n2);
//                return ""+_c+(_n1 / _n2)+_c2;
//            });
            // On commute variable et nombre de sorte que le nombre soit
            // au début :
//            _s = _s.replace(/(^|[^\^]{1})(\b[xyzt]{1}\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, "$1$3*$2$4");
            // On commute mots et nombre de sorte que le nombre soit
            // au début :
//            _s = _s.replace(/(^|[^\^]{1})(\b\w+\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, "$1$3*$2$4");
//            console.log(_s);
        } while (str !== _s);

//        _s=_s.replace(/\*/g,"");


//        _s = _s.replace(/[0-9\.]+([\+\-\*\/\^]){1}/g, function(_m, _n) {
//            return EXPS[_n].getVarName();
//        });


        return _s;
    }


    me.simplify = function(_s) {
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var simpl = simplifyFromCode(tab, mask, tab[tab.length - 1]);
        _s = restituteCodeFromMask(tab, mask, simpl);
//        console.log("me.simplify=" + _s);
        return _s;
    }
    
    


    me.derivate = function(_s, _v) {
        if ((_s === "") || (!(isValidParenthesis(_s)))) return "";
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var der = derivateFromCode(tab, mask, tab[tab.length - 1], _v);
        _s = restituteCodeFromMask(tab, mask, der);

//        tab = prepareMaskFromCode(mask, _s, _v);
//        der = simplifyFromCode(tab, mask, tab[tab.length - 1], _v);
//        _s = restituteCodeFromMask(tab, mask, der);

//        console.log("CODE =" + _s);
//        return me.simplify(_s);
//        return _s;

        _s = me.userCode(me.simplify(_s));

//        console.log("USER CODE="+_s);

        return _s;

    }




}