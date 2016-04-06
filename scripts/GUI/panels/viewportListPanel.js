function viewportListPanel(_owner) {
    var me = this;
    var owner = _owner;
    $U.extend(this, new Panel(owner));
    me.setAttr("className", "viewportListPanel");

    var rootUL = new GUIElement(me, "ul");
    rootUL.setAttr("className", "viewportListUL");





    me.addItem = function(_n) {
        var myul = rootUL;
        var tab = _n.split("/");
        var len = tab.length - 1;
        for (var i = 0; i < len; i++) {
            var ul = new GUIElement(me, "ul");
            ul.setAttr("className", "viewportListUL");
            myul.addContent(ul);
            myul = ul;
        }
        var name = tab[len];


        var li = new GUIElement(me, "li");
        li.setAttr("className", "viewportListLI");
        li.setAttr("innerHTML", name);
        //        li.setAttr("onmousedown", mousedown);
        myul.addContent(li);
    };

    me.addContent(rootUL);
    owner.addContent(me);

};



function viewportListUL(_owner) {
    var me = this;
    var owner = _owner;
    $U.extend(this, new GUIElement(me, "ul"));
    me.setAttr("className", "viewportListUL");





};
