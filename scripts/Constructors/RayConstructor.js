//************************************************
//*************** RAY CONSTRUCTOR ****************
//************************************************
function RayConstructor(){
    $U.extend(this,new ObjectConstructor()); //Héritage
    
    this.getCode=function(){
        return "ray";
    };
    
    this.getInitials=function(){
        return ["point"];
    };
    
    this.newObj=function(_zc,_C){
        return new RayObject(_zc.getConstruction(), "_R", _C[0], _C[1]);
    };
    
    this.preview = function(ev, zc) {
        var ctx = zc.getContext();
        ctx.lineWidth = zc.prefs.size.line;
        ctx.strokeStyle = zc.prefs.color.hilite;
        $U.drawPartialLine(ctx,this.getC(0).getX(),this.getC(0).getY(),zc.mouseX(ev), zc.mouseY(ev),false,true);
    };
    
}