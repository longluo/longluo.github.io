// main code for Kalman filtering
$(function () {
    let robot, interval, graphCtx, chart, baseline;

    let history = [];

    let processNoise = 0; // r in the problem
    let sensorNoise = 0;

    let feedbackGain = 0.1; // K in the problem

    let usingKF = false; // whether to use Kalman filtering

    function genUniformProcessNoise() {
        return (Math.random() * 2 - 1) * processNoise;
    }

    function genUniformSensorNoise() {
        return (Math.random() * 2 - 1) * sensorNoise;
    }

    // returns unbiased sampled standard deviation
    function stdevp(arr) {
        let mean = _.mean(arr);
        return Math.sqrt(_.sumBy(arr, function (x) {
            return (x - mean) ** 2
        }) / (arr.length - 1));
    }

    function updateRobot() {
        // update the robot's position
        let measurement = robot.measure();
        let control = -feedbackGain * ((usingKF ? robot.getStateEstimate() : measurement) - 0);
        let noiseVariance = feedbackGain ** 2 / 3; // variance of a uniform random variable

        robot.update(control);

        // update our estimate of the robot's position
        robot.updateEstimate(control, noiseVariance);
        robot.refineEstimate(measurement, noiseVariance);

        measurementX = this.x;
        robot.measurementX = robot.measure();

        return {x: robot.x, estimatedX: robot.estimatedX, measurementX: robot.measurementX}
    }

    function updateGraph() {
        window.clearInterval(interval);

        if (chart)
            chart.destroy();

        chart = new Chart(graphCtx, {
            type: 'scatter',
            data: {
                labels: _.range(history.length),
                datasets: [
                    {
                        label: "Actual Position",
                        data: history.map(function (elem, i) {
                            return {x: i, y: elem.x}
                        }),
                        fill: false,
                        lineTension: 0,
                        borderColor: 'red',
                        backgroundColor: 'pink'
                    },

                    {
                        label: "Kalman Filter Position",
                        data: history.map(function (elem, i) {
                            return {x: i, y: elem.estimatedX}
                        }),
                        fill: false,
                        lineTension: 0,
                        borderColor: 'green',
                        backgroundColor: 'lightgreen'
                    },

                    {
                        label: "Measurement Position",
                        data: history.map(function (elem, i) {
                            return {x: i, y: elem.measurementX}
                        }),
                        fill: false,
                        lineTension: 0,
                        borderColor: 'blue',
                        backgroundColor: 'lightblue'
                    },
                ]
            },

            options: {
                maintainAspectRatio: false
            }
        })
    }

    function reset() {
        robot = new KalmanFilter(100, genUniformProcessNoise, genUniformSensorNoise, 0);

        processNoise = parseFloat($('#process_noise').val());
        sensorNoise = parseFloat($('#measure_noise').val());

        usingKF = $('#toggle-kf').prop('checked');
        history = [{x: robot.x, estimatedX: robot.estimatedX, measurementX: robot.measurementX}];

        for (let i = 0; i < 30; i++) {
            history.push(updateRobot());
        }

        if (baseline === undefined)  // store the first run, i.e. zero noise, as the default settings
            baseline = history

        // update output
        updateGraph();

        let stdev = stdevp(_.zipWith(history, baseline, function (hist, baseline) {
            return hist.x - baseline.x;
        }));

        $('#output-panel').html(`
			ProcessNoise: ${processNoise} <br>
			SensorNoise: ${sensorNoise} <br>
			Kalman Filter: ${usingKF ? 'Enabled' : 'Disabled'} <br>
			Standard Deviation from Baseline: ${stdev.toFixed(5)}
		`);
    }

    $('#reset').click(function (e) {
        reset();
    });

    graphCtx = $('#graph').get(0).getContext('2d');
    reset();
})
