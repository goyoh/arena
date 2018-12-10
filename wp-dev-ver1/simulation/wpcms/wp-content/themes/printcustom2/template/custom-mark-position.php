<?php
  $side = get_query_var('side');
  $mark = get_query_var('mark');
  if($positions = $mark['positions']):
    $side_positions = array();
    foreach((array)$positions as $key => $value):
      $parent = get_term( $value->parent, 'mark-position' );
      if( $side == 'A' && $parent->slug == 'back' ) continue;
      if( $side == 'B' && $parent->slug == 'front' ) continue;
      $side_positions[] = $value;
    endforeach;

    $init_pos = reset($side_positions)->name;
    if(isset($_GET['pos' . $side]) && $_GET['pos' . $side]):
      $init_pos = esc_js($_GET['pos' . $side]);
    endif;
?>
  <h4 class="custom-menu__title">マークの位置</h4>
  <div class="mark-position" data-component="MarkPosition">
    <ul class="mark-position__list u-clear js-mark-position" data-cate="pos<?php echo $side; ?>" data-target=".js-svg-text">
    <?php 
      foreach((array)$side_positions as $key => $value):
        $term_meta_array = array(
          'img' => get_field('position', $value),
          'angle' => get_field('angle', $value),
          'en' => get_field('max-en', $value),
          'em' => get_field('max-em', $value)
        );
    ?>
      <li class="mark-position__item">
        <a class="<?php echo ($value->name == $init_pos)? 'active' : ''; ?>" data-side="<?php echo get_term($value->parent, 'mark-position')->slug; ?>" data-pos="<?php echo $value->name ?>" data-value="<?php echo $value->name ?>" data-angle="<?php echo $term_meta_array['angle']; ?>" data-max-en="<?php echo $term_meta_array['en']; ?>" data-max-em="<?php echo $term_meta_array['em']; ?>">
          <img src="<?php echo $term_meta_array['img']['url']; ?>" alt="<?php echo $value->description; ?>" title="<?php echo $value->description; ?>">
        </a>
      </li>
    <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>