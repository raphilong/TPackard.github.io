/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;
var ctx = canvas.getContext("2d");

/*ENTITY DECLARATION*/
function entity(imgSrc, x, y, speed, width, height, numFrames, numAnim) {
    this.image = new Image();
    this.image.src = imgSrc;

    this.x = x || 0;
    this.y = y || 0;
    this.speed = speed || 1;

    this.width = width || this.image.width;
    this.height = height || this.image.height;

    this.numFrames = numFrames || 1;
    this.numAnim = numAnim || 1;

    this.currentFrame = 0;
    this.facingRight = false;
    this.moving = false;
}

/*ENTITY FUNCTIONS*/
entity.prototype.nextFrame = function () {
    this.currentFrame++;
    if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
    return this.currentFrame;
};

entity.prototype.getX = function() {
    return Math.round(this.x);
};

entity.prototype.getY = function() {
    return Math.round(this.y);
};

entity.prototype.move = function(direction, delta) {
    if (direction == up) {
        this.y -= this.speed * delta;
        this.moving = true;
    }
    
    if (direction == down) {
        this.y += this.speed * delta;
        this.moving = true;
    }
    
    if (direction == right) {
        this.x += this.speed * delta;
        this.moving = true;
        this.facingRight = true;
    }
    
    if (direction == left) {
        this.x -= this.speed * delta;
        this.moving = true;
        this.facingRight = false;
    }
};

entity.prototype.draw = function(context) {
    var offset = this.facingRight ? this.height + 1 : 0;
    context.drawImage(this.image, (this.currentFrame * this.width + this.currentFrame), offset, this.width, this.height, this.getX(), this.getY(), this.width, this.height);
};

/*GAME FUNCTIONS AND OBJECTS*/
var person = new entity("Person.png", 400, 250, 200, 13, 32, 6);

var keysDown = {};
var right = "right";
var left = "left";
var up = "up";
var down = "down";

document.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};

var update = function (delta) {
    person.moving = false;
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
};

var paint = function () {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    person.draw(ctx);
};

var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    paint();

    if (now - lastSwitch >= 64) { // 16 times per second
        person.currentFrame = person.moving ? person.nextFrame() : 0;
        lastSwitch = now;
    }

    then = now;
};

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
setInterval(main, 1);