// basic settings
var h = 600;
var w = 1000;
var dataset;
var padding = 50;

// import csv data
d3.csv("./data/exoplanet.eu_catalog.csv",
  // select and rename the fields
  function(d){
    return {
      name: d.name,
      star_distance: d.star_distance,
      radius: d.radius,
      mass: d.mass,
      discovered: d.discovered
    };
  },

  // process the data
  function(error, data) {
  
    if(error){
      console.log(error);
    } else {
      dataset = data;
    }
    
    // create base svg element
    var svg = d3.select('#dataArea')
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .style("background-color", "black");
    
    // create xScale based on distance between here and planet
    var xScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d){
                      return Number(d.star_distance);
                    })])
                    .range([padding, w-padding ]);
  
    // create yScale based on planet radius
    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d){
                      return Number(d.radius);
                    })])
                    .range([padding, h-padding]);

    // create radius scale based on planet radius
    var rScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d){
                      return Number(d.radius);
                    })])
                    .range([2, 30]);
  
    // create x Axis
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('top')
                      .ticks(20);
    
    // create y Axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient('left')
                      .ticks(10);
    
    // create cicular planets for the data
    var planets = svg.selectAll("circle")
      .data(dataset);
  
    // add planets to the page. 
    // The planets all start at upper left corner
    planets
      .enter()
      .append("circle")
      .attr({
        cx: padding,
        cy: padding,
        r: function(d) {return rScale(d.radius); },
        fill: "white",
        stroke : "black"
      });

    // planets move to correct position on the graph
    planets
      .transition()
      .delay(45)
      .duration(800)
      .attr({
        cx:function(d, i) { return xScale(d.star_distance); },
        cy:function(d, i) { return yScale(d.radius); },
        r: function(d) {return rScale(d.radius); },
        fill: "white",
        stroke : "black"
      });

    // add x axis to page
    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', "translate(0, " + (0+ padding/2) +")")
      .call(xAxis);
  
    // add y axis to page
    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', "translate(" + padding/2 + ", 0)")
      .call(yAxis);

      
  }
);

