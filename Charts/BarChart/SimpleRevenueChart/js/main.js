/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

//     1. Load the data into your main.js  file using the d3.csv()  function. Make sure that you format the data, so
//     that you can work with values as integers. Make a console log so that you can see the output of the data in the browser.
//     2. Add an SVG canvas to the #chart-area  div element with a width of 600px and a height of 400px. Add a group
//     for our SVG elements, and define some suitable margins for an x and y axis.
//     3. Create the scales for our visualization. The x-axis should be an band scale, whilst our y-axis will be a
//     linear scale.
//     4. Using D3 selectAll with the data, enter, and append methods, add a rectangle for each month of data that we
//     have.
//     5. Scale the rectangles to have the correct width and height. Choose the right y-values so that they sit at the
//     bottom of the visualization area.
//     6. Add in axes and labels, so that we can tell what the visualization is showing us.
/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

let margin = { left:80, right:20, top:50, bottom:100 };

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(function(data){
    // console.log(data);

    // Clean data
    data.forEach(function(d) {
        d.revenue = +d.revenue;
    });

    // X Scale
    let x = d3.scaleBand()
        .domain(data.map(function(d){ return d.month }))
        .range([0, width])
        .padding(0.2);

    // Y Scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.revenue })])
        .range([height, 0]);

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return "$" + d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    // Bars
    let rects = g.selectAll("rect")
        .data(data)

    rects.enter()
        .append("rect")
        .attr("y", function(d){ return y(d.revenue); })
        .attr("x", function(d){ return x(d.month) })
        .attr("height", function(d){ return height - y(d.revenue); })
        .attr("width", x.bandwidth)
        .attr("fill", "grey");
})
