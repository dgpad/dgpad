//************************************************
//**************** LOCUS CONSTRUCTOR *************
//************************************************
function LocusConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "locus";
    };

    this.getInitials = function() {
        return ["point,line,circle"];
    };

    this.isInstantTool = function() {
        return true;
    };

    this.newObj = function(_zc, _C) {
        var first = this.getC(0);
        _C.push(_zc.getConstruction().findPtOn(first));
        return (new LocusObject(_zc.getConstruction(), "_Locus", _C[0], _C[1]));
    };

    this.preview = function(ev, zc) {};
}
