function BlocklyPanel(_owner, _showsettings, _closeCallback, _currentTabCallBack, _height) {
    var me = this;
    var cb_src = $APP_PATH + "NotPacked/images/dialog/closebox.svg"; // Closebox image
    var mn_src = $APP_PATH + "NotPacked/images/dialog/settings.svg"; // Closebox image
    var rz_src = $APP_PATH + "NotPacked/images/dialog/resize.svg"; // Closebox image
    var tl_str = "DG-Blocks"; // Window title
    var tl_height = 28; // Title bar height
    var cb_width = 20; // Close box width
    var cb_margin_top = 3; // Margins from top
    var cb_margin_right = 5; // Margins from right
    var mn_width = 20; // Close box width
    var mn_margin_top = 3; // Margins from top
    var mn_margin_left = 5; // Margins from left
    var rz_width = 20; // Resize box width
    var rz_margin = 3; // Resize box margin
    var p_margin = 20; // Panel margin from top and bottom
    var tb_height = 30; // Bottom toolbar height
    var left = 0,
        top = 0,
        width = 0,
        height = 0;

    var tabs = []; // tab set
    var tab_width = 80; // tab width
    var tab_height = 20; // tab height
    var tab_gap = 5; // gap between tabs
    var tab_left_margin = 124; // space before tabs
    var current_tab = -1; // Current selected tab


    me.getMode = function() {
        return current_tab;
    }


    me.setbounds = function(l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        wp.bnds(l, t, w, h);
        tl.bnds(0, 0, w, tl_height);
        tl.stl("line-height", tl_height + "px");
        cb.bnds(w - cb_width - cb_margin_right, cb_margin_top, cb_width, cb_width);
        mn.bnds(mn_margin_left, mn_margin_top, mn_width, mn_width);
        ct.bnds(0, tl_height, w, h - tl_height - tb_height);
        // rl.bnds(w - rl_width, 0, rl_width, h);
        tb.bnds(0, h - tb_height, w, tb_height);
        rz.bnds(w - rz_width - rz_margin, h - rz_width - rz_margin, rz_width, rz_width);
        if (typeof Blockly !== 'undefined') Blockly.fireUiEvent(window, 'resize');
    }

    me.getBounds = function() {
        return {
            l: left,
            t: top,
            w: width,
            h: height
        }
    }

    me.hide = function(_ev) {
        // window.prompt(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace))
        // Blockly.mainWorkspace.updateToolbox('<xml id="toolbox" style="display: none"><block type="dgpad_point"></block></xml>');
        _closeCallback();
        // _ev.stopPropagation();
        _ev.preventDefault();
        setTimeout(function() {
            wp.stls("transform:scale(0)");
        }, 1);
        setTimeout(function() {
            if (typeof Blockly !== 'undefined') Blockly.fireUiEvent(window, 'resize');
            _owner.removeChild(wp);
        }, 210);
    };

    me.show = function() {
        if (wp.parentNode === null) _owner.appendChild(wp);
        setTimeout(function() {
            wp.stls("transform:scale(1)");
        }, 1);
        setTimeout(function() {
            me.setbounds(left, top, width, height)
        }, 310);
    };

    me.isHidden = function() {
        return (wp.parentNode === null);
    }

    me.setTitle = function(name) {
        tl.innerHTML = tl_str + " : " + name;
    }


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
        var h = (height + ev.pageY - yy < 100) ? height : (height + ev.pageY - yy);
        me.setbounds(left, top, w, h);
        xx = ev.pageX;
        yy = ev.pageY;
    }

    var resizedown = function(ev) {
        ev.preventDefault();
        xx = ev.pageX;
        yy = ev.pageY;
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
        }
        el.mm = function(_p) {
            el.addEventListener('touchmove', _p, false);
            el.addEventListener('mousemove', _p, false);
        }
        el.mu = function(_p) {
            el.addEventListener('touchend', _p, false);
            el.addEventListener('mouseup', _p, false);
        }
        return el;
    };

    var select_tab = function(_s) {
        // console.log(_s);
        if (_s !== current_tab) {
            current_tab = _s;
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].stls("background-color:rgba(90,90,90,1);color:rgba(230,230,230,1)");
            };
            tabs[_s].stls("background-color:rgba(245,245,245,1);color:rgba(30,30,30,1)");
        }
    }

    me.selectTab = function(_i) {
        select_tab(_i);
    }

    var createtab = function(_n, _c) {
        var t = createDiv();
        var i = tabs.length;
        t.md(function(ev) {
            ev.preventDefault();
            select_tab(i);
            _currentTabCallBack();
        });
        t.stls("cursor:pointer;border-left: 1px solid #b4b4b4;border-bottom: 1px solid #b4b4b4;border-right: 1px solid #b4b4b4;background-color:rgba(90,90,90,1);color:rgba(230,230,230,1);position:absolute;border-bottom-right-radius:10px;width:" + tab_width + "px;height:" + tab_height + "px;font-size: 14px;font-weight:normal;font-family: Helvetica, Arial, sans-serif;text-align: center;white-space: pre-wrap;margin: 0px;line-height:" + tab_height + "px;vertical-align:middle;top:" + (-1) + "px;left:" + (tab_left_margin + tabs.length * (tab_width + tab_gap)) + "px");
        t.innerHTML = _n;
        tb.add(t);
        tabs.push(t);
    }

    var wp = createDiv(); // main div wrapper
    var tl = createDiv(); // title bar div
    var mn = createDiv(); // Contextual menu div
    var cb = createDiv(); // close box div
    var ct = createDiv(); // content div
    var rz = createDiv(); // resize box div
    var tb = createDiv(); // bottom toolbar div
    var xml = createDiv(); // div for loading Blockly categories
    // xml.att("id", "dgpad_xml");
    xml.bnds(0, 0, 0, 0);

    wp.stls("position:absolute;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:scale(0);z-index:1");
    tl.stls("cursor:all-scroll;background-color:rgba(210,210,210,1);position:absolute;font-size: 16px;font-family: Helvetica, Arial, sans-serif;text-shadow: 1px 1px 5px #777;text-align: center;white-space: pre-wrap;margin: 0px;vertical-align:middle");
    mn.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    mn.stl("background-image", "url(" + mn_src + ")");
    cb.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    cb.stl("background-image", "url(" + cb_src + ")");
    rz.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%;cursor:se-resize");
    rz.stl("background-image", "url(" + rz_src + ")");
    ct.stls("background-color:rgba(230, 230, 230, 0.5);position:absolute")
        // rl.stls("position:absolute;background-color:rgba(230,230,230,0.5);border: 0px;cursor:ew-resize")
    tb.stls("background-color:rgba(200, 200, 200, 0.9);position:absolute")
    tl.innerHTML = tl_str;

    cb.md(me.hide);
    mn.md(_showsettings);
    tl.md(dragdown);
    tl.mu(dragup);
    rz.md(resizedown);
    rz.mu(resizeup);

    me.setbounds(-1, p_margin - 1, 500, _height - 2 * p_margin);

    wp.add(xml);
    wp.add(tl);
    wp.add(ct);
    wp.add(tb);
    wp.add(cb);
    wp.add(mn);
    wp.add(rz);
    createtab($L.blockly.tab_exp);
    createtab($L.blockly.tab_drag);
    createtab($L.blockly.tab_mouseup);
    select_tab(0);
    

    me.show();

    me.DIV = ct;
    me.XML = xml;
}
