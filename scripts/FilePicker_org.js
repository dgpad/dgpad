/* Copyright CloudTop 2012. All Rights Reserved. */
var filepicker=(function(){
    var apiKey;
    var setAPIKey=function(key){
        apiKey=key;
    };
    
    var BASE_URL="https://www.filepicker.io";
    var MIMETYPES={
        ALL:'*/*',
        IMAGES:'image/*',
        JPG:'image/jpeg',
        GIF:'image/gif',
        PNG:'image/png',
        PDF:'application/pdf, application/x-pdf, application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf',
        AUDIO:'audio/*',
        MP3:'audio/mpeg',
        TEXT:'text/*',
        HTML:'text/html',
        XML:'text/xml',
        VCARD:'text/vcard',
        VIDEO:'video/*',
        MPEG:'video/mpeg',
        MP4:'video/mp4'
    };
    
    var SERVICES={
        BOX:0,
        COMPUTER:1,
        DROPBOX:2,
        FACEBOOK:3,
        GITHUB:4,
        GMAIL:5,
        IMAGE_SEARCH:6,
        URL:7,
        WEBCAM:8,
        GOOGLE_DRIVE:9,
        SEND_EMAIL:10,
        INSTAGRAM:11,
        FLICKR:12,
        VIDEO:13
    };
    
    var NEW_WINDOW=false;
    var THIRD_PARTY_COOKIES;
    var MAX_RETRIES=5;
    var MAX_CHUNK_SIZE=1*1024*1024;
    var FilepickerException=function(text){
        this.text=text;
        this.toString=function(){
            return"FilepickerException: "+this.text;
        };
    
};

var isArray=function(o){
    return Object.prototype.toString.call(o)==='[object Array]';
};

var DIALOG_TYPES={
    OPEN:'/dialog/open/',
    SAVEAS:'/dialog/save/'
};

var URL_REGEX=/^(http|https)\:.*\/\//i;
var pickerWindowProperties="left=100,top=100,height=600,width=800,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=yes,dependent=yes,dialog=yes";
var WINDOW_NAME="filepicker_dialog";
var WINDOW_CONTAINER_NAME="filepicker_dialog_container";
var SHADE_NAME="filepicker_shade";
var IFRAME_NAME="filepicker_iframe";
var COMM_IFRAME_NAME="filepicker_comm_iframe";
var endpoints={};

endpoints.tempStorage=BASE_URL+"/api/path/storage/";
endpoints.commUrl=BASE_URL+"/dialog/comm_iframe/";
endpoints.open=BASE_URL+DIALOG_TYPES.OPEN;
endpoints.saveas=BASE_URL+DIALOG_TYPES.SAVEAS;
var constructOpenURL=function(mimetypes,id,options){
    return endpoints.open+"?m="+mimetypes.join(",")+"&key="+apiKey+"&id="+id+"&referrer="+window.location.hostname+"&iframe="+(options['container']!='window')+
    (options['services']?"&s="+options['services'].join(","):"")+
    (options['multiple']?"&multi="+options['multiple']:"")+
    (options['location']!==undefined?"&loc="+options['location']:"")+
    (options['metadata']?"&meta="+options['metadata']:"")+
    (options['maxsize']?"&maxsize="+options['maxsize']:"")+
    (options['persist']?"&p="+options['persist']:"")+
    (options['auth_tokens']?"&auth_tokens="+options['auth_tokens']:"");
};

var constructSaveAsURL=function(fileurl,mimetype,id,options){
    return endpoints.saveas+"?url="+fileurl+"&m="+mimetype+"&key="+apiKey+"&id="+id+"&referrer="+window.location.hostname+"&iframe="+(options['container']!='window')+
    (options['services']?"&s="+options['services']:"")+
    (options['defaultSaveasName']?"&defaultSaveasName="+options['defaultSaveasName']:"")+
    (options['location']!==undefined?"&loc="+options['location']:"");
};

var openCommIframe=function(){
    if(window.frames[COMM_IFRAME_NAME]===undefined){
        openCommunicationsChannel();
        var commIFrame;
        commIFrame=document.createElement("iframe");
        commIFrame.name=COMM_IFRAME_NAME;
        commIFrame.src=endpoints.commUrl;
        commIFrame.style.display='none';
        document.body.appendChild(commIFrame);
    }
};

var openCommunicationsChannel=function(){
    if(openCommunicationsChannel.set){
        return;
    }else{
        openCommunicationsChannel.set=true;
    }
    var communicationsHandler=function(event){
        if(event.origin!=BASE_URL){
            return;
        }
        var data=JSON.parse(event.data);
        handlers.run(data);
    };    
    if(window.addEventListener){
        window.addEventListener("message",communicationsHandler,false);
    }else if(window.attachEvent){
        window.attachEvent("onmessage",communicationsHandler);
    }else{
        throw new FilepickerException("Unsupported browser");
    }
};

var getReceiveUrlMessage=function(callback,multiple){
    var handler=function(data){
        if(data.type!=="filepickerUrl"){
            return;
        } 
        if(isArray(data.payload)){
            callback(data.payload);
        }else if(multiple){
            callback([data.payload]);
        }else{
            callback(data.payload.url,data.payload.data);
        }
        closeModal();
    };
    
    return handler;
};

var getReceiveCookiesMessage=function(callback){
    var handler=function(data){
        if(data.type!=="ThirdPartyCookies"){
            return;
        }
        THIRD_PARTY_COOKIES=!!data.payload;
        if(callback&&typeof callback==="function"){
            callback(!!data.payload);
        }
    };
    
return handler;
};

var handlers={};

handlers._storage={
    'cookies':getReceiveCookiesMessage()
    };
    
handlers.attachHandler=function(id,handler){
    handlers._storage[id]=handler;
    return handler;
};

handlers.detachHandler=function(id){
    return delete(handlers._storage[id]);
};

handlers.run=function(data){
    var callerId=data.id;
    if(handlers._storage.hasOwnProperty(callerId)){
        handlers._storage[callerId](data);
        return true;
    }
    return false;
};

var generateModal=function(modalUrl){
    var shade=createModalShade();
    var container=createModalContainer();
    var close=createModalClose();
    var modal=document.createElement("iframe");
    modal.name=WINDOW_NAME;
    modal.id=WINDOW_NAME;
    var size=getWindowSize();
    var height=Math.min(size[1]-40,500);
    modal.style.width='100%';
    modal.style.height=height-32+'px';
    modal.style.border="none";
    modal.style.position="relative";
    modal.setAttribute('frameborder',0);
    modal.setAttribute('marginwidth',0);
    modal.setAttribute('marginheight',0);
    modal.src=modalUrl;
    document.body.appendChild(shade);
    container.appendChild(close);
    container.appendChild(modal);
    document.body.appendChild(container);
    return modal;
};

var createModalShade=function(){
    var shade=document.createElement("div");
    shade.id=SHADE_NAME;
    shade.style.position='fixed';
    shade.style.top=0;
    shade.style.bottom=0;
    shade.style.right=0;
    shade.style.left=0;
    shade.style.backgroundColor='#000000';
    shade.style.opacity='0.5';
    shade.style.filter='alpha(opacity=50)';
    shade.style.zIndex=10000;
    shade.onclick=filepicker.closeModal;
    return shade;
};

var createModalContainer=function(){
    var modalcontainer=document.createElement("div");
    modalcontainer.id=WINDOW_CONTAINER_NAME;
    modalcontainer.style.position='fixed';
    modalcontainer.style.padding="10px";
    modalcontainer.style.background="white";
    modalcontainer.style.top='10px';
    modalcontainer.style.bottom='auto';
    modalcontainer.style.right='auto';
    var size=getWindowSize();
    var height=Math.min(size[1]-40,500);
    var width=Math.min(size[0]-40,800);
    var leftspacing=(size[0]-width-40)/2;
    modalcontainer.style.left=leftspacing+"px";
    modalcontainer.style.height=height+'px';
    modalcontainer.style.width=width+'px';
    modalcontainer.style.overflow='auto';
    modalcontainer.style.webkitOverflowScrolling='touch';
    modalcontainer.style.border='1px solid #999';
    modalcontainer.style.webkitBorderRadius='6px';
    modalcontainer.style.borderRadius='6px';
    modalcontainer.style.margin='0';
    modalcontainer.style.webkitBoxShadow='0 3px 7px rgba(0, 0, 0, 0.3)';
    modalcontainer.style.boxShadow='0 3px 7px rgba(0, 0, 0, 0.3)';
    modalcontainer.style.zIndex=10001;
    return modalcontainer;
};

var createModalClose=function(){
    var close=document.createElement("a");
    close.appendChild(document.createTextNode('\u00D7'));
    close.onclick=filepicker.closeModal;
    close.style['float']="right";
    close.style.cursor="default";
    close.style.padding='0 5px 0 0px';
    close.style.fontSize='1.5em';
    close.style.color='#000000';
    close.style.textDecoration='none';
    return close;
};

var closeModal=function(){
    var shade=document.getElementById(SHADE_NAME);
    if(shade){
        document.body.removeChild(shade);
    }
    var container=document.getElementById(WINDOW_CONTAINER_NAME);
    if(container){
        document.body.removeChild(container);
    }
};

var getID=function(){
    d=new Date();
    return d.getTime().toString();
};

var getFile=function(mimetype,options,callback){
    mimetype=utilities.normalizeMimetypes(mimetype);
    return openFilepickerWindow(DIALOG_TYPES.OPEN,{
        'mimetype':mimetype,
        'options':options,
        'callback':callback
    });
};

var saveFileAs=function(file_url,mimetype,options,callback){
    return openFilepickerWindow(DIALOG_TYPES.SAVEAS,{
        'file_url':file_url,
        'mimetype':mimetype,
        'options':options,
        'callback':callback
    });
};

var openFilepickerWindow=function(dialogType,args){
    var picker;
    var handler;
    var file_url;
    if(!apiKey){
        throw new FilepickerException("API Key not found");
    }
    if(dialogType!=DIALOG_TYPES.OPEN&&dialogType!=DIALOG_TYPES.SAVEAS){
        return null;
    }
    if(dialogType==DIALOG_TYPES.SAVEAS){
        file_url=args['file_url'];
        if(!file_url||typeof file_url!="string"){
            throw new FilepickerException("The provided File URL ('"+file_url+"') is not valid");
        }
        if(!file_url.match(URL_REGEX)){
            throw new FilepickerException(file_url+" is not a valid url. Make sure it starts with http or https");
        } 
        file_url=encodeURIComponent(file_url);
    }
    var mimetype=args['mimetype'];
    var options=args['options'];
    var callback=args['callback'];
    mimetype=mimetype||MIMETYPES.ALL;
    if(!isArray(mimetype)){
        mimetype=[mimetype];
    }
    if(options===undefined){
        options={};
    
}else if(typeof options==="function"){
    callback=options;
    options={};

}
callback=callback||function(){};

if(options['services']&&!isArray(options['services'])){
    options['services']=[options['services']];
} 
if(options['debug']){
    dummy_url="https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1";
    data={
        'filename':'test.png',
        'type':'image/png',
        'size':58979
    };
    
    window.setTimeout(function(){
        if(options['multiple']){
            callback([{
                'url':dummy_url,
                'data':data
            },{
                'url':dummy_url,
                'data':data
            }]);
        }else{
            callback(dummy_url,data);
        }
    },100);
return window;
} 
if(options['container']===undefined){
    if(options['modal']===undefined){
        options['container']=NEW_WINDOW?'window':'modal';
    }else{
        options['container']=options['modal']?'modal':'window';
    }
}
if(options['container']=='modal'){
    if(utilities.isIOS()||utilities.isAndroid()){
        options['container']='window';
    }
}
var iframe=options['container']!='window';
var smallScreen=(getWindowSize()[0]<768);
iframe=iframe&&!smallScreen;
if(THIRD_PARTY_COOKIES!==undefined){
    iframe=iframe&&THIRD_PARTY_COOKIES;
    openCommIframe();
}else if(iframe){
    var cookie_callback=function(){
        if(dialogType==DIALOG_TYPES.OPEN){
            getFile(mimetype,options,callback);
        }else if(dialogType==DIALOG_TYPES.SAVEAS){
            saveFileAs(file_url,mimetype,options,callback);
        }
    };
    
determineThirdPartyCookies(cookie_callback);
return null;
}
if(options['auth_tokens']!==undefined){
    var auth_tokens=JSON.stringify(options['auth_tokens']);
    options['auth_tokens']=encodeURIComponent(auth_tokens);
}
var id=getID();
var url;
if(dialogType==DIALOG_TYPES.OPEN){
    url=constructOpenURL(mimetype,id,options);
}else if(dialogType==DIALOG_TYPES.SAVEAS){
    url=constructSaveAsURL(file_url,mimetype,id,options);
}
if(options['container']=='window'){
    picker=window.open(url,WINDOW_NAME,pickerWindowProperties);
}else if(options['container']=='modal'){
    picker=generateModal(url);
}else{
    var container_iframe=document.getElementById(options['container']);
    if(!container_iframe){
        throw new FilepickerException("Container '"+options['container']+"' not found. This should either be set to 'window','modal', or the ID of an iframe that is currently in the document.");
    }
    container_iframe.src=url;
}
handlers.attachHandler(id,getReceiveUrlMessage(callback,!!options['multiple']));
return picker;
};

var determineThirdPartyCookies=function(callback){
    handler=getReceiveCookiesMessage(callback);
    handlers.attachHandler('cookies',handler);
    openCommIframe();
};

var Base64={
    _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
    encode:function(input){
        var output="";
        var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
        var i=0;
        input=Base64._utf8_encode(input);
        while(i<input.length){
            chr1=input.charCodeAt(i);
            chr2=input.charCodeAt(i+1);
            chr3=input.charCodeAt(i+2);
            i+=3;
            enc1=chr1>>2;
            enc2=((chr1&3)<<4)|(chr2>>4);
            enc3=((chr2&15)<<2)|(chr3>>6);
            enc4=chr3&63;
            if(isNaN(chr2)){
                enc3=enc4=64;
            }else if(isNaN(chr3)){
                enc4=64;
            }
            output=output+
            this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+
            this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);
        }
        return output;
    }, 
    decode:function(input){
        var output="";
        var chr1,chr2,chr3;
        var enc1,enc2,enc3,enc4;
        var i=0;
        input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
        while(i<input.length){
            enc1=this._keyStr.indexOf(input.charAt(i));
            enc2=this._keyStr.indexOf(input.charAt(i+1));
            enc3=this._keyStr.indexOf(input.charAt(i+2));
            enc4=this._keyStr.indexOf(input.charAt(i+3));
            i+=4;
            chr1=(enc1<<2)|(enc2>>4);
            chr2=((enc2&15)<<4)|(enc3>>2);
            chr3=((enc3&3)<<6)|enc4;
            output=output+String.fromCharCode(chr1);
            if(enc3!=64){
                output=output+String.fromCharCode(chr2);
            }
            if(enc4!=64){
                output=output+String.fromCharCode(chr3);
            }
        }
    output=Base64._utf8_decode(output);
    return output;
}, 
_utf8_encode:function(string){
    string=string.replace(/\r\n/g,"\n");
    var utftext="";
    for(var n=0;n<string.length;n++){
        var c=string.charCodeAt(n);
        if(c<128){
            utftext+=String.fromCharCode(c);
        }
        else if((c>127)&&(c<2048)){
            utftext+=String.fromCharCode((c>>6)|192);
            utftext+=String.fromCharCode((c&63)|128);
        }
        else{
            utftext+=String.fromCharCode((c>>12)|224);
            utftext+=String.fromCharCode(((c>>6)&63)|128);
            utftext+=String.fromCharCode((c&63)|128);
        }
    }
return utftext;
}, 
_utf8_decode:function(utftext){
    var string="";
    var i=0;
    var c=c1=c2=0;
    while(i<utftext.length){
        c=utftext.charCodeAt(i);
        if(c<128){
            string+=String.fromCharCode(c);
            i++;
        }
        else if((c>191)&&(c<224)){
            c2=utftext.charCodeAt(i+1);
            string+=String.fromCharCode(((c&31)<<6)|(c2&63));
            i+=2;
        }
        else{
            c2=utftext.charCodeAt(i+1);
            c3=utftext.charCodeAt(i+2);
            string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
            i+=3;
        }
    }
return string;
}
};

var getWindowSize=function(){
    if(document.body&&document.body.offsetWidth){
        winW=document.body.offsetWidth;
        winH=document.body.offsetHeight;
    }
    if(document.compatMode=='CSS1Compat'&&document.documentElement&&document.documentElement.offsetWidth){
        winW=document.documentElement.offsetWidth;
        winH=document.documentElement.offsetHeight;
    }
    if(window.innerWidth&&window.innerHeight){
        winW=window.innerWidth;
        winH=window.innerHeight;
    }
    return[winW,winH];
};

var getUrlFromData=function(fileContents,options,callback,noencode){
    if(typeof options==="function"){
        noencode=!!callback;
        callback=options;
        options={};
    
}else{
    noencode=!!noencode;
}
if(!options){
    options={};

}
if(!options.filename){
    options.filename='';
}
callback=callback||function(){};

if(!fileContents){
    throw new FilepickerException('Error: no contents given');
}
var returnData;
fileContents=noencode?fileContents:Base64.encode(fileContents);
var request=utilities.ajax({
    method:'POST',
    url:endpoints.tempStorage+options.filename,
    data:{
        fileContents:fileContents,
        apikey:apiKey,
        persist:!!options.persist
        },
    json:true,
    success:function(returnJson){
        if(returnJson.result=="ok"){
            returnData=returnJson.data[0];
            callback(returnData.url,returnData.data);
        }else{
            callback(null,returnJson);
        }
    },
error:function(msg){
    callback(null);
}
});
};

var getContents=function(file_url,base64encode,callback){
    if(typeof base64encode==="function"){
        callback=base64encode;
        base64encode=false;
    } 
    base64encode=!!base64encode;
    utilities.ajax({
        method:'GET',
        url:file_url,
        data:{
            'base64encode':base64encode
        },
        success:function(responseText){
            callback(responseText);
        }
    });
};

var revokeFile=function(file_url,callback){
    if(!apiKey){
        throw new FilepickerException("API Key not found");
    }
    file_url+='/revoke';
    var request=utilities.ajax({
        method:'POST',
        url:file_url,
        success:function(responseText){
            callback(true,"success");
        },
        error:function(responseText){
            callback(false,responseText);
        },
        data:{
            "key":apiKey
        }
    });
};
var utilities={};

utilities.addOnLoad=function(func){
    if(window.jQuery){
        window.jQuery(function(){
            func();
        });
    }else{
        var evnt="load";
        if(window.addEventListener) 
            window.addEventListener(evnt,func,false);
        else if(window.attachEvent){
            window.attachEvent("on"+evnt,func);
        }else{
            if(window.onload){
                var curr=window.onload;
                window.onload=function(){
                    curr();
                    func();
                };
            
        }else{
            window.onload=func;
        }
    }
}
};

utilities.typeOf=function(value){
    if(value===null){
        return'null';
    }else if(Object.prototype.toString.apply(value)==='[object Array]'){
        return'array';
    }
    return typeof value;
};

utilities.JSON=(function(){
    if(typeof JSON=='undefined')this.JSON={};
        
    var special={
        '\b':'\\b',
        '\t':'\\t',
        '\n':'\\n',
        '\f':'\\f',
        '\r':'\\r',
        '"':'\\"',
        '\\':'\\\\'
    };
    
    var escape=function(chr){
        return special[chr]||'\\u'+('0000'+chr.charCodeAt(0).toString(16)).slice(-4);
    };
    
    var validate=function(string){
        string=string.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');
        return(/^[\],:{}\s]*$/).test(string);
    };
    
    var encode=JSON.stringify?function(obj){
        return JSON.stringify(obj);
    }:function(obj){
        if(obj&&obj.toJSON)obj=obj.toJSON();
        switch(utilities.typeOf(obj)){
            case'string':
                return'"'+obj.replace(/[\x00-\x1f\\"]/g,escape)+'"';
            case'array':
                return'['+obj.map(encode).clean()+']';
            case'object':case'hash':
                var string=[];
                Object.each(obj,function(value,key){
                var json=encode(value);
                if(json)string.push(encode(key)+':'+json);
            });
            return'{'+string+'}';
            case'number':case'boolean':
                return''+obj;
            case'null':
                return'null';
            default:
                return'null';
        }
        return null;
    };
    
    var decode=function(string,secure){
        if(!string||utilities.typeOf(string)!='string')return null;
        if(JSON.parse){
            return JSON.parse(string);
        }else{
            if(secure){
                if(!validate(string))throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
            }
            return eval('('+string+')');
        }
    };
    
return{
    validate:validate,
    encode:encode,
    decode:decode
};

})();
utilities.isIOS=function(){
    if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)){
        return true;
    }else{
        return false;
    }
};

