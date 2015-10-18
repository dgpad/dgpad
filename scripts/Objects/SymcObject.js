//************************************************
//*************** MIDPOINT OBJECT ****************
//************************************************
function SymcObject(_construction,_name,_P1,_P2){
    $U.extend(this,new PointObject(_construction,_name,0,0)); // Héritage
    var P1=_P1;
    var P2=_P2;
    this.setParent(P1,P2)
    this.setFillStyle(2);
    
    this.getCode = function() {
        return "symc";
    };
    
    
    this.isMoveable=function(){
        return false;
    };
    
    
    this.compute=function(){
        this.setXY(2*P1.getX()-P2.getX(), 2*P1.getY()-P2.getY());
    };
    
    this.getSource=function(src){
        if (this.execMacroSource(src)) return;
        src.geomWrite(false, this.getName(), "Symmetry",P1.getVarName(),P2.getVarName());
    };
    
};

