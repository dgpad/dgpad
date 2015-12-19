function CloseBox(_owner, _proc) {
    var me = this;
    $U.extend(this, new GUIElement(_owner, "img"));
    me.setAbsolute();
    me.setStyle("margin", "0px");
    me.setStyle("padding", "0px");
    me.setAttr("src", $APP_PATH + "NotPacked/images/dialog/closebox.svg");
    me.setBounds(_owner.getBounds().width - 15, -15, 30, 30);
    me.addDownEvent(_proc);
    _owner.addContent(me);
}
