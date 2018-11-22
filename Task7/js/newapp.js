/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */
(function(){
    // 1. 鼠标移入显示,移出隐藏
    showhide();
    // 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    showcategroy();
    // 3. 输入搜索关键字, 列表显示匹配的结果
    txtSearch();
    // 4. 点击显示或者隐藏更多的分享图标
    shareIcon();
    // 5. 鼠标移入移出切换地址的显示隐藏
    changeAddress();
    // 6. 点击切换地址tab
    changeTab();
    // 7. 鼠标移入移出切换显示迷你购物车
    shopCar();
    // 8. 点击切换产品选项 (商品详情等显示出来)
    changeProduct();
    // 9. 点击向右/左, 移动当前展示商品的小图片
    movepic();
    // 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    showPic();
    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    bigPic();
        

    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    function bigPic (){
      var $maskTop = $('#maskTop');    //图片区域
      var $mask = $('#mask');          //小黄块
      var $largeImg = $('#largeImg');  //大的图片
      var $loading = $('#loading');    //载入图标
      var $largeImgContainer = $('#largeImgContainer');  //右边图片区域
      var $mediumImg = $('#mediumImg');
      var maskWidth = $mask.width();    //小黄块的宽度
      var maskHeight = $mask.height();  //小黄块的高度
      var width = $maskTop.width();
      var height = $maskTop.height();
      $maskTop.hover(function(){
        //加载大的图片
        var src = $mediumImg.attr("src").replace("m.jpg","l.jpg");
        $largeImg.attr("src",src);

        $largeImg.on("load",function(){
          $largeImg.show();   //显示大图片
          $loading.hide();    //将load图片隐藏
          //鼠标移入
          $maskTop.mousemove(function(event){
            /*
              1、移动小黄块
              2、移动大图
            */
            //获取大图的宽度
           var largeWidth = $largeImg.width();
           //获取大图的高度
           var largeHeight = $largeImg.height();

            // 1、移动小黄块
            $mask.show();
            $largeImgContainer.show();  //显示右边的大图
            var left = 0;
            var top = 0;
            var moveLeft = event.offsetX;
            var moveTop = event.offsetY;
            left = moveLeft - (maskWidth / 2);  //将
            top = moveTop - (maskHeight / 2);   //
            // left[0,width - maskWidth]
            if(left < 0){
              left = 0;
            }else if(moveLeft > width - maskWidth/2){
              left = width - maskWidth;
            }
            // top[0,height - maskHeight]
            if(top < 0){
              top = 0;
            }else if(moveTop > height - maskHeight/2){
              top = height - maskHeight;
            }
            //设置小黄的位置
            $mask.css({
              top:  top,
              left: left
            });
            //2、移动大图
            left = left * ($largeImg.width() / $maskTop.width());
            top = top * ($largeImg.height() / $maskTop.height());
            console.log(left);
            //右边移动大图的位置 放大作用
            $largeImg.css({
              top: -top,
              left: -left
            });
            //设置右边的框图的尺寸
            $largeImgContainer.css({
              width: largeWidth / 2,
              height: largeHeight / 2
            });
          });
        });
      },function(){
        $mask.hide();
        $largeImgContainer.hide();
      });
    }


    // 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function showPic(){
      var $li = $('#icon_list>li');
      $li.hover(function(){
        var $a = $(this).children();
        $a.attr('class','hoveredThumb');
        var src = $a.attr('src').replace('.jpg','-m.jpg');
        var $mediumImg = $('#mediumImg');
        $mediumImg.attr('src',src);
      },function(){
        $(this).children().removeClass();
      });
    }
    /*
    10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function showPic(){
      var $li = $('#icon_list>li');
      var $items = $('#icon_list>li>img');
      var $mediumImg = $('#mediumImg');
      var currentIndex = 0;
      var targetIndex;
      var imgIndex;
      $li.hover(function(){
        targetIndex = $(this).index();
        $items[currentIndex].className = "";
        $items[targetIndex].className = "hoveredThumb";
        imgIndex = (targetIndex)%4 + 1;
        $mediumImg.attr({
          src: "images/products/product-s"+(imgIndex)+"-m.jpg"
        });
        currentIndex = targetIndex;
      },function(){
        $items.removeClass();
      });
    }
    */

    // 9. 点击向右/左, 移动当前展示商品的小图片
    function movepic(){
      var $backward = $('#preview>h1>a:first');
      var $forward = $('#preview>h1>a:last');
      var $ul = $('#icon_list');
      var imgCount = $('#icon_list').children('li').length;
      var showPic= 5;
      var moveCount = 0;  //移动的次数 向右移为正，向左移为负
      var moveWidth = $ul.children('li').width();
      //初始化
      if(imgCount > showPic){
        $forward.attr('class','forward');
      }
      //向右移点击
      $forward.click(function(){
        if(moveCount === imgCount-showPic){
          return ;
        }
        moveCount++;
        if(moveCount === imgCount-showPic){
          $(this).attr('class','forward_disabled');
        }
        $backward.attr('class','backward');
        $ul.css({
          left: -moveCount * moveWidth
        });
      });
      //向左移点击
      $backward.click(function(){
        if(moveCount === 0){
          return ;
        }
        moveCount--;
        if(moveCount === 0){
          $(this).attr('class','backward_disabled');
        }
        $forward.attr('class','forward');
        $ul.css({
          left: -moveCount * moveWidth
        });
      });
    }
    /*
    function movepic(){
      var $icon_list = $('#icon_list');
      var $first = $('#preview>h1>a:first');
      var $last = $('#preview>h1>a:last');
      $last.attr("class","forward");
      $('#preview>h1>a:first').click(function(){
        var currentLeft = $icon_list.position().left;
        var targetLeft;
        if(currentLeft === 0){
          this.className = "backward_disabled";
          $last.attr("class",'forward');
        }else{
          targetLeft = 62 + currentLeft;
          if(targetLeft === 0 ){
            this.className = "backward_disabled";
          }else{
            this.className = "backward";
          }
          $last.attr("class",'forward');
          $icon_list.css("left",targetLeft);
        }
      });
      $('#preview>h1>a:last').click(function(){
        var currentLeft = $icon_list.position().left;
        var targetLeft;
        if(currentLeft === -186){
          this.className = "forward_disabled";
          $first.attr("class",'backward');
        }else{
          $('#preview>h1>a:first').className = "backward";
          targetLeft = -62 + currentLeft;
          if(targetLeft === -186){
            $last.attr("class",'forward_disabled');
          }else{
            this.className = "forward";
          }
          $first.attr("class",'backward');
          $icon_list.css("left",targetLeft);
        }
      });
    }
    */

    // 8. 点击切换产品选项 (商品详情等显示出来)
    function changeProduct(){
      var current = 0;
      var $items = $('#product_detail>ul>li');
      var $product_index = $('#product_detail>div:gt(0)');
      $items.click(function(){
          var target = $(this).index();
          $items[current].className = "";
          $items[target].className = "current";
          $product_index.eq(current).hide();
          $product_index.eq(target).show();
          current = target;
      });
    }
    // 7. 鼠标移入移出切换显示迷你购物车
    function shopCar(){
      $('#minicart').hover(function(){
        this.className = "minicart";
        $(this).children('div').show();
      },function(){
        this.className = "";
        $(this).children('div').hide();        
      });
    }
    // 6. 点击切换地址tab
    function changeTab(){
      var current = 0;
      var $items = $('#store_tabs>li')
      $('#store_tabs>li').click(function(){
        var target = $(this).index();
        $items[current].className = "";
        $items[target].className = "hover";
        current =target;
      });
    }
    // 5. 鼠标移入移出切换地址的显示隐藏
    function changeAddress (){
      $('#store_select')
      .hover(function(){
       $(this).children(":gt(0)").show();
      },function(){
        $(this).children(":gt(0)").hide();
      })
      .children(':last')
      .click(function(){
        $('#store_select').children(":gt(0)").hide();
      });
    }

    // 4. 点击显示或者隐藏更多的分享图标
    function shareIcon (){
      var isOpen = false;
      var $parent = $('#dd');
      $('#shareMore').click(function(){
        var $b = $(this).children();
        var $icon = $(this).prevAll(":lt(2)");
          if(isOpen){
            $parent.css("width",155);
            $b.removeClass();
            $icon.hide();
          }else{
            $parent.css("width",200);
            $b.addClass('backword');
            $icon.show();
          }
          isOpen = !isOpen;
      });
     
    }

    // 3. 输入搜索关键字, 列表显示匹配的结果
    function txtSearch (){
      $('#txtSearch').on('focus keyup',function(){
       //用于去除两端的空格，则输入空格不触发
        var str = this.value.trim();
        if(str){
          $('#search_helper').show();
        }
      }).blur(function(){
        $('#search_helper').hide();
      });
    }
  
    // 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    function showcategroy(){
      $('#category_items>.cate_item').hover(function(){
        $(this).children('.sub_cate_box').show();
      },function(){
        $(this).children('.sub_cate_box').hide();
      });
    }
    // 1. 鼠标移入显示,移出隐藏
    // 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
    function showhide(){
      $('[name=show_hide]').hover(function(){
        var id = this.id + "_items";
        $("#" + id).show();
      },function(){
        var id = this.id + "_items";
        $("#" + id).hide();
      });
    }
})()