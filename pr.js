let game = document.querySelector('.game');
let field = document.querySelector('.field');

let rowsNum = 20;
let colsNum = 25;
let gamers = ['gamer1', 'gamer2'];
let gamerNum = 0;


var rows = fillField(field, rowsNum, colsNum);
let FirstDiags = getFirstDiags(rows);
let SecondDiags = getSecondDiags(rows);
let cols = getColums(rows);
let lines = rows.concat(cols).concat(FirstDiags).concat(SecondDiags);

function returnGame() {
  console.log(field);
  field.innerHTML = '';
  rows = fillField(field, rowsNum, colsNum);
  FirstDiags = getFirstDiags(rows);
  SecondDiags = getSecondDiags(rows);
  cols = getColums(rows);
  lines = rows.concat(cols).concat(FirstDiags).concat(SecondDiags);
}

function isWin(gamers, lines) {
  for (let i = 0; i < gamers.length; i++) {
    if (checkWin(gamers[i], lines)) {
      endGame(gamers[i]);
      break;
    }
  }
}
function endGame(gamers) {
  console.log(gamers);
  let td = field.querySelectorAll('td');
  for (let i = 0; i < td.length; i++) {
    td[i].removeEventListener('click', cellClickHandler);
  }
  returnGame();
}
function checkWin(gamer, lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 4; j < lines[i].length; j++) {
      if (lines[i][j - 4].classList.contains(gamer) &&
        lines[i][j - 3].classList.contains(gamer) &&
        lines[i][j - 2].classList.contains(gamer) &&
        lines[i][j - 1].classList.contains(gamer) &&
        lines[i][j].classList.contains(gamer)) {
        return true;
      }
    }
  }
  return false;
}

function fillField(field, rowsNum, colsNum) {
  var rows = [];
  for (let i = 0; i < rowsNum; i++) {

    rows[i] = [];
    let tr = document.createElement('tr');

    for (let j = 0; j < colsNum; j++) {
      let td = document.createElement('td');
      rows[i][j] = td;
      tr.appendChild(td);
      td.addEventListener('click', cellClickHandler)
    }
    field.appendChild(tr);
  }
  return rows;
}

function getColums(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j] == undefined) {
        result[j] = [];
      }
      result[j][i] = arr[i][j];
    }
  }
  return result;
}
function getFirstDiags(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[i + j] == undefined) {
        result[i + j] = []
      }
      result[i + j].push(arr[i][j]);
    }
  }
  return result;
}
function getSecondDiags(arr) {
  return getFirstDiags(reverseSubArrs(arr));
}

function reverseSubArrs(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      if (result[i] == undefined) {
        result[i] = [];
      }
      result[i].push(arr[i][j]);
    }
  }
  return result;
}

function cellClickHandler() {
  this.classList.add(gamers[gamerNum]);
  this.removeEventListener('click', cellClickHandler);
  isWin(gamers, lines);
  gamerNum++;
  if (gamerNum == gamers.length) {
    gamerNum = 0;
  }
}

