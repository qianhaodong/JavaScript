/* 声明子弹对象
 * ak ------ 子弹攻击力
 * x ------- 子弹 x 轴位置
 * y ------- 子弹 y 轴位置
 * sizeX --- 子弹宽度
 * sizeY --- 子弹高度
 * imgSrc -- 子弹图片地址
 */
function Bullet(ak, x, y, sizeX, sizeY, imgSrc) {
  this.bulletAk = ak;
  this.bulletX = x;
  this.bulletY = y;
  this.bulletSizeX = sizeX;
  this.bulletSizeY = sizeY;
  this.bulletImgSrc = imgSrc;
  this.bulletObj = null; // 子弹对象

  // 让子弹移动
  this.bulletMove = function() {}

  // 创建子弹图片对象
  this.init = function() {
    this.bulletObj = document.createElement('img');
    this.bulletObj.style.left = this.bulletX + 'px';
    this.bulletObj.style.top = this.bulletY + 'px';

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
