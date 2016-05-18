function TurtleObject(_canvas) {
    var me = this;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var U, V, W, P, TAB, is3D, X2D, Y2D, U2D, V2D, ORG3D, pt3D;
    var imW, imH;
    var show = false;
    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/turtle.png";
    img.onload = function() {
        imW = this.width;
        imH = this.height;
    };

    me.isOn = function() {
        return show;
    }

    me.reset = function(_n) {
        if ((show) && (_n === P.getVarName())) {
            U = [1, 0, 0];
            V = [0, 1, 0];
            W = [0, 0, 1];
            TAB = [];
        }
    }

    me.show = function(_pt) {
        U = [1, 0, 0];
        V = [0, 1, 0];
        W = [0, 0, 1];
        TAB = []; // Tableau représentant le parcours
        P = _pt; // PointObject
        is3D = (P.is3D() || Cn.isOrigin3D(P));
        X2D = 0; // Abscisse du point en pixels
        Y2D = 0; // Ordonnée du point en pixels
        U2D = []; // vecteur U en pixels
        V2D = []; // vecteur V en pixels
        ORG3D = Cn.get3DOrigin(null);
        pt3D = Cn.getInterpreter().getEX().EX_point3D;
        show = true;
        Cn.computeAll();
    };

    me.hide = function() {
        show = false;
    };

    me.changeUVW = function(_n, _u, _v, _w) {
        if ((show) && (_n === P.getVarName())) {
            U = _u;
            V = _v;
            W = _w;
        }
    };

    me.changePT = function(_n, _p) {
        if ((show) && (_n === P.getVarName())) {
            TAB.push(_p);
        }
    };

    var compute = function() {
        var pt = (TAB.length === 0) ? P.getValue() : TAB[TAB.length - 1];
        // console.log(pt);
        if (is3D) {
            var org = [Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())];
            var c2d = pt3D(org, pt);
            X2D = Cn.coordsSystem.px(c2d[0]);
            Y2D = Cn.coordsSystem.py(c2d[1]);
            c2d = pt3D(org, U);
            U2D = [Cn.coordsSystem.px(c2d[0]) - ORG3D.getX(), Cn.coordsSystem.py(c2d[1]) - ORG3D.getY()];
            c2d = pt3D(org, V);
            V2D = [Cn.coordsSystem.px(c2d[0]) - ORG3D.getX(), Cn.coordsSystem.py(c2d[1]) - ORG3D.getY()];
        } else {
            X2D = Cn.coordsSystem.px(pt[0]);
            Y2D = Cn.coordsSystem.py(pt[1]);
            U2D = [Cn.coordsSystem.lx(U[0]), -Cn.coordsSystem.lx(U[1])];
            V2D = [Cn.coordsSystem.lx(V[0]), -Cn.coordsSystem.lx(V[1])];
        };
    };



    me.paint = function() {
        if (show) {
            compute();
            var ctx = canvas.getContext();
            if (is3D) {
                var ah = 0.6;
                var bh = 0.25;
                var ch = 0.2;
                ctx.beginPath();
                ctx.strokeStyle = "#222222";
                ctx.lineWidth = 1;
                ctx.fillStyle = (U2D[0] * V2D[1] - U2D[1] * V2D[0] < 0) ? "#00FF00" : "#555555";
                ctx.moveTo(X2D + U2D[0] * ah, Y2D + U2D[1] * ah);
                ctx.lineTo(X2D - V2D[0] * bh, Y2D - V2D[1] * bh);
                ctx.lineTo(X2D + U2D[0] * ch, Y2D + U2D[1] * ch);
                ctx.lineTo(X2D + V2D[0] * bh, Y2D + V2D[1] * bh);
                ctx.lineTo(X2D + U2D[0] * ah, Y2D + U2D[1] * ah);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.save();
                ctx.translate(X2D, Y2D);
                ctx.rotate(Math.atan2(U2D[1], U2D[0]));
                // ctx.setTransform(U2D[0] / du, U2D[1] / du, V2D[0] / dv, V2D[1] / dv, X2D, Y2D);
                ctx.drawImage(img, -imW / 2, -imH / 2, imW, imH);
                ctx.restore();
            }
        }
    };

}
