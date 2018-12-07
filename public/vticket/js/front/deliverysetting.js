$(function() {
  // ------------------------------------
  // inputフィールド_Enter
  // ------------------------------------
  $("#deliveryPostcode").keyup(function(e) {
    // Tab遷移時に入力済みの内容が消えてしまう為、jpostalのkeyupイベントを無効にしている
    e.stopImmediatePropagation();
  });

  // ------------------------------------
  // 「郵便番号」フィールド_jpostalの設定
  // ------------------------------------
  $('#deliveryPostcode').jpostal({
    postcode : [ '#deliveryPostcode' ],
    address : {
      '#deliveryAddress1' : '%3%4%5',
      '#deliveryAddress2' : ''
    },
    url : {
      'http' : '/vticket/js/json/',
      'https' : '/vticket/js/json/'
    }
  });
});