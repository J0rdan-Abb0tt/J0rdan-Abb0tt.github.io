class PlacementTile {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position;
        this.size = 64;
        this.color = 'rgba(118, 252, 111, .3)';
        this.occupied = false;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    update(mouse) {
        this.draw();

        if (mouse.x > this.position.x 
            && mouse.x < this.position.x + this.size 
            && mouse.y > this.position.y 
            && mouse.y < this.position.y + this.size) {
                this.color = 'rgba(118, 252, 111, 1)';
        } else {
            this.color = 'rgba(118, 252, 111, .3)';
        }
    }
}