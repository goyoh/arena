import $ from 'jquery';
import { TweenMax } from 'gsap';
import { readCookie } from '../app/globals';
import ScrollEvents from './ScrollEvents';

export default class Component {
  constructor() {
    this.currentURL = window.location.href;
    this.uploadPath = '/simulation/wpcms/wp-content/uploads/';
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
    let styleLinkURL = '';

    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) !== '0') {
        const val = readCookie.getItem(`style${i + 1}`);
        const res = decodeURIComponent(val);

        styleLinkURL = `${styleLinkURL}&style${i + 1}=${res}`;
      }
    });

    return styleLinkURL;
  }

  setStyleByCookie = () => {
    const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];
    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) === '0') {
        Component.styleNum = i + 1;
        // return false;
      }
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
    const { pos, font, bcol, col, mark } = Component.orderLink;

    const directLinkServer = 'https://custom.arena-jp.com/order/index.php?module=Flash&action=CreateStyle&style1=';
    const directLink = `${directLinkServer}${style},${bcol},${pos},${font},${col},${mark}`;
    const snsLink = encodeURIComponent(`${this.currentURL}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`);
    Component.newOrderLink = `${this.currentURL}?style${styleNum}=${style}&bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`;

    $('.js-order-sheet-direct').attr('href', directLink);
    $('.js-order-save').attr('href', Component.newOrderLink);

    $('.js-facebook-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${snsLink}`);
    $('.js-twitter-link').attr('href', `https://twitter.com/home?status=${snsLink}`);
    $('.js-line-link').attr('href', `http://line.me/R/msg/text/?${snsLink}`);
  }

  getMarkData = () => (
    new Promise((resolve) => {
      const colour = $('.js-colour--mark').find('li.active').data('colour');
      const position = $('.js-mark-position .active').data('pos');
      const rotation = $('.js-rotation').data('rotation');
      const text = $('.js-mark-text').val();

      const $position = $('.js-mark-position').find(`[data-pos="${position}"]`);

      const $family = $('.js-mark-family input:checked');
      const language = $family.data('max-lang');
      const family = $family.val();
      const code = $family.data('code');

      const length = $position.attr(`data-max-${language}`);

      const data = { colour, text, position, family, code, language, length, rotation };

      resolve(data);
    })
  )

  colourDraw = (chilel, colour) => {
    // for the svg drawing purpose
    // const stroke = $(chilel).css('stroke');
    // const fill = $(chilel).css('fill');

    TweenMax.set(chilel, { fill: colour });
  }

  changeColours(e) {
    const $tarEl = (e.currentTarget) ? $(e.currentTarget) : e;

    // const $svg = $('.js-base-display').find('svg');
    const tar = $tarEl.parent().data('target');
    let $svgPath;

    const cate = $tarEl.parent().data('cate');
    const colour = $tarEl.data('colour');
    const code = $tarEl.data('code');

    const $colourEl = $tarEl.parents('.js-colour');

    // apply if it's the cololour for the mark
    if ($colourEl.is('.js-colour--mark')) {
      const markFont = $('.js-mark-family input:checked').val();

      $colourEl.find('li').removeClass('active');
      $tarEl.addClass('active');

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

    if (storageKey) {
      // loop all the selector which can be used for restyling the svg item
      $('*[data-cate]').each((index, el) => {
        const tar = $(el).data('target');
        const cate = $(el).data('cate');
        const key = storageKey[cate];

        // apply if it's a category for colouring
        if ($(el).is('.js-colour')) {
          // apply if it's a mark
          if ($(el).is('.js-colour--mark')) {
            const markFont = $('.js-mark-family input:checked').val();
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
