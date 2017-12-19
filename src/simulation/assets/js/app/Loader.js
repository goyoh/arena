import $ from 'jquery';
import { TweenMax } from 'gsap';

const loaderProgress = (amount) => {
  const val = Math.round(amount);
  $('.js-loader-count').html(val);
};

const loaderOut = () => {
  TweenMax.to('.loader', 0.6, { autoAlpha: 0 });
};

const spinner = {
  in: () => {
    this.el = {
      spinner: document.createElement('div'),
      inner: document.createElement('span'),
    };

    this.el.spinner.className = 'spinner';
    this.el.inner.className = 'spinner__inner';

    this.el.spinner.appendChild(this.el.inner);
    document.body.appendChild(this.el.spinner);

    TweenMax.to(this.el.spinner, 0.4, { opacity: 1 });
  },

  out: () => {
    TweenMax.to(this.el.spinner, 0.4, {
      opacity: 0,
      onComplete: () => {
        document.body.removeChild(this.el.spinner);
      },
    });
  },
};

export { loaderProgress, loaderOut, spinner };
