function ImageBox(_owner, _src, _w, _h, _proc) {
    var me = this;
    $U.extend(this, new GUIElement(_owner, "img"));
    me.setAbsolute();
    me.setStyle("margin", "0px");
    me.setStyle("padding", "0px");
    me.setAttr("src", _src);
    me.setBounds(0, 0, _w, _h);
    me.addUpEvent(_proc);
    _owner.addContent(me);
}
