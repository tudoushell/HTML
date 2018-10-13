//获取轮播图的超链接
var banner_link = document.querySelectorAll(".banner_link"),
    a = banner_link[0].getElementsByTagName("a"),
    banner = document.querySelectorAll(".banner"),
    ul = banner[0].getElementsByTagName("ul"),
    li = ul[0].getElementsByTagName("li"),
    timer;
ul[0].style.width = li.length * banner[0].clientWidth + "px";

for(var i = 0; i < a.length; i++){
    a[i].num = i;
    bindEvent(a[i],"click",function(){
      var start = ul[0].offsetLeft;
      var end = this.num * -940;
      move(ul[0],start,end,20,function(){});
      changea(this.num);
    });
}

function changea(index){
    for(var i = 0; i < a.length; i++){
      a[i].style.background = "url('img/content/point.png') no-repeat";
    }
      a[index].style.background = " url('img/content/point_hover.png') no-repeat";
}

function  move(obj,start,end,speed,callback){
  var newplace;
  clearInterval(timer);
  if(start > end){
    speed = - speed;
  }
  timer = setInterval(function(){
    var currentplace = obj.offsetLeft;
    newplace = currentplace + speed;
    if(start >= end && newplace <= end || start <= end && newplace >= end ){
      newplace = end;
    }
    obj.style.left = newplace + "px";
    if(newplace == end){
      clearInterval(timer);
    }
  },30);
}











/**
 * 用于获取元素的样式
 * obj: 元素名
 * Style: 样式名
 * 
 */
function getStyle(obj,Style){
  if(window.getComputedStyle){
    return getComputedStyle(obj,null)[Style];
  }else{
    return obj.currentStyle[Style];
  }
}
/**
 * 功能：元素事件绑定
 * @param {元素名} obj 
 * @param {对元素的事件} eventStr 
 * @param {回调函数} callback 
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