window.awe = window.awe || {};
awe.init = function () {
	awe.showPopup();
	awe.hidePopup();	
};
$(document).ready(function ($) {

	"use strict";
	awe_backtotop();
	awe_category();
	awe_menumobile();
	awe_lazyloadImage();
	awe_tab();
	setTimeout(function(){
		awe_owl();
	}, 500);

	$('.filter-content .aside-item .aside-title').click(function(e){

		if ($(this).parent().hasClass('active')) {
			$('.filter-content .aside-item').removeClass('active');
		} else {
			$('.filter-content .aside-item').removeClass('active');
			$(this).parent().addClass('active');
		}
	})

	/*Time product_grid_office*/
	$('.thumb_settime').each(function(e){
		awe_countDown2($(this));
	});


});

function awe_countDown2(selector2){
	// Set the date we're counting down to
	// Kiểu thời gian đặt tag endtime_4/15/2018 15:10:00
	var dataTime = selector2.attr('data-time');
	var countDownDate = new Date(dataTime).getTime();
	// Update the count down every 1 second
	var x = setInterval(function() {
		// Get todays date and time
		var now = new Date().getTime();
		// Find the distance between now an the count down date
		var distance = countDownDate - now;
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// Display the result in the element
		selector2.find('.time-x').html("<span>"+days+"<p>Ngày</p></span><span>:</span>" +"<span>"+hours+"<p>Giờ</p></span><span>:</span>" + "<span>"+minutes+"<p>Phút</p></span><span>:</span>" + "<span>"+seconds+"<p>Giây</p></span>");
		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			selector2.find('.wrap_time p').html("");
			selector2.find('.wrap_deal_product').html("<span class='red'>Đã kết thúc khuyến mãi</span>");
			selector2.find('.wrap_time .time-x').html("");
		}
	}, 1000);
}

$(document).on('click', function(event) {

	if (!$(event.target).closest('aside.aside-item.collection-category').length) {
		$('aside.aside-item.collection-category').removeClass('active');		
	}

	if (!$(event.target).closest('.filter-content .aside-item').length) {
		$('.filter-content .aside-item').removeClass('active');		
	}	

});

$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	hidePopup('.awe-popup'); 	
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;

})

/********************************************************
# LAZY LOAD
********************************************************/
function awe_lazyloadImage() {
	setTimeout(function(){
		var i = $("[data-lazyload]");
		i.length > 0 && i.each(function() {
			var i = $(this), e = i.attr("data-lazyload");
			i.appear(function() {
				i.removeAttr("height").attr("src", e);
			}, {
				accX: 0,
				accY: 120
			}, "easeInCubic");
		});
		var e = $("[data-lazyload2]");
		e.length > 0 && e.each(function() {
			var i = $(this), e = i.attr("data-lazyload2");
			i.appear(function() {
				i.css("background-image", "url(" + e + ")");
			}, {
				accX: 0,
				accY: 120
			}, "easeInCubic");
		});
	},1000);
} window.awe_lazyloadImage=awe_lazyloadImage;




/********************************************************
# SHOW NOITICE
********************************************************/
function awe_showNoitice(selector) {
	$(selector).animate({right: '0'}, 500);
	setTimeout(function() {
		$(selector).animate({right: '-300px'}, 500);
	}, 3500);
}  window.awe_showNoitice=awe_showNoitice;

/********************************************************
# SHOW LOADING
********************************************************/
function awe_showLoading(selector) {
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading); 
}  window.awe_showLoading=awe_showLoading;

/********************************************************
# HIDE LOADING
********************************************************/
function awe_hideLoading(selector) {
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}  window.awe_hideLoading=awe_hideLoading;

/********************************************************
# SHOW POPUP
********************************************************/
function awe_showPopup(selector) {
	$(selector).addClass('active');
}  window.awe_showPopup=awe_showPopup;

/********************************************************
# HIDE POPUP
********************************************************/

function awe_hidePopup(selector) {
	$(selector).removeClass('active');
}  window.awe_hidePopup=awe_hidePopup;
/********************************************************
# HIDE POPUP
********************************************************/
awe.hidePopup = function (selector) {
	$(selector).removeClass('active');
}


/************************************************/
$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	awe.hidePopup('.awe-popup'); 
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})

/*Double click go to link menu*/
var wDWs = $(window).width();
if (wDWs < 1199) {
	$('.ul_menu li:has(ul)' ).doubleTapToGo();
	$('.item_big li:has(ul)' ).doubleTapToGo();

	$('.searchion').click(function(e){
		if ($('.searchmini').hasClass('show')) {
			$('.searchmini').removeClass('show');
		}else {
			$('.searchmini').addClass('show');
		}
	});

}


