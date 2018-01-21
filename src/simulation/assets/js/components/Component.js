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
  }

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
  }

  setLocalStrage() {
    localStorage.setItem(this.pageID, JSON.stringify(Component.storageValue));
  }

  orderLinkChange(key, val) {
    Component.orderLink[key] = val;
    this.currentURL = this.currentURL.split(/[?#]/)[0];

    const styleNum = Component.styleNum || '';
    const style = this.styleName || '';
    const { pos, font, bcol, col, markA, markA2, markB } = Component.orderLink;

    const directLinkServer = 'https://custom.arena-jp.com/order/index.php?module=Flash&action=CreateStyle&style1=';
    const directLink = `${directLinkServer}${style},${bcol || ''},${pos || ''},${font || ''},${col || ''},${markA || ''}`;
    const snsLink = encodeURIComponent(`${this.currentURL}?bcol=${bcol || ''}&pos=${pos || ''}&font=${font || ''}&col=${col || ''}&markA=${markA || ''}`);
    Component.newOrderLink = `${this.currentURL}?style${styleNum}=${style}&bcol=${bcol || ''}&pos=${pos || ''}&font=${font || ''}&col=${col || ''}&markA=${markA || ''}&markA2=${markA2 || ''}&markB=${markB || ''}`;

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

      console.log('getMarkData');
      console.log(position);

      const data = { colour, ccode, ecolour, ecode, text, position, family, code, language, length, rotation };

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

    // const $svg = $('.js-base-display').find('svg');
    const tar = $el.parent().data('target');
    let $svgPath;

    const cate = $el.parent().data('cate');
    const colour = $el.data('colour');
    const code = $el.data('code');

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
    }

    this.orderLinkChange(cate, code);
    // draw svg
    $svgPath.each((index, el) => {
      this.colourDraw(el, colour);
    });
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

        // apply if it's a category for colouring
        if ($(el).is('.js-colour')) {
          // apply if it's a mark
          if ($(el).is('.js-colour--mark') || $(el).is('.js-colour--edge')) {
            const markFont = $current.find('.js-mark-family input:checked').val();
            const $path = $(tar).children(markFont).find('path');

            const colour = $(el).find(`[data-code="${key}"]`).data('colour');

            $path.each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          } else if ($(el).is('.js-colour--gradation')) {
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
