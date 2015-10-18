
function UndoManager(_canvas) {
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var actions = [];
    var cursor = 0;
    var me = this;
    var Cmarker = null; // Marqueur pour les objets de la construction
    var Tmarker = null; // Marqueur pour les textes

    var ADD = true, REMOVE = false;

    var isLeft = function () {
        return (cursor === 0);
    };

    var isRight = function () {
        return (cursor === actions.length);
    };

    var refreshCanvas = function () {
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mouseup", true, true, window, 1,
                -100, -100,
                -100, -100, false,
                false, false, false, 0, null);
        Cn.validate(simulatedEvent);
        Cn.computeAll();
        canvas.paint(simulatedEvent);
        me.setBtns();
    };

    var add = function (_o) {
        var _el = _o;
        if (_o instanceof TextObject) {
            _el = canvas.textManager.add(_o)
        } else {
            Cn.add(_o);
            _o.setParentList(_o.getParent());
        }
        return _el;
    };

    var remove = function (_o) {
        if (_o instanceof TextObject) {
            canvas.textManager.deleteTeX(_o);
        } else {
            Cn.remove(_o);
        }
    };


    var undo_redo = function (k) {
        var t = actions[k];
        t.add = !t.add;
        var tab = ($U.isArray(t.target)) ? t.target : [t.target];
        var len = tab.length;
        for (var i = 0; i < len; i++) {
            if (t.add)
                tab[i] = add(tab[i]);
//                Cn.add(tab[i]);
            else
                remove(tab[i]);
//                Cn.remove(tab[i]);
//            if (t.add)
//                tab[i].setParentList(tab[i].getParent());
        }

    };

    me.clear = function () {
        actions = [];
        cursor = 0;
        refreshCanvas();
    };


    this.record = function (_t, _add) {
        if (cursor < actions.length) {
            me.clear();
        }
        cursor++;
        actions.push({add: _add, target: _t});
        this.setBtns();
    };

    this.undo = function () {
        if (cursor > 0) {
            undo_redo(cursor - 1);
            cursor--;
        }
        refreshCanvas();
    };

    this.redo = function () {
        if (cursor < actions.length) {
            undo_redo(cursor);
            cursor++;
        }
        refreshCanvas();
    };


    this.beginAdd = function () {
        Cmarker = Cn.elements().length;
        Tmarker = canvas.textManager.elements().length;
    };

    this.endAdd = function () {
        if ((Cmarker === null) && (Tmarker === null))
            return;
        var v = Cn.elements();
        var t = canvas.textManager.elements();
        var elts = [];
        for (var m = Cmarker; m < v.length; m++) {
            elts.push(v[m]);
        }
        for (var m = Tmarker; m < t.length; m++) {
            elts.push(t[m]);
        }
        if (elts.length > 0) {
            this.record(elts, true);
        }



        Cmarker = null;
        Tmarker = null;
    };

    this.deleteObjs = function (_t) {
        if (_t.length > 0)
            this.record(_t, false);
    };

    this.swap = function (_o) {
        for (var i = 0; i < actions.length; i++) {
            var tab = ($U.isArray(actions[i].target)) ? actions[i].target : [actions[i].target];
            if ((tab.length === 1) && (tab[0] === _o))
                actions[i].add = !actions[i].add;
        }
    };

    this.setBtns = function () {
        canvas.setUndoBtn(!isLeft());
        canvas.setRedoBtn(!isRight());
    };
}
