//************************************************
//*************** OBJECT CONSTRUCTOR *************
//************************************************
function ObjectConstructor() {
    var C = [];

    this.getCode = function() {
        return "";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 0;
    };

    this.getInitials = function() {
        return [];
    };

    this.preview = function(ev, zc) {};

    this.getC = function(_i) {
        if (_i < C.length)
            return C[_i];
        else
            return null;
    };

    this.getCList = function() {
        return C;
    };

    this.clearC = function() {
        C = [];
    };

    this.addC = function(_obj) {
        C.push(_obj);
    };

    this.isAcceptedInitial = function(o) {
        var bool = false;
        var inis = this.getInitials();
        if (C.length < inis.length) {
            var tab = inis[C.length].split(",");
            for (var i = 0; i < tab.length; i++) {
                bool = bool || (o.isInstanceType(tab[i]));
            }
        }
        return bool;
    };

    this.isLastObject = function() {
        return true;
    };

    this.isInstantTool = function() {
        return false;
    };

    this.selectInitialObjects = function(zc) {
        //        if (C.length > 0)
        //            zc.getConstruction().addSelected(C[0]);
        if ((C.length > 0) && (!(C[0].isIndicated())))
            zc.getConstruction().addSelected(C[0]);
    };

    this.setInitialObjects = function(_sel) {
        var len = _sel.length;
        C = [];
        for (var i = 0; i < len; i++) {
            if (this.isAcceptedInitial(_sel[i])) {
                C.push(_sel[i]);
            } else {
                return;
            }
        }

    };

    // Only for preview purpose :
    this.isSelectCreatePoint = false;
    this.isNewPoint = false;

    this.selectCreatePoint = function(zc, ev) {
        this.isSelectCreatePoint = true;
        var cn = zc.getConstruction();
        var newPt = cn.getFirstIndicatedPoint();
        this.isNewPoint = (newPt === null);
        if (this.isNewPoint) {
            var pc = zc.getPointConstructor();
            if (cn.getIndicated().length > 0) {
                pc.setInitialObjects(cn.getIndicated());
            }
            newPt = pc.createObj(zc, ev);
            pc.clearC();
        }

        C.push(newPt);
    };

    this.createCallBack = function(zc, o) {};

    this.createObj = function(zc, ev) {
        if (C.length > 0) {
            var s = this.newObj(zc, C);
            zc.addObject(s);
            s.compute();
            if (zc.getConstruction().is3D())
                zc.getConstruction().computeAll();
        }
        this.createCallBack(zc, s);
        Expression.fixAll();
    };

    this.newObj = function(_zc, _C) {};

}
