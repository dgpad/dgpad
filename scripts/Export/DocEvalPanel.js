function DocEvalPanel(_canvas, _object_varname, _closeProc) {
    var me = this;
    var canvas = _canvas;
    var EXP = _object_varname;
    // var expression = _object;
    var www = 820;
    var hhh = 830;
    var hidectrlpanel = false;
    var scalecontent = false;
    var sel = -1;
    var btns = null;
    $U.extend(this, new CenterPanel(canvas, www, hhh));

    me.show();

    var close = function() {
        _closeProc();
        canvas.setNoMouseEvent(true);
    };

    var setCode = function(_t) {
        var cod = _t;
        if ($U.DE_question.trim() !== "") cod = $U.DE_question.replace(/\n/g, "<br>") + "<br>" + cod;
        cod+="\t"+reponse.getDocObject().value+"\tdgpad";
        textarea.setAttr("innerHTML", cod);


        // if ($U.DE_question.trim() === "") textarea.setAttr("innerHTML", _t);
        // else textarea.setAttr("innerHTML", $U.DE_question.replace(/\n/g, "<br>") + "<br>" + _t);
    };

    var setText = function(_t) {
        setCode(_t);
        preview.getDocObject().innerHTML = _t.replace(/https:\/\/dgpad\.net\//, "");
    };

    var setComment = function(_t) {
        comment.setAttr("innerHTML", _t);
    };

    var addtoolsCBACK = function(_v) {
        hidectrlpanel = _v;
        setText(getHTMLJS());
    };

    var scaleCBACK = function(_v) {
        scalecontent = _v;
        setText(getHTMLJS());
    };

    var getHTMLJS = function() {
        var expression = canvas.getConstruction().findVar(EXP);
        expression.setHidden(2);
        var html = canvas.getHTMLDOCEVAL(EXP, hidectrlpanel, scalecontent);
        expression.setHidden(0);
        return html;
    };

    new CloseBox(me, close);

    var textarea = new GUIElement(me, "textarea");
    textarea.setStyles("position:absolute;left:10px;top:50px;width:300px;height:60px;resize:none;overflow-y:scroll;overflow-x:hidden");
    me.addContent(textarea);

    var comment = new GUIElement(me, "div");
    comment.setStyles("position:absolute;background-color:#FEFEFE;text-align:center;vertical-align:middle;font-size:14px;font-family:Helvetica, Arial, sans-serif;color:#252525;border: 1px solid #b4b4b4;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:5px;border-radius:10px");
    comment.setBounds(10, 10, www - 20, 30);
    setComment($L.export_doceval);
    me.addContent(comment);

    var question = new GUIElement(me, "textarea");
    question.setStyles("position:absolute;top:125px;width:400px;left:90px;height:40px;resize:none;overflow-y:scroll;overflow-x:hidden;font-size:14px;font-family:Helvetica, Arial, sans-serif");

    question.setAttr("innerHTML", $U.DE_question);
    question.addKeyUpEvent(function(e) {
        $U.DE_question = e.target.value;
        localStorage.setItem("doceval_question", $U.DE_question);
        setCode(getHTMLJS());
    });
    me.addContent(question);

    var reponse = new GUIElement(me, "input");
    reponse.setStyles("position:absolute;top:133px;width:200px;right:10px;height:20px;resize:none;font-size:14px;font-family:Helvetica, Arial, sans-serif");
    reponse.setAttr("type", "text");
    reponse.addKeyUpEvent(function(e) {
        setCode(getHTMLJS());
    });
    me.addContent(reponse);

    var lbl = new GUIElement(me, "div");
    lbl.setStyles("position:absolute;left:10px;top:137px;width:80px;height:60px;text-align:left;font-size:14px;font-family:Helvetica, Arial, sans-serif");
    lbl.setAttr("innerHTML", $L.export_doceval_question);
    me.addContent(lbl);

    var lbl2 = new GUIElement(me, "div");
    lbl2.setStyles("position:absolute;left:515px;top:137px;width:80px;height:60px;text-align:left;font-size:14px;font-family:Helvetica, Arial, sans-serif");
    lbl2.setAttr("innerHTML", $L.export_doceval_answer);
    me.addContent(lbl2);

    var cbshowCS = new Checkbox(me.getDocObject(), 320, 55, 200, 30, hidectrlpanel, $L.export_istools, addtoolsCBACK);
    cbshowCS.setTextColor("#000000");
    cbshowCS.setTextFontSize(14);

    var cbscale = new Checkbox(me.getDocObject(), 320, 85, 200, 30, scalecontent, $L.export_is_scale, scaleCBACK);
    cbscale.setTextColor("#000000");
    cbscale.setTextFontSize(14);

    var preview_wrapper = new GUIElement(me, "div");
    preview_wrapper.setStyles("position:absolute;left:10px;top:180px;width:800px;height:600px;resize:none;border:0px");

    var preview = new GUIElement(me, "div");
    preview.setStyles("position:absolute;border:1px solid gray;left:50%;top:50%;transform: translate(-50%, -50%);width:" + $U.DE_width + "px;height:" + $U.DE_height + "px;resize:none;overflow:hidden");
    preview_wrapper.addContent(preview);
    me.addContent(preview_wrapper);

    var menuH_DIV = new GUIElement(me, "div");
    menuH_DIV.setStyles("position:absolute;width:260px;height:30px;right:10px;top:55px");
    var menuH = new GUIElement(me, "select");
    menuH.setStyles("position:absolute;right:10px;top:50%;transform:translate(0, -50%);width:100px;height:20px;border:1px solid gray;border-radius:5px;outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-indent:10px;font-size:14px");
    for (var i = 400; i <= 800; i = i + 50) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        if (i === $U.DE_width) option.selected = true;
        menuH.getDocObject().appendChild(option);

    }
    menuH.getDocObject().onchange = function(e) {
        $U.DE_width = parseInt(e.target.value);
        preview.setStyle("width", $U.DE_width + "px");
        setText(getHTMLJS());
        localStorage.setItem("doceval_width", $U.DE_width);
    }
    var label_H = new GUIElement(me, "div");
    label_H.setStyles("position:absolute;right:120px;top:50%;transform:translate(0,-50%);text-align:right;font-size:14px;font-family:Helvetica, Arial, sans-serif");
    label_H.setAttr("innerHTML", $L.export_doceval_width);
    menuH_DIV.addContent(label_H);
    menuH_DIV.addContent(menuH);
    me.addContent(menuH_DIV);

    var menuV_DIV = new GUIElement(me, "div");
    menuV_DIV.setStyles("position:absolute;width:260px;height:30px;right:10px;top:85px");
    var menuV = new GUIElement(me, "select");
    menuV.setStyles("position:absolute;right:10px;top:50%;transform: translate(0, -50%);width:100px;height:20px;border:1px solid gray;border-radius:5px;outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;text-indent:10px;font-size:14px");

    for (var i = 100; i <= 600; i = i + 50) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        if (i === parseInt($U.DE_height)) option.selected = true;
        menuV.getDocObject().appendChild(option);

    }
    menuV.getDocObject().onchange = function(e) {
        $U.DE_height = parseInt(e.target.value);
        preview.setStyle("height", $U.DE_height + "px");
        setText(getHTMLJS());
        localStorage.setItem("doceval_height", $U.DE_height);
    }
    var label_V = new GUIElement(me, "div");
    label_V.setStyles("position:absolute;right:120px;top:50%;transform:translate(0,-50%);text-align:right;font-size:14px;font-family:Helvetica, Arial, sans-serif");
    label_V.setAttr("innerHTML", $L.export_doceval_height);
    menuV_DIV.addContent(label_V);
    menuV_DIV.addContent(menuV);
    me.addContent(menuV_DIV);

    var changeBtn = new Button(me);
    changeBtn.setStyles("font-size:14px");
    changeBtn.setText($L.export_doceval_update);
    changeBtn.setBounds(www - 200, hhh - 40, 190, 30);
    changeBtn.setCallBack(function() {
        var frm_cnv = document.getElementById("doceval_iframe").contentWindow.$CANVAS;
        var frm_exp = frm_cnv.getConstruction().findVar(EXP);
        frm_exp.setHidden(0);
        var src = frm_cnv.getSource();
        frm_exp.setHidden(2);
        canvas.OpenFile("", src);
        setCode(getHTMLJS());
    });
    me.addContent(changeBtn);

    setText(getHTMLJS());

}