utilities.isAndroid=function(){
    if(navigator.userAgent.match(/Android/i)){
        return true;
    }else{
        return false;
    }
};

utilities.ajax=(function(){
    var toQueryString=function(object,base){
        var queryString=[];
        for(var key in object){
            var value=object[key];
            if(base)key=base+'['+key+']';
            var result;
            switch(utilities.typeOf(value)){
                case'object':
                    result=toQueryString(value,key);
                    break;
                case'array':
                    var qs={};
                    
                    value.each(function(val,i){
                    qs[i]=val;
                });
                result=toQueryString(qs,key);
                    break;
                default:
                    result=key+'='+encodeURIComponent(value);
                    break;
            }
            if(value!==null){
                queryString.push(result);
            }
        }
    return queryString.join('&');
};

var ajax=function(options){
    var url=options.url||null;
    var method=options.method?options.method.toUpperCase():"POST";
    var success=options.success||function(){};
    
    var error=options.error||function(){};
    
    var async=options.async===undefined?true:options.async;
    var data=options.data||null;
    var processData=options.processData===undefined?true:options.processData;
    if(data&&processData){
        data=toQueryString(options.data);
    }
    if(window.XDomainRequest){
        return XDomainAjax(options);
    } 
    var xhr;
    if(options.xhr){
        xhr=options.xhr;
    }else{
        try{
            xhr=new XMLHttpRequest();
        }catch(e){
            try{
                xhr=new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){
                    throw"Your browser does not support AJAX and so cannot excecute this method";
                }
            }
        }
} 
var onStateChange=function(){
    if(xhr.readyState==4){
        if(xhr.status>=200&&xhr.status<300){
            var resp=xhr.responseText;
            if(options.json){
                resp=utilities.JSON.decode(resp);
            }
            success(resp,xhr);
        }else{
            error(xhr.responseText,xhr);
        }
    }
xhr.onreadystatechage=function(){};

};

xhr.onreadystatechange=onStateChange;
if(data&&method=='GET'){
    url+=(url.indexOf('?')!=-1?'&':'?')+data;
    data=null;
}
xhr.open(method,url,async);
if(options.json){
    xhr.setRequestHeader('Accept','application/json');
}else{
    xhr.setRequestHeader('Accept','text/javascript, text/html, application/xml, text/xml, */*');
}
if(data&&processData&&(method=="POST"||method=="PUT")){
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
}
xhr.send(data);
return xhr;
};
var XDomainAjax=function(options){
    if(!window.XDomainRequest){
        return null;
    }
    var url=options.url||null;
    var method=options.method?options.method.toUpperCase():"POST";
    var success=options.success||function(){};
    
    var error=options.error||function(){};
    
    var data=options.data||{};    
    if(window.location.protocol=="http:"){
        url=url.replace("https:","http:");
    }else if(window.location.protocol=="https:"){
        url=url.replace("http:","https:");
    }
    if(options.async){
        throw new FilepickerException("Asyncronous Cross-domain requests are not supported");
    } 
    if(method!="GET"&&method!="POST"){
        data["_method"]=method;
        method="POST";
    }
    data=data?toQueryString(data):null;
    if(data&&method=='GET'){
        url+=(url.indexOf('?')>=0?'&':'?')+data;
        data=null;
    }
    var xdr=new window.XDomainRequest();
    xdr.onload=function(){
        var resp=xdr.responseText;
        if(options.json){
            resp=utilities.JSON.decode(resp);
        }
        success(resp,xdr);
    };
    
    xdr.onerror=function(){
        var resp=xdr.responseText||'error';
        error(resp,xdr);
    };    
    xdr.open(method,url,true);
    xdr.send(data);
    return xdr;
};

return ajax;
})();
utilities.trim=function(string){
    return string.replace(/^\s+|\s+$/g,"");
};

