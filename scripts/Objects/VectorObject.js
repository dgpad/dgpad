//************************************************
//*************** VECTOR OBJECT ******************
//************************************************
function VectorObject(_construction, _name, _P1, _P2) {
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, _P1, _P2, true)); // Héritage
    var me = this;
    this.setParent(this.P1, this.P2);
    var Cn = _construction;

    this.getCode = function() {
        return "vector";
    };

    this.getAssociatedTools = function() {
        return superObject.getAssociatedTools() + ",midpoint,perpbis";
    };

    // Pour l'interpréteur de DG_scripts :
    this.coords2D = function() {
        var vx = me.getCn().coordsSystem.x(me.P2.getX()) - me.getCn().coordsSystem.x(me.P1.getX());
        var vy = me.getCn().coordsSystem.y(me.P2.getY()) - me.getCn().coordsSystem.y(me.P1.getY());
        return [vx, vy];
    };

    // Pour l'interpréteur de DG_scripts :
    this.coords3D = function() {
        me.P1.coords3D();
        me.P2.coords3D();
    };

    // Pour l'interpréteur de DG_scripts :
    this.getOldcoords = function() {
        var p1 = me.P1.getOldcoords();
        var p2 = me.P2.getOldcoords();
        return [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    };


    this.getValue = function() {
        if ((Cn.is3D()) && (me.is3D())) {
            var p1 = me.P1.coords3D();
            var p2 = me.P2.coords3D();
            return [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
        }
        var vx = me.getCn().coordsSystem.x(me.P2.getX()) - me.getCn().coordsSystem.x(me.P1.getX());
        var vy = me.getCn().coordsSystem.y(me.P2.getY()) - me.getCn().coordsSystem.y(me.P1.getY());
        return [vx, vy];
    };

    //        this.getValue = function() {
    //        return (me.getCn().coordsSystem.l(me.R));
    //    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
        if (a > 1) {
            p.setAlpha(1);
        }
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var aMin = 0,
            aMax = 1;
        var step = (aMax - aMin) / (_nb - 1);
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < _nb; i++) {
            Ptab.push({
                "alpha": aMin + step * i,
                "x": 0,
                "y": 0,
                "x1": 0,
                "y1": 0,
                "r": 0
            });
        }
        return Ptab;
    };

    this.setLocusAlpha = function(p, a) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xB = this.P2.getX();
        var yB = this.P2.getY();
        p.setXY(xA + a * (xB - xA), yA + a * (yB - yA));
    };

    this.getXmax = function() {
        return this.P1.getX();
    };
    this.getYmax = function() {
        return this.P1.getY();
    };
    this.getXmin = function() {
        return this.P2.getX();
    };
    this.getYmin = function() {
        return this.P2.getY();
    };

    this.isInstanceType = function(_c) {
        return ((_c === "line") || (_c === "segment"));
    };

    // see if point inside 2 border points
    this.checkIfValid = function(_P) {
        var xA = Math.min(this.P1.getX(), this.P2.getX());
        var yA = Math.min(this.P1.getY(), this.P2.getY());
        var xB = Math.max(this.P1.getX(), this.P2.getX());
        var yB = Math.max(this.P1.getY(), this.P2.getY());
        var xp = _P.getX();
        var yp = _P.getY();
        if ((xp < xA) || (xp > xB) || (yp < yA) || (yp > yB)) {
            _P.setXY(NaN, NaN);
        }
    };




    this.mouseInside = function(ev) {
        return $U.isNearToSegment(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.paintLength = function(ctx) {
        ctx.save();

        var a = Math.atan2(this.P2.getY() - this.P1.getY(), this.P2.getX() - this.P1.getX());
        if ((a < -$U.halfPI) || (a > $U.halfPI)) {
            a += Math.PI;
        }

        ctx.textAlign = "center";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.translate((this.P1.getX() + this.P2.getX()) / 2, (this.P1.getY() + this.P2.getY()) / 2);
        ctx.rotate(a);

        var prec = this.getPrecision();
        var display = Math.round($U.d(this.P1, this.P2) / this.getUnit() * prec) / prec;

        ctx.fillText($L.number(display), 0, -this.prefs.fontmargin - this.getRealsize() / 2);
        ctx.restore();
    };

    this.paintObject = function(ctx) {
        var x1 = this.P1.getX(),
            y1 = this.P1.getY();
        var x2 = this.P2.getX(),
            y2 = this.P2.getY();
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineCap = 'butt';
        var headlen = me.prefs.size.vectorhead;
        var angle = Math.atan2(y2 - y1, x2 - x1);
        var c1 = Math.cos(angle - Math.PI / 8);
        var s1 = Math.sin(angle - Math.PI / 8);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 8), y2 - headlen * Math.sin(angle + Math.PI / 8));
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();
        ctx.fill();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Vector", this.P1.getVarName(), this.P2.getVarName());
    };


    this.setDefaults("vector");

}
