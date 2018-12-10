<?php
  $mark = get_query_var('mark');
  if($direction = $mark['direction']):
    $init_pos = reset($direction)->name;
    if(isset($_GET['pos']) && $_GET['pos']):
      $init_pos = esc_js($_GET['pos']);
    endif;
?>
  <h4 class="custom-menu__title">マークの向き</h4>
  <div class="mark-direction">  
    <div class="mark-direction__section">  
      <ul class="mark-direction__list js-mark-pos u-clear" data-cate="pos" data-target=".js-svg-text">
      <?php 
        foreach((array)$direction as $key => $value):
          $term_meta_array = array(
            'img' => get_field('position', $value),
            'angle' => get_field('angle', $value),
            'en' => get_field('max-en', $value),
            'em' => get_field('max-em', $value)
          );
      ?>
        <li class="mark-direction__item">
          <a class="<?php echo ($value->name == $init_pos)? 'active' : ''; ?>" data-side="<?php echo get_term($value->parent, 'mark-direction')->slug; ?>" data-pos="<?php echo $value->name ?>" data-value="<?php echo $value->name ?>" data-angle="<?php echo $term_meta_array['angle']; ?>" data-max-en="<?php echo $term_meta_array['en']; ?>" data-max-em="<?php echo $term_meta_array['em']; ?>">
            <img src="<?php echo $term_meta_array['img']['url']; ?>" alt="<?php echo $value->description; ?>" title="<?php echo $value->description; ?>">
          </a>
        </li>
      <?php endforeach; ?>
      </ul>
    </div>
  </div>
<?php endif; ?>