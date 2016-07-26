$L.number = function(_n) {
    return _n.toString().replace(".", ",")
};
$L.dot = ",";
$L.comma = ";";
$L.object.point = "Point";
$L.object.line = "Droite";
$L.object.circle = "Cercle";
$L.object.segment = "Segment";
$L.object.area = "Polygone";
$L.object.anglebiss = "Bissectrice";
$L.object.circle3pts = "Cercle par 3 points";
$L.object.locus = "Lieu";
$L.object.midpoint = "Milieu";
$L.object.parallel = "Droite parallèle";
$L.object.perpbis = "Médiatrice";
$L.object.plumb = "Droite perpendiculaire";
$L.object.ray = "Demi-droite";
$L.object.syma = "Symétrique (droite)";
$L.object.symc = "Symétrique (point)";
$L.object.family.line = "Lignes";
$L.object.family.circle = "Cercles";
$L.object.family.point = "Points";
$L.object.family.locus = "Lieux";
$L.object.family.area = "Polygones";
$L.object.family.angle = "Angles";
$L.macro_plugins = "Bibliothèque";
$L.macro_tools = "Macros personnelles";
$L.macroname = "Macro sans titre";
$L.props_grid_message = "Cliquer sur un objet ou sur un axe pour modifier ses propriétés.";
$L.props_grid_title = "Propriétés de la grille";
$L.props_grid_show = "Montrer la grille";
$L.props_axis_size = "Taille des axes";
$L.props_grid_size = "Taille de la grille";
$L.props_ox_show = "Montrer l'axe (Ox)";
$L.props_oy_show = "Montrer l'axe (Oy)";
$L.props_ox_lock = "Verrouiller l'axe (Ox)";
$L.props_oy_lock = "Verrouiller l'axe (Oy)";
$L.props_showname = "Montrer";
$L.props_opacity = "Opacité";
$L.props_size = "Taille";
$L.props_layer = "Calque";
$L.props_font = "Police";
$L.props_length = "Mesure";
$L.props_inc = "Incrément";
$L.props_dash = "Pointillés";
$L.props_inc_free = "Libre";
$L.props_length_none = "Sans";
$L.props_applyall = "Appliquer à tous : ";
$L.export_button = "Ouvrir la figure DGPad";
$L.export_standardcomment = "Cliquer sur les boutons ci-dessous pour voir le code à copier/coller.";
$L.export_htmljscomment = "Inclure ce code dans votre site : il devrait montrer votre figure immédiatement (sinon essayer le bouton suivant !).";
$L.export_htmlcomment = 'Certains gestionnaires de contenus très sécurisés peuvent empêcher la figure de se charger automatiquement. Ce code ne contient que du HTML, et la figure ne se chargera que lorsque l\'utilisateur aura cliqué sur un bouton.';
$L.export_sourcecomment = 'Code source de la figure (tel qu\'elle est enregistrée dans le nuage).';
$L.export_htmlstandalonecomment = 'Page HTML contenant la figure.';
$L.export_istools = 'Masquer le tableau de bord';
$L.separator_coords = ";";
$L.history_open = "Ouvrir";
$L.history_full = "Cet item ne peux pas être verrouillé car tous les autres le sont déjà (le 'localstorage' est plein).";
$L.history_title = "Historique des constructions";
$L.clear_all = "Effacer toute la construction";

// Mercredi 13 mars :

$L.macros.inscribedcircle = "Cercle Inscrit";
$L.macros.tangent = "Tangente";
$L.macros.isosceles_triangle = "Triangle Isocèle";
$L.macros.right_triangle = "Triangle Rectangle";
$L.macros.equilateral_triangle = "Triangle Equilatéral";


// Samedi 27 avril :
$L.props_grid_general = "Propriétés globales";
$L.props_grid_general_demo = "Mode de présentation";


// Samedi 11 mai :
$L.coincidence_message = "Ambiguïté";
$L.coincidence_select = "quel objet voulez-vous sélectionner parmi les $1 suivants ?";
$L.object.arc3pts = "Arc passant par 3 points";

// Jeudi 16 mai :
$L.erase_ckb_show_hidden = "Montrer les objets cachés";

// Samedi 25 mai :
$L.props_track = "Activer la trace";

// Mercredi 28 août 2013 :
$L.calc_value = "Valeur=";
$L.calc_text = "Texte:";

// Dimanche 8 septembre 2013 :
$L.object.expression = "Expression";
$L.object.family.expression = "Expressions";


// Dimanche 6 octobre 2013 :
$L.props_center_zoom = "Zoomer à l'origine";

// Lundi 7 octobre 2013 :
$L.magnet_without = "Sans";
$L.magnet_max = "Point sur";

