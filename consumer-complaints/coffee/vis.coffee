
class BubbleChart
  constructor: (data) ->
    @data = data
    @width = 1000
    @height = 600

    @tooltip = CustomTooltip("gates_tooltip", 240)

    # locations the nodes will move towards
    # depending on which view is currently being
    # used
    @center = {x: @width / 2, y: @height / 2}

    @year_centers = {
      "2008": {x: @width / 3, y: @height / 2},
      "2009": {x: @width / 2, y: @height / 2},
      "2010": {x: 2 * @width / 3, y: @height / 2}
    }

    @bank_centers = {
      "boc": {x: @width / 2 - 230, y: @height/2},
      "citi": {x: @width / 2 - 80, y: @height / 2},
      "wells": {x: @width / 2 + 80, y: @height / 2},
      "chase": {x: @width/2 + 230, y: @height / 2}
    }

    @complaint_centers = {
      "billing":{x: @width/2 - 250, y: @height/5+100},
      "apr": {x: @width / 2 - 80, y: @height/5+100 },
      "closing": {x: @width / 2 + 80, y: @height/5+100 },
      "reporting": {x: @width/2 + 280, y: @height/5+100},

      "fraud": {x: @width / 2 - 270, y: @height/3+120},
      "protection": {x: @width / 2 - 80, y: @height/3+120},
      "customer": {x: @width/2 + 80, y: @height/3+120},
      "other":  {x: @width/2 + 280, y: @height / 3+120},

      "collection": {x: @width / 2 - 280, y: @height/3+220},
      "latefee": {x: @width / 2 - 80, y: @height / 3+220},
      "forbearance": {x: @width / 2 + 100, y: @height / 3+220},
      "unsolicited": {x: @width / 2 + 280, y: @height / 3+250},

    }

  
    
    # used when setting up force and
    # moving around nodes
    @layout_gravity = -0.01
    @damper = 0.1

    # these will be set in create_nodes and create_vis
    @vis = null
    @nodes = []
    @force = null
    @circles = null

    # nice looking colors - no reason to buck the trend
    @fill_color = d3.scale.ordinal()
      .domain(["Citi", "Bank of America", "Chase", "Wells Fargo"])
      .range(["#1C9099", "#016C59", "#67A9CF", "#A6BDDB"])

    # use the max total_amount in the data as the max in the scale's domain
    max_amount = d3.max(@data, (d) -> parseInt(d.total_amount))
    @radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0.5, 75])
    
    this.create_nodes()
    this.create_vis()

  # create node objects from original data
  # that will serve as the data behind each
  # bubble in the vis, then add each node
  # to @nodes to be used later
  create_nodes: () =>
    @data.forEach (d) =>
      node = {
        id: d.id
        radius: @radius_scale(parseInt(d.total_amount))
        value: d.total_amount
        name: d.grant_title
        org: d.organization
        group: d.group
        complaint: d.complaint
        year: d.start_year
        x: Math.random() * 900
        y: Math.random() * 800
      }
      @nodes.push node

    @nodes.sort (a,b) -> b.value - a.value


  # create svg at #vis and then 
  # create circle representation for each node
  create_vis: () =>
    @vis = d3.select("#vis").append("svg")
      .attr("width", @width)
      .attr("height", @height)
      .attr("id", "svg_vis")

    @circles = @vis.selectAll("circle")
      .data(@nodes, (d) -> d.id)

    # used because we need 'this' in the 
    # mouse callbacks
    that = this

    # radius will be set to 0 initially.
    # see transition below
    @circles.enter().append("circle")
      .attr("r", 0)
      .attr("fill", (d) => @fill_color(d.group))
      .attr("stroke-width", 1)
      .attr("stroke", (d) => d3.rgb(@fill_color(d.group)).darker())
      .attr("id", (d) -> "bubble_#{d.id}")
      .attr('opacity','0.85')
      .on("mouseover", (d,i) -> that.show_details(d,i,this))
      .on("mouseout", (d,i) -> that.hide_details(d,i,this))

    # Fancy transition to make bubbles appear, ending with the
    # correct radius
    @circles.transition().duration(2000).attr("r", (d) -> d.radius)


  # Charge function that is called for each node.
  # Charge is proportional to the diameter of the
  # circle (which is stored in the radius attribute
  # of the circle's associated data.
  # This is done to allow for accurate collision 
  # detection with nodes of different sizes.
  # Charge is negative because we want nodes to 
  # repel.
  # Dividing by 8 scales down the charge to be
  # appropriate for the visualization dimensions.
  charge: (d) ->
    -Math.pow(d.radius, 2.0) / 8

  # Starts up the force layout with
  # the default values
  start: () =>
    @force = d3.layout.force()
      .nodes(@nodes)
      .size([@width, @height])

  # Sets up force layout to display
  # all nodes in one circle.
  display_group_all: () =>
    @force.gravity(@layout_gravity)
      .charge(this.charge)
      .friction(0.9)
      .on "tick", (e) =>
        @circles.each(this.move_towards_center(e.alpha))
          .attr("cx", (d) -> d.x)
          .attr("cy", (d) -> d.y)
    @force.start()

    this.hide_banks()
    this.hide_complaints()
    this.hide_years()


  # Moves all circles towards the @center
  # of the visualization
  move_towards_center: (alpha) =>
    (d) =>
      d.x = d.x + (@center.x - d.x) * (@damper + 0.02) * alpha
      d.y = d.y + (@center.y - d.y) * (@damper + 0.02) * alpha

  # sets the display of bubbles to be separated
  # into each year. Does this by calling move_towards_year
  display_by_bank: () =>
    @force.gravity(@layout_gravity)
      .charge(this.charge)
      .friction(0.9)
      .on "tick", (e) =>
        @circles.each(this.move_towards_bank(e.alpha))
          .attr("cx", (d) -> d.x)
          .attr("cy", (d) -> d.y)
    @force.start()

    this.hide_years()
    this.hide_complaints()
    this.display_banks()

  # move all circles to their associated @year_centers 
  move_towards_bank: (alpha) =>
    (d) =>
      target = @bank_centers[d.group]
      d.x = d.x + (target.x - d.x) * (@damper + 0.02) * alpha * 1.1
      d.y = d.y + (target.y - d.y) * (@damper + 0.02) * alpha * 1.1

  # Method to display year titles
  display_banks: () =>
    banks_x = {"boc":  @width/2 - 350 ,"citi": @width/2 - 100,"wells": @width/2 + 125, "chase": @width/2 + 325}

    banks_data = d3.keys(banks_x)
    banks = @vis.selectAll(".banks")
      .data(banks_data)

    banks.enter().append("text")
      .attr("class", "banks")
      .attr("x", (d) => banks_x[d] )
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text((d) -> d)

  # Method to hide year titiles
  hide_banks: () =>
    banks = @vis.selectAll(".banks").remove()

  # sets the display of bubbles to be separated
  # into each year. Does this by calling move_towards_complaint
  display_by_complaint: () =>
    @force.start()
    @force.gravity(@layout_gravity)
      .charge(this.charge)
      .friction(0.9)
      .on "tick", (e) =>
        @circles.each(this.move_towards_complaint(e.alpha))
          .attr("cx", (d) -> d.x)
          .attr("cy", (d) -> d.y)
    this.hide_years()
    this.hide_banks()
    this.display_complaints()


  # move all circles to their associated @year_centers 
  move_towards_complaint: (alpha) =>
    (d) =>
      target = @complaint_centers[d.complaint]
      d.x = d.x + (target.x - d.x) * (@damper + 0.02) * alpha * 1.1
      d.y = d.y + (target.y - d.y) * (@damper + 0.02) * alpha * 1.1


  # Method to display complaint titles
  display_complaints: () =>

    complaints_x = {
    "Billing Disputes":  @width / 2 - 350,
    "APR or interest rate": @width / 2 - 80,
    "Closing account": @width / 2 + 160,
    "Credit reporting": @width/2 + 380,

    "Fraud": @width / 2 - 380,
    "Credit / Debit protection": @width / 2 - 80,
    "Customer service": @width / 2 + 160,
    "Other": @width/2 + 380,

    "Collection Practices": @width / 2 - 380,
    "Late fee": @width / 2 - 80,
    "Forbearance": @width / 2 + 160,
    "Unsolicited issuance": @width/2 + 380
    }

    complaints_y = { 
    "Billing Disputes":  40,
    "APR or interest rate": 40, 
    "Closing account": 40,
    "Credit reporting": 40,

    "Fraud": @height/2 + 40,
    "Credit / Debit protection": @height/2 + 40,
    "Customer service": @height/2 + 40,
    "Other": @height/2 + 40,

    "Collection Practices": @height-100,
    "Late fee": @height-100,
    "Forbearance": @height-100,
    "Unsolicited issuance": @height-100
    }
    complaints_data = d3.keys(complaints_x)
    complaints = @vis.selectAll(".complaints")
      .data(complaints_data)

    complaints.enter().append("text")
      .attr("class", "complaints")
      .attr("x", (d) => complaints_x[d] )
      .attr("y", (d) => complaints_y[d])
      .attr("text-anchor", "middle")
      .text((d) -> d)

  # Method to hide year titiles
  hide_complaints: () =>
    complaints = @vis.selectAll(".complaints").remove()

  # sets the display of bubbles to be separated
  # into each year. Does this by calling move_towards_year
  display_by_year: () =>
    @force.gravity(@layout_gravity)
      .charge(this.charge)
      .friction(0.9)
      .on "tick", (e) =>
        @circles.each(this.move_towards_year(e.alpha))
          .attr("cx", (d) -> d.x)
          .attr("cy", (d) -> d.y)
    @force.start()
    this.hide_banks()
    this.hide_complaints()
    this.display_years()

  # move all circles to their associated @year_centers 
  move_towards_year: (alpha) =>
    (d) =>
      target = @year_centers[d.year]
      d.x = d.x + (target.x - d.x) * (@damper + 0.02) * alpha * 1.1
      d.y = d.y + (target.y - d.y) * (@damper + 0.02) * alpha * 1.1

  # Method to display year titles
  display_years: () =>
    years_x = {"2008": 160, "2009": @width / 2, "2010": @width - 200}
    years_data = d3.keys(years_x)
    years = @vis.selectAll(".years")
      .data(years_data)

    years.enter().append("text")
      .attr("class", "years")
      .attr("x", (d) => years_x[d] )
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text((d) -> d)

  # Method to hide year titiles
  hide_years: () =>
    years = @vis.selectAll(".years").remove()


  show_details: (data, i, element) =>
    d3.select(element).attr("stroke", "black")
    content = "<span class=\"name\">Title:</span><span class=\"value\"> #{data.name}</span><br/>"
    content +="<span class=\"name\">Complaint:</span><span class=\"value\"> #{data.org}</span><br/>"
    content +="<span class=\"name\">Total no. </span><span class=\"value\"> #{data.value}</span>"
    @tooltip.showTooltip(content,d3.event)


  hide_details: (data, i, element) =>
    d3.select(element).attr("stroke", (d) => d3.rgb(@fill_color(d.group)).darker())
    @tooltip.hideTooltip()


root = exports ? this

$ ->
  chart = null

  render_vis = (csv) ->
    chart = new BubbleChart csv
    chart.start()
    root.display_all()

  root.display_all = () =>
    chart.display_group_all()

  root.display_bank= () =>
    chart.display_by_bank()

  root.display_complaint = () =>
    chart.display_by_complaint()

  root.display_year = () =>
    chart.display_by_year()


  root.toggle_view = (view_type) =>
    if view_type == 'year'
      root.display_year()

    else if view_type == 'bank'
      root.display_bank()

    else if view_type == 'complaint'
      root.display_complaint()

    else if view_type == 'all'
      root.display_all()

  d3.csv "data/complaint_new.csv", render_vis