utilities.normalizeMimetypes=function(input){
    if(utilities.typeOf(input)=="string"){
        return utilities.normalizeMimetypeString(input);
    }else if(utilities.typeOf(input)=="array"){
        var out=[];
        for(var n=0;n<input.length;n++){
            partial=utilities.normalizeMimetypes(input[n]);
            out=out.concat(partial);
        }
        return out;
    }else{
        return['*/*'];
    }
};

utilities.normalizeMimetypeString=function(string){
    out=string.split(',');
    for(var n=0;n<out.length;n++){
        out[n]=utilities.trim(out[n]);
    }
    return out;
};

utilities.mimetype_extension_map={
    '.stl':'applicaiton/sla',
    '.hbs':'text/html',
    '.pdf':'application/pdf',
    '.jpg':'image/jpeg',
    '.jpeg':'image/jpeg',
    '.jpe':'image/jpeg',
    '.imp':'application/x-impressionist'
};

utilities.mimetype_bad_array=['application/octet-stream','application/download','application/force-download','octet/stream','application/unknown'];
utilities.getMimetype=function(file){
    if(file.type){
        var type=file.type;
        type=type.toLowerCase();
        var bad_type=false;
        for(var n=0;n<utilities.mimetype_bad_array.length;n++){
            bad_type=bad_type||type==utilities.mimetype_bad_array[n];
        }
        if(!bad_type){
            return file.type;
        }
    }
var filename=file.name||file.fileName;
var extension=filename.match(/\.\w*$/);
if(extension){
    return utilities.mimetype_extension_map[extension[0].toLowerCase()]||'';
}else{
    if(file.type){
        return file.type;
    }else{
        return'';
    }
}
};

