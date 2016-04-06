function CallList() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "calllist";
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
        this.getC(0).setSegmentsSize(1 * (this.getC(0).getSegmentsSize() === 0));
        if ((this.getC(0).getSegmentsSize() === 0) && (this.getC(0).getSize() === 0)) {
            this.getC(0).setSize(0.5)
        }
        this.getC(0).computeChilds();
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};

}
