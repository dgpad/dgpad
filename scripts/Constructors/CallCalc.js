/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallCalc() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "callcalc";
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
        zc.selectCalcBtn(true);
        var obj = (this.getC(0).getCode() === "list") ? this.getC(0).getEXP() : this.getC(0);
        setTimeout(function() {
            zc.calcManager.edit(obj);
        }, 1);

    };

    this.selectCreatePoint = function(zc, ev) {
    };

    this.preview = function(ev, zc) {
    };


}

