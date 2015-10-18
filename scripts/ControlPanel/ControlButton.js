function ControlButton(owner, l, t, w, h, src, _isOn, _group, _proc) {
    var me = this;
    var group = _group;
    var proc = _proc;
    if (group)
        group.add(this);
    var isOn = _isOn;
    var active = true;
    var opacityFactor = 0.5;
    this.getBounds = function() {
        return {
            "left": l,
            "top": t,
            "width": w,
            "height": h
        };
//        var cb = owner.getBounds();
//        var cw = w;
//        var ch = h;
//        var ct = cb.top + t;
//        var cl = cb.left + l;
//        return {
//            "left": cl,
//            "top": ct,
//            "width": cw,
//            "height": ch
//        };
    };

    this.setActive = function(_bool) {
        active = _bool;
        if (active) {
            docObject.style.opacity = "1";
        } else {
            docObject.style.opacity = opacityFactor;
        }
    };

    this.deselect = function() {
        isOn = false;
        docObject.style.opacity = opacityFactor;
    };
    this.select = function() {
        if (group) group.deselect();
        isOn = true;
        docObject.style.opacity = "1";
    };
    this.isSelected = function() {
        return isOn;
    };
    var bounds = this.getBounds();

    var docObject = document.createElement("div");

    docObject.style.backgroundImage = "url('" + $APP_PATH + src + "')"; // for image
    docObject.style.backgroundSize = "100%";
    docObject.style.backgroundRepeat = "no-repeat";
    docObject.style.position = "absolute";
    docObject.style.backgroundColor = "rgba(0,0,0,0)";
    docObject.style.opacity = isOn ? 1 : opacityFactor;
    docObject.style.border = "0px";
    docObject.style.width = bounds.width + "px";
    docObject.style.height = bounds.height + "px";
    docObject.style.left = bounds.left + "px";
    docObject.style.top = bounds.top + "px";
    docObject.style.setProperty("-webkit-tap-highlight-color","transparent");

    docObject.addEventListener('touchstart', function(ev) {
        ev.preventDefault();
        if (active) {
            if (group) {
                group.deselect();
                me.select();
            }
            ;
            if (proc) {
                proc();
            }
        }
    }, false);

    docObject.addEventListener('mouseover', function(ev) {
        if (active) {
            docObject.style.opacity = "1";
        }
    }, false);
    docObject.addEventListener('mouseout', function(ev) {
        if (active) {
            if (!isOn) {
                docObject.style.opacity = opacityFactor;
            }
        }
    }, false);
    docObject.addEventListener('mousedown', function(ev) {
        if (active) {
            if (group) {
//                    group.deselect();
                me.select();
            }
            ;
            if (proc) {
                proc();
            }
        }
    }, false);


    this.getDocObject = function() {
        return docObject;
    };

    owner.getDocObject().appendChild(docObject);
}
;