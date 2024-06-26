"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const dimension = canvas.getBoundingClientRect();

let grpahPoints = [];
let path = rabbit;
let circleStroke = 1;
let lineStroke = 1;
let speed = 1;
let skip = 1;
let time = 0;
let showCircle = true;
let isDrawing = true;
let showLoop = false;
let running = false;
let fourierX;

canvas.height = Math.max(600, window.innerHeight * 0.8);
canvas.width = window.innerWidth;

class Complex {
    constructor(x, y) {
        this.re = x;
        this.im = y;
    }

    add(other) {
        const re = this.re + other.re;
        const im = this.im + other.im;
        return new Complex(re, im);
    }

    multiply(other) {
        const re = this.re * other.re - this.im * other.im;
        const im = this.re * other.im + this.im * other.re;
        return new Complex(re, im);
    }

    devide(other) {
        const re = (this.re * other.re + this.im * other.im) / (other.re * other.re + other.im * other.im);
        const im = (this.im * other.re - this.re * other.im) / (other.re * other.re + other.im * other.im);
        return new Complex(re, im);
    }

    amplitude() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    phase() {
        return Math.atan2(this.im, this.re);
    }
}

// todo will update to FFT
const dft = (x) => {
    const X = [];
    const N = x.length;

    for (let i = 0; i < N; i++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < N; n++) {
            const theta = (2 * Math.PI * i * n) / N;
            const sumAngle = new Complex(Math.cos(theta), -Math.sin(theta));
            sum = sum.add(x[n].multiply(sumAngle));
        }
        sum = sum.devide(new Complex(N, 0));

        const freq = i;
        const amp = sum.amplitude();
        const phase = sum.phase();

        X[i] = {re: sum.re, im: sum.im, freq, amp, phase};
    }
    return X;
};

