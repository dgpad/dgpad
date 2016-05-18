function TrackManager(_canvas) {
    var me = this;
    var canvas = _canvas;
    var tracks = [];
    var docObject = document.createElement("canvas");
    canvas.getDocObject().parentNode.insertBefore(docObject, canvas.getDocObject().nextSibling);

    $U.STL(docObject, "position: absolute;top:0px;left:0px;pointer-events:none;background-color:rgba(0,0,0,0)");
    $U.ATT(docObject, "width:" + canvas.getWidth() + ";height:" + canvas.getHeight());


    var ctx = docObject.getContext("2d");
    ctx.globalAlpha = 1;


    me.getDocObject = function() {
        return docObject;
    }

    me.add = function(_o, forced) {
        if ((!forced) && (_o.isHidden())) return;
        for (var i = 0, len = tracks.length; i < len; i++) {
            if (tracks[i] === _o) return;
        }
        _o.startTrack();
        tracks.push(_o);
    }
    me.remove = function(_o) {
        docObject.width = docObject.width;
        for (var i = 0, len = tracks.length; i < len; i++) {
            if (tracks[i] === _o) {
                tracks[i].clearTrack();
                tracks.splice(i, 1);
                return;
            }
        }
    }
    me.resize = function() {
        $U.ATT(docObject, "width:" + canvas.getWidth() + ";height:" + canvas.getHeight());
    }
    me.clear = function() {
        ctx.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
    }

    me.draw = function() {
        for (var i = 0, len = tracks.length; i < len; i++) {
            tracks[i].drawTrack(ctx);
        }
    }

    me.setAllTrack = function(_tpe, _val) {
        var v = canvas.getConstruction().elements();
        var proc = (_val) ? me.add : me.remove;
        for (var i = 0, len = v.length; i < len; i++) {
            if (v[i].getFamilyCode() === _tpe) proc(v[i]);
        }
    }

}
