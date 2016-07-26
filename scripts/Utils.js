// Global utils object "$U" accessible from everywhere :
var $U = {};

$U.doublePI = 2 * Math.PI;
$U.halfPI = Math.PI / 2;

$U.nullproc = function() {};


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
        scrn.innerHTML = "";
        if (inp.value !== "")
            _proc(_default, inp.value);
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
