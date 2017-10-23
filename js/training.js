var jumps = 0;
var correctJumps = 0;
var levelText = $('#levelText');
var numOfHoopsToGetCorrect = $('#numOfHoopsToGetCorrect');
var level = 0;

$('.closeInstructionsDialogBtn').on('click', function() {
	$("#instructionsDialog" ).dialog("close");
});

$('.closeCorrectDialogBtn').on('click', function() {
	$("#correctDialog" ).dialog("close");
});

$('.closeIncorrectDialogBtn').on('click', function() {
	$("#incorrectDialog" ).dialog("close");
});

function initTrainingScreen() {
	setCurrentLevel();
	openInitialDialog();
}

function setCurrentLevel() {
	var currentLevel;
	if(sessionStorage.getItem("storedLevel") === null) {
		console.log('in if');
		currentLevel = 0;
	} else {
		console.log('in else');
		currentLevel = sessionStorage.getItem("storedLevel");
	}
	console.log('stored leveL: ' + currentLevel);
	if(currentLevel == 0) {
		levelText.text('Rookie');
		numOfHoopsToGetCorrect.text('2');
	} else if(currentLevel == 1) {
		levelText.text('Casual');
		numOfHoopsToGetCorrect.text('3');
	} else {
		levelText.text('Professional');
		numOfHoopsToGetCorrect.text('4');
	}
}

function openInitialDialog() {
	setTimeout(function() {
		$( "#instructionsDialog" ).dialog({
			position: {
				my: "center center",
				at: "center center",
				of: 'body',
				collision: "none"
			}
		});
	}, 1000);
}

function winLevel() {
	$( "#winDialog" ).dialog({
		position: {
			my: "center center",
			at: "center center",
			of: 'body',
			collision: "none"
		}
	});
}

function loseLevel() {
	$( "#loseDialog" ).dialog({
		position: {
			my: "center center",
			at: "center center",
			of: 'body',
			collision: "none"
		}
	});
}

$('.hoop').on('click', function() {
	var isCorrect = evaluateGuess(this.id);
	jumps++;
	if(jumps == 5) {
		if(correctJumps >= Number(numOfHoopsToGetCorrect.text())) {
			winLevel();
			console.log('before the level up it is: ' + level);
			var levelInStorage = sessionStorage.getItem("storedLevel");
			if(sessionStorage.getItem("storedLevel") === null) {
					level = level+1;
			} else {
				level = levelInStorage + 1;
			}
			console.log('leveling up. now it is: ' + level);
			sessionStorage.setItem("storedLevel", parseInt(level));
		} else {
			loseLevel();
		}
	} else {
		if(isCorrect) {
			$( "#correctDialog" ).dialog({
				position: {
					my: "center center",
					at: "center center",
					of: 'body',
					collision: "none"
				}
			});
		} else {
			$( "#incorrectDialog" ).dialog({
				position: {
					my: "center center",
					at: "center center",
					of: 'body',
					collision: "none"
				}
			});
		}
	}
});

function evaluateGuess(hoopGuessed) {
	var randomHoop = getRandomHoop();
	if(hoopGuessed == randomHoop) {
		correctJumps++;
		return true;
	} else {
		return false;
	}
}

function getRandomHoop() {
	var hoops= ['hoop1', 'hoop2', 'hoop3', 'hoop4'];
	// return hoops[2];
	return hoops[Math.floor(Math.random() * hoops.length)];
}

function goBackToHomeScreen() {
	window.open('homeScreen.html','_self',false);
}
