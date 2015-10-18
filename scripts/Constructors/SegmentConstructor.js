//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function SegmentConstructor(){
    $U.extend(this,new ObjectConstructor()); //Héritage
    
    this.getCode=function(){
        return "segment";
    };
    
    this.getInitials=function(){
        return ["point"];
    };
    
    this.newObj=function(_zc,_C){
        return new SegmentObject(_zc.getConstruction(), "_S", _C[0], _C[1]);
    };
    
    this.preview=function(ev,zc){
        var ctx=zc.getContext();
        ctx.strokeStyle=zc.prefs.color.hilite;
        ctx.lineWidth=zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(this.getC(0).getX(),this.getC(0).getY());
        ctx.lineTo(zc.mouseX(ev),zc.mouseY(ev));
        ctx.closePath();
        ctx.stroke();
    };
}