export default class markPosition extends Base {
  constructor(props) {
    super(props);
  }

  setData(event) {
    const $tarEl = (event.currentTarget) ? $(event.currentTarget) : event;
    const cate = $tarEl.parents('ul').attr('data-cate');
    const side = $tarEl.attr('data-side');

    $('.js-mark-pos a').removeClass('active');
    $tarEl.addClass('active');

    this.getMarkData().then((data) => {  
      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (data.position) {
        const tar = `#position-${data.position.toLowerCase()}`;
        const $el = $(tar).children(data.family).find('path');
        TweenMax.set($el, { fill: data.colour });

        $('.js-colour--mark').attr('data-target', tar);

        // rotation the item if the mark is positioned on the opposite side
        if (side !== data.rotation) this.rotation();
      }

      //update localStrage and the order link
      this.orderLinkChange(cate, pos);
      strageValue[cate] = pos;
      this.setLocalStrage();
    });
  }
}
