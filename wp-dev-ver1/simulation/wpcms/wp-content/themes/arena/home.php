<?php
/**
 * The home template file
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
  
  
  get_header(); 
  
  //var_dump(get_categories('get=all'));
  
?>
  
  <div class="container" id="container">
    <main class="main main--home" id="main" role="main" data-page="Home">
      <article class="content content--home" id="content">
        <nav class="content-navigation">
          <ul class="u-clear">
            <li class="active"><span>種類を選ぶ</span></li>
            <li><span>カスタムする</span></li>
            <li><span>オーダーする</span></li>
          </ul>
        </nav>

        <section class="section section--top js-get-height">
          <div class="menu-door menu-door--swimwear">
            <div class="menu-door__inner u-center-vertical">
              <a class="menu-door__link js-scroll-link" href="#item-swimwear"></a>
              <h2 class="menu-door__title"><img src="/simulation/assets/images/common/text-swimwear.png" alt="SWIMWEAR"></h2>
              <p class="menu-door__desc u-pc"><?php echo get_term_by('slug', 'swimwear', 'category')->description; ?></p>
              <div class="menu-door__desc u-sp">種類を選ぶ</div>
            </div>
            <div class="menu-door__bg"></div>
          </div>

          <div class="menu-door menu-door--teamwear">
            <div class="menu-door__inner u-center-vertical">
              <a class="menu-door__link js-scroll-link" href="#item-teamwear"></a>
              <h2 class="menu-door__title"><img src="/simulation/assets/images/common/text-teamwear.png" alt="TEAMWEAR"></h2>
              <p class="menu-door__desc u-pc"><?php echo get_term_by('slug', 'teamwear', 'category')->description; ?></p>
              <div class="menu-door__desc u-sp">種類を選ぶ</div>
            </div>
            <div class="menu-door__bg"></div>
          </div>
        </section>

        <!-- // SWIMWEAR -->
        <section class="section section--swimwear" id="item-swimwear">
          
          <header class="item-head item-head--swimwear">
            <div class="u-inner">
              <h2 class="item-head__title"><img src="/simulation/assets/images/common/text-swimwear.png" alt="SWIMWEAR"></h2>
              <p class="item-head__desc"><?php echo get_term_by('slug', 'swimwear', 'category')->description; ?></p>
            </div>
          </header>
          
          <!-- // Aquaforce Fusion-2 -->
          <?php $cat = get_term_by('slug', 'aquaforce-fusion-2', 'category'); ?>
          <div id="<?php echo $cat->slug; ?>" class="item-inner">
            <div class="u-inner">
              <article class="item-collection">
                <h3 class="item-collection__title"><img src="/simulation/assets/images/common/text-aquaforce.png" alt="AQUAFORCE FUSION"><i class="icon icon--fina"><img src="/simulation/assets/images/icons/icon-fina.png" alt="FINA承認モデル"></i></h3>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <?php if(isset($_GET['preview'])): ?>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK02'), get_permalink(26)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-aquaforce1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK02'), get_permalink(30)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-aquaforce2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK02'), get_permalink(28)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-aquaforce3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK02'), get_permalink(32)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-aquaforce4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
                <?php endif; ?>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK09'), get_permalink(2070)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-aquaforce1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK09'), get_permalink(2120)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-aquaforce2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK09'), get_permalink(2074)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-aquaforce3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK09'), get_permalink(2121)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-aquaforce4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <!-- // X Python 2 -->
          <?php $cat = get_term_by('slug', 'x-python-2', 'category'); ?>
          <div id="<?php echo $cat->slug; ?>" class="item-inner">
            <div class="u-inner">
              <article class="item-collection">
                <h3 class="item-collection__title"><img src="/simulation/assets/images/common/text-x-python.png" alt="X-Python"><i class="icon icon--fina"><img class="js-preload" src="/simulation/assets/images/icons/icon-fina.png" alt="FINA承認モデル"></i></h3>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <?php if(isset($_GET['preview'])): ?>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK03'), get_permalink(34)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-x-python1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK03'), get_permalink(42)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-x-python2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK03'), get_permalink(36)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-x-python3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK03'), get_permalink(44)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-x-python4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
                <?php endif; ?>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK41'), get_permalink(2018)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-x-python1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK41'), get_permalink(2052)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-x-python2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK41'), get_permalink(2087)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-x-python3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK41'), get_permalink(2057)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-x-python4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <!-- // Urokoskin ST -->
          <?php $cat = get_term_by('slug', 'urokoskin-st', 'category'); ?>
          <div id="<?php echo $cat->slug; ?>" class="item-inner">
            <div class="u-inner">
              <article class="item-collection">
                <h3 class="item-collection__title"><img class="js-preload" src="/simulation/assets/images/common/text-uroko-skin.png" alt="UROKO SKIN"><i class="icon icon--fina"><img class="js-preload" src="/simulation/assets/images/icons/icon-fina.png" alt="FINA承認モデル"></i></h3>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK01'), get_permalink(50)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-uroko-skin1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK01'), get_permalink(58)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-uroko-skin2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK01'), get_permalink(52)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-uroko-skin3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK01'), get_permalink(60)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-uroko-skin4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <!-- // TOUGH SUIT -->
          <?php $cat = get_term_by('slug', 'tough-suit', 'category'); ?>
          <div id="<?php echo $cat->slug; ?>" class="item-inner">
            <div class="u-inner">
              <article class="item-collection">
                <h3 class="item-collection__title"><img class="js-preload" src="/simulation/assets/images/common/text-tough-suit.png" alt="Tought suit"></h3>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <?php if(isset($_GET['preview'])): ?>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(62)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-tough-suit1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(70)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-tough-suit2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(66)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-tough-suit3.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Girl’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(74)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/item-tough-suit4.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s</span></div>
                  </li>
                </ul>
                <?php endif; ?>
                <ul class="item-list item-list--long u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(2015)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-tough-suit1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK05'), get_permalink(2123)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img class="js-preload" src="/simulation/assets/images/items/2018/normal/item-tough-suit2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s</span></div>
                  </li>
                </ul>
              </article>
            </div>
          </div>
          
          <!-- // PRINT CUSTOM -->
          <?php $cat = get_term_by('slug', 'tough-suit', 'category'); ?>
          <div id="printcustom" class="item-inner">
              <div class="u-inner">
                  <article class="item-collection">
                      <h3 class="item-collection__title"><img class="js-preload" src="/simulation/assets/images/common/text-print-custom.png" alt="TOUGH SUIT PRINT CUSTOM ORDER"></h3>
                      <p class="item-collection__desc">デザイン・カラーを選択してチーム名が柄に出来る。自分たちだけのオリジナル練習用水着を作ろう。</p>
                      <ul class="item-list item-list--long u-clear">
                          <li>
                              <div class="item-list__image">
                                  <div class="u-center-vertical print-item-list">
                                      <a class="print-item" href="/simulation/printcustom/?p=1928&bcol=W293">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item1.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7062w?bcol=B254">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item2.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7064w?bcol=W058">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item3.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7066w?bcol=A001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item4.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7068w?bcol=G108">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item5.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7070w?bcol=W100">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item6.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7072w?bcol=N318">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item7.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7074w?bcol=B183">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item8.png" alt="ITEM">
                                      </a>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Women’s</span></div>
                          </li>
                          <li>
                              <div class="item-list__image">
                                  <div class="u-center-vertical print-item-list">
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7060wj?bcol=W293">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item1.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7062wj?bcol=B254">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item2.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7064wj?bcol=W058">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item3.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7066wj?bcol=A001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item4.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7068wj?bcol=G108">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item5.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7070wj?bcol=W100">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item6.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7072wj?bcol=N318">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item7.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7074wj?bcol=B183">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item8.png" alt="ITEM">
                                      </a>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Girl’s</span></div>
                          </li>
                          <li>
                              <div class="item-list__image">
                                  <div class="u-center-vertical print-item-list print-item-list--multi-row">
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7061?bcol=W293">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item9.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7063?bcol=B254">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item10.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7065?bcol=W058">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item11.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7067?bcol=A001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item12.png" alt="ITEM">
                                      </a>
                                      <br>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7069?bcol=G001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item13.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7071?bcol=W100">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item14.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7073?bcol=N318">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item15.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7075?bcol=B183">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item16.png" alt="ITEM">
                                      </a>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Men’s</span></div>
                          </li>
                          <li>
                              <div class="item-list__image">
                                  <div class="item-list__image">
                                      <div class="u-center-vertical print-item-list print-item-list--multi-row">
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7061j?bcol=W293">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item9.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7063j?bcol=B254">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item10.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7065j?bcol=W058">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item11.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7067j?bcol=A001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item12.png" alt="ITEM">
                                      </a>
                                      <br>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7069j?bcol=G001">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item13.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7071j?bcol=W100">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item14.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7073j?bcol=N318">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item15.png" alt="ITEM">
                                      </a>
                                      <a class="print-item" href="/simulation/printcustom/swimwear/tough-suit-print-custom/oat-7075j?bcol=B183">
                                          <img class="js-preload" src="/simulation/assets/images/items/print-custom/item16.png" alt="ITEM">
                                      </a>
                                      </div>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Boy’s</span></div>
                          </li>
                      </ul>
                  </article>
              </div>
          </div>
          
        </section>

        <!-- // TEAMWEAR -->
        <section class="section section--teamwear" id="item-teamwear">
          
          <header class="item-head item-head--teamwear">
            <div class="u-inner">
              <h2 class="item-head__title"><img class="js-preload" src="/simulation/assets/images/common/text-teamwear.png" alt="TEAMWEAR"></h2>
              <p class="item-head__desc"><?php echo get_term_by('slug', 'teamwear', 'category')->description; ?></p>
            </div>
          </header>

          <!-- // PRINT CUSTOM 2 -->
          <?php $cat = get_term_by('slug', 'jersey-type', 'category'); ?>
          <div id="printcustom2" class="item-inner">
            <script>
              $(window).load(function() {
                var urlHash = location.hash;
                if(urlHash){
                  if (urlHash == '#printcustom2') {
                    $('#printcustom2 > .u-inner').show();
                    var targetOffset = $('#item-teamwear').offset().top;
                    $('html, body').delay(256).animate({scrollTop: targetOffset}, "slow");
                  }
                }
              });
            </script>
              <div class="u-inner">
                  <article class="item-collection">
                      <h3 class="item-collection__title"><img src="/simulation/assets/images/common/text-print-custom2.png" alt="TEAM WEAR PRINT CUSTOM ORDER"></h3>
                      <p class="item-collection__desc">カラーを選択して自分たちのオリジナルウェアを作ろう。</p>
                      <ul class="item-list item-list--long u-clear">
                          <li>
                              <div class="item-list__image" style="display: -webkit-flex; display: flex;">
                                  <div class="u-center-vertical print-item-list" style="display: -webkit-inline-flex; display: inline-flex; justify-content: space-around; align-items: center;">
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330?bcol=NV07" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item1.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330?bcol=WH12" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item2.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330?bcol=RD07" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item3.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8331p?bcol=WHT" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item4.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8331p?bcol=BLU" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item5.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8331p?bcol=RED" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item6.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332p?bcol=NVY" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item7.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332p?bcol=BLK" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item8.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332p?bcol=WHT" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item9.png" alt="ITEM" style="max-width: 96%;">
                                      </a>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Men’s &amp; Women’s</span></div>
                          </li>
                          <li>
                              <div class="item-list__image" style="display: -webkit-flex; display: flex;">
                                  <div class="u-center-vertical print-item-list" style="display: -webkit-inline-flex; display: inline-flex; justify-content: space-around; align-items: center;">
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330j?bcol=NV07" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item1.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330j?bcol=WH12" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item2.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8330j?bcol=RD07" style="width: 14%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item3.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/teamwear/team-wear-print-custom/oar-8331jp?bcol=WHT" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item4.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8331jp?bcol=BLU" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item5.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8331jp?bcol=RED" style="width: 10%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item6.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332jp?bcol=NVY" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item7.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332jp?bcol=BLK" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item8.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                      <a class="print-item-2" href="/simulation/printcustom2/swimwear/tough-suit-print-custom/oar-8332jp?bcol=WHT" style="width: 9%; max-width: 10%;">
                                          <img src="/simulation/assets/images/items/print-custom-2/item9.png" alt="ITEM" style="max-width: 84%;">
                                      </a>
                                  </div>
                              </div>
                              <div class="item-list__desc"><span>Boy’s &amp; Girl’s</span></div>
                          </li>
                      </ul>
                  </article>
              </div>
          </div>

          
          <div class="item-inner">
            <div class="u-inner u-flex u-clear">
              
              <!-- // Cloth type -->
              <?php $cat = get_term_by('slug', 'cloth-type', 'category'); ?>
              <article id="<?php echo $cat->slug; ?>" class="item-collection is-col2">
                <h3 class="item-collection__title">クロスタイプ</h3>
                <p class="item-collection__lubi">Cloth type</p>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'NV02'), get_permalink(1882)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-cross-type1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s &amp; Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'NV02'), get_permalink(1885)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-cross-type2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s &amp; Girl’s</span></div>
                  </li>
                </ul>
              </article>
              
              <!-- // Windbreaker type -->
              <?php $cat = get_term_by('slug', 'windbreaker-type', 'category'); ?>
              <article id="<?php echo $cat->slug; ?>" class="item-collection is-col2">
                <h3 class="item-collection__title">ウインドブレーカータイプ</h3>
                <p class="item-collection__lubi">Windbreaker type</p>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BU03'), get_permalink(1902)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-wind-breaker1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s &amp; Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BU03'), get_permalink(1905)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-wind-breaker2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s &amp; Girl’s</span></div>
                  </li>
                </ul>
              </article>
              
              <!-- // Jersey type -->
              <?php $cat = get_term_by('slug', 'jersey-type', 'category'); ?>
              <article id="<?php echo $cat->slug; ?>" class="item-collection is-col2">
                <h3 class="item-collection__title">ジャージタイプ</h3>
                <p class="item-collection__lubi">Jersey type</p>
                <p class="item-collection__desc"><?php echo $cat->description; ?></p>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK12'), get_permalink(1941)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-jersey-type1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s &amp; Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'BK12'), get_permalink(1946)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-jersey-type2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s &amp; Girl’s</span></div>
                  </li>
                </ul>
              </article>
              
              <!-- // T-Shirt -->
              <?php $cat = get_term_by('slug', 't-shirt', 'category'); ?>
              <article id="<?php echo $cat->slug; ?>" class="item-collection is-col2">
                <h3 class="item-collection__title">Tシャツ</h3>
                <p class="item-collection__lubi">T-Shirt</p>
                <p class="item-collection__desc">・・<!-- <?php echo $cat->description; ?> --></p>
                <ul class="item-list u-clear">
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => 'WH04'), get_permalink(1962)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-t-shirt1.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Men’s &amp; Women’s</span></div>
                  </li>
                  <li>
                    <a class="item-list__link" href="<?php echo add_query_arg(array('bcol' => ''), get_permalink(1965)); ?>"></a>
                    <div class="item-list__image">
                      <div class="u-center-vertical">
                        <img src="/simulation/assets/images/items/item-t-shirt2.png" alt="ITEM">
                      </div>
                    </div>
                    <div class="item-list__desc"><span>Boy’s &amp; Girl’s</span></div>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>
        <div class="popup popup--system-requirements js-popup">
          <div class="popup-inner">
          <?php get_template_part('template/popup', 'system-requirements'); ?>
          </div>
        </div>
      </article>
    </main>
  </div>

<?php get_footer(); ?>
