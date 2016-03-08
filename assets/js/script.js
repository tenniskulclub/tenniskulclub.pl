var onanimate = false;

jQuery(function($){

	// $('.contact-form form').on('submit', function(e) {
	// 	$.ajaxSetup({
	// 	    'beforeSend': function(xhr) {
	// 	    	// xhr.setRequestHeader("Referrer", "http://tenniskulclub.pl");
	//     		xhr.setRequestHeader("Accept", "application/json");
	//     }
	// 	});
	// 	e.preventDefault();
	// 	$this = $(this);
	// 	name = $this.find('input[name="name"]').val();
	// 	email = $this.find('input[name="_replyto"]').val();
	// 	msg = $this.find('textarea').val();
	// 	gotcha = $this.find('input[name="_gotcha"]').val();

	// 	// $.post("//formspree.io/kontakt@tenniskulclub.pl",
	// 	// 				{	message: msg,
	// 	// 					_replyto: email ,
	// 	// 					name: name, 
	// 	// 					_gotcha: gotcha,
	// 	// 					_cc: 'tukan2can@gmail.com'},
	// 	// 				"json");

	// 	$.ajax({
	// 	    url: '//formspree.io/kontakt@tenniskulclub.pl', 
	// 	    type: 'POST',
	// 	    data: {	message: msg,
	// 							_replyto: email ,
	// 							name: name, 
	// 							_gotcha: gotcha,
	// 							_cc: 'tukan2can@gmail.com'},
	// 	    dataType: 'json'
	// 	});

	// 	alert('Dziękujemy. Wiadomość została wysłana.')
	// 	$this.find('input.span6').val('');
	// 	$this.find('textarea').val('');
	// })

	

	// Lazy load modal img
	$('.modal').on('show', function () {
		$(this).find('.carousel-inner img').each(function(i, el){
			$el = $(el);
			if ($el.attr('src') == "") {
				$el.attr('src', $el.data('src'));	
			}
		});
	})

	$("#lightgallery").lightGallery({
		selector: 'a'
	}); 

	$('lightgallery').carousel();

	$("img.lazy").lazyload();

	// Scroll to top button
	var scrollTimeout;

	$('.carousel-indicators li').click(function(){
		$this = $(this);
		$('#lightgallery').carousel($this.data('slide-to'));
		$('.carousel-indicators li').removeClass('active');
		$this.addClass('active');
	})
	
	$('a.scroll-top').click(function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
	});

	$(window).scroll(function(){
		clearTimeout(scrollTimeout);
		if($(window).scrollTop()>400){
			scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()},100);
		}
		else{
			scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()},100);	
	}
	});
	
	//Initial ScrollSpy, Carousel, Images grayscale
	$('.nav-collapse').scrollspy();
	$('.carousel').carousel({interval:false});
	
	// Scroll to section onclick to menu
	
	$('#nav .nav a').click(function(e){
		e.preventDefault();
		var des = $(this).attr('href');
		goToSectionID(des);
	})

	//Fix dropdown bootstrap
	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
				.on('touchstart.dropdown', '.dropdown-submenu', function (e) {e.preventDefault();});
	if( 'ontouchstart' in document.documentElement ) {
		var clickable = null;
		$('#access .menu-item').each(function(){
			var $this = $(this);

			if( $this.find('ul.sub-menu').length > 0 ) {

				$this.find('a:first').unbind('click').bind('touchstart',function(event){
					if( clickable != this ) {
						clickable = this;
						event.preventDefault();
					} else {
						clickable = null;
					}
				});
			}
		});
	}


	//Trigger change url on scroll
	$('.nav-collapse').on('activate',function(e){
		if(onanimate) return;
		
		if(history.pushState) {
		    history.pushState(null, null, $('.nav-collapse .active a').attr('href'));
		}
		else {
			//var currenttop = $(window).scrollTop();
		  //  location.hash = $('.nav-collapse .active a').attr('href');
		  //$(window).scrollTop(currenttop);
		}
		
	})

	// Carousel Slider spy
	$('.carousel').on('slid',function(e){
		var t = $(this),
			item = t.find('.carousel-inner .active'),
			idx =	t.find('.carousel-inner .item').index(item);
		t.find('.carousel-nav > ul li').removeClass('active')
		t.find('.carousel-nav > ul li:eq('+idx+')').addClass('active')
	})

	// Generate slider pagination 
	
	$('.carousel').each(function(){
		var t = $(this);
		t.find('.carousel-nav > ul li').live('click',function(e){
			e.preventDefault();
			var idx = t.find('.carousel-nav > ul li').index($(this));
			t.carousel(idx);
		});
	}) 

	$('.carousel').each(function(){
		var t = $(this),
			nav = t.find('.carousel-nav > ul');
		t.find('.carousel-inner .item').each(function(i,j){
			var clss = (i==0)?'active':'';
			nav.append('<li class="img-circle '+clss+'"><a class="img-circle" href="#'+i+'"><span></span></a></li> ');
		});
	});

	$('.show-more').on('click',function(event){
		event.preventDefault();
		var des = '#'+$(this).closest('.section').next().attr('id');
		goToSectionID(des);
	});

	$('.team .personal').hover(
		function(){
			$(this).find('.img_wrapper .img_grayscale').stop().animate({opacity:1},200);

		},function(){
			$(this).find('.img_wrapper .img_grayscale').stop().animate({opacity:0},200);
		}
	)

	 //Handles the carousel thumbnails
	$('[id^=carousel-selector-]').click( function(){
      var id_selector = $(this).attr("id");
      var id = id_selector.substr(id_selector.length -1);
      var id = parseInt(id);
      $('#myCarousel').carousel(id);
  });
});

/**
 * Scroll to section
 * @param  string des HTML identity of section block
 * @return void
 */
function goToSectionID(des){
	var os = (history.pushState)?51:0;
	os = (jQuery(window).width()>800)?os:0;

	var pos = (jQuery(des).length>0 )?jQuery(des).offset().top-os:0;
	onanimate = true;
	jQuery('html,body').animate({scrollTop:pos},1000,function(){
		if(history.pushState){
			history.pushState(null,null,des);
		}else		window.location.hash = des;
		jQuery(window).scrollTop(pos);
		onanimate=false
	});
}

