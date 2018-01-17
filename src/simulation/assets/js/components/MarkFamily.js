import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';

export default class MarkFamily extends Component {
  constructor(props) {
    super(props);

    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.js-mark-family').on('change', 'input', (e) => {
      const $el = $(e.currentTarget);
      this.setData($el);
    });
  }

  setData($e) {
    $('.js-mark-text').toggleClass('disabled', $e.data('max-lang') === 'en');
    const cate = $('.js-mark-family').data('cate');

    this.getMarkData().then((data) => {
      const { family, position, colour } = data;
      const font = family ? family.replace('.mrk', '') : '';

      // initialise input
      $('.js-mark-family input').prop('checked', false);
      $('.js-mark-family li').removeClass('active');
      $e.prop('checked', true);
      $e.parent().addClass('active');

      $.each(this.markOptions, (index, el) => {
        const $container = $(`#position-${el}`);
        const $path = $container.children().find('path');
        TweenMax.set($path, { fill: 'none' });
      });

      if (position) {
        const $container = $(`#position-${position.toLowerCase()}`);
        const $path = $container.children(family).find('path');
        TweenMax.set($path, { fill: colour });
      }

      // update localStrage and the order link
      this.orderLinkChange(cate, font);
      Component.storageValue[cate] = font;
      this.setLocalStrage();
    });
  }
}

Component.MarkFamily = MarkFamily;
