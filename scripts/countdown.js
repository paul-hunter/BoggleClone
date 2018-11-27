//timer script

let countdownAudio = new Audio('audio/ding.wav');
let timer = document.getElementById('timer');

let start = Date.now();
let x = setInterval(calc, 100); //updates every 1/10 second approximately

function calc() {
    //explicitly uses Date.now() for precision
    let delta = Date.now() - start;
    
    let secondsLeft = 180 - Math.floor(delta / 1000); //seconds until end. 3 minute games
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    timer.innerHTML = minutes + ':' +
	seconds.toLocaleString(undefined,{minimumIntegerDigits:2});
    
    if (secondsLeft < 1) {
	timer.innerHTML = "TIME'S UP!";
    }
    
    if (secondsLeft === 0) {
	countdownAudio.loop = false;
	countdownAudio.play();
    }
}

function resetClock() {
    start = Date.now();
}
