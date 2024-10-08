"use strict"

const height = Math.min(720, window.innerWidth);
const width = Math.min(720, window.innerWidth);

const lineWidth = 2;
const delay = 100;

let output = document.getElementById("output");
let confident = document.getElementById("confidence");


class Handwriting {

    constructor() {
        this.STEP = 25;
        this.SIZE = 28;

        this.OFFSET = {grid: {x: 10, y: 10}, box: {x: 300, y: 650}};

        this.BLUR = 2;
        this.BRIGHTNESS = {value: 50, k: 0.3};

        this.mousePressed = false;
        this.prevCoords = {x: -1, y: -1};

        this.grid = [];
        this.box = [];

        this.predict = false;

        for (let i = 0; i < this.SIZE; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.SIZE; j++) {
                this.grid[i][j] = 0;
            }
        }

        for (let i = 0; i < 10; i++) {
            this.box[i] = Math.random();
        }

        // Define Neural Network
        let options = {
            inputs: [this.SIZE, this.SIZE, 4],
            task: "imageClassification",
        };

        this.numberClassifier = ml5.neuralNetwork(options);
        this.numberClassifier.load(modelDetails, this.loadModel.bind(this));
    }

    loadModel() {
        this.predict = true;
        console.log("Model loaded");
    }

    makeBlur(curr, prev) {
        const {value, k} = this.BRIGHTNESS;

        let dir = {x: (curr.x - prev.x) * k, y: (curr.y - prev.y) * k};

        for (let i = -this.BLUR; i < this.BLUR + 1; i++) {
            let y = curr.y + i;
            if (y < 0 || y >= this.grid.length) continue;

            for (let j = -this.BLUR; j < this.BLUR + 1; j++) {
                let x = curr.x + j;
                if ((!i && !j) || x + j < 0 || x + j >= this.grid[y].length) {
                    continue;
                }

                this.grid[y][x] += Math.floor(value / ((i - dir.y) * (i - dir.y) + (j - dir.x) * (j - dir.x)));
                this.grid[y][x] = this.grid[y][x] > 255 ? 255 : this.grid[y][x];
            }
        }
    }

    // Bresenham's Algorithm
    drawLine(start, end) {
        let pixels = [];

        let dx = end.x - start.x;
        let dy = end.y - start.y;

        let dx1 = Math.abs(dx);
        let dy1 = Math.abs(dy);

        // Calculate error intervals for both axis
        let px = 2 * dy1 - dx1;
        let py = 2 * dx1 - dy1;

        let x = 0;
        let y = 0;
        let xe = 0;
        let ye = 0;

        // The line is X-axis dominant
        if (dy1 <= dx1) {
            // Line is drawn left to right
            if (dx >= 0) {
                x = start.x;
                y = start.y;
                xe = end.x;
            } else {
                // Line is drawn right to left (swap ends)
                x = end.x;
                y = end.y;
                xe = start.x;
            }

            pixels.push({x, y});

            for (; x < xe; x++) {
                // Deal with octants...
                if (px < 0) px += 2 * dy1;
                else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) y++;
                    else y--;

                    px += 2 * (dy1 - dx1);
                }
                // Draw pixel from line span at currently rasterized position
                pixels.push({x, y});
            }
        } else {
            // The line is Y-axis dominant
            // Line is drawn bottom to top
            if (dy >= 0) {
                x = start.x;
                y = start.y;
                ye = end.y;
            } else {
                // Line is drawn top to bottom
                x = end.x;
                y = end.y;
                ye = start.y;
            }

            // Draw first pixel Rasterize the line
            pixels.push({x, y});

            for (; y < ye; y++) {
                // Deal with octants...
                if (py <= 0) {
                    py += 2 * dx1;
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        x++;
                    } else {
                        x--;
                    }

                    py += 2 * (dx1 - dy1);
                }

                // Draw pixel from line span at currently rasterized position
                pixels.push({x, y});
            }
        }

        return pixels;
    }

    setPixel({x, y}) {
        x = Math.floor((x - this.OFFSET.grid.x) / this.STEP);
        y = Math.floor((y - this.OFFSET.grid.y) / this.STEP);

        if ((x == this.prevCoords.x && y == this.prevCoords.y) || y < 0 || x < 0 || y >= this.SIZE || x >= this.SIZE) {
            return;
        }

        if (this.prevCoords.x == -1) {
            this.prevCoords = {x, y};
        }

        this.drawLine({x, y}, this.prevCoords).forEach(({x, y}) => {
            this.grid[y][x] = this.grid[y][x] + 180 > 255 ? 255 : this.grid[y][x] + 180;
            this.makeBlur({x, y}, this.prevCoords.x == -1 ? {x, y} : this.prevCoords);
        });

        this.prevCoords = {x, y};
        if (this.predict) {
            this.applyNeuralNetwork();
        }
    }

    applyNeuralNetwork() {
        this.predict = false;

        let img = createImage(this.SIZE, this.SIZE);

        img.loadPixels();

        for (let i in this.grid) {
            for (let j in this.grid[i]) {
                img.set(j, i, this.grid[i][j]);
            }
        }

        img.updatePixels();

        this.numberClassifier.classify({image: img}, this.setBox.bind(null, this));
    }

    setBox(ptr, err, result) {
        if (err) {
            console.log(err);
            return;
        }

        ptr.predict = true;

        for (let {label, confidence} of result) {
            ptr.box[label] = confidence;
        }

        let likely_result = result[0].label;
        let likely_confidence = nf(100 * result[0].confidence, 2, 1);

        console.log(likely_result + ", " + likely_confidence);

        output.innerHTML = likely_result;
        confident.innerHTML = likely_confidence + "%";
    }

    reset() {
        for (let i in this.grid) {
            for (let j in this.grid[i]) {
                this.grid[i][j] = 0;
            }
        }
    }

    drawGrid({x, y}) {
        stroke(200);

        let len = this.STEP * this.SIZE;

        for (let i in this.grid) {
            const step = i * this.STEP;

            // Create grid
            line(x, y + step, x + len, y + step);
            line(x + step, y, x + step, y + len);

            for (let j in this.grid[i]) {
                fill(this.grid[i][j]);
                rect(x + j * this.STEP + 1, y + step + 1, this.STEP - lineWidth, this.STEP - lineWidth);
            }
        }

        // Draw two last lines
        line(x, y + len, x + len, y + len);
        line(x + len, y, x + len, y + len);
    }

    draw() {
        this.drawGrid(this.OFFSET.grid);
    }
}

const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
};

const handwriting = new Handwriting();

function setup() {
    let myCanvas = createCanvas(width, height);
    myCanvas.parent("canvas");
}

function mouseClicked() {

}

function draw() {
    background(0);

    if (mouseIsPressed) {
        handwriting.setPixel({x: mouseX, y: mouseY});
    } else {
        handwriting.prevCoords = {x: -1, y: -1};
    }

    handwriting.draw();
}

function btnResetAll() {
    handwriting.reset();
}
