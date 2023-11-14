"use strict"

let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

let canvas_width;
let canvas_height;

let fps = 24;
let paused = false;

let is_mobile;

if (/Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    is_mobile = true;
} else {
    is_mobile = false;
}

if (is_mobile) {
    canvas_width = 0.9 * screen_width;
} else {
    canvas_width = 0.5 * screen_width;
}

canvas_height = canvas_width;

let points = [];
let thresh = 0;

let toggle = false

let speed = 0.005;


function Line(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

function setup() {
    colorMode(HSB, 100);

    let myCanvas = createCanvas(canvas_width, canvas_height);
    myCanvas.parent("canvas");

    angleMode(RADIANS);
}

function btnResetAll() {
    setTimeout(() => {
        points = []
    }, 10)
}

function mouseClicked() {
    if (
        mouseX > canvas_width ||
        mouseY > canvas_height ||
        mouseX < 0 ||
        mouseY < 0) {
        return;
    }

    let vec = createVector(mouseX, mouseY);
    points.push(vec);

    background(10);
}

function draw() {
    background(10);

    if (points.length) {
        animate(points, speed);
    } else {
        points.push(createVector(mouseX, mouseY));
    }

    if (!(
        mouseX > canvas_width ||
        mouseY > canvas_height ||
        mouseX < 0 ||
        mouseY < 0)) {
        points[points.length - 1].x = mouseX;
        points[points.length - 1].y = mouseY;
    }
}

function animate(arr, speed) {
    thresh += speed;
    thresh = thresh % 1;
    thresh = min(1, thresh);

    recresive_bezier(arr, thresh, true);

    strokeWeight(5);
    stroke("white");

    noFill();

    beginShape();

    for (let t = 0; t < thresh; t += 0.001) {
        let point = recresive_bezier(arr, t);
        vertex(point.x, point.y);
    }

    endShape();
}

function recresive_bezier(arr, t, draw, level = 0, original_size = null) {
    const ret_arr = [];

    if (draw) {
        if (!original_size) {
            original_size = arr.length;
        }

        if (arr.length === 1) {
            stroke("white");
            strokeWeight(15);
            point(arr[0]);
            stroke("black");
            strokeWeight(10);
            point(arr[0]);
            return;
        }

        let col = map(original_size - level, 1, original_size, 100, 1);

        stroke(col, 100, 100);

        for (let i = 0; i < arr.length - 1; i++) {
            strokeWeight(10 - level);
            point(arr[i]);
            point(arr[i + 1]);
            strokeWeight(3);
            Line(arr[i], arr[i + 1]);
            ret_arr.push(p5.Vector.lerp(arr[i], arr[i + 1], t));
        }

        recresive_bezier(ret_arr, t, draw, level + 1, original_size);
        return
    }

    if (arr.length === 1) {
        return arr[0];
    }

    for (let i = 0; i < arr.length - 1; i++) {
        ret_arr.push(p5.Vector.lerp(arr[i], arr[i + 1], t));
    }

    if (ret_arr.length === 1) {
        return ret_arr[0];
    } else {
        return recresive_bezier(ret_arr, t);
    }
}
