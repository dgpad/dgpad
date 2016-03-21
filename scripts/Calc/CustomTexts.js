function CustomTexts(_owner) {
    var me = this;
    var owner = _owner;
    var txts = [];
    var active_elt = null;
    var firstActivation = true;



    me.filterKB = function(_standardON) {};

    me.getActive = function() {
        return active_elt;
    };

    me.add = function(_lbl, _l, _t, _w, _h) {
        var txt = new CustomTextInput(me, owner, _lbl);
        txt.setBounds(_l, _t, _w, _h);
        //        owner.addContent(txt);
        txts.push(txt);
        return txt;
    };

    me.removeAll = function() {
        for (var i = 0; i < txts.length; i++) {
            if (txts[i].getDocObject().parentNode !== null)
                owner.removeContent(txts[i]);
        };
        owner.getDocObject().innerHTML = "";
        txts = [];
    };

    me.deactiveAll = function() {
        for (var i = 0; i < txts.length; i++) {
            txts[i].setActive(false);
        }
        active_elt = null;
    };

    me.close = function() {
        me.removeAll();
        window.removeEventListener("keypress", keypress, false);
        window.removeEventListener("keydown", keydown, false);
        window.removeEventListener("keyup", keyup, false);
    };

    me.focus = function() {};
    me.setFirst = function(_b) {
        firstActivation = _b;
    };

    me.activate = function(txt) {
        if (active_elt !== txt) {
            if (firstActivation) {
                owner.createObj();
                firstActivation = false;
            }
            me.deactiveAll();
            txt.setActive(true);
            active_elt = txt;
            me.focus();
        }
    };

    me.insertText = function(_st) {
        if (active_elt != null)
            active_elt.insertText(_st);
    };

    me.showKB = function() {
        if (active_elt != null)
            active_elt.showKB();
    };
    me.nextCar = function() {
        if (active_elt != null)
            active_elt.nextCar();
    };

    var maybesimplequote = false;

    var keypress = function(ev) {
        //        console.log("keypress");
        var key = ev.keyCode || ev.charCode;
        //        console.log("keypress=" + key);
        // Simple quote :
        if (maybesimplequote && (key === 39)) {
            me.insertText("'");
            ev.preventDefault();
            return false;
        };
        // Point décimal: 
        if (key === 46) {
            me.insertText(".");
            ev.preventDefault();
            return false;
        };
        if ((key === 8) || (key === 13) || (key === 27) || (key === 37) || (key === 39) || (key === 46))
            return;
        if (active_elt === null)
            return false;
        me.insertText(String.fromCharCode(key));
        ev.preventDefault();
        return false;
    };
    var keydown = function(ev) {
        //        console.log("keydown");
        maybesimplequote = false;
        if (active_elt === null)
            return false;
        var key = ev.keyCode || ev.charCode;
        //        console.log("keydown=" + key);
        switch (key) {
            case 8: //DEL
                active_elt.executeCommand("DEL");
                break;
            case 13: //ENTER
                owner.valid();
                break;
            case 27: //ESC
                owner.cancel();
                break;
            case 37: //LEFT
                active_elt.executeCommand("LEFT");
                break;
            case 39: //RIGHT
                active_elt.executeCommand("RIGHT");
                break;
            case 46: //CLR
                active_elt.executeCommand("CLR");
                break;
            case 52:
            case 222: //guillemet simple
                maybesimplequote = true;
                return true;
                //                me.insertText(String.fromCharCode(39));
                break;
            default:
                return true;
        }
        ev.preventDefault();
        return false;
    };

    var keyup = function(ev) {
        ev.preventDefault();
        return false;
    }


    me.setKeyEvents = function(_standardKB) {
        if (Object.touchpad)
            return;
        if (_standardKB) {
            window.removeEventListener("keypress", keypress, false);
            window.removeEventListener("keydown", keydown, false);
            window.removeEventListener("keyup", keyup, false);
        } else {
            window.addEventListener("keypress", keypress, false);
            window.addEventListener("keydown", keydown, false);
            window.addEventListener("keyup", keyup, false);
            window.addEventListener("paste", function(ev) {
                //                console.log(ev.clipboardData.getData('text/plain'));
                //                alert(ev.clipboardData.getData('text/plain'));
            }, false);
        }
    }
}
