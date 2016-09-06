$macros = {};



$macros[$L.macros.repere] = {
    name: $L.macros.repere,
    parameters: ["point"],
    exec: function(O) {
        Set3D(true);
        SetGeneralStyle("degree:false");
        STL(O, "fl:true");
        X = Point("X", "[1,0,0]", "0");
        Y = Point("Y", "[0,1,0]", "0");
        Z = Point("Z", "[0,0,1]", "0");
        S11 = Segment("S11", O, X);
        S21 = Segment("S21", O, Y);
        S31 = Segment("S31", O, Z);
        STL(X, "c:#0000b2;o:1;s:4;sn:true;f:24");
        STL(Y, "c:#0000b2;o:1;s:4;sn:true;f:24");
        STL(Z, "c:#0000b2;o:1;s:4;sn:true;f:24");
        STL(S11, "c:#117dad;s:1;f:24");
        STL(S21, "c:#117dad;s:1;f:24");
        STL(S31, "c:#117dad;s:1;f:24");
        SetCoordsStyle("centerZoom:true");
        SetCoords(361, 26, 136);
        return [X, Y, Z, S11, S21, S31];
    }
};

$macros[$L.macros.coords3D] = {
    name: $L.macros.coords3D,
    parameters: ["point"],
    exec: function(X) {
        E1 = Expression("E1", "", "", "", "X", "-1.1102941176470589", "-1.0588235294117647");
        STL(E1, "c:#193323;s:7;f:24;p:4;cL:200");
        return [E1];
    }
};

$macros[$L.macros.dist3D] = {
    name: $L.macros.dist3D,
    parameters: ["point", "point"],
    exec: function(X, Y) {
        E1 = Expression("E1", "", "", "", "d(X,Y)", "-0.3602941176470588", "-1.286764705882353");
        STL(E1, "c:#154561;s:7;f:24;p:4;cL:200;cPT:YzojNzgwMDEzO3M6MTA7ZjozMA==");
        return [E1];
    }
};

$macros[$L.macros.norm3D] = {
    name: $L.macros.norm3D,
    parameters: ["area"],
    exec: function(Poly1) {
        Y = DefinitionPoint("Y", Poly1, 2);
        Z = DefinitionPoint("Z", Poly1, 1);
        X = DefinitionPoint("X", Poly1, 0);
        P2 = Point("P2", "Poly1.barycenter3D()", "0");
        P3 = Point("P3", "P2+unitVector(crossProduct(X-Z,X-Y))", "0");
        S1 = Segment("S1", P2, P3);
        STL(P2, "c:#0000b2;s:6;f:30");
        STL(P3, "c:#0000b2;s:6;f:30");
        STL(S1, "c:#006633;s:1;f:24");
        return [P2, P3, S1];
    }
};

$macros[$L.macros.perp3D] = {
    name: $L.macros.perp3D,
    parameters: ["area", "point"],
    exec: function(Poly1, M1) {
        A = DefinitionPoint("A", Poly1, 1);
        B = DefinitionPoint("B", Poly1, 0);
        C = DefinitionPoint("C", Poly1, 2);
        v = Expression("v", "AB vect AC ", "", "", "unitVector(crossProduct(B-A,C-A))", "-1.2353666434556096", "-1.9925268442832418");
        E2 = Expression("E2", "", "", "", "var _a=A,_c=-v[0]*_a[0]-v[1]*_a[1]-v[2]*_a[2],_m=M1,_k=(-_c-v[0]*_m[0]-v[1]*_m[1]-v[2]*_m[2])/(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);[_k*v[0]+_m[0],_k*v[1]+_m[1],_k*v[2]+_m[2]]", "-1.2353666434556096", "-2.7895375819965382");
        P3 = Point("P3", "M1+v*2", "0");
        P2 = Point("P2", "E2", "0");
        L1 = Line("L1", M1, P3);
        M2 = Point("M2", "(P2+M1)/2", 0);
        C5 = Circle("C5", M2, P3);
        P4 = OrderedIntersection("P4", L1, C5, 1, P3);
        Symc4 = Point("Symc4", "2*M2-P4", 0);
        S1 = Segment("S1", P4, Symc4);
        STL(P2, "c:#0000b2;s:6;f:30");
        STL(S1, "c:#006633;s:1;f:24");
        return [P2, S1];
    }
};

