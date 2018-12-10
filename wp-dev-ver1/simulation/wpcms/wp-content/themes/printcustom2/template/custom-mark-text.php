<?php
  $side = get_query_var('side');
  $init_mark = null;
  if(isset($_GET['mark' . $side]) && $_GET['mark' . $side]):
    $init_mark = esc_js($_GET['mark' . $side]);
  endif;
  $init_mark2 = null;
  if(isset($_GET['mark' . $side . '2']) && $_GET['mark' . $side . '2']):
    $init_mark2 = esc_js($_GET['mark' . $side . '2']);
  endif;
?>

<h4 class="custom-menu__title">マークの名前</h4>
<div class="mark-text" data-component="MarkText">
  <form class="mark-text__form" data-cate="text<?php echo $side; ?>" onsubmit="return false;">
    <div class="mark-text__inner">
      <input class="js-mark-text disabled" type="text" name="text-mark<?php echo $side; ?>" placeholder="1行目"  value="<?php echo ($init_mark)? $init_mark : ''; ?>" maxlength="10" data-line="">
      <input class="js-mark-submit js-mark-submit--above" type="submit" name="" value="マークを確認する">
    </div>

    <div class="mark-text__inner">
      <?php if($side != 'A'): ?>
      <input class="js-mark-text disabled" type="text" name="text-mark<?php echo $side; ?>2" placeholder="2行目"  value="<?php echo ($init_mark2)? $init_mark2 : ''; ?>" maxlength="10" data-line="2">
      <input class="js-mark-submit js-mark-submit--below" type="submit" name="" value="マークを確認する">
      <?php endif; ?>
    </div>

    <div class="form-message"></div>

  </form>
</div>
