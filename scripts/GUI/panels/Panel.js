/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Panel(_owner) {
    $U.extend(this, new GUIElement(_owner, "div"));
    var me = this;
    var effect = "";
    var effect_var1 = 0;
    me.setAbsolute();
    var docObject = me.getDocObject();

    this.show_callback = function() {
    };

    this.show = function() {
        // Si je n'ai pas encore de parent :
        if (docObject.parentNode === null) {
            me.owner.appendChild(docObject);
            this.applyTransitionIN();
        }
    };

    this.close_callback = function() {
    };

    this.close = function() {
        
        this.applyTransitionOUT();
        setTimeout(function() {
            if (docObject.parentNode !== null) {
                try {
                    docObject.parentNode.removeChild(docObject);
//                    me.owner.removeChild(docObject);
                } catch (e) {
                }
                ;

            }
        }, 300);
//        this.close_callback();
    };

    this.isVisible = function() {
        return (docObject.parentNode !== null);
    };


    this.transition = function(_type, _speed, _x) {
        effect = _type;
        switch (effect) {
            case "translate_x":
//                console.log(document.body.parentNode);
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                effect_var1 = _x;
                break;
            case "translate_y":
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                effect_var1 = _x;
                break;
            case "scale":
                docObject.style.setProperty("transition", "transform " + _speed + "s linear");
                docObject.style.setProperty("-webkit-transition", "-webkit-transform " + _speed + "s linear");
                docObject.style.setProperty("-moz-transition", "-moz-transform " + _speed + "s linear");
                docObject.style.setProperty("-o-transition", "-o-transform " + _speed + "s linear");
                break;
            case "opacity":
                docObject.style.setProperty("transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-webkit-transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-moz-transition", "opacity " + _speed + "s ease-in-out");
                docObject.style.setProperty("-o-transition", "opacity " + _speed + "s ease-in-out");
                break;
        }
    };

    this.applyTransitionIN = function() {
        switch (effect) {
            case "translate_x":
                docObject.style.setProperty("transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-webkit-transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-moz-transform", "translateX(" + effect_var1 + "px)");
                docObject.style.setProperty("-o-transform", "translateX(" + effect_var1 + "px)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-o-transform", "translate(0,0)");
                }, 1);
                break;
            case "translate_y":
                docObject.style.setProperty("transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-webkit-transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-moz-transform", "translateY(" + effect_var1 + "px)");
                docObject.style.setProperty("-o-transform", "translateY(" + effect_var1 + "px)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0,0,0)");
                    docObject.style.setProperty("-o-transform", "translate(0,0)");
                }, 1);
                break;
            case "scale":
                docObject.style.setProperty("transform", "scale(0)");
                docObject.style.setProperty("-webkit-transform", "scale(0)");
                docObject.style.setProperty("-moz-transform", "scale(0)");
                docObject.style.setProperty("-o-transform", "scale(0)");
                setTimeout(function() {
                    docObject.style.setProperty("transform", "scale(1)");
                    docObject.style.setProperty("-webkit-transform", "scale(1)");
                    docObject.style.setProperty("-moz-transform", "scale(1)");
                    docObject.style.setProperty("-o-transform", "scale(1)");
                }, 1);
                break;
            case "opacity":
                setTimeout(function() {
                    docObject.style.setProperty("opacity", "1");
                }, 1);
                break;
        }
    };

    this.applyTransitionOUT = function() {
        switch (effect) {
            case "translate_x":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(" + effect_var1 + "px,0, 0)");
                    docObject.style.setProperty("-o-transform", "translate(" + effect_var1 + "px,0)");
                }, 1);
                break;
            case "translate_y":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-webkit-transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-moz-transform", "translate3d(0," + effect_var1 + "px, 0)");
                    docObject.style.setProperty("-o-transform", "translate(0," + effect_var1 + "px)");
                }, 1);
                break;
            case "scale":
                setTimeout(function() {
                    docObject.style.setProperty("transform", "scale(0)");
                    docObject.style.setProperty("-webkit-transform", "scale(0)");
                    docObject.style.setProperty("-moz-transform", "scale(0)");
                    docObject.style.setProperty("-o-transform", "scale(0)");
                }, 1);
                break;
            case "opacity":
                setTimeout(function() {
                    docObject.style.setProperty("opacity", "0");
                }, 1);
                break;
        }
    };

    me.setBackground = function(_grad) {
        var browser = $U.browserCode();
        me.setStyle("background", browser + _grad);
    };

    me.setBackgroundColor = function(_col) {
        me.setStyle("backgroundColor", _col);
    };

// For overflow panels(speed : 1-10) :
    me.scroll = function(_dir, tf, _speed) {
        var s = "";
        switch (_dir) {
            case "top":
                s = "scrollTop";
                break;
            case "left":
                s = "scrollLeft";
                break;
        }
        var t0 = docObject[s];
        if (t0 !== tf) {
            var i = _speed * (tf - t0) / Math.abs(tf - t0);
            var interval = setInterval(function() {
                docObject[s] = t0;
                t0 += i;
                if (Math.abs(tf - t0) < _speed) {
                    docObject[s] = tf;
                    clearInterval(interval);
                }

            }, 10);
        }
    };






}
