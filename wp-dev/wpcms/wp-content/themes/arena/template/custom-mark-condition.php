<?php 
  $mark = get_query_var('mark');
  $positions = $mark['positions'];
  $is_mark = (isset($_GET['pos']) && $_GET['pos'] && is_array($positions))? true : false ;
?>

<div class="mark-condition" data-component="MarkCondition">
  <ul class="mark-condition__list u-clear js-mark-condition">
    <li class="mark-condition__item">
      <?php if(is_array($positions)): ?>
      <a class="<?php echo ($is_mark)? 'active' : ''; ?>" data-mark="on"><i class="icon icon--tick"></i>マークあり</a>
      <?php endif; ?>
    </li>
    <li class="mark-condition__item">
      <a class="<?php echo ($is_mark)? '' : 'active'; ?>" data-mark="off"><i class="icon icon--tick"></i>マークなし</a>
    </li>
  </ul>
</div>