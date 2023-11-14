class Target {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    initSelect() {
        this.initial_x = 0;
        this.initial_y = 0;
        this.selected_x = 0;
        this.selected_y = 0;
    }

    select() {
        this.selected = true;
        this.initial_x = this.x;
        this.initial_y = this.y;
        this.selected_x = click_x;
        this.selected_y = click_y;
    }

    update() {
        if (this.selected) {
            this.x = this.initial_x + click_x - this.selected_x;
            this.y = this.initial_y + click_y - this.selected_y;
        }
    }

    release() {
        this.selected = false;
    }

    clicked() {
        if (getDistance(this.x, this.y, click_x, click_y) < this.radius) {
            return true;
        } else {
            return false;
        }
    }

    inside(boid) {
        if (getDistance(this.x, this.y, boid.x, boid.y) < this.radius) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        // context.fillStyle = "#ff0000";
        // context.beginPath();
        // context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // context.fill();

        stroke(0);
        fill(175);
        strokeWeight(2);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
    }
}