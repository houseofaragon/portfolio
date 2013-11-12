



$(window).load(function() { // makes sure the whole site is loaded
	
$("#status").fadeOut(); // will first fade out the loading animation
$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

$('#name').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });
    
$('#go').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });
    
$('#subline p').delay(300).animate({
         'opacity' : '1',
         'top' : '+=20px',         
    }, { duration: 700, easing: 'swing' });      
    
$('#name_about').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });    
    

$('#name_imprint').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });
    

$('.wrapper').delay(300).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    

$('#logo_map').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });
    
    
$('#foot_iphone').delay(300).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.contact').delay(200).animate({
         'opacity' : '1',
         'top' : '+=20px'
    }, { duration: 700, easing: 'swing' });
    

$('#copyright_wrapper').delay(1000).animate({
         'opacity' : '1',        
         'top' : '+=0px'
    }, { duration: 700, easing: 'swing' });


$('.marker1').delay(300).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker-label').delay(300).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker2').delay(500).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker-label2').delay(500).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker3').delay(700).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker-label3').delay(700).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
    
$('.marker').delay(400).animate({
         'opacity' : '1',        
         'top' : '+=30px'
    }, { duration: 700, easing: 'swing' });
    
});




/**** NAVSCROLL****/

$('.target-link').on('click',function(){
    event.preventDefault();
    var target = "#" + $(this).data('target');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 2000);
});


$(window).scroll(function(){
    if ($(this).scrollTop() > 65) {
    $('#fademenu').fadeIn();
    }
    else {
    $('#fademenu').fadeOut();
    }
});

/* d3.js */

var w = 960,
    h = 500,
    nodes = [];

var svg = d3.select("#dots").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var force = d3.layout.force()
    .charge(-20)
    .size([w, h])
    .nodes(nodes)
    .on("tick", tick)
    .start();

function tick() {
  svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

var interval = setInterval(function() {
  var d = {
    x: w / 2 + 2 * Math.random() - 1,
    y: h / 2 + 2 * Math.random() - 1
  };

  svg.append("svg:circle")
      .data([d])
      .attr("r", 1e-6)
      .transition()
      .ease(Math.sqrt)
      .attr("r", 3.5)
      .style('fill', '#FFFFFF');


  if (nodes.push(d) > 200) clearInterval(interval);
  force.start();}, 50);




