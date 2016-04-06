function DependsManager(_z) {
    var me = this;
    var zc = _z;
    var C = zc.getConstruction();
    var O = null; // origin object
    var M = null; // Depends objects

    //    var valueChanged = function(_val) {
    //        if ((O === null) || (T === null)) return;
    //        if (_val === 0) {
    //            O.removeMagnet(T[0]);
    //            setPaintMode();
    //            zc.paint();
    //            return;
    //        }
    //        var forcepaint = (O.getMagnet(T[0]) === null);
    //        T = O.addMagnet(T[0], _val);
    //        T[1] = _val;
    //        standardM = _val;
    //        T[0].setMacroMode(3);
    //        if (forcepaint) {
    //            setPaintMode();
    //            zc.paint();
    //        }
    //    };

    var setPaintMode = function() {
        var V = C.elements();
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].setMacroMode(0);
        }
        if (O) O.setMacroMode(2);
        M = O.getDragPoints();
        for (var i = 0; i < M.length; i++) {
            M[i].setMacroMode(3); // Couleur des finaux de macros
        }
    };


    me.edit = function(_o) {
        O = _o;
        O.initDragPoints();
        zc.setMode(11);
        setPaintMode();
    }

    me.add = function(_o) {
        if (_o === O) return;
        if (_o.getCode() !== "point") return;
        O.add_removeDragPoint(_o);
        setPaintMode();
        zc.paint();
    }




    me.quit = function() {
        //        if (P) P.quit();
    };

}
