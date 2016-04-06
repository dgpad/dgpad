function DigitBtn(_owner) {
    var me = this;
    $U.extend(this, new Button(_owner));
    //    me.setStyles("border-radius:5px;border:1px solid #58575e;font-family:Verdana;font-size:20px;font-weight:normal;color:#222;background:" + $U.browserCode() + "-linear-gradient(top, #eeeef0, #d3d3d9)");

    me.setStyles("background-color:#FAFAFA;text-align: center;font: 20px sans-serif;display: inline-block;border: 1px solid #b4b4b4;border-radius: 5px;" + $U.browserCode() + "-transition: all 0.1s ease-in-out");

    me.addDownEvent(function(ev) {
        me.setStyles("background-color:#d3d3d9");
    });

    me.addUpEvent(function() {
        me.setStyles("background-color:#FAFAFA");
    });

    me.setEnabled = function(_b) {
        me.getDocObject().disabled = !_b;
        me.setStyle("color", _b ? "#666" : "#999");
    };

}
