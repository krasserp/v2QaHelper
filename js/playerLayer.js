function openPlayer() {
	$('#playerFrame').css(
		{'display':'block',
		'position':'absolute',
		'top':'15px',
		'z-index':'101001'});

	if($('#controler').length < 1){
		$('#player')
		.prepend(
			'<div id="controler" style="width:99%;height:20px;  color:#000; padding:5px;"><div id="slider" style="width:40px; background-color:#ff00ff; height:10px; float:left;"></div><span style="float:left; margin-left:100px; color:#202020;">QA tools:</span><span id="switch" style="float:right; color:#fff;" class="ui-icon ui-icon-circle-minus">-</span></div>');
		$('#slider').slider({
			min : 0.2,
			max : 1,
			step : 0.01,
			value : 1,
			orientation : "horizontal",
			slide : function(e, ui) {
				$('#playerFrame').css('opacity', ui.value)

			}
		});
	}
	$('#playerFrame').draggable();
	// setting cookies to determine if the draggable toolbar is collapsed or open
	if ($.cookie('collapse') == 'hide') {
		$('.sc-player').removeClass('showme').addClass('collapse')
		.css({
			top : 0,
			left : 0
		});
		$('#switch').removeClass('ui-icon ui-icon-circle-minus')
		.addClass('ui-icon ui-icon-circle-plus');
	}
	;
	$('#switch').click(
		function() {
			if ($('.sc-player').hasClass("collapse") || $.cookie('collapse') == 'hide') {
					$('.sc-player').removeClass('collapse').addClass('showme');
					$.cookie('collapse', 'show');
					$('#switch').removeClass(
						'ui-icon ui-icon-circle-plus').addClass(
						'ui-icon ui-icon-circle-minus');
				} else {
					$.cookie('collapse', 'hide');
					$('.sc-player').removeClass('showme').addClass(
						'collapse').css({
							top : 0,
							left : 0
					});
					$('#switch').removeClass(
						'ui-icon ui-icon-circle-minus').addClass(
						'ui-icon ui-icon-circle-plus');
			};
	});


}


function CenterItem(theItem){
	var winWidth=$(window).width();
	var winHeight=$(window).height();
	var windowCenter=winWidth/2;
	var itemCenter=$(theItem).width()/2;
	var theCenter=windowCenter-itemCenter;
	var windowMiddle=winHeight/2;
	var itemMiddle=$(theItem).height()/2;
	var theMiddle=windowMiddle-itemMiddle;
    if(winWidth>$(theItem).width()){ //horizontal
    	$(theItem).css('left',theCenter);
    } else {
    	$(theItem).css('left','0');
    }
    if(winHeight>$(theItem).height()){ //vertical
        $(theItem).css('top','15px');  //theMiddle
    } else {
    	$(theItem).css('top','0');
    }
}