/********************************************************
# CONVERT VIETNAMESE
********************************************************/
function awe_convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 
	return str; 
} window.awe_convertVietnamese=awe_convertVietnamese;


/*JS Bộ lọc*/


/********************************************************
# SIDEBAR CATEOGRY
********************************************************/
function awe_category(){

	$('.nav-category .fa-angle-down').click(function(e){
		$(this).toggleClass('fa-angle-up fa-angle-down');
		$(this).parent().toggleClass('active');

	});
	$('.nav-category .fa-angle-up').click(function(e){
		$(this).toggleClass('fa-angle-down');
		$(this).parent().toggleClass('active');
	});
} window.awe_category=awe_category;




/********************************************************
# MENU MOBILE
********************************************************/
function awe_menumobile(){
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav').toggleClass('open');
	});
	$('#nav .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
} window.awe_menumobile=awe_menumobile;

/********************************************************
# ACCORDION
********************************************************/
function awe_accordion(){
	$('.accordion .nav-link').click(function(e){
		e.preventDefault;
		$(this).parent().toggleClass('active');
	})
} window.awe_accordion=awe_accordion;

/********************************************************
# OWL CAROUSEL
********************************************************/

function awe_owl() { 
	$('.owl-carousel:not(.not-thuongdq)').each( function(){
		var xs_item = $(this).attr('data-xs-items');
		var md_item = $(this).attr('data-md-items');
		var lg_item = $(this).attr('data-lg-items');
		var sm_item = $(this).attr('data-sm-items');	
		var margin=$(this).attr('data-margin');
		var dot=$(this).attr('data-dot');
		var nav=$(this).attr('data-nav');
	
		var height=$(this).attr('data-height');
		var play=$(this).attr('data-play');
		var loop=$(this).attr('data-loop');
		if (typeof margin !== typeof undefined && margin !== false) {    
		} else{
			margin = 30;
		}
		if (typeof xs_item !== typeof undefined && xs_item !== false) {    
		} else{
			xs_item = 1;
		}
		if (typeof sm_item !== typeof undefined && sm_item !== false) {    

		} else{
			sm_item = 3;
		}	
		if (typeof md_item !== typeof undefined && md_item !== false) {    
		} else{
			md_item = 3;
		}
		if (typeof lg_item !== typeof undefined && lg_item !== false) {    
		} else{
			lg_item = 3;
		}
		if (typeof dot !== typeof undefined && dot !== true) {   
			dot= true;
		} else{
			dot = false;
		}
	
		$(this).owlCarousel({
			loop:false,
			margin:Number(margin),
			responsiveClass:true,
			dots:dot,
			nav:nav,
			autoplay:play,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			autoHeight:false,
			responsive:{
				0:{
					items:Number(xs_item)				
				},
				600:{
					items:Number(sm_item)				
				},
				1000:{
					items:Number(md_item)				
				},
				1200:{
					items:Number(lg_item)				
				}
			}
		})
	})
} window.awe_owl=awe_owl;

$(document).ready(function (){
	setTimeout(function(){
		$('.owl-slider-home').owlCarousel({
			loop:true,
			margin:0,
			autoplay: true,
			autoplayTimeout: 7000,
			responsiveClass:true,
			autoplayHoverPause: true,
			items: 1,
			dots:true,
			nav:false,
			responsive:{
				0:{
					items:1,
					nav:false
				},
				600:{
					items:1,
					nav:false
				},
				992: {
					items:1,
				},
				1200:{
					items:1,
					nav:false,
					loop:true
				}
			}
		});
	}, 300);
});

/********************************************************
# BACKTOTOP
********************************************************/
function awe_backtotop() { 
	/* Back to top */
	if ($('.backtop').length) {
		var scrollTrigger = 200,
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.backtop').addClass('show');
				} else {
					$('.backtop').removeClass('show');
				}
			};
		var tringer_nav = 80,// px
			nav = function () {
			var scrollTopnav = $(window).scrollTop();
			if (scrollTopnav > tringer_nav) {
				$('.header_nav_main').addClass('nav_fixed');
			} else {
				$('.header_nav_main').removeClass('nav_fixed');
			}
		};
		backToTop();
		nav();
		$(window).on('scroll', function () {
			backToTop();
			nav();
		});
		$('.backtop').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;

