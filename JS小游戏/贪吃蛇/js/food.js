(function (win) {
  function Random () {}

  Random.prototype.getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  win.Random = new Random();
})(window);

(function (win) {
  var elements = [];
  
  function Food(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  Food.prototype.init = function (map) {
    removeFood();
    
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
    this.x = window.Random.getRandom(0, map.offsetWidth / this.width) * this.width;
    this.y = window.Random.getRandom(0, map.offsetHeight / this.height) * this.height;
    div.style.x = this.x + 'px';
    div.style.y = this.y + 'px';

    map.appendChild(div);
    elements.push(div);
  }

  function removeFood() { // 移除上一个食物
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      ele.parentNode.removeChild(ele);
      elements.splice(i, 1);
    }
  }

  win.Food = Food;
})(window);