import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, getUrlVars } from '../../app/globals';
import { loaderOut, spinner } from '../../app/Loader';
import Component from '../Component';

import ScrollEvents from '../ScrollEvents';
import OrderMenu from '../OrderMenu';

import BaseColour from './BaseColour';

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
          onComplete: () => { loaderOut(); },
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

    $('.js-colour--edge').on(window.eventtype, 'li', (e) => {
      this.changeColours(e);
      return false;
    });

    $('.custom-menu__tabs').on(window.eventtype, 'li', this.tabs);

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

  tabs = (e) => {
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

  toggleTextOption = (pos) => {
    const $container = $('.js-mark-text[data-line="2"]').parent();
    const $submitAlt = $('.js-mark-submit--above');

    if (pos === 'W') {
      TweenMax.to($container, 0.4, { autoAlpha: 1 });
      TweenMax.to($submitAlt, 0.4, { autoAlpha: 0 });
    } else {
      TweenMax.to($container, 0.4, { autoAlpha: 0 });
      TweenMax.to($submitAlt, 0.4, { autoAlpha: 1 });
    }
  }

  rotation(e) {
    spinner.in();

    const $tar = e ? $(e.currentTarget) : $('.custom-direction .js-rotation');
    const svgData = $tar.data('svg');
    const rotationDir = $tar.data('rotation');
    const tarDir = rotationDir === 'front' ? 'back' : 'front';

    const $directionTab = $(`.custom-menu__tab[data-rotation="${tarDir}"]`);

    const storageKey = JSON.parse(localStorage.getItem(this.pageID));
    const markTar = rotationDir === 'front' ? 'markB' : 'markA';

    const key = storageKey[markTar];
    const key2 = storageKey[`${markTar}2`];
    const line = key2 ? 2 : '';
    const text = [key2, key];

    const callback = () => {
      this.itemSize();
      this.restyle();

      if (Component.component.MarkText) {
        this.getMarkData().then((data) => {
          Component.component.MarkText.markTextToCanvas(text, line, data);
          this.toggleTextOption(data.position);
          this.inActivateFont(data.position);
          spinner.out();
        });
      } else {
        spinner.out();
      }
    };

    const svg = rotationDir === 'front' ? '_back.svg' : '.svg';

    $('.js-rotation').data('rotation', tarDir).attr('data-rotation', tarDir);
    $('.js-rotation').text(rotationDir.toUpperCase());
    $('.custom-menu__tab[data-rotation]').removeClass('active');
    $directionTab.addClass('active');

    $('.js-base-display').load(`${uploadPath}${svgData}${svg}`, () => {
      callback();
    });
  }

  markSetAsStart() {
    const { markA, posA } = getUrlVars();
    const $current = $('.custom-menu__tab.active');

    // add mark text info at start
    if (markA && markA !== '') {
      const text = $current.find('.js-mark-text').val();

      Component.storageValue.markA = text;
      Component.orderLink.markA = text;
    }

    // apply if there are queries
    if (posA && posA !== '') {
      // set initial localStrage
      if (markA && markA !== '') {
        OrderMenu.orderInfo();
      }

      this.reloadPage();
    } else {
      // apply no-mark option to dom and localStrage
      const $el = $('.js-mark-condition .active');
      Component.component.MarkCondition.setData($el);
    }

    if ($current.find('.js-mark-family input:checked').data('max-lang') === 'en') {
      $current.find('.js-mark-text').addClass('disabled');
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
  };

  reloadPage() {
    const vars = getUrlVars();
    const { posA, fontA, colA, ecolA, markA, markB, markB2 } = vars;
    Component.storageValue.posA = posA;
    Component.storageValue.fontA = fontA;
    Component.storageValue.colA = colA;
    Component.storageValue.ecolA = ecolA;
    Component.storageValue.markA = markA;
    Component.storageValue.markB = markB;
    Component.storageValue.markB2 = markB2;

    const $current = $('.custom-menu__tab.active');

    const $posEl = $current.find('.js-mark-position');
    const $pos = posA ? $posEl.find(`*[data-pos="${posA}"]`) : $posEl.find('.active');

    const $fontEl = $current.find('.js-mark-family');
    const $font = fontA ? $fontEl.find(`*[data-code="${String(fontA)}"]`) : $fontEl.find('input:checked');

    const $colEl = $current.find('.js-colour--mark');
    const $col = colA ? $colEl.find(`*[data-code="${colA}"]`) : $colEl.find('li.active');

    const $ecolEl = $current.find('.js-colour--edge');
    const $ecol = ecolA ? $ecolEl.find(`*[data-code="${ecolA}"]`) : $ecolEl.find('li.active');

    const line = !markB2 ? '' : 2;

    Component.component.MarkPosition.setData($pos);
    Component.component.MarkFamily.setData($font);
    this.changeColours($col);
    this.changeColours($ecol);

    if (markA) {
      const text = [markA];
      Component.component.MarkText.markTextToCanvas(text, line);
    }
  }
}
