function Iframe(_owner, _src) {
    $U.extend(this, new GUIElement(_owner, "iframe"));
    var me = this;

    me.setAttr('frameborder', 0);
    me.setStyle('border', 0);
    me.setAttr('marginheight', 0);
    me.setAttr('marginwidth', 0);
    //    me.setAttr('scrolling', 'yes');
    me.setAttr('src', _src);


    me.setURL = function(_s) {
        me.setAttr('src', _s);
    };


};