utilities.matchesMimetype=function(test,against){
    if(!test){
        return against=="*/*";
    }
    test=utilities.trim(test);
    against=utilities.trim(against);
    test_parts=test.split("/");
    against_parts=against.split("/");
    if(against_parts[0]=="*"){
        return true;
    }
    if(against_parts[0]!=test_parts[0]){
        return false;
    } 
    if(against_parts[1]=="*"){
        return true;
    }
    return against_parts[1]==test_parts[1];
};
utilities.addOnLoad(function(e){
    determineThirdPartyCookies();
});
var constructOpenWidgets=function(){
    var open_base=document.querySelectorAll('input[type="filepicker"]');
    for(var i=0;i<open_base.length;i++){
        constructOpenWidget(open_base[i]);
    }
    };
    
var constructOpenWidget=function(base){
    var j;
    var ow;
    var holder;
    var mtypes;
    var fpoptions;
    var apikey;
    var services;
    var container;
    ow=document.createElement("button");
    ow.innerHTML=base.getAttribute('data-fp-text')||"Pick File";
    ow.className=base.getAttribute('data-fp-class')||base.className;
    base.style.display="none";
    mtypes=(base.getAttribute("data-fp-mimetypes")||MIMETYPES.ALL).split(",");
    fpoptions={};
    
    container=base.getAttribute("data-fp-option-container");
    if(container){
        fpoptions['container']=container;
    }else{
        modal=(base.getAttribute("data-fp-option-modal")||"true")!="false";
        fpoptions['container']=modal?'modal':'window';
    }
    fpoptions['multiple']=(base.getAttribute("data-fp-option-multiple")||"false")!="false";
    fpoptions['persist']=(base.getAttribute("data-fp-option-persist")||"false")!="false";
    if(base.getAttribute("data-fp-option-maxsize")){
        fpoptions['maxsize']=base.getAttribute("data-fp-option-maxsize");
    }
    services=base.getAttribute("data-fp-option-services");
    if(services){
        services=services.split(",");
        for(j=0;j<services.length;j++){
            services[j]=SERVICES[services[j].replace(" ","")];
        }
        fpoptions['services']=services;
    }
    loc=base.getAttribute("data-fp-option-location");
    if(loc){
        fpoptions['location']=loc;
    }
    apikey=base.getAttribute("data-fp-apikey");
    if(apikey){
        setAPIKey(apikey);
    }
    ow.onclick=(function(input,mimetypes,options){
        return function(){
            getFile(mimetypes,options,function(data,metadata){
                var e;
                if(options['multiple']){
                    var urls=[];
                    for(j=0;j<data.length;j++){
                        urls.push(data[j]['url']);
                    }
                    input.value=urls.join();
                    fireOnChangeEvent(input,data);
                }else{
                    input.value=data;
                    fireOnChangeEvent(input,[{
                        url:data,
                        data:metadata
                    }]);
                }
            });
        return false;
    };
    
})(base,mtypes,fpoptions);
base.parentNode.insertBefore(ow,base);
};

