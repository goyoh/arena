<?php 
  $init_font = '101';
  if(isset($_GET['font']) && $_GET['font']):
    $init_font = esc_js($_GET['font']);
  endif;
  $mark = get_query_var('mark');
  $fonts = $mark['fonts'];
?>
<h4 class="custom-menu__title">マークの書体</h4>
<div class="mark-family">
  <div class="mark-family__section">
    <ul class="mark-family__list js-mark-family u-clear" data-cate="font">
    <?php 
      foreach((array)$fonts as $key => $value):
        $term_meta_array = array(
          'img' => get_field('reference', $value),
          'family' => mb_strtolower(preg_replace("/\s/", "-", $value->name)),
          'code' => str_replace('mrk', '', $value->slug)
        );
    ?>
      <li class="mark-family__item font--<?php echo $term_meta_array['family']; ?>">
        <input type="radio" id="custom-font<?php echo $value->term_id; ?>" name="custom-font" value=".<?php echo $value->slug; ?>" data-max-lang="<?php echo (!in_array($term_meta_array['code'], array('109', '110', '111')))? 'en' : 'em'; ?>" data-code="<?php echo $term_meta_array['code']; ?>" <?php echo ($term_meta_array['code'] == $init_font)? 'checked="checked"' : ''; ?>>
        <label for="custom-font<?php echo $value->term_id; ?>"><img src="<?php echo $term_meta_array['img']['url']; ?>" alt="<?php echo $value->name; ?>" title="<?php echo $value->description; ?>"></label>
      </li>
    <?php endforeach; ?>
    </ul>
  </div>
</div>
