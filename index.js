
var score = 0;
var cellArray = [];
var rows = 4;
var cols = 4;
var oldIndices = [];
var newIndices = [];


function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 16); // 0 - 15
    var randomGenerate = (Math.floor(Math.random() * 2) + 1) * 2; // 2 or 4
    var cell = document.getElementsByClassName("text");

    for (i = 0; i < rows; i++) {
        cellArray[i] = [];
        for (j = 0; j < cols; j++) {
        cellArray[i][j] = cell[i * cols + j];
        }
    }

    while (cellArray[Math.floor(randomNumber / 4)][randomNumber % 4].textContent != "") {
        randomNumber = Math.floor(Math.random() * 16); // 0 - 15
    }
    cellArray[Math.floor(randomNumber / 4)][randomNumber % 4].textContent = randomGenerate;
}

generateRandomNumber();

document.addEventListener("keydown", function(event) {
    if (event.code == "ArrowLeft") {
        mergeCells("left");
    } else if (event.code == "ArrowUp") {
        mergeCells("up");
    } else if (event.code == "ArrowRight") {
        mergeCells("right");
    } else if (event.code == "ArrowDown") {
        mergeCells("down");
    }
});

document.querySelector(".reset-button").addEventListener("click", resetGame);
var hightestScore = 0;

fetch("./data/score.json")
    .then(response => response.json())
    .then(data => {hightestScore = data;});

function mergeCells(direction) {
    switch (direction) {
        case "left":
            oldIndices = checkBlank();
            mergeLeft();
            if (checkGameOver()) {
                alert("Game Over! Your score is: " + score);
            }
            updateScore();
            newIndices = checkBlank();
            if (oldIndices != newIndices) {
                generateRandomNumber();
            };
            break;
        case "up":
            oldIndices = checkBlank();
            mergeUp();
            if (checkGameOver()) {
                alert("Game Over! Your score is: " + score);
            }
            updateScore()
            newIndices = checkBlank();
            if (oldIndices != newIndices) {
                generateRandomNumber();
            };
            break;
        case "right":
            oldIndices = checkBlank();
            mergeRight();
            if (checkGameOver()) {
                alert("Game Over! Your score is: " + score);
            }
            updateScore()
            newIndices = checkBlank();
            if (oldIndices != newIndices) {
                generateRandomNumber();
            };
            break;
        case "down":
            oldIndices = checkBlank();
            mergeDown();
            if (checkGameOver()) {
                alert("Game Over! Your score is: " + score);
            }
            updateScore()
            newIndices = checkBlank();
            if (oldIndices != newIndices) {
                generateRandomNumber();
            };
            break;
        default:
            console.log("Invalid direction");
            break;
        }
}

function mergeLeft() {
    for (i = 0; i < rows; i++) {
        var newRow = cellArray[i].filter(function(cell) {
            return cell.textContent != "";
        }
        );
        for (j = 0; j < newRow.length - 1; j++) {
            if (newRow[j].textContent == newRow[j + 1].textContent) {
                newRow[j].textContent *= 2;
                score += parseInt(newRow[j].textContent);
                newRow[j + 1].textContent = "";
            }
        }
        newRow = newRow.filter(function(cell) {
            return cell.textContent != "";
        });
        for (j = 0; j < cols; j++) {
            if (j < newRow.length) {
                cellArray[i][j].textContent = newRow[j].textContent;
            } else {
                cellArray[i][j].textContent = "";
            }
        };
    };
    
}

function mergeRight() {
    for (i = 0; i < rows; i++) {
        var newRow = cellArray[i].filter(function(cell) {
            return cell.textContent != "";
        }
        ).reverse();
        for (j = 0; j < newRow.length - 1; j++) {
            if (newRow[j].textContent == newRow[j + 1].textContent) {
                newRow[j].textContent *= 2;
                score += parseInt(newRow[j].textContent);
                newRow[j + 1].textContent = "";
            }
        }
        newRow = newRow.filter(function(cell) {
            return cell.textContent != "";
        });
        for (j = 0; j < cols; j++) {
            if (j < newRow.length) {
                cellArray[i][cols - j - 1].textContent = newRow[j].textContent;
            } else {
                cellArray[i][cols - j - 1].textContent = "";
            }
        };
    };
}

function mergeUp() {
    for (j = 0; j < cols; j++) {
        var newCol = [];
        for (i = 0; i < rows; i++) {
            if (cellArray[i][j].textContent != "") {
                newCol.push(cellArray[i][j]);
            }
        }
        for (i = 0; i < newCol.length - 1; i++) {
            if (newCol[i].textContent == newCol[i + 1].textContent) {
                newCol[i].textContent *= 2;
                score += parseInt(newCol[i].textContent);
                newCol[i + 1].textContent = ""
            }
        }
        newCol = newCol.filter(function(cell) {
            return cell.textContent != "";
        });
        for (i = 0; i < rows; i++) {
            if (i < newCol.length) {
                cellArray[i][j].textContent = newCol[i].textContent;
            } else {
                cellArray[i][j].textContent = "";
            }
        }
    }
}

function mergeDown() {
    for (j = 0; j < cols; j++) {
        var newCol = [];
        for (i = 0; i < rows; i++) {
            if (cellArray[i][j].textContent != "") {
                newCol.push(cellArray[i][j]);
            }
        }
        newCol.reverse()
        for (i = 0; i < newCol.length - 1; i++) {
            if (newCol[i].textContent == newCol[i + 1].textContent) {
                newCol[i].textContent *= 2;
                score += parseInt(newCol[i].textContent);
                newCol[i + 1].textContent = ""
            }
        }
        newCol = newCol.filter(function(cell) {
            return cell.textContent != "";
        }); 
        for (i = 0; i < rows; i++) {
            if (i < newCol.length) {
                cellArray[rows - i - 1][j].textContent = newCol[i].textContent;
                cellArray[rows - i - 1][j].textContent
                
            } else {
                cellArray[rows - i - 1][j].textContent = ""
                cellArray[rows - i - 1][j].classList
            }
        }
    }
}

function checkGameOver() {
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (cellArray[i][j].textContent == "") {
                return false; // Game is not over
            }
            if (i < rows - 1 && cellArray[i][j].textContent == cellArray[i + 1][j].textContent) {
                return false; // Game is not over
            }
            if (j < cols - 1 && cellArray[i][j].textContent == cellArray[i][j + 1].textContent) {
                return false; // Game is not over
            }
        }
    }
    return true; // Game is over
}

function updateScore() {
    document.querySelector(".score-value").innerHTML = score
    if (score > hightestScore) {
        document.querySelector(".best-score-value").innerHTML = score

        // need to use node js on updating score
        // var scoreData = {"score": score}
        // var jsonString = JSON.stringify(scoreData, null, 2)

        // writeFile('./data/score.json', jsonString, (err) => {
        // if (err) {
        //     console.error('Error writing JSON file:', err);
        //     return;
        // }
        // console.log('JSON file has been saved as data.json');
        // });
    }
}


function resetGame() {
    score = 0;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            cellArray[i][j].textContent = "";
        }
    }
    generateRandomNumber();
}

function checkBlank() {
    var cell1DArray = cellArray.flat();
    var indices = [];

    cell1DArray.forEach((item, index) => {
        if (item.textContent === "") {
        indices.push(index);
        }
    });
    return indices
}