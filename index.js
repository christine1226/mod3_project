const newGameBtn = document.getElementById('new-game')
const colorContainer = document.querySelector('.container')
const box = document.querySelectorAll('.box')
let lastBox;
let welcomePage = document.querySelector('.welcome-page')
let gameSpace = document.querySelector('.game-space')
let gameOverPage = document.querySelector('.game-over-page')
let highScorePage = document.querySelector('.highscore-page')
const counterElem = document.querySelector('#counter')



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

// toggle page functions
newGameBtn.addEventListener('click', toggleGameSpace)
const highScoresBtn = document.getElementById('highscore-button')
highScoresBtn.addEventListener('click', toggleScoreBoard)

function toggleGameSpace(e) {
  welcomePage.style.display = 'none'
  gameSpace.style.display = 'block'
  counter.start()
}

function toggleScoreBoard(e) {
  welcomePage.style.display = 'none'
  highScorePage.style.display = 'block'
}

//timer
const counter = {
  seconds: 20,
  start() {
    this.id = setInterval(() => {
      this.seconds -= 1
      if (this.seconds === 0) {
        this.stop()
      }
      glow()
      counterElem.innerHTML = `${this.seconds}`
    }, 1000)
  },
  stop() {
    clearInterval(this.id)
    counterElem.innerHTML = '0'
  }
}
// counter.start()
