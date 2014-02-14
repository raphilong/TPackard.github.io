// FUTURE add shoot function
// FUTURE add AI
/*ENTITY DECLARATION*/
function entity(imgSrc, x, y, speed, width, height, numFrames, numAnim) {
    /*VARIABLES*/
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
    this.jumping = false;
    this.canJump = true;
    this.jumpOffset = 0;
    this.jumpPoint = 0;
    this.gravity = true;
    this.gravityPoint = 10;
    this.onGround = false;
    this.prevY = this.y;

    /*METHODS*/
    this.nextFrame = nextFrame;
    this.setFrame = setFrame;
    this.getX = getX;
    this.getY = getY;
    this.move = move;
    this.jump = jump;
    this.checkOnGround = checkOnGround;
    this.gravitate = gravitate;
    this.draw = drawEntity;
}

/*ENTITY FUNCTIONS*/
function nextFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
    return this.currentFrame;
}

function setFrame(frameNum) {
    this.currentFrame = frameNum >= this.numFrames ? 0 : frameNum;
}

function getX() {
    return Math.round(this.x);
}

function getY() {
    return Math.round(this.y);
}

function move(direction, delta) {
    if (direction == up && this.canJump) {
        this.jumping = true;
        this.canJump = false;
    }

    if (direction == right) {
        if (this.x < canvas.width - this.width) {
            this.x += this.speed * delta;
            this.moving = true;
        }
        this.facingRight = true;
    }

    if (direction == left) {
        if (this.x > 0) {
            this.x -= this.speed * delta;
            this.moving = true;
        }
        this.facingRight = false;
    }
}

function jump(delta) {
    this.jumpPoint += delta * 25;
    if (this.y > 0 && this.jumpPoint <= 10 && this.jumping) {
        this.y += this.jumpOffset;
        this.jumpOffset = -(this.jumpPoint - 20) * this.jumpPoint;
        this.gravity = false;
    } else {
        this.jumpPoint = 0;
        this.jumpOffset = 0;
        this.jumping = false;
        this.gravity = true;
    }
    this.y -= this.jumpOffset;
}

function checkOnGround(platforms) {
    this.onGround = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (this.getY() + this.height >= platform.y * platform.tileSize && this.prevY + this.height <= platform.y * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
            this.onGround = true;
            finished = true;
            this.y = platform.y * platform.tileSize - this.height;
            this.jumping = false;
            this.canJump = true;
            this.gravityPoint = 10;
            return;
        }
    }
    this.prevY = this.getY();
}

function gravitate(delta) {
    if (this.getY() < canvas.height - this.height && this.gravity && !this.onGround) {
        this.y += -(this.gravityPoint - 20) * this.gravityPoint;
        this.gravityPoint += delta * 25;
        this.y -= -(this.gravityPoint - 20) * this.gravityPoint;
    }
    if (this.getY() >= canvas.height - this.height) {
        this.y = canvas.height - this.height;
        this.canJump = true;
        this.gravityPoint = 10;
    }
}

function drawEntity(context) {
    var offset = this.facingRight ? this.height + 1 : 0;
    context.drawImage(this.image, (this.currentFrame * this.width + this.currentFrame), offset, this.width, this.height, this.getX(), this.getY(), this.width, this.height);
}