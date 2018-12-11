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
    'colors' => get_the_terms($post->ID, 'mark-color'),
    'ecolors' => get_the_terms($post->ID, 'mark-ecolor')
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
              <li class="active" data-tab=".base-simulation">TEAM WEAR<br>SIMULATION</li>
              <li data-tab=".mark-simulation">MARK<br>SIMULATION</li>
            </ul>

            <div class="custom-menu__head u-sp">TEAM WEAR<br>SIMULATION</div>
            <div class="custom-menu__tap is-hidden">（タップして開く）</div>

            <div class="custom-menu__content custom-menu__content--base base-simulation js-base-simulation active">
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

            <div class="custom-menu__content custom-mark-simulation mark-simulation js-mark-simulation">
              <div class="custom-menu__inner">
                <!-- マークのありなし -->
                <?php get_template_part('template/custom', 'mark-condition'); ?>
              </div>
              <?php if (get_query_var('mark')['positions']): ?>

                <div class="custom-menu__inner">
                  <div class="custom-direction">
                    <span class="button button--direction js-rotation" data-rotation="front" data-svg="<?php echo strtoupper($post->post_name); ?>">BACK</span>
                  </div>
                </div>

<!--

  /*
  * Style Queries
  * ?style1=OAR-8330&bcol=BK01&posA=V&fontA=109&colA=WHT&ecolA=PNK&markA=おもて&posB=G&fontB=109&colB=WHT&ecolB=PNK&markB=上段&markB2=下段
  * 
  * posA => U, V, F 
  * posB => G, W
  * 
  * fontA => font code 
  * fontB => font code 
  * 
  * colA => color code 
  * colB => color code 
  * 
  * ecolA => color code
  * ecolB => color code
  * 
  * markA => text
  * markB => text
  * markB2 => text
  * 
  */

-->

                <?php set_query_var( 'side', 'A' ); ?>
                <div class="custom-menu__tab active" data-rotation="front">
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
                    <!-- マークのフチ色 -->
                    <?php get_template_part('template/custom', 'mark-ecolour'); ?>
                  </div>
                  <div class="custom-menu__inner">
                    <!-- マークの名前 -->
                    <?php get_template_part('template/custom', 'mark-text'); ?>
                  </div>
                </div>

                <?php set_query_var( 'side', 'B' ); ?>
                <div class="custom-menu__tab" data-rotation="back">
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
                    <!-- マークのフチ色 -->
                    <?php get_template_part('template/custom', 'mark-ecolour'); ?>
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
            <a href="" class="item-info__link is-red js-popup-trigger u-pc" data-popup=".popup--design-note">デザインに関する注意事項</a>
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

            <div class="notes-container">
              <p class="notes">
                <span class="asterisk">*</span><span>シミュレーション画像はイメージです。<br>実際の商品と色味やマーキングの大きさ、プリント柄の入り方等が異なる場合がございますので予めご了承下さい。</span>
              </p>
            </div>

            <div class="button-container u-sp">
              <span class="custom-rotation js-rotation" data-rotation="front" data-svg="<?php echo strtoupper($post->post_name); ?>"><i class="icon icon--rotation"></i>ROTATION</span>
              <a href="javascript:void(0);" class="item-info__link is-red js-popup-trigger" data-popup=".popup--design-note">デザインに関する<br>注意事項</a>
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
          <div class="popup-inner design-note">
            <h3 class="design-note__head">デザインに関する注意事項</h3>
            <a class="popup-close js-popup-close" style="top: 4.2%;"></a>
            <div class="design-note__inner">
              <div class="design-note__desc" style="">
                  <p><span class="asterisk">※</span>シミュレーション画像はイメージです。厳密に実際の商品と同じでなく、色味、マーキングの大きさ、プリント柄の入り方などが異なる場合があります。</p>
                  <br>
                  <h4>【マーク色・マークのフチ色の色指定制限について】</h4>
                  <ul>
                    <li>・Bカラー、Cカラーと同じ色を、マークのフチ色で使用できません。</li>
                    <li>・Bカラーと同じ色を、マーク色で使用できません。</li>
                  </ul>
                  <br>
                  <h4>【マークの文字数制限について】</h4>
                  <ul>
                    <li>・左胸縦(大)、胸中央、背中、背中2段(上段・下段それぞれ)は、最大10文字です。</li>
                    <li>・左胸のみ、最大6文字です。<br>　※文字数制限の詳細は、<a href="/help/mark.html#teamprint" target="_blank" style="color: white;"><u>こちら</u></a> をご覧ください。</li>
                  </ul>
                  <br>
                  <h4>【マークの書体制限について】</h4>
                  <ul>
                    <li>・マーク位置に左胸を選択した場合、書体05、08は使用できません。</li>
                  </ul>
              </div>
              <!-- <div class="design-note__desc" style="flex-shrink: 0;">
              </div> -->
            </div>
          </div>
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

<style>
  .bcolour__list li,
  .bcolour__list li.active, 
  .bcolour__list li:hover,
  .mark-colour__list li, 
  .mark-colour__list li.active, 
  .mark-colour__list li:hover {
    border-width: 2px;
  }
</style>

<?php get_footer(); ?>