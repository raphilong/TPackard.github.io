/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 480;
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var entities = new Array();
var platforms = new Array();
var player = new Entity("Person.png", 400, 250, 200, 13, 32, platforms, 6);
entities.push(player);
entities.push(new AI("AI.png", 400, 0, 125, 13, 32, platforms, 6));

platforms.push(new Platform(15, 13, 20, 1));
platforms.push(new Platform(0, 18, 15, 1));
platforms.push(new Platform(35, 18, 15, 1));
platforms.push(new Platform(15, 23, 20, 1));
platforms.push(new Platform(0, 28, 23.5, 1));
platforms.push(new Platform(0, 29, 23.5, 1));
platforms.push(new Platform(26.5, 28, 23.5, 1));
platforms.push(new Platform(26.5, 29, 23.5, 1));

var keysDown = new Array();
var right = "right";
var left = "left";
var up = "up";
var down = "down";

document.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault(); // Prevents the page from scrolling when the arrow keys or spacebar are pressed
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};

function update(delta) {
    entities.forEach(function(entity) {
        entity.moving = false;
        entity.gravitate(delta);
        entity.update(delta);
        entities.forEach(function(otherEntity) {entity.checkAlive(otherEntity)});
    });
    if (32 in keysDown) {
        player.shoot();
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
    platforms.forEach(function(platform) {platform.draw(ctx)});
    entities.forEach(function(entity) {entity.draw(ctx)});
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