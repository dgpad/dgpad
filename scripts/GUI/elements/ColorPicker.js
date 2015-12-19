function ColorPicker(_owner, _left, _top, _width, _height) {

    var dfs = localStorage.getItem("ColorPaletteDefault");
    if (!dfs || dfs === "")
        localStorage.setItem("ColorPaletteDefault", ["#0000B2", "#007C7C", "#006633", "#966400", "#770012", "#cc66cc"]);

    var c_picker = $Private_ColorPicker({
        width: _width,
        height: _height,
        arrowColor: '#fff',
        defaultRgb: [200, 125, 58],
        onchange: function(color) {}
    });

    c_picker.style.setProperty("position", "absolute");
    c_picker.style.setProperty("border-radius", "8px");
    c_picker.style.setProperty("border-color", "#b4b4b4");
    c_picker.style.setProperty("border-style", "solid");
    c_picker.style.setProperty("border-width", "1px");
    this.setBounds = function(_l, _t, _w, _h) {
        c_picker.style.setProperty("left", _l + "px");
        c_picker.style.setProperty("top", _t + "px");
        c_picker.style.setProperty("width", _w + "px");
        c_picker.style.setProperty("height", _h + "px");
    };

    this.setBounds(_left, _top, _width, _height);
    var hex_callback = function(_hex) {};
    this.setHEXcallback = function(_proc) {
        c_picker.setCallback(_proc);
    };
    this.setRGB = function(_r, _g, _b) {
        c_picker.setRGB({
            r: _r,
            g: _g,
            b: _b
        });
    };
    this.setHSV = function(_h, _s, _v) {
        c_picker.setHSV({
            h: _h,
            s: _s,
            v: _v
        });
    };
    this.setHEX = function(_hex) {
        c_picker.setHEX(_hex);
    };
    this.getHEX = function() {
        return c_picker.getHEX();
    }

    _owner.appendChild(c_picker);
}


