var sayingsArray = ['Does the zoo know that two pythons escaped and are currently hammering away at your keyboard\? Niceee',
					'Bro, you\'re killing it right now. Keep it up and you\'ll bag that blonde from the gym for sure.',
					'Finish up that feature and grab a protein shake, bro. You\'ve earned it, you monster.',
					'Take a minute and look through the code you just slammed into this world. That\'s all you, baby! Yeahhhhh Jeets.',
					'You\'re like the Paul Bunyan of comp-sci.. if Paul Bunyan could sink an island cup.',
					'Dude. Duuuuudee. You\'re slinging code like a fucking baller right now, bro.',
					'Crack open another bud light, brah. You always code better with a buzz.',
					'Tell that broad you\'ll make it to happy hour after you pound out a few more lines of excellence.',
					'You\'re like the Paul Bunyan of comp-sci.. if Paul Bunyan could sink an island cup.',
					'Does the zoo know that two pythons escaped and are currently hammering away at your keyboard\? Niceee',
					'If I had to choose between you and some other guy, I\'d totally choose you, bro. Boomshakalaka.',
					'Your code is a beauty. Look at that shit. Organized, semantic.. I\'d probably take it to breakfast the next morning.',
					'Looks like you\'re holding the keyboard hostage with those guns of yours. Chyeahh.',
					'Pump out some code, then pump some iron. Rinse and repeat, bro.',
					'Your chill to pull ratio is solid, bro. Plenty of time to crush a few more lines before heading to the bar.',
					'Why don\'t you npm install a beer in your hand, bro.',
					'Once you finish up, let\'s go to the bar and find someone to handle your event. Yeahhhhh.',
					'Make that brewski \'fill: your-stomach;\' and let\'s crush the rest of this feature.',
					'git checkout that-smokeshow-across-the-street | git status: yours, bro. you got this.',
					'git pull mad-chicks | origin/thebar .. hurry up, bro! Those tall Bud Lights are calling your name.',
					'grunt serve yourself another beer \'cause you are destroying it right now. A few more lines, bro.',
					'You\'re like if Gosling and Leo had a love-child that could crush code and slay smokes on the reg.',
					'You can text her back after you finish this function. Pound it out, then go pound it out.',
					'function() { if (she === slammin) { $(\'.her\').buy(drink); } else { return home; } }'];

$('.button').click(function() {

	var saying = sayingsArray[Math.floor(Math.random()*sayingsArray.length)];

	$('.saying-container').empty();
	$('.saying-container').html(saying);

	tweetaLeet = function(){

		var divWrap = document.getElementById('tweetWrap');  // div wrapped around tweet button anchor
		var iframe = document.getElementById('twitter-widget-0'); // iframe generated

		if (iframe && divWrap){
			
			iframe.parentElement.removeChild(iframe); // remove existing iframe
			
			// generate new tweet button
			var anchor = document.createElement('a');

			anchor.setAttribute('href', "https://twitter.com/share" );
			anchor.setAttribute('class', 'twitter-share-button');
			anchor.setAttribute('data-count', 'none');
			anchor.setAttribute('data-text', '\"' + saying + '\" -');
			anchor.setAttribute('data-lang', 'en');
			anchor.setAttribute('data-url', 'http://crushingco.de');
			anchor.setAttribute('data-size', 'large');
			anchor.setAttribute('id', 'twitter-widget-0');
			divWrap.appendChild(anchor);
			
			twttr.widgets.load(); // reload widgets.js in order to properly generate new button
		}
	}

	tweetaLeet();

});


