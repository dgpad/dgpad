function BlocklyPanel(_owner,_height) {
    var me = this;
    var cb_src = $APP_PATH + "NotPacked/images/dialog/closebox.svg"; // Closebox image
    // var tl_str = "DG-Blocks"; // Window title
    var tl_height = 0; // Title bar height
    var cb_width = 25; // Close box width
    var cb_margin=10; // Margins from top
    var p_margin=0; // Panel margin from top and bottom
    var tb_height = 0; // Bottom toolbar height
    var rl_width = 5; // Resize vertical line width
    var left = 0,
        top = 0,
        width = 0,
        height = 0;


    me.setbounds = function(l, t, w, h) {
        left = l;
        top = t;
        width = w;
        height = h;
        wp.bnds(l, t, w, h);
        tl.bnds(0, 0, w-rl_width, tl_height);
        tl.stl("line-height", tl_height + "px");
        cb.bnds(w - cb_width-rl_width, tl_height+cb_margin, cb_width, cb_width);
        ct.bnds(0, tl_height, w - rl_width, h - tl_height - tb_height);
        rl.bnds(w - rl_width, 0, rl_width, h);
        tb.bnds(0, h - tb_height, w, tb_height);
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

    me.hide = function() {
        window.prompt(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace))
            // Blockly.mainWorkspace.updateToolbox('<xml id="toolbox" style="display: none"><block type="dgpad_point"></block></xml>');
            // setTimeout(function() {
            //     wp.stls("transform:scale(0)");
            // }, 1);
            // setTimeout(function() {
            //     _owner.removeChild(wp);
            // }, 210);
    };

    me.show = function() {
        if (wp.parentNode === null) _owner.appendChild(wp);
        setTimeout(function() {
            wp.stls("transform:scale(1)");
        }, 1);
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

    var wp = createDiv(); // main div wrapper
    var tl = createDiv(); // title bar div
    var cb = createDiv(); // close box div
    var ct = createDiv(); // content div
    // var rz = createDiv(); // resize box div
    var rl = createDiv(); // resize vertical line div
    var tb = createDiv(); // bottom toolbar div
    var xml = createDiv(); // div for loading Blockly categories
    xml.att("id", "dgpad_xml");
    xml.bnds(0, 0, 0, 0);

    wp.stls("position:absolute;border-top-right-radius:0px;border-bottom-right-radius:0px;overflow:hidden;border: 1px solid #b4b4b4;transition:transform 0.2s linear;transform:scale(0)");
    tl.stls("background-color:rgba(210,210,210,1);position:absolute;font-size: 16px;font-family: Helvetica, Arial, sans-serif;text-shadow: 1px 1px 5px #777;text-align: center;white-space: pre-wrap;margin: 0px;vertical-align:middle");
    cb.stls("background-color:rgba(0,0,0,0);position:absolute;background-position:center;background-repeat:no-repeat;background-size:100% 100%");
    cb.stl("background-image", "url(" + cb_src + ")");
    ct.stls("background-color:rgba(230, 230, 230, 0.9);position:absolute")
    rl.stls("position:absolute;background-color:rgba(230,230,230,0.5);border: 0px;cursor:ew-resize")
    tb.stls("background-color:rgba(200, 200, 200, 0.9);position:absolute")
    // tl.innerHTML = tl_str;

    cb.md(me.hide);
    tl.md(dragdown);
    tl.mu(dragup);
    rl.md(resizedown);
    rl.mu(resizeup);

    me.setbounds(-1, p_margin-1, 500, _height-2*p_margin);

    wp.add(xml);
    wp.add(tl);
    wp.add(ct);
    wp.add(tb);
    wp.add(cb);
    wp.add(rl);

    me.show();

    me.DIV = ct;
}
