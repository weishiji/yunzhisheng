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
      $logo.attr('src','/assets/img/logo/logo_color.svg');
    }else{
      $topMenu.removeClass('fixed-color');
      $logo.attr('src','/assets/img/logo/logo_white.svg');
    }
  };
  scrollY();
  $(window).on('scroll',scrollY);
}

$('.wechat').hover(function(){
  $('#wechat-code').show();
},function(){
  $('#wechat-code').hide();
})
var $headerDropDown = $('header .is-drilldown');
$headerDropDown.css({'height':$('#main-page').height() + $('footer').height(),'min-height' : 'auto'})

if(window.YKU){
  var _vid = $('input[name="vid"]').val();  
  player = new YKU.Player('youku-video',{
    client_id: '8aed8aeca16cd366',
    vid: _vid,
    width: '100%',
    height: '450',
    styleid: '0',
    autoplay: true,
    newPlayer: true
  });  
  function _playVideo(){
    try{
      player.playVideo();  
    }catch(e){
      console.warn('error you ku')
    }
    
  }
  function _pauseVideo(){
    try{
      player.pauseVideo();  
    }catch(e){
      console.warn('error you ku')
    }
  }

  $('#video-modal').on('open.zf.reveal',function(){
    _playVideo();
  }).on('closed.zf.reveal',function(){
    _pauseVideo();
  })
}
//首页闭环
var loopContent = {
  'application' : {
    'title' : 'AI基础架构'
    ,'content' : '以深度学习为代表的机器学习、高性能计算、大数据，是人工智能技术的“三驾马车”，驱动着人工智能的前进和发展。'
  }
  ,'brain' : {
    'title' : '认知智能'
    ,'content' : '理解：语言、图像、视频、理解<br>知识：知识表示与逻辑推理<br/>交互：问答、对话、聊天等<br>决策：效用函数，贝叶斯决策理论等<br/> 创造：语言、语音、图像自动生成<br/>学习：迁移学习、非监督学习、增强学习'
  }
  ,'people' : {
    'title' : '感知智能'
    ,'content' : '无感知不认知 ，感知智能是认知智能的基础。<br>物理空间：空间感知、环境感知<br/>网络空间：文本、知识库、用户行为<br>用户空间：语音、图像、视频等；降噪、增强等'
  }
  ,'study' : {
    'title' : '机器学习'
    ,'content' : '专门研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知 识结构使之不断改善自身的性能。'
  }
  ,'cloud' : {
    'title' : '云计算'
    ,'content' : '是指通常使用很多处理器或者某一集群中组织的几台计算机的计算系统和环境。'
  }
  ,'da' : {
    'title' : '大数据'
    ,'content' : '是需要新处理模式才能具有更强的决策力、洞察发现力和流程优化能力来适应海量、高增长率和 多样化的信息资产。'
  }
}
var $tooltip = $('.close-loop .left-tooltip')
$('.close-loop .ai-item').hover(function(){
  var _key = $(this).data('key');
  var data = loopContent[_key];
  $tooltip.show().find('.content').html('<h5 class="text-center">'+ data.title +'</h5><small>'+ data.content +'</small>');
},function(){
  //$tooltip.hide();
})
