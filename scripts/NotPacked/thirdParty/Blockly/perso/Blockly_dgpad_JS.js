Blockly.JavaScript['dgpad_construction'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'CONTENT');
    return "@CONST@" + statements_name + "@CONST@"
}

Blockly.JavaScript['dgpad_point'] = function(block) {
    var name = block.getFieldValue('name');
    // if (typeof Blockly.dgpad_Cn.find(name) != "undefined") return "";
    var cod = name + "=Point(\"" + name + "\"," + block.cx + "," + block.cy + ");\n";
    switch (block.blocktype) {
        case "pointon":
            cod = name + "=PointOn(\"" + name + "\"," + block.getFieldValue('obj1') + ",0);\n";
            break;
        case "intersect":
            cod = name + "=OrderedIntersection(\"" + name + "\"," + block.getFieldValue('obj1') + "," + block.getFieldValue('obj2') + ",0);\n";
            break;
        case "coords":
            cod = name + "=Point(\"" + name + "\"," + block.getFieldValue('obj1') + "," + block.getFieldValue('obj2') + ");\n";
            break;
        case "exp":
            cod = name + "=Point(\"" + name + "\",\"" + block.getFieldValue('obj1') + "\",\"0\");\n";
            break;
    }
    cod += "STL(" + name + ",\"sn:true\");\n";
    return cod;
}

Blockly.JavaScript['dgpad_segment'] = function(block) {
    var A = block.getFieldValue('a'),
        B = block.getFieldValue('b');
    var name = "[" + A + " " + B + "]";
    name = "b32_" + $U.base32.encode(name).replace(/\=/g, "")
    var cod = name + "=Segment(\"" + name + "\"," + A + "," + B + ");\n";
    return cod;
}

Blockly.JavaScript['dgpad_droite'] = function(block) {
    var A = block.getFieldValue('a'),
        B = block.getFieldValue('b');
    var name = "(" + A + " " + B + ")";
    name = "b32_" + $U.base32.encode(name).replace(/\=/g, "")
    var cod = name + "=Line(\"" + name + "\"," + A + "," + B + ");\n";
    return cod;
}

Blockly.JavaScript['dgpad_anglebiss'] = function(block) {
    var A = block.getFieldValue('a'),
        B = block.getFieldValue('b'),
        C = block.getFieldValue('c');
    var name = "^" + A + " " + B + " " + C;
    name = "b32_" + $U.base32.encode(name).replace(/\=/g, "")
    var cod = name + "=AngleBisector(\"" + name + "\"," + A + "," + B + "," + C + ");\n";
    return cod;
}

Blockly.JavaScript['dgpad_plumb'] = function(block) {
    var AB = block.getFieldValue('a'),
        C = block.getFieldValue('c');
    var name = "T(" + AB + " " + C + ")";
    name = "b32_" + $U.base32.encode(name).replace(/\=/g, "")
    var cod = name + "=Perpendicular(\"" + name + "\"," + AB + "," + C + ");\n";
    return cod;
}

Blockly.JavaScript['dgpad_circle'] = function(block) {
    var A = block.getFieldValue('a'),
        B = block.getFieldValue('b'),
        C = block.getFieldValue('c');
    // var name = "T("+AB+" "+C+")";
    // name="A_"+$U.base32.encode(name).replace(/\=/g,"")
    var cod = A + "=Circle(\"" + A + "\"," + B + "," + C + ");\n";
    return cod;
}