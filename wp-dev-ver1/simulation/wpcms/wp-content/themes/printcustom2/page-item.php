<?php

  /*
   * ?type=OAR-8330&bcol=BK01&posA=V&fontA=109&colA=WHT&ecolA=PNK&markA=おもて&posB=G&fontB=109&colB=WHT&ecolB=PNK&markB=上段&markB2=下段
   * 
   */

  // $_GET
  $item = (isset($_GET['type']) && $_GET['type'])? esc_js($_GET['type']) : '';
  $bcol = (isset($_GET['bcol']) && $_GET['bcol'])? esc_js($_GET['bcol']) : '';
  $posA = (isset($_GET['posA']) && $_GET['posA'])? esc_js($_GET['posA']) : null;
  $fontA = (isset($_GET['fontA']) && $_GET['fontA'])? esc_js($_GET['fontA']) : '101';
  $colA = (isset($_GET['colA']) && $_GET['colA'])? esc_js($_GET['colA']) : 'WHT';
  $ecolA = (isset($_GET['ecolA']) && $_GET['ecolA'])? esc_js($_GET['ecolA']) : 'WHT';
  $markA = (isset($_GET['markA']) && $_GET['markA'])? $_GET['markA'] : null;
  $markA2 = (isset($_GET['markA2']) && $_GET['markA2'])? $_GET['markA2'] : null;
  $posB = (isset($_GET['posB']) && $_GET['posB'])? esc_js($_GET['posB']) : null;
  $fontB = (isset($_GET['fontB']) && $_GET['fontB'])? esc_js($_GET['fontB']) : '101';
  $colB = (isset($_GET['colB']) && $_GET['colB'])? esc_js($_GET['colB']) : 'WHT';
  $ecolB = (isset($_GET['ecolB']) && $_GET['ecolB'])? esc_js($_GET['ecolB']) : 'WHT';
  $markB = (isset($_GET['markB']) && $_GET['markB'])? $_GET['markB'] : null;
  $markB2 = (isset($_GET['markB2']) && $_GET['markB2'])? $_GET['markB2'] : null;
  $side = (isset($_GET['side']) && $_GET['side'] && $_GET['side'] == 'B')? 'back' : 'front';
  if(isset($_GET['referrer']) && $_GET['referrer'] == 'order'):
    $mark = mb_convert_encoding(urldecode($mark), "UTF-8", "SJIS-win");
  else:
    $mark = esc_js($mark);
  endif;
  $style = (isset($_GET['style']) && $_GET['style'])? esc_js($_GET['style']) : 0;
  
  // POST & JSON
  $item_post = get_page_by_path(mb_strtolower($item), "OBJECT", "post");
  $url = (isset($item_post->post_title))? get_bloginfo('url') . '/wp-json/wp/v2/posts/?slug=' . $item_post->post_title : '';
  if(empty($url) || !$url):
    return;
    throw new Exception($error = "Internal error");
  endif;
  try{
    $basic_auth = array('user' => 'ccv', 'pass' => 'shunlock');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERPWD, $basic_auth['user'] . ":" . $basic_auth['pass']);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $result = curl_exec($ch);
    $curlErrno = curl_errno($ch);
    if($curlErrno):
      throw new Exception($curlError = curl_error($ch));
    endif;
    curl_close($ch);
  } catch(Exception $e){
    echo "Exception-".$e->getMessage();
  }
  $json = json_decode($result, true);
  $code = ($bcol && isset($json[0]['meta']['codes'][$bcol]))? $json[0]['meta']['codes'][$bcol] : '';
  $gradation = get_field('gradation', $json[0]['id']);
  
  // Get SVG
  $basic_auth = array('user' => 'ccv', 'pass' => 'shunlock');
  //$url = ($pos == 'K')? $json[0]['meta']['svg']['back'] : $json[0]['meta']['svg']['front'];
  $url = $json[0]['meta']['svg'][$side];

  //var_dump($url);
  
  /*
    $file = 'http://www.domain.com/somefile.jpg';
    $file_headers = @get_headers($file);
    if($file_headers[0] == 'HTTP/1.1 404 Not Found') {
        $exists = false;
    }
    else {
        $exists = true;
    }
  */
  
  if(empty($url) || !$url){
    throw new Exception($error = "Internal error");
  }
  try{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $basic_auth['user'] . ":" . $basic_auth['pass']);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $result = curl_exec($ch);
    curl_close($ch);
    $svg = $result;
  } catch(Exception $e){
    echo "Exception-" . $e->getMessage();
  }
  
  
