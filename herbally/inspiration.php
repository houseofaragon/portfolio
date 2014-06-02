<!DOCTYPE html>
<head>
    <meta charset="UTF-8"/>
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
	<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<meta content="A site for people who like herbs." name="description"/>
	<meta content="Herbally" name="Karen C. Aragon"/>
	<link href="css/reset.css" type="text/css" rel="stylesheet"/>
	<link href="css/normalize.css" type="text/css" rel="stylesheet"/>
    <link href="../css/fonts.css" type="text/css" rel="stylesheet"/>
	<link href="css/style.css" type="text/css" rel="stylesheet"/>
    <link href="../css/global.css" type="text/css" rel="stylesheet"/>

	<title>Herbally</title>
</head>
<body>
 <header id="header" class="inactive"> 
      <section id="menu" class="row clearfix inactive">
        <ul class="span_1 column">
          <li><a href="../space/index.html">Space is Noisy</a></li>
          <li><a href="../herbally/index.php">Herbally</a></li>
          <li><a href="../packs/index.html">Travel in packs</a></li>
          <li><a href="../tastefully/index.html">Tastefully</a></li>

        </ul>
        <ul class="span_1 column">
          <li><a href="../jazz/index.html">Jazz Drum Machine</a></li>
          <li><a href="../dengine/index.html">dEngine</a></li>
          <li><a href="../weding/index.html">Wedding</a></li>
          <li><a href="../gem/index.html">Record Management</a></li>
        </ul>
        <ul class="span_1 column">
          <li><a href="../consumer-complaints/index.html">Credit Card Consumer Complaints</a></li>
          <li><a href="../stop-and-frisk/index.html">NYPD Stop & Frisk</a></li>
          <li><a href="../fdic/index.html">FDIC History</a></li>
        </ul>
        <ul class="span_1 column">
          <li><a href="http://www.github.com/houseofaragon">Github</a></li>
          <li><a target="_blank" href="">Contact</a></li>
        </ul> 
      </section>
      <section id="menu-button" class="row clearfix">MENU   </section>
    </header>
<div id="navigation">									
	<nav>
		<a href="index.php" id="home">Herbally</a>
		<a id="beta"> Beta v0.1 </a>
		<a href="inspiration.php">source</a>
		<!--<a href="https://www.github.com/houseofaragon" >github</a>-->
		<a href="mailto:karen.c.aragon@gmail.com?subject=Hi, Karen." >contact</a>
	</nav>
</div>
<div class="container">
	<div id="video">
	<h1>Source:</h1>
		<a href="http://www.herbreference.com">All data has been provided by <span>the Health Ranger</span></a>
	<h1>Inspired by:</h1>
		<iframe src="//player.vimeo.com/video/18952969" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><p><a href="http://vimeo.com/18952969">Juliette of the Herbs</a> from<a href="http://vimeo.com/user5039830"> DeepGreenGreenie</a> on<a href="https://vimeo.com"> Vimeo</a>.</p>
	</div>

<footer>
</footer>
</div>
  	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  	<script>
  		$('#menu-button').click(function (e) {
          e.preventDefault();
          $('#menu').slideToggle('slow', function () {
              if ($(this).is(':visible')) {
                  $('header').addClass('active');
                  $('header').removeClass('inactive');
                  
              } else {
                  $('header').addClass('inactive');
                  $('header').removeClass('active');
                  
              }
          });
      });
  	</script>
</body>
</html>


