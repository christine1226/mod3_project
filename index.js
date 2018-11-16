const newGameBtn = document.getElementById('new-game')
const mainPBtn = document.querySelector('#main-page-btn')
const mainMenuBtn = document.querySelector('#main-menu-button')
const menuBtn = document.querySelector('#menu-button')
const highScoresBtn = document.getElementById('highscore-button')
const colorContainer = document.querySelector('.container')
const buttonCon = document.querySelector('.button-container')
const box = document.querySelectorAll('.box')
let lastBox;
let scoreCon = document.querySelector('.highscore-list')
let scores = document.querySelectorAll('.score-keeper')
let welcomePage = document.querySelector('.welcome-page')
let gameSpace = document.querySelector('.game-space')
let gameOverPage = document.querySelector('.game-over-page')
let highScorePage = document.querySelector('.highscore-page')
let timesUpPage = document.querySelector('.timesup-page')
let countdownPage = document.querySelector('.countdown-page')
const counterElem = document.querySelector('#counter')
let userScore = 0
let countdownTimer = document.getElementById('countdown-timer')
let userInput = document.querySelector('.username-input')
let myLevel = '1'


//function selects a box randomly
function randomBox(box) {
  const idx = Math.floor(Math.random() * box.length);
  const boxes = box[idx];
  return boxes
}


function glow() {
  const time = level[myLevel]['glowTime'];
  const randBox = randomBox(box);
  let classs = randBox.classList
  classs.add('light');
  setTimeout(() => {
    randBox.classList.remove('light');
    }, time)
  }

// toggle page functions
newGameBtn.addEventListener('click', toggleCountdownPage)
highScoresBtn.addEventListener('click', toggleScoreBoard)
mainMenuBtn.addEventListener('click', toggleWelcomePage)
mainPBtn.addEventListener('click', toggleWelcomePage)
menuBtn.addEventListener('click', toggleWelcomePage)

function toggleCountdownPage(e) {
  welcomePage.style.display = 'none'
  countdownPage.style.display = 'block'

  let countdownNum = 3
  let interval = setInterval(() => {
    countdownNum -= 1
    countdownTimer.innerText = countdownNum
      if (countdownNum === 0) {
        clearInterval(interval)
      }
    }, 500)
    countdownTimer.innerText = 3
  setTimeout(toggleGameSpace, 1500)
}

function toggleGameSpace() {
  welcomePage.style.display = 'none'
  countdownPage.style.display = 'none'
  gameSpace.style.display = 'block'
  counter.start()

  gameSong.currentTime = 0
  gameSong.play()

  document.addEventListener('keydown', buttonHandler)
  document.addEventListener('keyup', buttonHandle)
  buttonCon.addEventListener('click', clickHandler)
}

function toggleScoreBoard(e) {
  welcomePage.style.display = 'none'
  highScorePage.style.display = 'block'


  fetch('http://localhost:3000/players')
  .then(res => res.json())
  .then(res => res.sort((a, b) => b.score - a.score))
  .then(json => json.forEach(player => {
    scoreCon.innerHTML += `<div class="left-column"><li class="player-list">${player.username}</li></div><div class="right-column"><li>${player.score}</li></div><br>`
  }))
}

function toggleWelcomePage(e) {
  welcomePage.style.display = 'block'
  highScorePage.style.display = 'none'
  gameOverPage.style.display = 'none'
  timesUpPage.style.display = 'none'

  scoreCon.innerHTML = ""
  userInput.firstElementChild.value = ""
  userScore = 0
  scores.forEach(score => score.innerHTML = userScore)
}

var pressed = false;
function buttonHandler(e) {
  for (const button of buttonCon.children) {
    let btnIsGlowing = button.classList
    if (btnIsGlowing.contains('light')) {
      if (e.which === Number(button.dataset.key) && pressed === false) {
        userScore += 100
        pressed = true
        scores.forEach(score => score.innerHTML = userScore)
        playAudio()
      } else if (e.which !== Number(button.dataset.key)) {
        toggleGameOver()
        counter.stop()
      }
    }
  }
}
function buttonHandle(e){
  setTimeout(() => {
    pressed = false;
  }, 600)
}



function clickHandler(e) {
  if (e.target.classList.contains('light')) {
    userScore += 100
    scores.forEach(score => score.innerHTML = userScore)
  } else {
    toggleGameOver()
    counter.stop()
  }
}

//timer
const counter = {
  seconds: 20,

  start() {
    this.id = setInterval(() => {
      this.seconds -= 1
      counterElem.innerHTML = `${this.seconds}`
      if (this.seconds === 0) {
        this.stop()
        toggleTimesUpPage()
      }
    }, 1000)
    this.glowId = setInterval(glow, level[myLevel]['intervalTime'])
  },

  stop() {
    clearInterval(this.id)
    clearInterval(this.glowId)
    this.seconds = 20
    counterElem.innerHTML = '20'
  }
 }

function toggleTimesUpPage() {
  gameSpace.style.display = 'none'
  timesUpPage.style.display = 'block'
  gameSong.pause()
}

function toggleGameOver() {
  counter.stop()
  gameSpace.style.display = 'none'
  gameOverPage.style.display = 'block'
  gameSong.pause()

  userInput.addEventListener('submit', (e) => {
    let username = event.target.firstElementChild.value
    let finalScore = Number(scores[2].innerText)

    fetch('http://localhost:3000/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        score: finalScore
      })
    })
  })
}


const audio = document.querySelector(`body > div > div.game-space > div.button-container > audio`);
function playAudio(){
  audio.play()
}

game = document.querySelector('body > div > div.welcome-page > div > audio')
function newGame(){
  game.play()
}

const highscore = document.querySelector(`body > div > div.welcome-page > div > audio:nth-child(7)`);
function scoreAudio(){
  highscore.play()
}
const main = document.querySelector(`body > div > div.highscore-page > audio`)
function mainAudio(){
  main.play()
}
const tryAgain = document.querySelector(`body > div > div.game-over-page > audio`)
function tryAgainAudio(){
  tryAgain.play()
}
const next = document.querySelector(`body > div > div.timesup-page > audio`)
function nextAudio(){
  next.play()
}
const submit = document.querySelector(`body > div > div.game-over-page > div > form > audio`)
function submitAudio(){
  submit.play()
}
const men = document.querySelector(`body > div > div.timesup-page > audio:nth-child(6)`)
function menuBAudio(){
  men.play()
}

let middle = document.getElementById('middle')
let onedance = document.getElementById('onedance')
let iran = document.getElementById('iran')
let song = [onedance, middle, iran]
let gameSong = (song[Math.floor(Math.random() * song.length)])
