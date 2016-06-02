//************************************************
//************** CONSTRUCTION  *******************
//************************************************

function Construction(_canvas) {
    // mode 1 pour pointeur, 2 pour gomme, 3 pour poubelle  
    var me = this;
    var canvas = _canvas;
    // Hallucinants pointeurs javascript :
    me.mouseX = canvas.mouseX;
    me.mouseY = canvas.mouseY;
    me.prefs = canvas.prefs;
    var mode3D = false;
    var ORG3D = null;


    //    var mode3D=false;
    var mode = 1;
    // All construction objects :
    var V = [];
    // Tableau associatif correspondant aux objets (AO[nom]=<objet>) :
    var AO = {};
    // Tableau associatif correspondant aux variables (AV[nom]=nom unique de variable JS) :
    var AV = {};
    var serial = 1;

    // Tableau associatif collectant les noms de variables VARS[nom unique de variable JS]=nom :
    var VARS = {};

    // Degree mode for angle calculus :
    var DEGmode = true;

    // User can drag all types of objects or only moveable objects :
    var DragOnlyMoveable = true;


    me.createTurtleExpression = function(_startpt) {
        var name = "blk_turtle_exp_" + _startpt;
        var o = me.find(name);
        if (!o) {
            o = new ExpressionObject(me, name, "", "", "", "NaN", 50, 50);
            o.setHidden(2);
            me.add(o);
            var listname = "blk_turtle_list_" + _startpt;
            var lst = new ListObject(me, listname, o);
            lst.setSegmentsSize(1);
            lst.setSize(0);
            lst.setNoMouseInside(true);
            me.add(lst);
        };
        return o;
    };

    me.removeTurtleExpression = function(_startpt) {
        var exp = me.find("blk_turtle_exp_" + _startpt);
        var lst = me.find("blk_turtle_list_" + _startpt);
        if (exp) {
            me.remove(lst);
            me.remove(exp);
        };
    };

    me.getObjectsFromType = function(_t) {
        var tab = [];
        for (var i = 0; i < V.length; i++) {
            if (V[i].getCode() === "expression_cursor") continue;
            if (V[i].isHidden()) continue;
            if (_t === "any") tab.push(V[i])
            else if ((V[i].getCode() === _t) || ((V[i].getFamilyCode() === _t))) tab.push(V[i])
        };
        return tab
    };



    me.isDragOnlyMoveable = function() {
        return DragOnlyMoveable;
    };
    me.setDragOnlyMoveable = function(_d) {
        DragOnlyMoveable = _d
    };

    me.isDEG = function() {
        return DEGmode;
    };

    me.setDEG = function(_d) {
        DEGmode = _d;
        canvas.getInterpreter().setDegreeMode(_d);
    };

    me.cos = function(_a) {
        return Math.cos(DEGmode ? _a * Math.PI / 180 : _a);
    };
    me.sin = function(_a) {
        return Math.sin(DEGmode ? _a * Math.PI / 180 : _a);
    };
    me.tan = function(_a) {
        return Math.tan(DEGmode ? _a * Math.PI / 180 : _a);
    };

    me.getInterpreter = function() {
        return canvas.getInterpreter();
    };

    me.getTrackManager = function() {
        return canvas.trackManager;
    };


    // Crée un nom de variable JS nouveau pour l'objet de nom s (et l'ajoute au catalogue VARS) :
    var getNewVarName = function(s) {
        //        console.log("getNewVarName");
        var v = $U.leaveAccents(s);
        if (VARS.hasOwnProperty(v)) {
            var b = 1;
            while (VARS.hasOwnProperty(v + b)) {
                b++
            }
            v = v + b;
        }
        VARS[v] = s;
        return v;
    };


    me.getVarName = function(_n) {
        if (AV.hasOwnProperty(_n))
            return AV[_n];
        else
            return getNewVarName(_n);
    };

    me.isVarName = function(_n) {
        return (AV.hasOwnProperty(_n));
    };


    me.getCanvas = function() {
        return canvas;
    };
    me.getSerial = function() {
        return (serial++);
    };






    me.getBounds = function() {
        return canvas.getBounds();
    };
    me.getHeight = function() {
        return (canvas.getBounds().height - canvas.prefs.controlpanel.size);
    };
    me.getWidth = function() {
        return (canvas.getBounds().width);
    };
    me.coordsSystem = new CoordsSystem(me);

    me.reconstructChilds = function() {
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].clearChildList();
        }
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].setParentList(V[i].getParent());
        }
    };



    var paintSortFilter = function(a, b) {
        if (a.getLayer() !== b.getLayer())
            return (a.getLayer() - b.getLayer());
        var ap = a.isInstanceType("point");
        var bp = b.isInstanceType("point");
        if (ap && bp)
            return (a.getPaintOrder() - b.getPaintOrder());
        else if (ap)
            return 1;
        else if (bp)
            return -1;
        else
            return (a.getPaintOrder() - b.getPaintOrder());
    };


    //    var standardPaint = function(ctx) {
    //////        console.log("standardPaint");
    ////        me.coordsSystem.paint(ctx);
    ////        // Réalise une copie de l'array V :
    ////        var Objs = V.slice(0);
    ////        // Les points doivent être dessinés en dernier :
    ////        Objs.sort(paintSortFilter);
    //        ctx.shadowColor = '';
    //        ctx.shadowBlur = 0;
    //        ctx.shadowOffsetX = 0;
    //        ctx.shadowOffsetY = 0;
    //        for (var i = 0, len = V.length; i < len; i++) {
    //            V[i].paint(ctx);
    //        }
    //    };

    var standardPaint = function(ctx, coords) {
        //        ctx.beginPath();
        me.coordsSystem.paint(ctx);
        // Réalise une copie de l'array V :
        var Objs = V.slice(0);
        // Les points doivent être dessinés en dernier :
        Objs.sort(paintSortFilter);
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        for (var i = 0, len = Objs.length; i < len; i++) {
            Objs[i].paint(ctx);
        }
        _canvas.magnifyManager.magnifierPaint(coords);
        _canvas.blocklyManager.paintTurtle();
    };

    var macroPaint = function(ctx, coords) {
        //        console.log("macropaint");
        standardPaint(ctx, coords);
        ctx.globalAlpha = 1;
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        var b = canvas.getBounds();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(0, 0, b.width, b.height);

        var Objs = V.slice(0);
        Objs.sort(paintSortFilter);
        for (var i = 0, len = Objs.length; i < len; i++) {
            switch (Objs[i].getMacroMode()) {
                case 0:
                    // neutre
                    break;
                case 1:
                    // Intermédiaire
                    Objs[i].paint(ctx);
                    break;
                case 2:
                    // Initial
                    Objs[i].paint(ctx);
                    break;
                case 3:
                    Objs[i].paint(ctx);
                    // Final
                    break;
            }
        }
    };

    var magnetPaint = function(ctx, coords) {
        //        canvas.magnetManager.paint(ctx);
        macroPaint(ctx, coords);
        canvas.magnetManager.paint(ctx);
        //        canvas.magnetManager.paintIcon(ctx);

    };

    var macroEXEPaint = function(ctx, coords) {
        standardPaint(ctx, coords);
        ctx.globalAlpha = 1;
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        var b = canvas.getBounds();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(0, 0, b.width, b.height);

        var Objs = V.slice(0);
        Objs.sort(paintSortFilter);
        for (var i = 0, len = Objs.length; i < len; i++) {
            switch (Objs[i].getMacroMode()) {
                case 0:
                    // neutre
                    break;
                case 4:
                    // Initial possible
                    Objs[i].paint(ctx);
                    break;
                case 5:
                    // Initial choisi
                    Objs[i].paint(ctx);
                    break;
            }
        }
    };

    var deletePaint = function(ctx, coords) {
        standardPaint(ctx, coords);
        ctx.globalAlpha = 1;
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        var b = canvas.getBounds();
        ctx.fillStyle = "rgba(50,0,0,0.3)";
        ctx.fillRect(0, 0, b.width, b.height);
    };

    me.paint = standardPaint;

    var setObjectsMode = function(_mode) {
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].setMode(_mode);
        }
    };

    // mode 1 pour pointeur, 2 pour gomme, 3 pour poubelle, 
    // 4 pour construction de macros, 5 pour execution de macros
    // 6 pour les propriétés, 7 pour le tracé, 9 pour le magnetisme,
    // 11 pour la dépendance :
    me.setMode = function(_mode) {
        mode = _mode;
        setObjectsMode(mode);
        me.clearMacroMode();
        // me.showAnimations(mode<2);
        switch (mode) {
            case 0:
                me.paint = standardPaint;
                break;
            case 1:
                me.paint = standardPaint;
                break;
            case 2:
                me.paint = standardPaint;
                break;
            case 3:
                me.paint = deletePaint;
                break;
            case 4:
                me.paint = macroPaint;
                break;
            case 5:
                me.paint = macroEXEPaint;
                break;
            case 6:
                me.paint = standardPaint;
                break;
            case 7:
                me.paint = standardPaint;
                break;
            case 8:
                me.paint = standardPaint;
                break;
            case 9:
                me.paint = magnetPaint;
                break;
            case 11:
                me.paint = macroPaint;
                break;
        }
    };

    me.getMode = function() {
        return mode;
    };
    me.isMode = function() {
        var res = false;
        for (var i = 0; i < arguments.length; i++) {
            res = res || (mode === arguments[i]);
        }
        return res;
    };
    me.isConsultOrArrowMode = function() {
        return (mode === 0 || mode === 1);
    };
    me.isConsultMode = function() {
        return (mode === 0);
    };
    me.isArrowMode = function() {
        return (mode === 1);
    };
    me.isHideMode = function() {
        return (mode === 2);
    };
    me.isDeleteMode = function() {
        return (mode === 3);
    };
    me.isMacroMode = function() {
        return (mode === 4);
    };
    me.isMacroEXEMode = function() {
        return (mode === 5);
    };
    me.isPropertiesMode = function() {
        return (mode === 6);
    };

    me.add = function(_obj) {
        $U.changed();
        AO[_obj.getName()] = _obj;
        AV[_obj.getName()] = me.getVarName(_obj.getName());
        V.push(_obj);
    };


    // Quand on est sûr que le nom correspond au nom de variable :
    me.Quickadd = function(_obj) {
        var n = _obj.getName();
        AO[n] = _obj;
        AV[n] = n;
        VARS[n] = n;
        V[V.length] = _obj;
    };

    me.deleteAll = function() {
        mode3D = false;
        ORG3D = null;
        mode = 1;
        V = [];
        AO = {};
        AV = {};
        serial = 1;
        VARS = {};
        me.paint = standardPaint;
        indicatedObjs = [];
        selectedObjs = [];
        me.computeAll = computeAll2D;
        params = [];
        varnames = [];
        canvas.getInterpreter().BLK_GLOB_DELETE();
    };

    me.setAllSize = function(_type, _sze) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setSize(_sze);
        }
    };
    me.setAllSegSize = function(_type, _sze) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type) {
                if ((_sze === 0) && (V[i].getSize() === 0)) {
                    V[i].setSize(0.1);
                }
                V[i].setSegmentsSize(_sze);
            }
        }
    };
    me.setAllColor = function(_type, _col) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setColor(_col);
        }
    };
    me.setAllOpacity = function(_type, _alpha) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setOpacity(_alpha);
        }
    };
    me.setAllLayer = function(_type, _lay) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setLayer(_lay);
        }
    };
    me.setAllPtShape = function(_shape) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === "point")
                V[i].setShape(_shape);
        }
    };
    me.setAllFontSize = function(_type, _v) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setFontSize(_v);
        }
    };
    me.setAllPrecision = function(_type, _v) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type) {
                V[i].setPrecision(_v);
                if ((_type === "locus") || (_type === "quadric")) {
                    V[i].compute();
                    //                    V[i].computeChilds();
                }
            }

        }
    };
    me.setAllIncrement = function(_type, _v) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setIncrement(_v);
        }
    };
    me.setAllDash = function(_type, _v) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setDash(_v);
        }
    };
    me.setAll360 = function(_type, _is360) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].set360(_is360);
        }
    };
    me.setAllTrigo = function(_type, _t) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setTrigo(_t);
        }
    };
    me.setAllNoMouse = function(_type, _v) {
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].getFamilyCode() === _type)
                V[i].setNoMouseInside(_v);
        }
    };

    me.elements = function() {
        return (V);
    };
    me.isEmpty = function() {
        return (V.length === 0);
    };

    // homothétie de centre (_x;_y) et de rapport _h :
    me.zoom = function(_x, _y, _h) {
        $U.changed();
        me.coordsSystem.zoom(_x, _y, _h);
    };

    // translation de vecteur (_x;_y) :
    me.translate = function(_x, _y) {
        $U.changed();
        me.coordsSystem.translate(_x, _y);
    };

    me.translateANDzoom = function(_xt, _yt, _xz, _yz, _h) {
        $U.changed();
        me.coordsSystem.translateANDzoom(_xt, _yt, _xz, _yz, _h);
    };


    me.findCoincidents = function(_t) {
        if (_t.length < 2)
            return null;
        var c = [_t[0]];
        for (var i = 1, len = _t.length; i < len; i++) {
            if (_t[0].isCoincident(_t[i]))
                c.push(_t[i]);
        }
        if (c.length === 1)
            return null;
        else
            return c;
    };

    me.getNames = function() {
        return Object.keys(AO);
    };



    me.find = function(_oName) {
        return AO[_oName];
    };

    me.findVar = function(_vName) {
        return AO[VARS[_vName]];
    };

    var slowfind = function(_oName, _o) {
        var len = V.length;
        for (var i = 0; i < len; i++) {
            if (V[i] === _o)
                continue;
            if (_oName === V[i].getName())
                return V[i];
        }
        return null;
    };


    var uniqueName = function(_name, _o) {
        var name = _name;
        var basename = _name;
        var num = 0;
        while (slowfind(name, _o)) {
            name = basename + num;
            num++;
        }
        return name;
    };





    var genericName = function(_base, _o) {
        var baseName = "";
        if (_base) {
            baseName = _base;
        } else {
            baseName = "O";
        }
        var num = 1;
        while (slowfind(baseName + num, _o)) {
            num++;
        }
        return (baseName + num);
    };

    // Pour l'affichage des indices des noms d'objets :
    me.getSubName = function(_n) {
        var t = _n.toString().split("");
        var n = [];
        var i = t.length - 1;
        while ((i >= 0) && (!isNaN(t[i]))) {
            n.push(String.fromCharCode(8320 + parseInt(t[i])));
            i--;
        }
        n.reverse();
        var s = t.slice(0, i + 1).join("") + n.join("");
        return (s);
    };

    me.getUnusedName = function(_n, _o) {
        switch (_n) {
            case "":
                _n = "_O";
                break;
                // A partir de là, on traite les "mots" réservés :
                // case "x":
                //     _n = "_x";
                //     break;
                // case "y":
                //     _n = "_y";
                //     break;
                // case "d":
                //     _n = "_d";
                //     break;
        }
        _n = _n.replace(/\"/g, "");
        var n = (_n.charAt(0) === "_") ? genericName(_n.slice(1), _o) : uniqueName(_n, _o);
        if (_o.getName) {
            delete AO[_o.getName()];
            delete VARS[AV[_o.getName()]];
            delete AV[_o.getName()];
        }
        AO[n] = _o;
        AV[n] = me.getVarName(n);
        return n;
    };


    var findFreePointsRecursive = function(_o) {
        if (_o.Flag)
            return;
        _o.Flag = true;
        if ((_o.getCode() === "point") && (_o.isMoveable()))
            _o.Flag2 = true;
        for (var i = 0, len = _o.getParentLength(); i < len; i++) {
            var t = findFreePointsRecursive(_o.getParentAt(i));
        }
    };

    // Cherche les points libres parmi tous les parents
    // d'un objet donné, et renvoie ces parents dans un tableau :
    me.findFreePoints = function(_o) {
        if ((_o.getCode() === "point") && (_o.isMoveable()) && (_o.getParentLength() === 1))
            return [_o];
        var len = V.length;
        for (var i = 0; i < len; i++) {
            V[i].Flag = false;
            V[i].Flag2 = false;
        }
        findFreePointsRecursive(_o);
        var t = [];
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].Flag2) {
                t.push(V[i]);
            }
        }
        return t;
    };



    //    me.printAV = function() {
    //        for (var nom_indice in AV) {
    //            console.log(nom_indice + ":" + AV[nom_indice].getName());
    //        }
    //    }

    var dependsOnRecursive = function(o, on) {
        o.Flag = true;
        if (o === on)
            return true;

        var o1 = o.getParent();
        var len = o1.length;
        for (var i = 0; i < len; i++) {
            if ((o1[i] === o) || (o1[i].Flag)) {
                continue;
            }
            if (dependsOnRecursive(o1[i], on)) {
                return true;
            }
        }
        return false;
    };

    var dependsOn = function(o, on) {
        var len = V.length;
        for (var i = 0; i < len; i++) {
            V[i].Flag = false;
        }
        return dependsOnRecursive(o, on);
    };

    me.remove = function(_o) {
        $U.changed();
        var i = V.indexOf(_o);
        if (i !== -1) {
            V.splice(i, 1);
            if (_o.getName) {
                delete AO[_o.getName()];
                delete VARS[AV[_o.getName()]];
                delete AV[_o.getName()];
            }
        }
        for (var k = 0, len = V.length; k < len; k++) {
            V[k].deleteChild(_o);
        }
    };

    me.safelyDelete = function(_o) {
        _o = (_o.objToDelete) ? _o.objToDelete() : _o;
        var deleteObjs = [];
        var len = V.length;
        for (var i = 0; i < len; i++) {
            if (dependsOn(V[i], _o)) {
                deleteObjs.push(V[i]);
            }
        }
        len = deleteObjs.length;
        for (var i = 0; i < len; i++) {
            me.remove(deleteObjs[i]);
        }
        return deleteObjs;
    };



    /* Indicated objects
     * Actualised by each validate call :
     */
    var indicatedObjs = [];
    me.addIndicated = function(obj) {
        indicatedObjs.push(obj);
    };
    me.clearIndicated = function() {
        var len = indicatedObjs.length;
        for (var i = 0; i < len; i++) {
            indicatedObjs[i].setIndicated(false);
        }
        indicatedObjs = [];
    };
    me.getIndicated = function() {
        return indicatedObjs;
    };
    me.getFirstIndicatedPoint = function() {
        var len = indicatedObjs.length;
        var P1 = null;
        for (var i = 0; i < len; i++) {
            if (indicatedObjs[i].isInstanceType("point")) {
                P1 = indicatedObjs[i];
                return P1;
            }
        }
        return null;
    };
    var getLastPoint_sortFilter = function(a, b) {
        if (b.getTimeStamp() > a.getTimeStamp())
            return 1;
        return -1;
    };
    me.getLastPoint = function() {
        var len = V.length;
        var pts = [];
        for (var i = 0; i < len; i++) {
            if ((V[i].isInstanceType("point")) && (V[i].getTimeStamp())) {
                pts.push(V[i]);
            }
        }
        if (pts.length > 0) {
            pts.sort(getLastPoint_sortFilter);
            return pts[0];
        }
        return null;
    }

    /* Selected objects
     * Actualised by each validate call :
     */
    var selectedObjs = [];
    me.getSelected = function() {
        return selectedObjs;
    };

    me.addSelected = function(obj) {
        obj.setSelected(true);
        selectedObjs.push(obj);
    };

    me.clearSelected = function() {
        var len = selectedObjs.length;
        for (var i = 0; i < len; i++) {
            selectedObjs[i].setSelected(false);
        }
        selectedObjs = [];
    };

    me.getObjectsUnderMouse = function(ev) {
        var t = [];
        var hmode = me.isHideMode();
        for (var i = 0, len = V.length; i < len; i++) {
            if (!V[i].isSuperHidden()) {
                if ((hmode && V[i].getMode() === 2) || (!V[i].isHidden())) {
                    if (V[i].mouseInside(ev))
                        t.push(V[i]);
                }
            }
        }
        return t;
    }



    var doOrderSortFilter = function(a, b) {
        return (a.Scratch === b.Scratch) ? (a.Index - b.Index) : (a.Scratch - b.Scratch);
    };


    me.doOrder = function(_tab) {
        var n = _tab.length;
        if (n === 0) {
            return;
        }
        for (var i = 0; i < n; i++) {
            _tab[i].Scratch = 0;
            _tab[i].Flag = false;
            _tab[i].Index = i;
        }
        // Compute tail chain length for all objects recursively :
        for (i = 0; i < n; i++) {
            countTail(_tab[i]);
        }
        _tab.sort(doOrderSortFilter);
    };




    var countTail = function(o) {
        if (o.Flag) {
            return o.Scratch;
        }
        o.Flag = true;
        var max = 0;
        var objs = o.getParent();
        if (objs.length === 0) {
            o.Scratch = 0;
        } else {
            var len = objs.length;
            for (var i = 0; i < len; i++) {
                if (objs[i] === o) {
                    continue;
                }
                var k = countTail(objs[i]);
                if (k > max) {
                    max = k;
                }
            }
            o.Scratch = max + 1;
        }
        return o.Scratch;
    };

    me.orderObjects = function() {
        me.doOrder(V);
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].orderChildList();
        }
    };

    //    var rawValidate = function(ev) {
    //        indicatedObjs = [];
    //        selectedObjs = [];
    //        for (var i = 0, len = V.length; i < len; i++) {
    //            V[i].validate(ev);
    //        }
    //    };

    var rawValidate = function(ev) {

        indicatedObjs = [];
        selectedObjs = [];
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].setIndicated(V[i].validate(ev))) {
                indicatedObjs.push(V[i]);
            }
        }
    };

    var applyValidateFilters = function(ev) {
        var len = indicatedObjs.length;
        if (len > 1) {
            for (var i = len - 1; i >= 0; i--) {
                var obj = indicatedObjs[i];
                // Si un point figure dans les indicatedObjs, on ne garde que 
                // les point indicated :
                if (obj.isInstanceType("point")) {
                    var t = [obj];
                    for (var j = i - 1; j >= 0; j--) {
                        obj = indicatedObjs[j];
                        if (obj.isInstanceType("point")) {
                            t.push(obj);
                        }
                    }
                    me.clearIndicated();
                    for (var k = 0, len = t.length; k < len; k++) {
                        t[k].setIndicated(true);
                        me.addIndicated(t[k]);
                    }
                    break;
                }
            }
        }
        //        if (ev.type === "mouseup") {
        //            len = indicatedObjs.length;
        //            for (i = 0; i < len; i++) {
        //                me.addSelected(indicatedObjs[i]);
        //            }
        //        }
    };

    me.validate = function(ev) {
        rawValidate(ev);
        applyValidateFilters(ev);
    };

    //    var clearAllIndicated = function() {
    //        for (var i = 0, len = V.length; i < len; i++) {
    //            V[i].setIndicated(false);
    //        }
    //    };
    //
    //    me.validate = function(ev) {
    //        indicatedObjs = [];
    //        selectedObjs = [];
    //        for (var i = 0, len = V.length; i < len; i++) {
    //            if (V[i].setIndicated(V[i].validate(ev))) {
    //                if ((V[i].isInstanceType("point"))) {
    //                    clearAllIndicated();
    //                    indicatedObjs = [V[i]];
    //                    V[i].setIndicated(true);
    //                    return;
    //                } else indicatedObjs.push(V[i]);
    //            }
    //        }
    //    };


    me.compute = function() {};

    // Recherche l'origine du repère 3D parmi les 
    // parents du point _P :
    var get3DOriginInParents = function(_P) {
        if (_P.getFloat())
            return _P;
        var par = _P.getParent();
        for (var i = 0, len = par.length; i < len; i++) {
            return me.get3DOrigin(par[i]);
        }
        return null;
    };

    // Retourne l'origine du repère 3D auquel
    // l'objet _P est lié :
    me.get3DOrigin = function(_P) {
        if (ORG3D)
            return ORG3D;
        var Org3D = (_P === null) ? null : get3DOriginInParents(_P);
        if (Org3D === null) {
            // Si l'origine n'a pas été trouvée parmi
            // les parents de P, on prend le premier
            // point flottant rencontré dans la construction
            // comme origine du repère 3D :
            for (var i = 0, len = V.length; i < len; i++) {
                if (V[i].getFloat())
                    return V[i];
            }
        }
        return Org3D;
    };

    me.isOrigin3D = function(_P) {
        return (_P === ORG3D);
    };
    me.setOrigin3D = function(_P) {
        if ((mode3D) && (ORG3D === null))
            ORG3D = _P;
    };

    // Methode obsolete, maintenue pour la 
    // compatibilité des figures 3D d'avant
    // le 22 novembre 2013 :
    me.set3DMode = function(_b) {
        if (_b) {
            me.computeAll = computeAll3D;
        } else {
            me.computeAll = computeAll2D;
        }
    };
    // idem :
    me.is3DMode = function() {
        return (me.computeAll === computeAll3D);
    };


    me.set3D = function(_b) {
        me.computeAll = (_b) ? computeAll3D : computeAll2D;
        mode3D = _b;
    };

    me.is3D = function() {
        return (mode3D);
    };


    var DELTA_PHI = 0.2;
    var PHI = [0, 0];
    var OLD_PHI = 0;

    me.getPhi = function() {
        return PHI;
    };
    me.getTheta = function() {
        return canvas.getInterpreter().getEX().EX_theta();
    };

    var compute3D_filter = function() {};
    me.setcompute3D_filter = function(_proc) {
        compute3D_filter = _proc;
    };
    me.clearcompute3D_filter = function() {
        compute3D_filter = function() {};
    };

    var computeAll3D = function() {
        var realPhiFunc = canvas.getInterpreter().getEX().EX_phi;
        var realphi = realPhiFunc();
        var myphi = realphi + DELTA_PHI;
        var myPhiFunc = function() {
            return myphi;
        };
        var len = V.length;
        // console.log("********* PREMIER DECALAGE");
        canvas.getInterpreter().getEX().EX_phi = myPhiFunc;
        PHI = [OLD_PHI, realphi + DELTA_PHI];
        for (var i = 0; i < len; i++) {
            V[i].compute();
        }
        compute3D_filter();
        canvas.textManager.compute();
        for (var i = 0; i < len; i++) {
            V[i].storeX();
        }

        // console.log("********* SECOND DECALAGE");
        canvas.getInterpreter().getEX().EX_phi = realPhiFunc;
        PHI = [realphi + DELTA_PHI, realphi];
        for (var i = 0; i < len; i++) {
            V[i].compute();
        }
        compute3D_filter();
        canvas.textManager.compute();
        for (var i = 0; i < len; i++) {
            V[i].storeX();
        }

        OLD_PHI = realphi;
    };

    var computeAll2D = function() {
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].compute();
        }
    };

    me.computeAll = computeAll2D;

    me.computeChilds = function(t) {
        for (var i = 0, leni = t.length; i < leni; i++) {
            var chlds = t[i].getChildList();
            for (var k = 0, lenk = chlds.length; k < lenk; k++) {
                chlds[k].Flag = true;
            }
        }
        for (var i = 0, leni = t.length; i < leni; i++) {
            var chlds = t[i].getChildList();
            for (var k = 0, lenk = chlds.length; k < lenk; k++) {
                if (chlds[k].Flag) {
                    chlds[k].compute();
                    chlds[k].Flag = false;
                }
            }
        }
    };

    me.computeMagnetObjects = function() {
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].computeMagnets();
        }
    };

    me.isAxisUsed = function() {
        for (var i = 0, len = V.length; i < len; i++) {
            for (var j = 0, dlen = V[i].getParentLength(); j < dlen; j++) {
                if (V[i].getParentAt(j).getCode().startsWith("axis"))
                    return true;
            }
        }
        return false;
    };

    me.getSource = function() {
        var len = V.length;
        if (len > 0) {
            me.doOrder(V);
            if (ORG3D) {
                for (var i = 0; i < len; i++) {
                    if (V[i] === ORG3D) {
                        V.splice(i, 1);
                        V.unshift(ORG3D);
                        break;
                    }
                }
            }
            var src = new SourceWriter(me);
            for (var i = 0; i < len; i++) {
                V[i].getSource(src);
                V[i].getStyle(src);
                V[i].getBlock(src);
            }
            var txt = "// Coordinates System :\n";
            txt += me.coordsSystem.getSource();
            txt += "\n\n// Geometry :\n";
            txt += src.getGeom();
            txt += "\n\n// Styles :\n";
            txt += src.getStyle();
            txt += me.coordsSystem.getStyle();
            txt += canvas.getStyle();
            if (src.getBlock() !== "") {
                txt += "\n\n// Blockly :\n";
                txt += src.getBlock();
            };
            txt += me.getInterpreter().BLK_GLOB_SRC();

            //            if (me.isAxisUsed()) txt+=me.coordsSystem.getStyle();
            return txt;
        }
        return "";
    };







    /**************************************************
     ******************* LOCUS PART *******************
     **************************************************/



    var tagDepsChain = function(o, on) {
        if (o === on)
            return true;
        var bool = false;
        for (var i = 0, len = o.getParentLength(); i < len; i++) {
            // Le or est intelligent : si on veut parcourir tout l'arbre
            // il faut forcer l'appel récursif avant le or.
            var t = tagDepsChain(o.getParentAt(i), on);
            bool = bool || t;
        }
        o.Flag2 = bool;
        return bool;
    };


    // Trouve la chaine de dépendence depuis un objet enfant
    // jusqu'à un parent donné, et renvoie les objets trouvés
    // dans un tableau :
    me.findDeps = function(_obj, _untilObj) {
        // Préparation : tous les objets sont taggés false
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].Flag = false;
            V[i].Flag2 = false;
        }

        tagDepsChain(_obj, _untilObj);
        _obj.Flag2 = false;

        var t = [];
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].Flag2) {
                t.push(V[i]);
            }
        }
        return t;
    };

    var findPtOn_recursive = function(_o) {
        if (!_o.Flag2) {
            _o.Flag2 = true;
            _o.Flag = (_o.isPointOn());
            for (var j = 0, l = _o.getParentLength(); j < l; j++) {
                findPtOn_recursive(_o.getParentAt(j));
            }
        }
    };

    // Renvoie le premier point sur objet trouvé dans la chaine
    // de dépendance de l'objet obj (le plus proche de obj).
    // Si non trouvé, renvoie null :
    me.findPtOn = function(_obj) {
        // Préparation : tous les objets sont taggés false
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].Flag = false;
            V[i].Flag2 = false;
        }
        _obj.Flag2 = false;
        findPtOn_recursive(_obj);
        _obj.Flag = false;
        var t = [];

        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].Flag) {
                t.push(V[i]);
            }
        }

        if (t.length > 0)
            return t[t.length - 1];
        else
            return null;
    };




    /**************************************************
     ******************* MACRO PART *******************
     **************************************************/

    var params = [];
    var addParameter = function(_n) {
        params.push(_n);
    };
    var removeParameter = function(_n) {
        params.splice(params.indexOf(_n), 1);
    };
    var targets = [];
    var addTarget = function(_n) {
        targets.push(_n);
    };
    var removeTarget = function(_n) {
        targets.splice(targets.indexOf(_n), 1);
    };
    var exec = null;




    me.clearMacroMode = function() {
        for (var i = 0, len = V.length; i < len; i++) {
            V[i].setMacroMode(0);
            V[i].setMacroSource(null);
        }
        params = [];
        targets = [];
    };

    me.macroConstructionTag = function(obj) {

        // Si il s'agit du mode construction de macro :
        switch (obj.getMacroMode()) {
            case 0:
                // Objet neutre qui devient initial :
                obj.setMacroMode(2);
                // Rafraîchissement des intermédiaires :
                //                checkIntermediates();
                //                canvas.macrosManager.addConstructionParam(obj.getName());
                addParameter(obj);
                targets = [];
                checkIntermediates();
                break;
            case 1:
                // Intermédiaire qui devient final :
                obj.setMacroMode(3);
                addTarget(obj);
                break;
            case 2:
                // Initial qui devient neutre :
                obj.setMacroMode(0);
                checkIntermediates();
                removeParameter(obj);
                targets = [];
                break;
            case 3:
                // Final qui devient intermédiaire :
                obj.setMacroMode(1);
                removeTarget(obj);
                break;
        }
        computeMacro();

    };

    me.macroExecutionTag = function(obj) {
        // Si il s'agit du mode execution de macro :
        switch (obj.getMacroMode()) {
            case 0:
                // Objet neutre reste neutre :
                break;
            case 4:
                // Initial possible qui devient initial choisi :
                obj.setMacroMode(5);
                canvas.macrosManager.addParam(obj.getVarName());
                break;
            case 5:
                // Initial choisi qui redevient initial possible :
                obj.setMacroMode(4);
                break;
        }
    };


    var checkIntermediate = function(obj) {
        if (!obj.Flag) {
            obj.Flag = true;

            // setMacroAutoObject peut déclarer intermédiaire (getMacroMode()===1) des objets,
            // il faut donc en tenir compte :
            if ((obj.getMacroMode() === 2) || (obj.getMacroMode() === 1)) {
                obj.Flag2 = true; // Est un initial, donc à classer dans les intermédiaires
                return; // possibles pour amorcer la recursivité.
            }

            var len = obj.getParentLength();
            if (len === 0) {
                obj.Flag2 = false; // Objet non initial sans dépendence :
                return; // n'est pas un intermédiaire possible.
            }

            obj.Flag2 = true;
            for (var i = 0; i < len; i++) {
                checkIntermediate(obj.getParentAt(i));
                obj.Flag2 = obj.Flag2 && obj.getParentAt(i).Flag2;
            }

            if (obj.Flag2)
                obj.setMacroMode(1);
        }
    };

    var checkIntermediates = function() {
        var len = V.length;
        for (var i = 0; i < len; i++) {
            V[i].Flag = false;
            V[i].Flag2 = false;
            if (V[i].getMacroMode() !== 2) {
                V[i].setMacroMode(0);
                V[i].setMacroSource(null);
            } else {
                V[i].setMacroAutoObject();
            }
        }

        for (i = 0; i < len; i++) {
            checkIntermediate(V[i]);
        }

    };


    var tagDependencyChain = function(obj) {
        if (!obj.Flag) {
            obj.Flag = true;
            if (obj.getMacroMode() !== 2) {
                for (var i = 0, len = obj.getParentLength(); i < len; i++) {
                    tagDependencyChain(obj.getParentAt(i));
                }
            }
        }
    };

    var varnames = [];

    var createVarNames = function() {
        varnames = [];
        for (var i = 0, len = params.length; i < len; i++) {
            varnames.push(params[i].getVarName());
        }
    }

    var paramsSortFilter = function(a, b) {
        return (varnames.indexOf(a) - varnames.indexOf(b));
    };

    var computeMacro = function() {
        var txt = "";
        var src = new SourceWriter(me);
        var p = []; // params
        var t = []; // targets

        me.doOrder(V);

        if (targets.length > 0) {
            // S'il y a des finaux :

            // Préparation : tous les objets sont taggés false
            for (var i = 0, len = V.length; i < len; i++) {
                V[i].Flag = false;
            }

            for (var i = 0, len = targets.length; i < len; i++) {
                // On va tagger true la chaine de dépendence
                // jusqu'à rencontrer un initial :
                tagDependencyChain(targets[i]);
            }


            for (var i = 0, len = V.length; i < len; i++) {

                if (V[i].Flag) {
                    if (V[i].getMacroMode() === 2) {
                        //                    S'il s'agit d'un initial :
                        p.push(V[i].getVarName());
                    } else {
                        // AU MOINDRE PROBLEME DE MACRO DEPUIS 2/11/2013
                        // VOIR ATTENTIVEMENT CE CHANGEMENT :
                        if (V[i].getMacroMode() === 1)
                            V[i].getSource(src);
                        // AVANT LE 2/11, SANS TEST :
                        // V[i].getStyle(src);
                        if (V[i].getMacroMode() === 3) {
                            //                        S'il s'agit d'un final :
                            // AJOUTE LE 2/11
                            V[i].getSource(src);
                            V[i].getStyle(src);
                            t.push(V[i].getVarName());
                        }
                    }
                }
            }

            for (var i = 0, len = params.length; i < len; i++) {
                var obj = params[i];
                if (obj.isAutoObjectFlags()) {
                    if (p.indexOf(obj.getVarName()) === (-1))
                        p.push(obj.getVarName());
                }
            }

        } else {

            // S'il n'y a pas de finaux :
            for (var i = 0, len = V.length; i < len; i++) {

                if (V[i].getMacroMode() === 2) {
                    //                    S'il s'agit d'un initial :
                    p.push(V[i].getVarName());
                } else if (V[i].getMacroMode() === 1) {
                    // S'il s'agit d'un intermédiaire :
                    V[i].getSource(src);
                    //                    V[i].getStyle(src);
                    if (!V[i].isHidden()) {
                        V[i].getStyle(src);
                        t.push(V[i].getVarName());
                    }
                }
            }
        }

        createVarNames();
        p.sort(paramsSortFilter);

        txt = "(function(" + p.join(",") + "){\n";
        txt += src.getGeom();
        txt += src.getStyle();
        //        if (targets.length === 0) {
        //            txt += src.getStyle();
        //        }
        txt += "return [" + t.join(",") + "];\n";
        txt += "})";

        var f = eval(txt);

        // Retransforme les initiaux et les cibles : on rétablit les
        // vrais noms d'objets à la place des noms de variable :
        for (var i = 0, len = p.length; i < len; i++) {
            //            console.log(p[i]);
            p[i] = VARS[p[i]];
        }
        for (var i = 0, len = t.length; i < len; i++) {
            t[i] = VARS[t[i]];
        }
        canvas.macrosManager.refreshConstructionPanel(p, t, f);

        //        console.log("*****************");
        //        console.log(src.getGeom());

    };



    // **********************************************************
    // **********************************************************
    // ******************* ANIMATIONS PART **********************
    // **********************************************************
    // **********************************************************


    var animations = [];
    var animations_runable = true;
    var animations_id = null;
    var animations_delay = 2;
    var animations_ctrl = null;

    var clearAnimations = function() {
        for (var i = 0; i < animations.length; i++) {
            var an = animations[i];
            if ((V.indexOf(an.obj) === -1) || (an.speed === 0)) {
                animations.splice(i, 1);
                i--
            }
        };
        if (animations.length === 0) {
            clearInterval(animations_id);
            animations_id = null;
            animations = [];
            if ((animations_ctrl) && (animations_ctrl.parentNode)) {
                document.body.removeChild(animations_ctrl);
            }
            animations_ctrl = null;
            return true
        }
        return false;
    }


    var loopAnimations = function() {
        if (clearAnimations()) return;
        if (animations_runable) {
            for (var i = 0; i < animations.length; i++) {
                var an = animations[i];
                if (V.indexOf(an.obj) !== -1) {
                    an.obj.incrementAlpha(an);
                    // an.obj.blocks.evaluate("ondrag"); // blockly
                    an.obj.compute();
                    an.obj.computeChilds();
                } else {
                    animations.splice(i, 1);
                    i--
                }
            }
            canvas.paintAnim();
        }
    }

    var animations_sort = function(a, b) {
        return (b.obj.getChildList().length - a.obj.getChildList().length)
    }

    var showAnim_btn = function(_showpause) {
        if (clearAnimations()) return;
        var img_pause = $APP_PATH + "NotPacked/images/controls/anim_stop.svg";
        var img_start = $APP_PATH + "NotPacked/images/controls/anim_start.svg";
        if (!animations_ctrl) {
            var el = $U.createDiv();
            el.stls("background-color:rgba(0,0,0,0);position:absolute;z-index:9000;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
            document.body.appendChild(el);
            animations_ctrl = el;
            me.resizeBtn();
        }
        animations_ctrl.rmevt();
        if (_showpause) {
            animations_ctrl.stl("background-image", "url(" + img_pause + ")");
            animations_ctrl.md(function(ev) {
                ev.preventDefault();
                me.showAnimations(false)
            })
        } else {
            animations_ctrl.stl("background-image", "url(" + img_start + ")");
            animations_ctrl.md(function(ev) {
                ev.preventDefault();
                me.showAnimations(true)
            })
        }
    }

    me.resizeBtn = function() {
        if (animations_ctrl) {
            var sz = 50;
            var margins = 5;
            var l = margins;
            var t = canvas.getHeight() - canvas.prefs.controlpanel.size - sz - margins;
            animations_ctrl.bnds(l, t, sz, sz);
        }
    }

    me.showAnimations = function(_b) {
        animations_runable = _b;
        showAnim_btn(_b);
        if (_b) {
            var d = new Date();
            var t = d.getTime();
            for (var i = 0; i < animations.length; i++) {
                animations[i].timestamp = t;
                animations[i].loopnum = 0;
                animations[i].incsum = 0;
                animations[i].currentstamp = t;
                // if (animations[i].obj.inithashtab) animations[i].obj.inithashtab(animations[i].speed);
            }
        }
    }


    me.findInAnimations = function(_o) {
        for (var i = 0; i < animations.length; i++) {
            if (animations[i].obj === _o) return animations[i];
        }
        return null;
    }

    var isOnCircle = function(_o) {
        return ((_o.getCode() === "point") && (_o.getParentLength() === 1) && (_o.getParentAt(0).isInstanceType("circle")))
    }

    me.getAnimationSpeed = function(_o) {
        var an = me.findInAnimations(_o);
        if (an) {
            var v = (isOnCircle(_o)) ? Math.round(an.speed * 180 / Math.PI) : an.speed;
            return v
        } else return 0;
    }

    me.setAnimationSpeed = function(_o, _v) {
        var an0 = me.findInAnimations(_o);
        if (isOnCircle(_o)) _v = _v * Math.PI / 180;
        if (an0) {
            an0.speed = _v;
        } else {
            animations.push({
                obj: _o,
                speed: _v,
                direction: 1,
                ar: false,
                delay: animations_delay,
                timestamp: null
            });
            animations.sort(animations_sort);
        }
        if (!animations_id) {
            animations_id = setInterval(loopAnimations, animations_delay);

        }
        me.showAnimations(true);
    }


    me.addAnimation = function(_o, _v, _d, _m) {
        var an0 = me.findInAnimations(_o);
        if (an0) {
            an0.speed = _v;
            an0.direction = _d;
            an0.ar = _m;
            an0.delay = animations_delay;
        } else {
            animations.push({
                obj: _o,
                speed: _v,
                direction: _d,
                ar: _m,
                delay: animations_delay,
                timestamp: null
            });
            animations.sort(animations_sort);
        }

        if (!animations_id) {
            animations_id = setInterval(loopAnimations, animations_delay);

        }
        me.showAnimations(true);
    };


    // **********************************************************
    // **********************************************************
    // ******************** BLOCKLY PART ************************
    // **********************************************************
    // **********************************************************

    function PRGM() {

    }

}
