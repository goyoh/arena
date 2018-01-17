import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, getUrlVars } from '../app/globals';
import { loaderOut, spinner } from '../app/Loader';
import Component from './Component';

import BaseColour from './BaseColour';
import ScrollEvents from './ScrollEvents';
import OrderMenu from './OrderMenu';

// const uploadPath = '1/simulation/wpcms/wp-content/uploads/sites/2/';
// const uploadPath = 'https://custom.arena-jp.com/simulation/wpcms/wp-content/uploads/';
// const uploadPath = '/simulation/assets/images/svgs/';
const uploadPath = 'https://custom.arena-jp.com/simulation/printcustom2/wp-content/uploads/sites/3/';

export default class SimulationCommon extends Component {
  constructor(props) {
    super(props);

    const slug = window.location.href.split('?')[0].split('/').pop();
    this.jsonPath = `https://custom.arena-jp.com/simulation/printcustom2/wp-json/wp/v2/posts/?slug=${slug}`;
    // this.jsonPath = 'https://custom.arena-jp.com/simulation/printcustom2/wp-json/wp/v2/posts/?slug=oar-8330';

    this.render();
  }

  render() {
    this.setStyleByCookie();
    this.events();
    this.itemSize();

    this.baseColour = new BaseColour({
      jsonUrl: this.jsonPath,
      print: true,
      callback: () => {
        this.markSetAsStart();
        TweenMax.to('.js-base-display', 0.4, {
          autoAlpha: 1,
          onComplete: () => {
            loaderOut();
          },
        });
      },
    });
  }

  events() {
    // mark events
    $('.js-colour--mark').on(window.eventtype, 'li', (e) => {
      this.changeColours(e);
      return false;
    });

    $('.custom-menu__tabs').on(window.eventtype, 'li', (e) => {
      this.tabs(e);
    });

    $(document).on(window.eventtype, '.js-rotation', (e) => {
      this.rotation(e);
    });

    $(document).on(window.eventtype, '.js-modal', this.modals);

    $(document).on('click', '.js-base-display', this.imageModal);

    $(window).on('resize', this.itemSize);

    if (mobilecheck()) {
      $(document).on('touchstart', '.custom-menu__head', this.tapMenu);
    }
  }

  tabs(e) {
    const tabName = $(e.currentTarget).data('tab');
    $('.custom-menu__tabs li').add('.custom-menu__content').removeClass('active');
    $(e.currentTarget).add(tabName).addClass('active');

    ScrollEvents.scrollNavDisplay();
    this.updateScrollBar();
  }

  tapMenu = (e) => {
    const $el = $('.custom-menu__content');
    const $tar = $(e.currentTarget).next().next();
    const $tapNav = $('.custom-menu__tap');
    const $tapTar = $(e.currentTarget).next();

    $el.removeClass('active');
    $tar.addClass('active');
    $tapNav.removeClass('is-hidden');
    $tapTar.addClass('is-hidden');
  }

  imageModal = (e) => {
    const $el = $(e.currentTarget);
    const $tar = $el.find('svg');

    this.modalImage = document.createElement('div');
    this.modalImage.className = 'zoomed-image';
    this.modalImage.innerHTML = $tar.parent().html();
    this.modalImage.addEventListener('click', this.imageModalClose);

    TweenMax.set('.js-base-display', { opacity: 0 });

    document.body.appendChild(this.modalImage);
  }

  imageModalClose = () => {
    this.modalImage.removeEventListener('click', this.imageModalClose);
    TweenMax.set('.js-base-display', { opacity: 1 });
    TweenMax.to(this.modalImage, 0.4, {
      opacity: 0,
      onComplete: () => {
        document.body.removeChild(this.modalImage);
      },
    });
  }

