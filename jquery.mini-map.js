/* 
jQuery Mini-Map plugin copyright Sam Croft <samcroft@gmail.com>
Licensed like jQuery - http://docs.jquery.com/License
*/

(function($){
	$.fn.minimap = function() {
		var miniMap;
		var miniMapCurrentView;
		var offset;
		var mapIconY;
		
		var el = this;
		var elPosition = el.offset();
		
		function setup() {
			if(!$('#mini-map').length) {
				el.after('<div id="mini-map">');
				miniMap = $('#mini-map');
				miniMap.addClass('out-of-view');
				miniMap.append('<div id="current-view">');
			}
			
			els = el.children().children();
			
			els.each(function(i,t){
				var articleCoords = $(this).offset();
				var mapIconHeight = $(this).height()/8;
				var mapIconMarginTop = parseInt($(this).css('margin-top'))/8;
				var mapIconMarginBottom = parseInt($(this).css('margin-bottom'))/8;
				
				if (i == 0) {
					mapIconY = (articleCoords.top/8) - mapIconMarginTop;
				} else {
					mapIconY = (articleCoords.top/8) + offset;
				}
				
				offset = mapIconMarginTop + mapIconMarginBottom;
				
				var mapIcon = $('<div>');
				mapIcon
					.css({'height':mapIconHeight+'px', 'margin-top':mapIconMarginTop+'px', 'margin-bottom':mapIconMarginBottom+'px', 'top':mapIconY+'px'})
					.addClass(t.tagName.toLowerCase());
				
				mapIcon.appendTo(miniMap);
			});
			
			mapView();
		}
		
		function mapView() {
			var miniMapHeight = 0;
			$.each(miniMap.find('div'), function(){
				miniMapHeight += parseInt($(this).outerHeight(true));
			});
			miniMapHeight += 20;

			var elOffset = el.offset();
			miniMap.css({'height':miniMapHeight+'px', 'left':(elPosition.left+90)+'px', 'top':elOffset.top+'px'});
			miniMapCurrentView = $('#current-view');
			var miniMapCurrentViewHeight = ($(window).height()/8);
			var miniMapCurrentViewWidth = ($(window).width()/8);
			miniMapCurrentView.css({'height':miniMapCurrentViewHeight+'px'});
		}
		
		$(window).scroll(function(){
			var miniMapCurrentViewX = $(window).scrollLeft()/8;
			var miniMapCurrentViewY = $(window).scrollTop()/8;
			
			if ($(window).scrollTop() > elPosition.top + 10) {
				miniMapCurrentView.css({'left':miniMapCurrentViewX+'px', 'top':miniMapCurrentViewY+'px'});
				if (miniMap.hasClass('out-of-view')) {
					miniMap.removeClass('out-of-view');
				}
			} else {
				if (!miniMap.hasClass('out-of-view')) {
					miniMap.addClass('out-of-view');
				}
			}
		});
		
		setup();
	}
})(jQuery);