?><!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 user-scalable=no">
<meta name="referrer" content="unsafe-url">
<meta name="theme-color" content="#000">
<meta name="description" content="<?php echo (is_single() && get_post_type() == 'post')? $post->post_content : get_bloginfo('description') ?>">
<meta name="keywords" content="<?php echo (is_single() && get_post_type() == 'post')? wp_strip_all_tags(get_the_term_list($post->ID, 'material', null, ',', '')) : ''; ?>">
<meta property="og:title" content="<?php wp_title( '|', true, 'right' ); ?><?php bloginfo('name'); ?>（<?php bloginfo('description'); ?>）">
<meta property="og:type" content="website">
<meta property="og:url" content="<?php bloginfo('url'); ?>">
<meta property="og:image" content="<?php echo (is_single() && get_post_type() == 'post' && has_post_thumbnail($post->ID))? wp_get_attachment_url(get_post_thumbnail_id($post->ID)) : bloginfo('url') . '/assets/img/ogp/og_image.png'; ?>">
<meta property="og:site_name" content="<?php bloginfo('name'); ?>">
<meta property="og:description" content="<?php bloginfo('description'); ?>" />

<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
  
<link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<?php //wp_head(); ?>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script><script>window.html5 || document.write('<script src="/assets/vendor/html5shiv/3.7.3/html5shiv.min.js"><\/script>')</script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><script>window.respond || document.write('<script src="/assets/vendor/respond/1.4.2/respond.min.js"><\/script>')</script><![endif]-->

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" type="text/css" media="screen" />
<style type="text/css">  
<!--
  html, body {
    height: 100%;
    background: transparent;
  }
<?php 
  $alphabet = str_split('abcdefghijklmnopqrstuvwxhz');
  foreach((array)$code as $key => $value): 
    if($gradation && $alphabet[$key] == 'a'):
?>
  svg #<?php echo $alphabet[$key]; ?>-color #colourg<?php echo $value['hex']; ?> {
    opacity: 1 !important;
  }
<?php else: ?>
  svg #<?php echo $alphabet[$key]; ?>-color path,
  svg #<?php echo $alphabet[$key]; ?>-color polygon {
    fill: <?php echo $value['hex']; ?> !important;
  }
<?php
    endif;
  endforeach; 
?>
<?php
  if($posA && $colA & $markA):
?>
  #mark-<?php echo mb_strtolower($posA); ?> {
    opacity: 1 !important;
  }
<?php
  endif;
?>
<?php
  if($posB && $colB & $markB):
?>
  #mark-<?php echo mb_strtolower($posB); ?> {
    opacity: 1 !important;
  }
<?php
  endif;
?>
-->
  svg { 
    height: 100%; 
    width: 100%;
  }
</style>
</head>
<body id="pagetop" <?php body_class(); ?>>
<!--
<?php //var_dump($bcol, $code); ?>
-->
<?php echo $svg; ?>

<?php /*
<canvas id="style" width="500" height="500"></canvas>
<script>
var img = new Image();
img.src = '<?php echo $url; ?>';
img.onload = function() {
    var c = document.getElementById('style');
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, 75, 125);
}
</script>
*/ ?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script>
<?php
  $pos1 = '';
  if($side == 'front'): 
    $pos1 = $posA;
    //$server = 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos1 . '&font=' . $fontA . '&col=' . $colA . '&ecol=' . $ecolA . '&mark=' . urlencode(mb_convert_encoding($markA , 'sjis-win', 'UTF-8'));
    $server = 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos1 . '&font=' . $fontA . '&col=' . $colA . '&ecol=' . $ecolA . '&mark=' . urlencode( $markA );
  else:
    $pos1 = 'G';
    // $server = 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos1 . '&font=' . $fontB . '&col=' . $colB . '&ecol=' . $ecolB . '&mark=' . urlencode(mb_convert_encoding($markB , 'sjis-win', 'UTF-8'));
    $server = 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos1 . '&font=' . $fontB . '&col=' . $colB . '&ecol=' . $ecolB . '&mark=' . urlencode( $markB );
    $pos2 = ( $posB == 'W' )? 'W' : '';
    if( $pos2 ):
      // $server2 = ( !$markB2 )? '' : 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos2 . '&font=' . $fontB . '&col=' . $colB . '&ecol=' . $ecolB . '&mark=' . urlencode(mb_convert_encoding($markB2 , 'sjis-win', 'UTF-8'));
      $server2 = ( !$markB2 )? '' : 'https://mark.arena-jp.com/simulation/servlet/MarkSample3?bcol=' . $bcol . '&pos=' . $pos2 . '&font=' . $fontB . '&col=' . $colB . '&ecol=' . $ecolB . '&mark=' . urlencode( $markB2 );
    endif;
  endif;
?>
$(document).ready(function(){
  $('#mark-<?php echo mb_strtolower($pos1); ?>').css('opacity', 1);
  $('#mark-<?php echo mb_strtolower($pos1); ?> image').attr('xlink:href', '<?php echo $server; ?>');
  console.log('<?php echo $server; ?>');
  <?php if( $pos2 ): ?>
  $('#mark-<?php echo mb_strtolower($pos2); ?>').css('opacity', 1);
  $('#mark-<?php echo mb_strtolower($pos2); ?> image').attr('xlink:href', '<?php echo $server2; ?>');
  <?php endif; ?>
});
</script>
</body>
</html>