var margin3 = {
    top: 20,
    right: 400,
    bottom: 100,
    left: 70
  },
  width3 = 1200 - margin3.left - margin3.right,
  height = 500 - margin3.top - margin3.bottom


//gender selector
function psuedofunction3(value){
  select_gender = value;
  $("#dropouts").empty();
  plotGraph(select_gender);
}

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip1")
  .style("visibility", "hidden");



function dataFilterplot(typeGender, majorSelected, xScale, yScale, svg, data , select_color) {

  var _data = [];
  var count = 1;

  svg.data(data.filter(function(d) {
    if (d.gender == typeGender && d.major == majorSelected) {

      _data.push({
        x: count,
        y: d.sum
      });
      count = count + 1;
      console.log(_data);
      return d;
    }
  }));


  var line = d3.line()
    .x(function(d) {
      return xScale(d.x);
    })
    .y(function(d) {
      return yScale(d.y);
    });

  svg.append("path")
    .data([_data])
    .attr("class", "line")
    .attr("d", line)
    .attr('fill', 'none')
    .attr('stroke', select_color)
    .attr('stroke-width3', 2)
    .attr("id","path"+majorSelected);

  svg.selectAll(".circle")
    .data(_data)
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("id","path"+majorSelected)
    .style('fill', select_color)
    .attr("cy", function(d) {
      return yScale(d.y);
    })
    .attr("cx", function(d, i) {
      return xScale(d.x);
    })
    .on("mouseover", function(d) {
      return tooltip.html("Count: "+d.y)
        .style("visibility", "visible")
        .style("top", (event.pageY - 17) + "px")
        .style("left", (event.pageX + 25) + "px");
  })
  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  })
    ;




}

