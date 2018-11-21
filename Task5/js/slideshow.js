$(function(){
  var $ul = $('.pic'),
      $li = $('.pic>li'),
      $a = $('.fourline>a'),
      $pre = $('.leftpic>span'),
      $next = $('.rightpic>span'),
      $container = $('.container'),
      pageWidth = $container.width(),
      TIME = 400,        //移动的总时间
      ITEM_TIME = 20,     //移动的间隙时间
      imgCount = $li.length,
      index = 0,          //当前坐标
      moving = false;     //翻页的状态

      $ul.css('width',imgCount *$container.width());    //设置ul的长度
      //上一个图片           
      $pre.click(function(){
        nextPage(false);
      });

      //下一个图片
      $next.click(function(){
        nextPage(true);
      });

      //自动切换图片
      var intervalId = setInterval(function(){
        nextPage(true);
      },3000);

      //当鼠标移入图片停止翻动，移出时图片翻动
      $container.hover(function(){
        clearInterval(intervalId);
      },function(){
        intervalId = setInterval(function(){
          nextPage(true);
        },3000);
      });

      //点击图标切换到对应的页
      $a.click(function(){
        var targetIndex = $(this).index();
        if(targetIndex != index){
          nextPage(targetIndex);
        }
      });

      /**
       * @param {*} way 
       * 当way的值为true时，向前翻图  为负
       * 当way的值为false时，向后翻图 为正
       */
      function nextPage(way){

        if(moving){   //当没有到达目标left时，下面的程序不会运行
          return ;
        }
        moving = true; //标识正在翻页

        var page = 0;
        if(typeof way === 'boolean'){
          //当way的值为true时，向前翻图  为负
          //当way的值为false时，向后翻图 为正
          page = way ? -pageWidth : pageWidth;
        }else{ 
          //用于点击圆点
          page = (index - way) * pageWidth;
        }
        //翻转速度
        var itemOffset = page / (TIME / ITEM_TIME);
        //获取当前的ul的Left值
        var currentLeft = $ul.position().left;
        //翻转到目标点
        var targetLeft = currentLeft + page;
        //设置一个定时器
        var intervalId = setInterval(function(){
          currentLeft += itemOffset;
          if(currentLeft === targetLeft){
            clearInterval(intervalId);
            //当到达目标时，则可以进行下一次翻页
            moving = false;
            //当翻转到最左边图片时(4.jpg)，则要跳转到右边的(4.jpg)
            if(currentLeft === 0){
              currentLeft = -(imgCount - 2) * page;
            }else if(currentLeft === (imgCount - 1) * page){
              currentLeft = page;
            }
            //当翻转到最右边图片时(1.jpg)，则要跳转到左边的(1.jpg)
          }
          $ul.css('left',currentLeft);
        },ITEM_TIME);
        //自动切换圆点
        changePoints(way);
      };
      function changePoints(way){
        var targetIndex = 0;
        if(typeof way === 'boolean'){
          if(way){
            targetIndex = index + 1;
            if(targetIndex === imgCount - 2){   //当图片切换到最后1.jpg时，要立即切换到开头1.jpg
              targetIndex = 0;
            }
          }else{
            targetIndex = index - 1;
            if(targetIndex === -1){  //当图片切换到开头的4.jpg时，要立即切换到最后的4.jpg
              targetIndex = imgCount - 3;
            }
          }
        }else{
            targetIndex = way;
        }
        //将当前的class移除
        $a.eq(index).removeClass('on');
        //然后为目标添加class
        $a.eq(targetIndex).addClass('on');
        //作用：下次切换时，则清除class
        index = targetIndex;

      }
});