// 在庫編集画面で使用するJavascript
// 関連在庫列を追加する
function addNewRelatedRow() {
	var tagName = 'related' + currentIdx;
	var fieldName = 'relatedItems[' + currentIdx + ']';

	$('#relatedStockTable > tbody').append('<tr id="relatedStockTr' + currentIdx + '"><td><table class="table table-bordered item-stock-table"><tbody><tr><th class="vmiddle" colspan="4">関連商品'
			+ currentIdx + '<div class="pull-right"><button type="button" class="btn btn-danger btn-sm" onClick="removeRelatedRow(this);">&nbsp;関連在庫から削除&nbsp;</button></div></th></tr><tr><td class="text-right vmiddle col-md-2">商品コード&nbsp;<span class="label label-danger">必須</span><input type="hidden" id="'
			+ tagName + 'ItemId" name="'
			+ fieldName + '.itemId"/></td><td class="col-md-5"><div class="form-inline"><input type="text" class="form-control" id="'
			+ tagName + 'ItemCode" name="'
			+ fieldName + '.itemCode" maxlength="20"/><button type="button" class="btn btn-success" onClick="getItemInfo(\''
			+ tagName + '\');">&nbsp;商品情報を取得&nbsp;</button></div></td><td class="text-right vmiddle">増減数&nbsp;<span class="label label-danger">必須</span></td><td><input type="number" class="form-control" name="'
			+ fieldName + '.unitNum" min="1" max="99999"/></td></tr><tr><td class="text-right vmiddle">商品名&nbsp;</td><td colspan="3"><span id="'
			+ tagName + 'ItemName"></span></td></tr><tr><td class="text-right vmiddle">カテゴリ&nbsp;</td><td><span id="'
			+ tagName + 'CategoryName"></span></td><td class="text-right vmiddle">掲載グループ&nbsp;</td><td><span id="'
			+ tagName + 'DisplayGroupName"></span></td></tr><tr><td class="text-right vmiddle">表示区分&nbsp;</td><td><span id="'
			+ tagName + 'DisplayTypeName"></span></td><td class="text-right vmiddle">必要枚数&nbsp;</td><td><span id="'
			+ tagName + 'TicketNumber"></span></td></tr></tbody></table></td></tr>');

	currentIdx++;
};

// 関連在庫列を削除する
function removeRelatedRow(button) {
	 var row = $(button).closest("table").closest("tr").remove();
	 $(row).remove();
};

// サーバから商品情報を取得し、画面に表示する
function getItemInfoFromServer(target_ajax_url, tagName) {
	var itemCode = $('#' + tagName + 'ItemCode').val();
	if(itemCode == '') {
		alert('商品コードを入力してください。');
		return;
	}

	$.ajax({
		url  : target_ajax_url,
		type : 'GET',
		dataType : 'json',
		data : 'cd=' + itemCode,
		success: function(dto) {
			if(dto.errorMsg != null && dto.errorMsg != '') {
				clearData(tagName);
				alert(dto.errorMsg);
			} else {
				$('#' + tagName + 'ItemId').val(dto.itemId);
				$('#' + tagName + 'ItemName').text(dto.itemName);
				$('#' + tagName + 'CategoryName').text(dto.categoryName);
				$('#' + tagName + 'DisplayGroupName').text(dto.displayGroupName);
				$('#' + tagName + 'DisplayTypeName').text(dto.displayTypeName);
				$('#' + tagName + 'TicketNumber').text(dto.strTicketNumber);
			}
		},
		error: function() {
			clearData(tagName);
			alert('商品情報の取得に失敗しました。');
		}
	});
};

// 指定の商品情報表示をクリアする
function clearData(tagName) {
	$('#' + tagName + 'ItemId').val('');
	$('#' + tagName + 'ItemName').text('');
	$('#' + tagName + 'CategoryName').text('');
	$('#' + tagName + 'DisplayGroupName').text('');
	$('#' + tagName + 'DisplayTypeName').text('');
	$('#' + tagName + 'TicketNumber').text('');
};