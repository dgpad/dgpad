// Ce script doit être appelé avec comme argument
// le chemin qui mène au dossier "scripts"


// Récupération du premier argument (chemin vers scripts)
$APP_PATH = process.argv[2] + "/";
$INCLUDED_FILES = [];



$INCLUDE = function(_file) {
    $INCLUDED_FILES.push(_file)
}

// Lance le script "Main.js" :
require($APP_PATH + 'Main.js');

// Copie du $MAIN_INIT de DGPad.js :
$MAIN_INIT = function() {
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

// Ecriture de Main_all.js :
$WRITESRC = function() {
    var fs = require('fs');
    var k = 0;
    var src = "";
    for (var i = 0, len = $INCLUDED_FILES.length; i < len; i++) {
        src += fs.readFileSync($APP_PATH + $INCLUDED_FILES[i]).toString();
    }
    src += "\n\nvar $MAIN_INIT = " + $MAIN_INIT.toString();
    src += "\n\nwindow.onload = function() {\n$MAIN_INIT();\n};";
    fs.writeFile($APP_PATH + "Main_all.js", src, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("File \"Main_all.js\" was saved!");
    });
};


$WRITESRC();


