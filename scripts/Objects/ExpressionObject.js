function ExpressionObject(_construction, _name, _txt, _min, _max, _exp, _x, _y) {
    //    console.log("start create : "+_name);
    var parent = $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction));
    var me = this;
    me.Flag = false;
    var Cn = _construction;
    var X = (_x < 0) ? 0 : _x,
        Y = (_y < 0) ? 25 : _y,
        W = 0,
        H = 0;
    var arrow = String.fromCharCode(0x27fc); // Juste pour tromper jscompress qui converti abusivement...
    var OldX, OldY;
    var T = _txt;
    var E1 = new Expression(me, ""),
        min = null,
        max = null;
    var cLength = 200; // Longueur initiale d'un curseur, en pixel.
    var cOffsetY = 20; // Décalage du curseur sous l'expression
    var anchor = null; // PointObject auquel l'expression est rattachée
    var cPT = new PointObject(Cn, me.getName() + ".cursor", 0, 0);
    //    cPT.setParent(me);
    cPT.getCode = function() {
        return "expression_cursor";
    };
    cPT.getAssociatedTools = function() {
        return "@callproperty"
    };
    cPT.getSource = function() {};
    cPT.getStyle = function() {};
    cPT.compute = function() {};
    cPT.free = function() {
        return false;
    };
    cPT.getMacroMode = function() {
        return -1
    };
    cPT.setH = cPT.setHidden;
    cPT.setHidden = function(_sel) {
        me.setH(_sel);
        cPT.setH(_sel);
    };
    cPT.increment = 0;
    cPT.setIncrement = function(_i) {
        cPT.increment = _i;
        cPT.dragTo(cPT.getX(), cPT.getY());
    };
    cPT.getIncrement = function() {
        return cPT.increment;
    };
    cPT.startDrag = function(_x, _y) {};
    cPT.dragTo = function(_x, _y) {
        if (_x < X)
            _x = X;
        if (_x > (X + cLength))
            _x = X + cLength;
        var val = min.value() + (max.value() - min.value()) * (_x - X) / cLength;

        if (cPT.increment) {
            var inc = 1 / cPT.increment;
            val = min.value() + Math.round((val - min.value()) * inc) / inc;
            while (val > max.value())
                val -= cPT.increment;
            _x = X + cLength * (val - min.value()) / (max.value() - min.value());
        }
        cPT.setXY(_x, Y + cOffsetY);
        E1.setValue(val);
        if ((Cn.is3D())) {
            Cn.computeAll();
        } else {
            this.computeChilds();
        }
    };
    var initCursorPos = function() {
        var cmin = min.value();
        var cmax = max.value();
        var ce = E1.value();
        if (ce < cmin)
            ce = cmin;
        if (ce > cmax)
            ce = cmax;
        cPT.setXY(X + cLength * (ce - cmin) / (cmax - cmin), Y + cOffsetY);
    };

    cPT.setDefaults("expression_cursor");
    Cn.add(cPT);
    // Attention, dépendance circulaire ! :
    //    me.setParent(cPT);
    me.setIncrement = function(_i) {
        cPT.setIncrement(_i);
    };
    me.getIncrement = function() {
        return cPT.getIncrement();
    };
    me.getcPTName = function() {
        return cPT.getName();
    };
    me.setH = me.setHidden;
    me.setHidden = function(_sel) {
        cPT.setH(_sel);
        me.setH(_sel);
    };
    me.setXY = function(x, y) {
        var oldX = X;
        X = x;
        Y = y;
        if (isCursor()) {
            if (isNaN(cPT.getX()) || isNaN(cPT.getX()))
                initCursorPos();
            else
                cPT.setXY(cPT.getX() + (X - oldX), Y + cOffsetY);
        }
    };
    me.getX = function() {
        return X;
    };
    me.getY = function() {
        return Y;
    };
    me.getW = function() {
        return W;
    };
    me.is3D = function() {
        return E1.is3DArray();
    };


    // Utilisé pour attacher une expression à un point (anchor) :
    var Alpha = [30, -10];
    me.attachTo = function(_o) {
        if (anchor === null) {
            anchor = _o;
            this.addParent(anchor);
            this.setXY(anchor.getX() + Alpha[0], anchor.getY() + Alpha[1]);
            //            _o.setAlpha(this);
        }
    };
    this.setAlpha = function(_a) {
        Alpha = _a;
    };
    this.getAlpha = function() {
        return Alpha;
    };
    this.computeAlpha = function() {
        if (anchor !== null) {
            Alpha[0] = X - anchor.getX();
            Alpha[1] = Y - anchor.getY();
        }
    };
    this.deleteAlpha = function() {
        if (anchor !== null) {
            var _x = 10 * Math.round((anchor.getX() + Alpha[0] + 20) / 10);
            var _y = 10 * Math.round((anchor.getY() + Alpha[1] - 20) / 10);
            this.setXY(_x, _y);
            anchor = null;
            Alpha = [30, -10];
            me.refresh();
        }
    };

    me.setDefaults("expression");

    this.isInstanceType = function(_c) {
        return (_c === "expression");
    };
    this.getCode = function() {
        return "expression";
    };
    this.getFamilyCode = function() {
        return "expression";
    };

    this.getAssociatedTools = function() {
        if (anchor)
            return "@callproperty,@calltrash,@objectmover,@noanchor,@callcalc";
        else
            return "@callproperty,@calltrash,@objectmover,@anchor,@callcalc";
    };


    this.getValue = function(x, y, z, t) {
        return E1.value(x, y, z, t);
    };



    me.compute = function() {

        if (E1)
            E1.compute();
        if (min)
            min.compute();
        if (max)
            max.compute();
        if (anchor) {
            this.setXY(anchor.getX() + Alpha[0], anchor.getY() + Alpha[1]);
        }

    };

    var agrandirCursor = false;

    var dragX, dragY;
    this.startDrag = function(_x, _y) {
        dragX = _x;
        dragY = _y;
        OldX = X;
        OldY = Y;
        //        dragX = 10 * Math.round(_x / 10);
        //        dragY = 10 * Math.round(_y / 10);
        //        OldX = 10 * Math.round(X / 10);
        //        OldY = 10 * Math.round(Y / 10);
    };

    this.dragTo = function(_x, _y) {
        if (agrandirCursor) {
            var bar = (cPT.getX() - X) / cLength
            cLength = Math.max(20 * Math.round((_x - X) / 20), 30);
            var x = X + cLength * bar;
            cPT.setXY(x, cPT.getY());
        } else {
            //            var oldX = X;
            this.setXY(OldX + Math.round((_x - dragX) / 10) * 10, OldY + Math.round((_y - dragY) / 10) * 10);
            //            X=OldX+Math.round((_x-dragX)/10)*10;
            //            Y=OldY+Math.round((_y-dragY)/10)*10;
            //            cPT.setXY(cPT.getX() + (X - oldX), Y + cOffsetY);
            //            var oldX = X;
            //            X = 10 * Math.round(_x / 10);
            //            Y = 10 * Math.round(_y / 10);
            //            X = X + (OldX - dragX);
            //            Y = Y + (OldY - dragY);
            //            cPT.setXY(cPT.getX() + (X - oldX), Y + cOffsetY);
        }
        this.computeAlpha();
    };

    this.computeDrag = function() {};

    this.mouseInside = function(ev) {
        agrandirCursor = false;
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        var inside = ((mx > X) && (mx < X + W) && (my < Y) && (my > Y - this.getFontSize()));
        if ((!inside) && (isCursor())) {
            var l = X + cLength - 20;
            var sz = me.getSize();
            inside = (mx > l) && (mx < X + cLength + 20) && (my > Y + cOffsetY - sz / 2 - 5) && (my < Y + cOffsetY + sz / 2 + 5);
            agrandirCursor = inside;
        }
        return inside;
    };

    var paintFunction = function(ctx) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";

        var val = this.getVarName() + "(" + E1.getVars() + ") = " + E1.get();
        W = ctx.measureText(val).width;
        ctx.fillText(val, X, Y);
    };

    var paintDxyztFunc = function(ctx) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";

        var val = E1.get() + " : " + E1.value().getVars() + " " + arrow + " " + E1.value().get();

        //        var val = this.getVarName() + "(" + E1.value().getVars() + ") = " + E1.value().get();
        W = ctx.measureText(val).width;
        ctx.fillText(val, X, Y);
    };

    var paintDxyztDef = function(ctx) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";
        var val = this.getVarName() + "(" + E1.getVars() + ") = " + E1.get() + " = " + E1.getDxyzt();
        //        var val = E1.get()+" : "+ E1.value().getVars() + " \u27fc " + E1.value().get();

        //        var v=[];
        //        console.log("****this.depList: ");
        //        for (var i=0;i<this.getParentLength();i++) {
        //            console.log("this.depList: "+this.getParentAt(i).getName());
        //        }


        //        var val = this.getVarName() + "(" + E1.value().getVars() + ") = " + E1.value().get();
        W = ctx.measureText(val).width;
        ctx.fillText(val, X, Y);
    };

    var parseText = function(_s) {
        if (typeof _s === "string") {
            var prec = me.getPrecision();
            _s = _s.replace(/(\d+(.\d+)?)/g, function(m, v) {
                return ($L.number(Math.round(parseFloat(v) * prec) / prec))
            });
        }
        return _s;
    };

    var paintText = function(ctx) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";
        var val = parseText(E1.value());
        W = ctx.measureText(val).width;
        ctx.fillText(val, X, Y);
    };


    //    var isArray = function(_a) {
    //        return (Object.prototype.toString.call(_a) === '[object Array]');
    //    };
    //
    //
    //    var parseArray = function(tab, prec) {
    //        if (isArray(tab)) {
    //            var elts = [];
    //            for (var i = 0, len = tab.length; i < len; i++) {
    //                elts.push(parseArray(tab[i], prec));
    //            }
    //            return "[" + elts.join($L.comma) + "]";
    //        } else {
    //            if (isNaN(tab))
    //                return "???";
    //            else
    //                return ($L.number(Math.round(tab * prec) / prec));
    //        }
    //    };

    var paintNum = function(ctx) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";
        var prec = me.getPrecision();
        var t = (T === "") ? me.getName() + " = " : T;
        var val = (prec > -1) ? t + $U.parseArray(E1.value(), prec) : t;
        W = ctx.measureText(val).width;
        ctx.fillText(val, X, Y);
    };

    var drawRoundRect = function(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    var drawSemiRoundRect = function(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };


    var paintCursor = function(ctx) {
        paintNum(ctx);
        var y = Y + cOffsetY;
        var s = me.getSize();
        ctx.lineWidth = me.prefs.size.pointborder;
        drawSemiRoundRect(ctx, X, y - s / 2, cPT.getX() - X, s, s / 2);
        ctx.fill();
        drawRoundRect(ctx, X, y - s / 2, cLength, s, s / 2);
        ctx.stroke();
        cPT.paint(ctx);
    };

    this.paintObject = function(ctx) {};

    this.getSource = function(src) {
        var _ex = E1.getUnicodeSource().replace(/\n/g, "\\n");
        if (anchor) {
            var mn = (min === null) ? "\"\"" : "\"" + min.getSource() + "\"";
            var t = "\"" + $U.native2ascii(T) + "\"";
            var mx = (max === null) ? "\"\"" : "\"" + max.getSource() + "\"";
            var ex = "\"" + _ex + "\"";
            src.geomWrite(false, this.getName(), "ExpressionOn", t, mn, mx, ex, anchor.getVarName(), Alpha);
        } else {
            var mn = (min === null) ? "" : min.getSource();
            var mx = (max === null) ? "" : max.getSource();
            var x = Cn.coordsSystem.x(X);
            var y = Cn.coordsSystem.y(Y);
            src.geomWrite(true, this.getName(), "Expression", $U.native2ascii(T), mn, mx, _ex, x, y);
        }

    };

    this.setCursorLength = function(_cl) {
        var bar = (cPT.getX() - X) / cLength
        cLength = _cl;
        var x = X + cLength * bar;
        cPT.setXY(x, cPT.getY());
    };

    this.getStyle = function(src) {
        var s = me.getStyleString();
        if (this.getPrecision() === -1)
            s += ";p:-1";
        s += ";cL:" + cLength;
        s += ";cPT:" + $U.base64_encode(cPT.getStyleString());

        src.styleWrite(true, me.getName(), "STL", s);
    };

    var isCursor = function() {
        return ((E1 !== null) && (min !== null) && (max !== null) &&
            ((E1.isEmpty()) || (E1.isNum())) && (min.isNum()) && (max.isNum()));
    };

    this.objToDelete = function() {
        if (isCursor())
            return cPT;
        else
            return this;
    };





    var setMethods = function() {
        //        console.log("curseur :" + isCursor());
        me.dx = E1.dx;
        me.dy = E1.dy;
        me.dz = E1.dz;
        me.dt = E1.dt;

        //        me.dx = (function() {
        //            return E1.dx;
        //        }());


        if (E1.isText()) {
            me.paintObject = paintText;
            //            Cn.remove(cPT);
            cPT.setXY(NaN, NaN);
        } else if (E1.isDxyztFunc()) {
            //            console.log("func");
            me.paintObject = paintDxyztFunc;
            cPT.setXY(NaN, NaN);
        } else if (E1.isDxyztDef()) {
            //            console.log("def");
            E1.setDxyzt();
            me.paintObject = paintDxyztDef;
            cPT.setXY(NaN, NaN);
        } else if (E1.isFunc()) {
            me.paintObject = paintFunction;
            cPT.setXY(NaN, NaN);
        } else if (isCursor()) {
            me.setParent(cPT);
            me.paintObject = paintCursor;
            if (E1.isEmpty()) {
                cPT.setXY(X + cLength / 2, Y + cOffsetY);
            } else {
                initCursorPos();
            }
        } else {
            me.paintObject = paintNum;
            cPT.setXY(NaN, NaN);
        }
    };


    // setExp pour les widgets :
    me.setExp = me.setE1 = function(_t) {
        if (E1)
            delete E1;
        E1 = new Expression(me, _t);
        setMethods();
        //        me.computeChilds();
    };
    me.getExp = function() {
        return me.getE1().getSource();
    };
    me.getE1 = function() {
        return E1;
    };

    me.setT = function(_t) {
        T = _t;
    };
    me.getText = function() {
        return T;
    };
    me.setMin = function(_t) {
        if (min)
            delete min;
        min = new Expression(me, _t);
        setMethods();
    };
    me.getMinSource = function() {
        if (min)
            return min.getSource();
        return "";
    };
    me.setMax = function(_t) {
        if (max)
            delete max;
        max = new Expression(me, _t);
        setMethods();
    };
    me.getMaxSource = function() {
        if (max)
            return max.getSource();
        return "";
    };

    // Refait à neuf la liste des parents :
    me.refreshNames = function() {
        if (E1)
            E1.refreshNames();
        if (min)
            min.refreshNames();
        if (max)
            max.refreshNames();
    };


    // Refait à neuf la liste des parents :
    me.refresh = function() {
        me.setParentList((isCursor()) ? [cPT] : []);
        if (E1)
            E1.refresh();
        if (min)
            min.refresh();
        if (max)
            max.refresh();
    };


    if (_exp !== "")
        me.setE1(_exp);
    if (_min !== "")
        me.setMin(_min);
    if (_max !== "")
        me.setMax(_max);


}
