<?php

// $term_slug = array();
// $categories = get_the_terms($post->ID, 'category');
// foreach((array)$categories as $key => $value):
//   $term_slug['categories'] = $value->slug;
// endforeach;
// $tags = get_the_terms($post->ID, 'post_tag');
// foreach((array)$tags as $key => $value):
//   $term_slug['tags'] = $value->slug;
// endforeach;

// $arg = array (
//   'posts_per_page' => -1,
//   'post_status' => 'publish',
//   'post_type' => 'post',
//   'tax_query' => array(
//       'relation' => 'AND',
//       array(
//           'taxonomy' => 'category',
//           'field' => 'slug',
//           'terms' => $term_slug['categories'],
//           'operator' => 'IN'
//       ),
//       array(
//           'taxonomy' => 'post_tag',
//           'field' => 'slug',
//           'terms' => $term_slug['tags'],
//           'operator' => 'IN'
//       )
//   )
// );

$pattern = get_the_terms( $post->ID, 'pattern' );
$arg = array (
  'posts_per_page' => -1,
  'post_status' => 'publish',
  'post_type' => 'post',
  'tax_query' => array(
      'relation' => 'AND',
      array(
          'taxonomy' => 'pattern',
          'field' => 'slug',
          'terms' => $pattern[0]->slug,
          'operator' => 'IN'
      )
  ),
  'order' => 'ASC'
);
$same_pattern = get_posts($arg);

?>
<h4 class="custom-menu__title">TYPE</h4>
<div class="wear-type">
  <ul class="wear-type__list js-wear-type u-clear">
    <li class="wear-type__item" style="display:none;">
      <a href="<?php echo get_permalink(); ?>" id="post_thumbnail_<?php the_ID(); ?>" class="<?php echo ($wp_query->post->ID == $post->ID)? 'active' : ''; ?>" data-svg="<?php echo $post->post_title; ?>">
      <?php if(in_array($tags[0]->slug, array('men', 'boy'))): ?>
        <img src="/simulation/wpcms/wp-content/themes/printcustom/type.png" alt="top">
      <?php else: ?>
        <img src="/simulation/wpcms/wp-content/themes/printcustom/type-w.png" alt="top">
      <?php endif; ?>
      </a>
    </li>
  <?php 
    foreach((array)$same_pattern as $key => $post):
      setup_postdata($post);
      $term_slug = array();
      $tags = get_the_terms($post->ID, 'post_tag');
      foreach((array)$tags as $key => $value):
        $term_slug['tags'] = $value->slug;
      endforeach;
  ?>
    <li class="wear-type__item abreast">
      <a href="<?php echo get_permalink(); ?>" id="post_thumbnail_<?php the_ID(); ?>" class="<?php echo ($wp_query->post->ID == $post->ID)? 'active' : ''; ?>" data-svg="<?php echo $post->post_title; ?>">
        <img src="/simulation/wpcms/wp-content/themes/printcustom/img/type-<?php echo $tags[0]->slug; ?>.png" alt="top">
      </a>
    </li>
  <?php 
    endforeach; 
    wp_reset_postdata();
  ?>
  </ul>
</div>

<!-- pattern

<?php


foreach((array)$same_pattern as $key => $value):
  var_dump( $value->post_title );
endforeach;

?>

-->
