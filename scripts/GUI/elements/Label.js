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