$macros[$L.macros.circle3D3pts] = {
    name: $L.macros.circle3D3pts,
    parameters: ["point", "point", "point"],
    exec: function(P2, P1, P3) {
        C1 = Circle3pts3D("C1", P2, P1, P3);
        STL(C1, "c:#cc66cc;s:1;f:30;p:0");
        return [C1];
    }
};

$macros[$L.macros.circle3D] = {
    name: $L.macros.circle3D,
    parameters: ["line", "point"],
    exec: function(L1, P) {
        A = DefinitionPoint("A", L1, 0);
        B = DefinitionPoint("B", L1, 1);
        E1 = Expression("E1", "", "", "", "var _p=minus(P,B);var _v=unitVector(minus(A,B));var _cte=-_p[0]*_v[0]-_p[1]*_v[1]-_p[2]*_v[2];var _k=(-_cte)/(_v[0]*_v[0]+_v[1]*_v[1]+_v[2]*_v[2]);var _o=[_k*_v[0],_k*_v[1],_k*_v[2]];var _m=[_v[0]*_v[0]*(_p[0])+(_v[0]*_v[1]-_v[2])*(_p[1])+(_v[0]*_v[2]+_v[1])*(_p[2]),(_v[0]*_v[1]+_v[2])*(_p[0])+_v[1]*_v[1]*(_p[1])+(_v[1]*_v[2]-_v[0])*(_p[2]),(_v[0]*_v[2]-_v[1])*(_p[0])+(_v[1]*_v[2]+_v[0])*(_p[1])+_v[2]*_v[2]*(_p[2])];[_m+B,2*_o-_m+B]", "0.07064028226277075", "-0.46420756915535066");
        Q = Point("Q", "E1[0]", "0");
        R = Point("R", "E1[1]", "0");
        C1 = Circle3pts3D("C1", R, P, Q);
        STL(C1, "c:#cc66cc;s:1;f:30;p:0");
        return [C1];
    }
};

$macros[$L.macros.displayground] = {
    name: $L.macros.displayground,
    parameters: ["point"],
    exec: function(P1) {
        Set3D(true);
        STL(P1, "fl:true");
        SetCoords(374, 18, 68);
        P11 = Point("P11", "[3,-3,0]", "0");
        P12 = Point("P12", "[3,3,0]", "0");
        P14 = Point("P14", "[2,-3,0]", "0");
        P13 = Point("P13", "[3,-2,0]", "0");
        Symc1 = Symmetry("Symc1", P1, P12);
        Symc2 = Symmetry("Symc2", P1, P11);
        Symc4 = Symmetry("Symc4", P13, P11);
        Symc10 = Symmetry("Symc10", P1, P14);
        Symc9 = Symmetry("Symc9", P1, P13);
        Symc3 = Symmetry("Symc3", P14, P11);
        M4 = MidPoint("M4", Symc4, P12);
        M1 = MidPoint("M1", Symc3, Symc1);
        Poly2 = Polygon("Poly2", "_P11,_Symc1,_Symc2,_P12");
        Symc8 = Symmetry("Symc8", P1, Symc4);
        Symc11 = Symmetry("Symc11", P1, Symc3);
        Symc6 = Symmetry("Symc6", P1, M4);
        M6 = MidPoint("M6", M4, Symc4);
        M5 = MidPoint("M5", P12, M4);
        M2 = MidPoint("M2", Symc1, M1);
        Symc13 = Symmetry("Symc13", P1, M1);
        M3 = MidPoint("M3", M1, Symc3);
        Symc12 = Symmetry("Symc12", P1, M3);
        Symc5 = Symmetry("Symc5", P1, M5);
        Symc14 = Symmetry("Symc14", P1, M2);
        Symc7 = Symmetry("Symc7", P1, M6);
        Poly1 = Polygon("Poly1", "_P11,_Symc1,_Symc5,_P13,_Symc4,_Symc6,_Symc7,_M6,_M4,_Symc8,_Symc9,_M5,_P12,_Symc14,_P14,_Symc3,_Symc13,_Symc12,_M3,_M1,_Symc11,_Symc10,_M2");
        E2 = Expression("E2", $L.macros.displayground_m, "0", "1", "1", "-2.213235294117647", "-0.25");
        E1 = Expression("E1", "", "", "", "Poly2.setHidden(1-E2);Poly1.setHidden(1-E2);Poly1.noMouseInside();if(theta()<0) {Poly2.setRGBColor(151,101,0);Poly2.setLayer(2);Poly2.setOpacity(1)} else {Poly2.setRGBColor(0,124,125);;Poly2.setLayer(0);Poly2.setOpacity(0.2)};\"prog\"", "-2.2619466022759225", "-2.072738781183221");
        STL(E2, "c:#007c7c;s:12;f:24;i:1;p:-1;cL:40;cPT:YzojMDA3YzdjO286MTtzOjEwO2Y6MzA7aTox");
        STL(Poly2, "c:#007c7d;o:0.2;s:1;f:30");
        STL(Poly1, "c:#007c7c;o:0.2;s:1;f:30");
        SetCoordsStyle("centerZoom:true");
        return [E2, Poly2, Poly1];
    }
};

