/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function VirtualPointObject(_x, _y) {
    var X = _x;
    var Y = _y;
    var alpha=0;
    var is_3D = false;


    this.getX = function() {
        return X;
    };

    this.getY = function() {
        return Y;
    };

    this.setXY = function(x, y) {
        X = x;
        Y = y;
    };
    
    this.setAlpha=function(_a){
        alpha=_a;
    };
    
    this.getAlpha=function(){
        return alpha;
    };

    this.near = function(_x, _y) {
        return ((Math.abs(X - _x) < 1E-10) && (Math.abs(Y - _y) < 1E-10));
    };
    
    this.is3D = function() {
        return is_3D;
    };
    
    this.set3D = function(_b) {
        is_3D = _b;
    };
    
}
;
