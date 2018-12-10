<?php
  
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
    $markA = urldecode($markA);
    $markA2 = urldecode($markA2);
    $markB = urldecode($markB);
    $markB2 = urldecode($markB2);
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

  set_query_var('mark', array(
    'positions' => get_the_terms($item_post->ID, 'mark-position'),
    'direction' => get_the_terms($item_post->ID, 'mark-direction'),
    'fonts' => get_the_terms($item_post->ID, 'mark-font'),
    'colors' => get_the_terms($item_post->ID, 'mark-color'),
    'ecolors' => get_the_terms($item_post->ID, 'mark-ecolor')
  ));

  
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
  
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous" media='all'>
<link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' crossorigin="anonymous" media='all'>
<link rel='stylesheet' href='//cdn.jsdelivr.net/genericons/3.4.1/genericons/genericons.css' media='all'>

<?php //wp_head(); ?>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script><script>window.html5 || document.write('<script src="/assets/vendor/html5shiv/3.7.3/html5shiv.min.js"><\/script>')</script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><script>window.respond || document.write('<script src="/assets/vendor/respond/1.4.2/respond.min.js"><\/script>')</script><![endif]-->

<style type="text/css">  
  html, body {
    height: 100%;
    background: transparent;
  }
</style>
</head>
<body id="pagetop" <?php body_class(); ?>>
  
<header>
  <section class="container-fluid">
    <?php //var_dump($json); ?>
  </section>
</header>

<div class="">
  <section class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <p>&nbsp;</p>
        <div class="panel panel-info">
          <div class="panel-heading"><h2 class="panel-title">カラー</h2></div>
          <table class="table">
            <tbody>
            <?php if($gradation): ?>
              <tr>
                <th>A色：</th>
                <td>
                  <div class="media">
                    <div class="media-left media-middle">
                      <img src="/simulation/assets/images/chip/gradation_<?php echo ($code[0]['hex'])? $code[0]['hex'] : '0'; ?>.png" class="media-object" style="width: 32px; height: 32px;">
                    </div>
                    <div class="media-body"><h4 class="media-heading"><?php echo ($code[0]['label'])? $code[0]['label'] : ''; ?></h4></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>B色：</th>
                <td>
                  <span class="label label-default" style="background: <?php echo ($code[1]['hex'])? $code[1]['hex'] : ''; ?>">&nbsp;</span>　
                  <?php echo ($code[1]['label'])? $code[1]['label'] : ''; ?>
                </td>
              </tr>
            <?php else: ?>
              <tr>
                <th>A色：</th>
                <td>
                  <span class="label label-default" style="background: <?php echo ($code[0]['hex'])? $code[0]['hex'] : ''; ?>">&nbsp;</span>　
                  <?php echo ($code[0]['label'])? $code[0]['label'] : ''; ?>
                </td>
              </tr>
              <tr>
                <th>B色：</th>
                <td>
                  <span class="label label-default" style="background: <?php echo ($code[1]['hex'])? $code[1]['hex'] : ''; ?>">&nbsp;</span>　
                  <?php echo ($code[1]['label'])? $code[1]['label'] : ''; ?>
                </td>
              </tr>
              <tr>
                <th>C色：</th>
                <td>
                  <span class="label label-default" style="background: <?php echo ($code[2]['hex'])? $code[2]['hex'] : ''; ?>">&nbsp;</span>　
                  <?php echo ($code[2]['label'])? $code[2]['label'] : ''; ?>
                </td>
              </tr>
              <tr>
                <th>D色：</th>
                <td>
                  <span class="label label-default" style="background: <?php echo ($code[3]['hex'])? $code[3]['hex'] : ''; ?>">&nbsp;</span>　
                  <?php echo ($code[3]['label'])? $code[3]['label'] : ''; ?>
                </td>
              </tr>
            <?php endif; ?>
            </tbody>
            <tfoot>
              <tr class="active">
                <th style="white-space: nowrap;">色番号：</th>
                <td><b><?php echo $bcol; ?></b></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <br>
        <div class="panel panel-warning">
          <div class="panel-heading"><h2 class="panel-title">水着情報</h2></div>
          <div class="panel-body">
<?php

$title = $item_post->post_title;
$categories = get_the_terms($item_post->ID, 'category');
$category_list = wp_strip_all_tags(get_the_term_list($item_post->ID, 'category', '', '', ''));
$category_parent = get_term($categories[0]->parent);
$info = wp_strip_all_tags($item_post->post_content);
$acf_price = get_field('price', $item_post->ID);
$price = ($acf_price)? number_format($acf_price) : '';
$size = wp_strip_all_tags(get_the_term_list($item_post->ID, 'size', '', '・', ''));
$material = wp_strip_all_tags(get_the_term_list($item_post->ID, 'material', '', '・', ''));

