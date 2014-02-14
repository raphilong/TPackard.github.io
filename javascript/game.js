/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 480;
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var entities = new Array();
var player = new entity("Person.png", 400, 250, 200, 13, 32, platforms, 6);
entities.push(player);
entities.push(new ai("AI.png", 400, 0, 125, 13, 32, platforms, 6));

platforms.push(new platform(15, 6, 20, 1));
platforms.push(new platform(0, 12, 15, 1));
platforms.push(new platform(35, 12, 15, 1));
platforms.push(new platform(15, 18, 20, 1));
platforms.push(new platform(0, 24, 23, 1));
platforms.push(new platform(27, 24, 23, 1));

var keysDown = {};
var right = "right";
var left = "left";
var up = "up";
var down = "down";

document.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault();
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};

function update(delta) {
    for (var i = 0; i < entities.length; i++) {
        entities[i].moving = false;
        entities[i].gravitate(delta);
        entities[i].update(delta);
    }
    if (38 in keysDown || 87 in keysDown) {
        player.move(up, delta);
    }
    if (40 in keysDown || 83 in keysDown) {
        player.move(down, delta);
    }
    if (37 in keysDown || 65 in keysDown) {
        player.move(left, delta);
    }
    if (39 in keysDown || 68 in keysDown) {
        player.move(right, delta);
    }
    for (var i = 0; i < entities.length; i++) {
        entities[i].jump(delta);
        entities[i].checkOnGround();
    }
};

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < platforms.length; i++) platforms[i].draw(ctx);
    for (var i = 0; i < entities.length; i++) entities[i].draw(ctx);
};

function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    paint();

    if (now - lastSwitch >= 64) { // 16 times per second
        for (var i = 0; i < entities.length; i++) entities[i].moving ? entities[i].nextFrame() : entities[i].setFrame(0);
        lastSwitch = now;
    }

    then = now;
    setTimeout(main, 1);
};

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();