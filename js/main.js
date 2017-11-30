
	$(window).ready(function(){
		app.init();
	});

	var app = {
		data : {

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
				if($(document).scrollTop() > 0){
					$('header').addClass('scroll');
				}else{
					$('header').removeClass('scroll');
				}
			});
		},
		animation : {
			start : function(){
				TweenMax.set('.header__langs', {x:app.computed.langsMiddle().x, y:app.computed.langsMiddle().y});
				TweenMax.set('.header__logo', {x:app.computed.logoMiddle().x, y:app.computed.logoMiddle().y});				
				TweenMax.to('.header__logo', 3, {opacity : 1});
				TweenMax.to('.header__logo', 0.7, {x : 0, ease: Power3.easeInOut, delay : 0.8, onComplete : function(){
					TweenMax.to('.header__logo', 0.5, {y : 0, ease: Power3.easeInOut});
				}});
				TweenMax.to('.header__langs', 0.7, {x : 0, opacity : 1, ease: Power3.easeInOut, delay : 0.8, onComplete : function(){
					TweenMax.to('.header__langs', 0.5, {y : 0, ease: Power3.easeInOut});
					TweenMax.fromTo('.top__slider', 0.4, {opacity : 0, y : '100%'}, {opacity : 1, y : '0%', ease: Power2.easeInOut, delay : 0.5});
					TweenMax.fromTo('.top__slider .slick-prev, .top__slider .slick-next', 0.4, {opacity : 0}, {opacity : 1, delay : 0.8});
				}});
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
