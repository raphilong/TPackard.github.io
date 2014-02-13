/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 496;
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var person = new entity("Person.png", 400, 250, 200, 13, 32, 6);
platforms.push(new platform(30, 30, 4, 1));

var keysDown = {};
var right = "right";
var left = "left";
var up = "up";
var down = "down";

document.onkeydown = function (e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault();
};

document.onkeyup = function (e) {
    delete keysDown[e.keyCode];
};

function update(delta) {
    person.moving = false;
    person.checkOnGround(platforms);
    person.gravitate(delta);
    if (38 in keysDown) {
        person.move(up, delta);
    }
    if (40 in keysDown) {
        person.move(down, delta);
    }
    if (37 in keysDown) {
        person.move(left, delta);
    }
    if (39 in keysDown) {
        person.move(right, delta);
    }
    person.jump(delta);
};

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var platform of platforms) platform.draw(ctx);
    person.draw(ctx);
};

function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    paint();

    if (now - lastSwitch >= 64) { // 16 times per second
        person.moving ? person.nextFrame() : person.setFrame(0);
        lastSwitch = now;
    }

    then = now;
    setTimeout(main, 1);
};

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();