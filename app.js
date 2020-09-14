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
    var otuIds = samplesId.otu_ids.slice(0,10).reverse();
    var sampleValues = samplesId.sample_values.slice(0,10).reverse();
    var otuLabels = samplesId.otu_labels.slice(0,10).reverse();

    // All OtuIds
    var otuIdsAll = samplesId.otu_ids;
    var sampleValuesAll = samplesId.sample_values;
    var otuLabelsAll = samplesId.otuLabels

    var newOtuIds = [];

    for (var i = 0; i < otuIds.length; i++) {
        newOtuIds.push(`OTU ${otuIds[i]}`)
    }

    // Create trace
    var trace1 = {
        x: sampleValues,
        y: newOtuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    }

    var trace2 = {
        x: otuIdsAll,
        y: sampleValuesAll,
        mode: 'markers',
        text: otuLabelsAll,
        marker: {
            size: sampleValuesAll,
            color: otuIdsAll
        }
    }

    var sampleData = [trace1];
    var bubbleData = [trace2];

    Plotly.newPlot('bar', sampleData);

    Plotly.newPlot('bubble', bubbleData);
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
    var otuIds = samplesId.otu_ids.slice(0,10).reverse();
    var sampleValues = samplesId.sample_values.slice(0,10).reverse();
    var otuLabels = samplesId.otu_labels.slice(0,10).reverse();

    // All OtuIds
    var otuIdsAll = samplesId.otu_ids;
    var sampleValuesAll = samplesId.sample_values;
    var otuLabelsAll = samplesId.otuLabels

    var newOtuIds = [];

    for (var i = 0; i < otuIds.length; i++) {
        newOtuIds.push(`OTU ${otuIds[i]}`)
    }

    Plotly.restyle("bar", "x", [sampleValues]);
    Plotly.restyle("bar", "y", [newOtuIds]);
    Plotly.restyle("bar", "text", [otuLabels]);
    
    Plotly.restyle("bubble", "x", [otuIdsAll]);
    Plotly.restyle("bubble", "y", [sampleValuesAll]);
    Plotly.restyle("bubble", "text", [otuLabelsAll]);
    Plotly.restyle("bubble", "size", [sampleValuesAll]);
    Plotly.restyle("bubble", "color", [otuIdsAll]);

    });
};


init();

