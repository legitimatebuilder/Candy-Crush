var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;


window.onload = function () {
    startGame();

    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
};


function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; // candies from index 0-5.999... //
};


function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./CSS/Images/" + randomCandy() + ".png";

            // Drag Functionality //
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
};

function dragStart() {
    // this refers to the candy / tile, that was clicked on for dragging //
    currTile = this;
};

function dragOver(e) {
    e.preventDefault();
};

function dragEnter(e) {
    e.preventDefault();
};

function dragLeave() {

};

function dragDrop() {
    // this refers to the target tile that was dropped on  //
    otherTile = this;
};

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id = "0-0" -> ["0", "0"] //
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;

    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
};

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
};

function crushThree() {
    // Check Rows //
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candyOne = board[r][c];
            let candyTwo = board[r][c + 1];
            let candyThree = board[r][c + 2];
            if (candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")) {
                candyOne.src = "./CSS/Images/blank.png";
                candyTwo.src = "./CSS/Images/blank.png";
                candyThree.src = "./CSS/Images/blank.png";
                score += 30;
            }
        }
    }

    // Check Columns //
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candyOne = board[r][c];
            let candyTwo = board[r + 1][c];
            let candyThree = board[r + 2][c];
            if (candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")) {
                candyOne.src = "./CSS/Images/blank.png";
                candyTwo.src = "./CSS/Images/blank.png";
                candyThree.src = "./CSS/Images/blank.png";
                score += 30;
            }
        }
    }
};

function checkValid() {
    // Check Rows //
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candyOne = board[r][c];
            let candyTwo = board[r][c + 1];
            let candyThree = board[r][c + 2];
            if (candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")) {
                return true;
            }
        }
    }

    // Check Columns //
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candyOne = board[r][c];
            let candyTwo = board[r + 1][c];
            let candyThree = board[r + 2][c];
            if (candyOne.src == candyTwo.src && candyTwo.src == candyThree.src && !candyOne.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
};

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./CSS/Images/blank.png";
        }
    }
};

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./CSS/Images/" + randomCandy() + ".png";
        }
    }
};