var constructSaveWidgets=function(){
    var save_base=[];
    var tmp=document.querySelectorAll('button[data-fp-url]');
    for(i=0;i<tmp.length;i++){
        save_base.push(tmp[i]);
    }
    tmp=document.querySelectorAll('a[data-fp-url]');
    for(i=0;i<tmp.length;i++){
        save_base.push(tmp[i]);
    }
    tmp=document.querySelectorAll('input[type="button"][data-fp-url]');
    for(i=0;i<tmp.length;i++){
        save_base.push(tmp[i]);
    }
    for(i=0;i<save_base.length;i++){
        constructSaveWidget(save_base[i]);
    }
    };
    
var constructSaveWidget=function(base){
    base.onclick=(function(base){
        return function(){
            var mimetype=base.getAttribute("data-fp-mimetype");
            var url=base.getAttribute("data-fp-url");
            if(!mimetype||!url){
                return true;
            }
            var options={};
            
            var container=base.getAttribute("data-fp-option-container");
            if(container){
                options['container']=container;
            }else{
                modal=(base.getAttribute("data-fp-option-modal")||"true")!="false";
                options['container']=modal?'modal':'window';
            }
            var services=base.getAttribute("data-fp-option-services");
            if(services){
                services=services.split(",");
                for(j=0;j<services.length;j++){
                    services[j]=SERVICES[services[j].replace(" ","")];
                }
                options['services']=services;
            }
            var defaultSaveasName=base.getAttribute("data-fp-option-defaultSaveasName");
            if(defaultSaveasName){
                options['defaultSaveasName']=defaultSaveasName;
            }
            apikey=base.getAttribute("data-fp-apikey");
            if(apikey){
                setAPIKey(apikey);
            }
            saveFileAs(url,mimetype,options);
            return false;
        };
    
    })(base);
};

var constructDragWidgets=function(){
    var drag_widgets=document.querySelectorAll('input[type="filepicker-dragdrop"]');
    for(var i=0;i<drag_widgets.length;i++){
        constructDragWidget(drag_widgets[i]);
    }
    };
    
