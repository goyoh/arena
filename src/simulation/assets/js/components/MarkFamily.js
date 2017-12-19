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
      this.setData(e);
    });
  }

  setData(e) {
    const $tarEl = (e.currentTarget) ? $(e.currentTarget) : e;

    if ($tarEl.data('max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
    } else {
      $('.js-mark-text').removeClass('disabled');
    }

    this.getMarkData().then((data) => {
      const font = data.family.replace('.mrk', '');
      // initialise input
      $('.js-mark-family input').prop('checked', false);
      $('.js-mark-family li').removeClass('active');
      $tarEl.prop('checked', true);
      $tarEl.parent().addClass('active');

      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (data.position) {
        const tar = `#position-${data.position.toLowerCase()}`;
        const $el = $(tar).children(data.family).find('path');
        TweenMax.set($el, { fill: data.colour });
      }

      // update localStrage and the order link
      this.orderLinkChange('font', font);
      Component.storageValue.font = font;
      this.setLocalStrage();
    });
  }
}

Component.MarkFamily = MarkFamily;
