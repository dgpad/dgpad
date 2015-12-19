/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CallMagnet() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "magnet";
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
        zc.magnetManager.edit(this.getC(0));
        //        zc.propertiesManager.edit(this.getC(0));
    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
