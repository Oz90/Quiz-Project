window.addEventListener("DOMContentLoaded", () => {
  // Declaring startbutton and adding an event listener to start the game,
  // fetch the API and hide the upper container.
  let startButton = document.getElementById("button");
  let topContainer = document.querySelector(".topContainer");

  startButton.addEventListener("click", function(e) {
    topContainer.classList.add("hide");
    let numberOfQuestions = document.querySelector(".numberOfQuestions").value;
    let APIkey = "KCL6vlHoXucS9J3xWehrJTI9Y3JX5zrcxhwPAGTG";
    let url = `https://quizapi.io/api/v1/questions?apiKey=${APIkey}&category=code&difficulty=Easy&limit=${numberOfQuestions}&tags=JavaScript`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let questions = new QuestionSet(data);
        questions.addPlayer();
      });
  });
});
