var canvas = document.querySelector("canvas");

canvas.height = 1300;
// canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

var c = canvas.getContext("2d");
const gravity = 0.5;
let notover = false;
let scroll_speed = 10;
let winn = false;
var gokupos = new Image();
gokupos.src = "gokupos.png";
var kamehameha = new Image();
kamehameha.src = "kamehameha.png";
var saiba = new Image();
saiba.src = "saiba.png";
let action = "standing";
let frame = 0;
let enemyframe = 0;
let headmoveframe = 0;
let is_kamehameha_available = false;
function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256); // Random red value
  const g = Math.floor(Math.random() * 256); // Random green value
  const b = Math.floor(Math.random() * 256); // Random blue value
  return `rgb(${r}, ${g}, ${b})`;
}
var fire_x = 0;
var fire_y = 0;
var fire_w = 450;
var fire_h = 100;
class Enemy {
  constructor(x, y, end) {
    this.position = {
      x: x,
      y: y - 40,
    };
    this.velocity = {
      x: 2,
      y: 0,
    };
    this.pos = {
      start: this.position.x,
      end: end,
    };
    this.visible = true;
    this.direction = true;
    this.width = 200;
    this.height = 150;
    this.t = 0;
  }
  draw() {
    c.fillStyle = "black";
    if(this.direction)
    c.drawImage(saiba ,this.t, 0 , 100 , 100 , this.position.x , this.position.y + 10, this.width, this.height);
    else
    c.drawImage(saiba ,this.t, 100 , 100 , 100 , this.position.x , this.position.y + 10, this.height, this.height);
    // c.fillRect(this.position.x, this.position.y, 100, 100);
    // c.fillStyle = getRandomRGBColor();
    // c.fillRect(this.position.x + 10 , this.position.y + 10 , 20 , 20);
    // c.fillRect(this.position.x + this.width - 30 , this.position.y +10 , 20 , 20);
    if(frame % 5 === 0)
    {
      this.t += 100;
    }
    enemyframe++;
    this.t %= 700;
  }
  update() {
    if(this.visible)
    {
    this.draw();
    if (this.position.x > this.pos.end || this.position.x < this.pos.start)
    {
      this.velocity.x = -this.velocity.x;
      this.direction = !this.direction;
    }
    this.position.x += this.velocity.x;
    }
  }
}
let time_of_kamehama = 0;
let kamehameha_time = 0;
let k_width = 150;
class Goku {
  constructor() {
    this.position = {
      x: 250,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 150;
    this.height = 150;
    this.t = 0;
    this.k = 0;
    this.kame = 100;
  }
  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      gokupos,
      0 + this.t,
      200,
      100,
      100,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.t += 100;
    this.t = this.t % 800;
  }
  kamehameha(){
    fire_x = this.position.x + this.width;
    fire_y = this.position.y + 40;   
    c.drawImage( kamehameha,this.k,0,this.kame, 100,this.position.x,this.position.y,k_width,this.height);
    kamehameha_time++;
  if (frame % 20 == 0) {
    if (this.k != 900)
      { 
      this.k += 100;
      k_width = 150;
      this.kame = 100; 
      time_of_kamehama = 0; 
    }
    else
    {
      if(time_of_kamehama < 10)
      {
       k_width = 600;
       this.kame = 300;
       time_of_kamehama++;
      }
    }
    headmoveframe += this.k;
  }
  this.k = this.k % 1200;
  frame += 1;
  frame %= 20;
  }
  standing() {
    c.drawImage(
      gokupos,
      0 + this.t,
      200,
      100,
      100,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (frame % 5 == 0) this.t += 100;
    this.t = this.t % 800;
    frame += 1;
    frame %= 5;
  }
  moveright() {
    c.drawImage(
      gokupos,
      0 + this.t,
      0,
      100,
      100,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (frame % 5 == 0) this.t += 100;
    this.t = this.t % 800;
    frame += 1;
    frame %= 5;
  }
  moveleft() {
    c.drawImage(
      gokupos,
      this.t,
      100,
      100,
      100,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (frame % 5 == 0) this.t += 100;
    this.t = this.t % 800;
    frame += 1;
    frame %= 5;
  }
  headmove() {
    c.drawImage(
      gokupos,
      this.t,
      300,
      100,
      100,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (frame % 20 == 0) {
      if (this.t != 1500) this.t += 100;
      headmoveframe += this.t;
    }
    this.t = this.t % 1600;
    frame += 1;
    frame %= 20;

  }
  update() {
    if (action === "standing") this.standing();
    else if (action === "moveright") this.moveright();
    else if (action === "moveleft") this.moveleft();
    else if (action === "headmove") this.headmove();
    else if (action === "kamehameha") this.kamehameha();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y < 0) {
      this.velocity.y = gravity;
    }
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
class Platform {
  constructor({ x, y, w, h }) {
    this.position = {
      x: x,
      y: y * (86 / 100),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = w;
    this.height = h;
  }
  draw() {
    c.fillStyle = "black";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
class Obj {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = 22800;
    this.height = canvas.height;
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
class Obstacle {
  constructor({ x, y, w, h }) {
    this.position = {
      x: x,
      y: y * (86 / 100),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = w;
    this.height = h;
  }
  draw() {
    c.fillStyle = "brown";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
const goku = new Goku();
const enemy = [
  new Enemy(2400, 650, 3000),
  new Enemy(3500, 650, 3900),
  new Enemy(4600, 720, 5500),
  new Enemy(5000, 80, 5500),
  new Enemy(8325 , 600 , 8700),
  new Enemy(6500 , 600 , 6900),
  new Enemy(14200 , 950 , 14700)
];
const image = new Image();
image.src = "temp.png";
const jumpaudio = new Audio("Punnet.mp3");
const goku_screaming = new Audio("goku_screaming.mp3");
const platforms = [
  new Platform({ x: 0, y: 600, w: 1240, h: 20 }),
  new Platform({ x: 1760, y: 750, w: 600, h: 50 }),
  new Platform({ x: 2350, y: 900, w: 1640, h: 50 }),
  new Platform({ x: 3230, y: 750, w: 380, h: 20 }),
  new Platform({ x: 4000, y: 960, w: 2200, h: 20 }),
  new Platform({ x: 4600, y: 800, w: 360, h: 20 }),
  new Platform({ x: 5630, y: 840, w: 240, h: 20 }),
  ,
  new Platform({ x: 5280, y: 720, w: 230, h: 20 }),
  new Platform({ x: 4940, y: 560, w: 350, h: 20 }),
  new Platform({ x: 5400, y: 450, w: 340, h: 20 }),
  new Platform({ x: 5050, y: 200, w: 700, h: 20 }),
  new Platform({ x: 6550, y: 820, w: 460, h: 20 }),
  new Platform({ x: 7400, y: 620, w: 460, h: 20 }),
  new Platform({ x: 8325, y: 845, w: 460, h: 20 }),
  new Platform({ x: 9070, y: 550, w: 460, h: 20 }),
  new Platform({ x: 9980, y: 740, w: 240, h: 20 }),
  new Platform({ x: 10965, y: 1055, w: 235, h: 20 }),
  new Platform({ x: 11820, y: 625, w: 235, h: 20 }),
  new Platform({ x: 12790, y: 850, w: 240, h: 20 }),
  new Platform({ x: 13770, y: 695, w: 240, h: 20 }),
  new Platform({ x: 14270, y: 1220, w: 560, h: 200 }),
  new Platform({ x: 15200, y: 1000, w: 250, h: 20 }),
  new Platform({ x: 15880, y: 720, w: 300, h: 20 }),
  // new Platform({ x: 16310, y: 1100, w: 640, h: 20 }
  // new Platform({ x: 15060, y: 1020, w: 1025, h: 20 })
];
const obj = [new Obj({ x: 0, y: 0, image })];
const obstacles = [
  new Obstacle({ x: 1240, y: 820, w: 520, h: 20 }),
  new Obstacle({ x: 6200, y: 1320, w: 8065, h: 20 }),
  new Obstacle({ x: 14830, y: 1340, w: 6600, h: 20 }),
];
const winners = [new Platform({ x: 18600, y: 1200, w: 900, h: 20 })];
const message = new Platform({ x: 16640, y: 450, w: 300, h: 20 });
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};
function playAudio(x) {
  x.play();
}

function pauseAudio(x) {
  x.pause();
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  platforms.forEach((platform) => {
    platform.update();
  });
  obstacles.forEach((obstacle) => {
    obstacle.update();
  });
  winners.forEach((win) => {
    win.update();
  });
  message.update();
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  obj.forEach((obj) => {
    obj.draw();
  });
  enemy.forEach((enemy) => {
    if(enemy.position.x  + 600 < goku.position.x )
    {
      enemy.visible = true;
    }
    enemy.update();
  });
  if(is_kamehameha_available)
  {
    // c.rect(fire_x , fire_y, fire_w, fire_h);
    enemy.forEach((enemy) => {
      if(enemy.position.x < fire_x + fire_w && fire_y  + fire_h >= enemy.position.y  && Math.abs(enemy.position.y - fire_y) < 150 && kamehameha_time > 200)
      {
        enemy.visible = false;
      }
    });
  }
  goku.update();
  // platforms.forEach((platform) => {
  //     platform.update();
  // });
  // obstacles.forEach((obstacle) => {
  //     obstacle.update();
  // });
  // winners.forEach((win) => {
  //     win.update();
  // });
  // message.update();
  if (notover) {
    c.fillStyle = "brown";
    // c.fillRect(0, 0, 200, 100);
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.font = "250px Arial";
    c.fillText("You Lose", 1000, 600);
    c.fillStyle = "white";
    c.font = "80px Arial";
    c.fillText("Click 'r' to play again", 1000, 800);
  }
  if (winn) {
    c.fillStyle = "red";
    // c.fillRect(500, 300, 2000, 1000);
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.font = "150px Arial";
    c.fillText("YOU, WON THE GAME!", 900, 600);
    c.font = "80px Arial";
    c.fillText("Click 'r' to play again", 1000, 800);
  }
  if (keys.right.pressed && goku.position.x < 400) {
    goku.velocity.x = 5;
  } else if (keys.down.pressed && goku.position.x < 400) {
    goku.velocity.x = 5;
  } else if (keys.left.pressed && goku.position.x > 100) {
    goku.velocity.x = -5;
  } else {
    goku.velocity.x = 0;
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= scroll_speed;
      });
      obstacles.forEach((obstacle) => {
        obstacle.position.x -= scroll_speed;
      });
      winners.forEach((win) => {
        win.position.x -= scroll_speed;
      });
      message.position.x -= scroll_speed;
      obj[0].position.x -= scroll_speed;
      enemy.forEach((enemy) => {
        enemy.position.x -= scroll_speed;
        enemy.pos.start -= scroll_speed;
        enemy.pos.end -= scroll_speed;
      });
      headmoveframe = 0;
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += scroll_speed;
      });
      obstacles.forEach((obstacle) => {
        obstacle.position.x += scroll_speed;
      });
      winners.forEach((win) => {
        win.position.x += scroll_speed;
      });
      message.position.x += scroll_speed;
      obj[0].position.x += scroll_speed;
      headmoveframe = 0;
      enemy.forEach((enemy) => {
        enemy.position.x += scroll_speed;
        enemy.pos.start += scroll_speed;
        enemy.pos.end += scroll_speed;
      });
    } else if (
      keys.down.pressed &&
      headmoveframe > 7000 &&
      headmoveframe < 15000
    ) {
      goku.velocity.y = 0;
      platforms.forEach((platform) => {
        platform.position.x -= scroll_speed + 10;
      });
      obstacles.forEach((obstacle) => {
        obstacle.position.x -= scroll_speed + 10;
      });
      enemy.forEach((enemy) => {
        enemy.position.x -= scroll_speed + 10;
        enemy.pos.start -= scroll_speed + 10;
        enemy.pos.end -= scroll_speed + 10;
      });
      winners.forEach((win) => {
        win.position.x -= scroll_speed + 10;
      });
      message.position.x -= scroll_speed + 10;
      obj[0].position.x -= scroll_speed + 10;
    }
  }
  platforms.forEach((platform) => {
    if (
      goku.position.y + goku.height <= platform.position.y &&
      goku.position.y + goku.height + goku.velocity.y >= platform.position.y &&
      goku.position.x + goku.width >= platform.position.x &&
      goku.position.x <= platform.position.x + platform.width
    ) {
      goku.velocity.y = 0;
      pauseAudio(jumpaudio);
      jumping = false;
    }
    if (
      goku.position.x + goku.width <= platform.position.x &&
      goku.position.x + goku.width + goku.velocity.x >= platform.position.x &&
      goku.position.y + goku.height > platform.position.y &&
      goku.position.y < platform.position.y + platform.height
    ) {
      goku.velocity.x = 0;
    }
    if (
      goku.position.x >= platform.position.x + platform.width &&
      goku.position.x + goku.velocity.x <=
        platform.position.x + platform.width &&
      goku.position.y + goku.height > platform.position.y &&
      goku.position.y < platform.position.y + platform.height
    ) {
      goku.velocity.x = 0;
    }
  });
  enemy.forEach((enemy) => {
    if(enemy.visible)
    {
    if (
      goku.position.x <= enemy.position.x  + enemy.velocity.x &&
      goku.position.x + goku.width + goku.velocity.x >= enemy.position.x  + enemy.velocity.x + 100 &&
      goku.position.y + goku.height > enemy.position.y &&
      goku.position.y < enemy.position.y + enemy.height 
    ) {
      notover = true;
    }
    if (
      goku.position.x >= enemy.position.x  + enemy.velocity.x &&
      goku.position.x + goku.velocity.x <= enemy.position.x  + enemy.velocity.x + 50 &&
      goku.position.y + goku.height > enemy.position.y &&
      goku.position.y < enemy.position.y + enemy.height 
    ) {
      notover = true;
    }
  }
  });
  obstacles.forEach((obstacle) => {
    if (
      goku.position.y + goku.height <= obstacle.position.y &&
      goku.position.y + goku.height + goku.velocity.y >=
        obstacle.position.y - 10 &&
      goku.position.x + goku.width >= obstacle.position.x &&
      goku.position.x <= obstacle.position.x + obstacle.width
    ) {
      goku.velocity.y = 0;
      notover = true;
    }
  });
  winners.forEach((win) => {
    if (
      goku.position.y + goku.height <= win.position.y &&
      goku.position.y + goku.height + goku.velocity.y >= win.position.y - 10 &&
      goku.position.x + goku.width >= win.position.x &&
      goku.position.x <= win.position.x + win.width
    ) {
      goku.velocity.y = 0;
      winn = true;
    }
  });
  // if (goku.position.y + goku.height <= winners[0].position.y &&
  //     goku.position.y + goku.height + goku.velocity.y >= winners[0].position.y - 10 &&
  //     goku.position.x + goku.width >= winners[0].position.x && goku.position.x <= winners[0].position.x + winners[0].width)
  //     winn = true;
  if (
    goku.position.y + goku.height <= message.position.y &&
    goku.position.y + goku.height + goku.velocity.y >=
      message.position.y - 10 &&
    goku.position.x + goku.width >= message.position.x &&
    goku.position.x <= message.position.x + message.width
  ) {
    c.fillStyle = "#BEE4F4";
    // c.drawImage(nimbus, message.position.x, 0, 0, 100);
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.fillText("Play special move by pressing ⬇️", message.position.x, 50);
    // c.font = "80px Arial";
    // c.fillText("Click 'r' to play again", 1000, 800);
    goku.velocity.y = 0;
    pauseAudio(goku_screaming);
  }
  c.stroke();
}
animate();
document.addEventListener("keydown", (event) => {
  let keycode = event.keyCode;
  switch (keycode) {
    case 32: //space
     action = "kamehameha";
     is_kamehameha_available = true;
     break;
    case 37:
      keys.left.pressed = true;
      action = "moveleft";
      break;
    case 38: // up
      jump();
      break;
    case 39: // right
      keys.right.pressed = true;
      action = "moveright";
      break;
    case 40: // down
      keys.down.pressed = true;
      playAudio(goku_screaming);
      action = "headmove";
      break;
  }
});
let jumping = false;
function jump() {
  if (jumping) {
    return;
  }
  goku.velocity.y = -22;
  playAudio(jumpaudio);
  jumping = true;
}
window.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    location.reload();
  }
});
document.addEventListener("keyup", (event) => {
  let keycode = event.keyCode;
  switch (keycode) {
    case 32: //space
     action = "standing";
     is_kamehameha_available = false;
     kamehameha_time = 0;
     goku.kame = 100;
     k_width = 150;
     goku.k = 0;
     break;
    case 37: //left
      keys.left.pressed = false;
      action = "standing";
      break;
    case 38: //
      action = "moveright";
      break;
    case 39: //right
      keys.right.pressed = false;
      action = "standing";
      break;
    case 40:
      keys.down.pressed = false;
      pauseAudio(goku_screaming);
      action = "standing";
      headmoveframe = 0;
      break;
  }
});
