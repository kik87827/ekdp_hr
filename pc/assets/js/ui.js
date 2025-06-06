if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var H5 = H5 || {};
H5 = {
	/* 페이지 로드함수 */
	init : function(){
		var funcThis = this;
		funcThis.deviceCheck();
		$(function(){
			funcThis.dimLayerControl();
			funcThis.layerCommon();
			funcThis.dropDownGlobal();
		});
		$(window).on("load",function(){
		});
	},
	deviceCheck(){
		let touchstart = "ontouchstart" in window;
		let userAgent = navigator.userAgent.toLowerCase();
		if (touchstart) {
			browserAdd("touchmode");
		}
		if (userAgent.indexOf("samsung") > -1) {
			browserAdd("samsung");
		}
	
		if (
			navigator.platform.indexOf("Win") > -1 ||
			navigator.platform.indexOf("win") > -1
		) {
			browserAdd("window");
		}
	
		if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
			// iPad or iPhone
			browserAdd("ios");
		}
	
		function browserAdd(opt) {
			document.querySelector("html").classList.add(opt);
		}
	},
	layerCommon : function(){
		var $hlog_target = $(".hlog_target"),
			$hlog_layer = $(".hlog_layer"),
			$util_haslayer_item = $(".util_haslayer_item");
		$hlog_target.on("click",function(){
			var $this = $(this),
				$t_n = $this.next(".hlog_layer");
			$this.toggleClass("active");
			$t_n.slideToggle();
			//$util_haslayer_item.click();
			//$(".utilmenu_layer").slideUp();
		});
		$util_haslayer_item.on("click",function(e){
			e.preventDefault();
			var $this = $(this),
				$t_child = $this.find(".utilmenu_layer");
			
			$(".utilmenu_layer").not($t_child).fadeOut();
			$t_child.fadeToggle();
			//$hlog_target.click();
		});
		$(document).on("click",function(e){
			/* if(!$(e.target).parents(".hlogdata").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
			}else if(!$(e.target).parents(".util_haslayer_item").length){
				$(e.target).find(".utilmenu_layer").slideUp();
			} */
			/* if(!$(e.target).closest(".hlogdata , util_haslayer_item").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
				$(e.target).find(".utilmenu_layer").slideUp();
			} */
			if(!$(e.target).closest(".hlogdata").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
			}
			if(!$(e.target).closest(".util_haslayer_item").length){
				$(".utilmenu_layer").fadeOut();
			}
		});

		function leftMenu(){
			const gnb_li = $(".gnb_list > li");
			const gnb_zone = $(".gnb_zone");
			const gnb_one = $(".gnb_one");
			const gnb_depth_wrap = $(".gnb_depth_wrap");
			const page_wrap = $(".page_wrap");
			const btn_depth_toggle = $(".btn_depth_toggle");
			const acc_item = $(".acc_one,.acc_two");
			const acc_one = $(".acc_one");
			const acc_two = $(".acc_two");
			const acc_three = $(".acc_three");
			let left_dim = null;
			let opentTime = 0;
			let closeTime = 0;
			if(gnb_zone.length && $(".left_dim").length === 0){
				page_wrap.append("<div class='left_dim' />");
				left_dim = $(".left_dim");
			}
			gnb_one.on("click",function(e){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				const thisGnb = thisParent.find(".gnb_depth_wrap");

				if(thisGnb.length === 0){
					return;
				}
				e.preventDefault();
				

				gnb_li.not(thisParent).removeClass("active");

				thisParent.toggleClass("active");
				gnb_depth_wrap.not(thisGnb).removeClass("active");
				thisGnb.addClass("active");

				if(thisParent.hasClass("active")){
					openMotionPanel(thisGnb);
					left_dim.fadeIn();
				}else{
					closePanel(thisGnb);
				}
			});
			
			btn_depth_toggle.on("click",function(){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				const thisGnb = thisParent.find(".gnb_depth_wrap");
				
				closePanel(thisGnb);
				thisParent.removeClass("active");
				left_dim.fadeOut();
			});
			
			acc_item.on("click",function(e){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				if(thisParent.find("ul > li").length){
					e.preventDefault();
					thisParent.toggleClass("active");
				}
			});
			
			left_dim.on("click",function(){
				closePanel($(".gnb_depth_wrap.active"));
				gnb_li.removeClass("active");
				left_dim.fadeOut();
			});
			function openMotionPanel(gnb){
				if(opentTime){
					clearTimeout(opentTime);
				}
				opentTime = setTimeout(()=>{
					gnb.addClass("motion");
				},20);
			}
			function closePanel(gnb){
				if(closeTime){
					clearTimeout(closeTime);
				}	
				gnb.removeClass("motion");
				left_dim.fadeOut(520);
				closeTime = setTimeout(()=>{
					gnb.removeClass("active");
				},520);
			}
		}
		leftMenu();
	},
	dimLayerControl : function(){
		var thisUI = this;
		$(document).on("click",".btn_layerclose , .closetrigger",function(){
			thisUI.dimLayerHide($(this).parents(".dimlayer_z"));
		});
	},
	dimLayerShow : function(target,callback){
		$(function(){
			action(target,callback);
		});
		function action(target,callback){
			var $target = $(target),
				$t_layer_td = null,
				$t_layer_tit_low = null,
				$t_layer_tit_low_height = 0,
				$t_layer_td_cssptd = 0,
				$t_layer_td_csspbd = 0,
				$t_btn_lysm_w = null,
				$t_btn_lysm_w_height = 0,
				$t_layer_cont = null,
				$t_layer_box = null,
				$t_layer_box_height = 0;
			
			$(".dimlayer_z").hide();
			$target.show();
			setTimeout(function(){
				$t_layer_td = $target.find(".dimlayer_td");
				$t_layer_td_cssptd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-top")) : 0;
				$t_layer_td_csspbd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-bottom")) : 0;
				$t_layer_box = $target.find(".layer_box");
				$t_layer_box_height = $t_layer_box.length ? $t_layer_box.outerHeight() : 0;
				
				boxHeight();
				
				if($t_layer_box_height+$t_layer_td_cssptd+$t_layer_td_csspbd > $(window).height()){
					$("html,body").addClass("touchDis");
				}
				$(window).on("resize",function(){
					boxHeight();
				});
				if(callback){
					callback();
				}
			},50);
			
			function boxHeight(){
				$t_layer_tit_low = $target.find(".layer_tit_low");
				$t_layer_tit_low_height = $t_layer_tit_low.length ? $t_layer_tit_low.outerHeight() : 0;
				$t_btn_lysm_w = $target.find(".btn_lysm_w");
				$t_btn_lysm_w_height = $t_btn_lysm_w.length ? $t_btn_lysm_w.outerHeight() : 0;
				$t_layer_cont = $target.find(".layer_cont");
				$t_layer_cont.css("max-height",$(window).height() - ($t_layer_td_cssptd+$t_layer_td_csspbd+$t_btn_lysm_w_height+$t_layer_tit_low_height));
			}
		}
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
	},
	dimLayerHide : function(target){
		$(function(){
			action(target);
		});
		
		function action(target){
			var $target = $(target);
			$(".dimlayer_z").hide();
			$target.hide();
			$("html,body").removeClass("touchDis");
		}
	},
	sctabFunc : function(){
		var $sctab_z = $(".sctab_z");
		$sctab_z.each(function(){
			var $t_sctab_z = $(this),
				$t_sccont_w = $(".sccont_w",$t_sctab_z),
				$t_sccont = $(".sccont",$t_sctab_z),
				$t_sctab_td = $(".sctab_td",$t_sctab_z);
			$t_sctab_td.on("click",function(e){
				var $this = $(this),
					$t_target = $($this.attr("href"));
				e.preventDefault();
				$t_sctab_td.removeClass("active");
				$this.addClass("active");
				if($t_target.length){
					$t_sccont.hide();
					$t_target.show();
				}
			});
		});
	},
	datepicker(){
		$(function(){
			
			$(".datepicker_item").each(function(){
				let $this = $(this);
				$this.find( "input.datepicker" ).datepicker({
					showOn: "both", // 버튼을 클릭했을 때 달력 표시
					buttonImage: "./assets/images/ico_calendar.png",
					changeMonth: true,  // 월 선택 활성화
					changeYear: true,   // 년도 선택 활성화
					dateFormat: "yy.mm.dd", // 날짜 형식
					monthNames: [
						"1월", "2월", "3월", "4월", "5월", "6월",
						"7월", "8월", "9월", "10월", "11월", "12월"
					], // 월 이름 설정
					monthNamesShort: [
						"1월", "2월", "3월", "4월", "5월", "6월",
						"7월", "8월", "9월", "10월", "11월", "12월"
					], // 월 이름 (축약형) 설정
					dayNames: [
						"일", "월", "화", "수", "목", "금", "토"
					], // 요일 전체 이름
					dayNamesMin: [
						"일", "월", "화", "수", "목", "금", "토"
					], // 요일 축약 이름
				});
				/* $thisButton = $this.find(".ui-datepicker-trigger");
				
				$thisInput.on("focus",function(){
					$thisButton.trigger("click");
				}); */
			});
			$(".datapicker_inform").datepicker({
				changeMonth: true,  // 월 선택 활성화
				changeYear: true,   // 년도 선택 활성화
				dateFormat: "yy.mm.dd", // 날짜 형식
				monthNames: [
					"1월", "2월", "3월", "4월", "5월", "6월",
					"7월", "8월", "9월", "10월", "11월", "12월"
				], // 월 이름 설정
				monthNamesShort: [
					"1월", "2월", "3월", "4월", "5월", "6월",
					"7월", "8월", "9월", "10월", "11월", "12월"
				], // 월 이름 (축약형) 설정
				dayNames: [
					"일", "월", "화", "수", "목", "금", "토"
				], // 요일 전체 이름
				dayNamesMin: [
					"일", "월", "화", "수", "목", "금", "토"
				]
			});
		});
	},
	searchBox(){
		const search_form_tb = document.querySelectorAll(".search_form_tb");
		action();
		window.addEventListener("resize",()=>{
			action();
		});

		function action(){
			if(search_form_tb.length){
				search_form_tb.forEach((item)=>{
					let thisItem = item;
					let thisItemSet = thisItem.querySelector(".resize_wid_set");
					let thisItemGet = thisItem.querySelector(".resize_wid_get");
					if(!!thisItemGet && !!thisItemSet){
						thisItemSet.removeAttribute("style");
						if(window.innerWidth > 1920){
							thisItemSet.style.width = thisItemGet.getBoundingClientRect().width + "px";
						}else{
							thisItemSet.style.width = "auto";
						}
					}
				});
			}
		}
	},
	tabDrag(target,callback){
		const tabContainer = document.querySelectorAll(target);
		if(tabContainer.length){
			tabContainer.forEach((domContainer)=>{
				let isDragging = false;
				let startX;
				let scrollLeft;
		
				domContainer.addEventListener('mousedown', (e) => {
					isDragging = true;
					domContainer.classList.add('active');
					startX = e.pageX - domContainer.offsetLeft;
					scrollLeft = domContainer.scrollLeft;
				});
		
				domContainer.addEventListener('mouseleave', () => {
					isDragging = false;
				});
		
				domContainer.addEventListener('mouseup', () => {
					isDragging = false;
				});
		
				domContainer.addEventListener('mousemove', (e) => {
					if (!isDragging) return;
					e.preventDefault();
					const x = e.pageX - domContainer.offsetLeft;
					const walk = (x - startX) * 2; // 드래그 속도 조절
					domContainer.scrollLeft = scrollLeft - walk;
				});
		
				domContainer.addEventListener('click', (e) => {
					if (!isDragging) { // 드래그 중이 아닐 때만 탭 클릭 동작
						if (e.target.classList.contains('sc_tab')) {
							if(callback){
								callback(e.target);
							}
							
							// 원하는 액션 추가
						}
					}
				});
			});
		}
	},
	dataTable(target){
		let domTarget = document.querySelectorAll(target);
		action();
		window.addEventListener("resize",()=>{
			action();
		});

		function action(){
			if(domTarget.length){
				domTarget.forEach((item)=>{
					const itemGroup = item;
					const itemOptionHeight = itemGroup.dataset.scrollheight;
					const itemFixedTh = itemGroup.querySelectorAll(".data_thead_row .data_fixed_cols .data_thead_tb th");
					const itemFixedTd = itemGroup.querySelectorAll(".data_tbody_row .data_fixed_cols .data_tbody_tb tr:first-child td");
					const itemLiquidTh = itemGroup.querySelectorAll(".data_thead_row .data_liquid_cols .data_thead_tb th");
					const itemLiquidTd = itemGroup.querySelectorAll(".data_tbody_row .data_liquid_cols .data_tbody_tb tr:first-child td");
					const itemTheadScroll = itemGroup.querySelector(".data_thead_tb_wrap");
					const itemTbodyScroll = itemGroup.querySelector(".data_tbody_tb_wrap");
					const itemTbodyFixedScroll = itemGroup.querySelector(".data_tbody_fixed_tb_wrap");
					const itemTbody = itemGroup.querySelector(".data_tbody_row");
					
					if(itemFixedTh.length){
						itemFixedTh.forEach((thisTh,index)=>{
							let styleTarget = [itemFixedTh[index],itemFixedTd[index]];
							styleTarget.forEach((item)=>{
								item.removeAttribute("style");
							});
							setTimeout(()=>{
								let maxArray = Math.max.apply(null,[itemFixedTh[index].children[0].getBoundingClientRect().width,itemFixedTd[index].children[0].getBoundingClientRect().width]);
								
								styleTarget.forEach((item)=>{
									item.children[0].style.width = maxArray + "px"; 
								});
							},30);
						});
					}
					if(itemLiquidTh.length){
						itemLiquidTh.forEach((thisTh,index)=>{
							let styleTarget = [itemLiquidTh[index],itemLiquidTd[index]];
							styleTarget.forEach((item)=>{
								item.removeAttribute("style");
							});
							setTimeout(()=>{
								let maxArray = Math.max.apply(null,[itemLiquidTh[index].children[0].getBoundingClientRect().width,itemLiquidTd[index].children[0].getBoundingClientRect().width]);
								styleTarget.forEach((item)=>{
									item.children[0].style.width = maxArray + "px"; 
								});
							},30);
						});
					}
					if(!!itemTheadScroll || !!itemTbodyScroll){
						itemTbodyScroll.addEventListener("scroll",(e)=>{
							itemTheadScroll.scrollLeft = e.currentTarget.scrollLeft;
						});
						itemTheadScroll.addEventListener("scroll",(e)=>{
							itemTbodyScroll.scrollLeft = e.currentTarget.scrollLeft;
						});
					}

					if(!!itemTbodyFixedScroll || !!itemTbodyScroll){
						[itemTbodyFixedScroll,itemTbodyScroll].forEach((item)=>{
							item.style.maxHeight = `110px`
						})
						itemTbodyFixedScroll.addEventListener("scroll",(e)=>{
							itemTbodyScroll.scrollTop = e.currentTarget.scrollTop;
						});
						itemTbodyScroll.addEventListener("scroll",(e)=>{
							itemTbodyFixedScroll.scrollTop = e.currentTarget.scrollTop;
						});
					}

					/* if(!!itemTbody){
						itemTbody.style.maxHeight = `200px`
					} */
				});
			}
		}
	},
	dropDownGlobal(){
		$(document).on("click",function(e){
			if($(e.target).closest(".dropdown_item").length){
				return;
			}
			$(".dropdown_option_wrap").hide();
		});
		


		$(window).on("resize scroll",function(){
			$(".dropdown_option_wrap").hide();
		});
		$(".popup_contents_row").on("scroll",function(){
			$(".dropdown_option_wrap").hide();
		});
	},
	dropDown(option){
		const page_wrap = $(".page_wrap");
		const dropdown = $(option.target);
		const dropdown_target = dropdown.find(".dropdown_target");
		dropdown_target.on("click",function(e){
			e.preventDefault();
			let $this = $(this);
			let $thisParent = $this.closest(".dropdown_item");
			let $thisOptionWrap = $thisParent.find(".dropdown_option_wrap");
			let $thisOption = null;

			if($thisParent.hasClass("disabled")){return;}
			if($thisOptionWrap.length){
				$thisOptionWrap.attr("data-option",$thisParent.attr("id"));
				page_wrap.append($thisOptionWrap);
			}
			$thisOption = $("[data-option='"+$thisParent.attr("id")+"']");

			setTimeout(()=>{
				$(".dropdown_option_wrap").not($thisOption).hide();
				$thisOption.css({
					top : $thisParent[0].getBoundingClientRect().top + $thisParent.height() + 10,
					left : $thisParent[0].getBoundingClientRect().left + $thisParent.width() - $thisParent.width()/2
				}).show();
			},30)
		});
		$(document).on("click","[data-option='"+dropdown.attr("id")+"'] .dropdown_option",function(e){
			let $this = $(this);
			let $thisText = $this.text();
			let $thisValue = $this.attr("data-value");
			let $thisParents = $this.closest(".dropdown_option_wrap");
			let $thisItem = $("#"+$thisParents.attr("data-option"));
			$thisItem.find(".dropdown_target").text($thisText);

			if(option.changeCallback){
				option.changeCallback($thisText,$thisValue);
			}
		});
	}
};
H5.init();




