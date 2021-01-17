'use strict';

var imagesContainer = document.getElementById('imagescontainer')
var leftimage = document.getElementById('left-image');
var centerimage = document.getElementById('center-image');
var rightimage = document.getElementById('right-image');

var leftindex;
var centerindex;
var rightindex;
var defultrounds = 25;
var productsArray = [];
var imagesArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var forminput = document.getElementById('forminput');
forminput.addEventListener('submit', selectyourround);

function selectyourround(event) {
    event.preventDefault();
    var userround = event.target.UserRounds.value;
    defultrounds = userround;
}

// creating constructor. 

function Products(Name, source) {
    this.Name = Name;
    this.source = source;
    this.TimesClicked = 0;
    this.TimesSeen = 0;
    productsArray.push(this);
}
for (var i = 0; i < imagesArray.length; i++) {
    new Products(imagesArray[i], 'img/' + imagesArray[i] + '.jpg')
}
//console.log(productsArray);

function randomthreeimages() {
    return Math.floor(Math.random() * productsArray.length);
}
var makesure = function () {
    leftindex = randomthreeimages()
    centerindex = randomthreeimages()
    rightindex = randomthreeimages()
    while (leftindex === centerindex || leftindex === rightindex || centerindex === rightindex) {
        centerindex = randomthreeimages()
        rightindex = randomthreeimages()
    }
}

var source = function (leftindex, centerindex, rightindex) {
    leftimage.setAttribute('src', productsArray[leftindex].source)
    centerimage.setAttribute('src', productsArray[centerindex].source)
    rightimage.setAttribute('src', productsArray[rightindex].source)
}
makesure();
source(leftindex, centerindex, rightindex);

var clickhandler = function (event) {
    console.log(event.target.id);
    if (event.target.id === 'left-image') {
        productsArray[leftindex].TimesClicked++
    } if (event.target.id === 'center-image') {
        productsArray[centerindex].TimesClicked++
    } if (event.target.id === 'right-image') {
        productsArray[rightindex].TimesClicked++
    }
    productsArray[leftindex].TimesSeen++
    productsArray[centerindex].TimesSeen++
    productsArray[rightindex].TimesSeen++

    defultrounds--;

    makesure();
    source(leftindex, centerindex, rightindex);

    if (defultrounds === 0) {
        imagesContainer.removeEventListener('click', clickhandler);

    }
}

var ResultList = function () {
    var listcontainter;
    var ullist;
    var lilist;
    listcontainter = document.getElementById('listcontainer')
    ullist = document.createElement('ul');
    listcontainter.appendChild(ullist);
    for (var i = 0; i < productsArray.length; i++) {
        lilist = document.createElement('li');
        ullist.appendChild(lilist);
        lilist.textContent = productsArray[i].Name + ' had ' + productsArray[i].TimesClicked + ' Votes , And Was Seen ' + productsArray[i].TimesSeen + ' Times';
        ResultButton.removeEventListener('click', ResultList);
    }
}

ResultButton.addEventListener('click', ResultList);
imagesContainer.addEventListener('click', clickhandler);