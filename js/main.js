$('.top__slider_list').slick({
	dots : true,
	appendDots : $('.top__slider_list-dots')
});
$('.bottom__slider_list').slick({
	dots : true,
	appendDots : $('.bottom__slider_list-dots')
});

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
