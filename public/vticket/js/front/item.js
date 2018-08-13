$(function() {
  var carousel = $('#item_image');
  var hammer = new Hammer(carousel[0]);
  hammer.on('swipeleft', function() {
    carousel.carousel('next');
  }); // ---次に切り替え
  hammer.on('swiperight', function() {
    carousel.carousel('prev');
  }); // ---前に切り替え
});