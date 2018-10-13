var banner_link = document.querySelectorAll(".banner_link"),      //获取轮播图的超链接
    a = banner_link[0].getElementsByTagName("a"),                 //获取轮播图的超链接a
    banner = document.querySelectorAll(".banner"),                
    ul = banner[0].getElementsByTagName("ul"),                    //获取轮播图的ul
    li = ul[0].getElementsByTagName("li"),                        //获取轮播图的li
    autonum = 0,                                                  //用于自动切换图片
    timer;                                                        //用来关闭定时器
ul[0].style.width = li.length * banner[0].clientWidth + "px";     //用于设置ul的宽度(有几张图片宽度为多少)

//自动切换图片
autopic();

//功能：当点击哪张图片就切换到哪一张图片
for(var i = 0; i < a.length; i++){
    a[i].num = i;
    bindEvent(a[i],"click",function(){
      //用于关闭自动切换图片的定时器
      clearInterval(timer);
      //用于记下从哪张图片自动切换
      autonum = this.num;
      var start = ul[0].offsetLeft;
      var end = this.num * -940;
      changea(this.num);
      move(ul[0],start,end,20,function(){
            autopic();
      });
    });
}
/****************功能函数********************/
/**
 * autopic的功能：
 *  自动切换图片
 */
function autopic(){
  timer = setInterval(function(){
    autonum++;
    autonum = autonum % li.length;
    var end = autonum * -940;
    move(ul[0],0,end,20,function(){
      changea(autonum);
    });
  },3000);
}

/**
 * changea函数的功能：
 * 当鼠标点击超链接并更改当前超链接的样式
 * @param {改变哪个超链接的索引} index 
 */

function changea(index){
    for(var i = 0; i < a.length; i++){
      a[i].style.background = "url('img/content/point.png') no-repeat";
    } 
    if(index == li.length-1){
      a[0].style.background = " url('img/content/point_hover.png') no-repeat";
    }else{
      a[index].style.background = " url('img/content/point_hover.png') no-repeat";
    }
}

/**
 * move函数的功能：
 * 将当前的元素移动到指定的位置
 * @param {想要移动元素} obj 
 * @param {移动的起始位置} start 
 * @param {移动的目的} end 
 * @param {移动的速度} speed 
 * @param {回调函数} callback 
 */

function  move(obj,start,end,speed,callback){
  clearInterval(obj.timer);
      var newplace;
      if(start > end){
        speed = - speed;
      }
      obj.timer = setInterval(function(){
      var currentplace = obj.offsetLeft;
      newplace = currentplace + speed;
      if(start >= end && newplace <= end || start <= end && newplace >= end ){
        newplace = end;
      }
      obj.style.left = newplace + "px";
      if(newplace == end){
        callback && callback();
        clearInterval(obj.timer);
      }
  },40);
}

/**
 * getStyle功能：
 * 用于获取元素的样式  
 * @param {元素名} obj 
 * @param {样式名} Style 
 * 兼容IE
 */

function getStyle(obj,Style){
  if(window.getComputedStyle){
    return getComputedStyle(obj,null)[Style];
  }else{
    return obj.currentStyle[Style];
  }
}

/**
 * bindEvent函数的功能：
 * 元素事件绑定
 * @param {元素名} obj 
 * @param {对元素的事件} eventStr 
 * @param {回调函数} callback 
 * 兼容IE
 */

function bindEvent(obj,eventStr,callback){
   if(obj.addEventListener){
     return obj.addEventListener(eventStr,callback,false);
   }else{
     return obj.attachEvent("on"+eventStr,function(){
        callback.call(obj);
     });
   }
}