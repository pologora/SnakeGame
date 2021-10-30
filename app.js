const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const scoreElement = document.getElementById("score")
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let snakeSpeed = 500
let score = 0
let speed = 0.9
let timerId = 0

const createGrid = () => {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div")
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

const move = () => {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) clearInterval(timerId)


    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')

    //snake get an apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreElement.textContent = score
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * speed
        timerId = setInterval(move, snakeSpeed)
    }
}


const generateApple = () => {
    do {
        appleIndex = Math.round(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

const startGame = () => {
    clearInterval(timerId)
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    currentSnake = [2, 1, 0]
    snakeSpeed = 500
    score = 0
    scoreElement.textContent = score
    direction = 1
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    generateApple()
    timerId = setInterval(move, snakeSpeed)
    
}
const control = (e) => {
    switch (e.key) {
        case "Down":
        case "ArrowDown":
            direction = width
            break;
        case "Up":
        case "ArrowUp":
            direction = -width
            break;
        case "Left":
        case "ArrowLeft":
            direction = -1
            break;
        case "Right":
        case "ArrowRight":
            direction = 1
            break;
        default:
            break;
    }
}

document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)