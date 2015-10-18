function HistoryPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var width = canvas.getWidth() - 50;
    var height = $P.localstorage.iconwidth + 110;
    $U.extend(this, new CenterPanel(canvas, width, height));

    me.show();
    new CloseBox(me, _closeProc);

    var wout = new GUIElement(me, "div");
    wout.setAbsolute();
    wout.setColor("rgba(0,0,0,0)");
    wout.setBounds(10, height - $P.localstorage.iconwidth - 90, width - 20, $P.localstorage.iconwidth + 50);
    wout.setStyle("overflow-x", "scroll");
    var d = wout.getDocObject();
    var mwheel = function(ev) {
        d.scrollLeft += $U.extractDelta(ev);
        ev.preventDefault();
    };
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    d.addEventListener(mousewheelevt, mwheel, false);

    var win = new GUIElement(me, "div");
    win.setAbsolute();
    win.setColor("rgba(0,0,0,0)");


    var winW = 0;
    for (var i = 1; i < ($P.localstorage.max + 1); i++) {
        if (localStorage.getItem($P.localstorage.base + i)) {
            winW += $P.localstorage.iconwidth + $P.localstorage.iconmargin;
            new HistoryPanel_Elt(win, canvas, i, _closeProc);
        }
    }
    win.setBounds(0, (wout.getBounds().height - $P.localstorage.iconwidth) / 2, winW, $P.localstorage.iconwidth);

    var com = new Label(me);
    com.setBounds(20, 0, width-40, 30);
    com.setText("<p style='line-height:100%'>" + $L.history_title + "</p>");
    com.setStyles("font-size:18px;color:#222222");
    wout.addContent(win);
    me.addContent(wout);
    me.addContent(com);
    
    var exe=function(ev){
        canvas.saveToLocalStorage();
        canvas.paint();
        _closeProc();
    }
    
    var add=new Button(me);
    add.setText("<span style='font-size:15px'>" +$L.history_save+ "</span>");
    add.setBounds((width-400)/2, height-35, 400, 30);
    add.addDownEvent(exe);
    me.addContent(add);
}

function HistoryPanel_Elt(_owner, _canvas, _i, _closeProc) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    var canvas = _canvas; 
    var c = JSON.parse(localStorage.getItem($P.localstorage.base + _i));
    me.setStyles("position:absolute;border-radius:10px;border: 1px solid #b4b4b4");
    me.setStyle("left", ((_i-1)*($P.localstorage.iconwidth+ $P.localstorage.iconmargin)) + "px");
    me.setStyle("width", $P.localstorage.iconwidth + "px");
    me.setStyle("height", $P.localstorage.iconwidth + "px");
    me.setColor("#FAFAFA");

    var load = function() {
        canvas.getConstruction().deleteAll();
        canvas.macrosManager.clearTools();
        canvas.textManager.clear();
        canvas.trackManager.clear();
        canvas.Interpret($U.base64_decode(c.src));
        canvas.forceArrowBtn();
        _closeProc();
    }

    var img = new GUIElement(me, "img");
    img.setAttr("src", c.img);
    img.setAbsolute();
    img.setBounds(0, 0, $P.localstorage.iconwidth, $P.localstorage.iconwidth);

    me.addContent(img);

    var cloneBtn = new Button(me);
   cloneBtn.setStyles("line-height:27px;vertical-align: middle;padding: 2px;text-align: center;font: 14px Arial, Helvetica, sans-serif;border-radius: 5px;color: #252525;border: 1px solid #b4b4b4;background-color: #EEEEEE");
   //    cloneBtn.setStyles("display: inline-block;zoom: 1;*display: inline;vertical-align: baseline;margin: 0 2px;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 12px/100% Arial, Helvetica, sans-serif;padding: .5em 2em .55em;text-shadow: 0 1px 1px rgba(0,0,0,.3);-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);box-shadow: 0 1px 2px rgba(0,0,0,.2);color: #d7d7d7;border: solid 1px #333;background: #333;background: -webkit-gradient(linear, left top, left bottom, from(#666), to(#000));background: -moz-linear-gradient(top,  #666,  #000)");
    cloneBtn.setText($L.history_open);
    cloneBtn.setBounds(($P.localstorage.iconwidth - 100) / 2, $P.localstorage.iconwidth - 35, 100, 27);
    cloneBtn.addUpEvent(load);


    var dateLbl = new Label(me);
    dateLbl.setText(c.date);
    dateLbl.setStyle("color", "#999999");
    dateLbl.setBounds(0, 3, $P.localstorage.iconwidth, 30);

    var imgwp = new GUIElement(me, "div");
    imgwp.setBounds(10, 5, 28, 28);
    imgwp.setAbsolute();
    imgwp.setColor("rgba(0,0,0,0)");
    imgwp.setStyles("cursor: pointer");
    var setImage = function() {
        imgwp.clearContent();
        imgwp.addImage($APP_PATH + "NotPacked/images/history/" + ((c.lock) ? "lock.svg" : "unlock.svg"));
    };
    setImage();
    var changeLock = function() {
        if ((!c.lock) && $U.isFullLocalStorage()) {
            alert($L.history_full);
            return;
        }
        c.lock = !c.lock;
        localStorage.setItem($P.localstorage.base + _i, JSON.stringify(c));
        setImage();
    };
    imgwp.addDownEvent(changeLock);


    me.addContent(dateLbl);
    me.addContent(cloneBtn);
    me.addContent(imgwp);
    _owner.addContent(me);



}