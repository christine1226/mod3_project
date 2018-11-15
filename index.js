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
let countdown = document.querySelector('.countdown')
let userInput = document.querySelector('.username-input')
let myLevel = "1"


//function randomly selects time between an amount of time
// function randomTime(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

//function selects a box randomly
// function randomBox(box) {
//   const idx = Math.floor(Math.random() * box.length);
//   const boxes = box[idx];
//   return boxes
// }

for (var i=1e6, lookupTable=[]; i--;) {
  lookupTable.push(Math.floor(Math.random()*box.length));
}
function lookup() {
  let idx = (++i >= lookupTable.length ? lookupTable[i=0] : lookupTable[i]);
  return box[idx]
}



// function glow() {
//   const time = 900;
//   // const randBox = randomBox(box);
//   const randBox = lookup()
//   // let classs = randBox.classList
//   // debugger
//   let classs = randBox.classList
//   classs.add('light');
//   setTimeout(() => {
//     randBox.classList.remove('light');},
//     time)
//   }

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
  .then(res => res.sort((a, b) => b.score - a.score))
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

  userInput.addEventListener('submit', (e)=>{
    let username = event.target.firstElementChild.value
    let finalScore = Number(scores[1].innerText)

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

function toggleGameOver(){
  gameSpace.style.display = 'none'
  gameOverPage.style.display = 'block'
  game.pause()
}

const audio = document.querySelector(`body > div > div.game-space > div.button-container > audio`);
function playAudio(){
  audio.play()
}

game = document.querySelector('body > div > div.welcome-page > div > audio')
function gameAudio(){
  game.play()
  setTimeout(function () {
    game.pause();
}, 20000);
}

const highscore = document.querySelector(`body > div > div.welcome-page > div > audio:nth-child(4)`);
function scoreAudio(){
  highscore.play()
}
