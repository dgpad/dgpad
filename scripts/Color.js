function Color() {
    var me = this;
    var r = 0,
        g = 0,
        b = 0,
        a = 0;
    var hex = "";
    var rgb = "";
    var rgba = "";

    me.getHEX = function() {
        return hex;
    };

    me.getRGB = function() {
        return rgb;
    };

    me.getRGBA = function() {
        return rgba;
    };

    me.getR = function() {
        return r;
    };
    me.getG = function() {
        return g;
    };
    me.getB = function() {
        return b;
    };
    me.getOpacity = function() {
        return a;
    };
    me.setOpacity = function(_a) {
        me.setRGBA(r, g, b, _a);
    };
    me.setRGBA = function(_r, _g, _b, _a) {
        var t = "rgba(" + _r + "," + _g + "," + _b + "," + _a + ")";
        me.set(t);
    };

    me.set = function(color) {
        var cache, p = parseInt;

        color = color.replace(/\s\s*/g, '');

        // Checks for 6 digit hex and converts string to integer
        if (cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))
            cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)];

        // Checks for 3 digit hex and converts string to integer
        else if (cache = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))
            cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17];

        // Checks for rgba and converts string to
        // integer/float using unary + operator to save bytes
        else if (cache = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3], +cache[4]];

        // Checks for rgb and converts string to
        // integer/float using unary + operator to save bytes
        else if (cache = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3]];

        // Otherwise throw an exception to make debugging easier
        else
            throw Error(color + ' is not supported...');

        // Performs RGBA conversion by default
        isNaN(cache[3]) && (cache[3] = 1);

        r = cache[0];
        g = cache[1];
        b = cache[2];
        a = cache[3];
        var myrgb = b | (g << 8) | (r << 16) | (0x1000000);
        hex = '#' + myrgb.toString(16).substring(1);
        rgb = "rgb(" + r + "," + g + "," + b + ")";
        rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };


}
