<!DOCTYPE html>
<head>
    <meta charset="UTF-8"/>
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
	<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<meta content="A site for people who like herbs." name="description"/>
	<meta content="Herbally" name="Karen C. Aragon"/>
	<link href="http://fonts.googleapis.com/css?family=Vollkorn" rel="stylesheet" type="text/css">
	<link href="css/reset.css" type="text/css" rel="stylesheet"/>
	<link href="css/normalize.css" type="text/css" rel="stylesheet"/>
    <link href="../css/fonts.css" type="text/css" rel="stylesheet"/>
	<link href="style.css" type="text/css" rel="stylesheet"/>
	<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	<title>Herbally</title>
</head>
<body>
<header>									
	<nav>
		<a href="https://www.github.com/houseofaragon" >inspiration</a>

		<a href="https://www.github.com/houseofaragon" >github</a>
		<a href="mailto:karen.c.aragon@gmail.com?subject=Hi, Karen." >contact</a>
	</nav>
</header>
<div class="container">
	<h1>I need something for my </h1>
	<form action="" method="post" id="form">
		<input type="text" name="ailment" id="user-input"  value="<?php echo htmlspecialchars($_POST['ailment']); ?>">
		<input type="submit" id="submit-button" value="=">
	</form>

<?php
	$ailment = $_POST['ailment'] ;

	$conn = mysql_connect("localhost","root","") or die('Could not connect:'.mysql_error());	
	$db_found = mysql_select_db("herbally");	

	if ($db_found)  {		
		if($ailment){
		$query ="SELECT * FROM ailments where ailment = '". $ailment ."'";
		$result = mysql_query($query) or die('Query failed: '.mysql_error());	
	    if($result == NULL){
	    	print "<p>Sorry no results :[</p>";		
	    }
	    else{
		    print "<table class='table'>\n";
			print "\t<tr><td id='header'>Try something natural:</td></tr>\n";
			while ($db_fields = mysql_fetch_assoc($result))  {
				#print json_encode($db_fields);
				print "\t<tr><td>" . $db_fields['herb'] . 				  
					  "</td></tr> \n";
			}
			print "</table> \n";	
		}
	}}
	else
		print "Database not found";		

	mysql_close($conn);
?>

</div>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script>
  $(function() {
    var data = [
    <?php
		$conn = mysql_connect("localhost","root","") or die('Could not connect:'.mysql_error());	
		$db_found = mysql_select_db("herbally");	
		$stack = array();
		if ($db_found)  {		
			$query ="SELECT ailment FROM ailments";
			$result = mysql_query($query) or die('Query failed: '.mysql_error());	
			while ($db_fields = mysql_fetch_assoc($result))  {

				if (!in_array($db_fields['ailment'], $stack)) {
					array_push($stack, $db_fields['ailment']);
					print json_encode($db_fields['ailment']);
					print ',';	
				}	
			}
		}
		else{
			print "Database not found";		
		}
		mysql_close($conn);
	?>

    ];
    $("#user-input").autocomplete({
       //source: availableTags,  
        source: function(request, response) {
        var results = $.ui.autocomplete.filter(data, request.term);
        
        response(results.slice(0, 10));
    },

       focus: function(event, ui) {
    		$(this).val(ui.item.label);
    		return false;
  		},
       select: function (event, ui) {
       		if(ui.item){
       			$("#user-input").val(ui.item.value); // display the selected text
       		}
       		$('#form').submit();
       		return false;
    	}
    });
  });
	$('#user-input').on('click',function(){
		this.value = '';
	});

  </script>
  
</body>
</html>


