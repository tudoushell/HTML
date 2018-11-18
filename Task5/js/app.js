window.onload = function(){
  var fourline = document.querySelectorAll('.fourline'),
       a = fourline[0].getElementsByTagName('a'),
       leftpic = document.querySelector('.leftpic'),
       rightpic = document.querySelector('.rightpic'),
       container = document.querySelector('.container'),
       pic = document.querySelector('.pic'),
       li = pic.getElementsByTagName('li'),
       li_num = li.length,                  //统计图片的个数
       picwidth = container.clientWidth,    //获取图片的宽度
       autonum = 1,
       timer;                               //自动切换图片的定时器
  pic.style.width = li_num * picwidth  +"px";
  autopic();
  for(let i = 0 , length = a.length ; i < length; i++){
    a[i].index = i+1;
     //点击圆点跳转到指定的图片
    a[i].onclick = function(){
      //中止自动切换图片定时器
      clearInterval(timer);
      //将当前的点击的图片的位置记录下来
      autonum = this.index;
      let start = pic.offsetLeft;
      let end = -this.index * picwidth;
      //设置a的样式
      setA(this.index-1);
      move(pic,start,end,20,function(){
        //自动切换图片
        autopic();
      });
    };
  }
  //设置自动切换
  function autopic(){
    //设置定时器
    timer = setInterval(function(){
        //用于图片记录切换到第几张图片
        autonum++;
        //当图片切换到最后一张时，则下一张图片为第1张
        if(autonum === li_num){
          autonum = 1;
        }
        move(pic,-500,-picwidth * autonum,20,function(){
          setA(autonum-1);
        });
    },3000);
  }
  //点击左键显示上个图片
  leftpic.onclick = function(){
      //获取ul的left
      let current = pic.offsetLeft;
      //显示当前第几张图片
      let index = parseInt(-current / picwidth);
      //当图片在第一张时，则下一次切换到最后一张
      if(index === 0){
        index = 5;
      }
      if(index >= 0){
        current = -picwidth * index;
      }
      index--;
      //暂停定时器
      clearInterval(timer);
      //记下当前图片位置
      autonum = index;
      if(index > 0){
        setA(index-1);
        move(pic,current,-picwidth * index,20,function(){
          autopic()
        });
      }else if (index === 0){
        setA(3);
        move(pic,current,-picwidth * index,20,function(){
          autopic();
        });
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
      //暂停定时器
      clearInterval(timer);
      //记下当前图片位置
      autonum = index;
      if(index < 5){
        setA(index-1);
        move(pic,current, -picwidth * index,20,function(){
          autopic();
        });  
      }else if(index === 5){
        //用于设置标签圆点样式跳转到第1个圆点
        setA(0);
        move(pic,current,-picwidth * index, 20,function(){
          autopic();
        })
      }   
  };

};

//设置a标签
function setA(index){
    var fourline = document.querySelectorAll('.fourline'),
        a = fourline[0].getElementsByTagName('a');
    for( let i = 0 , length = a.length; i < length ; i++){
      a[i].style.backgroundColor = "gray";
    }
    if(index === 4){
      a[0].style.backgroundColor = "#fab905";
    }else{
      a[index].style.backgroundColor = "#fab905";
    }
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