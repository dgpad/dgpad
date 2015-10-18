//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function AnchorConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    var img = new Image();
    img.src = $APP_PATH + "NotPacked/images/tools/anchorblack.svg";

    this.getCode = function() {
        return "anchor";
    };

    this.getType = function() {
        return 1;
    };

    this.getInitials = function() {
        return ["point"];
    };
    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        var Obj = this.getC(0);
        var Pt = this.getC(1);
        if (Obj.getCode() === "expression") {
            // Il s'agit d'une expression à attacher à un point :
            Obj.attachTo(Pt);
        } else {
            // Il s'agit d'un point à redéfinir :
            if ((this.isNewPoint)&&(Pt.getParentLength()===0)) {
                // Un nouveau point libre a été créé, on l'enlève :
                zc.getConstruction().remove(Pt);
            }else{
                // On a ciblé un objet, bon pour un point sur :
                Obj.attachTo(Pt);
            }
        }
    };

    this.preview = function(ev, zc) {
//        console.log(this.getCList().length);
        var ctx = zc.getContext();
        ctx.strokeStyle = zc.prefs.color.hilite;
        ctx.lineWidth = zc.prefs.size.line;
        var x = this.getC(0).getX();
        var y = this.getC(0).getY();
        var w = (this.getC(0).getW) ? this.getC(0).getW() : 0;
        var h = (this.getC(0).getW) ? 5 : 0;
        var x0 = x + w / 2;
        var y0 = y + h;
        var x1 = zc.mouseX(ev);
        var y1 = zc.mouseY(ev);
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);

        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(img, (x0 + x1) / 2 - 20, (y0 + y1) / 2 - 20, 40, 40);
    };
}