window.addEventListener("DOMContentLoaded", function(e) {
    let finalScore = document.getElementById("finalScore");
    let scores = 0;
    let playerScore = localStorage.getItem("playerScore");

    finalScore.innerHTML = playerScore;

    // givePoints = num => {
    //     scores += num;
    //     finalScore.innerHTML = scores;
    // };
})