function Projectile(shooter) {
    this.shooter = shooter;
    this.direction = this.shooter.direction;
    this.x = shooter.getX() + 4;
    this.y = shooter.getY() + 16;
}

Projectile.prototype.getX = function() {
	return Math.round(this.x);
}

Projectile.prototype.getY = function() {
	return Math.round(this.y);
}

Projectile.prototype.update = function(delta) {
	this.direction == LEFT ? this.x -= 500 * delta : this.x += 500 * delta;
}

Projectile.prototype.draw = function(context) {
	context.fillStyle = "#444444";
	context.fillRect((this.getX() - scrollX) * DPI, (this.getY() - scrollY) * DPI, 4 * DPI, 2 * DPI);
}