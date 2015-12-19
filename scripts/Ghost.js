function Ghost(_canvas) {
    var me = this;
    var X;
    var Y;
    var path = [];
    var lines = [];
    var currentLine = null;
    var ghostOn = false;
    var polygon = false;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();

    var prec2 = canvas.prefs.precision.caress;
    prec2 *= prec2;
    var minLength = 5;
    //    if (Object.touchpad) {
    //        minLength*=canvas.prefs.precision.over.touchfactor;
    //    }


    var record = function(_x, _y) {
        var pos = {
            "x": _x,
            "y": _y
        };
        path.push(pos);
    };

    var getIndicatedPoint = function() {
        var inds = canvas.getConstruction().getIndicated();
        var len = inds.length;
        for (var i = 0; i < len; i++) {
            if (inds[i].isInstanceType("point")) {
                return inds[i];
            }
        }
        return null;
    };

    me.ghost = function(_sim) {
        ghostOn = ((_sim) && (canvas.getConstruction().getMode() === 7));
    };

    me.clear = function() {
        path = [];
        lines = [];
        ghostOn = false;
        polygon = false;
    };

    me.setXY = function(ev) {
        me.clear();
        X = canvas.mouseX(ev);
        Y = canvas.mouseY(ev);
        currentLine = new GhostLine(X, Y);
        lines.push(currentLine);
        record(X, Y);
    };

    var vector = function(x, y) {
        return {
            x: x,
            y: y
        };
    };

    var delta = function(a, b) {
        return vector(a.x - b.x, a.y - b.y);
    };

    var angle_between = function(a, b) {
        return Math.acos((a.x * b.x + a.y * b.y) / (len(a) * len(b)));
    };

    var len = function(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };



    var findCorner = function() {
        var n = 0;
        var t = 0;
        var angleMin = (lines.length === 1) ? Math.PI / 3 : Math.PI / 4;
        for (var i = 1; i < path.length - 2; i++) {
            var pt = path[i + 1];
            var d = delta(path[0], path[i - 1]);
            if (len(d) > 20 && n > 2) {
                var ac = delta(path[i - 1], pt);
                if (Math.abs(angle_between(ac, d)) > angleMin) {
                    return i;
                }
            }
            n++;
        }
        return false;
    };

    var linesLength = function() {
        var ln = lines.length;
        var totalLength = 0;
        for (var i = 0; i < ln - 1; i++) {
            totalLength += lines[i].length();
        }
        if (ln > 0) totalLength += len(delta(path[0], path[path.length - 1]));
        return totalLength;
    };

    var createPoint = function(_P, ev, checkPointOn) {
        if (!_P.getPointObject()) {
            var pc = canvas.getPointConstructor();
            if (checkPointOn) {
                pc.setInitialObjects(canvas.getConstruction().getIndicated());
            }
            var o1 = pc.createObj(canvas, ev);
            o1.setXY(_P.getX(), _P.getY());
            _P.setPointObject(o1);
            pc.clearC();
            canvas.getConstruction().validate(ev);
        }
    };

    me.recordXY = function(ev) {
        if (ghostOn) {
            var x = canvas.mouseX(ev);
            var y = canvas.mouseY(ev);
            record(x, y);
            currentLine.record(getIndicatedPoint(), x, y);


            if (linesLength() < minLength) return;

            canvas.stopChrono();
            var cornerPos = findCorner();
            if (cornerPos) {
                polygon = true;
                var corner = path[cornerPos];
                var P1 = currentLine.getP1();
                var P2 = currentLine.getP2();
                createPoint(P1, ev);
                createPoint(P2, ev, true);
                path = path.slice(cornerPos);
                currentLine = new GhostLine(corner.x, corner.y);
                lines.push(currentLine);
                currentLine.getP1().setPointObject(P2.getPointObject());
            };
        }
    };

    me.isInside = function(ev) {
        var x0 = canvas.mouseX(ev);
        var y0 = canvas.mouseY(ev);
        return (((X - x0) * (X - x0) + (Y - y0) * (Y - y0)) < prec2);
    };


    var paintPath = function(ctx) {
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 10;
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        var len = path.length;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (var i = 1; i < len; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.moveTo(path[len - 1].x, path[len - 1].y);
        ctx.closePath();
        ctx.stroke();
    };


    var paintLines = function(ctx) {
        var len = lines.length;
        ctx.lineWidth = canvas.prefs.size.line;
        ctx.globalAlpha = 0.5;
        if (Object.touchpad) {
            ctx.lineWidth *= canvas.prefs.size.touchfactor;
        }
        if (polygon) {
            ctx.strokeStyle = canvas.prefs.color.area;
        } else {
            var P1 = currentLine.getP1();
            var P2 = currentLine.getP2();
            ctx.strokeStyle = canvas.prefs.color.line;
            if ((P1.isLimited()) && (P2.isLimited())) {
                ctx.strokeStyle = canvas.prefs.color.segment;
            } else if ((P1.isLimited()) || (P2.isLimited())) {
                ctx.strokeStyle = canvas.prefs.color.ray;
            }
        }
        for (var i = 0; i < len; i++) {
            lines[i].draw(ctx, polygon);
        }
    };

    me.paint = function(ctx) {
        if (ghostOn) {
            if (linesLength() < minLength) return;
            paintPath(ctx);
            paintLines(ctx);
        }
    };



    me.create = function(ev) {
        if (ghostOn) {
            ghostOn = false;
            if (linesLength() < minLength) return;
            if (polygon) {
                // Création des sommets et du polygone :
                var Aoc = canvas.getConstructor("area");
                Aoc.clearC();
                var len = lines.length;
                for (var i = 0; i < len; i++) {
                    createPoint(lines[i].getP1(), ev);
                    Aoc.addC(lines[i].getP1().getPointObject());
                }
                createPoint(lines[len - 1].getP2(), ev, true);



                //                A décommenter pour le rendu du polygone :
                //                Aoc.addC(lines[len-1].getP2().getPointObject());
                //                if (lines[0].getP1().getPointObject()!=lines[len-1].getP2().getPointObject()) {
                //                    Aoc.addC(lines[0].getP1().getPointObject());
                //                }
                //                Aoc.createObj(canvas, ev);
                // Création des segments :
                var Soc = canvas.getConstructor("segment");

                len = lines.length;
                for (var i = 0; i < len; i++) {
                    Soc.clearC();
                    Soc.addC(lines[i].getP1().getPointObject());
                    Soc.addC(lines[i].getP2().getPointObject());
                    Soc.createObj(canvas, ev);
                }
                if (lines[0].getP1().getPointObject() !== lines[len - 1].getP2().getPointObject()) {
                    Soc.clearC();
                    Soc.addC(lines[0].getP1().getPointObject());
                    Soc.addC(lines[len - 1].getP2().getPointObject());
                    Soc.createObj(canvas, ev);
                }


            } else {
                var P1 = lines[0].getP1();
                var P2 = lines[0].getP2();

                var oc2 = canvas.getConstructor("line");
                if ((P1.isLimited()) && (P2.isLimited())) {
                    oc2 = canvas.getConstructor("segment");
                }
                if ((P1.isLimited()) && (!P2.isLimited())) {
                    oc2 = canvas.getConstructor("ray");
                }
                if ((!P1.isLimited()) && (P2.isLimited())) {
                    oc2 = canvas.getConstructor("ray");
                    var P = P1;
                    P1 = P2;
                    P2 = P;
                }
                createPoint(P1, ev);
                createPoint(P2, ev, true);
                oc2.clearC();
                oc2.addC(P1.getPointObject());
                oc2.addC(P2.getPointObject());
                oc2.createObj(canvas, ev);
            }
            canvas.paint(ev);
        }
    };

    var mousedown = false;
    var mousePressed = function(ev) {
        me.clear();
        me.setXY(ev);
        ghostOn = true;
        mousedown = true;
    };
    var mouseMoved = function(ev) {
        if (mousedown) {
            me.recordXY(ev);
            Cn.validate(ev);
            canvas.paint(ev);
        }
    };
    var mouseReleased = function(ev) {
        mousedown = false;
        me.create(ev);
        Cn.validate(ev);
        Cn.clearSelected();
        Cn.clearIndicated();
        canvas.paint(ev);
        ghostOn = false;
    };

    me.start = function() {
        canvas.setPressedFilter(mousePressed);
        canvas.setMovedFilter(mouseMoved);
        canvas.setReleasedFilter(mouseReleased);
    }


};


function GhostLine(_x, _y) {
    var me = this;
    var prec = 200;
    var P1 = new GhostPoint(_x, _y);
    var P2 = new GhostPoint(_x, _y);

    me.getP1 = function() {
        return P1;
    };
    me.getP2 = function() {
        return P2;
    };

    me.length = function() {
        var x1 = P1.getX(),
            y1 = P1.getY();
        var x2 = P2.getX(),
            y2 = P2.getY();
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };

    me.record = function(_P, _x, _y) {
        setP2(_x, _y);
        if (_P) {
            var p1 = P1.getPointObject();
            var p2 = P2.getPointObject();
            if ((_P === p1) || (_P === p2)) {
                return;
            }
            if (!p1) {
                P1.setPointObject(_P);
                return;
            }
            if (!p2) {
                P2.setPointObject(_P);
                return;
            }
        }
    };

    var setP2 = function(_x, _y) {
        P2.setXY(_x, _y);
    };

    me.draw = function(ctx, polygon) {
        $U.drawPartialLine(ctx, P1.getX(), P1.getY(), P2.getX(), P2.getY(), !polygon && !P1.isLimited(), !polygon && !P2.isLimited());
    };
}

function GhostPoint(_x, _y) {
    var me = this;
    var P = null;
    var limited = false;
    var x = _x;
    var y = _y;

    me.getX = function() {
        if (P) {
            return P.getX();
        }
        return x;
    };

    me.getY = function() {
        if (P) {
            return P.getY();
        }
        return y;
    };

    me.isLimited = function() {
        return limited;
    };

    //Only for P2 :
    me.setXY = function(_x, _y) {
        x = _x;
        y = _y;
        if (P) {
            var x0 = P.getX();
            var y0 = P.getY();
            limited = ((x - x0) * (x - x0) + (y - y0) * (y - y0)) < 10000;
        }
    };

    me.getPointObject = function() {
        return P;
    };

    me.setPointObject = function(_P) {
        P = _P;
        var x0 = P.getX();
        var y0 = P.getY();
        limited = ((x - x0) * (x - x0) + (y - y0) * (y - y0)) < 10000;
        x = x0;
        y = y0;
    };

    me.draw = function(ctx) {
        if (!P) {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
