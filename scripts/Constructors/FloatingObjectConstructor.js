/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function FloatingObjectConstructor() {
    $U.extend(this, new ObjectConstructor()); //Héritage

    this.getCode = function() {
        return "pushpin";
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

    this.unfree = function() {
        return false;
    };

    this.createObj = function(zc, ev) {
        var pt = this.getC(0);
        pt.setFloat(!pt.getFloat());
        if (pt.getFloat()) {
            pt.free = function() {
                return false;
            }
        } else {
            pt.free = function() {
                return (pt.getParentLength() === 0);
            }
        }
        //        zc.selectPropBtn(true);
        //        zc.propertiesManager.edit(this.getC(0));

    };

    this.selectCreatePoint = function(zc, ev) {};

    this.preview = function(ev, zc) {};


}
