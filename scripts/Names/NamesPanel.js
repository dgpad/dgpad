function NamesPanel(_owner, _l, _t, _w, _h, _observerproc, _closeproc) {
    var me = this;
    var getNames = _observerproc;
    var cb_src = $APP_PATH + "NotPacked/images/dialog/closebox.svg"; // Closebox image
    // var tl_str = "DG-Blocks"; // Window title
    var tl_height = 30; // Title bar height
    var cb_width = 20; // Close box width
    var cb_margin = 5; // Close box margin from right
    var tb_height = 0; // Bottom toolbar height
    var left = _l,
        top = _t,
        width = _w,
        height = _h;
    var replace_mode = false; // edit mode
    var tabs = []; // tab set
    var mods = []; // modifiers
    var keys = []; // keyboard keys
    var modtab = ["", "'", "\"", "\u2080"];
    var tab_width = 60; // tab width
    var tab_height = 25; // tab height
    var tab_gap = 5; // gap between tabs
    var tab_left_margin = 70; // space before tabs
    var mod_width = 50; // modifier width
    var mod_height = 25; // modifier height
    var mod_margin = 10; // modifier left and right margin
    var key_width = 35; // keyboard key width
    var key_height = 30; // keyboard key height
    // var key_vmargin = 5;
    var current_tab = -1; // Current selected tab
    var current_mod = -1; // Current selected modifier
    var current_key = -1; // Current key
    var kb_margins = 10; // margins around keyboard

    var cbox_left = 5;
    var cbox_top = 2;
    var cbox_width = 60;
    var cbox_height = 30;

    me.isEditMode = function() {
        return replace_mode
    }
    var setEdit = function(_b) {
        replace_mode = _b
    }

    me.setbounds = function(l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        wp.bnds(l, t, w, h);
        tl.bnds(0, 0, w, tl_height);
        // tl.stl("line-height", tl_height + "px");
        cb.bnds(w - cb_width - cb_margin, (tl_height - cb_width) / 2, cb_width, cb_width);
        md.bnds(w - mod_width - 2 * mod_margin, tl_height, mod_width + 2 * mod_margin, h - tl_height - tb_height);
        kb.bnds(0, tl_height, w - mod_width - 2 * mod_margin, h - tl_height - tb_height);
        tb.bnds(0, h - tb_height, w, tb_height);
    }

    me.getBounds = function() {
        return {
            l: left,
            t: top,
            w: width,
            h: height
        }
    }

    me.hide = function() {
        setTimeout(function() {
            wp.stls("transform:scale(0)");
        }, 1);
        setTimeout(function() {
            _owner.removeChild(wp);
            _closeproc();
            // _owner.removeChild(cb);
        }, 210);
    };

    me.show = function() {
        if (wp.parentNode === null) _owner.appendChild(wp);

        // if (cb.parentNode === null) _owner.appendChild(cb);
        setTimeout(function() {

            wp.stls("transform:scale(1)");

            // cb.stls("transform:scale(1)");
        }, 1);
    };

    me.isVisible = function() {
        return (wp.parentNode !== null)
    };

    var xx = 0;
    var yy = 0;

    var dragmove = function(ev) {
        ev.preventDefault();
        me.setbounds(left + ev.pageX - xx, top + ev.pageY - yy, width, height);
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var dragdown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        yy = ev.pageY;
        window.addEventListener('touchmove', dragmove, false);
        window.addEventListener('touchend', dragup, false);
        window.addEventListener('mousemove', dragmove, false);
        window.addEventListener('mouseup', dragup, false);
    }

    var dragup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', dragmove, false);
        window.removeEventListener('touchend', dragup, false);
        window.removeEventListener('mousemove', dragmove, false);
        window.removeEventListener('mouseup', dragup, false);
    }

    var resizemove = function(ev) {
        ev.preventDefault();
        var w = (width + ev.pageX - xx < 100) ? width : (width + ev.pageX - xx);
        me.setbounds(left, top, w, height);
        xx = ev.pageX;
    }

    var resizedown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        window.addEventListener('touchmove', resizemove, false);
        window.addEventListener('touchend', resizeup, false);
        window.addEventListener('mousemove', resizemove, false);
        window.addEventListener('mouseup', resizeup, false);
    }

    var resizeup = function(ev) {
        ev.preventDefault();
        window.removeEventListener('touchmove', resizemove, false);
        window.removeEventListener('touchend', resizeup, false);
        window.removeEventListener('mousemove', resizemove, false);
        window.removeEventListener('mouseup', resizeup, false);
    }


    var createDiv = function() {
        var el = document.createElement("div");
        el.event_proc = [];
        el.stl = function(_p, _v) {
            el.style.setProperty(_p, _v);
        };
        el.att = function(_a, _v) {
            el[_a] = _v;
        };
        el.stls = function(_st) {
            var t = _st.split(";");
            for (var i = 0, len = t.length; i < len; i++) {
                var a = t[i].split(":");
                el.stl(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
            }
        }
        el.bnds = function(l, t, w, h) {
            el.stls("left:" + l + "px;top:" + t + "px;width:" + w + "px;height:" + h + "px");
        }
        el.add = function(_ch) {
            el.appendChild(_ch);
        }
        el.md = function(_p) {
            el.addEventListener('touchstart', _p, false);
            el.addEventListener('mousedown', _p, false);
            el.event_proc.push(_p);
        }
        el.mm = function(_p) {
            el.addEventListener('touchmove', _p, false);
            el.addEventListener('mousemove', _p, false);
            el.event_proc.push(_p);
        }
        el.mu = function(_p) {
            el.addEventListener('touchend', _p, false);
            el.addEventListener('mouseup', _p, false);
            el.event_proc.push(_p);
        }
        el.rmevt = function() {
            for (var i = 0; i < el.event_proc.length; i++) {
                el.removeEventListener('touchstart', el.event_proc[i], false);
                el.removeEventListener('mousedown', el.event_proc[i], false);
                el.removeEventListener('touchmove', el.event_proc[i], false);
                el.removeEventListener('mousemove', el.event_proc[i], false);
                el.removeEventListener('touchend', el.event_proc[i], false);
                el.removeEventListener('mouseup', el.event_proc[i], false);
            }
        }
        return el;
    };

    var wp = createDiv(); // main div wrapper
    var tl = createDiv(); // title bar div
    var cb = createDiv(); // close box div
    var md = createDiv(); // modifiers div
    var kb = createDiv(); // Keyboard div
    var rl = createDiv(); // resize vertical line div
    var tb = createDiv(); // bottom toolbar div



    wp.stls("position:absolute;z-index:9000;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:scale(0)");
    tl.stls("background-color:rgba(210,210,210,1);position:absolute");
    cb.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    cb.stl("background-image", "url(" + cb_src + ")");
    md.stls("background-color:rgba(230, 230, 230, 0.9);position:absolute");
    kb.stls("background-color:rgba(230, 230, 230, 0.9);position:absolute");
    tb.stls("background-color:rgba(200, 200, 200, 0.9);position:absolute");

    var showCurrentKey = function() {
        if (current_key === -1) return;
        var nmes = getNames(); // All names already used
        for (var i = current_key; i < keys.length; i++) {
            if (nmes.indexOf(keys[i].key) === -1) {
                current_key = i;
                keys[i].stls("background-color:rgba(50,50,50,1);color:rgba(230,230,230,1)");
                return;
            }
        }
        current_key = -1;
    };

    var seton = function(_i) {
        var t = keys[_i];
        t.stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
        t.rmevt();
        t.md(function() {
            selectkey(_i);
        });
    };

    me.refreshkeyboard = function() {
        var nmes = getNames(); // All names already used
        for (var i = 0; i < keys.length; i++) {
            var t = keys[i];
            if (nmes.indexOf(keys[i].key) != -1) {
                t.rmevt();
                t.stls("background-color:rgba(200,200,200,1);color:rgba(150,150,150,1)");
            } else {
                seton(i);
                // t.stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
            }
        }
        showCurrentKey();
        if (current_key === -1) {
            current_key = 0;
            showCurrentKey();
        }
    }

    var selectkey = function(_i) {
        current_key = _i;
        me.refreshkeyboard();
    }

    me.getName = function() {
        if (current_key !== -1) return keys[current_key].key
        else return "P"
    }


    var createkey = function(_s, _x, _y) {
        var t = createDiv();
        var i = keys.length;
        t.md(function() {
            selectkey(i);
        });
        t.stls("border: 1px solid #b4b4b4;background-color:rgba(200,200,200,1);color:rgba(30,30,30,1);position:absolute;border-radius:5px;width:" + key_width + "px;height:" + key_height + "px;font-size: 18px;font-weight:normal;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + key_height + "px;vertical-align:middle;top:" + _y + "px;left:" + _x + "px");
        t.innerHTML = _s;
        t.key = _s;
        kb.add(t);
        keys.push(t);
    }


    var initkeyboard = function() {
        // var l = tabs[current_tab].letters;
        keys = [];
        var kbd = tabs[current_tab].letters;
        var m = mods[current_mod].car;
        kb.innerHTML = "";
        var h = (height - tl_height - tb_height);
        var vgap = (h - kbd.length * key_height) / (kbd.length + 1);
        for (var i = 0; i < kbd.length; i++) {
            var w = width - mod_width - 2 * mod_margin;
            var hgap = (w - kbd[i].length * key_width) / (kbd[i].length + 1);
            for (var j = 0; j < kbd[i].length; j++) {
                createkey(kbd[i][j] + m, hgap + j * (key_width + hgap), vgap + i * (key_height + vgap));
            }
        }
        current_key = 0;
        me.refreshkeyboard();
    }

    var select_mod = function(_s) {
        current_mod = _s;
        for (var i = 0; i < mods.length; i++) {
            mods[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
        };
        mods[_s].stls("background-color:rgba(200,200,200,1);color:rgba(30,30,30,1)");
        initkeyboard();
    };

    var createmod = function(_c, _m) {
        var t = createDiv();
        var h = (height - tl_height - tb_height);
        var gap = (h - _m.length * mod_height) / (_m.length + 1);
        var i = mods.length;
        t.md(function() {
            select_mod(i)
        });
        t.stls("border: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-radius:5px;width:" + mod_width + "px;height:" + mod_height + "px;font-size: 18px;font-weight:bold;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + mod_height + "px;vertical-align:middle;top:" + (gap + i * (mod_height + gap)) + "px;left:" + mod_margin + "px");
        t.innerHTML = _c + _m[i];
        t.car = _m[i];
        md.add(t);
        mods.push(t);
    }

    var initmods = function(_c, _m) {
        mods = [];
        md.innerHTML = "";
        for (var i = 0; i < _m.length; i++) {
            createmod(_c, _m);
        };
    }

    var select_tab = function(_s) {
        if (_s !== current_tab) {
            current_tab = _s;
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
            };
            tabs[_s].stls("background-color:rgba(230,230,230,1);color:rgba(30,30,30,1)");
            initmods(tabs[_s].letters[0][0], modtab);
            select_mod(0);

        }
    }



    var createtab = function(_n, _c) {
        var t = createDiv();
        var i = tabs.length;
        t.md(function() {
            select_tab(i)
        });
        t.stls("border-left: 1px solid #b4b4b4;border-top: 1px solid #b4b4b4;border-right: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-top-right-radius:10px;width:" + tab_width + "px;height:" + tab_height + "px;font-size: 18px;font-weight:bold;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + tab_height + "px;vertical-align:middle;top:" + (tl_height - tab_height) + "px;left:" + (tab_left_margin + tabs.length * (tab_width + tab_gap)) + "px");
        t.innerHTML = _n;
        t.letters = _c.split("_");
        for (var k = 0; k < t.letters.length; k++) {
            t.letters[k] = t.letters[k].split("");
        }
        tl.add(t);
        tabs.push(t);
    }



    createtab("A", "ABCDEFGHI_JKLMNOPQR_STUVWXYZ");
    createtab("a", "abcdefghi_jklmnopqr_stuvwxyz");
    createtab("\u0394", "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398_\u0399\u039A\u039B\u039C\u039D\u039E\u039F\u03A0_\u03A1\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9");
    createtab("\u03B4", "\u03B1\u03B2\u03B3\u03B4\u03B5\u03B6\u03B7\u03B8\u03B9_\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF\u03C0\u03C1_\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9");
    select_tab(0);

    cb.md(me.hide);
    wp.md(dragdown);
    wp.mu(dragup);

    me.setbounds(left, top, width, height);

    wp.add(tl);
    wp.add(md);
    wp.add(kb);
    wp.add(tb);
    wp.add(cb);
    var editbox = new Checkbox(wp, cbox_left, cbox_top, cbox_width, cbox_height, replace_mode, "\u270D", setEdit);

    editbox.setTextFontSize(28);
    editbox.setTextColor("#252525");

    // me.show();

    // me.DIV = md;
}
