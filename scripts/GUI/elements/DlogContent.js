/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function DlogContent(_owner) {
    var me = this;
    var owner = _owner;
    var docObject = document.createElement("div");
    docObject.style.position = "absolute";
    docObject.style.left = "0px";
    docObject.style.top = owner.getTitleBarHeight() + "px";
    docObject.style.margin = "0px";
    docObject.style.padding = "0px";
    docObject.style.width = owner.getBounds().width + "px";
    var h = owner.getBounds().height - owner.getTitleBarHeight();
    docObject.style.height = h + "px";
    //    docObject.style.backgroundColor="rgba(200,200,200,0.5)";

    me.getDocObject = function() {
        return docObject;
    }

};
