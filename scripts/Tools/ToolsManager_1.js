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
    var toolmaxperline = parseInt(canvas.prefs.tool.maxperline);
    var toolmarginV = parseInt(canvas.prefs.tool.marginV);
    if (Object.touchpad) {
        toolsize *= parseFloat(canvas.prefs.tool.touchfactor);
        toolgap *= parseFloat(canvas.prefs.tool.touchfactor);
        toolmarginV *= parseFloat(canvas.prefs.tool.touchfactor);
    }
    var toolX = 0,
        toolY = 0;
    var beginX = 0,
        beginY = 0;
    var tools = [];
    var visible = false;

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

    me.showTools = function(ev) {
        visible = true;
        canvas.setMovedFilter(me.mouseMoved);
        var selectedObjs = canvas.getConstruction().getSelected();
        if (selectedObjs.length > 0) {
            var myTools = selectedObjs[0].getAssociatedTools().split(",");
            var len = myTools.length;
            getCenter(ev, len);
            context.globalAlpha = 1;
            for (var i = 0; i < len; i++) {
                getXY(i, len);
                var myTool = tools[myTools[i]];
                myTool.init(toolX, toolY, toolsize);
            }
        }
    };

    me.showOneTool = function(_tool, ev) {
        visible = true;
        canvas.setMovedFilter(me.mouseMoved);
        getCenter(ev, 1);
        getXY(0, 1);
        _tool.init(toolX, toolY, toolsize);
    };

    var getCenter = function(ev, _len) {
        var cX = canvas.mouseX(ev);
        var cY = canvas.mouseY(ev);
        var W = _len * toolsize + (_len - 1) * toolgap;
        var H = toolsize;
        beginX = cX - W / 2;
        if (beginX < 0)
            beginX = toolgap;
        else if (beginX + W > canvas.getWidth())
            beginX = canvas.getWidth() - W - toolgap;

        beginY = cY - H - toolmarginV;
        if (beginY < 0)
            beginY = cY + toolmarginV;
    };

    var getXY = function(_i, _len) {
        toolX = beginX + _i * (toolsize + toolgap);
        toolY = beginY;
    };

    var TOOL = null;
    var OC = null;
    me.mouseDown = function(ev, _tool) {
        me.hideTools();
        TOOL = _tool;
        OC = TOOL.getConstructor();
        if (!canvas.isObjectConstructor(OC)) {
            canvas.setObjectConstructor(OC);
            OC.setInitialObjects(canvas.getConstruction().getSelected());
            if (OC.isInstantTool()) {
                me.closeTools();
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

        if (OC.isInstantTool())
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
            canvas.paint(ev);
        } else {
            canvas.paint(ev);
            me.showOneTool(TOOL, ev);
        }
    };


};
