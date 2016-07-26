//$NAMESPACE = {};
//for (var key in window) {
//    $NAMESPACE[key] = key;
//}

var $BODY_SCRIPT = document.getElementsByTagName("script");
$BODY_SCRIPT = $BODY_SCRIPT[$BODY_SCRIPT.length - 1];

if (!$APP_PATH) {
    // Si le script est le premier script DGPad trouvé dans la page :
    var $ECHO_SOURCE = false;
    // Désactive toutes les alertes sur cette fenêtre pour éviter que l'uiwebview
    // soit polluée par une alerte "popup" de filepicker :
    window.$ALERT = window.alert;
    window.alert = function() {}
        // Indique si DGPad s'ouvre dans l'application iOS/Android ou bien dans le navigateur :
    window.$APPLICATION = false;
    window.$iOS_APPLICATION = false;
    try {
        window.$APPLICATION = (window.parent && window.parent.$APPLICATION);
        window.$iOS_APPLICATION = (window.parent && window.parent.$iOS_APPLICATION);
    } catch (er) {}

    // Only for standard android keyboard :
    window.$STANDARD_KBD = {};

    // Seulement pour la plateforme Android, true dans ce cas :
    var $STOP_MOUSE_EVENTS = (navigator.userAgent.toLowerCase().indexOf("android") > -1);
    //    var $STOP_MOUSE_EVENTS = false;
    var $SCALE = 1;
    var $FPICKERFRAME = null;
    // Détermination sans autre globale du chemin 
    // de ce script (dans quel dossier il se trouve) :
    var $APP_PATH = document.getElementsByTagName("script");
    $APP_PATH = $APP_PATH[$APP_PATH.length - 1];
    $APP_PATH = $APP_PATH.src.split('/');
    $APP_PATH.pop();
    $APP_PATH = $APP_PATH.join("/") + "/";
    // $APP_PATH = $APP_PATH[$APP_PATH.length - 2] + '/';



    var $INCLUDED_FILES = [];

    var $HEADSCRIPT = function(_path) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = _path;
        script.async = false;
        document.getElementsByTagName('head')[0].appendChild(script);
        return script;
    }

    // Uniquement utilisé en mode developpement :
    var $INCLUDE = function(_fname, _external) {
        var purename = _fname;
        var files = "," + $INCLUDED_FILES.join(",") + ",";
        if (files.indexOf("," + _fname + ",") > -1) {
            // Le fichier a déjà été chargé précédemment :
            return;
        }
        //        if (arguments.length === 1) {
        //            // Il s'agit d'un fichier js local (propre à l'appli) :
        //            _fname = $APP_PATH + _fname;
        //
        //            // On teste si le fichier local existe :
        //            var request = new XMLHttpRequest();
        //            try {
        //                request.open("GET", _fname, false);
        //                request.send();
        //            } catch (e) {
        //                return;
        //            }
        //        }
        _fname = $APP_PATH + _fname;
        $HEADSCRIPT(_fname);
        $INCLUDED_FILES.push(purename);
    };


    var $LOADMAIN = function() {
        $HEADSCRIPT($APP_PATH + "Main.js");
    }

    // Le ou les fichiers de langues doivent être chargées en premier
    // le reste (Main.js) doit donc attendre que ces fichiers soient
    // interprétés. _proc est la fonction appelée lorsque ces scripts
    // sont chargés (onload) :
    var $LOADLANGUAGE = function() {
        // Charger le module de langue standard (anglais) :
        var scp = $HEADSCRIPT($APP_PATH + "NotPacked/lang/LocalStrings.js");



        // Puis surcharger si la langue du navigateur est reconnue :
        var language_Code = navigator.language || navigator.userLanguage;
        language_Code = language_Code.toUpperCase().split("-")[0];
        // Trouver éventuellement un paramètre de langue dans le script du body :
        if ($BODY_SCRIPT.hasAttribute("data-lang"))
            language_Code = $BODY_SCRIPT.getAttribute("data-lang").toUpperCase();

        $HEADSCRIPT($APP_PATH + "NotPacked/lang/LocalStrings_" + language_Code + ".js");
    };

    var $LOADPICKER = function() {
        //        var script = $HEADSCRIPT($APP_PATH + "NotPacked/thirdParty/FilePicker.js");
        var script = $HEADSCRIPT("http://api.filepicker.io/v1/filepicker.js");
        script.onload = function() {
            filepicker.setKey('A11o-dWi-S-ePxgyeWpfyz');
        };
    };

    var $MAIN_INIT = function() {
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
    };

    var $ECHOSRC = function() {
        var k = 0;
        for (var i = 0, len = $INCLUDED_FILES.length; i < len; i++) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", $APP_PATH + $INCLUDED_FILES[i], true);
            xhr.send();
            xhr.order = i;
            xhr.onload = function(e) {
                k++;
                $INCLUDED_FILES[e.target.order] = e.target.responseText;
                if (k === $INCLUDED_FILES.length) {
                    $INCLUDED_FILES.push("var $MAIN_INIT = " + $MAIN_INIT.toString());
                    $INCLUDED_FILES.push("window.onload = function() {\n$MAIN_INIT();\n};");
                    console.log($INCLUDED_FILES.join("\n"));
                }
            }
        }
    };

    var $GETCSS = function(ruleName, deleteFlag) {
        ruleName = ruleName.toLowerCase();
        if (document.styleSheets) {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var styleSheet = document.styleSheets[i];
                var ii = 0;
                var cssRule = false;
                do {
                    if (styleSheet.cssRules) {
                        cssRule = styleSheet.cssRules[ii];
                    } else {
                        cssRule = styleSheet.rules[ii];
                    }
                    if (cssRule) {
                        if (cssRule.selectorText.toLowerCase() == ruleName) {
                            if (deleteFlag == 'delete') {
                                if (styleSheet.cssRules) {
                                    styleSheet.deleteRule(ii);
                                } else {
                                    styleSheet.removeRule(ii);
                                }
                                return true;
                            } else {
                                return cssRule;
                            }
                        }
                    }
                    ii++;
                } while (cssRule)
            }
        }
        return false;
    };

    var $SCALECSS = function(_r, _p) {
        var c = $GETCSS(_r);
        if (c) {
            var props = _p.split(",");
            for (var i = 0, len = props.length; i < len; i++) {
                var n = parseInt(c.style.getPropertyValue(props[i])) * $SCALE;
                c.style.setProperty(props[i], n + "px");
            };
        }
    };


    // Seulement pour l'application Androïd : le java doit gérer les mouse et touch events.
    (function() {
        if ($STOP_MOUSE_EVENTS) {
            var orig_addEventListener = Element.prototype.addEventListener;
            Element.prototype.addEventListener = function(type, listener, useCapture) {
                switch (type) {
                    case "mousedown":
                        break;
                    case "mouseup":
                        break;
                    case "mousemove":
                        break;
                    default:
                        return orig_addEventListener.call(this, type, listener, useCapture);
                }
            };
        }
    }());

    (function() {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');
        style.rel = "stylesheet";
        style.type = "text/css";
        style.href = $APP_PATH + "NotPacked/styles.css";
        head.appendChild(style);
        // ******** Décommenter le jour où on met en place un "scale" : *********
        //        var img=document.createElement('img');
        //        img.onerror = function() {
        //            $SCALECSS(".pluginsListDIV", "width,height,left,top,border-radius");
        //            $SCALECSS(".toolsListDIV", "width,height,left,top,border-radius");
        //            $SCALECSS(".macroLIclass", "padding,font-size");
        //            $SCALECSS(".macroLIclassComment", "margin-top,margin-left,font-size");
        //            $SCALECSS(".macroPropsDIV", "width,left,height,border-radius");
        //            $SCALECSS(".macroLabelDiv", "padding");
        //            $SCALECSS(".macroLabelImage", "width,height");
        //            $SCALECSS(".macroLabelSpan", "margin-left,font-size");
        //            $SCALECSS(".macroExecInput", "width,height,font-size");
        //            $SCALECSS(".macroAddImage", "width,top,right");
        //            $SCALECSS(".macroPropsNameDIV", "left,top,right,height,border-radius");
        //            $SCALECSS(".macroPropsNameINPUT", "width,top,left,height,border-radius,font-size");
        //            $SCALECSS(".macroPropsViewport", "width,top,left,bottom");
        //            $SCALECSS(".macroPropsInnerDIV", "width,top,left,bottom");
        //            $SCALECSS(".macroListViewport", "width,top,left,bottom");
        //            $SCALECSS(".macroLIclassComment", "margin-top,margin-bottom,margin-left,font-size");
        //            $SCALECSS(".macroLIclass", "padding,font-size");
        //            $SCALECSS(".macroLIclassSel", "padding,font-size");
        //        };
        //        img.src=style.href;
        $LOADLANGUAGE();
        $LOADMAIN();
        $LOADPICKER();
        var standalone = window.navigator.standalone;
        var userAgent = window.navigator.userAgent.toLowerCase();
        var safari = /safari/.test(userAgent);
        var ios = /iphone|ipod|ipad/.test(userAgent);
        if (!standalone && !safari) {
            // DGPad s'ouvre dans l'iApp :
            window.open = function(url) {
                $FPICKERFRAME = new windowOpenIFrame(url);
            };
        }
    })();


    // Est-ce une tablette tactile ? :
    Object.touchpad = false;
    if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
        //iOS & android
        Object.touchpad = true;
    } else if (window.navigator.msPointerEnabled) {
        //Win8
        Object.touchpad = true;
    }

    String.prototype.startsWith = function(str) {
        return (this.indexOf(str) === 0);
    };

    window.onload = function() {
        $MAIN_INIT();
        if ($ECHO_SOURCE) {
            $ECHOSRC();
        }
        //        for (var key in window) {
        //            if (!$NAMESPACE.hasOwnProperty(key)) {
        //                console.log(key);
        //            }
        //        }
    };
}

