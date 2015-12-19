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

    var close = function() {
        _closeProc();
    };

    var setText = function(_t) {
        textarea.setAttr("innerHTML", _t);
    };

    var setComment = function(_t) {
        comment.setAttr("innerHTML", _t);
    };

    var typeCallback = function(_val) {
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
                canvas.loadZipPackage(iBookStuff);
                break;
        }
        if (!Object.touchpad)
            textarea.getDocObject().select();
    };

    var iBookStuff = function() {
        setText("");
        canvas.getiBookPlugin(hidectrlpanel, "", function(_c) {
            var url = window.URL.createObjectURL(_c);
            setComment($L.export_ibook + '<br><br><a download="iBookPlugin.zip" href="' + url + '" style="-webkit-touch-callout:default;font-size:13px;font-family:Helvetica, Arial, sans-serif;color:#252525;" target="_blank"><b>' + $L.export_ibook2 + '</b></a>');
        });
    };

    var getHTML = function() {
        return canvas.getHTML(hidectrlpanel);
    };

    var getHTMLJS = function() {
        return canvas.getHTMLJS(hidectrlpanel);
    };

    var getSRC = function() {
        var s = canvas.getSource();
        return s;
    };

    var getPAGE = function() {
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

    var addtoolsCBACK = function(_v) {
        hidectrlpanel = _v;
        typeCallback(sel);
    };

    var cbshowCS = new Checkbox(me.getDocObject(), 250, 15, 200, 30, hidectrlpanel, $L.export_istools, addtoolsCBACK);
    cbshowCS.setTextColor("#000000");

    setTimeout(function() {
        btns.select(0);
        typeCallback(0);
    }, 0);


}
