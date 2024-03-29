"use strict"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const circleCenterX = 200;
const circleCenterY = 200;
const grpahPoints = [];

let time = 0;
let timeStep = 0.12;
let speed = 1;
let showCircle = true;
let mainRadius = 100;
let radius = 100;
let numberOfCircles = 1;

const animate = (fun) => {
    if (!running) return;
    for (let i = 0; i < speed; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fun();
    }
    window.requestAnimationFrame(() => {
        animate(fun);
    });
};

const drawCircle = (x, y, r, s = false) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (s) {
        ctx.fillStyle = "#FF5733";
        ctx.fill();
    } else {
        ctx.strokeStyle = "#FF5733";
        ctx.stroke();
    }
};

const drawCurve = (pointsArr, x, y) => {
    pointsArr.forEach((point, i) => {
        drawLine(
            150 + circleCenterX + i,
            point + circleCenterY,
            150 + circleCenterY + i,
            pointsArr[i + 1] + circleCenterY
        );
    });
};

const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#FF5733";
    ctx.stroke();
};

// Draw
const startDrawing = () => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < numberOfCircles; i++) {
        const prevX = x;
        const prevY = y;

        let n = i * 2 + 1;
        radius = mainRadius * (4 / (n * Math.PI));

        x += radius * Math.cos(n * time);
        y += radius * Math.sin(n * time);

        drawLine(prevX + circleCenterX, prevY + circleCenterY, x + circleCenterX, y + circleCenterY);
        if (showCircle) {
            drawCircle(prevX + circleCenterX, prevY + circleCenterY, radius);
        }
        if (i === numberOfCircles - 1) drawCircle(x + circleCenterX, y + circleCenterY, 2, true);
    }
    grpahPoints.unshift(y);

    drawCurve(grpahPoints);
    drawLine(x + circleCenterX, y + circleCenterY, 150 + circleCenterX, grpahPoints[0] + circleCenterY);

    if (grpahPoints.length > 5500) grpahPoints.pop();
    time += timeStep;
};

canvas.height = 500;
canvas.width = window.innerWidth;
let running = false;

startDrawing();

document.querySelector(".start-btn").addEventListener("click", () => {
    running = !running;
    document.querySelector(".start-btn").innerText = running ? "stop" : "start";
    running
        ? document.querySelector(".start-btn").classList.add("running")
        : document.querySelector(".start-btn").classList.remove("running");
    if (running) {
        animate(() => {
            startDrawing();
        });
    }
});

document.querySelector("#slider-speed").addEventListener("input", () => {
    speed = document.querySelector("#slider-speed").value;
});

document.querySelector("#slider-frequency").addEventListener("input", () => {
    timeStep = document.querySelector("#slider-frequency").value * 0.01;
});

document.querySelector("#circle-number").addEventListener("keyup", () => {
    document.querySelector("#circle-number").value = Math.round(
        +document.querySelector("#circle-number").value
    );
    if (+document.querySelector("#circle-number").value < 0) {
        document.querySelector("#circle-number").value *= -1;
    }
    numberOfCircles = +document.querySelector("#circle-number").value;
});

document.querySelector("#show-circle").addEventListener("change", () => {
    showCircle = document.querySelector("#show-circle").checked;
});

document.querySelector("#slider-radius").addEventListener("input", () => {
    mainRadius = document.querySelector("#slider-radius").value;
});
