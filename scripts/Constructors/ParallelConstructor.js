//************************************************
//************ PARALLEL CONSTRUCTOR **************
//************************************************
function ParallelConstructor(){
    $U.extend(this,new ObjectConstructor()); //Héritage
    
    this.getCode=function(){
        return "parallel";
    };
    
    this.getInitials=function(){
        return ["line"];
    };
    
    this.newObj=function(_zc,_C){
        return new ParallelLineObject(_zc.getConstruction(), "_Par",_C[0],_C[1]);
    };
    
    this.preview=function(ev,zc){
        var ctx=zc.getContext();
        var dx=this.getC(0).getDX();
        var dy=this.getC(0).getDY();
        ctx.strokeStyle=zc.prefs.color.hilite;
        ctx.lineWidth=zc.prefs.size.line;
        $U.drawPartialLine(ctx,zc.mouseX(ev)-dx,zc.mouseY(ev)-dy,zc.mouseX(ev)+dx,zc.mouseY(ev)+dy,true,true);
    };
}