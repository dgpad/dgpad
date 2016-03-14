function BlocklyObjects(_object, _construction) {
    var Cn = _construction;
    var OBJ = _object;
    var MODE = ["oncompute", "ondrag", "onmouseup"];
    var current = MODE[1];

    var obj = {};
    for (var i = 0; i < MODE.length; i++) {
        obj[MODE[i]] = new BlocklyObject(this, Cn);
    };

    this.isEmpty = function() {
        for (var i = 0; i < MODE.length; i++) {
            if (obj[MODE[i]].getXML()) return false;
        };
        return true;
    };

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
        obj[_m].evaluate()
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
            }
        };
        current = _src["current"];
    };

}

function BlocklyObject(_owner, _construction) {
    var Cn = _construction;
    var EX = null;
    var OWN = _owner;
    var type = null;
    var xml = null;
    var sync = null;
    var async = null;
    var childs = {};
    var parents = {};

    var setEX = function(_cod) {
        EX = Expression.delete(EX);
        if (_cod) EX = new Expression(OWN, _cod);
    }


    this.getXML = function() {
        return xml;
    };

    this.getSNC = function() {
        return sync;
    }

    this.setBehavior = function(_m, _xml, _sync, _async) {
        type = _m;
        xml = _xml;
        if (xml === null) {
            sync = null;
            async = null;
            setEX(null);
            if (type === "oncompute") OWN.getObj().setExpression("NaN");
        } else {
            sync = _sync.replace(/^\s*var\s*\w+\s*;/gm, "").trim();
            async = _async;
            var fname = "bl_" + $U.number2letter(Date.now().toString());
            var cod = "var " + fname + "=function(){\n";
            cod += sync;
            cod += "\n};\n" + fname + "()";
            if (type === "oncompute") {
                OWN.getObj().setExpression(cod);
                // Ceci est d'une necessité absolue et m'a valu une journée
                // de recherche, l'affichage des listes étaient incorrecte
                // sans cela :
                Cn.orderObjects();
                setEX(null);
            } else {
                setEX(cod);
                // if (EX) EX.forcevalue();
            }
        }
    };


    this.evaluate = function() {
        if (EX) {
            EX.forcevalue();
            for (var o in childs) {
                childs[o].computeChilds();
            }
        }
    };

    this.setChilds = function(_childs) {
        childs = {};
        for (var i = 0; i < _childs.length; i++) {
            var o = Cn.find(_childs[i]);
            if (o !== undefined)
                childs[o.getVarName()] = o;
        }
    };

    this.setParents = function(_parents) {
        parents = {};
        for (var i = 0; i < _parents.length; i++) {
            var o = Cn.find(_parents[i]);
            if (o !== undefined)
                parents[o.getVarName()] = o;
        }
    };


}
