// Handsontable関連の共通処理
var hot;
var checkOK = 'データチェックOK';
var checkOKInsert = "[新規]データチェックOK";
var checkOKUpdate = '[更新]データチェックOK';
var updateOK = '更新成功';
var registerOK = '登録成功';
var registerOKInsert = "[新規]登録成功";
var registerOKUpdate = '[更新]登録成功';
//var ajaxBaseURL = '/vticket/backyard/order/ajax/';
var ajaxBaseURL = '';

// 処理結果のValidator作成
function initValidator() {
	return function(value, callback) {
		if((value === null) || (value == '') || (value == registerOK) || (value == checkOK) || (value == updateOK)
				|| (value == checkOKInsert) || (value == checkOKUpdate)
				|| (value == registerOKInsert) || (value == registerOKUpdate)) {
			callback(true);
		} else {
			callback(false);
		}
	};
}

// セルのRenderer作成(処理結果がNGなら行全体を赤色にする)
function initRenderer(maxCols) {
	return function(instance, td, row, col, prop, value, cellProperties) {
		Handsontable.renderers.TextRenderer.apply(this, arguments);
		if(value === null) {
			// 処理結果が空なら何もしない
		} else if((value == registerOK) || (value == checkOK) || (value == updateOK)
				|| (value == checkOKInsert) || (value == checkOKUpdate)
				|| (value == registerOKInsert) || (value == registerOKUpdate)) {
			$(td).removeClass('htDimmed');
				td.style.background='#dff0d8';
			for(var i = 0; i < maxCols; i++) {
				var td1 = instance.getCell(row, i);
					if(td1 != null)	td1.style.background = '#dff0d8';
			}
		} else {
			// エラーの場合
			$(td).removeClass('htInvalid');
			$(td).removeClass('htDimmed');
			td.style.background = '#f2dede';
			for(var i = 0; i < maxCols; i++) {
				var td1 = instance.getCell(row, i);
					if(td1 != null)	td1.style.background = '#f2dede';
			}
		}
	}
}

// データチェックボタンクリック時
$(function() {
	$('#btn_ajax_check').click(function(e) {
		// 処理結果を非表示にする
		hiddenDisplayRecords();

		// ウェイト画像表示
		$.blockUI({
			message: $('#displayBox'),
			css: {
				top:  ($(window).height() /2) -50 + 'px',
				left: ($(window).width() /2) -50 + 'px',
				width: '100px',
				border: 'none'
			}
		});
		// 呼び出し元のチェック処理をコール
		checkToServer();
	});
});

// サーバ側でデータチェック処理実施
function sendAndCheckData(ajaxurl, jsondata) {
	var xsrf = Cookies.get('XSRF-TOKEN');
	$.ajax({
		url  : ajaxBaseURL + ajaxurl,
		type : "POST",
		data : jsondata,
		cache	   : false,
		processData : false,
		contentType : "application/json",
		dataType	: "text",
		headers: { 'X-XSRF-TOKEN': xsrf }
	})
	.done(function(retdata, textStatus, jqXHR){
		$.unblockUI();

		// Handsontableを更新してバリデーション実行
		// エラーがなければ登録ボタンを有効化する(データが0件の場合は有効化しない)
		hot.loadData(JSON.parse(retdata));
		hot.validateCells(function(valid) {
			var dataCount = countAndDisplayRecords('データチェック件数');
			if(valid && dataCount > 0) {
				$('#btn_ajax_register').show();
			} else {
				$('#btn_ajax_register').hide();
			}
		});
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		$.unblockUI();
		window.alert("サーバとの通信に失敗しました。");
	});
}

// 登録ボタンクリック時
$(function() {
	$('#btn_ajax_register').click(function(e) {
		// セルのバリデーション
		hot.validateCells( function(valid) {
			if(valid) {
				// OKならサーバへデータ送信
				if(confirm('上記内容で処理を実行しますか？')) {
					// 処理結果を非表示にする
					hiddenDisplayRecords();

					$.blockUI({
						message: $('#displayBox'),
						css: {
							top:  ($(window).height() /2) -50 + 'px',
							left: ($(window).width() /2) -50 + 'px',
							width: '100px',
							border: 'none'
						}
					});
					// 呼び出し元の登録処理をコール
					registerToServer();
				}
			} else {
				// バリデーションNGのため送信しない
				window.alert('入力内容に不備があります。赤色の項目を修正してください。');
			}
		});
	});
});

