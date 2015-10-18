/*!
 * HTML5 Canvas SVG Alpha 2.0
 * http://specinnovations.com/
 *
 * Copyright 2011, SPEC Innovations
 * Dual licensed under the MIT or Apache 2.0.
 * http://code.google.com/p/html5-canvas-svg/
 * Alex Rhea, Chris Ritter
 *
 * Date: Tue Aug 09 2011 -0400
 */

(function(window, document, undefined) {

// current path template
    var currentPath = {
        type: "path",
        points: new Array(),
        style: {}
    }

// canvas DOM element
    var canvas = null;

// canvas context
    var ctx = null;

// elements drawn to the canvas
    var elements = [];

    var SVGCanvas = (function() {

        var SVGCanvas = function(id) {
            canvas = document.getElementById(id);
            ctx = canvas.getContext("2d");
            elements = [];
            /* Settings */
            ctx.TRANSFORM = [];
            ctx.lineDash = [];
//            ctx.setLineDash = function(_tab) {
//                ctx.lineDash = _tab;
//            };
            this.lineDash = [];
            this.strokeStyle = "black";
            this.lineWidth = 1;
            this.lineCap = "butt";
            this.lineJoin = "miter";
            this.miterLimit = 10;
            this.fillStyle = "black";
            this.shadowOffsetX = 0;
            this.shadowOffsetY = 0;
            this.shadowBlur = 0;
            this.shadowColor = "transparent black";
            this.font = "10px sans-serif";
            this.textAlign = "start";
            this.textBaseline = "alphabetic";
            this.globalAlpha = 1.0;
            this.globalCompositeOperation = "source-over";

            this.util = {
                updateCanvasSettings: function() {
                    for (key in this) {
                        ctx[key] = this[key];
                    }
                },
                pushToStack: function() {
                    if (currentPath.points.length > 0) {
                        elements.push(currentPath);
                        currentPath = {
                            type: "path",
                            points: new Array(),
                            style: {}
                        }
                    }
                },
                generateSVG: function() {
                    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n\
<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"" + canvas.width + "\" height=\"" + canvas.height + "\" viewBox=\"0, 0, " + canvas.width + ", " + canvas.height + "\">\n\n";
                    for (var i = 0; i < elements.length; i++) {
//                        console.log(i);
                        var elem = elements[i];
                        var style = "";
                        for (var attr in elem.style) {
                            try {
                                // Traduction de tous les codes de couleur rgba en hexa :
                                var match = elem.style[attr].match(/rgba\((\d*),(\d*),(\d*),(\d*\.?\d*)\)/);
                                if (match) {
                                    if (attr === "fill")
                                        style += "fill-opacity:" + match[4] + "; ";
                                    else if (attr === "stroke")
                                        style += "stroke-opacity:" + match[4] + "; ";
                                    var nn = Number(0x1000000 + parseInt(match[1]) * 0x10000 + parseInt(match[2]) * 0x100 + parseInt(match[3])).toString(16).substring(1);
                                    elem.style[attr] = "#" + Number(0x1000000 + parseInt(match[1]) * 0x10000 + parseInt(match[2]) * 0x100 + parseInt(match[3])).toString(16).substring(1);
                                }
                            } catch (e) {
                            }
                            // séparation de l'attribut font en deux attributs : font-size et font-family :
                            if (attr === "font") {
                                var stl = elem.style[attr].split(" ");
                                if (stl.length === 2) {
                                    style += "font-size:" + stl[0] + "; ";
                                    style += "font-family:" + stl[1] + "; ";
                                } else
                                    style += attr + ":" + elem.style[attr] + "; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "center")) {
                                style += "text-anchor:middle; text-align:center; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "left")) {
                                style += "text-anchor:start; text-align:left; ";
                            } else if ((attr === "text-align") && (elem.style[attr] === "right")) {
                                style += "text-anchor:end; text-align:right; ";
                            } else
                                style += attr + ":" + elem.style[attr] + "; ";
                        }
                        if (elem.type == "text") {
                            xml += '\n<text x="' + elem.x + '" y="' + elem.y + '" style="' + style + '" ';
                            if (elem.hasOwnProperty("TRANSFORM")) {
                                xml += 'transform="' + elem.TRANSFORM + '" ';
                            }
                            ;
                            xml += '>' + elem.text + '</text>';
                        } else if (elem.type == "path") {
                            var points = "";
                            for (var j = 0; j < elem.points.length; j++) {
                                var point = elem.points[j];
                                if (point.action == "move") {
                                    points += "M" + point.x + " " + point.y + " ";
                                } else if (point.action == "line") {
                                    points += "L" + point.x + " " + point.y + " ";
                                } else if (point.action == "quadratic") {
                                    points += "Q" + point.x1 + " " + point.y1 + " " + point.x + " " + point.y + " ";
                                } else if (point.action == "bezier") {
                                    points += "C" + point.x2 + " " + point.y2 + " " + point.x1 + " " + point.y1 + " " + point.x + " " + point.y + " ";
                                } else if (point.action == "arc") {
                                    points += "M" + point.x1 + " " + point.y1 + " A " + point.r +
                                            " " + point.r + " 0 " + point.wa + " " + point.acw + " " + point.x2 + " " + point.y2 + " ";
                                } else if (point.action == "circle") {
                                    points += "M " + point.x + ", " + point.y
                                            + " m " + (-point.r) + ", 0"
                                            + " a " + point.r + "," + point.r + " 0 1,0" + " " + (2 * point.r) + ",0"
                                            + " a " + point.r + "," + point.r + " 0 1,0" + " " + (-2 * point.r) + ",0";
//                                                                console.log(points);
                                }



                            }

                            xml += '\n\n\n<path d="' + points + '" style="' + style + '" />';
                        }
                    }

                    xml += "\n</svg>"

                    return xml;

                }
            }
        }

        SVGCanvas.fn = SVGCanvas.prototype = {
            constructor: SVGCanvas,
            getCanvas: function() {
                return canvas;
            },
            getContext: function() {
                return ctx;
            },
            polarToCartesian: function(centerX, centerY, radius, angleInRadians) {
                var x = centerX + radius * Math.cos(angleInRadians);
                var y = centerY + radius * Math.sin(angleInRadians);
                return {"x": x, "y": y};
            },
            beginPath: function() {
                this.util.pushToStack();
                ctx.beginPath();
            },
            closePath: function() {
                this.util.pushToStack();
                ctx.closePath();
            },
            moveTo: function(x, y) {
                currentPath.points.push({"action": "move", "x": x, "y": y});
                ctx.moveTo(x, y);
            },
            lineTo: function(x, y) {
                currentPath.points.push({"action": "line", "x": x, "y": y});
                ctx.lineTo(x, y);
            },
            quadraticCurveTo: function(cpx, cpy, x, y) {
                currentPath.points.push({"action": "quadratic", "x": x, "y": y, "x1": cpx, "y1": cpy});
                ctx.quadraticCurveTo(cpx, cpy, x, y);
            },
            bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                currentPath.points.push({"action": "bezier", "x": x, "y": y, "x1": cp1x, "y1": cp1y, "x2": cp2x, "y2": cp2y});
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            },
            arcTo: function(x1, y1, x2, y2, radius) {
                currentPath.points.push({"action": "move", "x": x1, "y": y1});
                this.bezierCurveTo(x1, (y1 + radius), x2, (y2 + radius));
                ctx.arcTo(x1, y1, x2, y2, radius);
            },
            arc: function(cx, cy, radius, startAngle, endAngle, anticlockwise) {
//                console.log(Math.abs(Math.abs(startAngle - endAngle) - Math.PI * 2));

                if (Math.abs(Math.abs(startAngle - endAngle) - Math.PI * 2) < 1e-9) {
                    currentPath.points.push({"action": "circle", "r": radius, "x": cx, "y": cy});
                    this.util.pushToStack();
                } else {
//                    console.log("**************");
//                    console.log("x=" + cx + " y=" + cy + " r=" + radius);
//                    console.log(" startAngle=" + startAngle + " endAngle=" + endAngle);
//                    console.log("dA>Math.PI="+(dA>Math.PI));
//                    console.log(" anticlockwise=" + anticlockwise);
//                    console.log("TEST="+((dA>Math.PI && !anticlockwise)||(dA<Math.PI && anticlockwise)));
                    //	
                    var dA = endAngle - startAngle;
                    while (dA < 0)
                        dA += 2 * Math.PI;
                    var start = this.polarToCartesian(cx, cy, radius, startAngle);
                    var end = this.polarToCartesian(cx, cy, radius, endAngle);
                    var largeArc = 1 * (((dA > Math.PI && !anticlockwise) || (dA < Math.PI && anticlockwise)));
                    currentPath.points.push({"action": "arc", "r": radius, "x1": start.x, "y1": start.y, "x2": end.x, "y2": end.y, "acw": 1 - 1 * anticlockwise, "wa": largeArc});
                    this.util.pushToStack();
                }
            },
            rect: function(x, y, width, height) {
                currentPath.points.push({"action": "move", "x": x, "y": y});
                currentPath.points.push({"action": "line", "x": x + width, "y": y});
                currentPath.points.push({"action": "line", "x": x + width, "y": y + height});
                currentPath.points.push({"action": "line", "x": x, "y": y + height});
                currentPath.points.push({"action": "line", "x": x, "y": y});
                ctx.rect(x, y, width, height);
            },
            clearRect: function(x, y, width, height) {
                currentPath.points.push({"action": "move", "x": x, "y": y});
                currentPath.points.push({"action": "line", "x": x + width, "y": y});
                currentPath.points.push({"action": "line", "x": x + width, "y": y + height});
                currentPath.points.push({"action": "line", "x": x, "y": y + height});
                currentPath.points.push({"action": "line", "x": x, "y": y});
                ctx.clearRect(x, y, width, height);
            },
            fillRect: function(x, y, width, height) {
                this.util.pushToStack();
                var rect = {type: "path", style: {}};
                rect.points = new Array();
                rect.points.push({"action": "move", "x": x, "y": y});
                rect.points.push({"action": "line", "x": x + width, "y": y});
                rect.points.push({"action": "line", "x": x + width, "y": y + height});
                rect.points.push({"action": "line", "x": x, "y": y + height});
                rect.points.push({"action": "line", "x": x, "y": y});
                rect.style["fill"] = ctx.fillStyle = this.fillStyle;
                elements.push(rect);
                this.util.updateCanvasSettings();
                ctx.fillRect(x, y, width, height);
            },
            strokeRect: function(x, y, width, height) {
                this.util.pushToStack();
                var rect = {type: "path", style: {}};
                rect.points = new Array();
                rect.points.push({"action": "move", "x": x, "y": y});
                rect.points.push({"action": "line", "x": x + width, "y": y});
                rect.points.push({"action": "line", "x": x + width, "y": y + height});
                rect.points.push({"action": "line", "x": x, "y": y + height});
                rect.points.push({"action": "line", "x": x, "y": y});
                rect.style["stroke"] = ctx.strokeStyle = this.strokeStyle;
                rect.style["stroke-width"] = ctx.lineWidth = this.lineWidth;
                rect.style["stroke-linecap"] = ctx.lineCap = this.lineCap;
                rect.style["stroke-miterlimit"] = ctx.miterLimit = this.miterLimit;
                rect.style["stroke-linejoin"] = ctx.lineJoin = this.lineJoin;
                if (ctx.lineDash.length > 0) {
                    rect.style["stroke-dasharray"] = ctx.lineDash.join(",");
                    ctx.lineDash = this.lineDash;
                }
                elements.push(rect);
                this.util.updateCanvasSettings();
                ctx.strokeRect(x, y, width, height);
            },
            isPointInPath: function(x, y) {
                return ctx.isPointInPath(x, y);
            },
            stroke: function() {
                var path;
                if (currentPath.points.length > 0) {
                    path = currentPath;
                } else {
                    path = elements[elements.length - 1];
                }
                path.style["stroke"] = ctx.strokeStyle = this.strokeStyle;
                path.style["stroke-width"] = ctx.lineWidth = this.lineWidth;
                path.style["stroke-linecap"] = ctx.lineCap = this.lineCap;
                path.style["stroke-miterlimit"] = ctx.miterLimit = this.miterLimit;
                path.style["stroke-linejoin"] = ctx.lineJoin = this.lineJoin;
                if (ctx.lineDash.length > 0) {
                    path.style["stroke-dasharray"] = ctx.lineDash.join(",");
                    ctx.lineDash = this.lineDash;
                }
                if (!path.style["fill"])
                    path.style["fill"] = "none";
                this.util.updateCanvasSettings();
                ctx.stroke();
            },
            fill: function() {
                var path;
                if (currentPath.points.length > 0) {
                    path = currentPath;
                } else {
                    path = elements[elements.length - 1];
                }
                path.style["fill"] = ctx.fillStyle = this.fillStyle;
                this.util.updateCanvasSettings();
                ctx.fill();
            },
            strokeText: function(text, x, y) {
                ctx.font = this.font;
                elements.push({"type": "text", "text": text, "x": x, "y": y, style: {"font": this.font, "text-align": this.textAlign, "alignment-baseline": this.textBaseline, "fill": this.strokeStyle}});
                this.util.updateCanvasSettings();
                ctx.strokeText(text, x, y);
            },
            fillText: function(text, x, y) {
                ctx.font = this.font;
                var items = {"type": "text", "text": text, "x": x, "y": y, style: {"font": this.font, "text-align": this.textAlign, "alignment-baseline": this.textBaseline, "fill": this.fillStyle}};
                if (ctx.TRANSFORM.length > 0) {
                    items["TRANSFORM"] = ctx.TRANSFORM.join(" ");
                }
                elements.push(items);
                this.util.updateCanvasSettings();
                ctx.fillText(text, x, y);
            },
            measureText: function(text) {
                return ctx.measureText(text);
            },
            clip: function() {
                this.util.updateCanvasSettings();
                ctx.clip();
            },
            save: function() {
                ctx.TRANSFORM = [];
                ctx.save();
            },
            restore: function() {
                ctx.TRANSFORM = [];
                ctx.restore();
            },
            createLinearGradient: function(x0, y0, x1, y1) {
                return ctx.createLinearGradient(x0, y0, x1, y1);
            },
            createRadialGradient: function(x0, y0, r0, x1, y1, r1) {
                return ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
            },
            createPattern: function(image, repetition) {
                return ctx.createPattern(image, repetition);
            },
            createImageData: function(sw, sh) {
                return (arguments.length == 1 ? ctx.createImageData(imageData) : ctx.createImageData(sw, sh));
            },
            createImageData : function(imageData) {
                return ctx.createImageData(imageData);
            },
                    getImageData: function(sx, sy, sw, sh) {
                        return ctx.getImageData(sx, sy, sw, sh);
                    },
            putImageData: function(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                return ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            },
            drawImage: function() {
                return (arguments.length > 5) ?
                        ctx.drawImage(arguments[0].value, arguments[1].value, arguments[2].value, arguments[3].value, arguments[4].value) :
                        ctx.drawImage(arguments[0].value, arguments[1].value, arguments[2].value, arguments[3].value, arguments[4].value, arguments[5].value, arguments[6].value, arguments[7].value, arguments[8].value);
            },
            scale: function(x, y) {
                ctx.scale(x, y);
            },
            rotate: function(angle) {
                while (angle < 0)
                    angle += 2 * Math.PI;
                angle = angle * 180 / Math.PI;
                ctx.TRANSFORM.push("rotate(" + angle + ")");
                ctx.rotate(angle);
            },
            translate: function(x, y) {
                ctx.TRANSFORM.push("translate(" + x + "," + y + ")");
                ctx.translate(x, y);
            },
            setLineDash: function(tab) {
                ctx.lineDash = tab;
            },
            transform: function(m11, m12, m21, m22, dx, dy) {
                ctx.transform(m11, m12, m21, m22, dx, dy);
            },
            setTransform: function(m11, m12, m21, m22, dx, dy) {
                ctx.setTransform(m11, m12, m21, m22, dx, dy);
            },
            toDataURL: function(type, args) {
                if (type == "image/svg+xml") {
                    return this.util.generateSVG();
                } else {
                    return ctx.toDataURL(type, args);
                }
            }

        }

        return SVGCanvas;

    })();

    window.SVGCanvas = SVGCanvas;

})(window, document);
