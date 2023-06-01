document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';
    document.body.append(container);
    
    const header = document.createElement('h1');
    header.className = 'header';
    header.innerHTML = 'Minesweeper';
    container.appendChild(header);

    const topBlock = document.createElement('div');
    topBlock.className = 'top-block';
    container.appendChild(topBlock);

    const movesBlock = document.createElement('h3');
    movesBlock.className = 'moves';
    movesBlock.innerHTML = 'Moves: ';
    topBlock.appendChild(movesBlock);

    const retryBtn = document.createElement('btn');
    retryBtn.className = 'retry';
    retryBtn.innerHTML = 'New Game';
    topBlock.appendChild(retryBtn);

    const playField = document.createElement('div');
    playField.className = 'playfield';
    container.appendChild(playField);

    const flagCounter = document.createElement('div');
    flagCounter.className = 'counter'
    flagCounter.innerText = 'Flags left: ';
    container.appendChild(flagCounter);

    const timeBlock = document.createElement('h3');
    timeBlock.className = 'time';
    container.appendChild(timeBlock);
    
    let width = 10;
    let cells = [];
    let bombs = 10;
    let gameOver = false;
    let flags = 0;
    let moves = 0;
    let time = 0;
    let clickSound = null;
    let mineSound = null;
    let winSound = null;

    const bombsLeft = document.createElement('span');
    bombsLeft.setAttribute('id', 'bombs');
    bombsLeft.innerHTML = bombs;
    flagCounter.appendChild(bombsLeft);

    const movesCounter = document.createElement('span');
    movesCounter.setAttribute('id', 'moves-count');
    movesCounter.innerHTML = moves;
    movesBlock.appendChild(movesCounter);

    //create playField
    function createPlayField() {
        //create shuffled array with clear cells and bombs
        const bombArray = Array(bombs).fill('bomb');
        const clearArray = Array(width * width - bombs).fill('clear');
        const mergedArray = clearArray.concat(bombArray);
        const gameArray = mergedArray.sort(() => Math.random() - 0.5);
        loadResourses();

        for (let i = 0; i < width * width; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add(gameArray[i]);
            playField.appendChild(cell);
            cells.push(cell);

            //left click
            cell.addEventListener('click', function(e) {
                click(cell);
                moves++;
                document.getElementById('moves-count').innerHTML = moves;
                clickSound.play();
            })

            //right click
            cell.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(cell);
                clickSound.play();
            }
        }

        //add counter to each cell
        for (let i = 0; i < cells.length; i++) {
            let counter = 0;
            const leftEdge = i % width === 0;
            const rightEdge = i % width === width - 1;
            if (cells[i].classList.contains('clear')) {
                if (i > 0 && !leftEdge && cells[i - 1].classList.contains('bomb')) counter++;
                if (i > 9 && !rightEdge && cells[i + 1 - width].classList.contains('bomb')) counter++;
                if (i > 10 && cells[i - width].classList.contains('bomb')) counter++;
                if (i > 11 && !leftEdge && cells[i - 1 - width].classList.contains('bomb')) counter++;
                if (i < 98 && !rightEdge && cells[i + 1].classList.contains('bomb')) counter++;
                if (i < 90 && !leftEdge && cells[i - 1 + width].classList.contains('bomb')) counter++;
                if (i < 88 && !rightEdge && cells[i + 1 + width].classList.contains('bomb')) counter++;
                if (i < 89 && cells[i + width].classList.contains('bomb')) counter++;
                cells[i].setAttribute('data', counter);
            }
        }
        
    }
    createPlayField();

    //time function
    function formatSeconds(seconds) {
        const date = new Date(1970, 0, 1);
        date.setSeconds(seconds);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }
    
    setInterval(() => {
        if (gameOver) return;
        timeBlock.innerHTML = `<h3>Time: ${formatSeconds(++time)}</h3>`
    }, 1000)

    //load resourses (img and sounds)
    async function loadResourses() {
        clickSound = new Audio('assets/audio/click.mp3');
        mineSound = new Audio('assets/audio/mine.mp3');
        winSound = new Audio('assets/audio/win.mp3');
    }

    //add flags with right click
    function addFlag(cell) {
        if (gameOver) return;
        if (!cell.classList.contains('pressed')) {
            if (!cell.classList.contains('flag')) {
                cell.classList.add('flag');
                cell.innerHTML = '🚩';
                flags++;
                checkWin();
            } else {
                cell.classList.remove('flag');
                cell.innerHTML = '';
                flags--;
            }
        }
        document.getElementById('bombs').innerHTML = bombs - flags;
    }
    
    
    //click on cells function
    function click(cell) {
        let clickId = cell.id;
        if (gameOver) return;
        if (cell.classList.contains('pressed') || cell.classList.contains('flag')) return;
        if (cell.classList.contains('bomb')) {
            endGame(cell);
        } else {
            let counter = cell.getAttribute('data');
            if (counter != 0) {
                cell.classList.add('pressed');
                if (counter == 1) cell.classList.add('one');
                if (counter == 2) cell.classList.add('two');
                if (counter == 3) cell.classList.add('three');
                if (counter == 4) cell.classList.add('four');
                if (counter == 5) cell.classList.add('five');
                cell.innerHTML = counter;
                return;
            }
            checkNextCell(cell, clickId);
        }
        cell.classList.add('pressed');
    }

    //check neighbour cells after click. Recursion
    function checkNextCell(cell, clickId) {
        const leftEdge = clickId % width === 0;
        const rightEdge = clickId % width === width - 1;

        setTimeout(() => {
            if (clickId > 0 && !leftEdge) {
                const newId = cells[parseInt(clickId) - 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId > 9 && !rightEdge) {
                const newId = cells[parseInt(clickId) +1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId > 10) {
                const newId = cells[parseInt(clickId) - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId > 11 && !leftEdge) {
                const newId = cells[parseInt(clickId) - 1 - width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId < 98 && !rightEdge) {
                const newId = cells[parseInt(clickId) + 1].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId < 90 && !leftEdge) {
                const newId = cells[parseInt(clickId) - 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId < 88 && !rightEdge) {
                const newId = cells[parseInt(clickId) + 1 + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
            if (clickId < 89) {
                const newId = cells[parseInt(clickId) + width].id;
                const newCell = document.getElementById(newId);
                click(newCell);
            }
        }, 10)
    }

    // game over function
    function endGame(cell) {
        mineSound.play();
        alert('BOOM! Your game is over!');
        gameOver = true;

        //reveal bombs
        cells.forEach(cell => {
            if(cell.classList.contains('bomb')) {
                cell.innerHTML = '💣';
                cell.style.background = ('red');
            }
            if(cell.classList.contains('flag') && cell.classList.contains('bomb')) {
                cell.style.background = ('green');
            }
        })
    }

    // checking for win
    function checkWin() {
        let matches = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.contains('flag') && cells[i].classList.contains('bomb')) {
                matches++;
            }
            if (matches === bombs) {
                winSound.play();
                alert('YOU WIN!');
                gameOver = true;
                return;
            }
        }
    }

    // new game function 
    retryBtn.addEventListener('click', restart);

    function restart() {
        width = 10;
        cells = [];
        bombs = 10;
        gameOver = false;
        flags = 0;
        moves = 0;
        time = 0;

        playField.innerHTML = '';
        bombsLeft.innerHTML = bombs;
        movesCounter.innerHTML = moves;
        timeBlock.innerHTML = ' ';
        clearInterval();

        createPlayField();
    }
    
})