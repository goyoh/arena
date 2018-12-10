<?php 
  $mark = get_query_var('mark');
  $positions = $mark['positions'];
  $direction = $mark['direction'];
  $is_mark = (isset($_GET['pos']) && $_GET['pos'] && (is_array($positions) || is_array($direction)))? true : false ;
?>
<div class="mark-condition">
  <ul class="mark-condition__list u-clear js-mark-pick">
    <li class="mark-condition__item">
      <?php if(is_array($positions) || is_array($direction)): ?><a class="<?php echo ($is_mark)? 'active' : ''; ?>" data-mark="on" data-value=""><i class="icon icon--tick"></i>マークあり</a><?php endif; ?>
    </li>
    <li class="mark-condition__item">
      <a class="<?php echo ($is_mark)? '' : 'active'; ?>" data-mark="off" data-value=""><i class="icon icon--tick"></i>マークなし</a>
    </li>
  </ul>
</div>
