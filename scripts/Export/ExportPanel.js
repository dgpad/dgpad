function ExportPanel(_canvas, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var www = 450;
    var hhh = 300;
    var hidectrlpanel = true;
    var sel = -1;
    var btns = null;
    $U.extend(this, new CenterPanel(canvas, www, hhh));
    var JSZipReady = false;

    me.show();

    var close = function () {
        _closeProc();
    };

    var setText = function (_t) {
        textarea.setAttr("innerHTML", _t);
    };

    var setComment = function (_t) {
        comment.setAttr("innerHTML", _t);
    };

    var typeCallback = function (_val) {
        sel = _val;
        switch (_val) {
            case 0:
                setText(getSRC());
                var lnk = ($iOS_APPLICATION) ? "data-txt:" : "data:text/plain;base64,";
                lnk += $U.base64_encode(canvas.getSource());
                setComment($L.export_sourcecomment + '<br><br><a download="DGPad_file.txt" href="' + lnk + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_source_download + '</b></a>');
                break;
            case 1:
                setText(getHTMLJS());
                setComment($L.export_htmljscomment);
                break;
            case 2:
                setText(getHTML());
                setComment($L.export_htmlcomment);
                break;
            case 3:
                setText(getPAGE());
                setComment($L.export_htmlstandalonecomment);
                break;
            case 4:
                var svgsrc = canvas.exportSVG();
                var lnk = ($iOS_APPLICATION) ? "data-svg:" : "data:image/svg+xml,";
                lnk += ($iOS_APPLICATION) ? $U.base64_encode(svgsrc) : encodeURIComponent(svgsrc);
                setText(svgsrc);
                setComment($L.export_svgimage + '<br><br><a download="DgpadSvgImage.svg" href="' + lnk + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_svgimage2 + '</b></a>');
                break;
            case 5:
                if (JSZipReady)
                    iBookStuff();
                else {
                    var parent = document.getElementsByTagName("head")[0];
                    var script0 = document.createElement("script");
                    script0.type = "text/javascript";
                    script0.src = $APP_PATH + "NotPacked/thirdParty/jszip-utils.js";
                    var script1 = document.createElement("script");
                    script1.type = "text/javascript";
                    script1.src = $APP_PATH + "NotPacked/thirdParty/jszip.min.js";
                    script1.onload = function () {
                        iBookStuff();
                        JSZipReady = true;
                    }
                    parent.appendChild(script0);
                    parent.appendChild(script1);
                }
                break;
        }
        if (!Object.touchpad)
            textarea.getDocObject().select();
    };


    var iBookStuff = function () {
        setText("");
        var ibook = getiBookFiles();
        JSZipUtils.getBinaryContent($APP_PATH + "NotPacked/scripts.zip", function (err, data) {
            if (err) {
                throw err; // or handle err
            }
            var zip = new JSZip();
            var plugin = zip.folder("ibook.wdgt").load(data);
            plugin.file("index.html", ibook.html);
            plugin.file("Info.plist", ibook.plist);
            plugin.file("Default.png", ibook.png.substr(ibook.png.indexOf(',') + 1), {base64: true});
            var content = zip.generate({type: "blob"});
            var url = window.URL.createObjectURL(content);
            setComment($L.export_ibook + '<br><br><a download="iBookPlugin.zip" href="' + url + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_ibook2 + '</b></a>');
        });
    };


    var getiBookFiles = function () {
        var _w = canvas.getBounds().width;
        var _h = canvas.getBounds().height;
        
        
        
        var d = new Date();
        var _id = "net.dgpad.fig" + d.getTime();
        var _src = canvas.getSource();
        _src = $U.base64_encode(_src);
        var _hide = hidectrlpanel ? "true" : "false";
        var html = "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title></title>\n\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n\t\t<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" />\n\t\t<link rel=\"apple-touch-icon\" href=\"scripts/NotPacked/images/icon.png\"/>\n\t\t<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n\t\t<meta   id=\"wholeViewport\" name=\"viewport\" content=\"width=device-width, maximum-scale=1.0, initial-scale=1 ,user-scalable=no\">\n\t\t<script>\n\t\t\tvar $MOBILE_PHONE;\n\t\t\tif (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {\n\t\t\t\tif (((screen.width >= 480) && (screen.height >= 800)) || ((screen.width >= 800) && (screen.height >= 480)) || navigator.userAgent.match(/ipad/gi)) {\n\t\t\t\t\t$MOBILE_PHONE = false;//tablette\n\t\t\t\t} else {\n\t\t\t\t\t$MOBILE_PHONE = true;//mobile\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\t$MOBILE_PHONE = false;//Desktop\n\t\t\t}\n\t\t\tif ($MOBILE_PHONE) {\n\t\t\t\tdocument.getElementById('wholeViewport').setAttribute(\"content\", \"width=device-width, maximum-scale=0.7, initial-scale=0.7 ,user-scalable=no\");\n\t\t\t}\n\t\t</script>\n\t</head>\n\t<body style=\"-ms-touch-action: none;\">\n\t\t<script src=\"scripts/DGPad.js\" data-source=\"" + _src + "\" data-hidectrlpanel=\""+_hide+"\"></script>\n\t</body> \n</html>\n";
        var plist = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n<plist version=\"1.0\">\n<dict>\n\t<key>CFBundleDisplayName</key>\n\t<string>DGPad</string>\n\t<key>CFBundleIdentifier</key>\n\t<string>" + _id + "</string>\n\t<key>MainHTML</key>\n\t<string>index.html</string>\n\t<key>Width</key>\n\t<integer>" + _w + "</integer>\n\t<key>Height</key>\n\t<integer>" + _h + "</integer>\n</dict>\n</plist>\n";
        var png = canvas.exportPNG();
        return {"html": html, "plist": plist, "png": png};
    }



    var getHTML = function () {
        var _w = canvas.getBounds().width;
        var _h = canvas.getBounds().height;
        var _src = canvas.getSource();
        _src = $U.base64_encode(_src);
        var d = new Date();
        var _frm = "dgpad_frame_" + d.getTime();
        var s = '<form action="http://www.dgpad.net/index.php" target="' + _frm + '" method="post" width="' + _w + '" height="' + (_h + 40) + '">';
        s += '<input type="hidden" name="file_content" value="' + _src + '">';
        if (hidectrlpanel)
            s += '<input type="hidden" name="hide_ctrlpanel" value="' + hidectrlpanel + '">';
        s += '<div style="text-align:center;position:relative;width:' + _w + 'px;height:' + _h + 'px;background-color:rgba(200,200,200,1)">';
        s += '<div style="height:40px;line-height:40px;vertical-align: baseline;">';
        s += '<input type="submit" value="' + $L.export_button + '" style="display: inline-block;zoom: 1;*display: inline;vertical-align: baseline;margin: 0 2px;outline: none;cursor: pointer;text-align: center;text-decoration: none;font: 14px/100% Arial, Helvetica, sans-serif;padding: .5em 2em .55em;text-shadow: 0 1px 1px rgba(0,0,0,.3);-webkit-border-radius: .5em;-moz-border-radius: .5em;border-radius: .5em;-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);box-shadow: 0 1px 2px rgba(0,0,0,.2);color: #d7d7d7;border: solid 1px #333;background: #333;background: -webkit-gradient(linear, left top, left bottom, from(#666), to(#000));background: -moz-linear-gradient(top,  #666,  #000);">';
        s += '</div>';
        s += '<iframe name="' + _frm + '" width="' + _w + '" height="' + _h + '" src="about:blank" scrolling="no" frameborder="no"></iframe>';
        s += '</div>';
        s += '</form>';
        return s;
    };

    var getHTMLJS = function () {
        var _w = canvas.getBounds().width;
        var _h = canvas.getBounds().height;
        var _src = canvas.getSource();
        _src = $U.base64_encode(_src);
        var d = new Date();
        var _frm = "dgpad_frame_" + d.getTime();
        var s = '<form action="http://www.dgpad.net/index.php" target="' + _frm + '" method="post" width="' + _w + '" height="' + _h + '">';
        s += '<input type="hidden" name="file_content" value="' + _src + '">';
        if (hidectrlpanel)
            s += '<input type="hidden" name="hide_ctrlpanel" value="' + hidectrlpanel + '">';
        s += '<iframe name="' + _frm + '" width="' + _w + '" height="' + _h + '" src="about:blank" scrolling="no" frameborder="no" oNlOAd="if (!this.parentNode.num) {this.parentNode.submit();this.parentNode.num=true}"></iframe>';
        s += '</form>';
        return s;
    };

    var getSRC = function () {
        var s = canvas.getSource();
        return s;
    };

    var getPAGE = function () {
        var s = '<!DOCTYPE html>\n';
        s += '<html style="margin:0;padding:0;width:100%;height:100%;display: table">\n';
        s += '<head>\n';
        s += '<title></title>\n';
        s += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n';
        s += '</head>\n';
        s += '<body style="margin:0;padding:0;width:100%;height:100%;display: table;background-color:rgba(200,200,230,0.3)">\n';
        s += '<div style="display: table-cell;text-align: center;vertical-align: middle;">';
        s += '<div style="display: inline-block;text-align: left">';
        s += getHTMLJS() + '\n';
        s += '</div></div>';
        s += '</body>\n';
        s += '</html>';
        return s;
    };

    new CloseBox(me, close);


    var textarea_wrapper = new GUIElement(me, "div");
    textarea_wrapper.setStyles("position:absolute;background-color:rgba(0,0,0,1);left:10px;top:140px;right:10px;bottom:20px;resize:none;overflow:hidden");

    var textarea = new GUIElement(me, "textarea");
    textarea.setStyles("width:100%;height:100%;margin:0;border:0;wrap:on");
    textarea_wrapper.addContent(textarea);
    me.addContent(textarea_wrapper);

    btns = new ImageGroup(me.getDocObject(), 10, 10, www - 20, 40, $APP_PATH + "NotPacked/images/dialog/bgOff.svg", $APP_PATH + "NotPacked/images/dialog/bgOn.svg", typeCallback);
    btns.setImageSize(36);
    btns.setHspace(3);
    btns.addImage($APP_PATH + "NotPacked/images/dialog/download.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/htmljs.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/html.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/safari.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/svg.svg");
    btns.addImage($APP_PATH + "NotPacked/images/dialog/ibook.svg");

    var comment = new GUIElement(me, "div");
    comment.setStyles("position:absolute;background-color:#FEFEFE;font-size:12px;font-family:Helvetica, Arial, sans-serif;color:#252525;border: 1px solid #b4b4b4;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:5px;border-radius:10px");
    comment.setBounds(10, 60, www - 20, 70);
    setComment($L.export_standardcomment);
    me.addContent(comment);

    var addtoolsCBACK = function (_v) {
        hidectrlpanel = _v;
        typeCallback(sel);
    };

    var cbshowCS = new Checkbox(me.getDocObject(), 250, 15, 200, 30, hidectrlpanel, $L.export_istools, addtoolsCBACK);
    cbshowCS.setTextColor("#000000");

    setTimeout(function () {
        btns.select(0);
        typeCallback(0);
    }, 0);


}
