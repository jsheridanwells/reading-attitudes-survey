//select elements
var button = document.getElementById('next-button');
var imgs = document.querySelectorAll('.garfield');
var questionText = document.getElementById('question');
var surveyPage = document.querySelector('.survey');
var resultsPage = document.querySelector('.results');
var recScore = document.getElementById('rec-score');
var acadScore = document.getElementById('acad-score');
var composite = document.getElementById('composite');
var printButton = document.getElementById('print-button');

//tally scores for each image clicked
var count = 0;
var imgVal = 0;
var recCount = 0;
var acadCount = 0;

//print the next question
function printQues(el, array, i) {
  el.innerHTML = array[i];
}

//change borders of selected image
function setSelected() {
	setDefault();
	this.setAttribute('class', 'selected-border garfield');
}

//restore borders to all images
function setDefault() {
	for (i = 0; i < imgs.length; i++) {
		imgs[i].className = 'default-border garfield';
	}
}

//get value of image id and holds in imgVal
function getImgVal() {
	var elId = this.id;
	if (elId === 'one') {
		imgVal = 1;
	} else if (elId === 'two') {
		imgVal = 2;
	} else if (elId === 'three') {
		imgVal = 3;
	} else if (elId === 'four') {
		imgVal = 4;
	}
}

//record imgVal as either recCount or acadCount
function recordImgVal(count, imgVal) {
    if (count <= 11) {
    	recCount += imgVal;
    } else {
    	acadCount += imgVal;
    }
}

//after question#20, hide survey layout, show results layout
function showResults() {
    surveyPage.className = 'hidden';
    resultsPage.className = 'container results';
    console.log('working');
}

//calculate scores for recreational and academic reading.  
function calcScore(val, total) {
	return Math.round((val / total) * 100);
}

//bind calculations to spans on results page
function bindScores() {
	recScore.innerHTML = calcScore(recCount, 40);
	acadScore.innerHTML = calcScore(acadCount, 40);
	composite.innerHTML = ((recCount + acadCount) / 80) * 100;
}

//call all functions attached to next button
function nextQues() {
  button.innerHTML = 'Next';
  printQues(questionText, questions, count);
  count++;
  setDefault();
  recordImgVal(count, imgVal);
  if (count > 20) {
  	showResults();
  	bindScores();
  }
}

//bind nextQues to button
button.addEventListener('click', nextQues);

//bind selecting functions to images
for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', setSelected);
}
for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', getImgVal);
}

//bind scores to spans on results page
bindScores();

//when start button clicked, change start-page to hidden
var startPage = $('#start-page');
var startButton = $('#start-button');
var survey = $('#survey');

$(startButton).click(function() {
	startPage.addClass('hidden');
	//unhide questions container
	$(survey).removeClass('hidden');
});










