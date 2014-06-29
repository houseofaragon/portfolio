  	var local = $('#user-input').val();
    if(!local) local = "brooklyn";
	var jsonurl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ local+"&cnt=17&mode=json&units=imperial";
	// Using YQL and JSONP
	function getData(jsonurl){
		$.ajax({
		    url: jsonurl,
		    // the name of the callback parameter, as specified by the YQL service
		    jsonp: "callback",
		    // tell jQuery we're expecting JSONP
		    dataType: "jsonp",
		    // tell YQL what we want and that we want JSON
		    data: { format: "json" },
		    // work with the response
		    success: function( response ) {
		    	$('#error').text('');

		    	if(response["list"] !== ''){
			    	$('#result').html('');
			    	console.log(response);
			    	var dayNames = [ "Sun","Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
			    	var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
		    		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			    	$('h1 span#city').text(response['city'].name);
			    	$('h1 span#country').text(response['city'].country);

			    	for (day in response["list"]){
			    		var date = new Date(response["list"][day].dt * 1000);
			    		var temp = response["list"][day].temp.day;

			    		var condition = response["list"][day].weather[0].main;
			    		console.log(condition);
			    		var dress;
			    		if (temp >= 100) dress = 'css/images/summer.png';
			    		else if (temp <= 99 && temp >= 89 && condition === 'Rain') dress = 'css/images/summer-rain.png';
			    		else if (temp <= 99 && temp >= 89 && condition !== 'Rain') dress = 'css/images/summer.png';

			    		else if (temp <= 88 && temp >= 78 && condition === 'Rain') dress = 'css/images/summer-rain.png';
			    		else if (temp <= 88 && temp >= 78 && condition !== 'Rain') dress = 'css/images/summer.png';

			    		else if(temp <= 78 && temp >= 67 && condition === 'Rain') dress = 'css/images/summer-rain.png';
			    		else if(temp <= 78 && temp >= 67 && condition !== 'Rain') dress = 'css/images/summer.png';

			    		else if(temp <= 67 && temp >= 56 && condition === 'Rain') dress = 'css/images/sweater-rain.png';
			    		else if(temp <= 66 && temp >= 56 && condition !== 'Rain') dress = 'css/images/sweater.png';

			    		else if(temp <= 56 && temp >= 45 && condition === 'Rain') dress = 'css/images/cold-rain.png';
			    		else if(temp <= 56 && temp >= 45 && condition !== 'Rain') dress = 'css/images/cold.png';


			    		else if(temp <= 45 && temp >= 34 && condition === 'Snow') dress = 'css/images/fall-snow.png';
			    		else if(temp <= 45 && temp >= 34 && condition === 'Rain') dress = 'css/images/fall-rain.png';
			    		else if(temp <= 45 && temp >= 34 && condition !== 'Snow' && condition !== 'Rain') dress = 'css/images/fall.png';



			    		else if(temp <= 34 && condition === 'Snow') dress = 'css/images/snow.png';
			    		else if(temp <= 33 && condition === 'Rain') dress = 'css/images/freezing-rain.png';
			    		else dress = 'css/images/freezing.png';

			    		
			        	$('#result').append('<div class="span3"><div id="day">'+ dayNames[date.getDay()] + 
			        						'</div><div class="info" id="date">' + monthNames[date.getMonth()] + '<br/><span> '+ date.getDate() +
			        						'</span></div><div class="info" id="temp">'+parseInt(response["list"][day].temp.day) + 
			        						'</div><div class="info" id="icon"><span> '+ response["list"][day].weather[0].main +

			        						'</span><br/><img src="http://openweathermap.org/img/w/' + response["list"][day].weather[0].icon +'.png">'+
			        						'</div><br/><div id="image"><img src="' + dress +
			        						'"></div></div>').show('slow'); // server response
		        	}
		        }
	        	else{
	        		$('#error').text('Sorry that location is not valid');
	        	}
		    	
		    },
		    error:  function( response ) {
	        		$('#error').text('Sorry that location is not valid');
		    }
		});
	}

  $('form').submit(function(e) {
    e.preventDefault();
    var local = $('#user-input').val();
    if(!local) local = "brooklyn";
	var jsonurl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ local+"&cnt=17&mode=json&units=imperial";
	// Using YQL and JSONP
  	getData(jsonurl);  
  });
  getData(jsonurl);
