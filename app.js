// Initializes the page with a default plot
function init() {
    d3.json("data/samples.json").then((data) => {

        testIds = data.names;

        for (var i = 0; i < testIds.length; i++) {
            var currID = testIds[i];

            var sel = document.getElementById('selDataset');
            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(currID));
            opt.value = currID;
            sel.appendChild(opt);
        }

    var samples = data.samples;
    var samplesId = [];

    for (var i = 0; i < samples.length; i++) {

        if (samples[i].id === '940') {
            samplesId = samples[i];
        }
    }
    
    // Obtain values needed for the bar graph
    // Filter top 10 OTUs
    var otuIds = samplesId.otu_ids.slice(0,10);
    var sampleValues = samplesId.sample_values.slice(0,10);
    var otuLabels = samplesId.otu_labels.slice(0,10);

    // Create trace
    var trace1 = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }

    var sampleData = trace1;

    console.log(trace1);

    Plotly.newPlot("bar", sampleData);

    });
};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Filter the data for the selected test
    d3.json("data/samples.json").then((data) => {
        
        var samples = data.samples;
        var samplesId = [];

        for (var i = 0; i < samples.length; i++) {

            if (samples[i].id === dataset) {
                samplesId = samples[i];
            }
        }
    
    // Obtain values needed for the bar graph
    // Filter top 10 OTUs
    var otuIds = samplesId.otu_ids.slice(0,10);
    var sampleValues = samplesId.sample_values.slice(0,10);
    var otuLabels = samplesId.otu_labels.slice(0,10);

    // Create trace
    var trace1 = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }

    var sampleData = trace1;

    console.log(trace1);

    Plotly.newPlot("bar", sampleData);
    
    });
};

init();

