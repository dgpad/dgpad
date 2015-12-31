function BlocklyManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var panel = null;
    var path1 = $APP_PATH + "NotPacked/thirdParty/Blockly/";
    var path2 = $APP_PATH + "Blockly/"
    var scripts = [path1 + "blockly_compressed.js",
        path1 + "blocks_compressed.js",
        path1 + "javascript_compressed.js",
        path1 + "msg/js/fr.js",
        path1 + "perso/Blockly_dgpad.js",
        path1 + "perso/Blockly_dgpad_JS.js",
        path1 + "perso/base32.js"
    ];
    var source = "";
    var selected = "";
    var workspace = null;
    var onload = function() {
        setTimeout(function() {

            workspace = Blockly.inject(panel.DIV, {
                media: $APP_PATH + "NotPacked/thirdParty/Blockly/media/",
                toolbox: document.getElementById('toolbox')
            });
            Blockly.Xml.domToWorkspace(workspace, document.getElementById('startBlocks'));

            Blockly.dgpad_canvas = canvas;
            Blockly.dgpad_Cn = canvas.getConstruction();
            Blockly.dgpad_panel = panel;
            workspace.addChangeListener(onchanged);
            Blockly.bindEvent_(panel.DIV, "mouseup", null, onmouseup);
        }, 200);
    };

    var onmouseup = function() {
        if ((Blockly.selected) && (Blockly.selected.onselect) && (selected != Blockly.selected)) {
            Blockly.selected.onselect();
            selected = Blockly.selected;
        }
    }

    var onchanged = function() {
        var newsource = Blockly.JavaScript.workspaceToCode(workspace);
        newsource = newsource.split("@CONST@");
        if (newsource.length === 3) {
            newsource = newsource[1];
            if (source !== newsource) {
                source = newsource;
                canvas.OpenFile("", newsource);
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

    var injectXML = function(_s) {
        window.document.getElementById("dgpad_xml").innerHTML = _s;
    };


    var loadBlockly = function() {
        panel = new BlocklyPanel(window.document.body, canvas.getHeight() - canvas.prefs.controlpanel.size);
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
            injectXML(xml);
            // var parser = new DOMParser();
            // var xml=parser.parseFromString(request.responseText, "application/xml");
            // panel.DIV.parentNode.appendChild(xml.firstChild);
            // Load scripts synchroniously :
            addScript(0);
        }
    };

    me.show = function() {
        if (panel === null) loadBlockly();
    }
}
