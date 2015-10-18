function MagnetManager(_z) {
    var me = this;
    var zc = _z;
    var C = zc.getConstruction();
    var O = null; // origin object
    var T = null; // target object
    var M = null; // Magnets objects
    var PXY = new VirtualPointObject(0, 0); // projeté orthogonal de O sur T
    var standardM = 20; // Attirance standard
    var P = null;

    var valueChanged = function(_val) {
        if ((O === null) || (T === null)) return;
        if (_val === 0) {
            O.removeMagnet(T[0]);
            setPaintMode();
            zc.paint();
            return;
        }
        var forcepaint = (O.getMagnet(T[0]) === null);
        T = O.addMagnet(T[0], _val);
        T[1] = _val;
        standardM = _val;
        T[0].setMacroMode(3);
        if (forcepaint) {
            setPaintMode();
            zc.paint();
        }
    };

    var setPaintMode = function() {
        var V = C.elements();
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].setMacroMode(0);
        }
        ;
        if (O) O.setMacroMode(2);
        M = O.getMagnets();
        for (var i = 0; i < M.length; i++) {
            M[i][0].setMacroMode(3); // Couleur des finaux de macros
        }
    };


    me.edit = function(_o) {
        O = _o;
        zc.setMode(9);
        setPaintMode();
        T = null;
        P = new MagnetPanel(zc, valueChanged);
        P.setXY(-300, -300);
        standardM = 20;
    }

    me.add = function(_o) {
        if (_o === O) return;
        if (_o.projectXY(0, 0) === undefined) return;
        T = O.addMagnet(_o, standardM);
        setPaintMode();
        zc.paint();
        P.setValue(T[1]);
    }

    me.paint = function(ctx) {
        if ((O === null) || (T === null)) return;
        switch (T[0].getCode()) {
            case "arc3pts":
                PXY.setXY(T[0].getB().getX(), T[0].getB().getY());
                break;
            case "segment":
                PXY.setXY((T[0].getP1().getX() + T[0].getP2().getX()) / 2, (T[0].getP1().getY() + T[0].getP2().getY()) / 2);
                break;
            case "point":
                PXY.setXY(T[0].getX(), T[0].getY());
                break;
            default :
                var t = T[0].projectXY(O.getX(), O.getY());
                PXY.setXY(t[0], t[1]);
        }
        P.setXY(PXY.getX() - 152, PXY.getY() + 17);
    };



    me.quit = function() {
        if (P) P.quit();
    };

}

function MagnetPanel(_zc, _proc) {
    var me = this;
    $U.extend(this, new Panel(_zc.getDocObject()));
    me.setAttr("className", "magnetDIV bulleM");
    _zc.getDocObject().parentNode.appendChild(me.getDocObject());
    var S = new slider(me.getDocObject(), 20, 5, 280, 30, 0, 1000, 0, _proc);
    S.setValueWidth(80);
    S.setTextColor("#BBBBBB");
    S.setTabValues([[0, $L.magnet_without], 1, 2, 5, 10, 15, 20, 30, 50, 100, 200, 500, 1000, [5000, $L.magnet_max]]);
    S.setValue(20);
    S.setBackgroundColor("rgba(0,0,0,0)");
    S.setWindowsEvents();

    this.quit = function() {
        S.removeWindowsEvents();
        if (me.getDocObject().parentNode !== null) {
            _zc.getDocObject().parentNode.removeChild(me.getDocObject());
        }
    };

    this.setXY = function(_x, _y) {
        this.setStyles("left:" + _x + "px;top:" + _y + "px");
    };

    this.setValue = function(_n) {
        var t = S.getTabValues().slice(0);
        var val = t[0];
        for (var i = 1; i < t.length; i++) {
            if (Math.abs(t[i] - _n) < Math.abs(val - _n)) val = t[i];
        }
        S.setValue(val);
    };

//    me.show();


}