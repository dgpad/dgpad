function Tool(_canvas, _man, _oc) {
    var me = this;
    var canvas = _canvas;
    var toolmanager = _man;
    var OC = _oc;
    var X, Y, WIDTH, HEIGHT;
    var mouseDown = function(ev) {
        ev.preventDefault();
        toolmanager.mouseDown(ev, me);
    };
    var mouseReleased = function(ev) {
        ev.preventDefault();
        toolmanager.mouseReleased(ev);
    };
    var image = new ToolBtn(canvas, OC, mouseDown, mouseReleased);

    this.getConstructor = function() {
        return OC;
    };
    this.getX = function() {
        return X;
    };
    this.getY = function() {
        return Y;
    };
    this.getW = function() {
        return WIDTH;
    };
    this.getH = function() {
        return HEIGHT;
    };


    this.init = function(_x, _y, _size) {
        X = _x;
        Y = _y;
        WIDTH = _size;
        HEIGHT = _size;
        image.init(X, Y, WIDTH, HEIGHT);
    };

    this.hide = function() {
        image.hide();
    };

    this.close = function() {
        image.close();
        //        image=new ToolBtn(canvas,OC.getCode(),mouseDown,mouseReleased);
    };

};
