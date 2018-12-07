// ------------------------------------
// 郵便番号入力時のハイフン自動補完
// ------------------------------------
var insertHyphenOfZipCode = function(zipcode) {
  return insertHyphen(/(\d{3})(\d{4})/, "$1-$2", zipcode);
};

// ------------------------------------
// 郵便番号のフォーマット処理（半角変換＆ハイフン自動付加処理）
// ------------------------------------
var formatZipCode = function(value) {
  return insertHyphenOfZipCode(hankakuConvert(value));
};

// ------------------------------------
// 電話番号のフォーマット処理（半角変換）
// ------------------------------------
var formatTelNo = function(value) {
  return hankakuConvert(value);
};

$(function() {
  // ------------------------------------
  // 「郵便番号」フィールド_ペースト
  // ------------------------------------
  $("#deliveryPostcode").bind('paste', function(event) {
    var $this = $(this);

    // ペーストが完了するまで100ミリ秒一時停止
    setTimeout(function() {
      $this.val(formatZipCode($this.val()));
    }, 100);
  });

  // ------------------------------------
  // 「電話番号」フィールド_ペースト
  // ------------------------------------
  $("#deliveryTel").bind('paste', function(event) {
    var $this = $(this);

    // ペーストが完了するまで100ミリ秒一時停止
    setTimeout(function() {
      formatTelNo($this.val());
    }, 100);
  });

  // ------------------------------------
  // 「郵便番号」フィールド_チェンジ
  // ------------------------------------
  $("#deliveryPostcode").on('change', function() {
    $(this).val(formatZipCode($(this).val()));
  });

  // --------------------------- ---------
  // 「電話番号」フィールド_チェンジ
  // ------------------------------------
  $("#deliveryTel").on('change', function() {
    $(this).val(formatTelNo($(this).val()));
  });

  // --------------------------- ---------
  // 「input」フィールド_ロストフォーカス
  // ------------------------------------
  $("input").blur(function() {
    // 特殊記号削除&先頭と末尾空白除去
    $(this).val(removeSpecialCharacter($.trim($(this).val())));
  });
});
