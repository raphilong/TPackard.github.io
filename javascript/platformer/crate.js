function Crate(platforms) {
	Entity.call(this, "", Math.random() * canvas.width, Math.random() * canvas.height, 0, 16, 16, platforms);
}
Crate.prototype = new Entity;

Crate.prototype.respawn = function() {
	this.x = Math.random() * (canvas.width - 16);
	this.y = Math.random() * (canvas.height - 32);
}

Crate.prototype.draw = function(context) {
	context.fillStyle = "#444444";
	context.fillRect(this.getX(), this.getY(), 16, 16);
}

Crate.prototype.update = function() {

}

Crate.prototype.checkAlive = function(entity) {
	if (entity == player && entity.x > this.x && entity.x < this.x + this.width && entity.y + entity.height > this.y && entity.y < this.y + this.height) {
			this.respawn();
			entity.score++;
        }
}