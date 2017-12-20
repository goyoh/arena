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

  setData($e) {
    const cate = $e.parents('ul').data('cate');
    const side = $e.data('side');

    $('.js-mark-position a').removeClass('active');
    $e.addClass('active');

    this.getMarkData().then((data) => {
      const { position, family, colour, rotation } = data;

      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (position) {
        const tar = `#position-${position.toLowerCase()}`;
        const $path = $(tar).children(family).find('path');
        TweenMax.set($path, { fill: colour });

        $('.js-colour--mark').data('target', tar);

        // rotation the item if the mark is positioned on the opposite side
        if (side !== rotation) this.rotation();
      }

      // update localStrage and the order link
      this.orderLinkChange(cate, position);
      Component.storageValue[cate] = position;
      this.setLocalStrage();
    });
  }
}

Component.MarkPosition = MarkPosition;
