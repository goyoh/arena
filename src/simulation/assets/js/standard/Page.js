import $ from 'jquery';
import imagesLoaded from 'imagesloaded';

import { scrollEvents, orderMenu, popups } from './Components';
import { mobilecheck, getSize } from './globals';
import { loaderProgress, loaderOut } from './Loader';
import SimulationCommon from './App';


export default class Page {
  constructor() {
    this.$view = $('.main');
  }

  events = () => {
    $(document).on(window.eventtype, '.js-popup-trigger', (event) => {
      popups.popup(event);
    });
    $(document).on(window.eventtype, '.js-popup-close', (event) => {
      popups.popupClose(event);
    });
  };

  render() {
    this.preLoad().then(() => {
      this.events();

      getSize();

      scrollEvents.topScroll();
      scrollEvents.scrollNav();
      scrollEvents.scrollNavDisplay();
      scrollEvents.scrollBottom();

      const pageName = this.$view.data('page');

      if (pageName !== 'Home') {
        // loaderOut();
        const simulation = new SimulationCommon();
        simulation.default();

        orderMenu.styleRegistration();
        orderMenu.orderSheet();
        orderMenu.orderInfoShow();
        orderMenu.orderLinkMake();
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

