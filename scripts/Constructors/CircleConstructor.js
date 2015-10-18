//************************************************
//*************** CIRCLE CONSTRUCTOR *************
//************************************************
function CircleConstructor(){
    $U.extend(this,new ObjectConstructor()); //Héritage
    
    this.getCode=function(){
        return "circle";
    };
    this.getInitials=function(){
        return ["point"];
    };
    
    this.newObj=function(_zc,_C){
        return new CircleObject(_zc.getConstruction(), "_C", _C[0], _C[1]);
    };
    
    this.preview=function(ev,zc){
        var ctx=zc.getContext();
        var r=$U.computeRay(this.getC(0).getX(), this.getC(0).getY(), zc.mouseX(ev),zc.mouseY(ev));
        ctx.strokeStyle=zc.prefs.color.hilite;
        ctx.lineWidth=zc.prefs.size.line;
        ctx.beginPath();
        ctx.arc(this.getC(0).getX(),this.getC(0).getY(),r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.stroke();
    };
}