initQuickView();
var product = {};
var currentLinkQuickView = '';
var option1 = '';
var option2 = '';
function setButtonNavQuickview() {
	$("#quickview-nav-button a").hide();
	$("#quickview-nav-button a").attr("data-index", "");
	var listProducts = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
	if(listProducts.length > 0) {
		var currentPosition = 0;
		for(var i = 0; i < listProducts.length; i++) {
			if($(listProducts[i]).data("handle") == $(currentLinkQuickView).data("handle")) {
				currentPosition = i;
				break;
			}
		}
		if(currentPosition < listProducts.length - 1) {
			$("#quickview-nav-button .btn-next-product").show();
			$("#quickview-nav-button .btn-next-product").attr("data-index", currentPosition + 1);
		}
		if(currentPosition > 0) {
			$("#quickview-nav-button .btn-previous-product").show();
			$("#quickview-nav-button .btn-previous-product").attr("data-index", currentPosition - 1);
		}
	}
	$("#quickview-nav-button a").click(function() {
		$("#quickview-nav-button a").hide();
		var indexLink = parseInt($(this).data("index"));
		if(!isNaN(indexLink) && indexLink >= 0) {
			var listProducts = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
			if(listProducts.length > 0 && indexLink < listProducts.length) {
				//$(".quickview-close").trigger("click");
				$(listProducts[indexLink]).trigger("click");
			}
		}
	});
}
function initQuickView(){

	$(document).on("click", "#thumblist_quickview li a", function() {		
		changeImageQuickView($(this).find("img:first-child"), ".product-featured-image-quickview");
		$(this).parent().parent().find('li a').removeClass('active');
		$(this).addClass('active');
	});	
	$(document).on('click', '.quick-view', function(e) {
		if($(window).width() > 1025){
			e.preventDefault();

			var producthandle = $(this).data("handle");
			currentLinkQuickView = $(this);
			Haravan.getProduct(producthandle,function(product) {
				var qvhtml = $("#quickview-modal").html();
				$(".quick-view-product").html(qvhtml);
				var quickview= $(".quick-view-product");
				var idd = '<input type="hidden" name="idd" value="' + product.variants[0].id + '">';
				quickview.find("form.variants").append(idd);
				if(product.description != null && product.description !=""){
					var productdes = product.description.split('####')[0];
				}
				else{
						quickview.find(".rte").html('Thông tin sản phẩm đang cập nhật');
				}
				
				if(product.featured_image == null||product.featured_image==""){
				var	featured_image = 'https://hstatic.net/0/0/global/noDefaultImage6_large.gif';
				}else{
				var featured_image = Haravan.resizeImage(product.featured_image, "large")
				}

				// Reset current link quickview and button navigate in Quickview
				setButtonNavQuickview();
				if(featured_image != null){

										   
						quickview.find(".view_full_size img").attr("src",featured_image);
					
				}


				if(product.price < 1 && product.variants.length < 2){			
					quickview.find(".price").html('Liên hệ');
					quickview.find("del").html('');
					quickview.find("#quick-view-product form").hide();

					quickview.find(".prices").html('<span class="price h2">Liên hệ</span>');

					quickview.find(".add_to_cart_detail span").html('Liên hệ');

				}
				else{
					quickview.find("#quick-view-product form").show();
					
					quickview.find(".price").html(Haravan.formatMoney(product.price, "{{amount_no_decimals_with_comma_separator}}₫" ));
					 
					 }
					 quickview.find(".product-item").attr("id", "product-" + product.id);
					 quickview.find(".qv-link").attr("href",product.url);
					 quickview.find(".variants").attr("id", "product-actions-" + product.id);
					 quickview.find(".variants select").attr("id", "product-select-" + product.id);

					 quickview.find(".qwp-name").html('<a class="text2line" href="'+ product.url +'" title="'+product.title+'">'+product.title +'</a>');
					 quickview.find(".reviews_qv .text_revi").html('<a href="'+ product.url +'" title="Đánh giá '+product.title+'"><i class="fa fa-edit"></i>&nbsp;Đánh giá</a>');
					 quickview.find(".haravan-product-reviews-badge").attr("data-id", product.id);
					 if(product.vendor){
						 quickview.find(".vend-qv .vendor_").append("<span>Tác giả: </span>"+product.vendor);
					 }else{
						 quickview.find(".vend-qv .vendor_").append("<span>Tác giả: </span>Đang cập nhật");
					 }
					 if(product.variants.sku){
						 quickview.find("vend-qv .sku_").append("<span>Bìa mềm SKU: </span>"+product.variants.sku);
					 }else{
						 quickview.find(".vend-qv .sku_").append("<span>Bìa mềm SKU: </span>Đang cập nhật");
					 }
					 if(product.available){
						 if (product.variants[0].inventory_management == 'haravan') {
							 quickview.find(".vend-qv .soluong").html('Còn hàng');
						 }else{
							 quickview.find(".vend-qv .soluong").html('Còn hàng');
						 }
					 }else {
						 quickview.find(".vend-qv .soluong").html('Hết hàng');
						 $('.soluong1').hide();
					 }


					 
					 quickview.find(".product-description .rte").html(productdes);
					 quickview.find(".view-more").attr('href',product.url);

					 if (product.compare_at_price_max > product.price) {
						 
						 quickview.find(".old-price").html(Haravan.formatMoney(product.compare_at_price_max, "{{amount_no_decimals_with_comma_separator}}₫" )).show();
						  
						  quickview.find(".price").addClass("sale-price")
						  }
						  else {
							  quickview.find(".old-price").html("");
							  quickview.find(".price").removeClass("sale-price")
						  }
						  if (!product.available) {

						  	 $(".quick-view-product form").show();
						  	 $(".quick-view-product .quantity_wanted_p").show();
							  quickViewVariantsSwatch(product, quickview);

							   if(product.price < 1){
									  $('#quick-view-product form').hide();
								  }else{
									  $('#quick-view-product form').show();
								  }
							   $(".soluong_qv").hide();
							   $('.soluong1').hide();
							  quickview.find(".add_to_cart_detail").text("Hết hàng").addClass("disabled").attr("disabled", "disabled");				
							  if(product.variants.length > 1){

								  quickview.find("select, .dec, .inc, .variants label").show();

								  

							  }else{
								  quickview.find("select, .dec, .inc, .variants label").hide();
							  }

						  }
						  else {
							  quickViewVariantsSwatch(product, quickview);
							   $(".quick-view-product .quantity_wanted_p").show();
							  if(product.variants.length > 1){
								  $('#quick-view-product form').show();
							  }else{
								  if(product.price < 1){
									  $('#quick-view-product form').hide();
								  }else{
									  $('#quick-view-product form').show();
								  }
							  }
						  }

						  quickview.find('.more_info_block .page-product-heading li:first, .more_info_block .tab-content section:first').addClass('active');

						  $("#quick-view-product").modal();

						  $(".view_scroll_spacer").removeClass("hidden");


						  loadQuickViewSlider(product, quickview);

						  // Action
						  setTimeout(function(){					   
							  var thumbLargeimg = $('.view_full_size .img-product #product-featured-image-quickview').attr('src');
							  var thumMedium = $('#gallery_01_qv .item .dp-flex').find('img').attr('src');
							  if (thumbLargeimg == thumMedium) {
								  $( "#gallery_01_qv .item" ).first().addClass( "active" );
							  }
						  },2000);

						  //initQuickviewAddToCart();

						  $(".quick-view").fadeIn(500);
						  if ($(".quick-view .total-price").length > 0) {
							  $(".quick-view input[name=quantity]").on("change", updatePricingQuickView)
						  }			
						  updatePricingQuickView();
						  // Setup listeners to add/subtract from the input
						  $(".js-qty__adjust").on("click", function() {
							  var el = $(this),
								  id = el.data("id"),
								  qtySelector = el.siblings(".js-qty__num"),
								  qty = parseInt(qtySelector.val().replace(/\D/g, ''));

							  var qty = validateQty(qty);

							  // Add or subtract from the current quantity
							  if (el.hasClass("js-qty__adjust--plus")) {
								  qty = qty + 1;
							  } else {
								  qty = qty - 1;
								  if (qty <= 1) qty = 1;
							  }

							  // Update the input's number
							  qtySelector.val(qty);
							  updatePricingQuickView();
						  });
						  $(".js-qty__num").on("change", function() {
							  updatePricingQuickView();
						  });
						 });



						 var numInput = document.querySelector('.quantity_wanted_p input');
						 numInput.addEventListener('input', function(){
							 // Let's match only digits.
							 var num = this.value.match(/^\d+$/);
							 if (num === null) {
								 // If we have no match, value will be empty.
								 this.value = "";
							 }		
							 if (num ==0) {
								 // If we have no match, value will be empty.
								 this.value = 1;
							 }	
						 }, false)

						 return false;
					 }
					});

					
				}

				function loadQuickViewSlider(n, r) {
					productImage();

					var loadingImgQuickView = $('.loading-imgquickview');
					var s = Haravan.resizeImage(n.featured_image, "large");

					r.find(".quickview-featured-image").append('<a class="dp-flex" href="' + n.url + '"><img src="' + s + '" title="' + n.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>');
					if (n.images.length > 1) {
						$('.large-image').removeClass('col_large_fix1img')
						$('.thumbs_quickview').addClass('gallery_01_qv');
						$('.thumbs_quickview').removeClass('hidden');
						var o = r.find(".more-view-wrapper ul");
						for (i in n.images) {
							var u = Haravan.resizeImage(n.images[i], "large");
							var a = Haravan.resizeImage(n.images[i], "large");
							var f = '<li class="item"><a class="dp-flex" href="javascript:void(0)" data-imageid="' + n.id + '"" data-zoom-image="' + u + '" ><img src="' + u + '" alt="Rose Spa" /></a></li>';
							o.append(f)
						}
						o.find("a").click(function() {
							var t = r.find("#product-featured-image-quickview");
							if (t.attr("src") != $(this).attr("data-image")) {
								t.attr("src", $(this).attr("data-image"));
								loadingImgQuickView.show();
								t.load(function(t) {
									loadingImgQuickView.hide();
									$(this).unbind("load");
									loadingImgQuickView.hide()
								})
							}
						});
						$("#gallery_01_qv").flexslider({
							animation: "slide",
							direction: "vertical",
							controlNav: false,
							prevText: "",
							nextText: "",
							animationLoop: false,
							slideshow: false,
							loop:false,
						}).css("visibility", "visible")
					} else {  
						$('.thumbs_quickview').removeClass('gallery_01_qv');
						$('.thumbs_quickview').addClass('hidden');
						$('.large-image').addClass('col_large_fix1img');
						r.find(".quickview-more-views").remove();
						r.find(".quickview-more-view-wrapper-jcarousel").remove()
					}
				}
				function quickViewVariantsSwatch(t, quickview) {	


	var v = '<input type="hidden" name="id" value="' + t.id + '">';
	quickview.find("form.variants").append(v);
	if (t.variants.length > 1) {	
		for (var r = 0; r < t.variants.length; r++) {
			var i = t.variants[r];
			var s = '<option value="' + i.id + '">' + i.title + "</option>";
			quickview.find("form.variants > select").append(s)
		}


		var ps = "product-select-" + t.id;
		new Haravan.OptionSelectors( ps, { 
			product: t, 
			onVariantSelected: selectCallbackQuickView
		});

		if (t.options.length == 1) {

			quickview.find(".selector-wrapper:eq(0)").prepend("<label>" + t.options[0].title + "</label>")
		}

		var options="";
		for (var i = 0; i < t.options.length; i++) {
			options += '<div class="swatch clearfix" data-option-index="' + i + '">';
			options += '<div class="header">' + t.options[i].name + ': </div>';
			var is_color = false;
			if (/Color|Colour|Màu/i.test(t.options[i].title)) {
				is_color = true;
			}
			var optionValues = new Array();
			for (var j = 0; j < t.variants.length; j++) {
				var variant = t.variants[j];
				var value = variant.options[i];
				var valueHandle = awe_convertVietnamese(value);

				var forText = 'swatch-' + i + '-' + valueHandle;
				if (optionValues.indexOf(value) < 0) {
							//not yet inserted
							if(variant.featured_image != null){
								options += '<div data-image="'+variant.featured_image.src+'" data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
							}else{
								options += '<div  data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
							}


							if (is_color) {
								options += '<div class="tooltip">' + value + '</div>';
							}
							options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : '') + ' />';

							if (is_color) {
							if(variant.featured_image){
								options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-color: ' + valueHandle + '"></label>';
								}else{
								options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-color: ' + valueHandle + '"></label>';
								}
							} else {
								options += '<label for="' + forText + '">' + value + '</label>';
							}
							options += '</div>';

							if (variant.available) {
								//$('#quick-view-product .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
							}
							optionValues.push(value);
						}
					}
					options += '</div>';
				}

				quickview.find('form.variants > select').after(options);
				var chon = [];
				var qmoney = [];
				var qimage = [];
				var qid = [];
				quickview.find('.swatch :radio').change(function() {
					var optionIndex = $(this).closest('.swatch').attr('data-option-index');
					var optionValue = $(this).val();
					$(this)
					.closest('form')
					.find('.single-option-selector')
					.eq(optionIndex)
					.val(optionValue)
					.trigger('change');

					var variant_id = $('.quickview-product select[name=id]').val();

					var check = false;
					for (var i = 0; i < qid.length; i++){
						if (qid[i] == variant_id){                            
							var quantity = parseInt($('.quickview-product input[name=quantity]').val());
							var totalPrice = qmoney[i] * quantity;
							var gia = Haravan.formatMoney(qmoney[i], window.money_format); 
							var totalPriceText = Haravan.formatMoney(totalPrice, window.money_format);             

							var totalPriceHtml = $('.quickview-product .price').html();


							$('.quickview-product .total-price span').html(totalPriceText);
							$('.quickview-product .price').html(gia);
							currency();

							if(qimage[i]){
								$('.quickview-product .featured-image img').attr('src',qimage[i]);
							}


						}
					}
					for (var i = 0; i < chon.length; i++){


						if (chon[i] == variant_id){             
							var check = true;
						}                       
						else{
						}
					}

					if(check == true){
						$('.quickview-product .btn-addToCart').attr('disabled','disabled');

						$(".quickview-product .btn-addToCart").removeAttr("disabled");
					}

				});

				quickview.find("form.variants .selector-wrapper label").each(function(n, r) {
					$(this).html(t.options[n].title)
				})
			}
			else {
				quickview.find("form.variants > select").remove();
				var q = '<input type="hidden" name="Id" value="' + t.variants[0].id + '">';
				quickview.find("form.variants").append(q);
			}
		}
				function productImage() {
					$('#thumblist').owlCarousel({
						navigation: true,
						items: 4,
						itemsDesktop: [1199, 4],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 3],
						itemsTabletSmall: [540, 3],
						itemsMobile: [360, 4]
					});

					if (!!$.prototype.fancybox){
						$('li:visible .fancybox, .fancybox.shown').fancybox({
							'hideOnContentClick': true,
							'openEffect'	: 'elastic',
							'closeEffect'	: 'elastic'
						});
					}
				}
				/* Quick View ADD TO CART */

				function updatePricingQuickView() {

					//Currency.convertAll(window.shop_currency, $("#currencies a.selected").data("currency"), "span.money", "money_format")


				}


				function validate(evt) {
					var theEvent = evt || window.event;
					var key = theEvent.keyCode || theEvent.which;
					key = String.fromCharCode( key );
					var regex = /[0-9]|\./;
					if( !regex.test(key) ) {
						theEvent.returnValue = false;
						if(theEvent.preventDefault) theEvent.preventDefault();
					}
				}

				$(document).on('click', '.quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay', function(e){
					$("#quick-view-product").fadeOut(0);
					awe_hidePopup();
					$('#quick-view-product').modal('hide');
				});
				$(document).on('click', '.fix_add_to_cart', function(e) {	
						e.preventDefault();		
						$('#quick-view-product').modal('hide');
						var $this = $(this);
						var form = $this.parents('form');	
						
					var qvariant_id = $('.quickview-product select[name=variantId]').val();
					var p_id = $('.quickview-product input[name=idd]').val();
					
					if(qvariant_id == null){
						qvariant_id = p_id;
					}
					var qqty = $('.quickview-product #quantity-detail').val();
					var formadd = "Id="+qvariant_id+"&quantity="+qqty;

					
						$.ajax({
							type: 'POST',
							url: '/cart/add.js',
							async: false,
							data: formadd,
							dataType: 'json',
							error: addToCartFail,
							beforeSend: function() {  
							},
							success: addToCartSuccess,
							cache: false
						});
					});