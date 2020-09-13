// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

d3.json("data/samples.json").then((data) => {
    console.log(data);

    testIds = data.names;
    console.log(testIds);

    for (var i = 0; i < testIds.length; i++) {
        var currID = testIds[i];

        var sel = document.getElementById('selDataset');
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(currID));
        opt.value = currID;
        sel.appendChild(opt);
    }

});
