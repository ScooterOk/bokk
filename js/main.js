
	$(window).ready(function(){
		app.init();
	});
	$(window).on('beforeunload', function() {
    	$(window).scrollTop(0); 
	});

	var app = {
		data : {
			animDone : {
				mainTabs : false,
				tab1Use : false,
				tab1Photo : false
			}
		},
		init : function(){						
			app.animation.start();
			app.events();
			$('.top__slider_list').slick({
				dots : true,
				appendDots : $('.top__slider_list-dots')
			});
			$('.bottom__slider_list').slick({
				dots : true,
				appendDots : $('.bottom__slider_list-dots')
			});
		},
		events : function(){
			$(window).scroll(function(e) {
				app.scroller();
				if($(document).scrollTop() > ($('.main__tabs').offset().top + $('.main__tabs').height())){
					TweenMax.to('.header__calk_but', 0.35, {css : {width : '224px', marginLeft : '81px'}, ease: Power2.easeOut});
				}else{
					TweenMax.to('.header__calk_but', 0.35, {css : {width : '0', marginLeft : '0'}, ease: Power2.easeOut});
				}

			});
		},
		animation : {
			start : function(){
				$('body').on('mousewheel', function(){					
					return false;
				});
				TweenMax.set('.header__langs', {x:app.computed.langsMiddle().x, y:app.computed.langsMiddle().y});
				TweenMax.set('.header__logo', {x:app.computed.logoMiddle().x, y:app.computed.logoMiddle().y, scale : 0, opacity : 1});
				TweenMax.to('.header__logo', 0.6, {scale : 1, ease: Back.easeOut.config(2)});
				TweenMax.to('.header__logo', 0.7, {x : 0, ease: Power3.easeInOut, delay : 0.6, onComplete : function(){
					TweenMax.to('.header__logo', 0.5, {y : 0, ease: Power3.easeInOut});
				}});
				TweenMax.to('.header__langs', 0.7, {x : 0, opacity : 1, ease: Power3.easeInOut, delay : 0.6, onComplete : function(){
					TweenMax.to('.header__langs', 0.5, {y : 0, ease: Power3.easeInOut});
					TweenMax.fromTo('.top__slider', 0.4, {opacity : 0, y : '100%'}, {opacity : 1, y : '0%', ease: Power2.easeInOut, delay : 0.5, onComplete : function(){
						$('body').off('mousewheel');
						if(app.computed.mainTabsShow()){
							app.animation.mainTabs();
						}
					}});
					TweenMax.fromTo('.top__slider .slick-prev, .top__slider .slick-next', 0.4, {opacity : 0}, {opacity : 1, delay : 0.6});
				}});
			},
			mainTabs : function(){
				TweenMax.set('.main__tabs_roller', {opacity : 1});
				var valik = TweenMax.to('.main__tabs_roller-valik', 0.25, {css:{backgroundPosition :"-1638px 0px"}, ease:SteppedEase.config(6), repeat:-1});
				TweenMax.fromTo('.main__tabs_roller', 2, {css:{width : '0'}}, {css:{width : '100%'}});
				TweenMax.fromTo('.main__tabs_ava', 1, {opacity : 0}, {opacity : 1, delay : 0.5});
				TweenMax.fromTo('.main__tabs_list', 1, {opacity : 0}, {opacity : 1, delay : 0.9});
				TweenMax.fromTo('.main__tabs_title', 1, {opacity : 0}, {opacity : 1, delay : 1.3});				
				TweenMax.fromTo('.main__tabs_calc', 1, {opacity : 0}, {opacity : 1, delay : 1.5});
				setTimeout(function(){
					valik.pause();
				}, 1900)
			},
			tab1Use : function(){
				TweenMax.set('.tab-1__use-left, .tab-1__use-right', {opacity : 1});
				TweenMax.fromTo('.tab-1__use-left h2 span', 1.5, {opacity : 0, x : -100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__use-left h2 b', 1.5, {opacity : 0, x : 100}, {opacity : 1, x : 0});
				TweenMax.fromTo('.tab-1__descr', 1.5, {opacity : 0, y : 50}, {opacity : 1, y : 0, delay : 0});
				TweenMax.fromTo('.tab-1__use-right', 2, {opacity : 0, y : -70}, {opacity : 1, y : 0});
			},
			tab1Photo : function(){				
				TweenMax.set('.tab-1__photo img, .tab-1__photo_circle', {opacity : 0});
				TweenMax.set('.tab-1__photo_wings', {scale : 0});
				TweenMax.set('.tab-1__photo', {opacity : 1});				
				TweenMax.to('.tab-1__photo img', 2, {opacity : 1});
				TweenMax.fromTo('.tab-1__photo_circle', 1, {opacity : 0, rotation : -360}, {opacity : 1, rotation : 0, delay : 0.3});
				TweenMax.staggerTo(['.tab-1__photo_wings.country', '.tab-1__photo_wings.honors', '.tab-1__photo_wings.history', '.tab-1__photo_wings.iso'], 0.3, {scale : 1, delay : 1, ease: Back.easeOut.config(1.8)}, 0.3);
				
			}
		},
		scroller : function(){
			var st = $(window).scrollTop();			
			if(st > ($('.main__tabs').offset().top - ($(window).height() / 1.5)) && !app.data.animDone.mainTabs && !app.computed.mainTabsShow()){
				app.data.animDone.mainTabs = true;
				app.animation.mainTabs();
			}
			if(st > ($('.tab-1__use').offset().top - ($(window).height() / 2.5)) && !app.data.animDone.tab1Use){
				app.data.animDone.tab1Use = true;
				app.animation.tab1Use();	
			}
			if(st > ($('.tab-1__photo').offset().top - ($(window).height() / 2.3)) && !app.data.animDone.tab1Photo){
				app.data.animDone.tab1Photo = true;
				app.animation.tab1Photo();
			}

		},
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
					x : -(x - $('.header__logo').offset().left),
					y : (y - $('.header__logo').offset().top - (Number($('.header__langs').css('marginTop').split('px')[0]) / 2))
				};
			},
			mainTabsShow : function(){
				if($('.main__tabs').offset().top > $(window).height() - 200){
					return false;
				}else{
					return true;
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
