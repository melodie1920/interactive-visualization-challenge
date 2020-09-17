function init() {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var meta = data.metadata;
        var metaId = [];

        for (var i = 0; i < samples.length; i++) {

            if (samples[i].id === '940') {
                metaId = meta[i];
            }
        }

        var metaWfreq = metaId.wfreq;

        var gaugeDiv = document.getElementById("gauge");

        var traceGauge = {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81/9,81],
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: [
                    "rgba(232, 226, 202, .5)",
                    "rgba(220, 215, 175, .5)",
                    "rgba(211, 210, 110, .5)",
                    "rgba(190, 204, 80, .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(150, 190, 32, .5)",
                    "rgba(125, 170, 27, .5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(14, 127, 0, .5)",
                    'white'],
                labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
                hoverinfo: 'label'
            }
            }

        if (metaWfreq === 0) {
            x = 0.29;
            y = 0.5;
        }

        else if (metaWfreq === 1) {
            x = 0.29;
            y = 0.55;
        }

        else if (metaWfreq === 2) {
            x = 0.345;
            y = 0.6;
        }

        else if (metaWfreq === 3) {
            x = 0.39;
            y = 0.64;
        }

        else if (metaWfreq === 4) {
            x = 0.47;
            y = 0.65;
        }

        else if (metaWfreq === 5) {
            x = 0.54;
            y = 0.65;
        }

        else if (metaWfreq === 6) {
            x = 0.59;
            y = 0.63;
        }

        else if (metaWfreq === 7) {
            x = 0.66;
            y = 0.60;
        }

        else if (metaWfreq === 8) {
            x = 0.70;
            y = 0.56;
        }

        else {
            x = 0.71;
            y = 0.50;
        }

        var gaugeLayout = {
        shapes: [{
            type: 'line',
            x0: 0.5,
            y0: 0.5,
            x1: x,
            y1: y,
            line: {
            color: 'black',
            width: 3
            }
        }],
        title: 'Belly Button Washing Frequency',
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]}
        }

        var dataGauge = [traceGauge];
    
        Plotly.newPlot(gaugeDiv, dataGauge, gaugeLayout, {staticPlot: true});

    });

};

function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Filter the data for the selected test
    d3.json("data/samples.json").then((data) => {
        
        var samples = data.samples;
        var meta = data.metadata;
        var metaId = [];
    
        for (var i = 0; i < samples.length; i++) {

            if (samples[i].id === dataset) {
                samplesId = samples[i];
                metaId = meta[i];
            }
        }

        var metaWfreq = metaId.wfreq;

        var gaugeDiv = document.getElementById("gauge");

        if (metaWfreq === 0) {
            x = 0.29;
            y = 0.5;
        }

        else if (metaWfreq === 1) {
            x = 0.29;
            y = 0.55;
        }

        else if (metaWfreq === 2) {
            x = 0.345;
            y = 0.6;
        }

        else if (metaWfreq === 3) {
            x = 0.39;
            y = 0.64;
        }

        else if (metaWfreq === 4) {
            x = 0.47;
            y = 0.65;
        }

        else if (metaWfreq === 5) {
            x = 0.54;
            y = 0.65;
        }

        else if (metaWfreq === 6) {
            x = 0.59;
            y = 0.63;
        }

        else if (metaWfreq === 7) {
            x = 0.66;
            y = 0.60;
        }

        else if (metaWfreq === 8) {
            x = 0.70;
            y = 0.56;
        }

        else {
            x = 0.71;
            y = 0.50;
        }

        Plotly.restyle(gaugeDiv, "x1", [x]);
        Plotly.restyle(gaugeDiv, "y1", [y]);
    });
};

init();