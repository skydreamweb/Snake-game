// the whole game will be loaded into DOM
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div') // select grid div
    const scoreDisplay = document.querySelector('span') // select score
    const startBtn = document.querySelector('.start') // select start btn

    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 // first div in grid
    let currentSnake = [2, 1, 0] // 2 = head, 1 = body, 0 = tail
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    // start and restart
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake')) // remove all .snake class
        squares[appleIndex].classList.remove('apple') // remove all .apple class
        clearInterval(interval) // set interval to 0
        score = 0 // set score to 0

        // create apples function
        randomApple()
        
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    //function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes() {

        // if snake hits border and snake hits herself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // right wall
            (currentSnake[0] % width === 0 && direction === -1) || // left wall
            (currentSnake[0] - width < 0 && direction === -width) ||  // the top
            squares[currentSnake[0] + direction].classList.contains('snake') // into itself
        ) {
            return clearInterval(interval) //clear the interval if any of these happen
        }

        const tail = currentSnake.pop() // removes last ite of the array and shows it
        squares[tail].classList.remove('snake')  // removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

        //deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }


    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
        squares[appleIndex].classList.add('apple')
    }


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})