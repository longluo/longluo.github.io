// the Source, a round circle

class Source {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
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

    show() {
        stroke(0);
        fill('red');
        strokeWeight(2);
        ellipse(this.x, this.y, this.r, this.r);
    }
}