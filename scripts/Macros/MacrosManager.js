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
