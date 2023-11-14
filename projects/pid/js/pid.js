"use strict";

(function () {
        // Display
        const canvas = document.getElementById("cvs_track");
        const ctx = canvas.getContext("2d");

        const paraSliders = document.querySelectorAll('input[type="range"]');
        const paraInputs = document.querySelectorAll('input[type="number"]');

        // Set the canvas dimensions to fill the entire page
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            console.log("w = " + canvas.width + ", h = " + canvas.height);
        }

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        canvas.addEventListener("click", canvasClick);


        var setPointX = 300;
        var setPointY = 300;

        var CAR_MASS = 10;

        var Kp = 5; //proportional gain
        var Ki = 0.01; //integral gain
        var Kd = 10; //derivative gain

        var resist = 0.5;
        var drag = 1;

        // Current Postion
        var positionX = 0;
        var positionY = 0;

        var velocityX = 0;
        var velocityY = 0;

        var accelerateX = 0;
        var accelerateY = 0;

        var previousErrorX = 0;
        var previousErrorY = 0;

        var integralX = 0;
        var integralY = 0;

        var derivativeX = 0;
        var derivativeY = 0;

        var forceX = 0;
        var forceY = 0;

        let lastTime = new Date();

        var MAX_HISTORY_LENGTH = 50;

        var history = [];
        var historyTick = 0;

        window.addEventListener("load", function (e) {
            document.body.appendChild(canvas);
            reset();
            main();
        });

        // click to set the Target
        function canvasClick(e) {
            setPointX = e.clientX;
            setPointY = e.clientY;
        }

        function main() {
            let curTime = new Date();
            let dt = (curTime - lastTime) / 1000.0;

            if (dt <= 0) {
                return;
            }

            // console.log("main: curTime=" + curTime + ", dt=" + dt)

            CalculatePhysics(dt);
            PIDcalcPosition(dt);

            drawUI();

            setInterval(main, 20);

            lastTime = curTime;
        }

        function reset() {
            positionX = 100;
            velocityX = 0;
            accelerateX = 0;

            positionY = 100;
            velocityY = 0;
            accelerateY = 0;

            previousErrorX = 0;
            integralX = 0;

            previousErrorY = 0;
            integralY = 0;
        }

        function PIDcalcPosition(dt) {
            var errorX = setPointX - positionX;
            var errorY = setPointY - positionY;

            // console.log("PIDcalcPosition: error: x=" + errorX + ", y=" + errorY);

            var proportionalX = errorX;
            var proportionalY = errorY;

            integralX = integralX + errorX * dt;
            integralY = integralY + errorY * dt;

            derivativeX = (errorX - previousErrorX) / dt;
            derivativeY = (errorY - previousErrorY) / dt;

            // console.log("PIDcalcPosition: dt = " + dt);
            // console.log("PIDcalcPosition: errorX = " + errorX + ", errorY = " + errorY);
            // console.log("PIDcalcPosition: px=" + proportionalX + ", py=" + proportionalY);
            // console.log("PIDcalcPosition: ix=" + integralX + ", iy=" + integralY);
            // console.log("PIDcalcPosition: dx=" + derivativeX + ", dy=" + derivativeY);

            forceX = Kp * proportionalX + Ki * integralX + Kd * derivativeX;
            forceY = Kp * proportionalY + Ki * integralY + Kd * derivativeY;

            previousErrorX = errorX;
            previousErrorY = errorY;

            // console.log("PIDcalcPosition x = " + forceX + " y = " + forceY);
        }

        function CalculatePhysics(dt) {
            accelerateX = forceX / CAR_MASS;
            velocityX += (accelerateX * dt);
            positionX += (accelerateX * dt * dt) / 2 + velocityX * dt;

            accelerateY = forceY / CAR_MASS;
            velocityY += (accelerateY * dt);
            positionY += (accelerateY * dt * dt) / 2 + velocityY * dt;
        }

        function drawTrack() {
            for (var i = 0; i < history.length; ++i) {
                ctx.fillStyle = "rgba(96, 185, 154," + (i / history.length) + ")";
                ctx.beginPath();
                ctx.arc(history[i][0], history[i][1], 5, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();

                var diffX = Math.abs(setPointX - history[i][0]);
                var diffY = Math.abs(setPointY - history[i][1]);

                // console.log("x = " + diffX + ", y = " + diffY)
            }
        }

        function drawConnectLine() {
            // Draw the Dash Line WallE to the target
            ctx.strokeStyle = "#E7D492";
            ctx.lineWidth = 5;
            ctx.setLineDash([8, 14]);
            ctx.beginPath()
            ctx.moveTo(setPointX, setPointY);
            ctx.lineTo(positionX, positionY);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        function drawWalle() {
            // Draw the WallE
            ctx.fillStyle = "#ff5733";
            ctx.beginPath();
            ctx.arc(positionX, positionY, 15, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        function drawThruster() {
            ctx.strokeStyle = "#CE2029"
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            ctx.beginPath()
            ctx.moveTo(positionX, positionY);
            ctx.lineTo(positionX - forceX / 10, positionY);
            ctx.stroke();
            ctx.beginPath()
            ctx.lineTo(positionX, positionY);
            ctx.lineTo(positionX, positionY - forceY / 10);
            ctx.stroke();
        }

        function drawTarget() {
            // Draw a blue dot at the position of the click
            ctx.beginPath();
            ctx.arc(setPointX, setPointY, 7, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        }

        function drawAccelerate() {
            ctx.strokeStyle = "#0F0"
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.beginPath()
            ctx.moveTo(positionX, positionY);
            ctx.lineTo(positionX + accelerateX / 3, positionY + accelerateY / 3);
            ctx.stroke();
        }

        function drawVelocity() {
            ctx.strokeStyle = "#00F"
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.beginPath()
            ctx.moveTo(positionX, positionY);
            ctx.lineTo(positionX + velocityX / 3, positionY + velocityY / 3);
            ctx.stroke();
        }

        function drawUI() {
            if (++historyTick == 5) {
                historyTick = 0;

                if (history.length >= MAX_HISTORY_LENGTH) {
                    history.shift();
                }

                history.push([positionX, positionY])

                // console.log("len= " + history.length)
            }

            ctx.fillStyle = "#C7EDCC";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawTrack();

            drawConnectLine();

            drawWalle();

            drawThruster();
            drawVelocity();
            drawAccelerate();

            drawTarget();
        }

        reset();
        main(0);

        // change the PIDs
        var kpInput = document.getElementById("kp");
        var kiInput = document.getElementById("ki");
        var kdInput = document.getElementById("kd");

        paraSliders.forEach(function (slider, index) {
            slider.addEventListener('input', function (event) {
                const value = event.target.value;
                paraInputs[index].value = value;
                updateCoefficients();
            });
        });

        paraInputs.forEach(function (input, index) {
            input.addEventListener('input', function (event) {
                const value = event.target.value;
                paraSliders[index].value = value;
                updateCoefficients();
            });
        });

        function updateCoefficients() {
            Kp = parseFloat(kpInput.value);
            Ki = parseFloat(kiInput.value);
            Kd = parseFloat(kdInput.value);

            reset();
        }

        kpInput.addEventListener("blur", updateCoefficients);
        kiInput.addEventListener("blur", updateCoefficients);
        kdInput.addEventListener("blur", updateCoefficients);

        kpInput.value = Kp;
        kiInput.value = Ki;
        kdInput.value = Kd;


        var error_dps_x = [];
        var integral_dps_x = [];
        var derivative_dps_x = [];

        var chart_pid_x = new CanvasJS.Chart("plot_pid_x", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "PID X"
            },
            axisY: {
                title: "Output"
            },
            toolTip: {
                shared: true
            },
            data: [
                {
                    type: "spline",
                    name: "Error(差值)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: error_dps_x
                },
                {
                    type: "spline",
                    name: "Integral(积分量)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: integral_dps_x
                },
                {
                    type: "spline",
                    name: "Derivative(微分量)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: derivative_dps_x
                },
            ]
        });

        var error_dps_y = [];
        var integral_dps_y = [];
        var derivative_dps_y = [];

        var chart_pid_y = new CanvasJS.Chart("plot_pid_y", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "PID Y"
            },
            axisY: {
                title: "Output"
            },
            toolTip: {
                shared: true
            },
            data: [
                {
                    type: "spline",
                    name: "Error(差值)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: error_dps_y
                },
                {
                    type: "spline",
                    name: "Integral(积分量)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: integral_dps_y
                },
                {
                    type: "spline",
                    name: "Derivative(微分量)",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: derivative_dps_y
                },
            ]
        });


        var xVal = 0;

        var updateInterval = 20;

        var dataLength = 100;

        var updateChart = function () {

            error_dps_x.push({
                x: xVal,
                y: previousErrorX
            });

            integral_dps_x.push({
                x: xVal,
                y: integralX
            });

            derivative_dps_x.push({
                x: xVal,
                y: derivativeX
            });

            error_dps_y.push({
                x: xVal,
                y: previousErrorY
            });

            integral_dps_y.push({
                x: xVal,
                y: integralY
            });

            derivative_dps_y.push({
                x: xVal,
                y: derivativeY
            });

            xVal++;

            // console.log("errordps: " + error_dps);

            if (error_dps_x.length > dataLength
                || integral_dps_x.length > dataLength
                || derivative_dps_x.length > dataLength) {
                error_dps_x.shift();
                integral_dps_x.shift();
                derivative_dps_x.shift();

                error_dps_y.shift();
                integral_dps_y.shift();
                derivative_dps_y.shift();
            }

            chart_pid_x.render();
            chart_pid_y.render();
        };

        setInterval(function () {
            updateChart()
        }, updateInterval);
    }

)();
