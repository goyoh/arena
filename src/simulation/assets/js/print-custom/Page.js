import $ from 'jquery';
import imagesLoaded from 'imagesloaded';

import { mobilecheck, getSize, browserDetect } from './globals';
import { scrollEvents, orderMenu, popups } from './Components';
import { loaderProgress, loaderOut } from './Loader';
import SimulationCommon from './App';


export default class Page {
  constructor() {
    this.$view = $('.main');
  }

  addBrowserClass = () => {
    const browserName = browserDetect.toLowerCase();
    document.body.className = `${document.body.className} ${browserName}`;
  }

  loadPage() {
    const pageName = this.$view.data('page');

    if (pageName) {
      $('body').removeClass((index, className) => (className.match(/(^|\s)is-\S+/g) || []).join(' '));
      $('body').addClass(`is-${pageName.toLowerCase()}`);
    }
  }

  events = () => {
    $(document).on(window.eventtype, '.js-popup-trigger', popups.popup);
    $(document).on(window.eventtype, '.js-popup-close', popups.popupClose);
    $(document).on(window.eventtype, '.js-read-more', scrollEvents.scrollBottom);
    $(document).on(window.eventtype, '.js-scroll-link', scrollEvents.topScroll);

    $('.js-order-sheet-list').on(window.eventtype, 'li', orderMenu.orderSheetList);
    $('.js-order-info').on('click', '.js-order-info-close--sp', orderMenu.orderInfoShow);

    $('.custom-menu').on('scroll', scrollEvents.scrollNav);
    $(window).on('scroll', scrollEvents.headerReveal);

    window.onresize = getSize;
  };

  render() {
    getSize();
    this.addBrowserClass();
    this.loadPage();

    this.preLoad().then(() => {
      this.events();
      scrollEvents.scrollNavDisplay();

      const pageName = this.$view.data('page');

      if (pageName !== 'Home') {
        // loaderOut();
        const simulation = new SimulationCommon();
        simulation.default();

        orderMenu.styleRegistration();
        if (!mobilecheck()) scrollEvents.scrollBarStyle();
      } else {
        loaderOut();
      }
    });
  }

  preLoad() {
    const loadingImages = imagesLoaded(this.$view.find('.js-preload').toArray(), { background: true });

    return new Promise((resolve) => {
      $('body').addClass('load-start');
      this.loader = loadingImages;

      if (this.loader.images.length > 0) {
        this.loader.on('progress', (instance) => {
          const progress = (instance.progressedCount / instance.images.length) * 100;
          loaderProgress(progress);
        }).on('always', () => {
          $('body').removeClass('load-start').addClass('load-completed');

          resolve(true);
        });
      } else {
        loaderProgress(100);
        $('body').removeClass('load-start').addClass('load-completed');

        resolve(true);
      }
    });
  }
}

