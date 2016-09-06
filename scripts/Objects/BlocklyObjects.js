function BlocklyObjects(_object, _construction) {
    var Cn = _construction;
    var OBJ = _object;
    var MODE = [];
    var current;

    var obj = {};


    this.setMode = function(_tab, _cur) {
        MODE = _tab;
        obj = {};
        for (var i = 0; i < MODE.length; i++) {
            obj[MODE[i]] = new BlocklyObject(this, Cn);
        };
        current = _cur;
    };

    this.getMode = function() {
        return MODE;
    };

    this.isEmpty = function() {
        for (var i = 0; i < MODE.length; i++) {
            if (obj[MODE[i]].getXML()) return false;
        };
        return true;
    };

    var renameField = function(_str, _old, _new, _block, _fname) {
        // J'ai appris ici le litteral negative lookaround. La partie "(.(?!<block))*" signifie
        // qu'on accepte tout sauf la chaine littérale "<block" dans le match :
        var regex = new RegExp("(<(?:block|shadow) type=\"" + _block + "\"[^>]*>(.(?!<block))*<field name=\"" + _fname + "\">)(" + _old + ")(<\/field>)", "g")
        return _str.replace(regex, function(m, _a, _b, _c, _d) {
            return _a + _new + _d;
        });
    };

    var renameCode = function(_str, _old, _new, _func) {
        var regex = new RegExp("(" + _func + "\\\(\\\")(" + _old + ")(\\\")", "g");
        return _str.replace(regex, function(m, _a, _b, _c) {
            return  (_a + _new + _c)
        });
    };



    this.rename = function(_old, _new) {
        for (var i = 0; i < MODE.length; i++) {
            var m = MODE[i];
            // console.log()
            if (obj[m].getXML()) {
                // console.log(obj[m].getXML());
                var newXML = renameField(obj[m].getXML(), _old, _new, "turtle_length", "NAME");
                newXML = renameField(newXML, _old, _new, "turtle_get", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_point_short", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_object_short", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_point_short_turtle", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_coordinate", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_set_object", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_object", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_style_fix", "OBJECT");
                obj[m].setXML(newXML);

                var newCODE = renameCode(obj[m].getCode().replace(/\\\"/g,'"'), _old, _new, "TURTLE_GET");
                newCODE = renameCode(newCODE, _old, _new, "TURTLE_LENGTH");
                newCODE = renameCode(newCODE, _old, _new, "TURTLE_INIT");
                obj[m].setCode(newCODE);
            }
        }
    }

    this.getCn = function() {
        return Cn
    };

    this.getObj = function() {
        return OBJ;
    };

    this.clear = function() {
        for (myobj in obj) {
            myobj.setSource(null, null, null);
        }
    };

    this.setCurrent = function(_c) {
        current = _c;
    };

    this.getCurrent = function() {
        return current;
    };

    this.getCurrentObj = function() {
        return obj[current];
    };

    this.getCurrentXML = function() {
        return obj[current].getXML();
    };

    this.get = function(_m) {
        return obj[_m]
    };

    this.getXML = function(_m) {
        return obj[_m].getXML();
    };

    this.getSNC = function(_m) {
        return obj[_m].getSNC();
    };

    this.setChilds = function(_m, _childs) {
        obj[_m].setChilds(_childs);
    };

    this.setParents = function(_m, _childs) {
        obj[_m].setParents(_childs);
    };

    this.evaluate = function(_m) {
        if (obj[_m]) obj[_m].evaluate()
    };

    // Called on each workspace change (and load time) :
    this.setBehavior = function(_m, _xml, _sync, _async) {
        obj[_m].setBehavior(_m, _xml, _sync, _async)
    };

    this.getSource = function() {
        var src = {};
        for (var i = 0; i < MODE.length; i++) {
            var m = MODE[i];
            if (obj[m].getXML()) {
                src[m] = {};
                src[m]["xml"] = obj[m].getXML();
                src[m]["sync"] = obj[m].getSNC();
                var tab = obj[m].getChilds();
                if (tab.length > 0) src[m]["childs"] = tab;
                tab = obj[m].getParents();
                if (tab.length > 0) src[m]["parents"] = tab;
            }
        };
        src["current"] = current;
        return JSON.stringify(src);
    };

    this.setSource = function(_src) {
        for (var i = 0; i < MODE.length; i++) {
            if (_src.hasOwnProperty(MODE[i])) {
                var m = MODE[i];
                obj[m].setBehavior(m, _src[m]["xml"], _src[m]["sync"], null);
                if (_src[m].hasOwnProperty("childs")) obj[m].setChilds(_src[m]["childs"]);
                if (_src[m].hasOwnProperty("parents")) obj[m].setParents(_src[m]["parents"]);
            }
        };
        current = _src["current"];
    };

}

function BlocklyObject(_owner, _construction) {
    var Cn = _construction;
    var EX = null;
    var EXP = null;
    var OWN = _owner;
    var type = null;
    var xml = null;
    var sync = null;
    var async = null;
    var childs = {};
    var parents = {};

    var setEX = function(_cod) {
        EX = Expression.delete(EX);
        if (_cod) {
            EX = new Expression(OWN, _cod);
            Expression.delete(EX);
        }
    }

    this.getCode = function() {
        if (EX) {
            return EX.getSource()
        } else if (EXP) {
            return EXP.getExpression()
        }
        return ""
    }

    this.setCode = function(_cod) {
        if (type === "onlogo") {
            var startpt = OWN.getObj().getVarName();
            EXP = Cn.getTurtleExpression(startpt);
            EXP.setExpression(_cod);
            setEX(null);
            // var SNC = "";
            _cod.replace(/var .*\nTURTLE_INIT.*\n((?:.*\n)*)return TURTLE_RESULT.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        } else if (type === "oncompute") {
            EXP = OWN.getObj();
            EXP.setExpression(_cod);
            setEX(null);
            // var SNC = "";
            _cod.replace(/var .*\n((?:.*\n)*)};\nbl_.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        } else {
            EXP = null;
            setEX(_cod);
            // var SNC = "";
            _cod.replace(/var .*\n((?:.*\n)*)};\nbl_.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        }
    }


    this.getXML = function() {
        return xml;
    };

    this.setXML = function(_xml) {
        xml = _xml
    };

    this.getSNC = function() {
        return sync;
    };

    this.setSNC = function(_snc) {
        sync = _snc;
    };

    this.setBehavior = function(_m, _xml, _sync, _async) {
        type = _m;
        xml = _xml;
        // console.log("_m=" + _m + "\n_xml=" + _xml + "\n_sync=" + _sync);
        if (xml === null) {
            sync = null;
            async = null;
            setEX(null);
            if (type === "oncompute") OWN.getObj().setExpression("NaN");
            if (type === "onlogo") Cn.removeTurtleExpression(OWN.getObj().getVarName());
        } else {
            sync = _sync.replace(/^\s*var\s*\w+\s*;/gm, "").trim();
            // console.log("SYNC="+sync);
            async = _async;
            var cod = "";
            if (type === "onlogo") {
                Cn.setDEG(true);
                var startpt = OWN.getObj().getVarName();
                EXP = Cn.createTurtleExpression(startpt);

                // Entier aléatoire entre 1 et 1 000 000 000 :
                var rand = (Math.floor(Math.random() * (Math.abs(1 - 1000000000) + 1) + (1 + 1000000000 - Math.abs(1 - 1000000000)) / 2));

                var fname = "bl_" + $U.number2letter(rand.toString());
                cod += "var " + fname + "=function(){\n";

                cod += "TURTLE_INIT(\"" + startpt + "\"," + startpt + ");\n";
                cod += sync;
                cod += "\nreturn TURTLE_RESULT()";

                cod += "\n};\n" + fname + "()";

                EXP.setExpression(cod);
                setEX(null);
                // console.log("CODE TORTUE = "+cod);
            } else {
                var fname = "bl_" + $U.number2letter(Date.now().toString());
                cod = "var " + fname + "=function(){\n";
                cod += sync;
                cod += "\n};\n" + fname + "()";
                if (type === "oncompute") {
                    EXP = OWN.getObj();
                    EXP.setExpression(cod);
                    // console.log("CODE="+cod);
                    setEX(null);
                } else {
                    setEX(cod);
                }
            }
        }
    };


    this.evaluate = function() {
        if (EX) {
            EX.forcevalue();
            for (var o in childs) {
                childs[o].compute();
                childs[o].computeChilds();
            }
        }
    };

    this.setChilds = function(_childs) {
        childs = {};
        for (var i = 0; i < _childs.length; i++) {
            var o = Cn.findVar(_childs[i]);
            if ((o === undefined) ||
                (o.getVarName() === OWN.getObj().getVarName())) continue;
            childs[o.getVarName()] = o;
        }
    };

    this.getChilds = function() {
        var ch = [];
        for (var o in childs) {
            ch.push(o);
        }
        return ch;
    };

    this.setParents = function(_parents) {
        parents = {};
        for (var i = 0; i < _parents.length; i++) {
            var o = Cn.findVar(_parents[i]);
            if ((o === undefined) ||
                (o.getVarName() === OWN.getObj().getVarName())) continue;
            parents[o.getVarName()] = o;
        }
    };

    this.getParents = function() {
        var ch = [];
        for (var o in parents) {
            ch.push(o);
        }
        return ch;
    };


}
