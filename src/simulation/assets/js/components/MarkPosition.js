import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';

export default class MarkPosition extends Component {
  constructor(props) {
    super(props);
    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.js-mark-position').on(window.eventtype, 'a', (e) => {
      e.preventDefault();
      const $el = $(e.currentTarget);
      this.setData($el);
    });
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

  setData($e) {
    const $current = $('.custom-menu__tab.active');
    const cate = $e.parents('.js-mark-position').data('cate');

    $current.find('.js-mark-position a').removeClass('active');
    $e.addClass('active');

    this.getMarkData().then((data) => {
      const { position, family, colour } = data;

      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (position) {
        const tar = `#position-${position.toLowerCase()}`;
        const $path = $(tar).children(family).find('path');
        TweenMax.set($path, { fill: colour });

        $current.find('.js-colour--mark').data('target', tar);
        $current.find('.js-colour--edge').data('target', tar);

        this.toggleTextOption(position);
        this.inActivateFont(position);
      }

      // update localStrage and the order link
      this.orderLinkChange(cate, position);
      Component.storageValue[cate] = position;
      this.setLocalStrage();
    });
  }
}

Component.MarkPosition = MarkPosition;
