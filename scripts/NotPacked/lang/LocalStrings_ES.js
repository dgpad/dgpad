$L.number = function(_n) {
    return _n.toString().replace(".", ",")
};
$L.dot = ",";
$L.comma = ";";
$L.object.point = "Punto";
$L.object.line = "Recta ";
$L.object.circle = "Círculo ";
$L.object.segment = "Segmento";
$L.object.area = "Polígono ";
$L.object.anglebiss = "Bisectriz";
$L.object.circle3pts = "Circuncírculo";
$L.object.locus = "Lugar";
$L.object.midpoint = "Punto medio";
$L.object.parallel = "Recta paralela";
$L.object.perpbis = "Mediatriz";
$L.object.plumb = "Recta perpendicular";
$L.object.ray = "Semirrecta";
$L.object.syma = "Simetría axial";
$L.object.symc = "Simetría central";
$L.object.family.line = "Líneas";
$L.object.family.circle = "Círculos";
$L.object.family.point = "Puntos";
$L.object.family.locus = "Lugares";
$L.object.family.area = "Polígonos";
$L.object.family.angle = "Ángulos";
$L.macro_plugins = "Biblioteca";
$L.macro_tools = "Macros Personales";
$L.macroname = "Macro sin título";
$L.props_grid_message = "Haga clic sobre un objeto o un eje para modificar sus propiedades";
$L.props_grid_title = "Propiedades cuadrícula";
$L.props_grid_show = "Mostrar cuadrícula";
$L.props_axis_size = "Tamaño ejes";
$L.props_grid_size = "Tamaño cuadrícula";
$L.props_ox_show = "Mostrar el eje  (Ox)";
$L.props_oy_show = "Mostrar el eje (Oy)";
$L.props_ox_lock = "Bloquear el eje  (Ox)";
$L.props_oy_lock = "Bloquear el eje  (Oy)";
$L.props_showname = "Mostrar";
$L.props_opacity = "Transparencia";
$L.props_size = "Tamaño";
$L.props_layer = "Capa";
$L.props_font = "Fuente";
$L.props_length = "Medida";
$L.props_inc = "Incremento";
$L.props_dash = "Punteado";
$L.props_inc_free = "Libre";
$L.props_length_none = "Sin";
$L.props_applyall = "Aplicar a todos: ";
$L.export_button = "Abrir la figura DGPad";
$L.export_standardcomment = "Haga clic en los botones para ver el código que debe copiar/pegar.";
$L.export_htmljscomment = "Pegue este código en su sitio: la figura debería aparecer inmediatamente (En caso contrario utilizar el siguiente botón!).";
$L.export_htmlcomment = 'Algunos servidores podrían impedir que la figura se abra automáticamente. Este código sólo contiene  HTML, Y la figura sólo se abrirá cuando el usuario haga clic sobre un botón.';
$L.export_sourcecomment = 'Código fuente de la figura  (Como estaba registrada en la nube).';
$L.export_htmlstandalonecomment = 'Página HTML Que contiene la figura.';
$L.export_istools = 'Ocultar el tablero de comandos';
$L.separator_coords = ";";
$L.history_open = "Abrir";
$L.history_full = "Este item no puede bloquearse porque todos los demás ya están bloqueados (el 'localstorage' está lleno).";
$L.history_title = "Histórico de las construcciones";
$L.clear_all = "Borrar toda la construcción";

// Mercredi 13 mars :

$L.macros.inscribedcircle = "Incírculo";
$L.macros.tangent = "Tangente";
$L.macros.isosceles_triangle = "Triángulo Isósceles";
$L.macros.right_triangle = "Triángulo Rectángulo";
$L.macros.equilateral_triangle = "Triángulo Equilátero";


// Samedi 27 avril :
$L.props_grid_general = "Propiedades globales";
$L.props_grid_general_demo = "Modo presentación";


// Samedi 11 mai :
$L.coincidence_message = "Ambigüedad";
$L.coincidence_select = "qué objeto quiere seleccionar dentro de los $1 siguientes?";
$L.object.arc3pts = "Arco por 3 puntos";

// Jeudi 16 mai :
$L.erase_ckb_show_hidden = "Mostrar los objetos ocultos";

// Samedi 25 mai :
$L.props_track = "Activar la traza";

// Mercredi 28 août 2013 :
$L.calc_value = "Valor=";
$L.calc_text = "Texto:";

// Dimanche 8 septembre 2013 :
$L.object.expression = "Expresión";
$L.object.family.expression = "Expresiones";


// Dimanche 6 octobre 2013 :
$L.props_center_zoom = "Zoom en el origen";

// Lundi 7 octobre 2013 :
$L.magnet_without = "Sin";
$L.magnet_max = "Punto sobre";

