<?php
  $side = get_query_var('side');
  $init_col = ( $side == 'A' )? '' : '';
  if(isset($_GET['col' . $side]) && $_GET['col' . $side]):
    $init_col = esc_js($_GET['col' . $side]);
  endif;
  $mark = get_query_var('mark');
  $colors = $mark['colors'];
?>

<h4 class="custom-menu__title">マークの色</h4>
<div class="mark-colour">
  <div class="mark-colour__section">
    <ul class="mark-colour__list js-colour js-colour--mark" data-cate="col<?php echo $side; ?>" data-target="#position-n">
    <?php foreach((array)$colors as $key => $value): $code = $value->description; ?>
      <li class="mark-colour__item u-colour--<?php echo mb_strtolower($code); ?> <?php echo ($code == $init_col)? 'active' : ''; ?>" data-colour="#<?php echo $value->slug; ?>" data-code="<?php echo $code; ?>" style="background-color:#<?php echo $value->slug; ?>" title="<?php echo $value->name; ?>">&nbsp;</li>
    <?php endforeach; ?>
    </ul>
  </div>
</div>
