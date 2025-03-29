$(window).on('popstate', function() {
	location.reload(true);	
});

var selectedSortby;
var tt = 'Thứ tự';

var filter = new Haravan.SearchFilter();

if(colId > 0){
	filter.addValue("collection", "collections", '(collectionid%3Aproduct%3D'+colId+')', "AND");
}else{
	filter.addValue("collection", "collections", '(collectionid%3Aproduct>=0)', "AND");
}
function toggleFilter(e) {
	_toggleFilter(e);
	renderFilterdItems();
	doSearch(1);
}
function _toggleFilterdqdt(e) {
	var $element = $(e);
	var group = 'khoanggia';
	var field = 'price_min';
	var operator = 'OR';	 
	var value = $element.attr("data-value");	

	filter.deleteValuedqdt(group, field, value, operator);
	filter.addValue(group, field, value, operator);
	renderFilterdItems();
	doSearch(1);
}

function _toggleFilter(e){
	var $element = $(e);
	var group = $element.attr("data-group");
	var field = $element.attr("data-field");
	var text = $element.attr("data-text");
	var value = $element.attr("value");
	var operator = $element.attr("data-operator");
	var filterItemId = $element.attr("id");



	if (!$element.is(':checked')) {
		filter.deleteValue(group, field, value, operator);
	}
	else{
		filter.addValue(group, field, value, operator);
	}

	$(".catalog_filters li[data-handle='" + filterItemId + "']").toggleClass("active");
}

function renderFilterdItems() {

	var $container = $(".filter-container__selected-filter-list ul");
	$container.html("");

	$(".filter-container input[type=checkbox]").each(function(index) {
		if ($(this).is(':checked')) {
			var id = $(this).attr("id");
			var name = $(this).closest("label").text();
			addFilteredItem(name, id);			
		}
	});

	if($(".filter-container input[type=checkbox]:checked").length > 0)
		$(".filter-container__selected-filter").show();
	else
		$(".filter-container__selected-filter").hide();
}
function addFilteredItem(name, id) {
	var filteredItemTemplate = "<li class='filter-container__selected-filter-item' for='{3}'><a href='javascript:void(0)' onclick=\"{0}\"><i class='fa fa-close'></i> {1}</a></li>";
	filteredItemTemplate = filteredItemTemplate.replace("{0}", "removeFilteredItem('" + id + "')");
	filteredItemTemplate = filteredItemTemplate.replace("{1}", name);
	filteredItemTemplate = filteredItemTemplate.replace("{3}", id);
	var $container = $(".filter-container__selected-filter-list ul");
	$container.append(filteredItemTemplate);
}
function removeFilteredItem(id) {
	$(".filter-container #" + id).trigger("click");
}
function clearAllFiltered() {
	filter = new Haravan.SearchFilter();
	if(colId > 0){
		filter.addValue("collection", "collections", '(collectionid%3Aproduct%3D'+colId+')', "AND");
	}else{
		filter.addValue("collection", "collections", '(collectionid%3Aproduct>0)', "AND");
	}
	$(".filter-container__selected-filter-list ul").html("");
	$(".filter-container input[type=checkbox]").attr('checked', false);
	$(".filter-container__selected-filter").hide();

	doSearch(1);
}
function doSearch(page, options) {
var fixColname = $(".collection_2 .sortPagiBar .box-heading h1").text();
				
	//Fixharavan filter
	if(!filter.fields.khoanggia&&!filter.fields.Hãng&&!filter.fields.tag1&&!filter.fields.Loại&&!filter.fields.tag2){
		var url = new URL(window.location.href);
		var xsb = selectedSortby;
		var xpage = page;
		var psb = url.searchParams.get("sort_by");
		var ppage = url.searchParams.get("page");
		var checktt1 = 0;
		var usb;

		
		if(!xsb&&!psb){
			checktt1=checktt1+1;
		}else{
			if(!xsb){
				usb=psb;
			}else{								
				switch(selectedSortby) {				  
					case "(price:product=asc)":
						usb = "price-ascending";
						break;
					case "price-ascending":
						usb = "price-ascending";
						break;
					case "price_min:asc":
						usb = "price-ascending";
						break;
					case "(price:product=des)":
						usb = "price-descending";
						break;
					case "price-descending":
						usb = "price-descending";
						break;
					case "price_min:desc":
						usb = "price-descending";
						break;
					case "(title:product=asc)":
						usb = "title-ascending";
						break;
					case "name:asc":
						usb = "title-ascending";
						break;
					case "title-ascending":
						usb = "title-ascending";
						break;
					case "(title:product=des)":
						usb = "title-descending";
						break;
					case "name:desc":
						usb = "title-descending";
						break;
					case "title-descending":
						usb = "title-descending";
						break;
					case "(created:product=des)":
						usb = "created-ascending";
						break;
					case "created_on:desc":
						usb = "created-ascending";
						break;
					case "(created:product=asc)":
						usb = "created-descending";
						break;
					case "created_on:asc":
						usb = "created-ascending";
						break;
					default:
						usb = "default";
						break;
				}		
			}
		}
		var upage;
		if(!xpage&&!ppage){
			checktt1=checktt1+1;
		}else{		
			if(!xpage){
				upage=ppage;				
			}else{
				upage=xpage;
			}
		}

		if(checktt1<2){
			url = window.location.origin + window.location.pathname;

			if((usb!=null&&usb!="default")||(upage!=null&&upage!=1)){
				url = url + "?";
			}
			console.log(usb);
			if(usb!=null&&usb!="default"){
				url = url + "sort_by="+usb;
			}

			if(upage!=null&&upage!=1){
				if(usb!=null&&usb!='default'){
					url = url + "&page="+upage;
				}else{
					url = url + "page="+upage;
				}
			}
			console.log(url);
			window.location.href = url;

			var checkfilter = 1;


		}

	}else{

	}

	if(!options) options = {};
	//NProgress.start();
	$('.aside.aside-mini-products-list.filter').removeClass('active');
	awe_showPopup('.loading');

	if(checkfilter!=1){
		filter.search({
			view: selectedViewData,
			page: page,
			sortby: selectedSortby,
			success: function (html) {

				var $html = $(html);

				// Muốn thay thẻ DIV nào khi filter thì viết như này
				var $categoryProducts = $($html[0]); 
				
				$(".category-products").html($categoryProducts.html());
				pushCurrentFilterState({sortby: selectedSortby, page: page});
				awe_hidePopup('.loading');				  
				awe_lazyloadImage();
				$('.add_to_cart').click(function(e){
					e.preventDefault();
					var $this = $(this);						   
					var form = $this.parents('form');						   
					$.ajax({
						type: 'POST',
						url: '/cart/add.js',
						async: false,
						data: form.serialize(),
						dataType: 'json',
						error: addToCartFail,
						beforeSend: function() {  
							if(window.theme_load == "icon"){
								awe_showLoading('.btn-addToCart');
							} else{
								awe_showPopup('.loading');
							}
						},
						success: addToCartSuccess,
						cache: false
					});
				});

				$('.collection_2 .sortPagiBar .box-heading h1').text(fixColname);
				$('html, body').animate({
					scrollTop: $('.category-products').offset().top - 50
				}, 0);
				resortby(selectedSortby);
			}
		});		
	}else{
		console.log('buggg');
	}
}

