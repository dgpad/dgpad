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
    var targets=[];


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
            starty=cY+toolmarginV;
        }else{
            starty=cY-toolmarginV-ts;
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
        targets=canvas.getConstruction().getSelected().slice();
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
                    pxy.push({tool: tools[t.split("@")[1]]});
                } else if (t === "BR") {
                    bxy.push(col);
                    col = [];
                } else {
                    col.push({tool: tools[t]});
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

    me.mouseMoved = function(ev) {
    };

    me.mouseReleased = function(ev) {
        if ((!OC)||(OC.isInstantTool()))
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


}
;