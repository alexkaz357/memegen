'use strict';

const gCanvas = document.getElementById('canvas');
const gCtx = gCanvas.getContext('2d');
const gWidth = gCanvas.width;
const gHeight = gCanvas.height;

const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');
const closeFooter = document.querySelector('.modal-footer');

closeBtn.addEventListener('click', closeModal);
closeFooter.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

let gTextVal;
let gSavedMemes = [];
let gIsSaving = false;

function init() {
  screenWidth();
  createImages();
  renderGallery();
  loadMemes();
  gTextVal = '';
}

function drawMeme() {
  const img = new Image();
  img.onload = () => {
    clearCanvas();
    gCtx.drawImage(img, 0, 0, gWidth, gHeight);
    onWrite();
  }
  let imgUrl = getImg().url;
  img.src = `${imgUrl}`;
}

function onWrite() {
  gTextVal = document.querySelector('#text').value;
  let lines = getLines();
  if (getLines().length === 0) addLine();
  setText(gTextVal);
  if (!gIsSaving) drawCurrLine();
  gIsSaving = false;
  lines.forEach(line => {
    drawText(line.txt, line.color, line.size, line.font, line.align, line.positionX, line.positionY);
  });
}

function drawText(text, color, fontSize, font, align, x, y) {
  gCtx.lineWidth = '2';
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = `${color}`;
  gCtx.font = `${fontSize}px ${font}`;
  gCtx.textAlign = `${align}`;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function drawRect(x, y, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  gCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  gCtx.fillRect(x - width / 2, y, width, height);
}

function drawCurrLine() {
  let line = getCurrline();
  drawRect(gWidth / 2, line.positionY - line.size + 50, gWidth, 10);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gWidth, gHeight);
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
  hideGallery();
  document.querySelector('.canvas-container').style.visibility = 'visible';
  let imgID = +elImg.dataset.id;
  setSelectedImgId(imgID);
  onAddLine();
}

function onGallery() {
  document.querySelector('.gal').classList.add('target');
  document.querySelector('.mem').classList.remove('target');
  document.querySelector('.saved-memes').style.display = 'none';
  document.querySelector('.canvas-container').style.visibility = 'hidden';
  document.querySelector('.color-btn').style.display = 'block';
  showGallery();
  toggleMenu();
  reset();
  emptyImput();
}

function onDelete() {
  emptyImput();
  deleteLine();
  drawMeme();
}

function emptyImput() {
  document.querySelector('#text').value = '';
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
  setTextPositionY(val);
  drawMeme();
}

function onDown(val) {
  setTextPositionY(val);
  drawMeme();
}

function onSwitchLine() {
  if (getLines().length === 0 || getLines().length === 1) return;
  setLineIdx();
  getCurrline();
  emptyImput();
  document.querySelector('#text').value = getText();
  drawCurrLine();
  drawMeme();
}

function onAddLine() {
  addLine();
  // setLineIdx();
  emptyImput()
  drawMeme();
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function showGallery() {
  document.querySelector('.images').style.display = 'block';
}

function hideGallery() {
  document.querySelector('.images').style.display = 'none';
}

function onAlignText(align) {
  let alignDirection = align.dataset.align;
  setAlign(alignDirection);
  drawMeme();
}

function onDownload(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'meme.jpg';
}

function onChangeFont() {
  let font = document.querySelector('.editor #fonts').value;
  setFont(font);
  drawMeme();
}

function onColorText() {
  document.querySelector('.color-btn').style.display = 'none';
}

function onColorChange(val) {
  setColor(val);
  drawMeme();
}

function onSave() {
  gIsSaving = true;
  drawMeme();
  setTimeout(function () {
    const data = gCanvas.toDataURL();
    gSavedMemes.push(data);
    saveToStorage('memes', gSavedMemes);
    gIsSaving = false;
    drawMeme();
  }, 100);
}

function loadMemes() {
  gSavedMemes = loadFromStorage('memes');
  if (!gSavedMemes) gSavedMemes = [];
}

function addToSaved() {
  loadMemes();
  let elSavedGallery = document.querySelector('.saved-gallery');
  let strHtml = '';
  gSavedMemes.forEach(img => {
    strHtml += `<img src="${img}" onclick=""></img>`;
  });
  elSavedGallery.innerHTML = strHtml;
}

function onMemes() {
  document.querySelector('.gal').classList.remove('target');
  document.querySelector('.mem').classList.add('target');
  document.querySelector('.saved-memes').style.display = 'block';
  toggleMenu();
  document.querySelector('.canvas-container').style.visibility = 'hidden';
  document.querySelector('.color-btn').style.display = 'block';
  hideGallery();
  addToSaved();
  reset();
  emptyImput();
}

function openModal() {
  toggleMenu();
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function screenWidth() {
  let elI = document.querySelectorAll('i');
  let elIncrease = document.querySelector('.fa-long-arrow-alt-up');
  let elDecrease = document.querySelector('.fa-long-arrow-alt-down');
  if (window.innerWidth <= 650) {
    elI.forEach(el => {
      el.classList.remove('fa-3x');
    });
    elIncrease.classList.add('fa-2x');
    elDecrease.classList.add('fa-2x');
  }
}