/********************************************************
# TAB
********************************************************/
function awe_tab() {
	$(".e-tabs:not(.not-dqtab)").each( function(){
		$(this).find('.tabs-title li:first-child').addClass('current');
		$(this).find('.tab-content').first().addClass('current');

		$(this).find('.tabs-title li').click(function(e){

			var tab_id = $(this).attr('data-tab');
			var url = $(this).attr('data-url');
			$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
			$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
			$(this).closest('.e-tabs').find('.tab-content').removeClass('current');
			$(this).addClass('current');
			$(this).closest('.e-tabs').find("#"+tab_id).addClass('current');

		});    
	});
} window.awe_tab=awe_tab;

/********************************************************
# DROPDOWN
********************************************************/
$('.dropdown-toggle').click(function() {
	$(this).parent().toggleClass('open'); 	
}); 
$('.btn-close').click(function() {
	$(this).parents('.dropdown').toggleClass('open');
}); 
$('body').click(function(event) {
	if (!$(event.target).closest('.dropdown').length) {
		$('.dropdown').removeClass('open');
	};
});

/*Bắt lỗi điền giá trị âm pop cart*/
$(document).on('keydown','#qty, .number-sidebar',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
/* Cong tru product detaile*/

$(document).on('click','.qtyplus',function(e){
	e.preventDefault();   
	fieldName = $(this).attr('data-field'); 
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal)) { 
		$('input[data-field='+fieldName+']').val(currentVal + 1);
	} else {
		$('input[data-field='+fieldName+']').val(0);
	}
});

$(document).on('click','.qtyminus',function(e){
	e.preventDefault(); 
	fieldName = $(this).attr('data-field');
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal) && currentVal > 1) {          
		$('input[data-field='+fieldName+']').val(currentVal - 1);
	} else {
		$('input[data-field='+fieldName+']').val(1);
	}
});


$(document).ready(function() {
	$('.btn-wrap').click(function(e){
		$(this).parent().slideToggle('fast');
	});



	/*fix menu sub*/
	jQuery("#nav li.level0 li").mouseover(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').css({top:0,left:"158px"});
			var offset = jQuery(this).offset();
			if(offset && (jQuery(window).width() < offset.left+300)){
				jQuery(this).children('ul').removeClass("right-sub");
				jQuery(this).children('ul').addClass("left-sub");
				jQuery(this).children('ul').css({top:0,left:"-158px"});
			} else {
				jQuery(this).children('ul').removeClass("left-sub");
				jQuery(this).children('ul').addClass("right-sub");
			}
			jQuery(this).children('ul').fadeIn(100);
		}
	}).mouseleave(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').fadeOut(100);
		}
	});
});



/*Open filter*/
$('.open-filters').click(function(e){
	e.stopPropagation();
	$(this).toggleClass('openf');
	$('.dqdt-sidebar').toggleClass('openf');
});

/*MENU MOBILE*/

$(".menubar_pc").click(function(){ 
	$('.wrapmenu_full').slideToggle('fast');
	$('.wrapmenu_full, .cloed').toggleClass('open_menu');
	$('.dqdt-sidebar, .open-filters').removeClass('openf')
});
$(".cloed").click(function(){ 
	$(this).toggleClass('open_menu');
	$('.wrapmenu_full').slideToggle('fast');
});
$(".opacity_menu").click(function(){ 
	$('.opacity_menu').removeClass('open_opacity');
});
if ($('.dqdt-sidebar').hasClass('openf')) {
	$('.wrapmenu_full').removeClass('open_menu');
} 

$('.ul_collections li > .fa').click(function(){
	$(this).parent().toggleClass('current');
	$(this).toggleClass('fa-angle-down fa-angle-up');
	$(this).next('ul').slideToggle("fast");
	$(this).next('div').slideToggle("fast");
});

$('.searchion').mouseover(function() {
	$('.searchmini input').focus();                    
})


$(document).ready(function(){

	$(".body_tab .button_show_tab").click(function(){ 
		$('.link_tab_check_click').slideToggle('down');
	});

});





/* JS MODULE SECTION RESPONSIVE */
$('.section_base .btn_menu').on('click', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.parents('.section_base .title_top_menu').find('ul').stop().slideToggle();
	$(this).toggleClass('active')
	return false;
});

/*JS CLICK TÀI KHOẢN RESPONSIVE */
var wDH = $(window).height();
if (wDH < 1199) {
	$('.click_account').click(function(){
		e.preventDefault();
		$this.parents('.login_content').find('.ul_account').stop().slideToggle();

	});
}