// Jeudi 10 octobre 2013 :
$L.Locus_density = "Densidad";
$L.Locus_density_min = "min";
$L.Locus_density_max = "max";
$L.object.quadric = "Cónica";
$L.object.family.quadric = "Cónicas";

// Mercredi 23 octobre :
$L.macros.inscribedcircle = "Círculos/Incírculo";
$L.macros.tangent = "Círculos/Tangentes";
$L.macros.isosceles_triangle = "Polígonos/Triángulos/Triángulo isósceles";
$L.macros.right_triangle = "Polígonos/Triángulos/Triángulo rectángulo";
$L.macros.equilateral_triangle = "Polígonos/Triángulos/Triángulo equilátero";
$L.macros.translation = "Transformaciones/Traslación";
$L.macros.inversion = "Transformaciones/Inversión";
$L.macros.pt3Dwithdialog = "3D/Puntos 3D/con diálogo";
$L.macros.pt3Dwithoutdialog = "3D/Puntos 3D/sin diálogo";
$L.macros.repere = "3D/sistema 3D";
$L.macros.pingpong = "Utilidades/Ping-pong";
$L.macros.edge = "3D/Arista 3D";
$L.macros.restrictTheta = "3D/Restricción de Theta";
$L.macros.dilation = "Transformaciones/Homotecia/Sin diálogo";
$L.macros.dilationdlog = "Transformaciones/Homotecia/con diálogo";
$L.macros.solid_cube = "3D/Sólidos/Cubo";
$L.macros.rectangle = "Polígonos/Cuadriláteros/Rectángulo";
$L.macros.carre = "Polígonos/Cuadriláteros/Cuadrado";
$L.macros.conic5pts = "Cónicas/Cónica por 5 pts";
$L.macros.testalign = "Tests/Alineación";
$L.macros.displayground = "3D/Mostrar el piso";
$L.macros.displayground_m = "Mostrar el piso";
$L.macros.coords3D = "3D/Geometría/Coordenadas 3D";
$L.macros.perp3D = "3D/Geometría/Perpendicular";
$L.macros.norm3D = "3D/Geometría/Normal";
$L.macros.dist3D = "3D/Geometría/Distancia 3D";
$L.macros.circle3D = "3D/Geometría/Círculo por eje y punto";



// Mercredi 13 novembre 2013 :
$L.macros.coniccenter = "Cónicas/Centro";
$L.macros.conicfoci = "Cónicas/Focos";

// Dimanche 1 décembre 2014
$L.macros.circle3D3pts = "3D/Geometría/Círculo por 3 pts";

// Vendredi 6 décembre 2014
$L.object.circle3pts3D = "Círculo 3D";
$L.object.family.circle3pts3D = "Círculo 3D";

// Lundi 28 avril 2014
$L.export_svgimage = "Código fuente SVG de la imagen correspondiente a la figura.";
$L.export_svgimage2 = "Clic derecho sobre el enlace para descargar la imagen.";

// Mardi 8 juillet 2014
$L.props_general_magnifier = "Mostrar la lupa";

// Vendredi 18 juillet 2014
$L.object.family.list = "Listas";
$L.props_segment_size = "Segmentos";

// Vendredi 25 juillet 2014
$L.props_nomouse = "Objeto inerte";

// Vendredi 29 août 2014
$L.export_source_download = "Clic derecho sobre el enlace para descargar el archivo.";

// Lundi 22 décembre 2014
$L.props_text_message = "Clic sobre un widget para modificar sus propiedades.";
$L.props_text_add = "Nuevo widget";
$L.props_text_opacity = "Opacidad";
$L.props_text_size = "Tamaño";
$L.props_text_radius = "Radio";
$L.props_text_example = "";

// Mercredi 24 décembre 2014
$L.props_text_precision = "Precisión";

// Dimanche 28 décembre 2014
$L.props_text_js = "Lanzar el script";

// Lundi 29 décembre 2014
$L.props_text_console = "Consola de scripts";

// Dimanche 28 juin 2015
$L.export_ibook = "Widget par publicar la figura en un iBook Author:";
$L.export_ibook2 = "Clic derecho sobre el enlace para descargar el widget en formato zip.";

// Dimanche 18 octobre 2015
$L.history_save = "Guardar la figura actual en el histórico";

// Samedi 5 décembre 2015
$L.macros.rotation5 = "Transformaciones/Rotación/5 pts";
$L.macros.rotationD = "Transformaciones/Rotación/Con diálogo";

// Mercredi 9 décembre 2015
$L.props_general_degree = "ángulo en grados";

// Mercredi 16 décembre 2015
$L.props_trigo = "Sentido trigonométrico";

