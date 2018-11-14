const newGameBtn = document.getElementById('new-game')
const colorContainer = document.querySelector('.container')
const box = document.querySelectorAll('.box')
let lastBox;
let welcomePage = document.querySelector('.welcome-page')
let gameSpace = document.querySelector('.game-space')
let gameOverPage = document.querySelector('.game-over-page')
let highScorePage = document.querySelector('.highscore-page')
const counterElem = document.querySelector('#counter')
const buttonCont = document.querySelector('.button-container')
const scoreBoard = document.getElementById('current-score')
  let score = 0;



// toggle page functions
newGameBtn.addEventListener('click', toggleGameSpace)
const highScoresBtn = document.getElementById('highscore-button')
highScoresBtn.addEventListener('click', toggleScoreBoard)
function toggleScoreBoard(e) {
  welcomePage.style.display = 'none'
  highScorePage.style.display = 'block'
}
function toggleGameSpace(e) {
  welcomePage.style.display = 'none'
  gameSpace.style.display = 'block'
}



//timer
const counter = {
  seconds: 15,
  start() {
    this.id = setInterval(() => {
      this.seconds -= 1
      if (this.seconds === 0) {
        this.stop()
      }
      counterElem.innerHTML = `${this.seconds}`
    }, 1000)
  },
  stop() {
    clearInterval(this.id)
    counterElem.innerHTML = '0'
  }
}
// counter.start()



//function randomly selects time between an amount of time
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//function selects a box randomly
function randomBox(box) {
  const idx = Math.floor(Math.random() * box.length);
  const boxes = box[idx];
  return boxes
}

function glow() {
  const time = randomTime(90, 1000);
  const randBox = randomBox(box);
  let classs = randBox.classList
  classs.add('light');
  setTimeout(() => {
    randBox.classList.remove('light');},
    time)
}

// function startGame() {
//     scoreBoard.textContent = 0;
//     timeUp = false;
//     score = 0;
//     peep();
//     setTimeout(() => timeUp = true, 10000)
//   }
//
// function select(e) {
//     if(!e.isTrusted) return;
//     score++;
//     this.parentNode.classList.remove('light');
//     scoreBoard.textContent = score;
//   }
//
// box.forEach(box => box.addEventListener('click', select));
