// 获取元素
function getElem(selector) {
  return document.querySelector(selector);
}

var start = getElem('.start');
var main = getElem('.main');
var score = getElem('#score');
var gameOver = getElem('.gameover');
var overScore = getElem('.over-score');
var btnBack = getElem('.btn-back');

// 定义变量
var intervalTimer = null;
var backgroundY = 0;
var mark = 0;
var bulletArray = []; // 存放子弹
var enemyArray = []; // 存放敌方飞机
var scores = 0; // 计分器

/* ===================================================== */
function Plan(bf, x, y, sizeX, sizeY, speed, score, dieTime, imgBoomScr, ImgSrc) {
  this.planBf = bf;
  this.planX = x;
  this.planY = y;
  this.planSizeX = sizeX;
  this.planSizeY = sizeY;
  this.planSpeed = speed; 
  this.planScore = score; 
  this.planDieTime = dieTime
  this.planImgBoomSrc = imgBoomScr;
  this.planImgSrc = ImgSrc;
  this.planIsDie = false; // 飞机默认正常
  this.planObj = null; // 飞机对象

  // 让敌方飞机移动
  this.enemyPlanMove = function() {
    this.planObj.style.top = this.planObj.offsetTop + this.planSpeed + 2 + 'px';
  }

  // 创建方法生成飞机对象
  this.init = function() {
    this.planObj = document.createElement('img');
    this.planObj.style.left = this.planX + 'px';
    this.planObj.style.top = this.planY + 'px';

    // 指定飞机图片的引用地址
    this.planObj.src = this.planImgSrc;

    // 将飞机添加到主界面中
    main.appendChild(this.planObj);
  }

  // 执行符
  this.init();
}

// 生成随机数
function createRandom(x, y) {
  return parseInt(Math.random() *(y - x) + x);
}

// 创建本方飞机对象的方法
function createOurPlan(x, y) {
  Plan.call(this, 1, x, y, 66, 80, 0, 0, 600, 'image/bffjbx.gif', 'image/wdfj.gif');
}

// 创建敌方飞机对象的方法
function createEnemyPlan(bf, x, y, sizeX, sizeY, speed, score, dieTime, imgBoomScr, imgSrc) {
  Plan.call(this, bf, createRandom(x, y), 10, sizeX, sizeY, speed, score, dieTime, imgBoomScr, imgSrc);
}

// 创建本方飞机
var ourPlan = new createOurPlan(127, 488);

// 让本方飞机移动
function planMove() {
  
  // 获取 js 中监听事件的对象
  var eve = event || window.event;
  // 获取游戏界面到浏览器边缘的距离
  var mainClientX = Math.floor((document.documentElement.clientWidth - 320) / 2);
  // 获取事件对象 x 轴，和 y 轴坐标
  var eveX = eve.clientX - mainClientX;
  var eveY = eve.clientY - 50;

  // 给飞机绑定一个坐标
  ourPlan.planObj.style.left = eveX - ourPlan.planSizeX / 2 + 'px';
  ourPlan.planObj.style.top = eveY - ourPlan.planSizeY / 2 + 'px';
}

// 让本方飞机到边界时停止移动
function planStopMove() {
  var eve = event || window.event;
  var mainClientX = Math.floor((document.documentElement.clientWidth - 320) / 2);
  var eveX = eve.clientX; // 获取对象到浏览器边缘的距离
  var eveY = eve.clientY;

  // 判断是否移出边界
  // if (eveX < (mainClientX + main.style.width - ourPlan.planSizeX / 2) && eveX > (mainClientX + ourPlan.planSizeX / 2) && eveY < (main.style.height + 50 - ourPlan.planSizeY / 2) && eveY > (50 + ourPlan.planSizeY)) {
  if (eveX < (mainClientX + 287) && eveX > (mainClientX + 33) && eveY < 578 && eveY > 90) {
    document.addEventListener('mousemove', planMove, true);
  } else {
    document.removeEventListener('mousemove', planMove, true);
  }
}

// 给鼠标添加监听事件
if (document.addEventListener) {
  document.addEventListener('mousemove', planMove, true);
  document.addEventListener('mousemove', planStopMove, true);
}
/* ===================================================== */


/* ===================================================== */
function Bullet(ak, x, y, sizeX, sizeY, imgSrc) {
  this.bulletAk = ak;
  this.bulletX = x;
  this.bulletY = y;
  this.bulletSizeX = sizeX;
  this.bulletSizeY = sizeY;
  this.bulletImgSrc = imgSrc;
  this.bulletObj = null; // 子弹对象

  // 让子弹移动
  this.bulletMove = function() {
    // 修改子弹 y 轴坐标
    this.bulletObj.style.top = this.bulletObj.offsetTop - 20 + 'px';
  }

  // 创建子弹图片对象
  this.init = function() {
    this.bulletObj = document.createElement('img');
    this.bulletObj.style.left = this.bulletX + 'px';
    this.bulletObj.style.top = this.bulletY + 'px';

    // 指定子弹图片的引用地址
    this.bulletObj.src = this.bulletImgSrc;
    
    // 添加子弹到主页面中
    main.appendChild(this.bulletObj);
  }

  // 自调用
  this.init();
}

// 创建子弹对象的方法
function createBullet(x, y) {
  Bullet.call(this, 1, x, y, 6, 14, 'image/bullet.png');
}
/* ===================================================== */


