

function Button(_owner){
    $U.extend(this, new GUIElement(_owner,"button"));
    var me=this;
    me.setAttr("type", "button");
    me.setAbsolute();
    
    me.setText=function(txt){
        me.getDocObject().innerHTML=txt;
    };
    me.getText=function(){
        return me.getDocObject().innerHTML;
    };
    
    me.setCallBack=function(_proc){
        me.addUpEvent(_proc);
    };
};
