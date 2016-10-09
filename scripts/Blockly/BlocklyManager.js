   function BlocklyManager(_canvas) {
       var me = this;
       var canvas = _canvas;
       var Cn = canvas.getConstruction();
       var panel = null;
       var path1 = $APP_PATH + "NotPacked/thirdParty/Blockly/";
       var path2 = $APP_PATH + "Blockly/"
       var scripts = [path1 + "blockly_compressed.js",
           path1 + "blocks_compressed.js",
           path1 + "javascript_compressed.js",
           path1 + "msg/js/" + $L.blockly.lang,
           path1 + "perso/hacks.js",
           path1 + "perso/blocks/core.js",
           path1 + "perso/blocks/aspect.js",
           path1 + "perso/blocks/geometry.js",
           path1 + "perso/blocks/expressions.js",
           path1 + "perso/blocks/lists.js",
           path1 + "perso/blocks/turtle.js",
           path1 + "perso/blocks/globals.js",
           path1 + "perso/blocks/text.js",
           path1 + "perso/js/core.js",
           path1 + "perso/js/aspect.js",
           path1 + "perso/js/geometry.js",
           path1 + "perso/js/expressions.js",
           path1 + "perso/js/lists.js",
           path1 + "perso/js/turtle.js",
           path1 + "perso/js/globals.js",
           path1 + "perso/js/text.js"
       ];
       var source = "";
       var selected = "";
       var workspace = null;
       var OBJ = null;
       var from_edit = false;
       var turtle = new TurtleObject(canvas);
       // var turtle=null;


       // *******************************************************
       // ****************** PRINT SOURCE ***********************
       // *******************************************************

       var printPanel = null;

       var closePrint = function() {
           if (printPanel)
               printPanel.close();
           printPanel = null;
       };

       me.print = function(_m) {
           if (!printPanel)
               printPanel = new PrintPanel(_canvas, closePrint);
           printPanel.setText(_m);
       };

       // *******************************************************
       // **************** END PRINT SOURCE *********************
       // *******************************************************


       var workspace2SVG = function() {
           var aleph = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
           aleph.removeAttribute("width");
           aleph.removeAttribute("height");
           if (aleph.children[0] !== undefined) {
               aleph.removeAttribute("transform");
               aleph.children[0].removeAttribute("transform");
               aleph.children[0].children[0].removeAttribute("transform");
               var styleTXT = '.blocklyDraggable {}\n';
               styleTXT += Blockly.Css.CONTENT.join('\n');
               styleTXT = styleTXT.replace(/<<<PATH>>>/g, "");
               styleTXT = styleTXT.replace(/&gt;/g, " ");
               styleTXT = styleTXT.replace(/>/g, " ");
               var linkElm = document.createElement('style');
               var cssTextNode = document.createTextNode(styleTXT);
               linkElm.appendChild(cssTextNode);
               aleph.insertBefore(linkElm, aleph.firstChild);
               var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
               var svg = new XMLSerializer().serializeToString(aleph);
               svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="0 0 ' + bbox.width + ' ' + bbox.height + '">' + svg + '</svg>';
               svg = svg.replace(/<style[^>]*>/g, "<style>");
               svg = svg.replace(/&nbsp;/g, " ");
               return svg;
           }
           return null;
       }


       var initBlockly = function() {
           Blockly.Block.prototype.firstadd = true;
           // Blockly.Block.prototype.varname = "";
           Blockly.Block.prototype.name = function() {
               return this.getFieldValue("name");
           };
           Blockly.getObj = function() {
               return OBJ;
           };
           Blockly.Block.prototype.isInConstruction = function() {
               return ((this.getSurroundParent()) &&
                   (this.getSurroundParent().type === "dgpad_construction"));
           };
           Blockly.Globals = { NAME_TYPE: "GLOBAL", NAMES: Cn.getInterpreter().BLK_GLOB_TAB, RENAME: Cn.getInterpreter().BLK_GLOB_RENAME };
           Blockly.Globals.flyoutCategory = function(workspace) {
               var variableList = Blockly.Globals.NAMES();
               variableList.sort(goog.string.caseInsensitiveCompare);
               goog.array.remove(variableList, Blockly.Msg.VARIABLES_DEFAULT_NAME);
               variableList.unshift(Blockly.Msg.VARIABLES_DEFAULT_NAME);
               var xmlList = [];
               var block = goog.dom.createDom('block');
               block.setAttribute('type', 'dgpad_global_inc');
               block.setAttribute('gap', 24);

               // var num = goog.dom.createDom('block');
               // num.setAttribute('type', 'math_number');
               // var field = goog.dom.createDom('field', null, "1");
               // field.setAttribute('name', 'NUM');
               // num.appendChild(field);
               // var cnx = num.outputConnection;
               // block.getInput('NAME').connection.connect(cnx);
               // block.connect(num);




               xmlList.push(block);
               for (var i = 0; i < variableList.length; i++) {
                   if (Blockly.Blocks['dgpad_global_set']) {
                       var block = goog.dom.createDom('block');
                       block.setAttribute('type', 'dgpad_global_set');
                       if (Blockly.Blocks['dgpad_global_get']) {
                           block.setAttribute('gap', 8);
                       }
                       var field = goog.dom.createDom('field', null, variableList[i]);
                       field.setAttribute('name', 'VAR');
                       block.appendChild(field);
                       xmlList.push(block);
                   }
                   if (Blockly.Blocks['dgpad_global_get']) {
                       var block = goog.dom.createDom('block');
                       block.setAttribute('type', 'dgpad_global_get');
                       if (Blockly.Blocks['dgpad_global_set']) {
                           block.setAttribute('gap', 24);
                       }
                       var field = goog.dom.createDom('field', null, variableList[i]);
                       field.setAttribute('name', 'VAR');
                       block.appendChild(field);
                       xmlList.push(block);
                   }
               }
               return xmlList;
           };
           Blockly.dgpad = new function() {
               var me = this;
               var NMS = [];
               me.VARS = []; // Pour collecter les enfants du scripts
               me.PARS = []; // Pour collecter les parents du scripts
               me.ZC = canvas;
               me.CN = canvas.getConstruction();
               me.getBounds = panel.getBounds;
               me.pushVARS = function(_n) {
                   var o = me.CN.find(_n);
                   if (o) me.VARS.push(o.getVarName());
               };
               me.pushPARS = function(_n) {
                   var o = me.CN.find(_n);
                   if (o) me.PARS.push(o.getVarName());
               };
               me.getNames = function() {
                   return NMS;
               };
               me.getObj = function() {
                   return OBJ;
               };
               me.addName = function(_n) {
                   NMS.push(_n);
               };
               me.getObjectsFromType = function(_t) {
                   return me.CN.getObjectsFromType(_t);
               };
               me.popupArray = function(_t) {
                   // console.log("objectPopup :"+_t);
                   var props = me.CN.getObjectsFromType(_t);
                   var tab = [];
                   var mod = OBJ.blocks.getMode()[panel.getMode()];
                   for (var i = 0; i < props.length; i++) {
                       // On doit absolument empécher l'autoréférence en mode Expression :
                       if ((mod !== "oncompute") || (OBJ != props[i]))
                           tab.push([props[i].getName(), props[i].getVarName()]);
                   };
                   if (tab.length === 0) tab.push(["? ", null]);
                   return (tab);
               };
               me.objectPopup = function(_t) {
                   return (new Blockly.FieldDropdown(me.popupArray(_t)));
               };
               me.getName = canvas.namesManager.getName;
               me.refresh = canvas.namesManager.refresh;
           };
           Blockly.bindEvent_(panel.DIV, "mouseup", null, onmouseup);
           canvas.namesManager.setObserver(Blockly.dgpad.getNames);
           Blockly.custom_menu_printSource = function() {
               me.print(Blockly.JavaScript.workspaceToCode(workspace).replace(/^\s*var\s*\w+\s*;/gm, "").replace(/blockly_var_/g, "").trim() + "\n");
           };
           Blockly.custom_menu_copyAll = function() {
               var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
               xml = Blockly.Xml.domToText(xml);
               localStorage.setItem("blockly_clipboard", xml);

               // workspace2PNG();


               // var aa = new XMLSerializer().serializeToString(Blockly.svg);
               // prompt(aa);
           };

           Blockly.custom_menu_print = function() {
               var svg = workspace2SVG();
               // svg = svg.replace(/&gt;/g, "@@@@GT@@@@");
               // svg = svg.replace(/&lt;/g, "@@@@LT@@@@");
               var svgsrc = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
               svgsrc += svg;

               if (window.$OS_X_APPLICATION) {
                   interOp.saveBlocklySVG(svgsrc)
               } else {
                   var lnk = ($iOS_APPLICATION) ? "data-svg:" : "data:image/svg+xml,";
                   lnk += ($iOS_APPLICATION) ? $U.base64_encode(svgsrc) : encodeURIComponent(svgsrc);
                   var txt = '<br><br><a href="' + lnk + '" style="-webkit-touch-callout:default;font-size:18px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank" download="DgpadSvgImage.svg" ><b>' + $L.blockly.downloadSVG + '</b></a>.';
                   $U.alert(txt);
               }
           };
           Blockly.custom_menu_copySel = function() {
               if (Blockly.selected) {
                   var xml = goog.dom.createDom('xml');
                   var blks = Blockly.Xml.blockToDom(Blockly.selected);
                   var xy = Blockly.selected.getRelativeToSurfaceXY();
                   blks.setAttribute('x', Math.round(xy.x) + 5);
                   blks.setAttribute('y', Math.round(xy.y) + 5);
                   xml.appendChild(blks);
                   localStorage.setItem("blockly_clipboard", Blockly.Xml.domToText(xml));
               }
           };
           Blockly.custom_menu_paste = function() {
               from_edit = false;
               var xml = localStorage.getItem("blockly_clipboard");
               var elt = Blockly.Xml.textToDom(xml);
               Blockly.Xml.domToWorkspace(elt, Blockly.mainWorkspace);
           };
       };

       var changeCSS = function(cname, property, value) {
           var cols = document.getElementsByClassName(cname);
           for (i = 0; i < cols.length; i++) {
               cols[i].style[property] = value;
           }
       }

       var showCategory = function(name, bool) {
           var cat = { "turtle": 7, "texts": 8, "inputs": "b" };
           var elt = document.getElementById(":" + cat[name]);
           if (bool) {
               elt.style["visibility"] = "visible";
               elt.style["height"] = "40px";
               if (name === "turtle") turtle.show(OBJ);
               // turtle = new TurtleObject(canvas, OBJ);
               canvas.paint();
           } else {
               elt.style["visibility"] = "hidden";
               elt.style["height"] = "0px";
               if (name === "turtle") turtle.hide();
               // turtle = null;
               canvas.paint();
           }
       };

       var modifyCSSRule = function(className, property, value) {
           var ss = document.styleSheets;
           for (var i = 0; i < ss.length; i++) {
               var ss = document.styleSheets;
               var rules = ss[i].cssRules || ss[i].rules;
               for (var j = 0; j < rules.length; j++) {
                   if (rules[j].selectorText === className) {
                       rules[j].style[property] = value;
                   }
               }
           }
       }

       var onload = function() {
           setTimeout(function() {
               // Blockly.FieldTextInput.FONTSIZE = 36;
               workspace = Blockly.inject(panel.DIV, {
                   media: $APP_PATH + "NotPacked/thirdParty/Blockly/media/",
                   toolbox: panel.XML.firstChild,
                   zoom: {
                       controls: true,
                       wheel: true,
                       startScale: 1.0,
                       maxScale: 3,
                       minScale: 0.3,
                       scaleSpeed: 1.1
                   },
                   trashcan: true
                       // toolbox: document.getElementById('toolbox')
               });
               // Blockly.Xml.domToWorkspace(workspace, document.getElementById('startBlocks'));
               initBlockly();
               workspace.addChangeListener(onchanged);
               changeCSS("blocklyToolboxDiv", "z-index", "9001");
               // changeCSS("blocklyToolboxDiv", "background", "#ddd");
               // changeCSS("blocklyMainBackground", "fill", "#BBB");
               changeCSS("blocklyMainBackground", "fill-opacity", "0.0");
               changeCSS("blocklySvg", "background-color", "rgba(0,0,0,0)");
               modifyCSSRule(".blocklyText", "font-family", "Verdana, Geneva, sans-serif");
               changeCSS("blocklyTreeLabel", "font-family", "Verdana, Geneva, sans-serif");
               modifyCSSRule(".blocklyWidgetDiv", "z-index", "9002");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "border-radius", "10px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "border", "1px solid gray");
               modifyCSSRule(".blocklyWidgetDiv .goog-menu", "background", "rgba(250,250,250,0.9)");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "font", "normal 16px Verdana, Geneva, sans-serif");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-hover", "padding-bottom", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-hover", "padding-top", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "padding-bottom", "4px");
               modifyCSSRule(".blocklyWidgetDiv .goog-menuitem-content", "padding-top", "4px");
               modifyCSSRule(".blocklyHighlightedConnectionPath", "stroke", "#fc3");
               modifyCSSRule(".blocklySelected > .blocklyPath", "stroke", "#fc3");
               modifyCSSRule(".blocklyFlyoutBackground","fill","#777");
               modifyCSSRule(".blocklyFlyoutBackground","fill-opacity","0.5");


               // On cache la catégorie "Tortue" :
               showCategory("turtle", false);
               showCategory("texts", false);
               showCategory("inputs", false);

               showCallback();
           }, 200);
       };

       var onmouseup = function() {
           if ((Blockly.selected) && (Blockly.selected.onselect) && (selected != Blockly.selected)) {
               Blockly.selected.onselect();
               selected = Blockly.selected;
           } else if ((selected != Blockly.selected)) {
               selected = "";
           }
       }


       // Appelée chaque fois que quelque chose change
       // dans le workspace de Blockly :
       var onchanged = function() {
           // console.log("onchanged : " + OBJ.getName());
           // Bloquer l'évenement "onchanged" quand on vient d'éditer un objet :
           if (from_edit) {
               from_edit = false;
               return
           }
           if (OBJ) {
               var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               if (xml.innerHTML === "") {
                   OBJ.blocks.setBehavior(mod, null, null, null);
                   me.resetTurtle(OBJ.getVarName());
               } else {
                   xml = Blockly.Xml.domToText(xml);
                   Blockly.dgpad.VARS = [];
                   Blockly.dgpad.PARS = [];
                   var snc = Blockly.JavaScript.workspaceToCode(workspace);
                   OBJ.blocks.setBehavior(mod, xml, snc, null);
                   OBJ.blocks.setChilds(mod, Blockly.dgpad.VARS);
                   OBJ.blocks.setParents(mod, Blockly.dgpad.PARS);
               }
               Cn.orderObjects();
               if (mod !== "onprogram") {
                   OBJ.blocks.evaluate(mod);
                   Cn.computeAll();
                   canvas.paint();
               }
           }
       };

       var addScript = function(_scpnum) {
           var next = _scpnum + 1;
           var parent = document.getElementsByTagName("head")[0];
           var s = document.createElement("script");
           s.type = "text/javascript";
           s.src = scripts[_scpnum];
           s.onload = (next === scripts.length) ? onload : function() {
               addScript(next);
           };
           parent.appendChild(s);
       };

       // var injectXML = function(_s) {
       //     window.document.getElementById("dgpad_xml").innerHTML = _s;
       // };




       var loadBlockly = function() {
           panel = new BlocklyPanel(window.document.body, canvas, hideCallback, currentTabCallBack, (canvas.getHeight() - canvas.prefs.controlpanel.size));
           // Load xml formatted toolbox :
           var request = new XMLHttpRequest();
           request.open("GET", path1 + "perso/Blockly_toolbox.xml", true);
           request.send(null);
           request.onload = function(e) {
               var xml = request.responseText;
               // Internationalize strings in toolbox :
               for (var obj in $L.blockly) {
                   var key = "$L.blockly." + obj.toString();
                   xml = xml.split(key).join($L.blockly[obj]);
               }
               // injectXML(xml);
               panel.XML.innerHTML = xml;
               // var parser = new DOMParser();
               // var xml=parser.parseFromString(request.responseText, "application/xml");
               // panel.DIV.parentNode.appendChild(xml.firstChild);
               // Load scripts synchroniously :

               addScript(0);
           }
       };

       var showCurrentTab = function() {
           Blockly.mainWorkspace.clear();
           panel.setMode(OBJ.blocks.getMode(), OBJ.blocks.getCurrent());
           var xml = OBJ.blocks.getCurrentXML();
           if (xml) {
               var elt = Blockly.Xml.textToDom(xml);
               Blockly.Xml.domToWorkspace(elt, workspace);
           }
           setTimeout(function() {
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               showCategory("turtle", (mod === "onlogo"));
               showCategory("texts", (mod === "onlogo") || (mod === "onprogram"));
               showCategory("inputs", (mod === "onprogram"));
           }, 300)
       };


       // Appelé par le panel chaque fois qu'on change d'onglet :
       var currentTabCallBack = function() {
           Blockly.mainWorkspace.clear();
           if (OBJ) {
               var mod = OBJ.blocks.getMode()[panel.getMode()];
               OBJ.blocks.setCurrent(mod);
               var xml = OBJ.blocks.getXML(mod);
               if (xml) {
                   var elt = Blockly.Xml.textToDom(xml);
                   Blockly.Xml.domToWorkspace(elt, workspace);
               }
               showCategory("turtle", (mod === "onlogo"));
               showCategory("texts", (mod === "onlogo") || (mod === "onprogram"));
               showCategory("inputs", (mod === "onprogram"));


               // Blockly.Toolbox.dispose();
               // Blockly.mainWorkspace.updateToolbox(document.getElementById('toolbox_turtle'))
           }
           from_edit = true;
       };

       me.reload_workspace = function() {
           currentTabCallBack();
       }

       var hideCallback = function() {
           showCategory("turtle", false);
           showCategory("texts", false);
           showCategory("inputs", false);
           changeCSS("blocklyToolboxDiv", "visibility", "hidden");
           Blockly.ContextMenu.hide();
       };

       var showCallback = function() {
           setTimeout(function() {
               changeCSS("blocklyToolboxDiv", "visibility", "visible");
               panel.setTitle(OBJ.getName());
           }, 320);
           showCurrentTab();
       };



       var show = function() {
           if (panel === null) loadBlockly()
           else {
               panel.show();
               showCallback();
           }
       }

       me.paintTurtle = function() {
           turtle.paint();
       };

       // me.computeTurtle = function() {
       //     if (turtle) turtle.compute();
       // };

       me.changeTurtleUVW = function(_n, _u, _v, _w) {
           turtle.changeUVW(_n, _u, _v, _w);
       };

       me.changeTurtlePT = function(_name, _pt) {
           turtle.changePT(_name, _pt);
       };

       me.resetTurtle = function(_name) {
           turtle.reset(_name);
       };

       // Appelée chaque fois qu'on clique sur un objet
       // pendant que le panel est ouvert :
       me.tryEdit = function(_o) {
           // clearOBJ(); // Effacement éventuel du dernier objet
           if (panel && (!panel.isHidden())) {
               if (Blockly.selected && Blockly.selected.getName) {
                   Blockly.selected.getName(_o)
               } else {
                   me.edit(_o);
               }
               return true
           }
           return false;
       }

       me.edit = function(_o) {
           OBJ = _o;
           from_edit = true;
           show();
       }
   }