var constructDragWidget=function(base){
    var j;
    var pane;
    var ob;
    var holder;
    var mtypes;
    var fpoptions;
    var apikey;
    var services;
    var container;
    pane=document.createElement("div");
    pane.className=base.getAttribute('data-fp-class')||base.className;
    pane.style.padding="1px";
    pane.style.display="inline-block";
    base.style.display="none";
    base.parentNode.insertBefore(pane,base);
    ob=document.createElement("button");
    ob.innerHTML=base.getAttribute('data-fp-button-text')||"Pick File";
    ob.className=base.getAttribute('data-fp-button-class')||'';
    pane.appendChild(ob);
    var odrag=document.createElement("div");
    setupDragContainer(odrag);
    var dragWidth=pane.offsetWidth-ob.offsetWidth-20;
    dragWidth=Math.min(dragWidth,220);
    if(dragWidth>0){
        odrag.style.width=dragWidth+"px";
    }
    odrag.innerHTML=base.getAttribute('data-fp-drag-text')||"Or drop files here";
    odrag.className=base.getAttribute('data-fp-drag-class')||'';
    pane.appendChild(odrag);
    mtypes=(base.getAttribute("data-fp-mimetypes")||MIMETYPES.ALL).split(",");
    fpoptions={};
    
    container=base.getAttribute("data-fp-option-container");
    if(container){
        fpoptions['container']=container;
    }else{
        modal=(base.getAttribute("data-fp-option-modal")||"true")!="false";
        fpoptions['container']=modal?'modal':'window';
    }
    fpoptions['multiple']=(base.getAttribute("data-fp-option-multiple")||"false")!="false";
    fpoptions['persist']=(base.getAttribute("data-fp-option-persist")||"false")!="false";
    fpoptions['mimetypes']=mtypes;
    if(base.getAttribute("data-fp-option-maxsize")){
        fpoptions['maxsize']=base.getAttribute("data-fp-option-maxsize");
    }
    services=base.getAttribute("data-fp-option-services");
    if(services){
        services=services.split(",");
        for(j=0;j<services.length;j++){
            services[j]=SERVICES[services[j].replace(" ","")];
        }
        fpoptions['services']=services;
    }
    apikey=base.getAttribute("data-fp-apikey");
    if(apikey){
        setAPIKey(apikey);
    }
    var dragdrop=(!!window.FileReader||navigator.userAgent.indexOf("Safari")>=0)&&('draggable'in odrag);
    if(dragdrop){
        setupDropPane(odrag,fpoptions,base);
    }else{
        odrag.innerHTML="&nbsp;";
    }
    odrag.onclick=ob.onclick=(function(input,drop,mimetypes,options){
        return function(){
            getFile(mimetypes,options,function(data,metadata){
                var e;
                if(options['multiple']){
                    var urls=[];
                    var filenames=[];
                    for(j=0;j<data.length;j++){
                        urls.push(data[j]['url']);
                        filenames.push(data[j]['data']['filename']);
                    }
                    input.value=urls.join();
                    onFilesUploaded(input,drop,filenames.join(', '));
                    fireOnChangeEvent(input,data);
                }else{
                    input.value=data;
                    onFilesUploaded(input,drop,metadata['filename']);
                    fireOnChangeEvent(input,[{
                        url:data,
                        data:metadata
                    }]);
                }
            });
        return false;
    };
    
})(base,odrag,mtypes,fpoptions);
};

var onFilesUploaded=function(input,odrag,text){
    odrag.innerHTML=text;
    odrag.style.width=Math.max(0,odrag.offsetWidth-10)+"px";
    odrag.style.padding="2px 4px";
    odrag.style.cursor="default";
    var cancel=document.createElement("span");
    cancel.innerHTML="X";
    cancel.style.borderRadius="8px";
    cancel.style.fontSize="14px";
    cancel.style['float']="right";
    cancel.style.padding="0 3px";
    cancel.style.color="#600";
    cancel.style.cursor="pointer";
    var clickFn=function(e){
        if(!e){
            e=window.event;
        }
        e.cancelBubble=true;
        if(e.stopPropagation){
            e.stopPropagation();
        } 
        setupDragContainer(odrag);
        var canDragDrop=(!!window.FileReader||navigator.userAgent.indexOf("Safari")>=0)&&('draggable'in odrag);
        if(!canDragDrop){
            odrag.innerHTML='&nbsp;';
        }else{
            odrag.innerHTML=input.getAttribute('data-fp-drag-text')||"Or drop files here";
        }
        input.value='';
        fireOnChangeEvent(input);
        return false;
    };
    
    if(cancel.addEventListener){
        cancel.addEventListener("click",clickFn,false);
    }else if(cancel.attachEvent){
        cancel.attachEvent("onclick",clickFn);
    }
    odrag.appendChild(cancel);
};

var setupDragContainer=function(odrag){
    odrag.style.border="1px dashed #AAA";
    odrag.style.display="inline-block";
    odrag.style.margin="0 0 0 4px";
    odrag.style.borderRadius="3px";
    odrag.style.backgroundColor="#F3F3F3";
    odrag.style.color="#333";
    odrag.style.fontSize="14px";
    odrag.style.lineHeight="22px";
    odrag.style.padding="2px 4px";
    odrag.style.verticalAlign="middle";
    odrag.style.cursor="pointer";
    odrag.style.overflow="hidden";
};

var setupDropPane=function(odrag,fpoptions,input){
    var text=odrag.innerHTML;
    var pbar;
    makeDropPane(odrag,{
        multiple:fpoptions['multiple'],
        persist:fpoptions['persist'],
        maxsize:fpoptions['maxsize'],
        mimetypes:fpoptions['mimetypes'],
        dragEnter:function(){
            odrag.innerHTML="Drop to upload";
            odrag.style.backgroundColor="#E0E0E0";
            odrag.style.border="1px solid #000";
        },
        dragLeave:function(){
            odrag.innerHTML=text;
            odrag.style.backgroundColor="#F3F3F3";
            odrag.style.border="1px dashed #AAA";
        },
        error:function(type,msg){
            if(type=="TooManyFiles"){
                odrag.innerHTML=msg;
            }else if(type=="WrongType"){
                odrag.innerHTML=msg;
            }else if(type=="NoFilesFound"){
                odrag.innerHTML=msg;
            }else if(type=="UploadError"){
                odrag.innerHTML="Oops! Had trouble uploading.";
            }
        },
    begin:function(files){
        pbar=setupProgress(odrag);
    },
    progress:function(percentage){
        if(pbar){
            pbar.style.width=percentage+"%";
        }
    },
    done:function(data){
        var vals=[];
        var filenames=[];
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            vals.push(obj['url']);
            filenames.push(obj['data']['filename']);
        }
        input.value=vals.join();
        onFilesUploaded(input,odrag,filenames.join(', '));
        fireOnChangeEvent(input,data);
    }
});
};

var uploadFileAjax=function(file,success,error,progress,options){
    options=options||{};
    
    options['persist']=!!options['persist'];
    var xhr=new XMLHttpRequest();
    xhr.upload.addEventListener("progress",progress,false);
    var filename=file.name||file.fileName;
    var url=endpoints.tempStorage+filename+"?apikey="+apiKey+"&persist="+options['persist'];
    data=new FormData();
    data.append('fileUpload',file);
    utilities.ajax({
        xhr:xhr,
        method:'POST',
        url:url,
        json:true,
        success:success,
        error:error,
        processData:false,
        data:data
    });
};

var setupProgress=function(odrag){
    var pbar=document.createElement("div");
    var height=odrag.offsetHeight-2;
    pbar.style.height=height+"px";
    pbar.style.backgroundColor="#0E90D2";
    pbar.style.width="2%";
    pbar.style.borderRadius="3px";
    odrag.style.padding="0";
    odrag.style.width=(odrag.offsetWidth+6)+"px";
    odrag.style.border="1px solid #AAA";
    odrag.style.backgroundColor="#F3F3F3";
    odrag.style.boxShadow="inset 0 1px 2px rgba(0, 0, 0, 0.1)";
    odrag.innerHTML="";
    odrag.appendChild(pbar);
    return pbar;
};

