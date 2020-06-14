const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const myAnchor = document.querySelector('a');

const width = canvas.width;
const height = canvas.height;

// randomメソッド。引数の数値の範囲から整数をランダムに生成する。
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// sleepメソッド。引数に指定した時間(ms)処理を停止する。
function sleep(waitMsec) {
  var startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}


/* Cellクラス */
// Cellクラスのコンストラクター
function Cell(x, y, color) {
  this.x = x*10;
  this.y = y*10;
  this.size = 10;
  this.color = color;
}

// Cellのdrawメソッド。指定した座標のセルを塗りつぶす。
Cell.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fillRect(this.x, this.y, this.size, this.size);
}

/* SnakeHeadクラス */
// SnakeHeadクラスのコンストラクター。Cellクラスを継承する。
function SnakeHead(x, y, color, direction, exists) {
  Cell.call(this, x, y, color);
  this.vel = 1;
  this.direction = direction;
  this.score = 0;
  this.exists = true
}

// SnakeHeadのdrawメソッド。
SnakeHead.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fillRect(this.x, this.y, this.size, this.size);
}

// SnakeHeadのupdateメソッド。
// SnakeHeadのdirectionプロパティの方向に座標を計算していく。
SnakeHead.prototype.update = function() {
  if(this.direction === 'right'){
    this.x += 10;
  }else if(this.direction === 'left'){
    this.x -= 10;
  }else if(this.direction === 'up'){
    this.y += 10;
  }else if(this.direction === 'down'){
    this.y -= 10;
  }
}

// SnakeHeadのsetControlsメソッド。
// w,a,s,dのキーリスナーにより、SnakeHeadの方向を決定する。
SnakeHead.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if(e.keyCode === 65) {
      if(_this.direction !== 'right'){
        _this.direction = 'left';
      }
    } else if (e.keyCode === 68) {
      if(_this.direction !== 'left'){
        _this.direction = 'right';
      }
    } else if (e.keyCode === 87) {
      if(_this.direction !== 'up'){
        _this.direction = 'down';
      }
    } else if (e.keyCode === 83) {
      if(_this.direction !== 'down'){
        _this.direction = 'up';
      }
    }
  }
}

// SnakeHeadのcheckCollisionメソッド。
// ゲームエリアの描画範囲の縁に達した時の処理。縁に達した時に反対方向から出てくる。
SnakeHead.prototype.checkCollision = function() {
  var _this = this;
  if (_this.x >= width) {
    this.x = 10;
  }
  if (_this.x <= 0) {
    this.x = 1000;
  }
  if (_this.y >= height) {
    this.y = 10;
  }
  if (_this.y <= 0) {
    this.y = 500;
  }
}

// SnakeHeadのcollisionDetectメソッド。
// ターゲットセルを獲得した時の処理。headがbodyに衝突した時の処理。
SnakeHead.prototype.collisionDetect = function() {
  if ((this.x === targetCell.x) && (this.y === targetCell.y)) {
    targetCell.x = random(1, 99)*10;
    targetCell.y = random(1, 49)*10;
    head.score += 1;
  }

  for (var i=0; i<bodys.length; i++) {
    if ((this.x === bodys[i].x) && (this.y === bodys[i].y)){
      this.exists = false;
    }
  }
}


/* SnakeBodyクラス */
// SnakeBodyクラスのコンストラクター。Cellクラスを継承。
function SnakeBody(x, y, color, number) {
  Cell.call(this, x, y, color);
  this.number = number;
}

// SnakeBodyのdrawメソッド。
SnakeBody.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fillRect(this.x, this.y, this.size, this.size);
}

// SnakeBodyのupdateメソッド。
// bodysリスト内の先頭のbodyオブジェクトは1ループ前のheadの座標を継承し、
// それ以降は一つ前のbodyオブジェクトの座標を継承する。
SnakeBody.prototype.update = function() {
  if (this.number > 0) {
    this.x = bodys[this.number-1].x;
    this.y = bodys[this.number-1].y;
  } else {
    this.x = head.x;
    this.y = head.y;
  }
}

/* TargetCellクラス */
// TargetCellコンストラクター。Cellクラスを継承する。
function TargetCell(x, y, color, exists) {
  Cell.call(this, x, y, color);
  this.exists = exists;
}

// TargetCellのdrawメソッド。
TargetCell.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(this.x, this.y, this.size, this.size);
}


// snake game
var bodys = []; // bodyオブジェクト保存ようのリスト
var head = new SnakeHead(50, 25, 'green', null, 0); // SnakeHeadのインスタンスを作成する。一度だけ実行すれば良い。
head.setControls(); // headに対してsetControlsメソッドを呼び出す。一度だけ実行すれば良い。
// TargetCellのインスタンスを作成する。
var targetCell = new TargetCell(
  random(2, 99),
  random(2, 49),
  "red",
  true
);

var count = 0;
function loop() {
  try {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    str = head.x+", "+head.y+", "+targetCell.x+", "+targetCell.y+", "+head.score+", "+bodys.length;
    console.log(str);

    targetCell.draw();

    // bodys配列中のbodyの数がheadのscoreに達するまで繰り返される。
    while (bodys.length < head.score){
      // SnakeBodyのインスタンスを作成する。
      var body = new SnakeBody(
        head.x,
        head.y,
        head.color,
        count
      );
      bodys.push(body); // bodys配列にbodyを追加する。
      count = count + 1;
    }

    // bodysの全てにupdateメソッドとdrawメソッドを実行する。
    for (var i=bodys.length-1; i>=0; i--) {
      bodys[i].update();
      bodys[i].draw();
    }

    head.update();
    head.draw();
    head.checkCollision();
    head.collisionDetect();

    if (!(head.exists)) {
      throw new Error('Game over');
    }

    myAnchor.textContent = head.score;

    sleep(50);
    requestAnimationFrame(loop); //　このメソッドで再実行が行われる。
  } catch (e) {
    console.log(e.message);
    clickStartButton();
    gameOverMenu();
  }

}

// clickStartButtonメソッド。メニューのstartボタンを押すとmenuが消える。
document.getElementById("menu_area").style.display ="block";
function clickStartButton() {
  const menu = document.getElementById('menu_area');
  if(menu.style.display=="block"){
		// noneで非表示
		menu.style.display ="none";
	}else{
		// blockで表示
		menu.style.display ="block";
	}
}

// gameOverMenuメソッド。メニュー画面の切り替え。
document.getElementById("welcome").style.display = "block";
document.getElementById("again").style.display = "none";
function gameOverMenu() {
  const welcome = document.getElementById('welcome');
  const start_again = document.getElementById('again');
  if(welcome.style.display=="block"){
		welcome.style.display ="none";
    start_again.style.display ="block";
	}else if(start_again.style.display=="block"){
    welcome.style.display ="block";
    start_again.style.display ="none";
	}
}

// menuのスタートボタンをクリックした時の処置
const startButton = document.querySelector('button');
startButton.onclick = function() {
  clickStartButton();
  loop();
}
