function CoordsSystem(_C) {
    var me = this;
    var Cn = _C;
    var P = Cn.prefs; // Properties
    var OX = null;
    var OY = null;
    var Unit = 40; // x and y Axis units, in pixels
    var x0 = Cn.getBounds().width / 2; // x origin coord, in canvas coord system
    var y0 = Cn.getBounds().height / 2; // y origin coord, in canvas coord system
    var lockOx = false; // Dit si l'axe Ox doit être fixe (ne peut pas se déplacer verticalement) ou non
    var lockOy = false;
    var centerZoom = false;
    // Curieusement, sur webkit le lineTo du context n'accepte pas de paramètre x ou y 
    // supérieur à 2147483583. La valeur ci-dessous est la moitié de ce nombre :
    var maxInt = 1073741791;

    // Pour la restriction 3D :
    var theta = [];
    var phi = [];

    me.getX0 = function() {
        return x0;
    };

    me.getY0 = function() {
        return y0;
    };

    // Pour la restriction 3D de l'angle theta :
    me.restrictTheta = function(t) {
        theta = t;
    };
    // Pour la restriction 3D de l'angle phi :
    me.restrictPhi = function(t) {
        phi = t;
    };

    var restrict3D = function() {
        if (theta.length === 2) {
            if (y0 < theta[0])
                y0 = theta[0];
            else if (y0 > theta[1])
                y0 = theta[1];
        }
        if (phi.length === 2) {
            if (x0 < phi[0])
                x0 = phi[0];
            else if (x0 > phi[1])
                x0 = phi[1];
        }
    };

    me.getUnit = function() {
        return Unit;
    };

    me.zoom = function(_xz, _yz, _h) {
        Cn.getTrackManager().clear();
        _xz = ((centerZoom) || (me.islockOy())) ? x0 : _xz;
        _yz = ((centerZoom) || (me.islockOx())) ? y0 : _yz;
        _h = ((Unit * _h) > maxInt) ? 1 : _h;
        var V = Cn.elements();
        for (var i = 0, len = V.length; i < len; i++) {
            if ((V[i].isInstanceType("point")) && V[i].free()) {
                // S'il s'agit d'un point libre :
                V[i].setXY(_xz + (V[i].getX() - _xz) * _h, _yz + (V[i].getY() - _yz) * _h);
            }
            if (V[i].getCode() === "circle1") {
                V[i].setZoom(_h);
            }
        }
        x0 = _xz + (x0 - _xz) * _h;
        y0 = _yz + (y0 - _yz) * _h;
        Unit *= _h;
    };


    me.translate = function(_xt, _yt) {
        Cn.getTrackManager().clear();
        _yt = (me.islockOx()) ? 0 : _yt;
        _xt = (me.islockOy()) ? 0 : _xt;
        var V = Cn.elements();
        for (var i = 0, len = V.length; i < len; i++) {
            if ((V[i].isInstanceType("point")) && V[i].free()) {
                // S'il s'agit d'un point libre :
                V[i].setXY(V[i].getX() + _xt, V[i].getY() + _yt);
            }
        }
        x0 += _xt;
        y0 += _yt;
        restrict3D();
    };

    me.translateANDzoom = function(_xt, _yt, _xz, _yz, _h) {
        Cn.getTrackManager().clear();
        _yt = (me.islockOx()) ? 0 : _yt;
        _xt = (me.islockOy()) ? 0 : _xt;
        _xz = ((centerZoom) || (me.islockOy())) ? x0 : _xz;
        _yz = ((centerZoom) || (me.islockOx())) ? y0 : _yz;
        _h = ((Unit * _h) > maxInt) ? 1 : _h;
        var V = Cn.elements();
        for (var i = 0, len = V.length; i < len; i++) {
            if ((V[i].isInstanceType("point")) && V[i].free()) {
                // S'il s'agit d'un point libre :
                V[i].setXY(V[i].getX() + _xt, V[i].getY() + _yt);
                V[i].setXY(_xz + (V[i].getX() - _xz) * _h, _yz + (V[i].getY() - _yz) * _h);
            } else if (V[i].getCode() === "circle1") {
                V[i].setZoom(_h);
            }
        }
        x0 += _xt;
        y0 += _yt;
        restrict3D();
        x0 = _xz + (x0 - _xz) * _h;
        y0 = _yz + (y0 - _yz) * _h;
        Unit *= _h;
    };

    // Translate length in pixel to this coords system :
    me.l = function(_l) {
        return _l / Unit;
    };

    // Le contraire :
    me.lx = function(_l) {
        return _l * Unit;
    };

    // Translate area in square pixel to this coords system :
    me.a = function(_a) {
        return _a / (Unit * Unit);
    };

    // Translate canvas coords to this coords system :
    me.x = function(_px) {
        return (_px - x0) / Unit;
    };

    me.y = function(_py) {
        return (y0 - _py) / Unit;
    };

    me.xy = function(_t) {
        return [me.x(_t[0]), me.y(_t[1])];
    };

    // Translate this coords system to canvas coords :
    me.px = function(_x) {
        var x = (_x * Unit + x0);
        if (x > maxInt)
            return maxInt;
        if (x < -maxInt)
            return -maxInt;
        //        return (Math.round(x));
        return (x);
    };

    me.py = function(_y) {
        var y = (y0 - _y * Unit);
        if (y > maxInt)
            return maxInt;
        if (y < -maxInt)
            return -maxInt;
        //        return (Math.round(y));
        return (y);
    };



    me.setCoords = function(_x, _y, _u, _md3D) {
        x0 = _x;
        y0 = _y;
        Unit = _u;
        if (_md3D)
            Cn.set3D(true);
    };

    var paintOx = function(ctx) {
        ctx.beginPath();
        if ((y0 > 0) && (y0 < Cn.getHeight())) {
            ctx.moveTo(0, Math.round(y0));
            ctx.lineTo(Cn.getBounds().width, Math.round(y0));
            ctx.stroke();
        }
        var dx = 16,
            dy = 8;
        ctx.moveTo(Cn.getBounds().width + 1, Math.round(y0));
        ctx.lineTo(Cn.getBounds().width - dx, Math.round(y0) - dy);
        ctx.lineTo(Cn.getBounds().width - dx, Math.round(y0) + dy);
        ctx.lineTo(Cn.getBounds().width + 1, Math.round(y0));
        ctx.fill();
    };

    var paintOy = function(ctx) {
        ctx.beginPath();
        if ((x0 > 0) && (x0 < Cn.getBounds().width)) {
            ctx.moveTo(Math.round(x0), 0);
            ctx.lineTo(Math.round(x0), Cn.getBounds().height);
            ctx.stroke();
        }
        var dx = 16,
            dy = 8;
        ctx.moveTo(Math.round(x0), 0);
        ctx.lineTo(Math.round(x0) - dy, dx);
        ctx.lineTo(Math.round(x0) + dy, dx);
        ctx.lineTo(Math.round(x0), 0);
        ctx.fill();
    };

    var paintGridx = function(ctx) {
        var y = Math.min(Math.max(y0, 0), Cn.getHeight());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var min = (Math.round(inc * me.x(0))) * inv;
        var max = (Math.round(inc * me.x(Cn.getBounds().width)) + 1) * inv;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var x = Math.round(me.px(j));
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, Cn.getHeight());
            ctx.stroke();
        }
    };
    var paintGridy = function(ctx) {
        var x = Math.min(Math.max(x0, 0), Cn.getWidth());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var max = (Math.round(inc * me.y(0)) + 1) * inv;
        var min = (Math.round(inc * me.y(Cn.getHeight()))) * inv;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var y = Math.round(me.py(j));
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(Cn.getWidth(), y);
            ctx.stroke();
        }
    };

    var paintGradx = function(ctx) {
        var y = Math.min(Math.max(y0, 0), Cn.getHeight());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var min = (Math.round(inc * me.x(0))) * inv;
        var max = (Math.round(inc * me.x(Cn.getBounds().width)) + 1) * inv;
        var y1 = Math.round(y - P.grid.smalltick) - P.grid.axis_linewidth;
        var y2 = Math.round(y + P.grid.smalltick) + P.grid.axis_linewidth;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var x = Math.round(me.px(j));
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
        }
        inc /= 5;
        inv *= 5;
        min = (Math.round(inc * me.x(0))) * inv;
        max = (Math.round(inc * me.x(Cn.getBounds().width)) + 1) * inv;
        y1 = Math.round(y - P.grid.longtick) - P.grid.axis_linewidth;
        y2 = Math.round(y + P.grid.longtick) + P.grid.axis_linewidth;
        var prec = (log < 0) ? 0 : log;
        ctx.textAlign = "center";
        ctx.fillStyle = P.grid.grid_color;
        ctx.font = P.grid.fontsize + "px " + P.grid.font;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var x = Math.round(me.px(j));
            var test = (!me.isOy()) ? true : (j !== 0);
            if (test) {
                ctx.beginPath();
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.stroke();
                if (y0 > y) {
                    ctx.fillText($L.number(j.toFixed(prec)), x, y1 - P.grid.fontsize / 2);
                } else {
                    ctx.fillText($L.number(j.toFixed(prec)), x, y2 + P.grid.fontsize);
                }
            }
        }
    };

    var paintGrady = function(ctx) {
        var x = Math.min(Math.max(x0, 0), Cn.getWidth());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var max = (Math.round(inc * me.y(0)) + 1) * inv;
        var min = (Math.round(inc * me.y(Cn.getHeight()))) * inv;
        var x1 = Math.round(x - P.grid.smalltick) - P.grid.axis_linewidth;
        var x2 = Math.round(x + P.grid.smalltick) + P.grid.axis_linewidth;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var y = Math.round(me.py(j));
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
        }
        inc /= 5;
        inv *= 5;
        max = (Math.round(inc * me.y(0)) + 1) * inv;
        min = (Math.round(inc * me.y(Cn.getHeight()))) * inv;
        x1 = Math.round(x - P.grid.longtick) - P.grid.axis_linewidth;
        x2 = Math.round(x + P.grid.longtick) + P.grid.axis_linewidth;
        var prec = (log < 0) ? 0 : log;
        ctx.textAlign = "left";
        ctx.fillStyle = P.grid.grid_color;
        ctx.font = P.grid.fontsize + "px " + P.grid.font;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var y = Math.round(me.py(j));
            var test = (!me.isOx()) ? true : (j !== 0);
            if (test) {
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.stroke();
                var num = $L.number(j.toFixed(prec));
                if (x0 < 0) {
                    ctx.fillText(num, x2 + 2, y + P.grid.fontsize / 2 - 2);
                } else {
                    var w = ctx.measureText(num).width;
                    ctx.fillText(num, x1 - w - 2, y + P.grid.fontsize / 2 - 2);
                }
            }

        }
    };

    me.paintGrid = function(ctx) {
        ctx.lineWidth = P.grid.grid_linewidth;
        paintGridx(ctx);
        paintGridy(ctx);
    }

    me.paint_Grid = me.paintGrid;

    me.paintOx = function(ctx) {
        ctx.lineWidth = P.grid.tick_linewidth;
        paintGradx(ctx);
        ctx.lineWidth = P.grid.axis_linewidth;
        paintOx(ctx);
    }
    me.paint_Ox = me.paintOx;

    me.paintOy = function(ctx) {
        ctx.lineWidth = P.grid.tick_linewidth;
        paintGrady(ctx);
        ctx.lineWidth = P.grid.axis_linewidth;
        paintOy(ctx);
    }
    me.paint_Oy = me.paintOy;

    me.paintAll = function(ctx) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = P.grid.grid_color;
        ctx.strokeStyle = P.grid.grid_color;
        me.paint_Grid(ctx);
        me.paint_Ox(ctx);
        me.paint_Oy(ctx);
    };

    me.paint = $U.nullproc;

    me.setOX = function(_ox) {
        OX = _ox;
    };
    me.setOY = function(_oy) {
        OY = _oy;
    };

    me.showCS = function(_v) {
        me.paint = (_v) ? me.paintAll : $U.nullproc;
        if (_v) {
            if (!OX) {
                OX = new OXObject(Cn, "ox");
                Cn.add(OX);
                OX.compute();
            }
            if (!OY) {
                OY = new OYObject(Cn, "oy");
                Cn.add(OY);
                OY.compute();
            }
        }
    };
    me.isCS = function() {
        return (me.paint === me.paintAll);
    };

    me.showGrid = function(_v) {
        me.paint_Grid = (_v) ? me.paintGrid : $U.nullproc;
    };
    me.isGrid = function() {
        return (me.paint_Grid === me.paintGrid);
    };
    me.showOx = function(_v) {
        me.paint_Ox = (_v) ? me.paintOx : $U.nullproc;
    };
    me.isOx = function() {
        return (me.paint_Ox === me.paintOx);
    };
    me.showOy = function(_v) {
        me.paint_Oy = (_v) ? me.paintOy : $U.nullproc;
    };
    me.isOy = function() {
        return (me.paint_Oy === me.paintOy);
    };
    me.setColor = function(_c) {
        P.grid.grid_color = _c;
    };
    me.getColor = function() {
        return P.grid.grid_color;
    };
    me.getFontSize = function() {
        return P.grid.fontsize;
    };
    me.setFontSize = function(_s) {
        P.grid.fontsize = _s;
    };
    me.getAxisWidth = function() {
        return P.grid.axis_linewidth;
    };
    me.setAxisWidth = function(_s) {
        P.grid.axis_linewidth = _s;
    };
    me.getGridWidth = function() {
        return P.grid.grid_linewidth;
    };
    me.setGridWidth = function(_s) {
        P.grid.grid_linewidth = _s;
    };
    me.setlockOx = function(_l) {
        lockOx = _l;
    };
    me.islockOx = function() {
        return lockOx;
    };
    me.setlockOy = function(_l) {
        lockOy = _l;
    };
    me.islockOy = function() {
        return lockOy;
    };
    me.setCenterZoom = function(_b) {
        centerZoom = _b;
    };
    me.isCenterZoom = function(_b) {
        return centerZoom;
    };

    me.getSource = function() {
        var mode3d = (Cn.is3D()) ? ",true" : "";
        var txt = "SetCoords(" + x0 + "," + y0 + "," + Unit + mode3d + ");\n";
        return txt;
    };

    me.getStyle = function() {
        var t = "SetCoordsStyle(\"";
        if (Cn.is3D())
            t += "3Dmode:true;";
        t += "isAxis:" + me.isCS();
        t += ";isGrid:" + me.isGrid();
        t += ";isOx:" + me.isOx();
        t += ";isOy:" + me.isOy();
        t += ";isLockOx:" + me.islockOx();
        t += ";isLockOy:" + me.islockOy();
        t += ";centerZoom:" + me.isCenterZoom();
        t += ";color:" + me.getColor();
        t += ";fontSize:" + me.getFontSize();
        t += ";axisWidth:" + me.getAxisWidth();
        t += ";gridWidth:" + me.getGridWidth();
        t += "\");\n";
        return t;
    };

}