var fireOnChangeEvent=function(input,files){
    var e;
    if(document.createEvent){
        e=document.createEvent('Event');
        e.initEvent("change",true,false);
        e.eventPhase=2;
        e.currentTarget=e.srcElement=e.target=input;
        e.files=files;
        input.dispatchEvent(e);
    }else if(document.createEventObject){
        e=document.createEventObject('Event');
        e.eventPhase=2;
        e.currentTarget=e.srcElement=e.target=input;
        e.files=files;
        input.fireEvent('onchange',e);
    }else if(input.onchange){
        input.onchange(files);
    }
};

var chunkedUpload=function(file,success,error,progress,options){
    var urls={};
    
    urls.startMultipart=BASE_URL+"/api/path/storage/?multipart=start";
    urls.sendMultipart=BASE_URL+"/api/path/storage/?multipart=upload";
    urls.finishMultipart=BASE_URL+"/api/path/storage/?multipart=end";
    options=options||{};
    
    options['persist']=!!options['persist'];
    var count=0;
    var chunksizeMB=MAX_CHUNK_SIZE;
    var total=Math.ceil(file.size/chunksizeMB);
    var data={
        'name':file.name||file.fileName,
        'size':file.size
        };
        
    utilities.ajax({
        method:"POST",
        url:urls.startMultipart,
        json:true,
        data:{
            "apikey":apiKey,
            "persist":options['persist'],
            "name":file.name||file.fileName,
            "size":file.size
            },
        success:function(response){
            if(response.result!="ok"){
                error(response);
                return;
            }
            var uploadId=response['data']['id'];
            if(!uploadId){
                if(window.console&&window.console.error){
                    window.console.error("Couldn't find multipart id");
                }
            }
        var onChunkComplete=function(e){
            count++;
            progress({
                loaded:count,
                total:total,
                lengthComputable:true
            });
            if(count===total){
                utilities.ajax({
                    method:"POST",
                    url:urls.finishMultipart,
                    data:{
                        'id':uploadId,
                        'total':total,
                        'apikey':apiKey
                    },
                    success:success,
                    json:true
                });
            }
        };
        
    var retries={};    
    var onChunkError=function(index,part){
        return function(e){
            if(!retries[index]){
                retries[index]=0;
            }
            retries[index]++;
            if(retries[index]>opts.maxretries){
                error.call(this);
            }
            attemptChunk(index,part);
        };
    
    };
    
    var attemptChunk=function(index,part){
        var url=urls.sendMultipart+"&id="+uploadId+"&index="+index+"&apikey="+apiKey;
        data=new FormData();
        data.append('fileUpload',part);
        utilities.ajax({
            method:'POST',
            url:url,
            json:true,
            success:onChunkComplete,
            error:onChunkError(index,part),
            processData:false,
            data:data
        });
    };
    
    var onEach=function(index,part){
        attemptChunk(index,part);
    };
    
    var i;
    if(file.mozSlice){
        for(i=0;i<total;i++){
            onEach(i,file.mozSlice(i*chunksizeMB,(i+1)*chunksizeMB));
        }
        }else if(file.webkitSlice){
    for(i=0;i<total;i++){
        onEach(i,file.webkitSlice(i*chunksizeMB,(i+1)*chunksizeMB));
    }
    }else if(file.slice){
    var mozilla_version=/(mozilla)(?:.*? rv:([\w.]+))?/;
    var match=mozilla_version.exec(navigator.userAgent);
    if(match[2]&&parseInt(match[2],10)>=13){
        for(i=0;i<total;i++){
            onEach(i,file.slice(i*chunksizeMB,(i+1)*chunksizeMB));
        }
        }else{
    for(i=0;i<total;i++){
        onEach(i,file.slice(i*chunksizeMB,chunksizeMB));
    }
    }
}else{
    total=1;
    onEach(0,file);
}
}
});
};
var uploadFileWrapper=function(fileinput,success,failure,progress,retries,options){
    retries=retries||MAX_RETRIES;
    success=success||function(){};
    
    failure=failure||function(){};
    
    progress=progress||function(){};
    
    if(!fileinput.value){
        throw new FilepickerException("File input is empty");
    }
    var html5Upload=!!window.FormData&&!!window.XMLHttpRequest;
    if(html5Upload){
        ajaxFileWrapper(fileinput,success,failure,progress,retries,options);
    }else{
        iframeFileWrapper(fileinput,success,failure,options);
    }
};

var ajaxFileWrapper=function(fileinput,success,failure,progress,retries,options){
    if(fileinput.files.length==1){
        ajaxSingleFileWrapper(fileinput.files[0],success,failure,progress,retries);
    }else{
        var count=0;
        var total=fileinput.files.length;
        var output=[];
        var done=false;
        var percentages={};
        
        var updatePercent=function(){
            var sum=0;
            for(index in percentages){
                sum+=(percentages[index]||0);
            }
            progress(sum/total);
        };
        
        var getMultiProgress=function(i){
            return function(percentage){
                percentages[i]=percentage;
                updatePercent();
            };
        
    };
    
    var multiSuccess=function(result){
        if(done){
            return;
        }
        output.push(result);
        count++;
        if(count==total){
            done=true;
            success(output);
        }
    };
    
var multiFail=function(msg){
    done=true;
    failure(msg);
};

for(var i=0;i<fileinput.files.length;i++){
    ajaxSingleFileWrapper(fileinput.files[i],multiSuccess,multiFail,getMultiProgress(i),retries,options);
}
}
};

var ajaxSingleFileWrapper=function(file,success,failure,progress,retries,options){
    var ajax_progress=function(e){
        if(e.lengthComputable){
            progress(Math.round((e.loaded*95)/e.total));
        }
    };
    
var num_tries=0;
var ajax_error=function(text){
    num_tries++;
    if(num_tries>retries){
        failure(text);
    }else{
        uploadFileAjax(file,ajax_success,ajax_error,ajax_progress,options);
    }
};

var ajax_success=function(response){
    if(response['result']=='error'){
        ajax_error(response['error']['msg']);
        return;
    }
    progress(100);
    success(response['data'][0]);
};

uploadFileAjax(file,ajax_success,ajax_error,ajax_progress,options);
};
var iframeFileWrapper=function(fileinput,success,failure,options){
    options=options||{};
    
    options['persist']=!!options['persist'];
    openCommIframe();
    var iframe_id="upload_iframe";
    var uploadIFrame;
    uploadIFrame=document.createElement("iframe");
    uploadIFrame.id=iframe_id;
    uploadIFrame.name=iframe_id;
    uploadIFrame.style.display='none';
    document.body.appendChild(uploadIFrame);
    handlers.attachHandler('upload',getReceiveUploadMessage(success,failure));
    var form=document.createElement("form");
    form.method="POST";
    form.action=endpoints.tempStorage+"?format=iframe&apikey="+apiKey+"&persist="+options['persist'];
    form.encoding=form.enctype="multipart/form-data";
    form.target=iframe_id;
    document.body.appendChild(form);
    var oldParent=fileinput.parentNode;
    var oldSibling=fileinput.nextSibling;
    var oldName=fileinput.name;
    fileinput.name="fileUpload";
    form.appendChild(fileinput);
    window.setTimeout(function(){
        form.submit();
        oldParent.insertBefore(fileinput,oldSibling);
        fileinput.name=oldName;
        fileinput.focus();
    },1);
};

