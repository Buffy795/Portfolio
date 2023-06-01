const cnvs = document.getElementById('puzzle');
const ctx = cnvs.getContext('2d');

const fieldSize = 4;
const cellSize = cnvs.width / fieldSize;

const movesBlock = document.getElementById('moves')
const timeBlock = document.getElementById('time')

let bgImage = null;
let retryIcon = null;
let moveAudio = null;
let playField = [];
let coords = [];
let finalState = [];
let gameOver = false;
let hoveredItem = null;
let retryBtnCoords = {};
let moves = 0
let time = 0;

cnvs.addEventListener('mousemove', (e) => {
    const clientX = e.offsetX;
    const clientY = e.offsetY;

    if (stillOnHovered(clientX, clientY)) {
        return;
    }

    hoveredItem = getHoveredItem(clientX, clientY);
})

cnvs.addEventListener('mouseout', _ => {
    hoveredItem = null;
})

cnvs.addEventListener('click', e => {
    const clientX = e.offsetX
    const clientY = e.offsetY


    if (gameOver) {
        if (clientX > retryBtnCoords.x && clientX < retryBtnCoords.x + 150 &&
            clientY > retryBtnCoords.y && clientY < retryBtnCoords.y + 150) {
            gameOver = false;
            moves = 0
            time = 0
            hoveredItem = null;

            moveAudio.play();

            playField = [];
            coords = [];
            finalState = [];


            initGame();
        }
        return;
    }

    moveAudio.play();

    if (stillOnHovered(clientX, clientY)) {

        const emptyCell = (playField[hoveredItem.row]?.[hoveredItem.col + 1] === 0 && { row: hoveredItem.row, col: hoveredItem.col + 1 } ||
            playField[hoveredItem.row]?.[hoveredItem.col - 1] === 0 && { row: hoveredItem.row, col: hoveredItem.col - 1 } ||
            playField[hoveredItem.row - 1]?.[hoveredItem.col] === 0 && { row: hoveredItem.row - 1, col: hoveredItem.col } ||
            playField[hoveredItem.row + 1]?.[hoveredItem.col] === 0 && { row: hoveredItem.row + 1, col: hoveredItem.col });

        if (emptyCell) {
            const currentN = playField[hoveredItem.row][hoveredItem.col];
            playField[hoveredItem.row][hoveredItem.col] = 0;
            playField[emptyCell.row][emptyCell.col] = currentN;
            hoveredItem = null;

            moves++
            movesBlock.innerHTML = `<h3>Moves: ${moves}<h3>`

            gameOver = checkWin();
        }

    }
})

function checkWin() {
    for (let row = 0; row < playField.length; row++) {
        for (let col = 0; col < playField[row].length; col++) {
            if (playField[row][col] !== finalState[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function formatSeconds(seconds) {
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function getHoveredItem(clientX, clientY) {
    return coords.find((c) => {
        return (clientX > c.x) && (clientX < c.x + cellSize) && (clientY > c.y) && (clientY < c.y + cellSize);
    })
}

function stillOnHovered(clientX, clientY) {
    return hoveredItem &&
        (clientX > hoveredItem.x) &&
        (clientX < hoveredItem.x + cellSize) &&
        (clientY > hoveredItem.y) &&
        (clientY < hoveredItem.y + cellSize);
}

function gameOverScreen() {
    ctx.fillStyle = 'white'
    retryBtnCoords.x = (cnvs.width - 150) / 2, retryBtnCoords.y = (cnvs.height - 150) / 2;
    ctx.fillRect(retryBtnCoords.x, retryBtnCoords.y, 150, 150);
    drawImage(retryIcon, (cnvs.width - 100) / 2, (cnvs.height - 90) / 2, 100, 90);
}

function loadImages(path) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        }
        img.onerror = (e) => {
            reject(e);
        }
    })
}

async function loadResourses() {
    //const results = await Promise.all([loadImages('assets/img/bg.png')], [loadImages('assets/img/bg2.png')]);
    bgImage = await loadImages('assets/img/bg.png');
    retryIcon = await loadImages('assets/img/retry.png');
    
    moveAudio = new Audio('assets/audio/click.mp3');
}

function initPlayField() {
    let existed = [];
    let result = [];
    let counter = 1;
    
    for (let row = 0; row < fieldSize; row++) {
        const _row = [];
        const finalStateRow = [];
        for (let col = 0; col < fieldSize; col++) {
            while (_row.length !== fieldSize) {
                const randomN = Math.floor(Math.random() * (fieldSize ** 2));
                if (!existed.includes(randomN)) {
                    _row.push(randomN);
                    existed.push(randomN);
                }
            }
            coords.push({row, col, x: col * cellSize, y: row * cellSize});
            finalStateRow.push(counter);
            counter++;
        }
        result.push(_row);
        finalState.push(finalStateRow);
    }
    finalState[finalState.length - 1][fieldSize - 1] = 0;
    return result;
}

function drawImage(imageObj, x, y, w, h) {
    if (w && h) {
        ctx.drawImage(imageObj, x, y, w, h);
    }
    ctx.drawImage(imageObj, x, y);
}

function drawPlayField() {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    if (bgImage) {
        drawImage(bgImage, 0, 0);
    }
    if (gameOver) {
        gameOverScreen()
    } else {
        for (let row = 0; row < playField.length; row++) {
            for (let col = 0; col < playField[row].length; col++) {

                const dx = col * cellSize;
                const dy = row * cellSize;

                if (playField[row][col]) {

                    ctx.beginPath();

                    if (hoveredItem && hoveredItem.x === dx && hoveredItem.y === dy) {
                        ctx.fillStyle = '#b0cbd7';
                    } else {
                        ctx.fillStyle = 'white';
                    }

                    ctx.rect(dx, dy, cellSize, cellSize);
                    ctx.fill();

                    ctx.strokeStyle = 'black';
                    ctx.stroke();

                    ctx.font = '50px monospace';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';

                    const txt = playField[row][col];
                    const measuredText = ctx.measureText(txt);
                    const offset = cellSize - measuredText.width;

                    ctx.fillText(playField[row][col], dx + offset / 2, dy + cellSize / 4);
                }
            }
        }
    }
    requestAnimationFrame(drawPlayField);
}

async function initGame() {
    await loadResourses();
    playField = initPlayField();
    drawPlayField();

    setInterval(() => {
        timeBlock.innerHTML = `<h3>Time: ${formatSeconds(++time)}</h3>`
    }, 1000)
}
initGame();