// Jeudi 10 octobre 2013 :
$L.Locus_density = "Densité";
$L.Locus_density_min = "min";
$L.Locus_density_max = "max";
$L.object.quadric = "Conique";
$L.object.family.quadric = "Coniques";

// Mercredi 23 octobre :
$L.macros.inscribedcircle = "Cercles/Cercle inscrit";
$L.macros.tangent = "Cercles/Tangentes";
$L.macros.isosceles_triangle = "Polygones/Triangles/Triangle isocèle";
$L.macros.right_triangle = "Polygones/Triangles/Triangle rectangle";
$L.macros.equilateral_triangle = "Polygones/Triangles/Triangle équilatéral";
$L.macros.translation = "Transformations/Translation";
$L.macros.inversion = "Transformations/Inversion";
$L.macros.pt3Dwithdialog = "3D/Points 3D/Avec dialogue";
$L.macros.pt3Dwithoutdialog = "3D/Points 3D/Sans dialogue";
$L.macros.repere = "3D/Repère 3D";
$L.macros.pingpong = "Utilitaires/Ping-pong";
$L.macros.edge = "3D/Arête 3D";
$L.macros.restrictTheta = "3D/Restriction de Theta";
$L.macros.dilation = "Transformations/Homothétie/Sans dialogue";
$L.macros.dilationdlog = "Transformations/Homothétie/Avec dialogue";
$L.macros.solid_cube = "3D/Solides/Cube";
$L.macros.rectangle = "Polygones/Quadrilatères/Rectangle";
$L.macros.carre = "Polygones/Quadrilatères/Carré";
$L.macros.conic5pts = "Coniques/Conique par 5 pts";
$L.macros.testalign = "Tests/Alignement";
$L.macros.displayground = "3D/Montrer le sol";
$L.macros.displayground_m = "Montrer le sol";
$L.macros.coords3D = "3D/Géométrie/Coordonnées 3D";
$L.macros.perp3D = "3D/Géométrie/Perpendiculaire";
$L.macros.norm3D = "3D/Géométrie/Normale";
$L.macros.dist3D = "3D/Géométrie/Distance 3D";
$L.macros.circle3D = "3D/Géométrie/Cercle par axe et point";



// Mercredi 13 novembre 2013 :
$L.macros.coniccenter = "Coniques/Centre";
$L.macros.conicfoci = "Coniques/Foyers";

// Dimanche 1 décembre 2014
$L.macros.circle3D3pts = "3D/Géométrie/Cercle par 3 pts";

// Vendredi 6 décembre 2014
$L.object.circle3pts3D = "Cercle 3D";
$L.object.family.circle3pts3D = "Cercle 3D";

// Lundi 28 avril 2014
$L.export_svgimage = "Code source SVG de l'image correspondant à la figure.";
$L.export_svgimage2 = "Cliquer droit sur ce lien pour télécharger l'image.";

// Mardi 8 juillet 2014
$L.props_general_magnifier = "Montrer la loupe";

// Vendredi 18 juillet 2014
$L.object.family.list = "Listes";
$L.props_segment_size = "Segments";

// Vendredi 25 juillet 2014
$L.props_nomouse = "Objet inerte";

// Vendredi 29 août 2014
$L.export_source_download = "Cliquer droit sur ce lien pour télécharger le fichier.";

// Lundi 22 décembre 2014
$L.props_text_message = "Cliquer sur un widget pour modifier ses propriétés.";
$L.props_text_add = "Nouveau widget";
$L.props_text_opacity = "Opacité";
$L.props_text_size = "Taille";
$L.props_text_radius = "Rayon";
$L.props_text_example = "";

// Mercredi 24 décembre 2014
$L.props_text_precision = "Précision";

// Dimanche 28 décembre 2014
$L.props_text_js = "Lancer le script";

// Lundi 29 décembre 2014
$L.props_text_console = "Console de scripts";

// Dimanche 28 juin 2015
$L.export_ibook = "Widget pour publication de la figure dans iBook Author :";
$L.export_ibook2 = "Cliquer droit sur ce lien pour télécharger le widget zippé.";

// Dimanche 18 octobre 2015
$L.history_save = "Enregistrer la figure actuelle dans l'historique";

// Samedi 5 décembre 2015
$L.macros.rotation5 = "Transformations/Rotation/5 pts";
$L.macros.rotationD = "Transformations/Rotation/Avec dialogue";

// Mercredi 9 décembre 2015
$L.props_general_degree = "Angles en degr\u00e9s";

// Mercredi 16 décembre 2015
$L.props_trigo = "Sens trigonométrique";

