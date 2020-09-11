/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying

init()

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random()*6)+1
        // 2. Display score
        var diceDOM = document.querySelector('.dice')
        document.querySelector('#current-' + activePlayer).textContent = dice
        diceDOM.src = 'dice-' + dice + ".png"
        diceDOM.style.display = 'block'
        // 3. Update round score if not rolled 1
        if (dice > 1) {
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            nextPlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // 1. Add roundscore to scores
        scores[activePlayer] += roundScore
        // 2. Display score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        // 3. Check if won
        if(scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        } else {
            // Next player
            nextPlayer()
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    gamePlaying = true

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
}
function nextPlayer() {
    // 1. Roundscore = 0
    roundScore = 0
    // 2. Playerscore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    // 3. ActivePlayer switches
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    // 4. Css changes
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
}