// 背景移动
function backgroundMove() {
  
  // 让背景图片坐标自增
  backgroundY += 3;

  // 设置主页面背景图片的坐标
  main.style.backgroundPositionY = backgroundY + 'px'

  mark++;
  if (mark % 5 === 0) {
    // 创建子弹，并添加到 bulletArray 数组中
    bulletArray.push(new createBullet(ourPlan.planObj.offsetLeft + ourPlan.planSizeX / 2 - 2, ourPlan.planObj.offsetTop));
  }

  if (mark === 100) {
    // 创建大飞机对象，并添加到 enemyArray 数组中
    enemyArray.push(new createEnemyPlan(3, 0, 210, 110, 164, 1, 300, 600, 'image/dfjbz.gif', 'image/enemy3-fly.png'));
    mark = 0;
  } else if (mark % 50 === 0) {
    // 中型飞机
    enemyArray.push(new createEnemyPlan(2, 0, 274, 46, 60, 2, 200, 400, 'image/zfjbz.gif', 'image/enemy2-fly.png'));
  } else if (mark % 10 === 0) {
    // 小飞机
    enemyArray.push(new createEnemyPlan(1, 0, 286, 34, 24, 3, 100, 200, 'image/xfjbz.gif', 'image/enemy1-fly.png'));
  }

  // 让子弹移动
  for (let i = 0; i < bulletArray.length; i++) {
    bulletArray[i].bulletMove();

    // 如果子弹移出边界，则删除子弹
    if (bulletArray[i].bulletObj.offsetTop < 0) {
      
      // 主页面清除子弹
      main.removeChild(bulletArray[i].bulletObj);

      // 删除对应数组中的子弹对象
      bulletArray.splice(i, 1);
    }
  }

  // 让敌方飞机移动
  for (let j = 0; j < enemyArray.length; j++) {

    // 判断飞机是否已经爆炸，默认正常（false）
    if (enemyArray[j].planIsDie === false) {
      enemyArray[j].enemyPlanMove();

      // 当飞到下边界时移除飞机
      if (enemyArray[j].planObj.offsetTop > 568 - enemyArray[j].planSizeY) {
        main.removeChild(enemyArray[j].planObj);
        enemyArray.splice(j, 1);
      }
    }

    // 如果飞机已经爆炸，则移除飞机
    if (enemyArray[j].planIsDie === true) {

      // 通过飞机死亡时间自减，当死亡时间 <= 0时，清除死亡飞机图片
      enemyArray[j].planDieTime -= 20
      if (enemyArray[j].planDieTime <= 0) {
        main.removeChild(enemyArray[j].planObj);
        enemyArray.splice(j, 1);
      }
    }
  }

  // 碰撞
  for (let i = 0; i < enemyArray.length; i++) {
    
    // 判断飞机是否死亡，默认正常
    if (enemyArray[i].planIsDie === false) {
      
      // 敌方飞机和子弹的碰撞，循环遍历子弹，判断坐标是否重合
      for (let j = 0; j < bulletArray.length; j++) {

        // 判断 x 轴是否重合
        if ((enemyArray[i].planObj.offsetLeft + enemyArray[i].planSizeX) > bulletArray[j].bulletObj.offsetLeft
        && enemyArray[i].planObj.offsetLeft < (bulletArray[j].bulletObj.offsetLeft + bulletArray[j].bulletSizeX)) {

          // 判断 y 轴是否重合
          if ((enemyArray[i].planObj.offsetTop + enemyArray[i].planSizeY) > bulletArray[j].bulletObj.offsetTop
          && enemyArray[i].planObj.offsetTop < (bulletArray[j].bulletObj.offsetTop + bulletArray[j].bulletSizeY)) {

            // 敌方飞机血量减少
            enemyArray[i].planBf -= bulletArray[j].bulletAk;

            // 当血量为零时，发生爆炸，计算分数
            if (enemyArray[i].planBf <= 0) {
              
              // 获取分数
              scores += enemyArray[i].planScore;

              // 显示分数到主界面
              score.innerText = scores;

              // 飞机爆炸，图片地址改为爆炸图片地址
              enemyArray[i].planObj.src = enemyArray[i].planImgBoomSrc;

              // 改变飞机死亡状态
              enemyArray[i].planIsDie = true;
            }

            // 子弹和敌方飞机碰撞后，子弹消失
            main.removeChild(bulletArray[j].bulletObj);
            bulletArray.splice(j, 1);
          }
        }
      }

      // 当敌方飞机和本方飞机发生碰撞，判断坐标是否重合
      if ((enemyArray[i].planObj.offsetLeft + enemyArray[i].planSizeX) > ourPlan.planObj.offsetLeft
      && enemyArray[i].planObj.offsetLeft < (ourPlan.planObj.offsetLeft + ourPlan.planSizeX)) {

        if ((enemyArray[i].planObj.offsetTop + enemyArray[i].planSizeY) > ourPlan.planObj.offsetTop
        && enemyArray[i].planObj.offsetTop < (ourPlan.planObj.offsetTop + ourPlan.planSizeY)) {

          // 碰撞后，显示弹出界面，游戏暂停
          gameOver.style.display = 'block';
          overScore.innerText = scores;
          clearInterval(intervalTimer);

          // 移除监听事件
          if (document.removeEventListener) {
            document.removeEventListener('mousemove', planMove, true);
            document.removeEventListener('mousemove', planStopMove, true);
          }
        }
      }
    }
  }
}

// 开始游戏
start.onclick = function gameStart() {
  this.style.display = 'none';
  main.style.display = 'block';

  // 开启间隔执行
  intervalTimer = setInterval(backgroundMove, 40);
}

// 返回主页
btnBack.onclick = function back() {
  // 刷新本页面
  history.go(0);
}
