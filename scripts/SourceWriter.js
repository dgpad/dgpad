/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function SourceWriter(_Cn) {
    var me = this;
    var Cn = _Cn;
    var geom = "";
    var style = "";

    var vars = {};
    var names = {};

    //    var getvarname = function(s) {
    //        var v = $U.leaveAccents(s);
    //        if (vars.hasOwnProperty(v)) {
    //            var b = 1;
    //            while (vars.hasOwnProperty(v + b)) {
    //                b++
    //            }
    //            v = v + b;
    //        }
    //        ;
    //        vars[v] = s;
    //        names[s] = v;
    //        return v;
    //    };
    //
    //me.getVar=function(_n){
    //    return getvarname(_n);
    //};

    me.getGeom = function() {
        // Remplacement du caractère spécial π :
        return geom.replace(/\u03C0/g, "\\u" + "03C0");;
    };
    me.getStyle = function() {
        return style;
    };

    //    me.geomWrite = function(_withquotes, _name, _code) {
    //        var params = [];
    //        var v = getvarname(_name);
    //        for (var i = 3; i < arguments.length; i++) {
    //            var p = (names.hasOwnProperty(arguments[i])) ? names[arguments[i]] : arguments[i];
    //            var myarg = _withquotes ? "\"" + p + "\"" : p;
    //            params.push(myarg);
    //        }
    //        if (params.length === 0) {
    //            geom += v + "=" + _code + "(\"" + _name + "\");\n";
    //        } else {
    //            var args = params.join(",");
    //            geom += v + "=" + _code + "(\"" + _name + "\"," + args + ");\n";
    //        }
    //    };

    me.geomWrite = function(_withquotes, _name, _code) {
        var params = [];
        for (var i = 3; i < arguments.length; i++) {
            //            console.log("arguments[i]="+arguments[i]);
            //            var a = Cn.isVarName(arguments[i]) ?  arguments[i] : Cn.getVarName(arguments[i]);
            //            var a = Cn.isVarName(arguments[i]) ? Cn.getVarName(arguments[i]) : arguments[i];
            //            console.log("a="+a);
            var myarg = _withquotes ? "\"" + arguments[i] + "\"" : arguments[i];
            if ($U.isArray(myarg)) myarg = "[" + myarg.join(",") + "]";
            params.push(myarg);
        }
        if (params.length === 0) {
            geom += Cn.getVarName(_name) + "=" + _code + "(\"" + $U.native2ascii(_name) + "\");\n";
        } else {
            var args = params.join(",");
            geom += Cn.getVarName(_name) + "=" + _code + "(\"" + $U.native2ascii(_name) + "\"," + args + ");\n";
        }
    };


    me.styleWrite = function(_withquotes, _name, _code) {
        var params = [];
        for (var i = 3; i < arguments.length; i++) {
            var myarg = _withquotes ? "\"" + arguments[i] + "\"" : arguments[i];
            params.push(myarg);
        }
        var args = params.join(",");
        style += _code + "(" + Cn.getVarName(_name) + "," + args + ");\n";
    };
}
