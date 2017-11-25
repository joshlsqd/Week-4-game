
var chosenCharacter = undefined;
var fightCharacter = undefined;
var numberOfWins = 0;
var characters = [
	{name: 'Obi Wan',
	id: 0,
	image: './assets/images/obiwan.jpg',
	initialHealthPoints: 120,
	initialAttackPower: 10,
	counterAttackPower: 15,
	currentAttackPower: 0,
	currentHealthPoints: 0,
	beaten: false,
	},
	{name: "Luke Skywalker",
	id: 1,
	image: './assets/images/LukeSkywalker.jpg',
	initialHealthPoints: 100,
	initialAttackPower: 5,
	counterAttackPower: 20,
	currentAttackPower: 0,
	currentHealthPoints: 0,
	beaten: false,
	},
	{name: "Darth Vader",
	id: 2,
	image: './assets/images/DarthVader.jpg',
	initialHealthPoints: 150,
	initialAttackPower: 15,
	counterAttackPower: 10,
	currentAttackPower: 0,
	currentHealthPoints: 0,
	beaten: false,
	},
	{name: "Darth Mual",
	id: 3,
	image: './assets/images/DarthMaul.jpg',
	initialHealthPoints: 180,
	initialAttackPower: 20,
	counterAttackPower: 5,
	currentAttackPower: 0,
	currentHealthPoints: 0,
	beaten: false,
	}];

function startgame() {
	$("#availableCharacters").empty();
	for (var i = 0; i < characters.length; i++) {
		$("#availableCharacters").append(
		"<div class=\"character\" data = "+characters[i].id+"><span class=\"topCaption\" >"+characters[i].name+"</span><img class= \"characterImage\" src = "+characters[i].image+"><span class = \"caption\">"+characters[i].initialHealthPoints+"</span></div>");
		characters[i].currentAttackPower = characters[i].initialAttackPower;
		characters[i].currentHealthPoints = characters[i].initialHealthPoints;
		characters[i].beaten = false;
		console.log(characters[i].currentAttackPower);
	};
	chosenCharacter = undefined;
	fightCharacter = undefined;
	numberOfWins = 0;
	$("#gameCharacter").empty();
	$("#enemiesAvailable").empty();
	$("#defender").empty();
	turnOnClicks();
};

startgame();


function turnOnClicks() {
$('.character').on('click', function() {
	chosenCharacter = $(this).attr('data');
	alert("You have chosen "+characters[chosenCharacter].name+"!");
	for (var i = 0; i < characters.length; i++) {
		if(characters[i].id == chosenCharacter) {
			$("#gameCharacter").append(
		"<div class=\"gameCharacter\" data = "+characters[i].id+"><span class=\"topCaption\" >"+characters[i].name+"</span><img class= \"characterImage\" src = "+characters[i].image+"><span class = \"caption\">"+characters[i].initialHealthPoints+"</span></div>");
		} else if (characters[i].id !== chosenCharacter) {
			$("#enemiesAvailable").append(
		"<div class=\"enemies\" id = "+characters[i].id+" data = "+characters[i].id+"><span class=\"topCaption\" >"+characters[i].name+"</span><img class= \"characterImage\" src = "+characters[i].image+"><span class = \"caption\">"+characters[i].initialHealthPoints+"</span></div>");
		};
	};
	$('#availableCharacters').empty();

	$('.enemies').on('click', function() {
		if (fightCharacter === undefined || characters[fightCharacter].beaten) {	
		fightCharacter = $(this).attr('data');
		alert("You have chosen to attack "+characters[fightCharacter].name+"!");
		$("#defender").append(
		"<div class=\"fight\" id = "+characters[fightCharacter].id+"><span class=\"topCaption\" >"+characters[fightCharacter].name+"</span><img class= \"characterImage\" src = "+characters[fightCharacter].image+"><span class = \"caption\">"+characters[fightCharacter].currentHealthPoints+"</span></div>");
		$(".enemies").remove('#'+fightCharacter);
		$('#fightText').text("Ready to attack!");
		} else if (!characters[fightCharacter].beaten) {
			alert("You are already attacking "+characters[fightCharacter].name+"!")
		}
		
	});
	

});

$('#attack').on('click', function(){
	console.log(fightCharacter);
	if (fightCharacter > -1) {
		characters[fightCharacter].currentHealthPoints = characters[fightCharacter].currentHealthPoints - characters[chosenCharacter].currentAttackPower;
		characters[chosenCharacter].currentAttackPower = characters[chosenCharacter].currentAttackPower + characters[chosenCharacter].initialAttackPower; 
		console.log(characters[chosenCharacter].currentAttackPower);
		console.log(characters[fightCharacter].currentHealthPoints);
		if (characters[fightCharacter].currentHealthPoints > 0) {
			characters[chosenCharacter].currentHealthPoints = characters[chosenCharacter].currentHealthPoints - characters[fightCharacter].counterAttackPower;
			$('.fight .caption').text(characters[fightCharacter].currentHealthPoints);
			$('.gameCharacter .caption').text(characters[chosenCharacter].currentHealthPoints);
			if (characters[chosenCharacter].currentHealthPoints > 0) {
				$('#fightText').text("You attacked "+characters[fightCharacter].name+" for "+ (characters[chosenCharacter].currentAttackPower - characters[chosenCharacter].initialAttackPower) +" damage");
				$('#fightTextLn2').text(characters[fightCharacter].name+" attacked you for "+ characters[fightCharacter].counterAttackPower+" damage");
			} else {
				alert("Sorry you have been defeated");
				startgame();
			};
	} else {
			alert("You have defeated "+characters[fightCharacter].name+"!");
			characters[fightCharacter].beaten = true;
			fightCharacter = undefined;
			numberOfWins= numberOfWins + 1;
			$('#defender').empty();
			if (numberOfWins === 3) {
				$('#fightText').text("You Won!!! Great Job");
				$('#fightTextLn2').empty();
			};
		};
	};
});

$('#restart').on('click', function(){
	startgame();
});
}