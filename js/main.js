jQuery(function($) {'use strict';

	//Responsive Nav
	$('li.dropdown').find('a.toggle').each(function(){
		$(this).on('click', function(){
			if( $(window).width() < 768 ) {
				$(this).next().slideToggle();
			}
			return false;
		});
	});

	//Fit Vids
	if( $('#video-container').length ) {
		$("#video-container").fitVids();
	}

	// portfolio filter
	$(window).load(function(){

		$('.main-slider').addClass('animate-in');
		$('.preloader').remove();
		//End Preloader

		if( $('.masonery_area').length ) {
			$('.masonery_area').masonry();//Masonry
		}

		var $portfolio_selectors = $('.portfolio-filter >li>a');
		
		if($portfolio_selectors.length) {
			
			var $portfolio = $('.portfolio-items');
			$portfolio.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
			});
			
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		}

		if($('#ordertimes').length){
			var len = window.location.href.length
			$('#ordertimes').text((Math.floor(Date.now() / 1000000) - 1000 + len * 9 + len).toString().slice(-4));
		}
		
	});


	$('.timer').each(count);
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
		
	// Search
	$('.fa-search').on('click', function() {
		$('.field-toggle').fadeToggle(200);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		var _name = $('#name').val().trim();
		var _phone = encodeURIComponent($('#phone').val());
		var _message = $('#message').val();
		$.ajax({
			url: 'https://docs.google.com/forms/d/e/1FAIpQLSdVuhzQahu-mdUW23wOHycMhJ8ypi6mVc_6UBNYgmLLzfOCdA/formResponse', //$(this).attr('action'),
			data: {"entry.1557289730": _name, 
				"entry.1860932712": _phone, 
				"entry.1971688140": _message, 
			},
			type: "POST",
			dataType: "xml",
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i>Đang gửi..</p>').fadeIn() );
			},
			statusCode: {
                0: function() {
					form_status.html('<p class="text-success">Cảm ơn bạn! Chúng tôi sẽ gọi cho bạn sớm nhé</p>').delay(3000).fadeOut();
					form.trigger("reset");
                },
                200: function() {
					form_status.html('<p class="text-success">Cảm ơn bạn! Chúng tôi sẽ gọi cho bạn sớm nhé</p>').delay(3000).fadeOut();
					form.trigger("reset");
                }
            }
		})//.done(function(data){
		//	form_status.html('<p class="text-success">Cảm ơn bạn! Chúng tôi sẽ gọi cho bạn sớm nhé</p>').delay(3000).fadeOut();
		//});
	});

	// Progress Bar
	$.each($('div.progress-bar'),function(){
		$(this).css('width', $(this).attr('data-transition')+'%');
	});

	if( $('#gmap').length ) {
		var map;

		map = new GMaps({
			el: '#gmap',
			lat: 43.04446,
			lng: -76.130791,
			scrollwheel:false,
			zoom: 16,
			zoomControl : false,
			panControl : false,
			streetViewControl : false,
			mapTypeControl: false,
			overviewMapControl: false,
			clickable: false
		});

		map.addMarker({
			lat: 43.04446,
			lng: -76.130791,
			animation: google.maps.Animation.DROP,
			verticalAlign: 'bottom',
			horizontalAlign: 'center',
			backgroundColor: '#3e8bff',
		});
	}

});