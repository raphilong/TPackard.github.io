/*ENTITY DECLARATION*/
function Entity(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim, health) {
    /*VARIABLES*/
    this.image = new Image();
    this.image.src = imgSrc + imgExt + ".png";

    this.x = x || 0;
    this.y = y || 0;
    this.speed = speed || 0;

    this.width = width || this.image.width;
    this.height = height || this.image.height;

    this.numFrames = numFrames || 1;
    this.numAnim = numAnim || 1;

    this.platforms = platforms || null;

    this.health = health || 5;

    this.currentFrame = 0;
    this.direction = RIGHT;
    this.moving = false;
    this.jumping = false;
    this.canJump = true;
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
    this.lastShot = 0;
    this.maxHealth = 5;
    this.lastHurt = 0;
    this.lastFrameSwitch = Date.now();
    this.frameWait = 64;
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
    this.moving = false;
    if (direction == UP && this.canJump) {
        this.jumping = true;
        this.canJump = false;
    }

    if (direction == RIGHT) {
        if (this.canMove(RIGHT, delta)) {
            this.x += this.speed * delta;
            this.moving = true;
        }
        this.direction = RIGHT;
    }

    if (direction == LEFT) {
        if (this.canMove(LEFT, delta)) {
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

Entity.prototype.canMove = function(direction, delta) {
    var change = 0;
    /*UP*/
    if (direction == UP) {
        if (change != 0) this.prevY = this.getY();
        if (this.getY() <= 0) {
            this.y = 0;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getY() - change <= (platform.y + platform.height) * platform.tileSize && this.prevY >= (platform.y + platform.height) * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
                this.y = (platform.y + platform.height) * platform.tileSize;
                return false;
            }
        }
        this.prevY = this.getY();
    }
    
    /*DOWN*/
    if (direction == DOWN) {
        if (change != 0) this.prevY = this.getY();
        if (this.getY() >= worldHeight - this.height) {
            this.y = worldHeight - this.height;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getY() + change + this.height >= platform.y * platform.tileSize && this.prevY + this.height <= platform.y * platform.tileSize && this.x + this.width >= platform.x * platform.tileSize && this.x <= (platform.x + platform.width) * platform.tileSize) {
                this.y = platform.y * platform.tileSize;
                return false;
            }
        }
        this.prevY = this.getY();
    }

    change = delta * this.speed || 0;
    /*LEFT*/
    if (direction == LEFT) {
        if (this.getX() <= 0 && this.alive) {
            if (this.getX() < 0) this.x = 0;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getX() - change <= (platform.x + platform.width) * platform.tileSize && this.prevX >= (platform.x + platform.width) * platform.tileSize && this.y + this.height > platform.y * platform.tileSize && this.y < (platform.y + platform.height) * platform.tileSize) {
                this.x = (platform.x + platform.width) * platform.tileSize;
                return false;
            }
        }
        this.prevX = this.getX();
    }
    
    /*RIGHT*/
    if (direction == RIGHT) {
        if (this.getX() >= worldWidth - this.width) {
            if (this.getX() > worldWidth - this.width) this.x = worldWidth - this.width;
            return false;
        }
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (this.getX() + change + this.width >= platform.x * platform.tileSize && this.prevX + this.width <= platform.x * platform.tileSize && this.y + this.height > platform.y * platform.tileSize && this.y < (platform.y + platform.height) * platform.tileSize) {
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
    if (this.getY() < worldHeight - this.height && this.gravity && !this.onGround) {
        this.canJump = false;
        if (this.gravityPoint + delta * 25 < this.terminalVelocity) {
            this.y += -(this.gravityPoint - 20) * this.gravityPoint;
            this.gravityPoint += delta * 25;
            this.y -= -(this.gravityPoint - 20) * this.gravityPoint;
        } else this.y += this.terminalVelocity * 25 * delta;
        this.currentFrame = 1;
    }
    if (this.getY() >= worldHeight - this.height) {
        this.y = worldHeight - this.height;
        if (!(UP_ARROW in keysDown) && !(W in keysDown)) this.canJump = true;
        this.gravityPoint = 10;
    }
}

Entity.prototype.shoot = function() {
    if (Date.now() - this.lastShot >= 250) {
        this.projectiles.push(new Projectile(this));
        this.lastShot = Date.now();
    }
}

Entity.prototype.update = function(delta) {
    for (var i = 0; i < this.projectiles.length; i++) {
        var projectile = this.projectiles[i];
        projectile.update(delta);
        if (projectile.x < -10 || projectile.x > worldWidth + 10) {
            this.projectiles.splice(i, 1);
            i--;
        }
    }
    if (!this.alive) {
        this.x = -1000;
        if (this.timeSinceDeath < 1) this.timeSinceDeath += delta;
        else this.respawn();
    }
    if (Date.now() - this.lastFrameSwitch >= this.frameWait) {
            this.moving ? this.nextFrame() : this.setFrame(0);
            this.lastFrameSwitch = Date.now();
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
    keysDown = new Array();
    this.health = this.maxHealth;
    this.lastHurt = Date.now();
}

Entity.prototype.checkAlive = function(entity) {
    if (Date.now() - this.lastHurt >= 2000 && entity != this && entity.x + entity.width > this.x && entity.x < this.x + this.width && entity.y + entity.height > this.y && entity.y < this.y + this.height) {
        this.health--;
        this.lastHurt = Date.now();
    }
    if (this.health <= 0) {
        this.alive = false;
        this.x = -1000;
    }
}

Entity.prototype.draw = function(context) {
    this.projectiles.forEach(function(projectile) {projectile.draw(ctx)});
    if (Date.now() - this.lastHurt >= 2000 || Math.round(Date.now() / 200) % 2 == 0) {
        if (this.direction == RIGHT) {
            context.drawImage(this.image, (this.currentFrame * this.width + this.currentFrame) * DPI, 0, this.width * DPI, this.height * DPI, (this.getX() - scrollX) * DPI, (this.getY() - scrollY) * DPI, this.width * DPI, this.height * DPI);
        }
        if (this.direction == LEFT) {
            var frameStart = ((this.width * this.numFrames + this.numFrames) - ((this.currentFrame + 1) * this.width + (this.currentFrame + 1))) * DPI;
            context.drawImage(this.image, frameStart, (this.height + 1) * DPI, this.width * DPI, this.height * DPI, (this.getX() - scrollX) * DPI, (this.getY() - scrollY) * DPI, this.width * DPI, this.height * DPI);
        }
    }
}

Entity.prototype.animate = function() {
    if (Date.now() - this.lastFrameSwitch >= this.frameWait) {
            this.moving ? this.nextFrame() : this.setFrame(0);
            this.lastFrameSwitch = Date.now();
    }
}