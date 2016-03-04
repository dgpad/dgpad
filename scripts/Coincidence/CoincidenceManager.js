function CoincidenceManager(_canvas) {
    var canvas = _canvas;
    var me = this;
    var panel = null;
    var event = null;


    var priority = function(_o) {
        switch (_o.getFamilyCode()) {
            case "point":
                return 0;
                break;
            case "line":
                return 1;
                break;
            case "circle":
                return 2;
                break;
            case "locus":
                return 3;
                break;
            case "angle":
                return 4;
                break;
            case "area":
                return 5;
                break;
        }
        return 10;
    }

    var sortFilter = function(_a, _b) {
        return (_a.Scratch - _b.Scratch);
    }




    me.checkCoincidences = function(ev) {
        // On récupère dans un tableau tous les objets situés
        // sous le clic de souris ou le tap :
        var t = canvas.getConstruction().getObjectsUnderMouse(ev);
        if (t.length < 2) return false;

        // On va trier le tableau par famille d'objets :
        var len = t.length;
        for (var i = 0; i < len; i++) {
            t[i].Scratch = priority(t[i]);
        }
        t.sort(sortFilter);
        var i = 1;
        while ((i < len) && (t[i].Scratch === t[0].Scratch))
            i++;

        // On ne va garder dans ce tableau que les objets d'une même
        // famille (selon la priorité définie dans priority) :
        t = t.slice(0, i);
        if (t.length < 2) return false;

        // Il faut ensuite que les objets soient confondus :
        if (canvas.getConstruction().isMode(1)) {
            for (var i = 1, len = t.length; i < t.length; i++) {
                if (!t[0].isCoincident(t[i])) return false;
            }
        }


        // Si on arrive jusqu'ici, c'est qu'il y a ambiguité :

        for (var i = 0; i < t.length; i++) {
            t[i] = [t[i].getName() + ": " + $L.object[t[i].getCode()], t[i]];
            if (t[i][1].isHidden()) t[i].push("#777");
            else t[i].push(t[i][1].getColor().getHEX());
        }
        event = ev;
        panel = new BubblePanel(canvas, me.exec, me.close, ev, t, $L.coincidence_message + " : " + $L.coincidence_select.replace("$1", t.length), 270, 190, 50);

        // var cp = new CoincidencePanel(canvas, ev, t);


        //        for (var i = 0, len = t.length; i < t.length; i++) {
        //            console.log(t[i].getName() + " " + t[i].Scratch);
        //        }
        return true;
        //        console.log(t);
    }

    me.isVisible = function() {
        return (panel && panel.isVisible());
    };

    me.close = function() {
        panel = null;
    }

    me.exec = function(_o) {
        var cn = canvas.getConstruction();
        cn.clearIndicated();
        cn.clearSelected();
        cn.addSelected(_o);
        canvas.paint(event);
        canvas.initTools(event, _o);
    }


}
