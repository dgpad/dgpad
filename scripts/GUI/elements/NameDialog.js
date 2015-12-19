/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function NameDialog(_canvas) {
    var me = this;
    var canvas = _canvas;
    var codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
    var marginLeft = 5,
        marginTop = 5,
        space = 2;
    if (!Object.touchpad) {
        space = 5;
        marginLeft = 10;
        marginTop = 10;
    }
    var bl = marginLeft,
        bt = marginTop;
    var btnsize = (canvas.getBounds().width - 2 * marginLeft - 25 * space) / 26;
    var nblines = codes.split("_").length;

    var parent = $U.extend(this, new SimpleDialog(_canvas, 0, 0, canvas.getBounds().width, nblines * btnsize + 2 * marginTop + (nblines - 1) * space));


    var start = 0;
    var bnd = me.getBounds();
    var btns = [];

    var btnMouseUp = function(ev) {
        var target = ev.target || ev.srcElement;
        start = target.index;
        me.actualiseBtns();
    };
    //    var btnTouchEnd=function(tch){
    //        var target = tch.target || tch.srcElement;
    //        start=target.index;
    //        me.actualiseBtns();
    //    };

    for (var i = 0; i < codes.length; i++) {
        if (codes.charAt(i) === "_") {
            bl = marginLeft;
            bt += space + btnsize;
        } else {
            var btn = new Button(me);
            var browser = $U.browserCode();
            btns.push(btn);
            if (bl + btnsize + marginLeft > me.getBounds().width + 1) {
                bl = marginLeft;
                bt += space + btnsize;
            }
            btn.setBounds(bl, bt, btnsize, btnsize);
            btn.setText(codes.charAt(i));
            btn.setStyles("border-radius:3px;border:1px solid #b4b4b4;font-family:Verdana;font-size:16px;font-weight:normal;color:#FFF;background-color:#FEFEFE");
            btn.getDocObject().index = btns.length - 1;
            me.addContent(btn);
            bl += space + btnsize;
        }
        btn.addUpEvent(btnMouseUp);
    }

    var setStartSymbol = function(st) {
        start = st;
        var Cn = canvas.getConstruction();
        while (Cn.find(btns[start].getText())) {
            start = (start + 1) % (btns.length);
        }
        var btn = btns[start];
        btn.setStyles("font-weight:bold;font-size:20px");
    };

    me.getName = function() {
        var btn = btns[start];
        return btn.getText();
    };

    me.actualiseBtns = function() {
        var len = btns.length;
        var Cn = canvas.getConstruction();
        for (var i = 0; i < len; i++) {
            var btn = btns[i];
            btn.getDocObject().blur();
            btn.setStyles("font-weight:normal;font-size:16px");
            if (Cn.find(btn.getText())) {
                btn.getDocObject().disabled = true;
                btn.setStyles("color:#AAAAAA");
            } else {
                btn.getDocObject().disabled = false;
                btn.setStyles("color:#222222");
            }
        }
        setStartSymbol(start);
    };

    me.actualiseBtns();


    // when the name dialog is closed :
    parent.callBackClose = function() {
        canvas.nameDialog = null;
    };


};
