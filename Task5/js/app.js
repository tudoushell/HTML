window.onload = function(){
  var fourline = document.querySelectorAll('.fourline'),
       a = fourline[0].getElementsByTagName('a'),
       leftpic = document.querySelector('.leftpic'),
       rightpic = document.querySelector('.rightpic'),
       container = document.querySelector('.container'),
       pic = document.querySelector('.pic'),
       picwidth = container.clientWidth;
  pic.style.width = 7 * picwidth  +"px";
  for(let i = 0 , length = a.length ; i < length; i++){
    a[i].index = i+1;
    //点击圆点跳转到指定的图片
    a[i].onclick = function(){
      let start = pic.offsetLeft;
      let end = -this.index * picwidth;
      //设置a的样式
      setA(this.index-1);
      move(pic,start,end,20,function(){
      });
    };
  }
  //点击左键显示上个图片
  leftpic.onclick = function(){
      let current = pic.offsetLeft;
      let index = parseInt(-current / picwidth);
      console.log(index);
      if(index === 0){
        index = 5;
      }
      if(index >= 0){
        current = -picwidth * index;
      }
      index--;
      if(index > 0){
        setA(index-1);
        console.log("current"+current+" pic"+(-picwidth*index));
        move(pic,current,-picwidth * index,20,function(){});
        
      }else if (index === 0){
        setA(3);
        move(pic,current,-picwidth * index,20,function(){});
      }
  };
   //点击右键显示下个图片
  rightpic.onclick = function(){
      //获取当前的left
      let current = pic.offsetLeft;
      //index 主要用于检测正在显示当前的图片
      let index = Math.ceil(-current / picwidth);
      //当图片的位置为第5张时，将当前的图片位置设置为0
      //这样的话就可以从最后一张1.jpg 跳转到开头的1.jpg
      if(index === 5){
        index = 0;
      }
      if(index >= 0){
        current = -picwidth * index;
      }
      index++;
      if(index <= 4){
        setA(index-1);
        move(pic,current, -picwidth * index,20,function(){});  
      }else if(index === 5){
        //用于设置标签圆点样式跳转到第1个圆点
        setA(0);
        move(pic,current,-picwidth * index, 20,function(){})
      }
      
  };
};

//设置自动切换


//设置a标签
function setA(index){
    var fourline = document.querySelectorAll('.fourline'),
        a = fourline[0].getElementsByTagName('a');
    for( let i = 0 , length = a.length; i < length ; i++){
      a[i].style.backgroundColor = "gray";
    }
    a[index].style.backgroundColor = "#fab905";
}

//移动方法
function move(obj,start,end,speed,callback){
  clearInterval(obj.timer);
  if(start >= end){
    speed = - speed;
  }
  obj.timer = setInterval(function(){
    let start = obj.offsetLeft;
    newdistance = start + speed;
    if(speed < 0 && newdistance <= end || speed > 0 && newdistance >= end){
      newdistance = end;
    }
    obj.style.left = newdistance + "px";
    if(newdistance === end){
       callback && callback();
       clearInterval(obj.timer);
    }
  },50);
}