$macros[$L.macros.restrictTheta] = {
    name: $L.macros.restrictTheta,
    parameters: [],
    exec: function() {
        Set3D(true);
        E3 = Expression("E3", "", "", "", "restrictTheta([-PI/2,PI/2]);\"Restriction\"", "3.75008787680827", "-0.6621296799728857");
        STL(E3, "c:#5a2b65;s:7;f:24;p:4;cL:200;cPT:YzojNzgwMDEzO3M6MTA7ZjozMA==");
        SetCoordsStyle("centerZoom:true");
        SetCoords(361, 26, 136);
        return [E3];
    }
};

$macros[$L.macros.pt3Dwithdialog] = {
    name: $L.macros.pt3Dwithdialog,
    parameters: [],
    exec: function(O) {
        Set3D(true);
        var tab = prompt("Coordonn\u00e9es 3D s\u00e9par\u00e9es par des virgules", "1,0,0");
        P1 = Point("P1", "[" + tab + "]", "0");
        STL(P1, "c:#0000b2;s:6;f:30");
        SetCoordsStyle("centerZoom:true");
        return [P1];
    }
};

$macros[$L.macros.pt3Dwithoutdialog] = {
    name: $L.macros.pt3Dwithoutdialog,
    parameters: ["expression"],
    exec: function(E1) {
        Set3D(true);
        P1 = Point("P1", "E1", "0");
        STL(P1, "c:#0000b2;s:6;f:30");
        SetCoordsStyle("centerZoom:true");
        return [P1];
    }
};

$macros[$L.macros.edge] = {
    name: $L.macros.edge,
    parameters: ["point", "point", "point", "point"],
    exec: function(B, F, H, E) {
        Set3D(true);
        S10 = Segment("S10", F, E);
        angl1 = Angle("angl1", B, F, E);
        angl2 = Angle("angl2", E, F, H);
        E3 = Expression("E3", "", "", "", "S10.setDash((angl1.getAOC()>\u03C0)&&(angl2.getAOC()>\u03C0));\"Dash code\"", "-1.4712586524326248", "-0.5506337908922178");
        return [S10];
    }
};

