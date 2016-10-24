$(document).foundation();

var $banner = $('div[data-banner]');
if($banner.length !== 0){
  $topMenu = $('#main-menu');
  $logo = $topMenu.find('.title-area img')
  function scrollY(){
    var scrollBarPos = $(this).scrollTop();
    var bannerHeight = $banner.outerHeight(true);
    if(scrollBarPos > bannerHeight){
      $topMenu.addClass('fixed-color');
      $logo.attr('src','/assets/img/logo_blue.png');
    }else{
      $topMenu.removeClass('fixed-color');
      $logo.attr('src','/assets/img/logo_white.png');
    }
  };
  scrollY();
  $(window).on('scroll',scrollY);
}

console.log($('.wechat'))
$('.wechat').hover(function(){
  console.log(123)
  $('#wechat-code').show();
},function(){
  $('#wechat-code').hide();
})
var $headerDropDown = $('header .is-drilldown');
$headerDropDown.css('height',$('#main-page').height() + $('footer').height())