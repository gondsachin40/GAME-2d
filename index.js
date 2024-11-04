var canvas = document.querySelector("canvas");
let enemy = [];
let platforms = [];
let obstacles = [];
let winners = [];
let current_stage = 'stage1';
let winncnt = 0;
// canvas.height = 1300;
canvas.height = 1300;
// canvas.height = document.body.clientHeight;
// canvas.width = document.body.clientWidth;
canvas.width = 2200;
let show_hidden = false;
var c = canvas.getContext("2d");
const gravity = 0.5;
let notover = false;
let scroll_speed = 12;
let winn = false;
var gokupos = new Image();
gokupos.src = "gokupos.png";
var kamehameha = new Image();
kamehameha.src = "kama.png";
var saiba = new Image();
saiba.src = "saiba.png";
var losing = new Image();
losing.src = "losing.png";
var winning = new Image();
winning.src = "afterwinning.png";
var healthbar = new Image();
healthbar.src = "healthbar.png";
let healthbar_pos_x = 607;
let healthbar_width = 0;
let healthbar_state = 1;
let healthbar_time = 0;
let action = "standing";
let frame = 0;
let kframe = 0;
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
    if (this.direction)
      c.drawImage(saiba, this.t, 0, 100, 100, this.position.x, this.position.y + 10, this.width, this.height);
    else
      c.drawImage(saiba, this.t, 100, 100, 100, this.position.x, this.position.y + 10, this.height, this.height);
    if (frame % 5 === 0) {
      this.t += 100;
    }
    enemyframe++;
    this.t %= 700;
  }
  update() {
    if (this.visible) {
      this.draw();
      if (this.position.x > this.pos.end || this.position.x < this.pos.start) {
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
      x: 150,
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
  kamehameha() {
    fire_x = this.position.x + this.width;
    fire_y = this.position.y + 40;
    if (kamehameha_time < 150)
      c.drawImage(kamehameha, this.k, 0, this.kame, 100, this.position.x, this.position.y, k_width, this.height);
    else {
      goku.standing();
    }
    kamehameha_time++;
    if (frame % 10 == 0) {
      if (this.k != 900) {
        this.k += 100;
        k_width = 150;
        this.kame = 100;
        time_of_kamehama = 0;
      }
      else {
        if (time_of_kamehama < 10) {
          k_width = 600;
          this.kame = 300;
          time_of_kamehama++;
        }
      }
      headmoveframe += this.k;
    }
    this.k = this.k % 1200;
    frame += 1;
    frame %= 10;
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
  constructor({ x, y, image, width, height }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    // this.width = 22800;
    this.width = width;
    this.height = height;
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

let image

const jumpaudio = new Audio("Punnet.mp3");
const goku_screaming = new Audio("goku_screaming.mp3");
const goku_kamehameha = new Audio("kamehameha.mp3");
// const back = new Audio("back.mp3");
let obj

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
  // playAudio(back);
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
    if (enemy.position.x + 600 < goku.position.x) {
      enemy.visible = true;
    }
    enemy.update();
  });
  if (is_kamehameha_available) {
    enemy.forEach((enemy) => {
      if (enemy.position.x < fire_x + fire_w && fire_y + fire_h >= enemy.position.y && Math.abs(enemy.position.y - fire_y) < 150 && kamehameha_time > 100) {
        enemy.visible = false;
      }
    });
  }
  goku.update();
  c.drawImage(healthbar, 100, 0, 600, 100);
  c.fillStyle = "#22aef1";
  c.fillRect(healthbar_pos_x, 38, healthbar_width, 27);
  if (show_hidden) {
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
  }
  if (notover) {
    c.drawImage(losing, 0, 0, canvas.width, canvas.height);
  }
  if (winn) {
    current_stage = 'stage2';
    winncnt++;
    if (winncnt >= 2) {
      c.drawImage(winning, 0, 0, canvas.width, canvas.height);
      winn = true;

    }else{
      load();
      winn = false;
    }
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
    if (enemy.visible) {
      if (
        goku.position.x <= enemy.position.x + enemy.velocity.x &&
        goku.position.x + goku.width + goku.velocity.x >= enemy.position.x + enemy.velocity.x + 100 &&
        goku.position.y + goku.height > enemy.position.y &&
        goku.position.y < enemy.position.y + enemy.height
      ) {
        if (healthbar_time === 0 || (healthbar_time > 10 && healthbar_time < 12) || healthbar_time > 20) {
          if (healthbar_state === 1) {
            healthbar_pos_x = 490;
            healthbar_width = 120;
            healthbar_state++;
          }
          else if (healthbar_state === 2) {
            healthbar_pos_x = 300;
            healthbar_width = 310;
            healthbar_state++;
          }
          else if (healthbar_state === 3) {
            healthbar_pos_x = 220;
            healthbar_width = 390;
            notover = true;
          }
        }
        healthbar_time++;
      }
      if (
        goku.position.x >= enemy.position.x + enemy.velocity.x &&
        goku.position.x + goku.velocity.x <= enemy.position.x + enemy.velocity.x + 50 &&
        goku.position.y + goku.height > enemy.position.y &&
        goku.position.y < enemy.position.y + enemy.height
      ) {
        if (healthbar_time === 0 || (healthbar_time > 10 && healthbar_time < 12) || healthbar_time > 20) {
          if (healthbar_state === 1) {
            healthbar_pos_x = 490;
            healthbar_width = 120;
            healthbar_state++;
          }
          else if (healthbar_state === 2) {
            healthbar_pos_x = 300;
            healthbar_width = 310;
            healthbar_state++;
          }
          else if (healthbar_state === 3) {
            healthbar_pos_x = 220;
            healthbar_width = 390;
            notover = true;
          }
        }
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
  if (
    goku.position.y + goku.height <= message.position.y &&
    goku.position.y + goku.height + goku.velocity.y >=
    message.position.y - 10 &&
    goku.position.x + goku.width >= message.position.x &&
    goku.position.x <= message.position.x + message.width
  ) {
    c.fillStyle = "#BEE4F4";
    c.fillStyle = "black";
    c.font = "30px Arial";
    c.fillText("Play special move by holding ⬇️", message.position.x + 1000, 50);
    goku.velocity.y = 0;
  }
  c.stroke();
}
async function load() {

  let stage = current_stage;
  const enemyURL = `${window.location.href}${stage}/enemy.json`;
  const platformURL = `${window.location.href}${stage}/platform.json`;
  const obstacleURL = `${window.location.href}${stage}/obstacle.json`;
  const winnerURL = `${window.location.href}${stage}/winner.json`;
  let image = new Image();
  image.src = `${stage}/temp.png`;
  if (stage === 'stage1')
    obj = [new Obj({ x: 0, y: 0, image, width: 22800, height: canvas.height })];
  else if (stage === 'stage2')
    obj = [new Obj({ x: 0, y: 0, image, width: 22800, height: 1500 })];
  await fetch(enemyURL).then(val => {
    return val.json()
  }).then(val => {
    enemy = [];
    val.forEach(x => {
      enemy.push(new Enemy(x.x, x.y, x.end));
    })
  })

  await fetch(platformURL).then(val => {
    return val.json()
  }).then(val => {
    platforms = [];
    val.forEach(x => {
      platforms.push(new Platform({ x: x.x, y: x.y, w: x.w, h: x.h }));
    })
  })
  await fetch(winnerURL).then(val => {
    return val.json()
  }).then(val => {
    winners = [];
    val.forEach(x => {
      winners.push(new Platform({ x: x.x, y: x.y, w: x.w, h: x.h }));
    })
  })
  await fetch(obstacleURL).then(val => {
    return val.json()
  }).then(val => {
    obstacles = [];
    val.forEach(x => {
      obstacles.push(new Obstacle({ x: x.x, y: x.y, w: x.w, h: x.h }));
    })
  })
}

load().then(() => {
  animate();
});
document.addEventListener("keydown", (event) => {
  let keycode = event.keyCode;
  switch (keycode) {
    case 32: //space
      action = "kamehameha";
      pauseAudio(goku_screaming);
      playAudio(goku_kamehameha);
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
      pauseAudio(goku_kamehameha);
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
  // playAudio(jumpaudio);
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
      pauseAudio(goku_kamehameha);
      //  pauseAudio(goku_screaming);
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
