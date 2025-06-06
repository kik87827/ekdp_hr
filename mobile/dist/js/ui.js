if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  

  commonLayout();
});

$(function(){
  dimLayerControl();
})

function commonInit() {
  var touchstart = "ontouchstart" in window;
  var userAgent = navigator.userAgent.toLowerCase();
  var checkitem = [];
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}


function commonLayout() {
  // mobile total
  function mbTotal() {
    var touchstart = "ontouchstart" in window;
    var btn_mobile_menu = document.querySelector(".btn_mobile_menu"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

    // init 
    if (mobile_mainmenu_zone === null) {
      return;
    }
    btn_mobile_menu.addEventListener("click", function(e) {
      e.preventDefault();
      totalOpen();
    }, false);
    btn_mbmenuclose.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);
    mainmenu_dim.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);

    function totalOpen() {
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function() {
        mobile_mainmenu_zone.classList.add("motion");
        if (touchstart) {
          domHtml.classList.add("touchDis");
        }
      }, 30);
    }

    function totalClose() {
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function() {
        mobile_mainmenu_zone.classList.remove("active");
        domHtml.classList.remove("touchDis");
      }, 500);
    }
  }
  mbTotal();
}

$(function(){

});




function selectFunc(){
	const form_select = document.querySelectorAll(".form_select");

	if(!!form_select){
		form_select.forEach((item)=>{
			valueCheck(item);
		});
	}

	addDynamicEventListener(document.body, 'change', '.form_select', function(e) {
		const thisTarget = e.target;

		valueCheck(thisTarget);
	});

	function valueCheck(target){
		if(!target.value){
		target.classList.add("current_placeholder");
		}else{
		target.classList.remove("current_placeholder");
		}
	}
}


function tblabelFunc(){
  const field_label_text = document.querySelectorAll(".field_label_text");
  let arrayWid = [];
  field_label_text.forEach((item)=>{
    arrayWid.push(item.getBoundingClientRect().width);
  });
  field_label_text.forEach((item)=>{
    item.style.width = Math.max.apply(null,arrayWid) + "px";
  });
}




/* popup */
function dimLayerControl(){
  var objThis = this,
    $modal = $(".dlayer_w");
  if($modal.length===0){return;}
  $modal.on("click",".dlayer_bg , .btn_dlayerclose,.closetrigger",function(e){
    var $this = $(this),
      $t_p = $this.parents(".dlayer_w");
    e.preventDefault();
    objThis.dimLayerHide({ 'target' : $t_p});
  });
}
function dimLayerShow(option){
  var touchIs = "ontouchstart" in window,
    $modal = null,
    $target = null;

  $(function(){
    $modal = $(".dlayer_w");
    
    $target = $(option.target);
    
    if($modal.length===0){return;}

    if($(".popup_zone").length==0){
      $(".page_wrap").append("<div class='popup_zone' />");
    }
    //$modal.removeClass("active");
    $(".popup_zone").append($target);
    $target.addClass("active");
    
    $(".page_wrap").css({"z-index":0});
    heightcheck();
    if("openCallback" in option){
      option.openCallback();
    }
    $("window").trigger("resize");
    function heightcheck(){
      if(touchIs){
        $("html").addClass("touchDis");
      }
    }
  });
}
function dimLayerHide(option){
  var touchIs = "ontouchstart" in window,
      $modal = null,
      $target = null;
    
  $(function(){
    $modal = $(".dlayer_w");
    $target = $(option.target);
    $target.removeClass("active");
    $(".page_wrap").css({"z-index":""});
    $("html,body").removeClass("touchDis");
    //scrollEnd();
    
    if("closeCallback" in option){
      option.closeCallback();
    }
    
    function scrollEnd(){
      if(touchIs){
        $("body").css({"margin-top":0});
        window.scrollTo(0,Number($("body").data("data-scr")));
      }
    }
  });
}



function scrollTable(){
  const data_tb_z = document.querySelectorAll(".data_tb_z");
  if(data_tb_z.length===0){return;}
  action();
  window.addEventListener("resize",()=>{
    action();
  });
  function action(){
    data_tb_z.forEach((element)=>{
      const thisObj = element;
      let datarow = thisObj.getAttribute("data-scrollrow");
      const thisHead = thisObj.querySelector(".define_thead");
      const thisBody = thisObj.querySelector(".define_tbody");
      const targetRow = thisBody.querySelectorAll("tr")[datarow];
      let scrollWid = getScrollBarWidth();
      if(targetRow !== undefined && thisHead !== null){
        thisBody.style.maxHeight = targetRow.offsetTop + "px";
        thisHead.style.paddingRight = `${scrollWid}px`;
      }
    });
  }
}

function getScrollBarWidth() {
	let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style",`width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style",`width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};




function tabUITab(target){
  const target_ui = document.querySelector(target);
	const tabmenu_box = target_ui.querySelectorAll(".tabmenu_box");
	const tabmenu_cont = target_ui.querySelectorAll(".tabmenu_cont_wrap .tabmenu_cont");
	let tabmenu_box_active = Array.from(tabmenu_box).filter(item => item.classList.contains("active"))[0];
	let tabmenu_cont_active = Array.from(tabmenu_cont).filter(item => item.classList.contains("active"))[0];
	tabmenu_box.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemDom = document.querySelector(targetItem.getAttribute("href"));
			if(tabmenu_box_active){
				tabmenu_box_active.classList.remove("active");
			}
			if(tabmenu_cont_active){
				tabmenu_cont_active.classList.remove("active");
			}
			if(!!targetItemDom){
				targetItemDom.classList.add("active");
				tabmenu_cont_active = targetItemDom;
			}
			targetItem.classList.add("active");
			tabmenu_box_active = targetItem;
		});
	});
}


function propsButton(){
  const props_button = document.querySelectorAll(".props_button");
  if(!!props_button){
    props_button.forEach((item)=>{
      item.addEventListener("click",(e)=>{
        e.preventDefault();
        const thisITem = e.currentTarget;
        const siblingItem = siblings(thisITem);

        if(!!siblingItem){
          siblingItem.forEach((item)=>{
            if(thisITem !== item){
              item.classList.remove("active");
            }
          });
        }
        thisITem.classList.toggle("active");
      });
    });
  }
}


function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}

function autoComplete(option){
  jQuery(document).ready(function ($) {
      $.ui.autocomplete.prototype._renderItem = function (ul, item) {
          var t = String(item.value).replace(
              new RegExp(this.term, "gi"),
              "<strong>$&</strong>");
          return $("<li></li>")
              .data("item.autocomplete", item)
              .append("<div>" + t + "</div>")
              .appendTo(ul);
      };
      const optionObj = option;
      if(!!optionObj){
          optionObj.forEach((item)=>{
              $(item.target).autocomplete({
                  minLength: 0,
                  source: item.data,
                  select: function (event, ui) {
                      $(this).val(ui.item.value);
                      console.log(ui.item);
                      $(".ui-autocomplete").addClass("hide");
                      return false;
                  }
              })
          })
      }

      $(".input_auto").on("keydown focus",function(){
        $(".ui-autocomplete").removeClass("hide");
      });
  });
}