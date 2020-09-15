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
    var meta = data.metadata;
    var samplesId = [];
    var metaId = [];

    for (var i = 0; i < samples.length; i++) {

        if (samples[i].id === '940') {
            samplesId = samples[i];
            metaId = meta[i];
        }
    }
    
    var metaAge = metaId.age;
    var metaBbtype = metaId.bbtype;
    var metaEthnicity = metaId.ethnicity;
    var metaGender = metaId.gender;
    var metaLocation = metaId.location;
    var metaWfreq = metaId.wfreq;

    var sel = document.getElementById('sample-metadata');
    var optId = document.createElement('p');
    var optEthnicity = document.createElement('p');
    var optGender = document.createElement('p');
    var optAge = document.createElement('p');
    var optLocation = document.createElement('p');
    var optBbtype = document.createElement('p');
    var optWfreq = document.createElement('p');
    optId.appendChild(document.createTextNode("id: 940"));
    optEthnicity.appendChild(document.createTextNode(`ethnicity: ${metaEthnicity}`));
    optGender.appendChild(document.createTextNode(`gender: ${metaGender}`));
    optAge.appendChild(document.createTextNode(`age: ${metaAge}`));
    optLocation.appendChild(document.createTextNode(`location: ${metaLocation}`));
    optBbtype.appendChild(document.createTextNode(`bbtype: ${metaBbtype}`));
    optWfreq.appendChild(document.createTextNode(`wfreq: ${metaWfreq}`));
    sel.appendChild(optId);
    sel.appendChild(optEthnicity);
    sel.appendChild(optGender);
    sel.appendChild(optAge);
    sel.appendChild(optLocation);
    sel.appendChild(optBbtype);
    sel.appendChild(optWfreq);

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
//d3.selectAll("body").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Filter the data for the selected test
    d3.json("data/samples.json").then((data) => {
        
        var samples = data.samples;
        var meta = data.metadata;
        var samplesId = [];
        var metaId = [];
    
        for (var i = 0; i < samples.length; i++) {

            if (samples[i].id === dataset) {
                samplesId = samples[i];
                metaId = meta[i];
            }
        }

        var metaAge = metaId.age;
        var metaBbtype = metaId.bbtype;
        var metaEthnicity = metaId.ethnicity;
        var metaGender = metaId.gender;
        var metaLocation = metaId.location;
        var metaWfreq = metaId.wfreq;

        document.getElementById('sample-metadata').innerHTML = "";

        var sel = document.getElementById('sample-metadata');
        var optId = document.createElement('p');
        var optEthnicity = document.createElement('p');
        var optGender = document.createElement('p');
        var optAge = document.createElement('p');
        var optLocation = document.createElement('p');
        var optBbtype = document.createElement('p');
        var optWfreq = document.createElement('p');
        optId.appendChild(document.createTextNode(`id: ${dataset}`));
        optEthnicity.appendChild(document.createTextNode(`ethnicity: ${metaEthnicity}`));
        optGender.appendChild(document.createTextNode(`gender: ${metaGender}`));
        optAge.appendChild(document.createTextNode(`age: ${metaAge}`));
        optLocation.appendChild(document.createTextNode(`location: ${metaLocation}`));
        optBbtype.appendChild(document.createTextNode(`bbtype: ${metaBbtype}`));
        optWfreq.appendChild(document.createTextNode(`wfreq: ${metaWfreq}`));
        sel.appendChild(optId);
        sel.appendChild(optEthnicity);
        sel.appendChild(optGender);
        sel.appendChild(optAge);
        sel.appendChild(optLocation);
        sel.appendChild(optBbtype);
        sel.appendChild(optWfreq);

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

