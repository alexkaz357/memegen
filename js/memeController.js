'use strict';

const gCanvas = document.getElementById('canvas');
const gCtx = gCanvas.getContext('2d');

function init() {
  createImages();
  drawMeme();
  renderGallery()
}

function drawMeme() {
  const img = new Image();
  img.onload = () => {
    clearCanvas();
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    onWrite();
  }
  let imgUrl = getImg().url;
  img.src = `${imgUrl}`;
}

function onWrite() {
  let text = document.querySelector('#text').value;
  let lines = getLines();
  // let lineIdx = getLineIdx()
  setText(text);
  lines.forEach(line => {
    drawText(line.txt, line.size, 100, line.positionY);
  });
}

// drawText(getText(), getFontSize(), 150, getTextPosition());

function drawText(text, fontSize, x, y) {
  gCtx.lineWidth = '3';
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = `${fontSize}px Impact`;
  gCtx.textAlign = 'center';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderGallery() {
  let elGallery = document.querySelector('.gallery');
  let imgs = getImgs();
  let strHtml = '';
  imgs.forEach(img => {
    strHtml += `<img src="${img.url}" data-id="${img.id}" onclick="onImgClick(this)"></img>`;
  });
  elGallery.innerHTML = strHtml;
}

function onImgClick(elImg) {
  let imgID = +elImg.dataset.id;
  setSelectedImgId(imgID);
  drawMeme();
}

function onIncrease(val) {
  setFontSize(val);
  drawMeme();
}

function onDecrease(val) {
  setFontSize(val);
  drawMeme();
}

function onUp(val) {
  setTextPosition(val);
  drawMeme();
}

function onDown(val) {
  setTextPosition(val);
  drawMeme();
}

function onSwitchLine() {
  document.querySelector('#text').value = '';
  setLineIdx();
  getLineIdx();
}