// Lundi 21 décembre 2015
$L.blockly.geometry = "Géométrie";
$L.blockly.logic = "Logique";
$L.blockly.loops = "Boucles";
$L.blockly.expression = "Expressions";
$L.blockly.math = "Math";
$L.blockly.lists = "Listes";
$L.blockly.variables = "Variables";
$L.blockly.functions = "Fonctions";
$L.blockly.construction = "Construction";
$L.blockly.cn_auto = "auto";
$L.blockly.pt_type = "Point";
$L.blockly.pt_base = "de base";
$L.blockly.pt_on = "point sur";
$L.blockly.pt_inter = "à l'intersection de";
$L.blockly.pt_coords = "de coordonnées";
$L.blockly.pt_exp = "d'expression";
$L.blockly.pt_andof = "et de";
$L.blockly.pt_and = "et";

// Lundi 11 janvier 2016
$L.animation_without = "Sans";
$L.animation_label = "Animation";

// Dimanche 24 janvier 2016
$L.props_general_dragall = "Déplacer tous les objets";

// Lundi 22 février 2016
$L.blockly.var_return = "Retourner";
$L.blockly.push_add = "Rajouter";
$L.blockly.push_end = "à la fin de la liste";
$L.blockly.list_new = "Créer une nouvelle liste vide";

// Mardi 23 février 2016
$L.blockly.value = "Valeur";
// $L.blockly.o = {};
$L.blockly.o.expression = "de l'expression";
$L.blockly.o.point = "du point";
$L.blockly.o.circle1 = "du cercle";
$L.blockly.o.segment = "du segment";
$L.blockly.o.fixedangle = "de l'angle fixe";
$L.blockly.o.angle = "de l'angle";
$L.blockly.o.area = "du polygone";
// $L.blockly.o2 = {};
$L.blockly.o2.expression = "l'expression";
$L.blockly.o2.list = "la liste";
$L.blockly.o2.point = "le point";
$L.blockly.o2.circle1 = "le cercle";
$L.blockly.o2.segment = "le segment";
$L.blockly.o2.fixedangle = "l'angle fixe";
$L.blockly.o2.angle = "l'angle";
$L.blockly.o2.area = "le polygone";
$L.blockly.stop_list = "Rompre la liste";
$L.longpress_message = "Que voulez-vous faire ?";
$L.create_exp = "Créer une expression";
$L.create_exp_pts = "Créer une liste de points";
$L.create_exp_segs = "Créer une liste de segments";
$L.create_cursor_int = "Créer un curseur entier";
$L.create_cursor_cont = "Créer un curseur continu";
$L.create_widget_edit = "Créer le widget d'édition";
$L.edit_widget_name = "Nom de l'objet à éditer";
$L.edit_widget_edit = "Editer l'objet";
$L.blockly.fixvalue = "Fixer";
$L.blockly.copyall = "Copier tous les blocs";
$L.blockly.copyselected = "Copier les blocs sélectionnés";
$L.blockly.paste = "Coller les blocs";
$L.blockly.displaySource = "Afficher le code source";
$L.blockly.print = "Afficher";
$L.blockly.withlf = "avec retour à la ligne";
$L.blockly.withoutlf = "sans retour à la ligne";
$L.blockly.lang = "fr.js";


// Mercredi 30 mars 2016
// $L.blockly.tabs = {};
$L.blockly.tabs.oncompute = "Expression";
$L.blockly.tabs.onmousedown = "Appuyé";
$L.blockly.tabs.ondrag = "Déplacé";
$L.blockly.tabs.onmouseup = "Relâché";
$L.blockly.tabs.onchange = "Modifié";
$L.blockly.aspect = "Aspect";
$L.expression_item = "éléments";
$L.blockly.do = "faire";
$L.blockly.while = "tant que";
$L.blockly.until = "jusqu'à";
$L.blockly.prompt_ok = "Ok";
$L.blockly.prompt_cancel = "Annuler";

// Mardi 12 avril 2016
$L.create_blockly_button = "Créer un DGScript";
$L.blockly.tabs.onprogram = "Programme";
$L.create_blockly_program_change_message = "Nom du DGScript :";
$L.create_blockly_program_name = "Mon merveilleux DGScript";

