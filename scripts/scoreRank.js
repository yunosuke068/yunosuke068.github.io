const mainWrapper = document.getElementById('rank');

//var requestURL = 'http://0.0.0.0:8000/scripts/scorerank.json';
var requestURL = 'http://localhost:3000/post'
console.log(requestURL);
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();


var scoreRanks;
request.onload = function() {
  scoreRanks = request.response;

  console.log(scoreRanks);
  //var myScore = document.createElement('div');

}
