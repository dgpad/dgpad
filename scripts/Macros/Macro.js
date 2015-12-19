/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Macro(_canvas, _name, _p, _proc) {
    this.name = _name;
    this.shortname = _name.split("/");
    this.shortname = this.shortname[this.shortname.length - 1];
    var me = this;
    var paramTypes = _p;
    var exec = _proc;
    var canvas = _canvas;


    var params = [];
    var Cn = null;
    var Li = null;


    me.tagPossibleInitials = function() {
        var v = Cn.elements();
        for (var i = 0, len = v.length; i < len; i++) {
            if (v[i].isInstanceType(paramTypes[params.length])) {
                if (v[i].getMacroMode() === 0) {
                    // S'il s'agit d'un neutre
                    v[i].setMacroMode(4);
                }
            } else {
                if (v[i].getMacroMode() !== 5) {
                    // S'il ne s'agit pas d'un initial déjà déclaré
                    v[i].setMacroMode(0);
                }

            }
        }
    };

    var commentMacro = function(_i, _len, _tpe) {
        var t = ' :<p class="macroLIclassComment">' + _i + '/' + _len + ' - ' + $L.object[_tpe] + ' ?</p>';
        return t;
    };

    var nextStep = function() {
        // S'il s'agit d'une macro sans initial :
        if (paramTypes.length === 0) {
            executeMacro();
            canvas.getConstruction().setMode(5);
            canvas.paint();
            params = [];
            return;
        }
        if (params.length < paramTypes.length) {
            me.tagPossibleInitials();
            // Curiosité : le innerHTML semble prendre beaucoup de temps sur touchpad
            // D'où l'execution par setTimeout dans un autre Thread...
            setTimeout(function() {
                //                Li.settxt(Li.macro.name + commentMacro(params.length + 1, paramTypes.length, paramTypes[params.length]));
                Li.o().innerHTML = Li.macro.shortname + commentMacro(params.length + 1, paramTypes.length, paramTypes[params.length]);
            }, 1);
        } else {
            executeMacro();
            //            canvas.macrosManager.endMacro();
            canvas.getConstruction().setMode(5);
            canvas.paint();
            params = [];
            nextStep();
        }
    };

    this.init = function(_li, _cn) {
        params = [];
        Li = _li;
        Cn = _cn;
        nextStep();
    };

    this.addParam = function(_n) {
        params.push(_n);
        nextStep();
    };


    var executeMacro = function() {
        var s = "myexecutefunc=" + exec.toString();
        s += '\n$macroFinals=myexecutefunc("' + params.join('","') + '")';
        canvas.undoManager.beginAdd();
        canvas.InterpretMacro(s);
        canvas.undoManager.endAdd();
    };



    this.getSource = function() {
        var p = '[]',
            t = '[]';
        if (paramTypes.length > 0) {
            p = '["' + paramTypes.join('","') + '"]';
        }
        var txt = '\tname:"' + $U.native2ascii(this.name) + '",\n';
        txt += '\tparameters:' + p + ',\n';
        txt += '\texec:\n\t' + exec.toString();

        return txt;
    };
};
