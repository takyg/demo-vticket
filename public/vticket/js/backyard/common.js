// 画面上に戻る　不要？
$(function() {
    $("#page-top a").click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 'fast');
        return false;
    });
});

// キャンセルボタンクリック時(TOPへ戻る)
$(function() {
	  $('[id=btn_cancel]').click(function(e) {
	    window.location.href = serverBaseURL + '/menu';
	  });
	});

// ユーザ編集のキャンセルボタンクリック時(ユーザ一覧に戻る)
$(function() {
	  $('#btn_usr_cancel').click(function(e) {
	    window.location.href = serverBaseURL + '/admin/list';
	  });
	});

//SP一覧に戻るボタン
$(function() {
	  $('#btn_sp_cancel').click(function(e) {
	    window.location.href = serverBaseURL + '/sp/list';
	  });
	});

// Tableの行クリック時のリンク処理
$(function() {
	$('tbody tr[href]').addClass('clickable').click( function() {
		window.location = $(this).attr('href');
	}).find('a').hover( function() {
		$(this).parents('tr').unbind('click');
	}, function() {
		$(this).parents('tr').click( function() {
			window.location = $(this).attr('href');
		});
	});
});

// flatpickrカレンダー設定(日付のみ版)
var flatpickr_opts = {
	altInput: true,
	altInputClass: 'flatpickr-alt',
	altFormat: 'Y/m/d',
	dateFormat: 'Y/m/d',
	onReady: function ( dateObj, dateStr, instance ) {
		$clear = $( '<div class="flatpickr-clear"><button class="btn calendar-clear">クリア</button></div>' )
			.on( 'click', function() {
				instance.clear();
				instance.close();
		} )
		.appendTo( $( instance.calendarContainer ) );
	}
};

// flatpickrカレンダー設定(日時版)
var flatpickr_opts_for_time = {
	altInput: true,
	altInputClass: 'flatpickr-alt',
	enableTime: true,
	enableSeconds: true,
	time_24hr: true,
	defaultHour: 0,
	defaultMinute: 0,
	altFormat: 'Y/m/d H:i:S',
	dateFormat: 'Y/m/d H:i:S',
	onReady: function ( dateObj, dateStr, instance ) {
		$clear = $( '<div class="flatpickr-clear"><button class="btn calendar-clear">クリア</button></div>' )
			.on( 'click', function() {
				instance.clear();
				instance.close();
		} )
		.appendTo( $( instance.calendarContainer ) );
	}
};

// flatpickr用placeholder
var placeholder = 'カレンダーから選択';
