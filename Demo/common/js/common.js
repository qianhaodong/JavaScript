// 通过 id 获取元素
function getById(id) {
  return document.getElementById(id);
}

// 获取一个元素的任意一个样式属性值 --- 字符串类型 -- 兼容代码
function getStyle(elem, attr) {
  // 判断浏览器
  return window.getComputedStyle ? window.getComputedStyle(elem, null)[attr] : window.currnetStyle[attr];
}

// 多功能动画函数
function animate(elem, json, fn) {
  clearInterval(elem.timer);

  elem.timer = setInterval(function() {
    var flag = true; // 默认，假设全部到达目的

    // 遍历对象中所有属性
    for (var attr in json) {
      if (attr === 'opacity') { // 透明度
        // 获取元素当前的透明度，将其放大 100 倍，方便计算
        var current = getStyle(elem, attr) * 100;
        var target = json[attr] * 100;
        // 移动的步数
        var step = (target - current) / 10;
        // Math.ceil() -- 向上取整，Math.floor() -- 向下取整
        step = (step > 0) ? (Math.ceil(step)) : (Math.floor(step));
        current += step;
        elem.style[attr] = current / 100;
      } else if (attr === 'zIndex') { // 层级
        elem.style[attr] = json[attr];
      } else { // 普通属性
        var current = parseInt(getStyle(elem, attr));
        var target = json[attr];
        var step = (target - current) / 10;
        step = (step > 0) ? (Math.ceil(step)) : (Math.floor(step));
        current += step;
        elem.style[attr] = current + 'px';
      }

      // 如果所有属性都为目标值后，则 flag 为 true，否则为 false
      if (current !== target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(elem.timer);
      if (fn) {
        fn();
      }
    }
  }, 10)
}
