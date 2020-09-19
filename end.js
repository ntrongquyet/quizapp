const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const currentScore = sessionStorage.getItem('currentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
finalScore.innerText = currentScore;
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})



saveHighScore = e => {
    e.preventDefault();
    var score = {
        score: currentScore,
        name: username.value
    };
    if (score.score != null || score.name != null) {
        highScores.push(score);
        highScores.sort((a, b) => {
            return b.score-a.score;
        })
    }
    localStorage.setItem('highScores',JSON.stringify(highScores));
    alert("Score is saved!!!");
    saveScoreBtn.disabled = true;

}