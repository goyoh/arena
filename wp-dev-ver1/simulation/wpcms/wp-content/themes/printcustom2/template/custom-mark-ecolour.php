<?php
  $side = get_query_var('side');
  $init_ecol = ( $side == 'B' )? '' : '';
  if(isset($_GET['ecol' . $side]) && $_GET['ecol' . $side]):
    $init_ecol = esc_js($_GET['ecol' . $side]);
  endif;
  $mark = get_query_var('mark');
  $ecolors = $mark['ecolors'];
?>

<h4 class="custom-menu__title">マークのフチ色</h4>
<div class="mark-colour">
  <div class="mark-colour__section">
    <ul class="mark-colour__list mark-colour__list js-colour js-colour--edge" data-cate="ecol<?php echo $side; ?>" data-target="#position-n">
    <?php foreach((array)$ecolors as $key => $value): $code = $value->description; ?>
      <li class="mark-colour__item u-colour--<?php echo mb_strtolower($code); ?> <?php echo ($code == $init_ecol)? 'active' : ''; ?>" data-colour="#<?php echo $value->slug; ?>" data-code="<?php echo $code; ?>" style="background-color:#<?php echo $value->slug; ?>"></li>
    <?php endforeach; ?>
    </ul>
  </div>
</div>