/* popup */
class DesignPopup {
	constructor(option) {
	  // variable
	  this.option = option;
	  this.selector = document.querySelector(this.option.selector);
	  this.touchstart = "ontouchstart" in window;
	  if (!this.selector) {
		return;
	  }
  
	  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
	  this.domHtml = document.querySelector("html");
	  this.domBody = document.querySelector("body");
	  this.pagewrap = document.querySelector(".page_wrap");
	  this.layer_wrap_parent = null;
	  this.btn_closeTrigger = null;
	  this.scrollValue = 0;
  
	  // init
	  const popupGroupCreate = document.createElement("div");
	  popupGroupCreate.classList.add("layer_wrap_parent");
	  if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
		this.pagewrap.append(popupGroupCreate);
	  }
	  this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");
  
  
	  // event
	  this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
	  this.bg_design_popup = this.selector.querySelector(".bg_dim");
	  let closeItemArray = [...this.btn_close];
	  if (!!this.selector.querySelectorAll(".close_trigger")) {
		this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
		closeItemArray.push(...this.btn_closeTrigger);
	  }
	  if (closeItemArray.length) {
		closeItemArray.forEach((element) => {
		  element.addEventListener("click", (e) => {
			e.preventDefault();
			this.popupHide(this.selector);
		  }, false);
		});
	  }
	}
	dimCheck() {
	  const popupActive = document.querySelectorAll(".popup_wrap.active");
	  if (!!popupActive[0]) {
		popupActive[0].classList.add("active_first");
	  }
	  if (popupActive.length > 1) {
		this.layer_wrap_parent.classList.add("has_active_multi");
	  } else {
		this.layer_wrap_parent.classList.remove("has_active_multi");
	  }
	}
	popupShow(option) {
		let openTimer = 0;
		let instance_option = option;
		if(openTimer){
			clearTimeout(openTimer);
			openTimer = 0;
		}
	  this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
	  if (this.selector == null) { return; }
	  if (this.touchstart) {
		this.domBody.classList.add("touchDis");
	  }
	  this.selector.classList.add("active");
	  setTimeout(() => {
		this.selector.classList.add("motion_end");
		openTimer = setTimeout(() => {
			if ("openCallback" in instance_option) {
				instance_option.openCallback();
			}
	  	}, 400);
	  }, 30);
	  /* if (!!this.design_popup_wrap_active) {
		this.design_popup_wrap_active.forEach((element, index) => {
			if (this.design_popup_wrap_active !== this.selector) {
				element.classList.remove("active");
			}
		});
	  } */
	  this.layer_wrap_parent.append(this.selector);
	  this.dimCheck();
	}
	popupHide(option) {
	  let target = this.option.selector;
	  let instance_option = option;
	  if (!!target) {
		this.selector.classList.remove("motion");
		if ("beforeClose" in this.option) {
		  this.option.beforeClose();
		}
		if ("beforeClose" in instance_option) {
		  instance_option.beforeClose();
		}
		//remove
		this.selector.classList.remove("motion_end");
		setTimeout(() => {
		  this.selector.classList.remove("active");
		  let closeTimer = 0;
			if(closeTimer){
				clearTimeout(closeTimer);
				closeTimer = 0;
			}
			if ("closeCallback" in this.option) {
				this.option.closeCallback();
			}
			closeTimer = setTimeout(()=>{
				if ("closeCallback" in instance_option) {
				instance_option.closeCallback();
				}
			},30);  
		}, 400);
		this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
		this.dimCheck();
		
		
		if (this.design_popup_wrap_active.length == 1) {
		  this.domBody.classList.remove("touchDis");
		}
	  }
	}
  }
  
  
  function designModal(option) {
	const modalGroupCreate = document.createElement("div");
	let domHtml = document.querySelector("html");
	let design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
	let modal_wrap_parent = null;
	let modal_item = null;
	let pagewrap = document.querySelector(".page_wrap");
	let showNum = 0;
	let okTextNode = option.okText ?? '확인';
	let cancelTextNode = option.cancelText ?? '취소';
	modalGroupCreate.classList.add("modal_wrap_parent");
  
	if (!modal_wrap_parent && !document.querySelector(".modal_wrap_parent")) {
	  pagewrap.append(modalGroupCreate);
	} else {
	  modalGroupCreate.remove();
	}
	modal_wrap_parent = document.querySelector(".modal_wrap_parent");
  
	let btnHTML = ``;
  
	if (option.modaltype === "confirm") {
	  btnHTML = `
	  <a href="javascript:;" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">${okTextNode}</span></a>
		<a href="javascript:;" class="btn_modal_submit cancelcall"><span class="btn_modal_submit_text">${cancelTextNode}</span></a>
	  `;
	} else {
	  btnHTML = `
		<a href="javascript:;" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">${okTextNode}</span></a>
	  `;
	}
	
  
	let modal_template = `
	  <div class="modal_wrap">
		  <div class="bg_dim"></div>
		  <div class="modal_box_tb">
			  <div class="modal_box_td">
				  <div class="modal_box_item">
					  <div class="modal_box_message_row">
						  <p class="modal_box_message">${option.message}</p>
					  </div>
					  <div class="btn_modal_submit_wrap">
						  ${btnHTML}
					  </div>
					  <a href="javascript:;" class="btn_modal_close"><span class="hdtext">모달 닫기</span></a>
				  </div>
			  </div>
		  </div>
	  </div>
	`;
	modal_wrap_parent.innerHTML = modal_template;
	modal_item = modal_wrap_parent.querySelector(".modal_wrap");
	modal_item.classList.add("active");
	if (showNum) { clearTimeout(showNum); }
	showNum = setTimeout(() => {
	  modal_item.classList.add("motion_end");
	  modal_item.addEventListener("transitionend", (e) => {
		if (e.currentTarget.classList.contains("motion_end")) {
		  if (option.showCallback) {
			option.showCallback();
		  }
		}
	  });
	}, 10);
  
	let btn_modal_submit = modal_item.querySelectorAll(".btn_modal_submit");
	let btn_modal_close = modal_item.querySelectorAll(".btn_modal_close");
	if (!!btn_modal_submit) {
	  btn_modal_submit.forEach((item) => {
		let eventIs = false;
		if (eventIs) {
		  item.removeEventListener("click");
		}
		item.addEventListener("click", (e) => {
		  let thisTarget = e.currentTarget;
		  closeAction();
		  if (thisTarget.classList.contains("okcall")) {
			if (option.okcallback) {
			  option.okcallback();
			}
		  } else if (thisTarget.classList.contains("cancelcall")) {
			if (option.cancelcallback) {
			  option.cancelcallback();
			}
		  }
		  eventIs = true;
		});
	  });
	}
	if(!!btn_modal_close){
	  btn_modal_close.forEach((item)=>{
		let eventIs = false;
		if (eventIs) {
		  item.removeEventListener("click");
		}
		item.addEventListener("click", (e) => {
		  closeAction();
		  eventIs = true;
		});
	  })
	}
  
	function closeAction() {
	  let actionNum = 0;
	  modal_item.classList.remove("motion_end");
	  if (design_popup_wrap_active.length === 0) {
		domHtml.classList.remove("touchDis");
	  }
	  if (actionNum) { clearTimeout(actionNum); }
	  actionNum = setTimeout(() => {
		modal_item.classList.remove("active");
		modal_item.remove();
	  }, 500);
	}
  }