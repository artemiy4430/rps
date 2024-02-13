let game = document.querySelector('.game')
let iconsPlayer = document.querySelector('.icons_player')
let iconsComputer = document.querySelector('.icons_computer')
let buttonRestart = document.querySelector('.button-restart')
let countPlayer = document.querySelector('.count-player'),
	countP = 0; 
let countComp = document.querySelector('.count-computer'),
	countC = 0; 
let compButtons = document.querySelectorAll('.buttonC'),
	compStep
let playerButtons = document.querySelectorAll('.buttonP'),
	playerStep; 
	let res = document.querySelector('.result')
let buttons = document.querySelectorAll('.button')
let blocked = false
let intervalId
let currentIndex = 0

buttonRestart.addEventListener('click', gameRestart)

playerButtons.forEach(item => {
	item.addEventListener('click', choicePlayer)
})

iconsPlayer.addEventListener('click', () => {
	clearInterval(intervalId)
	intervalId = setInterval(choiceComp, 1000)
})

function gameRestart() {}

function choicePlayer(e) {
	if (blocked) {
		return
	}
	blocked = true
	let target = e.target
	if (target.classList.contains('buttonP')) {
		playerStep = target.dataset.field
		playerButtons.forEach(element =>
			element.classList.remove('active', 'loser', 'draw')
		)
		target.classList.add('active')
	}
}

function choiceComp() {
	compButtons.forEach(element => element.classList.remove('active', 'loser', 'draw'))
	compButtons[currentIndex].classList.add('active')
	currentIndex = (currentIndex + 1) % compButtons.length
	let animationDuration = Math.floor(Math.random() * 3000) + 1000
	let elapsedTime = 0

	function animate() {
		compButtons.forEach(element => element.classList.remove('active'))
		const randomIndex = Math.floor(Math.random() * compButtons.length)
		compButtons[randomIndex].classList.add('active'); 
		compStep = compButtons[randomIndex].dataset.field 
		elapsedTime += 700
		if (elapsedTime < animationDuration) {
			setTimeout(animate, 10)
		} else {
			clearInterval(intervalId) ; 
			blocked = false; 
			winner() 
		}
	}

	animate()
}


function winner() {
	let hand = playerStep + compStep

	switch (hand) {
		case 'rr':
		case 'ss':
		case 'pp':
			res.innerText = 'draw'; 
			iconsComputer
				.querySelector('[data-field=' + compStep + ']')
				.classList.add('draw') 
			iconsPlayer
				.querySelector('[data-field=' + playerStep + ']')
				.classList.add('draw') 
			break
		case 'rs':
		case 'sp':
		case 'pr':
			res.innerText = 'you won'
			countP++
			countPlayer.innerText = countP
			iconsComputer
				.querySelector('[data-field=' + compStep + ']')
				.classList.add('loser')
			break

		case 'sr':
		case 'ps':
		case 'rp':
			res.innerText = 'comp won'
			countC++
			countComp.innerText = countC
			iconsPlayer
				.querySelector('[data-field=' + playerStep + ']')
				.classList.add('loser')
			break
	}
}

function gameRestart() {
	countP = countC = 0
	res.innerText = 'your move'
	countPlayer.innerText = '0'
	countComp.innerText = '0'; 
	clearInterval(intervalId);
	blocked = false; 
	buttons.forEach(item => item.classList.remove('active', 'loser'))
}
buttonRestart.addEventListener('click', gameRestart)
iconsPlayer.addEventListener('click', choicePlayer)