function plotGraph(typeGender) {
  console.log(typeGender);

  // var maxY; // Defined later to update yAxis

  var svg = d3.select("#dropouts").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height + margin3.top + margin3.bottom) //height + margin3.top + margin3.bottom
    .append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

  // Create invisible rect for mouse tracking
  svg.append("rect")
    .attr("width", width3)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("id", "mouse-tracker")
    .style("fill", "white");

  //for slider part-----------------------------------------------------------------------------------

  var context = svg.append("g") // Brushing context box container
    .attr("transform", "translate(" + 0 + "," + 410 + ")")
    .attr("class", "context");

  //append clip path for lines plotted, hiding those part out of bounds
  svg.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width3)
    .attr("height", height);

  //end slider part-----------------------------------------------------------------------------------

  d3.json("viz3.json", function(error, data) {

    var yscale_val = [];
    var count = 1;
    var freshman_list = [];

    var tickLabels = ["", "Freshman", "Sophomore", "Junior", "Senior"];


    var xScale = d3.scaleLinear().range([0, width3]).domain([0, 4.5, 8]);

    var yScale = d3.scaleLinear().range([height, 0]);

    var color = d3.scaleOrdinal().range(["#07E71B","#FF5733","#E72E07","#581845","#24EECD","#0FF09A","#F00FF0","#9D919D","#5141F0","#41A0F0", "#13EF10","#EFB210","#EF8A10","#EF10AB","#0C856A","#34660A","#0A4666","#E2ABB5","#E70964","#967FA9","#9BA97F"]);


    var listMajor = [{
       name: "Applied Information Technology",
       visible: false
     },
     {
       name: "Information Technology",
       visible: false
     },
     {
       name: "Computer Science",
       visible: false
       },
     {name: "Computer Information Systems",visible: false},
     {name: "Computer Science BS",visible: false},
     {name: "Computer Science BA",visible: false},
     {name: "CS and or Multiple Engg Majors",visible: false},
     {name: "Computer Software and Media Applications",visible: false},
     {name: "Applied Engineering Sciences",visible: false},
     {name: "Aerospace Engineering",visible: false},
     {name: "Chemical Engineering",visible: false},
     {name: "Civil Engineering",visible: false},
     {name: "Computer Engineering",visible: false},
     {name: "Software Engineering",visible: false},
     {name: "Electrical Engineering",visible: false},
     {name: "Electrical & Computer Engineering",visible: false},
     {name: "Materials Science and Engineering",visible: false},
     {name: "Mechanical Engineering",visible: false},
     {name: "Systems Engineering",visible: false},
     {name: "Biosystems Engineering",visible: false}
   ];
    var xAxis = d3.axisBottom(xScale).tickFormat(function(d, i) {
      return tickLabels[i];
    })

    var yAxis = d3.axisLeft(yScale);
    color.domain(function(d) { // Set the domain of the color ordinal scale to be all the csv headers except "date", matching a color to an issue
      console.log(d.major);
      return d.major;
    });


    var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys
      return {
        name: name, // "name": the csv headers except date
        values: data.map(function(d) { // "values": which has an array of the dates and ratings
          return {
            date: d.date,
            rating: +(d[name]),
          };
        }),
        visible: (name == "Unemployment" ? true : false) // "visible": all false except for economy which is true.
      };
    });

    // xScale.domain(d3.extent(data, function(d) {
    //   return d.date;
    // })); // extent = highest and lowest points, domain is data, range is bouding box

    yScale.domain([0, d3.max(data, function(c) {
        return c.sum;
      })
      // d3.max(categories, function(c) { return d3.max(c.values, function(v) { return v.rating; }); })
    ]);

    // draw line graph
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Issues Rating");

    var issue = svg.selectAll(".issue")
      .data(listMajor) // Select nested data and append to new svg group elements
      .enter().append("g")
      .attr("class", "issue");




    // svg.append("g")
    //   .append("circle")
    //   .data(_data)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-width3", 1.5)
    //   .attr("d", line);

    //      issue.append("path")
    //          .attr("class", "line")
    //          .style("pointer-events", "none") // Stop line interferring with cursor
    //          .attr("id", function(d) {
    //            return "line-" + d.name.replace(" ", "").replace("/", ""); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
    //          })
    //          .attr("d", function(d) {
    //            return d.visible ? line(d.values) : null; // If array key "visible" = true then draw line, if not then don't
    //          })
    //          .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
    //          .style("stroke", function(d) { return color(d.name); });

    // draw legend
    var legendSpace = 450 / 21; // 450/number of majors (ex. 21)

    var select_color;

    issue.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("x", width3 + (margin3.right / 3) - 115)
      .attr("y", function(d, i) {
        return (legendSpace) + i * (legendSpace) - 15;
      }) // spacing
      .attr("fill", function(d) {
        select_color = color(d.name);
        console.log(select_color);
        return d.visible? color(d.name): "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey
      })
      .attr("class", "legend-box")

      .on("click", function(d) { // On click make d.visible

        select_color = color(d.name);
        if(d.visible)
        {
          var _id = "#path"+d.name
          _id = _id.replace(/\ /g,'\\ ');
          svg.selectAll(_id).remove();
        }
        else {
            dataFilterplot(typeGender,d.name, xScale, yScale, svg, data , select_color);
        }


        d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true


        // maxY = findMaxY(data); // Find max Y rating value categories data with "visible"; true
        // yScale.domain([0, maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
        // svg.select(".y.axis")
        //   .transition()
        //   .call(yAxis);



        issue.select("path")
          .transition()
          .attr("d", function(d) {
            return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
          })

        issue.select("rect")
          .transition()
          .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";
          });
      })


    issue.append("text")
      .attr("x", width3 + (margin3.right / 3) - 100)
      .attr("y", function(d, i) {
        return (legendSpace) + i * (legendSpace) - 6;
      }) // (return (11.25/2 =) 5.625) + i * (5.625)
      .text(function(d) {
        return d.name;
      });

    // Hover line
    var hoverLineGroup = svg.append("g")
      .attr("class", "hover-line");

    var hoverLine = hoverLineGroup // Create line with basic attributes
      .append("line")
      .attr("id", "hover-line")
      .attr("x1", 10).attr("x2", 10)
      .attr("y1", 0).attr("y2", height + 10)
      .style("pointer-events", "none") // Stop line interferring with cursor
      .style("opacity", 1e-6); // Set opacity to zero

    var hoverDate = hoverLineGroup
      .append('text')
      .attr("class", "hover-text")
      .attr("y", height - (height - 40)) // hover date text position
      .attr("x", width3 - 150) // hover date text position
      .style("fill", "#E6E7E8");

    var columnNames = d3.keys(data[0]) //grab the key values from your first data row
      //these are the same as your column names
      .slice(1); //remove the first column name (`date`);

    var focus = issue.select("g") // create group elements to house tooltip text
      .data(columnNames) // bind each column name date to each g element
      .enter().append("g") //create one <g> for each columnName
      .attr("class", "focus");

    focus.append("text") // http://stackoverflow.com/questions/22064083/d3-js-multi-series-chart-with-y-value-tracking
      .attr("class", "tooltip")
      .attr("x", width3 + 20) // position tooltips
      .attr("y", function(d, i) {
        return (legendSpace) + i * (legendSpace);
      }); // (return (11.25/2 =) 5.625) + i * (5.625) // position tooltips

    // Add mouseover events for hover line.
    d3.select("#mouse-tracker") // select chart plot background rect #mouse-tracker
      .on("mousemove", mousemove) // on mousemove activate mousemove function defined below
      .on("mouseout", function() {
        hoverDate
          .text(null) // on mouseout remove text for hover date

        d3.select("#hover-line")
          .style("opacity", 1e-6); // On mouse out making line invisible
      });

    function mousemove() {
      var mouse_x = d3.mouse(this)[0]; // Finding mouse x position on rect
      var graph_x = xScale.invert(mouse_x); //

      //var mouse_y = d3.mouse(this)[1]; // Finding mouse y position on rect
      //var graph_y = yScale.invert(mouse_y);
      //console.log(graph_x);

      var format = d3.timeParse("%b %y"); // Format hover date text to show three letter month and full year

      hoverDate.text(format(graph_x)); // scale mouse position to xScale date and format it to show month and year

      d3.select("#hover-line") // select hover-line and changing attributes to mouse position
        .attr("x1", mouse_x)
        .attr("x2", mouse_x)
        .style("opacity", 1); // Making line visible

      // Legend tooltips // http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html

      // var x0 = xScale.invert(d3.mouse(this)[0]), /* d3.mouse(this)[0] returns the x position on the screen of the mouse. xScale.invert function is reversing the process that we use to map the domain (date) to range (position on screen). So it takes the position on the screen and converts it into an equivalent date! */
      // i = bisectDate(data, x0, 1), // use our bisectDate function that we declared earlier to find the index of our data array that is close to the mouse cursor
      // /*It takes our data array and the date corresponding to the position of or mouse cursor and returns the index number of the data array which has a date that is higher than the cursor position.*/
      // d0 = data[i - 1],
      // d1 = data[i],
      // /*d0 is the combination of date and rating that is in the data array at the index to the left of the cursor and d1 is the combination of date and close that is in the data array at the index to the right of the cursor. In other words we now have two variables that know the value and date above and below the date that corresponds to the position of the cursor.*/
      // d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      // /*The final line in this segment declares a new array d that is represents the date and close combination that is closest to the cursor. It is using the magic JavaScript short hand for an if statement that is essentially saying if the distance between the mouse cursor and the date and close combination on the left is greater than the distance between the mouse cursor and the date and close combination on the right then d is an array of the date and close on the right of the cursor (d1). Otherwise d is an array of the date and close on the left of the cursor (d0).*/
      //
      // //d is now the data row for the date closest to the mouse position
      //
      // focus.select("text").text(function(columnName){
      //    //because you didn't explictly set any data on the <text>
      //    //elements, each one inherits the data from the focus <g>
      //
      //    return (d[columnName]);
      // });
    };

    //for brusher of the slider bar at the bottom
    function brushed() {

      xScale.domain(brush.empty() ? xScale2.domain() : brush.extent()); // If brush is empty then reset the Xscale domain to default, if not then make it the brush extent

      svg.select(".x.axis") // replot xAxis with transition when brush used
        .transition()
        .call(xAxis);

      maxY = findMaxY(categories); // Find max Y rating value categories data with "visible"; true
      yScale.domain([0, maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true

      svg.select(".y.axis") // Redraw yAxis
        .transition()
        .call(yAxis);

      issue.select("path") // Redraw lines based on brush xAxis scale and domain
        .transition()
        .attr("d", function(d) {
          return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
        });

    };

  }); // End Data callback function
}

function findMaxY(data) { // Define function "findMaxY"
  var maxYValues = data.map(function(d) {
    if (d.visible) {
      return d3.max(d.values, function(value) { // Return max rating value
        return value.rating;
      })
    }
  });
  return d3.max(maxYValues);
}

plotGraph("all");
