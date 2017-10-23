var lionHasBeenFed = false;
var lionHasBeenGivenAttention = false;
var hungerWatchTimer;
var increaseHungerMeterTimer;
var happinessWatchTimer;
var decreaseHappinessMeterTimer;
var hungerMeter = $('#hungerMeter');
var happinessMeter = $('#happinessMeter');
var feedBtn = $('#feedBtn');
var petBtn = $('#petBtn');
var combBtn = $('#combBtn');
var playBtn = $('#playBtn');
var lionImg = $('#lionImg');
var lionIsDead = false;

function begin() {
		hungerWatch();
		happinessWatch();
}

function hungerWatch() {
	console.log('starting the hunger watch');
	hungerWatchTimer = setTimeout(
		function() {
			increaseHungerMeter();
		},
	60000);
}

function happinessWatch() {
	console.log('starting the happiness watch');
	happinessWatchTimer = setTimeout(
		function() {
			decreaseHappinessMeter();
		},
	90000);
}

function increaseHungerMeter() {
	if(!lionIsDead) {
		console.log('in increaseHungerMeter()');
		increaseHungerMeterTimer = setTimeout(
			function() {
				console.log('in increaseHungerMeter() and its been 15 seconds');
				if(!lionHasBeenFed) {
					updateHungerMeter('increase', 5);
				}
				increaseHungerMeter();
			},
		15000);
	}
}

function decreaseHappinessMeter() {
	if(!lionIsDead) {
		console.log('in decreaseHappinessMeter()');
		decreaseHappinessMeterTimer = setTimeout(
			function() {
				console.log('in decreaseHappinessMeter() and its been 15 seconds');
				if(!lionHasBeenGivenAttention) {
					updateHappinessMeter('decrease', 10);
				}
				increaseHungerMeter();
			},
		15000);
	}
}

//BUTTONS LOGIC
function feedLion() {
		console.log('feed Lion clicked');
		lionHasBeenFed = true;
		clearTimeout(hungerWatchTimer);
		clearTimeout(increaseHungerMeterTimer);
		hungerWatch();
		lionHasBeenFed = false;

		updateHungerMeter('decrease', 10);

		feedBtn.prop('disabled', true);
		feedBtn.addClass('grayscale');

		setTimeout(function() {
			feedBtn.prop('disabled', false);
			feedBtn.removeClass('grayscale');
		}, 10000);
}

function pet() {
	console.log('pet clicked');
	giveAttention();
	updateHappinessMeter('increase', 5);

	petBtn.prop('disabled', true);
	petBtn.addClass('grayscale');

	setTimeout(function() {
		petBtn.prop('disabled', false);
		petBtn.removeClass('grayscale');
	}, 10000);
}

function comb() {
	console.log('comb clicked');
	giveAttention();
	updateHappinessMeter('increase', 10);
	combBtn.prop('disabled', true);
	combBtn.addClass('grayscale');

	setTimeout(function() {
		combBtn.prop('disabled', false);
		combBtn.removeClass('grayscale');
	}, 20000);
}

function play() {
	console.log('play clicked');
	giveAttention();
	updateHappinessMeter('increase', 15);
	playBtn.prop('disabled', true);
	playBtn.addClass('grayscale');

	setTimeout(function() {
		playBtn.prop('disabled', false);
		playBtn.removeClass('grayscale');
	}, 45000);
}

function giveAttention() {
	lionHasBeenGivenAttention = true;
	clearTimeout(happinessWatchTimer);
	clearTimeout(decreaseHappinessMeterTimer);
	happinessWatch();
	lionHasBeenGivenAttention = false;
}

function updateHappinessMeter(increaseOrDecrease, amount) {
	var currentValue = happinessMeter.val();
	if(increaseOrDecrease === 'increase') {
		happinessMeter.val(currentValue + amount);
	} else {
		happinessMeter.val(currentValue - amount);
	}
	console.log('happiness meter is now: ' + happinessMeter.val());

	if(happinessMeter.val() >=80 && hungerMeter.val() <= 20) {
		console.log('time to train!');
		clearAllTimeouts();
		window.open('training.html','_self',false);
	} else {
		//not time to train
		changeLionImage();
	}
}

function updateHungerMeter(increaseOrDecrease, amount) {
	var currentValue = hungerMeter.val();
	if(increaseOrDecrease === 'increase') {
		hungerMeter.val(currentValue + amount);
	} else {
		hungerMeter.val(currentValue - amount);
	}
	console.log('hunger meter is now: ' + hungerMeter.val());
	if(hungerMeter.val() <= 20 && happinessMeter.val() >=80) {
		console.log('time to train!');
		clearAllTimeouts();
		//open training
		window.open('training.html','_self',false);
	} else {
		changeLionImage();
	}
}

function changeLionImage() {
	console.log('changeLionImage()');
	console.log('happiness is: ' + happinessMeter.val());
	console.log('hunger is: ' + hungerMeter.val());

	if(happinessMeter.val() < 30 && hungerMeter.val() > 70) {
		if(happinessMeter.val() > 0 || hungerMeter.val() < 100) {
			lionImg.attr('src', 'img/Lion Sad.png');
		} else if(happinessMeter.val() <= 0 && hungerMeter.val() >= 100) {
			lionIsDead = true;
			disableAllActionButtons();
			clearAllTimeouts();
			lionImg.attr('src', 'img/Lion Dead.png');
			setTimeout(function() {
				lionImg.attr('src', 'img/Lion Dead Sideways.png')
			}, 1000);
		} else {
			lionImg.attr('src', 'img/Lion-Blink2.gif');
	}
}
}

//HELPER FUNCTIONS
function disableAllActionButtons() {
	feedBtn.prop('disabled', true);
	feedBtn.addClass('grayscale');
	combBtn.prop('disabled', true);
	combBtn.addClass('grayscale');
	petBtn.prop('disabled', true);
	petBtn.addClass('grayscale');
	playBtn.prop('disabled', true);
	playBtn.addClass('grayscale');
}

function clearAllTimeouts() {
	clearTimeout(hungerWatchTimer);
	clearTimeout(increaseHungerMeterTimer);
	clearTimeout(happinessWatchTimer);
	clearTimeout(decreaseHappinessMeterTimer);
}
