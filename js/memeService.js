'use strict';

let gImgs = [];
let gImgCount = 18;
let gLineNum = 1;

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: []
}

function reset() {
  let lines = gMeme.lines;
  lines.forEach(line => {
    line.txt = '';
    line.align = 'center';
    line.color = '#ffffff';
    line.size = 50;
    line.font = 'Impact';
  });
  gLineNum = 1;
}

function createLine() {
  let line = {
    txt: 'new line',
    align: 'center',
    color: '#ffffff',
    size: 50,
    font: 'Impact',
    positionX: gCanvas.width / 2,
    positionY: 100
  }
  if (gLineNum === 2) {
    line.positionY = 450;
  } else if (gLineNum === 3) {
    line.positionY = gCanvas.height / 2;
  }
  gLineNum++;
  return line;
}

function addLine() {
  if (gLineNum > 3) return;
  gMeme.lines.push(createLine());
}

function deleteLine() {
  gLineNum--;
  if (gLineNum < 2) {
    gLineNum = 1;
    gMeme.selectedLineIdx = 0;
    return;
  }
  gMeme.lines.pop();
}

function createImages() {
  for (let i = 1; i <= gImgCount; i++) {
    let img = {
      id: i,
      url: `img/${i}.jpg`
    }
    gImgs.push(img);
  }
}

function getImg() {
  return gImgs[gMeme.selectedImgId - 1];
}

function getLines() {
  return gMeme.lines;
}

function setText(text) {
  if (!text) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function getText() {
  return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setFontSize(val) {
  gMeme.lines[gMeme.selectedLineIdx].size += val;
}

function setTextPositionX(val) {
  gMeme.lines[gMeme.selectedLineIdx].positionX = val;
}

function setTextPositionY(val) {
  gMeme.lines[gMeme.selectedLineIdx].positionY += val;
}

function setLineIdx() {
  gMeme.selectedLineIdx++;
  if (gMeme.selectedLineIdx === 3) gMeme.selectedLineIdx = 0;
}

function setSelectedImgId(id) {
  gMeme.selectedImgId = id;
}

function getSelectedImgId() {
  return gMeme.selectedImgId;
}

function getImgs() {
  return gImgs;
}

function setAlign(alignDirection) {
  gMeme.lines[gMeme.selectedLineIdx].align = alignDirection;
  if (alignDirection === 'start') setTextPositionX(20);
  else if (alignDirection === 'center') setTextPositionX(250);
  else if (alignDirection === 'end') setTextPositionX(480);
}

function setFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}