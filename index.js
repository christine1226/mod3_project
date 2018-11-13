const newGameBtn = document.getElementById('new-game')


newGameBtn.addEventListener('click', (e)=>{
  if (e.target.innerHTML === 'New Game'){
    e.target.parentElement.remove()
    debugger
  }
})
