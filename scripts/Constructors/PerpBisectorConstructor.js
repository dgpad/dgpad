//************************************************
//************ PerpBisectorConstructor ***********
//************************************************
function PerpBisectorConstructor(){
    $U.extend(this,new ObjectConstructor()); //Héritage
    
    this.getCode=function(){
        return "perpbis";
    };
    
    this.getInitials=function(){
        return ["point,segment"];
    };
    
    // Si le premier constituant est un segment, alors
    // il s'agit d'une construction instantannée
    this.isInstantTool = function () {
        return (this.getC(0).isInstanceType("segment"));
    };
    
    this.newObj=function(_zc,_C){
        var first = this.getC(0);
        if (first.isInstanceType("segment")) {
            _C = [first.P1, first.P2];
        }
        return new PerpBisectorObject(_zc.getConstruction(), "_L", _C[0], _C[1]);
    };
    
    var normalize=function(xA,yA,xB,yB){
        var l=Math.sqrt((xB-xA)*(xB-xA)+(yB-yA)*(yB-yA));
        return {
            x:(xB-xA)/l,
            y:(yB-yA)/l
        };
    };
    
    this.preview=function(ev,zc){
        if (this.isInstantTool()) return;
        var ctx=zc.getContext();
        var xA=this.getC(0).getX();
        var yA=this.getC(0).getY();
        var xB=zc.mouseX(ev);
        var yB=zc.mouseY(ev);
        var xM=(xA+xB)/2;
        var yM=(yA+yB)/2;
        
        
        
        var d=normalize(0,0,yA-yB,xB-xA);
        var t=$U.computeBorderPoints(xM, yM, d.x,d.y, zc.getWidth(), zc.getHeight());
        ctx.strokeStyle=zc.prefs.color.hilite;
        ctx.lineWidth=zc.prefs.size.line;
        ctx.beginPath();
        ctx.moveTo(t[0],t[1]);
        ctx.lineTo(t[2],t[3]);
        ctx.closePath();
        ctx.stroke();
    };
}