const getDft = () => {
    let x = [];
    fourierX = [];
    const offset = {
        x: 0,
        y: 0,
    };
    if (isDrawing) {
        offset.x = canvas.width / 4;
        offset.y = canvas.height / 2;
    }
    for (let i = 0; i < path.length; i += skip) {
        x.push(new Complex(path[i].x - offset.x, path[i].y - offset.y));
    }
    fourierX = dft(x);
    //just to sort circles in order
    fourierX.sort((a, b) => b.amp - a.amp);
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const animate = (fun) => {
    if (!running) return;
    for (let i = 0; i < speed; i++) {
        clearCanvas();
        fun();
    }
    window.requestAnimationFrame(() => {
        animate(fun);
    });
};

const drawCircle = (x, y, r, strokeWidth = 1, s = false) => {
    ctx.beginPath();
    ctx.lineWidth = strokeWidth * 0.3;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (s) {
        ctx.fillStyle = "#FF5733";
        ctx.fill();
        return;
    }
    ctx.strokeStyle = "#FF5733";
    ctx.stroke();
};

const drawLine = (x1, y1, x2, y2, stroke = 2, color = "#FF5733") => {
    ctx.beginPath();
    ctx.lineWidth = stroke;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
};

const drawCurve = (pointsArr) => {
    for (let i = 0; i < pointsArr.length; i++) {
        if (pointsArr[i + 1])
            drawLine(pointsArr[i].x, pointsArr[i].y, pointsArr[i + 1].x, pointsArr[i + 1].y, lineStroke, "#FF5733");
    }
};

const epicycles = (x, y, rotation, fourier) => {
    for (let i = 0; i < fourier.length; i++) {
        const prevX = x;
        const prevY = y;

        const freq = fourier[i].freq;
        const radius = fourier[i].amp;
        const phase = fourier[i].phase;

        x += radius * Math.cos(freq * time + phase + rotation);
        y += radius * Math.sin(freq * time + phase + rotation);

        drawLine(prevX, prevY, x, y, circleStroke * 0.2);
        if (showCircle) {
            drawCircle(prevX, prevY, radius, circleStroke);
        }
        if (i === fourier.length - 1) drawCircle(x, y, 2, true);
    }
    return {x, y};
};

const startDrawing = () => {
    const points = epicycles(canvas.width / 2, canvas.height / 2, 0, fourierX);

    grpahPoints.unshift(points);
    drawCurve(grpahPoints);

    time += (Math.PI * 2) / fourierX.length;

    if (time > 2 * Math.PI) {
        time = 0;
        !showLoop && (grpahPoints = []);
    }
    if (grpahPoints.length > path.length * 2) grpahPoints.pop();
};

const setPath = () => {
    path = [];
    grpahPoints = [];
    const tempPath = [];
    const forMouseMove = (e) => {
        // path.push({
        //   x: e.pageX - canvas.width / 2 - dimension.left,
        //   y: e.pageY - canvas.height / 2 - (dimension.bottom - dimension.height) + 16,
        // });
        path.push({
            x: e.pageX - canvas.width / 4 - dimension.left,
            y: e.pageY - 0 - (dimension.bottom - dimension.height) + 16,
        });
        tempPath.push({
            x: e.pageX - dimension.left,
            y: e.pageY - (dimension.bottom - dimension.height) + 16,
        });

        clearCanvas();
        drawCurve(tempPath);
    };

    const forMouseDown = () => {
        clearCanvas();
        canvas.addEventListener("mousemove", forMouseMove);
    };

    const forMouseUp = () => {
        canvas.classList.remove("drawing");
        canvas.removeEventListener("mousedown", forMouseDown);
        canvas.removeEventListener("mousemove", forMouseMove);
        return canvas.removeEventListener("mouseup", forMouseUp);
    };

    canvas.addEventListener("mousedown", forMouseDown);
    canvas.addEventListener("mouseup", forMouseUp);
};

document.querySelector(".start-btn").addEventListener("click", () => {
    if (!path.length) {
        alert("draw a path by clicking draw button");
        return;
    }
    running = !running;
    document.querySelector(".start-btn").innerText = running ? "stop" : "start";
    if (running) {
        document.querySelector(".start-btn").classList.add("running");
        document.querySelector(".start-draw-btn").classList.add("hide");
        document.querySelector(".default-drawings-wrapper").classList.add("hide");

        getDft();
        animate(() => {
            startDrawing();
        });
        return;
    }

    document.querySelector(".start-btn").classList.remove("running");
    document.querySelector(".start-draw-btn").classList.remove("hide");
});

document.querySelector("#slider-drawing-stroke").addEventListener("input", () => {
    lineStroke = document.querySelector("#slider-drawing-stroke").value;
});

document.querySelector("#slider-circle-stroke").addEventListener("input", () => {
    circleStroke = document.querySelector("#slider-circle-stroke").value;
});

document.querySelector("#slider-speed").addEventListener("input", () => {
    speed = document.querySelector("#slider-speed").value;
});

document.querySelector("#show-circle").addEventListener("input", () => {
    showCircle = document.querySelector("#show-circle").checked;
});

document.querySelector("#show-loop").addEventListener("input", () => {
    showLoop = document.querySelector("#show-loop").checked;
});

document.querySelector(".start-draw-btn").addEventListener("click", () => {
    running = false;
    time = 0;
    clearCanvas();
    canvas.classList.add("drawing");
    document.querySelector(".default-drawings-wrapper").classList.remove("hide");

    ctx.fillStyle = "#FF5733";
    ctx.font = "30px Arial";
    ctx.fillText(
        "Start Drawing",
        canvas.width / 2 - ctx.measureText("Start Drawing").width / 2,
        canvas.height / 2
    );
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    setPath();
});

document.querySelectorAll(".default-drawing-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        path = [];
        path = eval(btn.innerText.toLowerCase());
        clearCanvas();

        canvas.classList.remove("drawing");
        document.querySelector(".default-drawings-wrapper").classList.add("hide");
    });
});
