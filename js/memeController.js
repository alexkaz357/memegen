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
window.addEventListener('keypress', firstKeyPress);

let gTextVal;
let gSavedMemes = [];
let gIsWriting = false;
let gIsKeyPressed = false;

function init() {
  screenWidth();
  createImages();
  renderGallery();
  loadMemes();
  gIsWriting = false;
  gIsKeyPressed = false;
}

function firstKeyPress() {
  gIsKeyPressed = true;
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
  if (!gIsWriting) {
    gTextVal = 'new line'
    gIsWriting = true;
  }
  setText(gTextVal);
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
  addLine();
  hideGallery();
  document.querySelector('.canvas-container').style.visibility = 'visible';
  let imgID = +elImg.dataset.id;
  setSelectedImgId(imgID);
  drawMeme();
}

function onGallery() {
  document.querySelector('.gal').classList.add('target');
  document.querySelector('.mem').classList.remove('target');
  showGallery();
  document.querySelector('.saved-memes').style.display = 'none';
  toggleMenu();
  document.querySelector('.canvas-container').style.visibility = 'hidden';
  document.querySelector('.color-btn').style.display = 'block';
  reset();
  emptyImput();
}

function onDelete() {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  emptyImput();
  deleteLine();
  drawMeme();
}

function emptyImput() {
  document.querySelector('#text').value = '';
}

function onIncrease(val) {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  setFontSize(val);
  drawMeme();
}

function onDecrease(val) {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  setFontSize(val);
  drawMeme();
}

function onUp(val) {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  setTextPositionY(val);
  drawMeme();
}

function onDown(val) {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  setTextPositionY(val);
  drawMeme();
}

function onSwitchLine() {
  if (!gIsKeyPressed) return;
  if (!gIsWriting) return;
  if (getLines().length === 0) return;
  document.querySelector('#text').value = '';
  setLineIdx();
  document.querySelector('#text').value = getText();
}

function onAddLine() {
  if (getLines().length > 2) return;
  if (!gIsKeyPressed) return;
  addLine();
  drawMeme();
  onSwitchLine();
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
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
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
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  let font = document.querySelector('.editor #fonts').value;
  setFont(font);
  drawMeme();
}

function onColorText() {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  document.querySelector('.color-btn').style.display = 'none';
}

function onColorChange(val) {
  if (getLines().length === 0) return;
  if (!gIsKeyPressed) return;
  setColor(val);
  drawMeme();
}

function onSave() {
  const data = gCanvas.toDataURL();
  gSavedMemes.push(data);
  saveToStorage('memes', gSavedMemes);
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
  hideGallery();
  addToSaved();
  document.querySelector('.saved-memes').style.display = 'block';
  toggleMenu();
  document.querySelector('.canvas-container').style.visibility = 'hidden';
  document.querySelector('.color-btn').style.display = 'block';
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
  if (window.innerWidth <= 650) {
    elI.forEach(el => {
      el.classList.remove('fa-3x');
    })
  }
}