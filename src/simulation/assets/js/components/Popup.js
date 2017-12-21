import $ from 'jquery';
import { TweenMax } from 'gsap';

const Popup = {
  popup: (e) => {
    e.preventDefault();

    this.popupTar = $(e.currentTarget).data('popup');

    TweenMax.to(this.popupTar, 0.4, { y: '0%' });
  },

  popupClose: (e) => {
    e.preventDefault();
    TweenMax.to(this.popupTar, 0.4, { y: '100%' });
  },
};

export default Popup;
