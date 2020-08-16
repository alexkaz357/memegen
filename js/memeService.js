'use strict';

let gImgs = [];
let gImgCount = 18;

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: []
}

function reset() {
  gMeme.lines = [];
  // let lines = gMeme.lines;
  // lines.forEach(line => {
  //   line.txt = '';
  //   line.align = 'center';
  //   line.color = '#ffffff';
  //   line.size = 50;
  //   line.font = 'Impact';
  // });
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
  if (gMeme.lines.length === 1) {
    line.positionY = 450;
  } else if (gMeme.lines.length === 2) {
    line.positionY = 300;
  }
  return line;
}

function addLine() {
  if (gMeme.lines.length === 3) return;
  gMeme.lines.push(createLine());
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
  if (gMeme.lines.length === 0) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
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

function getCurrline() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setLineIdx() {
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0;
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