// ------------------------------------
// カンマ区切り文字列のSplit
// ------------------------------------
var commaSplit = function(str) {
  return !str ? [] : str.split(',');
};

// ------------------------------------
// 「ページング」リンク_クリック
// ------------------------------------
var pageClick = function(page) {
  $("#page").val(page);

  $("#search-form").submit();
};

// ------------------------------------
// 「商品区分」リンク_クリック
// ------------------------------------
var divisionClick = function(divisionId) {
  // ページング情報クリア
  $("#page").val("");
  // チケット情報クリア
  $("#t").val("")
  // キーワード検索クリア
  $("#k").val("");
  // カテゴリクリア
  $("#c").val("");

  $("#menu").val(divisionId);

  $("#search-form").submit();
};

// ------------------------------------
// 「チケット」リンク_クリック
// ------------------------------------
var ticketClick = function(ticketNumber) {
  // ページング情報クリア
  $("#page").val("");

  // 利用券枚数のカンマ区切りパラメータを一度配列に格納して、パラメータ付加対象とするかチェックを行う
  var array = commaSplit($("#t").val());

  var idx = $.inArray(ticketNumber.toString(), array);
  if (idx >= 0) {
    // 選択された利用券枚数が存在する場合、選択解除の為リストから削除
    array.splice(idx, 1);
  } else {
    // 存在しない場合、パラメータに追加
    array.push(ticketNumber);
  }

  // 配列をカンマ区切り文字列に戻しGETパラメータとする
  var param = array.join(',');
  $("#t").val(param);

  $("#search-form").submit();
};

// ------------------------------------
// 検索結果0件時「枚数指定をやめる」リンク_クリック
// ------------------------------------
var clearTicketClick = function() {
  // ページング情報クリア
  $("#page").val("");
  // 利用券枚数絞り込み検索情報クリア
  $("#t").val("");

  $("#search-form").submit();
};

$(function() {

  // ------------------------------------
  // 「検索キーワード」フィールド_チェンジ
  // ------------------------------------
  $(document).on("change", "#k", function() {

    // 先頭と末尾のトリムを行う
    $(this).val($.trim($(this).val()));
  });

  // ------------------------------------
  // 「検索」ボタン_クリック
  // ------------------------------------
  $(document).on("click", "#search-btn", function() {

    // ページング情報クリア
    $("#page").val("");

    $("#search-form").submit();
  });

  // ------------------------------------
  // 「search-form」サブミット
  // ------------------------------------
  $(document).on("submit", "#search-form", function(event) {
    // サブミットをキャンセルする。
    event.preventDefault();
    // 空のクエリパラメータを除外する
    var query = $("#search-form :input").filter(function() {
      return $.trim(this.value);
    }).serialize();
    location.href = this.action + '?' + query;
  });
});