// Lundi 21 décembre 2015
$L.blockly.geometry = "Geometría";
$L.blockly.logic = "Lógica";
$L.blockly.loops = "Bucles";
$L.blockly.expression = "Expresiones";
$L.blockly.math = "Math";
$L.blockly.lists = "Listas";
$L.blockly.variables = "Variables";
$L.blockly.functions = "Funciones";
$L.blockly.construction = "Construcción";
$L.blockly.cn_auto = "auto";
$L.blockly.pt_type = "Punto";
$L.blockly.pt_base = "de base";
$L.blockly.pt_on = "punto sobre";
$L.blockly.pt_inter = "de intersección de";
$L.blockly.pt_coords = "de coordenadas";
$L.blockly.pt_exp = "de expresión";
$L.blockly.pt_andof = "y de";
$L.blockly.pt_and = "y";

// Lundi 11 janvier 2016
$L.animation_without = "Sin";
$L.animation_label = "Animación";

// Dimanche 24 janvier 2016
$L.props_general_dragall = "Arrastrar todos los objetos";

// Lundi 22 février 2016
$L.blockly.var_return = "Retorno";
$L.blockly.push_add = "Añadir";
$L.blockly.push_end = "al final de la lista";
$L.blockly.list_new = "Crar una lista vacía";

// Mardi 23 février 2016
$L.blockly.value = "Valor";
// $L.blockly.o = {};
$L.blockly.o.expression = "de la expresión";
$L.blockly.o.point = "del punto";
$L.blockly.o.circle1 = "del círculo";
$L.blockly.o.segment = "del segmento";
$L.blockly.o.fixedangle = "del ángulo fijo";
$L.blockly.o.angle = "del ángulo";
$L.blockly.o.area = "del polígono";
// $L.blockly.o2 = {};
$L.blockly.o2.expression = "la expresión";
$L.blockly.o2.list = "la lista";
$L.blockly.o2.point = "el punto";
$L.blockly.o2.circle1 = "el círculo";
$L.blockly.o2.segment = "el segmento";
$L.blockly.o2.fixedangle = "el ángulo fijo";
$L.blockly.o2.angle = "el ángulo";
$L.blockly.o2.area = "el polígono";
$L.blockly.stop_list = "Romper la lista";
$L.longpress_message = "¿Qué quiere hacer?";
$L.create_exp = "Crear una expresión";
$L.create_exp_pts = "Crear una lista de puntos";
$L.create_exp_segs = "Crear una lista de segmentos";
$L.create_cursor_int = "Crear un cursor entero";
$L.create_cursor_cont = "Crear un cursor continuo";
$L.create_widget_edit = "Crear el widget de edición";
$L.edit_widget_name = "Nombre del objeto por editar";
$L.edit_widget_edit = "Editar el objeto";
$L.blockly.fixvalue = "Fijar";
$L.blockly.copyall = "Copiar todos los bloques";
$L.blockly.copyselected = "Copiar los bloques seleccionados";
$L.blockly.paste = "Pegar los bloques";
$L.blockly.displaySource = "Mostrar el código fuente";
$L.blockly.print = "Mostrar";
$L.blockly.withlf = "con fin de línea";
$L.blockly.withoutlf = "sin fin de línea";
$L.blockly.lang = "es.js";


// Mercredi 30 mars 2016
// $L.blockly.tabs = {};
$L.blockly.tabs.oncompute = "Expresión";
$L.blockly.tabs.onmousedown = "al tocar";
$L.blockly.tabs.ondrag = "al arrastrar";
$L.blockly.tabs.onmouseup = "al soltar";
$L.blockly.tabs.onchange = "al cambiar";
$L.blockly.aspect = "Aspecto";
$L.expression_item = "elementos";
$L.blockly.do = "hacer";
$L.blockly.while = "mientras";
$L.blockly.until = "hasta que";
$L.blockly.prompt_ok = "Ok";
$L.blockly.prompt_cancel = "Anular";

// Mardi 12 avril 2016
$L.create_blockly_button = "Crear un DGScript";
$L.blockly.tabs.onprogram = "Programa";
$L.create_blockly_program_change_message = "Nombre del DGScript :";
$L.create_blockly_program_name = "Mi maravilloso DGScript";