// Création du canvas associé :
(function() {
    // On crée le canvas :
    var canvas = document.createElement("canvas");
    // Transfert sur le canvas de la largeur et hauteur éventuelle :
    if (($BODY_SCRIPT.hasAttribute("data-width")) && ($BODY_SCRIPT.hasAttribute("data-height"))) {
        canvas.setAttribute("width", $BODY_SCRIPT.getAttribute("data-width"));
        canvas.setAttribute("height", $BODY_SCRIPT.getAttribute("data-height"));
    }
    // Transfert sur le canvas du contenu de la figure (base64) :
    if ($BODY_SCRIPT.hasAttribute("data-source")) {
        canvas.setAttribute("data-source", $BODY_SCRIPT.getAttribute("data-source"));
    }
    // Transfert sur le canvas de l'adresse de la figure :
    if ($BODY_SCRIPT.hasAttribute("data-url")) {
        canvas.setAttribute("data-url", $BODY_SCRIPT.getAttribute("data-url"));
    }
    // Affichage du tableau de bord :
    if ($BODY_SCRIPT.hasAttribute("data-hidectrlpanel")) {
        canvas.setAttribute("data-hidectrlpanel", $BODY_SCRIPT.getAttribute("data-hidectrlpanel"));
    }
    // Transfert sur le canvas du mode de présentation :
    if ($BODY_SCRIPT.hasAttribute("data-presentation")) {
        canvas.setAttribute("data-presentation", $BODY_SCRIPT.getAttribute("data-presentation"));
    }

    var num = document.getElementsByTagName("canvas").length;
    canvas.setAttribute("id", "DGPad" + num);

    $BODY_SCRIPT.parentNode.insertBefore(canvas, $BODY_SCRIPT);

})();
