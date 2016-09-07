$(function(){
  //换图片
   var arr=[
        {src:"img/16.jpg"},
        {src:"img/17.jpg"},
        {src:"img/18.jpg"},
        {src:"img/19.jpg"}
        
        
    ]
    $(".tutu p").on("click",function(){

      $(".tutu img").attr("src",function(i,oldsrc){

        return arr[i].src;
              })
           })

//创建棋盘和棋子
 var isAi;
 var kongbai={};
    function chuangjian(){


    for(var i=0;i<15;i++ ){
        var top=i*40;
     $('<b>').addClass('heng').appendTo('.qipang');
     $('<i>').addClass('shu').appendTo('.qipang');
    for(var j=0;j<15;j++){
        left=j*40;
        kongbai[i + '-' + j] = {
                    x: i,
                    y: j
                };
        $('<div>').addClass('qizi').attr('id',i+'-'+j).data('pos', {
                    x: i,
                    y: j
                }).css({top:top,left:left}).appendTo('.qipang');
    }
 }

 }
 chuangjian();
 //进入选卡
 $('.start').on('click',function(){
    audio.src='yinyue/mp3.mp3';
    audio.play();
    $('.xuanka').addClass('xuanka1')
    $('.xuanka li').addClass('xuanka2')
 })
//通过选卡进入游戏
  $('.xuanka li:nth-child(3)').on('click',function(){
     audio.src='yinyue/098.wav';
       audio.play();
    $('.qipang').addClass('qipang1')
    $('.xuanka').removeClass('xuanka1');
    $('.xuanka li').removeClass('xuanka2');
    $('.left').addClass('left1');
     $('.right').addClass('right1');
      $('.tutu').removeClass('tutu1');
      aa();
    isAi=false;
  })
  $('.xuanka li:nth-child(2)').on('click',function(){
     audio.src='yinyue/098.wav';
       audio.play();
    $('.qipang').addClass('qipang1')
    $('.xuanka').removeClass('xuanka1');
    $('.xuanka li').removeClass('xuanka2');
     $('.tutu').removeClass('tutu1');
      $('.left').addClass('left1');
     $('.right').addClass('right1');
    isAi=true;
    aa();
  })
  $('.xuanka li:nth-child(1)').on('click',function(){
     audio.src='yinyue/098.wav';
       audio.play();
       $('.tutu').toggleClass('tutu1');
       
     })
   $('.xuanka li:nth-child(5)').on('click',function(){
     audio.src='yinyue/098.wav';
       audio.play();
       window.location.reload();
     })
//判断棋子每个方向的相同棋子的最大数
   var jion = function(n1, n2) {
        return n1 + '-' + n2;
    }
    var panduan = function(pos, color) {
        var dict = {};
        for (var i in biao) {
            if (biao[i] === color) {
                dict[i] = true;
            }
        }
        var h = 1
          , s = 1
          , zx = 1
          , yx = 1;
        var tx, ty;
     
        tx = pos.x;
        ty = pos.y;
     //判断左右
        while (dict[jion(tx, ty - 1)]) {
            h++;
            ty--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx, ty + 1)]) {
            h++;
            ty++;
        }
       
        tx = pos.x;
        ty = pos.y;
   //判断上下
        while (dict[jion(tx - 1, ty)]) {
            s++;
            tx--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty)]) {
            s++;
            tx++;
        }
        
        tx = pos.x;
        ty = pos.y;
   //判断
        while (dict[jion(tx - 1, ty + 1)]) {
            zx++;
            tx--;
            ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty - 1)]) {
            zx++;
            tx++;
            ty--;
        }
       
        tx = pos.x;
        ty = pos.y;
     //判断
        while (dict[jion(tx - 1, ty - 1)]) {
            yx++;
            tx--;
            ty--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty + 1)]) {
            yx++;
            tx++;
            ty++;
        }
        
        return Math.max(h, s, zx, yx);
    }
 //人机对战，机器对人的进攻和防守
    var ai = function() {
        var zuobiao;
        var max = -Infinity;
        for (var i in kongbai) {
            var weixie = panduan(kongbai[i], 'hei');
            if (weixie > max) {
                max = weixie;
                zuobiao = kongbai[i];
            }
        }
        var zuobiao2;
        var max2 = -Infinity;
        for (var i in kongbai) {
            var weixie = panduan(kongbai[i], 'bai');
            if (weixie > max2) {
                max2 = weixie;
                zuobiao2 = kongbai[i];
            }
        }
      //判断攻击和防守
        return (max > max2) ? zuobiao : zuobiao2;
    }
 //判断人机对战和人人对战
     var biao={};
     var brr=[];
     var flag=true;
   
   
 $('.qipang .qizi').on('click',function(){
      audio.src='yinyue/097.wav';
       audio.play();
 	if($(this).hasClass('hei')||$(this).hasClass('bai')){
 	return;
 }

    var pos=$(this).data('pos')
   if(!isAi){
    if(flag){
       $('<div>')
      .addClass('qizi hei')
      .appendTo('.qipang')
      .delay(2)
      .animate({
        top:$(this).position().top,
        left:$(this).position().left,
        opacity:1
      })
      brr.push($('hei'))
        //$(this).addClass('hei');
        biao[pos.x+'-'+pos.y]='hei';

        
      /* $('.fanhui').on('click',function(){
        console.log(biao[pos.x+'-'+pos.y])
    delete $('#'+pos.x+'-'+pos.y).removeClass('hei')
        })*/
        if(panduan(pos,'hei')>=5){
          $('.qipang .tishi').css({
                            'display': 'block'
                        }).animate({
                            opacity: 1
                        })
           $('.qipang .qizi').off('click');
           /*audio.src='yinyue/097.wav';
           audio.play();*/
        }
       
        flag=false;
    }else{
         $('<div>')
      .addClass('qizi bai')
      .appendTo('.qipang')
      .delay(2)
      .animate({
        top:$(this).position().top,
        left:$(this).position().left,
         opacity:1
      })
        //$(this).addClass('bai')
        biao[pos.x+'-'+pos.y]='bai';
        brr.push(pos.x+'-'+pos.y);
        /* $('.fanhui').on('click',function(){
    delete biao[brr[brr.length-1]]
})*/
        if(panduan(pos,'bai')>=5){
           $('.qipang .tishi').css({
                            'display': 'block'
                        }).animate({
                            opacity: 1
                        })
           $('.qipang .qizi').off('click');
           /* audio.src='yinyue/097.wav';
           audio.play();*/
        }
        
        flag=true;
    }
    
 

   }else{
           $('<div>')
      .addClass('qizi hei')
      .appendTo('.qipang')
      .delay(2)
      .animate({
        top:$(this).position().top,
        left:$(this).position().left,
         opacity:1
      })
       //$(this).addClass('hei');
         biao[pos.x + '-' + pos.y] = 'hei';
                // flag=!flag;
           brr.push(pos.x+'-'+pos.y);
           console.log(brr)
           $('.fanhui').on('click',function(){
        delete biao[brr[brr.length-1]]
})
                delete kongbai[jion(pos.x, pos.y)];
                if (panduan(pos, 'hei') >= 5) {
                    $('.qipang .tishi').css({
                        'display': 'block'
                    }).animate({
                        opacity: 1
                    })
                    // alert('黑棋获胜');
                    $('.qipang .qizi').off('click');
                    window.location.reload();
                } 
                var pos = ai();
         $('<div>')
      .addClass('qizi bai')
      .appendTo('.qipang')
      .delay(4)
      .animate({
        top:$('#' + pos.x + '-' + pos.y).position().top,
        left:$('#' + pos.x + '-' + pos.y).position().left,
         opacity:1
      })

                 //$('#' + pos.x + '-' + pos.y).addClass('bai');
                biao[pos.x + '-' + pos.y] = 'bai';
                 brr.push(pos.x+'-'+pos.y);
                 $('.fanhui').on('click',function(){
    delete biao[brr[brr.length-1]]
})
                delete kongbai[jion(pos.x, pos.y)];
                if (panduan(pos, 'bai') >= 5) {
                    $('.qipang .tishi').css({
                        'display': 'block'
                    }).animate({
                        opacity: 1
                    })
                   /* audio.src='yinyue/mp3.mp3';
                    audio.play();*/
                    // console.log('白棋获胜');
                    $('.qipang .qizi').off('click');
                    window.location.reload();
                    }

   }
 	
 	})
  
    console.log(brr) 

$('.button').on('click',function(){
     window.location.reload();
})

  $('.fanhui').on('click',function(){
    delete biao[brr[brr.length-1]]
})
 var num=0;
 var num1=0;
 var aa=function(){
  setInterval(function(){
   num++;
    
   if(num==60){
    num1++;
    if(num1<10){
     $('.right .time .time1').text("0"+num1)
    }else{
      $('.right .time .time1').text(num1)
    }
    
    num=0;
   }
   if(num<10){
   $('.right .time .time2').text('0'+num);
   }else{
     $('.right .time .time2').text(num);
   }
  
    },1000)


 }
 $('.fanhui').on('click',function(){
      window.location.reload();
 })
 









})