import BaseColour from './components/BaseColour';

export default class Common extends Base {
  constructor(props) {
    super(props);

    const slug = window.location.href.split('?')[0].split('/').pop();
    this.jsonPath = `/simulation/wp-json/wp/v2/posts/?slug=${slug}`;
    
    this.events();
    this.render();
  }

  render() {
    this.setStyleByCookie();

    new BaseColour({
      jsonUrl: this.jsonPath,
      callback: () => {
        this.markSetAsStart();
        TweenMax.to('.js-base-display', 0.4, { autoAlpha: 1 });
      }
    });
  }

  events() {
    //mark events
    $('.js-colour--mark').on(eventtype, 'li', (event) => {
      this.changeColours(event);
      return false;
    });
    $('.js-mark-pick').on(eventtype, 'a', (event) => {
      this.markPick(event);
      return false;
    });
    $('.custom-pick__input').on(eventtype, '.js-mark-submit', (event) => {
      this.markText(event);
      return false;
    });
    $('.js-mark-pos').on(eventtype, 'a', (event) => {
      this.markPosPick(event);
      return false;
    });
    $('.js-mark-family').on('change', 'input', (event) => {
      this.markFamily(event);
    });

    $('.custom-menu__tabs').on(eventtype, 'li', (event)=> {
      this.tabs(event);
    });

    if (mobilecheck()) {
      $(document).on(eventtype2, '.custom-menu__head', (event) =>{
        this.tapMenu(event);
      });
    }
  }

  tabs (event) {
    const tabName = $(event.currentTarget).attr('data-tab');
    $('.custom-menu__tabs li').add('.custom-menu__content').removeClass('active');
    $(event.currentTarget).addClass('active');
    $(tabName).addClass('active');

    ScrollEvents.scrollNavDisplay();
    this.updateScrollBar();
  }

  tapMenu(event) {
    const $el = $('.custom-menu__content');
    const $tar = $(event.currentTarget).next().next();
    const $tapNav = $('.custom-menu__tap');
    const $tapTar = $(event.currentTarget).next();

    $el.removeClass('active');
    $tar.addClass('active');
    $tapNav.removeClass('is-hidden');
    $tapTar.addClass('is-hidden');
  }

  modals(event) {
    event.preventDefault();

    const modalTar = $(event.currentTarget).attr('data-modal');
    
    if (!$(event.currentTarget).hasClass('active')) {
      $(event.currentTarget).addClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 1 });
    } else {
      $(event.currentTarget).removeClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 0 });
    }

    $('.content').on(eventtype, ':not(.modal)', () => {
      this.modalClose(event.currentTarget, modalTar);
    });
  }

  modalClose(el, target) {
    $(el).removeClass('active');
    TweenMax.to(target, 0.4, { autoAlpha: 0 });
  }

  rotation (e) {
    e.preventDefault();

    const data = $('.js-rotation').data('svg');
    const rotationDir = $('.js-rotation').data('rotation');

    // front or back
    if (rotationDir === 'front') {
      $('.js-base-display').load(`${this.uploadPath}${data}_back.svg`, () => {
        this.restyle();
      });
      $('.js-rotation').data('rotation', 'back');
    } else {
      $('.js-base-display').load(`${this.uploadPath}${data}.svg`, () => {
        this.restyle();
      });
      $('.js-rotation').data('rotation', 'front');
    }
  }

  markSetAsStart() {
    const vars = getUrlVars();

    // add mark text info at start
    if (vars.mark && vars.mark !== '') {
      Base.storageValue['mark'] = vars.mark;
      Base.orderLink['mark'] = vars.mark;
    }

    // apply if there are queries
    if (vars.pos && vars.pos !== '') { 
      //set initial localStrage
      if (vars.mark && vars.mark !== '') {
        OrderMenu.orderInfo();
      }

      this.reloadPage();
    } else {
      //apply no-mark option to dom and localStrage
      this.markPick($('.js-mark-pick .active'));
    }

    if ($('.js-mark-family input:checked').data('max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
    }
  }

  markTab(event) {
    const target = $(event.currentTarget).data('tab');

    $('.js-custom-pick-tab').add('.js-mark-tab-trigger').removeClass('active');
    $(target).add(event.currentTarget).addClass('active');
  }

  markSVGRemove() {
    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { display: 'none' });
    });
  }

  markSVGShow() {
    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { display: 'inherit' });
    });
  }

  reloadPage() {
    let $posEl;
    let $familyEl;
    let $colEl;

    const vars = getUrlVars();

    if (vars.pos) {
      $posEl = $('.js-mark-pos').find(`*[data-pos=${vars.pos}]`);
    } else {
      $posEl = $('.js-mark-pos .active');
    }

    if (vars.font) {
      $familyEl = $('.js-mark-family li').find(`*[data-code=${String(vars.font)}]`);
    } else {
      $familyEl = $('.js-mark-family input:checked');
    }

    if (vars.col) {
      $colEl = $('.js-colour--mark').find(`*[data-code=${vars.col}]`);
    } else {
      $colEl = $('.js-colour--mark').find('li.active');
    }

    this.markPosPick($posEl);
    this.markFamily($familyEl);
    this.changeColours($colEl);
  }
}
