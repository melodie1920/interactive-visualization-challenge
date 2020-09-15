function init() {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var meta = data.metadata;
        var samplesId = [];
        var metaId = [];

        for (var i = 0; i < samples.length; i++) {

            if (samples[i].id === '940') {
                samplesId = samples[i];
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
                colors: ['','','','','','','','','','white'],
                labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
                hoverinfo: 'label'
            }
            }

            if (metaWfreq === 2) {
                degrees = 120;
                radius = 0.76;
            }

            

            // needle
            //var degrees = 90;
            //var radius = .5;
            var radians = degrees * Math.PI / 180;
            var x = -1 * radius * Math.cos(radians);
            var y = radius * Math.sin(radians);
            
            console.log(radians);
            console.log(x);
            console.log(y);

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

init();