// Dimanche 17 avril 2016
$L.blockly.turtle_category = "Tortue";
// $L.blockly.turtle = {};
$L.blockly.turtle.moveTooltip = "Déplace la tortue en avant ou en arrière de la quantité indiquée.";
$L.blockly.turtle.moveForward = "avancer de";
$L.blockly.turtle.moveBackward = "reculer de";
$L.blockly.turtle.turnTooltip = "Faire tourner la tortue à gauche ou à droite du nombre de degrés indiqué.";
$L.blockly.turtle.turnRight = "tourner à droite de";
$L.blockly.turtle.turnLeft = "tourner à gauche de";
$L.blockly.turtle.widthTooltip = "Modifier la grosseur du stylo.";
$L.blockly.turtle.setWidth = "mettre la grosseur du stylo à";
$L.blockly.turtle.colourTooltip = "Modifier la couleur du stylo.";
$L.blockly.turtle.setColour = "mettre la couleur à";
$L.blockly.turtle.penTooltip = "Lever ou poser le stylo pour arrêter ou commencer de dessiner.";
$L.blockly.turtle.penUp = "lever le stylo";
$L.blockly.turtle.penDown = "poser le stylo";
$L.blockly.turtle.turtleVisibilityTooltip = "Rend la tortue (cercle et flèche) visible ou non.";
$L.blockly.turtle.hideTurtle = "cacher la tortue";
$L.blockly.turtle.showTurtle = "afficher la tortue";
$L.blockly.turtle.printHelpUrl = "https=//en.wikipedia.org/wiki/Printing";
$L.blockly.turtle.printTooltip = "Dessine le texte dans la direction de la tortue à son emplacement.";
$L.blockly.turtle.print = "écrire";
$L.blockly.turtle.fontHelpUrl = "https=//en.wikipedia.org/wiki/Font";
$L.blockly.turtle.fontTooltip = "Définit la police utilisée par le bloc d’écriture.";
$L.blockly.turtle.font = "police";
$L.blockly.turtle.fontSize = "taille de la police";
$L.blockly.turtle.fontNormal = "normal";
$L.blockly.turtle.fontBold = "gras";
$L.blockly.turtle.fontItalic = "italique";
$L.blockly.turtle.unit_px = "pixels";
$L.blockly.turtle.unit_un = "unités";
$L.blockly.turtle.rotate_left = "pivoter vers la gauche de";
$L.blockly.turtle.rotate_right = "pivoter vers la droite de";
$L.blockly.turtle.rotate_top = "pivoter vers le haut de";
$L.blockly.turtle.rotate_bottom = "pivoter vers le bas de";
$L.blockly.turtle.increment_1 = "ajouter";
$L.blockly.turtle.increment_2 = "à la grosseur du stylo";
$L.blockly.turtle.rotate_pt = "pivoter vers le point";
$L.blockly.turtle.join_pt = "rejoindre le point";
$L.blockly.turtle.increment_col_1 = "ajouter";
$L.blockly.turtle.increment_col_2 = "à la couleur";
$L.blockly.turtle.fill = "remplir avec une opacité de";
$L.blockly.tabs.onlogo = "Tortue";

// Lundi 16 mai 2016
$L.blockly.turtle.setPointsWidth = "mettre la grosseur des points à";
$L.blockly.turtle.increment_points_2 = "à la grosseur des points";
$L.blockly.turtle.fixaspect_1 = "fixer l'aspect de";
$L.blockly.turtle.fixaspect_2 = "à";
$L.blockly.turtle.opacity = "opacité";
$L.blockly.turtle.hidden = "caché";
$L.blockly.turtle.size = "taille";
$L.blockly.turtle.layer = "calque";
$L.blockly.turtle.precision = "précision";
$L.blockly.turtle.increment = "incrément";
$L.blockly.turtle.dash = "pointillé";
$L.blockly.turtle.inanimate = "inerte";
$L.blockly.turtle.arrow = "flèches";
$L.blockly.turtle.windoww = "largeur de la fenêtre";
$L.blockly.turtle.windowh = "hauteur de la fenêtre";
$L.blockly.turtle.centerx = "abscisse du centre";
$L.blockly.turtle.centery = "ordonnée du centre";
$L.blockly.turtle.phiangle = "angle phi (3D)";
$L.blockly.turtle.thetaangle = "angle theta (3D)";
$L.blockly.turtle.distance = "distance";
$L.blockly.turtle.xcoord = "abscisse";
$L.blockly.turtle.ycoord = "ordonnée";
$L.blockly.turtle.zcoord = "hauteur";
$L.blockly.turtle.ofpoint = "du point";
$L.blockly.turtle.position = "position de la tortue";
$L.blockly.turtle.reset = "réinitialiser les angles";

// Mercredi 25 mai 2016
$L.blockly.turtle.getpos1 = "Point n°";
$L.blockly.turtle.getpos2 = "de la trace de";
$L.blockly.turtle.pixel = "unité en pixels";
$L.blockly.globales = "Globales";
$L.blockly.turtle.fontleft = "gauche";
$L.blockly.turtle.fontright = "droite";
$L.blockly.turtle.fontcenter = "centré";
$L.blockly.standardtext = "un texte";
$L.blockly.texts = "Textes";
$L.blockly.turtle.getlength = "longueur de la trace de";

// Mercredi 1 juin 2016
$L.blockly.globales_fix="fixer";
$L.blockly.globales_to="à";
$L.blockly.globales_increment="incrementer";
$L.blockly.globales_by="de";

// Vendredi 10 juin
$L.blockly.turtle.ofvector="du vecteur";

// Samedi 23 juillet
$L.blockly.turtle.angle180 = "angle 180";
$L.blockly.turtle.angle360 = "angle 360";