// サーバ側でデータ登録処理実施
function sendAndRegisterData(ajaxurl, jsondata) {
	var xsrf = Cookies.get('XSRF-TOKEN');
	$.ajax({
		url  : ajaxBaseURL + ajaxurl,
		type : "POST",
		data : jsondata,
		cache	   : false,
		processData : false,
		contentType : "application/json",
		dataType	: "text",
		headers: { 'X-XSRF-TOKEN': xsrf }
	})
	.done(function(retdata, textStatus, jqXHR){
    $.unblockUI();

	  // 他のユーザが実行中の場合は空文字が返ってくる
	  if(retdata == "") {
	    window.alert("現在他のユーザが実行中です。\nしばらく経ってから再度実行してください。");
	  } else {
  		// 登録後は何もできないようボタンを無効化する
  		$('#btn_ajax_register').hide();
  		$('#btn_ajax_check').hide();

  		// Handsontableを更新してバリデーション実行
  		// エラーがある場合はエラーデータだけでリトライボタンを表示する
  		hot.loadData(JSON.parse(retdata));
  		hot.validateCells(function(valid) {
  			countAndDisplayRecords('データ処理件数');
  			if(valid) {
  				window.alert('サーバでの処理が完了しました。');
  			} else {
  				$('#btn_error_retry').show();
  				window.alert('サーバでの処理が完了しましたが、エラーが発生しています。\nエラー内容を確認してください。\n\n「エラー行を再登録する」ボタンをクリックすると、成功した行を削除して再度データチェックから実行できます。');
  			}
  		});
	  }
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		$.unblockUI();
		window.alert("サーバとの通信に失敗しました。");
	});
}

// 処理結果を非表示にする
function hiddenDisplayRecords() {
	$('#displayResult').html('');
	$('#displayResult').removeClass('alert alert-success alert-danger');
}

// 処理結果をチェックし、エラー件数を表示する
function countAndDisplayRecords(message) {
	var success = 0;
	var error = 0;
	var total = 0;
	var insert = 0;
	var update = 0;

	for(var i = 0; i < hot.countRows(); i++) {
		var value = hot.getDataAtCell(i, resultCol);
		if (value === null) {
			// 処理結果が空ならカウントしない
		} else if ((value == registerOK) || (value == checkOK) || (value == updateOK)) {
			success++;
		} else if ((value == checkOKInsert) || (value == registerOKInsert)) {
			insert++;
			success++;
		} else if ((value == checkOKUpdate) || (value == registerOKUpdate)) {
			update++;
			success++;
		} else {
			error++;
		}
	}
	total = success + error;
	if(error > 0) {
		$('#displayResult').addClass('alert alert-danger');
		if (insert > 0 || update > 0) {
			 $('#displayResult').html('<span><strong>' + message + '：' + total + ' 件　(成功：' + success + ' 件　新規：' + insert + ' 件　更新：' + update + ' 件　エラー：' + error + ' 件)</strong></span>');
		} else {
			$('#displayResult').html('<span><strong>' + message + '：' + total + ' 件　(成功：' + success + ' 件　エラー：' + error + ' 件)</strong></span>');
		}
	} else {
		$('#displayResult').addClass('alert alert-success');
		if (insert > 0 || update > 0) {
			 $('#displayResult').html('<span><strong>' + message + '：' + total + ' 件　(成功：' + success + ' 件　新規：' + insert + ' 件　更新：' + update + ' 件　エラー：' + error + ' 件)</strong></span>');
		} else {
			$('#displayResult').html('<span><strong>' + message + '：' + total + ' 件　(成功：' + success + ' 件　エラー：' + error + ' 件)</strong></span>');
		}
	}
	return total;
}

// エラー行のみで再登録ボタンクリック時
$(function() {
	$('#btn_error_retry').click(function(e) {
		// 処理結果を非表示にする
		hiddenDisplayRecords();

		var jsonData = hot.getSourceData();
		var newData = [];
		for(var i in jsonData) {

			// 更新画面では結果がhなのでこちらにも対応
		  value = jsonData[i].r;
		  if(value == null) {
			  value = jsonData[i].i;
		  }
		  if(value == null) {
			  value = jsonData[i].h;
		  }

		  if(!(value == registerOK || value == checkOK || value === null || value == updateOK
				  || value == checkOKInsert || value == checkOKUpdate
				  || value == registerOKInsert || value == registerOKUpdate)) {
			  // エラー行のみを新データにセット
			  newData.push(jsonData[i]);
		  }
		}

		// Handsontableに新データをセット
		hot.loadData(newData);

		// 自身を非表示にし、データチェックボタンを表示する
		$('#btn_error_retry').hide();
		$('#btn_ajax_check').show();
	});
});

// 注文詳細、会員検索画面で使用
// メモ追加ボタンクリック時
$(function() {
	$('#btn_add_memo').click(function(e) {
		if($('#newMemo').val() == '') {
			window.alert('メモを入力してください。');
			return false;
		}

		if(confirm('共有メモを追加しますか？')) {
			var postData = createPostData();
			var xsrf = Cookies.get('XSRF-TOKEN');
			$.ajax({
				url  : serverBaseURL + '/order/ajax/add_memo',
				type : "POST",
				data : postData,
				cache	   : false,
				processData : false,
				dataType	: "text",
				headers: { 'X-XSRF-TOKEN': xsrf }
			})
			.done(function(retdata, textStatus, jqXHR){
				if(retdata != 'OK') {
					window.alert(retdata);
				} else {
			    location.href = getAfterUrl();
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				window.alert("サーバとの通信に失敗しました。");
			});
		} else {
			return false;
		}
	});
});

