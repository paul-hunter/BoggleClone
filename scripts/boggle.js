//==============================
//TODO
// -finish function legal and associated clicking function
// -Qu instead of Q edit images
// -linkedlist of wordlist
// -some nice functions including a toString? could be nice
// -add logic on which buttons you're allowed to press
//   -adjacent and not previously pressed
// -implement dictionary checking and point scoring
// -add graphic for button press and "
//==============================

const size = 4;
// returns element object representing element whose id prop matches specified string
// Element is general base class that all objects in a Document inherit
let status = document.getElementById('status');
let words = document.getElementById('words');
let wordLabel = document.getElementById('wordLabel');

let word = '';
let wordList = new Array();
let priorCoord = new Array();

//addEventListener, function that will be called when specified event is delivered to target
//status.addEventListener('click', init) //for restart?

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
    ['q', 'b', 'm', 'j', 'o', 'a'],
    ['e', 'h', 'i', 's', 'p', 'n'],
    ['v', 'e', 't', 'i', 'g', 'n'],
    ['b', 'a', 'l', 'i', 'y', 't'],
    ['e', 'z', 'a', 'v', 'n', 'd'],
    ['r', 'a', 'l', 'e', 's', 'c'],
    ['u', 'w', 'i', 'l', 'r', 'g'],
    ['p', 'a', 'c', 'e', 'm', 'd']
];

//array of randomly picked letters from 16 dice specified above
let letters = dice.map(a => a[Math.floor(Math.random() * a.length)]);
//shuffles letters array
letters = shuffle(letters);

init();

function init() {
    status.innerHTML = ('find words');
    let letterIndex = 0;
    for (let i = 0; i < size; i++) {
	for (let j = 0; j < size; j++) {
	    //let index = i * size + j;//using xy instead
	    let letter = letters[letterIndex++];
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
    let submit = document.createElement('img');
    submit.src = 'images/letter-z.svg'; //temporary z
    submit.style = 'position:absolute; height:30px; width:75px';
    submit.style.top = 100;
    submit.style.left = 370;
    submit.addEventListener('mousedown', submitClick);
    document.body.appendChild(submit);
}

function click(event) {
    let source = event.target;
    let rowcol = source.rowcol;
    let letter = source.letter;
    //use function legal. finish this
    //can use A.length = 0 to clear array
    word += letter;
    words.innerHTML = word;
}

function submitClick(event) {
    if (word.length >= 3) {
	wordList.push(word);
	word = '';
	words.innerHTML = '';
    }
    wordLabel.innerHTML = wordList.toString(); //temporary, find prettier way to display
}

function legal(clicked) {
    //priorCoord[arrlength-1] +- clicked.coord <=1
    //clicked not in priorCoord arr
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
