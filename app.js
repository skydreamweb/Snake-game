document.addEventListener('DOMContentLoad', ()=>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    // start game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval)
        score = 0;
        // create apple
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentSnake = 0;
        currentIndex.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)

    }

    const width = 10;
    let currentIndex = 0; // first div
    let appleIndex= 0; // first div
    let currentSnake = [2,1,0]; // 2 = head, 0 = tail
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39){
            direction = 1; // right arrow kboard and snake go right one
        } else if (e.keyCode === 38){
            direction = -width; // up arrow kboard and snake go up
        } else if (e.keyCode == 37){
            direction -1 // left arrow and snake go left
        } else if (e.keyCode === 40) {
            direction = +width // down arrow and snake go down
        }
    }

    document.addEventListener('keyup', constrol)
})