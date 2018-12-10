import $ from 'jquery';
import { TweenMax } from 'gsap';
import { readCookie } from '../app/globals';
import ScrollEvents from './ScrollEvents';

export default class Component {
  constructor() {
    this.currentURL = window.location.href;
    this.markOptions = ['a', 'b', 'c', 'j', 'k', 'd', 'i', 'l', 'e', 'm', 'n', 'f', 'l', 'g', 'o'];
    this.pageID = $('.custom-menu').attr('id');
    this.styleName = $('.js-order-save').data('style');
    this.bcolBase = '';
    this.colourStock = {};
  }

  static component = {};
  static styleNum = 0;
  static orderLink = {};
  static newOrderLink = {};
  static storageValue = {};

  getStyleByCookie = () => {
    const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];
    let styleLink = '';

    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) !== '0') {
        const val = readCookie.getItem(`style${i + 1}`);
        const res = decodeURIComponent(val);

        styleLink = `${styleLink}&style${i + 1}=${res}`;
      }
    });

    return styleLink;
  };

  setStyleByCookie = () => {
    const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];
    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) === '0') {
        Component.styleNum = i + 1;
        return false;
      }

      return true;
    });
  };

  setLocalStrage() {
    localStorage.setItem(this.pageID, JSON.stringify(Component.storageValue));
  }

  orderLinkChange(key, val) {
    Component.orderLink[key] = val;
    this.currentURL = this.currentURL.split(/[?#]/)[0];

    const styleNum = Component.styleNum || '';
    const style = this.styleName || '';

    const {
      bcol = '',
      posA = '',
      posB = '',
      fontA = '',
      fontB = '',
      colA = '',
      colB = '',
      ecolA = '',
      ecolB = '',
      markA = '',
      markB = '',
      markB2 = '',
    } = Component.orderLink;

    const directLinkServer = 'https://custom.arena-jp.com/order/index.php?module=Flash&action=CreateStyle&style1=';
    const directLink = `${directLinkServer}${style},${bcol},${posA},${fontA},${colA},${markA},${ecolA},,${posB},${fontB},${colB},${markB},${ecolB},${markB2}`;
    const snsLink = encodeURIComponent(`${this.currentURL}?bcol=${bcol}&posA=${posA}&fontA=${fontA}&colA=${colA}&markA=${markA}&ecolA=${ecolA}&markA2=&posB=${posB}$fontB=${fontB}&colB=${colB}&markB=${markB}&ecolB=${ecolB}&markB2=${markB2}`);
    Component.newOrderLink = `${this.currentURL}?style${styleNum}=${style}&bcol=${bcol}&posA=${posA}&fontA=${fontA}&colA=${colA}&markA=${markA}&ecolA=${ecolA}&markA2=&posB=${posB}$fontB=${fontB}&colB=${colB}&markB=${markB}&ecolB=${ecolB}&markB2=${markB2}`;

    $('.js-order-sheet-direct').attr('href', directLink);
    $('.js-order-save').attr('href', Component.newOrderLink);

    $('.js-facebook-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${snsLink}`);
    $('.js-twitter-link').attr('href', `https://twitter.com/home?status=${snsLink}`);
    $('.js-line-link').attr('href', `http://line.me/R/msg/text/?${snsLink}`);
  }

  getMarkData = () => (
    new Promise((resolve) => {
      const rotation = $('.custom-direction .js-rotation').data('rotation');
      const $current = $('.custom-menu__tab.active');

      const colour = $current.find('.js-colour--mark').find('li.active').data('colour');
      const ecolour = $current.find('.js-colour--edge').find('li.active').data('colour');
      const ccode = $current.find('.js-colour--mark').find('li.active').data('code');
      const ecode = $current.find('.js-colour--edge').find('li.active').data('code');
      const position = $current.find('.js-mark-position .active').data('pos');
      const text = $current.find('.js-mark-text').val();

      const $position = $current.find('.js-mark-position').find(`[data-pos="${position}"]`);
      const $family = $current.find('.js-mark-family input:checked');
      const language = $family.data('max-lang');
      const family = $family.val();
      const code = $family.data('code');
      const length = $position.data(`max-${language}`);

      const data = {
        colour,
        ccode,
        ecolour,
        ecode,
        text,
        position,
        family,
        code,
        language,
        length,
        rotation,
      };

      resolve(data);
    })
  )

  colourDraw = (el, colour) => {
    // for the svg drawing purpose
    // const stroke = $(chilel).css('stroke');
    // const fill = $(chilel).css('fill');

    TweenMax.set(el, { fill: colour });
  }

  changeColours(e) {
    const $el = (e.currentTarget) ? $(e.currentTarget) : e;
    const $current = $('.custom-menu__tab.active');

    const $colB = $('.js-colour--mark[data-cate="colB"]');
    const $ecolB = $('.js-colour--edge[data-cate="ecolB"]');

    const {
      colA,
      colB = $colB.find('.mark-colour__item.active').data('colour'),
      ecolA,
      ecolB = $ecolB.find('.mark-colour__item.active').data('colour'),
    } = this.colourStock;

    // const $svg = $('.js-base-display').find('svg');
    const tar = $el.parent().data('target');
    let $svgPath;

    const cate = $el.parent().data('cate');
    const colour = $el.data('colour');
    const code = $el.data('code');

    const bcolBase = {
      b: $('.js-colour2').find('.active').data('colour'),
      c: $('.js-colour3').find('.active').data('colour'),
    };

    if (colour === bcolBase.b) {
      return false;
    } else if (colA === colour && cate === 'ecolA') {
      return false;
    } else if (colB === colour && cate === 'ecolB') {
      return false;
    } else if (ecolA === colour && cate === 'colA') {
      return false;
    } else if (ecolB === colour && cate === 'colB') {
      return false;
    } else if (colour === bcolBase.c && cate === 'ecolA') {
      return false;
    } else if (colour === bcolBase.c && cate === 'ecolB') {
      return false;
    }

    const $colourEl = $el.parents('.js-colour');

    // apply if it's the cololour for the mark
    if ($colourEl.is('.js-colour--mark') || $colourEl.is('.js-colour--edge')) {
      const markFont = $current.find('.js-mark-family input:checked').val();

      $colourEl.find('li').removeClass('active');
      $el.addClass('active');

      // set localStrage and change the order link
      Component.storageValue[cate] = code;
      this.setLocalStrage();

      $svgPath = $(tar).children(markFont).find('path');
    } else {
      $svgPath = $(tar).children();

      this.bcolBase = {
        b: $('.js-colour2').find('.active').data('colour'),
        c: $('.js-colour3').find('.active').data('colour'),
      };
    }

    this.orderLinkChange(cate, code);
    this.colourStock[cate] = colour;
    // draw svg
    $svgPath.each((index, el) => {
      this.colourDraw(el, colour);
    });

    return true;
  }

  restyle() {
    // const $svg = $('.js-base-display').find('svg');
    const storageKey = JSON.parse(localStorage.getItem(this.pageID));
    const $current = $('.custom-menu__tab.active');

    if (storageKey) {
      // loop all the selector which can be used for restyling the svg item
      $('*[data-cate]').each((index, el) => {
        const tar = $(el).data('target');
        const cate = $(el).data('cate');
        const key = storageKey[cate];

        const ifIsMark = $(el).is('.js-colour--mark') || $(el).is('.js-colour--edge');
        const ifIsGradation = $(el).is('.js-colour--gradation');

        // apply if it's a category for colouring
        if ($(el).is('.js-colour')) {
          // apply if it's a mark
          if (ifIsMark) {
            const markFont = $current.find('.js-mark-family input:checked').val();
            const $path = $(tar).children(markFont).find('path');

            const colour = $(el).find(`[data-code="${key}"]`).data('colour');

            $path.each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          } else if (ifIsGradation) {
            const colour = $(el).find('.active').data('colour');

            $('#a-color > path').css('opacity', 0);
            $(`#colourg${colour}`).css('opacity', 1);
          } else {
            const colour = $(el).find('.active').data('colour');

            $(tar).children().each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          }
        }
      });
    }
  }

  inActivateFont = (pos) => {
    const $tar = $('.mark-family__item *[data-code="105"], .mark-family__item *[data-code="108"]');

    if (pos === 'F') {
      $tar.attr('disabled', true);
      $tar.prop('checked', false);
    } else {
      $tar.attr('disabled', false);
    }
  };

  updateScrollBar = () => {
    ScrollEvents.updateScrollBar();
  }

  turnOff() { }

  turnOn() { }

  resize(wdt, hgt) { }

  destroy() {
    super.destroy();
  }
}
