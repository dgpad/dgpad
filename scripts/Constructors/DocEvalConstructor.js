//************************************************
//*************** SEGMENT CONSTRUCTOR **************
//************************************************
function DocEvalConstructor() {
    var panel = null;
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "doceval";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.isInstantTool = function() {
        return true;
    };

    var close = function() {
        if (panel) {
            panel.close();
            panel = null
        }
    };

    this.createObj = function(zc, ev) {
        // $ALERT("ok");
        panel = new DocEvalPanel(zc, this.getC(0).getVarName(), close);
        // zc.blocklyManager.edit(this.getC(0));
        //        zc.propertiesManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {

    };

    this.preview = function(ev, zc) {};
}
