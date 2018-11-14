const newGameBtn = document.getElementById('new-game')
const colorContainer = document.querySelector('.container')
const box = document.querySelectorAll('.box')
let lastBox;
let welcomePage = document.querySelector('.welcome-page')
let gameSpace = document.querySelector('.game-space')
let gameOverPage = document.querySelector('.game-over-page')
let highScorePage = document.querySelector('.highscore-page')
let timesUpPage = document.querySelector('.timesup-page')
const counterElem = document.querySelector('#counter')
const highScoresBtn = document.getElementById('highscore-button')
const mainMenuBtn = document.querySelector('#main-menu-button')
const buttonCon = document.querySelector('.button-container')

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
highScoresBtn.addEventListener('click', toggleScoreBoard)
mainMenuBtn.addEventListener('click', toggleWelcomePage)

function toggleGameSpace(e) {
  welcomePage.style.display = 'none'
  gameSpace.style.display = 'block'
  counter.start()

  document.addEventListener('keydown', buttonHandler)
}

function toggleScoreBoard(e) {
  welcomePage.style.display = 'none'
  highScorePage.style.display = 'block'
}

function toggleWelcomePage(e) {
  welcomePage.style.display = 'block'
  highScorePage.style.display = 'none'
}

function buttonHandler(e) {
  for (const button of buttonCon.children) {
    let btnIsGlowing = button.classList
    // debugger
    if (btnIsGlowing.contains('light')) {
      if (e.which === Number(button.dataset.key)) {
        console.log('YOU PRESSED THE RIGHT KEY')
      } else{
        toggleGameOver()
        counter.stop()
      }
    }
  }
}

//timer
const counter = {
  seconds: 20,
  start() {
    this.id = setInterval(() => {
      this.seconds -= 1
      if (this.seconds === 0) {
        this.stop()
        toggleTimesUpPage()
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

function toggleTimesUpPage() {
  gameSpace.style.display = 'none'
  timesUpPage.style.display = 'block'
}

function toggleGameOver(){
  gameSpace.style.display = 'none'
  gameOverPage.style.display = 'block'
}
