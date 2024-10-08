<<<<<<< HEAD
var gallery = document.querySelector('#gallery');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
var resizeAll = function () {
  var altura = getVal(gallery, 'grid-auto-rows');
  var gap = getVal(gallery, 'grid-row-gap');
  gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    var el = item;
    el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
  });
};

// Randomly display and resize each image
gallery.querySelectorAll('img').forEach(function (item) {
  item.classList.add('byebye');
  item.addEventListener('load', function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    var gitem = item.parentElement.parentElement;
    gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
    item.classList.remove('byebye');
  });
  
  // Generate random position and size for each image
  var randomX = Math.floor(Math.random() * window.innerWidth);
  var randomY = Math.floor(Math.random() * window.innerHeight);
  var randomWidth = Math.floor(Math.random() * 400) + 100; // Random width between 100 and 500
  var randomHeight = Math.floor(Math.random() * 300) + 100; // Random height between 100 and 400
  
  item.style.position = 'absolute';
  item.style.left = randomX + 'px';
  item.style.top = randomY + 'px';
  item.style.width = randomWidth + 'px';
  item.style.height = randomHeight + 'px';
});

window.addEventListener('resize', resizeAll);

gallery.querySelectorAll('.gallery-item').forEach(function (item) {
  item.addEventListener('click', function () {        
    item.classList.toggle('full');        
  });
});
=======
var gallery = document.querySelector('#gallery');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
var resizeAll = function () {
  var altura = getVal(gallery, 'grid-auto-rows');
  var gap = getVal(gallery, 'grid-row-gap');
  gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    var el = item;
    el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
  });
};

// Randomly display and resize each image
gallery.querySelectorAll('img').forEach(function (item) {
  item.classList.add('byebye');
  item.addEventListener('load', function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    var gitem = item.parentElement.parentElement;
    gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
    item.classList.remove('byebye');
  });
  
  // Generate random position and size for each image
  var randomX = Math.floor(Math.random() * window.innerWidth);
  var randomY = Math.floor(Math.random() * window.innerHeight);
  var randomWidth = Math.floor(Math.random() * 400) + 100; // Random width between 100 and 500
  var randomHeight = Math.floor(Math.random() * 300) + 100; // Random height between 100 and 400
  
  item.style.position = 'absolute';
  item.style.left = randomX + 'px';
  item.style.top = randomY + 'px';
  item.style.width = randomWidth + 'px';
  item.style.height = randomHeight + 'px';
});

window.addEventListener('resize', resizeAll);

gallery.querySelectorAll('.gallery-item').forEach(function (item) {
  item.addEventListener('click', function () {        
    item.classList.toggle('full');        
  });
});
>>>>>>> fb3515a658be7c813e6ee9374d269fc6816d5450