  modals = (e) => {
    e.preventDefault();

    const $tar = $(e.currentTarget);
    const modal = $tar.data('modal');
    const alphaVal = !$tar.hasClass('active') ? 1 : 0;

    $tar.toggleClass('active');
    TweenMax.to(modal, 0.4, { autoAlpha: alphaVal });

    const modalClose = () => {
      $tar.removeClass('active');
      TweenMax.to(modal, 0.4, { autoAlpha: 0 });
      $('.content').off(window.eventtype, modalClose);
    };

    $('.content').on(window.eventtype, ':not(.modal)', modalClose);
  }

  rotation(e) {
    spinner.in();

    const $tar = e ? $(e.currentTarget) : $('.js-rotation');
    const data = $tar.data('svg');
    const rotationDir = $tar.data('rotation');

    const svg = rotationDir === 'front' ? '_back.svg' : '.svg';
    const dir = rotationDir === 'front' ? 'back' : 'front';
    const markInfo = rotationDir === 'front' ? 'markB' : 'markA';
    const $directionTab = $(`.custom-menu__tab[data-rotation="${dir}"]`);

    const storageKey = JSON.parse(localStorage.getItem(this.pageID));
    const key = storageKey[markInfo];
    const key2 = storageKey[`${markInfo}2`];

    const callback = () => {
      this.itemSize();
      this.restyle();
      Component.component.MarkText.markTextToCanvas(key, 1);
      if (key2) Component.component.MarkText.markTextToCanvas(key2, 2);
      spinner.out();
      $('.custom-menu__tab[data-rotation]').removeClass('active');
      $directionTab.addClass('active');
    };

    $('.js-base-display').load(`${uploadPath}${data}${svg}`, () => {
      callback();
      $tar.text(rotationDir.toUpperCase());
    });

    $tar.data('rotation', dir);
  }

  markSetAsStart() {
    const { mark, pos } = getUrlVars();

    // add mark text info at start
    if (mark && mark !== '') {
      const text = $('.js-mark-text').val();

      Component.storageValue.mark = text;
      Component.orderLink.mark = text;
    }

    // apply if there are queries
    if (pos && pos !== '') {
      // set initial localStrage
      if (mark && mark !== '') {
        OrderMenu.orderInfo();
      }

      this.reloadPage();
    } else {
      // apply no-mark option to dom and localStrage
      const $el = $('.js-mark-condition .active');
      Component.component.MarkCondition.setData($el);
    }

    if ($('.js-mark-family input:checked').data('max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
    }
  }

  markTab = (e) => {
    const target = $(e.currentTarget).data('tab');

    $('.js-custom-pick-tab').add('.js-mark-tab-trigger').removeClass('active');
    $(target).add(e.currentTarget).addClass('active');
  }

  itemSize = () => {
    const $container = $('.js-base-display');
    const $el = $container.find('svg');
    const viewBox = ($el) ? $el[0].viewBox.baseVal : '';
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (!viewBox) {
      $el.css('width', windowWidth * 0.4);
    }

    if (viewBox.height > viewBox.width) {
      $el.css('height', windowHeight * 0.525);
    } else {
      $el.css('width', windowWidth * 0.4);
    }
  }

  reloadPage() {
    const vars = getUrlVars();
    const { pos, font, col, markA, markB, markB2 } = vars;
    const $posEl = pos ? $('.js-mark-position').find(`*[data-pos="${pos}"]`) : $('.js-mark-position .active');
    const $fontEl = font ? $('.js-mark-family li').find(`*[data-code="${String(font)}"]`) : $('.js-mark-family input:checked');
    const $colEl = col ? $('.js-colour--mark').find(`*[data-code="${col}"]`) : $('.js-colour--mark').find('li.active');
    const line = !markB2 ? 1 : 2;

    Component.component.MarkPosition.setData($posEl);
    Component.component.MarkFamily.setData($fontEl);
    this.changeColours($colEl);

    if (markA || markB) Component.component.MarkText.markTextToCanvas(null, line);
  }
}

Component.SimulationCommon = SimulationCommon;
