//************************************************
//********** CONSTRUCTION OBJECT *****************
//************************************************
function ConstructionObject(_construction, _name) {
    var me = this;
    var Cn = _construction;
    var name = Cn.getUnusedName(_name, this);
    var subname = Cn.getSubName(name);
    var showname = false;
    var indicated = false;
    var selected = false;
    var hidden = 0;  // 0:normal ; 1:hidden ; 2:super hidden
    var color = new Color();
    var fillcolor = new Color();
    var selectedcolor = "";
    var indicatedcolor = "";
    var fontsize = 0;
    var dash = [];
    var track = false; // Pour la trace de l'objets
    var size = 0;
    var realsize = 0;
    var oversize = 0;
    var magnifyfactor = 0;
    var selectedfactor = 0;
    var onbounds = false; // Pour les points sur polygones
    // Pour la précision des nombres affichés : -1 pour pas d'affichage,
    // 1, 10, 100, 1000... pour 0,1,2,3 chiffres après la virgule
    var precision = 1;
    var serial = Cn.getSerial(); // numéro d'ordre dans la construction
    var layer = 0; // niveau de calque
    var paintorder = serial;// numéro d'ordre dans la construction (le plus grand recouvre le plus petit)
//    var shouldComputeChilds = false;
    var floatObj = false; // Pour les points flottants

    var magnets = [];           // Tableau multidimentionnel des objets magnétiques 
    // a[i][0] : objet et a[i][1] : rayon


    var parentList = [];      // Tableau des objets parents
    var childList = [];       // Tableau des objets enfants
    var is_3D = false;

    this.Flag = false;      // For various construction process
    this.Flag2 = false;     // For various construction process
    this.Scratch = 0;       // For various construction process

    var dragPoints = null;
    var dragCoords, freeDragPts, PtsChilds;

    var timestamp = 0;

    this.me = function () {
        return this;
    }

    this.newTimeStamp = function () {
        var d = new Date()
        timestamp = d.getTime();
    }
    this.setTimeStamp = function (_millis) {
        timestamp = _millis;
    }
    this.getTimeStamp = function () {
        return timestamp;
    }


    // ************************* CHANTIER ****************************
    // On remplace les dépendances pour le déplacement des objets
    // construits, avec une expression du type P2.setDragPoints([A.me(),B.me()])

    this.initDragPoints = function () {
        if (dragPoints === null)
            dragPoints = Cn.findFreePoints(this);
    }

    this.getDragPoints = function () {
        return dragPoints;
    }


    this.add_removeDragPoint = function (_o) {
        var i = dragPoints.indexOf(_o);
        if (i > -1)
            dragPoints.splice(i, 1);
        else
            dragPoints.push(_o);
    }

    this.setDragPoints = function (_d) {
        dragPoints = _d;
    };



//    this.setDragPoints = function () {
//        dragPoints = [];
//
//        for (var k = 0; k < arguments.length; k++) {
//            var obj = Cn.find(arguments[k]);
//            if (obj)
//                dragPoints.push(obj);
//        }


//        for (var k = 0, len = _t.length; k < len; k++) {
//            console.log(_t[k]);
//            var obj=Cn.find(_t[k]);
//            if (obj) dragPoints.push(obj);
//        }



    //dragPoints = _t
//    };
    // ********************* FIN DU CHANTIER *************************





    var PtsChildSortFilter = function (a, b) {
        return (b.getChildLength() - a.getChildLength());
    };



    this.startDrag = function (_x, _y) {
        $U.changed();
        PtsChilds = [];
        dragCoords = [];
        this.dragTo = (Cn.is3D()) ? this.dragTo3D : this.dragTo2D;
        freeDragPts = (dragPoints === null) ? Cn.findFreePoints(this) : dragPoints;
        if (freeDragPts.length > 0) {
            for (var k = 0, len = freeDragPts.length; k < len; k++) {
                PtsChilds = PtsChilds.concat(freeDragPts[k].getChildList());
                dragCoords.push({x: _x, y: _y});
            }

            var t;
            for (var i = 0, len2 = PtsChilds.length; i < len2; i++) {
                t = PtsChilds.indexOf(PtsChilds[i], i + 1);
                if (t != -1) {
                    PtsChilds.splice(t, 1);
                    i--;
                }
            }
            PtsChilds.sort(PtsChildSortFilter);
        } else {
            dragCoords.push({x: _x, y: _y});
        }
    };

    this.compute_dragPoints = function (_x, _y) {
        var oldX, oldY;
        if (freeDragPts.length > 0) {
            for (var i = 0, len = freeDragPts.length; i < len; i++) {
                oldX = freeDragPts[i].getX();
                oldY = freeDragPts[i].getY();
                freeDragPts[i].computeIncrement(oldX + _x - dragCoords[i].x, oldY + _y - dragCoords[i].y);
                dragCoords[i].x += freeDragPts[i].getX() - oldX;
                dragCoords[i].y += freeDragPts[i].getY() - oldY;
                oldX = freeDragPts[i].getX();
                oldY = freeDragPts[i].getY();
                if (freeDragPts[i].getParentLength() === 1) {
                    freeDragPts[i].getParentAt(0).project(freeDragPts[i]);
                    freeDragPts[i].getParentAt(0).setAlpha(freeDragPts[i]);
                    freeDragPts[i].compute();
                }
                Cn.computeMagnetObjects();
                freeDragPts[i].checkMagnets();
                dragCoords[i].x += freeDragPts[i].getX() - oldX;
                dragCoords[i].y += freeDragPts[i].getY() - oldY;
            }
        } else {
            Cn.translate(_x - dragCoords[0].x, _y - dragCoords[0].y);
            dragCoords[0].x = _x;
            dragCoords[0].y = _y;
            Cn.computeAll();
        }

    };


    this.dragTo2D = function (_x, _y) {
        this.compute_dragPoints(_x, _y);
        for (var i = 0, len = PtsChilds.length; i < len; i++) {
            PtsChilds[i].compute();
        }
    };

    this.dragTo3D = function (_x, _y) {
        this.dragTo2D(_x, _y);
        Cn.computeMagnetObjects();
        this.checkMagnets();
        Cn.computeAll();
        Cn.computeAll();
    };

    this.dragTo = (Cn.is3D()) ? this.dragTo3D : this.dragTo2D;


    this.is3D = function () {
        return is_3D;
    };

    this.set3D = function (_b) {
        is_3D = _b;
    };

    var addAsChild = function (_child, _parent) {
        if (!_parent.addChild || (_child.isChild(_parent)))
            return;
        _parent.addChild(_child);
        // On ajoute tous les enfants de _child à la liste des enfants de _parent :
        for (var i = 0, len = _child.getChildLength(); i < len; i++) {
            addAsChild(_child.getChildAt(i), _parent);
        }
        // On ajoute _child à la liste des enfants de tous les parents de _parent :
        for (var i = 0, len = _parent.getParentLength(); i < len; i++) {
            addAsChild(_child, _parent.getParentAt(i));
        }
    };

    this.isChild = function (_o) {
        return (_o.getChildList().indexOf(this) !== -1);
    };

    this.getChildList = function () {
        return childList;
    };

    this.getChildLength = function () {
        return childList.length;
    };

    this.addChild = function (_o) {
//        console.log("addChild : "+_o.getName());
        if (childList.indexOf(_o) === -1)
            childList.push(_o);
    };
    this.getChildAt = function (_i) {
        return childList[_i];
    };

    this.clearChildList = function () {
        childList.length = 0;
    };
//    this.addChild = function(_o) {
//        childList.push(_o);
//    };

    this.deleteChild = function (_o) {
        var i = childList.indexOf(_o);
        if (i !== -1) {
            childList.splice(i, 1);
        }
    };

    this.computeChilds = function () {
//        if (childList.length) console.log("****** "+childList.length);
        for (var i = 0; i < childList.length; i++) {
//            console.log(childList[i].getName());
            childList[i].compute();
        }
    };

    this.refreshChildsNames = function () {
//        console.log("refreshChildsNames ="+childList.length);
        Cn.doOrder(childList);
        for (var i = 0; i < childList.length; i++) {
            childList[i].refreshNames();
        }
    };

    // Uniquement pour les objets contenant une expression
    // Il s'agit de rafraîchir les noms utilisés dans l'expression :
    this.refreshNames = function () {
    };

    this.setParentList = function (_p) {
        parentList = _p;
        for (var i = 0, len = parentList.length; i < len; i++) {
            addAsChild(this, parentList[i]);
            is_3D = (is_3D) || (parentList[i].is3D());
        }
        if (parentList.length === 0 && this.getCode() === "point")
            is_3D = false;
    };


    this.setParent = function () {
        parentList = Array.prototype.slice.call(arguments, 0);
//        console.log(parentList.length+" nom:"+this.getName());
        for (var i = 0, len = parentList.length; i < len; i++) {
//            console.log("me="+this.getName()+"  parent="+parentList[i].getName());
            addAsChild(this, parentList[i]);
            is_3D = (is_3D) || (parentList[i].is3D());
        }
        if (parentList.length === 0 && this.getCode() === "point")
            is_3D = false;
    };
    this.addParent = function (_o) {
//        console.log("me=" + this.getName() + "  parent=" + _o.getName());
        parentList.push(_o);
        addAsChild(this, _o);
        is_3D = (is_3D) || (_o.is3D());
    };
    this.getParent = function () {
        return parentList;
    };
    this.getParentLength = function () {
        return parentList.length;
    };
    this.getParentAt = function (_i) {
        return parentList[_i];
    };
    this.deleteParent = function (_o) {
        var i = parentList.indexOf(_o);
        if (i !== -1) {
            parentList.splice(i, 1);
        }
    };

    this.redefine = function () {
    };

    this.setMagnets = function (_tab) {
        magnets = _tab;
    };

    this.getMagnet = function (_o) {
        for (var i = 0; i < magnets.length; i++) {
            if (magnets[i][0] === _o)
                return magnets[i];
        }
        return null;
    };

    this.addMagnet = function (_o, _n) {
        var m = this.getMagnet(_o);
        if (m === null) {
            m = [_o, _n];
            magnets.push(m);
        }
        return m;
    };

    this.removeMagnet = function (_o) {
        var m = this.getMagnet(_o);
        if (m !== null) {
            magnets.splice(magnets.indexOf(m), 1);
        }
    };

    this.getMagnets = function () {
        return magnets;
    };

    this.checkMagnets = function () {
    };

    this.computeMagnets = function () {
    };
    // Pour les points sur polygones ;
    this.setOnBoundary = function (_b) {
        onbounds = _b;
    };
    this.getOnBoundary = function () {
        return onbounds;
    }
    // Pour les polygones ;
    this.setBoundaryMode = function (P) {
    };

    // Pour la 3D :
    this.storeX = function () {
    };





    // Série de 5 méthodes à surcharger, pour les objets pouvant
    // être édité avec la "calculatrice" (point, cercle, expression, fonction, etc...) :

    this.setE1 = function (_t) {
    };
    this.setE2 = function (_t) {
    };
    this.setT = function (_t) {
    };
    this.setMin = function (_t) {
    };
    this.setMax = function (_t) {
    };
    this.getValue = function () {
        return NaN;
    };

    this.setDeps = function () {
    };

    this.getCoordsSystem = function () {
        return Cn.coordsSystem;
    };

    this.isCoincident = function () {
        return false;
    };

    this.getUnit = function () {
        return Cn.coordsSystem.getUnit();
    };
    this.setDash = function (_d) {
        dash = (_d) ? Cn.prefs.size.dash : [];
    };
    this.isDash = function () {
        return (dash.length !== 0);
    };

    this.setIncrement = function () {
    };
    this.getIncrement = function () {
        return 0;
    };

    this.getSerial = function () {
        return serial;
    };

    this.getPaintOrder = function () {
        return paintorder;
    };

// -1 pour pas d'affichage, 0,1,2,3,4,... pour indiquer le nombre de chiffres après la virgule
    this.setPrecision = function (_prec) {
        if (_prec > -1) {
            precision = Math.pow(10, _prec);
            this.paintLength_exe = this.paintLength;
        } else {
            precision = -1;
            this.paintLength_exe = null_proc;
        }
    };
    this.getPrecision = function () {
        return precision;
    };

    this.getRealPrecision = function () {
        return Math.round($U.log(precision));
    };

    this.getLayer = function () {
        return layer;
    };
    this.setLayer = function (_l) {
        layer = _l;
        paintorder = serial + 100000 * layer;
    };

    this.getFontSize = function () {
        return fontsize;
    };
    this.setFontSize = function (_s) {
        fontsize = _s;
    };

    // Getters et Setters :
    this.getCn = function () {
        return Cn;
    };
    this.setName = function (_n) {
        name = Cn.getUnusedName(_n, this);
        subname = Cn.getSubName(name);
    };
    this.getName = function () {
        return name;
    };
    this.getSubName = function () {
        return subname;
    };
    this.getVarName = function () {
        return Cn.getVarName(name);
    };
    this.setShowName = function (_bool) {
        showname = _bool;
        this.paintName_exe = (_bool) ? this.paintName : null_proc;
    };
    this.getShowName = function () {
        return showname;
    };
    this.setNamePosition = function () {
    };
    this.getNamePosition = function () {
        return null;
    };
// Seulement pour les points :
    this.setShape = function () {
    };
    this.getShape = function () {
        return -1;
    };
    this.setIndicated = function (_ind) {
        indicated = _ind;
        objMode = objModeTab[1 * _ind];
        return _ind; // Optionnel : voir la methode validate de Construction.js
    };
    this.isIndicated = function () {
        return indicated;
    };
    this.setSelected = function (_sel) {
        selected = _sel;
        objMode = objModeTab[2 * _sel];
    };
    this.isSelected = function () {
        return selected;
    };
    this.setHidden = function (_sel) {
        _sel = Math.abs(_sel * 1);
        hidden = (isNaN(_sel)) ? 1 : parseInt(_sel) % 3;
        this.paint = paintTab[hidden];
        this.validate = validTab[hidden];
    };
    this.isHidden = function () {
        return (hidden);
    };
    this.isSuperHidden = function () {
        return (hidden === 2);
    };
    this.setColor = function (_col) {
        color.set(_col);
        fillcolor.setRGBA(color.getR(), color.getG(), color.getB(), fillcolor.getOpacity());
    };
    this.getColor = function () {
        return color;
    };
    this.setRGBColor = function (r, g, b) {
        var c = "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
        this.setColor(c);
    };
    this.isFilledObject = function () {
        return false;
    };
    this.getOpacity = function () {
        return fillcolor.getOpacity();
    };
    this.setOpacity = function (_f) {
        fillcolor.setOpacity(_f);
    };
    this.getOversize = function () {
        return oversize;
    };
    this.getRealsize = function () {
        return realsize;
    };
    this.getSize = function () {
        return size;
    };
    this.setSize = function (_s) {
        size = _s;
    };


    var mode = 1;
    // mode 1 pour pointeur, 2 pour gomme, 3 pour poubelle, 
    // 4 pour construction de macros, 5 pour execution de macros
    // 6 pour les propriétés , 9 pour le magnétisme :
    this.setMode = function (_mode) {
        mode = _mode;
        switch (mode) {
            case 0:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 1:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 2:
                paintTab = paint_gomme;
                validTab = valid_gomme;
                break;
            case 3:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 4:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 5:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 6:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
            case 9:
                paintTab = paint_normal;
                validTab = valid_normal;
                break;
        }
        this.paint = paintTab[hidden];
        this.validate = validTab[hidden];
    };

    this.getMode = function () {
        return mode;
    }



    // Seulement pour les macros : 0 signifie neutre, 1 intermédiaire, 2 initial et 3 final
    // et pour le mode execution : 4 pour initial possible, 5 pour initial choisi
    var macroMode = 0;
    this.setMacroMode = function (_mode) {
        macroMode = _mode;
        switch (macroMode) {
            case 0:
                objModeTab = objModeTab_normal;
                break;
            case 1:
                objModeTab = objModeTab_intermediate;
                break;
            case 2:
                objModeTab = objModeTab_initial;
                break;
            case 3:
                objModeTab = objModeTab_final;
                break;
            case 4:
                objModeTab = objModeTab_normal;
                break;
            case 5:
                objModeTab = objModeTab_initial;
                break;
        }
        objMode = objModeTab[0];
    };
    this.getMacroMode = function () {
        return macroMode;
    };

// Seulement pour les macros : pour un cercle initial par exemple
// va placer le centre parmi les intermédiaires, et provoquer
// dans le source de la macro l'instruction P=Center au lieu de P=Point.
// Pour un segment initial, P=First et P=Second au lieu de P=Point
    this.setMacroAutoObject = function () {
    };
// Surchargé dans l'objet Point :
    this.setMacroSource = function () {
    };

// For macro process only :
    this.isAutoObjectFlags = function () {
        return false;
    };
//// Surchargé dans l'objet Cercle et Segment par exemple :
//    this.getMacroSource = function() {
//    };

// Seulement pour le mode édition : 0 signifie neutre, 1 objet édité
    var editMode = 0;
    this.setEditMode = function (_mode) {
        editMode = _mode;
        switch (editMode) {
            case 0:
                objModeTab = objModeTab_noedit;
                break;
            case 1:
                objModeTab = objModeTab_edit;
                break;
        }
        objMode = objModeTab[0];
    };
    this.getEditMode = function () {
        return editMode;
    };




    this.checkIfValid = function (_C) {
    };
    this.getCode = function () {
        return "";
    };
    this.getFamilyCode = function () {
        return "";
    };

    this.isInstanceType = function (_c) {
        return false;
    };
    this.isMoveable = function () {
        return false;
    };
    this.free = function () {
        return (this.getParentLength() === 0);
    };
    this.setFloat = function (_f) {
        floatObj = _f;
        if (_f)
            Cn.setOrigin3D(this);
    };
    this.getFloat = function () {
        return floatObj;
    };
    this.isPointOn = function () {
        return false;
    };

    this.getAssociatedTools = function () {
        var at = "@callproperty";
        if (this.isMoveable())
            at += ",@objectmover";
        return at;
    };


    // Ne pas surcharger cette méthode, mais plutôt
    // la méthode compute :
//    this.validate = function(ev) {
//        if ((Cn.isHideMode() && mode === 2) || (!this.isHidden())) {
//            // Si je suis en mode caché, ou que je suis apparent :
//            if (this.mouseInside(ev)) {
//                this.setIndicated(true);
//                Cn.addIndicated(this);
//            } else {
//                this.setIndicated(drag);
//            }
//        }
////        this.compute();
//    };


    this.paintObject = function (ctx) {
    };

    var null_proc = function (ctx) {
    };

    this.paintName = function (ctx) {
    };
    this.paintName_exe = null_proc;

    this.paintLength = function (ctx) {
    };
    this.paintLength_exe = null_proc;


    var valid_show_normal = function (ev) {
        return this.mouseInside(ev);
    };
    var valid_hidden_normal = function (ev) {
        return false;
    };

    var valid_normal = [valid_show_normal, valid_hidden_normal, valid_hidden_normal];
    var valid_gomme = [valid_show_normal, valid_show_normal, valid_hidden_normal];
    var validTab = valid_normal;

    this.validate = validTab[hidden];

    var paint_show_normal = function (ctx) {
        initContext(ctx);
        this.paintObject(ctx);
        this.paintName_exe(ctx);
        this.paintLength_exe(ctx);
    };
    var paint_hidden_normal = function (ctx) {
    };
    var paint_hidden_gomme = function (ctx) {
        initContext(ctx);
        hiddenContext(ctx);
        this.paintObject(ctx);
        this.paintName_exe(ctx);
        this.paintLength_exe(ctx);
    };
    var paint_normal = [paint_show_normal, paint_hidden_normal, paint_hidden_normal];
    var paint_gomme = [paint_show_normal, paint_hidden_gomme, paint_hidden_normal];
    var paintTab = paint_normal;

    this.paint = paintTab[hidden];


    // Pour les traces, ne pas surcharger ces trois méthodes :
    this.startTrack = function () {
        track = true;
        this.beginTrack();
    };
    this.clearTrack = function () {
        track = false;
    };
    this.isTrack = function () {
        return track;
    };

    // Mais surcharger celles-ci :
    this.beginTrack = function () {
    };
    this.drawTrack = function (_ctx) {
    };


    this.compute = function () {
    };
    this.mouseInside = function (ev) {
        return false;
    };


    this.ORGMOUSEINSIDE = null;
    this.MOUSEINSIDE = function (ev) {
        if (Cn.getMode() === 6 && this.ORGMOUSEINSIDE)
            // Si on est en mode propriétés
            return this.ORGMOUSEINSIDE(ev);
        else
            return false;
    };
    this.noMouseInside = function () {
        if (this.ORGMOUSEINSIDE === null) {
            this.ORGMOUSEINSIDE = this.mouseInside;
            this.mouseInside = this.MOUSEINSIDE;
        }
    };
    this.doMouseInside = function () {
        if (this.ORGMOUSEINSIDE !== null) {
            this.mouseInside = this.ORGMOUSEINSIDE;
            this.ORGMOUSEINSIDE = null;
        }
    };
    this.setNoMouseInside = function (_mi) {
        if (_mi) {
            this.noMouseInside();
        } else {
            this.doMouseInside();
        }
    };
    this.isNoMouseInside = function () {
        return (this.ORGMOUSEINSIDE !== null)
    };
    this.intersect = function (_C, _P) {
    };
    this.projectXY = function (_x, _y) {
    };
    this.project = function (p) {
    };
    this.projectAlpha = function (p) {
    };
    this.setAlpha = function (p) {
    };
    this.projectMagnetAlpha = function (p) {
        this.projectAlpha(p);
    };
    this.setMagnetAlpha = function (p) {
        this.setAlpha(p);
    };


    // Hallucinants pointeurs javascript :
    this.mouseX = Cn.mouseX;
    this.mouseY = Cn.mouseY;
    this.prefs = Cn.prefs;
    this.getWidth = Cn.getWidth;
    this.getHeight = Cn.getHeight;


    this.setDefaults = function (_code) {
        if (this.prefs.color.hasOwnProperty(_code))
            this.setColor(this.prefs.color[_code]);
        else
            this.setColor(this.prefs.color["line"]);

        if (this.prefs.size.hasOwnProperty(_code))
            size = this.prefs.size[_code];
        else
            size = this.prefs.size["line"];

        if (this.prefs.precision.hasOwnProperty(_code))
            this.setPrecision(this.prefs.precision[_code]);

        if (this.prefs.fontsize.hasOwnProperty(_code))
            fontsize = this.prefs.fontsize[_code];
        else
            fontsize = this.prefs.fontsize["point"];

        if (this.prefs.precision.over.hasOwnProperty(_code))
            oversize = this.prefs.precision.over[_code];
        else
            oversize = this.prefs.precision.over["line"];

        if (this.prefs.magnifyfactor.hasOwnProperty(_code))
            magnifyfactor = this.prefs.magnifyfactor[_code];
        else
            magnifyfactor = this.prefs.magnifyfactor["line"];

        if (this.prefs.selectedfactor.hasOwnProperty(_code))
            selectedfactor = this.prefs.selectedfactor[_code];
        else
            selectedfactor = this.prefs.selectedfactor["line"];

        selectedcolor = this.prefs.color.selected;
        indicatedcolor = this.prefs.color.hilite;
        if (Object.touchpad) {
            if (this.prefs.sizefactor.hasOwnProperty(_code))
                size *= this.prefs.sizefactor[_code];
            else
                size *= this.prefs.size.touchfactor;

            if (this.prefs.oversizefactor.hasOwnProperty(_code))
                oversize *= this.prefs.oversizefactor[_code];
            else
                oversize *= this.prefs.precision.over.touchfactor;


        }
    };


    var objMode_normal = function (ctx) {
        realsize = size;
        ctx.strokeStyle = color.getRGBA();
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objMode_indicated = function (ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objMode_selected = function (ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objModeTab_normal = [objMode_normal, objMode_indicated, objMode_selected];


    var objMode_normal_final = function (ctx) {
        realsize = size;
        ctx.strokeStyle = "rgb(210,0,0)";
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_final = function (ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_final = function (ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_final = [objMode_normal_final, objMode_indicated_final, objMode_selected_final];


    var objMode_normal_initial = function (ctx) {
        realsize = size * 1.5;
        ctx.strokeStyle = "rgb(95,132,0)";
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_initial = function (ctx) {
        realsize = size * 1.5 * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_initial = function (ctx) {
        realsize = size * 1.5 * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_initial = [objMode_normal_initial, objMode_indicated_initial, objMode_selected_initial];


    var objMode_normal_intermediate = function (ctx) {
        realsize = size;
        ctx.strokeStyle = "#333333";
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_intermediate = function (ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_intermediate = function (ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_intermediate = [objMode_normal_intermediate, objMode_indicated_intermediate, objMode_selected_intermediate];

    var objMode_normal_edit = function (ctx) {
        ctx.shadowColor = 'darkred';
        objMode_normal(ctx);
    };
    var objMode_indicated_edit = function (ctx) {
        ctx.shadowColor = 'darkred';
        objMode_indicated(ctx);
    };
    var objMode_selected_edit = function (ctx) {
        ctx.shadowColor = 'darkred';
        objMode_selected(ctx);
    };
    var objModeTab_edit = [objMode_normal_edit, objMode_indicated_edit, objMode_selected_edit];

    var objMode_normal_noedit = function (ctx) {
        ctx.shadowColor = 'gray';
        objMode_normal(ctx);
    };
    var objMode_indicated_noedit = function (ctx) {
        ctx.shadowColor = 'gray';
        objMode_indicated(ctx);
    };
    var objMode_selected_noedit = function (ctx) {
        ctx.shadowColor = 'gray';
        objMode_selected(ctx);
    };
    var objModeTab_noedit = [objMode_normal_noedit, objMode_indicated_noedit, objMode_selected_noedit];


    var objModeTab = objModeTab_normal;
    var objMode = objMode_normal;


    var initContext = function (ctx) {
        objMode(ctx);
        ctx.font = fontsize + "px " + Cn.prefs.font;
        ctx.globalAlpha = 1;
        ctx.lineWidth = realsize;
        ctx.setLineDash(dash);
    };

    var hiddenContext = function (ctx) {
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "#AAAAAA";
        ctx.setLineDash(dash);
    };


    this.getSource = function (src) {
    };


    this.getStyleString = function () {
        var s = "c:" + color.getHEX();
        if (hidden)
            s += ";h:" + hidden;
        if (fillcolor.getOpacity())
            s += ";o:" + fillcolor.getOpacity();
        s += ";s:" + size;
        if (showname)
            s += ";sn:" + showname;
        if (layer)
            s += ";l:" + layer;
        s += ";f:" + fontsize;
        if (precision > -1)
            s += ";p:" + this.getRealPrecision();
        if (this.getIncrement())
            s += ";i:" + this.getIncrement();
        if (onbounds)
            s += ";sb:" + onbounds;
        if (this.getShape() > 0)
            s += ";sp:" + this.getShape();
        if (this.isDash())
            s += ";dh:" + this.isDash();
        if (this.isNoMouseInside())
            s += ";nmi:" + this.isNoMouseInside();
        if (this.getNamePosition())
            s += ";np:" + this.getNamePosition();
        if (this.isTrack())
            s += ";tk:" + this.isTrack();
        if (this.getFloat())
            s += ";fl:" + this.getFloat();
        if (this.getSegmentsSize)
            // S'il s'agit d'un objet de type liste :
            s += ";sg:" + this.getSegmentsSize();
        if ((this.is360) && (this.is360()))
            // Il s'agit d'un angle ou d'un angle fixe :
            s+= ";am:" + this.is360();
            if (magnets.length) {
                var t = [];
                for (var k = 0; k < magnets.length; k++) {
                    t.push([magnets[k][0].getVarName(), magnets[k][1]]);
                }
                s += ";mg:[" + t.join("],[") + "]";
            }
        if (dragPoints !== null) {
            var t = [];
            for (var k = 0; k < dragPoints.length; k++) {
                t.push(dragPoints[k].getVarName());
            }
            s += ";dp:[" + t.join(",") + "]";
        }
        return s;
    };

    this.getStyle = function (src) {
        src.styleWrite(true, name, "STL", this.getStyleString());
    };


}
;



