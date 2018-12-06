//------------------------------------
// 全角数字・ハイフンを半角に変換
//------------------------------------
var hankakuConvert = function(text) {
  return text.replace(/[０-９－]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  });
};

// ------------------------------------
// 特殊記号削除
// ------------------------------------
var removeSpecialCharacter = function(text) {
  // とりあえずタブ記号の削除のみ。必要になった際に追加していく。
  return text.replace(/\t+/g, "");
};

// ------------------------------------
// 指定フォーマットによるハイフン自動補完
// ------------------------------------
var insertHyphen = function(regexp, replaceText, value) {
  return value.replace(regexp, replaceText);
};

// ------------------------------------
// エンター時のsubmit禁止処理
// ------------------------------------
var enterPrevent = function() {
  if (event.which == 13) {
    event.preventDefault();
    return false;
  }
};

// ------------------------------------
// 二重サブミット防止(複数ボタン版)
// ------------------------------------
function disableDoubleClickArray($form, $buttonArrays) {
  $form.submit(function() {
    for (var i = 0; i < $buttonArrays.length; i++) {
      $($buttonArrays[i]).prop("disabled", true);
    }
  });
}

// ------------------------------------
// 二重サブミット防止(単一ボタン版)
// ------------------------------------
function disableDoubleClick($form, $button) {
  $form.submit(function() {
    $($button).prop("disabled", true);
  });
}

$(function() {
  // ------------------------------------
  // 「クリアボタン付きinput」フィールド_focus,blur
  // ------------------------------------
  $('.has-clear input[type="text"]').on('focus input', function() {
    var $this = $(this);
    var visible = Boolean($this.val());
    $this.siblings('.control-clear').toggleClass('hidden', !visible);
  }).on('blur', function() {
    $(this).siblings('.control-clear').addClass('hidden');
  }).trigger('propertychange');

  // ------------------------------------
  // 「inputのクリア」ボタン_mousedown
  // ------------------------------------
  $('.control-clear').on('mousedown', function() {
    return false;
  }).click(
      function() {
        $(this).siblings('input[type="text"]').val('')
            .trigger('propertychange').focus();
      });
});