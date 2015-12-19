function CalcManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var maincalc = null;
    var digitcalc = null;


    me.keypressed = function(ev) {
        var target = ev.target || ev.srcElement;
        maincalc.insertText(target.txt);
    };


    // On a cliqué sur l'icône Macro :
    me.showPanel = function() {
        if (!maincalc) {
            maincalc = new MainCalcPanel(me, canvas);
            digitcalc = new DigitCalcPanel(me, canvas);
        }
    };

    me.hidePanel = function() {
        if (maincalc) {
            maincalc.close();
            digitcalc.close();
            maincalc = null;
            digitcalc = null;
        }
    };

    me.getCustomKB = function() {
        return digitcalc;
    };

    me.activateBtns = function(_b) {
        digitcalc.activateBtns(_b);
    };

    me.edit = function(_obj) {
        maincalc.edit(_obj);
    };

}
