$P = {};

$P.background = {};
$P.background.color = "#F8F8F8";
//$P.background.color = "hsl(0,0%,90%)";
//$P.background.image = $APP_PATH+"NotPacked/images/controls/noise.png";
//$P.background.gradient = "-linear-gradient(hsla(0,0%,100%,.7), hsla(0,0%,100%,.4))";
//$P.background.repeat = "repeat";
//$P.background.position = "0px 0px";

$P.color = {};
$P.color.hilite = "#ffbb00"; // Attention : minuscules importantes...
$P.color.selected = "#FF0000";
$P.color.point = "rgb(0,0,178)";
$P.color.list = "rgb(0,0,178)";
$P.color.segment = "#006633";
$P.color.vector = "#006633";
$P.color.line = "#780013";
$P.color.circle = "#CC66CC";
$P.color.area = "#006633";
$P.color.ray = "#993300";
$P.color.angle = "#006633";
$P.color.fixedangle = "#006633";
$P.color.quadric = "#00ADFF";
$P.color.point_free = "rgba(255,255,255,1)";
$P.color.point_on = "rgba(255,255,255,1)";
$P.color.point_inter = "#ccc";
$P.color.point_fixed = "#ccc";

$P.opacity = {};
$P.opacity.point = 0;
$P.opacity.area = 0.2;
$P.opacity.vector = 0.2;
$P.opacity.blockly_button = 0.1;

$P.grid = {};
$P.grid.limitinf = 15;
$P.grid.font = "Verdana";
$P.grid.fontsize = 18;
$P.grid.smalltick = 5;
$P.grid.longtick = 10;
$P.grid.grid_color = "#111111"; // en hexa forcément
$P.grid.grid_linewidth = 0.1;
$P.grid.tick_linewidth = 1;
$P.grid.axis_linewidth = 1;

$P.size = {};
$P.size.marginwidth = 0;
$P.size.marginheight = 0;
$P.size.touchfactor = 1 * $SCALE;
$P.size.point = 6 * $SCALE;
$P.size.list = 1 * $SCALE;
$P.size.pointborder = 2 * $SCALE;
$P.size.line = 1 * $SCALE;
$P.size.angle = 4 * $SCALE;
$P.size.fixedangle = 1 * $SCALE;
$P.size.expression = 7 * $SCALE;
$P.size.expression_cursor = 10 * $SCALE;
$P.size.dash = [6, 10];
$P.size.partiallines = 100;
$P.size.vectorhead = 20;
$P.size.blockly_button = 3;


$P.sizefactor = {};
$P.sizefactor.expression = 1 * $SCALE;
$P.sizefactor.expression_cursor = 1 * $SCALE;

$P.oversizefactor = {};
$P.oversizefactor.expression = 1 * $SCALE;
$P.oversizefactor.expression_cursor = 1 * $SCALE;

$P.fontsize = {};
$P.fontsize.point = 30 * $SCALE;
$P.fontsize.segment = 24 * $SCALE;
$P.fontsize.angle = 24 * $SCALE;
$P.fontsize.fixedangle = 24 * $SCALE;
$P.fontsize.expression = 24 * $SCALE;
$P.fontsize.blockly_button = 24 * $SCALE;
$P.font = "Verdana";
$P.fontmargin = 5;

$P.precision = {};
$P.precision.timeout = 2000;
$P.precision.edit_timeout = 5000;
$P.precision.caress = 5;
// -1 pour ne pas afficher la longueur :
$P.precision.point = -1;
$P.precision.segment = -1;
$P.precision.vector = -1;
$P.precision.area = -1;
$P.precision.angle = 1;
$P.precision.fixedangle = 1;
$P.precision.expression = 2;


$P.precision.over = {};
$P.precision.over.touchfactor = 4;
$P.precision.over.point = 10;
$P.precision.over.list = 10;
$P.precision.over.line = 6;
$P.precision.over.expression_cursor = 16;


$P.magnifyfactor = {};
$P.magnifyfactor.point = 2;
$P.magnifyfactor.line = 2;
$P.magnifyfactor.expression_cursor = 1;
$P.magnifyfactor.expression = 1;
$P.magnifyfactor.list = 1;

$P.selectedfactor = {};
$P.selectedfactor.point = 2;
$P.selectedfactor.line = 2;
$P.selectedfactor.expression_cursor = 1;
$P.selectedfactor.expression = 1;
$P.selectedfactor.list = 1;

$P.tool = {};
$P.tool.size = 50 * $SCALE;
$P.tool.touchfactor = 1.2;
$P.tool.gap = 5 * $SCALE;
$P.tool.marginV = 30 * $SCALE;

$P.controlpanel = {};
$P.controlpanel.size = 42 * $SCALE;
$P.controlpanel.color = "hsl(0,0%,90%)";
//$P.controlpanel.color="#D1D6DA";

$P.localstorage = {};
$P.localstorage.base = "DGPad_";
$P.localstorage.max = 20;
$P.localstorage.iconwidth = 300;
$P.localstorage.iconmargin = 20;

$P.MobileScale = 0.7;
$P.MacroPanelWidth = 200;
$P.CalcPanelHeight = 72;

$P.MagnifierBounds = {};
$P.MagnifierBounds.l = 10;
$P.MagnifierBounds.t = 10;
$P.MagnifierBounds.w = 75;
$P.MagnifierBounds.captureWidth = 75;

$P.clone = function() {
    return JSON.parse(JSON.stringify($P));
};
function Color() {
    var me = this;
    var r = 0,
        g = 0,
        b = 0,
        a = 0;
    var hex = "";
    var rgb = "";
    var rgba = "";

    me.getHEX = function() {
        return hex;
    };

    me.getRGB = function() {
        return rgb;
    };

    me.getRGBA = function() {
        return rgba;
    };

    me.getR = function() {
        return r;
    };
    me.getG = function() {
        return g;
    };
    me.getB = function() {
        return b;
    };
    me.getOpacity = function() {
        return a;
    };
    me.setOpacity = function(_a) {
        me.setRGBA(r, g, b, _a);
    };
    me.setRGBA = function(_r, _g, _b, _a) {
        var t = "rgba(" + _r + "," + _g + "," + _b + "," + _a + ")";
        me.set(t);
    };

    me.set = function(color) {
        var cache, p = parseInt;

        color = color.replace(/\s\s*/g, '');

        // Checks for 6 digit hex and converts string to integer
        if (cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))
            cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)];

        // Checks for 3 digit hex and converts string to integer
        else if (cache = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))
            cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17];

        // Checks for rgba and converts string to
        // integer/float using unary + operator to save bytes
        else if (cache = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3], +cache[4]];

        // Checks for rgb and converts string to
        // integer/float using unary + operator to save bytes
        else if (cache = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3]];

        // Otherwise throw an exception to make debugging easier
        else
            throw Error(color + ' is not supported...');

        // Performs RGBA conversion by default
        isNaN(cache[3]) && (cache[3] = 1);

        r = cache[0];
        g = cache[1];
        b = cache[2];
        a = cache[3];
        var myrgb = b | (g << 8) | (r << 16) | (0x1000000);
        hex = '#' + myrgb.toString(16).substring(1);
        rgb = "rgb(" + r + "," + g + "," + b + ")";
        rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };


}
// Global utils object "$U" accessible from everywhere :
var $U = {};

$U.doublePI = 2 * Math.PI;
$U.halfPI = Math.PI / 2;

$U.nullproc = function() {};


$U.lang = function() {
    var language_Code = navigator.language || navigator.userLanguage;
    language_Code = language_Code.toUpperCase().split("-")[0];
    // Trouver éventuellement un paramètre de langue dans le script du body :
    if ($BODY_SCRIPT.hasAttribute("data-lang"))
        language_Code = $BODY_SCRIPT.getAttribute("data-lang").toUpperCase();
    return language_Code
}


$U.katexLoaded = function(_callback, _args) {
    if (typeof katex === 'undefined') {
        if ((_callback) && ($U.katexLoaded.callbacks.indexOf(_callback) === -1)) {
            $U.katexLoaded.callbacks.push(_callback);
            $U.katexLoaded.args.push(_args);
        }
        if (!$U.katexLoaded.loaded) {
            var parent = document.getElementsByTagName("head")[0];
            var lnk = document.createElement("link");
            lnk.rel = "stylesheet";
            lnk.href = $APP_PATH + "NotPacked/thirdParty/katex.min.css";
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = $APP_PATH + "NotPacked/thirdParty/katex.min.js";
            script.onload = function() {
                for (var i = 0; i < $U.katexLoaded.callbacks.length; i++) {
                    if ($U.katexLoaded.callbacks[i]) {
                        var proc = $U.katexLoaded.callbacks[i];
                        var args = $U.katexLoaded.args[i];
                        // callback will be call twice because
                        // of dynamic font loading :
                        proc.apply(null, args);
                        setTimeout(function() {
                            proc.apply(null, args);
                        }, 500);
                    }
                }
            }
            parent.appendChild(lnk);
            parent.appendChild(script);
            $U.katexLoaded.loaded = true;
        }
        return false;
    }
    return true;
}

$U.katexLoaded.loaded = false;
$U.katexLoaded.callbacks = [];
$U.katexLoaded.args = [];


// $U.loadKaTeX = function(_callback) {
//     if (!$U.loadKaTeX.loaded) {
//         var parent = document.getElementsByTagName("head")[0];
//         var lnk = document.createElement("link");
//         lnk.rel = "stylesheet";
//         lnk.href = $APP_PATH + "NotPacked/thirdParty/katex.min.css";
//         //        lnk.href = "http://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.css";
//         var script = document.createElement("script");
//         script.type = "text/javascript";
//         script.src = $APP_PATH + "NotPacked/thirdParty/katex.min.js";
//         //        script.src = "http://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.js";
//         script.onload = function() {
//             if (_callback) _callback();
//             //            script.id = "MathJax";
//         }
//         parent.appendChild(lnk);
//         parent.appendChild(script);
//         $U.loadKaTeX.loaded = true;
//         return false;
//     }
//     return true;
// }

// $U.loadKaTeX.loaded = false;


$U.native2ascii = function(str) {
    var out = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 0x80) {
            out += str.charAt(i);
        } else {
            var u = "" + str.charCodeAt(i).toString(16);
            out += "\\u" + (u.length === 2 ? "00" + u : u.length === 3 ? "0" + u : u);
        }
    }
    return out;
};

// Convert numéric string with 0->a, 1->b, 2->c, etc...
$U.number2letter = function(_n) {
    var a = "a".charCodeAt(0);
    var z = "0".charCodeAt(0);
    var st = "";
    for (var i = 0; i < _n.length; i++) {
        st += String.fromCharCode(a + _n.charCodeAt(i) - z);
    }
    return st;
};

$U.isStr = function(_x) {
    return (typeof _x === "string");
};
$U.isArray = function(_x) {
    return (Object.prototype.toString.call(_x) === '[object Array]');
};
$U.parseList = function(tab, prec) {
    if ($U.isArray(tab)) {
        var elts = [];
        var len = tab.length;
        var maxlen = (len < 3) ? len : 3;
        var sep = "[???" + $L.comma + "???" + $L.comma + "???]";
        var elt;
        for (var i = 0; i < maxlen; i++) {
            elt = $U.parseArray(tab[i], prec);
            if (elt === sep) elts.push("\u2702")
            else elts.push(elt);
        }
        if (len > maxlen) {
            elts.push("... (" + len + " " + $L.expression_item + ")")
        }
        return "[" + elts.join(" " + $L.comma + " ") + "]";
    } else {
        if (isNaN(tab))
            return "???";
        else
            return ($L.number(Math.round(tab * prec) / prec));
    }
};
$U.parseArray = function(tab, prec) {
    if ($U.isArray(tab)) {
        var elts = [];
        for (var i = 0, len = tab.length; i < len; i++) {
            elts.push($U.parseArray(tab[i], prec));
        }
        return "[" + elts.join($L.comma) + "]";
    } else {
        if (isNaN(tab))
            return "???";
        else
            return ($L.number(Math.round(tab * prec) / prec));
    }
};
$U.parseArrayEnglish = function(tab, prec) {
    if ($U.isArray(tab)) {
        var elts = [];
        for (var i = 0, len = tab.length; i < len; i++) {
            elts.push($U.parseArrayEnglish(tab[i], prec));
        }
        return "[" + elts.join(",") + "]";
    } else {
        if (isNaN(tab))
            return "???";
        else
            return (prec ? (Math.round(tab * prec) / prec) : tab);
    }
};
$U.addTextToInput = function(_field, _n, _tpe) {
    switch (_tpe) {
        case "replace":
            _field.value = _n;
            break;
        case "add":
            var startPos = _field.selectionStart;
            var endPos = _field.selectionEnd;
            _field.value = _field.value.substring(0, startPos) + _n + _field.value.substring(endPos, _field.value.length);
            _field.selectionStart = startPos + _n.length;
            _field.selectionEnd = startPos + _n.length;
            break;
    }
};

$U.isPoint = function(_t) {
    if (!$U.isArray(_t))
        return false;
    if ((isNaN(_t[0])) || (isNaN(_t[1])))
        return false;
    if ((_t.length === 2) || (_t.length === 3))
        return true;
    return false;
};
$U.isPointArray = function(_t) {
    if (!$U.isArray(_t))
        return false;
    if (_t.length === 0)
        return false;
    for (var i = 0; i < _t.length; i++) {
        if (!$U.isPoint(_t[i]))
            return false;
    }
    return true;
};
$U.isPointArrayWithNaN = function(_t) {
    if (!$U.isArray(_t))
        return false;
    if (_t.length === 0)
        return false;
    for (var i = 0; i < _t.length; i++) {
        if ((!$U.isArray(_t[i])) || (_t[i].length < 2) || (_t[i].length > 3))
            return false;
    }
    return true;
};

$U.isVar = function(_s, _v) {
    return (new RegExp("(\\W|^)" + _v + "([^\\(]|$)").test(_s));
};

// Récupère les variables eventuelles d'une formule
// sous forme de chaine :
$U.getVars = function(_s) {
    var vars = [];
    if ($U.isVar(_s, "x"))
        vars.push("x");
    if ($U.isVar(_s, "y"))
        vars.push("y");
    if ($U.isVar(_s, "z"))
        vars.push("z");
    if ($U.isVar(_s, "t"))
        vars.push("t");
    return vars.join(",");
};

$U.startChrono = function() {
    var d = new Date();
    $U.startTime = d.getTime();
};
$U.getChrono = function() {
    var d = new Date();
    return (d.getTime() - $U.startTime);
};
$U.getTime = function() {
    var d = new Date();
    return (d.getTime());
};


$U.preloadImage = function(_p) {
    var img = new Image();
    img.src = _p;
};

$U.log = function(_x) {
    return Math.log(_x) / Math.LN10;
};

// Distance entre deux points :
$U.d = function(p1, p2) {
    return Math.sqrt((p2.getX() - p1.getX()) * (p2.getX() - p1.getX()) + (p2.getY() - p1.getY()) * (p2.getY() - p1.getY()));
};


// Renvoie l'angle que forme un vecteur (x;y) avec l'horizontale
// dans l'intervalle [0;2π[ orienté dans le sens trigo :
$U.angleH = function(x, y) {
    if (y < 0)
        return Math.atan2(-y, x);
    else
        return Math.atan2(-y, x) + $U.doublePI;
};

// Compare en dessous de la précision du logiciel (1E-10) :
$U.approximatelyEqual = function(a, b) {
    return (Math.abs(a - b) < 1E-10);
};

// Renvoie les coordonnées du vecteur AB normé :
$U.normalize = function(xA, yA, xB, yB) {
    var l = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
    return {
        x: (xB - xA) / l,
        y: (yB - yA) / l
    };
};

// For line objects :
$U.computeBorderPoints = function(xA, yA, dx, dy, W, H) {
    // On centre un cercle autour de A d'un rayon supérieur à la diagonale
    // du canvas (W+H). Forcément les point (xmin,ymin) et (xmax,ymax) de
    // ce cercle seront à l'extérieur du canvas
    var l = W + H + Math.abs(xA) + Math.abs(yA);
    return [xA - l * dx, yA - l * dy, xA + l * dx, yA + l * dy];
};

// For circle objects :
$U.computeRay = function(xA, yA, xB, yB) {
    var x = (xB - xA);
    var y = (yB - yA);
    return Math.sqrt(x * x + y * y);
};

// For circle3 objects :
$U.computeCenter = function(xA, yA, xB, yB, xC, yC) {
    var xAC = xC - xA,
        xCB = xB - xC,
        xBA = xA - xB;
    var yAC = yC - yA,
        yCB = yB - yC,
        yBA = yA - yB;
    var d = 2 * (xB * yAC + xC * yBA + xA * yCB);

    var x = (xB * xB * yAC + xC * xC * yBA + xA * xA * yCB - yAC * yBA * yCB) / d;
    var y = (xAC * xBA * xCB - xCB * yA * yA - xAC * yB * yB - xBA * yC * yC) / d;

    return [x, y];
};

$U.computeArcParams = function(xA, yA, xB, yB, xC, yC) {
    var xAC = xC - xA,
        xCB = xB - xC,
        xBA = xA - xB;
    var yAC = yC - yA,
        yCB = yB - yC,
        yBA = yA - yB;
    var d = 2 * (xB * yAC + xC * yBA + xA * yCB);

    // Coordonnées du centre du cercle :
    var xO = (xB * xB * yAC + xC * xC * yBA + xA * xA * yCB - yAC * yBA * yCB) / d;
    var yO = (xAC * xBA * xCB - xCB * yA * yA - xAC * yB * yB - xBA * yC * yC) / d;


    var startangle = $U.angleH(xA - xO, yA - yO);
    var endangle = $U.angleH(xC - xO, yC - yO);
    var trigo = (xBA * yCB < yBA * xCB);

    // Calcul de la mesure de l'angle AOC (dans [0;2π]) :
    var AOC = (trigo) ? (endangle - startangle) : ($U.doublePI - endangle + startangle);
    AOC += ((AOC < 0) - (AOC > $U.doublePI)) * $U.doublePI;

    return {
        centerX: xO,
        centerY: yO,
        startAngle: startangle,
        endAngle: endangle,
        Trigo: trigo,
        AOC: AOC
    };
};

$U.computeAngleParams = function(xA, yA, xO, yO, xC, yC) {
    var xOC = xC - xO,
        xOA = xA - xO;
    var yOC = yC - yO,
        yOA = yA - yO;

    var startangle = $U.angleH(xOA, yOA);
    var endangle = $U.angleH(xOC, yOC);
    var trigo = (xOA * yOC < yOA * xOC);



    var AOC180;

    // Calcul de la mesure de l'angle AOC orienté trigo (dans [0;2π]) :
    var AOC = endangle - startangle;
    AOC += ((AOC < 0) - (AOC > $U.doublePI)) * $U.doublePI;

    // Calcul de la mesure de l'angle AOC (dans [0;π]) :
    if (AOC > Math.PI)
        AOC180 = $U.doublePI - AOC;
    else
        AOC180 = AOC;

    return {
        startAngle: startangle,
        endAngle: endangle,
        Trigo: trigo,
        AOC: AOC,
        AOC180: AOC180
    };
};

// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToPoint = function(xA, yA, xB, yB, d) {
    if (isNaN(xA + yA + xB + yB))
        return false;
    var xab = xB - xA;
    var yab = yB - yA;
    return ((xab * xab + yab * yab) < (d * d));
};

// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToCircle = function(xA, yA, r, xM, yM, d) {
    if (isNaN(xA + yA + r))
        return false;
    var x = (xM - xA);
    var y = (yM - yA);
    return (Math.abs(x * x + y * y - r * r - d * d) < (2 * d * r));
};


$U.ptOnArc = function(xO, yO, xM, yM, fromAngle, toAngle, trigo) {
    var m = $U.angleH(xM - xO, yM - yO);
    var e_a = (trigo) ? (toAngle - fromAngle) : ($U.doublePI - toAngle + fromAngle);
    if (e_a > $U.doublePI)
        e_a -= $U.doublePI;
    if (e_a < 0)
        e_a += $U.doublePI;
    //        if (!trigo) e_a=-e_a;

    var e_m = (trigo) ? (m - fromAngle) : ($U.doublePI - toAngle + m);
    if (e_m > $U.doublePI)
        e_m -= $U.doublePI;
    if (e_m < 0)
        e_m += $U.doublePI;

    return (e_m < e_a);
};


// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToArc = function(xO, yO, AOC, fromAngle, toAngle, trigo, r, xM, yM, d) {
    if (isNaN(xO + yO + r))
        return false;

    var x = (xM - xO);
    var y = (yM - yO);
    if (Math.abs(x * x + y * y - r * r - d * d) > (2 * d * r))
        return false;

    var m = $U.angleH(xM - xO, yM - yO);
    var GOM = (trigo) ? m - fromAngle : ($U.doublePI - toAngle + m);
    GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;

    if (GOM > AOC)
        return false;
    return true;
};


// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToLine = function(xA, yA, dx, dy, xM, yM, d) {
    if (isNaN(xA + yA + dx + dy))
        return false;
    var a = dy * (xM - xA) + dx * (yA - yM);
    var MH2 = (a * a) / (dx * dx + dy * dy);
    return (MH2 < (d * d));
};

// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToSegment = function(xA, yA, xB, yB, xM, yM, d) {
    if (isNaN(xA + yA + xB + yB))
        return false;
    var a = xM * (yB - yA) + xB * (yA - yM) + xA * (yM - yB);
    var xab = xB - xA;
    var yab = yB - yA;
    var dab = xab * xab + yab * yab;
    if (dab < 1e-13)
        return false;
    var MH2 = (a * a) / dab;
    // Le point est loin de la droite :
    if (MH2 > (d * d))
        return false;
    var MAMB = (xA - xM) * (xB - xM) + (yA - yM) * (yB - yM);
    // Le point dépasse des extrémités du segment :
    if (MAMB > MH2)
        return false;
    return true;
};

// d est la distance en dessous de laquelle on est jugé "near" :
$U.isNearToRay = function(xA, yA, xB, yB, xM, yM, d) {
    if (isNaN(xA + yA + xB + yB))
        return false;
    var a = xM * (yB - yA) + xB * (yA - yM) + xA * (yM - yB);
    var xab = xB - xA;
    var yab = yB - yA;
    var dab = xab * xab + yab * yab;
    if (dab < 1e-13)
        return false;
    var MH2 = (a * a) / dab;
    // Le point est loin de la droite :
    if (MH2 > (d * d))
        return false;
    var MAMB = (xA - xM) * (xB - xM) + (yA - yM) * (yB - yM);
    // Le point dépasse des extrémités du segment [AB] :
    if (MAMB > MH2) {
        var MA2 = (xA - xM) * (xA - xM) + (yA - yM) * (yA - yM);
        var MB2 = (xB - xM) * (xB - xM) + (yB - yM) * (yB - yM);
        if (MA2 < MB2) {
            return false;
        }
    }
    return true;
};

$U.drawPartialLine = function(ctx, xA, yA, xB, yB, iA, iB) {
    var sStyle = ctx.strokeStyle;
    var d = $U.normalize(xA, yA, xB, yB);
    var spc = $P.size.partiallines;
    var xa = xA - iA * spc * d.x,
        ya = yA - iA * spc * d.y;
    var xb = xB + iB * spc * d.x,
        yb = yB + iB * spc * d.y;
    if (iA) {
        var xinf = xA - 3 * spc * d.x,
            yinf = yA - 3 * spc * d.y;
        var grd1 = ctx.createLinearGradient(xinf, yinf, xa, ya);
        grd1.addColorStop(0, "white");
        grd1.addColorStop(1, sStyle);
        ctx.beginPath();
        ctx.strokeStyle = grd1;
        ctx.moveTo(xinf, yinf);
        ctx.lineTo(xa, ya);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.strokeStyle = sStyle;
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
    ctx.closePath();
    ctx.stroke();
    if (iB) {
        var xsup = xB + 3 * spc * d.x,
            ysup = yB + 3 * spc * d.y;
        var grd2 = ctx.createLinearGradient(xb, yb, xsup, ysup);
        grd2.addColorStop(0, sStyle);
        grd2.addColorStop(1, "white");
        ctx.beginPath();
        ctx.strokeStyle = grd2;
        ctx.moveTo(xb, yb);
        ctx.lineTo(xsup, ysup);
        ctx.closePath();
        ctx.stroke();
    }
};



$U.extend = function(_obj, _superObject) {    
    for (var sProperty in _superObject) {        
        _obj[sProperty] = _superObject[sProperty];    
    }
    return _superObject;
};

//$U.MOUSEEVENT = document.createEvent("MouseEvent");

$U.PadToMouseEvent = function(_touch) {
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent("mouseup", true, true, window, 1,
        _touch.screenX, _touch.screenY,
        _touch.clientX, _touch.clientY, false,
        false, false, false, 0, null);
    return ev;
};

//$U.PadToMouseEvent = function(_touch) {
//    $U.MOUSEEVENT.initMouseEvent("mouseup", true, true, window, 1,
//            _touch.screenX, _touch.screenY,
//            _touch.clientX, _touch.clientY, false,
//            false, false, false, 0, null);
//    return $U.MOUSEEVENT;
//};




$U.hexToRGB = function(h) {
    if (h.charAt(0) === "#") {
        var cut = h.substring(1, 7);
        var r = parseInt(cut.substring(0, 2), 16);
        var g = parseInt(cut.substring(2, 4), 16);
        var b = parseInt(cut.substring(4, 6), 16);
        return {
            "r": r,
            "g": g,
            "b": b
        };
    } else {
        return {
            "r": 0,
            "g": 0,
            "b": 0
        };
    }
};

$U.hexToHSV = function(h) {
    var rgb = $U.hexToRGB(h);
    var rr, gg, bb,
        r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
        };
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

// Associe une liste de styles (séparés par ;) à un élément DOM :
$U.STL = function(_dom, _st) {
    var t = _st.split(";");
    for (var i = 0, len = t.length; i < len; i++) {
        var a = t[i].split(":");
        _dom.style.setProperty(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
    }
};

// Associe une liste d'attributs (séparés par ;) à un élément DOM :
$U.ATT = function(_dom, _st) {
    var t = _st.split(";");
    for (var i = 0, len = t.length; i < len; i++) {
        var a = t[i].split(":");
        _dom.setAttribute(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
    }
};

$U.getElementOffset = function(obj) {
    var obj2 = obj;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do {
            curleft += obj.offsetLeft - obj.scrollLeft;
            curtop += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
            obj2 = obj2.parentNode;
            while (obj2 !== obj) {
                curleft -= obj2.scrollLeft;
                curtop -= obj2.scrollTop;
                obj2 = obj2.parentNode;
            }
        } while (obj.offsetParent)
    } else if (document.layers) {
        curtop += obj.y;
        curleft += obj.x;
    }
    return {
        "left": curleft,
        "top": curtop
    };
};


// Renvoie "-moz" ou "-webkit" ou "-o" en fonction du navigateur :
$U.browserCode = function() {
    if (navigator.appVersion.indexOf("MSIE 10") != -1)
        return "-ms";
    if ('MozBoxSizing' in document.documentElement.style)
        return "-moz";
    if ('WebkitTransform' in document.documentElement.style)
        return "-webkit";
    return "-o";
};

$U.scolor = function(h) {
    var c = $U.hexToRGB(h);
    return (c.r + ",," + c.g + ",," + c.b);
};



$U.loadFile = function(fileName) {
    var request = new XMLHttpRequest();
    try {
        request.open("GET", fileName, false);
        request.send();
        return request.responseText;
    } catch (e) {
        return "";
    }
};



$U.leaveAccents = function(s) {
    var r = s.replace(new RegExp("\\s", 'g'), "");
    // r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    // r = r.replace(new RegExp("æ", 'g'), "ae");
    // r = r.replace(new RegExp("ç", 'g'), "c");
    // r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    // r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    // r = r.replace(new RegExp("ñ", 'g'), "n");
    // r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    // r = r.replace(new RegExp("œ", 'g'), "oe");
    // r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    // r = r.replace(new RegExp("[ýÿ]", 'g'), "y");

    // r = r.replace(new RegExp("[ÀÁÂÃÄÅ]", 'g'), "A");
    // r = r.replace(new RegExp("Æ", 'g'), "AE");
    // r = r.replace(new RegExp("Ç", 'g'), "C");
    // r = r.replace(new RegExp("[ÈÉÊË]", 'g'), "E");
    // r = r.replace(new RegExp("[ÌÍÎÏ]", 'g'), "I");
    // r = r.replace(new RegExp("Ñ", 'g'), "N");
    // r = r.replace(new RegExp("[ÒÓÔÕÖ]", 'g'), "O");
    // r = r.replace(new RegExp("Œ", 'g'), "OE");
    // r = r.replace(new RegExp("[ÙÚÛÜ]", 'g'), "U");
    // r = r.replace(new RegExp("[ÝŸ]", 'g'), "Y");
    // r = r.replace(new RegExp("\\W", 'g'), "");
    r = r.replace(new RegExp("[^àáâãäåæçèéêëìíîïñòóôõöœùúûüýÿÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖŒÙÚÛÜÝŸΆΈ-ώἀ-ῼa-zA-Z0-9_]", 'g'), "");
    return r;
};

//$U.leaveAccents = function(s, _uppercase) {
//    var r = s.toLowerCase();
//    r = r.replace(new RegExp("\\s", 'g'), "");
//    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
//    r = r.replace(new RegExp("æ", 'g'), "ae");
//    r = r.replace(new RegExp("ç", 'g'), "c");
//    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
//    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
//    r = r.replace(new RegExp("ñ", 'g'), "n");
//    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
//    r = r.replace(new RegExp("œ", 'g'), "oe");
//    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
//    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
//    r = r.replace(new RegExp("\\W", 'g'), "");
//    if (_uppercase)
//        r = r.toUpperCase();
//    return r;
//};

$U.utf8_encode = function(string) {
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
};

$U.utf8_decode = function(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
};


// source : https://developer.mozilla.org/fr/docs/D%C3%A9coder_encoder_en_base64
$U.base64_encode = function(_data) {
    return window.btoa(unescape(encodeURIComponent(_data)));
};

$U.base64_decode = function(_data) {
    return decodeURIComponent(escape(window.atob(_data)));
};

// $U.base64_encode = function(_data) {
//     var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//     var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
//         ac = 0,
//         enc = "",
//         tmp_arr = [];

//     if (!_data) {
//         return _data;
//     }

//     do { // pack three octets into four hexets
//         o1 = _data.charCodeAt(i++);
//         o2 = _data.charCodeAt(i++);
//         o3 = _data.charCodeAt(i++);
//         bits = o1 << 16 | o2 << 8 | o3;
//         h1 = bits >> 18 & 0x3f;
//         h2 = bits >> 12 & 0x3f;
//         h3 = bits >> 6 & 0x3f;
//         h4 = bits & 0x3f;
//         // use hexets to index into b64, and append result to encoded string
//         tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
//     } while (i < _data.length);
//     enc = tmp_arr.join('');
//     var r = _data.length % 3;
//     return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
// };


// $U.base64_decode = function(_data) {
//     var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//     var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
//         ac = 0,
//         dec = "",
//         tmp_arr = [];
//     if (!_data) {
//         return _data;
//     }
//     _data += '';
//     do { // unpack four hexets into three octets using index points in b64
//         h1 = b64.indexOf(_data.charAt(i++));
//         h2 = b64.indexOf(_data.charAt(i++));
//         h3 = b64.indexOf(_data.charAt(i++));
//         h4 = b64.indexOf(_data.charAt(i++));
//         bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
//         o1 = bits >> 16 & 0xff;
//         o2 = bits >> 8 & 0xff;
//         o3 = bits & 0xff;
//         if (h3 === 64) {
//             tmp_arr[ac++] = String.fromCharCode(o1);
//         } else if (h4 === 64) {
//             tmp_arr[ac++] = String.fromCharCode(o1, o2);
//         } else {
//             tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
//         }
//     } while (i < _data.length);
//     dec = tmp_arr.join('');
//     dec = $U.utf8_decode(dec);
//     return dec;
// };

// For mouse wheel :
$U.extractDelta = function(e) {
    var n = null;
    if (e.wheelDelta)
        n = e.wheelDelta;
    else if (e.detail)
        n = e.detail * -40;
    else if (e.originalEvent && e.originalEvent.wheelDelta)
        n = e.originalEvent.wheelDelta;
    return isNaN(n) ? 0 : n;
};

$U.isFullLocalStorage = function() {
    var n = 0;
    for (var i = $P.localstorage.max; i > 0; i--) {
        var c = JSON.parse(localStorage.getItem($P.localstorage.base + i));
        if (c && c.lock)
            n++;
    }
    return (n >= ($P.localstorage.max - 1));
};

$U.addDomUtils = function(el) {
    el.event_proc = [];
    el.stl = function(_p, _v) {
        el.style.setProperty(_p, _v);
    };
    el.att = function(_a, _v) {
        el[_a] = _v;
    };
    el.stls = function(_st) {
        var t = _st.split(";");
        for (var i = 0, len = t.length; i < len; i++) {
            var a = t[i].split(":");
            el.stl(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
        }
    };
    el.bnds = function(l, t, w, h) {
        el.stls("left:" + l + "px;top:" + t + "px;width:" + w + "px;height:" + h + "px");
    };
    el.center = function(w, h) {
        var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        el.bnds((winW - w) / 2, (winH - h) / 2, w, h);
    };
    el.add = function(_ch) {
        el.appendChild(_ch);
    };
    el.rmv = function(_ch) {
        el.removeChild(_ch);
    };
    el.md = function(_p) {
        el.addEventListener('touchstart', _p, false);
        el.addEventListener('mousedown', _p, false);
        el.event_proc.push(_p);
    };
    el.mm = function(_p) {
        el.addEventListener('touchmove', _p, false);
        el.addEventListener('mousemove', _p, false);
        el.event_proc.push(_p);
    };
    el.mu = function(_p) {
        el.addEventListener('touchend', _p, false);
        el.addEventListener('mouseup', _p, false);
        el.event_proc.push(_p);
    };
    el.kd = function(_p) {
        el.addEventListener('keydown', _p, false);
        el.event_proc.push(_p);
    };
    el.ku = function(_p) {
        el.addEventListener('keyup', _p, false);
        el.event_proc.push(_p);
    };
    el.rmevt = function() {
        for (var i = 0; i < el.event_proc.length; i++) {
            el.removeEventListener('touchstart', el.event_proc[i], false);
            el.removeEventListener('mousedown', el.event_proc[i], false);
            el.removeEventListener('touchmove', el.event_proc[i], false);
            el.removeEventListener('mousemove', el.event_proc[i], false);
            el.removeEventListener('touchend', el.event_proc[i], false);
            el.removeEventListener('mouseup', el.event_proc[i], false);
            el.removeEventListener('keydown', el.event_proc[i], false);
            el.removeEventListener('keyup', el.event_proc[i], false);
        }
        el.event_proc = [];
    };
    return el;
}

$U.createDiv = function(_otherType) {
    var el = document.createElement((_otherType === undefined) ? "div" : _otherType);
    return $U.addDomUtils(el);
};

$U.alert = function(_mess, _w, _h) {
    var w = _w ? _w : 350;
    var h = _h ? _h : 165;
    var t = 40;
    var msg_height = 50; // Message height
    var msg_width = 300; // Message width
    var msg_top = 0; // Distance from message to top
    var ok_top = 120; // Ok btn top
    var ok_width = 80; // Ok btn width
    var ok_height = 30; // Ok btn height
    var ok_right = 23; // Ok btn right margin

    var scrn = $U.createDiv();
    var wp = $U.createDiv();
    var msg = $U.createDiv();
    var ok = $U.createDiv();

    scrn.stls("position:absolute;z-index:10000;overflow:hidden;background-color:rgba(50,50,50,0.7)");
    wp.stls("position:absolute;border-radius:5px;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight: 300;letter-spacing: 1.2px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:translate(0px,-200px);background-color:rgba(255,255,255,1)");
    msg.stls("position:relative;text-align:center;display:table-cell;vertical-align:bottom;color:#797979;font-size:16px;white-space: pre-wrap;margin:0px;overflow:hidden");
    ok.stls("position:absolute;text-align:center;vertical-align:middle;background-color:#8CD4F5;color:white;border:none;box-shadow:none;font-size:17px;font-weight:500;-webkit-border-radius:4px;border-radius:5px;cursor: pointer");
    var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    scrn.bnds(0, 0, winW, winH);
    wp.bnds((winW - w) / 2, t, w, h);
    msg.bnds((w - msg_width) / 2, msg_top, msg_width, msg_height);
    msg.innerHTML = _mess;
    ok.bnds(w - ok_width - ok_right, ok_top, ok_width, ok_height);
    ok.innerHTML = $L.blockly.prompt_ok;
    ok.stl("line-height", ok_height + "px");

    var valid = function(ev) {
        ev.preventDefault();
        scrn.innerHTML = "";
        window.document.body.removeChild(scrn);

    };
    scrn.md(function(ev) {
        ev.stopPropagation();
    });
    ok.mu(valid);
    ok.mm(function(ev) {
        ok.stl("background-color", "#1EAAD0");
        ev.stopPropagation();
    });
    wp.add(msg);
    wp.add(ok);
    scrn.add(wp);
    window.document.body.appendChild(scrn);
    setTimeout(function() {
        wp.stls("transform:translate(0px,0px)");
    }, 1);
}

$U.prompt = function(_mess, _default, _type, _proc, _w, _h, _inp_w) {
    var w = _w ? _w : 350;
    var h = _h ? _h : 165;
    var t = 40;
    var msg_height = 50; // Message height
    var msg_width = 300; // Message width
    var msg_top = 0; // Distance from message to top
    var inp_height = 36; // Input height
    var inp_width = _inp_w ? _inp_w : 300; // Input width
    var inp_top = 55; // Distance from input to top
    var ok_top = 120; // Ok btn top
    var ok_width = 80; // Ok btn width
    var ok_height = 30; // Ok btn height
    var ok_right = 23; // Ok btn right margin
    var cancel_left = 23; // Cancel btn left margin

    var scrn = $U.createDiv();
    var wp = $U.createDiv();
    var msg = $U.createDiv();
    var inw = $U.createDiv(); // Input wrapper div
    var inp = null; // Real input
    var ok = $U.createDiv();
    var cancel = $U.createDiv();

    scrn.stls("position:absolute;z-index:10000;overflow:hidden;background-color:rgba(50,50,50,0.7)");
    wp.stls("position:absolute;border-radius:5px;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight: 300;letter-spacing: 1.2px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:translate(0px,-200px);background-color:rgba(255,255,255,1)");
    msg.stls("position:relative;text-align:center;display:table-cell;vertical-align:bottom;color:#797979;font-size:16px;white-space: pre-wrap;margin:0px;overflow:hidden");
    inw.stls("position:absolute;border: 0px;border: 1px solid #555");
    ok.stls("position:absolute;text-align:center;vertical-align:middle;background-color:#8CD4F5;color:white;border:none;box-shadow:none;font-size:17px;font-weight:500;-webkit-border-radius:4px;border-radius:5px;cursor: pointer");
    cancel.stls("position:absolute;text-align:center;vertical-align:middle;background-color:#C1C1C1;color:white;border:none;box-shadow:none;font-size:17px;font-weight:500;-webkit-border-radius:4px;border-radius:5px;cursor: pointer");
    inw.stl("line-height", inp_height + "px");
    var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    scrn.bnds(0, 0, winW, winH);
    wp.bnds((winW - w) / 2, t, w, h);
    msg.bnds((w - msg_width) / 2, msg_top, msg_width, msg_height);
    msg.innerHTML = _mess;
    inw.bnds((w - inp_width) / 2, inp_top, inp_width, inp_height);
    ok.bnds(w - ok_width - ok_right, ok_top, ok_width, ok_height);
    ok.innerHTML = $L.blockly.prompt_ok;
    ok.stl("line-height", ok_height + "px");
    cancel.bnds(cancel_left, ok_top, ok_width, ok_height);
    cancel.innerHTML = $L.blockly.prompt_cancel;
    cancel.stl("line-height", ok_height + "px");

    var valid = function(ev) {
        ev.preventDefault();
        if (inp.value !== "")
            _proc(_default, inp.value);
        inp.blur();
        window.document.body.removeChild(scrn);
    };
    var fixOkColor = function() {
        if (inp.value === "") ok.stl("background-color", "#8CD4F5")
        else ok.stl("background-color", "#4BB6DB")
    };
    scrn.kd(function(ev) {
        if (ev.keyCode === 13) valid(ev);
    });
    scrn.ku(function(ev) {
        fixOkColor()
    });
    scrn.md(function(ev) {
        ev.stopPropagation();
    });
    ok.mu(valid);
    ok.mm(function(ev) {
        ok.stl("background-color", "#1EAAD0");
        ev.stopPropagation();
    });
    cancel.mm(function(ev) {
        cancel.stl("background-color", "#b9b9b9");
        ev.stopPropagation();
    });
    cancel.mu(function() {
        window.document.body.removeChild(scrn);
    });
    wp.mm(function() {
        fixOkColor();
        cancel.stl("background-color", "#C1C1C1");
    });
    wp.add(msg);
    wp.add(inw);
    wp.add(ok);
    wp.add(cancel);
    scrn.add(wp);
    window.document.body.appendChild(scrn);
    setTimeout(function() {
        wp.stls("transform:translate(0px,0px)");
    }, 1);
    setTimeout(function() {
        // Tout ceci pour changer le clavier iOS : sans correcteur ortho, sans capitales en standard, etc...
        inw.innerHTML = '<input type="' + _type + '" id="dgpad_prompt_area" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';
        inp = $U.addDomUtils(document.getElementById("dgpad_prompt_area"));
        inp.stls("position:absolute;padding:0px;margin:0px;-webkit-appearance: none;border-radius: 0;-webkit-user-select: text;user-select: text;overflow: hidden;font-weight: 600;border: 0px solid #555;font-size: 24px;text-align: center;white-space: pre-wrap;margin: 0px;vertical-align:middle;color: rgb(50,50,50);outline:none");
        inp.bnds(0, 0, inp_width, inp_height);
        inp.value = _default;
        inp.onfocus = function(e) {
            e.preventDefault();
            setTimeout(function() {
                inp.setSelectionRange(0, 9999);
            }, 0)
        };
        if (!Object.touchpad) inp.focus();
    }, 200);
}


$U.clearOneLocalStorage = function() {
    // On parcours le localstorage tant qu'on rencontre un élément verrouillé :
    var m = localStorage.length;
    var c = JSON.parse(localStorage.getItem($P.localstorage.base + m));
    while ((m > 0) && (!c || c.lock)) {
        m--;
        c = JSON.parse(localStorage.getItem($P.localstorage.base + m));
    }

    if (m === 0) {
        // Si tous les éléments sont verrouillés, on supprime le dernier verrouillé :
        localStorage.removeItem($P.localstorage.base + localStorage.length);
    } else {
        // Sinon, on supprime l'élement m :
        localStorage.removeItem($P.localstorage.base + m);
    }
};


$U.shiftLocalStorages = function() {
    for (var i = localStorage.length + 1; i > 1; i--) {
        var k0 = $P.localstorage.base + i;
        var k1 = $P.localstorage.base + (i - 1);
        if (localStorage.getItem(k1)) {
            var c1 = JSON.parse(localStorage.getItem(k1));
            localStorage.setItem(k0, JSON.stringify(c1));
            localStorage.removeItem(k1);
        }
    }
};

$U.setFilePickerDefaultBox = function(_s) {
    localStorage.setItem("FilePickerDefaultBox", _s);
};

$U.getFilePickerDefaultBox = function() {
    var box = localStorage.getItem("FilePickerDefaultBox");
    if (box)
        return box;
    else
        return "";
};

$U.set$FPICKERFRAME = function(_p) {
    $FPICKERFRAME = _p
}

$U.get$FPICKERFRAME = function() {
    return $FPICKERFRAME
}



$U.timer = function(_proc, _delay, _param) {
    var delay = _delay,
        proc = _proc,
        param = _param,
        runnable = true,
        id = NaN;
    var myproc = function(_p) {
        runnable = false;
        proc(_p);
    };
    this.start = function() {
        if (runnable)
            id = setTimeout(myproc, delay, param);
    };
    this.isRunnable = function() {
        return runnable;
    };
    this.getProc = function() {
        return proc;
    };
    this.getParam = function() {
        return param;
    };
    this.getID = function() {
        return id;
    };
    this.clear = function() {
        clearTimeout(id);
    };
    this.setDelay = function(_d) {
        clearTimeout(id);
        delay = _d;
        this.start();
    };
};

$U.timers = function(_dlay) {
    var currentDelay = 0,
        delay = _dlay,
        tab = [];
    this.push = function(_proc, _param) {
        currentDelay += delay;
        tab.push(new $U.timer(_proc, currentDelay, _param));
    };
    this.start = function() {
        for (var i = 0; i < tab.length; i++) {
            tab[i].start();
        }
    };
    this.stop = function() {
        for (var i = 0; i < tab.length; i++) {
            tab[i].clear();
        }
    };
    this.restart = function() {
        this.setDelay(delay)
    };
    this.getIDs = function() {
        var t = [];
        for (var i = 0; i < tab.length; i++) {
            t.push(tab[i].getID());
        }
        return t;
    };
    this.clear = function() {
        for (var i = 0; i < tab.length; i++) {
            tab[i].clear();
        }
        currentDelay = 0;
        tab = [];
    };
    this.setDelay = function(_d) {
        delay = parseInt(_d);
        currentDelay = 0;
        var newtab = [];
        for (var i = 0; i < tab.length; i++) {
            tab[i].clear();
            if (tab[i].isRunnable())
                newtab.push(tab[i]);
        }
        tab = [];
        for (var i = 0; i < newtab.length; i++) {
            currentDelay += delay;
            tab.push(new $U.timer(newtab[i].getProc(), currentDelay, newtab[i].getParam()));
        }
        this.start();
    };
};




$U.TimeOut = function(_delay, _function) {
    var time = 0;
    var delay = _delay;
    var func = _function;
    var tOut = null;

    this.startChrono = function() {
        this.stopChrono();
        time = Date.now();
        tOut = setTimeout(func, delay);
    };
    this.stopChrono = function() {
        if (tOut !== null) {
            clearTimeout(tOut);
            tOut = null;
        }
        time = 0;
    };
    this.isTimeout = function() {
        return ((Date.now() - time) > delay);
    };
};


$U.isMobile = {
    android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    blackberry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    ios: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    mobilePhone: function() {
        return $MOBILE_PHONE;
    },
    //    mobilePhone: function() {
    //        return true;
    //    },
    //    mobilePhone: function() {
    //        return (function(a) {
    //            if (/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
    //                return true;
    //            else
    //                return false;
    //        })(navigator.userAgent || navigator.vendor || window.opera);
    //    },
    any: function() {
        return ($U.isMobile.android() || $U.isMobile.blackberry() || $U.isMobile.ios() || $U.isMobile.opera() || $U.isMobile.windows());
    }
};



$U.isOldAndroid = function() {
    var ua = navigator.userAgent;
    return ((ua.indexOf("Android") >= 0) && (parseFloat(ua.slice(ua.indexOf("Android") + 8)) < 4.4));
};

$U.isBrowser = {
    firefox: function() {
        return (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1);
    }
};

$U.scaleViewportOnMobile = function() {
    if ($U.isMobile.mobilePhone()) {
        var viewport = document.getElementById('wholeViewport');
        viewport.setAttribute("content", "width=device-width, maximum-scale=1.0, initial-scale=0.65 ,user-scalable=no");
    }
};

$U.initEvents = function(ZC, cTag) {
    cTag.canvas = ZC;
    window.$CANVAS = ZC;
    cTag.oncontextmenu = function() {
        return false;
    };

    cTag.addEventListener('touchmove', ZC.touchMoved, false);
    cTag.addEventListener('touchstart', ZC.touchStart, false);
    cTag.addEventListener('touchend', ZC.touchEnd, false);
    cTag.addEventListener('touchcancel', ZC.touchEnd, false);
    cTag.addEventListener('mousemove', ZC.mouseMoved, false);
    cTag.addEventListener('mousedown', ZC.mousePressed, false);
    cTag.addEventListener('mouseup', ZC.mouseReleased, false);

    cTag.addEventListener('click', ZC.mouseClicked, false);
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    cTag.addEventListener(mousewheelevt, ZC.mouseWheel, false);
    cTag.addEventListener('dragover', ZC.dragOver, false);
    cTag.addEventListener('drop', ZC.drop, false);



    // if (!Object.touchpad) {
    //     window.addEventListener("keypress", ZC.keypress, false);
    //     window.addEventListener("keydown", ZC.keydown, false);
    // }
}

// Valeur changée par les fonctions d'ouverture des figures
// Il s'agit d'éviter des change events pendant l'ouverture :
$U.isloading = false

// This function is called each time something happend in construction.
// (add, remove, drag, zoom, etc...). This is usefull for python and OS X
// wrapped webview :
$U.changed = function() {
    if (!$U.isloading) {
        // Pour l'appli Linux :
        window.status = "changed"
            // Pour l'appli OS X :
        if (window.$OS_X_APPLICATION) {
            interOp.somethingChanged("");
        };
    }
}
$U.AllCanvas = [];



$U.initCanvas = function(_id) {
    var ZC = new Canvas(_id);
    $U.AllCanvas.push(ZC);
    var cTag = document.getElementById(_id);

    $U.initEvents(ZC, cTag);

    Event.prototype.cursor = "default";
    Event.prototype.getCursor = function() {
        return (this.cursor);
    };
    Event.prototype.setCursor = function(cur) {
        this.cursor = cur;
    };

    if (cTag.hasAttribute("data-presentation")) {
        ZC.demoModeManager.setDemoMode(cTag.getAttribute("data-presentation").toLowerCase() === "true");
    };

    // ZC.setMode(1);

    ZC.addTool(new PointConstructor());
    ZC.addTool(new SegmentConstructor());
    ZC.addTool(new LineConstructor());
    ZC.addTool(new RayConstructor());
    ZC.addTool(new MidPointConstructor());
    ZC.addTool(new CircleConstructor());
    ZC.addTool(new Circle1Constructor());
    ZC.addTool(new Circle3Constructor());
    ZC.addTool(new ParallelConstructor());
    ZC.addTool(new PlumbConstructor());
    ZC.addTool(new AreaConstructor());
    ZC.addTool(new PerpBisectorConstructor());
    ZC.addTool(new SymcConstructor());
    ZC.addTool(new SymaConstructor());
    ZC.addTool(new Circle3ptsConstructor());
    ZC.addTool(new Arc3ptsConstructor());
    ZC.addTool(new AngleBisectorConstructor());
    ZC.addTool(new LocusConstructor());
    ZC.addTool(new AngleConstructor());
    ZC.addTool(new FixedAngleConstructor());
    ZC.addTool(new NameMover());
    ZC.addTool(new CallProperty());
    ZC.addTool(new ObjectMover());
    ZC.addTool(new CallCalc());
    ZC.addTool(new FloatingObjectConstructor());
    ZC.addTool(new CallMagnet());
    ZC.addTool(new CallDepends());
    ZC.addTool(new CallList());
    ZC.addTool(new CallTrash());
    ZC.addTool(new AnchorConstructor());
    ZC.addTool(new NoAnchorConstructor());
    ZC.addTool(new VectorConstructor());
    ZC.addTool(new SpringConstructor());
    ZC.addTool(new BlocklyConstructor());
    ZC.addTool(new DGScriptNameConstructor());
    ZC.clearBackground();



    // ZC.blocklyManager.show();

    // new Names_panel(window.document.body,ZC.getConstruction().getNames);

    //    var eee=new SymbolicCompute();
    ////    var sss=eee.simplify("times(3,pow(x,minus(3,1)))");
    //    var sss=eee.simplify("power(x,minus(3,1))");
    //    console.log(sss);


};
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
function UndoManager(_canvas) {
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var actions = [];
    var cursor = 0;
    var me = this;
    var Cmarker = null; // Marqueur pour les objets de la construction
    var Tmarker = null; // Marqueur pour les textes

    var ADD = true,
        REMOVE = false;

    var isLeft = function() {
        return (cursor === 0);
    };

    var isRight = function() {
        return (cursor === actions.length);
    };

    var refreshCanvas = function() {
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mouseup", true, true, window, 1, -100, -100, -100, -100, false,
            false, false, false, 0, null);
        Cn.validate(simulatedEvent);
        Cn.computeAll();
        canvas.paint(simulatedEvent);
        me.setBtns();
    };

    var add = function(_o) {
        var _el = _o;
        if (_o instanceof TextObject) {
            _el = canvas.textManager.add(_o)
        } else {
            Cn.add(_o);
            _o.setParentList(_o.getParent());
        }
        return _el;
    };

    var remove = function(_o) {
        if (_o instanceof TextObject) {
            canvas.textManager.deleteTeX(_o);
        } else {
            Cn.remove(_o);
        }
    };


    var undo_redo = function(k) {
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

    me.clear = function() {
        actions = [];
        cursor = 0;
        refreshCanvas();
    };


    this.record = function(_t, _add) {
        if (cursor < actions.length) {
            me.clear();
        }
        cursor++;
        actions.push({
            add: _add,
            target: _t
        });
        this.setBtns();
    };

    this.undo = function() {
        if (cursor > 0) {
            undo_redo(cursor - 1);
            cursor--;
        }
        refreshCanvas();
    };

    this.redo = function() {
        if (cursor < actions.length) {
            undo_redo(cursor);
            cursor++;
        }
        refreshCanvas();
    };


    this.beginAdd = function() {
        Cmarker = Cn.elements().length;
        Tmarker = canvas.textManager.elements().length;
    };

    this.endAdd = function() {
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

    this.deleteObjs = function(_t) {
        if (_t.length > 0)
            this.record(_t, false);
    };

    this.swap = function(_o) {
        for (var i = 0; i < actions.length; i++) {
            var tab = ($U.isArray(actions[i].target)) ? actions[i].target : [actions[i].target];
            if ((tab.length === 1) && (tab[0] === _o))
                actions[i].add = !actions[i].add;
        }
    };

    this.setBtns = function() {
        canvas.setUndoBtn(!isLeft());
        canvas.setRedoBtn(!isRight());
    };
}
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
    var onlypos = false; // Pour dessiner seulement les parties positives
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



    me.setCoords = function(_x, _y, _u, _md3D, _w, _h) {
        x0 = _x;
        y0 = _y;
        Unit = _u;
        if (_md3D)
            Cn.set3D(true);
        if ((window.$OS_X_APPLICATION) && (_w) && (_h)) {
            interOp.windowSize(_w + "," + _h);
        };
    };

    var paintOx = function(ctx) {
        ctx.beginPath();
        if ((y0 > 0) && (y0 < Cn.getHeight())) {
            var start = (onlypos) ? Math.round(x0) : 0;
            ctx.moveTo(start, Math.round(y0));
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
            var start = (onlypos) ? Math.round(y0) : Cn.getBounds().height;
            ctx.moveTo(Math.round(x0), 0);
            ctx.lineTo(Math.round(x0), start);
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
        var start = (onlypos) ? me.x(x0) : me.x(0);
        var min = (Math.round(inc * start)) * inv;
        var max = (Math.round(inc * me.x(Cn.getBounds().width)) + 1) * inv;
        var limit = (onlypos) ? y0 : Cn.getHeight();
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var x = Math.round(me.px(j));
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, limit);
            ctx.stroke();
        }
    };
    var paintGridy = function(ctx) {
        var x = Math.min(Math.max(x0, 0), Cn.getWidth());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var start = (onlypos) ? me.y(y0) : me.y(Cn.getHeight());
        var max = (Math.round(inc * me.y(0)) + 1) * inv;
        var min = (Math.round(inc * start)) * inv;
        var limit = (onlypos) ? x0 : 0;
        for (var i = min; i < max; i += inv) {
            var j = (Math.round(inc * i)) * inv;
            var y = Math.round(me.py(j));
            ctx.beginPath();
            ctx.moveTo(limit, y);
            ctx.lineTo(Cn.getWidth(), y);
            ctx.stroke();
        }
    };

    var paintGradx = function(ctx) {
        var y = Math.min(Math.max(y0, 0), Cn.getHeight());
        var log = Math.floor($U.log(Unit / P.grid.limitinf));
        var inc = Math.pow(10, log);
        var inv = Math.pow(10, -log);
        var start = (onlypos) ? me.x(x0) : me.x(0);
        // var min = (Math.round(inc * me.x(0))) * inv;
        var min = (Math.round(inc * start)) * inv;
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
        // min = (Math.round(inc * me.x(0))) * inv;
        min = (Math.round(inc * start)) * inv;
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
        var start = (onlypos) ? me.y(y0) : me.y(Cn.getHeight());
        var max = (Math.round(inc * me.y(0)) + 1) * inv;
        var min = (Math.round(inc * start)) * inv;
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
        min = (Math.round(inc * start)) * inv;
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
    me.setOnlyPos = function(_b) {
        onlypos = _b;
    };
    me.isOnlyPos = function() {
        return onlypos;
    };

    me.getSource = function() {
        var txt = "SetCoords(" + x0 + "," + y0 + "," + Unit + "," + Cn.is3D() + "," + window.innerWidth + "," + window.innerHeight + ");\n";
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
        t += ";onlyPositive:" + me.isOnlyPos();
        t += ";color:" + me.getColor();
        t += ";fontSize:" + me.getFontSize();
        t += ";axisWidth:" + me.getAxisWidth();
        t += ";gridWidth:" + me.getGridWidth();
        t += "\");\n";
        return t;
    };

}
/*!
 * HTML5 Canvas SVG Alpha 2.0
 * http://specinnovations.com/
 *
 * Copyright 2011, SPEC Innovations
 * Dual licensed under the MIT or Apache 2.0.
 * http://code.google.com/p/html5-canvas-svg/
 * Alex Rhea, Chris Ritter
 *
 * Date: Tue Aug 09 2011 -0400
 */

(function(window, document, undefined) {

    // current path template
    var currentPath = {
        type: "path",
        points: new Array(),
        style: {}
    }

    // canvas DOM element
    var canvas = null;

    // canvas context
    var ctx = null;

    // elements drawn to the canvas
    var elements = [];

    var SVGCanvas = (function() {

        var SVGCanvas = function(id) {
            canvas = document.getElementById(id);
            ctx = canvas.getContext("2d");
            elements = [];
            /* Settings */
            ctx.TRANSFORM = [];
            ctx.lineDash = [];
            //            ctx.setLineDash = function(_tab) {
            //                ctx.lineDash = _tab;
            //            };
            this.lineDash = [];
            this.strokeStyle = "black";
            this.lineWidth = 1;
            this.lineCap = "butt";
            this.lineJoin = "miter";
            this.miterLimit = 10;
            this.fillStyle = "black";
            this.shadowOffsetX = 0;
            this.shadowOffsetY = 0;
            this.shadowBlur = 0;
            this.shadowColor = "transparent black";
            this.font = "10px sans-serif";
            this.textAlign = "start";
            this.textBaseline = "alphabetic";
            this.globalAlpha = 1.0;
            this.globalCompositeOperation = "source-over";

            this.util = {
                updateCanvasSettings: function() {
                    for (key in this) {
                        ctx[key] = this[key];
                    }
                },
                pushToStack: function() {
                    if (currentPath.points.length > 0) {
                        elements.push(currentPath);
                        currentPath = {
                            type: "path",
                            points: new Array(),
                            style: {}
                        }
                    }
                },
                generateSVG: function() {
                    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n\
<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"" + canvas.width + "\" height=\"" + canvas.height + "\" viewBox=\"0, 0, " + canvas.width + ", " + canvas.height + "\">\n\n";
                    for (var i = 0; i < elements.length; i++) {
                        //                        console.log(i);
                        var elem = elements[i];
                        var style = "";
                        for (var attr in elem.style) {
                            try {
                                // Traduction de tous les codes de couleur rgba en hexa :
                                var match = elem.style[attr].match(/rgba\((\d*),(\d*),(\d*),(\d*\.?\d*)\)/);
                                if (match) {
                                    if (attr === "fill")
                                        style += "fill-opacity:" + match[4] + "; ";
                                    else if (attr === "stroke")
                                        style += "stroke-opacity:" + match[4] + "; ";
                                    var nn = Number(0x1000000 + parseInt(match[1]) * 0x10000 + parseInt(match[2]) * 0x100 + parseInt(match[3])).toString(16).substring(1);
                                    elem.style[attr] = "#" + Number(0x1000000 + parseInt(match[1]) * 0x10000 + parseInt(match[2]) * 0x100 + parseInt(match[3])).toString(16).substring(1);
                                }
                            } catch (e) {}
                            // séparation de l'attribut font en deux attributs : font-size et font-family :
                            if (attr === "font") {
                                var stl = elem.style[attr].split(" ");
                                if (stl.length === 2) {
                                    style += "font-size:" + stl[0] + "; ";
                                    style += "font-family:" + stl[1] + "; ";
                                } else
                                    style += attr + ":" + elem.style[attr] + "; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "center")) {
                                style += "text-anchor:middle; text-align:center; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "left")) {
                                style += "text-anchor:start; text-align:left; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "right")) {
                                style += "text-anchor:end; text-align:right; ";
                            } else
                                style += attr + ":" + elem.style[attr] + "; ";
                        }
                        if (elem.type == "text") {
                            xml += '\n<text x="' + elem.x + '" y="' + elem.y + '" style="' + style + '" ';
                            if (elem.hasOwnProperty("TRANSFORM")) {
                                xml += 'transform="' + elem.TRANSFORM + '" ';
                            };
                            xml += '>' + elem.text + '</text>';
                        } else if (elem.type == "path") {
                            var points = "";
                            for (var j = 0; j < elem.points.length; j++) {
                                var point = elem.points[j];
                                if (point.action == "move") {
                                    points += "M" + point.x + " " + point.y + " ";
                                } else if (point.action == "line") {
                                    points += "L" + point.x + " " + point.y + " ";
                                } else if (point.action == "quadratic") {
                                    points += "Q" + point.x1 + " " + point.y1 + " " + point.x + " " + point.y + " ";
                                } else if (point.action == "bezier") {
                                    points += "C" + point.x2 + " " + point.y2 + " " + point.x1 + " " + point.y1 + " " + point.x + " " + point.y + " ";
                                } else if (point.action == "arc") {
                                    points += "M" + point.x1 + " " + point.y1 + " A " + point.r +
                                        " " + point.r + " 0 " + point.wa + " " + point.acw + " " + point.x2 + " " + point.y2 + " ";
                                } else if (point.action == "circle") {
                                    points += "M " + point.x + ", " + point.y + " m " + (-point.r) + ", 0" + " a " + point.r + "," + point.r + " 0 1,0" + " " + (2 * point.r) + ",0" + " a " + point.r + "," + point.r + " 0 1,0" + " " + (-2 * point.r) + ",0";
                                    //                                                                console.log(points);
                                }



                            }

                            xml += '\n\n\n<path d="' + points + '" style="' + style + '" />';
                        }
                    }

                    xml += "\n</svg>"

                    return xml;

                }
            }
        }

        SVGCanvas.fn = SVGCanvas.prototype = {
            constructor: SVGCanvas,
            getCanvas: function() {
                return canvas;
            },
            getContext: function() {
                return ctx;
            },
            polarToCartesian: function(centerX, centerY, radius, angleInRadians) {
                var x = centerX + radius * Math.cos(angleInRadians);
                var y = centerY + radius * Math.sin(angleInRadians);
                return {
                    "x": x,
                    "y": y
                };
            },
            beginPath: function() {
                this.util.pushToStack();
                ctx.beginPath();
            },
            closePath: function() {
                this.util.pushToStack();
                ctx.closePath();
            },
            moveTo: function(x, y) {
                currentPath.points.push({
                    "action": "move",
                    "x": x,
                    "y": y
                });
                ctx.moveTo(x, y);
            },
            lineTo: function(x, y) {
                currentPath.points.push({
                    "action": "line",
                    "x": x,
                    "y": y
                });
                ctx.lineTo(x, y);
            },
            quadraticCurveTo: function(cpx, cpy, x, y) {
                currentPath.points.push({
                    "action": "quadratic",
                    "x": x,
                    "y": y,
                    "x1": cpx,
                    "y1": cpy
                });
                ctx.quadraticCurveTo(cpx, cpy, x, y);
            },
            bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                currentPath.points.push({
                    "action": "bezier",
                    "x": x,
                    "y": y,
                    "x1": cp1x,
                    "y1": cp1y,
                    "x2": cp2x,
                    "y2": cp2y
                });
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            },
            arcTo: function(x1, y1, x2, y2, radius) {
                currentPath.points.push({
                    "action": "move",
                    "x": x1,
                    "y": y1
                });
                this.bezierCurveTo(x1, (y1 + radius), x2, (y2 + radius));
                ctx.arcTo(x1, y1, x2, y2, radius);
            },
            arc: function(cx, cy, radius, startAngle, endAngle, anticlockwise) {
                //                console.log(Math.abs(Math.abs(startAngle - endAngle) - Math.PI * 2));

                if (Math.abs(Math.abs(startAngle - endAngle) - Math.PI * 2) < 1e-9) {
                    currentPath.points.push({
                        "action": "circle",
                        "r": radius,
                        "x": cx,
                        "y": cy
                    });
                    this.util.pushToStack();
                } else {
                    //                    console.log("**************");
                    //                    console.log("x=" + cx + " y=" + cy + " r=" + radius);
                    //                    console.log(" startAngle=" + startAngle + " endAngle=" + endAngle);
                    //                    console.log("dA>Math.PI="+(dA>Math.PI));
                    //                    console.log(" anticlockwise=" + anticlockwise);
                    //                    console.log("TEST="+((dA>Math.PI && !anticlockwise)||(dA<Math.PI && anticlockwise)));
                    //  
                    var dA = endAngle - startAngle;
                    while (dA < 0)
                        dA += 2 * Math.PI;
                    var start = this.polarToCartesian(cx, cy, radius, startAngle);
                    var end = this.polarToCartesian(cx, cy, radius, endAngle);
                    var largeArc = 1 * (((dA > Math.PI && !anticlockwise) || (dA < Math.PI && anticlockwise)));
                    currentPath.points.push({
                        "action": "arc",
                        "r": radius,
                        "x1": start.x,
                        "y1": start.y,
                        "x2": end.x,
                        "y2": end.y,
                        "acw": 1 - 1 * anticlockwise,
                        "wa": largeArc
                    });
                    this.util.pushToStack();
                }
            },
            rect: function(x, y, width, height) {
                currentPath.points.push({
                    "action": "move",
                    "x": x,
                    "y": y
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y + height
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x,
                    "y": y + height
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x,
                    "y": y
                });
                ctx.rect(x, y, width, height);
            },
            clearRect: function(x, y, width, height) {
                currentPath.points.push({
                    "action": "move",
                    "x": x,
                    "y": y
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y + height
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x,
                    "y": y + height
                });
                currentPath.points.push({
                    "action": "line",
                    "x": x,
                    "y": y
                });
                ctx.clearRect(x, y, width, height);
            },
            fillRect: function(x, y, width, height) {
                this.util.pushToStack();
                var rect = {
                    type: "path",
                    style: {}
                };
                rect.points = new Array();
                rect.points.push({
                    "action": "move",
                    "x": x,
                    "y": y
                });
                rect.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y
                });
                rect.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y + height
                });
                rect.points.push({
                    "action": "line",
                    "x": x,
                    "y": y + height
                });
                rect.points.push({
                    "action": "line",
                    "x": x,
                    "y": y
                });
                rect.style["fill"] = ctx.fillStyle = this.fillStyle;
                elements.push(rect);
                this.util.updateCanvasSettings();
                ctx.fillRect(x, y, width, height);
            },
            strokeRect: function(x, y, width, height) {
                this.util.pushToStack();
                var rect = {
                    type: "path",
                    style: {}
                };
                rect.points = new Array();
                rect.points.push({
                    "action": "move",
                    "x": x,
                    "y": y
                });
                rect.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y
                });
                rect.points.push({
                    "action": "line",
                    "x": x + width,
                    "y": y + height
                });
                rect.points.push({
                    "action": "line",
                    "x": x,
                    "y": y + height
                });
                rect.points.push({
                    "action": "line",
                    "x": x,
                    "y": y
                });
                rect.style["stroke"] = ctx.strokeStyle = this.strokeStyle;
                rect.style["stroke-width"] = ctx.lineWidth = this.lineWidth;
                rect.style["stroke-linecap"] = ctx.lineCap = this.lineCap;
                rect.style["stroke-miterlimit"] = ctx.miterLimit = this.miterLimit;
                rect.style["stroke-linejoin"] = ctx.lineJoin = this.lineJoin;
                if (ctx.lineDash.length > 0) {
                    rect.style["stroke-dasharray"] = ctx.lineDash.join(",");
                    ctx.lineDash = this.lineDash;
                }
                elements.push(rect);
                this.util.updateCanvasSettings();
                ctx.strokeRect(x, y, width, height);
            },
            isPointInPath: function(x, y) {
                return ctx.isPointInPath(x, y);
            },
            stroke: function() {
                var path;
                if (currentPath.points.length > 0) {
                    path = currentPath;
                } else {
                    path = elements[elements.length - 1];
                }
                path.style["stroke"] = ctx.strokeStyle = this.strokeStyle;
                path.style["stroke-width"] = ctx.lineWidth = this.lineWidth;
                path.style["stroke-linecap"] = ctx.lineCap = this.lineCap;
                path.style["stroke-miterlimit"] = ctx.miterLimit = this.miterLimit;
                path.style["stroke-linejoin"] = ctx.lineJoin = this.lineJoin;
                if (ctx.lineDash.length > 0) {
                    path.style["stroke-dasharray"] = ctx.lineDash.join(",");
                    ctx.lineDash = this.lineDash;
                }
                if (!path.style["fill"])
                    path.style["fill"] = "none";
                this.util.updateCanvasSettings();
                ctx.stroke();
            },
            fill: function() {
                var path;
                if (currentPath.points.length > 0) {
                    path = currentPath;
                } else {
                    path = elements[elements.length - 1];
                }
                path.style["fill"] = ctx.fillStyle = this.fillStyle;
                this.util.updateCanvasSettings();
                ctx.fill();
            },
            strokeText: function(text, x, y) {
                ctx.font = this.font;
                elements.push({
                    "type": "text",
                    "text": text,
                    "x": x,
                    "y": y,
                    style: {
                        "font": this.font,
                        "text-align": this.textAlign,
                        "alignment-baseline": this.textBaseline,
                        "fill": this.strokeStyle
                    }
                });
                this.util.updateCanvasSettings();
                ctx.strokeText(text, x, y);
            },
            fillText: function(text, x, y) {
                ctx.font = this.font;
                var items = {
                    "type": "text",
                    "text": text,
                    "x": x,
                    "y": y,
                    style: {
                        "font": this.font,
                        "text-align": this.textAlign,
                        "alignment-baseline": this.textBaseline,
                        "fill": this.fillStyle
                    }
                };
                if (ctx.TRANSFORM.length > 0) {
                    items["TRANSFORM"] = ctx.TRANSFORM.join(" ");
                }
                elements.push(items);
                this.util.updateCanvasSettings();
                ctx.fillText(text, x, y);
            },
            measureText: function(text) {
                return ctx.measureText(text);
            },
            clip: function() {
                this.util.updateCanvasSettings();
                ctx.clip();
            },
            save: function() {
                ctx.TRANSFORM = [];
                ctx.save();
            },
            restore: function() {
                ctx.TRANSFORM = [];
                ctx.restore();
            },
            createLinearGradient: function(x0, y0, x1, y1) {
                return ctx.createLinearGradient(x0, y0, x1, y1);
            },
            createRadialGradient: function(x0, y0, r0, x1, y1, r1) {
                return ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
            },
            createPattern: function(image, repetition) {
                return ctx.createPattern(image, repetition);
            },
            createImageData: function(sw, sh) {
                return (arguments.length == 1 ? ctx.createImageData(imageData) : ctx.createImageData(sw, sh));
            },
            createImageData: function(imageData) {
                return ctx.createImageData(imageData);
            },
            getImageData: function(sx, sy, sw, sh) {
                return ctx.getImageData(sx, sy, sw, sh);
            },
            putImageData: function(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                return ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            },
            drawImage: function() {
                return (arguments.length > 5) ?
                    ctx.drawImage(arguments[0].value, arguments[1].value, arguments[2].value, arguments[3].value, arguments[4].value) :
                    ctx.drawImage(arguments[0].value, arguments[1].value, arguments[2].value, arguments[3].value, arguments[4].value, arguments[5].value, arguments[6].value, arguments[7].value, arguments[8].value);
            },
            scale: function(x, y) {
                ctx.scale(x, y);
            },
            rotate: function(angle) {
                while (angle < 0)
                    angle += 2 * Math.PI;
                angle = angle * 180 / Math.PI;
                ctx.TRANSFORM.push("rotate(" + angle + ")");
                ctx.rotate(angle);
            },
            translate: function(x, y) {
                ctx.TRANSFORM.push("translate(" + x + "," + y + ")");
                ctx.translate(x, y);
            },
            setLineDash: function(tab) {
                ctx.lineDash = tab;
            },
            transform: function(m11, m12, m21, m22, dx, dy) {
                ctx.transform(m11, m12, m21, m22, dx, dy);
            },
            setTransform: function(m11, m12, m21, m22, dx, dy) {
                ctx.setTransform(m11, m12, m21, m22, dx, dy);
            },
            toDataURL: function(type, args) {
                if (type == "image/svg+xml") {
                    return this.util.generateSVG();
                } else {
                    return ctx.toDataURL(type, args);
                }
            }

        }

        return SVGCanvas;

    })();

    window.SVGCanvas = SVGCanvas;

})(window, document);
function Canvas(_id) {
    var me = this;
    var ID = _id;
    var docObject = document.getElementById(_id);
    var bounds = null;
    var iPadDidFirstEnterBackground = true;




    me.refreshKeyboard = function() {
        if (me.namesManager.isVisible()) {
            me.namesManager.refresh();
        }
    };

    me.getID = function() {
        return ID;
    };
    me.getDocObject = function() {
        return docObject;
    };

    me.prefs = $P.clone();

    var width = 0;
    var height = 0;

    me.getSource = function() {
        return (me.macrosManager.getSource() + Cn.getSource() + me.textManager.getSource())
    }

    me.getHTML = function(hide_ctrl_panel) {
        var _w = width;
        var _h = height;
        var _src = me.getSource();
        _src = $U.base64_encode(_src);
        var d = new Date();
        var _frm = "dgpad_frame_" + d.getTime();
        var s = '<form action="http://www.dgpad.net/index.php" target="' + _frm + '" method="post" width="' + _w + '" height="' + (_h + 40) + '">';
        s += '<input type="hidden" name="file_content" value="' + _src + '">';
        if (hide_ctrl_panel)
            s += '<input type="hidden" name="hide_ctrlpanel" value="true">';
        s += '<div style="text-align:center;position:relative;width:' + _w + 'px;height:' + _h + 'px;background-color:rgba(200,200,200,1)">';
        s += '<div style="height:40px;line-height:40px;vertical-align: baseline;">';
        s += '<input type="submit" value="' + $L.export_button + '" style="display: inline-block;zoom: 1;*display: inline;vertical-align: baseline;margin: 0 2px;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 14px/100% Arial, Helvetica, sans-serif;padding: .5em 2em .55em;text-shadow: 0 1px 1px rgba(0,0,0,.3);-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);box-shadow: 0 1px 2px rgba(0,0,0,.2);color: #d7d7d7;border: solid 1px #333;background: #333;background: -webkit-gradient(linear, left top, left bottom, from(#666), to(#000));background: -moz-linear-gradient(top,  #666,  #000);">';
        s += '</div>';
        s += '<iframe name="' + _frm + '" width="' + _w + '" height="' + _h + '" src="about:blank" scrolling="no" frameborder="no"></iframe>';
        s += '</div>';
        s += '</form>';
        return s;
    };

    me.getHTMLJS = function(hide_ctrl_panel) {
        var _w = width;
        var _h = height;
        var _src = me.getSource();
        _src = $U.base64_encode(_src);
        var d = new Date();
        var _frm = "dgpad_frame_" + d.getTime();
        var s = '<form action="http://www.dgpad.net/index.php" target="' + _frm + '" method="post" width="' + _w + '" height="' + _h + '">';
        s += '<input type="hidden" name="file_content" value="' + _src + '">';
        if (hide_ctrl_panel)
            s += '<input type="hidden" name="hide_ctrlpanel" value="true">';
        s += '<iframe name="' + _frm + '" width="' + _w + '" height="' + _h + '" src="about:blank" scrolling="no" frameborder="no" oNlOAd="if (!this.parentNode.num) {this.parentNode.submit();this.parentNode.num=true}"></iframe>';
        s += '</form>';
        return s;
    };

    me.load64 = function(_str) {
        $U.isloading = true
        me.getConstruction().deleteAll();
        me.macrosManager.clearTools();
        me.textManager.clear();
        me.trackManager.clear();
        me.Interpret($U.base64_decode(_str));
        me.forceArrowBtn();
        if (window.$OS_X_APPLICATION) {
            interOp.figureLoaded("");
        };
        me.getConstruction().initAll();
        Cn.computeAll();
        me.textManager.refreshInputs();
        me.paint();
        $U.isloading = false
    }
    me.saveToLocalStorage = function(is_iPad) {
        if (Cn.isEmpty())
            return;

        var t = {};
        var now = new Date();
        t.date = now.toLocaleString();
        t.width = width;
        t.height = height;
        t.lock = false;
        t.src = $U.base64_encode(me.getSource());

        //        docObject.style.visibility = "hidden";
        var buff = document.createElement("canvas");
        buff.setAttribute("width", $P.localstorage.iconwidth);
        buff.setAttribute("height", $P.localstorage.iconwidth);
        buff.style.setProperty("image-rendering", "-moz-crisp-edges");
        buff.style.setProperty("image-rendering", "-webkit-optimize-contrast");
        var scale = 1.5 * $P.localstorage.iconwidth / Math.max(width, height);
        Cn.zoom(width / 2, height / 2, scale);
        Cn.computeAll();
        me.paint();
        var w = width / 1.5;
        var h = height / 1.5;
        var d = $P.localstorage.iconwidth;
        var ctx = buff.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;
        ctx.drawImage(docObject, (d - w) / 2, (d - h) / 2, w, h);

        t.img = buff.toDataURL();
        Cn.zoom(width / 2, height / 2, 1 / scale);

        if ((is_iPad) && (!iPadDidFirstEnterBackground)) {
            localStorage.setItem($P.localstorage.base + "1", JSON.stringify(t));
        } else {
            var storageError = false;
            do {
                storageError = false;
                try {
                    $U.shiftLocalStorages();
                    localStorage.setItem($P.localstorage.base + "1", JSON.stringify(t));
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        $U.clearOneLocalStorage();
                        storageError = true;
                    } else {
                        localStorage.setItem($P.localstorage.base + "1", JSON.stringify(t));
                    }
                }
            } while (storageError);
        }
    };

    // Utilisé pour régler un bug d'Android (voir méthode resizeWindow) :
    var cloneCanvas = function() {
        var parent = docObject.parentNode;
        var newcanvas = document.createElement('canvas');
        parent.insertBefore(newcanvas, docObject);
        parent.removeChild(docObject);
        newcanvas.setAttribute("id", ID);
        docObject = newcanvas;
        $U.initEvents(me, docObject);
        initBounds();
        context = getNewContext();
    };


    var setFullScreen = function() {
        var cl, ct, cw, ch;
        var ww = window.innerWidth;
        var wh = window.innerHeight - 1;
        cw = ww - 2 * me.prefs.size.marginwidth;
        ch = wh - 2 * me.prefs.size.marginheight;
        ct = (wh - ch) / 2;
        cl = (ww - cw) / 2;
        docObject.style.position = "fixed";
        docObject.setAttribute("width", cw);
        docObject.setAttribute("height", ch);
        docObject.style.top = ct + "px";
        docObject.style.left = cl + "px";
        docObject.style.width = cw + "px";
        docObject.style.height = ch + "px";
        width = docObject.clientWidth;
        height = docObject.clientHeight;
        bounds = {
            "left": cl,
            "top": ct,
            "width": cw,
            "height": ch
        };
        if (Object.touchpad) {
            window.scrollTo(0, 0);
        }
    };

    // Appelée lorsqu'on change la taille de la fenêtre (ordinateur)
    // ou bien lorsqu'on change d'orientation sur une tablette :
    var resizeWindow = function() {
        setFullScreen();
        me.trackManager.resize();
        var ctrl_panel_visible = true;
        me.trackManager.resize();
        if (mainpanel) {
            ctrl_panel_visible = mainpanel.isReallyVisible();
            docObject.parentNode.removeChild(mainpanel.getDocObject());
            mainpanel = null;
        }
        mainpanel = new ControlPanel(me);
        if (!ctrl_panel_visible) mainpanel.hide();
        me.setMode(1);
        if (Cn) Cn.resizeBtn();


        if ($U.isMobile.android()) {
            // Un bug hallucinant du navigateur standard d'Androïd rendant inutilisable
            // le clearRect après avoir fait un resize (changement d'orientation).
            // La seule possibilité est de cloner l'élément canvas du DOM, ainsi
            // que faire un paint lancé par un timer. Le délire :
            //            console.log("ANDROID. width=" + width + " height=" + height);
            cloneCanvas();
            setTimeout(function() {
                me.paint();
            }, 1);
        } else {
            me.paint();
        }
    };

    var initBounds = function() {
        if (docObject.hasAttribute("data-hidectrlpanel")) {
            if (docObject.getAttribute("data-hidectrlpanel") === "true") {
                me.prefs.controlpanel.size = 0;
            }
        }

        if ((docObject.hasAttribute("width")) && (docObject.hasAttribute("height"))) {
            var cl, ct, cw, ch;
            var off = $U.getElementOffset(docObject);
            cl = off.left;
            ct = off.top;
            cw = 1 * docObject.getAttribute("width");
            ch = 1 * docObject.getAttribute("height");
            width = cw;
            height = ch;
            docObject.style.top = ct + "px";
            docObject.style.left = cl + "px";
            bounds = {
                "left": cl,
                "top": ct,
                "width": cw,
                "height": ch
            };
        } else {
            setFullScreen();
            window.document.body.style.setProperty("overflow", "hidden");
            if (!Object.touchpad) {
                window.onresize = resizeWindow;
                window.onbeforeunload = function() {
                    me.saveToLocalStorage();
                };
            } else {
                if ($U.isMobile.android()) {
                    // Encore une subtilité du navigateur d'Android :
                    // l'évenement onorientationchange est lancé avant
                    // que la taille de la fenêtre soit changée (resize event).
                    // Du coup il faut attendre l'évenement resize qui
                    // n'aura un effet que si on est passé précédement par
                    // onorientationchange. 
                    window.onorientationchange = function() {
                        var or = true;
                        window.onresize = function() {
                            if (or)
                                resizeWindow();
                            or = false;
                        };
                    };
                } else
                    window.onorientationchange = resizeWindow;
                window.onunload = function() {
                    me.saveToLocalStorage();
                };
                // Seulement utilisée par l'application iPad (stockage de la figure dans
                // l'historique à chaque fois que DGPad est désactivé (passe en background) :
                window.$IPADUNLOAD = function() {
                    me.quit(true);
                    iPadDidFirstEnterBackground = false;
                    docObject.style.visibility = "visible";
                    // On inverse l'homothétie effectuée dans me.quit() pour rétablir la 
                    // figure dans ses dimensions d'origine :
                    // var scale = Math.max(width, height) / (1.5 * $P.localstorage.iconwidth);
                    // Cn.zoom(width / 2, height / 2, scale);
                    Cn.computeAll();
                    me.paint();
                };
            }
        }
    };


    initBounds();
    me.getBounds = function() {
        return bounds;
    };

    docObject.style.backgroundColor = me.prefs.background.color;
    //    var img = "url('" + me.prefs.background.image + "'),";
    //    img += $U.browserCode();
    //    img += me.prefs.background.gradient;
    //    docObject.style.backgroundImage = img;
    //    docObject.style.backgroundRepeat = me.prefs.background.repeat;
    //    docObject.style.backgroundPosition = me.prefs.background.position;


    var mainpanel = new ControlPanel(me);
    me.setUndoBtn = function(_active) {
        mainpanel.setUndoBtn(_active);
    };
    me.setRedoBtn = function(_active) {
        mainpanel.setRedoBtn(_active);
    };
    me.forceArrowBtn = function() {
        mainpanel.forceArrowBtn();
    };
    me.selectArrowBtn = function() {
        mainpanel.selectArrowBtn();
    };
    me.selectPropBtn = function() {
        mainpanel.selectPropBtn();
    };
    me.selectCalcBtn = function() {
        mainpanel.selectCalcBtn();
    };
    me.deselectAll = function() {
        mainpanel.deselectAll();
    };
    me.selectNameBtn = function(_b) {
        mainpanel.selectNameBtn(_b);
    };
    me.ctrl_show = function(_bool) {
        if (_bool) {
            if (mainpanel) {
                docObject.parentNode.removeChild(mainpanel.getDocObject());
                mainpanel = null;
            }
            mainpanel = new ControlPanel(me);
        } else {
            mainpanel.hide();
        }
        me.paint();
    };






    var initContext = function(cx) {
        //        cx.imageSmoothingEnabled = true;
        //        cx.mozImageSmoothingEnabled = true;
        //        cx.webkitImageSmoothingEnabled=true;
        // setLineDash (pointillés) n'est aujourd'hui reconnu que par
        // Chrome. Rajoute cette fonctionnalité pour Firefox et Safari :
        if (!cx.setLineDash) {
            cx.setLineDash = function(_tab) {
                cx.mozDash = _tab;
                cx.webkitLineDash = _tab;
            };
        }
        cx.rect(0, 0, width, height);
        cx.clip();
    };

    var getNewContext = function() {
        var cx = docObject.getContext('2d');
        initContext(cx);
        return cx;
    };

    var context = getNewContext();

    me.getContext = function() {
        return context;
    };

    me.exportPNG = function() {
        var buff = document.createElement("canvas");
        buff.setAttribute("width", width);
        buff.setAttribute("height", height);
        buff.style.setProperty("image-rendering", "-moz-crisp-edges");
        buff.style.setProperty("image-rendering", "-webkit-optimize-contrast");
        Cn.computeAll();
        me.paint();
        var ctx = buff.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;
        ctx.fillStyle = docObject.style.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(docObject, 0, 0, width, height);
        return buff.toDataURL();
    };

    me.exportSVG = function() {
        for (var i = 0; i < 2; i++) {
            context = new SVGCanvas(ID);
            if (!context.setLineDash) {
                context.setLineDash = function(_tab) {
                    context.mozDash = _tab;
                    context.webkitLineDash = _tab;
                };
            }
            Cn.clearIndicated();
            Cn.clearSelected();
            Cn.paint(context);
        }
        var svg = context.toDataURL("image/svg+xml");
        context = getNewContext();
        resizeWindow();
        return svg;
    };

    me.loadZipPackage = function(_onload) {
        if (typeof window.JSZipUtils == 'undefined') {
            var parent = document.getElementsByTagName("head")[0];
            var script0 = document.createElement("script");
            script0.type = "text/javascript";
            script0.src = $APP_PATH + "NotPacked/thirdParty/jszip-utils.js";
            var script1 = document.createElement("script");
            script1.type = "text/javascript";
            script1.src = $APP_PATH + "NotPacked/thirdParty/jszip.min.js";
            script1.onload = _onload;
            parent.appendChild(script0);
            parent.appendChild(script1);
        } else
            _onload();
    };

    me.getiBookPlugin = function(_hide_control_panel, _fname, _callback) {
        var _w = width;
        var _h = height;
        var _f = (_fname == "") ? "ibook.wdgt" : _fname;
        var d = new Date();
        var _id = "net.dgpad.fig" + d.getTime();
        var _src = me.getSource();
        _src = $U.base64_encode(_src);
        var _hide = _hide_control_panel;
        var html = "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title></title>\n\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n\t\t<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" />\n\t\t<link rel=\"apple-touch-icon\" href=\"scripts/NotPacked/images/icon.png\"/>\n\t\t<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n\t\t<meta   id=\"wholeViewport\" name=\"viewport\" content=\"width=device-width, maximum-scale=1.0, initial-scale=1 ,user-scalable=no\">\n\t\t<script>\n\t\t\tvar $MOBILE_PHONE;\n\t\t\tif (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {\n\t\t\t\tif (((screen.width >= 480) && (screen.height >= 800)) || ((screen.width >= 800) && (screen.height >= 480)) || navigator.userAgent.match(/ipad/gi)) {\n\t\t\t\t\t$MOBILE_PHONE = false;//tablette\n\t\t\t\t} else {\n\t\t\t\t\t$MOBILE_PHONE = true;//mobile\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\t$MOBILE_PHONE = false;//Desktop\n\t\t\t}\n\t\t\tif ($MOBILE_PHONE) {\n\t\t\t\tdocument.getElementById('wholeViewport').setAttribute(\"content\", \"width=device-width, maximum-scale=0.7, initial-scale=0.7 ,user-scalable=no\");\n\t\t\t}\n\t\t</script>\n\t</head>\n\t<body style=\"-ms-touch-action: none;\">\n\t\t<script src=\"scripts/DGPad.js\" data-source=\"" + _src + "\" data-hidectrlpanel=\"" + _hide + "\"></script>\n\t</body> \n</html>\n";
        var plist = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n<plist version=\"1.0\">\n<dict>\n\t<key>CFBundleDisplayName</key>\n\t<string>DGPad</string>\n\t<key>CFBundleIdentifier</key>\n\t<string>" + _id + "</string>\n\t<key>MainHTML</key>\n\t<string>index.html</string>\n\t<key>Width</key>\n\t<integer>" + _w + "</integer>\n\t<key>Height</key>\n\t<integer>" + _h + "</integer>\n</dict>\n</plist>\n";
        var png = me.exportPNG();

        JSZipUtils.getBinaryContent($APP_PATH + "NotPacked/scripts.zip", function(err, data) {
            if (!err) {
                var zip = new JSZip();
                var plugin = zip.folder(_f).load(data);
                plugin.file("index.html", html);
                plugin.file("Info.plist", plist);
                plugin.file("Default.png", png.substr(png.indexOf(',') + 1), {
                    base64: true
                });
                var content = zip.generate({
                    type: "blob"
                });
                _callback(content);
            }
        });
    };



    //    var gDrive = new GoogleFiles(docObject);
    //    me.upload = function(fname, source) {
    //
    //        gDrive.upload("essai.js", Cn.getSource());
    //    }







    me.getWidth = function() {
        return width;
    };
    me.getHeight = function() {
        return height;
    };
    var mousedown = false;




    me.mouseX = function(ev) {
        return (ev.pageX - bounds.left);
    };
    me.mouseY = function(ev) {
        return (ev.pageY - bounds.top);
    };
    me.mouse = function(ev) {
        return new VirtualPointObject(me.mouseX(ev), me.mouseY(ev));
    };

    var Cn = new Construction(me);
    me.getConstruction = function() {
        return Cn;
    };

    // Managers :
    me.undoManager = new UndoManager(me);
    me.undoManager.setBtns();
    me.propertiesManager = new PropertiesManager(me);
    me.macrosManager = new MacrosManager(me);
    me.deleteAll = new DeleteAll(me);
    me.coincidenceManager = new CoincidenceManager(me);
    me.eraserPanel = new EraserManager(me);
    me.trackManager = new TrackManager(me);
    me.calcManager = new CalcManager(me);
    me.magnetManager = new MagnetManager(me);
    me.magnifyManager = new MagnifierManager(me);
    me.demoModeManager = new DemoModeManager(me);
    me.textManager = new TextManager(me);
    me.dependsManager = new DependsManager(me);
    me.namesManager = new NamesManager(me);
    me.blocklyManager = new BlocklyManager(me);
    me.longpressManager = new LongpressManager(me);




    me.addText = function(_m, _l, _t, _w, _h, _stl) {
        me.textManager.addTeXElement(_m, _l, _t, _w, _h, _stl);
    };

    var closeTools = function() {
        toolsManager.closeTools();
        me.setPointConstructor();
        me.clearFilters();
        Cn.clearSelected();
    };


    // mode 0 pour consultation, 1 pour pointeur, 2 pour gomme, 3 pour poubelle, 
    // 4 pour construction de macros, 5 pour execution de macros
    // 6 pour les propriétés, 7 pour le tracé, 8 pour la calculatrice,
    // 9 pour le magnétisme, 10 pour le TeX, 11 pour les dépendances :
    me.setMode = function(_mode) {
        closeTools();
        me.magnifyManager.show();
        if ((_mode === 0)) {
            me.deselectAll();
            me.magnifyManager.hide();
        }
        if (_mode === 2) {
            me.eraserPanel.showPanel();
        } else {
            me.eraserPanel.hidePanel();
        }
        if (_mode === 3) {
            me.deleteAll.show();
        } else {
            me.deleteAll.hide();
        }
        if ((_mode === 4) || (_mode === 5)) {
            me.macrosManager.showPanel();
        } else {
            me.macrosManager.hidePanel();
        }
        if (_mode === 6) {
            me.propertiesManager.showPanel();
        } else {
            me.propertiesManager.hidePanel();
        }
        if (_mode === 7) {
            handPath.start();
        } else {
            me.clearFilters();
        }
        if (_mode === 8) {
            me.calcManager.showPanel();
        } else {
            me.calcManager.hidePanel();
        }
        if (_mode === 9) {
            mainpanel.deselectPointer();
        } else {
            me.magnetManager.quit();
        }
        if (_mode === 10) {
            me.textManager.showPanel();
        } else {
            me.textManager.hidePanel();
        }
        if (_mode === 11) {
            mainpanel.deselectPointer();
        } else {
            me.dependsManager.quit();
        }
        Cn.setMode(_mode);
    };

    me.getMode = function() {
        return Cn.getMode();
    };

    var PC = new PointConstructor();
    var OC = PC;

    var myTimeOut = new $U.TimeOut(me.prefs.precision.timeout, function() {
        if (Cn.getIndicated().length === 1) {
            if (Cn.getMode() === 1) {
                me.selectPropBtn(true);
                me.propertiesManager.edit(Cn.getIndicated()[0]);
            }
        }

    });
    me.stopChrono = function() {
        myTimeOut.stopChrono();
    };
    var handPath = new Ghost(me);

    var toolsManager = new ToolsManager(me);
    me.addTool = function(_oc) {
        toolsManager.addTool(_oc);
    };
    me.getConstructor = function(_code) {
        return toolsManager.getConstructor(_code);
    };

    me.initTools = function(ev, obj) {
        var inter = document.activeElement.getAttribute("interactiveinput");
        if (inter !== null) {
            $U.addTextToInput(document.activeElement, obj.getName(), inter);
            return;
        };
        if ((obj.getCode() === "blockly_button") && (obj.insideButton(ev))) {
            obj.run();
            me.textManager.refreshInputs();
            return;
        };
        if (me.namesManager.replaceName(obj)) return;
        if (me.blocklyManager.tryEdit(obj)) return;
        switch (Cn.getMode()) {
            case 0:
                // Outil de consultation :
                break;
            case 1:
                // Outil curseur-création :
                toolsManager.showTools(ev);
                break;
            case 2:
                // Outil gomme :
                if (!obj.isSuperHidden()) {
                    obj.setHidden(!obj.isHidden());
                    obj.setSelected(false);
                    obj.setIndicated(false);
                    me.paint(ev);
                }
                break;
            case 3:
                // Outil poubelle :
                if (!obj.isHidden()) {
                    me.undoManager.deleteObjs(Cn.safelyDelete(obj));
                    me.refreshKeyboard();
                    me.paint(ev);
                }
                break;
            case 4:
                // Outil construction de macro :
                if (!obj.isHidden()) {
                    Cn.macroConstructionTag(obj);
                    me.paint(ev);
                }
                break;
            case 5:
                // Outil execution de macro :
                if (!obj.isHidden()) {
                    Cn.macroExecutionTag(obj);
                    me.paint(ev);
                }
                break;
            case 6:
                // Outil propriétés des objets :
                me.propertiesManager.edit(obj);
                me.paint(ev);
                break;
            case 8:
                // Outil propriétés des objets :
                me.calcManager.edit(obj);
                me.paint(ev);
                break;
            case 9:
                // Outil magnétisme :
                me.magnetManager.add(obj);
                me.paint(ev);
                break;
            case 10:
                // Outil TEX :
                me.textManager.addName(obj.getName());
                me.paint(ev);
                break;
            case 11:
                // Outil depends :
                me.dependsManager.add(obj);
                me.paint(ev);
                break;
        }
    };

    me.setObjectConstructor = function(_oc) {
        OC = _oc;
    };
    me.isObjectConstructor = function(_oc) {
        return (OC === _oc);
    };
    me.setPointConstructor = function() {
        OC = PC;
    };
    me.getPointConstructor = function() {
        return PC;
    };
    me.isToolVisible = function() {
        return toolsManager.isVisible();
    };

    me.setBackground = function(bk) {
        me.prefs.background.color = bk;
        docObject.style.setProperty("background-color", bk);
    };
    me.getBackground = function() {
        return (me.prefs.background.color);
    };

    var clearBackFirefox = function() {
        docObject.width = docObject.width;
        //        context.clearRect(0, 0, width, height);
    };

    var clearBackOther = function() {
        //        docObject.width = docObject.width;
        context.clearRect(0, 0, width, height);
    };

    me.clearBackground = ($U.isBrowser.firefox()) ? clearBackFirefox : clearBackOther;
    //    me.clearBackground = clearBackOther;

    me.showCS = function(_v) {
        Cn.coordsSystem.showCS(_v);
        me.paint();
    };

    me.isCS = function() {
        return Cn.coordsSystem.isCS();
    };

    var draggedObject = null;

    var moveableSortFilter = function(a, b) {
        var ap = a.isInstanceType("area");
        var bp = b.isInstanceType("area");
        if (ap)
            return 1;
        else if (bp)
            return -1;
        else
            return 1;
    };

    // Trie les indicateds pour éviter la prédominance des
    // polygone lorsqu'on clique :
    var cleanInds = function() {
        var inds = Cn.getIndicated();
        // On trie en laissant les polygones en fin de liste :
        inds.sort(moveableSortFilter);
        // Si le premier indiqué n'est pas un polygone et que
        // le dernier indiqué en est un, on vire tous les polygones :
        if ((inds.length > 1) && (inds[0].getCode() !== "area") && (inds[inds.length - 1].getCode() === "area")) {
            while (inds[inds.length - 1].getCode() === "area") {
                inds[inds.length - 1].setIndicated(false);
                inds.splice(inds.length - 1, 1);
            }
        }
    }

    me.selectMoveable = function(ev) {
        cleanInds();
        var inds = Cn.getIndicated();
        var len = inds.length;
        for (var i = 0; i < len; i++) {
            if ((inds[i].isMoveable()) && (inds[i].getCode() === "point") && (inds[i].getParentLength() === 1)) {
                var obj = inds[i];
                //                Cn.clearIndicated();
                //                obj.setIndicated(true);
                //                Cn.addIndicated(obj);
                obj.startDrag(me.mouseX(ev), me.mouseY(ev));
                return obj;
            }
        }
        for (var i = 0; i < len; i++) {
            if (inds[i].isMoveable()) {
                inds[i].startDrag(me.mouseX(ev), me.mouseY(ev));
                return inds[i];
            }
        }
        if (len > 0) {
            inds[0].startDrag(me.mouseX(ev), me.mouseY(ev));
            return inds[0];
        }
        return null;
    };


    var pressedFilter = null;
    var movedFilter = null;
    var releasedFilter = null;

    me.setPressedFilter = function(_func) {
        pressedFilter = _func;
    };
    me.setMovedFilter = function(_func) {
        movedFilter = _func;
    };
    me.setReleasedFilter = function(_func) {
        releasedFilter = _func;
    };
    me.clearFilters = function() {
        pressedFilter = null;
        movedFilter = null;
        releasedFilter = null;
    };

    var actualCoords = {
        x: NaN,
        y: NaN
    };
    var dragCoords = null;
    var pressedCoords = null;
    var isClick = function(ev) {
        var x0 = me.mouseX(ev);
        var y0 = me.mouseY(ev);
        var prec2 = me.prefs.precision.caress;
        prec2 *= prec2;
        return ((pressedCoords) && ($U.getTime() - pressedCoords.t) < 800) && (((pressedCoords.x - x0) * (pressedCoords.x - x0) + (pressedCoords.y - y0) * (pressedCoords.y - y0)) < prec2);
    };

    var longPressTimeout = 0;
    var longPress = function(ev) {
        me.longpressManager.show(ev);
    };

    // Mouse Events :
    me.mousePressed = function(ev) {
        // console.log("mousePressed");
        ev.preventDefault();
        if (pressedFilter) {
            pressedFilter(ev);
            return;
        }
        if (me.longpressManager.isVisible()) return;
        if (me.coincidenceManager.isVisible()) return;
        // if (me.blocklyManager.isSettingsVisible()) return;
        me.setNoMouseEvent(false);
        draggedObject = null;
        dragCoords = null;
        actualCoords.x = me.mouseX(ev);
        actualCoords.y = me.mouseY(ev);
        //        $ALERT("x="+actualCoords.x+" y="+actualCoords.y);
        pressedCoords = {
            x: actualCoords.x,
            y: actualCoords.y,
            t: $U.getTime()
        };

        //        actualCoords

        // Si on a cliqué à côté des outils :
        if (toolsManager.isVisible()) {
            closeTools();
            Cn.validate(ev);
            me.paint(ev);
            // Fait en sorte que le mousereleased ne crée pas un point :
            pressedCoords = {
                x: NaN,
                y: NaN
            };
            return;
        }
        // S'il s'agit d'un click droit :
        if (ev.which === 2 || ev.which === 3) {
            dragCoords = {
                x: actualCoords.x,
                y: actualCoords.y
            };
            return;
        }
        mousedown = true;
        Cn.validate(ev);

        draggedObject = me.selectMoveable(ev);

        if (draggedObject === null && Cn.getMode() === 1) {
            // Si on a tapé/cliqué "dans le vide" et qu'aucun objet
            // n'est sous le doigt/souris (pour le longpress menu) :
            longPressTimeout = setTimeout(function() {
                longPress(ev);
            }, 500);
        }
        if (draggedObject === null && Cn.getMode() === 0) {
            // Si on a tapé/cliqué "dans le vide" et qu'aucun objet
            // n'est sous le doigt/souris (pour le translate en mode présentation) :

            dragCoords = {
                x: actualCoords.x,
                y: actualCoords.y
            };
            return;
        }
        if (draggedObject) draggedObject.blocks.evaluate("onmousedown"); // blockly
        me.paint(ev);
    };

    me.translate = function(x, y) {
        Cn.translate(x, y);
        Cn.computeAll();
        // me.blocklyManager.computeTurtle();
        me.paint();
    }

    me.mouseMoved = function(ev) {
        // console.log("mouseMoved");
        ev.preventDefault();
        clearTimeout(longPressTimeout);
        actualCoords.x = me.mouseX(ev);
        actualCoords.y = me.mouseY(ev);
        if (dragCoords) {
            // S'il s'agit d'un click droit glissé :
            me.translate(actualCoords.x - dragCoords.x, actualCoords.y - dragCoords.y);
            dragCoords.x = actualCoords.x;
            dragCoords.y = actualCoords.y;
            return;
        }
        if (movedFilter) {
            movedFilter(ev);
            return;
        }
        if (mousedown) {
            if (draggedObject) {
                if (!isClick(ev))
                    pressedCoords = {
                        x: NaN,
                        y: NaN,
                        t: 0
                    };
                draggedObject.dragTo(actualCoords.x, actualCoords.y);
                me.textManager.evaluateStrings();
                draggedObject.blocks.evaluate("ondrag"); // blockly
                actualCoords.x = NaN;
                actualCoords.y = NaN;
            } else {
                Cn.validate(ev);
            }
        } else {
            Cn.validate(ev);
        }
        // If a tool is selected :
        OC.selectInitialObjects(me);
        me.paint(ev, actualCoords);
    };

    var noMouseEvent = false;
    me.setNoMouseEvent = function(_b) {
        noMouseEvent = _b;
    }


    me.mouseReleased = function(ev) {
        // console.log("mouseReleased");
        ev.preventDefault();
        clearTimeout(longPressTimeout);
        actualCoords.x = NaN;
        actualCoords.y = NaN;

        if (releasedFilter) {
            releasedFilter(ev);
            return;
        }




        if (noMouseEvent) {
            dragCoords = null;
            mousedown = false;
            draggedObject = null;
            noMouseEvent = false;
            return
        }

        dragCoords = null;
        mousedown = false;


        if (draggedObject) {
            if (isClick(ev)) {
                // Si on a cliqué sur l'objet :
                if ((!me.coincidenceManager.checkCoincidences(ev))) {
                    // Et s'il n'y a pas ambiguité, on lance les outils
                    // contextuels :
                    if (Cn.getIndicated().length > 1) {
                        Cn.addSelected(Cn.getIndicated()[0]);
                        Cn.addSelected(Cn.getIndicated()[1]);
                    } else {
                        Cn.addSelected(draggedObject);
                    }
                    me.paint(ev);
                    me.initTools(ev, draggedObject);
                }
            } else {
                draggedObject.blocks.evaluate("onmouseup"); // blockly
            }
            //            me.textManager.evaluateStrings(true);
            draggedObject = null;
        } else {
            Cn.validate(ev);
            cleanInds();
            var sels = Cn.getIndicated();

            if (isClick(ev)) {
                if (sels.length === 0) {
                    if (Cn.isMode(1, 5, 7, 8)) {
                        // On est dans le mode arrow, tracé ou execution de macro :
                        // On a cliqué dans le vide, on crée un point à la volée :
                        OC.selectCreatePoint(me, ev);
                        var o = OC.createObj(me, ev);
                        Cn.validate(ev);
                        Cn.clearSelected();
                        if (Cn.isMode(5)) {
                            me.macrosManager.refreshMacro();
                            Cn.macroExecutionTag(o);
                        }
                        me.paint(ev);
                    }
                } else {
                    // Si on a cliqué sur un objet :
                    if ((!me.coincidenceManager.checkCoincidences(ev))) {
                        // Et s'il n'y a pas ambiguité, on lance les outils
                        // contextuels :
                        Cn.addSelected(sels[0]);
                        if (sels.length > 1)
                            Cn.addSelected(sels[1]);

                        //                        Cn.addSelected(sels[0]);
                        me.paint(ev);
                        me.initTools(ev, sels[0]);
                    }
                }

            } else {
                // Sinon, il s'agit d'une caresse :
                if (sels.length > 0) {
                    // On a caressé un objet (point sur) ou deux objets (intersection)
                    // On crée un point à la volée (dans le mode arrow, tracé ou execution de macro) :
                    if (Cn.isMode(1, 5, 7, 8)) {
                        OC.setInitialObjects(sels);
                        OC.selectCreatePoint(me, ev);
                        var o = OC.createObj(me, ev);
                        OC.setInitialObjects([]);
                        Cn.validate(ev);
                        Cn.clearSelected();
                        if (Cn.isMode(5)) {
                            me.macrosManager.refreshMacro();
                            Cn.macroExecutionTag(o);
                        }
                        me.paint(ev);
                    } else if (Cn.isMode(2, 3, 4, 6, 9)) {
                        me.initTools(ev, sels[0]);
                    }
                }
            }
        }
        if (!toolsManager.isVisible()) {
            Cn.clearIndicated();
            Cn.clearSelected();
            me.clearBackground();
            Cn.paint(context);
        }
    };

    me.mouseClicked = function(ev) {};


    me.mouseWheel = function(ev) {
        ev.preventDefault();
        var zoom = 1 + $U.extractDelta(ev) / 2000;
        Cn.zoom(me.mouseX(ev), me.mouseY(ev), zoom);
        Cn.validate(ev);
        Cn.computeAll();
        me.paint(ev);
    };

    var zoomGesture = null;

    // Lorsque le navigateur mobile ne connaît pas les évenements "gesture"
    var touchToMouse = function(_tch, _proc) {
        _tch.preventDefault();
        if (_tch.touches.length < 2) {
            if (zoomGesture) {
                // On vient probablement de passer de 2 doigts à 1 doigt :
                zoomGesture = null;
                pressedCoords = {
                    x: NaN,
                    y: NaN
                };
            } else {
                // Il s'agit d'un mono-doigt :
                _proc($U.PadToMouseEvent(_tch.changedTouches[0]));
            }
        } else {
            clearTimeout(longPressTimeout);
            var t0 = _tch.touches[0];
            var t1 = _tch.touches[1];
            var x0 = me.mouseX(t0),
                y0 = me.mouseY(t0);
            var x1 = me.mouseX(t1),
                y1 = me.mouseY(t1);
            var x = (x0 + x1) / 2;
            var y = (y0 + y1) / 2;
            var dis = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
            if (zoomGesture) {
                Cn.translateANDzoom(x - zoomGesture.x, y - zoomGesture.y, x, y, dis / zoomGesture.d);
                zoomGesture.x = x;
                zoomGesture.y = y;
                zoomGesture.d = dis;
                Cn.computeAll();
                me.paint();

            } else {
                zoomGesture = {
                    x: x,
                    y: y,
                    d: dis
                };
                pressedCoords = {
                    x: NaN,
                    y: NaN
                };
            }
        }
        // Une nuit de boulot avant de comprendre qu'il faut décommenter 
        // cette ligne pour que le mode demo fonctionne sur tablette :
        //        _tch.stopPropagation();
    };

    // TouchEvents :
    me.touchStart = function(tch) {

        touchToMouse(tch, me.mousePressed);
    };

    me.touchMoved = function(tch) {
        touchToMouse(tch, me.mouseMoved);
    };

    me.touchEnd = function(tch) {
        touchToMouse(tch, me.mouseReleased);
        zoomGesture = null;
    };



    //    me.gestureStart = function(tch) {
    //        tch.preventDefault();
    //        zoomGesture = {x: me.mouseX(tch), y: me.mouseY(tch), d: 1};
    //    };
    //
    //    me.gestureChanged = function(tch) {
    //        tch.preventDefault();
    //        var zoom = 1 + (tch.scale - zoomGesture.d);
    //        zoomGesture.d = tch.scale;
    //        Cn.translate(me.mouseX(tch) - zoomGesture.x, me.mouseY(tch) - zoomGesture.y);
    //        zoomGesture.x = me.mouseX(tch);
    //        zoomGesture.y = me.mouseY(tch);
    //        Cn.zoom(me.mouseX(tch), me.mouseY(tch), zoom);
    //        Cn.computeAll();
    //        me.paint(tch);
    //    };
    //
    //    me.gestureEnd = function(tch) {
    //        zoomGesture = null;
    //        pressedCoords = {x: NaN, y: NaN};
    //        draggedObject = null;
    //    };

    me.dragOver = function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = 'copy';
        return false;
    };

    me.drop = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var f = ev.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            me.OpenFile("", e.target.result);
        };
        reader.readAsText(f);
    };

    // only for computers :
    me.keydown = function(ev) {
        // $ALERT("yes");

        if (me.getMode() === 1) {
            if (ev.metaKey)
                return;
            var key = ev.keyCode || ev.charCode;
            var pt = Cn.getLastPoint();
            var d = new Date();
            var key = ev.keyCode || ev.charCode;
            switch (key) {
                case 8: //DEL
                    if ((pt) && (pt.getShowName()) && (d.getTime() - pt.getTimeStamp() < $P.precision.edit_timeout)) {
                        pt.setName(pt.getName().slice(0, -1));
                        pt.refreshChildsNames();
                        me.paint();
                    }
                    break;
                case 91: //COMMAND (apple)
                    return false;
                default:
                    return true;
            }
            ev.preventDefault();
            return false;
        }
    }

    // only for computers :
    me.keypress = function(ev) {

        if (me.getMode() === 1) {
            if (ev.metaKey)
                return;
            ev.preventDefault();
            var key = ev.keyCode || ev.charCode;
            var pt = Cn.getLastPoint();
            var d = new Date();
            if ((pt) && (d.getTime() - pt.getTimeStamp() < $P.precision.edit_timeout)) {
                var car = String.fromCharCode(key);
                var nme = (pt.getShowName()) ? pt.getName() + car : car;
                pt.setName(nme);
                pt.setShowName(true);
                pt.refreshChildsNames();
                me.paint();
            }
        }
    };



    var previewEvent = null;

    // Only for animations :
    me.paintAnim = function() {
        context.globalAlpha = 1;
        me.clearBackground();
        if (OC && (OC.getC(0)) && previewEvent) {
            OC.preview(previewEvent, me);
        }
        handPath.paint(context);
        Cn.paint(context);
        me.trackManager.draw();
    }

    me.paint = function(ev, coords) {
        context.globalAlpha = 1;
        me.clearBackground();
        if (OC && (OC.getC(0))) {
            previewEvent = ev;
            OC.preview(ev, me);
        } else previewEvent = null;
        handPath.paint(context);
        Cn.paint(context, coords);
        me.trackManager.draw();
    };



    me.addObject = function(o) {
        me.undoManager.record(o, true);
        o.newTimeStamp();
        Cn.add(o);
    };


    var interpreter = null;
    //    me.sandboxFrame=null;
    /* Les variables globales sont en fait des propriétés
     de l'objet window. Interpréter un script utilisateur risque
     d'ajouter des globales susceptibles de mettre la 
     pagaille dans l'objet window dans lesquel s'execute
     DGPad. Pour éviter cela, on execute les scripts (lecture
     de fichier aussi) dans un bac à sable : une iframe invisible.
     */
    var createSandbox = function() {
        var el = document.createElement("iframe");
        el.setAttribute('name', ID);
        el.setAttribute('width', 0);
        el.setAttribute('height', 0);
        el.setAttribute('style', 'hidden');
        el.setAttribute('frameborder', 0);
        el.setAttribute('marginheight', 0);
        el.setAttribute('marginwidth', 0);
        el.setAttribute('scrolling', 'no');
        // Trouver éventuellement un paramètre de langue dans le script du body :
        var lang = ($BODY_SCRIPT.hasAttribute("data-lang")) ? "?lang=" + $BODY_SCRIPT.getAttribute("data-lang").toUpperCase() : "";

        el.setAttribute('src', $APP_PATH + 'NotPacked/Sandbox/sandbox.html' + lang);
        document.body.appendChild(el);
        el.onload = function() {
            interpreter = new window.frames[ID].Interpreter(window, me);
            interpreter.owner = el.contentWindow;
            interpreter.copyNameSpace();
            interpreter.setCaller(me.blocklyManager); // For print purpose

            var request = new XMLHttpRequest();
            request.open("GET", $APP_PATH + "NotPacked/plug-ins.js", true);
            request.send();
            request.onload = function(e) {
                interpreter.LoadPlugins(request.responseText);
                if (docObject.hasAttribute("data-source")) {
                    // Si le canvas a une figure attachée (base64) :
                    me.OpenFile("", $U.base64_decode(docObject.getAttribute("data-source")));
                } else if (docObject.hasAttribute("data-url")) {
                    // Si le canvas a une adresse de figure (relative au .html) :
                    var fileurlrequest = new XMLHttpRequest();
                    fileurlrequest.open("GET", docObject.getAttribute("data-url"), true);
                    fileurlrequest.send();
                    fileurlrequest.onload = function(e) {
                        me.OpenFile("", fileurlrequest.responseText);
                    }
                } else {
                    // Si une figure a été postée sur index.php, on l'ouvre :
                    try {
                        me.OpenFile("", $U.base64_decode($DGPAD_FIGURE));
                    } catch (e) {}
                }

            }


            //            // Chargement des plug-ins :
            //            interpreter.LoadPlugins($U.loadFile($APP_PATH + "NotPacked/plug-ins.js"));
            //
            //            // Si le canvas a une figure attachée (base64) :
            //            if (docObject.hasAttribute("data-source")) {
            //                me.OpenFile("", $U.base64_decode(docObject.getAttribute("data-source")));
            //            } else {
            //                // Si une figure a été postée sur index.php, on l'ouvre :
            //                try {
            //                    me.OpenFile("", $U.base64_decode($DGPAD_FIGURE));
            //                } catch (e) {
            //                }
            //            }


        };
        //        me.sandboxFrame=el;
    }();

    //var createSandbox = function() {
    //        var el = document.createElement("iframe");
    //        el.setAttribute('name', ID);
    ////        el.setAttribute('width', 100);
    ////        el.setAttribute('height', 100);
    //        el.style.setProperty("position", "absolute");
    //        el.style.setProperty("left", "0px");
    //        el.style.setProperty("top", "0px");
    //        el.style.setProperty("width", "0px");
    //        el.style.setProperty("height", "0px");
    ////        el.setAttribute('style', 'hidden');
    //        el.setAttribute('frameborder', 0);
    //        el.setAttribute('marginheight', 0);
    //        el.setAttribute('marginwidth', 0);
    //        el.setAttribute('scrolling', 'no');
    //        // Trouver éventuellement un paramètre de langue dans le script du body :
    //        var lang = ($BODY_SCRIPT.hasAttribute("data-lang")) ? "?lang=" + $BODY_SCRIPT.getAttribute("data-lang").toUpperCase() : "";
    //        el.setAttribute('src', $APP_PATH + 'NotPacked/Sandbox/sandbox.html' + lang);
    //        document.body.appendChild(el);
    //        el.onload = function() {
    //            interpreter = new window.frames[ID].Interpreter(window, me);
    //            interpreter.owner = el.contentWindow;
    //            interpreter.copyNameSpace();
    //            // Chargement des plug-ins :
    //            interpreter.LoadPlugins($U.loadFile($APP_PATH + "NotPacked/plug-ins.js"));
    //
    //            // Si le canvas a une figure attachée (base64) :
    //            if (docObject.hasAttribute("data-source")) {
    //                me.OpenFile("", $U.base64_decode(docObject.getAttribute("data-source")));
    //            } else {
    //                // Si une figure a été postée sur index.php, on l'ouvre :
    //                try {
    //                    me.OpenFile("", $U.base64_decode($DGPAD_FIGURE));
    //                } catch (e) {
    //                }
    //            }
    //
    //
    //        };
    ////        me.sandboxFrame=el;
    //    }();
    // Intepréteur de scripts lancé par un bouton :
    me.InterpretScript = function(_o, s) {
        interpreter.setCaller(_o);
        interpreter.Interpret(s);
    };
    me.Interpret = function(s) {
        interpreter.Interpret(s);
    };
    me.getExpression = function(s) {
        return new Expression(me, s);
    };
    me.InterpretExpression = function(s) {
        var ex = new Expression(me, s);
        return ex.value();
    };
    me.InterpretMacro = function(s) {
        interpreter.InterpretMacro(s);
    };
    me.getInterpreter = function() {
        return interpreter;
    };
    me.getCn = function() {
        return Cn;
    };



    me.OpenFile = function(_fname, _src) {
        // Pour assurer la compatibilité avec les anciennes figures
        // on se met en radians (old style). Si une figure est en degrés
        // elle s'ouvrira en mode degré.
        if (_src === "") Cn.setDEG(true)
        else Cn.setDEG(false);
        iPadDidFirstEnterBackground = true;
        Cn.deleteAll();
        me.macrosManager.clearTools();
        me.textManager.clear();
        me.trackManager.clear();
        interpreter.Interpret(_src);
        // Mode construction si la figure est vide,
        // mode consultation sinon (sauf si demandé par l'url) :
        var md = (_src === "") ? 1 : 0;
        if (docObject.hasAttribute("data-tools")) {
            md = (docObject.getAttribute("data-tools") === "true") ? 1 : 0
        };
        me.setMode(md);
        me.undoManager.clear();
        Cn.clearIndicated();
        Cn.clearSelected();
        Cn.initAll();
        Cn.computeAll();
        me.textManager.refreshInputs();
        me.paint();
    };

    // Uniquement pour l'iApp DGPad s'executant en local
    // dans iOS (ouverture des fichiers par "ouvrir dans..."
    // à partir d'autres applications) :
    window.$IPADOPENFILE = function(_s) {
        setTimeout(function() {
            me.OpenFile("", $U.base64_decode(_s));
        }, 1);
        return "file_opened";
    };

    me.getStyle = function() {
        var t = "SetGeneralStyle(\"";
        t += "background-color:" + me.getBackground();
        if (Cn.isDEG()) t += ";degree:true";
        else t += ";degree:false";
        t += ";dragmoveable:" + Cn.isDragOnlyMoveable();
        // if (Cn.isDragOnlyMoveable()) t += ";dragmoveable:true";
        t += "\");\n";
        return t;
    };

}
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

    me.getTurtleExpression = function(_startpt) {
        var name = "blk_turtle_exp_" + _startpt;
        var o = me.find(name);
        return o;
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

    me.fixNames = function(_old, _new) {
        // console.log("******** fixNames ************");

        if (_old != _new) {
            // console.log("old=" + _old + "  new=" + _new);
            var o = me.findVar(_new);
            if ((o) && (!o.blocks.isEmpty())) {
                var old_exp = me.find("blk_turtle_exp_" + _old);
                var old_lst = me.find("blk_turtle_list_" + _old);
                // console.log("old=" + _old + "  new=" + _new);
                // console.log("old_exp=" + old_exp + "  old_lst=" + old_lst);
                if ((old_exp) && (old_lst)) {
                    old_exp.setNameOnly("blk_turtle_exp_" + _new);
                    old_lst.setNameOnly("blk_turtle_list_" + _new);
                }
            }
            for (var i = 0, len = V.length; i < len; i++) {
                V[i].blocks.rename(_old, _new)
            }
        }
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

    me.initAll=function(){
        for (var i = 0, len = V.length; i < len; i++) {
            if (V[i].blocks) V[i].blocks.evaluate("oninit");
        }
    }

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
                    if (me.is3D()) {
                        me.computeAll()
                    }
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
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function GUIElement(_owner, _type) {
    var me = this;
    var left, top, width, height;
    me.owner = _owner;
    var docObject = document.createElement(_type);
    me.childNodes = docObject.childNodes;
    me.parentNode = docObject.parentNode;
    me.appendChild = docObject.appendChild;

    me.getDocObject = function() {
        return docObject;
    };

    me.setBounds = function(l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        docObject.style.left = l + "px";
        docObject.style.top = t + "px";
        docObject.style.width = w + "px";
        docObject.style.height = h + "px";
    };

    me.getBounds = function() {
        return {
            "left": left,
            "top": top,
            "width": width,
            "height": height
        };
    };

    me.getOwnerBounds = function() {
        var t = me.owner.offsetTop || 0;
        var l = me.owner.offsetLeft || 0;
        var w = me.owner.offsetWidth || 0;
        var h = me.owner.offsetHeight || 0;
        return {
            "left": l,
            "top": t,
            "width": w,
            "height": h
        };
    };



    me.getStyle = function(_attr) {
        return docObject.style.getPropertyValue(_attr);
    };

    me.setStyle = function(_attr, _param) {
        docObject.style.setProperty(_attr, _param);
    };

    me.setStyles = function(_st) {
        var t = _st.split(";");
        for (var i = 0, len = t.length; i < len; i++) {
            // Si l'argument du style contient des ":"
            // il ne faut pas qu'il soit tronqué par
            // le split :
            var a = t[i].split(":");
            var pty = a[0];
            a.shift();
            var arg = a.join(":");
            me.setStyle(pty.replace(/^\s+|\s+$/g, ''), arg.replace(/^\s+|\s+$/g, ''));
        }
    }

    me.getAttr = function(_attr) {
        return docObject[_attr];
    };

    me.setAttr = function(_attr, _param) {
        docObject[_attr] = _param;
    };


    me.hide = function() {
        me.setStyle("visibility", "hidden");
    };

    me.show = function() {
        me.setStyle("visibility", "visible");
    };

    me.isVisible = function() {
        return (me.getStyle("visibility") === "visible");
    };

    me.isReallyVisible = function() {
        return (me.getStyle("visibility") !== "hidden");
    };

    me.setLayer = function(_l) {
        me.setStyle("z-index", _l);
    };

    me.clearContent = function() {
        while (docObject.childNodes.length !== 0) {
            docObject.removeChild(docObject.childNodes[0]);
        }
    };

    me.hasContent = function(elt) {
        //        console.log(elt.getDocObject().parentNode===docObject);
        return ((elt) && (elt.getDocObject) && (elt.getDocObject().parentNode === docObject));
    };

    me.addContent = function(elt) {
        docObject.appendChild(elt.getDocObject());
    };

    me.removeContent = function(elt) {
        try {
            docObject.removeChild(elt.getDocObject());
        } catch (e) {

        }
    };

    me.setAbsolute = function() {
        docObject.style.position = "absolute";
        docObject.style.margin = "0px";
        docObject.style.padding = "0px";
    };


    me.setPosition = function(_mode) {
        docObject.style.position = _mode;
    };

    me.setColor = function(_col) {
        docObject.style.backgroundColor = _col;
    };

    me.addImage = function(_src) {
        //        var img = document.createElement("img");
        var img = new Image();
        img.style.position = "absolute";
        img.src = _src;
        img.style.left = "0px";
        img.style.top = "0px";
        img.style.width = "100%";
        img.style.height = "100%";
        docObject.appendChild(img);
    };

    me.setBackgroundImage = function(_src) {
        me.setStyle("background-image", _src);
        me.setStyle("background-size", "100%");
        me.setStyle("background-repeat", "no-repeat");
    };

    //    me.addImage = function(_src, l, t, w, h) {
    //        var imgObject = document.createElement("img");
    ////        imgObject.src = _src + "?nocache=" + Date.now();
    //        imgObject.src = _src;
    //        imgObject.style.left = l + "px";
    //        imgObject.style.top = t + "px";
    //        imgObject.style.width = w + "px";
    //        imgObject.style.height = h + "px";
    //        docObject.appendChild(imgObject);
    //    };


    var touchNumber = 0;
    me.setTouchNumber = function(_i) {
        touchNumber = _i;
    };
    var preventDefault = true;
    me.setPreventDefault = function(_bool) {
        preventDefault = _bool;
    };

    var PadToMouseEvent = function(_touch) {
        var ev = document.createEvent("MouseEvent"); 
        ev.initMouseEvent("mouseup", true, true, window, 1,
            _touch.screenX, _touch.screenY,
            _touch.clientX, _touch.clientY, false,
            false, false, false, 0, null);
        return ev;
    };

    var exe = function(_p) {
        if (preventDefault) {
            _p.MouseEvent_Function = function(ev) {
                ev.preventDefault();
                _p(ev);
            };
        } else {
            _p.MouseEvent_Function = function(ev) {
                _p(ev);
            };
        }
        return _p.MouseEvent_Function;
    };

    var exeTCH = function(_p) {
        if (preventDefault) {
            _p.TouchEvent_Function = function(tch) {
                tch.preventDefault();
                var touch = tch.touches[touchNumber] || tch.changedTouches[touchNumber];
                _p(touch);
            };
        } else {
            _p.TouchEvent_Function = function(tch) {
                var touch = tch.touches[touchNumber] || tch.changedTouches[touchNumber];
                _p(touch);
            };
        }
        return _p.TouchEvent_Function;
    };





    me.touch = function(tch, _procMouse) {
        tch.preventDefault();
        var touch = tch.touches[0] || tch.changedTouches[0];
        _procMouse(PadToMouseEvent(touch));
    };

    me.addDblClickEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('dblclick', exe(_proc), false);
    };

    me.addClickEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchstart', exeTCH(_proc), false);
        obj.addEventListener('click', exe(_proc), false);
    };

    me.addDownEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchstart', exeTCH(_proc), false);
        if (!$U.isMobile.android() && !$U.isMobile.ios())
            obj.addEventListener('mousedown', exe(_proc), false);
    };

    me.addMoveEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchmove', exeTCH(_proc), false);
        if (!$U.isMobile.android() && !$U.isMobile.ios())
            obj.addEventListener('mousemove', exe(_proc), false);
    };

    me.addUpEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.addEventListener('touchend', exeTCH(_proc), false);
        if (!$U.isMobile.android() && !$U.isMobile.ios())
            obj.addEventListener('mouseup', exe(_proc), false);

    };

    me.removeDownEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchstart', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mousedown', _proc.MouseEvent_Function, false);
    };

    me.removeMoveEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchmove', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mousemove', _proc.MouseEvent_Function, false);
    };

    me.removeUpEvent = function(_proc, _to) {
        if (!_proc)
            return;
        var obj = (arguments.length < 2) ? docObject : _to;
        obj.removeEventListener('touchend', _proc.TouchEvent_Function, false);
        obj.removeEventListener('mouseup', _proc.MouseEvent_Function, false);
    };


};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function DlogContent(_owner) {
    var me = this;
    var owner = _owner;
    var docObject = document.createElement("div");
    docObject.style.position = "absolute";
    docObject.style.left = "0px";
    docObject.style.top = owner.getTitleBarHeight() + "px";
    docObject.style.margin = "0px";
    docObject.style.padding = "0px";
    docObject.style.width = owner.getBounds().width + "px";
    var h = owner.getBounds().height - owner.getTitleBarHeight();
    docObject.style.height = h + "px";
    //    docObject.style.backgroundColor="rgba(200,200,200,0.5)";

    me.getDocObject = function() {
        return docObject;
    }

};
function CloseBox(_owner, _proc) {
    var me = this;
    $U.extend(this, new GUIElement(_owner, "img"));
    me.setAbsolute();
    me.setStyle("margin", "0px");
    me.setStyle("padding", "0px");
    me.setAttr("src", $APP_PATH + "NotPacked/images/dialog/closebox.svg");
    me.setBounds(_owner.getBounds().width - 15, -15, 30, 30);
    me.addDownEvent(_proc);
    _owner.addContent(me);
}
function ImageBox(_owner, _src, _w, _h, _proc) {
    var me = this;
    $U.extend(this, new GUIElement(_owner, "img"));
    me.setAbsolute();
    me.setStyle("margin", "0px");
    me.setStyle("padding", "0px");
    me.setAttr("src", _src);
    me.setBounds(0, 0, _w, _h);
    me.addUpEvent(_proc);
    _owner.addContent(me);
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function SimpleDialog(_owner, _l, _t, _w, _h) {
    var me = this;
    var owner = _owner;
    var l = _l + owner.getBounds().left,
        t = _t + owner.getBounds().top,
        w = _w,
        h = _h;
    me.getBounds = function() {
        return {
            "left": l,
            "top": t,
            "width": w,
            "height": h
        };
    };
    //    var closeBoxSize=Object.touchpad?30:20;
    //    var closeBoxMargin=5;
    me.getTitleBarHeight = function() {
        return 0;
    };
    me.getCloseBoxBounds = function() {
        //        var cl=w-closeBoxSize-closeBoxMargin;
        //        var ct=(tbarHeight-closeBoxSize)/2;
        //        return {
        //            "left":cl,
        //            "top":ct,
        //            "width":closeBoxSize,
        //            "height":closeBoxSize
        //        };
    };

    var browser = $U.browserCode();

    var docObject = document.createElement("div");
    //    docObject.style.backgroundColor="#FFFFFF";
    docObject.style.backgroundColor = "rgba(230,230,230,0.9)";
    //    docObject.style.background=browser+"-linear-gradient(top, #9c9ba6, #57575f)";
    //    docObject.style.backgroundSize = "100%";
    //    docObject.style.backgroundRepeat="no-repeat";
    docObject.style.position = "absolute";
    docObject.style.border = "1px solid #b4b4b4";
    docObject.style.margin = "0px";
    docObject.style.padding = "0px";
    docObject.style.width = w + "px";
    docObject.style.height = h + "px";
    docObject.style.left = l + "px";
    docObject.style.top = (t - h) + "px";


    var content = new DlogContent(me);
    docObject.appendChild(content.getDocObject());
    owner.getDocObject().parentNode.appendChild(docObject);


    docObject.style.setProperty("-webkit-transition", "-webkit-transform 0.2s linear");
    docObject.style.setProperty("-moz-transition", "-moz-transform 0.2s linear");
    docObject.style.setProperty("-webkit-transform", "translateY(0)");
    docObject.style.setProperty("-moz-transform", "translateY(0)");
    setTimeout(function() {
        docObject.style.setProperty("-webkit-transform", "translate3d(0," + h + "px, 0)");
        docObject.style.setProperty("-moz-transform", "translate3d(0," + h + "px, 0)");
    }, 1);

    me.getDocObject = function() {
        return docObject;
    };

    me.drag = function(dx, dy) {
        l += dx;
        t += dy;
        docObject.style.left = l + "px";
        docObject.style.top = t + "px";
    };

    me.callBackClose = function() {};

    me.close = function() {
        setTimeout(function() {
            docObject.style.setProperty("-webkit-transform", "translate3d(0,-" + h + "px, 0)");
            docObject.style.setProperty("-moz-transform", "translate3d(0,-" + h + "px, 0)");
        }, 20);
        setTimeout(function() {
            owner.getDocObject().parentNode.removeChild(docObject);
            docObject = null;
            me.callBackClose();
        }, 300);

    };

    me.addContent = function(elt) {
        content.getDocObject().appendChild(elt.getDocObject());
    };


};
function BtnGroup() {
    var V = [];

    this.add = function(btn) {
        V.push(btn);
    };
    this.deselect = function() {
        var len = V.length;
        for (var i = 0; i < len; i++) {
            V[i].deselect();
        }
    };

};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function InputText(_owner) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    var docObject = me.getDocObject();

    me.setStyles("position:relative;background-color:whitesmoke;border-radius:12px");
    var valid = function() {
        var N = name.getDocObject();
        N.blur();
        me.valid_callback(name.getAttr("value"));
    };

    this.valid_callback = function(_t) {};
    this.keyup_callback = function(_t) {};
    this.focus_callback = function() {};


    var form = new GUIElement(me, "form");
    form.setAttr("action", "javascript:void(0);");
    form.getDocObject().onsubmit = valid;

    var name = new GUIElement(me, "input");
    name.setAttr("type", "text");
    name.setStyles("position:absolute;background-color:whitesmoke;border:0px;font-family:Helvetica, Arial, sans-serif;font-size:16px;text-align:center;vertical-align:middle;outline-width:0px;border-radius:0px;padding:0px");
    var inp = name.getDocObject();
    inp.onmouseup = function(e) {
        e.preventDefault();
    };
    inp.onfocus = function(e) {
        e.preventDefault();
        inp.setSelectionRange(0, 9999);
        if (Object.touchpad)
            window.scrollTo(0, 0);
    }; 
    inp.onkeyup = function(e) {
        e.preventDefault();
        me.keyup_callback(name.getAttr("value"));
    };
    inp.onblur = function(e) {
        if (Object.touchpad)
            window.scrollTo(0, 0);
    };

    form.addContent(name);
    me.addContent(form);

    me.selectAll = function() {
        inp.setSelectionRange(0, 9999);
    }



    me.setBounds = function(l, t, w, h) {
        docObject.style.left = l + "px";
        docObject.style.top = t + "px";
        docObject.style.width = w + "px";
        docObject.style.height = h + "px";
        inp.style.left = "20px";
        inp.style.top = "1px";
        inp.style.width = (w - 40) + "px";
        inp.style.height = (h - 2) + "px";
    };

    me.setText = function(txt) {
        name.setAttr("value", txt);
    };

    me.focus = function() {
        var N = name.getDocObject();
        N.focus();
        this.focus_callback();
    };




};
function Button(_owner) {
    $U.extend(this, new GUIElement(_owner, "button"));
    var me = this;
    me.setAttr("type", "button");
    me.setAbsolute();

    me.setText = function(txt) {
        me.getDocObject().innerHTML = txt;
    };
    me.getText = function() {
        return me.getDocObject().innerHTML;
    };

    me.setCallBack = function(_proc) {
        me.addUpEvent(_proc);
    };
};
function Label(_owner) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    me.setAttr("type", "div");
    me.setAbsolute();
    me.setStyles("color:#BBBBBB;font-family:Helvetica, Arial, sans-serif;font-size:" + (13 * $SCALE) + "px;text-align:center");
    me.setText = function(txt) {
        me.getDocObject().innerHTML = txt;
    };
    me.getText = function() {
        return me.getDocObject().innerHTML;
    };

};
function Iframe(_owner, _src) {
    $U.extend(this, new GUIElement(_owner, "iframe"));
    var me = this;

    me.setAttr('frameborder', 0);
    me.setStyle('border', 0);
    me.setAttr('marginheight', 0);
    me.setAttr('marginwidth', 0);
    //    me.setAttr('scrolling', 'yes');
    me.setAttr('src', _src);


    me.setURL = function(_s) {
        me.setAttr('src', _s);
    };


};
function ImageElt(_owner, _src, _proc, _l, _t, _w, _h) {
    var me = this;
    //    $U.extend(this, new GUIElement(_owner, "div"));
    $U.extend(this, new Panel(_owner.getDocObject()));
    me.setStyles("opacity:0");
    me.transition("opacity", 0.4);
    //    this.hide();



    me.setAbsolute();
    me.setBounds(_l, _t, _w, _h);
    // console.log("IMAGE = "+ $APP_PATH + _src);
    me.setStyles("margin:0px;padding:0px;background-size:100%;background-repeat:no-repeat;background-image:url(" + $APP_PATH + _src + ")");
    me.addDownEvent(_proc);
    _owner.addContent(me);

    me.show = function() {
        me.setLayer(100);
        me.applyTransitionIN();
        me.addDownEvent(_proc);
    };
    me.hide = function() {
        me.setLayer(0);
        me.applyTransitionOUT();
        me.removeDownEvent(_proc);
    };


}
function iPadList(_own, _proc, _nme, _l, _t, _w, _h) {
    var me = this;
    var items = [];
    var wr = new iPadDOMElt("div");
    var ct = new iPadDOMElt("div");
    var label = new iPadDOMElt("div");
    label.stl("position:absolute;left:0px;top:0px;width:" + _w + "px;height:30px;line-height:30px;color:#252525;font-family:Helvetica, Arial, sans-serif;font-size:13px;text-align:center");
    label.settxt(_nme);
    var rootLI = new iPadDOMElt("li");
    var currentUL = null;
    rootLI.childs = [];
    rootLI.parent = null;
    var backBtn = new iPadDOMElt("a");
    backBtn.attr("className", "iPadBtnBack");
    backBtn.settxt("Back");
 

    // Un item (pas un répertoire) a été tapé :
    var touchItem = function(_li) {
        _proc(_li, _li.macro);
    };

    // Si le bouton back a été pressé, _back est true,
    // sinon c'est qu'on a tapé sur un répertoire dans la liste :
    var touchDir = function(_li, _back) {

        if (currentUL)
            currentUL.transitionOUT(ct, _back);
        currentUL = new iPadDOMElt("ul");
        currentUL.location = _li;
        currentUL.attr("className", "iPadListUL");
        if (_back)
            currentUL.transform(-100);
        for (var i = 0; i < _li.childs.length; i++) {
            currentUL.add(_li.childs[i]);
        }
        ct.add(currentUL);
        currentUL.transitionIN();
        if (_li === rootLI)
            backBtn.stl("visibility:hidden");
        else {
            backBtn.stl("visibility:visible");
            backBtn.settxt(_li.gettxt());
            backBtn.evt(function(ev) {
                ev.preventDefault();
                touchDir(_li.parent, true);
            });
        }
    };


    var newDirLI = function(_parent) {
        var li = new iPadDOMElt("li");
        li.childs = [];
        li.parent = _parent;
        li.attr("className", "iPadListLI");
        li.evt(function(ev) {
            ev.preventDefault();
            touchDir(li, false);
        });
        return li;
    };


    var DirLI = function(_parent, _t) {
        for (var i = 0; i < _parent.childs.length; i++) {
            if (_parent.childs[i].gettxt() === _t)
                return _parent.childs[i];
        }
        var newLI = newDirLI(_parent);
        newLI.settxt(_t);
        var arrow = new iPadDOMElt("div");
        arrow.attr("className", "iPadArrowRight");
        newLI.add(arrow);
        _parent.childs.push(newLI);
        return newLI;
    };

    me.getCurrentPath = function() {
        if (!currentUL)
            return "";
        var path = "";
        var li = currentUL.location;
        while (li.parent) {
            path = li.gettxt() + "/" + path;
            li = li.parent;
        }
        return path;
    };

    // r est le refcon passé éventuellement à la methode me.append.
    // La liste se place dans le dossier contenant le LI cible, et
    // ensuite scroll la liste pour que le LI soit visible :
    me.targetLI = function(_r) {
        //        console.log("target!");
        var i = 0;
        while ((i < items.length) && (items[i].macro !== _r))
            i++;
        if (items[i].macro === _r) {
            var li = items[i];
            touchDir(li.parent, true);
            var pos = 0;
            while (li.parent.childs[pos] !== li)
                pos++;
            var tf = pos * li.o().offsetHeight;
            var d = ct.o();
            var s = 5; // vitesse : nombre de pixels par 100eme de seconde
            var t0 = d["scrollTop"];
            if (t0 !== tf) {
                var i = s * (tf - t0) / Math.abs(tf - t0);
                var interval = setInterval(function() {
                    d["scrollTop"] = t0;
                    t0 += i;
                    if (Math.abs(tf - t0) < s) {
                        d["scrollTop"] = tf;
                        clearInterval(interval);
                    }
                }, 10);
            }
        }
    };

    me.show = function() {
        touchDir(rootLI, false);
    };

    me.reInit = function() {
        for (var i = 0; i < items.length; i++) {
            items[i].settxt(items[i].text);
        }
    };

    me.append = function(_txt, _refcon) {
        var t = _txt.split("/");
        var dir = rootLI;
        for (var i = 0; i < (t.length - 1); i++) {
            dir = DirLI(dir, t[i]);
        }
        var item = new iPadDOMElt("li");
        item.settxt(t[t.length - 1]);
        item.text = t[t.length - 1];
        item.evt(function(ev) {
            ev.preventDefault();
            touchItem(item);
        });
        item.attr("className", "iPadListLI");
        item.parent = dir;
        item.macro = (_refcon === undefined) ? null : _refcon;
        dir.childs.push(item);
        items.push(item);
    };

    me.getDocObject = function() {
        if (wr) return wr.o();
        return null;
    };

    wr.attr("className", "iPadListMasterDIV");
    wr.stl("left:" + _l + "px;top:" + _t + "px;width:" + _w + "px;height:" + _h + "px");
    ct.attr("className", "iPadListContentDIV");
    wr.add(ct);
    wr.add(backBtn);
    wr.add(label);
    _own.appendChild(wr.o());



    function iPadDOMElt(_type) {
        var me = this;
        var CLK = true;
        var docObject = document.createElement(_type);
        me.setStyle = function(_attr, _param) {
            docObject.style.setProperty(_attr, _param);
        };
        me.stl = function(_st) {
            var t = _st.split(";");
            for (var i = 0, len = t.length; i < len; i++) {
                var a = t[i].split(":");
                docObject.style.setProperty(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
            }
        };
        me.attr = function(_attr, _param) {
            docObject[_attr] = _param;
        };
        var touchstart = function(ev) {
            CLK = true;
        };
        var touchmove = function(ev) {
            CLK = false;
        };
        me.evt = function(_proc) {
            // Encore du bricolage pour les navigateurs android... :
            if ($U.isMobile.android()) {
                docObject.addEventListener("touchstart", touchstart, false);
                docObject.addEventListener("touchmove", touchmove, false);
                docObject.addEventListener("touchend", function(ev) {
                    if (CLK) _proc(ev);
                }, false);
            } else
                docObject.addEventListener("mousedown", _proc, false);
        };
        me.o = function() {
            return docObject;
        };
        me.clr = function() {
            while (docObject.childNodes.length !== 0) {
                docObject.removeChild(docObject.childNodes[0]);
            }
        };
        me.add = function(_o) {
            docObject.appendChild(_o.o());
        };
        me.settxt = function(_t) {
            me.attr("textContent", _t);
        };
        me.gettxt = function() {
            return docObject["textContent"];
        };
        me.transform = function(_t) {
            me.stl("transform:translateX(" + _t + "%);-webkit-transform:translateX(" + _t + "%);-moz-transform:translateX(" + _t + "%);-o-transform:translateX(" + _t + "%)");
        };
        me.transitionIN = function() {
            setTimeout(function() {
                me.transform(0);
            }, 1);
        };
        me.transitionOUT = function(_owner, _opp) {
            var pc = ((_opp === undefined) || (!_opp)) ? "-100" : "100";
            setTimeout(function() {
                me.transform(pc);
            }, 1);
            setTimeout(function() {
                _owner.o().removeChild(docObject);
            }, 200);
        };
    }

}
function DeleteAll(_canvas) {
    var me = this;
    var canvas = _canvas;
    var tmargin = 20;
    var w = 250;
    var h = 30;

    var btn = new Button(canvas);
    //    btn.setBounds((canvas.getWidth() - w) / 2, tmargin, w, h);
    btn.setText($L.clear_all);
    btn.setStyles("line-height:30px;vertical-align: middle;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 14px Arial, Helvetica, sans-serif;-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;color: #252525;border: 2px solid #b4b4b4;background-color: rgba(230,230,230,0.9)");


    var exe = function(ev) {
        canvas.selectArrowBtn();
        canvas.saveToLocalStorage();
        canvas.undoManager.clear();
        canvas.undoManager.deleteObjs(canvas.getConstruction().elements());
        canvas.getConstruction().deleteAll();
        //        canvas.macrosManager.clearTools();
        canvas.textManager.clear();
        canvas.getDocObject().style.visibility = "visible";
        canvas.paint();
    }
    btn.addDownEvent(exe);

    me.deleteAll = function() {
        exe()
    }

    me.show = function() {
        btn.setBounds((canvas.getWidth() - w) / 2, tmargin, w, h);
        canvas.getDocObject().parentNode.appendChild(btn.getDocObject());
    };

    me.hide = function() {
        if (btn.getDocObject().parentNode) {
            canvas.getDocObject().parentNode.removeChild(btn.getDocObject());
        }
    };


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Panel(_owner) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    var effect = "";
    var effect_var1 = 0;
    me.setAbsolute();
    var docObject = me.getDocObject();

    this.show_callback = function() {};

    this.show = function() {
        // Si je n'ai pas encore de parent :
        if (docObject.parentNode === null) {
            me.owner.appendChild(docObject);
            this.applyTransitionIN();
        }
    };

    this.close_callback = function() {};

    this.close = function() {

        this.applyTransitionOUT();
        setTimeout(function() {
            if (docObject.parentNode !== null) {
                try {
                    docObject.parentNode.removeChild(docObject);
                    //                    me.owner.removeChild(docObject);
                } catch (e) {};

            }
        }, 300);
        //        this.close_callback();
    };

    this.isVisible = function() {
        return (docObject.parentNode !== null);
    };


    this.transition = function(_type, _speed, _x) {
        effect = _type;
        switch (effect) {
            case "translate_x":
                //                console.log(document.body.parentNode);
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                effect_var1 = _x;
                break;
            case "translate_y":
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                effect_var1 = _x;
                break;
            case "scale":
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                break;
            case "opacity":
                docObject.style.setProperty("transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-webkit-transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-moz-transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-o-transition", "opacity " + _speed + "s ease-in-out");
                break;
        }
    };

    this.applyTransitionIN = function() {
        switch (effect) {
            case "translate_x":
                docObject.style.setProperty("transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-webkit-transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-moz-transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-o-transform", "translateX(" + effect_var1 + "px)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-o-transform", "translate(0,0)");
                }, 1);
                break;
            case "translate_y":
                docObject.style.setProperty("transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-webkit-transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-moz-transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-o-transform", "translateY(" + effect_var1 + "px)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-o-transform", "translate(0,0)");
                }, 1);
                break;
            case "scale":
                docObject.style.setProperty("transform", "scale(0)");
                docObject.style.setProperty("-webkit-transform", "scale(0)");
                docObject.style.setProperty("-moz-transform", "scale(0)");
                docObject.style.setProperty("-o-transform", "scale(0)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "scale(1)");
                    docObject.style.setProperty("-webkit-transform", "scale(1)");
                    docObject.style.setProperty("-moz-transform", "scale(1)");
                    docObject.style.setProperty("-o-transform", "scale(1)");
                }, 1);
                break;
            case "opacity":
                setTimeout(function() {
                    docObject.style.setProperty("opacity", "1");
                }, 1);
                break;
        }
    };

    this.applyTransitionOUT = function() {
        switch (effect) {
            case "translate_x":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-o-transform", "translate(" + effect_var1 + "px,0)");
                }, 1);
                break;
            case "translate_y":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-o-transform", "translate(0," + effect_var1 + "px)");
                }, 1);
                break;
            case "scale":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "scale(0)");
                    docObject.style.setProperty("-webkit-transform", "scale(0)");
                    docObject.style.setProperty("-moz-transform", "scale(0)");
                    docObject.style.setProperty("-o-transform", "scale(0)");
                }, 1);
                break;
            case "opacity":
                setTimeout(function() {
                    docObject.style.setProperty("opacity", "0");
                }, 1);
                break;
        }
    };

    me.setBackground = function(_grad) {
        var browser = $U.browserCode();
        me.setStyle("background", browser + _grad);
    };

    me.setBackgroundColor = function(_col) {
        me.setStyle("backgroundColor", _col);
    };

    // For overflow panels(speed : 1-10) :
    me.scroll = function(_dir, tf, _speed) {
        var s = "";
        switch (_dir) {
            case "top":
                s = "scrollTop";
                break;
            case "left":
                s = "scrollLeft";
                break;
        }
        var t0 = docObject[s];
        if (t0 !== tf) {
            var i = _speed * (tf - t0) / Math.abs(tf - t0);
            var interval = setInterval(function() {
                docObject[s] = t0;
                t0 += i;
                if (Math.abs(tf - t0) < _speed) {
                    docObject[s] = tf;
                    clearInterval(interval);
                }

            }, 10);
        }
    };






}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function VerticalBorderPanel(_canvas, _w, _isLeft) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var width = _w;
    var isLeft = _isLeft;
    me.setAttr("className", "verticalPanel");
    me.transition("translate_x", 0.2, (isLeft) ? -width : width);
    //    me.transition("translate_y", 0.2, (isLeft) ? -width : width);


    this.show = function() {
        //        document.body.parentNode.appendChild(me.getDocObject());
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            //            document.body.parentNode.removeChild(me.getDocObject());
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        if (isLeft) {
            me.setBounds(t.left + 10, t.top + 10, width, t.height - 20 - canvas.prefs.controlpanel.size);
        } else {
            me.setBounds(t.left + t.width - width - 10, t.top + 10, width, t.height - 20 - canvas.prefs.controlpanel.size);
        }
    };

    me.init();
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function HorizontalBorderPanel(_canvas, _h, _isTop) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var height = _h;
    var isTop = _isTop;
    me.setAttr("className", "horizontalPanel");
    //    me.transition("translate_x", 0.2, (isTop) ? -width : width);


    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        //        me.applyTransitionIN();
    };

    this.close = function() {
        //        me.applyTransitionOUT();
        //        setTimeout(function() {
        //            me.owner.parentNode.removeChild(me.getDocObject());
        //        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        if (isTop) {
            me.setBounds(t.left, t.top, t.width, height);
        } else {
            me.setBounds(t.left, t.top + t.height - height, t.width, height);
        }
    };

    me.init();



};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function CenterPanel(_canvas, _w, _h) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var height = _h;
    var width = _w;


    me.setAttr("className", "centerPanel");
    me.transition("scale", 0.2);


    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    me.init = function() {
        var t = me.getOwnerBounds();
        me.setBounds(t.left + (t.width - width) / 2, t.top + (t.height - height) / 2, width, height);
    };

    me.init();
}
function viewportListPanel(_owner) {
    var me = this;
    var owner = _owner;
    $U.extend(this, new Panel(owner));
    me.setAttr("className", "viewportListPanel");

    var rootUL = new GUIElement(me, "ul");
    rootUL.setAttr("className", "viewportListUL");





    me.addItem = function(_n) {
        var myul = rootUL;
        var tab = _n.split("/");
        var len = tab.length - 1;
        for (var i = 0; i < len; i++) {
            var ul = new GUIElement(me, "ul");
            ul.setAttr("className", "viewportListUL");
            myul.addContent(ul);
            myul = ul;
        }
        var name = tab[len];


        var li = new GUIElement(me, "li");
        li.setAttr("className", "viewportListLI");
        li.setAttr("innerHTML", name);
        //        li.setAttr("onmousedown", mousedown);
        myul.addContent(li);
    };

    me.addContent(rootUL);
    owner.addContent(me);

};



function viewportListUL(_owner) {
    var me = this;
    var owner = _owner;
    $U.extend(this, new GUIElement(me, "ul"));
    me.setAttr("className", "viewportListUL");





};
function progressBar(_canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var canvas = _canvas;
    var ctx = canvas.getContext('2d');
    var bw = canvas.getWidth(),
        bh = 3;
    var ww = canvas.getWidth(),
        hh = 3;
    //    var bw = 450, bh = 10;
    //    var ww = 500, hh = 30;
    var ll = 0;
    var tt = canvas.getHeight() - hh - canvas.prefs.controlpanel.size;
    //    var ll = (canvas.getWidth() - ww) / 2;
    //    var tt = (canvas.getHeight() - hh) / 2;
    var me = this;
    me.setAttr("className", "progressPanel");
    me.setBounds(ll, tt, ww, hh);
    me.transition("scale", 0.2);

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };
    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    //        this.show = function() {
    //        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    ////        me.applyTransitionIN();
    //    };
    //    this.close = function() {
    ////        me.applyTransitionOUT();
    //        canvas.getDocObject().parentNode.removeChild(me.getDocObject());
    //    };

    var bar = new GUIElement(me, "div");
    bar.setAttr("className", "progressBar");
    bar.setAbsolute();
    bar.setBounds((ww - bw) / 2, (hh - bh) / 2, bw, bh);
    //    bar.getDocObject().innerHTML="voucou";

    var moveableBar = new GUIElement(me, "div");
    moveableBar.setAttr("className", "moveprogressBar");
    moveableBar.setBounds(0, 0, 50, bh);
    bar.addContent(moveableBar);


    me.addContent(bar);

    me.move = function(_pc) {

        var w = bw * _pc;
        //        ctx.fillStyle="#FF0000";
        //        ctx.beginPath();
        //        ctx.rect(0, 0, w, bh);
        //        ctx.fill();

        //        if (w>200) alert("coucou");
        //        bar.getDocObject().innerHTML=w;
        //        alert(w);
        //        var ctx=bar.getDocObject().getContext('2d');
        //        ctx.fillStyle="#FF0000";
        //        ctx.beginPath();
        //        ctx.rect(0, 0, w, bh);
        //        ctx.fill();
        //        console.log(w);
        moveableBar.setBounds(0, 0, w, bh);
    };

    me.show();
}
function BubblePanel(_canvas, _exec, _close, _ev, _t, _title, _w, _h, _titleheight) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var x = canvas.mouseX(_ev) + 5;
    var y = canvas.mouseY(_ev) - 45;
    var width = _w;
    var height = _h;

    me.setAttr("className", "coincidencePanel");
    me.transition("scale", 0.15);

    var bubbleList = new BubbleListPanel(me, _t, width, height, _titleheight, _title);

    var closeIfNeeded = function(ev) {
        var x0 = canvas.mouseX(ev);
        var y0 = canvas.mouseY(ev);
        if (x0 < x || y0 < y || x0 > (x + width) || y0 > (y + height)) {
            me.close();
        }
    };

    me.isVisible = function() {
        return (me.getDocObject().parentNode !== null);
    }

    me.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    me.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            if (me.getDocObject().parentNode !== null) {
                canvas.getDocObject().parentNode.removeChild(me.getDocObject());
            }
            var action = ($U.isMobile.any()) ? 'touchstart' : 'mousedown';
            window.removeEventListener(action, closeIfNeeded, false);
            _close();
        }, 300);
    };

    me.exec = function(_any) {
        _exec(_any);
        me.close();
    };

    me.init = function() {
        // var t = me.getOwnerBounds();
        me.setBounds(x, y, width, height);
        var action = ($U.isMobile.any()) ? 'touchstart' : 'mousedown';
        window.addEventListener(action, closeIfNeeded, false);
    };

    me.init();
    me.show();

}


function BubbleListPanel(_panel, _t, _w, _h, _titleheight, _title) {
    var me = this;
    $U.extend(this, new Panel(_panel.getDocObject()));
    me.setAttr("className", "coincidenceListDIV bulle");
    me.setBounds(10, 10, _w - 20, _h - 20);

    var viewportmask = new Panel(me);
    viewportmask.setAttr("className", "coincidenceListViewportMask");
    viewportmask.setBounds(10, _titleheight, _w - 40, _h - (_titleheight + 35));

    var viewport = new Panel(me);
    viewport.setAttr("className", "coincidenceListViewport");
    viewport.setBounds(-1, -1, _w + 10, _h - (_titleheight + 35));

    var title = new Label(me);
    title.setText(_title);
    title.setBounds(10, 10, _w - 40, _titleheight);

    var exec = function(ev) {
        ev.preventDefault();
        setTimeout(function() {
            _panel.close();
            ev.target.className = "coincidenceLIclassSel";
            _panel.exec(ev.target.obj);
        }, 1);
    };

    var col = "#333";
    for (var i = 0; i < _t.length; i++) {
        var p = new GUIElement(me, "div");
        p.setAttr("obj", _t[i][1]);
        p.setAttr("innerHTML", _t[i][0]);
        p.setStyle("color", (_t[i].length > 1) ? _t[i][2] : col);
        p.getDocObject().addEventListener('click', exec, false);
        viewport.addContent(p);
    }

    viewportmask.addContent(viewport);
    me.addContent(title);
    me.addContent(viewportmask);


    me.show();

}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */ 


function MacroPanel(_canvas, _exec) {
    var me = this;
    var canvas = _canvas;
    $U.extend(this, new VerticalBorderPanel(canvas, $P.MacroPanelWidth * $SCALE, true));
    me.setBounds(me.getBounds().left - 15, -5, 0, canvas.getHeight() - $P.controlpanel.size); // Le fond n'est pas affiché
    var proc = function(_li, _m) {
        me.deselectMacros();
        _exec(_li, _m);
    }
    var pluginsList = new iPadList(me.getDocObject(), proc, $L.macro_plugins, 10, 10, 180, 196);
    var toolsList = new iPadList(me.getDocObject(), proc, $L.macro_tools, 10, 215, 180, 196);
    var props = null;
    var props = new MacroPropertiesPanel(canvas, me);

    me.show();

    me.addPlugins = function(_m) {
        pluginsList.append(_m.name, _m);
    };
    me.addTool = function(_m) {
        toolsList.append(_m.name, _m);
    };
    me.showPlugins = function() {
        pluginsList.show();
    };
    me.showTools = function() {
        toolsList.show();
    };
    me.addBlankLI = function() {
        toolsList.append(" ");
    };
    me.deselectMacros = function() {
        pluginsList.reInit();
        toolsList.reInit();
    };
    me.getToolPath = function() {
        return toolsList.getCurrentPath();
    };

    me.refreshConstructionPanel = function(_p, _t, _e) {
        props.refreshConstructionPanel(_p, _t, _e);
    };

    me.clearToolList = function() {
        var old = (toolsList) ? (toolsList.getDocObject()) : null;
        if (old) old.parentNode.removeChild(old);
        toolsList = new iPadList(me.getDocObject(), proc, $L.macro_tools, 10, 210, 180, 196);
    };

    me.isMacroProps = function() {
        return (props !== null);
    };

    me.showMacroProps = function() {
        props.show();
    };

    me.hideMacroProps = function() {
        props.close();
    };

    me.targetToolLI = function(_m) {
        toolsList.targetLI(_m);
    };
}



function MacroPropertiesPanel(_canvas, _macropanel) {
    var me = this;
    var macropanel = _macropanel;
    var canvas = _canvas;
    var params = [];
    var targets = [];
    var exec = "";

    $U.extend(this, new Panel(macropanel.getDocObject()));
    me.setAttr("className", "macroPropsDIV");
    me.transition("translate_x", 0.2, -200);


    var viewport = new GUIElement(me, "div");
    viewport.setAttr("className", "macroPropsViewport");

    var inner = new GUIElement(me, "div");
    inner.setAttr("className", "macroPropsInnerDIV");

    var nameDIV = new GUIElement(me, "div");
    nameDIV.setAttr("className", "macroPropsNameDIV");

    // La macro a été validée par la touche retour
    // après avoir tapé son nom dans le input text :
    var validMacro = function() {
        var N = name.getDocObject();
        N.blur();
        var codes = [];
        var cn = canvas.getConstruction();
        for (var i = 0, len = params.length; i < len; i++) {
            codes.push(cn.find(params[i]).getFamilyCode());
        }
        var m = canvas.macrosManager.addTool(macropanel.getToolPath() + N.value, codes, exec);
        canvas.macrosManager.refreshToolList();
        cn.clearMacroMode();
        canvas.paint();
        macropanel.hideMacroProps();
        macropanel.targetToolLI(m);
        window.scrollTo(0, 0);
    };

    var form = new GUIElement(me, "form");
    form.setAttr("action", "javascript:void(0);");
    form.getDocObject().onsubmit = validMacro;

    var name = new GUIElement(me, "input");
    name.setAttr("type", "text");
    name.setAttr("className", "macroPropsNameINPUT");
    name.setAttr("id", "macro_name");
    var inp = name.getDocObject();
    inp.onmouseup = function(e) {
        e.preventDefault();
    };
    inp.onfocus = function(e) {
        inp.setSelectionRange(0, 9999);
    };
    inp.onkeyup = function(e) {
        e.preventDefault();
    };

    var div_init = new GUIElement(me, "div");
    div_init.setAttr("className", "macroLabelDiv");
    var img_init = new GUIElement(me, "img");
    img_init.setAttr("src", $APP_PATH + "NotPacked/images/macros/init.svg");
    img_init.setAttr("className", "macroLabelImage");
    var span_init = new GUIElement(me, "span");
    span_init.setAttr("className", "macroLabelSpan");
    div_init.addContent(img_init);
    div_init.addContent(span_init);

    var div_final = new GUIElement(me, "div");
    div_final.setAttr("className", "macroLabelDiv");
    var img_final = new GUIElement(me, "img");
    img_final.setAttr("src", $APP_PATH + "NotPacked/images/macros/target.svg");
    img_final.setAttr("className", "macroLabelImage");
    var span_final = new GUIElement(me, "span");
    span_final.setAttr("className", "macroLabelSpan");
    div_final.addContent(img_final);
    div_final.addContent(span_final);

    var div_exec = new GUIElement(me, "div");
    div_exec.setAttr("className", "macroLabelDiv");
    var textarea_exec = new GUIElement(me, "textarea");
    textarea_exec.setAttr("className", "macroExecInput");
    textarea_exec.setAttr("wrap", "off");
    div_exec.addContent(textarea_exec);

    me.refreshConstructionPanel = function(_p, _t, _e) {
        params = _p;
        targets = _t;
        exec = _e;
        setMacroContent();
        setMacroTitle();
    };

    var setMacroTitle = function() {
        name.setAttr("value", $L.macroname);
    };

    var setMacroContent = function() {
        inner.clearContent();
        span_init.setAttr("innerHTML", params.join(", "));
        span_final.setAttr("innerHTML", targets.join(", "));
        textarea_exec.setAttr("innerHTML", exec.toString().replace(/\n/g, "\n\t"));
        inner.addContent(div_init);
        inner.addContent(div_final);
        //        inner.addContent(div_exec);
    };

    form.addContent(name);
    nameDIV.addContent(form);
    viewport.addContent(inner);
    me.addContent(nameDIV);
    me.addContent(viewport);
};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Macro(_canvas, _name, _p, _proc) {
    this.name = _name;
    this.shortname = _name.split("/");
    this.shortname = this.shortname[this.shortname.length - 1];
    var me = this;
    var paramTypes = _p;
    var exec = _proc;
    var canvas = _canvas;


    var params = [];
    var Cn = null;
    var Li = null;


    me.tagPossibleInitials = function() {
        var v = Cn.elements();
        for (var i = 0, len = v.length; i < len; i++) {
            if (v[i].isInstanceType(paramTypes[params.length])) {
                if (v[i].getMacroMode() === 0) {
                    // S'il s'agit d'un neutre
                    v[i].setMacroMode(4);
                }
            } else {
                if (v[i].getMacroMode() !== 5) {
                    // S'il ne s'agit pas d'un initial déjà déclaré
                    v[i].setMacroMode(0);
                }

            }
        }
    };

    var commentMacro = function(_i, _len, _tpe) {
        var t = ' :<p class="macroLIclassComment">' + _i + '/' + _len + ' - ' + $L.object[_tpe] + ' ?</p>';
        return t;
    };

    var nextStep = function() {
        // S'il s'agit d'une macro sans initial :
        if (paramTypes.length === 0) {
            executeMacro();
            canvas.getConstruction().setMode(5);
            canvas.paint();
            params = [];
            return;
        }
        if (params.length < paramTypes.length) {
            me.tagPossibleInitials();
            // Curiosité : le innerHTML semble prendre beaucoup de temps sur touchpad
            // D'où l'execution par setTimeout dans un autre Thread...
            setTimeout(function() {
                //                Li.settxt(Li.macro.name + commentMacro(params.length + 1, paramTypes.length, paramTypes[params.length]));
                Li.o().innerHTML = Li.macro.shortname + commentMacro(params.length + 1, paramTypes.length, paramTypes[params.length]);
            }, 1);
        } else {
            executeMacro();
            //            canvas.macrosManager.endMacro();
            canvas.getConstruction().setMode(5);
            canvas.paint();
            params = [];
            nextStep();
        }
    };

    this.init = function(_li, _cn) {
        params = [];
        Li = _li;
        Cn = _cn;
        nextStep();
    };

    this.addParam = function(_n) {
        params.push(_n);
        nextStep();
    };


    var executeMacro = function() {
        var s = "myexecutefunc=" + exec.toString();
        s += '\n$macroFinals=myexecutefunc("' + params.join('","') + '")';
        canvas.undoManager.beginAdd();
        canvas.InterpretMacro(s);
        canvas.undoManager.endAdd();
    };



    this.getSource = function() {
        var p = '[]',
            t = '[]';
        if (paramTypes.length > 0) {
            p = '["' + paramTypes.join('","') + '"]';
        }
        var txt = '\tname:"' + $U.native2ascii(this.name) + '",\n';
        txt += '\tparameters:' + p + ',\n';
        txt += '\texec:\n\t' + exec.toString();

        return txt;
    };
};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function MacrosManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    // Macros de bibliothèque :
    var plugins = [];
    // Macros personnelles :
    var tools = [];
    var currentTool = null;
    var macroPanel = null;

    var macrosSortFilter = function(a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase())
            return -1;
        else if (a.name === b.name)
            return 0;
        else
            return 1;
    };

    var loadPluginsList = function() {
        for (var i = 0, len = plugins.length; i < len; i++) {
            macroPanel.addPlugins(plugins[i]);
        }
        macroPanel.showPlugins();
    };
    var loadToolsList = function() {
        tools.sort(macrosSortFilter);
        for (var i = 0, len = tools.length; i < len; i++) {
            macroPanel.addTool(tools[i]);
        }
        macroPanel.addBlankLI();
        macroPanel.showTools();
    };


    me.clearTools = function() {
        tools = [];
    };

    me.refreshToolList = function() {
        macroPanel.clearToolList();
        loadToolsList();
    };

    me.refreshMacro = function() {
        if (currentTool)
            currentTool.tagPossibleInitials();
    }

    // Pour l'execution de macros :
    var startMacro = function(_li, _m) {
        if (currentTool === _m) {
            me.endMacro();
        } else {
            currentTool = _m;
            canvas.getConstruction().setMode(5);
            _m.init(_li, canvas.getConstruction());
            canvas.paint();
        }
    };

    me.endMacro = function() {
        currentTool = null;
        macroPanel.deselectMacros();
        canvas.getConstruction().setMode(4);
        canvas.paint();
    };

    me.addParam = function(_n) {
        if (currentTool) {
            currentTool.addParam(_n);
        }
    };

    //Pour la construction de macros :
    me.refreshConstructionPanel = function(_p, _t, _e) {
        //        console.log(_p.length+_e);
        if (_p.length === 0) {
            // S'il n'y a pas d'initiaux :
            macroPanel.hideMacroProps();
            return;
        }
        macroPanel.showMacroProps();
        macroPanel.refreshConstructionPanel(_p, _t, _e);
    };


    // On a cliqué sur l'icône Macro :
    me.showPanel = function() {
        currentTool = null;
        if (!macroPanel) {
            macroPanel = new MacroPanel(canvas, startMacro);
            loadPluginsList();
            loadToolsList();
        } else {
            macroPanel.deselectMacros();
        }
    };

    me.hidePanel = function() {
        if (macroPanel) {
            macroPanel.close();
            macroPanel = null;
        }
    };

    me.addTool = function(_n, _p, _e) {
        var m = new Macro(canvas, _n, _p, _e);
        tools.push(m);
        return m;
    };

    me.addPlugin = function(_n, _p, _e) {
        var m = new Macro(canvas, _n, _p, _e);
        plugins.push(m);
        return m;
    };


    me.getSource = function() {
        if (tools.length === 0)
            return "";
        var txt = "// Macros :\n";
        txt += "$macros={};\n";
        for (var i = 0, len = tools.length; i < len; i++) {
            txt += "$macros[\"" + $U.leaveAccents(tools[i].name) + "\"]={\n";
            txt += tools[i].getSource();
            txt += "};\n\n";
        }
        return txt;
    };

};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function PropertiesManager(_canvas) {
    var me = this;
    var canvas = _canvas;

    var propsPanel = null;


    // On a cliqué sur l'icône Properties :
    me.showPanel = function() {
        if (!propsPanel) {
            propsPanel = new PropertiesPanel(canvas);
        }
    };

    me.hidePanel = function() {
        if (propsPanel) {
            propsPanel.close();
            propsPanel = null;
            me.clearEditMode();
        }
    };

    me.clearEditMode = function() {
        var Cn = canvas.getConstruction();
        var v = Cn.elements();
        for (var i = 0, len = v.length; i < len; i++) {
            v[i].setEditMode(0);
        }
    };

    me.edit = function(_obj) {
        me.clearEditMode();
        if (propsPanel) {
            _obj.setEditMode(1);
            propsPanel.showProperties(_obj);
        }

    };



};
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function PropertiesPanel(_canvas) {
    var me = this;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    $U.extend(this, new VerticalBorderPanel(canvas, 240, false));
    me.setBounds(me.getBounds().left + 15, -5, 0, 0); // Le fond n'est pas affiché

    me.show();

    me.getCS = function() {
        return Cn.coordsSystem;
    };

    me.setMagnifierMode = function(_val) {
        canvas.magnifyManager.setMagnifierMode(_val);
    };
    me.getMagnifierMode = function() {
        return canvas.magnifyManager.getMagnifierMode();
    };
    me.setDragOnlyMoveable = function(_val) {
        Cn.setDragOnlyMoveable(_val);
    };
    me.isDragOnlyMoveable = function() {
        return Cn.isDragOnlyMoveable();
    };
    me.setDegree = function(_val) {
        Cn.setDEG(_val);
        Cn.computeAll();
        canvas.paint();
    };
    me.getDegree = function(_val) {
        return Cn.isDEG();
    };
    me.setDemoMode = function(_val) {
        canvas.demoModeManager.setDemoMode(_val);
    };
    me.getDemoMode = function() {
        return canvas.demoModeManager.getDemoMode();
    };
    me.getBackgroundColor = function() {
        return canvas.getBackground();
    };
    me.setBackgroundColor = function(val) {
        return canvas.setBackground(val);
    };

    var props_name = new props_namePanel(me);
    var props_color = new props_colorPanel(me);
    var props_grid = new props_gridPanel(me);
    var props_message = new props_messagePanel(me);
    // Une ineptie necessaire parce que sinon le clavier virtuel
    // de l'ipad change la position du panneau de propriété :
    if (Object.touchpad) {
        window.scrollTo(0, 0);
    }

    props_message.show();

    me.showProperties = function(_obj) {
        if ($U.isMobile.mobilePhone()) {
            props_color.clearContent();
            props_message.clearContent();
        }

        props_message.close();
        if (_obj.getCode().startsWith("axis")) {
            if ($U.isMobile.mobilePhone())
                props_color.clearContent();
            props_color.close();
            props_name.close();
            props_grid.show();
            props_grid.set();
        } else {
            props_grid.close();
            if (_obj.getCode() === "expression_cursor")
                props_name.close();
            else
                props_name.set(_obj);

            props_color.set(_obj);
            // Une ineptie necessaire parce que sinon le clavier virtuel
            // de l'ipad change la position du panneau de propriété :
            if (Object.touchpad) {
                window.scrollTo(0, 0);
            }
        }
    };
    //
    me.compute = function() {
        Cn.computeAll();
    };
    me.repaint = function() {
        canvas.paint();
    };
    me.getAnimationSpeed = function(_o) {
        return Cn.getAnimationSpeed(_o)
    };

    me.setAnimationSpeed = function(_o, _v) {
        Cn.setAnimationSpeed(_o, _v);
    };


    me.setAllSize = function(_type, _sze) {
        Cn.setAllSize(_type, _sze);
    };
    me.setAllSegSize = function(_type, _sze) {
        Cn.setAllSegSize(_type, _sze);
    };
    me.setAllColor = function(_type, _sze) {
        Cn.setAllColor(_type, _sze);
    };
    me.setAllOpacity = function(_type, _sze) {
        Cn.setAllOpacity(_type, _sze);
    };
    me.setAllLayer = function(_type, _sze) {
        Cn.setAllLayer(_type, _sze);
    };
    me.setAllPtShape = function(_shape) {
        Cn.setAllPtShape(_shape);
    };
    me.setAllFontSize = function(_type, _sze) {
        Cn.setAllFontSize(_type, _sze);
    };
    me.setAllPrecision = function(_type, _sze) {
        Cn.setAllPrecision(_type, _sze);
    };
    me.setAllIncrement = function(_type, _sze) {
        Cn.setAllIncrement(_type, _sze);
    };
    me.setAllDash = function(_type, _sze) {
        Cn.setAllDash(_type, _sze);
    };
    me.setAll360 = function(_type, _360) {
        Cn.setAll360(_type, _360);
    };
    me.setAllTrigo = function(_type, _t) {
        Cn.setAllTrigo(_type, _t);
    };
    me.setAllNoMouse = function(_type, _sze) {
        Cn.setAllNoMouse(_type, _sze);
    };
    me.setTrack = function(_o, _val) {
        if (_val)
            canvas.trackManager.add(_o);
        else
            canvas.trackManager.remove(_o);
    };
    me.setAllTrack = function(_type, _val) {
        canvas.trackManager.setAllTrack(_type, _val);
    };
    // me.setAnimation=function(_o,_val){

    // };

}




function props_panel(_owner) {
    $U.extend(this, new Panel(_owner.getDocObject()));
    this.obj = null;
    this.owner = _owner;

    this.set = function(_obj) {
        this.obj = _obj;
        this.setObj();
    };

    // callback function :
    this.setObj = function() {};

    this.repaint = function() {
        this.owner.repaint();
    };
    this.compute = function() {
        this.owner.compute();
    };
};

function props_messagePanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    me.setAttr("className", "props_messageDIV");
    me.transition("translate_x", 0.2, 200);

    var ch = 20;
    var t1 = new Label(me);
    t1.setText($L.props_grid_message);
    t1.setStyles("color:#252525;font-style: italic");
    t1.setBounds(0, 20, 220, 20);
    me.addContent(t1);
    ch += 50;

    var t2 = new Label(me);
    t2.setText($L.props_grid_general + " :");
    t2.setStyles("font-weight:bold;font-size:16px;color:#252525");
    t2.setBounds(0, ch, 220, 20);
    me.addContent(t2);
    ch += 30;

    var DEMOcallback = function(val) {
        //        $U.setDemoMode(val);
        _owner.setDemoMode(val);
    };
    var MAGNIFIERcallback = function(val) {
        _owner.setMagnifierMode(val);
    };
    var COLORcallback = function(val) {
        _owner.setBackgroundColor(val)
    };
    var DEGREEcallback = function(val) {
        _owner.setDegree(val);
    };
    var DRAGALLcallback = function(_val) {
        _owner.setDragOnlyMoveable(!(_val));
    };

    var cp = new ColorPicker(me.getDocObject(), 10, ch, 200, 200);
    cp.setHEXcallback(COLORcallback);
    cp.setHEX(_owner.getBackgroundColor());
    ch += 210;

    var cbDemoMode = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getDemoMode(), $L.props_grid_general_demo, DEMOcallback);
    cbDemoMode.setTextColor("#252525");
    ch += 30;

    var cbMagnifier = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getMagnifierMode(), $L.props_general_magnifier, MAGNIFIERcallback);
    cbMagnifier.setTextColor("#252525");
    ch += 30;

    var cbDegree = new Checkbox(me.getDocObject(), 10, ch, 200, 30, _owner.getDegree(), $L.props_general_degree, DEGREEcallback);
    cbMagnifier.setTextColor("#252525");
    ch += 30;

    var cbDragOnly = new Checkbox(me.getDocObject(), 10, ch, 200, 30, (!(_owner.isDragOnlyMoveable())), $L.props_general_dragall, DRAGALLcallback);
    cbMagnifier.setTextColor("#252525");

}


function props_gridPanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    var CS = this.owner.getCS();
    var ch = 120; // Color picker height
    me.setAttr("className", $U.isMobile.mobilePhone() ? "props_gridDIV_Mobile" : "props_gridDIV");
    me.transition("translate_x", 0.2, 200);

    var title = new Label(me);
    title.setText($L.props_grid_title);
    title.setStyle("color", "#252525");
    title.setBounds(0, 10, 220, 20);

    var HEXcallback = function(_c) {
        CS.setColor(_c);
        me.repaint();
    }
    if (!$U.isMobile.mobilePhone()) {
        var cp = new ColorPicker(me.getDocObject(), 10, 40, 200, ch);
        cp.setHEXcallback(HEXcallback);
        ch += 50;
    } else
        ch = 40;


    var FONTcallback = function(_s) {
        CS.setFontSize(_s);
        me.repaint();
    }
    var sFont = new slider(me.getDocObject(), 10, ch, 200, 40, 6, 60, CS.getFontSize(), FONTcallback);
    sFont.setValueWidth(40);
    sFont.setLabel($L.props_font, 110);
    sFont.setTextColor("#252525");
    sFont.setValuePrecision(1);
    sFont.setBackgroundColor("rgba(0,0,0,0)");
    ch += 40;

    var AXIScallback = function(_s) {
        CS.setAxisWidth(_s);
        me.repaint();
    }
    var sAxis = new slider(me.getDocObject(), 10, ch, 200, 40, 0.5, 10, CS.getAxisWidth(), AXIScallback);
    sAxis.setValueWidth(40);
    sAxis.setLabel($L.props_axis_size, 110);
    sAxis.setTextColor("#252525");
    sAxis.setValuePrecision(0.5);
    sAxis.setBackgroundColor("rgba(0,0,0,0)");
    ch += 40;
    var GRIDcallback = function(_s) {
        CS.setGridWidth(_s);
        me.repaint();
    }
    var sAxis = new slider(me.getDocObject(), 10, ch, 200, 40, 0.1, 2, CS.getGridWidth(), GRIDcallback);
    sAxis.setValueWidth(40);
    sAxis.setLabel($L.props_grid_size, 110);
    sAxis.setTextColor("#252525");
    sAxis.setValuePrecision(0.1);
    sAxis.setBackgroundColor("rgba(0,0,0,0)");
    ch += 50;


    var SHGRIDcallback = function(_s) {
        CS.showGrid(_s);
        me.repaint();
    }
    var cbshowCS = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isGrid(), $L.props_grid_show, SHGRIDcallback);
    cbshowCS.setTextColor("#252525");
    ch += 30;

    var OXcallback = function(_s) {
        CS.showOx(_s);
        me.repaint();
    }
    var cbshowOX = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isOx(), $L.props_ox_show, OXcallback);
    cbshowOX.setTextColor("#252525");
    ch += 30;

    var OYcallback = function(_s) {
        CS.showOy(_s);
        me.repaint();
    }
    var cbshowOY = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isOy(), $L.props_oy_show, OYcallback);
    cbshowOY.setTextColor("#252525");
    ch += 30;

    var LockXcallback = function(_s) {
        CS.setlockOx(_s);
        me.repaint();
    }
    var cblockX = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.islockOx(), $L.props_ox_lock, LockXcallback);
    cblockX.setTextColor("#252525");
    ch += 30;

    var LockYcallback = function(_s) {
        CS.setlockOy(_s);
        me.repaint();
    }
    var cblockY = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.islockOy(), $L.props_oy_lock, LockYcallback);
    cblockY.setTextColor("#252525");
    ch += 30;


    var OnlyPoscallback = function(_s) {
        CS.setOnlyPos(_s);
        me.repaint();
    };
    var cbonlypos = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isOnlyPos(), $L.props_only_pos, OnlyPoscallback);
    cbonlypos.setTextColor("#252525");
    ch += 30;

    var CenterZcallback = function(_s) {
        CS.setCenterZoom(_s);
        me.repaint();
    };

    var cbcenterzoom = new Checkbox(me.getDocObject(), 10, ch, 200, 30, CS.isCenterZoom(), $L.props_center_zoom, CenterZcallback);
    cbcenterzoom.setTextColor("#252525");


    this.setObj = function() {
        if (!$U.isMobile.mobilePhone()) {
            cp.setHEX(CS.getColor());
        }
    };

    me.addContent(title);
}


function props_namePanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    me.setAttr("className", "props_nameDIV");
    me.transition("translate_x", 0.2, 200);


    var input = new InputText(me);
    input.setBounds(10, 10, 100, 25);
    me.addContent(input);

    var show_callback = function(_val) {
        me.obj.setShowName(_val);
        me.repaint();
    }

    var show = new Checkbox(me.getDocObject(), 130, 8, 100, 30, false, $L.props_showname, show_callback);
    show.setTextColor("#252525");

    input.valid_callback = function(_t) {};

    input.keyup_callback = function(_t) {
        me.obj.setName(_t);
        me.obj.setShowName(true);
        show.setValue(true);
        me.obj.refreshChildsNames();
        me.repaint();
    };


    this.focus = function() {
        input.focus();
        input.selectAll();
    };

    this.setObj = function() {
        input.setText(me.obj.getName());
        show.setValue(me.obj.getShowName());
        if (me.isVisible()) {
            if (!Object.touchpad) {
                me.focus();
            }
        } else {
            me.show();
            if (!Object.touchpad) {
                setTimeout(function() {
                    me.focus();
                }, 300);
            }
        }
    };
}

function props_colorPanel(_owner) {
    var me = this;
    $U.extend(this, new props_panel(_owner));
    var ch = 100; // Color picker height
    var cp = null; // Color picker
    var sOpacity = null;
    var sSize = null;
    var segSize = null;
    var sLayer = null;
    var sFont = null;
    var sPrec = null;
    var sInc = null;
    var pShape = null;
    var cbApplyAll = null;
    var cbDash = null;
    var cbNomouse = null;
    var cbTrack = null;
    var setall = false;
    var sAnim = null;




    me.setAttr("className", $U.isMobile.mobilePhone() ? "props_colorDIV_Mobile" : "props_colorDIV");
    me.transition("translate_x", 0.2, 200);

    var HEXcallback = function(_hex) {
        if (setall)
            _owner.setAllColor(me.obj.getFamilyCode(), _hex);
        else
            me.obj.setColor(_hex);
        me.repaint();
    };

    var BOcallback = function(_val) {
        if (setall)
            _owner.setAllOpacity(me.obj.getFamilyCode(), _val);
        else
            me.obj.setOpacity(_val);
        me.repaint();
    };

    var SZcallback = function(_val) {
        if (setall)
            _owner.setAllSize(me.obj.getFamilyCode(), _val);
        else {
            if ((me.obj.getCode() === "list") && (_val === 0) && (me.obj.getSegmentsSize() === 0)) {
                me.obj.setSegmentsSize(0.1);
                segSize.setValue(0.1);
            }
            me.obj.setSize(_val);
            me.obj.compute();
            me.obj.computeChilds();
        }
        me.repaint();
    };
    var SegSZcallback = function(_val) {
        if (setall) {
            _owner.setAllSegSize(me.obj.getFamilyCode(), _val);
        } else {
            if ((_val === 0) && (me.obj.getSize() === 0)) {
                me.obj.setSize(0.1);
                sSize.setValue(0.1);
            }
            me.obj.setSegmentsSize(_val);
            me.obj.compute();
            me.obj.computeChilds();
        }
        me.repaint();
    };
    var LAYcallback = function(_val) {
        if (setall)
            _owner.setAllLayer(me.obj.getFamilyCode(), _val);
        else
            me.obj.setLayer(_val);
        me.repaint();
    };

    var FONTcallback = function(_val) {
        if (setall)
            _owner.setAllFontSize(me.obj.getFamilyCode(), _val);
        else
            me.obj.setFontSize(_val);
        me.repaint();
    };


    var PRECcallback = function(_val) {
        if (setall)
            _owner.setAllPrecision(me.obj.getFamilyCode(), _val);
        else {
            me.obj.setPrecision(_val);
            if ((me.obj.getCode() === "locus") || (me.obj.getCode() === "quadric")) {
                me.obj.compute();
            }
        }
        me.repaint();
    };
    var INCCcallback = function(_val) {
        if (setall)
            _owner.setAllIncrement(me.obj.getFamilyCode(), _val);
        else
            me.obj.setIncrement(_val);
        me.compute();
        me.repaint();
    };
    var ANIMcallback = function(_val) {
        _owner.setAnimationSpeed(me.obj, _val)
    };

    var PSHAPEcallback = function(_val) {
        if (setall)
            _owner.setAllPtShape(_val);
        else
            me.obj.setShape(_val);
        me.repaint();
    };
    var APALLcallback = function(_val) {
        setall = _val;
    };
    var DSHcallback = function(_val) {
        if (setall)
            _owner.setAllDash(me.obj.getFamilyCode(), _val);
        else
            me.obj.setDash(_val);
        me.repaint();
    };
    var m360callback = function(_val) {
        if (setall)
            _owner.setAll360(me.obj.getFamilyCode(), _val);
        else
            me.obj.set360(_val);
        me.compute();
        me.repaint();
    };
    var trigocallback = function(_val) {
        if (setall)
            _owner.setAllTrigo(me.obj.getFamilyCode(), _val);
        else
            me.obj.setTrigo(_val);
        me.compute();
        me.repaint();
    };

    var NOMOUSEcallback = function(_val) {
        if (setall)
            _owner.setAllNoMouse(me.obj.getFamilyCode(), _val);
        else
            me.obj.setNoMouseInside(_val);
        me.repaint();
    };
    var TRKcallback = function(_val) {
        if (setall)
            _owner.setAllTrack(me.obj.getFamilyCode(), _val);
        else
            _owner.setTrack(me.obj, _val);
    };

    var precVal = function(val) {
        if (val === -1)
            return val;
        else
            return $U.log(val);
    };


    me.setPickerColor = function(_hex) {
        if (!$U.isMobile.mobilePhone())
            cp.setHEX(_hex);
        HEXcallback(_hex);
    };


    me.setObj = function() {
        me.clearContent();
        ch = 140;

        if (!$U.isMobile.mobilePhone()) {
            cp = new ColorPicker(me.getDocObject(), 10, 10, 200, ch);
            cp.setHEXcallback(HEXcallback);
            cp.setHEX(me.obj.getColor().getHEX());
            ch += 25;
        } else
            ch = 10;

        if ($U.isMobile.mobilePhone()) {
            new props_generic_color(me, "rgb(0,0,178)", 10, ch, 24);
            new props_generic_color(me, "rgb(0,124,124)", 51, ch, 24);
            new props_generic_color(me, "rgb(0,124,0)", 92, ch, 24);
            new props_generic_color(me, "rgb(150,100,0)", 133, ch, 24);
            new props_generic_color(me, "rgb(180,0,0)", 174, ch, 24);
            ch += 34;
        }

        if (!$U.isMobile.mobilePhone()) {
            pShape = new ImageGroup(me.getDocObject(), 10, ch, 200, 25, $APP_PATH + "NotPacked/images/pointshape/bgOff.svg", $APP_PATH + "NotPacked/images/pointshape/bgOn.svg", PSHAPEcallback);
            pShape.setImageSize(25);
            pShape.setMargin(15);
            pShape.setHspace(25);
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/circle.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/cross.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/diamond.svg");
            pShape.addImage($APP_PATH + "NotPacked/images/pointshape/square.svg");
            pShape.select(me.obj.getShape());
            ch += 30;
        }

        var sh = 35;
        sSize = new slider(me.getDocObject(), 10, ch, 200, sh, 0.5, 25, me.obj.getSize(), SZcallback);
        sSize.setValueWidth(40);
        sSize.setLabel($L.props_size, 80);
        sSize.setTextColor("#252525");
        sSize.setValuePrecision(0.5);
        sSize.setBackgroundColor("rgba(0,0,0,0)");
        sSize.setValue(me.obj.getSize());


        if (me.obj.getCode() === "list") {
            ch += sh;
            sSize.setMin(0);
            sSize.setMax(6);
            sSize.setValuePrecision(0.1);
            sSize.setValue(me.obj.getSize());
            segSize = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 6, me.obj.getSegmentsSize(), SegSZcallback);
            segSize.setValueWidth(40);
            segSize.setLabel($L.props_segment_size, 80);
            segSize.setTextColor("#252525");
            segSize.setValuePrecision(0.1);
            segSize.setBackgroundColor("rgba(0,0,0,0)");
        }

        ch += sh;
        sOpacity = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 1, me.obj.getOpacity(), BOcallback);
        sOpacity.setValueWidth(40);
        sOpacity.setLabel($L.props_opacity, 80);
        sOpacity.setTextColor("#252525");
        sOpacity.setValuePrecision(0.01);
        sOpacity.setBackgroundColor("rgba(0,0,0,0)");
        sOpacity.setValue(me.obj.getOpacity());

        ch += sh;
        sLayer = new slider(me.getDocObject(), 10, ch, 200, sh, -8, 8, me.obj.getLayer(), LAYcallback);
        sLayer.setValueWidth(40);
        sLayer.setLabel($L.props_layer, 80);
        sLayer.setTextColor("#252525");
        sLayer.setValuePrecision(1);
        sLayer.setBackgroundColor("rgba(0,0,0,0)");
        sLayer.setValue(me.obj.getLayer());

        ch += sh;
        sFont = new slider(me.getDocObject(), 10, ch, 200, sh, 6, 60, me.obj.getFontSize(), FONTcallback);
        sFont.setValueWidth(40);
        sFont.setLabel($L.props_font, 80);
        sFont.setTextColor("#252525");
        sFont.setValuePrecision(1);
        sFont.setBackgroundColor("rgba(0,0,0,0)");
        sFont.setValue(me.obj.getFontSize());

        ch += sh;

        sPrec = new slider(me.getDocObject(), 10, ch, 200, sh, -1, 13, 0, PRECcallback);
        sPrec.setValueWidth(40);
        sPrec.setTextColor("#252525");
        sPrec.setValuePrecision(1);
        sPrec.setBackgroundColor("rgba(0,0,0,0)");
        if ((me.obj.getCode() === "locus") || (me.obj.getCode() === "quadric")) {
            sPrec.setTabValues([
                [1, $L.Locus_density_min], 5, 10, 20, 50, 100, 200, 500, 1000, 1500, 2000, [5000, $L.Locus_density_max]
            ]);
            sPrec.setValue(me.obj.getPrecision());
            sPrec.setLabel($L.Locus_density, 80);
        } else {
            sPrec.setTabValues([
                [-1, $L.props_length_none], 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
            ]);
            sPrec.setValue(precVal(me.obj.getPrecision()));
            sPrec.setLabel($L.props_length, 80);
        }

        ch += sh;
        var cbh = 30;
        if (me.obj.getCode() === "angle") {
            cbDash = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_360, m360callback);
            cbDash.setTextColor("#252525");
            cbDash.setValue(me.obj.is360());
            ch += cbh;
        } else if (me.obj.getCode() === "fixedangle") {
            cbDash = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_trigo, trigocallback);
            cbDash.setTextColor("#252525");
            cbDash.setValue(me.obj.isTrigo());
            ch += cbh;
        } else {
            sInc = new slider(me.getDocObject(), 10, ch, 200, sh, -4, 4, 0, INCCcallback);
            sInc.setTabValues([
                [0, $L.props_inc_free], 0.001, 0.01, 0.1, 0.5, 1, 2, 5, 10, 100, 1000
            ]);
            sInc.setValue(me.obj.getIncrement());
            sInc.setValueWidth(40);
            sInc.setLabel($L.props_inc, 80);
            sInc.setTextColor("#252525");
            sInc.setValuePrecision(1);
            sInc.setBackgroundColor("rgba(0,0,0,0)");
            sInc.setValue(me.obj.getIncrement());
            ch += sh;
        }


        // Curseur animation :
        if (me.obj.isAnimationPossible()) {
            sAnim = new slider(me.getDocObject(), 10, ch, 200, sh, -4, 4, 0, ANIMcallback);
            var fce = me.obj.getAnimationSpeedTab();
            fce[0] = [fce[0], $L.animation_without];
            sAnim.setTabValues(fce);
            sAnim.setValueWidth(40);
            sAnim.setLabel($L.animation_label, 80);
            sAnim.setTextColor("#252525");
            sAnim.setValuePrecision(1);
            sAnim.setBackgroundColor("rgba(0,0,0,0)");
            sAnim.setValue(_owner.getAnimationSpeed(me.obj));
        } else {
            cbDash = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_dash, DSHcallback);
            cbDash.setTextColor("#252525");
            cbDash.setValue(me.obj.isDash());
        }

        if (!$U.isMobile.mobilePhone()) {
            ch += cbh;
            cbNomouse = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_nomouse, NOMOUSEcallback);
            cbNomouse.setTextColor("#252525");
            cbNomouse.setValue(me.obj.isNoMouseInside());
        }

        if (me.obj.getCode() !== "list") {
            ch += cbh;
            cbTrack = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_track, TRKcallback);
            cbTrack.setTextColor("#252525");
            cbTrack.setValue(me.obj.isTrack());
        }
        ch += cbh;
        cbApplyAll = new Checkbox(me.getDocObject(), 10, ch, 200, cbh, false, $L.props_applyall + $L.object.family[me.obj.getFamilyCode()], APALLcallback);
        cbApplyAll.setTextColor("#252525");
        cbApplyAll.setText($L.props_applyall + $L.object.family[me.obj.getFamilyCode()]);
        cbApplyAll.setValue(setall = false);


        me.show();
    };
}



function props_generic_color(_owner, _col, _left, _top, _width) {
    var me = this;
    var col = new Color();
    col.set(_col);
    var lambda = 0.4;
    var r = Math.round(255 * (1 - lambda) + lambda * col.getR());
    var g = Math.round(255 * (1 - lambda) + lambda * col.getG());
    var b = Math.round(255 * (1 - lambda) + lambda * col.getB());
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    $U.extend(this, new GUIElement(_owner, "div"));
    me.setStyle("background-color", rgb);
    me.setStyle("border-color", _col);
    me.setStyle("border-width", "4px");
    me.setStyle("border-style", "solid");
    me.setStyle("border-radius", "16px");
    me.setAbsolute();
    me.setBounds(_left, _top, _width, _width);

    var proc = function() {
        _owner.setPickerColor(col.getHEX());
    };

    me.addDownEvent(proc);

    _owner.addContent(me);

};
function ControlButton(owner, l, t, w, h, src, _isOn, _group, _proc) {
    var me = this;
    var group = _group;
    var proc = _proc;
    if (group)
        group.add(this);
    var isOn = _isOn;
    var active = true;
    var opacityFactor = 0.5;
    this.getBounds = function() {
        return {
            "left": l,
            "top": t,
            "width": w,
            "height": h
        };
        //        var cb = owner.getBounds();
        //        var cw = w;
        //        var ch = h;
        //        var ct = cb.top + t;
        //        var cl = cb.left + l;
        //        return {
        //            "left": cl,
        //            "top": ct,
        //            "width": cw,
        //            "height": ch
        //        };
    };

    this.setActive = function(_bool) {
        active = _bool;
        if (active) {
            docObject.style.opacity = "1";
        } else {
            docObject.style.opacity = opacityFactor;
        }
    };

    this.deselect = function() {
        isOn = false;
        docObject.style.opacity = opacityFactor;
    };
    this.select = function() {
        if (group) group.deselect();
        isOn = true;
        docObject.style.opacity = "1";
    };
    this.isSelected = function() {
        return isOn;
    };
    var bounds = this.getBounds();

    var docObject = document.createElement("div");

    docObject.style.backgroundImage = "url('" + $APP_PATH + src + "')"; // for image
    docObject.style.backgroundSize = "100%";
    docObject.style.backgroundRepeat = "no-repeat";
    docObject.style.position = "absolute";
    docObject.style.backgroundColor = "rgba(0,0,0,0)";
    docObject.style.opacity = isOn ? 1 : opacityFactor;
    docObject.style.border = "0px";
    docObject.style.width = bounds.width + "px";
    docObject.style.height = bounds.height + "px";
    docObject.style.left = bounds.left + "px";
    docObject.style.top = bounds.top + "px";
    docObject.style.setProperty("-webkit-tap-highlight-color", "transparent");

    docObject.addEventListener('touchstart', function(ev) {
        ev.preventDefault();
        if (active) {
            if (group) {
                group.deselect();
                me.select();
            };
            if (proc) {
                proc();
            }
        }
    }, false);

    docObject.addEventListener('mouseover', function(ev) {
        if (active) {
            docObject.style.opacity = "1";
        }
    }, false);
    docObject.addEventListener('mouseout', function(ev) {
        if (active) {
            if (!isOn) {
                docObject.style.opacity = opacityFactor;
            }
        }
    }, false);
    docObject.addEventListener('mousedown', function(ev) {
        if (active) {
            if (group) {
                //                    group.deselect();
                me.select();
            };
            if (proc) {
                proc();
            }
        }
    }, false);


    this.getDocObject = function() {
        return docObject;
    };

    owner.getDocObject().appendChild(docObject);
};
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ControlPanel(_canvas) {
    var me = this;
    var canvas = _canvas;
    $U.extend(this, new HorizontalBorderPanel(canvas, canvas.prefs.controlpanel.size, false));

    me.addDownEvent(function() {});
    me.setStyle("background", canvas.prefs.controlpanel.color);
    me.setStyle("border-top", "1px solid hsla(0,0%,0%,.1)");
    me.setStyle("border-radius", "0px");
    me.show();

    var left = 10 * $SCALE;
    var size = 30 * $SCALE;
    var margintop = 5 * $SCALE;
    var right = me.getBounds().width - left - size;
    var hspace = 15 * $SCALE;
    var smallhspace = 5 * $SCALE;
    var copyDlog = null;
    var historyDlog = null;

    var addBtnLeft = function(_code, _sel, _group, _proc) {
        var btn = new ControlButton(me, left, margintop, size, size, "NotPacked/images/controls/" + _code + ".png", _sel, _group, _proc);
        left += size;
        return btn;
    };
    var addSpaceLeft = function(h) {
        left += h;
    };
    var addSepLeft = function() {
        var btn = new ControlButton(me, left, margintop, size, size, "NotPacked/images/controls/sep.png", true, null, null);
        left += size;
    };
    var addNullLeft = function() {
        var btn = new ControlButton(me, left, margintop, 0, size, "NotPacked/images/controls/sep.png", true, null, null);
    };
    var addBtnRight = function(_code, _sel, _group, _proc) {
        var btn = new ControlButton(me, right, margintop, size, size, "NotPacked/images/controls/" + _code + ".png", _sel, _group, _proc);
        right -= size;
        return btn;
    };
    var addSpaceRight = function(h) {
        right -= h;
    };

    var modeGroup = new BtnGroup();

    var checkMode = function(_i) {
        if (canvas.getMode() === _i) {
            modeGroup.deselect();
            canvas.setMode(0);
            canvas.paint();
            return true;
        } else
            return false;
    };

    var arrowMode = function() {
        //        if (checkMode(1)) 
        //        arrowBtn.select();
        if (checkMode(1))
            return;
        canvas.setMode(1);
        canvas.paint();
    };
    var fingerMode = function() {
        //        fingerBtn.select();
        if (checkMode(7))
            return;
        canvas.setMode(7);
        canvas.paint();
    };
    var hideMode = function() {
        if (checkMode(2))
            return;
        canvas.setMode(2);
        canvas.paint();
    };
    var trashMode = function() {
        if (checkMode(3))
            return;
        canvas.setMode(3);
        canvas.paint();
    };
    var macroMode = function() {
        if (checkMode(4))
            return;
        // if (canvas.namesManager.isVisible())
        //     nameProc();
        if (historyDlog)
            historyProc();
        if (copyDlog)
            exportProc();
        canvas.setMode(4);
        canvas.paint();
    };
    var calcMode = function() {
        if (checkMode(8))
            return;
        // if (canvas.namesManager.isVisible())
        //     nameProc();
        if (historyDlog)
            historyProc();
        if (copyDlog)
            exportProc();
        canvas.setMode(8);
        canvas.paint();
    };
    var texMode = function() {
        if (checkMode(10))
            return;
        // if (canvas.namesManager.isVisible())
        //     nameProc();
        if (historyDlog)
            historyProc();
        if (copyDlog)
            exportProc();
        canvas.setMode(10);
        canvas.paint();
    };
    var propsMode = function() {
        if (checkMode(6))
            return;
        // if (canvas.namesManager.isVisible())
        //     nameProc();
        if (historyDlog)
            historyProc();
        if (copyDlog)
            exportProc();
        canvas.setMode(6);
        canvas.paint();
    };

    var undoProc = function() {
        canvas.undoManager.undo();
        canvas.refreshKeyboard();
    };
    var redoProc = function() {
        canvas.undoManager.redo();
        canvas.refreshKeyboard();
    };



    var nameProc = function() {
        if (canvas.namesManager.isVisible()) {
            canvas.namesManager.hide();
            nameBtn.deselect();
        } else {
            canvas.namesManager.show();
            nameBtn.select();
        }
    };

    var historyProc = function() {
        if (historyDlog) {
            historyDlog.close();
            historyDlog = null;
            historyBtn.deselect();
        } else {
            if (!canvas.getConstruction().isConsultOrArrowMode()) {
                arrowBtn.select();
                arrowMode();
            }
            if (copyDlog)
                exportProc();
            historyDlog = new HistoryPanel(canvas, historyProc);
            historyBtn.select();
        }
    }

    var gridProc = function() {
        if (canvas.isCS()) {
            canvas.showCS(false);
            gridBtn.deselect();
        } else {
            canvas.showCS(true);
            gridBtn.select();
        }
    };

    var exportProc = function() {
        if (copyDlog) {
            copyDlog.close();
            copyDlog = null;
            copyBtn.deselect();
        } else {
            if (historyDlog)
                historyProc();
            if (!canvas.getConstruction().isConsultOrArrowMode()) {
                arrowBtn.select();
                arrowMode();
            }
            copyDlog = new ExportPanel(canvas, exportProc);
            copyBtn.select();
        }
    };

    
    var downloadProc = function() {
        filepicker.pick({
                extensions: ['.txt', '.dgp'],
                // mimetype: 'text/plain',
                openTo: $U.getFilePickerDefaultBox()
            },
            function(FPFile) {
                filepicker.read(FPFile, function(data) {
                    canvas.OpenFile("", $U.utf8_decode(data));
                    if ($FPICKERFRAME !== null) {
                        $FPICKERFRAME.close();
                        $FPICKERFRAME = null;
                    }
                });
            });
    };

    var uploadProc = function() {
        if (canvas.getConstruction().isEmpty())
            return;
        var source = canvas.macrosManager.getSource() + canvas.getConstruction().getSource() + canvas.textManager.getSource();



        filepicker.exportFile(
            "http://dgpad.net/scripts/NotPacked/thirdParty/temp.txt", {
                suggestedFilename: "",
                extension: ".dgp",
                services: ['DROPBOX', 'GOOGLE_DRIVE', 'BOX', 'SKYDRIVE', 'EVERNOTE', 'FTP', 'WEBDAV'],
                openTo: $U.getFilePickerDefaultBox()
            },
            function(InkBlob) {
                // console.log(InkBlob.url);
                filepicker.write(
                    InkBlob,
                    source, {
                        base64decode: false,
                        mimetype: 'text/plain'
                    },
                    // $U.base64_encode(source), {
                    //     base64decode: true,
                    //     mimetype: 'text/plain'
                    // },
                    function(InkBlob) {
                        if ($FPICKERFRAME !== null) {
                            $FPICKERFRAME.close();
                            $FPICKERFRAME = null;
                        }
                    },
                    function(FPError) {
                        console.log(FPError.toString());
                    }
                );
            },
            function(FPError) {
                console.log(FPError.toString());
            }
        );

        //        filepicker.store(
        //                $U.base64_encode(source),
        //                {
        //                    base64decode: true,
        //                    mimetype: 'text/plain'
        //                },
        //        function(InkBlob) {
        //            filepicker.exportFile(
        //                    InkBlob,
        //                    {suggestedFilename:"",extension: ".txt",openTo: $U.getFilePickerDefaultBox()},
        //            function(InkBlob) {
        //                if ($FPICKERFRAME !== null) {
        //                    $FPICKERFRAME.close();
        //                    $FPICKERFRAME = null;
        //                }
        //            },
        //                    function(FPError) {
        //                        console.log(FPError.toString());
        //                    }
        //            );
        //        },
        //                function(FPError) {
        //                    console.log(FPError.toString());
        //                }
        //        );
    };



    var arrowBtn = addBtnLeft("arrow", true, modeGroup, arrowMode);
    addSpaceLeft(hspace);
    var fingerBtn = addBtnLeft("finger", false, modeGroup, fingerMode);
    addSpaceLeft(hspace);
    var gommeBtn = addBtnLeft("gomme", false, modeGroup, hideMode);
    addSpaceLeft(hspace);
    var trashBtn = addBtnLeft("trash", false, modeGroup, trashMode);
    addSpaceLeft(hspace);
    var macrosBtn = addBtnLeft("macros", false, modeGroup, macroMode);
    addSpaceLeft(hspace);
    var calcBtn = addBtnLeft("calc", false, modeGroup, calcMode);
    addSpaceLeft(hspace);
    if (!$U.isMobile.mobilePhone()) {
        var texBtn = addBtnLeft("tex", false, modeGroup, texMode);
        addSpaceLeft(hspace);
    }
    var propBtn = addBtnLeft("properties", false, modeGroup, propsMode);
    addSpaceLeft(smallhspace);
    addSepLeft();
    addSpaceLeft(smallhspace);
    var historyBtn = addBtnLeft("history", false, null, historyProc);
    addSpaceLeft(hspace);
    if (!$U.isMobile.mobilePhone()) {
        var copyBtn = addBtnLeft("copy", false, null, exportProc);
        addSpaceLeft(hspace);
    }

    addBtnLeft("download", false, null, downloadProc);
    addSpaceLeft(hspace);
    addBtnLeft("upload", false, null, uploadProc);
    addSpaceLeft(smallhspace);
    addSepLeft();
    addSpaceLeft(smallhspace);
    var nameBtn = addBtnLeft("name", false, null, nameProc);
    addSpaceLeft(hspace);
    var gridBtn = addBtnLeft("grid", false, null, gridProc);
    var redoBtn = addBtnRight("redo", true, null, redoProc);
    addSpaceRight(hspace);
    var undoBtn = addBtnRight("undo", true, null, undoProc);

    //    this.selectBtn = function(_mode) {
    //        switch (_mode) {
    //            case 1:
    //                arrowBtn.select();
    //                break;
    //            case 2:
    //                gommeBtn.select();
    //                break;
    //            case 3:
    //                trashBtn.select();
    //                break;
    //            case 4:
    //                macrosBtn.select();
    //                break;
    //            case 5:
    //                macrosBtn.select();
    //                break;
    //            case 6:
    //                propBtn.select();
    //                break;
    //        }
    //    }

    this.selectPropBtn = function() {
        propBtn.select();
        propsMode();
    };
    this.selectCalcBtn = function() {
        calcBtn.select();
        calcMode();
    };
    this.setUndoBtn = function(_active) {
        undoBtn.setActive(_active);
    };
    this.setRedoBtn = function(_active) {
        redoBtn.setActive(_active);
    };
    this.selectArrowBtn = function() {
        arrowBtn.select();
        arrowMode();
    };
    this.forceArrowBtn = function() {
        arrowBtn.select();
        canvas.setMode(1);
        canvas.paint();
    };
    this.deselectPointer = function() {
        arrowBtn.deselect();
    };
    this.deselectAll = function() {
        modeGroup.deselect();
    };
    this.selectNameBtn = function(_b) {
        if (_b) nameBtn.select()
        else nameBtn.deselect();
    };


}


function FilePickerDIV(_c) {
    var me = this;
    var canvas = _c;
    var ParentDOM = _c.getDocObject().parentNode;
    var FPDiv = document.createElement("div");
    FPDiv.setAttribute('width', canvas.getBounds().width);
    FPDiv.setAttribute('height', canvas.getBounds().height);
    FPDiv.style.position = "absolute";
    FPDiv.style.left = (canvas.getBounds().left) + "px";
    FPDiv.style.top = (canvas.getBounds().top) + "px";
    FPDiv.style.width = (canvas.getBounds().width) + "px";
    FPDiv.style.height = (canvas.getBounds().height) + "px";
    FPDiv.style.backgroundColor = "rgba(0,0,0,0.75)";

    var FPsize = {
        width: 820,
        height: 520
    };
    var FPFrame = document.createElement("iframe");
    FPFrame.setAttribute("ID", "FP_" + canvas.getID());
    FPFrame.setAttribute('width', FPsize.width);
    FPFrame.setAttribute('height', FPsize.height);
    FPFrame.setAttribute('frameborder', 0);
    FPFrame.setAttribute('marginheight', 0);
    FPFrame.setAttribute('marginwidth', 0);
    FPFrame.style.position = "absolute";
    FPFrame.style.left = (canvas.getBounds().width - FPsize.width) / 2 + "px";
    FPFrame.style.top = (canvas.getBounds().height - FPsize.height) / 2 + "px";
    FPFrame.style.width = FPsize.width + "px";
    FPFrame.style.height = FPsize.height + "px";
    FPFrame.style.overflow = "hidden";

    var FPClose = document.createElement("img");
    FPClose.style.position = "absolute";
    FPClose.style.margin = "0px";
    FPClose.style.padding = "0px";
    FPClose.setAttribute('src', $APP_PATH + "NotPacked/images/dialog/closebox.svg");
    FPClose.style.left = ((canvas.getBounds().width + FPsize.width) / 2 - 10) + "px";
    FPClose.style.top = ((canvas.getBounds().height - FPsize.height) / 2 - 20) + "px";
    FPClose.style.width = "30px";
    FPClose.style.height = "30px";
    FPClose.addEventListener('click', function(ev) {
        ParentDOM.removeChild(FPDiv);
    });

    FPDiv.appendChild(FPFrame);
    FPDiv.appendChild(FPClose);

    me.div = function() {
        return FPDiv;
    };

    me.id = function() {
        return ("FP_" + canvas.getID());
    };

    me.frame = function() {
        return FPFrame;
    };

    me.show = function() {
        ParentDOM.appendChild(FPDiv);
    };

    me.close = function() {
        ParentDOM.removeChild(FPDiv);
    };

}


function windowOpenIFrame(url) {
    var me = this;
    var FPDiv = document.createElement("div");
    FPDiv.setAttribute('width', window.innerWidth);
    FPDiv.setAttribute('height', window.innerHeight);
    FPDiv.style.position = "absolute";
    FPDiv.style.left = "0px";
    FPDiv.style.top = "0px";

    FPDiv.style.width = window.innerWidth + "px";
    FPDiv.style.height = window.innerHeight + "px";

    FPDiv.style.backgroundColor = "rgba(0,0,0,0.75)";

    var FPsize = {
        width: window.innerWidth - 50,
        height: window.innerHeight - 50
    };
    var FPFrame = document.createElement("iframe");
    //    FPFrame.setAttribute("ID", "FP_" + canvas.getID());
    FPFrame.setAttribute('width', FPsize.width);
    FPFrame.setAttribute('height', FPsize.height);
    FPFrame.setAttribute('frameborder', 0);
    FPFrame.setAttribute('marginheight', 0);
    FPFrame.setAttribute('marginwidth', 0);
    FPFrame.style.position = "absolute";
    FPFrame.style.left = (window.innerWidth - FPsize.width) / 2 + "px";
    FPFrame.style.top = (window.innerHeight - FPsize.height) / 2 + "px";
    FPFrame.style.width = FPsize.width + "px";
    FPFrame.style.height = FPsize.height + "px";
    FPFrame.style.overflow = "scroll";
    FPFrame.addEventListener('message', function(ev) {
        //        console.log("couosuuujrljsr");
    }, false);

    var FPClose = document.createElement("img");
    FPClose.style.position = "absolute";
    FPClose.style.margin = "0px";
    FPClose.style.padding = "0px";
    FPClose.setAttribute('src', $APP_PATH + "NotPacked/images/dialog/closebox.svg");
    FPClose.style.left = ((window.innerWidth + FPsize.width) / 2 - 10) + "px";
    FPClose.style.top = ((window.innerHeight - FPsize.height) / 2 - 20) + "px";
    FPClose.style.width = "30px";
    FPClose.style.height = "30px";
    FPClose.addEventListener('click', function(ev) {
        document.body.removeChild(FPDiv);
    });

    FPDiv.appendChild(FPFrame);
    FPDiv.appendChild(FPClose);

    me.div = function() {
        return FPDiv;
    };

    me.frame = function() {
        return FPFrame;
    };

    me.show = function() {
        document.body.appendChild(FPDiv);
    };

    me.close = function() {
        document.body.removeChild(FPDiv);
    };

    me.reload = function() {
        FPFrame.contentDocument.location.reload(true);
    };

    me.show();
    FPFrame.src = url;

}
function ExportPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var www = 450;
    var hhh = 300;
    var hidectrlpanel = true;
    var sel = -1;
    var btns = null;
    $U.extend(this, new CenterPanel(canvas, www, hhh));
    var JSZipReady = false;

    me.show();

    var close = function() {
        _closeProc();
        canvas.setNoMouseEvent(true);
    };

    var setText = function(_t) {
        textarea.setAttr("innerHTML", _t);
    };

    var setComment = function(_t) {
        comment.setAttr("innerHTML", _t);
    };

    var typeCallback = function(_val) {
        sel = _val;
        switch (_val) {
            case 0:
                setText(getSRC());
                var lnk = ($iOS_APPLICATION) ? "data-txt:" : "data:text/plain;base64,";
                lnk += $U.base64_encode(canvas.getSource());
                setComment($L.export_sourcecomment + '<br><br><a download="DGPad_file.txt" href="' + lnk + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_source_download + '</b></a>');
                break;
            case 1:
                setText(getHTMLJS());
                setComment($L.export_htmljscomment);
                break;
            case 2:
                setText(getHTML());
                setComment($L.export_htmlcomment);
                break;
            case 3:
                setText(getPAGE());
                setComment($L.export_htmlstandalonecomment);
                break;
            case 4:
                var svgsrc = canvas.exportSVG();
                var lnk = ($iOS_APPLICATION) ? "data-svg:" : "data:image/svg+xml,";
                lnk += ($iOS_APPLICATION) ? $U.base64_encode(svgsrc) : encodeURIComponent(svgsrc);
                setText(svgsrc);
                setComment($L.export_svgimage + '<br><br><a download="DgpadSvgImage.svg" href="' + lnk + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_svgimage2 + '</b></a>');
                break;
            case 5:
                canvas.loadZipPackage(iBookStuff);
                break;
        }
        if (!Object.touchpad)
            textarea.getDocObject().select();
    };

    var iBookStuff = function() {
        setText("");
        canvas.getiBookPlugin(hidectrlpanel, "", function(_c) {
            var url = window.URL.createObjectURL(_c);
            setComment($L.export_ibook + '<br><br><a download="iBookPlugin.zip" href="' + url + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_ibook2 + '</b></a>');
        });
    };

    var getHTML = function() {
        return canvas.getHTML(hidectrlpanel);
    };

    var getHTMLJS = function() {
        return canvas.getHTMLJS(hidectrlpanel);
    };

    var getSRC = function() {
        var s = canvas.getSource();
        return s;
    };

    var getPAGE = function() {
        var s = '<!DOCTYPE html>\n';
        s += '<html style="margin:0;padding:0;width:100%;height:100%;display: table">\n';
        s += '<head>\n';
        s += '<title></title>\n';
        s += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n';
        s += '</head>\n';
        s += '<body style="margin:0;padding:0;width:100%;height:100%;display: table;background-color:rgba(200,200,230,0.3)">\n';
        s += '<div style="display: table-cell;text-align: center;vertical-align: middle;">';
        s += '<div style="display: inline-block;text-align: left">';
        s += getHTMLJS() + '\n';
        s += '</div></div>';
        s += '</body>\n';
        s += '</html>';
        return s;
    };

    new CloseBox(me, close);


    var textarea_wrapper = new GUIElement(me, "div");
    textarea_wrapper.setStyles("position:absolute;background-color:rgba(0,0,0,1);left:10px;top:140px;right:10px;bottom:20px;resize:none;overflow:hidden");

    var textarea = new GUIElement(me, "textarea");
    textarea.setStyles("width:100%;height:100%;margin:0;border:0;wrap:on");
    textarea_wrapper.addContent(textarea);
    me.addContent(textarea_wrapper);

    btns = new ImageGroup(me.getDocObject(), 10, 10, www - 20, 40, $APP_PATH + "NotPacked/images/dialog/bgOff.svg", $APP_PATH + "NotPacked/images/dialog/bgOn.svg", typeCallback);
    btns.setImageSize(36);
    btns.setHspace(3);
    btns.addImage($APP_PATH + "NotPacked/images/dialog/download.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/htmljs.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/html.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/safari.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/svg.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/ibook.svg");

    var comment = new GUIElement(me, "div");
    comment.setStyles("position:absolute;background-color:#FEFEFE;font-size:12px;font-family:Helvetica, Arial, sans-serif;color:#252525;border: 1px solid #b4b4b4;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:5px;border-radius:10px");
    comment.setBounds(10, 60, www - 20, 70);
    setComment($L.export_standardcomment);
    me.addContent(comment);

    var addtoolsCBACK = function(_v) {
        hidectrlpanel = _v;
        typeCallback(sel);
    };

    var cbshowCS = new Checkbox(me.getDocObject(), 250, 15, 200, 30, hidectrlpanel, $L.export_istools, addtoolsCBACK);
    cbshowCS.setTextColor("#000000");

    setTimeout(function() {
        btns.select(0);
        typeCallback(0);
    }, 0);


}
function HistoryPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var width = canvas.getWidth() - 50;
    var height = $P.localstorage.iconwidth + 110;
    $U.extend(this, new CenterPanel(canvas, width, height));

    var closePanel = function() {
        canvas.setNoMouseEvent(true);
        _closeProc();
    }

    me.show();
    new CloseBox(me, closePanel);

    var wout = new GUIElement(me, "div");
    wout.setAbsolute();
    wout.setColor("rgba(0,0,0,0)");
    wout.setBounds(10, height - $P.localstorage.iconwidth - 90, width - 20, $P.localstorage.iconwidth + 50);
    wout.setStyle("overflow-x", "scroll");
    var d = wout.getDocObject();
    var mwheel = function(ev) {
        d.scrollLeft += $U.extractDelta(ev);
        ev.preventDefault();
    };
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    d.addEventListener(mousewheelevt, mwheel, false);

    var win = new GUIElement(me, "div");
    win.setAbsolute();
    win.setColor("rgba(0,0,0,0)");


    var winW = 0;
    for (var i = 1; i < ($P.localstorage.max + 1); i++) {
        if (localStorage.getItem($P.localstorage.base + i)) {
            winW += $P.localstorage.iconwidth + $P.localstorage.iconmargin;
            new HistoryPanel_Elt(win, canvas, i, _closeProc);
        }
    }
    win.setBounds(0, (wout.getBounds().height - $P.localstorage.iconwidth) / 2, winW, $P.localstorage.iconwidth);

    var com = new Label(me);
    com.setBounds(20, 0, width - 40, 30);
    com.setText("<p style='line-height:100%'>" + $L.history_title + "</p>");
    com.setStyles("font-size:18px;color:#222222");
    wout.addContent(win);
    me.addContent(wout);
    me.addContent(com);

    var exe = function(ev) {
        canvas.saveToLocalStorage();
        canvas.paint();
        _closeProc();
    }

    var add = new Button(me);
    add.setText("<span style='font-size:15px'>" + $L.history_save + "</span>");
    add.setBounds((width - 400) / 2, height - 35, 400, 30);
    add.addDownEvent(exe);
    me.addContent(add);
}

function HistoryPanel_Elt(_owner, _canvas, _i, _closeProc) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    var canvas = _canvas;
    var c = JSON.parse(localStorage.getItem($P.localstorage.base + _i));
    me.setStyles("position:absolute;border-radius:10px;border: 1px solid #b4b4b4");
    me.setStyle("left", ((_i - 1) * ($P.localstorage.iconwidth + $P.localstorage.iconmargin)) + "px");
    me.setStyle("width", $P.localstorage.iconwidth + "px");
    me.setStyle("height", $P.localstorage.iconwidth + "px");
    me.setColor("#FAFAFA");

    var load = function() {
        canvas.load64(c.src);
        _closeProc();
    }

    var img = new GUIElement(me, "img");
    img.setAttr("src", c.img);
    img.setAbsolute();
    img.setBounds(0, 0, $P.localstorage.iconwidth, $P.localstorage.iconwidth);

    me.addContent(img);

    var cloneBtn = new Button(me);
    cloneBtn.setStyles("line-height:27px;vertical-align: middle;padding: 2px;text-align: center;font: 14px Arial, Helvetica, sans-serif;border-radius: 5px;color: #252525;border: 1px solid #b4b4b4;background-color: #EEEEEE");
    //    cloneBtn.setStyles("display: inline-block;zoom: 1;*display: inline;vertical-align: baseline;margin: 0 2px;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 12px/100% Arial, Helvetica, sans-serif;padding: .5em 2em .55em;text-shadow: 0 1px 1px rgba(0,0,0,.3);-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);box-shadow: 0 1px 2px rgba(0,0,0,.2);color: #d7d7d7;border: solid 1px #333;background: #333;background: -webkit-gradient(linear, left top, left bottom, from(#666), to(#000));background: -moz-linear-gradient(top,  #666,  #000)");
    cloneBtn.setText($L.history_open);
    cloneBtn.setBounds(($P.localstorage.iconwidth - 100) / 2, $P.localstorage.iconwidth - 35, 100, 27);
    cloneBtn.addUpEvent(load);


    var dateLbl = new Label(me);
    dateLbl.setText(c.date);
    dateLbl.setStyle("color", "#999999");
    dateLbl.setBounds(0, 3, $P.localstorage.iconwidth, 30);

    var imgwp = new GUIElement(me, "div");
    imgwp.setBounds(10, 5, 28, 28);
    imgwp.setAbsolute();
    imgwp.setColor("rgba(0,0,0,0)");
    imgwp.setStyles("cursor: pointer");
    var setImage = function() {
        imgwp.clearContent();
        imgwp.addImage($APP_PATH + "NotPacked/images/history/" + ((c.lock) ? "lock.svg" : "unlock.svg"));
    };
    setImage();
    var changeLock = function() {
        if ((!c.lock) && $U.isFullLocalStorage()) {
            alert($L.history_full);
            return;
        }
        c.lock = !c.lock;
        localStorage.setItem($P.localstorage.base + _i, JSON.stringify(c));
        setImage();
    };
    imgwp.addDownEvent(changeLock);


    me.addContent(dateLbl);
    me.addContent(cloneBtn);
    me.addContent(imgwp);
    _owner.addContent(me);



}
function CalcManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var maincalc = null;
    var digitcalc = null;


    me.keypressed = function(ev) {
        var target = ev.target || ev.srcElement;
        maincalc.insertText(target.txt);
    };


    // On a cliqué sur l'icône Macro :
    me.showPanel = function() {
        if (!maincalc) {
            maincalc = new MainCalcPanel(me, canvas);
            digitcalc = new DigitCalcPanel(me, canvas);
        }
    };

    me.hidePanel = function() {
        if (maincalc) {
            maincalc.close();
            digitcalc.close();
            maincalc = null;
            digitcalc = null;
        }
    };

    me.getCustomKB = function() {
        return digitcalc;
    };

    me.activateBtns = function(_b) {
        digitcalc.activateBtns(_b);
    };

    me.edit = function(_obj) {
        maincalc.edit(_obj);
    };

}
function MainCalcPanel(_man, _canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var height = $P.CalcPanelHeight;
    var me = this;
    var man = _man;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var txtman = new CustomTexts(me);
    var scl = ($U.isMobile.mobilePhone()) ? $P.MobileScale - 0.05 : 1;
    var OBJ = null; // Objet à éditer
    var E1, E2, MIN, MAX;

    me.setAttr("className", "mainCalcPanel");
    //    me.setStyles("background: " + $U.browserCode() + "-linear-gradient(bottom, #9c9ba6, #57575f);box-shadow: inset 0 -1px 0 0 #bfbfbf;border-bottom: 1px solid #303236");
    me.transition("translate_y", 0.2, -height);

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };
    this.close = function() {
        me.cancel();
        E1.hide();
        E2.hide();
        MIN.hide();
        MAX.hide();
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
        txtman.close();
    };


    (function() {
        var t = me.getOwnerBounds();
        me.setBounds(0, 0, t.width, height);
    })();



    txtman.focus = function() {
        man.activateBtns(true);
        showBtns();
    };

    txtman.filterKB = function(_standardON) {
        //        console.log("filterKB");
        if (man.getCustomKB()) {
            if (_standardON)
                man.getCustomKB().close();
            else
                man.getCustomKB().show();
        }


    };

    var initInputs = function() {
        E1 = txtman.add("E =", 10, 6, 740 * scl, 22);
        E2 = txtman.add($L.calc_text, 10, 39, 740 * scl, 22);
        MIN = txtman.add("min =", 780 * scl, 6, 230 * scl, 22);
        MAX = txtman.add("max =", 780 * scl, 39, 230 * scl, 22);
        E1.show();
        E2.hide();
        MIN.hide();
        MAX.hide();
        me.addContent(E1);
        me.addContent(E2);
        me.addContent(MIN);
        me.addContent(MAX);

    }

    initInputs();

    var clearChangeFilters = function() {
        E1.setChangedFilter(function() {});
        E2.setChangedFilter(function() {});
        MIN.setChangedFilter(function() {});
        MAX.setChangedFilter(function() {});
    }

    var showKB = function() {
        txtman.showKB();
    }
    me.cancel = function() {
        txtman.deactiveAll();
        clearChangeFilters();
        if (OBJ) {
            if (editObj) {
                for (var i = 0; i < editObj.length; i++) {
                    editObj[i]();
                }
            } else {
                Cn.safelyDelete(OBJ);
                OBJ = null;
            }
            me.valid();
        }
    };
    me.valid = function() {
        txtman.deactiveAll();
        clearChangeFilters();
        E1.setText("");
        E2.setText("");
        MIN.setText("");
        MAX.setText("");
        E1.setLabel("E =");
        E2.setLabel($L.calc_text);
        MIN.setLabel("min =");
        MAX.setLabel("max =");
        E1.show();
        E2.hide();
        MIN.hide();
        MAX.hide();
        hideBtns();
        man.activateBtns(false);
        txtman.setFirst(true);
        setTimeout(function() {
            txtman.deactiveAll();
        }, 1);

        if ((OBJ) && (OBJ.getE1) && (OBJ.getE1().isDxyztFunc())) {
            OBJ.setE1(OBJ.getE1().get() + "(" + OBJ.getE1().value().getVars() + ")");
        }
        if (OBJ)
            OBJ.computeChilds();
        canvas.paint();
        OBJ = null;
        editObj = null;
    };

    var transformToList = function(_segs) {
        if (OBJ === null)
            return;
        OBJ.compute();
        var list = OBJ.getE1().getPointList();
        if (list.length > 0) {
            var LST = new ListObject(Cn, "_List", OBJ);
            LST.setSegmentsSize(_segs);
            canvas.addObject(LST);
            me.valid();
        } else {
            var o = new PointObject(Cn, "_P", 0, 0);
            o.setEXY(OBJ.getE1().getSource());
            canvas.addObject(o);
            o.compute();
            me.cancel();
            editObj = null;
        }
    };

    var transformToPoints = function() {
        transformToList(0);
    };

    var transformToSegments = function() {
        transformToList(1);
    };

    var transformToFunc = function() {
        if (OBJ === null)
            return;
        var vs = (OBJ.getE1().isDxyztFunc()) ? OBJ.getE1().value().getVars() : OBJ.getE1().getVars();
        var src = OBJ.getVarName() + "(" + vs + ")";
        var o = new CurvusObject(Cn, "_f", OBJ.getMinSource(), OBJ.getMaxSource(), src);
        o.setColor(OBJ.getColor().getRGBA());
        canvas.addObject(o);
        me.valid();
    };

    // All this messy global code because old android versions (<4.4) need 
    // an "a href" link to open the virtual keyboard... Beside, there were
    // a lot of focus problem to solve to unify behavior in various android
    // version :

    var set_href = function(_bool) {
        if ($U.isOldAndroid()) {
            if ($APPLICATION)
                var lnk = (_bool) ? "http://keyboardshow" : "http://keyboardhide";
            //            var lnk = (_bool) ? "http://www.google.fr" : "javascript:void(0)";
            else
                var lnk = (_bool) ? "javascript:$STANDARD_KBD.show()" : "javascript:void(0)";
            KBBtn.setAttr("href", lnk);
        } else {
            if (_bool) {
                KBBtn_img.removeDownEvent($STANDARD_KBD.hide);
                KBBtn_img.addDownEvent($STANDARD_KBD.show);
            } else {
                KBBtn_img.removeDownEvent($STANDARD_KBD.show);
                KBBtn_img.addDownEvent($STANDARD_KBD.hide);
            }
        }
    };


    $STANDARD_KBD.setbtn = function() {
        set_href(true);
    };
    $STANDARD_KBD.show = function() {
        var act = txtman.getActive();
        if (act !== null) {
            var inp = act.getInput();
            if (inp.style.getPropertyValue('visibility') !== "visible") {
                set_href(false);
                inp.style.setProperty('visibility', 'visible');
                txtman.filterKB(true);
                txtman.setKeyEvents(true);
                inp.value = act.getText();
                inp.focus();
                inp.setSelectionRange(act.getSel().getSelStart(), act.getSel().getSelEnd());
            }
        }
    };
    $STANDARD_KBD.hide = function() {
        var act = txtman.getActive();
        if (act !== null) {
            act.getInput().blur();
        }
    };
    var s_left = me.getBounds().width - 160;
    var s_top = 130;
    var bleft = me.getBounds().width - 250;
    var btop = 80;
    var bwidth = 40;
    var bgap = 25;

    var segBtn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToSegments, bleft - bwidth - bgap, btop, bwidth, bwidth);
    segBtn.addImage($APP_PATH + "NotPacked/images/tools/segment.svg");

    var pointBtn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToPoints, bleft, btop, bwidth, bwidth);
    pointBtn.addImage($APP_PATH + "NotPacked/images/tools/point.svg");

    var func1Btn = new ImageElt(me, "NotPacked/images/tools/bg_standard2.svg", transformToFunc, bleft, btop, bwidth, bwidth);
    func1Btn.addImage($APP_PATH + "NotPacked/images/tools/function.svg");
    bleft += bwidth + bgap;
    var validBtn = new ImageElt(me, "NotPacked/images/calc/valid.svg", me.valid, bleft, btop, bwidth, bwidth);
    // var validBtn = new ImageElt(me, "NotPacked/images/tools/function.svg", me.valid, bleft, btop, bwidth, bwidth);
    bleft += bwidth + bgap;
    var cancelBtn = new ImageElt(me, "NotPacked/images/calc/cancel.svg", me.cancel, bleft, btop, bwidth, bwidth);
    // var cancelBtn = new ImageElt(me, "NotPacked/images/tools/function.svg", me.cancel, bleft, btop, bwidth, bwidth);
    bleft += bwidth + bgap;

    var KBBtn = new GUIElement(me, "a");
    KBBtn.setStyles("position:absolute;border:3px");
    KBBtn.setBounds(bleft, btop + (bwidth - 30) / 2, 48, 30);
    var KBBtn_img = new ImageElt(KBBtn, "NotPacked/images/calc/keyboard.png", null, 0, 0, 48, 30);
    // var KBBtn_img = new ImageElt(KBBtn, "NotPacked/images/tools/function.svg", null, 0, 0, 48, 30);
    set_href(true);
    var doc = ($APPLICATION) ? window.parent.document.body : window.document.body;
    doc.appendChild(KBBtn.getDocObject());
    var deg_slider = null;

    var showDegSlider = function() {
        deg_slider = new slider(me.getDocObject(), s_left, s_top, 150, 50, 0, 1, 0, function(_v) {
            Cn.setDEG(_v === 1);
            Cn.computeAll();
            canvas.paint();
        });
        deg_slider.setDiscrete(true);
        deg_slider.setValueWidth(65);
        deg_slider.setFontSize(14);
        deg_slider.setHeights(14, 20);
        deg_slider.setBackgroundColor("rgba(0,0,0,0)");
        deg_slider.setLabel("RAD", 60);
        deg_slider.setTextColor("#252525");
        deg_slider.setTabValues([
            [0, "DEG"],
            [1, "DEG"]
        ]);
        deg_slider.setValue(1 * Cn.isDEG());
    };


    var showBtns = function() {
        validBtn.show();
        cancelBtn.show();
        KBBtn_img.show();
        showDegSlider();
    };
    var hideBtns = function() {
        segBtn.hide();
        pointBtn.hide();
        func1Btn.hide();
        validBtn.hide();
        cancelBtn.hide();
        KBBtn_img.hide();
        if (deg_slider)
            me.getDocObject().removeChild(deg_slider.getDocObject());
        deg_slider = null;
    };
    hideBtns();
    me.show();


    me.insertText = function(_st) {
        txtman.insertText(_st);
    };

    var setPointBtn = function() {
        if ((OBJ === null) || (OBJ.getCode() !== "expression") || (!OBJ.getE1()))
            return;
        var oneValidValue = OBJ.getE1().getValidValue();
        if (!oneValidValue)
            return;
        var v = OBJ.getE1().getVars().length;
        if ((v === undefined) || (v > 0))
            return;
        if (!$U.isArray(oneValidValue))
            return;
        if ($U.isPoint(oneValidValue) || $U.isPointArrayWithNaN(oneValidValue)) {
            pointBtn.show();
            if ($U.isPointArrayWithNaN(oneValidValue))
                segBtn.show();
        }
    };
    var setFuncBtn = function() {
        if ((OBJ === null) || (OBJ.getCode() !== "expression") || (!OBJ.getE1()))
            return;
        var oneValidValue = OBJ.getE1().getValidValue();

        if (!oneValidValue)
            return;
        if (($U.isArray(oneValidValue)) && (oneValidValue.length !== 2))
            return;
        var v = (OBJ.getE1().isDxyztFunc()) ? OBJ.getE1().value().getVars().length : OBJ.getE1().getVars().length;
        if ((v === undefined) || (v !== 1))
            return;
        func1Btn.show();
    };
    var mainFilter = function() {
        pointBtn.hide();
        segBtn.hide();
        func1Btn.hide();
        setPointBtn();
        setFuncBtn();
        if ((OBJ !== null) && (OBJ.getCode() === "function") && (OBJ.getE1())) {
            E1.setLabel(OBJ.getName() + "(" + OBJ.getE1().getVars() + ") =");
        }
        if ((OBJ !== null) && (OBJ.getCode() === "expression") && (OBJ.getE1()))
            OBJ.refresh();
        return;
    };

    var cFilter = function(_proc, _p1, _p2, _p3) {
        return function(_t) {
            _proc(_t, _p1, _p2, _p3);
            mainFilter();
            if (OBJ) {
                if (Cn.is3D())
                    Cn.computeAll();
                else {
                    OBJ.compute();
                    OBJ.computeChilds();
                }
            }
            canvas.paint();
        }
    }

    var editFilter = function(_proc, _p1, _p2, _p3) {
        return function() {
            _proc(_p1, _p2, _p3);
        }
    }

    me.createObj = function() {
        OBJ = new ExpressionObject(Cn, "_E", "", "", "", "", 50, 120);
        canvas.namesManager.setName(OBJ);
        OBJ.setT("");
        var r = Math.random() * 128;
        var g = Math.random() * 128;
        var b = Math.random() * 128;
        OBJ.setRGBColor(r, g, b);
        canvas.addObject(OBJ);
        E2.setPreferredKB(1);
        E1.setLabel(OBJ.getVarName() + " =");
        E2.setText(OBJ.getText());
        E1.setChangedFilter(cFilter(OBJ.setE1));
        E2.setChangedFilter(cFilter(OBJ.setT));
        MIN.setChangedFilter(cFilter(OBJ.setMin));
        MAX.setChangedFilter(cFilter(OBJ.setMax));
        E1.show();
        E2.show();
        MIN.show();
        MAX.show();
        Cn.compute();
        canvas.paint();
    }

    var editObj = null;
    me.edit = function(_obj) {
        if (OBJ !== null) {
            txtman.insertText(_obj.getVarName());
            txtman.nextCar();
        } else {
            OBJ = _obj;
            switch (OBJ.getCode()) {
                case "expression":
                    txtman.setFirst(false);
                    editObj = [editFilter(OBJ.setE1, OBJ.getE1().getSource().replace(/\\\"/g, "\"")),
                        editFilter(OBJ.setT, OBJ.getText()),
                        editFilter(OBJ.setMin, OBJ.getMinSource()),
                        editFilter(OBJ.setMax, OBJ.getMaxSource())
                    ];
                    E2.setPreferredKB(1);
                    var t = OBJ.getE1().getSource().replace(/\\/g, "");
                    E1.setText(t);
                    MIN.setText(OBJ.getMinSource());
                    MAX.setText(OBJ.getMaxSource());
                    E2.setText(OBJ.getText());
                    E1.show();
                    E2.show();
                    MIN.show();
                    MAX.show();
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    MIN.setChangedFilter(cFilter(OBJ.setMin));
                    MAX.setChangedFilter(cFilter(OBJ.setMax));
                    E2.setChangedFilter(cFilter(OBJ.setT));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(t.length, t.length);
                    break;
                case "list":
                    var _o = OBJ;
                    OBJ = null;
                    me.edit(_o.getEXP());
                    return;
                    break;
                case "function":
                    txtman.setFirst(false);
                    editObj = [editFilter(OBJ.setE1, OBJ.getE1().getSource()),
                        editFilter(OBJ.setMin, OBJ.getMinSource()),
                        editFilter(OBJ.setMax, OBJ.getMaxSource())
                    ];
                    E2.setPreferredKB(0);
                    E1.setText(OBJ.getE1().getSource());
                    MIN.setText(OBJ.getMinSource());
                    MAX.setText(OBJ.getMaxSource());
                    E1.show();
                    E2.hide();
                    MIN.show();
                    MAX.show();
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    MIN.setChangedFilter(cFilter(OBJ.setMin));
                    MAX.setChangedFilter(cFilter(OBJ.setMax));
                    E1.setLabel(OBJ.getName() + "(" + OBJ.getE1().getVars() + ") =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getE1().getSource().length, OBJ.getE1().getSource().length);
                    break;
                case "fixedangle":
                    txtman.setFirst(false);
                    var ex = OBJ.getExp();
                    editObj = [editFilter(OBJ.setE1, ex)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setE1));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getExp().length, OBJ.getExp().length);
                    break;
                case "circle1":
                    txtman.setFirst(false);
                    var ex = OBJ.getRX() ? OBJ.getRX().getSource() : OBJ.getR();
                    editObj = [editFilter(OBJ.setRX, ex)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    ex = OBJ.getRX() ? ex : Cn.coordsSystem.l(ex);
                    OBJ.setRX("" + ex);
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setRX));
                    E1.setLabel(OBJ.getName() + " =");
                    txtman.activate(E1);
                    E1.setSelectionRange(OBJ.getRX().getSource().length, OBJ.getRX().getSource().length);
                    break;
                case "point":
                    // Si le point est flottant ou n'est pas libre, on ne l'édite pas :
                    if ((!OBJ.getEXY()) && ((OBJ.getParentLength() > 0) || (OBJ.getFloat()))) {
                        OBJ = null;
                        return;
                    }
                    txtman.setFirst(false);
                    var ex = OBJ.getEXY() ? OBJ.getEXY().getSource() : OBJ.getX();
                    var ey = OBJ.getY();
                    editObj = [editFilter(OBJ.setEXY, ex, ey)];
                    E2.setPreferredKB(0);
                    E1.show();
                    E2.hide();
                    MIN.hide();
                    MAX.hide();
                    ex = OBJ.getEXY() ? ex : "[" + Cn.coordsSystem.x(ex) + "," + Cn.coordsSystem.y(ey) + "]";
                    OBJ.setEXY(ex);
                    E1.setText(ex);
                    E1.setChangedFilter(cFilter(OBJ.setEXY));
                    E1.setLabel("[X,Y] =");
                    txtman.activate(E1);
                    var t = "" + E1.getText() + "";
                    E1.setSelectionRange(t.length, t.length);
                    break;
                default:
                    OBJ = null;
                    break;
            }
            mainFilter();

        }

    }

}
function DigitCalcPanel(_man, _canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var man = _man;
    var canvas = _canvas;
    var btns = [];
    var width = canvas.getWidth();
    var scl = ($U.isMobile.mobilePhone()) ? $P.MobileScale - 0.02 : 1;

    me.setAttr("className", "digitCalcPanel");
    //    me.setStyles("background: " + $U.browserCode() + "-linear-gradient(top, #9c9ba6, #57575f);box-shadow: inset 0 1px 0 #bfbfbf;border-top: 1px solid #303236");

    //    me.setStyles("background: -webkit-linear-gradient(top, #9c9ba6, #57575f);margin: 20px auto;padding-top: 10px;box-shadow: inset 0 1px 0 #bfbfbf;border-top: 1px solid #303236;border-radius: 0 0 5px 5px");


    me.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };
    me.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            if (me.getDocObject().parentNode !== null) {
                canvas.getDocObject().parentNode.removeChild(me.getDocObject());
            }
        }, 300);
    };
    me.activateBtns = function(_b) {
        for (var i = 0, len = btns.length; i < len; i++) {
            btns[i].setEnabled(_b);
        }
    };

    (function() {
        var t = me.getOwnerBounds();
        me.setBounds(0, t.height - canvas.prefs.controlpanel.size - 190  * scl, width, 190 * scl);
    })();

    // var start = function() {
    //     var t = me.getOwnerBounds();
    //     console.log(me.getOwnerBounds());
    //     me.setBounds(0, t.height - canvas.prefs.controlpanel.size - 190  * scl, width, 190 * scl);
    // };
    // start();



    var gap = 10 * scl;
    var bgap = 10 * scl;

    var btnW = 35 * scl;
    var btnH = 35 * scl;
    var numBtnW = btnW * scl;
    // Pavé numérique :
    var numspad = new GUIElement(me, "div");
    numspad.setAbsolute();
    var pi = String.fromCharCode(0x03C0); // Juste pour tromper jscompress qui converti abusivement...
    var nums = ("|d|x|7|8|9|+_|" + pi + "|y|4|5|6|-_||z|1|2|3|*_||t|0|.|^|/").split("_");
    var g = 0;
    for (var i = 0; i < nums.length; i++) {
        if (nums[i].length === 0)
            g += bgap;
        else {
            var line = nums[i].split("|");
            for (var k = 0; k < line.length; k++) {
                if (line[k] !== "") {
                    var btn = new DigitBtn(me);
                    btn.setBounds(k * (btnW + gap), g, btnW, btnH);
                    btn.getDocObject().txt = line[k];
                    btn.setText(line[k]);
                    btn.addDownEvent(man.keypressed);
                    btn.setEnabled(false);
                    btns.push(btn);
                    numspad.addContent(btn);
                }
            }
            g += btnH + gap;
        }
    }
    var wNum = btnW * 7 + gap * 6;
    numspad.setBounds(me.getBounds().width - wNum - gap, gap, wNum, g);

    btnW = 35 * scl;
    btnH = 35 * scl;
    var funcpad = new GUIElement(me, "div");
    funcpad.setAbsolute();
    //    funcpad.setStyles("background-color:green");
    var fcts = "cos@|sin@|tan@|exp@|round@|mod@|x()_acos@|asin@|atan@|log@|floor@|arg@|y()_sqrt@|abs@|max@|min@|random@|conj@|d(,)".split("_");
    var h = 0;
    var line = "?|:|=|<|>|( )|[ ]|;|,|i".split("|");
    for (var k = 0; k < line.length; k++) {
        //        console.log(k);

        var btn = new DigitBtn(me);
        btn.setBounds(k * (btnW + gap), h, btnW, btnH);
        btn.setStyles("font-size:16px");
        btn.getDocObject().txt = line[k].replace("@", "(@)").replace("()", "(@)").replace("(,", "(@,");
        btn.setText(line[k].replace("@", ""));
        btn.addDownEvent(man.keypressed);
        btn.setEnabled(false);
        btns.push(btn);
        funcpad.addContent(btn);
    }
    var lim = 5;
    btnW = 64 * scl;
    var smallBtnW = 35 * scl;
    h += btnH + gap;

    for (var i = 0; i < fcts.length; i++) {
        if (fcts[i].length === 0)
            h += bgap;
        else {
            var line = fcts[i].split("|");
            var col = 0;
            for (var k = 0; k < line.length; k++) {
                var ww = btnW;
                if (k > lim)
                    ww = smallBtnW;
                var btn = new DigitBtn(me);
                btn.setBounds(col, h, ww, btnH);
                btn.setStyles("font-size:16px");
                btn.getDocObject().txt = line[k].replace("@", "(@)").replace("()", "(@)").replace("(,", "(@,");
                btn.setText(line[k].replace("@", ""));
                btn.addDownEvent(man.keypressed);
                btn.setEnabled(false);
                btns.push(btn);
                funcpad.addContent(btn);
                col += ww + gap;
            }
            h += btnH + gap;
        }
    }
    var wFunc = btnW * 6 + smallBtnW * 2 + gap * 7;
    funcpad.setBounds(gap, gap, wFunc, h);



    btnW = 80 * scl;
    btnH = 35 * scl;
    var cmdpad = new GUIElement(me, "div");
    cmdpad.setAbsolute();
    var cmds = "DEL|CLR_◀|▶".split("_");
    var m = 0;
    for (var i = 0; i < cmds.length; i++) {
        if (cmds[i].length === 0)
            m += bgap;
        else {
            var line = cmds[i].split("|");
            for (var k = 0; k < line.length; k++) {
                var btn = new DigitBtn(me);
                btn.setBounds(k * (btnW + gap), m, btnW, btnH);
                btn.setStyles("font-size:16px");
                btn.getDocObject().txt = "cmd_" + line[k];
                btn.setText(line[k]);
                btn.addDownEvent(man.keypressed);
                btn.setEnabled(false);
                btns.push(btn);
                cmdpad.addContent(btn);
            }
            m += btnH + gap;
        }
    }

    var wCmd = btnW * 2 + gap * 1;

    cmdpad.setBounds(wFunc + (me.getBounds().width - wFunc - wNum - wCmd + numBtnW + gap) / 2, me.getBounds().height - m, wCmd, m - gap);



    me.transition("scale", 0.2, g);
    me.addContent(numspad);
    me.addContent(funcpad);
    me.addContent(cmdpad);
    me.show();



}
function DigitBtn(_owner) {
    var me = this;
    $U.extend(this, new Button(_owner));
    //    me.setStyles("border-radius:5px;border:1px solid #58575e;font-family:Verdana;font-size:20px;font-weight:normal;color:#222;background:" + $U.browserCode() + "-linear-gradient(top, #eeeef0, #d3d3d9)");

    me.setStyles("background-color:#FAFAFA;text-align: center;font: 20px sans-serif;display: inline-block;border: 1px solid #b4b4b4;border-radius: 5px;" + $U.browserCode() + "-transition: all 0.1s ease-in-out");

    me.addDownEvent(function(ev) {
        me.setStyles("background-color:#d3d3d9");
    });

    me.addUpEvent(function() {
        me.setStyles("background-color:#FAFAFA");
    });

    me.setEnabled = function(_b) {
        me.getDocObject().disabled = !_b;
        me.setStyle("color", _b ? "#666" : "#999");
    };

}
function CustomTexts(_owner) {
    var me = this;
    var owner = _owner;
    var txts = [];
    var active_elt = null;
    var firstActivation = true;



    me.filterKB = function(_standardON) {};

    me.getActive = function() {
        return active_elt;
    };

    me.add = function(_lbl, _l, _t, _w, _h) {
        var txt = new CustomTextInput(me, owner, _lbl);
        txt.setBounds(_l, _t, _w, _h);
        //        owner.addContent(txt);
        txts.push(txt);
        return txt;
    };

    me.removeAll = function() {
        for (var i = 0; i < txts.length; i++) {
            if (txts[i].getDocObject().parentNode !== null)
                owner.removeContent(txts[i]);
        };
        owner.getDocObject().innerHTML = "";
        txts = [];
    };

    me.deactiveAll = function() {
        for (var i = 0; i < txts.length; i++) {
            txts[i].setActive(false);
        }
        active_elt = null;
    };

    me.close = function() {
        me.removeAll();
        window.removeEventListener("keypress", keypress, false);
        window.removeEventListener("keydown", keydown, false);
        window.removeEventListener("keyup", keyup, false);
    };

    me.focus = function() {};
    me.setFirst = function(_b) {
        firstActivation = _b;
    };

    me.activate = function(txt) {
        if (active_elt !== txt) {
            if (firstActivation) {
                owner.createObj();
                firstActivation = false;
            }
            me.deactiveAll();
            txt.setActive(true);
            active_elt = txt;
            me.focus();
        }
    };

    me.insertText = function(_st) {
        if (active_elt != null)
            active_elt.insertText(_st);
    };

    me.showKB = function() {
        if (active_elt != null)
            active_elt.showKB();
    };
    me.nextCar = function() {
        if (active_elt != null)
            active_elt.nextCar();
    };

    var maybesimplequote = false;

    var keypress = function(ev) {
        //        console.log("keypress");
        var key = ev.keyCode || ev.charCode;
        //        console.log("keypress=" + key);
        // Simple quote :
        if (maybesimplequote && (key === 39)) {
            me.insertText("'");
            ev.preventDefault();
            return false;
        };
        // Point décimal: 
        if (key === 46) {
            me.insertText(".");
            ev.preventDefault();
            return false;
        };
        if ((key === 8) || (key === 13) || (key === 27) || (key === 37) || (key === 39) || (key === 46))
            return;
        if (active_elt === null)
            return false;
        me.insertText(String.fromCharCode(key));
        ev.preventDefault();
        return false;
    };
    var keydown = function(ev) {
        //        console.log("keydown");
        maybesimplequote = false;
        if (active_elt === null)
            return false;
        var key = ev.keyCode || ev.charCode;
        //        console.log("keydown=" + key);
        switch (key) {
            case 8: //DEL
                active_elt.executeCommand("DEL");
                break;
            case 13: //ENTER
                owner.valid();
                break;
            case 27: //ESC
                owner.cancel();
                break;
            case 37: //LEFT
                active_elt.executeCommand("LEFT");
                break;
            case 39: //RIGHT
                active_elt.executeCommand("RIGHT");
                break;
            case 46: //CLR
                active_elt.executeCommand("CLR");
                break;
            case 52:
            case 222: //guillemet simple
                maybesimplequote = true;
                return true;
                //                me.insertText(String.fromCharCode(39));
                break;
            default:
                return true;
        }
        ev.preventDefault();
        return false;
    };

    var keyup = function(ev) {
        ev.preventDefault();
        return false;
    }


    me.setKeyEvents = function(_standardKB) {
        if (Object.touchpad)
            return;
        if (_standardKB) {
            window.removeEventListener("keypress", keypress, false);
            window.removeEventListener("keydown", keydown, false);
            window.removeEventListener("keyup", keyup, false);
        } else {
            window.addEventListener("keypress", keypress, false);
            window.addEventListener("keydown", keydown, false);
            window.addEventListener("keyup", keyup, false);
            window.addEventListener("paste", function(ev) {
                //                console.log(ev.clipboardData.getData('text/plain'));
                //                alert(ev.clipboardData.getData('text/plain'));
            }, false);
        }
    }
}
function CustomTextInput(_man, _ownerdiv, _lbl) {
    //    $U.extend(this, new GUIElement(_ownerdiv, "div"));
    $U.extend(this, new Panel(_ownerdiv.getDocObject()));
    this.setStyles("opacity:0");
    this.transition("opacity", 0.4);
    var me = this;
    var man = _man;
    var LabelWidth = 70;
    var bounds = {};
    var active = false;
    var click_on = false;
    var sel = new CustomTextSelection(me);
    var preferredKB = 0; // Clavier préféré : 0 pour custom, et 1 pour standard


    //-linear-gradient(top, #eeeef0, #d3d3d9)
    me.setStyles("position:absolute;border-radius:5px;border: 1px solid #b4b4b4;background-color:#FAFAFA");
    //    me.setStyles("background: " + $U.browserCode() + "-linear-gradient(top, #E1E3CD, #EFF2DA);text-shadow: 0 1px 0 #fff;display: inline-block");

    var isHidden = function() {
        return (parseInt(me.getStyle("opacity")) === 0);
    };
    this.show = function() {
        if (isHidden()) {
            me.applyTransitionIN();
            inp.addDownEvent(mousedown);
            inp.addUpEvent(mouseup, window);
            inp.addMoveEvent(mousemove);
        }
    };
    this.hide = function() {
        me.applyTransitionOUT();
        inp.removeDownEvent(mousedown);
        inp.removeUpEvent(mouseup, window);
        inp.removeMoveEvent(mousemove);
    };

    var mouseX = function(ev) {
        return (ev.pageX - bounds.left - lb.getDocObject().offsetWidth - 20);
    };

    var mousedown = function(ev) {
        man.activate(me);
        sel.mousedown(mouseX(ev));
        click_on = true;
    };

    var mouseup = function() {
        click_on = false;
    };

    var mousemove = function(ev) {
        if (click_on) {
            sel.mousemove(mouseX(ev));
        }
    };

    me.setPreferredKB = function(_kb) {
        preferredKB = _kb
    };

    me.setSelectionRange = function(_s, _e) {
        sel.setSelectionRange(_s, _e);
    };

    me.setActive = function(_b) {
        active = _b;
        sel.setActive();
        if ((!active) && (standard))
            standard.quit();
        if ((active) && (preferredKB === 1)) {
            me.showKB();
            if (standard)
                standard.getDocObject().setSelectionRange(0, 1000);
        }
        if ((active) && (preferredKB === 0))
            man.setKeyEvents(false);
    };

    me.isActive = function() {
        return active;
    };

    // Appelée à chaque fois que le texte change, quel
    // que soit le clavier choisi. A surcharger par setChangedFilter :
    var changedFilter = function(txt) {};
    me.setChangedFilter = function(_proc) {
        changedFilter = _proc;
    };


    var lb = new GUIElement(me, "div");
    var inp = new GUIElement(me, "div");
    var content = new GUIElement(me, "span");
    me.getInputDIV = function() {
        return inp;
    };
    me.getContentSPAN = function() {
        return content;
    };
    lb.setAttr("textContent", _lbl);
    lb.setStyles("position:absolute;left:20px;top:0px;width:" + LabelWidth + "px;background-color:rgba(0,0,0,0);padding-left:0px;font-family:Helvetica,Arial,sans-serif;font-size:18px;color:#666;outline-width:0px;border:0px;border-radius:0px");
    inp.setStyles("position:absolute;left:" + (LabelWidth + 20) + "px;z-index:1;overflow:hidden;background-color:rgba(0,0,0,0);border:0px;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left;vertical-align:middle;outline-width:0px;border-radius:0px;padding:0px");
    content.setStyles("background-color:rgba(0,0,0,0);white-space:nowrap;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left");
    var doc = inp.getDocObject();

    me.addContent(lb);
    me.addContent(sel);
    me.addContent(inp);

    var standard = null;
    setTimeout(function() {
        var doc = ($APPLICATION) ? window.parent.document.body : window.document.body;
        standard = new GUIElement(me, "input");
        var kb = standard.getDocObject();
        standard.hide();
        standard.setAttr("type", "text");
        var pos = $U.getElementOffset(lb.getDocObject());
        var stls = "left:" + (pos.left + lb.getDocObject().offsetWidth) + "px;";
        stls += "top:" + (pos.top + 1) + "px;";
        stls += "width:" + (bounds.width - 40 - lb.getDocObject().offsetWidth) + "px;";
        stls += "height:" + bounds.height + "px;";
        standard.setStyles(stls += "background-color:#FAFAFA;z-index:3;position:absolute;overflow:hidden;border:0px;font-family:Courier New, Courier, monospace;font-size:20px;text-align:left;vertical-align:middle;outline-width:0px;border-radius:0px;padding:0px");
        kb.onblur = function() {
            man.filterKB(false);
            man.setKeyEvents(false);
            me.setText(kb.value);
            if (active)
                sel.setSelectionRange(kb.selectionStart, kb.selectionEnd);
            standard.hide();
            setTimeout($STANDARD_KBD.setbtn, 5000);
        };
        kb.onkeydown = function(ev) {};
        kb.onkeyup = function(ev) {
            changedFilter(kb.value);
        };
        standard.quit = function() {
            kb.blur();
        };
        doc.appendChild(kb);
    }, 1);

    me.getInput = function() {
        return standard.getDocObject();
    };
    me.getSel = function() {
        return sel;
    };


    me.showKB = function() {};


    me.isStandardKB = function() {
        return (standard !== null);
    }

    me.setBounds = function(l, t, w, h) {
        bounds = {
            left: l,
            top: t,
            width: w,
            height: h
        };
        me.setStyles("left:" + l + "px;top:" + t + "px;width:" + w + "px;height:" + h + "px");
        lb.setStyles("height:" + h + "px;line-height:" + h + "px");
        inp.setBounds(LabelWidth + 20, 0, w - LabelWidth - 40, h);
        inp.setStyles("line-height:" + h + "px");
        sel.setStyles("height:" + (h - 4) + "px");

        // Tout ceci pour mesurer la largeur d'un caractère :


        content.setAttr("textContent", "abcdefghijklmnopqrstuvwxyz");
        content.setStyles("margin-left:0px")
        me.addContent(content);
        setTimeout(function() {
            sel.setCarLength(content.getDocObject().offsetWidth / 26);
            sel.setOffset(lb.getDocObject().offsetWidth + 20);
            content.setAttr("textContent", "");
            me.removeContent(content);
            inp.addContent(content);
        }, 1);
    };

    me.setLabel = function(_l) {
        lb.setAttr("textContent", _l);

        //        me.setBounds(bounds.left, bounds.top, bounds.width, bounds.height);
        //        setTimeout(function() {
        //            sel.setSelectionRange(0, 0);
        //        }, 1);

    };

    me.setText = function(txt) {
        content.setAttr("textContent", txt);
        changedFilter(txt);
    };
    me.getText = function() {
        return content.getAttr("textContent");
    };
    me.insertText = function(_st) {
        if (!active)
            return;
        sel.insertText(_st);
    };
    me.nextCar = function() {
        sel.nextCar();
    };
    me.executeCommand = function(_st) {
        sel.executeCommand(_st);
    }
}



function CustomTextSelection(_ti) {
    $U.extend(this, new GUIElement(_ti, "div"));
    var me = this;
    var ti = _ti;
    var offsetX = 0;
    var clickpos = NaN,
        selStart = NaN,
        selEnd = NaN,
        selStartX = NaN,
        selEndX = NaN;
    var blinkvar = NaN;
    var ONECAR = NaN;
    var marginOffsetX = 0;

    me.setStyles("pointer-events:none;z-index:2;visibility:hidden;position:absolute;background-color:blue;left:0px;top:2px;width:3px");
    me.setOffset = function(_x) {
        offsetX = _x;
    };

    var setMarginOffset = function() {
        if (selStartX > ti.getInputDIV().getBounds().width) {
            marginOffsetX = ti.getInputDIV().getBounds().width - selStartX;
            ti.getContentSPAN().setStyles("margin-left:" + marginOffsetX + "px");
        } else {
            ti.getContentSPAN().setStyles("margin-left:0px");
            marginOffsetX = 0;
        }
    }

    var display = function(_withOffset) {
        if (_withOffset)
            setMarginOffset();
        if (isNaN(selStart)) {
            clearInterval(blinkvar);
            blinkvar = NaN;
            me.setStyles("visibility:hidden;left:" + (offsetX + marginOffsetX) + "px;width:0px");
        } else {
            if (selStart === selEnd) {
                if (isNaN(blinkvar)) {
                    me.setStyle("visibility", "visible");
                    blinkvar = setInterval(blink, 500);
                }
                me.setStyles("background-color:rgba(0,0,255,1);left:" + (selStartX + offsetX + marginOffsetX) + "px;width:3px");
            } else {
                clearInterval(blinkvar);
                blinkvar = NaN;
                me.setStyles("visibility:visible;background-color:rgba(0,0,255,0.2);left:" + (selStartX + offsetX + marginOffsetX) + "px;width:" + (selEndX - selStartX) + "px");
            }
        }
        //        console.log("display:" + selStartX); 
    };
    var blink = function() {
        if (me.getStyle("visibility") === "hidden")
            me.setStyle("visibility", "visible");
        else
            me.setStyle("visibility", "hidden");
    };

    me.setHide = function(_h) {
        if (_h)
            me.setStyle("display", "none");
        else {
            me.setStyle("display", "inline");
            me.setStyle("visibility", "visible");
            //            console.log("show !!!");
        }

    }

    me.nextCar = function() {
        if (selStart < ti.getText().length) {
            selStart++;
            selStartX = ONECAR * selStart;
            selEnd = selStart;
            selEndX = selStartX;
            clickpos = selStart;
            display(true);
        }
    };
    me.getSelStart = function() {
        return selStart;
    };
    me.getSelEnd = function() {
        return selEnd;
    };
    me.setSelectionRange = function(_start, _end) {
        selStart = _start;
        selStartX = ONECAR * selStart;
        selEnd = _end;
        selEndX = ONECAR * selEnd;
        clickpos = selStart;
        display(true);
    };
    me.setCarLength = function(x) {
        ONECAR = x;
    };
    me.getCarLength = function() {
        return ONECAR;
    }
    me.mousedown = function(x) {
        if (!ti.isActive())
            return;
        x = x - marginOffsetX;
        selStart = Math.round(x / ONECAR);
        if (selStart > ti.getText().length)
            selStart = ti.getText().length;
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        display(false);
    };
    me.mousemove = function(x) {
        if (!ti.isActive())
            return;
        x = x - marginOffsetX;
        var xpos = Math.round(x / ONECAR);
        if (xpos < 0)
            xpos = 0;
        selStart = Math.min(xpos, clickpos);
        selEnd = Math.max(xpos, clickpos);
        if (selEnd > ti.getText().length)
            selEnd = ti.getText().length;
        selStartX = ONECAR * selStart;
        selEndX = ONECAR * selEnd;
        display(false);
    };

    me.setActive = function() {
        if (!ti.isActive()) {
            selStart = NaN, selEnd = NaN, selStartX = NaN, selEndX = NaN;
            display(true);
        }
    };

    me.getText = function() {
        return (ti.getText().substring(selStart, selEnd));
    };

    me.executeCommand = function(_st) {
        switch (_st) {
            case "DEL":
                if (selStart > 0) {
                    var s = ti.getText();
                    if (selStart === selEnd) {
                        var before = s.slice(0, selStart - 1);
                        var after = s.slice(selEnd);
                    } else {
                        var before = s.slice(0, selStart);
                        var after = s.slice(selEnd);

                    }
                    ti.setText(before + after);
                    selStart = before.length;
                    //                    selStart--;
                }
                break;
            case "CLR":
                ti.setText("");
                selStart = 0;
                break;
            case "LEFT":
                if (selStart > 0)
                    selStart--;
                break;
            case "RIGHT":
                if (selStart < ti.getText().length)
                    selStart++;
                break;
        }
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        me.setStyle("visibility", "visible");
        display(true);
    }

    var command = function(_st) {
        if (_st.indexOf("cmd_") !== 0)
            return false;
        _st = _st.replace("cmd_", "");
        switch (_st) {
            case "DEL":
                me.executeCommand("DEL");
                break;
            case "CLR":
                me.executeCommand("CLR");
                break;
            case "◀":
                me.executeCommand("LEFT");
                break;
            case "▶":
                me.executeCommand("RIGHT");
                break;
        }
        return true;
    };

    var particularCases = function(_st) {
        var s = ti.getText();
        var before = s.slice(0, selStart);
        var middle = s.substring(selStart, selEnd);
        var after = s.slice(selEnd);
        switch (_st) {
            case "( )":
                ti.setText(before + "(" + middle + ")" + after);
                selStart += (middle.length === 0) ? 1 : middle.length + 2;
                return true;
                break;
            case "[ ]":
                ti.setText(before + "[" + middle + "]" + after);
                selStart += (middle.length === 0) ? 1 : middle.length + 2;
                return true;
                break;
        }
        return false;
    };

    me.insertText = function(_st) {
        if (!command(_st)) {
            if (!particularCases(_st)) {
                var s = ti.getText();
                var before = s.slice(0, selStart);
                var middle = s.substring(selStart, selEnd);
                var after = s.slice(selEnd);
                if (_st.indexOf("@") === -1) {
                    middle = _st;
                    selStart += _st.length;
                } else {
                    var empty = (middle === "");
                    middle = _st.replace("@", middle);
                    selStart += empty ? middle.length - (_st.length - _st.indexOf("@") - 1) : middle.length;
                }
                ti.setText(before + middle + after);
            }
        }
        selStartX = ONECAR * selStart;
        selEnd = selStart;
        selEndX = selStartX;
        clickpos = selStart;
        me.setStyle("visibility", "visible");
        display(true);
    };


}
function BlocklyObjects(_object, _construction) {
    var Cn = _construction;
    var OBJ = _object;
    var MODE = [];
    var current;

    var obj = {};


    this.setMode = function(_tab, _cur) {
        MODE = _tab;
        obj = {};
        for (var i = 0; i < MODE.length; i++) {
            obj[MODE[i]] = new BlocklyObject(this, Cn);
        };
        current = _cur;
    };

    this.getMode = function() {
        return MODE;
    };

    this.isEmpty = function() {
        for (var i = 0; i < MODE.length; i++) {
            if (obj[MODE[i]].getXML()) return false;
        };
        return true;
    };

    var renameField = function(_str, _old, _new, _block, _fname) {
        // J'ai appris ici le litteral negative lookaround. La partie "(.(?!<block))*" signifie
        // qu'on accepte tout sauf la chaine littérale "<block" dans le match :
        var regex = new RegExp("(<(?:block|shadow) type=\"" + _block + "\"[^>]*>(.(?!<block))*<field name=\"" + _fname + "\">)(" + _old + ")(<\/field>)", "g")
        return _str.replace(regex, function(m, _a, _b, _c, _d) {
            return _a + _new + _d;
        });
    };

    var renameCode = function(_str, _old, _new, _func) {
        var regex = new RegExp("(" + _func + "\\\(\\\")(" + _old + ")(\\\")", "g");
        return _str.replace(regex, function(m, _a, _b, _c) {
            return  (_a + _new + _c)
        });
    };



    this.rename = function(_old, _new) {
        for (var i = 0; i < MODE.length; i++) {
            var m = MODE[i];
            // console.log()
            if (obj[m].getXML()) {
                // console.log(obj[m].getXML());
                var newXML = renameField(obj[m].getXML(), _old, _new, "turtle_length", "NAME");
                newXML = renameField(newXML, _old, _new, "turtle_get", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_point_short", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_object_short", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_point_short_turtle", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_coordinate", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_set_object", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_get_object", "NAME");
                newXML = renameField(newXML, _old, _new, "dgpad_style_fix", "OBJECT");
                obj[m].setXML(newXML);

                var newCODE = renameCode(obj[m].getCode().replace(/\\\"/g,'"'), _old, _new, "TURTLE_GET");
                newCODE = renameCode(newCODE, _old, _new, "TURTLE_LENGTH");
                newCODE = renameCode(newCODE, _old, _new, "TURTLE_INIT");
                obj[m].setCode(newCODE);
            }
        }
    }

    this.getCn = function() {
        return Cn
    };

    this.getObj = function() {
        return OBJ;
    };

    this.clear = function() {
        for (myobj in obj) {
            myobj.setSource(null, null, null);
        }
    };

    this.setCurrent = function(_c) {
        current = _c;
    };

    this.getCurrent = function() {
        return current;
    };

    this.getCurrentObj = function() {
        return obj[current];
    };

    this.getCurrentXML = function() {
        return obj[current].getXML();
    };

    this.get = function(_m) {
        return obj[_m]
    };

    this.getXML = function(_m) {
        return obj[_m].getXML();
    };

    this.getSNC = function(_m) {
        return obj[_m].getSNC();
    };

    this.setChilds = function(_m, _childs) {
        obj[_m].setChilds(_childs);
    };

    this.setParents = function(_m, _childs) {
        obj[_m].setParents(_childs);
    };

    this.evaluate = function(_m) {
        if (obj[_m]) obj[_m].evaluate()
    };

    // Called on each workspace change (and load time) :
    this.setBehavior = function(_m, _xml, _sync, _async) {
        obj[_m].setBehavior(_m, _xml, _sync, _async)
    };

    this.getSource = function() {
        var src = {};
        for (var i = 0; i < MODE.length; i++) {
            var m = MODE[i];
            if (obj[m].getXML()) {
                src[m] = {};
                src[m]["xml"] = obj[m].getXML();
                src[m]["sync"] = obj[m].getSNC();
                var tab = obj[m].getChilds();
                if (tab.length > 0) src[m]["childs"] = tab;
                tab = obj[m].getParents();
                if (tab.length > 0) src[m]["parents"] = tab;
            }
        };
        src["current"] = current;
        return JSON.stringify(src);
    };

    this.setSource = function(_src) {
        for (var i = 0; i < MODE.length; i++) {
            if (_src.hasOwnProperty(MODE[i])) {
                var m = MODE[i];
                obj[m].setBehavior(m, _src[m]["xml"], _src[m]["sync"], null);
                if (_src[m].hasOwnProperty("childs")) obj[m].setChilds(_src[m]["childs"]);
                if (_src[m].hasOwnProperty("parents")) obj[m].setParents(_src[m]["parents"]);
            }
        };
        current = _src["current"];
    };

}

function BlocklyObject(_owner, _construction) {
    var Cn = _construction;
    var EX = null;
    var EXP = null;
    var OWN = _owner;
    var type = null;
    var xml = null;
    var sync = null;
    var async = null;
    var childs = {};
    var parents = {};

    var setEX = function(_cod) {
        EX = Expression.delete(EX);
        if (_cod) {
            EX = new Expression(OWN, _cod);
            Expression.delete(EX);
        }
    }

    this.getCode = function() {
        if (EX) {
            return EX.getSource()
        } else if (EXP) {
            return EXP.getExpression()
        }
        return ""
    }

    this.setCode = function(_cod) {
        if (type === "onlogo") {
            var startpt = OWN.getObj().getVarName();
            EXP = Cn.getTurtleExpression(startpt);
            EXP.setExpression(_cod);
            setEX(null);
            // var SNC = "";
            _cod.replace(/var .*\nTURTLE_INIT.*\n((?:.*\n)*)return TURTLE_RESULT.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        } else if (type === "oncompute") {
            EXP = OWN.getObj();
            EXP.setExpression(_cod);
            setEX(null);
            // var SNC = "";
            _cod.replace(/var .*\n((?:.*\n)*)};\nbl_.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        } else {
            EXP = null;
            setEX(_cod);
            // var SNC = "";
            _cod.replace(/var .*\n((?:.*\n)*)};\nbl_.*/, function(m, _a) {
                sync = _a
            });
            // this.setSNC(SNC);
        }
    }


    this.getXML = function() {
        return xml;
    };

    this.setXML = function(_xml) {
        xml = _xml
    };

    this.getSNC = function() {
        return sync;
    };

    this.setSNC = function(_snc) {
        sync = _snc;
    };

    this.setBehavior = function(_m, _xml, _sync, _async) {
        type = _m;
        xml = _xml;
        // console.log("_m=" + _m + "\n_xml=" + _xml + "\n_sync=" + _sync);
        if (xml === null) {
            sync = null;
            async = null;
            setEX(null);
            if (type === "oncompute") OWN.getObj().setExpression("NaN");
            if (type === "onlogo") Cn.removeTurtleExpression(OWN.getObj().getVarName());
        } else {
            // Effacement de toutes les déclarations var que fait
            // blockly automatiquement :
            // sync = _sync.replace(/^\s*var\s*\w+\s*;/gm, "").trim();
            sync = _sync.replace(/^\s*var\s*\w+(\s*,\s*\w+)*;/gm, "").trim();
            // console.log("SYNC="+sync);
            async = _async;
            var cod = "";
            if (type === "onlogo") {
                Cn.setDEG(true);
                var startpt = OWN.getObj().getVarName();
                EXP = Cn.createTurtleExpression(startpt);

                // Entier aléatoire entre 1 et 1 000 000 000 :
                var rand = (Math.floor(Math.random() * (Math.abs(1 - 1000000000) + 1) + (1 + 1000000000 - Math.abs(1 - 1000000000)) / 2));

                var fname = "bl_" + $U.number2letter(rand.toString());
                cod += "var " + fname + "=function(){\n";

                cod += "TURTLE_INIT(\"" + startpt + "\"," + startpt + ");\n";
                cod += sync;
                cod += "\nreturn TURTLE_RESULT()";

                cod += "\n};\n" + fname + "()";

                EXP.setExpression(cod);
                setEX(null);
                // console.log("CODE TORTUE = "+cod);
            } else {
                var fname = "bl_" + $U.number2letter(Date.now().toString());
                cod = "var " + fname + "=function(){\n";
                cod += sync;
                cod += "\n};\n" + fname + "()";
                if (type === "oncompute") {
                    EXP = OWN.getObj();
                    EXP.setExpression(cod);
                    // console.log("CODE="+cod);
                    setEX(null);
                } else {
                    setEX(cod);
                }
            }
        }
    };


    this.evaluate = function() {
        if (EX) {
            EX.forcevalue();
            for (var o in childs) {
                childs[o].compute();
                childs[o].computeChilds();
            }
        }
    };

    this.setChilds = function(_childs) {
        childs = {};
        for (var i = 0; i < _childs.length; i++) {
            var o = Cn.findVar(_childs[i]);
            if ((o === undefined) ||
                (o.getVarName() === OWN.getObj().getVarName())) continue;
            childs[o.getVarName()] = o;
        }
    };

    this.getChilds = function() {
        var ch = [];
        for (var o in childs) {
            ch.push(o);
        }
        return ch;
    };

    this.setParents = function(_parents) {
        parents = {};
        for (var i = 0; i < _parents.length; i++) {
            var o = Cn.findVar(_parents[i]);
            if ((o === undefined) ||
                (o.getVarName() === OWN.getObj().getVarName())) continue;
            parents[o.getVarName()] = o;
        }
    };

    this.getParents = function() {
        var ch = [];
        for (var o in parents) {
            ch.push(o);
        }
        return ch;
    };


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function VirtualPointObject(_x, _y) {
    var X = _x;
    var Y = _y;
    var alpha = 0;
    var is_3D = false;


    this.getX = function() {
        return X;
    };

    this.getY = function() {
        return Y;
    };

    this.setXY = function(x, y) {
        X = x;
        Y = y;
    };

    this.setAlpha = function(_a) {
        alpha = _a;
    };

    this.getAlpha = function() {
        return alpha;
    };

    this.near = function(_x, _y) {
        return ((Math.abs(X - _x) < 1E-10) && (Math.abs(Y - _y) < 1E-10));
    };

    this.is3D = function() {
        return is_3D;
    };

    this.set3D = function(_b) {
        is_3D = _b;
    };

};
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
    var hidden = 0; // 0:normal ; 1:hidden ; 2:super hidden
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
    var paintorder = serial; // numéro d'ordre dans la construction (le plus grand recouvre le plus petit)
    //    var shouldComputeChilds = false;
    var floatObj = false; // Pour les points flottants

    var magnets = []; // Tableau multidimentionnel des objets magnétiques 
    // a[i][0] : objet et a[i][1] : rayon

    var blocklies = {}; // Objet contenant tous les programmes graphiques liés à l'objet


    var parentList = []; // Tableau des objets parents
    var childList = []; // Tableau des objets enfants
    var is_3D = false;

    this.Flag = false; // For various construction process
    this.Flag2 = false; // For various construction process
    this.Scratch = 0; // For various construction process

    var dragPoints = null;
    var dragCoords, freeDragPts, PtsChilds;

    var timestamp = 0;

    // var blockObj = null; // Blocky object


    // Pour un essai sur l'introspection dans les expressions :
    // this.getObject = function() {
    //     return this;
    // }

    // this.getMe=function(){
    //     return this;
    // }



    // **************************************************
    // ***************** BLOCKLY PART *******************
    // **************************************************

    // objet contenant la représentation xml,
    // le code sync et le code async de blockly :
    this.blocks = new BlocklyObjects(this, Cn);
    this.setExpression = function() {};
    this.getRoot = function() {
        return me;
    };

    // **************************************************
    // *************** END BLOCKLY PART *****************
    // **************************************************




    this.newTimeStamp = function() {
        var d = new Date()
        timestamp = d.getTime();
    }
    this.setTimeStamp = function(_millis) {
        timestamp = _millis;
    }
    this.getTimeStamp = function() {
        return timestamp;
    }

    this.isAnimationPossible = function() {
        return false;
    }


    // ************************* CHANTIER ****************************
    // On remplace les dépendances pour le déplacement des objets
    // construits, avec une expression du type P2.setDragPoints([A.me(),B.me()])

    this.initDragPoints = function() {
        if (dragPoints === null)
            dragPoints = Cn.findFreePoints(this);
    }

    this.getDragPoints = function() {
        return dragPoints;
    }


    this.add_removeDragPoint = function(_o) {
        var i = dragPoints.indexOf(_o);
        if (i > -1)
            dragPoints.splice(i, 1);
        else
            dragPoints.push(_o);
    }

    this.setDragPoints = function(_d) {
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





    var PtsChildSortFilter = function(a, b) {
        return (b.getChildLength() - a.getChildLength());
    };



    this.startDrag = function(_x, _y) {
        if ((Cn.isDragOnlyMoveable()) && (!this.isMoveable())) return;
        $U.changed();
        PtsChilds = [];
        dragCoords = [];
        this.dragTo = (Cn.is3D()) ? this.dragTo3D : this.dragTo2D;
        freeDragPts = (dragPoints === null) ? Cn.findFreePoints(this) : dragPoints;
        if (freeDragPts.length > 0) {
            for (var k = 0, len = freeDragPts.length; k < len; k++) {
                PtsChilds = PtsChilds.concat(freeDragPts[k].getChildList());
                dragCoords.push({
                    x: _x,
                    y: _y
                });
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
            dragCoords.push({
                x: _x,
                y: _y
            });
        }
    };

    this.compute_dragPoints = function(_x, _y) {
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
                // freeDragPts[i].blockDrag(freeDragPts[i].getX(), freeDragPts[i].getY());
            }
        } else {
            Cn.translate(_x - dragCoords[0].x, _y - dragCoords[0].y);
            dragCoords[0].x = _x;
            dragCoords[0].y = _y;
            Cn.computeAll();
        }
        // if (this.ondrag) this.ondrag.value();
        // console.log(this.getName());
    };


    this.dragTo2D = function(_x, _y) {
        if ((Cn.isDragOnlyMoveable()) && (!this.isMoveable())) return;
        this.compute_dragPoints(_x, _y);
        for (var i = 0, len = PtsChilds.length; i < len; i++) {
            PtsChilds[i].compute();
        }
    };

    this.dragTo3D = function(_x, _y) {
        this.dragTo2D(_x, _y);
        Cn.computeMagnetObjects();
        this.checkMagnets();
        Cn.computeAll();
        Cn.computeAll();
    };

    this.dragTo = (Cn.is3D()) ? this.dragTo3D : this.dragTo2D;


    this.is3D = function() {
        return is_3D;
    };

    this.set3D = function(_b) {
        is_3D = _b;
    };

    var addAsChild = function(_child, _parent) {
        if (!_parent.addChild ||
            (_child.isChild(_parent)) ||
            (_child === _parent) ||
            (_parent.isChild(_child)))
            return;
        // console.log("parent :" + _parent.getName() + "  enfant :" + _child.getName());
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

    this.isChild = function(_o) {
        return (_o.getChildList().indexOf(this) !== -1);
    };

    this.logChildList = function() {
        console.log("** CHILDS of " + this.getName());
        for (var i = 0; i < childList.length; i++) {
            console.log("childList[" + i + "] = " + childList[i].getName());
        }
    };

    // var childlistOrderFilter = function(a, b) {
    //     return (b.getChildLength() - a.getChildLength());
    // }

    this.orderChildList = function() {
        childList.sort(PtsChildSortFilter);
    };

    this.getChildList = function() {
        return childList;
    };

    this.getChildLength = function() {
        return childList.length;
    };

    this.addChild = function(_o) {
        //        console.log("addChild : "+_o.getName());
        if (childList.indexOf(_o) === -1)
            childList.push(_o);
    };
    this.getChildAt = function(_i) {
        return childList[_i];
    };

    this.clearChildList = function() {
        childList.length = 0;
    };
    //    this.addChild = function(_o) {
    //        childList.push(_o);
    //    };

    this.deleteChild = function(_o) {
        var i = childList.indexOf(_o);
        if (i !== -1) {
            childList.splice(i, 1);
        }
    };

    this.computeChilds = function() {
        // console.log(this.getName());
        // if (childList.length) console.log("****** "+childList.length);
        for (var i = 0; i < childList.length; i++) {
            //            console.log(childList[i].getName());
            childList[i].compute();
        }
    };

    this.refreshChildsNames = function() {
        //        console.log("refreshChildsNames ="+childList.length);
        Cn.doOrder(childList);
        for (var i = 0; i < childList.length; i++) {
            childList[i].refreshNames();
        }
    };

    // Uniquement pour les objets contenant une expression
    // Il s'agit de rafraîchir les noms utilisés dans l'expression :
    this.refreshNames = function() {};

    this.setParentList = function(_p) {
        parentList = _p;
        // console.log(this.getName() + " : " + parentList);
        for (var i = 0, len = parentList.length; i < len; i++) {
            addAsChild(this, parentList[i]);
            is_3D = (is_3D) || (parentList[i].is3D());
        }
        if (parentList.length === 0 && this.getCode() === "point")
            is_3D = false;
    };

    this.logParentList = function() {
        console.log("** PARENTS of " + this.getName());
        for (var i = 0; i < parentList.length; i++) {
            console.log("parentList[" + i + "] = " + parentList[i].getName());
        }
    };


    this.setParent = function() {
        parentList = Array.prototype.slice.call(arguments, 0);
        // console.log(this.getName() + " : " + parentList);
        //        console.log(parentList.length+" nom:"+this.getName());
        for (var i = 0, len = parentList.length; i < len; i++) {
            //            console.log("me="+this.getName()+"  parent="+parentList[i].getName());
            addAsChild(this, parentList[i]);
            is_3D = (is_3D) || (parentList[i].is3D());
        }
        if (parentList.length === 0 && this.getCode() === "point")
            is_3D = false;
    };

    // Appelé notamment par la methode "pe" (parse expression)
    // de l'Interpreter javascript :
    this.addParent = function(_o) {
        // Pour éviter les références circulaires : si this
        // est un parent de _o, _o ne peut pas être un parent
        // de this :
        if ((this.isParent(_o))) return;
        parentList.push(_o);
        addAsChild(this, _o);
        is_3D = (is_3D) || (_o.is3D());
    };
    this.getParent = function() {
        return parentList;
    };
    this.isParent = function(_o) {
        return (_o.getParent().indexOf(this) !== -1);
    };
    this.getParentLength = function() {
        return parentList.length;
    };
    this.getParentAt = function(_i) {
        return parentList[_i];
    };
    this.deleteParent = function(_o) {
        var i = parentList.indexOf(_o);
        if (i !== -1) {
            parentList.splice(i, 1);
        }
    };

    this.redefine = function() {};

    this.setMagnets = function(_tab) {
        magnets = _tab;
    };

    this.getMagnet = function(_o) {
        for (var i = 0; i < magnets.length; i++) {
            if (magnets[i][0] === _o)
                return magnets[i];
        }
        return null;
    };

    this.addMagnet = function(_o, _n) {
        var m = this.getMagnet(_o);
        if (m === null) {
            m = [_o, _n];
            magnets.push(m);
        }
        return m;
    };

    this.removeMagnet = function(_o) {
        var m = this.getMagnet(_o);
        if (m !== null) {
            magnets.splice(magnets.indexOf(m), 1);
        }
    };

    this.getMagnets = function() {
        return magnets;
    };

    this.checkMagnets = function() {};

    this.computeMagnets = function() {};
    // Pour les points sur polygones ;
    this.setOnBoundary = function(_b) {
        onbounds = _b;
    };
    this.getOnBoundary = function() {
            return onbounds;
        }
        // Pour les polygones ;
    this.setBoundaryMode = function(P) {};

    // Pour la 3D :
    this.storeX = function() {};





    // Série de 5 méthodes à surcharger, pour les objets pouvant
    // être édité avec la "calculatrice" (point, cercle, expression, fonction, etc...) :

    this.setE1 = function(_t) {};
    this.setE2 = function(_t) {};
    this.setT = function(_t) {};
    this.setMin = function(_t) {};
    this.setMax = function(_t) {};
    this.getValue = function() {
        return NaN;
    };

    this.setDeps = function() {};

    this.getCoordsSystem = function() {
        return Cn.coordsSystem;
    };

    this.isCoincident = function() {
        return false;
    };

    this.getUnit = function() {
        return Cn.coordsSystem.getUnit();
    };
    this.setDash = function(_d) {
        dash = (_d) ? Cn.prefs.size.dash : [];
    };
    this.isDash = function() {
        return (dash.length !== 0);
    };

    this.setIncrement = function() {};
    this.getIncrement = function() {
        return 0;
    };

    this.getSerial = function() {
        return serial;
    };

    this.getPaintOrder = function() {
        return paintorder;
    };

    // -1 pour pas d'affichage, 0,1,2,3,4,... pour indiquer le nombre de chiffres après la virgule
    this.setPrecision = function(_prec) {
        if (_prec > -1) {
            precision = Math.pow(10, _prec);
            this.paintLength_exe = this.paintLength;
        } else {
            precision = -1;
            this.paintLength_exe = null_proc;
        }
    };
    this.getPrecision = function() {
        return precision;
    };

    this.getRealPrecision = function()  {
        return Math.round($U.log(precision));
    };

    this.getLayer = function() {
        return layer;
    };
    this.setLayer = function(_l) {
        layer = _l;
        paintorder = serial + 100000 * layer;
    };

    this.getFontSize = function() {
        return fontsize;
    };
    this.setFontSize = function(_s) {
        fontsize = _s;
    };

    // Getters et Setters :
    this.getCn = function() {
        return Cn;
    };
    this.setNameOnly = function(_n) {
        name = Cn.getUnusedName(_n, this);
        subname = Cn.getSubName(name)
    };
    this.setName = function(_n) {
        var old = Cn.getVarName(name);
        this.setNameOnly(_n);
        Cn.fixNames(old, Cn.getVarName(name));
    };
    this.getName = function() {
        return name;
    };
    this.getSubName = function() {
        return subname;
    };
    this.getVarName = function() {
        return Cn.getVarName(name);
    };
    this.setShowName = function(_bool) {
        showname = _bool;
        this.paintName_exe = (_bool) ? this.paintName : null_proc;
    };
    this.getShowName = function() {
        return showname;
    };
    this.setNamePosition = function() {};
    this.getNamePosition = function() {
        return null;
    };
    // Seulement pour les points :
    this.setShape = function() {};
    this.getShape = function() {
        return -1;
    };
    this.setIndicated = function(_ind) {
        indicated = _ind;
        objMode = objModeTab[1 * _ind];
        return _ind; // Optionnel : voir la methode validate de Construction.js
    };
    this.isIndicated = function() {
        return indicated;
    };
    this.setSelected = function(_sel) {
        selected = _sel;
        objMode = objModeTab[2 * _sel];
    };
    this.isSelected = function() {
        return selected;
    };
    this.setHidden = function(_sel) {
        _sel = Math.abs(_sel * 1);
        hidden = (isNaN(_sel)) ? 1 : parseInt(_sel) % 3;
        this.paint = paintTab[hidden];
        this.validate = validTab[hidden];
    };
    this.isHidden = function() {
        return (hidden);
    };
    this.isSuperHidden = function() {
        return (hidden === 2);
    };
    this.setColor = function(_col) {
        color.set(_col);
        fillcolor.setRGBA(color.getR(), color.getG(), color.getB(), fillcolor.getOpacity());
    };
    this.getColor = function() {
        return color;
    };
    this.setRGBColor = function(r, g, b) {
        var c = "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
        this.setColor(c);
    };
    this.isFilledObject = function() {
        return false;
    };
    this.getOpacity = function() {
        return fillcolor.getOpacity();
    };
    this.setOpacity = function(_f) {
        fillcolor.setOpacity(_f);
    };
    this.getOversize = function() {
        return oversize;
    };
    this.getRealsize = function() {
        return realsize;
    };
    this.getSize = function() {
        return size;
    };
    this.setSize = function(_s) {
        size = _s;
    };


    var mode = 1;
    // mode 1 pour pointeur, 2 pour gomme, 3 pour poubelle, 
    // 4 pour construction de macros, 5 pour execution de macros
    // 6 pour les propriétés , 9 pour le magnétisme :
    this.setMode = function(_mode) {
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

    this.getMode = function() {
        return mode;
    }



    // Seulement pour les macros : 0 signifie neutre, 1 intermédiaire, 2 initial et 3 final
    // et pour le mode execution : 4 pour initial possible, 5 pour initial choisi
    var macroMode = 0;
    this.setMacroMode = function(_mode) {
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
    this.getMacroMode = function() {
        return macroMode;
    };

    // Seulement pour les macros : pour un cercle initial par exemple
    // va placer le centre parmi les intermédiaires, et provoquer
    // dans le source de la macro l'instruction P=Center au lieu de P=Point.
    // Pour un segment initial, P=First et P=Second au lieu de P=Point
    this.setMacroAutoObject = function() {};
    // Surchargé dans l'objet Point :
    this.setMacroSource = function() {};

    // For macro process only :
    this.isAutoObjectFlags = function() {
        return false;
    };
    //// Surchargé dans l'objet Cercle et Segment par exemple :
    //    this.getMacroSource = function() {
    //    };

    // Seulement pour le mode édition : 0 signifie neutre, 1 objet édité
    var editMode = 0;
    this.setEditMode = function(_mode) {
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
    this.getEditMode = function() {
        return editMode;
    };




    this.checkIfValid = function(_C) {};
    this.getCode = function() {
        return "";
    };
    this.getFamilyCode = function() {
        return "";
    };

    this.isInstanceType = function(_c) {
        return false;
    };
    this.isMoveable = function() {
        return false;
    };
    this.free = function() {
        return (this.getParentLength() === 0);
    };
    this.setFloat = function(_f) {
        floatObj = _f;
        if (_f)
            Cn.setOrigin3D(this);
    };
    this.getFloat = function() {
        return floatObj;
    };
    this.isPointOn = function() {
        return false;
    };

    this.getAssociatedTools = function() {
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


    this.paintObject = function(ctx) {};

    var null_proc = function(ctx) {};

    this.paintName = function(ctx) {};
    this.paintName_exe = null_proc;

    this.paintLength = function(ctx) {};
    this.paintLength_exe = null_proc;


    var valid_show_normal = function(ev) {
        return this.mouseInside(ev);
    };
    var valid_hidden_normal = function(ev) {
        return false;
    };

    var valid_normal = [valid_show_normal, valid_hidden_normal, valid_hidden_normal];
    var valid_gomme = [valid_show_normal, valid_show_normal, valid_hidden_normal];
    var validTab = valid_normal;

    this.validate = validTab[hidden];

    var paint_show_normal = function(ctx) {
        initContext(ctx);
        this.paintObject(ctx);
        this.paintName_exe(ctx);
        this.paintLength_exe(ctx);
    };
    var paint_hidden_normal = function(ctx) {};
    var paint_hidden_gomme = function(ctx) {
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
    this.startTrack = function() {
        track = true;
        this.beginTrack();
    };
    this.clearTrack = function() {
        track = false;
    };
    this.isTrack = function() {
        return track;
    };

    // Mais surcharger celles-ci :
    this.beginTrack = function() {};
    this.drawTrack = function(_ctx) {};


    this.compute = function() {};
    this.mouseInside = function(ev) {
        return false;
    };


    this.ORGMOUSEINSIDE = null;
    this.MOUSEINSIDE = function(ev) {
        if (Cn.getMode() === 6 && this.ORGMOUSEINSIDE)
        // Si on est en mode propriétés
            return this.ORGMOUSEINSIDE(ev);
        else
            return false;
    };
    this.noMouseInside = function() {
        if (this.ORGMOUSEINSIDE === null) {
            this.ORGMOUSEINSIDE = this.mouseInside;
            this.mouseInside = this.MOUSEINSIDE;
        }
    };
    this.doMouseInside = function() {
        if (this.ORGMOUSEINSIDE !== null) {
            this.mouseInside = this.ORGMOUSEINSIDE;
            this.ORGMOUSEINSIDE = null;
        }
    };
    this.setNoMouseInside = function(_mi) {
        if (_mi) {
            this.noMouseInside();
        } else {
            this.doMouseInside();
        }
    };
    this.isNoMouseInside = function() {
        return (this.ORGMOUSEINSIDE !== null)
    };
    this.intersect = function(_C, _P) {};
    this.projectXY = function(_x, _y) {};
    this.project = function(p) {};
    this.projectAlpha = function(p) {};
    this.setAlpha = function(p) {};
    this.projectMagnetAlpha = function(p) {
        this.projectAlpha(p);
    };
    this.setMagnetAlpha = function(p) {
        this.setAlpha(p);
    };


    // Hallucinants pointeurs javascript :
    this.mouseX = Cn.mouseX;
    this.mouseY = Cn.mouseY;
    this.prefs = Cn.prefs;
    this.getWidth = Cn.getWidth;
    this.getHeight = Cn.getHeight;


    this.setDefaults = function(_code) {
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


    var objMode_normal = function(ctx) {
        realsize = size;
        ctx.strokeStyle = color.getRGBA();
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objMode_indicated = function(ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objMode_selected = function(ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = fillcolor.getRGBA();
    };
    var objModeTab_normal = [objMode_normal, objMode_indicated, objMode_selected];


    var objMode_normal_final = function(ctx) {
        realsize = size;
        ctx.strokeStyle = "rgb(210,0,0)";
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_final = function(ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_final = function(ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(210,0,0," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_final = [objMode_normal_final, objMode_indicated_final, objMode_selected_final];


    var objMode_normal_initial = function(ctx) {
        realsize = size * 1.5;
        ctx.strokeStyle = "rgb(95,132,0)";
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_initial = function(ctx) {
        realsize = size * 1.5 * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_initial = function(ctx) {
        realsize = size * 1.5 * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(95,132,0," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_initial = [objMode_normal_initial, objMode_indicated_initial, objMode_selected_initial];


    var objMode_normal_intermediate = function(ctx) {
        realsize = size;
        ctx.strokeStyle = "#333333";
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objMode_indicated_intermediate = function(ctx) {
        realsize = size * magnifyfactor;
        ctx.strokeStyle = indicatedcolor;
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objMode_selected_intermediate = function(ctx) {
        realsize = size * selectedfactor;
        ctx.strokeStyle = selectedcolor;
        ctx.fillStyle = "rgba(51,51,51," + fillcolor.getOpacity() + ")";
    };
    var objModeTab_intermediate = [objMode_normal_intermediate, objMode_indicated_intermediate, objMode_selected_intermediate];

    var objMode_normal_edit = function(ctx) {
        ctx.shadowColor = 'darkred';
        objMode_normal(ctx);
    };
    var objMode_indicated_edit = function(ctx) {
        ctx.shadowColor = 'darkred';
        objMode_indicated(ctx);
    };
    var objMode_selected_edit = function(ctx) {
        ctx.shadowColor = 'darkred';
        objMode_selected(ctx);
    };
    var objModeTab_edit = [objMode_normal_edit, objMode_indicated_edit, objMode_selected_edit];

    var objMode_normal_noedit = function(ctx) {
        ctx.shadowColor = 'gray';
        objMode_normal(ctx);
    };
    var objMode_indicated_noedit = function(ctx) {
        ctx.shadowColor = 'gray';
        objMode_indicated(ctx);
    };
    var objMode_selected_noedit = function(ctx) {
        ctx.shadowColor = 'gray';
        objMode_selected(ctx);
    };
    var objModeTab_noedit = [objMode_normal_noedit, objMode_indicated_noedit, objMode_selected_noedit];


    var objModeTab = objModeTab_normal;
    var objMode = objMode_normal;


    var initContext = function(ctx) {
        objMode(ctx);
        ctx.font = fontsize + "px " + Cn.prefs.font;
        ctx.globalAlpha = 1;
        ctx.lineWidth = realsize;
        ctx.setLineDash(dash);
    };

    var hiddenContext = function(ctx) {
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "#AAAAAA";
        ctx.setLineDash(dash);
    };

    this.getArrow = function() {
        return null;
    };


    this.getSource = function(src) {};


    this.getStyleString = function() {
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
        if (this.getArrow())
            s += ";ar:" + JSON.stringify(this.getArrow());
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
            s += ";am:" + this.is360();
        if ((this.getArcRay) && (this.getArcRay() != 30))
            s += ";arc:" + this.getArcRay();
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
        var an = Cn.findInAnimations(this);
        if (an) {
            s += ";an:[" + an.speed + "," + an.direction + "," + an.ar + "]";
        }
        return s;
    };

    this.getStyle = function(src) {
        src.styleWrite(true, name, "STL", this.getStyleString());
    };

    this.getBlock = function(src) {
        if (!this.blocks.isEmpty()) src.blockWrite(name, this.blocks.getSource(), "BLK");
    };


};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function MoveableObject(_construction) {
    //    var Cn = _construction;
    //    this.startDragX = 0;
    //    this.startDragY = 0;
    //
    ////    Ne pas surcharger :
    //    this.startDrag = function(x, y) {
    //        this.dragTo = (Cn.is3D()) ? dragTo3D : dragToNormal;
    //        Cn.doOrder(this.getChildList());
    //        this.startDragX = x;
    //        this.startDragY = y;
    //    };
    //
    //
    //    this.isMoveable = function() {
    //        return true;
    //    };
    //    
    //
    //
    //    var dragTo3D = function(x, y) {
    //        this.dragObject(x, y);
    //        Cn.computeMagnetObjects();
    //        this.checkMagnets();
    //        Cn.computeAll();
    //        Cn.computeAll();
    //    };
    //
    //
    //    var dragToNormal = function(x, y) {
    //        this.dragObject(x, y);
    //        this.computeDrag(x,y);
    //        Cn.computeMagnetObjects();
    //        this.checkMagnets();
    //    };
    //
    //    this.dragTo = (Cn.is3D()) ? dragTo3D : dragToNormal;



}
//************************************************
//************ PRIMITIVELINE OBJECT **************
//************************************************
function PrimitiveLineObject(_construction, _name, _P1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var Cn = _construction;

    this.P1 = _P1;

    this.setDefaults("line");

    // Vecteur directeur normé (en 2D) :
    var DX = 0,
        DY = 0;
    // Vecteur directeur normé (en 2D et 3D) :
    var NDX = 0,
        NDY = 0;



    // Frontières du canvas à prendre en compte pour le "paintObject" de la droite :
    var xmin, ymin, xmax, ymax;

    var lastxmin, lastymin, lastxmax, lastymax;

    this.getAssociatedTools = function() {

        var at = "@callproperty,@calltrash,point,parallel,plumb,syma";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable())
            at += ",@objectmover";
        return at;
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("line")) {
            // Si les droites (segments) sont confondus :
            if ($U.approximatelyEqual(NDX, _C.getNDX()) && $U.approximatelyEqual(NDY, _C.getNDY())) {
                return true;
            } else if ($U.approximatelyEqual(-NDX, _C.getNDX()) && $U.approximatelyEqual(-NDY, _C.getNDY())) {
                return true;
            }
        }
        return false;
    };

    this.getXmax = function() {
        return xmax;
    };
    this.getYmax = function() {
        return ymax;
    };
    this.getXmin = function() {
        return xmin;
    };
    this.getYmin = function() {
        return ymin;
    };

    this.isInstanceType = function(_c) {
        return (_c === "line");
    };
    this.getFamilyCode = function() {
        return "line";
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();

        var w = this.getWidth();
        var h = this.getHeight();
        var dx = NDX;
        var dy = NDY;

        var tsort = function(a, b) {
            return (a - b)
        }

        var t = (dy === 0) ? [-xA / dx, (w - xA) / dx] :
            ((dx === 0) ? [-yA / dy, (h - yA) / dy] : [-xA / dx, (w - xA) / dx, -yA / dy, (h - yA) / dy]);
        t.sort(tsort);
        if (t.length === 4) {
            t.splice(0, 1);
            t.splice(2, 1);
        }
        var d = Math.sqrt((t[1] - t[0]) * (t[1] - t[0]) * (dx * dx + dy * dy));
        var inc = Math.abs(t[1] - t[0]) * anim.direction * (anim.speed * anim.delay / 1000) / d;
        return [t[0], t[1], inc]
    };

    this.getAnimationSpeedTab = function() {
        return [0, 1, 5, 10, 25, 50, 100, 200, 300, 500, 800, 1000, 1500];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (400 / fce.length));
        if (f >= fce.length) f = fce.length - 1;
        var ps = NDX * (x1 - x0) + NDY * (y1 - y0);
        var dir = (ps > 0) ? -1 : 1;
        var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var aller_retour = (Math.abs(ps / dom) < 0.707);
        return {
            message: aller_retour ? fce[f] + " px/s \u21C4" : fce[f] + " px/s",
            speed: fce[f],
            direction: dir,
            ar: aller_retour
        }
    }

    // ****************************************
    // ****************************************

    this.setDXDY = function(_x0, _y0, _x1, _y1) {
        DX = _x1 - _x0;
        DY = _y1 - _y0;
        var n = Math.sqrt(DX * DX + DY * DY);
        NDX = DX / n;
        NDY = DY / n;
        // En 2D, on normalise :
        if (!this.is3D()) {
            DX = NDX;
            DY = NDY;
        }
    };

    this.getNDX = function() {
        return NDX;
    };
    this.getNDY = function() {
        return NDY;
    };
    this.getDX = function() {
        return DX;
    };
    this.getDY = function() {
        return DY;
    };
    this.getP1 = function() {
        return this.P1;
    };

    this.mouseInside = function(ev) {
        return $U.isNearToLine(this.P1.getX(), this.P1.getY(), NDX, NDY, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.P1.setXY(this.P1.getX() + vx, this.P1.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };

    // Calcule les coordonnées du symétrique d'un point _M par rapport à moi :
    this.reflect = function(_M, _P) {
        var x1 = this.P1.getX();
        var y1 = this.P1.getY();
        var x2 = _M.getX();
        var y2 = _M.getY();
        var dxy = NDX * NDY;
        var dx2 = NDX * NDX;
        var dy2 = NDY * NDY;
        var d = dx2 + dy2;
        var xP = (2 * dxy * (y2 - y1) + dy2 * (2 * x1 - x2) + dx2 * x2) / d;
        var yP = (2 * dxy * (x2 - x1) + dx2 * (2 * y1 - y2) + dy2 * y2) / d;
        _P.setXY(xP, yP);
    };



    this.intersectLineCircle = function(_C, _P) {
        var x = _C.getP1().getX(),
            y = _C.getP1().getY();
        var r = _C.getR();
        var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;

        // Si le cercle et la droite sont tangents :
        if (Math.abs(r - Math.abs(d)) < 1e-12) {
            var c = this.projectXY(x, y);
            _P.setXY(c[0], c[1]);
            return;
        }

        x -= d * NDY;
        y += d * NDX;
        var h = r * r - d * d;



        if (h >= 0) {
            h = Math.sqrt(h);
            var hDX = h * NDX,
                hDY = h * NDY;

            if (_P.getAway()) {
                if (_P.getAway().near(x + hDX, y + hDY)) {
                    _P.setXY(x - hDX, y - hDY);
                } else {
                    _P.setXY(x + hDX, y + hDY);
                }
            } else {
                if (_P.getOrder() === 0) {
                    _P.setXY(x + hDX, y + hDY);
                } else {
                    _P.setXY(x - hDX, y - hDY);
                }
            }
        } else {
            _P.setXY(NaN, NaN);
        }
    };

    this.intersectLineLine = function(_D, _P) {

        var dxA = NDX,
            dyA = NDY,
            dxB = _D.getNDX(),
            dyB = _D.getNDY();
        var det = dxB * dyA - dxA * dyB;

        if (det !== 0) {
            var A = this.P1,
                B = _D.P1;
            var num1 = dyA * A.getX() - dxA * A.getY();
            var num2 = dxB * B.getY() - dyB * B.getX();

            // if (_P.getName() === "N") {
            //     console.log("intersectLineLine");
            //     console.log(((dxB * num1 + dxA * num2) / det));
            //     console.log(((dyB * num1 + dyA * num2) / det));
            // }
            _P.setXY((dxB * num1 + dxA * num2) / det, (dyB * num1 + dyA * num2) / det);
        }
    };

    var intersectLineQuadricXY = function(_Q) {
        // compute the intersection coordinates of a line with a quadric
        // done with XCAS :
        var X = _Q.getCoeffs();
        var M = -NDY,
            N2 = NDX,
            P = -(M * _P1.getX() + N2 * _P1.getY());
        var A = X[0],
            B = X[1],
            C = X[2],
            D = X[3],
            E = X[4],
            F = X[5];
        var x1 = 0,
            x2 = 0,
            y1 = 0,
            y2 = 0;
        if (N2 != 0) {
            var part1 = -2 * B * M * P - C * N2 * N2 + D * M * N2 + E * N2 * P;
            var part2 = Math.abs(N2) * Math.sqrt(-2 * M * D * N2 * C + 4 * P * D * A * N2 + 4 * P * M * B * C + 4 * E * M * N2 * F - 2 * E * P * N2 * C - 2 * E * P * M * D - 4 * M * M * B * F - 4 * P * P * A * B - 4 * A * N2 * N2 * F + N2 * N2 * C * C + M * M * D * D + E * E * P * P);

            var part3 = 2 * A * N2 * N2 + 2 * B * M * M + (-2 * E) * M * N2;
            x1 = (part1 + part2) / part3;
            if (isNaN(x1)) {
                return [];
            }
            y1 = (-M * x1 - P) / N2;
            x2 = (part1 - part2) / part3;
            y2 = (-M * x2 - P) / N2;
            if (((x2 - x1) / NDX) < 0) {
                return [x2, y2, x1, y1];
            }
        } else {
            x1 = -P / M;
            x2 = x1;
            var part1 = -D * M * M + E * M * P;
            var part2 = Math.abs(M) * Math.sqrt(4 * P * M * B * C - 2 * E * P * M * D - 4 * M * M * B * F - 4 * P * P * A * B + M * M * D * D + E * E * P * P);
            var part3 = 2 * M * M * B;
            y1 = (part1 + part2) / part3;
            if (isNaN(y1)) {
                return [];
            }
            y2 = (part1 - part2) / part3;
            if (((y2 - y1) / NDY) < 0) {
                return [x2, y2, x1, y1];
            }
        }
        return [x1, y1, x2, y2];
    }

    this.intersectLineQuadric = function(_Q, _P) {
        var c = intersectLineQuadricXY(_Q);
        if (c.length === 0) {
            _P.setXY(NaN, NaN);
        } else {
            if (_P.getAway()) {
                if (_P.getAway().near(c[0], c[1])) {
                    _P.setXY(c[2], c[3]);
                } else {
                    _P.setXY(c[0], c[1]);
                }
            } else {
                if (_P.getOrder() === 0) {
                    _P.setXY(c[0], c[1]);
                } else {
                    _P.setXY(c[2], c[3]);
                }
            }
        }
    }








    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("line")) {
            this.intersectLineLine(_C, _P);
        } else if (_C.isInstanceType("circle")) {
            this.intersectLineCircle(_C, _P);
        } else if (_C.isInstanceType("quadric")) {
            this.intersectLineQuadric(_C, _P);
        }
    };

    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            var x = _C.getP1().getX(),
                y = _C.getP1().getY();
            var r = _C.getR();
            var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;
            x -= d * NDY;
            y += d * NDX;
            var h = r * r - d * d;
            if (h > 0) {
                h = Math.sqrt(h);
                var x0 = x + h * NDX,
                    y0 = y + h * NDY,
                    x1 = x - h * NDX,
                    y1 = y - h * NDY;
                var d0 = (_P.getX() - x0) * (_P.getX() - x0) + (_P.getY() - y0) * (_P.getY() - y0);
                var d1 = (_P.getX() - x1) * (_P.getX() - x1) + (_P.getY() - y1) * (_P.getY() - y1);
                if (d0 < d1) {
                    _P.setOrder(0);
                    _P.setXY(x0, y0);
                    // Si l'un des points constituant de la droite est sur l'autre
                    // intersection, il faut en rester loin :
                    if (this.P1.near(x1, y1))
                        _P.setAway(this.P1);
                    else if ((this.getCode() === "line") && this.P2.near(x1, y1))
                        _P.setAway(this.P2);
                    // Si l'un des points constituant du cercle est sur l'autre
                    // intersection, il faut en rester loin :
                    else if (_C.P1.near(x1, y1))
                        _P.setAway(_C.P1);
                    else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1))
                        _P.setAway(_C.P2);
                } else {
                    _P.setOrder(1);
                    _P.setXY(x1, y1);
                    // Si l'un des points constituant de la droite est sur l'autre
                    // intersection, il faut en rester loin :
                    if (this.P1.near(x0, y0))
                        _P.setAway(this.P1);
                    else if ((this.getCode() === "line") && this.P2.near(x0, y0))
                        _P.setAway(this.P2);
                    // Si l'un des points constituant du cercle est sur l'autre
                    // intersection, il faut en rester loin :
                    else if (_C.P1.near(x0, y0))
                        _P.setAway(_C.P1);
                    else if ((_C.getCode() === "circle") && _C.P2.near(x0, y0))
                        _P.setAway(_C.P2);
                }
            }
        } else if (_C.isInstanceType("quadric")) {
            //            console.log("yes !!");
            var c = intersectLineQuadricXY(_C);
            var d0 = (_P.getX() - c[0]) * (_P.getX() - c[0]) + (_P.getY() - c[1]) * (_P.getY() - c[1]);
            var d1 = (_P.getX() - c[2]) * (_P.getX() - c[2]) + (_P.getY() - c[3]) * (_P.getY() - c[3]);
            if (d0 < d1) {
                _P.setOrder(0);
                _P.setXY(c[0], c[1]);
                // Si l'un des points constituant de la droite est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(c[2], c[3]))
                    _P.setAway(this.P1);
                else if ((this.getCode() === "line") && this.P2.near(c[2], c[3]))
                    _P.setAway(this.P2);
            } else {
                _P.setOrder(1);
                _P.setXY(c[2], c[3]);
                // Si l'un des points constituant de la droite est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(c[0], c[1]))
                    _P.setAway(this.P1);
                else if ((this.getCode() === "line") && this.P2.near(c[0], c[1]))
                    _P.setAway(this.P2);
            }
        }
    };


    // Calcule les coordonnées du symétrique d'un point P(_x;_y) par rapport à moi :
    this.reflectXY = function(_x, _y) {
        var x1 = this.P1.getX();
        var y1 = this.P1.getY();
        var dxy = NDX * NDY;
        var dx2 = NDX * NDX;
        var dy2 = NDY * NDY;
        var d = dx2 + dy2;
        var xM = (2 * dxy * (_y - y1) + dy2 * (2 * x1 - _x) + dx2 * _x) / d;
        var yM = (2 * dxy * (_x - x1) + dx2 * (2 * y1 - _y) + dy2 * _y) / d;
        return [xM, yM];
    };

    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("circle")) {
            var x = _C.getP1().getX(),
                y = _C.getP1().getY();
            var r = _C.getR();
            var d = (x - this.getP1().getX()) * NDY - (y - this.getP1().getY()) * NDX;
            x -= d * NDY;
            y += d * NDX;
            var h = r * r - d * d;
            if (h > 0) {
                h = Math.sqrt(h);
                var x0 = x + h * NDX,
                    y0 = y + h * NDY,
                    x1 = x - h * NDX,
                    y1 = y - h * NDY;
                var d0 = (_x - x0) * (_x - x0) + (_y - y0) * (_y - y0);
                var d1 = (_x - x1) * (_x - x1) + (_y - y1) * (_y - y1);
                if (d0 < d1) {
                    return [x0, y0];
                } else {
                    return [x1, y1];
                }
            }
        } else if (_C.isInstanceType("line")) {
            var dxA = NDX,
                dyA = NDY,
                dxB = _C.getNDX(),
                dyB = _C.getNDY();
            var det = dxB * dyA - dxA * dyB;
            if (det !== 0) {
                var A = this.P1,
                    B = _C.P1;
                var num1 = dyA * A.getX() - dxA * A.getY();
                var num2 = dxB * B.getY() - dyB * B.getX();
                return [(dxB * num1 + dxA * num2) / det, (dyB * num1 + dyA * num2) / det];
            }
        } else if (_C.isInstanceType("quadric")) {
            var c = intersectLineQuadricXY(_C);
            var d0 = (_x - c[0]) * (_x - c[0]) + (_y - c[1]) * (_y - c[1]);
            var d1 = (_x - c[2]) * (_x - c[2]) + (_y - c[3]) * (_y - c[3]);
            if (d0 < d1) {
                return [c[0], c[1]];
            } else {
                return [c[2], c[3]];
            }
        }
    };




    this.projectXY = function(_x, _y) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var AB2 = DX * DX + DY * DY;
        var ABMA = DX * (xA - _x) + DY * (yA - _y);
        return [xA - (DX * ABMA) / AB2, yA - (DY * ABMA) / AB2];
    };

    this.project = function(p) {
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        p.setXY(xA + a * DX, yA + a * DY);
    };

    this.setAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xp = p.getX();
        var yp = p.getY();
        if (Math.abs(xA - xp) > 1e-12) {
            p.setAlpha((xp - xA) / DX);
        } else if (Math.abs(yA - yp) > 1e-12) {
            p.setAlpha((yp - yA) / DY);
        } else {
            p.setAlpha(0);
        }
    };



    var f1 = function(x) {
        return (x * x * x);
    };

    var sign = function(x) {
        if (x < 0)
            return -1;
        else
            return 1;
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb, _linear) {
        var f = null;
        if (_linear) {
            f = function(x) {
                return x;
            };
        } else {
            f = f1;
        }
        var aMax = Math.floor(_nb / 2),
            aMin = -aMax;
        var fmax = f(aMax);
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = aMin; i < aMax; i++) {
            var a = sign(i) * Math.abs(f(i) / fmax) * 1000;
            Ptab.push({
                "alpha": a,
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
        p.setXY(xA + a * NDX, yA + a * NDY);
    };





    this.compute = function() {
        var t = $U.computeBorderPoints(this.P1.getX(), this.P1.getY(), NDX, NDY, this.getWidth(), this.getHeight());
        xmin = t[0];
        ymin = t[1];
        xmax = t[2];
        ymax = t[3];
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(xmin, ymin);
        ctx.lineTo(xmax, ymax);
        ctx.stroke();
    };


    this.beginTrack = function() {
        var t = $U.computeBorderPoints(this.P1.getX(), this.P1.getY(), NDX, NDY, this.getWidth(), this.getHeight());
        lastxmin = t[0];
        lastymin = t[1];
        lastxmax = t[2];
        lastymax = t[3];
    };

    this.drawTrack = function(ctx) {
        if (!isNaN(xmin) && !isNaN(ymin) && !isNaN(xmax) && !isNaN(ymax)) {
            if ((xmin !== lastxmin) || (ymin != lastymin) || (xmax != lastxmax) || (ymax != lastymax)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';

                if (!isNaN(lastxmin) && !isNaN(lastymin) && !isNaN(lastxmax) && !isNaN(lastymax)) {
                    ctx.beginPath();
                    switch (this.getCode()) {
                        case "ray":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(xmax, ymax);
                            break;
                        case "segment":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(this.getP2().getX(), this.getP2().getY());
                            break;
                        default:
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(xmax, ymax);
                            break;
                    }

                    ctx.stroke();
                }
            }
        }
        lastxmin = xmin;
        lastymin = ymin;
        lastxmax = xmax;
        lastymax = ymax;
    };



    // Alpha, dans le repère coordsSystem de l'objet Construction.
    // (for CaRMetal .zir translation)
    this.transformAlpha = function(_alpha) {
        var x = this.getCn().coordsSystem.x(NDX) - this.getCn().coordsSystem.x(0);
        var y = this.getCn().coordsSystem.y(NDY) - this.getCn().coordsSystem.y(0);
        return _alpha * Math.sqrt(x * x + y * y);
    };


};
//************************************************
//************ TWOPOINTSLINE OBJECT **************
//************************************************
function TwoPointsLineObject(_construction, _name, _P1, _P2, _isExtended) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P1)); // Héritage


    this.P2 = _P2;

    if (!_isExtended)
        this.setParent(this.P1, this.P2);


    this.getCode = function() {
        return "line";
    };

    this.getP2 = function() {
        return this.P2;
    };


    this.redefine = function(_old, _new) {
        if (_old === this.P2) {
            this.addParent(_new);
            this.P2 = _new;
        } else if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
            superObject.P1 = _new;
        }
    };




    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((this.P1.getParentLength() === 0) && (this.P2.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {

        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.P1.setXY(this.P1.getX() + vx, this.P1.getY() + vy);
        this.P2.setXY(this.P2.getX() + vx, this.P2.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {

        this.compute();
        this.P1.computeChilds();
        this.P2.computeChilds();
    };

    this.getAlphaBounds = function(anim) {
        var t = superObject.getAlphaBounds(anim);
        var d = $U.d(this.P1, this.P2);
        t[0] = t[0] / d;
        t[1] = t[1] / d;
        t[2] = t[2] / d;
        return t;
    };

    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xB = this.P2.getX();
        var yB = this.P2.getY();
        var a = p.getAlpha();
        p.setXY(xA + a * (xB - xA), yA + a * (yB - yA));
    };

    this.setAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xB = this.P2.getX();
        var yB = this.P2.getY();
        var xp = p.getX();
        var yp = p.getY();
        if (Math.abs(xA - xB) > 1e-12) {
            p.setAlpha((xp - xA) / (xB - xA));
        } else if (Math.abs(yA - yB) > 1e-12) {
            p.setAlpha((yp - yA) / (yB - yA));
        } else {
            p.setAlpha(0);
        }
    };


    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        var p1 = this.getP1(),
            p2 = this.getP2();
        p1.setMacroMode(1);
        p1.setMacroSource(function(src) {
            src.geomWrite(false, p1.getVarName(), "DefinitionPoint", vn, 0);
        });
        p2.setMacroMode(1);
        p2.setMacroSource(function(src) {
            src.geomWrite(false, p2.getVarName(), "DefinitionPoint", vn, 1);
        });
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        return (this.getP1().Flag || this.getP2().Flag);
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        if (_i === 0)
            return this.getP1();
        else
            return this.getP2();
    }




    this.compute = function() {
        this.setDXDY(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY());
        superObject.compute();
    };

    // Alpha, dans le repère coordsSystem de l'objet Construction :
    // (for CaRMetal .zir translation)
    this.transformAlpha = function(_alpha) {
        return _alpha;
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Line", this.P1.getVarName(), this.P2.getVarName());
    };



};
//************************************************
//*********** PRIMITIVECIRCLE OBJECT *************
//************************************************
function PrimitiveCircleObject(_construction, _name, _P1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var lastx, lasty, lastr; // Pour les traces
    this.P1 = _P1;
    this.R = 0;

    this.getP1 = function() {
        return this.P1;
    };
    this.getR = function() {
        return this.R;
    };


    this.isCoincident = function(_C) {
        if (_C.isInstanceType("circle")) {
            // Si les cercles (ou arcs) sont confondus :
            if ($U.approximatelyEqual(this.getR(), _C.getR()) && $U.approximatelyEqual(this.getP1().getX(), _C.getP1().getX()) && $U.approximatelyEqual(this.getP1().getY(), _C.getP1().getY())) {
                return true;
            }
        }
        return false;
    };


    this.isInstanceType = function(_c) {
        return (_c === "circle");
    };
    this.getFamilyCode = function() {
        return "circle";
    };
    this.getAssociatedTools = function() {
        var at = "@callproperty,@calltrash,point";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable()) at += ",@objectmover";
        return at;
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    this.getAlphaBounds = function(anim) {
        var inc = anim.direction * (anim.speed * anim.delay / 1000);
        return [0, $U.doublePI, inc]
    };


    this.getAnimationSpeedTab = function() {
        return [0, 1, 6, 10, 30, 45, 60, 70, 90, 180, 270, 360];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;

        var xp = this.getP1().getX();
        var yp = this.getP1().getY();
        var ps = (yp - y0) * (x1 - xp) + (x0 - xp) * (y1 - yp);
        var dir = (ps > 0) ? 1 : -1;
        return {
            message: fce[f] + " deg/s",
            speed: fce[f] * Math.PI / 180,
            direction: dir,
            ar: false
        }
    }

    // ****************************************
    // ****************************************


    this.projectXY = function(xM, yM) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var xAM = xM - xA;
        var yAM = yM - yA;
        var AM = Math.sqrt(xAM * xAM + yAM * yAM);
        if (AM === 0) {
            return [xA + this.R, yA];
        } else {
            return [xA + this.R * xAM / AM, yA + this.R * yAM / AM];
        }
    };
    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };


    this.setAlpha = function(p) {
        p.setAlpha($U.angleH(p.getX() - this.P1.getX(), p.getY() - this.P1.getY()));
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var aMin = 0,
            aMax = 2 * Math.PI;
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
        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };


    //// Seulement pour les macros. Permet de désigner un cercle comme initial,
    //// avec le centre comme intermédiaire automatique :
    //    this.getMacroSource = function(src) {
    //        src.geomWrite(false, this.getP1().getName(), "Center", this.getName());
    //    };

    this.setMacroAutoObject = function() {
        var p = this.getP1();
        var c = this;
        var proc = function(src) {
                src.geomWrite(false, p.getName(), "Center", c.getVarName());
            }
            // Défini le centre comme intermédiaire :
        p.setMacroMode(1);
        p.setMacroSource(proc);
    };

    // For macro process only :
    this.isAutoObjectFlags = function() {
        return (this.getP1().Flag);
    };

    // Surchargé par CircleObject et Arc3ptsObjects :
    this.fixIntersection = function() {};

    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            // Determine Circle/Circle intersection :
            var xC1 = this.getP1().getX(),
                yC1 = this.getP1().getY();
            var xC2 = _C.getP1().getX(),
                yC2 = _C.getP1().getY();
            var dx = xC2 - xC1,
                dy = yC2 - yC1;
            var r = Math.sqrt(dx * dx + dy * dy);
            var r1 = this.getR(),
                r2 = _C.getR();
            if (r > (r1 + r2))
                return null;
            if (r === 0) {}
            var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
            dx /= r;
            dy /= r;
            var x = xC1 + l * dx,
                y = yC1 + l * dy;
            var h = r1 * r1 - l * l;
            if (h < 0) {
                return null;
            }
            h = Math.sqrt(h);
            var x0 = x + h * dy,
                y0 = y - h * dx,
                x1 = x - h * dy,
                y1 = y + h * dx;
            var d0 = (_P.getX() - x0) * (_P.getX() - x0) + (_P.getY() - y0) * (_P.getY() - y0);
            var d1 = (_P.getX() - x1) * (_P.getX() - x1) + (_P.getY() - y1) * (_P.getY() - y1);
            if (d0 < d1) {
                _P.setOrder(0);
                _P.setXY(x0, y0);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(x1, y1)) _P.setAway(this.P1);
                else if (this.fixIntersection(x1, y1, _P)) null;
                else if (_C.P1.near(x1, y1)) _P.setAway(_C.P1);
                else _C.fixIntersection(x1, y1, _P);
                //                else if ((this.getCode() === "circle") && this.P2.near(x1, y1)) _P.setAway(this.P2);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :

                //                else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1)) _P.setAway(_C.P2);
                //                // Si l'un des points constituant de ce cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                if (this.P1.near(x1, y1)) _P.setAway(this.P1);
                //                else if ((this.getCode() === "circle") && this.P2.near(x1, y1)) _P.setAway(this.P2);
                //                // Si l'un des points constituant du deuxième cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                else if (_C.P1.near(x1, y1)) _P.setAway(_C.P1);
                //                else if ((_C.getCode() === "circle") && _C.P2.near(x1, y1)) _P.setAway(_C.P2);
            } else {
                _P.setOrder(1);
                _P.setXY(x1, y1);
                // Si l'un des points constituant du deuxième cercle est sur l'autre
                // intersection, il faut en rester loin :
                if (this.P1.near(x0, y0)) _P.setAway(this.P1);
                else if (this.fixIntersection(x0, y0, _P)) null;
                else if (_C.P1.near(x0, y0)) _P.setAway(_C.P1);
                else _C.fixIntersection(x0, y0, _P);
                //                // Si l'un des points constituant de ce cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                if (this.P1.near(x0, y0)) _P.setAway(this.P1);
                //                else if ((this.getCode() === "circle") && this.P2.near(x0, y0)) _P.setAway(this.P2);
                //                // Si l'un des points constituant du deuxième cercle est sur l'autre
                //                // intersection, il faut en rester loin :
                //                else if (_C.P1.near(x0, y0)) _P.setAway(_C.P1);
                //                else if ((_C.getCode() === "circle") && _C.P2.near(x0, y0)) _P.setAway(_C.P2);
            }
        }
    }

    this.intersectCircleCircle = function(c2, _P) {
        // Determine Circle/Circle intersection :
        var xC1 = this.getP1().getX(),
            yC1 = this.getP1().getY();
        var xC2 = c2.getP1().getX(),
            yC2 = c2.getP1().getY();
        var dx = xC2 - xC1,
            dy = yC2 - yC1;
        var r = Math.sqrt(dx * dx + dy * dy);
        var r1 = this.getR(),
            r2 = c2.getR();
        if (r > (r1 + r2)) {
            _P.setXY(NaN, NaN);
            return;
        }
        if (r === 0) {}
        var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
        dx /= r;
        dy /= r;
        var x = xC1 + l * dx,
            y = yC1 + l * dy;
        var h = r1 * r1 - l * l;
        if (h < 0) {
            _P.setXY(NaN, NaN);
            return;
        }
        h = Math.sqrt(h);
        //        var hDX = h * dx, hDY = h * dy;

        if (_P.getAway()) {
            if (_P.getAway().near(x + h * dy, y - h * dx)) {
                _P.setXY(x - h * dy, y + h * dx);
            } else {
                _P.setXY(x + h * dy, y - h * dx);
            }
        } else {
            if (_P.getOrder() === 0) {
                _P.setXY(x + h * dy, y - h * dx);
            } else {
                _P.setXY(x - h * dy, y + h * dx);
            }
        }



        //        if (_P.getOrder() === 0) {
        //            _P.setXY(x + h * dy, y - h * dx);
        //        } else {
        //            _P.setXY(x - h * dy, y + h * dx);
        //        }
    };

    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("circle")) {
            this.intersectCircleCircle(_C, _P);
        }
    };

    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("circle")) {
            // Determine Circle/Circle intersection :
            var xC1 = this.getP1().getX(),
                yC1 = this.getP1().getY();
            var xC2 = _C.getP1().getX(),
                yC2 = _C.getP1().getY();
            var dx = xC2 - xC1,
                dy = yC2 - yC1;
            var r = Math.sqrt(dx * dx + dy * dy);
            var r1 = this.getR(),
                r2 = _C.getR();
            if (r > (r1 + r2))
                return null;
            if (r === 0) {}
            var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
            dx /= r;
            dy /= r;
            var x = xC1 + l * dx,
                y = yC1 + l * dy;
            var h = r1 * r1 - l * l;
            if (h < 0) {
                return null;
            }
            h = Math.sqrt(h);
            var x0 = x + h * dy,
                y0 = y - h * dx,
                x1 = x - h * dy,
                y1 = y + h * dx;
            var d0 = (_x - x0) * (_x - x0) + (_y - y0) * (_y - y0);
            var d1 = (_x - x1) * (_x - x1) + (_y - y1) * (_y - y1);
            if (d0 < d1) {
                return [x0, y0];
            } else {
                return [x1, y1];
            }
        }
    };

    this.beginTrack = function() {
        lastx = this.getP1().getX();
        lasty = this.getP1().getY();
        lastr = this.getR();
    };

    this.drawTrack = function(ctx) {
        var x0 = this.getP1().getX(),
            y0 = this.getP1().getY(),
            r = this.getR();
        if (!isNaN(x0) && !isNaN(y0) && !isNaN(r)) {
            if ((x0 !== lastx) || (y0 != lasty) || (r != lastr)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';

                if (!isNaN(lastx) && !isNaN(lasty) && !isNaN(lastr)) {
                    ctx.beginPath();
                    switch (this.getCode()) {
                        case "ray":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            //                            ctx.lineTo(r, ymax);
                            break;
                        case "segment":
                            ctx.moveTo(this.getP1().getX(), this.getP1().getY());
                            ctx.lineTo(this.getP2().getX(), this.getP2().getY());
                            break;
                        default:
                            ctx.beginPath();
                            ctx.arc(x0, y0, r, 0, Math.PI * 2, true);
                            break;
                    }
                    ctx.stroke();
                }
            }
        }
        lastx = x0;
        lasty = y0;
        lastr = r;
    };


    this.mouseInside = function(ev) {
        return $U.isNearToCircle(this.P1.getX(), this.P1.getY(), this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };

    // Alpha, for CaRMetal .zir translation :
    this.transformAlpha = function(_alpha) {
        return -_alpha;
    };


};
//************************************************
//*************** POINT OBJECT *******************
//************************************************
function PointObject(_construction, _name, _x, _y) {
    var parent = $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage


    var Cn = _construction;
    var me = this;
    var shape = 0; // 0 for circle, 1 for cross,
    var X = _x,
        Y = _y;
    var X_old = 0,
        ORG3D = null;
    var X3D = NaN,
        Y3D = NaN,
        Z3D = NaN;
    var X3D_OLD = NaN,
        Y3D_OLD = NaN,
        Z3D_OLD = NaN;
    var pt3D = Cn.getInterpreter().getEX().EX_point3D;

    var EXY = null;

    var lastX = _x,
        lastY = _y; // For TrackObject;
    var order = 0; // order, only for Intersection points 
    var inc = 0; // increment
    var macrosource = null;
    var away = null;
    var fillStyle = this.prefs.color.point_free;
    var aTXT, cosTXT, sinTXT; // angle donnant la position du nom autour du point
    var isStr = $U.isStr;
    var isArray = $U.isArray;




    var currentMagnet = null; // Pour gérer les changements de magnétisme : utilise pour
    // les traces d'objets.

    this.blocks.setMode(["onlogo", "onmousedown", "ondrag", "onmouseup", "oncompute"], "ondrag");

    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    this.isAnimationPossible = function() {
        return ((this.getParentLength() === 1) && (this.getParentAt(0).getAlphaBounds));
    }

    this.getAnimationSpeedTab = function() {
        return this.getParentAt(0).getAnimationSpeedTab();
    }

    this.getAnimationParams = function(mx, my) {
        return this.getParentAt(0).getAnimationParams(X, Y, mx, my);
    }

    this.incrementAlpha = function(anim) {
        var v = anim.speed;
        var s = anim.direction;
        var ar = anim.ar;
        var d = new Date();
        anim.delay = d.getTime() - anim.timestamp;
        anim.timestamp = d.getTime();
        // b[0] et b[1] indiquent l'intervalle Alpha
        // b[2] indique l'incrément
        var b = me.getParentAt(0).getAlphaBounds(anim, me);
        // console.log(b[2]);
        if (b) {
            Alpha += b[2];
            if (Alpha < b[0]) {
                if (ar) {
                    anim.direction *= -1;
                    Alpha = 2 * b[0] - Alpha;
                } else {
                    Alpha = b[1] + Alpha - b[0];
                }
            }
            if (Alpha > b[1]) {
                if (ar) {
                    anim.direction *= -1;
                    Alpha = 2 * b[1] - Alpha;
                } else {
                    Alpha = b[0] + Alpha - b[1];
                }
            }
            if (Alpha < b[0]) Alpha = b[0];
            if (Alpha > b[1]) Alpha = b[1];
        }
        me.blocks.evaluate("ondrag");
    };

    // ****************************************
    // ****************************************


    this.getValue = function() {

        if (EXY)
            return EXY.value();
        if (Cn.is3D()) {
            //            if (me === ORG3D)
            if (Cn.isOrigin3D(me))
                return [0, 0, 0];
            else if (me.is3D())
                return me.coords3D();
            //            else return me.coords3D();
        }
        return [me.getCn().coordsSystem.x(X), me.getCn().coordsSystem.y(Y)];
    };


    this.isMoveable = function() {
        return (this.getParentLength() < 2);
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("point")) {
            // Si les points sont confondus :
            if ($U.approximatelyEqual(X, _C.getX()) && $U.approximatelyEqual(Y, _C.getY())) {
                return true;
            }
        }
        return false;
    };

    this.setNamePosition = function(_a) {
        aTXT = _a;
        cosTXT = Math.cos(_a);
        sinTXT = Math.sin(_a);
    };

    this.getNamePosition = function() {
        return aTXT;
    };

    this.setNamePosition(0);


    this.setAway = function(_P) {
        away = _P;
    };

    this.getAway = function() {
        return away;
    };

    this.setFillStyle = function() {
        var len = this.getParentLength();
        switch (len) {
            case 0:
                // Point libre :
                fillStyle = this.prefs.color.point_free;
                break;
            case 1:
                // Point sur objet :
                fillStyle = this.prefs.color.point_on;
                break;
            case 2:
                // Point d'intersection :
                fillStyle = this.prefs.color.point_inter;
                break;
        }
    }

    this.forceFillStyle = function(_fs) {
        fillStyle = this.prefs.color.point_inter;
    };

    this.setMacroSource = function(_p) {
        macrosource = _p;
    };
    this.execMacroSource = function(_src) {
        if (!macrosource)
            return false;
        macrosource(_src);
        return true;
    };

    this.getAssociatedTools = function() {
        var at = "@namemover,@callproperty,@calltrash,segment,line,ray,midpoint,symc,perpbis,anglebiss,vector,BR,circle,circle1,circle3,circle3pts,arc3pts,area,angle,fixedangle";
        if (this.isMoveable())
            at += ",@objectmover";
        if (this.getParentLength() === 0)
            at += ",@anchor";
        else
            at += ",@noanchor";
        if ((this.getEXY()) || ((this.getParentLength() === 0) && (!this.getFloat())))
            at += ",@callcalc";
        at += ",@blockly";
        if (this.isMoveable()) {
            at += ",@pushpin";
            at += ",@magnet";
        }
        if (this.isAnimationPossible())
            at += ",@spring";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        return at;
    };

    this.setIncrement = function(_i) {
        if (this.getParentLength() < 2) {
            inc = _i;
            this.computeIncrement(X, Y);
        }
    };
    this.getIncrement = function() {
        return inc;
    };

    this.computeIncrement = function(_x, _y) {
        if (inc) {
            var x = this.getCn().coordsSystem.x(_x);
            var y = this.getCn().coordsSystem.y(_y);
            x = inc * Math.round(x / inc);
            y = inc * Math.round(y / inc);
            x = this.getCn().coordsSystem.px(x);
            y = this.getCn().coordsSystem.py(y);
            this.setXY(x, y);
        } else {
            this.setXY(_x, _y);
        }
    };

    this.isInstanceType = function(_c) {
        return (_c === "point");
    };
    this.getCode = function() {
        return "point";
    };
    this.getFamilyCode = function() {
        return "point";
    };


    this.setShape = function(_shape) {
        shape = _shape;
        switch (shape) {
            case 0:
                paintProc = paintCircle;
                break;
            case 1:
                paintProc = paintCross;
                break;
            case 2:
                paintProc = paintDiamond;
                break;
            case 3:
                paintProc = paintSquare;
                break;
        }
    };
    this.getShape = function() {
        return shape;
    };

    this.isPointOn = function() {
        return (this.getParentLength() === 1);
    };


    this.setOrder = function(_n) {
        order = _n;
    };
    this.getOrder = function() {
        return order;
    };

    // Alpha represents relative coord for point on object M :
    // For lines by two points, and segments, it's P1M= Alpha x P1P2
    // For lines by one point (parallel, perpendicular), it's PM= Alpha x U (U=unit vector of line)
    // For Circle, it's a radian in [0;2π[
    var Alpha = 0;
    this.setAlpha = function(_a) {
        // console.log("Alpha="+_a);
        Alpha = _a;
    };
    this.getAlpha = function() {
        // console.log(Alpha);
        return Alpha;
    };

    // Pour la redéfinition d'objet (par exemple Point libre/Point sur) :
    this.attachTo = function(_o) {
        this.setParentList(_o.getParent());
        this.setXY(_o.getX(), _o.getY());
        var childs = _o.getChildList();
        for (var i = 0, len = childs.length; i < len; i++) {
            childs[i].redefine(_o, this);
        }
        Cn.remove(_o);
        this.setFillStyle();
        Cn.reconstructChilds();
        this.computeChilds();
    };
    this.deleteAlpha = function() {
        var parents = this.getParent();
        this.setXY(this.getX() + 25, this.getY() - 25);
        for (var i = 0, len = parents.length; i < len; i++) {
            parents[i].deleteChild(this);
        }
        this.setParent();
        this.setFillStyle();
        Cn.reconstructChilds();
        this.computeChilds();
    };

    this.getX = function() {
        return X;
    };
    this.getY = function() {
        return Y;
    };

    this.setXY = function(x, y) {
        X = x;
        Y = y;
    };

    this.setxy = function(x, y) {
        X = Cn.coordsSystem.px(x);
        Y = Cn.coordsSystem.py(y);
    };
    this.getx = function() {
        return Cn.coordsSystem.x(X);
    };
    this.gety = function() {
        return Cn.coordsSystem.y(Y);
    };

    // Seulement pour les points magnétiques :
    this.projectMagnetAlpha = function(p) {};
    this.setMagnetAlpha = function(p) {};

    /*************************************
     ************************************* 
     ***********  3D part  ***************
     *************************************
     *************************************/

    this.setXYZ = function(_coords) {
        X3D = _coords[0];
        Y3D = _coords[1];
        Z3D = _coords[2];
        if (ORG3D === null) {
            ORG3D = Cn.get3DOrigin(me);
        }
        var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], _coords);
        X = Cn.coordsSystem.px(c2d[0]);
        Y = Cn.coordsSystem.py(c2d[1]);
    }

    this.getXYZ = function() {
        return [X3D, Y3D, Z3D];
    };

    // Abscisse sauvegardée par le 1er tour
    // de compute, correspondant à phi=phi+delta :
    this.storeX = function() {
        X_old = X;
    };

    this.getOldcoords = function() {
        return [X3D_OLD, Y3D_OLD, Z3D_OLD];
    };

    this.coords3D = function() {
        if (!isNaN(X3D))
            return [X3D_OLD = X3D, Y3D_OLD = Y3D, Z3D_OLD = Z3D];
        if (ORG3D === null) {
            ORG3D = Cn.get3DOrigin(me);
            if (ORG3D === null)
                return [NaN, NaN, NaN];
        }
        var phi = Cn.getPhi();
        var theta = Cn.getTheta();
        var stheta = Cn.sin(theta);
        var ctheta = Cn.cos(theta);
        var sphi = Cn.sin(phi[0]),
            sphid = Cn.sin(phi[1]);
        var cphi = Cn.cos(phi[0]),
            cphid = Cn.cos(phi[1]);
        var dis = sphi * cphid - sphid * cphi;
        var xO = ORG3D.getX();
        X3D_OLD = ((X_old - xO) * cphid - (X - xO) * cphi) / dis;
        Y3D_OLD = (sphi * (X - xO) - sphid * (X_old - xO)) / dis;
        Z3D_OLD = (X3D_OLD * cphid * stheta - Y3D_OLD * sphid * stheta + ORG3D.getY() - Y) / ctheta;
        X3D_OLD = Cn.coordsSystem.l(X3D_OLD);
        Y3D_OLD = Cn.coordsSystem.l(Y3D_OLD);
        Z3D_OLD = Cn.coordsSystem.l(Z3D_OLD);
        return [X3D_OLD, Y3D_OLD, Z3D_OLD];
    };

    this.coords2D = function() {
        return [Cn.coordsSystem.x(this.getX()), Cn.coordsSystem.y(this.getY())];
    };




    this.getEXY = function() {
        return EXY;
    };

    // Pour Blockly :
    parent.setExpression = this.setExpression = function(exy) {
        var elt;
        try {
            elt = JSON.parse(exy);
        } catch (e) {
            elt = exy;
        }
        if ((elt.constructor === Array) && (elt.length === 2)) {
            me.setExp(Cn.coordsSystem.px(elt[0]), Cn.coordsSystem.py(elt[1]));
        } else {
            me.setExp(exy);
        }
    }
    parent.getExpression = this.getExpression = function() {
        return me.getExp();
    }

    // exy est soit une formule (string), soit un nombre. S'il s'agit
    // d'un nombre, c'est l'abscisse et le second param
    // est l'ordonnée. S'il s'agit d'une formule, et s'il y a un second
    // param, celui-ci est un booléen qui indique s'il s'agit ou non d'un point 3D.
    // S'il n'y a pas de second param, le logiciel détermine s'il s'agit d'un
    // point 2d ou 3d.
    // setExp pour les widgets  :
    this.setExp = this.setEXY = function(exy, ey) {
        // console.log(exy);
        if (isStr(exy)) {
            // Si ex et ey sont des expressions :
            me.setParent();
            EXY = Expression.delete(EXY);
            EXY = new Expression(me, exy);
            fillStyle = me.prefs.color.point_fixed;
            me.isMoveable = function() {
                return false;
            };
            me.setXY = function(_x, _y) {};
            me.compute = computeFixed;
            me.getSource = getSourceFixed;

            var t = EXY.value();
            me.set3D((isArray(t)) && (t.length === 3));

        } else {
            // Si ex et ey sont des nombres :
            EXY = Expression.delete(EXY);
            X = exy;
            Y = ey;
            fillStyle = me.prefs.color.point_free;
            me.isMoveable = function() {
                return true;
            };
            me.setXY = function(x, y) {
                X = x;
                Y = y;
            };
            me.compute = computeGeom;
            me.getSource = getSourceGeom;
            me.setParent()
        }
    };

    this.getExp = function() {
        if ((this.getEXY) && (this.getEXY()) && this.getEXY().getSource && this.getEXY().getSource()) {
            return this.getEXY().getSource();
        } else {
            return "";
        }
    };

    this.near = function(_x, _y) {
        return ((Math.abs(X - _x) < 1E-10) && (Math.abs(Y - _y) < 1E-10));
    }

    this.dragObject = function(_x, _y) {
        this.computeIncrement(_x, _y);
        if (this.getParentLength() === 1) {
            this.getParentAt(0).project(this);
            this.getParentAt(0).setAlpha(this);
            return;
        }
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };



    var magnetsSortFilter = function(a, b) {
        var ap = a[0].isInstanceType("point");
        var bp = b[0].isInstanceType("point");
        if (ap && bp)
            return (a[1] - b[1]);
        else if (ap)
            return -1;
        else if (bp)
            return 1;
        else
            return (a[1] - b[1]);
    }

    this.computeMagnets = function() {
        var mgObj = null;
        var t = this.getMagnets();
        if (t.length === 0)
            return;
        var reps = [];
        for (var i = 0; i < t.length; i++) {
            var c = t[i][0].projectXY(X, Y);
            var pt = new VirtualPointObject(c[0], c[1]);
            t[i][0].setMagnetAlpha(pt);
            t[i][0].projectMagnetAlpha(pt);
            c[0] = pt.getX();
            c[1] = pt.getY();
            var d2 = (c[0] - X) * (c[0] - X) + (c[1] - Y) * (c[1] - Y);
            // Si la distance entre le projeté et le point
            // de coordonnées (_x,_y) est inférieure au rayon d'attaction :
            if (d2 < t[i][1] * t[i][1])
                reps.push([t[i][0], d2, c[0], c[1]]);
        }
        if (reps.length > 0) {
            reps.sort(magnetsSortFilter);
            mgObj = reps[0][0];
            this.setXY(reps[0][2], reps[0][3]);
            //            reps[0][0].setAlpha(this);
            //            reps[0][0].projectAlpha(this);
            this.computeChilds();
        }
        if (currentMagnet != mgObj) {
            currentMagnet = mgObj;
            lastX = X;
            lastY = Y;
            for (var i = 0, len = this.getChildLength(); i < len; i++) {
                this.getChildAt(i).beginTrack();
            }
        }
    };

    this.checkMagnets = function() {
        if (this.getMagnets().length) {
            this.computeMagnets();
            //            this.dragObject(X, Y);
            if (this.getParentLength() === 1) {
                this.getParentAt(0).project(this);
                this.getParentAt(0).setAlpha(this);
            }
        }
    }

    this.projectXY = function(_x, _y) {
        return [X, Y];
    };

    this.mouseInside = function(ev) {
        if (isNaN(X + Y))
            return false;
        if (((Math.abs(this.mouseX(ev) - X) < this.getOversize())) && (Math.abs(this.mouseY(ev) - Y) < this.getOversize())) {
            return true;
        }
        return false;
    };

    var computeGeom = function() {
        //        console.log(this.getName()+" len="+this.getParentLength());
        //        this.computeMagnets();
        //console.log(this.getName()+" : ");
        var len = this.getParentLength();
        if (len === 0)
            return;
        if (len === 1) {
            // This is a point on object :
            this.getParentAt(0).projectAlpha(this);
        } else if (len === 2) {
            // This is an intersection point :
            this.getParentAt(0).intersect(this.getParentAt(1), this);
            this.getParentAt(0).checkIfValid(this);
            this.getParentAt(1).checkIfValid(this);
        }
    };


    var computeFixed = function() {
        EXY.compute();
        var t = EXY.value();
        // console.log(this.getParent());
        //        if (this.getName()==="A") console.log("t="+t);
        if (isArray(t)) {
            // S'il s'agit d'un point 3D :
            if (t.length === 3) {
                if (ORG3D === null) {
                    ORG3D = Cn.get3DOrigin(me);
                }
                X3D = t[0];
                Y3D = t[1];
                Z3D = t[2];
                var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], t);
                X = Cn.coordsSystem.px(c2d[0]);
                Y = Cn.coordsSystem.py(c2d[1]);
            } else {
                // Sinon on est en 2D :
                X3D = NaN;
                Y3D = NaN;
                Z3D = NaN;
                X = Cn.coordsSystem.px(t[0]);
                Y = Cn.coordsSystem.py(t[1]);
            }
        } else {
            X = NaN;
            Y = NaN;
        }
    };

    this.compute = computeGeom;

    this.refreshNames = function() {
        if (EXY)
            EXY.refreshNames();
    };


    var paintTxt = function(ctx, txt) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "left";

        var sz = 2 * me.getRealsize();
        var xtxt = sz * cosTXT + ctx.measureText(txt).width * (cosTXT - 1) / 2;
        var ytxt = sz * sinTXT + me.getFontSize() * (sinTXT - 1) / 2;
        ctx.fillText(txt, X + xtxt, Y - ytxt);
    }

    this.paintLength = function(ctx) {
        var prec = this.getPrecision();
        var x = $L.number(Math.round(this.getCoordsSystem().x(X) * prec) / prec);
        var y = $L.number(Math.round(this.getCoordsSystem().y(Y) * prec) / prec);
        var txt = this.getShowName() ? this.getSubName() : "";
        txt += "(" + x + $L.separator_coords + y + ")";
        paintTxt(ctx, txt);
    };

    this.paintName = function(ctx) {
        // Si une mesure doit être affichée, paintLength se chargera
        // d'afficher le nom avec :
        if (this.getPrecision() === -1)
            paintTxt(ctx, this.getSubName());
    };


    var paintCircle = function(ctx) {
        if (me.getOpacity() === 0)
            ctx.fillStyle = fillStyle;
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(X, Y, me.getRealsize(), 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };
    var paintCross = function(ctx) {
        var sz = me.getRealsize() * 0.9;
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.moveTo(X - sz, Y + sz);
        ctx.lineTo(X + sz, Y - sz);
        ctx.moveTo(X - sz, Y - sz);
        ctx.lineTo(X + sz, Y + sz);
        ctx.stroke();
    };
    var paintSquare = function(ctx) {
        var sz = me.getRealsize() * 1.8;
        if (me.getOpacity() === 0)
            ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.rect(X - sz / 2, Y - sz / 2, sz, sz);
        ctx.fill();
        ctx.stroke();
    };
    var paintDiamond = function(ctx) {
        var sz = me.getRealsize() * 1.3;
        if (me.getOpacity() === 0)
            ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = me.prefs.size.pointborder;
        ctx.beginPath();
        ctx.moveTo(X, Y - sz);
        ctx.lineTo(X - sz, Y);
        ctx.lineTo(X, Y + sz);
        ctx.lineTo(X + sz, Y);
        ctx.lineTo(X, Y - sz);
        ctx.fill();
        ctx.stroke();
    };

    this.beginTrack = function() {
        lastX = X;
        lastY = Y;
    };

    this.drawTrack = function(ctx) {
        if (!isNaN(X) && !isNaN(Y) && !this.isHidden()) {
            if ((X !== lastX) || (Y != lastY)) {
                ctx.strokeStyle = this.getColor().getRGBA();
                ctx.lineWidth = this.getSize();
                ctx.lineCap = 'round';
                if (!isNaN(lastX) && !isNaN(lastY)) {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(X, Y);
                    ctx.stroke();
                }
            }
        }
        lastX = X;
        lastY = Y;
    };

    var paintProc = paintCircle;

    this.paintObject = function(ctx) {
        paintProc(ctx);
    };

    var getSourceGeom = function(src) {
        if (this.execMacroSource(src))
            return;
        var len = this.getParentLength();
        var x = this.getCn().coordsSystem.x(this.getX());
        var y = this.getCn().coordsSystem.y(this.getY());
        switch (len) {
            case 0:
                src.geomWrite(false, this.getName(), "Point", x, y);
                break;
            case 1:
                // point sur objet :
                src.geomWrite(false, this.getName(), "PointOn", this.getParentAt(0).getVarName(), Alpha);
                //                src.geomWrite(false, this.getName(), "PointOn", this.getParentAt(0).getName(), x, y);
                break;
            case 2:
                // point d'intersection :
                if (away) {
                    src.geomWrite(false, this.getName(), "OrderedIntersection", this.getParentAt(0).getVarName(), this.getParentAt(1).getVarName(), order, away.getVarName());
                } else {
                    src.geomWrite(false, this.getName(), "OrderedIntersection", this.getParentAt(0).getVarName(), this.getParentAt(1).getVarName(), order);
                }
                break;
        }
    };

    var getSourceFixed = function(src) {
        if (this.execMacroSource(src))
            return;
        var _ex = EXY.getUnicodeSource().replace(/\n/g, "\\n");
        src.geomWrite(true, this.getName(), "Point", _ex, (me.is3D()) ? 1 : 0);
    };

    this.getSource = getSourceGeom;

    this.setDefaults("point");
};
//************************************************
//*************** SEGMENT OBJECT *******************
//************************************************
function SegmentObject(_construction, _name, _P1, _P2) {
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, _P1, _P2, true)); // Héritage
    var me = this;
    this.setParent(this.P1, this.P2);


    this.getCode = function() {
        return "segment";
    };


    this.getAssociatedTools = function() {
        return superObject.getAssociatedTools() + ",midpoint,perpbis";
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l($U.d(me.P1, me.P2)));
    };

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

    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var inc = anim.direction * (anim.speed * anim.delay / 1000) / $U.d(this.P1, this.P2);
        return [0, 1, inc]
    };


    // ****************************************
    // ****************************************

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

    //    this.redefine = function(_old,_new) {
    ////        superObject.redefine(_old,_new);
    //        console.log("redefine fonction");
    //        if (_old === this.P2) {
    //            console.log("redefine P2 !");
    //            this.deleteParent(_old);
    //            this.addParent(_new);
    //            _old.deleteChild(this);
    //            _new.addChild(this);
    ////            childs[i].deleteParent(_o);
    ////            _o.deleteChild(childs[i]);
    ////            childs[i].addParent(this);
    ////            this.addChild(childs[i]);
    //            
    //            
    //            this.P2=_new;
    //        }
    //    };

    //// Seulement pour les macros. Permet de désigner un segment comme initial,
    //// avec les extrémités comme intermédiaires automatiques :
    //    this.getMacroSource = function(src) {
    //        src.geomWrite(false, this.getP1().getName(), "First", this.getName());
    //        src.geomWrite(false, this.getP2().getName(), "Second", this.getName());
    //    };

    //    this.setMacroAutoObject = function() {
    //
    //        var p1 = this.getP1();
    //        var p2 = this.getP2();
    //        var s = this;
    //        var proc1 = function(src) {
    //            src.geomWrite(false, p1.getName(), "First", s.getVarName());
    //        };
    //        var proc2 = function(src) {
    //            src.geomWrite(false, p2.getName(), "Second", s.getVarName());
    //        };
    //
    //        // Défini les extrémités comme intermédiaire :
    //        p1.setMacroMode(1);
    //        p2.setMacroMode(1);
    //
    //        // Attache les getSources aux extrémités :
    //        p1.setMacroSource(proc1);
    //        p2.setMacroSource(proc2);
    //    };
    //
    //// For macro process only :
    //    this.isAutoObjectFlags = function() {
    //        return (this.getP1().Flag || this.getP2().Flag);
    //    };

    this.isInstanceType = function(_c) {
        return ((_c === "line") || (_c === "segment"));
    };

    // see if point inside 2 border points
    this.checkIfValid = function(_P) {
        var xPA = this.P1.getX() - _P.getX();
        var yPA = this.P1.getY() - _P.getY();
        var xPB = this.P2.getX() - _P.getX();
        var yPB = this.P2.getY() - _P.getY();
        if ((xPA * xPB + yPA * yPB) > 0) {
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
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.P1.getX(), this.P1.getY());
        ctx.lineTo(this.P2.getX(), this.P2.getY());
        ctx.stroke();
        ctx.lineCap = 'butt';
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Segment", this.P1.getVarName(), this.P2.getVarName());
    };


    this.setDefaults("segment");

}
//************************************************
//*************** RAY OBJECT *********************
//************************************************
function RayObject(_construction, _name, _P1, _P2) {
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, _P1, _P2, true)); // Héritage
    this.setParent(this.P1, this.P2);
    this.setDefaults("ray");

    this.getCode = function() {
        return "ray";
    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
    };



    this.isInstanceType = function(_c) {
        return ((_c === "line") || (_c === "ray"));
    };

    // see if point inside ray
    this.checkIfValid = function(_P) {
        var dx = this.getDX();
        var dy = this.getDY();
        var xAP = _P.getX() - this.P1.getX();
        var yAP = _P.getY() - this.P1.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };


    this.mouseInside = function(ev) {
        return $U.isNearToRay(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.paintObject = function(ctx) {
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.P1.getX(), this.P1.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
        ctx.lineCap = 'butt';
    };

    this.getAlphaBounds = function(anim) {
        var t = superObject.getAlphaBounds(anim);
        t[0] = 0;
        return t;
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Ray", this.P1.getVarName(), this.P2.getVarName());
    };


};
//************************************************
//*************** MIDPOINT OBJECT ****************
//************************************************
function MidPointObject(_construction, _name, _P1, _P2) {
    $U.extend(this, new PointObject(_construction, _name, 0, 0)); // Héritage
    var P1 = _P1;
    var P2 = _P2;
    this.setParent(P1, P2);
    this.setFillStyle(2);


    this.isMoveable = function() {
        return false;
    };

    this.getCode = function() {
        return "midpoint";
    };


    this.compute = function() {
        this.setXY((P1.getX() + P2.getX()) / 2, (P1.getY() + P2.getY()) / 2);
    };

    this.getSource = function(src) {
        if (this.execMacroSource(src)) return;
        src.geomWrite(false, this.getName(), "MidPoint", P1.getVarName(), P2.getVarName());
    };

};
//************************************************
//************** CIRCLE OBJECT *******************
//************************************************
function CircleObject(_construction, _name, _P1, _P2) {
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, _P1)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    this.setDefaults("circle");
    this.P2 = _P2;
    this.setParent(this.P1, this.P2)

    this.getCode = function() {
        return "circle";
    };

    this.getP2 = function() {
        return this.P2;
    };

    this.redefine = function(_old, _new) {
        if (_old === this.P2) {
            this.addParent(_new);
            this.P2 = _new;
        } else if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
        }
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(me.R));
    };

    this.fixIntersection = function(_x, _y, _P) {
        var isNear = this.P2.near(_x, _y);
        if (isNear)
            _P.setAway(this.P2);
        return isNear;
    };


    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((this.P1.getParentLength() === 0) && (this.P2.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.P1.setXY(this.P1.getX() + vx, this.P1.getY() + vy);
        this.P2.setXY(this.P2.getX() + vx, this.P2.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.computeChilds();
    };



    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.P1.getX(), this.P1.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };


    this.compute = function() {
        this.R = $U.computeRay(this.P1.getX(), this.P1.getY(), this.P2.getX(), this.P2.getY());
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle", this.P1.getVarName(), this.P2.getVarName());
    };



};
//************************************************
//************** CIRCLE 1 OBJECT *****************
//************************************************
function Circle1Object(_construction, _name, _P1, _R) {
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, _P1)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    this.setDefaults("circle");
    this.R = _R;
    var RX = null;
    var isStr = $U.isStr;
    this.setParent(this.P1);
    this.blocks.setMode(["oncompute"], "oncompute");

    me.getRX = function() {
        return RX;
    };

    // Pour Blockly :
    this.getRoot().setExpression = this.setExpression = function(exy) {
        me.setExp(exy);
    }

    // setExp pour les widgets :
    me.setExp = me.setRX = function(ex) {
        if (isStr(ex)) {
            // Si ex et ey sont des expressions :
            me.setParent(me.P1);
            RX = Expression.delete(RX);
            RX = new Expression(me, ex);
            me.isMoveable = function() {
                return false;
            };
            me.compute = computeFixed;
            me.getSource = getSourceFixed;
        } else {
            // Si ex et ey sont des nombres :
            RX = Expression.delete(RX);
            me.R = ex;
            me.isMoveable = function() {
                return true;
            };
            me.compute = computeGeom;
            me.getSource = getSourceGeom;
            me.setParent(me.P1)
        }
        //        me.compute();
        //        me.computeChilds();
    };

    me.getExp = function() {
        return me.getRX().getSource();
    };

    me.getR = function() {
        return me.R;
    }

    this.redefine = function(_old, _new) {
        if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
        }
    };

    this.getCode = function() {
        return "circle1";
    };

    this.getAssociatedTools = function() {
        var at = "@callproperty,@calltrash,point";
        if (this.getCn().findPtOn(this) !== null)
            at += ",locus";
        if (this.isMoveable())
            at += ",@objectmover";
        at += ",@callcalc,@blockly";
        return at;
    };

    this.isMoveable = function() {
        return true;
    };

    // Obsolete :
    this.dragObject = function(_x, _y) {
        this.R = Math.sqrt((_x - this.P1.getX()) * (_x - this.P1.getX()) + (_y - this.P1.getY()) * (_y - this.P1.getY()));
    };

    this.compute_dragPoints = function(_x, _y) {
        this.R = Math.sqrt((_x - this.P1.getX()) * (_x - this.P1.getX()) + (_y - this.P1.getY()) * (_y - this.P1.getY()));
    };


    this.computeDrag = function() {
        this.computeChilds();
    };

    this.setZoom = function(_h) {
        this.R *= _h;
    };

    this.getValue = function() {
        if (RX)
            return RX.value();
        return (me.getCn().coordsSystem.l(me.R));
    };



    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.P1.getX(), this.P1.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };


    var computeGeom = function() {};

    var computeFixed = function() {
        RX.compute();
        me.R = me.getCn().coordsSystem.lx(RX.value());
    };

    this.compute = computeGeom;

    this.refreshNames = function() {
        if (RX)
            RX.refreshNames();
    };

    var getSourceGeom = function(src) {
        src.geomWrite(false, me.getName(), "Circle1", this.P1.getVarName(), me.getCn().coordsSystem.l(me.R));
    };

    var getSourceFixed = function(src) {
        var _ex = "\"" + RX.getUnicodeSource().replace(/\n/g, "\\n") + "\"";
        src.geomWrite(false, me.getName(), "Circle1", me.P1.getVarName(), _ex);
    };



    me.getSource = getSourceGeom;



};
//************************************************
//************** CIRCLE OBJECT *******************
//************************************************
function Circle3Object(_construction, _name, _P3, _P2, _P1) {
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, _P1)); // Héritage
    var me = this;
    this.setDefaults("circle");

    this.P2 = _P2;
    this.P3 = _P3;

    this.setParent(this.P1, this.P2, this.P3)

    this.getCode = function() {
        return "circle3";
    };

    this.redefine = function(_old, _new) {
        if (_old === this.P1) {
            this.addParent(_new);
            this.P1 = _new;
        } else if (_old === this.P2) {
            this.addParent(_new);
            this.P2 = _new;
        } else if (_old === this.P3) {
            this.addParent(_new);
            this.P3 = _new;
        }
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(me.R));
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.P1.getX(), this.P1.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };

    this.compute = function() {
        this.R = $U.computeRay(this.P2.getX(), this.P2.getY(), this.P3.getX(), this.P3.getY());
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle3", this.P3.getVarName(), this.P2.getVarName(), this.P1.getVarName());
    };

};
//************************************************
//************ PARALLELLINE OBJECT ***************
//************************************************
function ParallelLineObject(_construction, _name, _L, _P1) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P1)); // Héritage
    var Cn = _construction;

    this.L = _L;

    this.setParent(this.P1, this.L);

    this.getCode = function() {
        return "parallel";
    };

    this.isMoveable = function() {
        // Si P1 est un point libre :
        if ((this.P1.getParentLength() === 0))
            return true;
        return false;
    };

    this.compute = function() {
        //        this.setDX(this.L.getDX());
        //        this.setDY(this.L.getDY());
        this.setDXDY(0, 0, this.L.getDX(), this.L.getDY());
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Parallel", this.L.getVarName(), this.P1.getVarName());
    };


};
//************************************************
//*************** PLUMB OBJECT *******************
//************************************************
function PlumbObject(_construction, _name, _L, _P1) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P1)); // Héritage

    this.L = _L;

    this.setParent(this.P1, this.L)

    this.getCode = function() {
        return "plumb";
    };


    this.isMoveable = function() {
        // Si P1 est un point libre :
        if ((this.P1.getParentLength() === 0)) return true;
        return false;
    };

    this.compute = function() {
        this.setDXDY(0, 0, this.L.getDY(), -this.L.getDX());
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Perpendicular", this.L.getVarName(), this.P1.getVarName());
    };




};
//************************************************
//********** PerpBisectorObject OBJECT ***********
//************************************************
function PerpBisectorObject(_construction, _name, _A1, _A2) {
    var M = new VirtualPointObject(0, 0);
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, M)); // Héritage

    this.A1 = _A1;
    this.A2 = _A2;

    this.setParent(this.A1, this.A2)

    this.getCode = function() {
        return "perpbis";
    };


    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((this.A1.getParentLength() === 0) && (this.A2.getParentLength() === 0)) return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        this.A1.setXY(this.A1.getX() + vx, this.A1.getY() + vy);
        this.A2.setXY(this.A2.getX() + vx, this.A2.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        this.computeChilds();
    };

    this.compute = function() {
        var xA = this.A1.getX(),
            yA = this.A1.getY();
        var xB = this.A2.getX(),
            yB = this.A2.getY();
        M.setXY((xA + xB) / 2, (yA + yB) / 2);
        this.setDXDY(0, 0, yA - yB, xB - xA);
        superObject.compute();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "PerpendicularBisector", this.A1.getVarName(), this.A2.getVarName());
    };


};
//************************************************
//***************** AREA OBJECT ******************
//************************************************
function AreaObject(_construction, _name, _Ptab) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var Cn = _construction;
    var Ptab = [];
    this.setParent();
    //    this.setOpacity(0.2);
    this.setDefaults("area");
    this.blocks.setMode(["onmousedown", "ondrag", "onmouseup"], "ondrag");
    var valid = true;
    var X = NaN,
        Y = NaN; // Coordonnées du barycentre (utilisées pour l'aire)
    var A = NaN;
    var onBounds = false;
    for (var i = 0, len = _Ptab.length; i < len - 1; i++) {
        this.addParent(_Ptab[i]);
        Ptab.push(_Ptab[i]);
    }

    this.redefine = function(_old, _new) {
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if (_old === Ptab[i]) {
                this.addParent(_new);
                Ptab[i] = _new;
                return;
            }
        }
    };

    this.isCoincident = function(_C) {
        if (_C.isInstanceType("area")) {
            // Si l'autre objet est aussi un polygone :
            return true;
        }
        return false;
    };
    this.isInstanceType = function(_c) {
        return (_c === "area");
    };
    this.getFamilyCode = function() {
        return "area";
    };
    this.getCode = function() {
        return "area";
    };
    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc,@depends,@blockly";
    };
    this.barycenter = function() {
        var len = Ptab.length;
        var xg = 0,
            yg = 0;
        for (var i = 0; i < len; i++) {
            xg += Ptab[i].getX();
            yg += Ptab[i].getY();
        }
        return [Cn.coordsSystem.x(xg / len), Cn.coordsSystem.y(yg / len)];
    };
    this.barycenter3D = function() {
        var len = Ptab.length;
        var xg = 0,
            yg = 0,
            zg = 0;
        for (var i = 0; i < len; i++) {
            var t = Ptab[i].coords3D();
            xg += t[0];
            yg += t[1];
            zg += t[2];
        }
        return [xg / len, yg / len, zg / len];
    };
    // Seulement pour les macros :
    var getMacroFunc = function(nme, vn, i) {
        return function(src) {
            src.geomWrite(false, nme, "DefinitionPoint", vn, i);
        };
    };
    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        for (var i = 0, len = Ptab.length; i < len; i++) {
            var Pt = Ptab[i];
            Pt.setMacroMode(1);
            var nme = Pt.getName();
            Pt.setMacroSource(getMacroFunc(Pt.getName(), vn, i));
        }
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        var fl = false;
        for (var i = 0; i < Ptab.length; i++) {
            fl = fl || Ptab[i].Flag;
        }
        return fl;
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        return Ptab[_i];
    }

    var isInside = function(poly, x, y) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].getY() <= y && y < poly[j].getY()) || (poly[j].getY() <= y && y < poly[i].getY())) && (x < (poly[j].getX() - poly[i].getX()) * (y - poly[i].getY()) / (poly[j].getY() - poly[i].getY()) + poly[i].getX()) && (c = !c);
        return c;
    };
    this.mouseInside = function(ev) {
        if (!valid)
            return false;
        if (this.getOpacity()) {
            return isInside(Ptab, this.mouseX(ev), this.mouseY(ev));
        }
        for (var i = 0, len = Ptab.length - 1, x = this.mouseX(ev), y = this.mouseY(ev), ov = this.getOversize(); i < len; i++) {
            if ($U.isNearToSegment(Ptab[i].getX(), Ptab[i].getY(), Ptab[i + 1].getX(), Ptab[i + 1].getY(), x, y, ov))
                return true;
        }
        return $U.isNearToSegment(Ptab[0].getX(), Ptab[0].getY(), Ptab[i].getX(), Ptab[i].getY(), x, y, ov);
    };
    this.dragObject = function(_x, _y) {
        //        console.log("dragTo !");
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        var len = Ptab.length;
        for (var i = 0; i < len; i++) {
            Ptab[i].setXY(Ptab[i].getX() + vx, Ptab[i].getY() + vy);
        }
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        Cn.computeChilds(Ptab);
    };

    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    // Renvoie les caractéristiques du côté contenant
    // un point donné :
    var getEdge = function(_xp, _yp) {
        var xp = _xp,
            yp = _yp;
        var x0 = Ptab[0].getX(),
            y0 = Ptab[0].getY();
        var x1 = Ptab[1].getX(),
            y1 = Ptab[1].getY();
        var hmin = 0;
        var AM = Math.sqrt((x0 - xp) * (x0 - xp) + (y0 - yp) * (y0 - yp));
        var MB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
        var AB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        var nMB = MB;
        var nMA, nAB;
        for (var i = 2, len = Ptab.length; i < len; i++) {
            x0 = x1;
            y0 = y1;
            x1 = Ptab[i].getX();
            y1 = Ptab[i].getY();
            nAM = nMB;
            nMB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
            nAB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
            if ((nAM + nMB - nAB) < (AM + MB - AB)) {
                hmin = i - 1;
                AM = nAM;
                MB = nMB;
                AB = nAB;
            }
        }
        x0 = x1;
        y0 = y1;
        x1 = Ptab[0].getX();
        y1 = Ptab[0].getY();
        nAM = nMB;
        nMB = Math.sqrt((x1 - xp) * (x1 - xp) + (y1 - yp) * (y1 - yp));
        nAB = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        if ((nAM + nMB - nAB) < (AM + MB - AB)) {
            hmin = i - 1;
            AM = nAM;
            MB = nMB;
            AB = nAB;
        }
        var hmax = (hmin === Ptab.length - 1) ? 0 : hmin + 1;
        return {
            "min": hmin,
            "max": hmax,
            "AM": AM,
            "MB": MB,
            "AB": AB
        };
    };

    this.getAlphaBounds = function(anim, _p) {
        if (Ptab.length > 1) {
            if (!anim.hasOwnProperty("min")) {
                // Recherche du segment contenant le point :
                var c = getEdge(_p.getX(), _p.getY());
                anim.min = c.min;
                anim.max = c.max;
                anim.AM = c.AM;
                anim.AB = c.AB;
            }
            var inc =
                anim.direction * (anim.speed * anim.delay / 1000);
            anim.AM += inc;
            if (anim.AM > anim.AB) {
                anim.AM = anim.AM - anim.AB;
                anim.min = anim.max;
                anim.max = (anim.min === Ptab.length - 1) ? 0 : anim.min + 1;
                anim.AB = $U.d(Ptab[anim.min], Ptab[anim.max]);
            } else if (anim.AM < 0) {
                anim.max = anim.min;
                anim.min = (anim.max === 0) ? Ptab.length - 1 : anim.max - 1;
                anim.AB = $U.d(Ptab[anim.min], Ptab[anim.max]);
                anim.AM = anim.AB + anim.AM;
            }
            var x = Ptab[anim.min].getX() + (anim.AM / anim.AB) * (Ptab[anim.max].getX() - Ptab[anim.min].getX());
            var y = Ptab[anim.min].getY() + (anim.AM / anim.AB) * (Ptab[anim.max].getY() - Ptab[anim.min].getY());
            _p.setXY(x, y);
            this.setAlpha(_p);
        };
        return null;
    };

    this.getAnimationSpeedTab = function() {
        return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000,1500];
    };

    this.getAnimationParams = function(x0, y0, mx, my) {
        var d = Math.sqrt((mx - x0) * (mx - x0) + (my - y0) * (my - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;
        var c = getEdge(x0, y0);
        var xp = Ptab[c.min].getX();
        var yp = Ptab[c.min].getY();
        var ps = (xp - x0) * (mx - x0) + (yp - y0) * (my - y0);
        var dir = (ps > 0) ? 1 : -1;
        var px = fce[f] + " px/s";
        return {
            message: px + "",
            speed: fce[f],
            direction: dir,
            ar: false
        }
    }

    // ****************************************
    // ****************************************

    this.setBoundaryMode = function(_P) {
        var c = this.projectXY(_P.getX(), _P.getY());
        var d = (_P.getX() - c[0]) * (_P.getX() - c[0]) + (_P.getY() - c[1]) * (_P.getY() - c[1]);
        _P.setOnBoundary(d < 50);
    };


    var contains = function(x, y) {
        var npoints = Ptab.length;
        if (npoints <= 2) {
            return false;
        }
        var hits = 0;
        var lastx = Ptab[npoints - 1].getX(),
            lasty = Ptab[npoints - 1].getY();
        var curx = 0,
            cury = 0;
        var test1, test2, leftx;
        for (var i = 0; i < npoints; lastx = curx, lasty = cury, i++) {
            var p = Ptab[i];
            curx = p.getX();
            cury = p.getY();
            if (cury === lasty) {
                continue;
            }
            if (curx < lastx) {
                if (x >= lastx) {
                    continue;
                }
                leftx = curx;
            } else {
                if (x >= curx) {
                    continue;
                }
                leftx = lastx;
            }

            if (cury < lasty) {
                if (y < cury || y >= lasty) {
                    continue;
                }
                if (x < leftx) {
                    hits++;
                    continue;
                }
                test1 = x - curx;
                test2 = y - cury;
            } else {
                if (y < lasty || y >= cury) {
                    continue;
                }
                if (x < leftx) {
                    hits++;
                    continue;
                }
                test1 = x - lastx;
                test2 = y - lasty;
            }

            if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
                hits++;
            }
        }

        return ((hits & 1) !== 0);
    };


    this.projectXY = function(x, y) {
        var p = Ptab[0];
        var x1 = p.getX(),
            y1 = p.getY();
        var xstart = x1,
            ystart = y1;
        var count = 0;
        var xmin = x1,
            ymin = y1,
            dmin = 1e20,
            hmin = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            p = Ptab[i];
            var x2 = p.getX(),
                y2 = p.getY();
            var dx = x2 - x1,
                dy = y2 - y1;
            var r = dx * dx + dy * dy;
            if (r > 1e-5) {
                var h = dx * (x - x1) / r + dy * (y - y1) / r;
                if (h > 1) {
                    h = 1;
                } else if (h < 0) {
                    h = 0;
                }
                var xh = x1 + h * dx,
                    yh = y1 + h * dy;
                var dist = Math.sqrt((x - xh) * (x - xh) + (y - yh) * (y - yh));
                if (dist < dmin) {
                    dmin = dist;
                    xmin = xh;
                    ymin = yh;
                    hmin = count + h;
                }
            }
            count++;
            x1 = x2;
            y1 = y2;
        }

        var x2 = xstart,
            y2 = ystart;
        var dx = x2 - x1,
            dy = y2 - y1;
        var r = dx * dx + dy * dy;
        if (r > 1e-5) {
            var h = dx * (x - x1) / r + dy * (y - y1) / r;
            if (h > 1) {
                h = 1;
            } else if (h < 0) {
                h = 0;
            }
            var xh = x1 + h * dx,
                yh = y1 + h * dy;
            var dist = Math.sqrt((x - xh) * (x - xh) + (y - yh) * (y - yh));
            if (dist < dmin) {
                dmin = dist;
                xmin = xh;
                ymin = yh;
                hmin = count + h;
            }
        }
        return [xmin, ymin];
    };

    this.project = function(p) {
        var px = p.getX(),
            py = p.getY();
        if ((p.getOnBoundary()) || (!contains(px, py))) {
            var coords = this.projectXY(px, py);
            p.setXY(coords[0], coords[1]);
        }
    };
    this.projectAlpha = function(p) {
        var G = p.getAlpha();
        if (Ptab.length > 2) {
            var xa = Ptab[0].getX(),
                ya = Ptab[0].getY();
            var xb = Ptab[1].getX(),
                yb = Ptab[1].getY();
            var xc = Ptab[2].getX(),
                yc = Ptab[2].getY();
            var xm = xa + G[0] * (xb - xa) + G[1] * (xc - xa);
            var ym = ya + G[0] * (yb - ya) + G[1] * (yc - ya);
            p.setXY(xm, ym);
            this.project(p);
            if ((p.getX() !== xm) || (p.getY() !== ym)) {
                this.setAlpha(p);
            }
        }
    };
    this.setAlpha = function(p) {
        if (Ptab.length > 2) {
            var xAB = Ptab[1].getX() - Ptab[0].getX();
            var xAC = Ptab[2].getX() - Ptab[0].getX();
            var xAM = p.getX() - Ptab[0].getX();
            var yAB = Ptab[1].getY() - Ptab[0].getY();
            var yAC = Ptab[2].getY() - Ptab[0].getY();
            var yAM = p.getY() - Ptab[0].getY();
            var det = xAB * yAC - yAB * xAC;
            if (det !== 0) {
                p.setAlpha([(xAM * yAC - xAC * yAM) / det, (xAB * yAM - xAM * yAB) / det]);
            }
        }
    };


    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var PtsTab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < Ptab.length; i++) {
            PtsTab.push({
                "alpha": i,
                "x": 0,
                "y": 0,
                "x1": 0,
                "y1": 0,
                "r": 0
            });
        }
        PtsTab.push({
            "alpha": i,
            "x": 0,
            "y": 0,
            "x1": 0,
            "y1": 0,
            "r": 0
        });
        return PtsTab;
    };

    this.setLocusAlpha = function(p, a) {
        if (a < Ptab.length)
            p.setXY(Ptab[a].getX(), Ptab[a].getY());
        else if (a === Ptab.length)
            p.setXY(Ptab[0].getX(), Ptab[0].getY());
    };


    this.getValue = function() {
        return (A);
    };
    this.compute = function() {
        X = 0;
        Y = 0;
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if (isNaN(Ptab[i].getX())) {
                valid = false;
                X = NaN;
                Y = NaN;
                return;
            }
            X += Ptab[i].getX();
            Y += Ptab[i].getY();
        }
        X = X / Ptab.length;
        Y = Y / Ptab.length;
        // Calcul de l'aire :
        var sum = 0;
        var len = Ptab.length;
        for (var i = 1; i < len; i++) {
            sum += (Ptab[i].getX() - X) * (Ptab[i - 1].getY() - Y) - (Ptab[i].getY() - Y) * (Ptab[i - 1].getX() - X);
        }
        sum += (Ptab[0].getX() - X) * (Ptab[len - 1].getY() - Y) - (Ptab[0].getY() - Y) * (Ptab[len - 1].getX() - X);
        A = this.getCn().coordsSystem.a(Math.abs(sum / 2));
        valid = true;
    };
    this.paintLength = function(ctx) {
        ctx.textAlign = "center";
        ctx.fillStyle = ctx.strokeStyle;
        var prec = this.getPrecision();
        var display = Math.round(A * prec) / prec;
        ctx.fillText($L.number(display), X, Y);
        ctx.restore();
    };
    this.paintObject = function(ctx) {
        if (valid) {
            ctx.beginPath();
            var len = Ptab.length;
            ctx.moveTo(Ptab[0].getX(), Ptab[0].getY());
            for (var i = 1; i < len; i++) {
                ctx.lineTo(Ptab[i].getX(), Ptab[i].getY());
            }
            ctx.lineTo(Ptab[0].getX(), Ptab[0].getY());
            ctx.closePath();
            ctx.fill();
            //        if (this.getSize() > 0.5) ctx.stroke();
            if ((this.getSize() > 0.5) || (this.isIndicated()))
                ctx.stroke();
        }
    };
    this.getSource = function(src) {
        var len = Ptab.length;
        var pts = [];
        for (var i = 0; i < len; i++) {
            pts.push("_" + Ptab[i].getVarName());
        }
        src.geomWrite(true, this.getName(), "Polygon", pts.join(","));
    };
};
//************************************************
//*************** MIDPOINT OBJECT ****************
//************************************************
function SymcObject(_construction, _name, _P1, _P2) {
    $U.extend(this, new PointObject(_construction, _name, 0, 0)); // Héritage
    var P1 = _P1;
    var P2 = _P2;
    this.setParent(P1, P2)
    this.setFillStyle(2);

    this.getCode = function() {
        return "symc";
    };


    this.isMoveable = function() {
        return false;
    };


    this.compute = function() {
        this.setXY(2 * P1.getX() - P2.getX(), 2 * P1.getY() - P2.getY());
    };

    this.getSource = function(src) {
        if (this.execMacroSource(src)) return;
        src.geomWrite(false, this.getName(), "Symmetry", P1.getVarName(), P2.getVarName());
    };

};
//************************************************
//*************** MIDPOINT OBJECT ****************
//************************************************
function SymaObject(_construction, _name, _L, _P) {
    $U.extend(this, new PointObject(_construction, _name, 0, 0)); // Héritage
    var L = _L;
    var P = _P;
    this.setParent(L, P)
    this.setFillStyle(2);

    this.getCode = function() {
        return "syma";
    };


    this.isMoveable = function() {
        return false;
    };


    this.compute = function() {
        L.reflect(P, this);
    };

    this.getSource = function(src) {
        if (this.execMacroSource(src)) return;
        src.geomWrite(false, this.getName(), "Reflection", L.getVarName(), P.getVarName());
    };

};
//************************************************
//********* CIRCLE 3 pts OBJECT ******************
//************************************************


function Circle3ptsObject(_construction, _name, _P1, _P2, _P3) {
    var M = new CenterObject(_construction, "_Center", this);
    _construction.add(M);

    $U.extend(this, new PrimitiveCircleObject(_construction, _name, M)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    M.setParent(this);
    M.forceFillStyle(this.prefs.color.point_inter);
    M.setHidden(true);

    var me = this;
    var P1 = _P1;
    var P2 = _P2;
    var P3 = _P3;
    this.setParent(P1, P2, P3);

    this.redefine = function(_old, _new) {
        if (_old === P1) {
            this.addParent(_new);
            P1 = _new;
        } else if (_old === P2) {
            this.addParent(_new);
            P2 = _new;
        } else if (_old === P3) {
            this.addParent(_new);
            P3 = _new;
        }
    };

    this.setDefaults("circle");

    this.getCode = function() {
        return "circle3pts";
    };

    this.getM = function() {
        return M;
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(me.R));
    };

    this.fixIntersection = function(_x, _y, _P) {
        if (P1.near(_x, _y)) {
            _P.setAway(P1);
            return true;
        }
        if (P2.near(_x, _y)) {
            _P.setAway(P2);
            return true;
        }
        if (P3.near(_x, _y)) {
            _P.setAway(P3);
            return true;
        }
        return false;
    };

    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        P1.setMacroMode(1);
        P1.setMacroSource(function(src) {
            src.geomWrite(false, P1.getVarName(), "DefinitionPoint", vn, 0);
        });
        P2.setMacroMode(1);
        P2.setMacroSource(function(src) {
            src.geomWrite(false, P2.getVarName(), "DefinitionPoint", vn, 1);
        });
        P3.setMacroMode(1);
        P3.setMacroSource(function(src) {
            src.geomWrite(false, P3.getVarName(), "DefinitionPoint", vn, 2);
        });
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        return (P1.Flag || P2.Flag || P3.Flag);
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        if (_i === 0)
            return P1;
        if (_i === 1)
            return P2;
        return P3;
    };

    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((P1.getParentLength() === 0) && (P2.getParentLength() === 0) && (P3.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        M.setXY(M.getX() + vx, M.getY() + vy);
        P1.setXY(P1.getX() + vx, P1.getY() + vy);
        P2.setXY(P2.getX() + vx, P2.getY() + vy);
        P3.setXY(P3.getX() + vx, P3.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.computeChilds();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(M.getX(), M.getY(), this.R, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };

    this.compute = function() {
        var t = $U.computeCenter(P1.getX(), P1.getY(), P2.getX(), P2.getY(), P3.getX(), P3.getY());
        M.setXY(t[0], t[1]);
        this.R = $U.computeRay(M.getX(), M.getY(), P1.getX(), P1.getY());
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle3pts", P1.getVarName(), P2.getVarName(), P3.getVarName());
    };


}
//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function Arc3ptsObject(_construction, _name, _P1, _P2, _P3) {
    var M = new VirtualPointObject(0, 0);
    var M = new CenterObject(_construction, "_Center", this);
    _construction.add(M);
    $U.extend(this, new PrimitiveCircleObject(_construction, _name, M)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    M.setParent(this);
    M.forceFillStyle(this.prefs.color.point_inter);
    M.setHidden(true);

    var A = _P1;
    var B = _P2;
    var C = _P3;
    var AOC = 0; // mesure de l'angle AOC (dans [0;2π]) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π])
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π])
    var trigo = true; // sens de dessin de l'arc ( comment va-t-on de A à C)
    this.setParent(A, B, C);



    this.setDefaults("circle");

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === B) {
            this.addParent(_new);
            B = _new;
        } else if (_old === C) {
            this.addParent(_new);
            C = _new;
        }
    };

    this.getCode = function() {
        return "arc3pts";
    };

    this.getM = function() {
        return M;
    };

    this.getA = function() {
        return A;
    };

    this.getB = function() {
        return B;
    };

    this.getC = function() {
        return C;
    };

    this.fixIntersection = function(_x, _y, _P) {
        if (A.near(_x, _y)) {
            _P.setAway(A);
            return true;
        }
        if (B.near(_x, _y)) {
            _P.setAway(B);
            return true;
        }
        if (C.near(_x, _y)) {
            _P.setAway(C);
            return true;
        }
        return false;
    };


    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        A.setMacroMode(1);
        A.setMacroSource(function(src) {
            src.geomWrite(false, A.getVarName(), "DefinitionPoint", vn, 0);
        });
        B.setMacroMode(1);
        B.setMacroSource(function(src) {
            src.geomWrite(false, B.getVarName(), "DefinitionPoint", vn, 1);
        });
        C.setMacroMode(1);
        C.setMacroSource(function(src) {
            src.geomWrite(false, C.getVarName(), "DefinitionPoint", vn, 2);
        });
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        return (A.Flag || B.Flag || C.Flag);
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        if (_i === 0)
            return A;
        if (_i === 1)
            return B;
        return C;
    };



    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((A.getParentLength() === 0) && (B.getParentLength() === 0) && (C.getParentLength() === 0))
            return true;
        return false;
    };

    // see if point inside 2 border points
    this.checkIfValid = function(_P) {
        var a = $U.angleH(_P.getX() - this.P1.getX(), _P.getY() - this.P1.getY());
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var GOM = (trigo) ? a - fromAngle : ($U.doublePI - toAngle + a);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;
        if (GOM > AOC) {
            _P.setXY(NaN, NaN);
        }
    };

    this.projectAlpha = function(p) {
        var xA = this.P1.getX();
        var yA = this.P1.getY();
        var a = p.getAlpha();
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var GOM = (trigo) ? a - fromAngle : ($U.doublePI - toAngle + a);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;

        if (GOM > AOC) {
            var m1 = ($U.doublePI - AOC) / 2;
            var m2 = (GOM - AOC);
            if (m2 < m1) {
                a = trigo * toAngle + !trigo * fromAngle;
            } else {
                a = trigo * fromAngle + !trigo * toAngle;
            }
        }

        p.setXY(xA + this.R * Math.cos(a), yA - this.R * Math.sin(a));
    };

    this.setAlpha = function(p) {
        // Calcul de l'angle AOM (si sens trigo) ou COM si sens des aiguilles (dans [0;2π]):
        var m = $U.angleH(p.getX() - this.P1.getX(), p.getY() - this.P1.getY());
        var GOM = (trigo) ? m - fromAngle : ($U.doublePI - toAngle + m);
        GOM += ((GOM < 0) - (GOM > $U.doublePI)) * $U.doublePI;

        if (GOM > AOC) {
            var m1 = ($U.doublePI - AOC) / 2;
            var m2 = (GOM - AOC);
            if (m2 < m1) {
                p.setAlpha(trigo * toAngle + !trigo * fromAngle);
            } else {
                p.setAlpha(trigo * fromAngle + !trigo * toAngle);
            }
        } else {
            p.setAlpha(m);
        }
    };


    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        M.setXY(M.getX() + vx, M.getY() + vy);
        A.setXY(A.getX() + vx, A.getY() + vy);
        B.setXY(B.getX() + vx, B.getY() + vy);
        C.setXY(C.getX() + vx, C.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.computeChilds();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.arc(M.getX(), M.getY(), this.R, -fromAngle, -toAngle, trigo);
        ctx.fill();
        ctx.stroke();
    };



    this.compute = function() {
        var t = $U.computeArcParams(A.getX(), A.getY(), B.getX(), B.getY(), C.getX(), C.getY());
        M.setXY(t.centerX, t.centerY);
        fromAngle = t.startAngle;
        toAngle = t.endAngle;
        trigo = t.Trigo;
        AOC = t.AOC;

        this.R = $U.computeRay(M.getX(), M.getY(), A.getX(), A.getY());
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Arc3pts", A.getVarName(), B.getVarName(), C.getVarName());
    };

    this.mouseInside = function(ev) {
        return $U.isNearToArc(M.getX(), M.getY(), AOC, fromAngle, toAngle, trigo, this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
        //        return $U.isNearToArc(M.getX(), M.getY(), A.getX(), A.getY(), B.getX(), B.getY(), C.getX(), C.getY(), this.R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


};
function CenterObject(_construction, _name, _C) {
    $U.extend(this, new PointObject(_construction, _name)); // Héritage
    //    this.setHidden(true);
    var C = _C;


    //    this.setParent(C);

    this.startDrag = function() {};
    this.dragTo = function() {};
    this.compute = function() {};
    this.isMoveable = function() {
        return false;
    };
    this.setFillStyle = function() {
        this.forceFillStyle(this.prefs.color.point_inter);
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Center", C.getVarName());
    };

}
//************************************************
//************ BISSECTOR OBJECT ******************
//************************************************


function AngleBisectorObject(_construction, _name, _P1, _P2, _P3) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P2)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var M = new VirtualPointObject(0, 0);
    var P1 = _P1;
    var P2 = _P2;
    var P3 = _P3;
    this.setParent(P1, P2, P3)

    this.setDefaults("ray");

    this.redefine = function(_old, _new) {
        if (_old === P1) {
            this.addParent(_new);
            P1 = _new;
        } else if (_old === P2) {
            this.addParent(_new);
            P2 = _new;
        } else if (_old === P3) {
            this.addParent(_new);
            P3 = _new;
        }
    };

    this.getCode = function() {
        return "anglebiss";
    };

    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((P1.getParentLength() === 0) && (P2.getParentLength() === 0) && (P3.getParentLength() === 0))
            return true;
        return false;
    };


    this.getAlphaBounds = function(anim) {
        var t = superObject.getAlphaBounds(anim);
        t[0] = 0;
        return t;
    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
    };

    // see if point inside ray
    this.checkIfValid = function(_P) {
        var dx = this.getDX();
        var dy = this.getDY();
        var xAP = _P.getX() - P2.getX();
        var yAP = _P.getY() - P2.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        M.setXY(M.getX() + vx, M.getY() + vy);
        P1.setXY(P1.getX() + vx, P1.getY() + vy);
        P2.setXY(P2.getX() + vx, P2.getY() + vy);
        P3.setXY(P3.getX() + vx, P3.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        this.compute();
        P1.computeChilds();
        P2.computeChilds();
        P3.computeChilds();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.P1.getX(), this.P1.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
    };



    this.compute = function() {
        var b = $U.d(P2, P1);
        var a = $U.d(P2, P3);
        var k = b / (a + b);
        var x = P1.getX() + k * (P3.getX() - P1.getX());
        var y = P1.getY() + k * (P3.getY() - P1.getY());
        if ($U.isNearToPoint(x, y, P2.getX(), P2.getY(), 1e-13)) {
            x = P2.getX() + (P1.getY() - P2.getY());
            y = P2.getY() + (P2.getX() - P1.getX());
        }
        M.setXY(x, y);
        this.setDXDY(P2.getX(), P2.getY(), x, y);
        superObject.compute();
    };

    this.mouseInside = function(ev) {
        return $U.isNearToRay(P2.getX(), P2.getY(), M.getX(), M.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "AngleBisector", P1.getVarName(), P2.getVarName(), P3.getVarName());
    };


};
//************************************************
//***************** AREA OBJECT ******************
//************************************************


// Lieux de points, de droites et de cercles :
function LocusObject(_construction, _name, _O, _ON) {
    var parentObject = $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage

    var NB; // nombre de côtés du polygone



    var O = _O; // Objet dont on veut le lieu
    var ON = _ON; // Point sur objet qui crée le lieu
    var Ptab;
    //    var ON.getParentAt(0).initLocusArray(NB, (O.getCode() !== "point"));

    //    var Ptab = ON.getParentAt(0).initLocusArray(NB, (O.getCode() !== "point"));

    //    parentObject.setPrecision(7);
    //    
    //    // Il s'agit ici du réglage du nombre de côté du polygone de lieu
    //    // -1 pour 1000, 1 pour 10, 2 pour 20,...
    //    var precTab=[1000,1000,20,50,100,200,500,1000,1500,2000,3000,4000,5000,5000,5000,5000,5000];
    //    
    //    this.setPrecision = function(_prec) {
    //        var p=Math.round(1*_prec);
    //        parentObject.setPrecision(p);
    //        NB=precTab[p+1];
    //        Ptab = ON.getParentAt(0).initLocusArray(NB, (O.getCode() !== "point"));
    ////        this.compute();
    ////        console.log(p);
    //    };

    this.getPrecision = function() {
        return NB;
    };
    this.getRealPrecision = function() {
        return NB;
    };
    this.setPrecision = function(_prec) {
        _prec = parseInt(_prec);
        NB = (_prec === 0) ? 1000 : _prec; // Compatibilité avec les anciens lieux
        if (NB > 500) {
            // S'il ne s'agit pas d'un lieu de point et que le point pilote
            // n'est pas sur une droite (qu'il est sur cercle ou segment), 
            // on réduit le nombre d'objets d'un facteur 10 :
            if ((_O.getCode() !== "point") && (_ON.getParentAt(0).getCode() !== "line"))
                NB = NB / 50;
            if ((_O.getCode() !== "point") && (_ON.getParentAt(0).getCode() === "line"))
                NB = NB / 5;
        }

        Ptab = ON.getParentAt(0).initLocusArray(NB, (O.getCode() !== "point"));
        NB = Ptab.length;
        //        console.log("Ptab.length="+Ptab.length+" NB="+NB);
        //        this.compute();
    };

    this.setPrecision(1000);





    var depsChain = _construction.findDeps(O, ON); // Chaine de dépendance entre O et ON (exclus)
    this.setParent(O, ON);
    this.setDefaults("locus");

    this.getAssociatedTools = function() {
        return "@callproperty,@calltrash,point";
    };

    this.isInstanceType = function(_c) {
        return (_c === "locus");
    };
    this.getCode = function() {
        return "locus";
    };
    this.getFamilyCode = function() {
        return "locus";
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var inc = 5 * Math.round(anim.direction * (anim.speed * anim.delay / 1000));
        return [0, Ptab.length - 1, inc]
    };

    this.getAnimationSpeedTab = function() {
        return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;

        var xAB = (Ptab[0].x - x0),
            yAB = (Ptab[0].y - y0);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < NB; i++) {
            xAB = (Ptab[i].x - x0);
            yAB = (Ptab[i].y - y0);
            d1 = xAB * xAB + yAB * yAB;
            if ((d1 < d2) || isNaN(d2)) {
                k = i;
                d2 = d1;
            }
        }
        var xp = Ptab[k - 1].x;
        var yp = Ptab[k - 1].y;
        var ps = (xp - x0) * (x1 - x0) + (yp - y0) * (y1 - y0);
        var dir = (ps > 0) ? 1 : -1;
        var dop = Math.sqrt((xp - x0) * (xp - x0) + (yp - y0) * (yp - y0));
        var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var cs = ps / (dop * dom);
        var aller_retour = (Math.abs(cs) < 0.707);
        var pcent = Math.round(100 * fce[f] / fce[fce.length - 1])+"%";

        return {
            message: aller_retour ? pcent + " \u21C4" : pcent + "",
            speed: fce[f],
            direction: dir,
            ar: aller_retour
        }
    }

    // ****************************************
    // ****************************************


    this.projectXY = function(_x, _y) {
        var xAB = (Ptab[0].x - _x),
            yAB = (Ptab[0].y - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < NB; i++) {
            xAB = (Ptab[i].x - _x);
            yAB = (Ptab[i].y - _y);
            d1 = xAB * xAB + yAB * yAB;
            if ((d1 < d2) || isNaN(d2)) {
                k = i;
                d2 = d1;
            }
        }
        return [Ptab[k].x, Ptab[k].y];
    };

    this.project = function(p) {
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var k = p.getAlpha();
        if (k < 0)
            k = 0;
        if (k > (Ptab.length - 1))
            k = Ptab.length - 1;
        p.setXY(Ptab[k].x, Ptab[k].y);
    };

    this.setAlpha = function(p) {
        var xAB = 0,
            yAB = 0;
        for (var i = 0; i < NB; i++) {
            xAB = (Ptab[i].x - p.getX()), yAB = (Ptab[i].y - p.getY());
            if ((xAB === 0) && (yAB === 0)) {
                p.setAlpha(i);
                return;
            }
        }
    };

    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var step = 1;
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < NB; i++) {
            Ptab.push({
                "alpha": i,
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
        if (Ptab[a] !== undefined)
            p.setXY(Ptab[a].x, Ptab[a].y);
    };


    var mouseInsidePoints = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0; i < NB; i++) {
            if ($U.isNearToPoint(Ptab[i].x, Ptab[i].y, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };

    var mouseInsideLines = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0; i < NB; i++) {
            if ($U.isNearToSegment(Ptab[i].x, Ptab[i].y, Ptab[i].x1, Ptab[i].y1, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };





    // Recalcul de la chaine de dépendance qui mène de ON à O :
    var computeDeps = function() {
        for (var k = 0, len = depsChain.length; k < len; k++) {
            depsChain[k].compute();
        }
        O.compute();
    };

    var computePoints = function() {
        for (var i = 0; i < NB; i++) {
            ON.getParentAt(0).setLocusAlpha(ON, Ptab[i].alpha);
            computeDeps();
            Ptab[i].x = O.getX();
            Ptab[i].y = O.getY();
        }
        ON.compute(); // Rétablissement de la position d'origine
        computeDeps();
    };

    var computeLines = function() {
        for (var i = 0; i < NB; i++) {
            ON.getParentAt(0).setLocusAlpha(ON, Ptab[i].alpha);
            computeDeps();
            Ptab[i].x = O.getXmin();
            Ptab[i].y = O.getYmin();
            Ptab[i].x1 = O.getXmax();
            Ptab[i].y1 = O.getYmax();
        }
        ON.compute(); // Rétablissement de la position d'origine
        computeDeps();
    };

    var computeCircles = function() {
        for (var i = 0; i < NB; i++) {
            ON.getParentAt(0).setLocusAlpha(ON, Ptab[i].alpha);
            computeDeps();
            Ptab[i].x = O.getP1().getX();
            Ptab[i].y = O.getP1().getY();
            Ptab[i].r = O.getR();
        }
        ON.compute(); // Rétablissement de la position d'origine
        computeDeps();
    };



    var paintObjectPoints = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0].x, Ptab[0].y);
        for (var i = 1; i < NB; i++) {
            ctx.lineTo(Ptab[i].x, Ptab[i].y);
        }
        ctx.stroke();
        ctx.fill();
    };

    var paintObjectLines = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0].x, Ptab[0].y);
        ctx.lineTo(Ptab[0].x1, Ptab[0].y1);
        for (var i = 1; i < NB; i++) {
            ctx.moveTo(Ptab[i].x, Ptab[i].y);
            ctx.lineTo(Ptab[i].x1, Ptab[i].y1);
        }
        ctx.stroke();

    };

    var paintObjectCircles = function(ctx) {
        ctx.beginPath();
        for (var i = 0; i < NB; i++) {
            ctx.moveTo(Ptab[i].x + Ptab[i].r, Ptab[i].y);
            ctx.arc(Ptab[i].x, Ptab[i].y, Ptab[i].r, 0, Math.PI * 2, false);

        }
        ctx.stroke();
    };


    // ***********************************************************
    // *****Initialisation de this.compute et de this.paintObject*******
    // ***********************************************************
    switch (O.getFamilyCode()) {
        case "point":
            this.compute = computePoints;
            this.paintObject = paintObjectPoints;
            this.mouseInside = mouseInsidePoints;
            break;
        case "line":
            this.compute = computeLines;
            this.paintObject = paintObjectLines;
            this.mouseInside = mouseInsideLines;
            break;
        case "circle":
            this.compute = computeCircles;
            this.paintObject = paintObjectCircles;
            this.mouseInside = mouseInsidePoints;
            break;
    }




    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Locus", O.getVarName(), ON.getVarName());
    };

};
//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function AngleObject(_construction, _name, _P1, _P2, _P3) {
    var parent = $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    var A = _P1;
    var O = _P2;
    var C = _P3;
    var R = 30;
    var AOC = 0; // mesure de l'angle AOC orienté positif (dans [0;2π[) :
    var AOC180 = 0; // mesure de l'angle AOC (dans [0;π[) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π[)
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π[)
    var trigo = true; // sens de dessin de l'arc ( comment va-t-on de A à C)
    var valid = true;
    var Cn = _construction;
    var deg_coef = 180 / Math.PI;
    var mode360 = false;



    this.setParent(A, O, C);

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === O) {
            this.addParent(_new);
            O = _new;
        } else if (_old === C) {
            this.addParent(_new);
            C = _new;
        }
    };
    this.is360 = function() {
        return mode360;
    };
    this.set360 = function(_360) {
        mode360 = _360;
    };
    this.getAOC = function() {
        return AOC;
    };
    this.getValue = function() {
        var a = mode360 ? AOC : AOC180;
        return (Cn.isDEG()) ? (a * deg_coef) : a;
    };
    this.getCode = function() {
        return "angle";
    };
    this.getFamilyCode = function() {
        return "angle";
    };

    this.isMoveable = function() {
        return true;
    };
    //Obsolete :
    this.dragObject = function(_x, _y) {
        // console.log("dragObject");
        var vx = _x - O.getX();
        var vy = _y - O.getY();
        R = Math.sqrt(vx * vx + vy * vy);
    };
    this.compute_dragPoints = function(_x, _y) {
        // console.log("compute_dragPoints");
        var vx = _x - O.getX();
        var vy = _y - O.getY();
        R = Math.sqrt(vx * vx + vy * vy);
    };
    this.computeDrag = function() {
        // console.log("computeDrag");
    };
    this.getArcRay = function() {
        return R;
    };
    this.setArcRay = function(_r) {
        R = _r;
    };
    this.paintLength = function(ctx) {
        if (valid && (!$U.approximatelyEqual(AOC180, $U.halfPI))) {
            ctx.save();
            var r = R + this.prefs.fontmargin + this.getRealsize() / 2;
            ctx.textAlign = "left";
            var prec = this.getPrecision();
            var display = (mode360) ? AOC : AOC180;
            display = display * 180 / Math.PI;
            display = Math.round(display * prec) / prec;
            var a = trigo ? -toAngle + AOC / 2 : Math.PI - toAngle + AOC / 2;
            a = a - Math.floor(a / $U.doublePI) * $U.doublePI; // retour dans [0;2π]
            if ((a > $U.halfPI) && (a < 3 * $U.halfPI)) {
                a += Math.PI;
                r = -r;
                ctx.textAlign = "right";
            }
            ctx.fillStyle = ctx.strokeStyle;
            ctx.translate(O.getX(), O.getY());
            ctx.rotate(a);
            ctx.fillText($L.number(display) + "°", r, this.getFontSize() / 2);
            ctx.restore();
        }
    };


    this.paintObject = function(ctx) {
        if (valid) {
            ctx.beginPath();
            if ($U.approximatelyEqual(AOC180, $U.halfPI)) {
                var cto = R * Math.cos(-toAngle),
                    sto = R * Math.sin(-toAngle);
                var cfrom = R * Math.cos(-fromAngle),
                    sfrom = R * Math.sin(-fromAngle);
                ctx.moveTo(O.getX() + cto, O.getY() + sto);
                ctx.lineTo(O.getX() + cto + cfrom, O.getY() + sto + sfrom);
                ctx.lineTo(O.getX() + cfrom, O.getY() + sfrom);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(O.getX(), O.getY());
                ctx.lineTo(O.getX() + cto, O.getY() + sto);
                ctx.lineTo(O.getX() + cfrom, O.getY() + sfrom);
                ctx.fill();
            } else {
                ctx.arc(O.getX(), O.getY(), R, -fromAngle, -toAngle, trigo);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(O.getX() + R * Math.cos(-toAngle), O.getY() + R * Math.sin(-toAngle));
                ctx.lineTo(O.getX(), O.getY());
                ctx.lineTo(O.getX() + R * Math.cos(-fromAngle), O.getY() + R * Math.sin(-fromAngle));
                ctx.fill();
            }
        }

    };

    this.compute = function() {
        var t = $U.computeAngleParams(A.getX(), A.getY(), O.getX(), O.getY(), C.getX(), C.getY());
        fromAngle = t.startAngle;
        toAngle = t.endAngle;
        trigo = mode360 ? true : t.Trigo;
        AOC = t.AOC;
        AOC180 = t.AOC180;
        valid = !isNaN(AOC);
        // valid = !isNaN(fromAngle);
        // console.log("fromA="+fromAngle+" toA="+toAngle+" trig="+trigo+" AOC="+AOC);
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Angle", A.getVarName(), O.getVarName(), C.getVarName());
    };

    this.mouseInside = function(ev) {
        return $U.isNearToArc(O.getX(), O.getY(), AOC, fromAngle, toAngle, trigo, R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
    };


    this.setDefaults("angle");

    // Surcharge de getStyle pour traiter
    // un cas particulier :
    this.getStyle = function(src) {
        var s = this.getStyleString();
        if (isNaN(this.getRealPrecision())) s += ";p:-1";
        src.styleWrite(true, this.getName(), "STL", s);
    };
    // this.getStyleString = function() {
    //     var s = parent.getStyleString();
    //     // console.log("this.getRealPrecision()="+this.getRealPrecision());
    //     if (isNaN(this.getRealPrecision())) s += ";p:-1";
    //     return s;
    // };

}
//************************************************
//************ FIXED ANGLE OBJECT ****************
//************************************************
function FixedAngleObject(_construction, _name, _P1, _P2, _trigo) {
    var superObject = $U.extend(this, new PrimitiveLineObject(_construction, _name, _P2));
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var me = this;
    var A = _P1;
    var O = _P2;
    var C = new VirtualPointObject(0, 0);
    var E1 = null;
    var VALUE = 0;
    var Cn = _construction;
    var R = 30;
    var AOC = 0; // mesure de l'angle AOC orienté positif (dans [0;2π[) :
    var fromAngle = 0; // Début de l'arc (xOA sens trigo dans [0;2π[)
    var toAngle = 0; // Fin de l'arc (xOC sens trigo dans [0;2π[)
    var trigo = _trigo; // Sens de l'angle
    var sel_arc, sel_ray = true;



    this.setParent(A, O);
    this.blocks.setMode(["oncompute"], "oncompute");

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === O) {
            this.addParent(_new);
            O = _new;
        }
    };
    this.isTrigo = function() {
        return trigo;
    };
    this.setTrigo = function(_t) {
        trigo = _t;
    };

    this.getValue = function() {
        return E1.value();
    };
    this.getCode = function() {
        return "fixedangle";
    };
    this.getFamilyCode = function() {
        return "fixedangle";
    };
    this.setTrigo = function(_t) {
        trigo = _t
    };
    this.getTrigo = function() {
        return trigo;
    };

    this.getAssociatedTools = function() {
        var at = superObject.getAssociatedTools();
        at += ",@callcalc,@blockly";
        return at;
    };

    this.getAlphaBounds = function(anim) {
        var t = superObject.getAlphaBounds(anim);
        t[0] = 0;
        return t;
    };

    this.setAlpha = function(p) {
        superObject.setAlpha(p);
        var a = p.getAlpha();
        if (a < 0) {
            p.setAlpha(0);
        }
    };

    // see if point inside ray
    this.checkIfValid = function(_P) {
        var dx = this.getDX();
        var dy = this.getDY();
        var xAP = _P.getX() - O.getX();
        var yAP = _P.getY() - O.getY();
        if ((xAP * dx < 0) || (yAP * dy < 0)) {
            _P.setXY(NaN, NaN);
        }
    };

    // Pour Blockly :
    this.getRoot().setExpression = this.setExpression = function(exy) {
        me.setExp(exy);
    }

    // setExp pour les widgets :
    me.setExp = me.setE1 = function(_t) {
        E1 = Expression.delete(E1);
        E1 = new Expression(me, _t);
    };
    me.getExp = function() {
        return me.getE1().getSource();
    };
    me.getE1 = function() {
        return E1;
    };

    this.isMoveable = function() {
        return true;
    };

    this.compute_dragPoints = function(_x, _y) {
        if (sel_arc) {
            var vx = _x - O.getX();
            var vy = _y - O.getY();
            R = Math.sqrt(vx * vx + vy * vy);
        }
    };
    this.computeDrag = function() {};

    this.getArcRay = function() {
        return R;
    };
    this.setArcRay = function(_r) {
        R=_r;
    };

    this.paintLength = function(ctx) {
        ctx.save();
        var r = R + this.prefs.fontmargin + this.getRealsize() / 2;
        ctx.textAlign = "left";
        var prec = this.getPrecision();
        var display = VALUE;
        display = Math.round(display * prec) / prec;
        var a = trigo ? -toAngle + AOC / 2 : Math.PI - toAngle + AOC / 2;
        a = a - Math.floor(a / $U.doublePI) * $U.doublePI; // retour dans [0;2π]
        if ((a > $U.halfPI) && (a < 3 * $U.halfPI)) {
            a += Math.PI;
            r = -r;
            ctx.textAlign = "right";
        }
        ctx.fillStyle = ctx.strokeStyle;
        ctx.translate(O.getX(), O.getY());
        ctx.rotate(a);
        ctx.fillText($L.number(display) + "°", r, this.getFontSize() / 2);
        ctx.restore();
    };

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(O.getX(), O.getY());
        ctx.lineTo(this.getXmax(), this.getYmax());
        ctx.stroke();
        ctx.moveTo(O.getX(), O.getY());
        ctx.beginPath();
        ctx.lineTo(O.getX() + R * Math.cos(-fromAngle), O.getY() + R * Math.sin(-fromAngle));
        ctx.lineWidth = ctx.lineWidth * 3;
        ctx.arc(O.getX(), O.getY(), R, -fromAngle, -toAngle, trigo);
        ctx.stroke();
        ctx.lineTo(O.getX(), O.getY());
        ctx.fill();
    };

    this.compute = function() {
        E1.compute();
        VALUE = AOC = E1.value();
        if (Cn.isDEG())
            AOC = AOC * Math.PI / 180;
        else
            VALUE = VALUE * 180 / Math.PI;
        if (!trigo)
            AOC = -AOC;
        AOC = AOC - Math.floor(AOC / $U.doublePI) * $U.doublePI; // AOC in [0,2π[
        var x = (A.getX() - O.getX()) * Math.cos(AOC) + (A.getY() - O.getY()) * Math.sin(AOC);
        var y = (O.getX() - A.getX()) * Math.sin(AOC) + (A.getY() - O.getY()) * Math.cos(AOC);
        this.setDXDY(0, 0, x, y);
        superObject.compute();
        C.setXY(O.getX() + x, O.getY() + y);
        fromAngle = $U.angleH(A.getX() - O.getX(), A.getY() - O.getY());
        toAngle = $U.angleH(C.getX() - O.getX(), C.getY() - O.getY());
    };

    this.getSource = function(src) {
        var _ex = "\"" + E1.getUnicodeSource().replace(/\n/g, "\\n") + "\"";
        src.geomWrite(false, this.getName(), "FixedAngle", A.getVarName(), O.getVarName(), _ex, trigo);
    };

    this.mouseInside = function(ev) {
        sel_ray = $U.isNearToRay(O.getX(), O.getY(), C.getX(), C.getY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
        sel_arc = $U.isNearToArc(O.getX(), O.getY(), AOC, fromAngle, toAngle, trigo, R, this.mouseX(ev), this.mouseY(ev), this.getOversize());
        return sel_arc || sel_ray
    };


    this.setDefaults("fixedangle");
}
//************************************************
//*************** Axe (Ox) OBJECT ****************
//************************************************
function OXObject(_construction, _name) {
    var O = new VirtualPointObject(0, 0);
    var I = new VirtualPointObject(1, 0);
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, O, I, true));
    var CS = this.getCoordsSystem();

    this.setParent();
    this.setColor("rgba(0,0,0,0)");

    this.getCode = function() {
        return "axis-x";
    };

    this.setColor = function() {};
    this.setSize = function() {};

    this.isMoveable = function() {
        return false;
    };

    this.compute = function() {
        O.setXY(CS.getX0(), CS.getY0());
        I.setXY(O.getX() + CS.getUnit(), O.getY());
        superObject.compute();
    };

    this.mouseInside = function(ev) {
        if (CS.isCS()) {
            return $U.isNearToLine(this.P1.getX(), this.P1.getY(), this.getDX(), this.getDY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
        } else return false;
    };


    this.getSource = function(src) {
        if (this.getCn().isAxisUsed())
            src.geomWrite(false, this.getName(), "X_axis");
    };

    this.getStyle = function(src) {};
}
//************************************************
//*************** Axe (Oy) OBJECT ****************
//************************************************
function OYObject(_construction, _name) {
    var O = new VirtualPointObject(0, 0);
    var J = new VirtualPointObject(0, 1);
    var superObject = $U.extend(this, new TwoPointsLineObject(_construction, _name, O, J, true));
    var CS = this.getCoordsSystem();

    this.setParent()
    this.setColor("rgba(0,0,0,0)");

    this.getCode = function() {
        return "axis-y";
    };

    this.setColor = function() {};
    this.setSize = function() {};

    this.isMoveable = function() {
        return false;
    };

    this.compute = function() {
        O.setXY(CS.getX0(), CS.getY0());
        J.setXY(O.getX(), O.getY() - CS.getUnit());
        superObject.compute();
    };

    this.mouseInside = function(ev) {
        if (CS.isCS())
            return $U.isNearToLine(this.P1.getX(), this.P1.getY(), this.getDX(), this.getDY(), this.mouseX(ev), this.mouseY(ev), this.getOversize());
        else
            return false;
    };

    this.getSource = function(src) {
        if (this.getCn().isAxisUsed())
            src.geomWrite(false, this.getName(), "Y_axis");
    };

    this.getStyle = function(src) {};
}
function CurvusObject(_construction, _name, _a, _b, _f1) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var me = this;
    var Cn = _construction;
    //    var min = new Expression(this, _a), max = new Expression(this, _b);
    var MIN = 0,
        MAX = 0,
        STEP = 0;
    var E1 = null,
        min = null,
        max = null;
    var CX = 0; // représente l'abscisse (pixel) de l'origine du repère
    var CZ = 1; // représente la valeur du zoom

    var NB = 1000; // nombre de côtés du polygone (modifié à chaque compute pour les cartésiennes)


    // Tableau d'objets de 3 propriétés : x pour abscisse
    // y pour ordonnée, d pour discontinuité repérée
    var Ptab = [];
    for (var i = 0; i < 10000; i++) {
        Ptab.push({
            x: 0,
            y: 0,
            d: false
        });
    }


    this.setDefaults("function");

    this.isInstanceType = function(_c) {
        return (_c === "function");
    };
    this.getCode = function() {
        return "function";
    };
    this.getFamilyCode = function() {
        return "function";
    };

    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc";
    };


    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0; i < NB; i++) {
            if ($U.isNearToPoint(Ptab[i].x, Ptab[i].y, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };


    //  // ****************************************
    // // **** Uniquement pour les animations ****
    // // ****************************************


    // this.getAlphaBounds = function(anim) {
    //     var inc = 5 * Math.round(anim.direction * (anim.speed * anim.delay / 1000));
    //     return [0, Ptab.length - 1, inc]
    // };

    // this.getAnimationSpeedTab = function() {
    //     return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000];
    // };

    // this.getAnimationParams = function(x0, y0, x1, y1) {
    //     var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    //     var fce = this.getAnimationSpeedTab();
    //     var f = Math.floor(d / (300 / fce.length));
    //     if (f >= fce.length) f = fce.length - 1;

    //     var xAB = (Ptab[0].x - x0),
    //         yAB = (Ptab[0].y - y0);
    //     var d2 = xAB * xAB + yAB * yAB,
    //         d1 = 0;
    //     var k = 0;
    //     for (var i = 1; i < NB; i++) {
    //         xAB = (Ptab[i].x - x0);
    //         yAB = (Ptab[i].y - y0);
    //         d1 = xAB * xAB + yAB * yAB;
    //         if ((d1 < d2) || isNaN(d2)) {
    //             k = i;
    //             d2 = d1;
    //         }
    //     }
    //     var xp = Ptab[k - 1].x;
    //     var yp = Ptab[k - 1].y;
    //     var ps = (xp - x0) * (x1 - x0) + (yp - y0) * (y1 - y0);
    //     var dir = (ps > 0) ? 1 : -1;
    //     var dop = Math.sqrt((xp - x0) * (xp - x0) + (yp - y0) * (yp - y0));
    //     var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    //     var cs = ps / (dop * dom);
    //     var aller_retour = (Math.abs(cs) < 0.707);
    //     var pcent = Math.round(100 * fce[f] / fce[fce.length - 1])+"%";

    //     return {
    //         message: aller_retour ? pcent + " \u21C4" : pcent + "",
    //         speed: fce[f],
    //         direction: dir,
    //         ar: aller_retour
    //     }
    // }

    // // ****************************************
    // // ****************************************


    this.projectXY = function(_x, _y) {
        var xAB = (Ptab[0].x - _x),
            yAB = (Ptab[0].y - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < NB; i++) {
            xAB = (Ptab[i].x - _x);
            yAB = (Ptab[i].y - _y);
            d1 = xAB * xAB + yAB * yAB;
            if ((isNaN(d2)) || (d1 < d2)) {
                k = i;
                d2 = d1;
            }
        }
        return [Ptab[k].x, Ptab[k].y];
    };

    this.project = function(p) {
        //        console.log("this.project");
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var k = (me.compute === computeCartesian) ? Math.round(Cn.coordsSystem.px(p.getAlpha())) : p.getAlpha();
        if ((k >= 0) && (k < NB))
            p.setXY(Ptab[k].x, Ptab[k].y);
        else
            p.setXY(k, Cn.coordsSystem.py(E1.value(p.getAlpha())));
    };

    this.setAlpha = function(p) {
        var xAB = 0,
            yAB = 0;
        for (var i = 0; i < NB; i++) {
            xAB = (Ptab[i].x - p.getX()), yAB = (Ptab[i].y - p.getY());
            if ((xAB === 0) && (yAB === 0)) {
                //                console.log("CX=" + CX + "  i=" + i + "  p.setAlpha(" + (i - CX) + ")");
                //                console.log("Cn.coordsSystem.x(i/2)=" + (Cn.coordsSystem.x(i / 2)));
                if (me.compute === computeCartesian)
                    p.setAlpha(Cn.coordsSystem.x(i));
                else
                    p.setAlpha(i);
                return;
            }
        }
    };

    var computeMinMaxStepCartesian = function() {
        var mn = min ? min.value() : NaN;
        var mx = max ? max.value() : NaN;
        var x0 = Cn.coordsSystem.x(0);
        var x1 = Cn.coordsSystem.x(Cn.getBounds().width);
        MIN = (isNaN(mn)) ? x0 : Math.max(mn, x0);
        MAX = (isNaN(mx)) ? x1 : Math.min(mx, x1);
        NB = Cn.coordsSystem.lx(MAX - MIN);
        STEP = (MAX - MIN) / NB;
    };


    var computeCartesian = function() {
        if (E1)
            E1.compute();
        if (min)
            min.compute();
        if (max)
            max.compute();
        computeMinMaxStepCartesian();
        var k = MIN;
        for (var i = 0; i < NB; i++) {
            Ptab[i].x = Cn.coordsSystem.px(k);
            Ptab[i].y = Cn.coordsSystem.py(E1.value(k));
            // Petit problème d'affichage sur certains navigateur lorsque
            // l'ordonnée (en pixel) est trop grande :
            if (Math.abs(Ptab[i].y) > 20000000)
                Ptab[i].y = NaN;

            k += STEP;
        }
    };


    // En chantier ci-dessous : étude naïve de la discontinuité :
    //    var computeCartesian = function() {
    //        if (E1) E1.compute();
    //        if (min) min.compute();
    //        if (max) max.compute();
    //        computeMinMaxStepCartesian();
    //        var k = MIN;
    //        var y0 = NaN;
    //        var y1 = NaN;
    //        var y2 = NaN;
    //        for (var i = 0; i < NB; i++) {
    //            y2 = E1.value(k);
    //            Ptab[i].x = Cn.coordsSystem.px(k);
    //            Ptab[i].y = Cn.coordsSystem.py(y2);
    //            Ptab[i].d = false;
    //            if (isNaN(y0)) {
    //                y0 = y2;
    //            } else if (isNaN(y1)) {
    //                y1 = y2;
    //            } else if (Math.abs((y0 + y2) / 2 - y1) > 1e-1) {
    //                // Discontinuité repérée :
    //                Ptab[i].d = true;
    //                y0 = NaN;
    //                y1 = NaN;
    //            } else {
    //                y0 = y1;
    //                y1 = y2;
    //            }
    //            k += STEP;
    //        }
    //    };

    var computeMinMaxStepParam = function() {
        var mn = min ? min.value() : NaN;
        var mx = max ? max.value() : NaN;
        MIN = (isNaN(mn)) ? 0 : mn;
        MAX = (isNaN(mx)) ? 1 : mx;
        STEP = (MAX - MIN) / NB;
    };

    var computeParametric = function() {
        if (E1)
            E1.compute();
        if (min)
            min.compute();
        if (max)
            max.compute();
        computeMinMaxStepParam();
        var k = MIN;
        for (var i = 0; i < NB; i++) {
            var t = E1.value(k);
            Ptab[i].x = Cn.coordsSystem.px(t[0]);
            Ptab[i].y = Cn.coordsSystem.py(t[1]);
            k += STEP;
        }
    };

    me.compute = null;

    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0].x, Ptab[0].y);
        for (var i = 1; i < NB; i++) {
            ctx.lineTo(Ptab[i].x, Ptab[i].y);
            //            if (Ptab[i].d) ctx.moveTo(Ptab[i].x, Ptab[i].y);
            //            else ctx.lineTo(Ptab[i].x, Ptab[i].y);
        }
        ctx.stroke();
        if ((me.compute === computeCartesian) && (max) && (min)) {
            ctx.lineTo(Cn.coordsSystem.px(max.value()), Cn.coordsSystem.py(0));
            ctx.lineTo(Cn.coordsSystem.px(min.value()), Cn.coordsSystem.py(0));
        }
        ctx.fill();

    };

    this.getSource = function(src) {
        var e1 = (E1 === null) ? "" : E1.getSource();
        var mn = (min === null) ? "" : min.getSource();
        var mx = (max === null) ? "" : max.getSource();
        src.geomWrite(true, this.getName(), "Curvus", mn, mx, e1);
    };

    me.setE1 = function(_f) {
        E1 = Expression.delete(E1);
        E1 = new Expression(me, _f);
        me.dx = E1.dx;
        me.dy = E1.dy;
        me.dz = E1.dz;
        me.dt = E1.dt;
        if (E1.isArray()) {
            me.compute = computeParametric;
        } else {
            me.compute = computeCartesian;
        }
    };
    me.getE1 = function() {
        return E1;
    };
    me.setMin = function(_t) {
        min = Expression.delete(min);
        min = new Expression(me, _t);
        me.compute();
    };
    me.getMinSource = function() {
        if (min)
            return min.getSource();
        return "";
    };
    me.setMax = function(_t) {
        max = Expression.delete(max);
        max = new Expression(me, _t);
        me.compute();
    };
    me.getMaxSource = function() {
        if (max)
            return max.getSource();
        return "";
    };

    me.getValue = function(x) {
        return E1.value(x);
    };

    me.refreshNames = function() {
        if (E1)
            E1.refreshNames();
        if (min)
            min.refreshNames();
        if (max)
            max.refreshNames();
    };


    if (_f1 !== "")
        me.setE1(_f1);
    if (_a !== "")
        me.setMin(_a);
    if (_b !== "")
        me.setMax(_b);
}
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

    this.blocks.setMode(["oncompute", "onchange", "oninit"], "oncompute");


    // this.getMe = function() {
    //     return me;
    // };


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
        if (!isNaN(_x) && !isNaN(_y)) {
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
    me.getcPT = function() {
        return cPT;
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
        if (me.isCursor()) {
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


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************

    // var hashtab = [];

    // me.inithashtab = function(_speed) {
    //     hashtab = [true];
    //     var inc = 100 / _speed;
    //     for (var i = 1; i < 100; i++) {
    //         if (i > inc) {
    //             hashtab.push(true);
    //             inc += 100 / _speed;
    //         } else {
    //             hashtab.push(false);
    //         }
    //     }
    //     console.log(hashtab)
    // };


    me.isAnimationPossible = function() {
        return ((E1 != null) && (E1.isNum()));
    }

    me.getAnimationSpeedTab = function() {
        return [0, 1, 2, 3, 5, 10, 25, 50, 75, 90, 100];
    }

    me.getAnimationParams = function(x1, y1) {
        var x0 = X;
        var y0 = Y;

        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (500 / fce.length));
        if (f >= fce.length) f = fce.length - 1;
        var mess = fce[f] + "%";
        var ang = $U.angleH(x1 - x0, y1 - y0);
        var dir = ((ang > Math.PI / 2) && (ang < 3 * Math.PI / 2)) ? 1 : -1;
        var aller_retour = false;

        if (this.isCursor()) {
            aller_retour = ((ang > Math.PI / 4) && (ang < 3 * Math.PI / 4)) || ((ang > 5 * Math.PI / 4) && (ang < 7 * Math.PI / 4));
        };
        return {
            message: aller_retour ? mess + " \u21C4" : mess,
            speed: fce[f],
            direction: dir,
            ar: aller_retour
        }
    }

    // me.incrementAlpha = function(anim) {
    //     if (hashtab[anim.loopnum]) {
    //         var v = anim.speed;
    //         var s = anim.direction;
    //         var ar = anim.ar;
    //         var d = new Date();
    //         anim.delay = d.getTime() - anim.timestamp;
    //         anim.timestamp = d.getTime();
    //         var inc = s * 1;

    //         // var inc = 0.1 * s;
    //         // console.log(me.isCursor());
    //         if (me.isCursor()) {
    //             inc = s * (max.value() - min.value()) / 50;
    //             var e1 = E1.value();
    //             e1 += inc;

    //             if (e1 < min.value()) {
    //                 if (ar) {
    //                     anim.direction *= -1;
    //                     e1 = 2 * min.value() - e1;
    //                 } else {
    //                     e1 = max.value() + e1 - min.value();
    //                 }
    //             }
    //             if (e1 > max.value()) {
    //                 if (ar) {
    //                     anim.direction *= -1;
    //                     e1 = 2 * max.value() - e1;
    //                 } else {
    //                     e1 = min.value() + e1 - max.value();
    //                 }
    //             }
    //             if (e1 < min.value()) e1 = min.value();
    //             if (e1 > max.value()) e1 = max.value();
    //             if (Math.abs(e1) < 1e-13) e1 = 0;

    //             // if (cPT.increment) {
    //             //     var inc = 1 / cPT.increment;
    //             //     e1 = min.value() + Math.round((e1 - min.value()) * inc) / inc;
    //             // }

    //             initCursorPos();
    //             E1.setValue(e1);

    //             // initCursorPos();
    //             // E1.setValue(e1);
    //         } else {
    //             var val = E1.value() + inc;
    //             if (Math.abs(val) < 1e-13) val = 0;
    //             E1.setValue(val);
    //         }
    //     }
    //     anim.loopnum = (anim.loopnum + 1) % 100;

    //     // console.log(E1.value())
    // };

    me.incrementAlpha = function(anim) {
        // console.log(anim);
        var v = anim.speed;
        var s = anim.direction;
        var ar = anim.ar;
        var d = new Date();
        anim.delay = d.getTime() - anim.timestamp;
        anim.timestamp = d.getTime();
        var inc = s * (v * anim.delay / 1000);
        // var inc=s*v;
        // console.log(me.isCursor());
        if (me.isCursor()) {
            inc = inc * (max.value() - min.value()) / 50;

            if (cPT.increment) {
                anim.incsum += inc;
                var inc2 = cPT.increment;
                if (Math.abs(anim.incsum) < inc2) {
                    return;
                };
                inc = s * inc2 * Math.floor(Math.abs(anim.incsum) / inc2);
                anim.incsum = 0;
            }
            // console.log(inc);
            var e1 = E1.value();
            e1 += inc;

            if (e1 < min.value()) {
                if (ar) {
                    anim.direction *= -1;
                    e1 = 2 * min.value() - e1;
                } else {
                    e1 = max.value() + e1 - min.value();
                }
            }
            if (e1 > max.value()) {
                if (ar) {
                    anim.direction *= -1;
                    e1 = 2 * max.value() - e1;
                } else {
                    e1 = min.value() + e1 - max.value();
                }
            }
            if (e1 < min.value()) e1 = min.value();
            if (e1 > max.value()) e1 = max.value();
            if (Math.abs(e1) < 1e-13) e1 = 0;

            // if (cPT.increment) {
            //     var inc2 = 1 / cPT.increment;
            //     e1 = min.value() + Math.round((e1 - min.value()) * inc2) / inc2;
            // }



            initCursorPos();
            E1.setValue(e1);

            // initCursorPos();
            // E1.setValue(e1);
        } else {
            var val = E1.value() + inc;
            if (Math.abs(val) < 1e-13) val = 0;
            E1.setValue(val);
        }
        // console.log(E1.value())
    };

    // ****************************************
    // ****************************************


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
        var s = "@callproperty,@calltrash,@objectmover,@anchor,@callcalc";
        if (anchor)
            s = "@callproperty,@calltrash,@objectmover,@noanchor,@callcalc";
        // if (me.isCursor())
        if ((E1 !== null) && (E1.isNum())) s += ",@spring";
        s += ",@blockly";
        return s;
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
        if ((!inside) && (me.isCursor())) {
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
        var val = (prec > -1) ? t + $U.parseList(E1.value(), prec) : t;
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

    me.isCursor = function() {
        return ((E1 !== null) && (min !== null) && (max !== null) &&
            ((E1.isEmpty()) || (E1.isNum())) && (min.isNum()) && (max.isNum()));
    };



    this.objToDelete = function() {
        if (me.isCursor())
            return cPT;
        else
            return this;
    };





    var setMethods = function() {
        //        console.log("curseur :" + me.isCursor());
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
        } else if (me.isCursor()) {
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

    // Pour Blockly :
    parent.setExpression = this.setExpression = function(exy) {
        me.setExp(exy);
    }
    parent.getExpression = this.getExpression = function() {
        return me.getExp();
    }


    // setExp pour les widgets et pour blockly :
    me.setExp = me.setE1 = function(_t) {
        // console.log("before: "+this.getParentLength());
        if (E1.getSource() !== _t) {
            E1 = Expression.delete(E1);
            E1 = new Expression(me, _t);
            setMethods();
        }
        // console.log("after: "+this.getParentLength());
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
        min = Expression.delete(min);
        min = new Expression(me, _t);
        setMethods();
    };
    me.getMinSource = function() {
        if (min)
            return min.getSource();
        return "";
    };
    me.setMax = function(_t) {
        max = Expression.delete(max);
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
        // console.log("before:"+me.getParent().length);
        me.setParentList((me.isCursor()) ? [cPT] : []);
        if (E1)
            E1.refresh();
        if (min)
            min.refresh();
        if (max)
            max.refresh();
        if (anchor !== null) me.addParent(anchor);
        // console.log("after:"+me.getParent().length);
    };


    if (_exp !== "")
        me.setE1(_exp);
    if (_min !== "")
        me.setMin(_min);
    if (_max !== "")
        me.setMax(_max);


}
//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function QuadricObject(_construction, _name, _P1, _P2, _P3, _P4, _P5) {
    $U.extend(this, new ConstructionObject(_construction, _name));
    $U.extend(this, new MoveableObject(_construction)); // Héritage
    var Cn = _construction;
    // Récupération de l'objet Math situé dans le scope de la fenêtre de l'interpréteur
    // pour le calcul sur les complexes :
    var MTH = Cn.getInterpreter().getMath();
    var P = [_P1, _P2, _P3, _P4, _P5];
    var X = [0, 0, 0, 0, 0, 0]; // Coefficient de l'équation de la conique
    this.setParent(_P1, _P2, _P3, _P4, _P5);

    var NB = 500;
    var Ptab = []; // Tableau de tableaux représentant les parties connexes de la conique
    var PtabRow = []; // Tous les points de la conique
    var MIN, MAX, STEP;

    var FOCI = [];

    this.getCoeffs = function() {
        return X;
    };
    this.setDefaults("quadric");

    this.getCode = function() {
        return "quadric";
    };
    this.getFamilyCode = function() {
        return "quadric";
    };
    this.isInstanceType = function(_c) {
        return (_c === "quadric");
    };

    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash,@callcalc";
    };

    this.getPrecision = function() {
        return NB;
    };
    this.getRealPrecision = function() {
        return NB;
    };
    this.setPrecision = function(_prec) {
        _prec = parseInt(_prec);
        NB = (_prec === 0) ? 1000 : _prec; // Compatibilité avec les anciens lieux
    };

    this.setPrecision(500);

    // Seulement pour les macros :
    var getMacroFunc = function(nme, vn, i) {
        return function(src) {
            src.geomWrite(false, nme, "DefinitionPoint", vn, i);
        };
    };
    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        for (var i = 0, len = P.length; i < len; i++) {
            var Pt = P[i];
            Pt.setMacroMode(1);
            Pt.setMacroSource(getMacroFunc(Pt.getVarName(), vn, i));
        }
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        var fl = false;
        for (var i = 0; i < P.length; i++) {
            fl = fl || P[i].Flag;
        }
        return fl;
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        return P[_i];
    }

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0, len = PtabRow.length; i < len; i++) {
            if ($U.isNearToPoint(PtabRow[i].x, PtabRow[i].y, mx, my, this.getOversize()))
                return true;
        }
        return false;
    };

    this.isMoveable = function() {
        // Si les extrémités sont des points libres :
        if ((_P1.getParentLength() === 0) && (_P2.getParentLength() === 0) &&
            (_P3.getParentLength() === 0) && (_P4.getParentLength() === 0) &&
            (_P5.getParentLength() === 0))
            return true;
        return false;
    };

    this.dragObject = function(_x, _y) {
        var vx = _x - this.startDragX;
        var vy = _y - this.startDragY;
        _P1.setXY(_P1.getX() + vx, _P1.getY() + vy);
        _P2.setXY(_P2.getX() + vx, _P2.getY() + vy);
        _P3.setXY(_P3.getX() + vx, _P3.getY() + vy);
        _P4.setXY(_P4.getX() + vx, _P4.getY() + vy);
        _P5.setXY(_P5.getX() + vx, _P5.getY() + vy);
        this.startDragX = _x;
        this.startDragY = _y;
    };

    this.computeDrag = function() {
        Cn.computeChilds(P);
    };



    var intersectQuadricQuadricXY = function(TAB) {
        // pour ax^2 + bxy + cy^2 + dx + ey + f = 0
        var a0 = X[0],
            b0 = X[4],
            c0 = X[1],
            d0 = X[2],
            e0 = X[3],
            f0 = X[5];
        var a1 = TAB[0],
            b1 = TAB[4],
            c1 = TAB[1],
            d1 = TAB[2],
            e1 = TAB[3],
            f1 = TAB[5];
        // Si les deux coniques sont homothétiques (cas courant en 3D) :
        if ((Math.abs(a0 / a1 - c0 / c1) < 1e-10)) {
            d1 = d1 * (a0 / a1) - d0;
            e1 = e1 * (a0 / a1) - e0;
            f1 = f1 * (a0 / a1) - f0;

            var c01 = (c0 * d1 * d1 - b0 * d1 * e1 + a0 * e1 * e1);
            var c02 = (e1 * e1 * f0 - e0 * e1 * f1 + c0 * f1 * f1);
            var c03 = (-d1 * e0 * e1 + d0 * e1 * e1 + 2 * c0 * d1 * f1 - b0 * e1 * f1);
            var c04 = (c03 * c03 - 4 * c01 * c02);
            var c05 = d1 * e0 * e1 - d0 * e1 * e1 - 2 * c0 * d1 * f1 + b0 * e1 * f1;
            var c06 = (2 * c01);

            var x0 = (c05 - Math.sqrt(c04)) / c06;
            var x1 = (c05 + Math.sqrt(c04)) / c06;
            var y0 = (-f1 - d1 * x0) / e1;
            var y1 = (-f1 - d1 * x1) / e1;

            return [
                [x0, y0],
                [x1, y1],
                [NaN, NaN],
                [NaN, NaN]
            ];
        }

        var k1 = -a1 * b0 * b1 * c0 + a0 * b1 * b1 * c0 + a1 * a1 * c0 * c0 + a1 * b0 * b0 * c1 - a0 * b0 * b1 * c1 - 2 * a0 * a1 * c0 * c1 + a0 * a0 * c1 * c1;
        var k2 = b1 * b1 * c0 * d0 - b0 * b1 * c1 * d0 - 2 * a1 * c0 * c1 * d0 + 2 * a0 * c1 * c1 * d0 - b0 * b1 * c0 * d1 + 2 * a1 * c0 * c0 * d1 + b0 * b0 * c1 * d1 - 2 * a0 * c0 * c1 * d1 - a1 * b1 * c0 * e0 + 2 * a1 * b0 * c1 * e0 - a0 * b1 * c1 * e0 - a1 * b0 * c0 * e1 + 2 * a0 * b1 * c0 * e1 - a0 * b0 * c1 * e1;
        var k3 = c1 * c1 * d0 * d0 - 2 * c0 * c1 * d0 * d1 + c0 * c0 * d1 * d1 - b1 * c1 * d0 * e0 - b1 * c0 * d1 * e0 + 2 * b0 * c1 * d1 * e0 + a1 * c1 * e0 * e0 + 2 * b1 * c0 * d0 * e1 - b0 * c1 * d0 * e1 - b0 * c0 * d1 * e1 - a1 * c0 * e0 * e1 - a0 * c1 * e0 * e1 + a0 * c0 * e1 * e1 + b1 * b1 * c0 * f0 - b0 * b1 * c1 * f0 - 2 * a1 * c0 * c1 * f0 + 2 * a0 * c1 * c1 * f0 - b0 * b1 * c0 * f1 + 2 * a1 * c0 * c0 * f1 + b0 * b0 * c1 * f1 - 2 * a0 * c0 * c1 * f1;
        var k4 = c1 * d1 * e0 * e0 - c1 * d0 * e0 * e1 - c0 * d1 * e0 * e1 + c0 * d0 * e1 * e1 + 2 * c1 * c1 * d0 * f0 - 2 * c0 * c1 * d1 * f0 - b1 * c1 * e0 * f0 + 2 * b1 * c0 * e1 * f0 - b0 * c1 * e1 * f0 - 2 * c0 * c1 * d0 * f1 + 2 * c0 * c0 * d1 * f1 - b1 * c0 * e0 * f1 + 2 * b0 * c1 * e0 * f1 - b0 * c0 * e1 * f1;
        var k5 = -c1 * e0 * e1 * f0 + c0 * e1 * e1 * f0 + c1 * c1 * f0 * f0 + c1 * e0 * e0 * f1 - c0 * e0 * e1 * f1 - 2 * c0 * c1 * f0 * f1 + c0 * c0 * f1 * f1;
        var u1 = k2 / (4 * k1);
        var u2 = (k2 * k2) / (4 * k1 * k1) - 2 * k3 / (3 * k1);
        var u3 = (k2 * k2) / (2 * k1 * k1) - 4 * k3 / (3 * k1);
        var u4 = (-k2 * k2 * k2) / (k1 * k1 * k1) + (4 * k2 * k3) / (k1 * k1) - (8 * k4) / k1;
        var p1 = k3 * k3 - 3 * k2 * k4 + 12 * k1 * k5;
        var p2 = 2 * k3 * k3 * k3 - 9 * k2 * k3 * k4 + 27 * k1 * k4 * k4 + 27 * k2 * k2 * k5 - 72 * k1 * k3 * k5;

        var q1 = MTH.csqrt([-4 * p1 * p1 * p1 + p2 * p2, 0]);
        q1 = MTH.plus(q1[0], [p2, 0]);
        q1 = MTH.power(q1, 1 / 3);
        q1 = q1[0];

        var cub2 = Math.pow(2, 1 / 3);

        var r1 = MTH.quotient([cub2 * p1, 0], MTH.times([3 * k1, 0], q1));
        r1 = MTH.plus(r1, MTH.quotient(q1, [3 * cub2 * k1, 0]));

        var sa = MTH.plus([u2, 0], r1);
        sa = MTH.quotient(MTH.csqrt(sa)[0], 2);

        var sb = MTH.minus([u3, 0], r1);
        sb = MTH.minus(sb, MTH.quotient([u4, 0], MTH.times(8, sa)));
        sb = MTH.quotient(MTH.csqrt(sb)[0], 2);

        var sc = MTH.minus([u3, 0], r1);
        sc = MTH.plus(sc, MTH.quotient([u4, 0], MTH.times(8, sa)));
        sc = MTH.quotient(MTH.csqrt(sc)[0], 2);

        var XX = [];
        var cu1 = [-u1, 0];

        XX[0] = MTH.minus(cu1, sa);
        XX[0] = MTH.minus(XX[0], sb);

        XX[1] = MTH.minus(cu1, sa);
        XX[1] = MTH.plus(XX[1], sb);

        XX[2] = MTH.plus(cu1, sa);
        XX[2] = MTH.minus(XX[2], sc);

        XX[3] = MTH.plus(cu1, sa);
        XX[3] = MTH.plus(XX[3], sc);

        var points = [];
        var A = c0,
            B, C, AA = c1,
            BB, CC;
        for (var i = 0; i < 4; i++) {
            if (Math.abs(XX[i][1]) > 1e-5) {
                // Un complexe rencontré, ie une intersection non existante :
                points.push([NaN, NaN]);
            } else {
                B = b0 * XX[i][0] + e0;
                C = a0 * XX[i][0] * XX[i][0] + d0 * XX[i][0] + f0;
                BB = b1 * XX[i][0] + e1;
                CC = a1 * XX[i][0] * XX[i][0] + d1 * XX[i][0] + f1;

                var denom = A * BB - B * AA;
                if (Math.abs(denom) < 1E-20) {
                    points.push([NaN, NaN]);
                } else {
                    var y = (C * AA - A * CC) / denom; //formule de Dominique Tournès
                    points.push([XX[i][0], y]);
                }
            }
        }
        return (points);
    }


    // Pour le preview dans PointConstructor :
    this.intersectXY = function(_C, _x, _y) {
        if (_C.isInstanceType("quadric")) {
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            var p = _x,
                q = _y;
            var dmin = NaN;
            var pos = 0;
            for (var i = 0; i < Pts.length; i++) {
                var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
                if ((isNaN(dmin)) || (dd < dmin)) {
                    dmin = dd;
                    pos = i;
                }
            }
            return [Pts[pos][0], Pts[pos][1]];
        }
    }


    // Actualisation de la position pour le compute du point :
    this.intersect = function(_C, _P) {
        if (_C.isInstanceType("quadric")) {
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            _P.setXY(Pts[_P.getOrder()][0], Pts[_P.getOrder()][1]);
        }
    };

    // Pour la création de l'objet dans PointConstructor :
    this.initIntersect2 = function(_C, _P) {
        if (_C.isInstanceType("quadric")) {
            //            console.log("_C.getCoeffs()=" + _C.getCoeffs());
            var Pts = intersectQuadricQuadricXY(_C.getCoeffs());
            var p = _P.getX(),
                q = _P.getY();
            var dmin = NaN;
            var pos = 0;
            for (var i = 0; i < Pts.length; i++) {
                //                console.log("i=" + i + "  Pts[i][0]=" + Pts[i][0]);
                var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
                if ((isNaN(dmin)) || (dd < dmin)) {
                    dmin = dd;
                    pos = i;
                }
            }

            _P.setOrder(pos);
            _P.setXY(Pts[pos][0], Pts[pos][1]);
        }
    }

    this.projectXY = function(p, q) {
        // Le système à résoudre pour trouver le projeté d'un point
        // sur une conique se ramène à la recherche de l'intersection
        // de deux coniques :
        var Pts = intersectQuadricQuadricXY([X[4] / 2, -X[4] / 2, X[3] / 2 - p * X[4] / 2 + X[0] * q, X[4] / 2 * q - p * X[1] - X[2] / 2, X[1] - X[0], X[2] / 2 * q - p * X[3] / 2]);
        var dmin = NaN;
        var pos = 0;
        for (var i = 0; i < Pts.length; i++) {
            var dd = (Pts[i][0] - p) * (Pts[i][0] - p) + (Pts[i][1] - q) * (Pts[i][1] - q);
            if ((isNaN(dmin)) || (dd < dmin)) {
                dmin = dd;
                pos = i;
            }

        }
        return Pts[pos];
    }

    // Ancienne méthode laissée là pour comparaison 
    this.projectXY2 = function(_x, _y) {
        var xAB = (PtabRow[0].x - _x),
            yAB = (PtabRow[0].y - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1, len = PtabRow.length; i < len; i++) {
            xAB = (PtabRow[i].x - _x);
            yAB = (PtabRow[i].y - _y);
            d1 = xAB * xAB + yAB * yAB;
            if (d1 < d2) {
                k = i;
                d2 = d1;
            }
        }
        return [PtabRow[k].x, PtabRow[k].y];
    };

    this.project = function(p) {
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };

    this.projectAlpha = function(p) {
        var G = p.getAlpha();
        if (($U.isArray(G)) && (G.length === 2)) {
            var AA = P[0];
            var BB = P[1];
            var CC = P[2];
            var xa = AA.getX(),
                ya = AA.getY();
            var xb = BB.getX(),
                yb = BB.getY();
            var xc = CC.getX(),
                yc = CC.getY();
            var xm = xa + G[0] * (xb - xa) + G[1] * (xc - xa);
            var ym = ya + G[0] * (yb - ya) + G[1] * (yc - ya);
            p.setXY(xm, ym);
            this.project(p);
            //            if ((p.getX() !== xm) || (p.getY() !== ym)) {
            //                this.setAlpha(p);
            //            }
        } else {
            // Compatibilité avec les "anciennes" figures :
            if (PtabRow.length === 0)
                return;
            var k = p.getAlpha();
            if (k < 0)
                k = 0;
            if (k > (PtabRow.length - 1))
                k = PtabRow.length - 1;
            p.setXY(PtabRow[k].x, PtabRow[k].y);
            this.setAlpha(p);
        }
    };

    this.setAlpha = function(p) {
        var AA = P[0];
        var BB = P[1];
        var CC = P[2];
        var a = BB.getX() - AA.getX();
        var b = CC.getX() - AA.getX();
        var c = p.getX() - AA.getX();
        var d = BB.getY() - AA.getY();
        var e = CC.getY() - AA.getY();
        var f = p.getY() - AA.getY();
        var det = a * e - d * b;
        if (det !== 0) {
            p.setAlpha([(c * e - b * f) / det, (a * f - c * d) / det]);
        }
    };


    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var step = 1;
        var Ptab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < NB; i++) {
            Ptab.push({
                "alpha": i,
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
        if (PtabRow[a] !== undefined)
            p.setXY(PtabRow[a].x, PtabRow[a].y);
    };

    this.center = function() {
        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        //        var a = X[0], b = X[4] / 2, c = X[1], d = X[2] / 2, e = X[3] / 2, f = X[5];
        //        var det = a * c - b * b;
        //        var x0 = (b * e - c * d) / det;
        //        var y0 = (b * d - a * e) / det;
        //        x0 = Cn.coordsSystem.x(x0);
        //        y0 = Cn.coordsSystem.y(y0);
        //        return [x0, y0];
        var M = MTH.quotient(MTH.plus(FOCI[0], FOCI[1]), 2);
        return Cn.coordsSystem.xy(M);
    };

    this.foci = function() {
        //        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        //        var a = X[0], b = X[4] / 2, c = X[1], d = X[2] / 2, e = X[3] / 2, f = X[5];
        //        var A = [b * b - a * c, 0];
        //        var B = [c * d - b * e, a * e - b * d];
        //        var C = [e * e - d * d + f * (a - c), 2 * (b * f - d * e)];
        //
        ////         Résolution de l'équation complexe Az^2+2Bz+C=0 :
        ////         Racine du discriminant réduit :
        //        var SQ = MTH.csqrt(MTH.minus(MTH.times(B, B), MTH.times(A, C)))[0];
        //        var z1 = MTH.quotient(MTH.plus(B, SQ), A);
        //        var z2 = MTH.quotient(MTH.minus(B, SQ), A);
        //        return [Cn.coordsSystem.xy(z1), Cn.coordsSystem.xy(z2)];
        return [Cn.coordsSystem.xy(FOCI[0]), Cn.coordsSystem.xy(FOCI[1])];
    };

    //    this.projectAlpha = function(p) {
    //        if (PtabRow.length===0) return;
    //        var k = p.getAlpha();
    //        if (k < 0) k = 0;
    //        if (k > (PtabRow.length - 1)) k = PtabRow.length - 1;
    //        p.setXY(PtabRow[k].x, PtabRow[k].y);
    //    };
    //
    //    this.setAlpha = function(p) {
    //        var xAB = 0, yAB = 0;
    //        for (var i = 0, len = PtabRow.length; i < len; i++) {
    //            xAB = (PtabRow[i].x - p.getX()), yAB = (PtabRow[i].y - p.getY());
    //            if ((xAB === 0) && (yAB === 0)) {
    //                p.setAlpha(i);
    //                return;
    //            }
    //        }
    //    };

    this.paintObject = function(ctx) {
        for (var i = 0, len1 = Ptab.length; i < len1; i++) {
            var tab = Ptab[i];
            ctx.beginPath();
            ctx.moveTo(tab[0].x, tab[0].y);
            for (var k = 0, len2 = tab.length; k < len2; k++) {
                ctx.lineTo(tab[k].x, tab[k].y);
            }
            ctx.stroke();
            ctx.fill();
        }
    };



    var computeMinMaxStep = function() {
        MIN = -1;
        MAX = Cn.getBounds().width + 2;
        STEP = (MAX - MIN) / NB;
    };

    var computeUpper = function() {
        var y = NaN;
        var tab = [];
        for (var x = MIN; x < MAX; x += STEP) {
            if (Math.abs(X[1]) > 1e-13) {
                var p = (X[3] + x * X[4]) / X[1],
                    q = (X[0] * x * x + X[2] * x + X[5]) / X[1];
                var h = p * p / 4 - q;
                y = -p / 2 - Math.sqrt(h);
            } else {
                y = NaN;
            }
            if (isNaN(y)) {
                if (tab.length > 0) {
                    Ptab.push(tab);
                    tab = [];
                }
            } else
                tab.push({
                    x: x,
                    y: y
                });
        }
        if (tab.length > 0)
            Ptab.push(tab);
    };

    var computeLower = function() {
        var y = NaN;
        var tab = [];
        for (var x = MIN; x < MAX; x += STEP) {
            if (Math.abs(X[1]) > 1e-13) {
                var p = (X[3] + x * X[4]) / X[1],
                    q = (X[0] * x * x + X[2] * x + X[5]) / X[1];
                var h = p * p / 4 - q;
                y = -p / 2 + Math.sqrt(h);
            } else {
                y = -(X[0] * x * x + X[2] * x + X[5]) / (X[3] + X[4] * x);
            }
            if (isNaN(y)) {
                if (tab.length > 0) {
                    Ptab.push(tab);
                    tab = [];
                }
            } else
                tab.push({
                    x: x,
                    y: y
                });
        }
        if (tab.length > 0)
            Ptab.push(tab);
    };


    var analysePartiesConnexes = function() {
        var dis = X[4] * X[4] - 4 * X[0] * X[1];
        if (dis < 0) {
            // Il s'agit d'une ellipse (b2-4ac<0) :
            if (Ptab.length === 2) {
                Ptab[0] = Ptab[0].concat(Ptab[1].reverse());
                Ptab[0].push({
                    x: Ptab[0][0].x,
                    y: Ptab[0][0].y
                });
                Ptab.splice(1, 1);
            }
        } else {
            // Il s'agit d'une hyperbole (ou parabole) :
            if (Ptab.length === 4) {
                Ptab[0] = Ptab[0].concat(Ptab[2].reverse());
                Ptab[1].reverse();
                Ptab[1] = Ptab[1].concat(Ptab[3]);
                Ptab.splice(2, 2);
            }
        }

    }


    this.compute = function() {
        var x01 = P[1].getX() - P[0].getX(),
            y01 = P[1].getY() - P[0].getY();
        var x02 = P[2].getX() - P[0].getX(),
            y02 = P[2].getY() - P[0].getY();
        var x03 = P[3].getX() - P[0].getX(),
            y03 = P[3].getY() - P[0].getY();
        var x04 = P[4].getX() - P[0].getX(),
            y04 = P[4].getY() - P[0].getY();
        // Test très grossier (rapidité) pour le cas ou les trois
        // premiers points sont alignés, on fait comme si les 5 l'étaient
        // et on affiche un segment (pour la 3D) :
        if ((Math.abs(x01 * y02 - x02 * y01) < 1e-10) || (Math.abs(x01 * y03 - x03 * y01) < 1e-10) || (Math.abs(x01 * y04 - x04 * y01) < 1e-10)) {
            var x0 = Math.min(P[0].getX(), P[1].getX(), P[2].getX(), P[3].getX(), P[4].getX());
            var y0 = Math.max(P[0].getY(), P[1].getY(), P[2].getY(), P[3].getY(), P[4].getY());
            var x1 = Math.max(P[0].getX(), P[1].getX(), P[2].getX(), P[3].getX(), P[4].getX());
            var y1 = Math.min(P[0].getY(), P[1].getY(), P[2].getY(), P[3].getY(), P[4].getY());
            Ptab = [];
            PtabRow = [];
            var tab = [];
            tab.push({
                x: x0,
                y: y0
            });
            tab.push({
                x: x1,
                y: y1
            });
            Ptab.push(tab);
            return;
        }
        var A = [];
        for (var i = 0; i < 5; i++) {
            var x = P[i].getX(),
                y = P[i].getY();
            A[i] = [x * x, y * y, x, y, x * y, 1];
            var sum = 0;
            for (var j = 0; j < 6; j++) {
                sum += A[i][j] * A[i][j];
            }
            sum = Math.sqrt(sum);
            for (var j = 0; j < 6; j++) {
                A[i][j] /= sum;
            }
        }
        var r = 0;
        var colindex = [];
        for (var c = 0; c < 6; c++) {
            if (r >= 5) {
                colindex[c] = -1;
                continue;
            }
            var max = Math.abs(A[r][c]);
            var imax = r;
            for (var i = r + 1; i < 5; i++) {
                var h = Math.abs(A[i][c]);
                if (h > max) {
                    max = h;
                    imax = i;
                }
            }
            if (max > 1e-13) {
                if (imax != r) {
                    var h = A[imax];
                    A[imax] = A[r];
                    A[r] = h;
                }
                for (var i = r + 1; i < 5; i++) {
                    var lambda = A[i][c] / A[r][c];
                    for (var j = c + 1; j < 6; j++) {
                        A[i][j] -= lambda * A[r][j];
                    }
                }
                colindex[c] = r;
                r++;
            } else {
                colindex[c] = -1;
            }
        }

        for (var j = 5; j >= 0; j--) {
            if (colindex[j] < 0) {
                X[j] = 1;
            } else {
                var h = 0;
                var i = colindex[j];
                for (var k = j + 1; k < 6; k++) {
                    h += A[i][k] * X[k];
                }
                X[j] = -h / A[i][j];
            }
        }
        var sum = 0;
        for (var i = 0; i <= 5; i++) {
            sum += Math.abs(X[i]);
        }
        //        if (sum<1e-10) {
        //            Valid=false;
        //        }
        for (var i = 0; i <= 5; i++) {
            X[i] /= sum;
            // Ce qui suit ressemble à un gag, pourtant il semble que l'epsilon au lieu de 0 en coeffs permet
            // de surmonter les effets de bord dans des cas particuliers (ex. hyperbole equilatère/parabole)
            // sans pour autant porter atteinte à la précision des coordonnées des points d'intersections
            // qui restent fiables à 1e-12, soit la précision maximale affichée du logiciel :
            //            X[i]=n(X[i]);
        }

        // Calcul des coordonnées des foyers de la conique (double pour parabole) :

        // pour ax^2 + 2bxy + cy^2 + 2dx + 2ey + f = 0
        var a = X[0],
            b = X[4] / 2,
            c = X[1],
            d = X[2] / 2,
            e = X[3] / 2,
            f = X[5];
        var A = [b * b - a * c, 0];
        var B = [c * d - b * e, a * e - b * d];
        var C = [e * e - d * d + f * (a - c), 2 * (b * f - d * e)];

        if (Math.abs(A[0]) < 1e-20) {
            // Il s'agit d'une parabole, résolution de -2Bz+C=0 :
            var z0 = MTH.quotient(C, MTH.times(2, B));
            FOCI = [z0, z0];
        } else {
            // Il s'agit d'une ellipse ou d'une hyperbole.
            // Résolution de l'équation complexe Az^2-2Bz+C=0 :
            // Racine du discriminant réduit :
            var SQ = MTH.csqrt(MTH.minus(MTH.times(B, B), MTH.times(A, C)))[0];
            var z1 = MTH.quotient(MTH.plus(B, SQ), A);
            var z2 = MTH.quotient(MTH.minus(B, SQ), A);
            FOCI = [z1, z2];
        }


        //        var a = X[0], b = X[4], c = X[1], d = X[2], e = X[3], f = X[5];
        //        console.log("det="+((a*c-b*b/4)*f+b*e*d/4-c*d*d/4-a*e*e/4));

        //        console.log(" X[0]=" + X[0] + " X[1]=" + X[1] + " X[2]=" + X[2] + " X[3]=" + X[3] + " X[4]=" + X[4] + " X[5]=" + X[5]);

        computeMinMaxStep();
        Ptab = [];
        computeUpper();
        computeLower();
        analysePartiesConnexes();
        PtabRow = [];
        // Regroupement en un seul tableau de toutes les parties connexes
        // de la conique :
        for (var i = 0; i < Ptab.length; i++) {
            PtabRow = PtabRow.concat(Ptab[i]);
        }

        //        console.log("x0="+X[0]+" x1="+X[1]+" x2="+X[2]+" x3="+X[3]+" x4="+X[4]+" x5="+X[5]);
    };


    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Quadric", P[0].getVarName(), P[1].getVarName(), P[2].getVarName(), P[3].getVarName(), P[4].getVarName());
    };



}
// Liste de points (reliés ou non) :
function ListObject(_construction, _name, _EXP) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    $U.extend(this, new MoveableObject(_construction)); // Héritage


    var me = this;
    var Cn = _construction;
    var ORG3D = null;
    var pt3D = Cn.getInterpreter().getEX().EX_point3D; // Pour les points3D
    var EXP = _EXP; // Expression contenant la liste de points (ou points3D)
    var Ptab = []; // Tableau de points
    var arrow = null; // Flèches en bout de segments
    var colors = ["#ffffff", "#cccccc", "#c0c0c0", "#999999", "#666666", "#333333", "#000000", "#ffcccc", "#ff6666", "#ff0000", "#cc0000", "#990000", "#660000", "#330000", "#ffcc99", "#ff9966", "#ff9900", "#ff6600", "#cc6600", "#993300", "#663300", "#ffff99", "#ffff66", "#ffcc66", "#ffcc33", "#cc9933", "#996633", "#663333", "#ffffcc", "#ffff33", "#ffff00", "#ffcc00", "#999900", "#666600", "#333300", "#99ff99", "#66ff99", "#33ff33", "#33cc00", "#009900", "#006600", "#003300", "#99ffff", "#33ffff", "#66cccc", "#00cccc", "#339999", "#336666", "#003333", "#ccffff", "#66ffff", "#33ccff", "#3366ff", "#3333ff", "#000099", "#000066", "#ccccff", "#9999ff", "#6666cc", "#6633ff", "#6600cc", "#333399", "#330099", "#ffccff", "#ff99ff", "#cc66cc", "#cc33cc", "#993399", "#663366", "#330033"];
    var images = {};
    me.setArrow = function(_t) {
        arrow = (_t && (_t.length === 2) && (_t[0]) && (_t[1])) ? _t : null;
    }
    me.getArrow = function() {
        return arrow;
    }

    // me.setArrow(16,5);

    var pushImage = function(_url) {
        var cod = _url.substr(_url.length - 50);
        if (!images.hasOwnProperty(cod)) {
            var img = new Image();
            img.onload = function() {
                if (!images.hasOwnProperty(cod)) {
                    images[cod] = img;
                    Cn.getCanvas().paint()
                }
            };
            img.src = _url
        }
    }

    var getImage = function(_url) {
        var cod = _url.substr(_url.length - 50);
        if (images.hasOwnProperty(cod)) return images[cod];
        return null;
    }


    var initPtab = function() {
        // var lst = EXP.getValue();
        var lst = EXP.getE1().forcevalue();
        //         console.log(lst[0]);
        // console.log("initPtab : " + me.getName() + "  " + lst.length);
        Ptab.length = 0;

        var rr = me.getColor().getR();
        var gg = me.getColor().getG();
        var bb = me.getColor().getB();
        var ss = segSize;
        var ps = me.getRealsize();
        var ft = ["Arial", 30, "normal", "center"];
        var cn = 54;
        // var points = 0;
        var oldColStop = 0;

        if (!$U.isArray(lst))
            return;
        for (var i = 0, len = lst.length; i < len; i++) {
            if (!$U.isArray(lst[i])) {
                Ptab.length = 0;
                return;
            }
            if (lst[i].length === 2) {
                // Il s'agit d'un point 2D :
                var xx = Cn.coordsSystem.px(lst[i][0]);
                var yy = Cn.coordsSystem.py(lst[i][1]);
                // points++;
                Ptab.push({
                    x: xx,
                    y: yy,
                    tab: lst[i],
                    r: rr,
                    g: gg,
                    b: bb,
                    rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                    sz: ss, // segment size
                    pz: ps, // point size
                    fnt: ft
                });
            } else if (lst[i].length === 3) {
                if (isNaN(lst[i][0]) && isNaN(lst[i][1]) && isNaN(lst[i][2])) {
                    Ptab.push({
                        x: NaN,
                        y: NaN,
                        tab: lst[i],
                        r: rr,
                        g: gg,
                        b: bb,
                        rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                        sz: ss, // segment size
                        pz: ps, // point size
                        fnt: ft
                    });
                } else {
                    // Il s'agit d'un point 3D :
                    if (ORG3D === null) {
                        ORG3D = Cn.get3DOrigin(me);
                        if (ORG3D === null) {
                            // Aucune origine 3D n'est détectée (erreur) :
                            Ptab.length = 0;
                            return;
                        }
                    }

                    //                me.set3D(true);
                    var c2d = pt3D([Cn.coordsSystem.x(ORG3D.getX()), Cn.coordsSystem.y(ORG3D.getY())], lst[i]);
                    var xx = Cn.coordsSystem.px(c2d[0]);
                    var yy = Cn.coordsSystem.py(c2d[1]);
                    // points++;
                    Ptab.push({
                        x: xx,
                        y: yy,
                        tab: lst[i],
                        r: rr,
                        g: gg,
                        b: bb,
                        rgb: "rgb(" + rr + "," + gg + "," + bb + ")",
                        sz: ss, // segment size
                        pz: ps, // point size
                        fnt: ft
                    });
                }

            } else if (lst[i].length >= 4) {
                if (lst[i][0] === 0) {
                    // Un élément [0,r,g,b] signale un breakpoint de dégradé de couleur :
                    // console.log("*********** : Ptab.length=" + Ptab.length + "  oldColStop=" + oldColStop);
                    if (Ptab.length > oldColStop) {
                        var iR = (lst[i][1] - rr) / (Ptab.length - oldColStop);
                        var iG = (lst[i][2] - gg) / (Ptab.length - oldColStop);
                        var iB = (lst[i][3] - bb) / (Ptab.length - oldColStop);
                        for (var j = oldColStop + 1; j < Ptab.length; j++) {
                            var k = j - oldColStop;
                            var nr = Math.round(rr + k * iR);
                            var ng = Math.round(gg + k * iG);
                            var nb = Math.round(bb + k * iB);
                            Ptab[j].r = nr;
                            Ptab[j].g = ng;
                            Ptab[j].b = nb;
                            Ptab[j].rgb = "rgb(" + nr + "," + ng + "," + nb + ")";
                        }
                    }
                    rr = lst[i][1];
                    gg = lst[i][2];
                    bb = lst[i][3];
                    oldColStop = Ptab.length;
                } else if (lst[i][0] === 1) {
                    // Un élément [1,r,g,b] signale un breakpoint de changement de couleur :
                    // console.log("*********** : Ptab.length=" + Ptab.length + "  oldColStop=" + oldColStop);
                    rr = lst[i][1];
                    gg = lst[i][2];
                    bb = lst[i][3];
                } else if (lst[i][0] === 2) {
                    // Un élément [2,0,0,n] signale un breakpoint de changement de couleur
                    // numéroté n dans la palette 7x10
                    cn = (lst[i][3] - 1) % 70; // La couleur tortue commence à 1 et non pas à 0
                    var _rgb = $U.hexToRGB(colors[cn]);
                    rr = _rgb.r;
                    gg = _rgb.g;
                    bb = _rgb.b;
                } else if (lst[i][0] === 3) {
                    // Un élément [3,0,0,i] signale un incrément de couleur
                    // (cn+i) dans la palette 7x10
                    cn = (cn + lst[i][3]) % 70;
                    var _rgb = $U.hexToRGB(colors[cn]);
                    rr = _rgb.r;
                    gg = _rgb.g;
                    bb = _rgb.b;
                } else if (lst[i][0] === 4) {
                    // Un élément [4,0,0,op] signale l'ordre de remplir avec une opacité de op%
                    Ptab[Ptab.length - 1].fill = lst[i][3] / 100;

                } else if (lst[i][0] === 10) {
                    // Un élément [10,0,0,sz] signale un breakpoint de taille de crayon :
                    ss = lst[i][3];
                } else if (lst[i][0] === 11) {
                    // Un élément [11,0,0,inc] signale un incrément de taille de crayon :
                    ss += lst[i][3];
                } else if (lst[i][0] === 12) {
                    // Un élément [10,0,0,sz] signale un breakpoint de taille de crayon :
                    ps = lst[i][3];
                } else if (lst[i][0] === 13) {
                    // Un élément [11,0,0,inc] signale un incrément de taille de crayon :
                    ps += lst[i][3];
                } else if (lst[i][0] === 20) {
                    // Un élément [20,0,txt,U] signale l'ordre d'écrire txt dans la direction U :
                    Ptab[Ptab.length - 1].text = [lst[i][2], lst[i][3]];
                } else if (lst[i][0] === 21) {
                    // Un élément [21,0,0,tab] signale un changement de style d'écriture. tab
                    // représente un tableau à 4 éléments [font,size,face,align] :
                    ft = lst[i][3];
                } else if (lst[i][0] === 30) {
                    // Un élément [30,url,w,h,U] signale l'ordre d'afficher une image
                    // d'adresse url, de dimension (w,h), dans la direction U :
                    Ptab[Ptab.length - 1].image = { url: lst[i][1], w: lst[i][2], h: lst[i][3], z: lst[i][4], o: lst[i][5], dir: lst[i][6] };
                    pushImage(lst[i][1]);
                }
            } else {
                // Sinon il y a erreur dans l'expression:
                Ptab.length = 0;
                return;
            }
        }
        // console.log("*********");
        // for (var i = 0; i < Ptab.length; i++) {
        //     console.log("Ptab[" + i + "].r=" + Ptab[i].r);
        //     console.log("Ptab[" + i + "].g=" + Ptab[i].g);
        //     console.log("Ptab[" + i + "].b=" + Ptab[i].b);
        // }
    };
    initPtab();
    var fillStyle = this.prefs.color.point_free;
    var segSize = -1; // Taille des segments
    var shape = 0; // Apparence des points


    this.getEXP = function() {
        return EXP;
    }

    this.setSegmentsSize = function(val) {
        segSize = val;
    };
    this.getSegmentsSize = function() {
        return segSize;
    };

    this.setParent(EXP);
    this.setDefaults("list");

    this.getAssociatedTools = function() {
        return "@callproperty,@calltrash,@callcalc,@calllist,point";
    };

    this.isInstanceType = function(_c) {
        return (_c === "list");
    };
    this.getCode = function() {
        return "list";
    };
    this.getFamilyCode = function() {
        return "list";
    };
    this.setShape = function(_shape) {
        shape = _shape;
        switch (shape) {
            case 0:
                paintPoint = paintCircle;
                break;
            case 1:
                paintPoint = paintCross;
                break;
            case 2:
                paintPoint = paintDiamond;
                break;
            case 3:
                paintPoint = paintSquare;
                break;
        }
    };
    this.getShape = function() {
        return shape;
    };

    this.getPtNum = function(_i) {
        var k = 0;
        for (var i = 0; i < Ptab.length; i++) {
            if (!isNaN(Ptab[i].x) || !isNaN(Ptab[i].y)) k++;
            if (k === _i) return Ptab[i].tab;
        }
        return [NaN, NaN]
    };

    this.getPtLength = function(_i) {
        var k = 0;
        for (var i = 0; i < Ptab.length; i++) {
            if (!isNaN(Ptab[i].x) || !isNaN(Ptab[i].y)) k++;
        }
        return k
    };


    this.projectXY = function(x, y) {
        // console.log("Ptab="+Ptab);
        var p = Ptab[0];
        var x1 = p.x,
            y1 = p.y;
        var count = 0;
        var xmin = x1,
            ymin = y1,
            dmin = 1e20,
            cmin = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            p = Ptab[i];
            var x2 = p.x,
                y2 = p.y;
            var dx = x2 - x1,
                dy = y2 - y1;
            var r = dx * dx + dy * dy;
            if (r > 1e-5) {
                var h = dx * (x - x1) / r + dy * (y - y1) / r;
                if (h > 1) {
                    h = 1;
                } else if (h < 0) {
                    h = 0;
                }
                var xh = x1 + h * dx,
                    yh = y1 + h * dy;
                var dist2 = (x - xh) * (x - xh) + (y - yh) * (y - yh);
                if (dist2 < dmin) {
                    dmin = dist2;
                    xmin = xh;
                    ymin = yh;
                    cmin = count;

                }
            }
            count++;
            x1 = x2;
            y1 = y2;
        }

        return [xmin, ymin];
    };

    this.project = function(p) {
        //        console.log("project");
        var coords = this.projectXY(p.getX(), p.getY());
        p.setXY(coords[0], coords[1]);
    };
    this.projectAlpha = function(p) {

        if ((Ptab.length < 2) || (segSize === -1))
            return;
        var alp = p.getAlpha();
        var nb = alp[0];
        var k = alp[1];

        // S'il y a eu changement de nature du point sur, qui passe
        // d'un comportement continue à discret :
        if ((segSize === 0) && (k !== 0)) {
            this.setAlpha(p);
            alp = p.getAlpha();
            nb = alp[0];
            k = alp[1];
        }
        if (nb < 0)
            nb = 0;
        else if (nb > (Ptab.length - 1))
            nb = Ptab.length - 1;
        // console.log("nb=" + nb);
        if (segSize > 0)
            p.setXY(Ptab[nb].x + k * (Ptab[nb + 1].x - Ptab[nb].x), Ptab[nb].y + k * (Ptab[nb + 1].y - Ptab[nb].y));
        else
            p.setXY(Ptab[nb].x, Ptab[nb].y);
        // console.log("projectAlpha :" + Ptab[nb].x + "  " + Ptab[nb].y);
    };
    this.setAlpha = function(p) {
        if (Ptab.length < 2)
            return;
        var dmin = 1e20,
            nb = 0,
            k = 0;
        if (segSize > 0) {
            for (var i = 1, len = Ptab.length; i < len; i++) {
                var am = (Ptab[i - 1].x - p.getX()) * (Ptab[i - 1].x - p.getX()) + (Ptab[i - 1].y - p.getY()) * (Ptab[i - 1].y - p.getY());
                var mb = (Ptab[i].x - p.getX()) * (Ptab[i].x - p.getX()) + (Ptab[i].y - p.getY()) * (Ptab[i].y - p.getY());
                var ab = (Ptab[i].x - Ptab[i - 1].x) * (Ptab[i].x - Ptab[i - 1].x) + (Ptab[i].y - Ptab[i - 1].y) * (Ptab[i].y - Ptab[i - 1].y);
                var epsilon = Math.abs(Math.sqrt(ab) - Math.sqrt(am) - Math.sqrt(mb));
                if (epsilon < dmin) {
                    dmin = epsilon;
                    nb = i - 1;
                    k = Math.sqrt(am / ab);
                }
                p.setAlpha([nb, k]);
            }
        } else {
            for (var i = 0, len = Ptab.length; i < len; i++) {
                var d2 = (Ptab[i].x - p.getX()) * (Ptab[i].x - p.getX()) + (Ptab[i].y - p.getY()) * (Ptab[i].y - p.getY());
                if (d2 < dmin) {
                    dmin = d2;
                    k = i;
                }
            }
            p.setAlpha([k, 0]);
        }
    };


    // Pour les objets "locus". Initialise le polygone à partir de la donnée
    // du nombre _nb de sommets voulus :
    this.initLocusArray = function(_nb) {
        var PtsTab = []; // Liste des sommets du polygone représentant le lieu
        // Initialisation de Ptab :
        for (var i = 0; i < Ptab.length; i++) {
            PtsTab.push({
                "alpha": i,
                "x": 0,
                "y": 0,
                "x1": 0,
                "y1": 0,
                "r": 0
            });
        }
        return PtsTab;
    };

    this.setLocusAlpha = function(p, a) {
        if (Ptab[a] !== undefined)
            p.setXY(Ptab[a].x, Ptab[a].y);
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        if (Ptab.length > 0) {
            if ($U.isNearToPoint(Ptab[0].x, Ptab[0].y, mx, my, this.getOversize()))
                return true;
            for (var i = 1, len = Ptab.length; i < len; i++) {
                if ($U.isNearToPoint(Ptab[i].x, Ptab[i].y, mx, my, this.getOversize()))
                    return true;
                if ((segSize > 0) &&
                    ($U.isNearToSegment(Ptab[i - 1].x, Ptab[i - 1].y, Ptab[i].x, Ptab[i].y, mx, my, this.getOversize())))
                    return true;

            }
        }
        return false;
    };


    this.compute = function() {
        initPtab();
    };

    var paintCircle = function(i, ctx) {
        ctx.arc(Ptab[i].x, Ptab[i].y, Ptab[i].pz, 0, Math.PI * 2, true);
        // ctx.arc(Ptab[i].x, Ptab[i].y, me.getRealsize(), 0, Math.PI * 2, true);
    };
    var paintCross = function(i, ctx) {
        var sz = Ptab[i].pz * 0.9;
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y - sz);
        ctx.moveTo(Ptab[i].x - sz, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y + sz);
    };
    var paintSquare = function(i, ctx) {
        var sz = Ptab[i].pz * 1.8;
        ctx.rect(Ptab[i].x - sz / 2, Ptab[i].y - sz / 2, sz, sz);
    };
    var paintDiamond = function(i, ctx) {
        var sz = Ptab[i].pz * 1.3;
        ctx.moveTo(Ptab[i].x, Ptab[i].y - sz);
        ctx.lineTo(Ptab[i].x - sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y + sz);
        ctx.lineTo(Ptab[i].x + sz, Ptab[i].y);
        ctx.lineTo(Ptab[i].x, Ptab[i].y - sz);
    };
    var paintArrow = function(x1, y1, x2, y2, ctx) {
        var rot = -Math.atan2(x2 - x1, y2 - y1);
        ctx.save();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.translate(x2, y2);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrow[1], -arrow[0]);
        ctx.lineTo(arrow[1], -arrow[0]);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
    var preRenderTeXSlices = function(ctx, txt, size) {
        var texTab = txt.toString().split("$$");
        var datas = { width: 0, positions: [], boxes: [], texts: [] };
        // var pos = 0;
        for (var i = 0; i < texTab.length; i++) {
            if (i % 2 === 0) {
                // console.log(texTab[i]);
                // ctx.fillText(texTab[i], pos, 0);
                datas.positions.push(datas.width);
                datas.boxes.push(null);
                datas.texts.push(texTab[i]);
                datas.width += ctx.measureText(texTab[i]).width;

            } else {
                var box = katex.canvasBox(texTab[i], ctx, {
                    fontSize: size * 1.5
                });
                datas.positions.push(datas.width);
                datas.boxes.push(box);
                datas.texts.push(null);
                datas.width += box.width;
            }
        }
        return datas;
    };



    var paintText = function(_p, ctx) {
        if ($U.katexLoaded(Cn.getCanvas().paint, [ctx])) {
            var x0 = _p.x,
                y0 = _p.y,
                _t = _p.text[0],
                _u = _p.text[1],
                font = _p.fnt[0],
                size = _p.fnt[1],
                face = _p.fnt[2],
                align = _p.fnt[3];

            var rot = -Math.atan2(_u[1], _u[0]);

            ctx.save();
            ctx.font = face + " " + size + "px " + font;

            // L'alignement doit se traiter par le translate
            // placé plus bas :
            ctx.textAlign = "left";
            ctx.strokeStyle = _p.rgb;
            ctx.fillStyle = _p.rgb;
            var datas = preRenderTeXSlices(ctx, _t, size);
            var d = (align === "left") ? 0 : ((align === "right") ? datas.width : datas.width / 2);
            ctx.translate(x0 - d * Math.cos(rot), y0 - d * Math.sin(rot));
            ctx.rotate(rot);
            for (var i = 0; i < datas.boxes.length; i++) {
                if (datas.boxes[i]) {
                    datas.boxes[i].renderAt(datas.positions[i], 0);
                } else {
                    ctx.fillText(datas.texts[i], datas.positions[i], 0);
                }
            }
            ctx.restore();
        };

    };

    var paintImage = function(_p, ctx) {
        var x0 = _p.x,
            y0 = _p.y,
            _url = _p.image.url,
            _w = _p.image.w,
            _h = _p.image.h,
            _z = _p.image.z,
            _o = _p.image.o,
            _u = _p.image.dir;
        var img = getImage(_url);
        if (img) {
            var rot = -Math.atan2(_u[1], _u[0]);
            ctx.save();
            ctx.translate(x0, y0);
            ctx.rotate(rot);
            ctx.globalAlpha = _o;
            if (_w < 0) {
                _w = img.width;
                _h = img.height
            }
            _w *= _z;
            _h *= _z;
            ctx.drawImage(img, -_w / 2, -_h / 2, _w, _h);
            ctx.restore();
        };
    };




    var paintPoint = paintCircle;


    this.paintObject = function(ctx) {
        var hilite = (ctx.strokeStyle === this.prefs.color.hilite);
        if ((segSize > 0) && (Ptab.length > 0)) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // remplissage des polygones :
            ctx.beginPath();
            ctx.lineWidth = segSize;
            ctx.moveTo(Ptab[0].x, Ptab[0].y);
            for (var aa = 1, len = Ptab.length; aa < len; aa++) {
                var p = Ptab[aa];
                if (isNaN(p.x) || isNaN(p.y) || (p.fill)) {
                    if (p.fill) {
                        ctx.fillStyle = "rgba(" + p.r + "," + p.g + "," + p.b + "," + p.fill + ")";
                        ctx.lineTo(p.x, p.y);
                        // console.log("******break******");
                        // console.log("aa=" + aa+";lineto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                        // console.log("*****************");
                        aa--
                    }
                    ctx.fill();
                    ctx.beginPath();
                    aa++
                    if (aa < len)
                        ctx.moveTo(p.x, p.y);
                    // console.log("aa=" + aa+";moveto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                } else {
                    ctx.lineTo(p.x, p.y);
                    // console.log("aa=" + aa+";lineto(" + Cn.coordsSystem.x(p.x) + "," + Cn.coordsSystem.y(p.y)+")");
                }
            }
            ctx.fill();

            // Dessin des segments :
            ctx.beginPath();
            ctx.lineWidth = segSize;
            if (hilite) {
                for (var i = 1, len = Ptab.length; i < len; i++) {
                    if (isNaN(Ptab[i].x) || isNaN(Ptab[i].y)) {
                        i++
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(Ptab[i - 1].x, Ptab[i - 1].y);
                        ctx.lineTo(Ptab[i].x, Ptab[i].y);
                        ctx.stroke();
                    }
                }
            } else {
                for (var i = 1, len = Ptab.length; i < len; i++) {
                    if (isNaN(Ptab[i].x) || isNaN(Ptab[i].y)) {
                        i++
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(Ptab[i - 1].x, Ptab[i - 1].y);
                        ctx.strokeStyle = Ptab[i - 1].rgb;
                        ctx.lineWidth = Ptab[i - 1].sz;
                        ctx.lineTo(Ptab[i].x, Ptab[i].y);
                        ctx.stroke();
                        if (arrow) paintArrow(Ptab[i - 1].x, Ptab[i - 1].y, Ptab[i].x, Ptab[i].y, ctx);
                    }
                }
            }
            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";
        }

        // dessin des points :
        var opaque = (me.getOpacity() > 0);
        if (!opaque) ctx.fillStyle = fillStyle;
        ctx.lineWidth = me.prefs.size.pointborder;
        if (hilite) {
            for (var i = 0, len = Ptab.length; i < len; i++) {
                if (Ptab[i].pz > 1e-10) {
                    ctx.beginPath();
                    paintPoint(i, ctx);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        } else {
            if (opaque) {
                var glob_alpha = ctx.globalAlpha;
                for (var i = 0, len = Ptab.length; i < len; i++) {
                    if (Ptab[i].pz > 1e-10) {
                        ctx.beginPath();
                        ctx.strokeStyle = Ptab[i].rgb;
                        ctx.fillStyle = Ptab[i].rgb;
                        ctx.globalAlpha = me.getOpacity();
                        paintPoint(i, ctx);
                        ctx.fill();
                        ctx.globalAlpha = glob_alpha;
                        ctx.stroke();
                    }
                    if (Ptab[i].text) paintText(Ptab[i], ctx);
                    if (Ptab[i].image) paintImage(Ptab[i], ctx);
                }
            } else {
                for (var i = 0, len = Ptab.length; i < len; i++) {
                    if (Ptab[i].pz > 1e-10) {
                        ctx.beginPath();
                        ctx.strokeStyle = Ptab[i].rgb;
                        paintPoint(i, ctx);
                        ctx.fill();
                        ctx.stroke();
                    }
                    if (Ptab[i].text) paintText(Ptab[i], ctx);
                    if (Ptab[i].image) paintImage(Ptab[i], ctx);
                }
            }

        }

    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "List", EXP.getVarName());
    };

}
//************************************************
//********* CIRCLE 3 pts OBJECT ******************
//************************************************


function Circle3ptsObject_3D(_construction, _name, _P1, _P2, _P3) {
    var Cn = _construction;
    var M = new CenterObject(_construction, "_Center", this);
    _construction.add(M);

    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage

    var me = this;
    var A = _P1;
    var B = _P2;
    var C = _P3;
    var R = 0;
    this.setParent(A, B, C);
    M.setParent(this);

    var NB = 500;
    var Ptab = [];
    var phi = Cn.getInterpreter().getEX().EX_phi;
    var theta = Cn.getInterpreter().getEX().EX_theta;

    this.redefine = function(_old, _new) {
        if (_old === A) {
            this.addParent(_new);
            A = _new;
        } else if (_old === B) {
            this.addParent(_new);
            B = _new;
        } else if (_old === C) {
            this.addParent(_new);
            C = _new;
        }
    };

    this.setDefaults("circle");

    this.getCode = function() {
        return "circle3pts3D";
    };
    this.getFamilyCode = function() {
        return "circle3pts3D";
    };
    this.isInstanceType = function(_c) {
        return (_c === "circle3pts3D");
    };
    this.getAssociatedTools = function() {
        return "point,@callproperty,@calltrash";
    };

    this.getValue = function() {
        return (me.getCn().coordsSystem.l(R));
    };

    this.getP1 = function() {
        return M;
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        for (var i = 0, len = Ptab.length; i < len; i++) {
            if ($U.isNearToPoint(Ptab[i][0][0], Ptab[i][0][1], mx, my, this.getOversize()))
                return true;
        }
        return false;
    };


    // ****************************************
    // **** Uniquement pour les animations ****
    // ****************************************


    this.getAlphaBounds = function(anim) {
        var inc = 5 * Math.round(anim.direction * (anim.speed * anim.delay / 1000));
        return [0, Ptab.length - 1, inc]
    };

    this.getAnimationSpeedTab = function() {
        return [0, 20, 25, 50, 100, 200, 400, 500, 750, 1000];
    };

    this.getAnimationParams = function(x0, y0, x1, y1) {
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var fce = this.getAnimationSpeedTab();
        var f = Math.floor(d / (300 / fce.length));
        if (f >= fce.length) f = fce.length - 1;

        var xAB = (Ptab[0][0][0] - x0),
            yAB = (Ptab[0][0][1] - y0);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1; i < Ptab.length; i++) {
            xAB = (Ptab[i][0][0] - x0);
            yAB = (Ptab[i][0][1] - y0);
            d1 = xAB * xAB + yAB * yAB;
            if ((d1 < d2) || isNaN(d2)) {
                k = i;
                d2 = d1;
            }
        }
        var xp = Ptab[k - 1][0][0];
        var yp = Ptab[k - 1][0][1];
        var ps = (xp - x0) * (x1 - x0) + (yp - y0) * (y1 - y0);
        var dir = (ps > 0) ? 1 : -1;
        // var dop = Math.sqrt((xp - x0) * (xp - x0) + (yp - y0) * (yp - y0));
        // var dom = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        // var cs = ps / (dop * dom);
        // var aller_retour = (Math.abs(cs) < 0.707);
        var pcent = Math.round(100 * fce[f] / fce[fce.length - 1])+"%";

        return {
            message: pcent + "",
            speed: fce[f],
            direction: dir,
            ar: false
        }
    }

    // ****************************************
    // ****************************************


    this.projectXY = function(_x, _y) {
        var xAB = (Ptab[0][0][0] - _x),
            yAB = (Ptab[0][0][1] - _y);
        var d2 = xAB * xAB + yAB * yAB,
            d1 = 0;
        var k = 0;
        for (var i = 1, len = Ptab.length; i < len; i++) {
            xAB = (Ptab[i][0][0] - _x);
            yAB = (Ptab[i][0][1] - _y);
            d1 = xAB * xAB + yAB * yAB;
            if (d1 < d2) {
                k = i;
                d2 = d1;
            }
        }
        return k;
    };

    this.project = function(p) {
        var k = this.projectXY(p.getX(), p.getY());
        p.setXYZ(Ptab[k][1]);
    };

    this.projectAlpha = function(p) {
        if (Ptab.length > 0) {
            if (p.getAlpha() < Ptab.length)
                p.setXYZ(Ptab[p.getAlpha()][1]);
            else {
                p.setXYZ(Ptab[Ptab.length - 1][1]);
            }
        }

    };

    this.setAlpha = function(p) {
        p.setAlpha(this.projectXY(p.getX(), p.getY()));
    };


    // Seulement pour les macros :
    this.setMacroAutoObject = function() {
        var vn = this.getVarName();
        A.setMacroMode(1);
        A.setMacroSource(function(src) {
            src.geomWrite(false, A.getVarName(), "DefinitionPoint", vn, 0);
        });
        B.setMacroMode(1);
        B.setMacroSource(function(src) {
            src.geomWrite(false, B.getVarName(), "DefinitionPoint", vn, 1);
        });
        C.setMacroMode(1);
        C.setMacroSource(function(src) {
            src.geomWrite(false, C.getVarName(), "DefinitionPoint", vn, 2);
        });
    };
    // Seulement pour les macros :
    this.isAutoObjectFlags = function() {
        return (A.Flag || B.Flag || C.Flag);
    };
    // Seulement pour les macros :
    this.getPt = function(_i) {
        if (_i === 0)
            return A;
        if (_i === 1)
            return B;
        return C;
    };

    this.isMoveable = function() {
        return false;
    };


    this.paintObject = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(Ptab[0][0][0], Ptab[0][0][1]);
        for (var i = 1, len = Ptab.length; i < len; i++) {
            ctx.lineTo(Ptab[i][0][0], Ptab[i][0][1]);
        }
        ctx.lineTo(Ptab[0][0][0], Ptab[0][0][1]);
        ctx.stroke();
        ctx.fill();
    };


    this.compute = function() {
        var org = Cn.get3DOrigin(me);
        var orgX = Cn.coordsSystem.x(org.getX());
        var orgY = Cn.coordsSystem.y(org.getY());
        var fi = phi();
        var th = theta();
        var cfi = Cn.cos(fi),
            sfi = Cn.sin(fi);
        var cth = Cn.cos(th),
            sth = Cn.sin(th);

        var pt = function(_v) {
            return [orgX + _v[0] * (sfi) + _v[1] * (cfi), orgY + _v[0] * (-cfi * sth) + _v[1] * (sfi * sth) + _v[2] * (cth)];
        };
        var px = Cn.coordsSystem.px;
        var py = Cn.coordsSystem.py;

        var a = A.coords3D();
        var b = B.coords3D();
        var c = C.coords3D();
        var a2 = (c[0] - b[0]) * (c[0] - b[0]) + (c[1] - b[1]) * (c[1] - b[1]) + (c[2] - b[2]) * (c[2] - b[2]);
        var b2 = (c[0] - a[0]) * (c[0] - a[0]) + (c[1] - a[1]) * (c[1] - a[1]) + (c[2] - a[2]) * (c[2] - a[2]);
        var c2 = (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]);

        // Determination du centre :
        var alpha = a2 * (-a2 + b2 + c2);
        var beta = b2 * (a2 - b2 + c2);
        var gamma = c2 * (a2 + b2 - c2);
        var sum = alpha + beta + gamma;
        var t = [];
        t[0] = a[0] + (beta / sum) * (b[0] - a[0]) + (gamma / sum) * (c[0] - a[0]);
        t[1] = a[1] + (beta / sum) * (b[1] - a[1]) + (gamma / sum) * (c[1] - a[1]);
        t[2] = a[2] + (beta / sum) * (b[2] - a[2]) + (gamma / sum) * (c[2] - a[2]);
        M.setXYZ(t);

        // Determination des points du cercle par l'équation barycentrique
        // de ce cercle :
        var tab = [],
            tbc = [],
            tca = [];
        var step = 1 / NB;
        var k, x, y, z, inter, coef;
        for (var i = 0; i < NB; i++) {
            // Tracé de l'arc AB :
            k = i * step;
            inter = b2 * (1 - k) + a2 * k;
            coef = inter / (inter - c2 * k * (1 - k));
            x = c[0] + coef * (a[0] - c[0] + k * (b[0] - a[0]));
            y = c[1] + coef * (a[1] - c[1] + k * (b[1] - a[1]));
            z = c[2] + coef * (a[2] - c[2] + k * (b[2] - a[2]));
            c2d = pt([x, y, z]);
            tab.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);
            // Tracé de l'arc BC :
            inter = c2 * (1 - k) + b2 * k;
            coef = inter / (inter - a2 * k * (1 - k));
            x = a[0] + coef * (b[0] - a[0] + k * (c[0] - b[0]));
            y = a[1] + coef * (b[1] - a[1] + k * (c[1] - b[1]));
            z = a[2] + coef * (b[2] - a[2] + k * (c[2] - b[2]));
            c2d = pt([x, y, z]);
            tbc.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);
            // Tracé de l'arc CA :
            inter = a2 * (1 - k) + c2 * k;
            coef = inter / (inter - b2 * k * (1 - k));
            x = b[0] + coef * (c[0] - b[0] + k * (a[0] - c[0]));
            y = b[1] + coef * (c[1] - b[1] + k * (a[1] - c[1]));
            z = b[2] + coef * (c[2] - b[2] + k * (a[2] - c[2]));
            c2d = pt([x, y, z]);
            tca.push([
                [px(c2d[0]), py(c2d[1])],
                [x, y, z]
            ]);

        }
        // Concaténation des trois arcs en un seul tableau.
        // Chaque élément de ce tableau est un tableau regroupant
        // les coordonnées 2d et 3d du point : [[x,y],[x3d,y3d,z3d]]
        Ptab = tab;
        Ptab = Ptab.concat(tbc);
        Ptab = Ptab.concat(tca);
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Circle3pts3D", _P1.getVarName(), _P2.getVarName(), _P3.getVarName());
    };


};
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
        var xPA = this.P1.getX() - _P.getX();
        var yPA = this.P1.getY() - _P.getY();
        var xPB = this.P2.getX() - _P.getX();
        var yPB = this.P2.getY() - _P.getY();
        if ((xPA * xPB + yPA * yPB) > 0) {
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
        var headlen = me.prefs.size.vectorhead;
        var angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2 - headlen * Math.cos(angle), y2 - headlen * Math.sin(angle));
        ctx.stroke();
        ctx.lineCap = 'butt';
        var c1 = Math.cos(angle - Math.PI / 10);
        var s1 = Math.sin(angle - Math.PI / 10);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 10), y2 - headlen * Math.sin(angle + Math.PI / 10));
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2 - headlen * c1, y2 - headlen * s1);
        ctx.stroke();
        ctx.fill();
    };

    this.getSource = function(src) {
        src.geomWrite(false, this.getName(), "Vector", this.P1.getVarName(), this.P2.getVarName());
    };


    this.setDefaults("vector");

}
//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function BlocklyButtonObject(_construction, _name, _display_name, _x, _y) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var me = this;
    var Cn = _construction;
    var X = _x;
    var Y = _y;
    var W = 0;
    var BTN = { x: 0, y: 0, w: 40, h: 35, mouseInside: false };
    var LABEL = _display_name;


    this.blocks.setMode(["onprogram","oninit"], "onprogram");

    this.getAssociatedTools = function() {
        s = "@callproperty,@dgscriptname,@blockly";
        return s;
    };


    this.getCode = function() {
        return "blockly_button";
    };
    this.getFamilyCode = function() {
        return "blockly_button";
    };

    me.run = function() {
        this.blocks.evaluate("onprogram");
    };

    me.setLabel = function(_m) {
        LABEL = _m;
    };
    me.getLabel = function() {
        return LABEL;
    };


    var drawButton = function(ctx, x, y, w, h, r) {
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
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle;
        var d = 5;
        ctx.moveTo(x + w / d, y + h / d);
        ctx.lineTo(x + w / d, y + (d - 1) * h / d);
        ctx.lineTo(x + (d - 1) * w / d, y + h / 2);
        ctx.lineTo(x + w / d, y + h / d);
        ctx.fill();
    };


    this.paintObject = function(ctx) {
        if (BTN.mouseInside) ctx.strokeStyle = this.getColor().getRGB();
        W = ctx.measureText(LABEL).width;
        BTN.x = X - BTN.w;
        BTN.y = Y - 40 / 2;
        var fs = ctx.fillStyle;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(LABEL, X - BTN.w - 20, Y);
        ctx.strokeStyle = this.getColor().getRGB();
        if (BTN.mouseInside) ctx.lineWidth = this.getSize() * 1.5;
        else ctx.lineWidth = this.getSize();
        ctx.fillStyle = fs;
        drawButton(ctx, BTN.x, BTN.y, BTN.w, BTN.h, 10);
        ctx.textBaseline ="alphabetic";
    };


    me.setXY = function(x, y) {
        X = x;
        Y = y;
    };

    var dragX, dragY, OldX, OldY;
    this.startDrag = function(_x, _y) {
        dragX = _x;
        dragY = _y;
        OldX = X;
        OldY = Y;
    };

    this.dragTo = function(_x, _y) {
        this.setXY(OldX + Math.round((_x - dragX) / 10) * 10, OldY + Math.round((_y - dragY) / 10) * 10);
    };

    this.compute = function() {

    };

    this.getSource = function(src) {
        var x = Cn.coordsSystem.x(X);
        var y = Cn.coordsSystem.y(Y);
        src.geomWrite(true, this.getName(), "BlocklyButton", $U.native2ascii(LABEL), x, y);
    };

    this.insideButton = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        return ((mx > BTN.x) && (mx < BTN.x + BTN.w) && (my > BTN.y) && (my < BTN.y + BTN.h));
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        var x = X - BTN.w - 20 - W;
        var inside = ((mx > x) && (mx < x + W) && (my < Y + this.getFontSize() / 2) && (my > Y - this.getFontSize() / 2));
        BTN.mouseInside = this.insideButton(ev);
        return inside || BTN.mouseInside;
    };


    this.setDefaults("blockly_button");

}
//************************************************
//*************** OBJECT CONSTRUCTOR *************
//************************************************
function ObjectConstructor() {
    var C = [];

    this.getCode = function() {
        return "";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 0;
    };

    this.getInitials = function() {
        return [];
    };

    this.preview = function(ev, zc) {};

    this.getC = function(_i) {
        if (_i < C.length)
            return C[_i];
        else
            return null;
    };

    this.getCList = function() {
        return C;
    };

    this.clearC = function() {
        C = [];
    };

    this.addC = function(_obj) {
        C.push(_obj);
    };

    this.isAcceptedInitial = function(o) {
        var bool = false;
        var inis = this.getInitials();
        if (C.length < inis.length) {
            var tab = inis[C.length].split(",");
            for (var i = 0; i < tab.length; i++) {
                bool = bool || (o.isInstanceType(tab[i]));
            }
        }
        return bool;
    };

    this.isLastObject = function() {
        return true;
    };

    this.isInstantTool = function() {
        return false;
    };

    this.selectInitialObjects = function(zc) {
        //        if (C.length > 0)
        //            zc.getConstruction().addSelected(C[0]);
        if ((C.length > 0) && (!(C[0].isIndicated())))
            zc.getConstruction().addSelected(C[0]);
    };

    this.setInitialObjects = function(_sel) {
        var len = _sel.length;
        C = [];
        for (var i = 0; i < len; i++) {
            if (this.isAcceptedInitial(_sel[i])) {
                C.push(_sel[i]);
            } else {
                return;
            }
        }

    };

    // Only for preview purpose :
    this.isSelectCreatePoint = false;
    this.isNewPoint = false;

    this.selectCreatePoint = function(zc, ev) {
        this.isSelectCreatePoint = true;
        var cn = zc.getConstruction();
        var newPt = cn.getFirstIndicatedPoint();
        this.isNewPoint = (newPt === null);
        if (this.isNewPoint) {
            var pc = zc.getPointConstructor();
            if (cn.getIndicated().length > 0) {
                pc.setInitialObjects(cn.getIndicated());
            }
            newPt = pc.createObj(zc, ev);
            pc.clearC();
        }

        C.push(newPt);
    };

    this.createCallBack = function(zc, o) {};

    this.createObj = function(zc, ev) {
        if (C.length > 0) {
            var s = this.newObj(zc, C);
            zc.addObject(s);
            s.compute();
            if (zc.getConstruction().is3D())
                zc.getConstruction().computeAll();
        }
        this.createCallBack(zc, s);
        Expression.fixAll();
    };

    this.newObj = function(_zc, _C) {};

}
//************************************************
//*************** POINT CONSTRUCTOR **************
//************************************************
function PointConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "point";
    };

    this.getInitials = function() {
        return ["line,circle,locus,function,quadric,area,circle3pts3D,list", "line,circle,quadric"];
    };

    var indsSortFilter = function(a, b) {
        if (a.isInstanceType("line")) return -1;
        else return 1;
    };
 
    this.selectCreatePoint = function(zc, ev) {};

    this.createObj = function(zc, ev) {
        var o = new PointObject(zc.getConstruction(), "_P", zc.mouseX(ev), zc.mouseY(ev));
        zc.addObject(o);
        zc.namesManager.setName(o);
        var deps = this.getCList();
        deps.sort(indsSortFilter);
        var len = deps.length;
        switch (len) {
            case 1:
                // On veut créer un point sur objet :
                o.addParent(deps[0]);
                deps[0].project(o);
                deps[0].setAlpha(o);
                deps[0].setBoundaryMode(o);
                // o.setAnimation(10, -1, true);
                break;
            case 2:
                // On veut créer un point d'intersection :
                if (deps[0].isCoincident(deps[1])) {
                    // Si les objets sont confondus, on crée un point sur objet :
                    o.addParent(deps[0]);
                    deps[0].project(o);
                    deps[0].setAlpha(o);
                } else {
                    // Sinon un point d'intersection :
                    o.addParent(deps[0]);
                    o.addParent(deps[1]);
                    deps[0].initIntersect2(deps[1], o);
                }
                break;
        }
        o.setFillStyle();
        Expression.fixAll();
        o.compute();



        return o;
    };

    this.preview = function(ev, zc) {
        var deps = this.getCList();
        var len = deps.length;

        if (len > 0) {
            deps.sort(indsSortFilter);
            var size = zc.prefs.size.point;
            if (Object.touchpad) {
                size *= zc.prefs.size.touchfactor;
            }
            var coords;
            switch (len) {
                case 1:
                    // point sur objet :
                    coords = deps[0].projectXY(zc.mouseX(ev), zc.mouseY(ev));
                    break;
                case 2:
                    // point d'intersection :
                    if (deps[0].isCoincident(deps[1])) {
                        // Si les objets sont confondus, on prévisualise un point sur objet :
                        coords = deps[0].projectXY(zc.mouseX(ev), zc.mouseY(ev));
                    } else {
                        coords = deps[0].intersectXY(deps[1], zc.mouseX(ev), zc.mouseY(ev));
                    }
                    break;
            }
            var ctx = zc.getContext();
            ctx.fillStyle = zc.prefs.color.hilite;
            ctx.strokeStyle = zc.prefs.color.hilite;
            ctx.lineWidth = zc.prefs.size.pointborder;
            ctx.beginPath();
            ctx.arc(coords[0], coords[1], size, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
        }
    };
}
//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function SegmentConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "segment";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        return new SegmentObject(_zc.getConstruction(), "_S", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(this.getC(0).getX(), this.getC(0).getY());
        ctx.lineTo(zc.mouseX(ev), zc.mouseY(ev));
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//*************** RAY CONSTRUCTOR ****************
//************************************************
function RayConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "ray";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        return new RayObject(_zc.getConstruction(), "_R", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.strokeStyle = zc.prefs.color.hilite;
        $U.drawPartialLine(ctx, this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev), false, true);
    };

}
//************************************************
//*************** LINE CONSTRUCTOR ***************
//************************************************
function LineConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "line";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        return new TwoPointsLineObject(_zc.getConstruction(), "_L", _C[0], _C[1]);
    };



    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.strokeStyle = zc.prefs.color.hilite;
        $U.drawPartialLine(ctx, this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev), true, true);
    };
}
//************************************************
//*************** MIDPOINT CONSTRUCTOR ***********
//************************************************
function MidPointConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "midpoint";
    };

    this.getInitials = function() {
        return ["point,segment"];
    };

    // Si le premier constituant est un segment, alors
    // il s'agit d'une construction instantannée
    this.isInstantTool = function() {
        return (this.getC(0).isInstanceType("segment"));
    };

    this.createCallBack = function(zc, o) {
        zc.namesManager.setName(o);
    };

    this.newObj = function(_zc, _C) {
        var first = this.getC(0);
        if (first.isInstanceType("segment")) {
            _C = [first.P1, first.P2];
        }
        return new MidPointObject(_zc.getConstruction(), "_M", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        if (this.isInstantTool()) return;
        var size = zc.prefs.size.point;
        if (Object.touchpad) {
            size *= zc.prefs.size.touchfactor;
        }
        var x = (this.getC(0).getX() + zc.mouseX(ev)) / 2;
        var y = (this.getC(0).getY() + zc.mouseY(ev)) / 2;

        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    };

}
//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function CircleConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "circle";
    };
    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        return new CircleObject(_zc.getConstruction(), "_C", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        var r = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev));
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(this.getC(0).getX(), this.getC(0).getY(), r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function Circle1Constructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var R = 0;

    this.getCode = function() {
        return "circle1";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.newObj = function(_zc, _C) {
        return new Circle1Object(_zc.getConstruction(), "_C", _C[0], R);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        R = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev));
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(this.getC(0).getX(), this.getC(0).getY(), R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function Circle3Constructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "circle3";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return new Circle3Object(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var r;
        ctx.beginPath();
        switch (len) {
            case 1:
                r = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev), zc.mouseY(ev));
                ctx.arc(zc.mouseX(ev), zc.mouseY(ev), r, 0, Math.PI * 2, true);
                break;
            case 2:
                r = $U.computeRay(this.getC(0).getX(), this.getC(0).getY(), this.getC(1).getX(), this.getC(1).getY());
                if (this.isSelectCreatePoint) {
                    ctx.arc(this.getC(1).getX(), this.getC(1).getY(), r, 0, Math.PI * 2, true);
                    this.isSelectCreatePoint = false;
                } else {
                    ctx.arc(zc.mouseX(ev), zc.mouseY(ev), r, 0, Math.PI * 2, true);
                }
                break;
        }
        ctx.stroke();
    };
}
//************************************************
//************ PARALLEL CONSTRUCTOR **************
//************************************************
function ParallelConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "parallel";
    };

    this.getInitials = function() {
        return ["line"];
    };

    this.newObj = function(_zc, _C) {
        return new ParallelLineObject(_zc.getConstruction(), "_Par", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        var dx = this.getC(0).getDX();
        var dy = this.getC(0).getDY();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        $U.drawPartialLine(ctx, zc.mouseX(ev) - dx, zc.mouseY(ev) - dy, zc.mouseX(ev) + dx, zc.mouseY(ev) + dy, true, true);
    };
}
//************************************************
//************** PLUMB CONSTRUCTOR ***************
//************************************************
function PlumbConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "plumb";
    };

    this.getInitials = function() {
        return ["line"];
    };

    this.newObj = function(_zc, _C) {
        return new PlumbObject(_zc.getConstruction(), "_Perp", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        var dx = this.getC(0).getDY();
        var dy = -this.getC(0).getDX();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        $U.drawPartialLine(ctx, zc.mouseX(ev) - dx, zc.mouseY(ev) - dy, zc.mouseX(ev) + dx, zc.mouseY(ev) + dy, true, true);
    };

};
//************************************************
//************ PerpBisectorConstructor ***********
//************************************************
function PerpBisectorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "perpbis";
    };

    this.getInitials = function() {
        return ["point,segment"];
    };

    // Si le premier constituant est un segment, alors
    // il s'agit d'une construction instantannée
    this.isInstantTool = function() {
        return (this.getC(0).isInstanceType("segment"));
    };

    this.newObj = function(_zc, _C) {
        var first = this.getC(0);
        if (first.isInstanceType("segment")) {
            _C = [first.P1, first.P2];
        }
        return new PerpBisectorObject(_zc.getConstruction(), "_L", _C[0], _C[1]);
    };

    var normalize = function(xA, yA, xB, yB) {
        var l = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
        return {
            x: (xB - xA) / l,
            y: (yB - yA) / l
        };
    };

    this.preview = function(ev, zc) {
        if (this.isInstantTool()) return;
        var ctx = zc.getContext();
        var xA = this.getC(0).getX();
        var yA = this.getC(0).getY();
        var xB = zc.mouseX(ev);
        var yB = zc.mouseY(ev);
        var xM = (xA + xB) / 2;
        var yM = (yA + yB) / 2;



        var d = normalize(0, 0, yA - yB, xB - xA);
        var t = $U.computeBorderPoints(xM, yM, d.x, d.y, zc.getWidth(), zc.getHeight());
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(t[0], t[1]);
        ctx.lineTo(t[2], t[3]);
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//**************** AREA CONSTRUCTOR **************
//************************************************
function AreaConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var col = new Color();

    this.getCode = function() {
        return "area";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        var len = c.length;
        if ((len > 1) && (c[0] === c[len - 1])) {
            return true;
        }
        return false;
    };



    this.newObj = function(_zc, _C) {
        var a = new AreaObject(_zc.getConstruction(), "_Poly", _C);
        a.setOpacity(_zc.prefs.opacity.area);
        return (a);
    };

    this.preview = function(ev, zc) {

        var ctx = zc.getContext();
        col.set(zc.prefs.color.area);
        col.setOpacity(zc.prefs.opacity.area);
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.fillStyle = col.getRGBA();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        var c = this.getCList();
        var len = c.length;
        ctx.moveTo(this.getC(0).getX(), this.getC(0).getY());
        for (var i = 1; i < len; i++) {
            ctx.lineTo(this.getC(i).getX(), this.getC(i).getY());
        }
        ctx.lineTo(zc.mouseX(ev), zc.mouseY(ev));
        ctx.stroke();
        ctx.fill();
    };
}
//************************************************
//*************** MIDPOINT CONSTRUCTOR ***********
//************************************************
function SymcConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "symc";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.createCallBack = function(zc, o) {
        zc.namesManager.setName(o);
    };

    this.newObj = function(_zc, _C) {
        return new SymcObject(_zc.getConstruction(), "_Symc", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var size = zc.prefs.size.point;
        if (Object.touchpad) {
            size *= zc.prefs.size.touchfactor;
        }
        var x = 2 * this.getC(0).getX() - zc.mouseX(ev);
        var y = 2 * this.getC(0).getY() - zc.mouseY(ev);
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//*************** MIDPOINT CONSTRUCTOR ***********
//************************************************
function SymaConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "syma";
    };

    this.getInitials = function() {
        return ["line"];
    };

    this.createCallBack = function(zc, o) {
        zc.namesManager.setName(o);
    };

    this.newObj = function(_zc, _C) {
        return new SymaObject(_zc.getConstruction(), "_Syma", _C[0], _C[1]);
    };

    this.preview = function(ev, zc) {
        var size = zc.prefs.size.point;
        if (Object.touchpad) {
            size *= zc.prefs.size.touchfactor;
        }
        var coords = this.getC(0).reflectXY(zc.mouseX(ev), zc.mouseY(ev));
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.pointborder;
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    };
}
//************************************************
//**************** AREA CONSTRUCTOR **************
//************************************************
function Circle3ptsConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "circle3pts";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        var no;
        if (_C[0].is3D()) {
            no = new Circle3ptsObject_3D(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
        } else {
            no = new Circle3ptsObject(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
            no.getM().setHidden(true);
        }

        return no;
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = yM = r = 0;
        switch (len) {
            case 1:
                xM = (c[0].getX() + zc.mouseX(ev)) / 2;
                yM = (c[0].getY() + zc.mouseY(ev)) / 2;
                r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xM = (c[0].getX() + c[1].getX()) / 2;
                    yM = (c[0].getY() + c[1].getY()) / 2;
                    r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                    this.isSelectCreatePoint = false;
                } else {
                    var t = $U.computeCenter(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    xM = t[0];
                    yM = t[1];
                    var r = $U.computeRay(t[0], t[1], c[0].getX(), c[0].getY());
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(xM, yM, r, 0, Math.PI * 2, true);
        ctx.stroke();
    };
};
//************************************************
//***************** ARC CONSTRUCTOR **************
//************************************************
function Arc3ptsConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "arc3pts";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        var no = new Arc3ptsObject(_zc.getConstruction(), "_C", _C[0], _C[1], _C[2]);
        no.getM().setHidden(true);
        return no;
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = r = 0;
        var yM = 0;
        var fromA, toA, trig = true;
        switch (len) {
            case 1:
                xM = (c[0].getX() + zc.mouseX(ev)) / 2;
                yM = (c[0].getY() + zc.mouseY(ev)) / 2;
                r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                fromA = $U.angleH(zc.mouseX(ev) - xM, zc.mouseY(ev) - yM);
                toA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xM = (c[0].getX() + c[1].getX()) / 2;
                    yM = (c[0].getY() + c[1].getY()) / 2;
                    r = $U.computeRay(xM, yM, c[0].getX(), c[0].getY());
                    fromA = $U.angleH(c[1].getX() - xM, c[1].getY() - yM);
                    toA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                    this.isSelectCreatePoint = false;
                } else {
                    var t = $U.computeArcParams(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    xM = t.centerX;
                    yM = t.centerY;
                    fromA = t.startAngle;
                    toA = t.endAngle;
                    trig = t.Trigo;
                    var r = $U.computeRay(t.centerX, t.centerY, c[0].getX(), c[0].getY());
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(xM, yM, r, -fromA, -toA, trig);
        ctx.stroke();
    };
}
//************************************************
//**************** AREA CONSTRUCTOR **************
//************************************************
function AngleBisectorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "anglebiss";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return (new AngleBisectorObject(_zc.getConstruction(), "_R", _C[0], _C[1], _C[2]));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        var c = this.getCList();
        var len = c.length;
        var xM = yM = xA = yA = 0;
        switch (len) {
            case 1:
                xA = zc.mouseX(ev);
                yA = zc.mouseY(ev);
                xM = c[0].getX();
                yM = c[0].getY();
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xA = c[1].getX();
                    yA = c[1].getY();
                    xM = c[0].getX();
                    yM = c[0].getY();
                    this.isSelectCreatePoint = false;
                } else {
                    var b = $U.d(c[1], c[0]);
                    var a = $U.d(c[1], zc.mouse(ev));
                    var k = b / (a + b);
                    xA = c[1].getX();
                    yA = c[1].getY();
                    xM = c[0].getX() + k * (zc.mouseX(ev) - c[0].getX());
                    yM = c[0].getY() + k * (zc.mouseY(ev) - c[0].getY());
                }
                break;
        }
        var t = $U.computeBorderPoints(xA, yA, xM - xA, yM - yA, zc.getWidth(), zc.getHeight());
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(t[2], t[3]);
        ctx.stroke();
        ctx.closePath();
    };
}
//************************************************
//**************** LOCUS CONSTRUCTOR *************
//************************************************
function LocusConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "locus";
    };

    this.getInitials = function() {
        return ["point,line,circle"];
    };

    this.isInstantTool = function() {
        return true;
    };

    this.newObj = function(_zc, _C) {
        var first = this.getC(0);
        _C.push(_zc.getConstruction().findPtOn(first));
        return (new LocusObject(_zc.getConstruction(), "_Locus", _C[0], _C[1]));
    };

    this.preview = function(ev, zc) {};
}
//************************************************
//***************** ARC CONSTRUCTOR **************
//************************************************
function AngleConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    this.getCode = function() {
        return "angle";
    };
    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        return (new AngleObject(_zc.getConstruction(), "_A", _C[0], _C[1], _C[2]));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = 0;
        var yM = 0;
        var fromA, toA, trig = true;
        switch (len) {
            case 1:
                xM = zc.mouseX(ev);
                yM = zc.mouseY(ev);
                fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                fromA = fromA - Math.PI / 6;
                toA = fromA + Math.PI / 3;
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    xM = c[1].getX();
                    yM = c[1].getY();
                    fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                    fromA = fromA - Math.PI / 6;
                    toA = fromA + Math.PI / 3;
                    this.isSelectCreatePoint = false;
                } else {
                    xM = c[1].getX();
                    yM = c[1].getY();
                    var t = $U.computeAngleParams(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    fromA = t.startAngle;
                    toA = t.endAngle;
                    trig = t.Trigo;
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.angle;
        ctx.beginPath();
        ctx.arc(xM, yM, 30, -fromA, -toA, trig);
        ctx.stroke();
    };
}
function FixedAngleConstructor() {
    var superobject = $U.extend(this, new ObjectConstructor()); //Héritage
    var AOC = 0;
    var AOC180 = 0;
    var trig = true;

    this.getCode = function() {
        return "fixedangle";
    };
    this.getInitials = function() {
        return ["point"];
    };

    this.isLastObject = function() {
        var c = this.getCList();
        return (c.length === 3);
    };

    this.newObj = function(_zc, _C) {
        this.selectCreatePoint = superobject.selectCreatePoint;
        var angle = (_zc.getConstruction().isDEG()) ? Math.round(AOC180 * 180 / Math.PI) : AOC180;
        var obj = new FixedAngleObject(_zc.getConstruction(), "_A", _C[0], _C[1], trig);
        obj.setExp(angle);
        return (obj);
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var c = this.getCList();
        var len = c.length;
        var xM = yM = 0;
        var xA = yA = NaN;
        var fromA, toA = true;
        switch (len) {
            case 1:
                xM = zc.mouseX(ev);
                yM = zc.mouseY(ev);
                fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                fromA = fromA - Math.PI / 6;
                toA = fromA + Math.PI / 3;
                trig = true;
                break;
            case 2:
                if (this.isSelectCreatePoint) {
                    //                    console.log("yes");
                    xM = c[1].getX();
                    yM = c[1].getY();
                    fromA = $U.angleH(c[0].getX() - xM, c[0].getY() - yM);
                    fromA = fromA - Math.PI / 6;
                    toA = fromA + Math.PI / 3;
                    this.isSelectCreatePoint = false;
                    this.selectCreatePoint = function() {
                        this.getCList().push(new VirtualPointObject(0, 0))
                    };
                } else {
                    //                    console.log("no");
                    xM = c[1].getX();
                    yM = c[1].getY();
                    xA = zc.mouseX(ev);
                    yA = zc.mouseY(ev);
                    var t = $U.computeAngleParams(c[0].getX(), c[0].getY(), c[1].getX(), c[1].getY(), zc.mouseX(ev), zc.mouseY(ev));
                    fromA = t.startAngle;
                    toA = t.endAngle;
                    trig = t.Trigo;
                    var coef = Math.PI / 180;
                    AOC = Math.round(t.AOC / coef) * coef;
                    AOC180 = Math.round(t.AOC180 / coef) * coef;
                }
                break;
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.fixedangle;
        if (!isNaN(xA)) {
            var t = $U.computeBorderPoints(xM, yM, xA - xM, yA - yM, zc.getWidth(), zc.getHeight());
            ctx.beginPath();
            ctx.moveTo(xM, yM);
            ctx.lineTo(t[2], t[3]);
            ctx.stroke();
            ctx.closePath();
            ctx.save();

            var b = Math.sqrt((xM - xA) * (xM - xA) + (yM - yA) * (yM - yA));
            var a = Math.sqrt((xM - c[0].getX()) * (xM - c[0].getX()) + (yM - c[0].getY()) * (yM - c[0].getY()));
            var k = b / (a + b);
            var x = xA + k * (c[0].getX() - xA) - xM;
            var y = yA + k * (c[0].getY() - yA) - yM;
            var a = Math.atan2(y, x);
            var r = 30 + zc.prefs.fontmargin;
            ctx.textAlign = "left";
            var display = AOC180;
            display = display * 180 / Math.PI;
            display = Math.round(display);
            if (display > 180)
                a += Math.PI;

            if ((a < -$U.halfPI) || (a > $U.halfPI)) {
                a += Math.PI;
                r = -r;
                ctx.textAlign = "right";
            }
            ctx.strokeStyle = zc.prefs.color.fixedangle;
            ctx.fillStyle = ctx.strokeStyle;
            ctx.translate(xM, yM);
            ctx.rotate(a);

            ctx.fillText($L.number(display) + "°", r, 18 / 2);
            ctx.restore();
        }
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = ctx.lineWidth * 3;
        ctx.beginPath();
        ctx.arc(xM, yM, 30, -fromA, -toA, trig);
        ctx.stroke();

    };
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function NameMover() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "namemover";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        //        console.log("createObj");
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {
        var o = this.getC(0);
        var a = $U.angleH(o.getX() - zc.mouseX(ev), o.getY() - zc.mouseY(ev));
        o.setNamePosition(a);
        o.setShowName(true);
    };


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallProperty() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "callproperty";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.selectPropBtn(true);
        zc.propertiesManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ObjectMover() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var draggedObject = null;
    this.getCode = function() {
        return "objectmover";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        draggedObject = null;
    };

    this.selectCreatePoint = function(zc, ev) {};

    var x0 = 0,
        y0 = 0;
    this.preview = function(ev, zc) {
        if (draggedObject) {
            draggedObject.dragTo(zc.mouseX(ev) + x0, zc.mouseY(ev) + y0);
            zc.getConstruction().compute();
        } else {
            draggedObject = this.getC(0);
            if ((draggedObject) && (draggedObject.getFamilyCode() === "point")) {
                x0 = draggedObject.getX() - zc.mouseX(ev);
                y0 = draggedObject.getY() - zc.mouseY(ev);
            } else {
                x0 = 0;
                y0 = 0;
            }
            if (draggedObject) draggedObject.startDrag(zc.mouseX(ev) + x0, zc.mouseY(ev) + y0);
        }

    };


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallCalc() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "callcalc";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.selectCalcBtn(true);
        var obj = (this.getC(0).getCode() === "list") ? this.getC(0).getEXP() : this.getC(0);
        setTimeout(function() {
            zc.calcManager.edit(obj);
        }, 1);

    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function FloatingObjectConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "pushpin";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.unfree = function() {
        return false;
    };

    this.createObj = function(zc, ev) {
        var pt = this.getC(0);
        pt.setFloat(!pt.getFloat());
        if (pt.getFloat()) {
            pt.free = function() {
                return false;
            }
        } else {
            pt.free = function() {
                return (pt.getParentLength() === 0);
            }
        }
        //        zc.selectPropBtn(true);
        //        zc.propertiesManager.edit(this.getC(0));

    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallMagnet() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "magnet";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.magnetManager.edit(this.getC(0));
        //        zc.propertiesManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallDepends() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "depends";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.dependsManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
function CallList() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "calllist";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        this.getC(0).setSegmentsSize(1 * (this.getC(0).getSegmentsSize() === 0));
        if ((this.getC(0).getSegmentsSize() === 0) && (this.getC(0).getSize() === 0)) {
            this.getC(0).setSize(0.5)
        }
        this.getC(0).computeChilds();
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};

}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallTrash() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "calltrash";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.undoManager.deleteObjs(zc.getConstruction().safelyDelete(this.getC(0)));
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function AnchorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/anchorblack.svg";

    this.getCode = function() {
        return "anchor";
    };

    this.getType = function() {
        return 1;
    };

    this.getInitials = function() {
        return ["point"];
    };
    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        var Obj = this.getC(0);
        var Pt = this.getC(1);
        if (Obj.getCode() === "expression") {
            // Il s'agit d'une expression à attacher à un point :
            Obj.attachTo(Pt);
        } else {
            // Il s'agit d'un point à redéfinir :
            if ((this.isNewPoint) && (Pt.getParentLength() === 0)) {
                // Un nouveau point libre a été créé, on l'enlève :
                zc.getConstruction().remove(Pt);
            } else {
                // On a ciblé un objet, bon pour un point sur :
                Obj.attachTo(Pt);
            }
        }
    };

    this.preview = function(ev, zc) {
        //        console.log(this.getCList().length);
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var x = this.getC(0).getX();
        var y = this.getC(0).getY();
        var w = (this.getC(0).getW) ? this.getC(0).getW() : 0;
        var h = (this.getC(0).getW) ? 5 : 0;
        var x0 = x + w / 2;
        var y0 = y + h;
        var x1 = zc.mouseX(ev);
        var y1 = zc.mouseY(ev);
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);

        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(img, (x0 + x1) / 2 - 20, (y0 + y1) / 2 - 20, 40, 40);
    };
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function NoAnchorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "noanchor";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        this.getC(0).deleteAlpha();
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
//************************************************
//*************** VECTOR CONSTRUCTOR *************
//************************************************
function VectorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "vector";
    };

    this.getInitials = function() {
        return ["point"];
    };

    this.newObj = function(_zc, _C) {
        var a = new VectorObject(_zc.getConstruction(), "_V", _C[0], _C[1]);
        a.setOpacity(_zc.prefs.opacity.vector);
        return a;
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var x1 = this.getC(0).getX(),
            y1 = this.getC(0).getY();
        var x2 = zc.mouseX(ev),
            y2 = zc.mouseY(ev);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineCap = 'butt';
        var headlen = zc.prefs.size.vectorhead;
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
}
//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function SpringConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/spring_const.svg";
    img.h = 30;


    // var fce = $P.fce_seg;
    // var f = 0;
    // var ar = false;
    // var dir = 1;
    // var max = 500;

    this.getCode = function() {
        return "spring";
    };

    this.getType = function() {
        return 1;
    };

    this.getInitials = function() {
        return ["point"];
    };
    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        var Obj = this.getC(0);
        var p = Obj.getAnimationParams(zc.mouseX(ev), zc.mouseY(ev));
        zc.getConstruction().addAnimation(Obj, p.speed, p.direction, p.ar);
        zc.getConstruction().remove(this.getC(1));
    };

    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        var x0 = this.getC(0).getX();
        var y0 = this.getC(0).getY();
        var x1 = zc.mouseX(ev);
        var y1 = zc.mouseY(ev);
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        var a = Math.atan2(y1 - y0, x1 - x0);
        ctx.save();
        ctx.translate(x0, y0);
        ctx.rotate(a);
        ctx.drawImage(img, 0, -img.h / 2, d, img.h);
        ctx.restore();
        ctx.save();
        if ((a < -$U.halfPI) || (a > $U.halfPI)) {
            a += Math.PI;
        }
        ctx.translate((x0 + x1) / 2, (y0 + y1) / 2);
        ctx.rotate(a);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(100,100,100,1)";
        ctx.font = "24px Arial";
        var message = "";
        var p = this.getC(0).getAnimationParams(x1, y1);
        
        ctx.fillText(p.message, 0, -img.h / 2);
        ctx.restore();
    };
}
//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function BlocklyConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "blockly";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        zc.blocklyManager.edit(this.getC(0));
        //        zc.propertiesManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {

    };

    this.preview = function(ev, zc) {};
}
function DGScriptNameConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "dgscriptname";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    this.createObj = function(zc, ev) {
        var obj = this.getC(0);
        $U.prompt($L.create_blockly_program_change_message, obj.getLabel(), "text", function(_old, _new) {
            if (_new === "") _new = _old;
            obj.setLabel(_new);
            zc.paint();
        }, 450, 165, 430);
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};
}
function ToolBtn(_canvas, _oc, _procDown, _procUp) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var canvas = _canvas;
    var oc = _oc;
    var code = oc.getCode();
    var procDown = _procDown;
    var procUp = _procUp;

    var docObject = me.getDocObject();

    switch (oc.getType()) {
        case 0:
            me.addImage($APP_PATH + "NotPacked/images/tools/bg_standard2.svg");
            break;
        case 1:
            me.addImage($APP_PATH + "NotPacked/images/tools/bg_property2.svg");
            break;
    }


    //    $U.preloadImage($APP_PATH + "NotPacked/images/tools/" + code + ".svg");
    me.addImage($APP_PATH + "NotPacked/images/tools/" + code + ".svg");

    //console.log($APP_PATH + "NotPacked/images/tools/" + code + ".svg");

    me.transition("scale", 0.1);

    canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.setBounds(-500, -500, 10, 10);
    me.applyTransitionOUT();

    docObject.addEventListener('touchstart', function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            var ev = $U.PadToMouseEvent(touch);
            procDown(ev);
        }
    }, false);
    docObject.addEventListener('touchmove', function(tch) {
        tch.preventDefault();
        canvas.touchMoved(tch);
    }, false);
    docObject.addEventListener('touchend', function(tch) {
        tch.preventDefault();
        canvas.touchEnd(tch);
    }, false);
    docObject.addEventListener('mousedown', procDown, false);
    docObject.addEventListener('mouseup', procUp, false);

    this.show = function() {
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
    };

    this.hide = function() {
        me.applyTransitionOUT();
    };

    this.init = function(l, t, w, h) {
        var b = me.getOwnerBounds();
        me.setBounds(b.left + l, b.top + t, w, h);
        me.show();
    };

}
/* 
 * To change me template, choose Tools | Templates
 * and open the template in the editor.
 */


function ToolsManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var context = canvas.getContext();
    var toolsize = parseInt(canvas.prefs.tool.size);
    var toolgap = parseInt(canvas.prefs.tool.gap);
    var toolmarginV = parseInt(canvas.prefs.tool.marginV);
    if (Object.touchpad) {
        toolsize *= parseFloat(canvas.prefs.tool.touchfactor);
        toolgap *= parseFloat(canvas.prefs.tool.touchfactor);
        toolmarginV *= parseFloat(canvas.prefs.tool.touchfactor);
    }
    var bxy = []; // Tableau multidimensionnel représentant les outils
    var pxy = []; // Tableau simple représentant les modificateurs de propriété
    var tools = [];
    var visible = false;
    var targets = [];


    me.isVisible = function() {
        return visible;
    };


    me.addTool = function(_oc) {
        tools[_oc.getCode()] = new Tool(canvas, me, _oc);
    };

    me.getConstructor = function(_code) {
        return tools[_code].getConstructor();
    };

    me.closeTools = function() {
        visible = false;
        for (var tl in tools) {
            tools[tl].close();
        }
    };

    me.hideTools = function() {
        visible = false;
        for (var tl in tools) {
            tools[tl].hide();
        }
    };

    var setCoords = function(ev, _o) {
        var cX, cY;
        if (_o.getFamilyCode() === "point") {
            cX = _o.getX();
            cY = _o.getY();
        } else {
            cX = canvas.mouseX(ev);
            cY = canvas.mouseY(ev);
        }
        var lenl = bxy.length;
        var H = lenl * toolsize + (lenl - 1) * toolgap;
        var starty = cY - H - toolmarginV;
        if (starty < 0)
            starty = cY + toolmarginV;
        for (var line = 0; line < lenl; line++) {
            var lenc = bxy[line].length;
            var W = lenc * toolsize + (lenc - 1) * toolgap;
            var startx = cX - W / 2;
            if (startx < 0)
                startx = toolgap;
            else if (startx + W > canvas.getWidth())
                startx = canvas.getWidth() - W - toolgap;

            for (var col = 0; col < lenc; col++) {
                var x = startx + col * (toolsize + toolgap);
                var y = starty + line * (toolsize + toolgap);
                bxy[line][col].tool.init(x, y, toolsize);
            }
        }
        var ts = 3 * toolsize / 4;
        var w = pxy.length * ts + (pxy.length - 1) * toolgap;
        startx += (W - w) / 2;
        if ((cY - H - toolmarginV) > 0) {
            starty = cY + toolmarginV;
        } else {
            starty = cY - toolmarginV - ts;
        }
        for (var col = 0; col < pxy.length; col++) {
            pxy[col].tool.init(startx + col * (ts + toolgap), starty, ts);
            //            pxy[col].tool.init(cX + _o.getRealsize() + 3 * toolgap + col * (ts + toolgap), cY - ts / 2, ts);
        }
        //    propBtn.init(100,100,toolsize,toolsize);
    };

    me.showTools = function(ev) {
        visible = true;
        canvas.setMovedFilter(me.mouseMoved);
        targets = canvas.getConstruction().getSelected().slice();
        //        var selectedObjs = canvas.getConstruction().getSelected();
        if (targets.length > 0) {
            var myTools = targets[0].getAssociatedTools().split(",");
            var len = myTools.length;

            bxy = [];
            pxy = [];
            var col = [];
            for (var i = 0; i < len; i++) {
                var t = myTools[i];
                if (t.startsWith("@")) {
                    pxy.push({
                        tool: tools[t.split("@")[1]]
                    });
                } else if (t === "BR") {
                    bxy.push(col);
                    col = [];
                } else {
                    col.push({
                        tool: tools[t]
                    });
                }
            }
            bxy.push(col);
            context.globalAlpha = 1;
            setCoords(ev, targets[0]);
        }
    };

    me.showOneTool = function(_tool, ev) {
        visible = true;
        canvas.setMovedFilter(me.mouseMoved);

        var cX = canvas.mouseX(ev);
        var cY = canvas.mouseY(ev);
        var stX = cX - toolsize / 2;
        if (stX < 0)
            stX = toolgap;
        else if (stX + toolsize > canvas.getWidth())
            stX = canvas.getWidth() - toolsize - toolgap;
        var stY = cY - toolsize - toolmarginV;
        if (stY < 0)
            stY = cY + toolmarginV;

        _tool.init(stX, stY, toolsize);
    };



    var TOOL = null;
    var OC = null;
    me.mouseDown = function(ev, _tool) {
        me.hideTools();
        TOOL = _tool;
        OC = TOOL.getConstructor();

        if (!canvas.isObjectConstructor(OC)) {
            canvas.setObjectConstructor(OC);
            OC.setInitialObjects(targets);
            if (OC.isInstantTool()) {
                me.closeTools();
                canvas.setNoMouseEvent(true);
                canvas.clearFilters();
                OC.createObj(canvas, ev);
                canvas.setPointConstructor();
                canvas.getConstruction().validate(ev);
                canvas.getConstruction().clearSelected();
                canvas.paint(ev);
                return;
            }
        }
        canvas.setMovedFilter(null);
        canvas.setReleasedFilter(me.mouseReleased);
        canvas.paint(ev);
    };

    me.mouseMoved = function(ev) {};

    me.mouseReleased = function(ev) {
        if ((!OC) || (OC.isInstantTool()))
            return;
        canvas.clearFilters();
        canvas.getConstruction().validate(ev);
        OC.selectCreatePoint(canvas, ev);
        if (OC.isLastObject()) {
            me.closeTools();
            OC.createObj(canvas, ev);
            canvas.setPointConstructor();
            canvas.getConstruction().validate(ev);
            canvas.getConstruction().clearSelected();
            canvas.getConstruction().clearIndicated();
            canvas.paint(ev);
        } else {
            canvas.paint(ev);
            me.showOneTool(TOOL, ev);
        }
    };


};
function Tool(_canvas, _man, _oc) {
    var me = this;
    var canvas = _canvas;
    var toolmanager = _man;
    var OC = _oc;
    var X, Y, WIDTH, HEIGHT;
    var mouseDown = function(ev) {
        ev.preventDefault();
        toolmanager.mouseDown(ev, me);
    };
    var mouseReleased = function(ev) {
        ev.preventDefault();
        toolmanager.mouseReleased(ev);
    };
    var image = new ToolBtn(canvas, OC, mouseDown, mouseReleased);

    this.getConstructor = function() {
        return OC;
    };
    this.getX = function() {
        return X;
    };
    this.getY = function() {
        return Y;
    };
    this.getW = function() {
        return WIDTH;
    };
    this.getH = function() {
        return HEIGHT;
    };


    this.init = function(_x, _y, _size) {
        X = _x;
        Y = _y;
        WIDTH = _size;
        HEIGHT = _size;
        image.init(X, Y, WIDTH, HEIGHT);
    };

    this.hide = function() {
        image.hide();
    };

    this.close = function() {
        image.close();
        //        image=new ToolBtn(canvas,OC.getCode(),mouseDown,mouseReleased);
    };

};
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TextManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var txts = [];
    // var firstLoad = true;
    var textPanel = null;


    me.compute = function() {
        for (var i = 0, len = txts.length; i < len; i++) {
            txts[i].compute();
        }
    };

    me.refreshInputs = function() {
        for (var i = 0, len = txts.length; i < len; i++) {
            txts[i].refreshInputs();
        }
    };

    me.evaluateStrings = function(forceEvaluate) {
        for (var i = 0, len = txts.length; i < len; i++) {
            txts[i].evaluateString();
        }
    };

    me.executeScript = function(_t, _i) {
        if (_t > -1) {
            canvas.undoManager.beginAdd();
            txts[_t].exec(_i);
            canvas.undoManager.endAdd();
        }
    }

    me.getPosition = function(_t) {
        for (var i = 0, len = txts.length; i < len; i++) {
            if (txts[i] === _t)
                return i;
        }
        return txts.length;
    };

    // var loadKaTeX = function() {
    //     var parent = document.getElementsByTagName("head")[0];
    //     var lnk = document.createElement("link");
    //     lnk.rel = "stylesheet";
    //     lnk.href = $APP_PATH + "NotPacked/thirdParty/katex.min.css";
    //     //        lnk.href = "http://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.css";
    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = $APP_PATH + "NotPacked/thirdParty/katex.min.js";
    //     //        script.src = "http://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min.js";
    //     script.onload = function() {
    //         me.evaluateStrings();
    //         //            script.id = "MathJax";
    //     }
    //     parent.appendChild(lnk);
    //     parent.appendChild(script);
    // }

    me.edit = function(mytxt) {
        for (var k = 0; k < txts.length; k++) {
            txts[k].noedit();
        };
        if (mytxt) {
            mytxt.doedit();
            if (textPanel)
                textPanel.edit(mytxt);
        }
    }

    me.deleteTeX = function(_tex) {
        for (var k = 0; k < txts.length; k++) {
            if (txts[k] === _tex) {
                txts.splice(k, 1);
                _tex.close();
                return
            }
        }
    };







    me.addName = function(_n) {
        if (textPanel)
            textPanel.addName(_n);
    };

    me.addTeXElement = function(_m, _l, _t, _w, _h, _stl) {
        $U.katexLoaded(me.evaluateStrings);
        // if (firstLoad) {
        //     loadKaTeX();
        //     firstLoad = false;
        // }
        var txt = new TextObject(canvas, _m, _l, _t, _w, _h);
        if (_stl !== undefined) {
            txt.setStyles(_stl);
        }
        txts.push(txt);
        txt.evaluateString();
        return txt;
    };

    // Pour le undoManager :
    me.add = function(_tex) {
        var b = _tex.getBounds();
        return me.addTeXElement(_tex.getRawText(), b.left, b.top, b.width, b.height, _tex.getStyles());
    };

    // Uniquement pour l'ajout de textes en manuel :
    me.addText = function(_m, _l, _t, _w, _h, _stl) {
        canvas.undoManager.beginAdd();
        me.addTeXElement(_m, _l, _t, _w, _h, _stl).edit();
        canvas.undoManager.endAdd();
    };

    me.elements = function() {
        return txts;
    };


    me.getSource = function() {
        var t = "";
        for (var i = 0, len = txts.length; i < len; i++) {
            var b = txts[i].getBounds();
            var TX = txts[i].getText();
            TX = TX.replace(/\"/g, "\\\"");
            TX = $U.native2ascii(TX.split("\n").join("\\n"));

            t += "Text(\"" + TX + "\"," + b.left + "," + b.top + "," + b.width + "," + b.height;
            t += (txts[i].getStyles()) ? ",\"" + txts[i].getStyles() + "\"" : "";
            t += ");\n";
        }
        if (t !== "") {
            t = "\n\n// Texts :\n" + t;
        }
        return t;
    };

    me.clear = function() {
        for (var i = 0, len = txts.length; i < len; i++) {
            if (txts[i].getDocObject().parentNode !== null) {
                txts[i].getDocObject().parentNode.removeChild(txts[i].getDocObject());
            }
        }
        txts = [];
    }

    me.showPanel = function() {
        if (!textPanel) {
            textPanel = new TextPanel(canvas);
        }
    };

    me.hidePanel = function() {
        if (textPanel) {
            me.edit(null);
            textPanel.close();
            textPanel = null;
        }
    };


}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TextObject(_canvas, _m, _l, _t, _w, _h) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var Cn = _canvas.getConstruction();
    me.setAttr("className", "textPanel");
    me.transition("scale", 0.2);

    var txt = _m;
    var EXPs = [];
    var SCPs = [];
    var bgcolor = new Color();
    var borderSize = 3;
    var borderRadius = 5;
    var numPrec = 1e4;
    var closebox = null;
    var jsbox = null,
        txbox = null,
        exbox = null;
    var printPanel = null;

    me.parseExpressions = function() {
        EXPs = [];
        SCPs = [];
        var t = txt.split("%");
        for (var i = 1, len = t.length; i < len; i += 2) {
            EXPs.push(_canvas.getExpression(t[i]));
        }
        t = txt.split("§");
        for (var i = 1, len = t.length; i < len; i += 2) {
            t[i] = t[i].replace(/^[^\n]*name\s*=\s*\"([^\"]*)\"/, "");
            t[i] = t[i].replace(/^[^\n]*style\s*=\s*\"([^\"]*)\"/, "");
            SCPs.push({
                src: t[i]
            });
        }
    };
    me.parseExpressions();

    var styles = null;

    me.exec = function(_i) {
        var src = SCPs[_i].src;
        var t = src.split("%");
        for (var i = 1, len = t.length; i < len; i += 2) {
            var exp = _canvas.getExpression(t[i]);
            //            exp.compute();
            t[i] = "" + $U.parseArrayEnglish(exp.value(), numPrec, true);
        }
        _canvas.InterpretScript(me, t.join(""));
    };

    var closePrint = function() {
        if (printPanel)
            printPanel.close();
        printPanel = null;
    };

    me.print = function(_m) {
        if (!printPanel)
            printPanel = new PrintPanel(_canvas, closePrint);
        printPanel.setText(_m);
    };

    me.refreshInputs = function() {
        // convert HTMLCollection to Array :
        var inps = [].slice.call(container.getDocObject().getElementsByTagName('input'));
        var sels = container.getDocObject().getElementsByTagName('select');
        for (var n = 0; n < sels.length; n++) {
            inps.push(sels[n]);
        }
        var tas = container.getDocObject().getElementsByTagName('textarea');
        for (var n = 0; n < tas.length; n++) {
            inps.push(tas[n]);
        }
        for (var n = 0; n < inps.length; n++) {
            inps[n].ontouchstart = inps[n].onmousedown = function(ev) {
                ev.stopPropagation();
            };
            if (inps[n].hasAttribute("editable")) {
                var o = Cn.find(inps[n].getAttribute("editable"));
                inps[n].readOnly = (o.getExp() === "0");
            };
            if ((inps[n].hasAttribute("populate")) && (inps[n].type === "select-one")) {
                var o = Cn.find(inps[n].getAttribute("populate"));
                var tab = JSON.parse(o.getExp().replace(/'/g,"\""));
                inps[n].innerHTML = "";
                for (var i = 0; i < tab.length; i++) {
                    var elt = tab[i];
                    if (!$U.isArray(elt)) elt = [tab[i], tab[i]];
                    var opt = document.createElement('option');
                    opt.value = elt[0];
                    opt.innerHTML = elt[1];
                    inps[n].appendChild(opt);
                }
            };
            if (inps[n].hasAttribute("target")) {
                var o = inps[n].targetObject = Cn.find(inps[n].getAttribute("target"));
                if (o) {
                    var evtpe = "oninput";
                    switch (inps[n].type) {
                        case "select-one":
                            evtpe = "onchange";
                            var ex = o.getExp();
                            if (ex === "NaN") ex = "";
                            inps[n].value = ex;
                            break;
                        case "checkbox":
                            evtpe = "onchange";
                            inps[n].checked = o.getValue();
                            break;
                        case "button":
                            evtpe = "onmouseup";
                            break;
                        default:
                            var ex = o.getExp();
                            if (ex === "NaN") ex = "";
                            inps[n].value = ex;
                    }



                    inps[n][evtpe] = function(ev) {
                        var obj = ev.target.targetObject;
                        if (obj) {
                            var val = ev.target.value;
                            switch (ev.target.type) {
                                case "checkbox":
                                    val = ev.target.checked;
                                    break;
                                case "button":
                                    val = !obj.getValue();
                                    break;
                            }
                            obj.setExp(val);
                            obj.compute();
                            obj.computeChilds();
                            _canvas.paint();
                        }
                    }
                }
            }
        }
    };

    var setHTML = function(_t) {
        // On enlève tous les scripts injectés précédemment dans
        // ce widget :
        var scps = me.getDocObject().getElementsByTagName('script');
        for (var n = 0; n < scps.length; n++) {
            scps[n].parentNode.removeChild(scps[n]);
        }

        var tab = _t.split("§");
        for (var i = 1, len = tab.length; i < len; i += 2) {
            var k = (i - 1) / 2;
            var match = tab[i].match(/^[^\n]*name\s*=\s*\"([^\"]*)\"/);
            var nm = " value=\"" + ((match) ? match[1] : "RUN") + "\" ";
            match = tab[i].match(/^[^\n]*style\s*=\s*\"([^\"]*)\"/);
            var st = " style=\"-webkit-appearance: button;" + ((match) ? match[1] : "") + "\" ";
            match = tab[i].match(/^[^\n]*id\s*=\s*\"([^\"]*)\"/);
            var id = (match) ? " id=\"" + match[1] + "\"" : "";
            tab[i] = "<input type=\"button\"  ontouchend=\"$CANVAS.textManager.executeScript(" + _canvas.textManager.getPosition(me) + "," + k + ");this.blur()\" onmouseup=\"$CANVAS.textManager.executeScript(" + _canvas.textManager.getPosition(me) + "," + k + ");this.blur()\" " + nm + st + id + ">";
        }
        _t = tab.join("");

        // Le tag pre est là pour conserver les espaces multiples 
        // et les retours à la ligne :
        container.setAttr("innerHTML", "<pre class=\"TeXDisplay\">" + _t + "</pre>");

        // Interprétation des balises scripts éventuellement injectées dans 
        // le source (le innerHTML ne suffit pas) :
        scps = container.getDocObject().getElementsByTagName('script');
        for (var n = 0; n < scps.length; n++) {
            var scp = document.createElement('script');
            scp.src = scps[n].src;
            scp.type = scps[n].type;
            scp.appendChild(document.createTextNode(scps[n].innerHTML));
            me.getDocObject().insertBefore(scp, container.getDocObject());
        }

        me.refreshInputs();
    };


    var container = new GUIElement(_canvas, "div");
    me.addContent(container);
    container.setAbsolute();
    container.setStyle("cursor", "move");
    setHTML(txt);


    var editBox = new GUIElement(_canvas, "textarea");
    editBox.setStyles("position:absolute;font-family:'Lucida Console';font-size:13px;line-height:20px");
    var el = editBox.getDocObject();
    el.autocorrect = el.autocomplete = el.autocapitalize = el.spellcheck = false;
    // editBox.setAttr("autocomplete","off");
    // editBox.setAttr("autocorrect","off");
    // editBox.setAttr("autocapitalize","off");
    // editBox.setAttr("spellcheck",false);

    var endInput = function() {
        txt = editBox.getDocObject().value;
        me.parseExpressions();
        setHTML(txt);
        _canvas.getConstruction().computeAll();
        me.evaluateString();
    };

    editBox.getDocObject().oninput = function(ev) {
        endInput();
    };
    editBox.setStyle("width", (_w - 33) + "px");
    editBox.setStyle("height", (114) + "px");


    var deleteTeX = function() {
        _canvas.undoManager.swap(me);
        _canvas.textManager.deleteTeX(me);
    };

    var insertJS = function() {
        var js = "§ name=\"" + $L.props_text_js + "\" style=\"font-size:24px;color:blue\"\n";
        js += "for (var i=0;i<100;i++){\n";
        js += "\tA=Point(Math.random()*16-8,Math.random()*16-8)\n";
        js += "}\n"
        js += "§";
        me.addName(js);
    };
    var insertTeX = function() {
        var tx = "$\\frac{6+1}{3}\\approx2.3$";
        me.addName(tx);
    };
    var insertEXP = function() {
        var ex = "%5*2^2+9%";
        me.addName(ex);
    };

    me.noedit = function() {
        me.removeContent(editBox);
        me.removeContent(closebox);
        me.removeContent(jsbox);
        me.removeContent(txbox);
        me.removeContent(exbox);
        me.setStyle("z-index", 0);
    }

    var moveStyles = function() {
        editBox.setStyle("left", (35) + "px");
        editBox.setStyle("top", (_h + 4) + "px");
        //        editBox.setStyle("width", (_w - 33) + "px");
        //        editBox.setStyle("height", (114) + "px");
        if (jsbox) {
            jsbox.setStyle("left", (0) + "px");
            jsbox.setStyle("top", (_h + 4) + "px");
            txbox.setStyle("left", (0) + "px");
            txbox.setStyle("top", (_h + 44) + "px");
            exbox.setStyle("left", (0) + "px");
            exbox.setStyle("top", (_h + 84) + "px");
        }

    }

    me.setEditFocus = function() {
        setTimeout(function() {
            editBox.getDocObject().focus();
            editBox.getDocObject().setSelectionRange(0, 9999);
        }, 100);
    };

    me.doedit = function() {
        if ((!me.hasContent(editBox)) && (_canvas.getMode() === 10)) {

            me.setStyle("z-index", 3);
            editBox.setAttr("innerHTML", txt);
            me.addContent(editBox);
            closebox = new CloseBox(me, deleteTeX);
            jsbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/js.svg", 30, 30, insertJS);

            txbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/tex.svg", 30, 30, insertTeX);

            exbox = new ImageBox(me, $APP_PATH + "NotPacked/images/tex/exp.svg", 30, 30, insertEXP);

            moveStyles();
        }
    };

    me.edit = function() {
        _canvas.textManager.edit(me);
    };


    //    container.addClickEvent(me.edit);




    var growbox = new GUIElement(_canvas, "div");
    growbox.setAbsolute();
    growbox.setStyles("width:30px;height:30px;right:0px;bottom:0px;cursor:se-resize");
    me.addContent(growbox);

    var xx = 0,
        yy = 0;

    var dragmove = function(ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function(ev) {
        //        me.removeContent(editBox);
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    container.addDownEvent(dragdown);
    //    container.getDocObject().addEventListener('touchstart', dragdown, false);
    //    container.getDocObject().addEventListener('mousedown', dragdown, false);
    container.getDocObject().addEventListener('touchstart', me.edit, false);
    container.getDocObject().addEventListener('click', me.edit, false);

    var sizemove = function(ev) {
        _w += (ev.pageX - xx);
        _h += (ev.pageY - yy);
        me.setStyle("width", _w + "px");
        me.setStyle("height", _h + "px");
        container.setStyle("width", (_w - 20) + "px");
        container.setStyle("height", (_h - 20) + "px");
        xx = ev.pageX;
        yy = ev.pageY;
        moveStyles();
        if (closebox)
            closebox.setStyle("left", (_w - 15) + "px");
    }

    var sizedown = function(ev) {
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', sizemove, false);
        window.addEventListener('touchend', sizeup, false);
        window.addEventListener('mousemove', sizemove, false);
        window.addEventListener('mouseup', sizeup, false);
    }

    var sizeup = function(ev) {
        window.removeEventListener('touchmove', sizemove, false);
        window.removeEventListener('touchend', sizeup, false);
        window.removeEventListener('mousemove', sizemove, false);
        window.removeEventListener('mouseup', sizeup, false);
    }

    growbox.addDownEvent(sizedown);
    _canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.applyTransitionIN();

    me.compute = function() {
        for (var i = 0; i < EXPs.length; i++) {
            EXPs[i].compute();
        }
    };


    me.evaluateString = function() {

        var t = txt.split("%");
        var changed = (t.length > 1);
        for (var i = 1, len = t.length; i < len; i += 2) {
            try {
                var k = (i - 1) / 2;
                EXPs[k].compute();
                t[i] = $U.parseArray(EXPs[k].value(), numPrec);
            } catch (e) {}
        }
        t = t.join("").split("$");
        changed = changed || (t.length > 1);
        for (var i = 1, len = t.length; i < len; i += 2) {
            try {
                t[i] = katex.renderToString(t[i]);
            } catch (e) {}
        }
        if (changed)
            setHTML(t.join(""));
    };


    me.getBounds = function() {
        return {
            "left": _l,
            "top": _t,
            "width": _w,
            "height": _h
        };
    };

    me.getColor = function() {
        return (bgcolor.getHEX());
    };
    me.setColor = function(val) {
        var op = bgcolor.getOpacity();
        bgcolor.set(val);
        bgcolor.setOpacity(op);
        me.setStyle("background-color", bgcolor.getRGBA());
        me.setStyle("border-color", bgcolor.getRGBA());
    };
    me.getOpacity = function() {
        return (bgcolor.getOpacity());
    };
    me.setOpacity = function(val) {
        bgcolor.setOpacity(val);
        me.setStyle("background-color", bgcolor.getRGBA());
        me.setStyle("border-color", bgcolor.getRGBA());
    };
    me.getBorderSize = function() {
        return borderSize;
    };
    me.setBorderSize = function(val) {
        borderSize = val;
        me.setStyle("border-width", borderSize + "px");
    };
    me.getBorderRadius = function() {
        return borderRadius;
    };
    me.setBorderRadius = function(val) {
        borderRadius = val;
        me.setStyle("border-radius", borderRadius + "px");
    };
    me.setNumPrec = function(val) {
        numPrec = Math.pow(10, val);
        me.evaluateString();
    };
    me.getNumPrec = function() {
        return Math.round(Math.log(numPrec) / Math.LN10);
    };
    me.addName = function(_n) {
        if (me.hasContent(editBox)) {
            $U.addTextToInput(editBox.getDocObject(), _n, "add");
            endInput();
        }
    };

    me.setStyles = function(_s) {
        styles = _s;
        _s = _s.split(";");
        for (var i = 0, len = _s.length; i < len; i++) {
            var e = _s[i].split(":");
            switch (e[0]) {
                case "c": // Color
                    bgcolor.set(e[1]);
                    me.setStyle("background-color", bgcolor.getRGBA());
                    me.setStyle("border-color", bgcolor.getRGBA());
                    break;
                case "s": // Border size
                    borderSize = parseFloat(e[1]);
                    me.setStyle("border-width", borderSize + "px");
                    break;
                case "r": //Border radius
                    borderRadius = parseInt(e[1]);
                    me.setStyle("border-radius", borderRadius + "px");
                    break;
                case "p": //Number precision
                    numPrec = Math.pow(10, parseInt(e[1]));
                    break;
            }
        }
    };



    me.getStyles = function() {
        var stls = "c:" + bgcolor.getRGBA();
        stls += ";s:" + borderSize;
        stls += ";r:" + borderRadius;
        stls += ";p:" + Math.round(Math.log(numPrec) / Math.LN10);
        return stls;
    };


    me.setText = function(_t) {
        txt = _t;
        //        container.setAttr("innerHTML", _t);
        //        console.log("set text !");
    };

    me.getRawText = function() {
        return txt;
    }

    me.getText = function() {
        var s = txt;
        if (txt.split("$").length > 1) {
            s = s.replace(/\\/g, "\\\\");
        }
        return s;
    }

    me.init = function() {
        me.setBounds(_l, _t, _w, _h);
        container.setBounds(10, 10, _w - 20, _h - 20);

    };

    me.init();

}
function TextPanel(_canvas) {
    var me = this;
    var canvas = _canvas;
    $U.extend(this, new VerticalBorderPanel(canvas, 240, false));
    me.setBounds(me.getBounds().left + 15, -5, 0, 0); // Le fond n'est pas affiché
    me.show();

    var props = new props_textPanel(canvas, me);
    // Une ineptie necessaire parce que sinon le clavier virtuel
    // de l'ipad change la position du panneau de propriété :
    if (Object.touchpad) {
        window.scrollTo(0, 0);
    }

    props.show();

    me.addTeXObject = function() {
        var r = Math.round(Math.random() * 128);
        var g = Math.round(Math.random() * 128);
        var b = Math.round(Math.random() * 128);
        var op = Math.round((0.1 + Math.random() / 3) * 100) / 100;
        //        var stl = "c:rgba(" + r + "," + g + "," + b + "," + op + ")";
        //        console.log(stl);
        var stl = "c:" + props.getRGBAColor();
        //        stl += ";s:6";
        //        stl += ";r:50";
        stl += ";s:" + props.getBorderSize();
        stl += ";r:" + props.getBorderRadius();
        stl += ";p:" + props.getPrecision();
        canvas.textManager.addText($L.props_text_example, 70, 10, 500, 65, stl);
    };

    me.edit = function(myObj) {
        props.edit(myObj)
    };

    me.addName = function(_n) {
        props.addName(_n);
    };

}


function props_textPanel(_canvas, _owner) {
    var me = this;
    $U.extend(this, new Panel(_owner.getDocObject()));
    var currentObj = null;
    me.setAttr("className", "props_TeX_DIV");
    me.transition("translate_x", 0.2, 200);

    var ch = 10;
    var sh = 35;
    var t1 = new Label(me);
    t1.setText($L.props_text_message);
    t1.setStyles("color:#252525;font-style: italic");
    t1.setBounds(10, ch, 200, 20);
    me.addContent(t1);
    ch += 50;

    me.addName = function(_n) {
        if (currentObj)
            currentObj.addName(_n);
    };
    me.edit = function(myObj) {
        var n = myObj && (currentObj !== myObj);
        currentObj = myObj;
        cp.setHEX(myObj.getColor());
        op.setValue(myObj.getOpacity());
        sz.setValue(myObj.getBorderSize());
        rd.setValue(myObj.getBorderRadius());
        pr.setValue(myObj.getNumPrec());
        if (n)
            myObj.setEditFocus();

    };


    var COLORcallback = function(val) {
        if (currentObj)
            currentObj.setColor(val);
    };

    var OPcallback = function(val) {
        if (currentObj)
            currentObj.setOpacity(val);
    };

    var SZcallback = function(val) {
        if (currentObj)
            currentObj.setBorderSize(val);
    };

    var RDcallback = function(val) {
        if (currentObj)
            currentObj.setBorderRadius(val);
    };

    var PRcallback = function(val) {
        if (currentObj)
            currentObj.setNumPrec(val);
    };

    var addBtnCallBack = function() {
        _owner.addTeXObject();
    };

    me.getRGBAColor = function() {
        var col = new Color();
        col.set(cp.getHEX());
        col.setOpacity(op.getValue());
        return col.getRGBA();
    };
    me.getBorderSize = function() {
        return (sz.getValue());
    };
    me.getBorderRadius = function() {
        return (rd.getValue());
    };
    me.getPrecision = function() {
        return (pr.getValue());
    };

    var setSlider = function(_sl, _t, _p) {
        _sl.setValueWidth(40);
        _sl.setTextColor("#252525");
        _sl.setBackgroundColor("rgba(0,0,0,0)");
        _sl.setLabel(_t, 80);
        _sl.setValuePrecision(_p);
    }

    var cp = new ColorPicker(me.getDocObject(), 10, ch, 200, 200);
    cp.setHEXcallback(COLORcallback);
    var cl = new Color();
    cl.set("rgba(59,79,115,0.18)");
    cp.setRGB(cl.getR(), cl.getG(), cl.getB());
    ch += 210;

    var op = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 1, cl.getOpacity(), OPcallback);
    setSlider(op, $L.props_text_opacity, 0.01);
    ch += sh;

    var sz = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 30, 3, SZcallback);
    setSlider(sz, $L.props_text_size, 0.5);
    ch += sh;

    var rd = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 200, 15, RDcallback);
    setSlider(rd, $L.props_text_radius, 0.5);
    ch += sh;

    var pr = new slider(me.getDocObject(), 10, ch, 200, sh, 0, 13, 4, PRcallback);
    setSlider(pr, $L.props_text_precision, 1);
    ch += sh;


    ch += 10;
    var add = new Button(me);
    add.setBounds(10, ch, 200, 25);
    add.setText($L.props_text_add);
    add.setCallBack(addBtnCallBack);
    me.addContent(add);
}
function PrintPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var www = 450;
    var hhh = 300;

    $U.extend(this, new CenterPanel(canvas, www, hhh));
    var lbl = new Label(me);
    //    lbl.setStyles("font-size:18px;color:black");
    lbl.setText("<p style='line-height:100%'><span style='font-size:18px;color:black'>" + $L.props_text_console + "</span></p>");
    lbl.setBounds(0, 0, www, 40);
    me.addContent(lbl);

    var editBox = new GUIElement(_canvas, "textarea");
    editBox.setStyles("position:absolute;-webkit-box-sizing: border-box;box-sizing: border-box;-moz-box-sizing: border-box;font-family:'Lucida Console';resize:none;font-size:18px;line-height:20px");
    editBox.setStyle("max-width", (www - 20) + "px");
    editBox.setStyle("min-width", (www - 20) + "px");
    editBox.setBounds(10, 40, (www - 20), (hhh - 50));
    me.addContent(editBox);

    me.setStyle("cursor", "move");

    var close = function() {
        _closeProc();
    };

    me.show();

    new CloseBox(me, close);

    me.setText = function(_m) {
        editBox.getDocObject().value += _m;
        editBox.getDocObject().scrollTop = editBox.getDocObject().scrollHeight;
    };

    var xx = 0,
        yy = 0,
        _l = me.getBounds().left,
        _t = me.getBounds().top;

    var dragmove = function(ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function(ev) {
        //        me.removeContent(editBox);
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    //    container.addDownEvent(dragdown);
    me.getDocObject().addEventListener('touchstart', dragdown, false);
    me.getDocObject().addEventListener('mousedown', dragdown, false);

}
function CoincidenceManager(_canvas) {
    var canvas = _canvas;
    var me = this;
    var panel = null;
    var event = null;


    var priority = function(_o) {
        switch (_o.getFamilyCode()) {
            case "point":
                return 0;
                break;
            case "line":
                return 1;
                break;
            case "circle":
                return 2;
                break;
            case "locus":
                return 3;
                break;
            case "angle":
                return 4;
                break;
            case "area":
                return 5;
                break;
        }
        return 10;
    }

    var sortFilter = function(_a, _b) {
        return (_a.Scratch - _b.Scratch);
    }




    me.checkCoincidences = function(ev) {
        // On récupère dans un tableau tous les objets situés
        // sous le clic de souris ou le tap :
        var t = canvas.getConstruction().getObjectsUnderMouse(ev);
        if (t.length < 2) return false;

        // On va trier le tableau par famille d'objets :
        var len = t.length;
        for (var i = 0; i < len; i++) {
            t[i].Scratch = priority(t[i]);
        }
        t.sort(sortFilter);
        var i = 1;
        while ((i < len) && (t[i].Scratch === t[0].Scratch))
            i++;

        // On ne va garder dans ce tableau que les objets d'une même
        // famille (selon la priorité définie dans priority) :
        t = t.slice(0, i);
        if (t.length < 2) return false;

        // Il faut ensuite que les objets soient confondus :
        if (canvas.getConstruction().isMode(1)) {
            for (var i = 1, len = t.length; i < t.length; i++) {
                if (!t[0].isCoincident(t[i])) return false;
            }
        }


        // Si on arrive jusqu'ici, c'est qu'il y a ambiguité :

        for (var i = 0; i < t.length; i++) {
            t[i] = [t[i].getName() + ": " + $L.object[t[i].getCode()], t[i]];
            if (t[i][1].isHidden()) t[i].push("#777");
            else t[i].push(t[i][1].getColor().getHEX());
        }
        event = ev;
        panel = new BubblePanel(canvas, me.exec, me.close, ev, t, $L.coincidence_message + " : " + $L.coincidence_select.replace("$1", t.length), 270, 190, 50);

        // var cp = new CoincidencePanel(canvas, ev, t);


        //        for (var i = 0, len = t.length; i < t.length; i++) {
        //            console.log(t[i].getName() + " " + t[i].Scratch);
        //        }
        return true;
        //        console.log(t);
    }

    me.isVisible = function() {
        return (panel && panel.isVisible());
    };

    me.close = function() {
        panel = null;
    }

    me.exec = function(_o) {
        var cn = canvas.getConstruction();
        cn.clearIndicated();
        cn.clearSelected();
        cn.addSelected(_o);
        canvas.paint(event);
        canvas.initTools(event, _o);
    }


}
function LongpressManager(_canvas) {
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var me = this;
    var panel = null;
    var x = 0;
    var y = 0;

    var newExp = function(_ex) {
        var OBJ = new ExpressionObject(Cn, "_a", "", "", "", _ex, x, y);
        if (canvas.namesManager.isVisible())
            canvas.namesManager.setName(OBJ);
        else
            OBJ.setName(getName("abcdefghijklmnopqrsuvw"));
        OBJ.setT("");
        var r = Math.random() * 128;
        var g = Math.random() * 128;
        var b = Math.random() * 128;
        OBJ.setRGBColor(r, g, b);
        canvas.addObject(OBJ);
        return OBJ;
    };

    var newList = function(_ex) {
        var OBJ = new ListObject(Cn, "_l", _ex);
        OBJ.setSegmentsSize(0);
        var c = _ex.getColor();
        OBJ.setRGBColor(c.getR(), c.getG(), c.getB());
        canvas.addObject(OBJ);
        return OBJ;
    };

    var getList = function() {
        var cx = Cn.coordsSystem.x(Cn.getWidth() / 2);
        var cy = Cn.coordsSystem.y(Cn.getHeight() / 2);
        var l = Cn.coordsSystem.l(Cn.getHeight()) / 4;
        var L = l * (1 + Math.sqrt(5)) / 2;
        // var str="["+(cx-L/2)+","+(cy-l/2)+"]";
        var t = [
            [cx - L / 2, cy - l / 2],
            [cx + L / 2, cy - l / 2],
            [cx + L / 2, cy + l / 2],
            [cx - L / 2, cy + l / 2],
            [cx - L / 2, cy - l / 2]
        ];
        for (var i = 0; i < t.length; i++) {
            t[i] = "[" + t[i].toString() + "]";
        };
        return "[" + t.toString() + "]";
    };

    var createExp = function() {
        newExp("(1+sqrt(5))/2");
        Cn.compute();
        canvas.paint();
    };

    var createExpPts = function() {
        newList(newExp(getList()));
        Cn.compute();
        canvas.paint();
    };

    var createExpSegs = function() {
        var OBJ = newList(newExp(getList()));
        OBJ.setSegmentsSize(1);
        Cn.compute();
        canvas.paint();
    };

    var getName = function(_t) {
        var t = _t.match(/.{1,1}/g);
        for (var i = 0; i < t.length; i++) {
            if (!Cn.find(t[i])) return t[i];
        }
        return t[0];
    }

    var createIntCursor = function() {
        var OBJ = newExp("");
        if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
        OBJ.setMin("0");
        OBJ.setMax("10");
        OBJ.setIncrement(1);
        Cn.compute();
        canvas.paint();
    };

    var createContCursor = function() {
        var OBJ = newExp("0");
        if (!canvas.namesManager.isVisible()) OBJ.setName(getName("nmkabcuvwrst"));
        OBJ.setMin("-10");
        OBJ.setMax("10");
        Cn.compute();
        canvas.paint();
    };

    var createEditWidget = function() {
        canvas.addText($L.edit_widget_name + " : <input id=\"exp_name\" interactiveinput=\"replace\">\n\n\u00a7  name=\"" + $L.edit_widget_edit + "\" style=\"font-size:18px;padding: 5px 10px;background: #4479BA;color: #FFF;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;border: solid 1px #20538D;text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);\"\nvar exp_n=Find(\"exp_name\");\nvar exp_e=Find(\"exp_edit\");\nexp_e.setAttribute(\"target\",exp_n.value);\nRefreshInputs();\n\n\u00a7\n\n<textarea id=\"exp_edit\" target=\"aa\" style=\"width:500px;height:400px\"></textarea>\n", x, y, 550, 530, "c:rgba(59,79,115,0.18);s:3;r:15;p:4");
    };

    var createBlocklyButton = function() {
        $U.prompt($L.create_blockly_program_change_message, $L.create_blockly_program_name, "text", function(_old, _new) {
            if (_new === "") _new = _old;
            var OBJ = new BlocklyButtonObject(Cn, "blk_btn", _new, x, y);
            OBJ.setOpacity(canvas.prefs.opacity.blockly_button);
            canvas.addObject(OBJ);
            Cn.compute();
            canvas.paint();
            canvas.blocklyManager.edit(OBJ);
        }, 450, 165, 430);
    };


    var tab = [
        [$L.create_blockly_button, createBlocklyButton],
        [$L.create_exp, createExp],
        [$L.create_exp_pts, createExpPts],
        [$L.create_exp_segs, createExpSegs],
        [$L.create_cursor_int, createIntCursor],
        [$L.create_cursor_cont, createContCursor],
        [$L.create_widget_edit, createEditWidget]
    ];

    var close = function() {
        panel = null;
    };

    var exec = function(_proc) {
        _proc();
    };

    me.isVisible = function() {
        return (panel && panel.isVisible());
    };

    me.show = function(ev) {
        x = canvas.mouseX(ev);
        y = canvas.mouseY(ev);
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;
        panel = new BubblePanel(canvas, exec, close, ev, tab, $L.longpress_message, 270, 240, 30);
    };




}
function EraserManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var panel = null;

    me.filters = {
        "global": true
    };


    me.refreshDisplay = function() {
        var t = canvas.getConstruction().elements();
        var m = me.filters.global ? 2 : 1;
        for (var i = 0, len = t.length; i < len; i++) {
            t[i].setMode(m);
        }
        canvas.paint();
    }


    // On a cliqué sur l'icône Gomme :
    me.showPanel = function() {
        if (!panel) {
            panel = new EraserPanel(canvas, me);
            panel.show();
            setTimeout(function() {
                me.refreshDisplay();
            }, 1);
        }
    };

    me.hidePanel = function() {
        if (panel) {
            panel.close();
            panel = null;
        }
    };

}
function EraserPanel(_canvas, _man) {
    var me = this;
    $U.extend(this, new Panel(_canvas));
    var canvas = _canvas;
    var man = _man;
    me.setAttr("className", "erase_messageDIV");
    me.transition("scale", 0.2);

    this.show = function() {
        canvas.getDocObject().parentNode.appendChild(me.getDocObject());
        me.applyTransitionIN();
    };

    this.close = function() {
        me.applyTransitionOUT();
        setTimeout(function() {
            canvas.getDocObject().parentNode.removeChild(me.getDocObject());
        }, 300);
    };

    var ShowHiddensCallback = function(val) {
        man.filters.global = val;
        man.refreshDisplay();
    }

    var cbApplyAll = new Checkbox(me.getDocObject(), 0, 0, 250, 35, man.filters.global, $L.erase_ckb_show_hidden, ShowHiddensCallback);
    cbApplyAll.setTextColor("#252525");

}
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
        };
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
            default:
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
    S.setTabValues([
        [0, $L.magnet_without], 1, 2, 5, 10, 15, 20, 30, 50, 100, 200, 500, 1000, [5000, $L.magnet_max]
    ]);
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
function TrackManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var tracks = [];
    var docObject = document.createElement("canvas");
    canvas.getDocObject().parentNode.insertBefore(docObject, canvas.getDocObject().nextSibling);

    $U.STL(docObject, "position: absolute;top:0px;left:0px;pointer-events:none;background-color:rgba(0,0,0,0)");
    $U.ATT(docObject, "width:" + canvas.getWidth() + ";height:" + canvas.getHeight());


    var ctx = docObject.getContext("2d");
    ctx.globalAlpha = 1;


    me.getDocObject = function() {
        return docObject;
    }

    me.add = function(_o, forced) {
        if ((!forced) && (_o.isHidden())) return;
        for (var i = 0, len = tracks.length; i < len; i++) {
            if (tracks[i] === _o) return;
        }
        _o.startTrack();
        tracks.push(_o);
    }
    me.remove = function(_o) {
        docObject.width = docObject.width;
        for (var i = 0, len = tracks.length; i < len; i++) {
            if (tracks[i] === _o) {
                tracks[i].clearTrack();
                tracks.splice(i, 1);
                return;
            }
        }
    }
    me.resize = function() {
        $U.ATT(docObject, "width:" + canvas.getWidth() + ";height:" + canvas.getHeight());
    }
    me.clear = function() {
        ctx.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
    }

    me.draw = function() {
        for (var i = 0, len = tracks.length; i < len; i++) {
            tracks[i].drawTrack(ctx);
        }
    }

    me.setAllTrack = function(_tpe, _val) {
        var v = canvas.getConstruction().elements();
        var proc = (_val) ? me.add : me.remove;
        for (var i = 0, len = v.length; i < len; i++) {
            if (v[i].getFamilyCode() === _tpe) proc(v[i]);
        }
    }

}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function SourceWriter(_Cn) {
    var me = this;
    var Cn = _Cn;
    var geom = "";
    var style = "";
    var block = "";

    var vars = {};
    var names = {};

    //    var getvarname = function(s) {
    //        var v = $U.leaveAccents(s);
    //        if (vars.hasOwnProperty(v)) {
    //            var b = 1;
    //            while (vars.hasOwnProperty(v + b)) {
    //                b++
    //            }
    //            v = v + b;
    //        }
    //        ;
    //        vars[v] = s;
    //        names[s] = v;
    //        return v;
    //    };
    //
    //me.getVar=function(_n){
    //    return getvarname(_n);
    //};

    me.getGeom = function() {
        // Remplacement du caractère spécial π :
        return geom.replace(/\u03C0/g, "\\u" + "03C0");;
    };
    me.getStyle = function() {
        return style;
    };
    me.getBlock = function() {
        return block;
    };

    //    me.geomWrite = function(_withquotes, _name, _code) {
    //        var params = [];
    //        var v = getvarname(_name);
    //        for (var i = 3; i < arguments.length; i++) {
    //            var p = (names.hasOwnProperty(arguments[i])) ? names[arguments[i]] : arguments[i];
    //            var myarg = _withquotes ? "\"" + p + "\"" : p;
    //            params.push(myarg);
    //        }
    //        if (params.length === 0) {
    //            geom += v + "=" + _code + "(\"" + _name + "\");\n";
    //        } else {
    //            var args = params.join(",");
    //            geom += v + "=" + _code + "(\"" + _name + "\"," + args + ");\n";
    //        }
    //    };

    me.geomWrite = function(_withquotes, _name, _code) {
        var params = [];
        for (var i = 3; i < arguments.length; i++) {
            //            console.log("arguments[i]="+arguments[i]);
            //            var a = Cn.isVarName(arguments[i]) ?  arguments[i] : Cn.getVarName(arguments[i]);
            //            var a = Cn.isVarName(arguments[i]) ? Cn.getVarName(arguments[i]) : arguments[i];
            //            console.log("a="+a);
            var myarg = _withquotes ? "\"" + arguments[i] + "\"" : arguments[i];
            if ($U.isArray(myarg)) myarg = "[" + myarg.join(",") + "]";
            params.push(myarg);
        }
        if (params.length === 0) {
            geom += Cn.getVarName(_name) + "=" + _code + "(\"" + $U.native2ascii(_name) + "\");\n";
        } else {
            var args = params.join(",");
            geom += Cn.getVarName(_name) + "=" + _code + "(\"" + $U.native2ascii(_name) + "\"," + args + ");\n";
        }
    };


    me.styleWrite = function(_withquotes, _name, _code) {
        var params = [];
        for (var i = 3; i < arguments.length; i++) {
            var myarg = _withquotes ? "\"" + arguments[i] + "\"" : arguments[i];
            params.push(myarg);
        }
        var args = params.join(",");
        style += _code + "(" + Cn.getVarName(_name) + "," + args + ");\n";
    };

    me.blockWrite = function(_name, _src, _code) {
        block += _code + "(" + Cn.getVarName(_name) + "," + _src + ");\n";
    };


}
function ImageGroup(_owner, _left, _top, _width, _height, _bgOff, _bgOn, _callback) {
    var me = this;
    var imgsize = 32;
    var margin = 5;
    var hspace = 20;
    var imgnum = 0;
    var bgimageOff = _bgOff;
    var bgimageOn = _bgOn;
    var selected = null;

    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();




    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };

    var mousedown = function(ev) {
        ev.preventDefault();
        if (selected)
            selected.toggle();
        ev.currentTarget.toggle();
        selected = ev.currentTarget;
        if (_callback)
            _callback(selected.num);
    };

    me.setImageSize = function(_s) {
        imgsize = _s;
    };
    me.setMargin = function(_s) {
        margin = _s;
    };
    me.setHspace = function(_s) {
        hspace = _s;
    };

    me.select = function(_num) {
        for (var i = 0, len = wrapper.childNodes.length; i < len; i++) {
            if (wrapper.childNodes[i].num === _num) {
                if (selected)
                    selected.toggle();
                wrapper.childNodes[i].toggle();
                selected = wrapper.childNodes[i];
            }
        }
    };

    me.deselectAll = function() {
        if (selected)
            selected.toggle();
        selected = null;
    }

    me.addImage = function(_src, _nobackground) {
        var img_wrapper = createDiv();
        var img = document.createElement("img");
        img_wrapper.num = imgnum;
        var ip = function(_p, _v) {
            img.style.setProperty(_p, _v);
        };
        var iwp = function(_p, _v) {
            img_wrapper.style.setProperty(_p, _v);
        };
        img.src = _src;

        img_wrapper.on = false;
        img_wrapper.toggle = (_nobackground) ? function() {} : function() {
            if (img_wrapper.on)
                iwp("background-image", "url('" + bgimageOff + "')");
            else
                iwp("background-image", "url('" + bgimageOn + "')");
            img_wrapper.on = !img_wrapper.on;
        };
        iwp("position", "absolute");
        iwp("left", (margin + (hspace + imgsize) * imgnum) + "px");
        iwp("top", ((_height - imgsize) / 2) + "px");
        iwp("width", imgsize + "px");
        iwp("height", imgsize + "px");
        if (!_nobackground) {
            iwp("background-color", "rgba(0,0,0,0)");
            iwp("background-size", "100%");
            //        iwp("background-position", "center");
            iwp("background-repeat", "no-repeat");
            iwp("background-image", "url('" + bgimageOff + "')");
        }
        ip("position", "absolute");
        ip("left", "0px");
        ip("top", "0px");
        ip("width", imgsize + "px");
        ip("height", imgsize + "px");
        img_wrapper.addEventListener('touchstart', mousedown, false);
        img_wrapper.addEventListener('mousedown', mousedown, false);
        img_wrapper.appendChild(img);
        wrapper.appendChild(img_wrapper);
        imgnum++;
    };

    wp("background-color", "rgba(0,0,0,0)");
    wp("position", "absolute");

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
    };

    setBounds(_left, _top, _width, _height);
    _owner.appendChild(wrapper);
};
function Checkbox(_owner, _left, _top, _width, _height, _value, _label, _callback) {
    var me = this;
    var boxwidth = 16;
    var value;

    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();
    var box_wrapper = createDiv();
    var label_wrapper = createDiv();
    var checkbox = createDiv();
    var tick = createDiv();

    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };
    var bwp = function(_p, _v) {
        box_wrapper.style.setProperty(_p, _v);
    };
    var lwp = function(_p, _v) {
        label_wrapper.style.setProperty(_p, _v);
    };
    var cbp = function(_p, _v) {
        checkbox.style.setProperty(_p, _v);
    };
    var tp = function(_p, _v) {
        tick.style.setProperty(_p, _v);
    };

    wp("background-color", "rgba(0,0,0,0)");
    wp("position", "absolute");

    bwp("background-color", "rgba(255,0,0,0)");
    bwp("position", "absolute");
    bwp("overflow", "visible");

    lwp("background-color", "rgba(0,255,0,0)");
    lwp("position", "absolute");
    lwp("font-family", "Helvetica, Arial, sans-serif");
    lwp("font-size", "13px");
    lwp("text-align", "left");
    lwp("line-height", _height + "px");
    lwp("white-space", "nowrap");
    lwp("overflow", "hidden");

    cbp("position", "absolute");
    cbp("background-color", "rgba(255,255,255,1)");
    cbp("background", "-webkit-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-moz-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-o-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("background", "-ms-linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.9))");
    cbp("-webkit-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-moz-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-o-box-shadow", "inset 1px 1px 2px rgba(0,0,0,.3), inset 0 0 0 1px rgba(0,0,0,.1)");
    cbp("-o-box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("box-shadow", "inset 1px 1px 2px rgba(0,0,0,.2), inset 0 0 0 1px rgba(0,0,0,.1)");
    cbp("box-shadow", "inset .1rem .1rem .2rem rgba(0,0,0,.3), inset 0 0 0 .1rem rgba(0,0,0,.1)");
    cbp("-webkit-border-radius", ".3rem");
    cbp("-moz-border-radius", ".3rem");
    cbp("-o-border-radius", "3px");
    cbp("-o-border-radius", ".3rem");
    cbp("border-radius", "3px");
    cbp("border-radius", ".3rem");

    tp("position", "absolute");
    tp("left", ".4rem");
    tp("width", "1.4rem");
    tp("height", ".6rem");
    tp("border-style", "solid");
    tp("border-color", "#01C30C");
    tp("border-width", "0 0 .2rem .3rem");
    tp("-webkit-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-moz-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-o-box-shadow", "-1px 1px 1px 0 rgba(0,0,0,.4)");
    tp("-o-box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("box-shadow", "-1px 1px 1px 0 rgba(0,0,0,.4)");
    tp("box-shadow", "-.1rem .1rem .1rem 0 rgba(0,0,0,.4)");
    tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(1)");
    tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("transform", "rotate(-40deg) skewX(-30deg) scale(1)");
    tp("-webkit-transform-origin", "0 100%");
    tp("-moz-transform-origin", "0 100%");
    tp("-o-transform-origin", "0 100%");
    tp("transform-origin", "0 100%");


    me.setTextColor = function(_col) {
        lwp("color", _col);
    };

    me.setTextFontSize = function(_s) {
        lwp("font-size", _s + "px");
    };

    me.setText = function(_t) {
        label_wrapper.innerHTML = _t;
    };

    me.getValue = function() {
        return value;
    };

    me.setValue = function(_val) {
        value = _val;
        if (value) {
            tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(1)");
            tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
            tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(1)");
            tp("transform", "rotate(-40deg) skewX(-30deg) scale(1)");
        } else {
            tp("-webkit-transform", "rotateZ(-40deg) skewX(-30deg) scale(0)");
            tp("-moz-transform", "rotate(-40deg) skewX(-30deg) scale(0)");
            tp("-o-transform", "rotate(-40deg) skewX(-30deg) scale(0)");
            tp("transform", "rotate(-40deg) skewX(-30deg) scale(0)");
        }
    };

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
        bwp("left", "0px");
        bwp("top", "0px");
        bwp("width", _height + "px");
        bwp("height", _height + "px");
        lwp("left", _height + "px");
        lwp("top", "0px");
        lwp("width", (_width - _height) + "px");
        lwp("height", _height + "px");
        cbp("left", ((_height - boxwidth) / 2) + "px");
        cbp("top", ((_height - boxwidth) / 2) + "px");
        cbp("width", boxwidth + "px");
        cbp("height", boxwidth + "px");
        label_wrapper.innerHTML = _label;
    };

    setBounds(_left, _top, _width, _height);
    me.setValue(_value);


    var mousedown = function(ev) {
        ev.preventDefault();
        me.setValue(!value);
        if (_callback)
            _callback(value);
    };

    wrapper.addEventListener('touchstart', mousedown, false);
    wrapper.addEventListener('mousedown', mousedown, false);

    checkbox.appendChild(tick);
    box_wrapper.appendChild(checkbox);
    wrapper.appendChild(box_wrapper);
    wrapper.appendChild(label_wrapper);
    _owner.appendChild(wrapper);
};
function ColorPicker(_owner, _left, _top, _width, _height) {

    var dfs = localStorage.getItem("ColorPaletteDefault");
    if (!dfs || dfs === "")
        localStorage.setItem("ColorPaletteDefault", ["#0000B2", "#007C7C", "#006633", "#966400", "#770012", "#cc66cc"]);

    var c_picker = $Private_ColorPicker({
        width: _width,
        height: _height,
        arrowColor: '#fff',
        defaultRgb: [200, 125, 58],
        onchange: function(color) {}
    });

    c_picker.style.setProperty("position", "absolute");
    c_picker.style.setProperty("border-radius", "8px");
    c_picker.style.setProperty("border-color", "#b4b4b4");
    c_picker.style.setProperty("border-style", "solid");
    c_picker.style.setProperty("border-width", "1px");
    this.setBounds = function(_l, _t, _w, _h) {
        c_picker.style.setProperty("left", _l + "px");
        c_picker.style.setProperty("top", _t + "px");
        c_picker.style.setProperty("width", _w + "px");
        c_picker.style.setProperty("height", _h + "px");
    };

    this.setBounds(_left, _top, _width, _height);
    var hex_callback = function(_hex) {};
    this.setHEXcallback = function(_proc) {
        c_picker.setCallback(_proc);
    };
    this.setRGB = function(_r, _g, _b) {
        c_picker.setRGB({
            r: _r,
            g: _g,
            b: _b
        });
    };
    this.setHSV = function(_h, _s, _v) {
        c_picker.setHSV({
            h: _h,
            s: _s,
            v: _v
        });
    };
    this.setHEX = function(_hex) {
        c_picker.setHEX(_hex);
    };
    this.getHEX = function() {
        return c_picker.getHEX();
    }

    _owner.appendChild(c_picker);
}


(function(win) {

    var createPicker = function(width, height, onchange, arrowColor, defaultHsv, defaultRgb) {
        var W = width,
            H = height;
        var LW = 28; // Vertical Hue Picker width
        var SPH = 0; // h space between SV Rectangle and Hue pickers
        var SPV = 0; // v space between pickers and predefined icons
        var IH = 27; // Icon height
        var IL = 2; // Number of icon lines
        var AW = 9; // Arrow size

        var GW = W - LW - SPH; // SV rectangle width
        var GH = H - SPV - IL * IH; // SV rectangle height
        var LH = GH; // H bar height
        var IN = Math.floor(W / IH); // Number of icons on one line
        var IW = W / IN; // Icon width
        var ICs = []; // icons
        var SVr = [0, 0, GW, GH]; // SV bounding rect
        var Hr = [GW + SPH, 0, LW, LH]; // Hue bounding rect
        var Mr = [(IN - 2) * IW, GH + SPV + IH * (IL - 1), IW, IH]; // minus bounding rect
        var Pr = [(IN - 1) * IW, GH + SPV + IH * (IL - 1), IW, IH]; // plus bounding rect
        var Ir = [0, GH + SPH, IW * IN, IH * IL]; // icon palette bounding rect

        var canvas = document.createElement('canvas');
        canvas.height = H;
        canvas.width = W;
        var ctx = canvas.getContext('2d');
        var gradCanvas = document.createElement('canvas');
        gradCanvas.width = GW;
        gradCanvas.height = GH;
        var gradCtx = gradCanvas.getContext('2d');
        var whiteGrad = ctx.createLinearGradient(0, 0, GW, 0);
        whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        var blackGrad = ctx.createLinearGradient(0, 0, 0, GH);
        blackGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        blackGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradCtx.fillStyle = whiteGrad;
        gradCtx.fillRect(0, 0, GW, GH);
        gradCtx.fillStyle = blackGrad;
        gradCtx.fillRect(0, 0, GW, GH);
        var inR = function(x, y, r) {
            return (x > r[0] && x < r[0] + r[2] && y > r[1] && y < r[1] + r[3])
        };
        var cur = {
            hue: 0,
            sat: 100,
            val: 100,
            tool: null
        };
        if (defaultHsv) {
            cur.hue = defaultHsv[0];
            cur.sat = defaultHsv[1];
            cur.val = defaultHsv[2];
        } else if (defaultRgb) {
            var hsv = rgb2hsv(defaultRgb[0], defaultRgb[1], defaultRgb[2]);
            cur.hue = hsv.h;
            cur.sat = hsv.s;
            cur.val = hsv.v;
        }

        var dfs = localStorage.getItem("ColorPaletteDefault");
        if (dfs)
            ICs = dfs.split(",");


        function refresh() {
            drawArrows();
            drawSVMap();
            drawIcns();
        };

        function isCur(i) {
            if (i < ICs.length) {
                var rgb = hsv2rgb(cur.hue, cur.sat, cur.val).rgb;
                var h = ICs[i];
                var t = [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
                if (Math.abs(rgb[0] - t[0]) < 2 && Math.abs(rgb[1] - t[1]) < 2 && Math.abs(rgb[2] - t[2]) < 2) {
                    return true;
                }
            }
            return false;
        }



        function drawSVMap() {
            ctx.clearRect(0, 0, GW, GH);
            ctx.fillStyle = hsv2rgb(cur.hue, 100, 100).hex;
            ctx.fillRect(0, 0, GW, GH);
            ctx.drawImage(gradCanvas, 0, 0, GW, GH);
            drawCircle();
        }

        function drawCircle() {
            var x = GW * (cur.sat / 100);
            var y = GH - GH * (cur.val / 100);
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, GW, GH);
            ctx.clip();
            for (var i = 0, colors = ['#000', '#fff']; i < 2; i++) {
                ctx.strokeStyle = colors[i];
                ctx.beginPath();
                ctx.arc(x, y, 7 - i, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawHLine() {
            var hue = [
                [255, 0, 0],
                [255, 255, 0],
                [0, 255, 0],
                [0, 255, 255],
                [0, 0, 255],
                [255, 0, 255],
                [255, 0, 0]
            ];
            var grad = ctx.createLinearGradient(0, 0, 0, LH);
            for (var i = 0; i <= 6; i++) {
                var color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';
                grad.addColorStop(1 - i * 1 / 6, color);
            }
            ctx.fillStyle = grad;
            ctx.fillRect(GW + SPH, 0, LW, LH);
            ctx.restore();
        }

        function drawArrows() {
            drawHLine();
            var y = !cur.hue ? 0 : LH - cur.hue / 360 * LH;
            ctx.clearRect(GW, 0, SPH, LH);
            ctx.save();
            ctx.beginPath();
            ctx.rect(GW + SPH, 0, LW, LH);
            ctx.clip();
            ctx.fillStyle = arrowColor;
            for (var i = 0; i < 1; i++) {
                ctx.beginPath();
                ctx.moveTo(GW + SPH + AW + i * (LW - 2 * AW), y);
                ctx.lineTo(GW + SPH + LW * i, y - 2 * AW / 3);
                ctx.lineTo(GW + SPH + LW * i, y + 2 * AW / 3);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawIcns() {
            if (IL < 1)
                return;
            var rgb = hsv2rgb(cur.hue, cur.sat, cur.val).rgb;
            var top = GH + SPV;
            for (var i = 0; i < IL * IN - 2; i++) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.2;
                ctx.fillStyle = (i < ICs.length) ? ICs[i] : "#fff";
                ctx.rect((i % IN) * IW, top + IH * Math.floor(i / IN), IW, IH);
                ctx.fill();
                ctx.stroke();
                if (isCur(i)) {
                    for (var j = 0, colors = ['#000', '#fff']; j < 2; j++) {
                        ctx.strokeStyle = colors[j];
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc((i % IN) * IW + IW / 2, top + IH * Math.floor(i / IN) + IH / 2, 5 - j, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;
            ctx.fillStyle = "#e5e4e2";
            for (var i = 0; i < 2; i++) {
                ctx.beginPath();
                ctx.rect((IN - 2 + i) * IW, top + IH * (IL - 1), IW, IH);
                ctx.fill();
                ctx.stroke();
            }
            ctx.lineWidth = 3;
            var sze = (IW < IH) ? IW / 2 : IH / 2;
            ctx.beginPath();
            // minus and plus symbol :
            ctx.moveTo((IN - 2) * IW + IW / 2 - sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.lineTo((IN - 2) * IW + IW / 2 + sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.moveTo((IN - 1) * IW + IW / 2 - sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.lineTo((IN - 1) * IW + IW / 2 + sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.moveTo((IN - 1) * IW + IW / 2, top + IH * (IL - 1) + IH / 2 - sze / 2);
            ctx.lineTo((IN - 1) * IW + IW / 2, top + IH * (IL - 1) + IH / 2 + sze / 2);
            ctx.stroke();
            ctx.lineWidth = 1;
        }

        function addColor() {
            if (ICs.length > IL * IN - 3)
                return;
            for (var i = 0; i < ICs.length; i++) {
                if (isCur(i))
                    return;
            }
            ICs.push(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            drawIcns();
            localStorage.setItem("ColorPaletteDefault", ICs);
        }

        function removeColor() {
            for (var i = 0; i < ICs.length; i++) {
                if (isCur(i)) {
                    ICs.splice(i, 1);
                    drawIcns();
                    localStorage.setItem("ColorPaletteDefault", ICs);
                    return;
                }
            }
        }

        function setColor(x, y) {
            y -= (GH + SPV);
            var n = Math.floor(x / IW) + IN * Math.floor(y / IH);
            if (n < ICs.length) {
                var hex = ICs[n];
                var hsv = rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16));
                cur.hue = hsv.h;
                cur.sat = hsv.s;
                cur.val = hsv.v;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            }
        }

        function findPos(obj) {
            var curleft = 0,
                curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return [curleft, curtop];
            }
        }

        function mouseDown(evt) {
            var t = findPos(canvas);
            var x = evt.pageX - t[0];
            var y = evt.pageY - t[1];
            if (inR(x, y, SVr)) {
                cur.tool = 'SV';
                cur.sat = x / GW * 100;
                cur.val = (GH - y) / GH * 100;
                drawSVMap();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (inR(x, y, Hr)) {
                cur.tool = 'H';
                cur.hue = ((LH - y) / LH * 360) % 360;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (inR(x, y, Pr)) {
                addColor();
            } else if (inR(x, y, Mr)) {
                removeColor();
            } else if (inR(x, y, Ir)) {
                cur.tool = 'P';
                setColor(x, y);
            }
            if (cur.tool) {
                document.body.addEventListener('mousemove', mouseMove);
                document.body.addEventListener('mouseup', mouseUp);
                document.body.addEventListener('touchmove', touchMove);
                document.body.addEventListener('touchend', touchEnd);
            }
        }



        function mouseMove(evt) {
            var t = findPos(canvas);
            var x = evt.pageX - t[0];
            var y = evt.pageY - t[1];
            if (cur.tool === 'SV') {
                x = x < 0 ? 0 : (x > GW ? GW : x);
                y = y < 0 ? 0 : (y > GH ? GH : y);
                cur.sat = x / GW * 100;
                cur.val = (GH - y) / GH * 100;
                drawSVMap();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (cur.tool === 'H') {
                y = y < 0 ? 0 : (y > LH ? LH : y);
                cur.hue = ((LH - y || 1) / LH * 360) % 360;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (cur.tool === 'P') {
                if (inR(x, y, Ir))
                    setColor(x, y);
            }
        }

        function mouseUp(evt) {
            document.body.removeEventListener('mousemove', mouseMove);
            document.body.removeEventListener('mouseup', mouseUp);
            document.body.removeEventListener('touchmove', touchMove);
            document.body.removeEventListener('touchend', touchEnd);
            cur.tool = null;
        }

        function touchStart(tch) {
            tch.preventDefault();
            mouseDown(tch.touches[0]);
        }

        function touchMove(tch) {
            tch.preventDefault();
            mouseMove(tch.touches[0]);
        }

        function touchEnd(tch) {
            tch.preventDefault();
            mouseUp(tch.touches[0]);
        }

        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('touchstart', touchStart);
        refresh();

        // Communication routines :
        canvas.getHEX = function() {
            return hsv2rgb(cur.hue, cur.sat, cur.val).hex;
        };
        canvas.setHSV = function(col) {
            cur.hue = col.h;
            cur.sat = col.s;
            cur.val = col.v;
            refresh();
        };
        canvas.setHEX = function(hex) {
            canvas.setHSV(rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)));
        };
        canvas.setRGB = function(col) {
            canvas.setHSV(rgb2hsv(col.r, col.g, col.b));
        };
        canvas.setCallback = function(_proc) {
            onchange = _proc;
        };

        return canvas;
    };
    /**
     * Convert HSV representation to RGB HEX string.
     * Credits to http://www.raphaeljs.com
     */
    var hsv2rgb = function(h, s, v) {
        s /= 100;
        v /= 100;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = v - C;
        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        var r = parseInt(R * 255),
            g = parseInt(G * 255),
            b = parseInt(B * 255);
        return {
            r: r,
            g: g,
            b: b,
            hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1),
            rgb: [r, g, b]
        };
    }

    /**
     * Convert RGB representation to HSV.
     * r, g, b can be either in <0,1> range or <0,255> range.
     * Credits to http://www.raphaeljs.com
     */
    var rgb2hsv = function(r, g, b) {
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C == 0 ? null :
            V == r ? (g - b) / C + (g < b ? 6 : 0) :
            V == g ? (b - r) / C + 2 :
            (r - g) / C + 4);
        H = (H % 6) * 60;
        S = C == 0 ? 0 : C / V;
        S *= 100;
        V *= 100;
        return {
            h: H,
            s: S,
            v: V,
            hsv: [H, S, V]
        };
    }

    win.$Private_ColorPicker = function(params) {
        if (!params || !(params.onchange instanceof Function))
            return null;
        params.width = (params.size) ? params.size : (params.width) ? params.width : 300;
        params.height = (params.size) ? params.size : (params.height) ? params.height : 300;
        params.arrowColor = params.arrowColor || '#000000';
        return createPicker(params.width, params.height, params.onchange, params.arrowColor, params.defaultHsv, params.defaultRgb);
    }
})(window);
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function slider(_owner, _left, _top, _width, _height, _min, _max, _value, _callback) {
    var me = this;
    var tabvalues = null;
    var tablabels = null;
    var labelwidth = 0;
    var label = "";
    var valuewidth = 40;
    var fontsize = 12;
    var valueprecision = Math.round(1 / 0.01);
    var sliderheight = 6;
    var indicatorwidth = 18;
    var min = _min,
        max = _max,
        value = _value,
        sw_width;
    var discrete = false;
    var createDiv = function() {
        return document.createElement("div");
    };
    var wrapper = createDiv();
    var label_wrapper = createDiv();
    var slider_wrapper = createDiv();
    var value_wrapper = createDiv();
    var indicator = createDiv();
    var slider_back = createDiv();
    var slider_front = createDiv();

    var wp = function(_p, _v) {
        wrapper.style.setProperty(_p, _v);
    };
    var lwp = function(_p, _v) {
        label_wrapper.style.setProperty(_p, _v);
    };
    var swp = function(_p, _v) {
        slider_wrapper.style.setProperty(_p, _v);
    };
    var vwp = function(_p, _v) {
        value_wrapper.style.setProperty(_p, _v);
    };
    var ip = function(_p, _v) {
        indicator.style.setProperty(_p, _v);
    };
    var sbp = function(_p, _v) {
        slider_back.style.setProperty(_p, _v);
    };
    var sbf = function(_p, _v) {
        slider_front.style.setProperty(_p, _v);
    };
    var init = function() {
        wp("background-color", "rgba(0,0,0,1)");
        wp("position", "absolute");
        vwp("background-color", "rgba(0,0,0,0)");
        vwp("position", "absolute");
        vwp("font-family", "Helvetica, Arial, sans-serif");
        vwp("font-size", fontsize + "px");
        vwp("text-align", "center");
        vwp("line-height", _height + "px");
        vwp("overflow", "hidden");
        swp("background-color", "rgba(0,0,0,0)");
        swp("position", "absolute");
        swp("overflow", "visible");

        lwp("background-color", "rgba(0,255,0,0)");
        lwp("position", "absolute");
        lwp("font-family", "Helvetica, Arial, sans-serif");
        lwp("font-size", fontsize + "px");
        lwp("text-align", "center");
        lwp("line-height", _height + "px");

        sbp("position", "absolute");
        sbp("background-image", "linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-o-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-moz-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-webkit-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("background-image", "-ms-linear-gradient(top, #A7A7A7 25%, #D0D0D0 50%,#E8E8E8 50%, #FFFFFF 100%)");
        sbp("-moz-border-radius", "6px");
        sbp("-o-border-radius", "6px");
        sbp("-webkit-border-radius", "6px");
        sbp("border-radius", "6px");
        sbp("border", "1px solid #A7A7A7");

        sbf("position", "absolute");
        sbf("background-image", "linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-o-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-moz-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-webkit-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("background-image", "-ms-linear-gradient(top, #92B2E3 25%, #7EA4DD 50%,#497CD3 50%, #1F5CB2 100%)");
        sbf("-moz-border-radius", "6px");
        sbf("-o-border-radius", "6px");
        sbf("-webkit-border-radius", "6px");
        sbf("border-radius", "6px");
        sbf("border", "1px solid #789BBF");

        ip("position", "absolute");
        ip("background-image", "linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-o-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-moz-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-webkit-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("background-image", "-ms-linear-gradient(top, #C8C8C8 25%, #F1F1F1 100%)");
        ip("-moz-border-radius", (indicatorwidth / 2) + "px");
        ip("-o-border-radius", (indicatorwidth / 2) + "px");
        ip("-webkit-border-radius", (indicatorwidth / 2) + "px");
        ip("border-radius", (indicatorwidth / 2) + "px");
        ip("border", "1px solid #BEBEBE");
    }

    init();


    me.setHeights = function(_h1, _h2) {
        sliderheight = _h1;
        indicatorwidth = _h2;
        init();
        setBounds(_left, _top, _width, _height);
    };

    me.setDiscrete = function(_dis) {
        discrete = _dis;
    };

    me.setLabel = function(_t, _w) {
        label = _t;
        labelwidth = _w;
        lwp("left", "0px");
        lwp("top", "0px");
        lwp("width", _w + "px");
        lwp("height", _height + "px");
        swp("left", _w + "px");
        sw_width = (_width - valuewidth - _w);
        swp("width", sw_width + "px");
        ip("left", ((value - min) * (_width - valuewidth - _w) / (max - min) - indicatorwidth / 2) + "px");
        sbf("width", ((value - min) * (_width - valuewidth - _w) / (max - min)) + "px");
        label_wrapper.innerHTML = _t;
    };

    me.setValueWidth = function(_v) {
        valuewidth = _v;
        setBounds(_left, _top, _width, _height);
        me.setLabel(label, labelwidth);
    };

    me.setTextColor = function(_col) {
        lwp("color", _col);
        vwp("color", _col);
    };

    me.setFontSize = function(_sz) {
        fontsize = _sz;
        lwp("font-size", _sz + "px");
        vwp("font-size", _sz + "px");
    };

    me.setValuePrecision = function(_prec) {
        valueprecision = Math.round(1 / _prec);
        refreshValue();
    };

    me.setMin = function(_m) {
        min = _m;
        refreshValue();
    };

    me.setMax = function(_m) {
        max = _m;
        refreshValue();
    };

    me.setBackgroundColor = function(_col) {
        wp("background-color", _col);
    };

    var refreshValue = function() {
        value_wrapper.innerHTML = (tabvalues) ? tablabels[Math.round(value)] : me.getValue();
    };

    me.getValue = function() {
        if (tabvalues)
            return tabvalues[Math.round(value)];
        else
            return (Math.round(value * valueprecision) / valueprecision);
    };

    me.getDocObject = function() {
        return wrapper;
    }

    me.setValue = function(_val) {
        var v = (tabvalues) ? tabvalues.indexOf(_val) : _val;
        value = v;
        refreshValue();
        me.setValueWidth(valuewidth);
    };

    me.setTabValues = function(_t) {
        min = 0;
        max = _t.length - 1;
        valueprecision = 1;
        tabvalues = [];
        tablabels = [];
        for (var i = 0; i < _t.length; i++) {
            if (_t[i] instanceof Array) {
                tabvalues.push(_t[i][0]);
                tablabels.push(_t[i][1]);
            } else {
                tabvalues.push(_t[i]);
                tablabels.push(_t[i]);
            }
        }
        //        tabvalues = _t;
    };

    me.getTabValues = function() {
        return tabvalues;
    };

    var setBounds = function(_l, _t, _w, _h) {
        wp("left", _l + "px");
        wp("top", _t + "px");
        wp("width", _w + "px");
        wp("height", _h + "px");
        vwp("left", (_w - valuewidth) + "px");
        vwp("top", "0px");
        vwp("width", valuewidth + "px");
        vwp("height", _h + "px");
        swp("left", "0px");
        swp("top", "0px");
        sw_width = (_w - valuewidth);
        swp("width", sw_width + "px");
        swp("height", _h + "px");
        sbp("top", ((_h - sliderheight) / 2) + "px");
        sbp("width", "100%");
        sbp("height", sliderheight + "px");
        ip("top", ((_h - indicatorwidth) / 2) + "px");
        ip("width", indicatorwidth + "px");
        ip("height", indicatorwidth + "px");
        //        console.log(value* (_w - valuewidth) / (max - min));
        ip("left", ((value - min) * (_w - valuewidth) / (max - min) - indicatorwidth / 2) + "px");
        sbf("top", ((_h - sliderheight) / 2) + "px");
        sbf("width", ((value - min) * (_w - valuewidth) / (max - min)) + "px");
        sbf("height", sliderheight + "px");
        sbf("left", "0px");
        refreshValue();
    };


    var getOffset = function(obj) {
        var obj2 = obj;
        var curtop = 0;
        var curleft = 0;
        if (document.getElementById || document.all) {
            do {
                curleft += obj.offsetLeft - obj.scrollLeft;
                curtop += obj.offsetTop - obj.scrollTop;
                obj = obj.offsetParent;
                obj2 = obj2.parentNode;
                while (obj2 !== obj) {
                    curleft -= obj2.scrollLeft;
                    curtop -= obj2.scrollTop;
                    obj2 = obj2.parentNode;
                }
            } while (obj.offsetParent)
        } else if (document.layers) {
            curtop += obj.y;
            curleft += obj.x;
        }
        //        alert("left="+curleft+" top="+curtop);
        return {
            "left": curleft,
            "top": curtop
        };
    };

    var mouseX = function(ev) {
        return (ev.pageX - getOffset(slider_wrapper).left);
    };



    var mousepressed = false;

    var mousedown = function(ev) {
        ev.preventDefault();
        mousepressed = true;
        mousemove(ev);
    };
    var touchdown = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mousedown($U.PadToMouseEvent(touch));
        }
    };


    var mousemove = function(ev) {
        ev.preventDefault();
        if (mousepressed) {
            ev = ev || window.event;
            var mouse = mouseX(ev);
            var oldval = value;

            if (mouse < 0)
                mouse = 0;
            else if (mouse > sw_width)
                mouse = sw_width;
            value = min + (mouse * (max - min) / sw_width);
            if (discrete) {
                value = Math.round(value);
                mouse = sw_width * (value - min) / (max - min);
            }
            ip("left", (mouse - indicatorwidth / 2) + "px");
            sbf("width", mouse + "px");
            refreshValue();
            if ((_callback) && (oldval !== value)) {
                var val = (tabvalues) ? tabvalues[Math.round(value)] : me.getValue();
                _callback(val);
            }
        }
    };
    var touchmove = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mousemove($U.PadToMouseEvent(touch));
        }
    };


    var mouseup = function(ev) {
        ev.preventDefault();
        mousepressed = false;
    };
    var touchup = function(tch) {
        tch.preventDefault();
        if (tch.touches.length === 1) {
            var touch = tch.touches[0] || tch.changedTouches[0];
            mouseup($U.PadToMouseEvent(touch));
        }
    };

    me.setWindowsEvents = function() {
        slider_wrapper.removeEventListener('touchstart', touchdown, false);
        slider_wrapper.removeEventListener('touchmove', touchmove, false);
        slider_wrapper.removeEventListener('mousemove', mousemove, false);
        _owner.removeEventListener('mouseup', mouseup, false);

        _owner.addEventListener('touchstart', touchdown, false);
        _owner.addEventListener('touchmove', touchmove, false);
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
    };

    me.removeWindowsEvents = function() {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    };



    slider_wrapper.addEventListener('touchstart', touchdown, false);
    slider_wrapper.addEventListener('touchmove', touchmove, false);
    _owner.addEventListener('touchend', touchup, false);
    slider_wrapper.addEventListener('mousedown', mousedown, false);
    slider_wrapper.addEventListener('mousemove', mousemove, false);
    _owner.addEventListener('mouseup', mouseup, false);

    setBounds(_left, _top, _width, _height);
    slider_wrapper.appendChild(slider_back);
    slider_wrapper.appendChild(slider_front);
    slider_wrapper.appendChild(indicator);
    wrapper.appendChild(label_wrapper);
    wrapper.appendChild(value_wrapper);
    wrapper.appendChild(slider_wrapper);
    _owner.appendChild(wrapper);
};
function SymbolicCompute(_cn) {
    var me = this;
    var Cn = _cn;
    var EXPS = Cn.getInterpreter().getEXPS();

    var isNum = function(_s) {
        return (new RegExp("^\\d+\\.*\\d*$").test(_s))
    }

    var isVar = function(_s) {
        return (new RegExp("^[xyzt]{1}$").test(_s))
    }

    var contains = function(_s, _t) {
        _s = "" + _s;
        _t = _t.split(",");
        var res = false;
        for (var i = 0; i < _t.length; i++) {
            res = res || (_s.indexOf(_t[i]) !== -1)
        }
        return res;
    }

    var userFromCode = function(_t, _m, _s) {
        var st = _s.split(_m);
        if (st.length === 1) return st[0]; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        if (st[0] === "") return userFromCode(_t, _m, p);
        var f = st[0]; // La fonction : comme "plus", "times", "cos"
        p = p.split(","); // On transforme les paramètres en tableau
        var v = [];
        for (var i = 0; i < p.length; i++) {
            p[i] = "" + p[i];
            v[i] = userFromCode(_t, _m, p[i]);
            if (isNum(v[i])) v[i] = parseFloat(v[i]);
        }
        switch (f) {
            case "plus":
                return v[0] + "+" + v[1];
                break;
            case "minus":
                if (contains(v[1], "+,-")) v[1] = "(" + v[1] + ")";
                if (v[0] === 0) return "-" + v[1];
                return v[0] + "-" + v[1];
                break;
            case "times":
                if (contains(v[0], "+,-")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,/")) v[1] = "(" + v[1] + ")";
                return v[0] + "*" + v[1];
                break;
            case "quotient":
                if (contains(v[0], "+,-")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,*,/")) v[1] = "(" + v[1] + ")";
                return v[0] + "/" + v[1];
                break;
            case "power":
                if (contains(v[0], "+,-,*,/")) v[0] = "(" + v[0] + ")";
                if (contains(v[1], "+,-,*,/,^")) v[1] = "(" + v[1] + ")";
                return v[0] + "^" + v[1];
                break;
            default:
                return f + "(" + v[0] + ")";
        }
    };

    var simplifyFromCode = function(_t, _m, _s) {
        var st = _s.split(_m);
        if (st.length === 1) return st[0]; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        if (st[0] === "") return simplifyFromCode(_t, _m, p);
        var f = st[0]; // La fonction : comme "plus", "times", "cos"
        p = p.split(","); // On transforme les paramètres en tableau
        var v = [];
        for (var i = 0; i < p.length; i++) {
            p[i] = "" + p[i];
            v[i] = simplifyFromCode(_t, _m, p[i]);
            if (isNum(v[i])) v[i] = parseFloat(v[i]);
        }

        switch (f) {
            case "plus":
                if (v[0] === 0) return v[1];
                if (v[1] === 0) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return v[0] + v[1];
                return "plus(" + v[0] + "," + v[1] + ")";
                break;
            case "minus":
                if (v[1] === 0) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return (v[0] - v[1]);
                if (v[0] === v[1]) return 0;
                return "minus(" + v[0] + "," + v[1] + ")";
                break;
            case "times":
                if ((v[0] === 0) || (v[1] === 0)) return 0;
                if (v[0] === 1) return v[1];
                if (v[1] === 1) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return (v[0] * v[1]);
                if ((!isNaN(v[1])) && (isNaN(v[0]))) return "times(" + v[1] + "," + v[0] + ")";
                return "times(" + v[0] + "," + v[1] + ")";
                break;
            case "quotient":
                if (v[0] === 0) return 0;
                if (v[1] === 1) return v[0];
                if (v[0] === v[1]) return 1;
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) {
                    var l = 1e13 * (v[0] / v[1]);
                    if (l === Math.round(l)) return v[0] / v[1];
                }
                if ((!isNaN(v[1])) && (isNaN(v[0]))) {
                    var l = 1e13 * (1 / v[1]);
                    if (l === Math.round(l)) return "times(" + (1 / v[1]) + "," + v[0] + ")";
                    return "times(quotient(1," + v[1] + ")," + v[0] + ")";
                }




                return "quotient(" + v[0] + "," + v[1] + ")";
                break;
            case "power":
                //                if (v[1] === "1") return v[0];
                if (v[0] === 0) return 1;
                if (v[1] === 1) return v[0];
                if ((!isNaN(v[0])) && (!isNaN(v[1]))) return Math.pow(v[0], v[1]);
                return "power(" + v[0] + "," + v[1] + ")";
                break;
            default:
                return _s;
                //            default:
                //                return f + "(" + simplifyFromCode(_t, _m, _t[parseInt(st[1])]) + ")";
        }

    };


    var derivateFromCode = function(_t, _m, _s, _v) {
        //        console.log("****derivateFromCode="+_s);
        if (_s === _v) return 1;
        //        if (_s.indexOf(mask)===-1) return 0;

        var st = _s.split(_m);
        if (st.length === 1) return 0; // Il s'agit d'une constante
        var p = _t[parseInt(st[1])]; // Paramètres : comme "(2,x)" ou "(times___MASK___0,1)"

        // S'il n'y a pas de fonction devant le masque (plus, minus, cos, etc...)
        // on renvoie la dérivée du tout. 
        if (st[0] === "") return derivateFromCode(_t, _m, p, _v);

        var f = st[0]; // La fonction : comme "plus", "times", "cos"


        p = p.split(","); // On transforme les paramètres en tableau
        var dp = [];
        var allCte = true;
        for (var i = 0; i < p.length; i++) {
            dp[i] = derivateFromCode(_t, _m, p[i], _v);
            allCte = allCte && (dp[i] === 0);
        };
        if (allCte) return 0;




        switch (f) {
            case "plus":
                if (dp[0] === 0) return dp[1];
                if (dp[1] === 0) return dp[0];
                // u' + v' :
                return "plus(" + dp[0] + "," + dp[1] + ")";
                break;
            case "minus":
                if (dp[1] === 0) return dp[0];
                // u' - v' :
                return "minus(" + dp[0] + "," + dp[1] + ")";
                break;
            case "times":
                if ((dp[0] === 1) && (dp[1] === 0)) return p[1];
                if ((dp[1] === 1) && (dp[0] === 0)) return p[0];
                if ((dp[0] === 1) && (dp[1] === 1)) return "plus(" + p[0] + "," + p[1] + ")";
                if (dp[0] === 0) return "times(" + p[0] + "," + dp[1] + ")";
                if (dp[1] === 0) return "times(" + p[1] + "," + dp[0] + ")";
                // u'v + uv' :
                return "plus(times(" + dp[0] + "," + p[1] + "),times(" + p[0] + "," + dp[1] + "))";
                break;
            case "power":
                if ((dp[0] === 1) && (dp[1] === 0)) return "times(" + p[1] + ",power(" + p[0] + ",minus(" + p[1] + ",1)))";
                if (dp[1] === 0) return "times(times(" + p[1] + "," + dp[0] + "),power(" + p[0] + ",minus(" + p[1] + ",1)))";
                return "times(power(" + p[0] + "," + p[1] + "),plus(times(" + dp[1] + "," + "log(" + p[0] + ")),times(" + p[1] + ",quotient(" + dp[0] + "," + p[0] + "))))";
                break;
            case "quotient":
                if ((dp[0] === 1) && (dp[1] === 0)) return "quotient(1," + p[1] + ")";
                if ((dp[0] === 0) && (dp[1] === 1)) return "quotient(minus(0," + p[0] + "),power(" + p[1] + ",2))";
                if ((dp[0] === 1) && (dp[1] === 1)) return "quotient(minus(" + p[1] + "," + p[0] + "),power(" + p[1] + ",2))";
                if (dp[1] === 0) return "quotient(" + dp[0] + "," + p[1] + ")";
                return "quotient(minus(times(" + dp[0] + "," + p[1] + "),times(" + p[0] + "," + dp[1] + ")),power(" + p[1] + ",2))";
                break;
            case "cos":
                return "times(minus(0," + dp[0] + "),sin(" + p[0] + "))";
                break;
            case "sin":
                return "times(" + dp[0] + ",cos(" + p[0] + "))";
                break;
            case "tan":
                return "times(" + dp[0] + ",plus(1,power(tan(" + p[0] + "),2)))";
                break;
            case "sqrt":
                return "quotient(" + dp[0] + ",times(2,sqrt(" + p[0] + ")))";
                break;
            case "abs":
                return "times(" + dp[0] + ",quotient(abs(" + p[0] + ")," + p[0] + "))";
                break;
            case "log":
                return "quotient(" + dp[0] + "," + p[0] + ")";
                break;
            case "exp":
                return "times(" + dp[0] + ",exp(" + p[0] + "))";
                break;
            case "asin":
                return "quotient(" + dp[0] + ",sqrt(minus(1,power(" + p[0] + ",2))))";
                break;
            case "acos":
                return "minus(0,quotient(" + dp[0] + ",sqrt(minus(1,power(" + p[0] + ",2)))))";
                break;
            case "atan":
                return "quotient(" + dp[0] + ",plus(1,power(" + p[0] + ",2)))";
                break;
        }

        //        
        //        _s = _s.replace(new RegExp(mask + "(\\d+)", "g"), function(m, _d) {
        //            return tabExpr[_d];
        //        });
        return 0;

    }



    var prepareMaskFromCode = function(_m, _s) {
        _s = "" + _s;
        var tab = [];
        while (_s.indexOf("(") > -1) {
            _s = _s.replace(/\(([^\(\)]*)\)/, function(m, t) {
                tab.push(t);
                return (_m + (tab.length - 1));
            });
        }
        tab.push(_s);
        return tab;
    }

    var restituteCodeFromMask = function(_t, _m, _s) {
        _s = "" + _s;
        while (_s.indexOf(_m) !== -1) {
            // Restitution de tous les textes :
            _s = _s.replace(new RegExp(_m + "(\\d+)", "g"), function(m, _d) {
                return "(" + _t[_d] + ")";
            });
        }
        return _s;
    }

    var isValidParenthesis = function(_s) {
        var parentheses = 0;
        var crochets = 0;
        var REGsequence = [];
        for (var i = 0, len = _s.length; i < len; i++) {
            if (_s.charAt(i) === "(")
                parentheses++;
            if (_s.charAt(i) === "[")
                crochets++;
            else {
                if (_s.charAt(i) === ")") {
                    parentheses--;
                    REGsequence.push(/(\([^\(\)]*\))/);
                }
                if (_s.charAt(i) === "]") {
                    crochets--;
                    REGsequence.push(/(\[[^\[\]]*\])/);
                }
            }
            if ((parentheses < 0) || (crochets < 0))
                return null;
        }
        if ((parentheses === 0) && (crochets === 0))
            return REGsequence;
        return null;
    };

    me.userCode = function(_s) {
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var simpl = userFromCode(tab, mask, tab[tab.length - 1]);
        _s = restituteCodeFromMask(tab, mask, simpl);

        _s = _s.replace(/EX_funcValue\((\d+)\)\(([^\)]*)\)/g, function(_m, _n, _p) {
            if (_p === "") return EXPS[_n].getVarName();
            return EXPS[_n].getVarName() + "(" + _p + ")";
        });
        _s = _s.replace(/EX_getObj\((\d+)\)/g, function(_m, _n) {
            return EXPS[_n].getVarName();
        });

        //        console.log("me.userCode : " + _s);
        var str;
        do {
            str = _s;
            //            // Remplacement des divisions et multiplications de nombres par le quotient ou produit :
            //            _s = _s.replace(/(^|[^\^]{1})(\b\d+\.*\d*\b)(\*|\/)(\b\d+\.*\d*\b)([^\^]{1}|$)/g, function(_m, _c, _n1,_op, _n2, _c2) {
            //                _n1 = parseFloat(_n1);
            //                _n2 = parseFloat(_n2);
            //                var r=(_op==="*")?(_n1 * _n2):(_n1 / _n2);
            //                return "" + _c + r + _c2;
            //            });
            // Remplacement des puissances de nombres :
            _s = _s.replace(/(\b\d+\.*\d*\b)\^(\b\d+\.*\d*\b)/g, function(_m, _n1, _n2) {
                _n1 = parseFloat(_n1);
                _n2 = parseFloat(_n2);
                var r = Math.round(Math.pow(_n1, _n2) * 1e13) / 1e13;
                return "" + r;
            });



            // Remplacement des multiplications de nombres par le produit :
            _s = _s.replace(/(^|[^\^\/]{1})(\b\d+\.*\d*\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, function(_m, _c, _n1, _n2, _c2) {
                _n1 = parseFloat(_n1);
                _n2 = parseFloat(_n2);
                var r = Math.round(_n1 * _n2 * 1e13) / 1e13;
                return "" + _c + r + _c2;
            });
            //            // Remplacement des divisions de nombres par le quotient :
            //            _s = _s.replace(/([^\^]{1})(\b\d+\.*\d*\b)\/(\b\d+\.*\d*\b)([^\^]{1})/g, function(_m, _c,_n1, _n2,_c2) {
            //                _n1 = parseFloat(_n1);
            //                _n2 = parseFloat(_n2);
            //                return ""+_c+(_n1 / _n2)+_c2;
            //            });
            // On commute variable et nombre de sorte que le nombre soit
            // au début :
            //            _s = _s.replace(/(^|[^\^]{1})(\b[xyzt]{1}\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, "$1$3*$2$4");
            // On commute mots et nombre de sorte que le nombre soit
            // au début :
            //            _s = _s.replace(/(^|[^\^]{1})(\b\w+\b)\*(\b\d+\.*\d*\b)([^\^]{1}|$)/g, "$1$3*$2$4");
            //            console.log(_s);
        } while (str !== _s);

        //        _s=_s.replace(/\*/g,"");


        //        _s = _s.replace(/[0-9\.]+([\+\-\*\/\^]){1}/g, function(_m, _n) {
        //            return EXPS[_n].getVarName();
        //        });


        return _s;
    }


    me.simplify = function(_s) {
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var simpl = simplifyFromCode(tab, mask, tab[tab.length - 1]);
        _s = restituteCodeFromMask(tab, mask, simpl);
        //        console.log("me.simplify=" + _s);
        return _s;
    }




    me.derivate = function(_s, _v) {
        if ((_s === "") || (!(isValidParenthesis(_s)))) return "";
        var mask = "___MASK___";
        var tab = prepareMaskFromCode(mask, _s);
        var der = derivateFromCode(tab, mask, tab[tab.length - 1], _v);
        _s = restituteCodeFromMask(tab, mask, der);

        //        tab = prepareMaskFromCode(mask, _s, _v);
        //        der = simplifyFromCode(tab, mask, tab[tab.length - 1], _v);
        //        _s = restituteCodeFromMask(tab, mask, der);

        //        console.log("CODE =" + _s);
        //        return me.simplify(_s);
        //        return _s;

        _s = me.userCode(me.simplify(_s));

        //        console.log("USER CODE="+_s);

        return _s;

    }




}
function Expression(_obj, _s) {
    var me = this;

    var obj = _obj;
    //    var vname = (_vars === undefined) ? "" : _vars;  // var name, like "x" or "t" or "x,y" or nothing
    var Cn = obj.getCn();
    var interpreter = Cn.getInterpreter();
    var symbolic = new SymbolicCompute(Cn);
    var DX = null;
    var DY = null;
    var DZ = null;
    var DT = null;
    var DXYZT = null; // Chaîne représentant la dérivée suivant x ou y ou etc...
    var NaNstr = NaN.toString();
    var init, lastInstruction, vnames, f, VALUE;
    var isFuncCall = false; // Y-a-t-il un appel à des fonctions utilisateurs dans l'expression ?
    var isvar = function(_v) {
        return (new RegExp("(\\W|^)\\b" + _v + "\\b([^\\(]|$)").test(lastInstruction))
    }
    Expression.ALL.push(me);

    var parseInit = function() {
        // Remplacement dans le init.js de toute partie d'expression contenant des dx par la dérivée :
        init.js = init.jsbackup.replace(/(EX_getObj\(\d+\))((\.d[xyzt]{1}\(\))*)((\.d[xyzt]{1})\(([xyzt]{1}(,[xyzt]{1})*)\))+/g, function(_m, _e1, _e2, _e3, _e4, _e5, _e6) {
            if (_e2 === undefined)
                _e2 = "";
            var ex = new Expression(obj, "" + _e1 + _e2 + _e5 + "()");
            return ex.value().js();
        });

        // Remplacement de tous les appels à des expressions (par exemple E1(x)) par le source de ces expressions
        // ******** Il manque la composition : à travailler ci-dessous 
        init.js = init.js.replace(/((EX_funcValue\((\d+)\))\(([xyzt](,[xyzt])*)\))/g, function(m, e1, e2, e3, e4, e5) {
            var ex = interpreter.getEXPS()[parseInt(e3)];
            if (e4 !== ex.getE1().getVars())
                return e1;
            var ex2 = new Expression(obj, ex.getE1().get());
            return ex2.js();
        });

        isFuncCall = (init.js !== init.jsbackup);

        // Si la chaine contient des dx (exemple : E1.dx.dy(x,y,z)), on réactualise les variables
        // comme étant celles de l'expression ciblée (E1 dans l'exemple) :
        init.user = init.user.replace(/((\w+).d[xyzt](.d[xyzt])*)\(([xyzt]*(,[xyzt])*)\)/g, function(m, g1, g2, g3, g4, g5) {
            var ex = Cn.find(g2);
            if ((ex) && (ex.getE1)) {

                return g1 + "(" + ex.getE1().getVars() + ")";
            } else {
                return g1 + "(" + g4 + ")";
            }
        });

        // Si la chaine contient des dx (exemple : EX_getObj(0).dx().dy(x,y,z)), on réactualise les variables
        // comme étant celles de l'expression ciblée (EX_getObj(0) dans l'exemple) :
        init.pseudo = init.pseudo.replace(/((EX_getObj\(\d+\))((\.d[xyzt]\(\))*)(\.d[xyzt]))\(([xyzt]*(,[xyzt])*)\)/g, function(m, g1, g2, g3, g4, g5, g6) {
            var expr = new Expression(obj, "" + g2);
            var ex = expr.value();
            if ((ex) && (ex.getE1)) {
                return g1 + "(" + ex.getE1().getVars() + ")";
            } else {
                return g1 + "(" + g6 + ")";
            }
        });


        //        console.log("init.js="+init.js+"  init.pseudo="+init.pseudo);
        lastInstruction = (function() {
            var t = init.js.split(";");
            return t[t.length - 1];
        })();
        vnames = (function() {
            var vn = [];
            if (isvar("x"))
                vn.push("x");
            if (isvar("y"))
                vn.push("y");
            if (isvar("z"))
                vn.push("z");
            if (isvar("t"))
                vn.push("t");
            return vn.join(",");
        })();
        f = interpreter.CreateFunctionFromExpression(init.js, vnames);
        VALUE = null;
    };



    me.setText = function(_src) {
        //        console.log("avant : "+obj.getName());
        init = interpreter.ExpressionInit(obj, _src + "");
        parseInit();
        if (obj.blocks) obj.blocks.evaluate("onchange");
        //        console.log("après : "+obj.getName());
    };

    me.setText(_s);




    me.setDxyzt = function() {
        var st = init.jsbackup;
        st = st.replace(/(\.d[xyzt]{1})\([^\)]+\)$/, "$1()");
        DXYZT = new Expression(obj, st);
    };

    me.getDxyzt = function() {
        return DXYZT.value().get();
    };

    me.getVars = function() {
        return vnames;
    };

    // Appelée uniquement lors d'une modification de l'expression par
    // l'utilisateur :
    me.compute = function() {
        // Si il s'agit d'une expressions sans variable, on précalcule.
        // Ceci est notamment très utile pour les expressions contenant
        // un programme avec de grosses boucles qui au final délivrent un tableau :
        VALUE = (vnames === "") ? f() : null;

        if (isFuncCall)
            parseInit();
        DX = null;
        DY = null;
        DZ = null;
        DT = null;
        if (obj.blocks) obj.blocks.evaluate("onchange");
    };

    // Pour Blockly :
    me.forcevalue = function(x, y, z, t) {
        return f(x, y, z, t);
    }

    me.value = function(x, y, z, t) {
        if (VALUE)
            return VALUE;
        if (vnames === "")
            return (VALUE = f());
        return f(x, y, z, t);
    };

    me.dx = function(x, y, z, t) {
        if (DX === null)
            DX = new Expression(obj, symbolic.derivate(init.js, "x"));
        if (arguments.length === 0)
            return DX;
        return DX.value(x, y, z, t);
    };
    me.dy = function(x, y, z, t) {
        if (DY === null)
            DY = new Expression(obj, symbolic.derivate(init.js, "y"));
        if (arguments.length === 0)
            return DY;
        return DY.value(x, y, z, t);
    };
    me.dz = function(x, y, z, t) {
        if (DZ === null)
            DZ = new Expression(obj, symbolic.derivate(init.js, "z"));
        if (arguments.length === 0)
            return DZ;
        return DZ.value(x, y, z, t);
    };
    me.dt = function(x, y, z, t) {
        if (DT === null)
            DT = new Expression(obj, symbolic.derivate(init.js, "t"));
        if (arguments.length === 0)
            return DT;
        return DT.value(x, y, z, t);
    };


    // Methode appelée pour la réinitialisation des parents (voir ExpressionObject) :
    me.refresh = function() {
        var src = me.getSource().replace(/\\\"/g, "\"");
        me.setText(src);
    };

    // Methode appelée lorsqu'on change le nom d'un objet (dans le panneau de prop.)
    // et que cet objet est impliqué dans l'expression :
    me.refreshNames = function() {
        me.refresh();
        me.compute();
    };



    // setValue pour les curseurs d'expressions :
    me.setValue = function(_val) {
        if (VALUE !== _val) {
            init = interpreter.ExpressionInit(obj, _val + "");
            lastInstruction = _val + "";
            vnames = "";
            f = interpreter.CreateFunctionFromExpression(init.js, vnames);
            VALUE = _val;
            if (obj.blocks) obj.blocks.evaluate("onchange");
        }
    };


    me.isText = function() {
        return (lastInstruction.indexOf("\"") !== -1);
    };

    me.isFunc = function() {
        return (vnames !== "");
    };

    me.isDxyztFunc = function() {
        return /^EX_getObj\(\d+\)(\.d[xyzt]{1}\(\))+$/.test(init.jsbackup);
    };

    me.isDxyztDef = function() {
        return /^EX_getObj\(\d+\)(\.d[xyzt]{1}\(\))*(\.d[xyzt]{1}\([^\)]+\))+$/.test(init.jsbackup);
    };

    me.isEmpty = function() {
        return (init.user === "");
    };

    me.isNum = function() {
        //        if (!VALUE) return false;
        return ((vnames === "") && (!isNaN(f())));
    };

    me.isArray = function() {
        return ($U.isArray(f(1, 1, 1, 1)));
    };

    me.is3DArray = function() {
        var t = f(1, 1, 1, 1);
        if ($U.isArray(t)) {
            for (var k = 0; k < t.length; k++) {
                if (t[k].length !== 3)
                    return false;
            }
            return true;
        }
        return false;
    };

    me.getPointList = function() {
        var val = me.getValidValue();
        var tab = [];
        if (!$U.isPointArrayWithNaN(val))
            return tab;
        for (var i = 0; i < val.length; i++) {
            tab.push(obj.getVarName() + "[" + i + "]");
        }
        return tab;
    };




    // Pas fier du tout de ceci :
    me.getValidValue = function() {
        if (VALUE)
            return VALUE;
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * 100 - 50;
            var y = Math.random() * 100 - 50;
            var z = Math.random() * 100 - 50;
            var t = Math.random() * 100 - 50;
            var res = f(x, y, z, t);
            if ((res !== undefined) && (res.toString() !== NaNstr))
                return res;
        }
        return null;
    };

    me.fix = function() {
        // console.log("FIX : "+f(1, 2, 3, 4));
        if (f(1, 2, 3, 4) === undefined) {
            me.setText(_s);
            //            init = interpreter.ExpressionInit(obj, _s + "");
            //            f = interpreter.CreateFunctionFromExpression(init.js, vnames);
        }
    };

    me.get = function() {
        return init.user;
    };

    me.js = function() {
        return init.js;
    };

    me.getUnicodeSource = function() {
        var s = interpreter.ExpressionSrc(init.pseudo);
        s = s.replace(/\"([^\"]*)\"/g, function(m, t) {
            return ("\"" + $U.native2ascii(t) + "\"");
        });
        return s;
    };

    me.getSource = function() {
        return interpreter.ExpressionSrc(init.pseudo);
    };
}

Expression.ALL = [];


// A chaque fois qu'un objet est rajouté à la figure (ObjectConstructor)
// On parcours toutes les expressions de la figure pour chercher celle
// provoquant une erreur de référence : on essaie alors de les reconstruire :
Expression.fixAll = function() {
    for (var i = 0; i < Expression.ALL.length; i++) {
        Expression.ALL[i].fix();
    }
}

// Méthode de classe devant être appelée chaque fois qu'on veut supprimer
// une expression. Elle devrait théoriquement être appelée aussi chaque 
// fois qu'on veut en créer une nouvelle qui en écrase une autre :
Expression.delete = function(_ex) {
    if (_ex) {
        var i = Expression.ALL.indexOf(_ex);
        if (i != -1) {
            Expression.ALL.splice(i, 1);
        }
    }
    return null;
}
function MagnifierManager(_canvas) {
    var me = this;
    var panel = null;
    me.setMagnifierMode = function(_magn) {
        if (_magn) {
            panel = new MagnifierPanel(_canvas);
            panel.show();
        } else if (panel) {
            panel.close();
            panel = null;
        }
    };
    me.getMagnifierMode = function() {
        return (panel !== null);
    };
    me.hide = function() {
        if (panel) panel.setStyle("visibility", "hidden");
    };
    me.show = function() {
        if (panel) panel.setStyle("visibility", "visible");
    };
    me.magnifierPaint = function(coords) {
        if (panel) {
            panel.magnifierPaint(coords);
        }
    };
    me.setMagnifierMode(Object.touchpad);
}
function MagnifierPanel(_canvas) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    var _l = $P.MagnifierBounds.l,
        _t = $P.MagnifierBounds.t,
        _w = $P.MagnifierBounds.w,
        _h = $P.MagnifierBounds.w;
    var cW = $P.MagnifierBounds.captureWidth;
    me.setStyles("position:absolute;overflow:hidden;z-index:8;background-size:" + _w + "px " + _h + "px");
    me.setStyle("background-image", "url('" + $APP_PATH + "NotPacked/images/tools/loupe5.svg')");
    me.transition("scale", 0.2);

    var cnvs = new GUIElement(me, "canvas");
    cnvs.setStyles("position:absolute");
    cnvs.width = _w;
    cnvs.height = _h;
    me.addContent(cnvs);
    var ctx = cnvs.getDocObject().getContext('2d');

    var xx = 0,
        yy = 0;

    var dragmove = function(ev) {
        _l += (ev.pageX - xx);
        _t += (ev.pageY - yy);
        me.setStyle("left", _l + "px");
        me.setStyle("top", _t + "px");
        xx = ev.pageX;
        yy = ev.pageY;
    };

    var dragdown = function(ev) {
        xx = ev.pageX;
        yy = ev.pageY;
        me.addMoveEvent(dragmove, window);
        me.addUpEvent(dragup, window);
    };

    var dragup = function(ev) {
        me.removeMoveEvent(dragmove, window);
        me.removeUpEvent(dragup, window);
    };

    me.addDownEvent(dragdown);

    _canvas.getDocObject().parentNode.appendChild(me.getDocObject());
    me.applyTransitionIN();


    me.getBounds = function() {
        return {
            "left": _l,
            "top": _t,
            "width": _w,
            "height": _h
        };
    };

    me.init = function() {
        me.setBounds(_l, _t, _w, _h);
    };

    me.magnifierPaint = function(coords) {
        ctx.beginPath();
        ctx.clearRect(0, 0, _w, _h);
        if ((coords) && (!isNaN(coords.x)) && (!isNaN(coords.y)))
            if ((coords) && (!isNaN(coords.x)) && (!isNaN(coords.y)))
                ctx.drawImage(_canvas.getDocObject(),
                    coords.x - cW/2, coords.y - cW/2, cW, cW, 0, 0, _w, _h);
    };


    me.init();

}
function DemoModeManager(_canvas) {
    var me = this;
    var fingers = [];
    var max = 3;

    me.setDemoMode = function(_demo) {
        if (_demo) {
            for (var i = 0; i < max; i++) {
                fingers[i] = new DemoModePanel(_canvas, i);
                fingers[i].applyTransitionOUT();
            }
        } else if (fingers.length > 0) {
            for (var i = 0; i < max; i++) {
                fingers[i].removeEvents();
                fingers[i].close();
                fingers[i] = null;
            }
            fingers = [];
        }
    };
    me.getDemoMode = function() {
        return (fingers.length > 0);
    };


}
function DemoModePanel(_canvas, _touchNum) {
    $U.extend(this, new Panel(_canvas.getDocObject()));
    var me = this;
    me.setAttr("className", "pointerDIV");
    me.transition("scale", 0.1);
    me.setTouchNumber(_touchNum);
    me.setPreventDefault(false);
    var docObject = me.getDocObject();

    var dragmove = function(ev) {
        if (ev) {
            var w = docObject.offsetWidth;
            var h = docObject.offsetHeight;
            me.setStyle("left", (ev.pageX - w / 2) + "px");
            me.setStyle("top", (ev.pageY - h / 2) + "px");
        }
    };
    var dragdown = function(ev) {
        if (ev) {
            var w = docObject.offsetWidth;
            var h = docObject.offsetHeight;
            me.setStyle("left", (ev.pageX - w / 2) + "px");
            me.setStyle("top", (ev.pageY - h / 2) + "px");
            me.applyTransitionIN();
        }
    };
    var dragup = function(ev) {
        me.applyTransitionOUT();
    };

    me.removeEvents = function() {
        me.removeMoveEvent(dragmove, window);
        me.removeUpEvent(dragup, window);
        me.removeDownEvent(dragdown, window);
    };

    me.addDownEvent(dragdown, window);
    me.addMoveEvent(dragmove, window);
    me.addUpEvent(dragup, window);

    document.body.parentNode.appendChild(me.getDocObject());

}
function NamesManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var Cn = canvas.getConstruction();
    var visible = false;
    var left = 0,
        top = 0,
        width = 500,
        height = 170;

    var close = function() {
        canvas.selectNameBtn(false);
    }
    me.isVisible = function() {
        return panel.isVisible()
    }
    me.show = function() {
        panel.show()
    }
    me.hide = function() {
        panel.hide();
    }
    me.refresh = function() {
        panel.refreshkeyboard()
    }
    me.getName = function() {
        // console.log(panel.getName());
        return panel.getName();
    }
    me.setName = function(_o) {
        if (panel.isVisible()) {
            _o.setName(panel.getName());
            _o.setShowName(true);
            panel.refreshkeyboard();
        }
    }
    me.replaceName = function(_o) {
        if ((panel.isVisible()) && (panel.isEditMode())) {
            _o.setName(panel.getName());
            _o.setShowName(true);
            panel.refreshkeyboard();
            return true;
        }
        return false;
    }
    me.setObserver = function(_o) {
        if (panel != null) panel.setObserver(_o);
    }

    left = canvas.getWidth() - width - 5;
    top = canvas.getHeight() - height - canvas.prefs.controlpanel.size - 5;

    var panel = new NamesPanel(window.document.body, left, top, width, height, Cn.getNames, close);

}
function NamesPanel(_owner, _l, _t, _w, _h, _observerproc, _closeproc) {
    var me = this;
    var getNames = _observerproc;
    var cb_src = $APP_PATH + "NotPacked/images/dialog/closebox.svg"; // Closebox image
    // var tl_str = "DG-Blocks"; // Window title
    var tl_height = 30; // Title bar height
    var cb_width = 20; // Close box width
    var cb_margin = 5; // Close box margin from right
    var tb_height = 0; // Bottom toolbar height
    var left = _l,
        top = _t,
        width = _w,
        height = _h;
    var replace_mode = false; // edit mode
    var tabs = []; // tab set
    var mods = []; // modifiers
    var keys = []; // keyboard keys
    var modtab = ["", "'", "''", "\u2080"];
    var tab_width = 60; // tab width
    var tab_height = 25; // tab height
    var tab_gap = 5; // gap between tabs
    var tab_left_margin = 70; // space before tabs
    var mod_width = 50; // modifier width
    var mod_height = 25; // modifier height
    var mod_margin = 10; // modifier left and right margin
    var key_width = 35; // keyboard key width
    var key_height = 30; // keyboard key height
    // var key_vmargin = 5;
    var current_tab = -1; // Current selected tab
    var current_mod = -1; // Current selected modifier
    var current_key = -1; // Current key
    var kb_margins = 10; // margins around keyboard

    var cbox_left = 5;
    var cbox_top = 2;
    var cbox_width = 60;
    var cbox_height = 30;

    me.isEditMode = function() {
        return replace_mode
    };
    var setEdit = function(_b) {
        replace_mode = _b
    };

    me.setObserver = function(_o) {
        getNames = _o;
    };

    me.setbounds = function(l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        wp.bnds(l, t, w, h);
        tl.bnds(0, 0, w, tl_height);
        // tl.stl("line-height", tl_height + "px");
        cb.bnds(w - cb_width - cb_margin, (tl_height - cb_width) / 2, cb_width, cb_width);
        md.bnds(w - mod_width - 2 * mod_margin, tl_height, mod_width + 2 * mod_margin, h - tl_height - tb_height);
        kb.bnds(0, tl_height, w - mod_width - 2 * mod_margin, h - tl_height - tb_height);
        tb.bnds(0, h - tb_height, w, tb_height);
    }

    me.getBounds = function() {
        return {
            l: left,
            t: top,
            w: width,
            h: height
        }
    }

    me.hide = function() {
        setTimeout(function() {
            wp.stls("transform:scale(0)");
        }, 1);
        setTimeout(function() {
            _owner.removeChild(wp);
            _closeproc();
            // _owner.removeChild(cb);
        }, 210);
    };

    me.show = function() {
        if (wp.parentNode === null) _owner.appendChild(wp);

        // if (cb.parentNode === null) _owner.appendChild(cb);
        setTimeout(function() {

            wp.stls("transform:scale(1)");

            // cb.stls("transform:scale(1)");
        }, 1);
    };

    me.isVisible = function() {
        return (wp.parentNode !== null)
    };

    var xx = 0;
    var yy = 0;

    var dragmove = function(ev) {
        ev.preventDefault();
        me.setbounds(left + ev.pageX - xx, top + ev.pageY - yy, width, height);
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    var resizemove = function(ev) {
        ev.preventDefault();
        var w = (width + ev.pageX - xx < 100) ? width : (width + ev.pageX - xx);
        me.setbounds(left, top, w, height);
        xx = ev.pageX;
    }

    var resizedown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        window.addEventListener('touchmove', resizemove, false);
        window.addEventListener('touchend', resizeup, false);
        window.addEventListener('mousemove', resizemove, false);
        window.addEventListener('mouseup', resizeup, false);
    }

    var resizeup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', resizemove, false);
        window.removeEventListener('touchend', resizeup, false);
        window.removeEventListener('mousemove', resizemove, false);
        window.removeEventListener('mouseup', resizeup, false);
    }


    // var createDiv = function() {
    //     var el = document.createElement("div");
    //     el.event_proc = [];
    //     el.stl = function(_p, _v) {
    //         el.style.setProperty(_p, _v);
    //     };
    //     el.att = function(_a, _v) {
    //         el[_a] = _v;
    //     };
    //     el.stls = function(_st) {
    //         var t = _st.split(";");
    //         for (var i = 0, len = t.length; i < len; i++) {
    //             var a = t[i].split(":");
    //             el.stl(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
    //         }
    //     }
    //     el.bnds = function(l, t, w, h) {
    //         el.stls("left:" + l + "px;top:" + t + "px;width:" + w + "px;height:" + h + "px");
    //     }
    //     el.add = function(_ch) {
    //         el.appendChild(_ch);
    //     }
    //     el.md = function(_p) {
    //         el.addEventListener('touchstart', _p, false);
    //         el.addEventListener('mousedown', _p, false);
    //         el.event_proc.push(_p);
    //     }
    //     el.mm = function(_p) {
    //         el.addEventListener('touchmove', _p, false);
    //         el.addEventListener('mousemove', _p, false);
    //         el.event_proc.push(_p);
    //     }
    //     el.mu = function(_p) {
    //         el.addEventListener('touchend', _p, false);
    //         el.addEventListener('mouseup', _p, false);
    //         el.event_proc.push(_p);
    //     }
    //     el.rmevt = function() {
    //         for (var i = 0; i < el.event_proc.length; i++) {
    //             el.removeEventListener('touchstart', el.event_proc[i], false);
    //             el.removeEventListener('mousedown', el.event_proc[i], false);
    //             el.removeEventListener('touchmove', el.event_proc[i], false);
    //             el.removeEventListener('mousemove', el.event_proc[i], false);
    //             el.removeEventListener('touchend', el.event_proc[i], false);
    //             el.removeEventListener('mouseup', el.event_proc[i], false);
    //         }
    //     }
    //     return el;
    // };

    var wp = $U.createDiv(); // main div wrapper
    var tl = $U.createDiv(); // title bar div
    var cb = $U.createDiv(); // close box div
    var md = $U.createDiv(); // modifiers div
    var kb = $U.createDiv(); // Keyboard div
    var rl = $U.createDiv(); // resize vertical line div
    var tb = $U.createDiv(); // bottom toolbar div



    wp.stls("position:absolute;z-index:9000;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:scale(0)");
    tl.stls("background-color:rgba(210,210,210,1);position:absolute");
    cb.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    cb.stl("background-image", "url(" + cb_src + ")");
    md.stls("background-color:rgba(230, 230, 230, 0.9);position:absolute");
    kb.stls("background-color:rgba(230, 230, 230, 0.9);position:absolute");
    tb.stls("background-color:rgba(200, 200, 200, 0.9);position:absolute");

    var showCurrentKey = function() {
        if (current_key === -1) return;
        var nmes = getNames(); // All names already used
        // console.log("showCurrentKey: "+nmes);
        for (var i = current_key; i < keys.length; i++) {
            if (nmes.indexOf(keys[i].key) === -1) {
                current_key = i;
                keys[i].stls("background-color:rgba(50,50,50,1);color:rgba(230,230,230,1)");
                return;
            }
        }
        current_key = -1;
    };

    var seton = function(_i) {
        var t = keys[_i];
        t.stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
        t.rmevt();
        t.md(function() {
            selectkey(_i);
        });
    };

    me.refreshkeyboard = function() {
        var nmes = getNames(); // All names already used
        for (var i = 0; i < keys.length; i++) {
            var t = keys[i];
            if (nmes.indexOf(keys[i].key) != -1) {
                t.rmevt();
                t.stls("background-color:rgba(200,200,200,1);color:rgba(150,150,150,1)");
            } else {
                seton(i);
                // t.stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
            }
        }
        showCurrentKey();
        if (current_key === -1) {
            current_key = 0;
            showCurrentKey();
        }
    }

    var selectkey = function(_i) {
        current_key = _i;
        me.refreshkeyboard();
    }

    me.getName = function() {
        if (current_key !== -1) return keys[current_key].key
        else return "P"
    }


    var createkey = function(_s, _x, _y) {
        var t = $U.createDiv();
        var i = keys.length;
        t.md(function() {
            selectkey(i);
        });
        t.stls("border: 1px solid #b4b4b4;background-color:rgba(200,200,200,1);color:rgba(30,30,30,1);position:absolute;border-radius:5px;width:" + key_width + "px;height:" + key_height + "px;font-size: 18px;font-weight:normal;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + key_height + "px;vertical-align:middle;top:" + _y + "px;left:" + _x + "px");
        t.innerHTML = _s;
        t.key = _s;
        kb.add(t);
        keys.push(t);
    }


    var initkeyboard = function() {
        // var l = tabs[current_tab].letters;
        keys = [];
        var kbd = tabs[current_tab].letters;
        var m = mods[current_mod].car;
        kb.innerHTML = "";
        var h = (height - tl_height - tb_height);
        var vgap = (h - kbd.length * key_height) / (kbd.length + 1);
        for (var i = 0; i < kbd.length; i++) {
            var w = width - mod_width - 2 * mod_margin;
            var hgap = (w - kbd[i].length * key_width) / (kbd[i].length + 1);
            for (var j = 0; j < kbd[i].length; j++) {
                createkey(kbd[i][j] + m, hgap + j * (key_width + hgap), vgap + i * (key_height + vgap));
            }
        }
        current_key = 0;
        me.refreshkeyboard();
    }

    var select_mod = function(_s) {
        current_mod = _s;
        for (var i = 0; i < mods.length; i++) {
            mods[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
        };
        mods[_s].stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
        initkeyboard();
    };

    var createmod = function(_c, _m) {
        var t = $U.createDiv();
        var h = (height - tl_height - tb_height);
        var gap = (h - _m.length * mod_height) / (_m.length + 1);
        var i = mods.length;
        t.md(function() {
            select_mod(i)
        });
        t.stls("border: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-radius:5px;width:" + mod_width + "px;height:" + mod_height + "px;font-size: 18px;font-weight:bold;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + mod_height + "px;vertical-align:middle;top:" + (gap + i * (mod_height + gap)) + "px;left:" + mod_margin + "px");
        t.innerHTML = _c + _m[i];
        t.car = _m[i];
        md.add(t);
        mods.push(t);
    }

    var initmods = function(_c, _m) {
        mods = [];
        md.innerHTML = "";
        for (var i = 0; i < _m.length; i++) {
            createmod(_c, _m);
        };
    }

    var select_tab = function(_s) {
        if (_s !== current_tab) {
            current_tab = _s;
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
            };
            tabs[_s].stls("background-color:rgba(230,230,230,1);color:rgba(30,30,30,1)");
            initmods(tabs[_s].letters[0][0], modtab);
            select_mod(0);

        }
    }



    var createtab = function(_n, _c) {
        var t = $U.createDiv();
        var i = tabs.length;
        t.md(function() {
            select_tab(i)
        });
        t.stls("border-left: 1px solid #b4b4b4;border-top: 1px solid #b4b4b4;border-right: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-top-right-radius:10px;width:" + tab_width + "px;height:" + tab_height + "px;font-size: 18px;font-weight:bold;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + tab_height + "px;vertical-align:middle;top:" + (tl_height - tab_height) + "px;left:" + (tab_left_margin + tabs.length * (tab_width + tab_gap)) + "px");
        t.innerHTML = _n;
        t.letters = _c.split("_");
        for (var k = 0; k < t.letters.length; k++) {
            t.letters[k] = t.letters[k].split("");
        }
        tl.add(t);
        tabs.push(t);
    }



    createtab("A", "ABCDEFGHI_JKLMNOPQR_STUVWXYZ");
    createtab("a", "abcdefghi_jklmnopqr_stuvwxyz");
    createtab("\u0394", "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398_\u0399\u039A\u039B\u039C\u039D\u039E\u039F\u03A0_\u03A1\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9");
    createtab("\u03B4", "\u03B1\u03B2\u03B3\u03B4\u03B5\u03B6\u03B7\u03B8\u03B9_\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF\u03C0\u03C1_\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9");
    select_tab(0);

    cb.md(me.hide);
    wp.md(dragdown);
    wp.mu(dragup);

    me.setbounds(left, top, width, height);

    wp.add(tl);
    wp.add(md);
    wp.add(kb);
    wp.add(tb);
    wp.add(cb);
    var editbox = new Checkbox(wp, cbox_left, cbox_top, cbox_width, cbox_height, replace_mode, "\u270D", setEdit);

    editbox.setTextFontSize(28);
    editbox.setTextColor("#252525");

    // me.show();

    // me.DIV = md;
}
   function BlocklyManager(_canvas) {
       var me = this;
       var canvas = _canvas;
       var Cn = canvas.getConstruction();
       var panel = null;
       var path1 = $APP_PATH + "NotPacked/thirdParty/Blockly/";
       var path2 = $APP_PATH + "Blockly/"
       var scripts = [path1 + "blockly_compressed.js",
           path1 + "blocks_compressed.js",
           path1 + "javascript_compressed.js",
           path1 + "msg/js/" + $L.blockly.lang,
           path1 + "perso/hacks.js",
           path1 + "perso/blocks/core.js",
           path1 + "perso/blocks/aspect.js",
           path1 + "perso/blocks/geometry.js",
           path1 + "perso/blocks/expressions.js",
           path1 + "perso/blocks/lists.js",
           path1 + "perso/blocks/turtle.js",
           path1 + "perso/blocks/globals.js",
           path1 + "perso/blocks/text.js",
           path1 + "perso/js/core.js",
           path1 + "perso/js/aspect.js",
           path1 + "perso/js/geometry.js",
           path1 + "perso/js/expressions.js",
           path1 + "perso/js/lists.js",
           path1 + "perso/js/turtle.js",
           path1 + "perso/js/globals.js",
           path1 + "perso/js/text.js"
       ];
       var source = "";
       var selected = "";
       var workspace = null;
       var OBJ = null;
       var from_edit = false;
       var turtle = new TurtleObject(canvas);
       // var turtle=null;


       // *******************************************************
       // ****************** PRINT SOURCE ***********************
       // *******************************************************

       var printPanel = null;

       var closePrint = function() {
           if (printPanel)
               printPanel.close();
           printPanel = null;
       };

       me.print = function(_m) {
           if (!printPanel)
               printPanel = new PrintPanel(_canvas, closePrint);
           printPanel.setText(_m);
       };

       // *******************************************************
       // **************** END PRINT SOURCE *********************
       // *******************************************************


       var workspace2SVG = function() {
           var aleph = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
           aleph.removeAttribute("width");
           aleph.removeAttribute("height");
           if (aleph.children[0] !== undefined) {
               aleph.removeAttribute("transform");
               aleph.children[0].removeAttribute("transform");
               aleph.children[0].children[0].removeAttribute("transform");
               var styleTXT = '.blocklyDraggable {}\n';
               styleTXT += Blockly.Css.CONTENT.join('\n');
               styleTXT = styleTXT.replace(/<<<PATH>>>/g, "");
               styleTXT = styleTXT.replace(/&gt;/g, " ");
               styleTXT = styleTXT.replace(/>/g, " ");
               var linkElm = document.createElement('style');
               var cssTextNode = document.createTextNode(styleTXT);
               linkElm.appendChild(cssTextNode);
               aleph.insertBefore(linkElm, aleph.firstChild);
               var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
               var svg = new XMLSerializer().serializeToString(aleph);
               svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="0 0 ' + bbox.width + ' ' + bbox.height + '">' + svg + '</svg>';
               svg = svg.replace(/<style[^>]*>/g, "<style>");
               svg = svg.replace(/&nbsp;/g, " ");
               return svg;
           }
           return null;
       }


       var initBlockly = function() {
           Blockly.Block.prototype.firstadd = true;
           // Blockly.Block.prototype.varname = "";
           Blockly.Block.prototype.name = function() {
               return this.getFieldValue("name");
           };
           Blockly.getObj = function() {
               return OBJ;
           };
           Blockly.Block.prototype.isInConstruction = function() {
               return ((this.getSurroundParent()) &&
                   (this.getSurroundParent().type === "dgpad_construction"));
           };
           Blockly.Globals = { NAME_TYPE: "GLOBAL", NAMES: Cn.getInterpreter().BLK_GLOB_TAB, RENAME: Cn.getInterpreter().BLK_GLOB_RENAME };
           Blockly.Globals.flyoutCategory = function(workspace) {
               var variableList = Blockly.Globals.NAMES();
               variableList.sort(goog.string.caseInsensitiveCompare);
               goog.array.remove(variableList, Blockly.Msg.VARIABLES_DEFAULT_NAME);
               variableList.unshift(Blockly.Msg.VARIABLES_DEFAULT_NAME);
               var xmlList = [];
               var block = goog.dom.createDom('block');
               block.setAttribute('type', 'dgpad_global_inc');
               block.setAttribute('gap', 24);

               // var num = goog.dom.createDom('block');
               // num.setAttribute('type', 'math_number');
               // var field = goog.dom.createDom('field', null, "1");
               // field.setAttribute('name', 'NUM');
               // num.appendChild(field);
               // var cnx = num.outputConnection;
               // block.getInput('NAME').connection.connect(cnx);
               // block.connect(num);




               xmlList.push(block);
               for (var i = 0; i < variableList.length; i++) {
                   if (Blockly.Blocks['dgpad_global_set']) {
                       var block = goog.dom.createDom('block');
                       block.setAttribute('type', 'dgpad_global_set');
                       if (Blockly.Blocks['dgpad_global_get']) {
                           block.setAttribute('gap', 8);
                       }
                       var field = goog.dom.createDom('field', null, variableList[i]);
                       field.setAttribute('name', 'VAR');
                       block.appendChild(field);
                       xmlList.push(block);
                   }
                   if (Blockly.Blocks['dgpad_global_get']) {
                       var block = goog.dom.createDom('block');
                       block.setAttribute('type', 'dgpad_global_get');
                       if (Blockly.Blocks['dgpad_global_set']) {
                           block.setAttribute('gap', 24);
                       }
                       var field = goog.dom.createDom('field', null, variableList[i]);
                       field.setAttribute('name', 'VAR');
                       block.appendChild(field);
                       xmlList.push(block);
                   }
               }
               return xmlList;
           };
           Blockly.dgpad = new function() {
               var me = this;
               var NMS = [];
               me.VARS = []; // Pour collecter les enfants du scripts
               me.PARS = []; // Pour collecter les parents du scripts
               me.ZC = canvas;
               me.CN = canvas.getConstruction();
               me.getBounds = panel.getBounds;
               me.pushVARS = function(_n) {
                   var o = me.CN.find(_n);
                   if (o) me.VARS.push(o.getVarName());
               };
               me.pushPARS = function(_n) {
                   var o = me.CN.find(_n);
                   if (o) me.PARS.push(o.getVarName());
               };
               me.getNames = function() {
                   return NMS;
               };
               me.getObj = function() {
                   return OBJ;
               };
               me.addName = function(_n) {
                   NMS.push(_n);
               };
               me.getObjectsFromType = function(_t) {
                   return me.CN.getObjectsFromType(_t);
               };
               me.popupArray = function(_t) {
                   // console.log("objectPopup :"+_t);
                   var props = me.CN.getObjectsFromType(_t);
                   var tab = [];
                   var mod = OBJ.blocks.getMode()[panel.getMode()];
                   for (var i = 0; i < props.length; i++) {
                       // On doit absolument empécher l'autoréférence en mode Expression :
                       if ((mod !== "oncompute") || (OBJ != props[i]))
                           tab.push([props[i].getName(), props[i].getVarName()]);
                   };
                   if (tab.length === 0) tab.push(["? ", null]);
                   return (tab);
               };
               me.objectPopup = function(_t) {
                   return (new Blockly.FieldDropdown(me.popupArray(_t)));
               };
               me.getName = canvas.namesManager.getName;
               me.refresh = canvas.namesManager.refresh;
           };
           Blockly.bindEvent_(panel.DIV, "mouseup", null, onmouseup);
           canvas.namesManager.setObserver(Blockly.dgpad.getNames);
           Blockly.custom_menu_printSource = function() {
               me.print(Blockly.JavaScript.workspaceToCode(workspace).replace(/^\s*var\s*\w+\s*;/gm, "").replace(/blockly_var_/g, "").trim() + "\n");
           };
           Blockly.custom_menu_copyAll = function() {
               var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
               xml = Blockly.Xml.domToText(xml);
               localStorage.setItem("blockly_clipboard", xml);

               // workspace2PNG();


               // var aa = new XMLSerializer().serializeToString(Blockly.svg);
               // prompt(aa);
           };

           Blockly.custom_menu_print = function() {
               var svg = workspace2SVG();
               // svg = svg.replace(/&gt;/g, "@@@@GT@@@@");
               // svg = svg.replace(/&lt;/g, "@@@@LT@@@@");
               var svgsrc = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
               svgsrc += svg;

               if (window.$OS_X_APPLICATION) {
                   interOp.saveBlocklySVG(svgsrc)
               } else {
                   var lnk = ($iOS_APPLICATION) ? "data-svg:" : "data:image/svg+xml,";
                   lnk += ($iOS_APPLICATION) ? $U.base64_encode(svgsrc) : encodeURIComponent(svgsrc);
                   var txt = '<br><br><a href="' + lnk + '" style="-webkit-touch-callout:default;font-size:18px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank" download="DgpadSvgImage.svg" ><b>' + $L.blockly.downloadSVG + '</b></a>.';
                   $U.alert(txt);
               }
           };
           Blockly.custom_menu_copySel = function() {
               if (Blockly.selected) {
                   var xml = goog.dom.createDom('xml');
                   var blks = Blockly.Xml.blockToDom(Blockly.selected);
                   var xy = Blockly.selected.getRelativeToSurfaceXY();
                   blks.setAttribute('x', Math.round(xy.x) + 5);
                   blks.setAttribute('y', Math.round(xy.y) + 5);
                   xml.appendChild(blks);
                   localStorage.setItem("blockly_clipboard", Blockly.Xml.domToText(xml));
               }
           };
           Blockly.custom_menu_paste = function() {
               from_edit = false;
               var xml = localStorage.getItem("blockly_clipboard");
               var elt = Blockly.Xml.textToDom(xml);
               Blockly.Xml.domToWorkspace(elt, Blockly.mainWorkspace);
           };
       };

       var changeCSS = function(cname, property, value) {
           var cols = document.getElementsByClassName(cname);
           for (i = 0; i < cols.length; i++) {
               cols[i].style[property] = value;
           }
       }

       var showCategory = function(name, bool) {
           var cat = { "turtle": 7, "texts": 8, "inputs": "b" };
           var elt = document.getElementById(":" + cat[name]);
           if (bool) {
               elt.style["visibility"] = "visible";
               elt.style["height"] = "25px";
               if (name === "turtle") turtle.show(OBJ);
               // turtle = new TurtleObject(canvas, OBJ);
               canvas.paint();
           } else {
               elt.style["visibility"] = "hidden";
               elt.style["height"] = "0px";
               if (name === "turtle") turtle.hide();
               // turtle = null;
               canvas.paint();
           }
       };

       var modifyCSSRule = function(className, property, value) {
           var ss = document.styleSheets;
           for (var i = 0; i < ss.length; i++) {
               var ss = document.styleSheets;
               var rules = ss[i].cssRules || ss[i].rules;
               for (var j = 0; j < rules.length; j++) {
                   if (rules[j].selectorText === className) {
                       rules[j].style[property] = value;
                   }
               }
           }
       }

       var onload = function() {
           setTimeout(function() {
               // Blockly.FieldTextInput.FONTSIZE = 36;
               workspace = Blockly.inject(panel.DIV, {
                   media: $APP_PATH + "NotPacked/thirdParty/Blockly/media/",
                   toolbox: panel.XML.firstChild,
                   zoom: {
                       controls: true,
                       wheel: true,
                       startScale: 1.0,
                       maxScale: 3,
                       minScale: 0.3,
                       scaleSpeed: 1.1
                   },
                   trashcan: true
                       // toolbox: document.getElementById('toolbox')
               });
               // Blockly.Xml.domToWorkspace(workspace, document.getElementById('startBlocks'));
               initBlockly();
               workspace.addChangeListener(onchanged);
               changeCSS("blocklyToolboxDiv", "z-index", "9001");
               // changeCSS("blocklyToolboxDiv", "background", "#FEFEFE");
               changeCSS("blocklyMainBackground", "fill", "#FEFEFE");
               changeCSS("blocklyMainBackground", "fill-opacity", "0.0");
               changeCSS("blocklySvg", "background-color", "rgba(0,0,0,0)");
               modifyCSSRule(".blocklyText", "font-family", "Verdana, Geneva, sans-serif");
               changeCSS("blocklyTreeLabel", "font-family", "Verdana, Geneva, sans-serif");
               modifyCSSRule(".blocklyWidgetDiv", "z-index", "9002");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "border-radius", "10px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "border", "1px solid gray");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "background", "rgba(250,250,250,0.9)");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "font", "normal 16px Verdana, Geneva, sans-serif");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-hover", "padding-bottom", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-hover", "padding-top", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "padding-bottom", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "padding-top", "4px");

               // On cache la catégorie "Tortue" :
               showCategory("turtle", false);
               showCategory("texts", false);
               showCategory("inputs", false);

               showCallback();
           }, 200);
       };

       var onmouseup = function() {
           if ((Blockly.selected) && (Blockly.selected.onselect) && (selected != Blockly.selected)) {
               Blockly.selected.onselect();
               selected = Blockly.selected;
           } else if ((selected != Blockly.selected)) {
               selected = "";
           }
       }


       // Appelée chaque fois que quelque chose change
       // dans le workspace de Blockly :
       var onchanged = function() {
           // console.log("onchanged : " + OBJ.getName());
           // Bloquer l'évenement "onchanged" quand on vient d'éditer un objet :
           if (from_edit) {
               from_edit = false;
               return
           }
           if (OBJ) {
               var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               if (xml.innerHTML === "") {
                   OBJ.blocks.setBehavior(mod, null, null, null);
                   me.resetTurtle(OBJ.getVarName());
               } else {
                   xml = Blockly.Xml.domToText(xml);
                   Blockly.dgpad.VARS = [];
                   Blockly.dgpad.PARS = [];
                   var snc = Blockly.JavaScript.workspaceToCode(workspace);
                   OBJ.blocks.setBehavior(mod, xml, snc, null);
                   OBJ.blocks.setChilds(mod, Blockly.dgpad.VARS);
                   OBJ.blocks.setParents(mod, Blockly.dgpad.PARS);
               }
               Cn.orderObjects();
               if (mod !== "onprogram") {
                   OBJ.blocks.evaluate(mod);
                   Cn.computeAll();
                   canvas.paint();
               }
           }
       };

       var addScript = function(_scpnum) {
           var next = _scpnum + 1;
           var parent = document.getElementsByTagName("head")[0];
           var s = document.createElement("script");
           s.type = "text/javascript";
           s.src = scripts[_scpnum];
           s.onload = (next === scripts.length) ? onload : function() {
               addScript(next);
           };
           parent.appendChild(s);
       };

       // var injectXML = function(_s) {
       //     window.document.getElementById("dgpad_xml").innerHTML = _s;
       // };




       var loadBlockly = function() {
           panel = new BlocklyPanel(window.document.body, canvas, hideCallback, currentTabCallBack, (canvas.getHeight() - canvas.prefs.controlpanel.size));
           // Load xml formatted toolbox :
           var request = new XMLHttpRequest();
           request.open("GET", path1 + "perso/Blockly_toolbox.xml", true);
           request.send(null);
           request.onload = function(e) {
               var xml = request.responseText;
               // Internationalize strings in toolbox :
               for (var obj in $L.blockly) {
                   var key = "$L.blockly." + obj.toString();
                   xml = xml.split(key).join($L.blockly[obj]);
               }
               // injectXML(xml);
               panel.XML.innerHTML = xml;
               // var parser = new DOMParser();
               // var xml=parser.parseFromString(request.responseText, "application/xml");
               // panel.DIV.parentNode.appendChild(xml.firstChild);
               // Load scripts synchroniously :

               addScript(0);
           }
       };

       var showCurrentTab = function() {
           Blockly.mainWorkspace.clear();
           panel.setMode(OBJ.blocks.getMode(), OBJ.blocks.getCurrent());
           var xml = OBJ.blocks.getCurrentXML();
           if (xml) {
               var elt = Blockly.Xml.textToDom(xml);
               Blockly.Xml.domToWorkspace(elt, workspace);
           }
           setTimeout(function() {
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               showCategory("turtle", (mod === "onlogo"));
               showCategory("texts", (mod === "onlogo") || (mod === "onprogram"));
               showCategory("inputs", (mod === "onprogram"));
           }, 300)
       };


       // Appelé par le panel chaque fois qu'on change d'onglet :
       var currentTabCallBack = function() {
           Blockly.mainWorkspace.clear();
           if (OBJ) {
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               OBJ.blocks.setCurrent(mod);
               var xml = OBJ.blocks.getXML(mod);
               if (xml) {
                   var elt = Blockly.Xml.textToDom(xml);
                   Blockly.Xml.domToWorkspace(elt, workspace);
               }
               showCategory("turtle", (mod === "onlogo"));
               showCategory("texts", (mod === "onlogo") || (mod === "onprogram"));
               showCategory("inputs", (mod === "onprogram"));


               // Blockly.Toolbox.dispose();
               // Blockly.mainWorkspace.updateToolbox(document.getElementById('toolbox_turtle'))
           }
           from_edit = true;
       };

       me.reload_workspace = function() {
           currentTabCallBack();
       }

       var hideCallback = function() {
           showCategory("turtle", false);
           showCategory("texts", false);
           showCategory("inputs", false);
           changeCSS("blocklyToolboxDiv", "visibility", "hidden");
           Blockly.ContextMenu.hide();
       };

       var showCallback = function() {
           setTimeout(function() {
               changeCSS("blocklyToolboxDiv", "visibility", "visible");
               panel.setTitle(OBJ.getName());
           }, 320);
           showCurrentTab();
       };



       var show = function() {
           if (panel === null) loadBlockly()
           else {
               panel.show();
               showCallback();
           }
       }

       me.paintTurtle = function() {
           turtle.paint();
       };

       // me.computeTurtle = function() {
       //     if (turtle) turtle.compute();
       // };

       me.changeTurtleUVW = function(_n, _u, _v, _w) {
           turtle.changeUVW(_n, _u, _v, _w);
       };

       me.changeTurtlePT = function(_name, _pt) {
           turtle.changePT(_name, _pt);
       };

       me.resetTurtle = function(_name) {
           turtle.reset(_name);
       };

       // Appelée chaque fois qu'on clique sur un objet
       // pendant que le panel est ouvert :
       me.tryEdit = function(_o) {
           // clearOBJ(); // Effacement éventuel du dernier objet
           if (panel && (!panel.isHidden())) {
               if (Blockly.selected && Blockly.selected.getName) {
                   Blockly.selected.getName(_o)
               } else {
                   me.edit(_o);
               }
               return true
           }
           return false;
       }

       me.edit = function(_o) {
           OBJ = _o;
           from_edit = true;
           show();
       }
   }
function BlocklyPanel(_owner, _canvas, _closeCallback, _currentTabCallBack, _height) {
    var me = this;
    var canvas = _canvas;
    var cb_src = $APP_PATH + "NotPacked/images/dialog/closebox.svg"; // Closebox image
    // var mn_src = $APP_PATH + "NotPacked/images/dialog/settings.svg"; // Settings image
    var rz_src = $APP_PATH + "NotPacked/images/dialog/resize.svg"; // Closebox image
    var tl_str = "DG-Blocks"; // Window title
    var tl_height = 28; // Title bar height
    var cb_width = 20; // Close box width
    var cb_margin_top = 3; // Margins from top
    var cb_margin_right = 5; // Margins from right
    // var mn_width = 20; // Settings box width
    // var mn_margin_top = 3; // Margins from top
    // var mn_margin_left = 5; // Margins from left
    var rz_width = 20; // Resize box width
    var rz_margin = 3; // Resize box margin
    var ph_margin = 10; // Panel margin from top and bottom
    var pl_margin = 10; // Panel margin from left
    var tb_height = 30; // Bottom toolbar height
    var left = 0,
        top = 0,
        width = 0,
        height = 0;

    var tabs = []; // tab set
    var tab_width = 80; // tab width
    var tab_height = 20; // tab height
    var tab_gap = 5; // gap between tabs
    var tab_left_margin = 133; // space before tabs
    var current_tab = -1; // Current selected tab


    me.getMode = function() {
        return current_tab;
    }


    me.setbounds = function(l, t, w, h) {

        var ch = canvas.getHeight() - tl_height;
        var cw = canvas.getWidth();
        left = (l + w < 20) ? 20 - w : ((l > cw - 20) ? cw - 20 : l);
        top = (t < 0) ? 0 : ((t > ch) ? ch : t);
        width = w;
        height = h;
        wp.bnds(l, t, w, h);
        tl.bnds(0, 0, w, tl_height);
        tl.stl("line-height", tl_height + "px");
        cb.bnds(w - cb_width - cb_margin_right, cb_margin_top, cb_width, cb_width);
        // mn.bnds(mn_margin_left, mn_margin_top, mn_width, mn_width);
        ct.bnds(0, tl_height + 1, w, h - tl_height - tb_height - 2);
        // rl.bnds(w - rl_width, 0, rl_width, h);
        tb.bnds(0, h - tb_height, w, tb_height);
        rz.bnds(w - rz_width - rz_margin, h - rz_width - rz_margin, rz_width, rz_width);
        var toolbox = document.getElementsByClassName('blocklyToolboxDiv')[0];

        if (toolbox !== undefined) {
            toolbox.style["left"] = (l + 1) + "px";
            toolbox.style["top"] = (t + tl_height + 2) + "px";
            toolbox.style["height"] = (h - tl_height - tb_height - 3) + "px";
        };
        // if (typeof Blockly !== 'undefined') Blockly.fireUiEvent(window, 'resize');
        // if (typeof Blockly !== 'undefined') Blockly.svgResize(Blockly.mainWorkspace);

        if (typeof Blockly !== 'undefined') {
            var flyout = document.getElementsByClassName("blocklyToolboxDiv");
            if (flyout && (flyout.length > 0)) {
                flyout[0].style["top"] = "0px";
                flyout[0].style["left"] = "0px";
                setTimeout(function() {
                    // Blockly.mainWorkspace.cleanUp();
                    // Blockly.svgResize(Blockly.mainWorkspace);
                    Blockly.mainWorkspace.resize();
                }, 200);
            }
        }


    }

    me.getBounds = function() {
        return {
            l: left,
            t: top,
            w: width,
            h: height
        }
    }

    me.hide = function(_ev) {
        // Reload workspace to avoid focuses inputs to be
        // displayed onto the dgpad canvas :
        canvas.blocklyManager.reload_workspace();
        _closeCallback();
        canvas.setNoMouseEvent(true);
        // _ev.stopPropagation();
        _ev.preventDefault();
        setTimeout(function() {
            wp.stls("transform:scale(0)");
        }, 1);
        setTimeout(function() {
            // if (typeof Blockly !== 'undefined') Blockly.fireUiEvent(window, 'resize');
            _owner.removeChild(wp);
        }, 210);
    };

    me.show = function() {
        if (wp.parentNode === null) _owner.appendChild(wp);
        setTimeout(function() {
            wp.stls("transform:scale(1)");
        }, 1);
        setTimeout(function() {
            me.setbounds(left, top, width, height)
        }, 310);
    };

    me.isHidden = function() {
        return (wp.parentNode === null);
    }

    me.setTitle = function(name) {
        tl.innerHTML = tl_str + " : " + name;
    }


    var xx = 0;
    var yy = 0;

    var dragmove = function(ev) {
        ev.preventDefault();
        me.setbounds(left + ev.pageX - xx, top + ev.pageY - yy, width, height);
        xx = ev.pageX;
        yy = ev.pageY;

    }

    var dragdown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    var resizemove = function(ev) {
        ev.preventDefault();
        var w = (width + ev.pageX - xx < 100) ? width : (width + ev.pageX - xx);
        var h = (height + ev.pageY - yy < 100) ? height : (height + ev.pageY - yy);
        me.setbounds(left, top, w, h);
        xx = ev.pageX;
        yy = ev.pageY;
        // if (typeof Blockly !== 'undefined') Blockly.fireUiEvent(window, 'resize');
        if (typeof Blockly !== 'undefined') window.dispatchEvent(new Event('resize'));
    }

    var resizedown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', resizemove, false);
        window.addEventListener('touchend', resizeup, false);
        window.addEventListener('mousemove', resizemove, false);
        window.addEventListener('mouseup', resizeup, false);
    }

    var resizeup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', resizemove, false);
        window.removeEventListener('touchend', resizeup, false);
        window.removeEventListener('mousemove', resizemove, false);
        window.removeEventListener('mouseup', resizeup, false);
    }

    var select_tab = function(_s) {
        // console.log(_s);
        if (_s !== current_tab) {
            current_tab = _s;
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
            };
            tabs[_s].stls("background-color:rgba(245,245,245,1);color:rgba(30,30,30,1)");
        }
    }

    // me.selectTab = function(_i) {
    //     select_tab(_i);
    // }

    var createtab = function(_n) {
        var t = $U.createDiv();
        var i = tabs.length;
        t.md(function(ev) {
            ev.preventDefault();
            select_tab(i);
            _currentTabCallBack();
        });
        t.stls("cursor:pointer;border-left: 1px solid #b4b4b4;border-bottom: 1px solid #b4b4b4;border-right: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-bottom-right-radius:10px;width:" + tab_width + "px;height:" + tab_height + "px;font-size: 14px;font-weight:normal;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + tab_height + "px;vertical-align:middle;top:" + (-1) + "px;left:" + (tab_left_margin + tabs.length * (tab_width + tab_gap)) + "px");
        t.innerHTML = _n;
        tb.add(t);
        tabs.push(t);
    }

    me.setMode = function(_tab, _c) {
        for (var i = 0; i < tabs.length; i++) {
            tb.rmv(tabs[i]);
        }
        tabs = [];
        current_tab = -1;
        for (var i = 0; i < _tab.length; i++) {
            createtab($L.blockly.tabs[_tab[i]]);
        }
        select_tab(_tab.indexOf(_c))
    }

    var wp = $U.createDiv(); // main div wrapper
    var tl = $U.createDiv(); // title bar div
    var mn = $U.createDiv(); // Contextual menu div
    var cb = $U.createDiv(); // close box div
    var ct = $U.createDiv(); // content div
    var rz = $U.createDiv(); // resize box div
    var tb = $U.createDiv(); // bottom toolbar div
    var xml = $U.createDiv(); // div for loading Blockly categories
    // xml.att("id", "dgpad_xml");
    xml.bnds(0, 0, 0, 0);

    wp.stls("position:absolute;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:scale(0);z-index:9000");
    tl.stls("cursor:all-scroll;background-color:rgba(210,210,210,1);position:absolute;font-size: 16px;font-family: Helvetica, Arial, sans-serif;text-shadow: 1px 1px 5px #777;text-align: center;white-space: pre-wrap;margin: 0px;vertical-align:middle");
    // mn.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    // mn.stl("background-image", "url(" + mn_src + ")");
    cb.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    cb.stl("background-image", "url(" + cb_src + ")");
    rz.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%;cursor:se-resize");
    rz.stl("background-image", "url(" + rz_src + ")");
    ct.stls("background-color:rgba(230, 230, 230, 0.4);position:absolute")
        // rl.stls("position:absolute;background-color:rgba(230,230,230,0.5);border: 0px;cursor:ew-resize")
    tb.stls("background-color:rgba(200, 200, 200, 0.9);position:absolute")
    tl.innerHTML = tl_str;

    cb.md(me.hide);
    // mn.md(_showsettings);
    tl.md(dragdown);
    tl.mu(dragup);
    rz.md(resizedown);
    rz.mu(resizeup);

    me.setbounds(pl_margin, ph_margin - 1, 600, _height - 2 * ph_margin);

    wp.add(xml);
    wp.add(tl);
    wp.add(ct);
    wp.add(tb);
    wp.add(cb);
    wp.add(mn);
    wp.add(rz);

    me.show();

    me.DIV = ct;
    me.XML = xml;
}
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


var $MAIN_INIT = function () {
    var tags = document.getElementsByTagName("canvas");
    var Elts = [];
    for (var i = 0, len = tags.length; i < len; i++) {
        Elts.push(tags[i]);
    }
    for (var i = 0, len = Elts.length; i < len; i++) {
        var myID = Elts[i].getAttribute("ID");
        if (myID !== null) {
            if (myID.startsWith("DGPad")) {
                $U.initCanvas(myID);
            }
        }
    }
}

window.onload = function() {
$MAIN_INIT();
};