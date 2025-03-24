//---ELEMENTOS HTML---
const board = document.getElementById(`board`)
const scoreBoard = document.getElementById(`scoreBoard`)
const startButton = document.getElementById(`start`)
const gameOverSign = document.getElementById(`gameOver`)

//---AJUSTES---
const boardSize = 10

const gameSpeed = 150

const squareTypes =
{

    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,

}

const directions =
{

    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,

}

//---VARIABLES---
let snake
let score
let direction
let boardSquares
let emptySquares
let moveInterval

//---FUNCIONES---

//Funcion para trazar la serpiente.
const drawSnake = () =>
{

    snake.forEach (square => drawSquare(square, `snakeSquare`))

}

//Funcion para trazar los diferentes tipos de bloques.
const drawSquare = (square, type) =>
{

    const [row, column] = square.split(``)
    boardSquares[row][column] = squareTypes[type]
    const squareElement = document.getElementById(square)
    squareElement.setAttribute(`class`, `square ${type}`)

    if(type === `emptySquare`)
    {

        emptySquares.push(square)

    }
    else
    {

        if (emptySquares.indexOf(square) !== -1)
        {

            emptySquares.splice(emptySquares.indexOf(square), 1)

        }

    }

}

//Función para añadir y hacer funcinal la comida.
const addFood = () =>
{

    score++
    updateScore()
    createRandomFood()

}

//Función que permite el movimiento de la serpiente
const moveSnake = () =>
{

    const newSquare = String(Number (snake[snake.length - 1]) + directions[direction])
    .padStart(2, `0`)
    const [row, column] = newSquare.split(``)

    if (newSquare < 0 || newSquare > boardSize * boardSize || (direction === `ArrowRight` && column == 0) || (direction === `ArrowLeft` && column == 9 || boardSquares[row][column] === squareTypes.snakeSquare) )
    {

        gameOver()

    }
    else
    {

        snake.push(newSquare)
        if (boardSquares[row][column] === squareTypes.foodSquare)
        {

            addFood()

        }
        else
        {

            const emptySquare = snake.shift()
            drawSquare (emptySquare, 'emptySquare')

        }
        drawSnake()

    }

}

//Función para el fin de juego.
const gameOver = () =>
{

    gameOverSign.style.display = `block`
    clearInterval(moveInterval)
    startButton.disabled = false

}

//Función que permite acceder a direction.
const setDirection = newDirection => 
{

    direction = newDirection

}

//Función que crea los eentos de dirección.
const directionEvent = key =>
{

    switch(key.code)
    {

        case `ArrowUp`:
            direction != `ArrowDown` && setDirection(key.code)
            break

        case `ArrowDown`:
            direction != `ArrowUp` && setDirection(key.code)
            break

        case `ArrowLeft`:
            direction != `ArrowRight` && setDirection(key.code)
            break
    
        case `ArrowRight`:
            direction != `ArrowLeft` && setDirection(key.code)
            break

    }

}

//Función qu epermite situar la comida en locolizaciones aleatorias.
const createRandomFood = () =>
{

    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
    drawSquare(randomEmptySquare, `foodSquare`)

}

//Función que permite actualizar el puntuaje.
const updateScore = () =>
{

    scoreBoard.innerText = score;
    
}

//Función para crear la zona de juego.
const createBoard = () => 
{

    boardSquares.forEach ( (row, rowIndex) =>
    {

        row.forEach( (column, columndex) =>
        {

            const squareValue = `${rowIndex}${columndex}`
            const squareElement = document.createElement(`div`)
            squareElement.setAttribute(`class`, `square emptySquare`)
            squareElement.setAttribute(`id`, squareValue)
            board.appendChild(squareElement)
            emptySquares.push(squareValue)

        })

    })

}

//Función que configura el juego.
const setGame = () =>
{

    snake = [`00`, '01', '02', '03']
    score = snake.length
    direction = `ArrowRight`
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))
    console.log(boardSquares)
    board.innerHTML = ``
    emptySquares = []
    createBoard()

}

//Función que empieza el juego
const startGame = () =>
{

    setGame()
    gameOverSign.style.display = 'none'
    startButton.disabled = true
    drawSnake()
    updateScore()
    createRandomFood()
    document.addEventListener(`keydown`, directionEvent)
    moveInterval = setInterval (() => moveSnake(), gameSpeed)

}

//---START---
startButton.addEventListener(`click`, startGame)