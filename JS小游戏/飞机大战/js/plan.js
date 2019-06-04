/* 飞机对象
 * bf ---------- 血量
 * x ----------- 飞机 x 轴位置
 * y ----------- 飞机 y 轴位置
 * sizeX ------- 飞机宽度
 * sizeY ------- 飞机高度
 * speed ------- 速度
 * score ------- 分数
 * dieTime ----- 死亡时间
 * imgBoomScr -- 爆炸图片地址
 * imgScr ------ 图片地址
 */
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

    // 指定图片的引用地址
    this.planObj.src = this.planImgSrc;

    // 将飞机添加到主界面中
    main.appendChild(this.planObj);
  }

  // 执行符
  this.init();
}

// 创建本方飞机对象的方法
function createOurPlan(x, y) {
  Plan.call(this, 1, x, y, 66, 80, 0, 0, 600, 'image/bffjbx.gif', 'image/wdfj.gif');
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

/* (function(win, doc) {
  // 飞机对象
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
  }

  Plan.prototype.init = function() {
    this.planObj = document.createElement('img');
    this.planObj.style.left = this.planX + 'px';
    this.planObj.style.top = this.planY + 'px';

    // 指定飞机图片的引用地址
    this.planObj.src = this.planImgSrc;

    // 将飞机添加到主界面中
    main.appendChild(this.planObj);
  };

  Plan.prototype.planMove = function() {

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
  };

  Plan.prototype.planStopMove = function() {
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
  };
})(window, document); */