$macros[$L.macros.solid_cube] = {
    name: $L.macros.solid_cube,
    parameters: ["point"],
    exec: function(P1) {
        P11 = Point("P11", "P1+[1,1,-1]", "0");
        P12 = Point("P12", "P1+[1,-1,-1]", "0");
        P13 = Point("P13", "P1+[-1,1,-1]", "0");
        P14 = Point("P14", "P1+[-1,-1,-1]", "0");
        Symc1 = Symmetry("Symc1", P1, P11);
        Symc2 = Symmetry("Symc2", P1, P12);
        Symc3 = Symmetry("Symc3", P1, P13);
        Symc4 = Symmetry("Symc4", P1, P14);
        S106 = Segment("S106", P14, P13);
        angl26 = Angle("angl26", P13, P14, P12);
        S107 = Segment("S107", P12, P11);
        angl17 = Angle("angl17", P14, P12, P11);
        S1010 = Segment("S1010", P13, P11);
        angl210 = Angle("angl210", P11, P13, P14);
        S1011 = Segment("S1011", P14, P12);
        angl111 = Angle("angl111", P13, P14, P12);
        S10 = Segment("S10", Symc4, P11);
        angl1 = Angle("angl1", Symc3, Symc4, P11);
        angl2 = Angle("angl2", P11, Symc4, Symc2);
        S101 = Segment("S101", Symc2, P13);
        angl11 = Angle("angl11", Symc4, Symc2, P13);
        angl21 = Angle("angl21", P13, Symc2, Symc1);
        S102 = Segment("S102", Symc1, P14);
        angl12 = Angle("angl12", Symc2, Symc1, P14);
        angl22 = Angle("angl22", P14, Symc1, Symc3);
        S103 = Segment("S103", Symc3, P12);
        angl13 = Angle("angl13", Symc1, Symc3, P12);
        angl23 = Angle("angl23", P12, Symc3, Symc4);
        S104 = Segment("S104", Symc3, Symc4);
        angl14 = Angle("angl14", P12, Symc3, Symc4);
        angl24 = Angle("angl24", Symc4, Symc3, Symc1);
        S105 = Segment("S105", Symc1, Symc2);
        angl15 = Angle("angl15", Symc3, Symc1, Symc2);
        angl25 = Angle("angl25", Symc2, Symc1, P14);
        angl16 = Angle("angl16", Symc1, P14, P13);
        angl27 = Angle("angl27", P11, P12, Symc3);
        S108 = Segment("S108", Symc1, Symc3);
        angl18 = Angle("angl18", P14, Symc1, Symc3);
        angl28 = Angle("angl28", Symc3, Symc1, Symc2);
        S109 = Segment("S109", Symc2, Symc4);
        angl19 = Angle("angl19", Symc1, Symc2, Symc4);
        angl29 = Angle("angl29", Symc4, Symc2, P13);
        angl110 = Angle("angl110", Symc2, P13, P11);
        angl211 = Angle("angl211", P12, P14, Symc1);
        E3 = Expression("E3", "", "", "", "S10.setDash((angl1.getAOC()>\u03C0)&&(angl2.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E31 = Expression("E31", "", "", "", "S101.setDash((angl11.getAOC()>\u03C0)&&(angl21.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E32 = Expression("E32", "", "", "", "S102.setDash((angl12.getAOC()>\u03C0)&&(angl22.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E33 = Expression("E33", "", "", "", "S103.setDash((angl13.getAOC()>\u03C0)&&(angl23.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E34 = Expression("E34", "", "", "", "S104.setDash((angl14.getAOC()>\u03C0)&&(angl24.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E35 = Expression("E35", "", "", "", "S105.setDash((angl15.getAOC()>\u03C0)&&(angl25.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E36 = Expression("E36", "", "", "", "S106.setDash((angl16.getAOC()>\u03C0)&&(angl26.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E37 = Expression("E37", "", "", "", "S107.setDash((angl17.getAOC()>\u03C0)&&(angl27.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E38 = Expression("E38", "", "", "", "S108.setDash((angl18.getAOC()>\u03C0)&&(angl28.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E39 = Expression("E39", "", "", "", "S109.setDash((angl19.getAOC()>\u03C0)&&(angl29.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E310 = Expression("E310", "", "", "", "S1010.setDash((angl110.getAOC()>\u03C0)&&(angl210.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        E311 = Expression("E311", "", "", "", "S1011.setDash((angl111.getAOC()>\u03C0)&&(angl211.getAOC()>\u03C0));\"Dash code\"", "-1.4014017306911484", "-0.560613351141");
        STL(P11, "c:#0000b2;s:6;f:30");
        STL(P12, "c:#0000b2;s:6;f:30");
        STL(P13, "c:#0000b2;s:6;f:30");
        STL(P14, "c:#0000b2;s:6;f:30");
        STL(Symc1, "c:#0000b2;s:6;f:30");
        STL(Symc2, "c:#0000b2;s:6;f:30");
        STL(Symc3, "c:#0000b2;s:6;f:30");
        STL(Symc4, "c:#0000b2;s:6;f:30");
        STL(S106, "c:#006633;s:1;f:24;dh:true");
        STL(S107, "c:#006633;s:1;f:24");
        STL(S1010, "c:#006633;s:1;f:24");
        STL(S1011, "c:#006633;s:1;f:24;dh:true");
        STL(S10, "c:#006633;s:1;f:24");
        STL(S101, "c:#006633;s:1;f:24");
        STL(S102, "c:#006633;s:1;f:24;dh:true");
        STL(S103, "c:#006633;s:1;f:24");
        STL(S104, "c:#006633;s:1;f:24");
        STL(S105, "c:#006633;s:1;f:24");
        STL(S108, "c:#006633;s:1;f:24");
        STL(S109, "c:#006633;s:1;f:24");
        return [P11, P12, P13, P14, Symc1, Symc2, Symc3, Symc4, S106, S107, S1010, S1011, S10, S101, S102, S103, S104, S105, S108, S109];
    }
};

$macros[$L.macros.inscribedcircle] = {
    name: $L.macros.inscribedcircle,
    parameters: ["point", "point", "point"],
    exec: function(A, B, C) {
        S1 = Segment(A, B);
        S2 = Segment(B, C);
        S3 = Segment(A, C);
        R1 = AngleBisector(A, B, C);
        R2 = AngleBisector(B, C, A);
        D = OrderedIntersection(R1, R2, 0);
        Perp1 = Perpendicular(S2, D);
        E = OrderedIntersection(Perp1, S2, 0);
        C1 = Circle(D, E);
        return [D, C1, S1, S2, S3];
    }
};

$macros[$L.macros.isosceles_triangle] = {
    name: $L.macros.isosceles_triangle,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        L1 = PerpendicularBisector("L1", P1, P2);
        S2 = Segment("S2", P1, P2);
        P3 = PointOn("P3", L1, -212.58676521613583);
        S1 = Segment("S1", P3, P1);
        S3 = Segment("S3", P2, P3);
        return [S2, P3, S1, S3];
    }
};

$macros[$L.macros.right_triangle] = {
    name: $L.macros.right_triangle,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        S1 = Segment("S1", P1, P2);
        Perp1 = Perpendicular("Perp1", S1, P1);
        P3 = PointOn("P3", Perp1, 133.44154404910768);
        S2 = Segment("S2", P1, P3);
        S3 = Segment("S3", P3, P2);
        return [S1, P3, S2, S3];
    }
};

$macros[$L.macros.equilateral_triangle] = {
    name: $L.macros.equilateral_triangle,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        C1 = Circle("C1", P1, P2);
        C2 = Circle("C2", P2, P1);
        S3 = Segment("S3", P2, P1);
        P3 = OrderedIntersection("P3", C2, C1, 1);
        S1 = Segment("S1", P1, P3);
        S2 = Segment("S2", P3, P2);
        return [S3, P3, S1, S2];
    }
};

$macros[$L.macros.carre] = {
    name: $L.macros.carre,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        S1 = Segment("S1", P1, P2);
        C1 = Circle("C1", P2, P1);
        Perp1 = Perpendicular("Perp1", S1, P2);
        P3 = OrderedIntersection("P3", Perp1, C1, 0);
        M1 = MidPoint("M1", P3, P1);
        S2 = Segment("S2", P2, P3);
        Symc1 = Symmetry("Symc1", M1, P2);
        S3 = Segment("S3", P3, Symc1);
        S4 = Segment("S4", Symc1, P1);
        STL(S1, "c:#006633;s:1;f:24");
        STL(P3, "c:#0000b2;s:6;f:30");
        STL(S2, "c:#006633;s:1;f:24");
        STL(Symc1, "c:#0000b2;s:6;f:30");
        STL(S3, "c:#006633;s:1;f:24");
        STL(S4, "c:#006633;s:1;f:24");
        return [S1, P3, S2, Symc1, S3, S4];
    }
};


$macros[$L.macros.rectangle] = {
    name: $L.macros.rectangle,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        S1 = Segment("S1", P1, P2);
        Perp1 = Perpendicular("Perp1", S1, P1);
        P3 = PointOn("P3", Perp1, 139.09461041920926);
        M1 = MidPoint("M1", P3, P2);
        S2 = Segment("S2", P1, P3);
        Symc1 = Symmetry("Symc1", M1, P1);
        S3 = Segment("S3", P3, Symc1);
        S4 = Segment("S4", Symc1, P2);
        STL(S1, "c:#006633;s:1;f:24");
        STL(P3, "c:#0000b2;s:6;f:30");
        STL(S2, "c:#006633;s:1;f:24");
        STL(Symc1, "c:#0000b2;s:6;f:30");
        STL(S3, "c:#006633;s:1;f:24");
        STL(S4, "c:#006633;s:1;f:24");
        return [S1, P3, S2, Symc1, S3, S4];
    }
};


$macros[$L.macros.tangent] = {
    name: $L.macros.tangent,
    parameters: ["circle", "point"],
    exec: function(C1, P2) {
        P1 = Center("P1", C1);
        M1 = MidPoint("M1", P2, P1);
        C2 = Circle("C2", M1, P1);
        P3 = OrderedIntersection("P3", C2, C1, 1);
        P4 = OrderedIntersection("P4", C2, C1, 0);
        L1 = Line("L1", P2, P3);
        L2 = Line("L2", P2, P4);
        return [L1, L2];
    }
};

$macros[$L.macros.translation] = {
    name: $L.macros.translation,
    parameters: ["point", "point", "point"],
    exec: function(P1, P2, P3) {
        P4 = Point("P4", "P3+P2-P1", "0");
        STL(P4, "c:#0000b2;s:6;f:30");
        return [P4];
    }
};


$macros[$L.macros.rotation5] = {
    name: $L.macros.rotation5,
    parameters: ["point", "point", "point", "point", "point"],
    exec: function(O, C, B, A, M) {
        P1 = Point("P1", "O+((M-O)*(top.$U.cpx=(A-B)/(C-B)))/mod(top.$U.cpx)", "0");
        STL(P1, "c:#0000b2;s:6;f:30");
        return [P1];
    }
};


$macros[$L.macros.rotationD] = {
    name: $L.macros.rotationD,
    parameters: ["point", "point"],
    exec: function(O, M) {
        var a = Input("Entrer l'angle en degr\u00e9s :");
        P1 = Point("P1", "O+((M-O)*(cos(" + a + ")+i*sin(" + a + ")))", "0");
        STL(P1, "c:#0000b2;s:6;f:30");
        return [P1];
    }
};


$macros[$L.macros.dilation] = {
    name: $L.macros.dilation,
    parameters: ["point", "point", "expression"],
    exec: function(P1, P2, E1) {
        P3 = Point("P3", "P1+E1*(P2-P1)", "0");
        STL(P3, "c:#0000b2;s:6;f:30");
        return [P3];
    }
};

$macros[$L.macros.dilationdlog] = {
    name: $L.macros.dilationdlog,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        var r = prompt("Rapport de l'homoth\u00e9tie :", "2");
        P3 = Point("P3", "P1+" + r + "*(P2-P1)", "0");
        STL(P3, "c:#0000b2;s:6;f:30");
        return [P3];
    }
};

$macros[$L.macros.inversion] = {
    name: $L.macros.inversion,
    parameters: ["circle", "point"],
    exec: function(C1, P2) {
        P1 = Center("P1", C1);
        L1 = Line("L1", P2, P1);
        C2 = Circle("C2", P1, P2);
        Perp1 = Perpendicular("Perp1", L1, P1);
        P4 = OrderedIntersection("P4", L1, C1, 1);
        P3 = OrderedIntersection("P3", Perp1, C2, 0);
        P5 = OrderedIntersection("P5", Perp1, C1, 0);
        L2 = Line("L2", P3, P4);
        Par1 = Parallel("Par1", L2, P5);
        P6 = OrderedIntersection("P6", Par1, L1, 0);
        STL(P6, "c:#0000b2;s:6;f:30");
        return [P6];
    }
};


$macros[$L.macros.testalign] = {
    name: $L.macros.testalign,
    parameters: ["point", "point", "point"],
    exec: function(A, M, B) {
        E1 = Expression("E1", "", "", "", "var txt=\"Les points \"+A.getName()+\", \"+M.getName()+\" et \"+B.getName()+\" \";(abs(y((M-A)/(M-B)))<0.000000000001)?txt+\" sont align\u00e9s\":txt+\" ne sont pas align\u00e9s\"", "-7.8", "8.6875");
        STL(E1, "c:#246376;s:7;f:24;p:4;cL:200;cPT:YzojNzgwMDEzO3M6MTA7ZjozMA==");
        return [E1];
    }
};


$macros[$L.macros.conic5pts] = {
    name: $L.macros.conic5pts,
    parameters: ["point", "point", "point", "point", "point"],
    exec: function(A, B, C, D, E) {
        Quad = Quadric("Quad", A, B, C, D, E);
        return [Quad];
    }
};

$macros[$L.macros.coniccenter] = {
    name: $L.macros.coniccenter,
    parameters: ["quadric"],
    exec: function(Quad) {
        P6 = Point("P6", "Quad.center()", "0");
        STL(P6, "c:#0000b2;s:6;f:30");
        return [P6];
    }
};

$macros[$L.macros.conicfoci] = {
    name: $L.macros.conicfoci,
    parameters: ["quadric"],
    exec: function(Quad) {
        E1 = Expression("E1", "", "", "", "Quad.foci()", "-10.05", "7.3375");
        P7 = Point("P7", "E1[0]", "0");
        P8 = Point("P8", "E1[1]", "0");
        STL(P7, "c:#0000b2;s:6;f:30");
        STL(P8, "c:#0000b2;s:6;f:30");
        return [P7, P8];
    }
};


$macros[$L.macros.pingpong] = {
    name: $L.macros.pingpong,
    parameters: ["point", "point"],
    exec: function(P1, P2) {
        Symc1 = Symmetry("Symc1", P2, P1);
        Symc2 = Symmetry("Symc2", P2, Symc1);
        STL(Symc2, "c:#0000b2;s:6;f:30");
        return [Symc2];
    }
};


$macros[$L.macros.segmentB1] = {
    name: $L.macros.segmentB1,
    parameters: ["line"],
    exec: function(S1) {
        A = DefinitionPoint("A", S1, 0);
        B = DefinitionPoint("B", S1, 1);
        P1 = Point("P1", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))", "0");
        P3 = Point("P3", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))", "0");
        S2 = Segment("S2", P1, P3);
        var s1 = Find(S1),
            s2 = Find(S2),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            s2.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            s2.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(S2, "c:" + col + ";s:" + sz + ";f:24");
        return [S2];
    }
};

$macros[$L.macros.segmentB2] = {
    name: $L.macros.segmentB2,
    parameters: ["line"],
    exec: function(S1) {
        A = DefinitionPoint("A", S1, 0);
        B = DefinitionPoint("B", S1, 1);
        E = Point("E", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))+5*(B-A)/(d(A,B)*pixel())", "0");
        P2 = Point("P2", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))+5*(B-A)/(d(A,B)*pixel())", "0");
        P1 = Point("P1", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))-5*(B-A)/(d(A,B)*pixel())", "0");
        P3 = Point("P3", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))-5*(B-A)/(d(A,B)*pixel())", "0");
        S2 = Segment("S2", P1, P3);
        S3 = Segment("S3", E, P2);
        var s1 = Find(S1),
            s2 = Find(S2),
            s3 = Find(S3),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            s2.setSize(_s);
            s3.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            s2.setColor(_col);
            s3.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(S2, "c:" + col + ";s:" + sz + ";f:24");
        STL(S3, "c:" + col + ";s:" + sz + ";f:24");
        return [S2, S3];
    }
};

$macros[$L.macros.segmentB3] = {
    name: $L.macros.segmentB3,
    parameters: ["line"],
    exec: function(S1) {
        A = DefinitionPoint("A", S1, 0);
        B = DefinitionPoint("B", S1, 1);
        E = Point("E", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))+10*(B-A)/(d(A,B)*pixel())", "0");
        P2 = Point("P2", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))+10*(B-A)/(d(A,B)*pixel())", "0");
        P1 = Point("P1", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))", "0");
        P3 = Point("P3", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))", "0");
        P4 = Point("P4", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))-10*(B-A)/(d(A,B)*pixel())", "0");
        P5 = Point("P5", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))-10*(B-A)/(d(A,B)*pixel())", "0");
        S2 = Segment("S2", P1, P3);
        S3 = Segment("S3", E, P2);
        S4 = Segment("S3", P4, P5);
        var s1 = Find(S1),
            s2 = Find(S2),
            s3 = Find(S3),
            s4 = Find(S4),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            s2.setSize(_s);
            s3.setSize(_s);
            s4.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            s2.setColor(_col);
            s3.setColor(_col);
            s4.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(S2, "c:" + col + ";s:" + sz + ";f:24");
        STL(S3, "c:" + col + ";s:" + sz + ";f:24");
        STL(S4, "c:" + col + ";s:" + sz + ";f:24");
        return [S2, S3, S4];
    }
};

