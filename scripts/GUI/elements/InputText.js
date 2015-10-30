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

    this.valid_callback = function(_t) {
    };
    this.keyup_callback = function(_t) {
    };
    this.focus_callback = function() {
    };


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
    
    me.selectAll=function(){
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




}
;
