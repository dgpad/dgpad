/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ObjectMover() {
    $U.extend(this, new ObjectConstructor()); //Héritage
    var draggedObject = null;
    this.getCode = function() {
        return "objectmover";
    };

    // Retourne 0 pour un outil standard, 1 pour un outil de changement de propriété
    this.getType = function() {
        return 1;
    };

    this.isAcceptedInitial = function(o) {
        return true;
    };

    this.createObj = function(zc, ev) {
        draggedObject = null;
    };

    this.selectCreatePoint = function(zc, ev) {
    };

    var x0 = 0, y0 = 0;
    this.preview = function(ev, zc) {
        if (draggedObject) {
            draggedObject.dragTo(zc.mouseX(ev) + x0, zc.mouseY(ev) + y0);
            zc.getConstruction().compute();
        } else {
            draggedObject = this.getC(0);
            if ((draggedObject)&&(draggedObject.getFamilyCode() === "point")) {
                x0 = draggedObject.getX() - zc.mouseX(ev);
                y0 = draggedObject.getY() - zc.mouseY(ev);
            } else {
                x0 = 0;
                y0 = 0;
            }
            if (draggedObject) draggedObject.startDrag(zc.mouseX(ev) + x0, zc.mouseY(ev) + y0);
        }

    };


}

