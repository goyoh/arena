<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package WordPress
 * @subpackage arena CUSTOM ORDER
 * @since 1.0
 * @version 1.0
 */
  
  $categories = get_the_terms($post->ID, 'category');
  $category = ($categories)? $categories[0] : get_term_by('slug', 'uncategorized', 'category');
  
  set_query_var('mark', array(
    'positions' => get_the_terms($post->ID, 'mark-position'),
    'fonts' => get_the_terms($post->ID, 'mark-font'),
    'colors' => get_the_terms($post->ID, 'mark-color')
  ));
  
  $have_page = in_array($category->slug, array('aquaforce-fusion-2', 'x-python-2', 'urokoskin-st', 'cloth-type', 'windbreaker-type', 'jersey-type', 't-shirt'));
  
  get_header(); 
  
?>

<?php 
  if(have_posts()): 
    while(have_posts()): the_post(); 
?>

  <div class="container" id="container">
    <main class="main main--simulation" id="main" role="main" data-page="Simulation">
      <article class="content content--simulation" id="content">
        <nav class="content-navigation">
          <ul class="u-clear">
            <li><a href="<?php echo get_bloginfo('url') . '/#' . $category->slug; ?>"><span>種類を選ぶ</span></a></li>
            <li class="active"><span>カスタムする</span></li>
            <li><span>オーダーする</span></li>
          </ul>
        </nav>

        <section class="section section--custom is-swimwear js-get-height" data-component="SimulationCommon">
          <div class="custom-menu" id="wear-<?php echo $post->ID; ?>">
            <ul class="custom-menu__tabs u-clear u-pc">
              <li class="active" data-tab=".base-simulation">SWIM WEAR<br>SIMULATION</li>
              <li data-tab=".mark-simulation">MARK<br>SIMULATION</li>
            </ul>

            <div class="custom-menu__head u-sp">SWIM WEAR<br>SIMULATION</div>
            <div class="custom-menu__tap is-hidden">（タップして開く）</div>

            <div class="custom-menu__content custom-menu__content--base base-simulation active">
              <div class="custom-menu__inner">
                <!-- Product Type -->
                <?php get_template_part('template/custom', 'type'); ?>
              </div>
              <div class="custom-menu__inner">
                <!-- Colour Code -->
                <?php get_template_part('template/custom', 'bcolour'); ?>
              </div>
            </div>

            <div class="custom-menu__head u-sp">MARK<br>SIMULATION</div>
            <div class="custom-menu__tap">（タップして開く）</div>

            <div class="custom-menu__content custom-mark-simulation mark-simulation">
              <div class="custom-menu__inner">
                <!-- マークのありなし -->
                <?php get_template_part('template/custom', 'mark-condition'); ?>
              </div>
              <?php if (get_query_var('mark')['positions']): ?>
                <div class="custom-menu__tab">
                  <div class="custom-menu__inner">
                    <!-- マークの位置 -->
                    <?php get_template_part('template/custom', 'mark-position'); ?>
                  </div>
                  <div class="custom-menu__inner">
                    <!-- マークの書体 -->
                    <?php get_template_part('template/custom', 'mark-font'); ?>
                  </div>
                  <div class="custom-menu__inner">
                    <!-- マークの色 -->
                    <?php get_template_part('template/custom', 'mark-colour'); ?>
                  </div>
                  <div class="custom-menu__inner">
                    <!-- マークの名前 -->
                    <?php get_template_part('template/custom', 'mark-text'); ?>
                  </div>
                </div>
              <?php endif; ?>
            </div>

            <p class="read-more js-read-more"></p>
          </div>

          <div class="item-info">
            <?php get_template_part('template/custom-item', 'info'); ?>

            <?php if($have_page): ?>
              <a href="" class="item-info__link js-popup-trigger u-pc" data-popup=".popup--design-note">商品情報を見る</a>
            <?php endif; ?>

            <div class="order-info js-order-info">
              <!-- シミュレーション後のメニュー -->
              <?php get_template_part('template/custom-order', 'info'); ?>
            </div>
          </div>

          <div class="custom-display">
            <div class="custom-display-core js-base-display">
            <?php
              $basic_auth = array('user' => 'ccv', 'pass' => 'shunlock');
              $url = array('front' => get_field('svg-front'), 'back' => get_field('svg-back'));
              $ch = curl_init();
              curl_setopt($ch, CURLOPT_URL, $url['front']);
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
              curl_setopt($ch, CURLOPT_USERPWD, $basic_auth['user'] . ":" . $basic_auth['pass']);
              curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
              $result = curl_exec($ch);
              curl_close($ch);
              echo $result;
            ?>
            </div>

            <div class="button-container u-sp">
              <span class="custom-rotation js-rotation" data-rotation="front" data-svg="<?php echo strtoupper($post->post_name); ?>"><i class="icon icon--rotation"></i>ROTATION</span>
              <?php if($have_page): ?>
                <a href="javascript:void(0);" class="item-info__link js-popup-trigger" data-popup=".popup--design-note">商品情報を見る</a>
              <?php endif; ?>
            </div>
          </div>

          <span class="custom-rotation u-pc js-rotation" data-rotation="front" data-svg="<?php echo strtoupper($post->post_name); ?>"><i class="icon icon--rotation"></i>ROTATION</span>
        </section>

        <div class="popup popup--order-sheet js-popup">
          <div class="order-sheet popup-inner">
          <?php get_template_part('template/popup', 'order-sheet'); ?>
          </div>
        </div>

        <div class="popup popup--mark-check js-popup">
          <div class="mark-check popup-inner">
          <?php get_template_part('template/popup', 'mark-check'); ?>
          </div>
        </div>

        <div class="popup popup--design-note js-popup">
        <?php
          if($category):
            switch($category->slug):
              case 'aquaforce-fusion-2':
              case 'x-python-2':
              case 'urokoskin-st':
                $page = get_page_by_path($category->slug);
                echo $page->post_content;
                break;
              case 'cloth-type':
              case 'windbreaker-type':
              case 'jersey-type':
              case 't-shirt':
                $page = get_page_by_path('team-wear');
                echo $page->post_content;
                break;
              default:
                echo '商品情報はありません';
                break;
            endswitch;
          endif;
        ?>
        </div>

        <div class="popup popup--system-requirements js-popup">
          <div class="system-requirements popup-inner">
          <?php get_template_part('template/popup', 'system-requirements'); ?>
          </div>
        </div>
      </article>
    </main>
  </div>

<?php
    endwhile;
  else:
    get_template_part('template/', 'none');
  endif;
?>


<?php get_footer(); ?>