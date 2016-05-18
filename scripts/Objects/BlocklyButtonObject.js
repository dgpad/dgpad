//************************************************
//************ ARC 3 pts OBJECT ******************
//************************************************
function BlocklyButtonObject(_construction, _name, _display_name, _x, _y) {
    $U.extend(this, new ConstructionObject(_construction, _name)); // Héritage
    var me = this;
    var Cn = _construction;
    var X = _x;
    var Y = _y;
    var W = 0;
    var BTN = { x: 0, y: 0, w: 40, h: 35, mouseInside: false };
    var LABEL = _display_name;


    this.blocks.setMode(["onprogram"], "onprogram");

    this.getAssociatedTools = function() {
        s = "@callproperty,@dgscriptname,@blockly";
        return s;
    };


    this.getCode = function() {
        return "blockly_button";
    };
    this.getFamilyCode = function() {
        return "blockly_button";
    };

    me.run = function() {
        this.blocks.evaluate("onprogram");
    };

    me.setLabel = function(_m) {
        LABEL = _m;
    };
    me.getLabel = function() {
        return LABEL;
    };


    var drawButton = function(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle;
        var d = 5;
        ctx.moveTo(x + w / d, y + h / d);
        ctx.lineTo(x + w / d, y + (d - 1) * h / d);
        ctx.lineTo(x + (d - 1) * w / d, y + h / 2);
        ctx.lineTo(x + w / d, y + h / d);
        ctx.fill();
    };


    this.paintObject = function(ctx) {
        if (BTN.mouseInside) ctx.strokeStyle = this.getColor().getRGB();
        W = ctx.measureText(LABEL).width;
        BTN.x = X - BTN.w;
        BTN.y = Y - 40 / 2;
        var fs = ctx.fillStyle;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(LABEL, X - BTN.w - 20, Y);
        ctx.strokeStyle = this.getColor().getRGB();
        if (BTN.mouseInside) ctx.lineWidth = this.getSize() * 1.5;
        else ctx.lineWidth = this.getSize();
        ctx.fillStyle = fs;
        drawButton(ctx, BTN.x, BTN.y, BTN.w, BTN.h, 10);
        ctx.textBaseline ="alphabetic";
    };


    me.setXY = function(x, y) {
        X = x;
        Y = y;
    };

    var dragX, dragY, OldX, OldY;
    this.startDrag = function(_x, _y) {
        dragX = _x;
        dragY = _y;
        OldX = X;
        OldY = Y;
    };

    this.dragTo = function(_x, _y) {
        this.setXY(OldX + Math.round((_x - dragX) / 10) * 10, OldY + Math.round((_y - dragY) / 10) * 10);
    };

    this.compute = function() {

    };

    this.getSource = function(src) {
        var x = Cn.coordsSystem.x(X);
        var y = Cn.coordsSystem.y(Y);
        src.geomWrite(true, this.getName(), "BlocklyButton", $U.native2ascii(LABEL), x, y);
    };

    this.insideButton = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        return ((mx > BTN.x) && (mx < BTN.x + BTN.w) && (my > BTN.y) && (my < BTN.y + BTN.h));
    };

    this.mouseInside = function(ev) {
        var mx = this.mouseX(ev),
            my = this.mouseY(ev);
        var x = X - BTN.w - 20 - W;
        var inside = ((mx > x) && (mx < x + W) && (my < Y + this.getFontSize() / 2) && (my > Y - this.getFontSize() / 2));
        BTN.mouseInside = this.insideButton(ev);
        return inside || BTN.mouseInside;
    };


    this.setDefaults("blockly_button");

}
