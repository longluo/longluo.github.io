/*  CORDIC Algorithm  */

// Constants
let iterations;

let omegaTable;
let arctanTable;

function $(id) {
    return document.getElementById(id);
}

function $name(name) {
    return document.getElementsByName(name);
}

function toRadians(value) {
    return (value * Math.PI) / 180;
}

function toDegrees(value) {
    return (value * 180) / Math.PI;
}

// Create a table containing every values of 2^-i
// And create a second table with arctan value of 2^-i
// With i from 0 to the number of iterations
function init() {
    omegaTable = new Array();
    arctanTable = new Array();

    for (let i = 0; i < iterations; i++) {
        omegaTable.push(Math.pow(2, -i));
        arctanTable.push(Math.atan(omegaTable[i]));
    }
}

// Function called when the run button is pressed
function run() {
    let input = $('alpha').value;
    let iteration = $('iteration').value;

    if (input > 90 || input < 0 || isNaN(input)) {
        $('errorAlpha').value = "The value must be a number beetween 0 and 90!";
    } else {
        $('errorAlpha').value = "";

        if (iteration > 666 || iteration < 1 || isNaN(iteration)) {
            $('errorIteration').value = "The value must be a number beetween 1 and 666!";
        } else {
            $('errorIteration').value = "";

            input = toRadians(input);

            iterations = $('iteration').value;

            init();

            //Use CORDIC and calculate time
            let time = performance.now();

            let results = cordic(input);

            time = performance.now() - time;

            $('cordicCos').value = results[0];
            $('cordicSin').value = results[1];
            $('cordicTan').value = results[1] / results[0];

            $('jsCos').value = Math.cos(input);
            $('jsSin').value = Math.sin(input);
            $('jsTan').value = Math.tan(input);

            $('diffCos').value = Math.abs(Math.cos(input) - results[0]);
            $('diffSin').value = Math.abs(Math.sin(input) - results[1]);
            $('diffTan').value = Math.abs(Math.tan(input) - (results[1] / results[0]));

            $('cordicTime').value = "Performance: " + iterations + " iterations(s) cost " + time + " ms";
        }
    }
}

function cordic(alpha) {
    // Init
    let x = 1;
    let y = 0;
    let r = 1;

    for (let i = 0; i < iterations; i++) {

        while (alpha > arctanTable[i]) {
            let dx = x - y * omegaTable[i];
            let dy = y + x * omegaTable[i];
            let rx = r * Math.sqrt(1 + Math.pow(omegaTable[i], 2));

            alpha = alpha - arctanTable[i];
            x = dx;
            y = dy;
            r = rx;
        }
    }

    let cos = x / r;
    let sin = y / r;
    return [cos, sin];
}

