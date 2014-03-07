function Player(x, y, speed, platforms, health) {
    Entity.call(this, "Player", x, y, speed, 13, 36, platforms, 6, 1, health);
}

Player.prototype = new Entity;

Player.prototype.update = function(delta) {
	/*UPDATE PROJECTILES*/
	for (var i = 0; i < this.projectiles.length; i++) {
        var projectile = this.projectiles[i];
        projectile.update(delta);
        if (projectile.x < -10 || projectile.x > worldWidth + 10) {
            this.projectiles.splice(i, 1);
            i--;
        }
    }


    /*DEATH RELATED STUFF (PRETTY LIGHT STUFF)*/
    if (!this.alive) {
        this.x = -1000;
        if (this.timeSinceDeath < 1) this.timeSinceDeath += delta;
        else this.respawn();
    }


    /*KEYBOARD INPUT*/
	if (SPACE in keysDown || buttonsDown[SPACE]) {
        player.shoot();
    }
    if (UP_ARROW in keysDown || W in keysDown || buttonsDown[UP]) {
        player.move(UP, delta);
    }
    if (DOWN_ARROW in keysDown || S in keysDown || buttonsDown[DOWN]) {
        player.move(DOWN, delta);
    }
    if (LEFT_ARROW in keysDown || A in keysDown || buttonsDown[LEFT]) {
        player.move(LEFT, delta);
    }
    if (RIGHT_ARROW in keysDown || D in keysDown || buttonsDown[RIGHT]) {
        player.move(RIGHT, delta);
    }
}