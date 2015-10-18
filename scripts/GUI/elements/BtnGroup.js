

function BtnGroup(){
    var V=[];
    
    this.add=function(btn){
        V.push(btn);
    };
    this.deselect=function(){
        var len=V.length;
        for (var i=0;i<len;i++){
            V[i].deselect();
        }
    };
    
};