/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 480;
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var precanvas = document.getElementById("precanvas");
precanvas.style.width = String(canvas.width) + "px";
precanvas.style.background = "#EEEEEE";

var entities = new Array();
var platforms = new Array();
var player = new Entity("Person.png", 400, 250, 200, 13, 32, platforms, 6);
entities.push(player);

platforms.push(new Platform(15, 13, 20, 1));
platforms.push(new Platform(0, 18, 15, 1));
platforms.push(new Platform(35, 18, 15, 1));
platforms.push(new Platform(15, 23, 20, 1));
platforms.push(new Platform(0, 28, 14, 1));
platforms.push(new Platform(0, 29, 23, 1));
platforms.push(new Platform(36, 28, 14, 1));
platforms.push(new Platform(27, 29, 23, 1));

var keysDown = new Array();
function resetKeys() {
    keysDown = new Array();
}

document.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == SPACE || e.keyCode == UP_ARROW || e.keyCode == DOWN_ARROW || e.keyCode == LEFT_ARROW || e.keyCode == RIGHT_ARROW) e.preventDefault(); // Prevents the page from scrolling when the arrow keys or spacebar are pressed
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
    if (SPACE in keysDown) {
        player.shoot();
    }
    if (UP_ARROW in keysDown || W in keysDown) {
        player.move(UP, delta);
    }
    if (DOWN_ARROW in keysDown || S in keysDown) {
        player.move(DOWN, delta);
    }
    if (LEFT_ARROW in keysDown || A in keysDown) {
        player.move(LEFT, delta);
    }
    if (RIGHT_ARROW in keysDown || D in keysDown) {
        player.move(RIGHT, delta);
    }
    for (var i = 0; i < entities.length; i++) {
        entities[i].jump(delta);
        entities[i].checkOnGround();
        if (!entities[i].alive && entities[i] != player) {
            entities.splice(i, 1);
            i--;
        }
    }
}

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(function(platform) {platform.draw(ctx)});
    entities.forEach(function(entity) {entity.draw(ctx)});
    precanvas.innerHTML = "Score: " + player.score;
}

function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    paint();

    if (now - lastSwitch >= 64) { // 16 times per second
        for (var i = 0; i < entities.length; i++) entities[i].moving ? entities[i].nextFrame() : entities[i].setFrame(0);
        lastSwitch = now;
    }

    if (Math.random() < 0.005 && entities.length < 10) entities.push(new AI("AI.png", 400, 174, 125, 13, 32, platforms, 6));

    then = now;
    setTimeout(main, 1);
}

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();