(function(win) {

    var createPicker = function(width, height, onchange, arrowColor, defaultHsv, defaultRgb) {
        var W = width,
            H = height;
        var LW = 28; // Vertical Hue Picker width
        var SPH = 0; // h space between SV Rectangle and Hue pickers
        var SPV = 0; // v space between pickers and predefined icons
        var IH = 27; // Icon height
        var IL = 2; // Number of icon lines
        var AW = 9; // Arrow size

        var GW = W - LW - SPH; // SV rectangle width
        var GH = H - SPV - IL * IH; // SV rectangle height
        var LH = GH; // H bar height
        var IN = Math.floor(W / IH); // Number of icons on one line
        var IW = W / IN; // Icon width
        var ICs = []; // icons
        var SVr = [0, 0, GW, GH]; // SV bounding rect
        var Hr = [GW + SPH, 0, LW, LH]; // Hue bounding rect
        var Mr = [(IN - 2) * IW, GH + SPV + IH * (IL - 1), IW, IH]; // minus bounding rect
        var Pr = [(IN - 1) * IW, GH + SPV + IH * (IL - 1), IW, IH]; // plus bounding rect
        var Ir = [0, GH + SPH, IW * IN, IH * IL]; // icon palette bounding rect

        var canvas = document.createElement('canvas');
        canvas.height = H;
        canvas.width = W;
        var ctx = canvas.getContext('2d');
        var gradCanvas = document.createElement('canvas');
        gradCanvas.width = GW;
        gradCanvas.height = GH;
        var gradCtx = gradCanvas.getContext('2d');
        var whiteGrad = ctx.createLinearGradient(0, 0, GW, 0);
        whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        var blackGrad = ctx.createLinearGradient(0, 0, 0, GH);
        blackGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        blackGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradCtx.fillStyle = whiteGrad;
        gradCtx.fillRect(0, 0, GW, GH);
        gradCtx.fillStyle = blackGrad;
        gradCtx.fillRect(0, 0, GW, GH);
        var inR = function(x, y, r) {
            return (x > r[0] && x < r[0] + r[2] && y > r[1] && y < r[1] + r[3])
        };
        var cur = {
            hue: 0,
            sat: 100,
            val: 100,
            tool: null
        };
        if (defaultHsv) {
            cur.hue = defaultHsv[0];
            cur.sat = defaultHsv[1];
            cur.val = defaultHsv[2];
        } else if (defaultRgb) {
            var hsv = rgb2hsv(defaultRgb[0], defaultRgb[1], defaultRgb[2]);
            cur.hue = hsv.h;
            cur.sat = hsv.s;
            cur.val = hsv.v;
        }

        var dfs = localStorage.getItem("ColorPaletteDefault");
        if (dfs)
            ICs = dfs.split(",");


        function refresh() {
            drawArrows();
            drawSVMap();
            drawIcns();
        };

        function isCur(i) {
            if (i < ICs.length) {
                var rgb = hsv2rgb(cur.hue, cur.sat, cur.val).rgb;
                var h = ICs[i];
                var t = [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
                if (Math.abs(rgb[0] - t[0]) < 2 && Math.abs(rgb[1] - t[1]) < 2 && Math.abs(rgb[2] - t[2]) < 2) {
                    return true;
                }
            }
            return false;
        }



        function drawSVMap() {
            ctx.clearRect(0, 0, GW, GH);
            ctx.fillStyle = hsv2rgb(cur.hue, 100, 100).hex;
            ctx.fillRect(0, 0, GW, GH);
            ctx.drawImage(gradCanvas, 0, 0, GW, GH);
            drawCircle();
        }

        function drawCircle() {
            var x = GW * (cur.sat / 100);
            var y = GH - GH * (cur.val / 100);
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, GW, GH);
            ctx.clip();
            for (var i = 0, colors = ['#000', '#fff']; i < 2; i++) {
                ctx.strokeStyle = colors[i];
                ctx.beginPath();
                ctx.arc(x, y, 7 - i, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawHLine() {
            var hue = [
                [255, 0, 0],
                [255, 255, 0],
                [0, 255, 0],
                [0, 255, 255],
                [0, 0, 255],
                [255, 0, 255],
                [255, 0, 0]
            ];
            var grad = ctx.createLinearGradient(0, 0, 0, LH);
            for (var i = 0; i <= 6; i++) {
                var color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';
                grad.addColorStop(1 - i * 1 / 6, color);
            }
            ctx.fillStyle = grad;
            ctx.fillRect(GW + SPH, 0, LW, LH);
            ctx.restore();
        }

        function drawArrows() {
            drawHLine();
            var y = !cur.hue ? 0 : LH - cur.hue / 360 * LH;
            ctx.clearRect(GW, 0, SPH, LH);
            ctx.save();
            ctx.beginPath();
            ctx.rect(GW + SPH, 0, LW, LH);
            ctx.clip();
            ctx.fillStyle = arrowColor;
            for (var i = 0; i < 1; i++) {
                ctx.beginPath();
                ctx.moveTo(GW + SPH + AW + i * (LW - 2 * AW), y);
                ctx.lineTo(GW + SPH + LW * i, y - 2 * AW / 3);
                ctx.lineTo(GW + SPH + LW * i, y + 2 * AW / 3);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawIcns() {
            if (IL < 1)
                return;
            var rgb = hsv2rgb(cur.hue, cur.sat, cur.val).rgb;
            var top = GH + SPV;
            for (var i = 0; i < IL * IN - 2; i++) {
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.2;
                ctx.fillStyle = (i < ICs.length) ? ICs[i] : "#fff";
                ctx.rect((i % IN) * IW, top + IH * Math.floor(i / IN), IW, IH);
                ctx.fill();
                ctx.stroke();
                if (isCur(i)) {
                    for (var j = 0, colors = ['#000', '#fff']; j < 2; j++) {
                        ctx.strokeStyle = colors[j];
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc((i % IN) * IW + IW / 2, top + IH * Math.floor(i / IN) + IH / 2, 5 - j, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;
            ctx.fillStyle = "#e5e4e2";
            for (var i = 0; i < 2; i++) {
                ctx.beginPath();
                ctx.rect((IN - 2 + i) * IW, top + IH * (IL - 1), IW, IH);
                ctx.fill();
                ctx.stroke();
            }
            ctx.lineWidth = 3;
            var sze = (IW < IH) ? IW / 2 : IH / 2;
            ctx.beginPath();
            // minus and plus symbol :
            ctx.moveTo((IN - 2) * IW + IW / 2 - sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.lineTo((IN - 2) * IW + IW / 2 + sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.moveTo((IN - 1) * IW + IW / 2 - sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.lineTo((IN - 1) * IW + IW / 2 + sze / 2, top + IH * (IL - 1) + IH / 2);
            ctx.moveTo((IN - 1) * IW + IW / 2, top + IH * (IL - 1) + IH / 2 - sze / 2);
            ctx.lineTo((IN - 1) * IW + IW / 2, top + IH * (IL - 1) + IH / 2 + sze / 2);
            ctx.stroke();
            ctx.lineWidth = 1;
        }

        function addColor() {
            if (ICs.length > IL * IN - 3)
                return;
            for (var i = 0; i < ICs.length; i++) {
                if (isCur(i))
                    return;
            }
            ICs.push(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            drawIcns();
            localStorage.setItem("ColorPaletteDefault", ICs);
        }

        function removeColor() {
            for (var i = 0; i < ICs.length; i++) {
                if (isCur(i)) {
                    ICs.splice(i, 1);
                    drawIcns();
                    localStorage.setItem("ColorPaletteDefault", ICs);
                    return;
                }
            }
        }

        function setColor(x, y) {
            y -= (GH + SPV);
            var n = Math.floor(x / IW) + IN * Math.floor(y / IH);
            if (n < ICs.length) {
                var hex = ICs[n];
                var hsv = rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16));
                cur.hue = hsv.h;
                cur.sat = hsv.s;
                cur.val = hsv.v;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            }
        }

        function findPos(obj) {
            var curleft = 0,
                curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return [curleft, curtop];
            }
        }

        function mouseDown(evt) {
            var t = findPos(canvas);
            var x = evt.pageX - t[0];
            var y = evt.pageY - t[1];
            if (inR(x, y, SVr)) {
                cur.tool = 'SV';
                cur.sat = x / GW * 100;
                cur.val = (GH - y) / GH * 100;
                drawSVMap();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (inR(x, y, Hr)) {
                cur.tool = 'H';
                cur.hue = ((LH - y) / LH * 360) % 360;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (inR(x, y, Pr)) {
                addColor();
            } else if (inR(x, y, Mr)) {
                removeColor();
            } else if (inR(x, y, Ir)) {
                cur.tool = 'P';
                setColor(x, y);
            }
            if (cur.tool) {
                document.body.addEventListener('mousemove', mouseMove);
                document.body.addEventListener('mouseup', mouseUp);
                document.body.addEventListener('touchmove', touchMove);
                document.body.addEventListener('touchend', touchEnd);
            }
        }



        function mouseMove(evt) {
            var t = findPos(canvas);
            var x = evt.pageX - t[0];
            var y = evt.pageY - t[1];
            if (cur.tool === 'SV') {
                x = x < 0 ? 0 : (x > GW ? GW : x);
                y = y < 0 ? 0 : (y > GH ? GH : y);
                cur.sat = x / GW * 100;
                cur.val = (GH - y) / GH * 100;
                drawSVMap();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (cur.tool === 'H') {
                y = y < 0 ? 0 : (y > LH ? LH : y);
                cur.hue = ((LH - y || 1) / LH * 360) % 360;
                drawSVMap();
                drawArrows();
                drawIcns();
                onchange(hsv2rgb(cur.hue, cur.sat, cur.val).hex);
            } else if (cur.tool === 'P') {
                if (inR(x, y, Ir))
                    setColor(x, y);
            }
        }

        function mouseUp(evt) {
            document.body.removeEventListener('mousemove', mouseMove);
            document.body.removeEventListener('mouseup', mouseUp);
            document.body.removeEventListener('touchmove', touchMove);
            document.body.removeEventListener('touchend', touchEnd);
            cur.tool = null;
        }

        function touchStart(tch) {
            tch.preventDefault();
            mouseDown(tch.touches[0]);
        }

        function touchMove(tch) {
            tch.preventDefault();
            mouseMove(tch.touches[0]);
        }

        function touchEnd(tch) {
            tch.preventDefault();
            mouseUp(tch.touches[0]);
        }

        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('touchstart', touchStart);
        refresh();

        // Communication routines :
        canvas.getHEX = function() {
            return hsv2rgb(cur.hue, cur.sat, cur.val).hex;
        };
        canvas.setHSV = function(col) {
            cur.hue = col.h;
            cur.sat = col.s;
            cur.val = col.v;
            refresh();
        };
        canvas.setHEX = function(hex) {
            canvas.setHSV(rgb2hsv(parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)));
        };
        canvas.setRGB = function(col) {
            canvas.setHSV(rgb2hsv(col.r, col.g, col.b));
        };
        canvas.setCallback = function(_proc) {
            onchange = _proc;
        };

        return canvas;
    };
    /**
     * Convert HSV representation to RGB HEX string.
     * Credits to http://www.raphaeljs.com
     */
    var hsv2rgb = function(h, s, v) {
        s /= 100;
        v /= 100;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = v - C;
        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        var r = parseInt(R * 255),
            g = parseInt(G * 255),
            b = parseInt(B * 255);
        return {
            r: r,
            g: g,
            b: b,
            hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1),
            rgb: [r, g, b]
        };
    }

    /**
     * Convert RGB representation to HSV.
     * r, g, b can be either in <0,1> range or <0,255> range.
     * Credits to http://www.raphaeljs.com
     */
    var rgb2hsv = function(r, g, b) {
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C == 0 ? null :
            V == r ? (g - b) / C + (g < b ? 6 : 0) :
            V == g ? (b - r) / C + 2 :
            (r - g) / C + 4);
        H = (H % 6) * 60;
        S = C == 0 ? 0 : C / V;
        S *= 100;
        V *= 100;
        return {
            h: H,
            s: S,
            v: V,
            hsv: [H, S, V]
        };
    }

    win.$Private_ColorPicker = function(params) {
        if (!params || !(params.onchange instanceof Function))
            return null;
        params.width = (params.size) ? params.size : (params.width) ? params.width : 300;
        params.height = (params.size) ? params.size : (params.height) ? params.height : 300;
        params.arrowColor = params.arrowColor || '#000000';
        return createPicker(params.width, params.height, params.onchange, params.arrowColor, params.defaultHsv, params.defaultRgb);
    }
})(window);