$macros[$L.macros.segmentB4] = {
    name: $L.macros.segmentB4,
    parameters: ["line"],
    exec: function(S1) {
        A = DefinitionPoint("A", S1, 0);
        B = DefinitionPoint("B", S1, 1);
        E = Point("E", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))+5*(B-A)/(d(A,B)*pixel())", "0");
        P2 = Point("P2", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))+5*(B-A)/(d(A,B)*pixel())", "0");
        P1 = Point("P1", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))+15*(B-A)/(d(A,B)*pixel())", "0");
        P3 = Point("P3", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))+15*(B-A)/(d(A,B)*pixel())", "0");
        P4 = Point("P4", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))-5*(B-A)/(d(A,B)*pixel())", "0");
        P5 = Point("P5", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))-5*(B-A)/(d(A,B)*pixel())", "0");
        P6 = Point("P6", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))-15*(B-A)/(d(A,B)*pixel())", "0");
        P7 = Point("P7", "(A+B)/2+(10/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))-15*(B-A)/(d(A,B)*pixel())", "0");
        S2 = Segment("S2", P1, P3);
        S3 = Segment("S3", E, P2);
        S4 = Segment("S4", P4, P5);
        S5 = Segment("S5", P6, P7);
        var s1 = Find(S1),
            s2 = Find(S2),
            s3 = Find(S3),
            s4 = Find(S4),
            s5 = Find(S5),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            s2.setSize(_s);
            s3.setSize(_s);
            s4.setSize(_s);
            s5.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            s2.setColor(_col);
            s3.setColor(_col);
            s4.setColor(_col);
            s5.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(S2, "c:" + col + ";s:" + sz + ";f:24");
        STL(S3, "c:" + col + ";s:" + sz + ";f:24");
        STL(S4, "c:" + col + ";s:" + sz + ";f:24");
        STL(S5, "c:" + col + ";s:" + sz + ";f:24");
        return [S2, S3, S4, S5];
    }
};

