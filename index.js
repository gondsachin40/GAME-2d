
var canvas = document.querySelector("canvas");
canvas.height = 1300;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");
const gravity = 0.5;
let notover = false;
let scroll_speed = 10;
let winn = false;
var gokupos = new Image();
gokupos.src = "gokupos.png";
var nimbus = new Image();
nimbus.src = "nimbus.png";
let action = "standing";
let frame = 0;
let headmoveframe = 0;
class Goku {
    constructor() {
        this.position = {
            x: 250,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 150;
        this.height = 150;
        this.t = 0;
    }
    draw() {
        // c.fillStyle = "red";
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(gokupos, 0 + this.t, 200, 100, 100, this.position.x, this.position.y, this.width, this.height);
        this.t += 100;
        this.t = this.t % 800;
    }
    standing() {
        c.drawImage(gokupos, 0 + this.t, 200, 100, 100, this.position.x, this.position.y, this.width, this.height);
        if (frame % 5 == 0)
            this.t += 100;
        this.t = this.t % 800;
        frame += 1;
        frame %= 5;
    }
    moveright() {
        c.drawImage(gokupos, 0 + this.t, 0, 100, 100, this.position.x, this.position.y, this.width, this.height);
        if (frame % 5 == 0)
            this.t += 100;
        this.t = this.t % 800;
        frame += 1;
        frame %= 5;
    }
    moveleft() {
        c.drawImage(gokupos, this.t, 100, 100, 100, this.position.x, this.position.y, this.width, this.height);
        if (frame % 5 == 0)
            this.t += 100;
        this.t = this.t % 800;
        frame += 1;
        frame %= 5;
    }
    headmove() {
        c.drawImage(gokupos, this.t, 300, 100, 100, this.position.x, this.position.y, this.width, this.height);
        if (frame % 20 == 0) {
            if (this.t != 1500)
                this.t += 100;
            headmoveframe += this.t;
        }
        this.t = this.t % 1600;
        frame += 1;
        frame %= 20;
    }
    update() {
        if (action === "standing")
            this.standing();
        else if (action === "moveright")
            this.moveright();
        else if (action === "moveleft")
            this.moveleft();
        else if (action === "headmove")
            this.headmove();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y < 0) {
            this.velocity.y = gravity;
        }
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else
            this.velocity.y = 0
    }
}
class Platform {
    constructor({ x, y, w, h }) {
        this.position = {
            x: x,
            y: y * (86 / 100)
        }
        this.velocity = {
            x: 0,
            y: 0
        }
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
            y: y
        }
        this.image = image;
        this.width = 22800;
        this.height = canvas.height;
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
class Obstacle {
    constructor({ x, y, w, h }) {
        this.position = {
            x: x,
            y: y * (86 / 100)
        }
        this.velocity = {
            x: 0,
            y: 0
        }
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
const image = new Image();
image.src = "temp.png";
const jumpaudio = new Audio('punnet.mp3');
const platforms = [new Platform({ x: 0, y: 600, w: 1240, h: 20 }), new Platform({ x: 1760, y: 750, w: 600, h: 50 }), new Platform({ x: 2350, y: 900, w: 1640, h: 50 }), new Platform({ x: 3230, y: 750, w: 380, h: 20 }), new Platform({ x: 4000, y: 960, w: 2200, h: 20 }), new Platform({ x: 4600, y: 800, w: 360, h: 20 }), new Platform({ x: 5630, y: 840, w: 240, h: 20 }), , new Platform({ x: 5280, y: 720, w: 230, h: 20 }), new Platform({ x: 4940, y: 560, w: 350, h: 20 }), new Platform({ x: 5400, y: 450, w: 340, h: 20 }), new Platform({ x: 5050, y: 200, w: 700, h: 20 }),
new Platform({ x: 6550, y: 820, w: 460, h: 20 }), new Platform({ x: 7400, y: 620, w: 460, h: 20 }), new Platform({ x: 8325, y: 845, w: 460, h: 20 }),
new Platform({ x: 9070, y: 550, w: 460, h: 20 }), new Platform({ x: 9980, y: 740, w: 240, h: 20 }), new Platform({ x: 10965, y: 1055, w: 235, h: 20 }),
new Platform({ x: 11820, y: 625, w: 235, h: 20 }), new Platform({ x: 12790, y: 850, w: 240, h: 20 }), new Platform({ x: 13770, y: 695, w: 240, h: 20 }),
new Platform({ x: 14270, y: 1220, w: 560, h: 200 }),
new Platform({ x: 15200, y: 1000, w: 250, h: 20 }),
new Platform({ x: 15880, y: 720, w: 300, h: 20 })
    // new Platform({ x: 16310, y: 1100, w: 640, h: 20 }
    // new Platform({ x: 15060, y: 1020, w: 1025, h: 20 })
];
const obj = [new Obj({ x: 0, y: 0, image })];
const obstacles = [new Obstacle({ x: 1240, y: 820, w: 520, h: 20 }), new Obstacle({ x: 6200, y: 1320, w: 8065, h: 20 }), new Obstacle({ x: 14830, y: 1340, w: 6600, h: 20 })];
const winners = [new Platform({ x: 18600, y: 1200, w: 900, h: 20 })];
const message = new Platform({ x: 16640, y: 450, w: 300, h: 20 });
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false
    }
}
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
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    obj.forEach((obj) => {
        obj.draw();
    });
    goku.update();
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
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = "black";
        c.font = "150px Arial";
        c.fillText("YOU, WON THE GAME!", 900, 600);
        c.font = "80px Arial";
        c.fillText("Click 'r' to play again", 1000, 800);
    }
    if (keys.right.pressed && goku.position.x < 400) {
        goku.velocity.x = 5;
    }
    else if (keys.down.pressed && goku.position.x < 400) {
        goku.velocity.x = 5;
    }
    else if (keys.left.pressed && goku.position.x > 100) {
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
            message.position.x -= scroll_speed
            obj[0].position.x -= scroll_speed;
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

        }
        else if (keys.down.pressed && headmoveframe > 7000 && headmoveframe < 15000) {

            goku.velocity.y = 0;
            platforms.forEach((platform) => {
                platform.position.x -= scroll_speed + 10;
            });
            obstacles.forEach((obstacle) => {
                obstacle.position.x -= scroll_speed + 10;
            });
            winners.forEach((win) => {
                win.position.x -= scroll_speed + 10;
            });
            message.position.x -= scroll_speed + 10;
            obj[0].position.x -= scroll_speed + 10;
        }
    }
    platforms.forEach((platform) => {
        if (goku.position.y + goku.height <= platform.position.y &&
            goku.position.y + goku.height + goku.velocity.y >= platform.position.y &&
            goku.position.x + goku.width >= platform.position.x && goku.position.x <= platform.position.x + platform.width) {
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
            goku.position.x + goku.velocity.x <= platform.position.x + platform.width &&
            goku.position.y + goku.height > platform.position.y &&
            goku.position.y < platform.position.y + platform.height
        ) {
            goku.velocity.x = 0;
        }

    });
    obstacles.forEach((obstacle) => {
        if (goku.position.y + goku.height <= obstacle.position.y &&
            goku.position.y + goku.height + goku.velocity.y >= obstacle.position.y - 10 &&
            goku.position.x + goku.width >= obstacle.position.x && goku.position.x <= obstacle.position.x + obstacle.width) {
            goku.velocity.y = 0;
            notover = true;
        }

    });
    winners.forEach((win) => {
        if (goku.position.y + goku.height <= win.position.y &&
            goku.position.y + goku.height + goku.velocity.y >= win.position.y - 10 &&
            goku.position.x + goku.width >= win.position.x && goku.position.x <= win.position.x + win.width) {
            goku.velocity.y = 0;
            winn = true;
        }
    });
    // if (goku.position.y + goku.height <= winners[0].position.y &&
    //     goku.position.y + goku.height + goku.velocity.y >= winners[0].position.y - 10 &&
    //     goku.position.x + goku.width >= winners[0].position.x && goku.position.x <= winners[0].position.x + winners[0].width)
    //     winn = true;
    if (goku.position.y + goku.height <= message.position.y &&
        goku.position.y + goku.height + goku.velocity.y >= message.position.y - 10 &&
        goku.position.x + goku.width >= message.position.x && goku.position.x <= message.position.x + message.width) {
        c.fillStyle = "#BEE4F4";
        c.drawImage(nimbus, message.position.x, 0, 0, 100);
        // c.fillStyle = "black";
        c.font = "30px Arial";
        c.fillText("Play special move by pressing ⬇️", message.position.x, 50);
        // c.font = "80px Arial";
        // c.fillText("Click 'r' to play again", 1000, 800);
        goku.velocity.y = 0;
    }
    c.stroke();
}
animate();
document.addEventListener("keydown", (event) => {
    let keycode = event.keyCode;
    switch (keycode) {
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
document.addEventListener('keyup', (event) => {
    let keycode = event.keyCode;
    switch (keycode) {
        case 37://left
            keys.left.pressed = false;
            action = "standing";
            break;
        case 38://
            action = "moveright";
            break;
        case 39://right
            keys.right.pressed = false;
            action = "standing";
            break;
        case 40:
            keys.down.pressed = false;
            action = "standing";
            headmoveframe = 0;
            break;

    }

})


