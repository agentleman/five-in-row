$(function(){
	kongbai={};
//渲染界面的函数
  var render=function(){
    for(var i=0;i<15;i++){
    $('<b>').addClass('hang').appendTo('.qipan');
       for(var j=0;j<15;j++){
//绘制页面到时候把每一个空白棋子位置的坐标放在kongbai这个对象里。
       kongbai[i+'-'+j]={x:i,y:j};
       $('<i>').addClass('shu').appendTo('.qipan')
       $('<div>').addClass('qizi')
       .attr('id',i+'-'+j)
       .data('pos',{x:i,y:j})//把每一个坐标对象保存到data这个属性里。
       .appendTo('.qipan')
      }
   }
   for (var i = 0; i < 5; i++){
      $('<span>').addClass('dian').appendTo('.qipan')
   };
 }
	render();
	$('.machine').on('click',function(){
		isAi=true;
		$('.click').removeClass('click');
		$(this).addClass('click');
		$('.qipan').empty();
		render();
	})
//使俩个参数变为一个字符串的函数
    var join=function(n1,n2){
       return n1+'-'+n2;
    }
//判断输赢的函数
   var panduan=function(pos,biao){
//横、竖、左斜、右斜直线上的同色棋子个数，biao是形参(传进来的hei或bai集合)。
       var h=1,s=1,zx=1,yx=1;
       var tx,ty;
       tx=pos.x; ty=pos.y;
       while(biao[join(tx,ty-1)]){
       	h++;ty--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx,ty+1)]){
       	h++;ty++;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty)]){
       	s++;tx--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty)]){
       	s++;tx++;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty+1)]){
       	zx++;tx--;ty++;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty-1)]){
       	zx++;tx++;;ty--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty-1)]){
       	yx++;tx--;ty--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty+1)]){
       	yx++;tx++;;ty++;
       }
       return Math.max(h,s,zx,yx);
    }

    var kaiguan=true;
        hei={};
        bai={};
    var isAi=true;
//进攻函数，判断一条线上的黑子和白子哪个多，把那个较多的子数赋给zuobiao,人机对战
    var ai=function(){
    	var zuobiao;
    	var max=-Infinity;
    	for(var i in kongbai){
    		var weixie=panduan(kongbai[i],hei);
    		if(weixie>max){
    			max=weixie;
    			zuobiao=kongbai[i];
    		}
    	}
    	var zuobiao2;
    	var max2=-Infinity;
    	for(var i in kongbai){
    		var weixie=panduan(kongbai[i],bai);
    		if(weixie>max2){
    			max2=weixie;
    			zuobiao2=kongbai[i];
    		}
    	}
    	return (max>max2)?zuobiao:zuobiao2;
    }
//每个棋子的点击事件
    $('.qizi').on('click',function(){
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return;
		}
       var pos=$(this).data('pos');
       if(kaiguan){
       	$(this).addClass('hei');
       	hei[pos.x+'-'+pos.y]=true;//把键为 pos.x+'-'+pos.y 值为 true 这个对象放到hei这个对象中。
       	delete kongbai[join(pos.x,pos.y)];
       	if(panduan(pos,hei)>=5){
       	$('.victory').html('黑棋胜').fadeIn().delay(1000).fadeOut(1500);
       	$('.qipan .qizi').off('click');
       	}else if (panduan(pos,bai)>=5) {
        $('.victory').html('白棋胜').addClass('bai').fadeIn().delay(1000).fadeOut(1500);
        $('.qipan .qizi').off('click');
        }
       // 	if(isAi){//人机对战判断
       // 		var pos=ai();
       // 		$('#'+join(pos.x,pos.y)).addClass('bai');
       // 		bai[join(pos.x,pos.y)]=true;
       // 		delete kongbai[join(pos.x,pos.y)];
       // 		return;
       // 	}
       }else{
       	 $(this).addClass('bai');
       	 bai[pos.x+'-'+pos.y]=true;
       	 if(panduan(pos,bai)>=5){
       			$('.victory').html('白棋胜').addClass('bai').fadeIn();
       		  $('.qipan .qizi').off('click');
       		}
       }
       kaiguan=!kaiguan;
   });
//游戏控制 按钮操作
    var time=30 ;
  setInterval(function(){
		  time--;
		$('.time .shuzi').text(time);
		if (time==0) {
			 time=30;
		}
	},1000)

    $('.person').on('click',function(){
      isAi=false;
      $('.click').removeClass('click');
      $(this).addClass('click');
      $('.qipan').empty();
      render();
    })

})
