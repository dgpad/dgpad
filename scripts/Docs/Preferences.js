$P = {};

$P.background = {};
$P.background.color = "#F8F8F8";
//$P.background.color = "hsl(0,0%,90%)";
//$P.background.image = $APP_PATH+"NotPacked/images/controls/noise.png";
//$P.background.gradient = "-linear-gradient(hsla(0,0%,100%,.7), hsla(0,0%,100%,.4))";
//$P.background.repeat = "repeat";
//$P.background.position = "0px 0px";

$P.color = {};
$P.color.hilite = "#ffbb00"; // Attention : minuscules importantes...
$P.color.selected = "#FF0000";
$P.color.point = "rgb(0,0,178)";
$P.color.list = "rgb(0,0,178)";
$P.color.segment = "#006633";
$P.color.vector = "#006633";
$P.color.line = "#780013";
$P.color.circle = "#CC66CC";
$P.color.area = "#006633";
$P.color.ray = "#993300";
$P.color.angle = "#006633";
$P.color.fixedangle = "#006633";
$P.color.quadric = "#00ADFF";
$P.color.point_free = "rgba(255,255,255,1)";
$P.color.point_on = "rgba(255,255,255,1)";
$P.color.point_inter = "#ccc";
$P.color.point_fixed = "#ccc";

$P.opacity = {};
$P.opacity.point = 0;
$P.opacity.area = 0.2;
$P.opacity.vector = 0.2;

$P.grid = {};
$P.grid.limitinf = 15;
$P.grid.font = "Verdana";
$P.grid.fontsize = 18;
$P.grid.smalltick = 5;
$P.grid.longtick = 10;
$P.grid.grid_color = "#111111"; // en hexa forcément
$P.grid.grid_linewidth = 0.1;
$P.grid.tick_linewidth = 1;
$P.grid.axis_linewidth = 1;

$P.size = {};
$P.size.marginwidth = 0;
$P.size.marginheight = 0;
$P.size.touchfactor = 1 * $SCALE;
$P.size.point = 6 * $SCALE;
$P.size.list = 1 * $SCALE;
$P.size.pointborder = 2 * $SCALE;
$P.size.line = 1 * $SCALE;
$P.size.angle = 4 * $SCALE;
$P.size.fixedangle = 1 * $SCALE;
$P.size.expression = 7 * $SCALE;
$P.size.expression_cursor = 10 * $SCALE;
$P.size.dash = [6, 10];
$P.size.partiallines = 100;
$P.size.vectorhead = 20;


$P.sizefactor = {};
$P.sizefactor.expression = 1 * $SCALE;
$P.sizefactor.expression_cursor = 1 * $SCALE;

$P.oversizefactor = {};
$P.oversizefactor.expression = 1 * $SCALE;
$P.oversizefactor.expression_cursor = 1 * $SCALE;

$P.fontsize = {};
$P.fontsize.point = 30 * $SCALE;
$P.fontsize.segment = 24 * $SCALE;
$P.fontsize.angle = 24 * $SCALE;
$P.fontsize.fixedangle = 24 * $SCALE;
$P.fontsize.expression = 24 * $SCALE;

$P.font = "Verdana";
$P.fontmargin = 5;

$P.precision = {};
$P.precision.timeout = 2000;
$P.precision.edit_timeout = 5000;
$P.precision.caress = 5;
// -1 pour ne pas afficher la longueur :
$P.precision.point = -1;
$P.precision.segment = -1;
$P.precision.vector = -1;
$P.precision.area = -1;
$P.precision.angle = 1;
$P.precision.fixedangle = 1;
$P.precision.expression = 2;


$P.precision.over = {};
$P.precision.over.touchfactor = 4;
$P.precision.over.point = 10;
$P.precision.over.list = 10;
$P.precision.over.line = 6;
$P.precision.over.expression_cursor = 16;


$P.magnifyfactor = {};
$P.magnifyfactor.point = 2;
$P.magnifyfactor.line = 2;
$P.magnifyfactor.expression_cursor = 1;
$P.magnifyfactor.expression = 1;
$P.magnifyfactor.list = 1;

$P.selectedfactor = {};
$P.selectedfactor.point = 2;
$P.selectedfactor.line = 2;
$P.selectedfactor.expression_cursor = 1;
$P.selectedfactor.expression = 1;
$P.selectedfactor.list = 1;

$P.tool = {};
$P.tool.size = 50 * $SCALE;
$P.tool.touchfactor = 1.2;
$P.tool.gap = 5 * $SCALE;
$P.tool.marginV = 30 * $SCALE;

$P.controlpanel = {};
$P.controlpanel.size = 42 * $SCALE;
$P.controlpanel.color = "hsl(0,0%,90%)";
//$P.controlpanel.color="#D1D6DA";

$P.localstorage = {};
$P.localstorage.base = "DGPad_";
$P.localstorage.max = 20;
$P.localstorage.iconwidth = 300;
$P.localstorage.iconmargin = 20;

$P.MobileScale = 0.7;
$P.MacroPanelWidth = 200;
$P.CalcPanelHeight = 72;

$P.MagnifierBounds = {};
$P.MagnifierBounds.l = 10;
$P.MagnifierBounds.t = 10;
$P.MagnifierBounds.w = 75;
$P.MagnifierBounds.captureWidth = 75;

$P.clone = function() {
    return JSON.parse(JSON.stringify($P));
};
