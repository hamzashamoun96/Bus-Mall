'use strict';

var imagesContainer = document.getElementById('imagescontainer')
var leftimage = document.getElementById('left-image');
var centerimage = document.getElementById('center-image');
var rightimage = document.getElementById('right-image');

var leftindex;
var centerindex;
var rightindex;
var noleftrepeat = -1;
var nocenterrepeat = -1;
var norightrepeat = -1;
var defultrounds = 25;
var productsArray = [];
var Clicks = [];
var Seen = [];
var imagesArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Get rounds from user.

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
    this.percentage = 0;
    productsArray.push(this);
}

// Creating the products.

for (var i = 0; i < imagesArray.length; i++) {
    new Products(imagesArray[i], 'img/' + imagesArray[i] + '.jpg')
}

function randomthreeimages() {           // Generate random indices Function.
    return Math.floor(Math.random() * productsArray.length);
}

var makesure = function () {
    console.log(noleftrepeat, nocenterrepeat, norightrepeat)
    var ForbiddenNumber = [noleftrepeat, nocenterrepeat, norightrepeat];
    do {
        leftindex = randomthreeimages()
    } while (ForbiddenNumber.includes(leftindex))
    noleftrepeat = leftindex;
    ForbiddenNumber.push(noleftrepeat);

    do {
        centerindex = randomthreeimages()
    } while (ForbiddenNumber.includes(centerindex))
    nocenterrepeat = centerindex;
    ForbiddenNumber.push(nocenterrepeat);

    do {
        rightindex = randomthreeimages()
    } while (ForbiddenNumber.includes(rightindex))
    norightrepeat = rightindex;
}

var source = function (leftindex, centerindex, rightindex) {   // Display the images Function.
    leftimage.setAttribute('src', productsArray[leftindex].source)
    centerimage.setAttribute('src', productsArray[centerindex].source)
    rightimage.setAttribute('src', productsArray[rightindex].source)
}

// Generate random indices.
// Make sure they are different indices.
// Display the three images.

makesure();
source(leftindex, centerindex, rightindex);

// Listener Function when clicking on images.

var clickhandler = function (event) {
    //console.log(event.target.id);
    if (event.target.id === 'left-image') {       // The first 3 if statements to make sure that the viewer when click ONLY on images then clicks will be increment (because the images is inside a div)
        productsArray[leftindex].TimesClicked++
    } if (event.target.id === 'center-image') {
        productsArray[centerindex].TimesClicked++
    } if (event.target.id === 'right-image') {
        productsArray[rightindex].TimesClicked++
    }
    productsArray[leftindex].TimesSeen++
    productsArray[centerindex].TimesSeen++
    productsArray[rightindex].TimesSeen++

    productsArray[leftindex].percentage = Math.floor(productsArray[leftindex].TimesClicked / productsArray[leftindex].TimesSeen * 100)
    productsArray[centerindex].percentage = Math.floor(productsArray[centerindex].TimesClicked / productsArray[centerindex].TimesSeen * 100)
    productsArray[rightindex].percentage = Math.floor(productsArray[rightindex].TimesClicked / productsArray[rightindex].TimesSeen * 100)

    makesure();
    source(leftindex, centerindex, rightindex);

    defultrounds--;
    if (defultrounds === 0) {
        imagesContainer.removeEventListener('click', clickhandler);
    }
}

// Creating the list after clicking on Resultbottun.

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
        lilist.textContent = productsArray[i].Name + ' had ' + productsArray[i].TimesClicked + ' Votes , And Was Seen ' + productsArray[i].TimesSeen + ' Times ' + ' And The Percentage Is : ' + productsArray[i].percentage + ' % .';
        ResultButton.removeEventListener('click', ResultList);
        Clicks.push(productsArray[i].TimesClicked)
        Seen.push(productsArray[i].TimesSeen)
    }
    Chartresult()
}

ResultButton.addEventListener('click', ResultList);
imagescontainer.addEventListener('click', clickhandler);

function Chartresult() {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: imagesArray,
            datasets: [{
                label: 'Votes',
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderColor: 'rgb(255, 99, 132)',
                data: Clicks
            },
                {
                    label: 'Seen',
                    backgroundColor: 'rgba(0, 99, 132, 0.6)',
                    borderColor: 'rgb(255, 255, 255)',
                    data: Seen
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
    var chartcolor = document.getElementById('myChart')
    chartcolor.setAttribute("style","background :cornflowerblue ; ")
}

































/* var ctx = document.getElementById('myChart').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: imagesArray,
         datasets: [{
             label: 'Votes',
             data: Clicks,
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)'],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)',
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)'
             ],
             borderWidth: 1
         }],
         datasets: [{
             label: 'Seen',
             data: Seen,
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 206, 86, 0.2)'],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)',
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 1)'
             ],
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero: true
                 }
             }]
         }
     }
 });
*/