?>
            <h3><?php echo $category_list; ?></h3>
            <dl>
              <dt><?php echo $title; ?></dt>
              <dd><?php echo $info; ?></dd>
            </dl>
            <ul class="custom-info__list u-pc">
              <li>本体価格：￥
                <?php echo $price; ?> +税</li>
              <li>SIZE：
                <?php echo $size; ?>
              </li>
              <li>MATERIAL：
                <?php echo $material; ?>
              </li>
            </ul>
            <div class="custom-info__price u-sp">本体価格：￥<?php echo $price; ?> +税</div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <p>&nbsp;</p>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">カスタマイズ結果</h2>
          </div>
          <div class="panel-body">
            <?php if(isset($item_post)): ?>
              <iframe src="/simulation/printcustom2/item/?type=<?php echo $item_post->post_title; ?>&bcol=<?php echo $bcol; ?>&posA=<?php echo $posA; ?>&fontA=<?php echo $fontA; ?>&colA=<?php echo $colA; ?>&ecolA=<?php echo $ecolA; ?>&markA=<?php echo urlencode(mb_convert_encoding( $markA, "SJIS-win", "UTF-8") ); ?>&posB=<?php echo $posB; ?>&fontB=<?php echo $fontB; ?>&colB=<?php echo $colB; ?>&ecolB=<?php echo $ecolB; ?>&markB=<?php echo urlencode(mb_convert_encoding( $markB, "SJIS-win", "UTF-8") ); ?>&markB2=<?php echo urlencode(mb_convert_encoding( $markB2, "SJIS-win", "UTF-8") ); ?>&side=A" id="" name="" title="" width="100%" height="580px" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
            <?php endif; ?>
          </div>
          <div class="panel-body">
            <?php if(isset($item_post)): ?>
            <iframe src="/simulation/printcustom2/item/?type=<?php echo $item_post->post_title; ?>&bcol=<?php echo $bcol; ?>&posA=<?php echo $posA; ?>&fontA=<?php echo $fontA; ?>&colA=<?php echo $colA; ?>&ecolA=<?php echo $ecolA; ?>&markA=<?php echo urlencode(mb_convert_encoding( $markA, "SJIS-win", "UTF-8") ); ?>&posB=<?php echo $posB; ?>&fontB=<?php echo $fontB; ?>&colB=<?php echo $colB; ?>&ecolB=<?php echo $ecolB; ?>&markB=<?php echo urlencode(mb_convert_encoding( $markB, "SJIS-win", "UTF-8") ); ?>&markB2=<?php echo urlencode(mb_convert_encoding( $markB2, "SJIS-win", "UTF-8") ); ?>&side=B" id="" name="" title="" width="100%" height="580px" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <p>&nbsp;</p>
        <div class="panel panel-success">
          <div class="panel-heading"><h3 class="panel-title">マーク（オモテ）</h3></div>
          <table class="table">
            <tr>
              <th>位置：</th>
              <td><?php 
                $positions = ($posA)? get_query_var('mark')['positions'] : array(); 
                foreach($positions as $key => $value):
                  if($value->slug == mb_strtolower($posA)):
                    echo $value->description . ' [ ' . $value->name . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>書体：</th>
              <td><?php 
                $fonts = ($fontA)? get_query_var('mark')['fonts'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->slug == ('mrk' . $fontA)):
                    echo mb_strtoupper($value->slug) . "\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>マークカラー：</th>
              <td><?php 
                $fonts = ($colA)? get_query_var('mark')['colors'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->description == $colA):
                    echo '<span class="label label-default" style="background: #' . $value->slug . '">&nbsp;</span>　';
                    echo $value->name . ' [ #' . $value->slug . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>マークフチカラー：</th>
              <td><?php 
                $fonts = ($ecolA)? get_query_var('mark')['ecolors'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->description == $ecolA):
                    echo '<span class="label label-default" style="background: #' . $value->slug . '">&nbsp;</span>　';
                    echo $value->name . ' [ #' . $value->slug . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>テキスト：</th>
              <td><?php 
                echo ($markA)? $markA : ''; 
              ?></td>
            </tr>
          </table>
        </div>
        <br>
        <?php if($posB): ?>
        <div class="panel panel-success">
          <div class="panel-heading"><h3 class="panel-title">マーク（ウラ）</h3></div>
          <table class="table">
            <tr>
              <th>位置：</th>
              <td><?php 
                $positions = ($posB)? get_query_var('mark')['positions'] : array(); 
                foreach($positions as $key => $value):
                  if($value->slug == mb_strtolower($posB)):
                    echo $value->description . ' [ ' . $value->name . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>書体：</th>
              <td><?php 
                $fonts = ($fontB)? get_query_var('mark')['fonts'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->slug == ('mrk' . $fontB)):
                    echo mb_strtoupper($value->slug) . "\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>マークカラー：</th>
              <td><?php 
                $fonts = ($colB)? get_query_var('mark')['colors'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->description == $colB):
                    echo '<span class="label label-default" style="background: #' . $value->slug . '">&nbsp;</span>　';
                    echo $value->name . ' [ #' . $value->slug . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>マークフチカラー：</th>
              <td><?php 
                $fonts = ($ecolB)? get_query_var('mark')['ecolors'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->description == $ecolB):
                    echo '<span class="label label-default" style="background: #' . $value->slug . '">&nbsp;</span>　';
                    echo $value->name . ' [ #' . $value->slug . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>テキスト<?php if( $markB2 ): ?>（上段）<?php endif; ?>：</th>
              <td><?php 
                echo ($markB)? $markB : ''; 
              ?></td>
            </tr>
            <?php if( $markB2 ): ?>
            <tr>
              <th>テキスト（下段）：</th>
              <td><?php 
                echo ($markB2)? $markB2 : ''; 
              ?></td>
            </tr>
              <?php endif; ?>
          </table>
        </div>
        <?php endif; ?>
      </div>
    </div>
  </section>
</div>

<footer>
  <section class="container-fluid">
  </section>
</footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'></script>
<script>
</script>
</body>
</html>