var getReceiveUploadMessage=function(success,failure){
    var handler=function(data){
        if(data.type!=="Upload"){
            return;
        }
        var response=data.payload;
        if(response['result']=='ok'){
            if(success&&typeof success==="function"){
                success(response['data']);
            }
        }else{
        if(failure&&typeof failure==="function"){
            failure(response['msg']);
        }
    } 
handlers.detachHandler("Upload");
};

return handler;
};
var makeDropPane=function(div,options){
    if(!div){
        throw new FilepickerException("No DOM element found to create drop pane");
    }
    if(div.jquery){
        if(div.length===0){
            throw new FilepickerException("No DOM element found to create drop pane");
        }
        div=div[0];
    }
    var safari=(navigator.vendor&&navigator.vendor.indexOf('Apple')>=0);
    var dragdrop=(!!window.FileReader||safari)&&('draggable'in document.createElement('span'));
    if(!dragdrop){
        if(window.console&&window.console.error){
            window.console.error("Your browser doesn't support drag-drop functionality");
        }
        return false;
    }
    options=options||{};    
    var dragEnter=options['dragEnter']||function(){};
    
    var dragLeave=options['dragLeave']||function(){};
    
    var begin=options['begin']||function(){};
    
    var done=options['done']||function(){};
    
    var error=options['error']||function(){};
    
    var progress=options['progress']||function(){};
    
    var mimetypes=options['mimetypes']||'*/*';
    if(utilities.typeOf(mimetypes)=='string'){
        mimetypes=mimetypes.split(',');
    }
    var uploadOptions={
        persist:!!options['persist']
        };        
    div.addEventListener("dragenter",function(e){
        dragEnter();
        e.stopPropagation();
        e.preventDefault();
        return false;
    },false);
    div.addEventListener("dragleave",function(e){
        dragLeave();
        e.stopPropagation();
        e.preventDefault();
        return false;
    },false);
    div.addEventListener("dragover",function(e){
        e.preventDefault();
        return false;
    },false);
    div.addEventListener("drop",function(e){
        e.stopPropagation();
        e.preventDefault();
        var files=e.dataTransfer.files;
        if(verifyUpload(files)){
            begin(files);
            uploadFiles(files,done,error,progress,uploadOptions);
        }
    });
var verifyUpload=function(files){
    if(files.length>0){
        if(files.length>1&&!options['multiple']){
            error("TooManyFiles","Only one file at a time");
            return false;
        } 
        var found;
        var file;
        for(var i=0;i<files.length;i++){
            found=false;
            file=files[i];
            for(var j=0;j<mimetypes.length;j++){
                var mimetype=utilities.getMimetype(file);
                found=found||utilities.matchesMimetype(mimetype,mimetypes[j]);
            }
            if(!found){
                error("WrongType",(file.name||file.fileName)+" isn't the right type of file");
                break;
            }
        } 
    if(found){
        return true;
    }
}else{
    error("NoFilesFound","No files uploaded");
}
return false;
};

return true;
};

var uploadFiles=function(files,done,error,progressFn,options){
    var progresses={};
    
    var finished=0;
    var out=[];
    var updateProgress=function(){
        var total=0;
        for(i in progresses){
            total+=progresses[i];
        }
        percentage=total/files.length;
        progressFn(percentage);
    };
    
    var getProgressUpdateFn=function(i){
        return function(progress){
            progresses[i]=progress;
            updateProgress();
        };
    
};

var getOnDoneFn=function(i){
    return function(response){
        response['data']['filename']=files[i].name||files[i].fileName||response['data']['filename'];
        response['data']['size']=files[i].size||response['data']['size'];
        response['data']['type']=files[i].type||response['data']['type'];
        out=out||[];
        out.push(response);
        finished++;
        if(finished>=files.length){
            done(out);
        }
    };

};

for(var i=0;i<files.length;i++){
    uploadSingleFile(files[i],getOnDoneFn(i),error,getProgressUpdateFn(i),options);
}
};

var uploadSingleFile=function(file,done,error,updateProgress,options){
    var progress=function(e){
        if(e.lengthComputable){
            updateProgress(Math.round((e.loaded*95)/e.total));
        }
    };
    
var filename=file.name||file.fileName;
var retries=0;
var onError=function(text){
    retries++;
    if(retries>MAX_RETRIES){
        error('UploadError');
    }else{
        uploadFileAjax(file,onSuccess,onError,progress,options);
    }
};

var onSuccess=function(response){
    if(response['result']=='ok'){
        updateProgress(100);
        var data=response['data'];
        if(!isArray(data)||data.length===0){
            onError("No files found");
        }
        done(response['data'][0]);
    }else{
        onError(response['error']['msg']);
    }
};

var canSlice=!!(file.mozSlice||file.webkitSlice||file.slice);
if(file.size>MAX_CHUNK_SIZE&&canSlice){
    chunkedUpload(file,onSuccess,onError,progress,options);
}else{
    uploadFileAjax(file,onSuccess,onError,progress,options);
}
};

var defaultTo=function(map,key,def){
    if(map[key]===undefined){
        return def;
    }
    return map[key];
};

if(document.querySelectorAll){
    var func=function(){
        constructOpenWidgets();
        constructSaveWidgets();
        constructDragWidgets();
    };
    
    utilities.addOnLoad(func);
}
return{
    closeModal:closeModal,
    uploadFile:uploadFileWrapper,
    makeDropPane:makeDropPane,
    getFile:getFile,
    saveAs:saveFileAs,
    MIMETYPES:MIMETYPES,
    SERVICES:SERVICES,
    setKey:setAPIKey,
    getUrlFromData:getUrlFromData,
    revokeFile:revokeFile,
    getContents:getContents,
    constructOpenWidget:constructOpenWidget,
    constructSaveWidget:constructSaveWidget,
    constructDragWidget:constructDragWidget,
    _oci:openCommIframe
};

})();