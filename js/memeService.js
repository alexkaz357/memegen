'use strict';

let gImgs = [];
let gImgCount = 2;

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{
      txt: '',
      align: '',
      color: '',
      size: 50,
      positionY: 50
    },
    {
      txt: '',
      align: '',
      color: '',
      size: 50,
      positionY: 150
    }
  ]
}

// let gKeywordsMap = {
//   'happy': 12,
//   'funny puk': 1
// }

function createImages() { //////////////reduce ?
  for (let i = 1; i <= gImgCount; i++) {
    let img = {
      id: i,
      url: `img/${i}.jpg`,
      // keywords: ['happy']
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

function setText(text = '') {
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

// function getText() {
//   return gMeme.lines[gMeme.selectedLineIdx].txt;
// }

function setFontSize(val) {
  gMeme.lines[gMeme.selectedLineIdx].size += val;
}

// function getFontSize() {
//   return gMeme.lines[gMeme.selectedLineIdx].size;
// }

function setTextPosition(val) {
  gMeme.lines[gMeme.selectedLineIdx].positionY += val;
}

// function getTextPosition() {
//   return gMeme.lines[gMeme.selectedLineIdx].positionY;
// }

function setLineIdx() {
  gMeme.selectedLineIdx === 0 ? gMeme.selectedLineIdx = 1 : gMeme.selectedLineIdx = 0;
}

function getLineIdx() {
  return gMeme.selectedLineIdx;
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