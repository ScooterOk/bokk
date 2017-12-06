
	$(window).ready(function(){
		app.init();
	});
	$(window).on('beforeunload', function() {
    	$(window).scrollTop(0); 
	});

	var app = {
		/* ==========================================================================
										    DATA 
   			========================================================================== */
		data : {
			animDone : {
				mainTabs : false,
				tab1Use : false,
				tab1Photo : false,
				tab1AdvantageTitle : false,
				tab1AdvantageTable1 : false,
				tab1AdvantageTable2 : false,
				tab1AdvantageTable3 : false,
				tab1Recommen1 : false,
				tab1Recommen2 : false,
				tab1ExpertsTitle : false,
				tab2Info : false,
				footer : false
			},
			tab : 1,
			calkAria : 0,
			calkLayers : 1
		},
		/* ==========================================================================
										INITIALIZATION
   			========================================================================== */
		init : function(){						
			app.animation.start();
			app.events();
			/*
			$('.top__slider_list').on('init', function(event, slick, direction){			  	
			  	$(slick.$slides).map(function(i, el){
			  		var url = el.getAttribute('data-prev');
			  		$(slick.$dots).find('li')[i].style.backgroundImage = 'url("'+url+'")';
			  	});			  
			});
			*/
			$('.top__slider_list').slick({
				dots : false,
				appendDots : $('.top__slider_list-dots'),
				autoplay : true,
				autoplaySpeed : 10000
			});
			$('.bottom__slider_list').slick({
				dots : true,
				appendDots : $('.bottom__slider_list-dots')
			});			
		},
		/* ==========================================================================
   											EVENTS
   			========================================================================== */
		events : function(){
			$(window).scroll(function(e) {
				app.scroller();
				if($(document).scrollTop() > 32){
					if(!$('header').hasClass('scroll')){
						$('header').addClass('scroll');
						TweenMax.to('header', 0.2, {css : {height : app.computed.headerHeight()+'px'}, ease: Power2.easeOut});
						TweenMax.to('.header__logo, .header__langs', 0.25, {y : -25, opacity : 0, ease: Power2.easeOut});
						TweenMax.fromTo('.header__scroll, .header__calk_but', 0.25, {y : 25, opacity : 0}, {y : 0, opacity : 1, ease: Power2.easeOut, delay : 0.05});
					}
				}else{					
					if($('header').hasClass('scroll')){
						$('header').removeClass('scroll');
						TweenMax.to('header', 0.2, {css : {height : app.computed.headerHeight('back')+'px'}, ease: Power1.easeOut});
						TweenMax.fromTo('.header__logo, .header__langs', 0.25, {y : -25, opacity : 0}, {y : 0, opacity : 1, ease: Power2.easeOut});
						TweenMax.to('.header__scroll, .header__calk_but', 0.25, {y : 25, opacity : 0, ease: Power2.easeOut});
					}					
				}				
			});
			$('.video__player').click(function(e){
				var id = document.querySelector('#modal-1 .modal__wrapper');
				var w, h, videoId;
				videoId = $(this).attr('video-id');
				if($(window).width() > 935){
					w = 854;
					h = 480;
				}else{
					w = $(window).width() - 60;
					h = w / 1.77;
				}	
				function onYouTubeIframeAPIReady() {
					player = new YT.Player(id, {
						height: h,
						width: w,
						playerVars: {
							'autoplay': 1
						},
						videoId: videoId,
						events: {
							'onReady': function(){
								$('#modal-1').fadeIn(350);
							}				
						}
					});
				}
				onYouTubeIframeAPIReady();	
			});
			$('.modal').click(function(e){
				if(!$(e.target).closest('modal__wrapper').length){
					player.destroy();
					$(this).fadeOut(350);
				}
			});
			$(window).resize(function(e) {
				app.computed.valikResize();
				app.computed.headerResize();
			});
			$('.header__langs li a').click(function(e) {
				var current = $(this).closest('li').hasClass('current');
				if(current)return false;				
			});
			$('.go-calk').click(function(e) {
				var y = $('.tab-1__calculator').offset().top - $('header').height();
				var body = $("html, body");
				body.stop().animate({scrollTop:y}, 500, 'swing');

				$(document).scrollTop(y);
			});
			$('.header__scroll').click(function(e) {				
				var body = $("html, body");
				body.stop().animate({scrollTop:0}, 500, 'swing');

				$(document).scrollTop(y);
			});			
			$('.tooltip').mouseenter(function(e) {
				if(!$(e.target).hasClass('tooltip__descr') && $(this).find('.tooltip__descr').is(':hidden')){
					var left = -app.computed.tooltipPos(e.currentTarget);
					TweenMax.set($(this).find('.tooltip__descr'), {x : left});
					$('.tooltip__descr').hide();					
					$(this).find('.tooltip__descr, .tooltip__tri').fadeIn(150);
				}				
				
			});
			$('.tooltip').mouseleave(function(e) {				
					TweenMax.set($(this).find('.tooltip__descr'), {x : 0});
					$(this).find('.tooltip__descr, .tooltip__tri').hide();
				
			});
			$('.tooltip .tooltip__close').click(function(e) {
				$(this).closest('.tooltip').find('.tooltip__descr, .tooltip__tri').fadeOut(150);
				TweenMax.set($(this).closest('.tooltip').find('.tooltip__descr, .tooltip__tri'), {x : 0});
				e.preventDefault();
			});
			$('.main__tabs_list li').hover(function(e){
				console.log($(this).hasClass('current'));
				if(app.data.tab == 1 && !$(this).hasClass('current')){
					TweenMax.to('.main__tabs_list .border', 0.3, {x : '100%', opacity : 1, ease: Power3.easeIn});
				}else if(app.data.tab == 2 && !$(this).hasClass('current')){
					TweenMax.to('.main__tabs_list .border', 0.3, {x : '0%', opacity : 1, ease: Power3.easeIn});
				}
			},
			function(){
				if(app.data.tab == 1 && !$(this).hasClass('current')){
					TweenMax.to('.main__tabs_list .border', 0.3, {x : '0%', opacity : 1, ease: Power3.easeIn});
				}else if(app.data.tab == 2 && !$(this).hasClass('current')){
					TweenMax.to('.main__tabs_list .border', 0.3, {x : '100%', opacity : 1, ease: Power3.easeIn});
				}				
			});
			$('.main__tabs_list li').click(function(e) {
				$('.main__tabs_list li').removeClass('current');
				if(app.data.tab == 1){
					app.data.tab = 2;
					$(this).addClass('current');
					TweenMax.set('article.main__tab-2', {opacity : 0});
					TweenMax.set('.main__tabs_list .border',{x : '100%'});
					TweenMax.to('.main__tabs_list .back', 0.3, {x : '100%', opacity : 1, ease: Power3.easeIn});
					TweenMax.to('article.main__tab-1', 0.3, {x : '-100%', opacity : 0, ease: Power3.easeIn, onComplete : function(){
						$('article.main__tab-1').hide();
						$('article.main__tab-2').show();
						TweenMax.fromTo('article.main__tab-2', 0.3, {x : '100%', opacity : 0,}, {x : '0%', opacity : 1, ease: Power3.easeIn, onComplete : function(){
							app.animation.tab2Info();
						}});
					}});
				}else{
					app.data.tab = 1;
					$(this).addClass('current');					
					TweenMax.set('article.main__tab-1', {opacity : 0});
					TweenMax.set('.main__tabs_list .border',{x : '0%'});
					TweenMax.to('.main__tabs_list .back', 0.3, {x : '0%', opacity : 1, ease: Power3.easeIn});
					TweenMax.to('article.main__tab-2', 0.3, {x : '100%', opacity : 0, ease: Power3.easeIn, onComplete : function(){
						$('article.main__tab-2').hide();
						$('article.main__tab-1').show();
						TweenMax.fromTo('article.main__tab-1', 0.3, {x : '-100%', opacity : 0,}, {x : '0%', opacity : 1, ease: Power3.easeIn});
					}});
				}
			});
			$('.aria-select input').focus(function(e){
				app.data.calkAria = $(this).val();					
				$(this).val('');
			});
			$('.aria-select input').blur(function(e){
				if($(this).val()){
					app.data.calkAria = $(this).val();
				}
				$('.aria-select input').val(app.data.calkAria);
			});
			$('.aria-select i').click(function(e){
				var val = Number($('.aria-select input').val());
				if($(this).hasClass('plus')){
					val++;
				}else{
					if(val > 1)val--;
				}
				app.data.calkAria = val;
				$('.aria-select input').val(val);
			});
			$('.layers-selector li').click(function(e) {
				$('.layers-selector li').removeClass('current');
				if(app.data.calkLayers == 1 && !$(this).hasClass('current')){
					app.data.calkLayers = 2;
					TweenMax.to('.layers-selector .back', 0.15, {x : '100%', opacity : 1, ease: Power3.easeIn, onComplete : function(){
						$('.layers-selector li[data-value="2"]').addClass('current');
					}});
				}else if(app.data.calkLayers == 2 && !$(this).hasClass('current')){
					app.data.calkLayers = 1;
					TweenMax.to('.layers-selector .back', 0.15, {x : '0%', opacity : 1, ease: Power3.easeIn, onComplete : function(){
						$('.layers-selector li[data-value="1"]').addClass('current');
					}});
				}
			});
			$('.tab-1__calculator_first-form-button').click(function(e){
				TweenMax.to('.tab-1__calculator_first', 0.3, {x : '-100%', opacity : 0, ease: Power3.easeIn, onComplete : function(){
					$('.tab-1__calculator_first').hide();
					$('.tab-1__calculator_second').show();
					TweenMax.fromTo('.tab-1__calculator_second', 0.3, {x : '100%', opacity : 0,}, {x : '0%', opacity : 1, ease: Power3.easeIn});
				}});				
			});			
		},
		/* ==========================================================================
   										ANIMATIONS
   			========================================================================== */
		animation : {
			start : function(){
				$('body').on('mousewheel', function(){					
					return false;
				});								
				$('#noscroll').on('touchstart', function(e){
					e.preventDefault();
				});
				$('#noscroll').on('touchmove', function(e){
					e.preventDefault();
				});								
				TweenMax.set('.header__langs', {x:app.computed.langsMiddle().x, y:app.computed.langsMiddle().y});
				TweenMax.set('.header__logo', {x:app.computed.logoMiddle().x, y:app.computed.logoMiddle().y, scale : 0, opacity : 1});
				TweenMax.set('#header__logo_img .st0, #header__logo_img .st1, #header__logo_img .st2, #header__logo_img .st3', {opacity : 0});
				TweenMax.to('.header__logo', 0.6, {scale : 1, ease: Back.easeOut.config(2), onComplete : function(){					
					TweenMax.staggerFromTo(['#header__logo_img .st0', ' #header__logo_img .st1', '#header__logo_img .st2', '#header__logo_img .st3'], 0.4, {x : 100, y : -100, opacity : 0}, {x : 0, y : 0, opacity : 1, ease: Power2.easeInOut}, 0.15);
				}});				
				TweenMax.to('.header__logo', 0.9, {x : 0, ease: Power3.easeInOut, delay : 1.4, onComplete : function(){
					TweenMax.to('.header__logo', 0.9, {y : 0, ease: Power3.easeInOut});
				}});				
				TweenMax.to('.header__langs', 0.9, {x : 0, opacity : 1, ease: Power3.easeInOut, delay : 1.4, onComplete : function(){
					TweenMax.to('.header__langs', 0.9, {y : 0, ease: Power3.easeInOut});					
					TweenMax.fromTo('.top__slider', 2, {opacity : 0, y : 70}, {opacity : 1, y : 0, ease: Power2.easeInOut, delay : 0.5, onComplete : function(){
						
					}});
					TweenMax.fromTo('.top__slider .slick-prev, .top__slider .slick-next', 0.4, {opacity : 0}, {opacity : 1, delay : 0.6});					
					setTimeout(function(){
						$('body').off('mousewheel');
						$('#noscroll').remove();
						if(app.computed.mainTabsShow()){
							app.animation.mainTabs();
						}
					}, 1500)
				}});
			},
			mainTabs : function(){
				TweenMax.set('.main__tabs_roller', {opacity : 1});
				var valik = TweenMax.to('.main__tabs_roller-valik', 0.25, {css:{backgroundPosition :"-1638px 0px"}, ease:SteppedEase.config(6), repeat:-1});
				TweenMax.fromTo('.main__tabs_roller', 2.5, {css:{width : '0'}}, {css:{width : app.computed.valikWidth()}});
				TweenMax.fromTo('.main__tabs_ava', 1, {opacity : 0}, {opacity : 1, delay : 0.5});
				TweenMax.fromTo('.main__tabs_list', 1, {opacity : 0}, {opacity : 1, delay : 1.1});
				TweenMax.fromTo('.main__tabs_title', 1, {opacity : 0}, {opacity : 1, delay : 1.5});				
				TweenMax.fromTo('.main__tabs_calc', 1, {opacity : 0}, {opacity : 1, delay : 2});
				setTimeout(function(){
					valik.pause();
				}, 2400)
			},
			tab1Use : function(){
				TweenMax.set('.tab-1__use-left, .tab-1__use-right', {opacity : 1});
				TweenMax.fromTo('.tab-1__use-left h2 span', 1, {opacity : 0, x : -100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__use-left h2 b', 1, {opacity : 0, x : 100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__descr', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
				TweenMax.fromTo('.tab-1__use-right', 2, {opacity : 0, y : -70}, {opacity : 1, y : 0});
			},
			tab1Photo : function(){
				TweenMax.set('.tab-1__photo img, .tab-1__photo_circle', {opacity : 0});
				TweenMax.set('.tab-1__photo_wings', {scale : 0});
				TweenMax.set('.tab-1__photo', {opacity : 1});				
				TweenMax.to('.tab-1__photo img', 2, {opacity : 1});
				TweenMax.fromTo('.tab-1__photo_circle', 1.5, {opacity : 0, rotation : -360}, {opacity : 1, rotation : 0, delay : 0.4});
				if($('header').width() > 935){
					TweenMax.staggerTo(['.tab-1__photo_wings.country', '.tab-1__photo_wings.honors', '.tab-1__photo_wings.history', '.tab-1__photo_wings.iso'], 0.5, {scale : 1, delay : 1, ease: Back.easeOut.config(1.8)}, 0.5);
				}else{
					TweenMax.staggerTo(['.tab-1__photo_wings.country', '.tab-1__photo_wings.honors', '.tab-1__photo_wings.iso', '.tab-1__photo_wings.history'], 0.5, {scale : 1, ease: Back.easeOut.config(1.8)}, 0.5);
				}
				
				
			},
			tab1AdvantageTitle : function(){				
				TweenMax.set('.tab-1__advantage_table', {opacity : 0});
				TweenMax.set('.tab-1__advantage', {opacity : 1});
				TweenMax.fromTo('.tab-1__advantage h2 span', 1, {opacity : 0, y : -25}, {opacity : 1, y : 0});
				TweenMax.fromTo('.tab-1__advantage h2 b', 1, {opacity : 0, y : 50}, {opacity : 1, y : 0});
				
			},
			tab1AdvantageTable1 : function(){
				TweenMax.set($('.tab-1__advantage_table.uno'), {opacity : 1});
				TweenMax.fromTo('.tab-1__advantage_table.uno .left', 1.5, {opacity : 0, y : 100}, {opacity : 1, y : 0});
				TweenMax.fromTo('.tab-1__advantage_table.uno .right', 1.5, {opacity : 0, x : -100}, {opacity : 1, x : 0});
			},
			tab1AdvantageTable2 : function(){
				TweenMax.set($('.tab-1__advantage_table.dos'), {opacity : 1});
				TweenMax.fromTo('.tab-1__advantage_table.dos .right', 1.5, {opacity : 0, y : 100}, {opacity : 1, y : 0});
				TweenMax.fromTo('.tab-1__advantage_table.dos .left', 1.5, {opacity : 0, x : 100}, {opacity : 1, x : 0});
			},
			tab1AdvantageTable3 : function(){
				TweenMax.set($('.tab-1__advantage_table.tres'), {opacity : 1});
				TweenMax.fromTo('.tab-1__advantage_table.tres .left', 1.5, {opacity : 0, y : 100}, {opacity : 1, y : 0});
				TweenMax.fromTo('.tab-1__advantage_table.tres .right', 1.5, {opacity : 0, x : -100}, {opacity : 1, x : 0});
			},
			tab1Recommen1 : function(){
				TweenMax.set($('.tab-1__recommen_table'), {opacity : 0});
				TweenMax.set($('.tab-1__recommen, .tab-1__recommen_table.uno'), {opacity : 1});				
				TweenMax.fromTo('.tab-1__recommen_table.uno h2 span', 1, {opacity : 0, x : -100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__recommen_table.uno h2 b', 1, {opacity : 0, x : 100}, {opacity : 1, x : 0});				
				TweenMax.fromTo('.tab-1__recommen_table .tab-1__recommen_table-descr', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
				TweenMax.fromTo('.tab-1__recommen_table.uno .right', 2, {opacity : 0, y : -70}, {opacity : 1, y : 0});
			},
			tab1Recommen2 : function(){								
				TweenMax.set($('.tab-1__recommen_table.dos'), {opacity : 1});				
				TweenMax.fromTo('.tab-1__recommen_table.dos h2 span', 1, {opacity : 0, x : 100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__recommen_table.dos h2 b', 1, {opacity : 0, x : -100}, {opacity : 1, x : 0});				
				TweenMax.fromTo('.tab-1__recommen_table.dos .pdf-link', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
				TweenMax.fromTo('.tab-1__recommen_table.dos .right', 2, {opacity : 0, y : 70}, {opacity : 1, y : 0});
			},
			tab1ExpertsTitle : function(){
				TweenMax.set('.tab-1__experts .wrapper > h2', {opacity : 1});
				TweenMax.fromTo('.tab-1__experts .wrapper > h2 span', 1, {opacity : 0, y : -25}, {opacity : 1, y : 0});
				TweenMax.fromTo('.tab-1__experts .wrapper > h2 b', 1, {opacity : 0, y : 50}, {opacity : 1, y : 0});
			},
			tab2Info : function(){
				TweenMax.set('.main__tab-2_info', {opacity : 1});
				TweenMax.fromTo('.main__tab-2_info h2 span', 1, {opacity : 0, x : -100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.main__tab-2_info h2 b', 1, {opacity : 0, x : 100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.main__tab-2_info_text', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
			},
			footer : function(){
				TweenMax.set('footer h2, .footer__text', {opacity : 1});
				TweenMax.fromTo('footer h2 span', 1, {opacity : 0, x : -100}, {opacity : 1, x : 0});
				TweenMax.fromTo('footer h2 b', 1, {opacity : 0, x : 100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.footer__text', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
			}
		},
		scroller : function(){			
			var st = $(window).scrollTop();						
			if(st > ($('.main__tabs').offset().top - ($(window).height() / 1.1)) && !app.data.animDone.mainTabs && !app.computed.mainTabsShow()){
				app.data.animDone.mainTabs = true;
				app.animation.mainTabs();
			}			
			if(st > ($('.tab-1__use').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1Use){
				app.data.animDone.tab1Use = true;
				app.animation.tab1Use();	
			}
			if(st > ($('.tab-1__photo').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1Photo){
				app.data.animDone.tab1Photo = true;
				app.animation.tab1Photo();
			}
			if(st > ($('.tab-1__advantage > h2').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1AdvantageTitle){
				app.data.animDone.tab1AdvantageTitle = true;
				app.animation.tab1AdvantageTitle();
			}
			if(st > ($('.tab-1__advantage_table.uno').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1AdvantageTable1){
				app.data.animDone.tab1AdvantageTable1 = true;
				app.animation.tab1AdvantageTable1();
			}
			if(st > ($('.tab-1__advantage_table.dos').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1AdvantageTable2){
				app.data.animDone.tab1AdvantageTable2 = true;
				app.animation.tab1AdvantageTable2();
			}
			if(st > ($('.tab-1__advantage_table.tres').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1AdvantageTable3){
				app.data.animDone.tab1AdvantageTable3 = true;
				app.animation.tab1AdvantageTable3();
			}
			if(st > ($('.tab-1__recommen_table.uno').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1Recommen1){
				app.data.animDone.tab1Recommen1 = true;
				app.animation.tab1Recommen1();
			}
			if(st > ($('.tab-1__recommen_table.dos').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1Recommen2){
				app.data.animDone.tab1Recommen2 = true;
				app.animation.tab1Recommen2();
			}
			if(st > ($('.tab-1__experts .wrapper > h2').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.tab1ExpertsTitle){
				app.data.animDone.tab1ExpertsTitle = true;
				app.animation.tab1ExpertsTitle();
			}
			if(st > ($('footer').offset().top - ($(window).height() - ($(window).height() / 4.5))) && !app.data.animDone.footer){
				app.data.animDone.footer = true;
				app.animation.footer();
			}

		},
		/* ==========================================================================
   										COMPUTED
   			========================================================================== */
		computed : {
			logoMiddle : function(){
				var x, y, w, h, ww, wh;
				w = $('.header__logo').width();
				h = $('.header__logo').height();
				ww = $(window).width();
				wh = $(window).height();
				x = (ww / 2) - (w / 2);
				y = (wh / 2) - (h / 2);				
				return {
					x : (x - $('.header__logo').offset().left),
					y : (y - $('.header__logo').offset().top),
				};
			},
			langsMiddle : function(){
				var x, y, w, h, ww, wh;
				w = $('.header__langs').width();
				h = $('.header__langs').height();
				ww = $(window).width();
				wh = $(window).height();
				x = (ww / 2) - (w / 2);
				y = (wh / 2) - (h / 2) ;				
				return {
					x : (x - $('.header__langs').offset().left),
					y : (y - $('.header__langs').offset().top)
				};
			},
			mainTabsShow : function(){
				if($('.main__tabs').offset().top > $(window).height() - 70){
					return false;
				}else{
					return true;
				}
			},
			valikWidth : function(){				
				var w;				
				if($(window).width() > 1865){
					w = '100%';
				}else if($(window).width() < 1865 && $(window).width() > 1024){
					w = $('header').width() + 100;
				}else if($(window).width() < 1024 && $(window).width() > 935){					
					w = $('header').width() + 300;
				}else if($(window).width() < 935){
					w = $('header').width() + 500;
				}
				return w;
			},
			valikResize : function(){				
				TweenMax.to('.main__tabs_roller', 0.3, {css:{width : app.computed.valikWidth()}});
			},
			tooltipPos : function(target){
				var ww, tw, tp;
				ww = $(window).width();
				tw = $(target).find('.tooltip__descr').outerWidth();
				tp = $(target).offset().left;
				if((tp+tw) > ww){
					return (tp+tw) - ww + 5;
				}else{
					return (tw/4);
				}
				console.log(ww, tw, tp);
			},
			headerHeight : function(back){
				if(back){
					if($('body').width() < 935){
						return 64;
					}else{
						return 112;
					}
				}else{
					if($('body').width() > 1280){
						return 80;
					}else if($('body').width() < 1280 && $('body').width() > 935){
						return 70;
					}else if($('body').width() < 935){
						return 48;
					}
				}			
			},
			headerResize : function(){
				if($(document).scrollTop() > 32){
					TweenMax.to('header', 0.2, {css : {height : app.computed.headerHeight()+'px'}, ease: Power2.easeOut});
				}				
			}
		}
	}	






/*
var vf = 0;
var valik = setInterval(function(){
	vf-=273;;
	$('.main__tabs_roller-valik').css({
		backgroundPosition : vf+'px 0px'
	})
	if(vf == -1638)vf = 0;
}, 100);
*/