$('.quenmk').on('click', function() {
	$('.h_recover').slideToggle();
});






/*Ajax Tab*/
function pInfScrExecute(url,tab) {
	pInfScrURL = url+"?view=view-home";
	$.ajax({
		type: 'GET',
		url: pInfScrURL,
		beforeSend: function() {	

		},
		success: function(data) {	
			$('#'+tab+' .fillcontent_ajaxhome').html(data);
			//$('.product_in_tab_index').html(data);
			awe_lazyloadImage();
			$('.fillcontent_ajaxhome #admin_bar_iframe').remove();
		},
		dataType: "html"
	});		
}
$(document).on('click', '.open_tabs a', function(){
	$(this).parent().next().toggleClass('open');
})





$('.product_tabs .nav-tabs').each(function(){
	var this_me = $(this);
	var first_link = $(this_me).find('li:nth-child(1)>a').attr('data-url');
	$(this_me).find('li:nth-child(1)').addClass('active');
	$(this_me).find('.first_url>a').attr('href', first_link);
	$(this_me).find('li>a').click(function(){
		var link_ = $(this).attr('data-url');
		var title_link_ = $(this).text();
		$(this_me).find('.first_url a').attr('href', link_).attr('title', title_link_);
	})
})

$(document).on('click', '.product_tabs .nav-tabs>li>a', function(){
	var _url = $(this).parent().data('url');
	$('.title_chir h2 >a').attr('href', _url);
	var tab = $(this).attr('aria-controls');
	var _div = $(this).attr('href');
	pInfScrExecute(_url,tab);		

})
/*end*/


$('a[data-toggle="collapse"]').click(function(e){
	if ($(window).width() >= 767) { 
		// Should prevent the collapsible and default anchor linking 
		// behavior for screen sizes equal or larger than 768px.
		e.preventDefault();
		e.stopPropagation();
	}    
});

var $win;

// Function toggles bootstrap collapse based on window width.
function toggleCollapse($win) {
	// Small screens
	if ($win.width() < 767) {  
		$('.panel-collapse').collapse('hide');
	}
	if ($win.width() >= 767) {  
		$('.panel-collapse').collapse('show');
	}
}

// Set collapsible appearance on window load;
toggleCollapse($(window));

// Toggle collapsibles on resize. Optional if you want 
// to be able to show/hide on window resize.
$(window).on('resize', function() {
	var $win = $(this);
	toggleCollapse($win);
});

/*JS XEM THÊM MENU DANH MỤC SP*/
$('.xemthem').click(function(e){
	e.preventDefault();
	$('ul.ul_menu>li').css('display','block');
	$(this).hide();
	$('.thugon').show();
})
$('.thugon').click(function(e){
	e.preventDefault();
	$('ul.ul_menu>li').css('display','none');
	$(this).hide();
	$('.xemthem').show();
})
$('.ul_menu .lev-1').click(function(e){
	var lil = $('.ul_menu .lev-1').length;
	var divHeight = $('.list_menu_header').height();
	if(lil = 2){
		$('.ul_menu .ul_content_right_1').css('min-height', divHeight);
	}
});
window.onload = function(e){ 
	var lil = $('.ul_menu .lev-1').length;
	var vw = $(window).width();
	if(lil < 9 && vw > 1200){
		$('li.hidden-lgg').remove();
	}
}
/*
$("form[action='/search']").submit(function(e){
	e.preventDefault();
	let key = $(this).find('input[name="q"]').val(),
			locationhref = '/search?q=filter='+encodeURIComponent('((title:product ** ' + key + ')||(product_type:product ** ' + key + ')||(tag:product='+ key+'))');
			window.location.href = locationhref; 
})
*/
$("form[action='/search']").submit(function(e){
	e.preventDefault();
	let key = $(this).find('input[name="q"]').val();
	window.location.href='/search?q=filter=(collectionid:product%3E=0)%26%26((title:product%20contains%20' + key + ')||(product_type:product ** ' + key + ')||(tag:product='+ key+'))&sortby=(quantity:product=desc)';
})
$(document).ready(function() {
	$("body").on("click",".btn-checkout-cart,.btn-proceed-checkout-mobile",function(e){
		e.preventDefault();
		let object_cart = {};
		object_cart = {note: $("#note").val()}
		const params = {
			type: 'POST',
			url: '/cart/update.js',
			data: object_cart,
			dataType: 'json',
			success: function(cart) {
				window.location = "/checkout";
			},
			error: function(XMLHttpRequest, textStatus) {
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	})
})




