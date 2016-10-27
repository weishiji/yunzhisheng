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
      $logo.attr('src','/assets/img/logo/logo_color.png');
    }else{
      $topMenu.removeClass('fixed-color');
      $logo.attr('src','/assets/img/logo/logo_transparent.png');
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



if(YKU){
  player = new YKU.Player('youku-video',{
    client_id: '8aed8aeca16cd366',
    vid: 'XMTczNDkzNTI2OA==',
    width: '100%',
    height: '600',
    styleid: '0',
    autoplay: true,
    newPlayer: true
  });  
  function playVideo(){
    player.playVideo();
  }
  function pauseVideo(){
    player.pauseVideo();
  }
  $('#video-modal').on('open.zf.reveal',function(){
    playVideo();
  }).on('closed.zf.reveal',function(){
    pauseVideo();
  })
}

