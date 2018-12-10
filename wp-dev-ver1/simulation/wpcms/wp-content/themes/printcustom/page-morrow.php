<?php
  
  // $_GET
  $item = (isset($_GET['type']) && $_GET['type'])? esc_js($_GET['type']) : '';
  $bcol = (isset($_GET['bcol']) && $_GET['bcol'])? esc_js($_GET['bcol']) : '';
  $pos = (isset($_GET['pos']) && $_GET['pos'])? esc_js($_GET['pos']) : null;
  $font = (isset($_GET['font']) && $_GET['font'])? esc_js($_GET['font']) : '101';
  $col = (isset($_GET['col']) && $_GET['col'])? esc_js($_GET['col']) : 'WHT';
  $mark = (isset($_GET['mark']) && $_GET['mark'])? $_GET['mark'] : null;
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
  $url = $json[0]['meta']['svg']['front'];

  set_query_var('mark', array(
    'positions' => get_the_terms($item_post->ID, 'mark-position'),
    'direction' => get_the_terms($item_post->ID, 'mark-direction'),
    'fonts' => get_the_terms($item_post->ID, 'mark-font'),
    'colors' => get_the_terms($item_post->ID, 'mark-color')
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
        <div class="panel panel-success">
          <div class="panel-heading"><h3 class="panel-title">マーク</h3></div>
          <table class="table">
            <tr>
              <th>位置：</th>
              <td><?php 
                $positions = ($pos)? array_merge(get_query_var('mark')['positions'], get_query_var('mark')['direction']) : array(); 
                foreach($positions as $key => $value):
                  if($value->slug == mb_strtolower($pos)):
                    echo $value->description . ' [ ' . $value->name . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>書体：</th>
              <td><?php 
                $fonts = ($font)? get_query_var('mark')['fonts'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->slug == ('mrk' . $font)):
                    echo mb_strtoupper($value->slug) . "\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>マークカラー：</th>
              <td><?php 
                $fonts = ($col)? get_query_var('mark')['colors'] : array(); 
                foreach($fonts as $key => $value):
                  if($value->description == $col):
                    echo '<span class="label label-default" style="background: #' . $value->slug . '">&nbsp;</span>　';
                    echo $value->name . ' [ #' . $value->slug . " ]\n";
                  endif;
                endforeach;
              ?></td>
            </tr>
            <tr>
              <th>テキスト：</th>
              <td><?php 
                echo ($mark)? $mark : ''; 
              ?></td>
          </table>
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
              <iframe src="/simulation/printcustom/item/?type=<?php echo $item_post->post_title; ?>&bcol=<?php echo $bcol; ?>&pos=<?php echo $pos; ?>&font=<?php echo $font; ?>&col=<?php echo $col; ?>&mark=<?php echo $mark; ?>" id="" name="" title="" width="100%" height="580px" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <p>&nbsp;</p>
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