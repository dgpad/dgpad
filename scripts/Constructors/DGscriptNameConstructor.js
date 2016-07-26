function DGScriptNameConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "dgscriptname";
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

    this.createObj = function(zc, ev) {
        var obj = this.getC(0);
        $U.prompt($L.create_blockly_program_change_message, obj.getLabel(), "text", function(_old, _new) {
            if (_new === "") _new = _old;
            obj.setLabel(_new);
            zc.paint();
        }, 450, 165, 430);
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};
}
