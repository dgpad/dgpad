/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function PropertiesManager(_canvas) {
    var me = this;
    var canvas = _canvas;

    var propsPanel = null;


// On a cliqué sur l'icône Properties :
    me.showPanel = function() {
        if (!propsPanel) {
            propsPanel = new PropertiesPanel(canvas);
        }
    };

    me.hidePanel = function() {
        if (propsPanel) {
            propsPanel.close();
            propsPanel = null;
            me.clearEditMode();
        }
    };

    me.clearEditMode = function() {
        var Cn = canvas.getConstruction();
        var v = Cn.elements();
        for (var i = 0, len = v.length; i < len; i++) {
            v[i].setEditMode(0);
        }
    };

    me.edit = function(_obj) {
        me.clearEditMode();
        if (propsPanel) {
            _obj.setEditMode(1);
            propsPanel.showProperties(_obj);
        }
    
    };



};