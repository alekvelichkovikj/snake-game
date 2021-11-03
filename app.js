// STEP 1: DISPLAY A SNAKE ON THE CANVAS
// STEP 2: MAKE IT MOVE AUTOMATICALLY USING SET TIMEOUT
// STEP 3: INCORPORATING THE ARROW KEYS
// STEP 4: CREATING THE APPLE
// STEP 5: GAME OVER / If  THE SNAKE HITS A WALL / IF THE SNAKE HITS ITSELF

// BUGS TO FIX: SNAKE STILL GOES IN REVERSE, AT STARTUP IF U PRESS SPACE INSTEAD OF ENTER IT TRIGERS THE DRAW(), THE BLACK CANVAS ON LOADING

// Variables
const snakeBox = document.querySelector('#game')
const snakeBoxContext = game.getContext('2d')
let dx = 10
let dy = 0
let appleX
let appleY
let score = 0
let snakeSize = 10
let paused = false

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
  paused = !paused
  draw()
}

// CLEARING THE CANVASS AFTER THE SNAKE MOVES
function clearCanvas() {
  snakeBoxContext.fillRect(0, 0, snakeBox.width, snakeBox.height)
}

// DRAWING THE SNAKE ON THE CANVAS
function snakeElement(el) {
  snakeBoxContext.fillStyle = '#fff'
  snakeBoxContext.strokeStyle = '#191919'
  snakeBoxContext.fillRect(el.x, el.y, snakeSize, snakeSize)
  snakeBoxContext.strokeRect(el.x, el.y, snakeSize, snakeSize)
}

function drawSnake() {
  snake.forEach(snakeElement)
}

// MOVING THE SNAKE AUTOMATICALLY
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)

  //IF THE SNAKE EATS THE APPLE WE CONCATENATE THE RESULT & WE DONT POP() THE LAST ELEMENT OF THE SNAKE ARRAY THEREFORE MAKING IT LONGER
  let snakeAteFood = snake[0].x === appleX && snake[0].y === appleY
  if (snakeAteFood) {
    score += 10
    document.querySelector('.score').innerHTML =
      'Score:' + ' ' + `<span>${score}</span>`
    getApple()
  } else {
    snake.pop()
  }
}

// INCORPORATING ARROW KEYS TO CHANGE DIRECTION
document.addEventListener('keydown', changeDirection)

function changeDirection(e) {
  const key = e.keyCode
  const moveUp = dy === -10
  const moveDown = dy === 10
  const moveRight = dx === 10
  const moveLeft = dx === -10

  const leftKey = 37
  const rightKey = 39
  const upKey = 38
  const downKey = 40

  // WE MAKE SURE THAT THE SNAKE CAN'T GO IN REVERSE BUT IT DOESNT LISTEN ANYWAY 🦄
  if (key === leftKey && !moveRight) {
    dx = -10
    dy = 0
  }
  if (key === upKey && !moveDown) {
    dx = 0
    dy = -10
  }
  if (key === rightKey && !moveLeft) {
    dx = 10
    dy = 0
  }
  if (key === downKey && !moveUp) {
    dx = 0
    dy = 10
  }
}

// MAKING THE APPLE
function getRandom(min, max) {
  return Math.floor((Math.random() * 400) / 10) * 10
}

function getApple() {
  appleX = getRandom(0, snakeBox.width - 10)
  appleY = getRandom(0, snakeBox.height - 10)
  snake.forEach(function appleEaten(snakeHead) {
    const alreadyEaten = snakeHead.x == appleX && snakeHead.y == appleY
    if (alreadyEaten) getApple()
  })
}

function drawApple() {
  snakeBoxContext.fillStyle = '#b30707'
  snakeBoxContext.fillRect(appleX, appleY, snakeSize, snakeSize)
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
