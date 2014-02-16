function AI(imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim) {
    Entity.call(this, imgSrc, x, y, speed, width, height, platforms, numFrames, numAnim);
    if (Math.random() >= 0.5) this.direction = "right";
    else this.direction = "left";
    this.respawnX = this.x;
    this.respawnY = this.y;
}

AI.prototype = new Entity;

AI.prototype.update = function(delta) {
    if (this.alive) {
        if (this.direction == right && !this.canMove(right)) {
            this.direction = left;
        }
        if (this.direction == left && !this.canMove(left)) {
            this.direction = right;
        }
        if (this.y >= canvas.height - this.height) this.respawn();
        this.move(this.direction, delta);
    } else {
        this.x = -1000;
        if (this.timeSinceDeath < 1) this.timeSinceDeath += delta;
        else this.respawn();
    }
}

AI.prototype.respawn = function() {
    this.x = this.respawnX;
    this.y = this.respawnY;
    this.alive = true;
    this.timeSinceDeath = 0;
    if (Math.random() >= 0.5) this.direction = right;
    else this.direction = left;
}

AI.prototype.checkAlive = function(entity) {
    var me = this; // WHY?!
    var index = 0;
    if (entity == player)
    entity.projectiles.forEach(function(projectile) {
        if (projectile.x > me.x && projectile.x < me.x + me.width && projectile.y > me.y && projectile.y < me.y + me.height) {
            me.alive = false;
            entity.projectiles.splice(index, index + 1);
        }
        index++;
    });
}