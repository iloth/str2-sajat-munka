/* eslint-disable */

$(document).on('click', '.navbar a[href^="#"]', function (event) {
  event.preventDefault();

  const target = $(this).attr('href');
  let offset = $('body').offset();
  if (target !== '#') {
    offset = $(target).offset();
  }

  $('html, body').animate({
    scrollTop: offset.top
  }, 300);
});

$(document).on('click', 'footer a', function (event) {
  event.preventDefault();

  const target = $(this).data('target');
  $(target).modal();

});

