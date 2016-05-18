<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="icon" type="image/png" href="favicon.png" />
		<link rel="apple-touch-icon" href="scripts/NotPacked/images/icon.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta   id="wholeViewport" name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1 ,user-scalable=no">
		<script>
            var $MOBILE_PHONE;
            if (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
                if (((screen.width >= 480) && (screen.height >= 800)) || ((screen.width >= 800) && (screen.height >= 480)) || navigator.userAgent.match(/ipad/gi)) {
                    $MOBILE_PHONE = false;//tablette
                } else {
                    $MOBILE_PHONE = true;//mobile
                }
            } else {
                $MOBILE_PHONE = false;//Desktop
            }
              if ($MOBILE_PHONE) {
                document.getElementById('wholeViewport').setAttribute("content", "width=device-width, maximum-scale=0.7, initial-scale=0.7 ,user-scalable=no");
            }
        </script>
    </head>
    <body style="-ms-touch-action: none;" oncontextmenu="return false;">

		<?php 
		// mb_internal_encoding("UTF-8");
		// function file_get_contents_utf8($fn) {
     	// 	$content = file_get_contents($fn);
      	// 	return mb_convert_encoding($content, 'UTF-8',
      	// 	mb_detect_encoding($content, 'UTF-8', true));
		// }
		
		
		echo "<script src=\"scripts/DGPad.js\" ";
		$u=$_GET["url"];
		if (!$u) $u=$_POST["url"];
		$f=$_POST["file_content"];
		$t=$_GET["hide_ctrlpanel"];
		if (!$t) $t=$_POST["hide_ctrlpanel"];
		$l=$_GET["lang"];
		$p=$_GET["presentation"];
		if ($u) echo "data-source=\"".base64_encode(file_get_contents("$u"))."\";";
		if ($f) echo "data-source=\"$f\";";
		if ($t) echo " data-hidectrlpanel=\"$t\";";
		if ($l) echo " data-lang=\"$l\";";
		if ($p) echo " data-presentation=\"$p\";";
		echo "></script>";
		?>
		
    </body> 
</html>