function sortby(sort) {			 
	switch(sort) {
		case "price-asc":
			selectedSortby = "(price:product=asc)";					   
			break;
		case "price-desc":
			selectedSortby = "(price:product=des)";
			break;
		case "alpha-asc":
			selectedSortby = "(title:product=asc)";
			break;
		case "alpha-desc":
			selectedSortby = "(title:product=des)";
			break;
		case "created-desc":
			selectedSortby = "(created:product=des)";
			break;
		case "created-asc":
			selectedSortby = "(created:product=asc)";
			break;
		default:
			selectedSortby = "default";
			break;
	}
	doSearch(1);
}

function resortby(sort) {
	console.log(sort);
	switch(sort) {				  
		case "(price:product=asc)":
			tt = "Giá tăng dần";
			$('.sort-cate-left .price-asc').addClass("active");
			break;
		case "price-ascending":
			tt = "Giá tăng dần";
			$('.sort-cate-left .price-asc').addClass("active");
			break;
		case "(price:product=des)":
			tt = "Giá giảm dần";
			$('.sort-cate-left .price-desc').addClass("active");
			break;
		case "price-descending":
			tt = "Giá giảm dần";
			$('.sort-cate-left .price-desc').addClass("active");
			break;
		case "(title:product=asc)":
			tt = "Tên A → Z";
			$('.sort-cate-left .alpha-asc').addClass("active");
			break;
		case "title-ascending":
			tt = "Tên A → Z";
			$('.sort-cate-left .alpha-asc').addClass("active");
			break;
		case "(title:product=des)":
			tt = "Tên Z → A";
			$('.sort-cate-left .alpha-desc').addClass("active");
			break;
		case "title-descending":
			tt = "Tên Z → A";
			$('.sort-cate-left .alpha-desc').addClass("active");
			break;
		case "(created:product=des)":
			tt = "Hàng mới nhất";
			break;
		case "(created:product=asc)":
			tt = "Hàng cũ nhất";
			break;
		default:
			tt = "Mặc định";
			break;
	}			
	$('#sort-by .val').text(tt);
	$('#sort-by > ul > li span').text(tt);
}


