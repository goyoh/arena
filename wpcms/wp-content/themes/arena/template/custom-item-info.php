<?php

$title = $post->post_title;
$categories = get_the_terms($post->ID, 'category');
$category_list = wp_strip_all_tags(get_the_term_list($post->ID, 'category', '', '', ''));
$category_parent = get_term($categories[0]->parent);
$info = wp_strip_all_tags($post->post_content);
$acf_price = get_field('price', $post->ID);
$price = ($acf_price)? number_format($acf_price) : '';
$size = wp_strip_all_tags(get_the_term_list($post->ID, 'size', '', '・', ''));
$material = wp_strip_all_tags(get_the_term_list($post->ID, 'material', '', '・', ''));

?>
  <h3 class="item-info__title">
    <img src="/simulation/assets/images/common/text-<?php echo $category_parent->slug; ?>.png" alt="<?php echo $category_parent->name; ?>">
  </h3>
  <p class="item-info__type">
    <?php echo $category_list; ?>
  </p>
  <p class="item-info__subtype">
    <?php echo $title; ?>
      <br>
      <?php echo $info; ?>
  </p>
  <ul class="item-info__list u-pc">
    <li class="item-info__item">本体価格：￥
      <?php echo $price; ?> +税</li>
    <li class="item-info__item">SIZE：
      <?php echo $size; ?>
    </li>
    <li class="item-info__item">MATERIAL：
      <?php echo $material; ?>
    </li>
  </ul>
  <div class="item-info__price u-sp">本体価格：￥<?php echo $price; ?> +税</div>
