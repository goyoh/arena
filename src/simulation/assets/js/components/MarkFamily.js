export default class markFamily extends Base {
  constructor(props) {
    super(props);
  }

  setData(event) {
    const $tarEl = (event.currentTarget) ? $(event.currentTarget) : event;

    // initialise input
    $('.js-mark-family input').prop('checked', false);
    $('.js-mark-family li').removeClass('active');

    if ($tarEl.data('max-lang') == 'en') {
      $('.js-mark-text').addClass('disabled');
    } else {
      $('.js-mark-text').removeClass('disabled');
    }

    this.getMarkData().then((data) => {
      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (data.pos) {
        const tar = `#position-${data.pos.toLowerCase()}`;
        const $el = $(tar).children(data.family).find('path');
        TweenMax.set($el, { fill: data.colour });
      }

      //update localStrage and the order link
      this.orderLinkChange('font', data.family);
      Base.storageValue['font'] = data.family;
      this.setLocalStrage();
    });
  }
}