$macros[$L.macros.segmentBO] = {
    name: $L.macros.segmentBO,
    parameters: ["line"],
    exec: function(S1) {
        P1 = DefinitionPoint("P1", S1, 0);
        P2 = DefinitionPoint("P2", S1, 1);
        M1 = MidPoint("M1", P2, P1);
        C1 = Circle1("C1", M1, "10/pixel()");
        var s1 = Find(S1),
            c1 = Find(C1),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            c1.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            c1.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(C1, "c:" + col + ";s:" + sz + ";f:24");
        return [C1];
    }
};

$macros[$L.macros.segmentBZ] = {
    name: $L.macros.segmentBZ,
    parameters: ["line"],
    exec: function(S1) {
        A = DefinitionPoint("A", S1, 0);
        B = DefinitionPoint("B", S1, 1);
        E = Point("E", "(A+B)/2+(12/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))+12*(B-A)/(d(A,B)*pixel())", "0");
        P2 = Point("P2", "(A+B)/2+(12/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))+12*(B-A)/(d(A,B)*pixel())", "0");
        P4 = Point("P4", "(A+B)/2+(12/(2*pixel()*d(A,B)))*(B-A)*(1+i*sqrt(3))-12*(B-A)/(d(A,B)*pixel())", "0");
        P5 = Point("P5", "(A+B)/2+(12/(2*pixel()*d(A,B)))*(A-B)*(1+i*sqrt(3))-12*(B-A)/(d(A,B)*pixel())", "0");
        S2 = Segment("S2", E, P5);
        S3 = Segment("S3", E, P2);
        S4 = Segment("S3", P4, P5);
        var s1 = Find(S1),
            s2 = Find(S2),
            s3 = Find(S3),
            s4 = Find(S4),
            oldSetSize = s1.setSize,
            oldSetColor = s1.setColor;
        s1.setSize = function(_s) {
            oldSetSize(_s);
            s2.setSize(_s);
            s3.setSize(_s);
            s4.setSize(_s);
        };
        s1.setColor = function(_col) {
            oldSetColor(_col);
            s2.setColor(_col);
            s3.setColor(_col);
            s4.setColor(_col);
        };
        var sz = s1.getSize();
        var col = s1.getColor().getHEX();
        STL(S2, "c:" + col + ";s:" + sz + ";f:24");
        STL(S3, "c:" + col + ";s:" + sz + ";f:24");
        STL(S4, "c:" + col + ";s:" + sz + ";f:24");
        return [S2, S3, S4];
    }
};
