/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function SimpleDialog(_owner,_l,_t,_w,_h){
    var me=this;
    var owner=_owner;
    var l=_l+owner.getBounds().left,t=_t+owner.getBounds().top,w=_w,h=_h;
    me.getBounds=function(){
        return {
            "left":l,
            "top":t,
            "width":w,
            "height":h
        };
    };
    //    var closeBoxSize=Object.touchpad?30:20;
    //    var closeBoxMargin=5;
    me.getTitleBarHeight=function(){
        return 0;
    };
    me.getCloseBoxBounds=function(){
    //        var cl=w-closeBoxSize-closeBoxMargin;
    //        var ct=(tbarHeight-closeBoxSize)/2;
    //        return {
    //            "left":cl,
    //            "top":ct,
    //            "width":closeBoxSize,
    //            "height":closeBoxSize
    //        };
    };
    
    var browser=$U.browserCode();
    
    var docObject = document.createElement("div");
//    docObject.style.backgroundColor="#FFFFFF";
    docObject.style.backgroundColor="rgba(230,230,230,0.9)";
//    docObject.style.background=browser+"-linear-gradient(top, #9c9ba6, #57575f)";
    //    docObject.style.backgroundSize = "100%";
    //    docObject.style.backgroundRepeat="no-repeat";
    docObject.style.position = "absolute";
    docObject.style.border="1px solid #b4b4b4";
    docObject.style.margin="0px";
    docObject.style.padding="0px";
    docObject.style.width=w+"px";
    docObject.style.height=h+"px";
    docObject.style.left = l+"px";
    docObject.style.top = (t-h)+"px";

    
    var content=new DlogContent(me);
    docObject.appendChild(content.getDocObject());
    owner.getDocObject().parentNode.appendChild(docObject);


    docObject.style.setProperty("-webkit-transition", "-webkit-transform 0.2s linear");
    docObject.style.setProperty("-moz-transition", "-moz-transform 0.2s linear");
    docObject.style.setProperty("-webkit-transform", "translateY(0)");
    docObject.style.setProperty("-moz-transform", "translateY(0)");
    setTimeout(function(){
        docObject.style.setProperty("-webkit-transform", "translate3d(0,"+h+"px, 0)");
        docObject.style.setProperty("-moz-transform", "translate3d(0,"+h+"px, 0)");
    },1);

    me.getDocObject=function(){
        return docObject;
    };
    
    me.drag=function(dx,dy){
        l+=dx;
        t+=dy;
        docObject.style.left = l+"px";
        docObject.style.top = t+"px";
    };
    
    me.callBackClose=function(){
    };
    
    me.close=function(){
        setTimeout(function(){
            docObject.style.setProperty("-webkit-transform", "translate3d(0,-"+h+"px, 0)");
            docObject.style.setProperty("-moz-transform", "translate3d(0,-"+h+"px, 0)");
        },20);
        setTimeout(function(){
            owner.getDocObject().parentNode.removeChild(docObject);
            docObject=null;
            me.callBackClose();
        },300);

    };
    
    me.addContent=function(elt){
        content.getDocObject().appendChild(elt.getDocObject());
    };
    

};