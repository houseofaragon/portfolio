<?php
		// Capture any variables that were sent in...
		$full_name = $_POST['full_name'] ;
		$email = $_POST['email'] ;
		$answer = $_POST['answer'] ;
		$message = $_POST['message'] ;

		echo $full_name;
		echo $email;
		echo $message;
		echo $answer;

		// We can't add anything if we don't have at least the primary key!!!
		if ( !empty($_POST['full_name']) ) {
			
			$conn = mysql_connect("karemyrsvplist.db.11002007.hostedresource.com","karemyrsvplist","Rachoes123!") or die('Could not connect:'.mysql_error());	
			$db_found = mysql_select_db("karemyrsvplist");	

			if ($db_found)  {		
				$query = "INSERT INTO rsvp_list(full_name, email, answer, message) VALUES (' "
						. $full_name .
						"','"
						. $email .
						"','"
						. $answer .
						"','"
						. $message .
						"')";
				$result = mysql_query($query) or die('Query failed: '.mysql_error());	
			} else {
				print "Database not found";	
			}

			mysql_close($conn);
		}
?>

