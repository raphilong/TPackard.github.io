/*ENTITY DECLARATION*/
function Entity(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim) {
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

    this.platforms = platforms || null;

    this.currentFrame = 0;
    this.direction = RIGHT;
    this.moving = false;
    this.jumping = false;
    this.canJump = true;
    this.canShoot = true;
    this.jumpOffset = 0;
    this.jumpPoint = 0;
    this.gravity = true;
    this.gravityPoint = 10;
    this.onGround = false;
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevY2 = this.y;
    this.terminalVelocity = 20;
    this.projectiles = new Array();
    this.alive = true;
    this.timeSinceDeath = 0;
    this.respawnX = this.x;
    this.respawnY = this.y;
    this.score = 0;
}

/*ENTITY FUNCTIONS*/
Entity.prototype.nextFrame = function() {
    this.currentFrame++;
    if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
    return this.currentFrame;
}

Entity.prototype.setFrame = function(frameNum) {
    this.currentFrame = frameNum >= this.numFrames ? 0 : frameNum;
}

Entity.prototype.getX = function() {
    return Math.round(this.x);
}

Entity.prototype.getY = function() {
    return Math.round(this.y);
}

Entity.prototype.move = function(direction, delta) {
    if (direction == UP && this.canJump) {
        this.jumping = true;
        this.canJump = false;
    }

    if (direction == RIGHT) {
        if (this.canMove(RIGHT)) {
            this.x += this.speed * delta;
            this.moving = true;
        }
        this.direction = RIGHT;
    }

    if (direction == LEFT) {
        if (this.canMove(LEFT)) {
            this.x -= this.speed * delta;
            this.moving = true;
        }
        this.direction = LEFT;
    }
}

Entity.prototype.jump = function(delta) {
    this.jumpPoint += delta * 25;
    if (this.jumpPoint <= 10 && this.jumping && this.canMove(UP)) {
        this.y += this.jumpOffset;
        this.jumpOffset = -(this.jumpPoint - 20) * this.jumpPoint;
        this.gravity = false;
        this.currentFrame = 1;
    } else {
        this.jumpPoint = 0;
        this.jumpOffset = 0;
        this.jumping = false;
        this.gravity = true;
    }
    this.y -= this.jumpOffset;
}

Entity.prototype.canMove = function(direction) {
    /*UP*/
    if (direction == UP) {
        if (this.getY() <= 0) {
            this.y = 0;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getY() <= (platform.y + platform.height) * platform.tileSize && this.prevY >= (platform.y + platform.height) * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
                this.y = (platform.y + platform.height) * platform.tileSize;
                return false;
            }
        }
        this.prevY = this.getY();
    }
    
    /*DOWN*/
    if (direction == DOWN) {
        if (this.getY() >= canvas.height - this.height) {
            this.y = canvas.height - this.height;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getY() + this.height >= platform.y * platform.tileSize && this.prevY + this.height <= platform.y * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
                this.y = platform.y * platform.tileSize;
                return false;
            }
        }
        this.prevY = this.getY();
    }

    /*LEFT*/
    if (direction == LEFT) {
        if (this.getX() <= 0 && this.alive) {
            if (this.getX() < 0) this.x = 0;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getX() <= (platform.x + platform.width) * platform.tileSize && this.prevX >= (platform.x + platform.width) * platform.tileSize && this.y + this.height > platform.y * platform.tileSize && this.y < (platform.y + platform.height) * platform.tileSize) {
                this.x = (platform.x + platform.width) * platform.tileSize;
                return false;
            }
        }
        this.prevX = this.getX();
    }
    
    /*RIGHT*/
    if (direction == RIGHT) {
        if (this.getX() >= canvas.width - this.width) {
            if (this.getX() > canvas.width - this.width) this.x = canvas.width - this.width;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getX() + this.width >= platform.x * platform.tileSize && this.prevX + this.width <= platform.x * platform.tileSize && this.y + this.height > platform.y * platform.tileSize && this.y < (platform.y + platform.height) * platform.tileSize) {
                this.x = platform.x * platform.tileSize - this.width;
                return false;
            }
        }
        this.prevX = this.getX();
    }
    return true;
}

Entity.prototype.checkOnGround = function() {
    this.onGround = false;
    for (var i = 0; i < this.platforms.length; i++) {
        var platform = this.platforms[i];
        if (this.getY() + this.height >= platform.y * platform.tileSize && this.prevY2 + this.height <= platform.y * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
            this.onGround = true;
            this.y = platform.y * platform.tileSize - this.height;
            this.jumping = false;
            if (!(UP_ARROW in keysDown) && !(W in keysDown)) this.canJump = true;
            this.gravityPoint = 10;
            return;
        }
    }
    this.prevY2 = this.getY();
}

Entity.prototype.gravitate = function(delta) {
    if (this.getY() < canvas.height - this.height && this.gravity && !this.onGround) {
        this.canJump = false;
        if (this.gravityPoint + delta * 25 < this.terminalVelocity) {
            this.y += -(this.gravityPoint - 20) * this.gravityPoint;
            this.gravityPoint += delta * 25;
            this.y -= -(this.gravityPoint - 20) * this.gravityPoint;
        } else this.y += this.terminalVelocity * 25 * delta;
        this.currentFrame = 1;
    }
    if (this.getY() >= canvas.height - this.height) {
        this.y = canvas.height - this.height;
        if (!(UP_ARROW in keysDown) && !(W in keysDown)) this.canJump = true;
        this.gravityPoint = 10;
    }
}

Entity.prototype.shoot = function() {
    if (this.canShoot) {
        this.canShoot = false;
        this.projectiles.push(new Projectile(this));
    }
}

Entity.prototype.update = function(delta) {
    this.projectiles.forEach(function(projectile) {projectile.update(delta)});
    if (this.alive) {
        if (!(SPACE in keysDown)) this.canShoot = true;
    } else {
        this.x = -1000;
        if (this.timeSinceDeath < 1) this.timeSinceDeath += delta;
        else this.respawn();
    }
}

Entity.prototype.respawn = function() {
    this.x = this.respawnX;
    this.y = this.respawnY;
    this.alive = true;
    this.timeSinceDeath = 0;
    this.projectiles = new Array();
    this.canJump = true;
    this.score = 0;
    resetKeys();
}

Entity.prototype.checkAlive = function(entity) {
        if (entity != this && entity.x > this.x && entity.x < this.x + this.width && entity.y + entity.height > this.y && entity.y < this.y + this.height) {
            this.alive = false;
            this.x = -1000;
            alert("You died");
        }
}

Entity.prototype.draw = function(context) {
    this.projectiles.forEach(function(projectile) {projectile.draw(ctx)});
    var offset = this.direction == RIGHT ? this.height + 1 : 0;
    context.drawImage(this.image, (this.currentFrame * this.width + this.currentFrame), offset, this.width, this.height, this.getX(), this.getY(), this.width, this.height);
}