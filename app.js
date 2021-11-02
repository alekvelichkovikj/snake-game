// Variables
const snakeBox = document.querySelector('#game')
const snakeBoxContext = game.getContext('2d')
let dx = 10
let dy = 0

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
  { x: 150, y: 200 },
]

// Main function drawing snake repeatedly on Canvas
function draw() {
  drawSnake()
}

// Drawing the snake on the Canvas
function snakeElement(el) {
  snakeBoxContext.fillStyle = '#fff'
  snakeBoxContext.strokeStyle = '#191919'
  snakeBoxContext.fillRect(el.x, el.y, 10, 10)
  snakeBoxContext.strokeRect(el.x, el.y, 10, 10)
}

function drawSnake() {
  snake.forEach(snakeElement)
}

// Moving the Snake
function move_snake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)
  snake.pop()
}

draw()
