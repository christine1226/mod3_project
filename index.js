const newGameBtn = document.getElementById('new-game')
const colorContainer = document.querySelector('.container')
const box = document.querySelectorAll('.box')
let scoreCon = document.querySelector('.highscore-list')
let lastBox;
let welcomePage = document.querySelector('.welcome-page')
let gameSpace = document.querySelector('.game-space')
let gameOverPage = document.querySelector('.game-over-page')
let highScorePage = document.querySelector('.highscore-page')
let timesUpPage = document.querySelector('.timesup-page')
const counterElem = document.querySelector('#counter')
const highScoresBtn = document.getElementById('highscore-button')
const mainMenuBtn = document.querySelector('#main-menu-button')
const mainPBtn = document.querySelector('#main-page-btn')
const buttonCon = document.querySelector('.button-container')
let scores = document.querySelectorAll('.score-keeper')
let userScore = 0
let countdownTimer = document.getElementById('countdown-timer')


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
  const time = 1000;
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
mainPBtn.addEventListener('click', toggleWelcomePage)

function toggleGameSpace(e) {
  welcomePage.style.display = 'none'
  gameSpace.style.display = 'block'
  counter.start()

  document.addEventListener('keydown', buttonHandler)
  buttonCon.addEventListener('click', clickHandler)
}

function toggleScoreBoard(e) {
  welcomePage.style.display = 'none'
  highScorePage.style.display = 'block'

  fetch('http://localhost:3000/players')
  .then(res => res.json())
  .then(json => json.forEach(player => {
    scoreCon.innerHTML += `<div class="left-column"><li class="player-list">${player.username}</li></div><div class="right-column"><li>${player.score}</li></div><br>`
  }))
}

function toggleWelcomePage(e) {
  welcomePage.style.display = 'block'
  highScorePage.style.display = 'none'
  gameOverPage.style.display = 'none'
  scoreCon.innerHTML = ""
}

function buttonHandler(e) {
  for (const button of buttonCon.children) {
    let btnIsGlowing = button.classList
    // debugger
    if (btnIsGlowing.contains('light')) {
      if (e.which === Number(button.dataset.key)) {
        userScore += 100
        scores.forEach(score => score.innerHTML = userScore)
      } else if (e.which !== Number(button.dataset.key)) {
        // if you press the wrong key
        // toggle to gameover page
        // the counter also needs to stop
        toggleGameOver()
        // debugger
        counter.stop()
        userScore = 0
        scores.forEach(score => score.innerHTML = userScore)
      }
    }
  }
}

function clickHandler(e) {
  if (e.target.classList.contains('light')) {
    userScore += 100
    scores.forEach(score => score.innerHTML = userScore)
  } else {
    toggleGameOver()
    // debugger
    counter.stop()
    userScore = 0
    scores.forEach(score => score.innerHTML = userScore)
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
    this.seconds = 20
    counterElem.innerHTML = '20'
  }
}
// counter.start()

function toggleTimesUpPage() {
  gameSpace.style.display = 'none'
  timesUpPage.style.display = 'block'
}

function toggleGameOver() {
  counter.stop()
  gameSpace.style.display = 'none'
  gameOverPage.style.display = 'block'
  // debugger
}
