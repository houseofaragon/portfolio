<!DOCTYPE html>
<head>
    <meta charset="UTF-8"/>
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
	<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<meta content="Weather report for the " name="description"/>
	<meta content="Herbally" name="Karen C. Aragon"/>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
	<link href="http://fonts.googleapis.com/css?family=Vollkorn" rel="stylesheet" type="text/css">
	<link href="../css/normalize.css" type="text/css" rel="stylesheet"/>
    <link href="../css/fonts.css" type="text/css" rel="stylesheet"/>
    <link href="css/bootstrap-responsive.css" type="text/css" rel="stylesheet"/>
	<link href="css/style.css" type="text/css" rel="stylesheet"/>
	<link href="../css/global.css" type="text/css" rel="stylesheet"/>
	<title>Do I Need A ___ ?</title>
</head>
<body>
<header id="header" class="inactive"> 
      <section id="menu" class="row clearfix inactive">
        <ul class="span_1 column">
          <li><a href="../packs/">Travel in packs</a></li>
          <li><a href="../space/">Space is Noisy</a></li>
          <li><a href="../herbally/index.php">Herbally</a></li>
          <li><a href="../Tastefully/">Tastefully</a></li>
        </ul>
        <ul class="span_1 column">
          <li><a href="../jazz/">Jazz Drum Machine</a></li>
          <li><a href="../weather/">Do I Need A ____ ?</a></li>
          <li><a href="../wedding/">Wedding</a></li>
          <li><a href="../dengine/">dEngine</a></li>
          <!--<li><a href="../gem/">Global Entertainment MGMT</a></li>-->
        </ul>
        <ul class="span_1 column">
          <li><a href="../consumer-complaints/">Credit Card Consumer Complaints</a></li>
          <li><a href="../stop-and-frisk/">NYPD Stop & Frisk</a></li>
          <li><a href="../fdic/">FDIC History</a></li>
        </ul>
        <ul class="span_1 column">
          <li><a href="../index.html">Home</a></li>
          <li><a href="http://www.github.com/houseofaragon">Github</a></li>
          <li><a target="_blank" href="">Contact</a></li>
        </ul> 
      </section>
      <section id="menu-button" class="row clearfix">MENU</section>
</header>
<div id="navigation" class="clearfix">									
	<h1><a href="index.php" id="home">Do I need a <em>__________</em> in <br/> <span id="city"></span> ( <span id="country"></span>) ?</a></h1>
	<form action="" method="post" id="form"><span>Location:</span>   <input type="text" name="location" id="user-input" placeholder="Brooklyn"  value="">
		<input type="submit" id="submit-button" value="•">
	</form>
	<nav>
		<a href="http://openweathermap.org/">source</a>
		<!--<a href="https://www.github.com/houseofaragon" >github</a>-->
		<a href="mailto:karen.c.aragon@gmail.com?subject=Hi, Karen." >contact</a>
	</nav>
</div>
<div class="container">
	<p id="error"></p>
	<div class="row" id="result"></div>

</div>
<footer>
</footer>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="app.js"></script>
  <script type="text/javascript">
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
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-41015178-3', 'karenaragon.com');
  ga('send', 'pageview');

</script>
</body>
</html>


