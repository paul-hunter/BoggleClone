//==============================
// TODO
// -implement dictionary checking and point scoring
// -add graphic for button press
// -add a 'clear' button
// -allow typing with smart letter recognition
//==============================

const size = 4;

let words = document.getElementById('words');
let wordLabel = document.getElementById('wordLabel');
let submit = document.getElementById('submit');
let reset = document.getElementById('reset');
submit.addEventListener('click', submitClick);
reset.addEventListener('click', resetBoard);
//resetClock from countdown.js
reset.addEventListener('click', resetClock);


let word = '';
// List of words found
let wordList = new Array();
// Location of last clicked letters
let priorCoord = new Array();

// Board creation
let board = new Array(size);
let tile = new Array(size);

//creation of 2d array
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(size);
}

//16 dice
let dice = [
    ['r', 'i', 'f', 'o', 'b', 'x'],
    ['i', 'f', 'e', 'h', 'e', 'y'],
    ['d', 'e', 'n', 'o', 'w', 's'],
    ['u', 't', 'o', 'k', 'n', 'd'],
    ['h', 'm', 's', 'r', 'a', 'o'],
    ['l', 'u', 'p', 'e', 't', 's'],
    ['a', 'c', 'i', 't', 'o', 'a'],
    ['y', 'l', 'g', 'k', 'u', 'e'],
    ['qu', 'b', 'm', 'j', 'o', 'a'],
    ['e', 'h', 'i', 's', 'p', 'n'],
    ['v', 'e', 't', 'i', 'g', 'n'],
    ['b', 'a', 'l', 'i', 'y', 't'],
    ['e', 'z', 'a', 'v', 'n', 'd'],
    ['r', 'a', 'l', 'e', 's', 'c'],
    ['u', 'w', 'i', 'l', 'r', 'g'],
    ['p', 'a', 'c', 'e', 'm', 'd']
];

init();

function init() {
    //essentially rolls each die and puts results in array
    let letters = dice.map(a => a[Math.floor(Math.random() * a.length)]);

    //shuffles letters array
    letters = shuffle(letters);

    //creates 4x4 grid
    for (let i = 0; i < size; i++) {
	for (let j = 0; j < size; j++) {
	    //let index = i * size + j;//using xy instead
	    let letter = letters.pop();
	    board[i][j] = document.createElement('img');
	    board[i][j].src = 'images/letter-' + letter + '.svg';
	    board[i][j].style = 'position:absolute; height:75px; width:75px';
	    board[i][j].style.top = 150 + i * 80;
	    board[i][j].style.left = 50 + j * 80;
	    board[i][j].rowcol = [i, j]; //row, col representation
	    board[i][j].letter = letter;
	    board[i][j].addEventListener('mousedown', click);
	    document.body.appendChild(board[i][j]);
	}
    }
}

function resetBoard() {
    for (let i = 0; i < size; i++) {
	for (let j = 0; j < size; j++) {
	    document.body.removeChild(board[i][j]);
	}
    }
    word = ''              // Resets current word
    wordList.length = 0;   // Clears current found words
    priorCoord.length = 0; // Resets prior letters clicked
    wordLabel.innerHTML = wordList.toString(); // Resets displayed words
    init();
}

//click on 4x4 grid of letters
function click(event) {
    let source = event.target;
    let rowcol = source.rowcol;
    let letter = source.letter;
    if (legal(source)) {
	word += letter;
	words.innerHTML = word;
	priorCoord.push(source);
    }
}

//click on submission button
function submitClick(event) {
    if (word.length >= 3) {
	wordList.push(word);
	word = '';
	words.innerHTML = '';
	priorCoord.length = 0; //clears char array
    }
    //temporary, find prettier way to display probably want in a different place in code too
    wordLabel.innerHTML = wordList.toString(); 
}

//determines if letter clicked a legal click or not
//checks if letter adjacent to (including diag)
//and that letter has not been clicked previously
function legal(clicked) {
    if (priorCoord.length === 0) { //first letter of word
	return true;
    }
    else {
	let prior = priorCoord[priorCoord.length-1].rowcol; //letter clicked immediately prior coord
	let cur = clicked.rowcol; //current letter coord
	let row = Math.abs(cur[0]-prior[0]) <= 1; //checks adjacency
	let col = Math.abs(cur[1]-prior[1]) <= 1; 
	let prevLetter = !priorCoord.includes(clicked); //checks if letter previously clicked
	return row && col && prevLetter;
    }
}

//shuffles an array randomly
function shuffle(arr) {
    let current = arr.length;
    let temp = arr[0]; //temporary initialization
    let rand = 0; //random index

    while (current > 0) {
	rand = Math.floor(Math.random() * current);
	current -= 1;
	//swaps randomly selected value into right most index
	//and goes from right to left repeating this
	temp = arr[current];
	arr[current] = arr[rand];
	arr[rand] = temp;
    }
    return arr;
}
