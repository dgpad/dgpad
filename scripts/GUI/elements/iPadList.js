function iPadList(_own, _proc, _nme, _l, _t, _w, _h) {
    var me = this;
    var items = [];
    var wr = new iPadDOMElt("div");
    var ct = new iPadDOMElt("div");
    var label = new iPadDOMElt("div");
    label.stl("position:absolute;left:0px;top:0px;width:" + _w + "px;height:30px;line-height:30px;color:#252525;font-family:Helvetica, Arial, sans-serif;font-size:13px;text-align:center");
    label.settxt(_nme);
    var rootLI = new iPadDOMElt("li");
    var currentUL = null;
    rootLI.childs = [];
    rootLI.parent = null;
    var backBtn = new iPadDOMElt("a");
    backBtn.attr("className", "iPadBtnBack");
    backBtn.settxt("Back");


    // Un item (pas un répertoire) a été tapé :
    var touchItem = function(_li) {
        _proc(_li, _li.macro);
    };

    // Si le bouton back a été pressé, _back est true,
    // sinon c'est qu'on a tapé sur un répertoire dans la liste :
    var touchDir = function(_li, _back) {

        if (currentUL)
            currentUL.transitionOUT(ct, _back);
        currentUL = new iPadDOMElt("ul");
        currentUL.location = _li;
        currentUL.attr("className", "iPadListUL");
        if (_back)
            currentUL.transform(-100);
        for (var i = 0; i < _li.childs.length; i++) {
            currentUL.add(_li.childs[i]);
        }
        ct.add(currentUL);
        currentUL.transitionIN();
        if (_li === rootLI)
            backBtn.stl("visibility:hidden");
        else {
            backBtn.stl("visibility:visible");
            backBtn.settxt(_li.gettxt());
            backBtn.evt(function(ev) {
                ev.preventDefault();
                touchDir(_li.parent, true);
            });
        }
    };


    var newDirLI = function(_parent) {
        var li = new iPadDOMElt("li");
        li.childs = [];
        li.parent = _parent;
        li.attr("className", "iPadListLI");
        li.evt(function(ev) {
            ev.preventDefault();
            touchDir(li, false);
        });
        return li;
    };


    var DirLI = function(_parent, _t) {
        for (var i = 0; i < _parent.childs.length; i++) {
            if (_parent.childs[i].gettxt() === _t)
                return _parent.childs[i];
        }
        var newLI = newDirLI(_parent);
        newLI.settxt(_t);
        var arrow = new iPadDOMElt("div");
        arrow.attr("className", "iPadArrowRight");
        newLI.add(arrow);
        _parent.childs.push(newLI);
        return newLI;
    };

    me.getCurrentPath = function() {
        if (!currentUL)
            return "";
        var path = "";
        var li = currentUL.location;
        while (li.parent) {
            path = li.gettxt() + "/" + path;
            li = li.parent;
        }
        return path;
    };

    // r est le refcon passé éventuellement à la methode me.append.
    // La liste se place dans le dossier contenant le LI cible, et
    // ensuite scroll la liste pour que le LI soit visible :
    me.targetLI = function(_r) {
        //        console.log("target!");
        var i = 0;
        while ((i < items.length) && (items[i].macro !== _r))
            i++;
        if (items[i].macro === _r) {
            var li = items[i];
            touchDir(li.parent, true);
            var pos = 0;
            while (li.parent.childs[pos] !== li)
                pos++;
            var tf = pos * li.o().offsetHeight;
            var d = ct.o();
            var s = 5; // vitesse : nombre de pixels par 100eme de seconde
            var t0 = d["scrollTop"];
            if (t0 !== tf) {
                var i = s * (tf - t0) / Math.abs(tf - t0);
                var interval = setInterval(function() {
                    d["scrollTop"] = t0;
                    t0 += i;
                    if (Math.abs(tf - t0) < s) {
                        d["scrollTop"] = tf;
                        clearInterval(interval);
                    }
                }, 10);
            }
        }
    };

    me.show = function() {
        touchDir(rootLI, false);
    };

    me.reInit = function() {
        for (var i = 0; i < items.length; i++) {
            items[i].settxt(items[i].text);
        }
    };

    me.append = function(_txt, _refcon) {
        var t = _txt.split("/");
        var dir = rootLI;
        for (var i = 0; i < (t.length - 1); i++) {
            dir = DirLI(dir, t[i]);
        }
        var item = new iPadDOMElt("li");
        item.settxt(t[t.length - 1]);
        item.text = t[t.length - 1];
        item.evt(function(ev) {
            ev.preventDefault();
            touchItem(item);
        });
        item.attr("className", "iPadListLI");
        item.parent = dir;
        item.macro = (_refcon === undefined) ? null : _refcon;
        dir.childs.push(item);
        items.push(item);
    };

    me.getDocObject = function() {
        if (wr) return wr.o();
        return null;
    };

    wr.attr("className", "iPadListMasterDIV");
    wr.stl("left:" + _l + "px;top:" + _t + "px;width:" + _w + "px;height:" + _h + "px");
    ct.attr("className", "iPadListContentDIV");
    wr.add(ct);
    wr.add(backBtn);
    wr.add(label);
    _own.appendChild(wr.o());



    function iPadDOMElt(_type) {
        var me = this;
        var CLK = true;
        var docObject = document.createElement(_type);
        me.setStyle = function(_attr, _param) {
            docObject.style.setProperty(_attr, _param);
        };
        me.stl = function(_st) {
            var t = _st.split(";");
            for (var i = 0, len = t.length; i < len; i++) {
                var a = t[i].split(":");
                docObject.style.setProperty(a[0].replace(/^\s+|\s+$/g, ''), a[1].replace(/^\s+|\s+$/g, ''));
            }
        };
        me.attr = function(_attr, _param) {
            docObject[_attr] = _param;
        };
        var touchstart = function(ev) {
            CLK = true;
        };
        var touchmove = function(ev) {
            CLK = false;
        };
        me.evt = function(_proc) {
            // Encore du bricolage pour les navigateurs android... :
            if ($U.isMobile.android()) {
                docObject.addEventListener("touchstart", touchstart, false);
                docObject.addEventListener("touchmove", touchmove, false);
                docObject.addEventListener("touchend", function(ev) {
                    if (CLK) _proc(ev);
                }, false);
            } else
                docObject.addEventListener("mousedown", _proc, false);
        };
        me.o = function() {
            return docObject;
        };
        me.clr = function() {
            while (docObject.childNodes.length !== 0) {
                docObject.removeChild(docObject.childNodes[0]);
            }
        };
        me.add = function(_o) {
            docObject.appendChild(_o.o());
        };
        me.settxt = function(_t) {
            me.attr("textContent", _t);
        };
        me.gettxt = function() {
            return docObject["textContent"];
        };
        me.transform = function(_t) {
            me.stl("transform:translateX(" + _t + "%);-webkit-transform:translateX(" + _t + "%);-moz-transform:translateX(" + _t + "%);-o-transform:translateX(" + _t + "%)");
        };
        me.transitionIN = function() {
            setTimeout(function() {
                me.transform(0);
            }, 1);
        };
        me.transitionOUT = function(_owner, _opp) {
            var pc = ((_opp === undefined) || (!_opp)) ? "-100" : "100";
            setTimeout(function() {
                me.transform(pc);
            }, 1);
            setTimeout(function() {
                _owner.o().removeChild(docObject);
            }, 200);
        };
    }

}
