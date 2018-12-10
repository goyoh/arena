<?php
/**
 * The page template file
 *
 * @package WordPress
 * @subpackage arena CUSTOM ORDER
 * @since 1.0
 * @version 1.0
 */


get_header(); 

?>

<div class="custom-display" style="left: 0; color: white;">

<?php 

if(have_posts()): 
  while(have_posts()): the_post(); 
    the_content();
  endwhile;
else:
  get_template_part('template/', 'none');
endif;

?>

</div>

<?php get_footer(); ?>