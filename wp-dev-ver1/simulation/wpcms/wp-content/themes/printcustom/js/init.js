(function ($) {
  "use strict";

  var str_prefix = "色番:";
  var str_colorcode;
  var json_colour_collection;

  $.ajax({
    type: 'GET',
    url: endpoints['post'],
    dataType: 'json'
  }).then(
    function(json) {
      json_colour_collection = json[0]['meta']['codes'];
    },
    function() {
      console.log('Error : json');
    }
  );
  

  // DOM Content Loaded
  $(document).ready(function () {

    $('.custom-pick__list.js-wear-type > li.abreast').on('click', 'a', function(e){
      e.preventDefault();
      str_colorcode = $('#colour-code').text().replace(str_prefix, '');
      window.location.href = $(this).attr('href') + '?bcol=' + str_colorcode;
    });

    $('.custom-display-core').on('click', 'svg', function(e){
      var modal = $('#zoomed-image');
      $('svg', modal).remove();
      $(this).clone(true, false).appendTo(modal);
      modal.show().find('svg').on('click', function(e){
        $(this).parent().hide();
      });
    });

// :radio
    $('input[name=custom-font]').change(function() {
      var pattern = null;
      if( $(this).val() == '.mrk106' ) {
        pattern = '^([A-Z0-9]|[\s])+$';
        $('.js-mark-text').attr('pattern', pattern);
        if($('.custom-pick__input').get(0).checkValidity()){
          $('.js-mark-submit').prop("disabled", false);
        } else {
          $('.custom-pick__input').get(0).reportValidity();
          $('.js-mark-submit').prop("disabled", true);
        }
      } else {
        $('.js-mark-text').removeAttr('pattern');
        $('.js-mark-submit').prop("disabled", false);
      }
    });
    $('.js-mark-text').on('input', function(event) {
      if(this.form.checkValidity()){
        $('.js-mark-submit').prop('disabled', false);
      } else {
        this.form.reportValidity();
        $('.js-mark-submit').prop('disabled', true);
      }
    });
    $('.js-mark-submit').on('click', function(event) {
      if(this.form.checkValidity()){
        $('.js-mark-submit').prop("disabled", false);
      } else {
        event.preventDefault();
        this.form.reportValidity();
        $('.js-mark-submit').prop("disabled", true);
      }
    });

  });

  // All Resources Loaded
  $(window).on('load', function () {

    var add_colour_collection = setInterval(function(){
      if($('#colour-code').length){
        $('#colour-code').before("<p id=\"colour-collection\" class=\"colour-code u-text-left\"><small></small></p>").parent().addClass('clear');
        update_colour_collection();
        clearInterval(add_colour_collection);
      }
    }, 1000);

    var update_colour_collection = function(){
      setInterval(function(){
        var colour_collection = json_colour_collection[$('#colour-code').text().replace(str_prefix, '')];
        var str_colour_collection =  '';
        $.each(colour_collection, function(index, value) {
          str_colour_collection += value['label'];
          if( index != colour_collection.length - 1 ){
            str_colour_collection += ' × ';
          }
        });
        $('#colour-collection > small').text(str_colour_collection);
      }, 1000);
    };

  });

})(jQuery);
