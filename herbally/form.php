
<?php

	header("Location: http://www.yourwebsite.com/user.php"); /* Redirect browser */
	exit();
	// Capture any variables that were sent in...
	$problem = $_POST['problem'] ;

	$conn = mysql_connect("localhost","root","") or die('Could not connect:'.mysql_error());	
	$db_found = mysql_select_db("herbally");	

	if ($db_found)  {		
		$query ="SELECT * FROM herbs where problem = '". $problem ."'";
		$result = mysql_query($query) or die('Query failed: '.mysql_error());	
	    
	    print "<table border=1>\n";
		print "\t<tr><td>Herbs</td></tr>\n";
		while ($db_fields = mysql_fetch_assoc($result))  {
			print "\t<tr><td>" . $db_fields['herb'] . 				  
				  "</td></tr> \n";
		}

		print "</table> \n";	
	}
	else
	print "Database not found";		

	mysql_close($conn);
?>