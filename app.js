// STEP 1: DISPLAY A SNAKE ON THE CANVAS
// STEP 2: MAKE IT MOVE AUTOMATICALLY USING SET TIMEOUT
// STEP 3: INCORPORATING THE ARROW KEYS
// STEP 4: CREATING THE APPLE
// STEP 5: GAME OVER / If  THE SNAKE HITS A WALL / IF THE SNAKE HITS ITSELF

// Variables
const snakeBox = document.querySelector('#game')
const snakeBoxContext = game.getContext('2d')
let score = document.querySelector('.score')
let dx = 10
let dy = 0
let appleX
let appleY
let snakeSquare = 10
let paused = false
let displayScore = 0
let keyBuffer = []
let appleBite = new Audio('audio/20279__koops__apple-crunch-16.mp3')
let state = false
let gameOverText = document.querySelector('.game-over')

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
  { x: 150, y: 200 },
]

// START THE GAME
window.addEventListener('keydown', startGame)
function startGame(e) {
  let key = e.keyCode
  switch (key) {
    // RELOAD GAME
    case 82:
      location.reload()
      draw
      break
    // PRESS ENTER TO START THE GAME
    case 13:
      state = true
      document.querySelector('p.toggle').remove()
      draw()
      break
  }
}

// GETTING THE APPLE
getApple()

// MAIN FUNCTION CALLS ITSELF TO KEEP THE GAME GOING ONCE GAME STARTED
function draw() {
  if (gameOver()) {
    gameOverText.classList.add('active')
    return
  }

  setTimeout(function onTick() {
    clearCanvas()
    drawApple()
    moveSnake()

    drawSnake()
    if (!paused) {
      draw()
    }
  }, 100)
}

// PAUSING GAME
window.addEventListener('keydown', pauseGame, false)
function pauseGame(e) {
  let key = e.keyCode
  switch (key) {
    case 32:
      togglePause()
      break
  }
}

function togglePause() {
  if (state) {
    paused = !paused
    draw()
  }
}

// CLEARING THE CANVASS AFTER THE SNAKE MOVES
function clearCanvas() {
  snakeBoxContext.fillRect(0, 0, snakeBox.width, snakeBox.height)
}

// DRAWING THE SNAKE ON THE CANVAS
function snakeElement(el) {
  snakeBoxContext.fillStyle = '#fff'
  snakeBoxContext.strokeStyle = '#191919'
  snakeBoxContext.fillRect(el.x, el.y, snakeSquare, snakeSquare)
  snakeBoxContext.strokeRect(el.x, el.y, snakeSquare, snakeSquare)
}

function drawSnake() {
  snake.forEach(snakeElement)
}

// MOVING THE SNAKE
document.addEventListener('keydown', changeDirection)
function changeDirection(e) {
  if (
    e.keyCode >= 37 &&
    e.keyCode <= 40 &&
    e.keyCode !== keyBuffer[keyBuffer.length - 1]
  ) {
    keyBuffer.push(e.keyCode)
  }
}

function moveSnake() {
  // IMPLEMENTED A BUFFER TO AVOID GOING IN REVERSE
  // IMPLEMENTED ARROW KEYS
  firstKeyStroke = keyBuffer.shift()
  const moveUp = dy === -10
  const moveDown = dy === 10
  const moveRight = dx === 10
  const moveLeft = dx === -10

  const leftKey = 37
  const rightKey = 39
  const upKey = 38
  const downKey = 40

  // WE MAKE SURE THAT THE SNAKE CAN'T GO IN REVERSE 🦄
  if (firstKeyStroke === leftKey && !moveRight) {
    dx = -10
    dy = 0
  }
  if (firstKeyStroke === upKey && !moveDown) {
    dx = 0
    dy = -10
  }
  if (firstKeyStroke === rightKey && !moveLeft) {
    dx = 10
    dy = 0
  }
  if (firstKeyStroke === downKey && !moveUp) {
    dx = 0
    dy = 10
  }

  // AUTOMATIC MOVEMENT OF THE SNAKE
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)

  //IF THE SNAKE EATS THE APPLE WE CONCATENATE THE RESULT & WE DONT POP() THE LAST ELEMENT OF THE SNAKE ARRAY
  const snakeAteFood = head.x === appleX && head.y === appleY
  if (snakeAteFood) {
    appleBite.play()
    displayScore += 10
    score.innerHTML = 'Score:' + ' ' + `<span>${displayScore}</span>`
    getApple()
  } else {
    snake.pop()
  }
}

// MAKING THE APPLE
function getRandom(min, max) {
  return Math.floor((Math.random() * 400) / 10) * 10
}

function getApple() {
  appleX = getRandom(0, snakeBox.width - 10)
  appleY = getRandom(0, snakeBox.height - 10)
  snake.forEach(function appleEaten(snakePart) {
    const alreadyEaten = snakePart.x == appleX && snakePart.y == appleY
    if (alreadyEaten) getApple()
  })
}

function drawApple() {
  snakeBoxContext.fillStyle = '#b30707'
  snakeBoxContext.fillRect(appleX, appleY, snakeSquare, snakeSquare)
}

// GAME OVER
function gameOver() {
  // HERE WE CHECK IF A COLLISION HAPPENED WITH THE SNAKE'S BODY
  for (let i = 1; i < snake.length; i++) {
    const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (collision) return true
  }

  // HERE WE CHECK FOR A COLLISION WITHIN THE BOUNDARIES OF THE CANVAS
  const wallHit =
    snake[0].x < 0 ||
    snake[0].x > snakeBox.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > snakeBox.height - 10

  return wallHit
}
