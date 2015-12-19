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
