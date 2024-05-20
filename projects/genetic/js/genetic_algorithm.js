let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

let canvas_width;
let canvas_height;

let fps = 24;
let paused = false;
let mobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

let lifetime; // How long should each generation live
let current_age;

let population; // Population

let lifecycle; // Timer for cycle of generation
let recordtime; // Fastest time to target

let mutation_rate;

//let diam = 24;   // Size of target

let obstacles = []; // all the obstacles!

let source; // Source Position
let target; // Target position

let num_boids;
let num_reached;

let reached_target;
let fastest_time;

let reached_bias;
let dead_bias;
let early_bias;

if (mobile) {
    canvas_width = 0.9 * screen_width;
} else {
    canvas_width = 0.4 * screen_width;
}

canvas_height = canvas_width;

// let canvas = document.getElementById("canvas");
// let context = canvas.getContext("2d");

let canvas;
let context;

let pause_button = document.getElementById("pause-button");


let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

function step() {
    if (!paused) {
        // update();
    }
    // render();
    animate(step);
}

window.onload = function () {
    initParams();
    animate(step);
}

function setup() {
    canvas = createCanvas(canvas_width, canvas_height);

    canvas.parent('main');

    console.log("setup: mobile=" + mobile + ", screen w=" + screen_width + ", h=" + screen_height)
    console.log("setup: canvas w=" + canvas_width + ", h=" + canvas_height)

    initParams();
}

function initParams() {
    // The number of cycles we will allow a generation to live
    lifetime = 1000;

    // Initialize variables
    lifecycle = 0;
    recordtime = lifetime;

    num_boids = 200;

    source = new Source(canvas_width / 2, 7 * canvas_height / 8, 15);
    // target = new Target(canvas_width / 2, canvas_height / 8);

    target = new Obstacle(width / 2 - 12, 24, 24, 24);

    // Create a population with a mutation rate, and population max
    mutation_rate = 0.01;

    // Create the obstacle course
    obstacles = [];
    obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));

    initialize();

    console.log("initParams: mutationRate = " + mutation_rate + ", recordtime = " + recordtime)
}

function initialize() {
    console.log("initialize: paused=" + paused);

    population = new Population(mutation_rate, num_boids);

    if (paused) {
        pauseToggle();
    }
}

function draw() {
    background(255);

    // Draw the start and target positions
    target.show();
    // target.render();

    // If the generation hasn't ended yet
    if (lifecycle < lifetime) {
        population.live(obstacles);
        if (population.targetReached() && lifecycle < recordtime) {
            recordtime = lifecycle;
        }
        lifecycle++;
        // Otherwise a new generation
    } else {
        lifecycle = 0;
        population.calcFitness();
        population.selection();
        population.reproduction();
    }

    source.show();

    // Draw the obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }

    displayInfo();
}

function displayInfo() {
    // Display some info
    fill(0);
    noStroke();
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Cycles left: " + (lifetime - lifecycle), 10, 36);
    text("Record cycles: " + recordtime, 10, 54);
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
    target.position.x = mouseX;
    target.position.y = mouseY;
    recordtime = lifetime;
}

function pauseToggle() {
    console.log("pauseToggle paused = " + paused);

    if (paused) {
        paused = false;
        pause_button.innerHTML = "Pause";
    } else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}