function _selectSortby(sort) {
	resortby(sort);
	switch(sort) {
		case "price-asc":
			selectedSortby = "price_min:asc";
			break;
		case "price-desc":
			selectedSortby = "price_min:desc";
			break;
		case "alpha-asc":
			selectedSortby = "name:asc";
			break;
		case "alpha-desc":
			selectedSortby = "name:desc";
			break;
		case "created-desc":
			selectedSortby = "created_on:desc";
			break;
		case "created-asc":
			selectedSortby = "created_on:asc";
			break;
		default:
			selectedSortby = sort;
			break;
	}
}

function toggleCheckbox(id) {
	$(id).click();
}

function pushCurrentFilterState(options) {

	if(!options) options = {};
	var url = filter.buildSearchUrl(options);
	var queryString = url.slice(url.indexOf('?'));			  


	//pushState(queryString);
}

function pushState(url) {

	window.history.pushState({
		turbolinks: true,
		url: url
	}, null, url)
}
function switchView(view) {			  
	switch(view) {
		case "list":
			selectedViewData = "data_list";					   
			break;
		default:
			selectedViewData = "data";
			break;
	}			   
	var url = window.location.href;
	var page = getParameter(url, "page");
	if(page != '' && page != null){
		doSearch(page);
	}else{
		doSearch(1);
	}
}

function selectFilterByCurrentQuery() {
	var isFilter = false;
	var url = window.location.href;
	var queryString = decodeURI(window.location.search);
	var filters = queryString.match(/\(.*?\)/g);




	if(queryString) {
		isFilter = true;
	}
	if(filters && filters.length > 0) {

		filters.forEach(function(item) {

			item = item.replace(/\(\(/g, "(");
			if(item.lastIndexOf(">") >= 0){					   					  			
				var $element = $('.filter-value');
				var group = 'khoanggia';
				var field = 'price_min';
				var operator = 'OR';	 
				var value = item;	
				filter.deleteValuedqdt(group, field, value, operator);
				//filter.addValue(group, field, value, operator);
				renderFilterdItems();
			}else{
				var element = $(".aside-item input[value='" + item + "']");

				element.attr("checked", "checked");
				_toggleFilter(element);
			}
		});

		isFilter = true;
	}


	var sortOrder = getParameter(url, "sortby");
	
	if(!sortOrder){
		sortOrder = getParameter(url, "sort_by");
	}
	if(sortOrder) {
		_selectSortby(sortOrder);

	}

	if(isFilter) {

		//fixharavanfilter
		if(!filter.fields.khoanggia&&!filter.fields.Hãng&&!filter.fields.Loại&&!filter.fields.tag1&&!filter.fields.tag2){
		}else{
			doSearch(cuPage);
			renderFilterdItems();
		}


	}
}

function getParameter(url, name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(url);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$( document ).ready(function() {
	selectFilterByCurrentQuery();
	$('.filter-group .filter-group-title').click(function(e){
		$(this).parent().toggleClass('active');
	});

	$('.filter-mobile').click(function(e){
		$('.aside.aside-mini-products-list.filter').toggleClass('active');
	});

	$('#show-admin-bar').click(function(e){
		$('.aside.aside-mini-products-list.filter').toggleClass('active');
	});

	$('.filter-container__selected-filter-header-title').click(function(e){
		$('.aside.aside-mini-products-list.filter').toggleClass('active');
	});
});





$('.filter-item--check-box input').change(function(e){
	var $this = $(this);
	toggleFilter($this);
})
$('a#filter-value').click(function(e){
	var $this = $(this);
	_toggleFilterdqdt($this);
})
$('.dosearch').click(function(e){
	var $data = $(this).attr('data-onclick');
	doSearch($data);
})
$('.dl_sortby').on('click',function(e){
	var $data = $(this).attr('data-onclick');
	sortby($data);

})
function filterItemInList(object) {
	q = dl_convertVietnamese(object.val().toLowerCase());	
	object.parent().next().find('li').show();
	if (q.length > 0) {
		object.parent().next().find('li').each(function() {
			var dataFor = dl_convertVietnamese($(this).find('label').attr("data-for").toLowerCase());

			if (dataFor.indexOf(q) == -1)
				$(this).hide();
		})
	}
}