// Dimanche 17 avril 2016
$L.blockly.turtle_category = "Tortuga";
// $L.blockly.turtle = {};
$L.blockly.turtle.moveTooltip = "Mueve la tortuga hacia adelante o hacia atrás en la cantidad especificada.";
$L.blockly.turtle.moveForward = "avanzar";
$L.blockly.turtle.moveBackward = "retroceder";
$L.blockly.turtle.turnTooltip = "Gira la tortuga hacia la izquierda o la derecha el número especificado de grados.";
$L.blockly.turtle.turnRight = "girar a la derecha";
$L.blockly.turtle.turnLeft = "girar a la izquierda";
$L.blockly.turtle.widthTooltip = "Cambia el ancho del bolígrafo.";
$L.blockly.turtle.setWidth = "establecer el ancho a";
$L.blockly.turtle.colourTooltip = "Cambia el color del bolígrafo.";
$L.blockly.turtle.setColour = "establecer el color a";
$L.blockly.turtle.penTooltip = "Levanta o baja el bolígrafo para detener o empezar a dibujar.";
$L.blockly.turtle.penUp = "levantar el bolígrafo";
$L.blockly.turtle.penDown = "bajar el bolígrafo";
$L.blockly.turtle.turtleVisibilityTooltip = "Hace a la tortuga (círculo y flecha) visible o invisible.";
$L.blockly.turtle.hideTurtle = "ocultar la tortuga";
$L.blockly.turtle.showTurtle = "mostrar la tortuga";
$L.blockly.turtle.printHelpUrl = "https=//es.wikipedia.org/wiki/Impresi%C3%B3n";
$L.blockly.turtle.printTooltip = "Dibuja texto en la dirección de la tortuga en su ubicación.";
$L.blockly.turtle.print = "imprimir";
$L.blockly.turtle.fontHelpUrl = "https=//es.wikipedia.org/wiki/Tipo_de_letra";
$L.blockly.turtle.fontTooltip = "Establece el tipo de letra utilizado por el bloque de impresión.";
$L.blockly.turtle.font = "tipo de letra";
$L.blockly.turtle.fontSize = "tamaño de letra";
$L.blockly.turtle.fontNormal = "normal";
$L.blockly.turtle.fontBold = "negrita";
$L.blockly.turtle.fontItalic = "cursiva";
$L.blockly.turtle.unit_px = "pixeles";
$L.blockly.turtle.unit_un = "unidades";
$L.blockly.turtle.rotate_left = "girar hacia la izquierda";
$L.blockly.turtle.rotate_right = "girar hacia la derecha";
$L.blockly.turtle.rotate_top = "girar hacia arriba";
$L.blockly.turtle.rotate_bottom = "girar hacia abajo";
$L.blockly.turtle.increment_1 = "añadir";
$L.blockly.turtle.increment_2 = "al grosor de línea";
$L.blockly.turtle.rotate_pt = "girar hacia el punto";
$L.blockly.turtle.join_pt = "il al punto";
$L.blockly.turtle.increment_col_1 = "añadir";
$L.blockly.turtle.increment_col_2 = "al color";
$L.blockly.turtle.fill = "llenar con una opacidad";
$L.blockly.tabs.onlogo = "Tortuga";

// Lundi 16 mai 2016
$L.blockly.turtle.setPointsWidth = "definir el grosor de los puntos como";
$L.blockly.turtle.increment_points_2 = "el grosor de los puntos";
$L.blockly.turtle.fixaspect_1 = "fijar el aspecto de";
$L.blockly.turtle.fixaspect_2 = "como";
$L.blockly.turtle.opacity = "opacidad";
$L.blockly.turtle.hidden = "oculto";
$L.blockly.turtle.size = "tamaño";
$L.blockly.turtle.layer = "capa";
$L.blockly.turtle.precision = "precisión";
$L.blockly.turtle.increment = "incremento";
$L.blockly.turtle.dash = "punteado";
$L.blockly.turtle.inanimate = "inerte";
$L.blockly.turtle.arrow = "flechas";
$L.blockly.turtle.windoww = "ancho de ventana";
$L.blockly.turtle.windowh = "alto de ventana";
$L.blockly.turtle.centerx = "abscisa del centro";
$L.blockly.turtle.centery = "ordenada del centro";
$L.blockly.turtle.phiangle = "ángulo phi (3D)";
$L.blockly.turtle.thetaangle = "ángulo theta (3D)";
$L.blockly.turtle.distance = "distancia";
$L.blockly.turtle.xcoord = "abscisa";
$L.blockly.turtle.ycoord = "ordenada";
$L.blockly.turtle.zcoord = "altura";
$L.blockly.turtle.ofpoint = "del punto";
$L.blockly.turtle.position = "posición de la tortuga";
$L.blockly.turtle.reset = "reinicializar los ángulos";

// Mercredi 25 mai 2016
$L.blockly.turtle.getpos1 = "Punto n°";
$L.blockly.turtle.getpos2 = "de la trayectoria de";
$L.blockly.turtle.pixel = "unidad en pixeles";
$L.blockly.globales = "Globales";
$L.blockly.turtle.fontleft = "izquierda";
$L.blockly.turtle.fontright = "derecha";
$L.blockly.turtle.fontcenter = "centrado";
$L.blockly.standardtext = "un texto";
$L.blockly.texts = "Textos";
$L.blockly.turtle.getlength = "longitud de la trayectoria de";


// Mercredi 1 juin 2016
$L.blockly.globales_fix = "establecer";
$L.blockly.globales_to = "a";
$L.blockly.globales_increment = "cambiar";
$L.blockly.globales_by = "por";


