const highScoreList = document.getElementById('highScoresList');
var highScore = JSON.parse(localStorage.getItem('highScores'))|| [];
highScore = highScore.slice(0,5);
highScoreList.innerHTML =
highScore.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');