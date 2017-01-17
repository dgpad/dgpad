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

        $u=$_GET["url"];
        if (!$u) $u=$_POST["url"];
        $u2=$_GET["url2"];
        if (!$u2) $u2=$_POST["url2"];
        $t=$_GET["hide_ctrlpanel"];
        if (!$t) $t=$_POST["hide_ctrlpanel"];
        $l=$_GET["lang"];
        if (!$l) $l=$_POST["lang"];
        $p=$_GET["presentation"];
        if (!$p) $p=$_POST["presentation"];
        $tls=$_GET["show_tools"];
        if (!$tls) $tls=$_POST["show_tools"];
        $ga=$_GET["googleApps"];
        if (!$ga) $ga=$_POST["googleApps"];
        $gid=$_GET["googleId"];
        if (!$gid) $gid=$_POST["googleId"];
        $f=$_POST["file_content"];

        if (($u)&&(strpos($u, 'google.com') !== false)) {       
            $pattern="/([-\w]{25,})/";
            preg_match($pattern, $u, $res);
            if ((is_array($res)) && (count($res) == 1)) {
                $args="id=".$res[0];
                if ($t) $args=$args."&hide_ctrlpanel=".$t;
                if ($l) $args=$args."&lang=".$l;
                if ($p) $args=$args."&presentation=".$p;
                if ($tls) $args=$args."&show_tools=".$tls;
                echo "<script>location.replace('https://script.google.com/macros/s/AKfycbyEZOu-YDVlJWrrMBdDXdWzMF1HI2ONmxKTmtgYF-cFdUXyq44/exec?".$args."')</script>";
            }
        };

        echo "<script src=\"scripts/DGPad.js\" ";
            // data-url est utilisé pour les adresses relatives, et pour certains
            // sites acceptant le cross-domain-origin :
        if ($u2) echo " data-url=\"$u2\"";
        if ($u) echo " data-source=\"".base64_encode(file_get_contents("$u"))."\"";
        if ($f) echo " data-source=\"$f\"";
        if ($t) echo " data-hidectrlpanel=\"$t\"";
        if ($l) echo " data-lang=\"$l\"";
        if ($p) echo " data-presentation=\"$p\"";
        if ($tls) echo " data-tools=\"$tls\"";
        if ($ga) echo " data-googleapps=\"$ga\"";
        if ($gid) echo " data-googleid=\"$gid\"";
        echo "></script>";
		
		
		
		?>
		
    </body> 
</html>
