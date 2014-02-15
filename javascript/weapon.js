function Projectile(shooter) {
    this.shooter = shooter;
    this.direction = this.shooter.direction;
    this.x = shooter.getX();
    this.y = shooter.getY();
}

Projectile.prototype.getX = function() {
	return Math.round(this.x);
}

Projectile.prototype.getY = function() {
	return Math.round(this.y);
}

Projectile.prototype.update = function(delta) {
	this.direction == left ? this.x -= 300 * delta : this.x += 300 * delta;
}

Projectile.prototype.draw = function(context) {
	context.fillStyle = "#888888";
	context.fillRect(this.getX(), this.getY(), 5, 5);
}