var units = "Billion";

var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 19.5},
    width = 900,
    height = 500;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20c();

// append the svg canvas to the page
var svgMerger = d3.select("#mergerChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(15)
    .size([width, height]);

var path = sankey.link();

// load the data (using the timelyportfolio csv method)
d3.csv("data/sankey.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source });
      graph.nodes.push({ "name": d.target });
      graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value });
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

// add in the links
  var link = svgMerger.append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      //.sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svgMerger.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		      return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
          var returnColor;
          if(d.name === 'Merrill Lynch' ||
             d.name === 'U.S. Trust Corp' ||
             d.name === 'LaSalle' ||
             d.name === 'FleetBoston F.C.' ||
             d.name === 'MBNA Corporation' ||
             d.name === 'BOA 2004'||
             d.name === 'BOA 2005'||
             d.name === 'BOA 2007'||
             d.name === 'BOA 2008'){ returnColor ="#016C59"}

          if(d.name === 'Bank One' ||
             d.name === 'Washington Mutual' ||
             d.name === 'Bear Sterns'||
             d.name === 'JPM 2004'||
             d.name === 'JPM 2008'){ returnColor ="#67A9CF"}

          if(d.name === 'Golden West Financial' ||
             d.name === 'World Savings Bank' ||
             d.name === 'SouthTrust' ||
             d.name === 'Westcorp Inc.' ||
             d.name === 'Wachovia 2004' ||
             d.name === 'Wachovia 2006' ||
             d.name === 'Wells Fargo 2008' ){ returnColor ="#A6BDDB"}

          if(d.name === 'Citicorp' ||
             d.name === 'European American Bank' ||
             d.name === 'Banamex' ||
             d.name === 'Citi 2001'||
             d.name === 'Citi 2008'){ returnColor ="#1C9099"}

		      return returnColor; })
      
      .append("title")
      .text(function(d) { 
		    return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});

