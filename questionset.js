window.addEventListener("DOMContentLoaded", function(e) {
  const questionsContainer = document.querySelector(".questions");
  const body = document.querySelector("body"); 
  let upperDiv = document.querySelector(".upperDiv");
  
  class QuestionSet{
    constructor(questions){
      this.questions = [];
      for (let question of questions) {
        this.questions.push(new Question(question));
      }
    }
    list() {
      
      for (let question of this.questions) {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.setAttribute("data-id", question.id)
        let showQuestion = document.createElement("h3");
        questionDiv.append(showQuestion);
        showQuestion.classList.add("theQuiz");
        showQuestion.innerHTML = question.question;
        questionsContainer.append(questionDiv);
  
        let answerNumber = 0;
        for (const [key, answer] of Object.entries(question.answers)) {
          if (answer != null) {
            answerNumber++;
            let answerDiv = document.createElement("div");
            answerDiv.classList.add("answer");
            let firstP = document.createElement("p");
            firstP.classList.add("answerSelector");
            firstP.innerHTML = answerNumber;
            let label = document.createElement("label");
            label.classList.add("answerChoice");
            label.setAttribute("for", question.id + "-" + key);
            label.textContent = answer;
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "question_" + question.id);
            checkbox.setAttribute("id", question.id + "-" + key);
            checkbox.setAttribute("value", key);
            answerDiv.append(firstP);
            answerDiv.append(label);
            answerDiv.append(checkbox);
            questionDiv.append(answerDiv);
          }
        }
      }
      let completeQuizButton = document.createElement("button");
      completeQuizButton.innerHTML = "Complete quiz";
      completeQuizButton.classList.add("btn");
      completeQuizButton.classList.add("startBtn");
      questionsContainer.append(completeQuizButton);
      console.log(this.questions);
      const that = this;
      completeQuizButton.addEventListener("click", function(e) {
        that.summarizeScore(that.questions);
      });
    }
  
    summarizeScore(){
      let questions = document.querySelectorAll(".question");
      let score = 0;
      console.log(this.questions);
  
      for (const question of questions) {
        const questionId = parseInt(question.getAttribute("data-id"));
        const playerAnswers = question.querySelectorAll("[type='checkbox']:checked");
        
        const currentQuestion = Object.values(this.questions).filter(function (question) {
          return question.id === questionId;
        });
  
        const correctAnswers = currentQuestion[0].correct_answers;
  
        for (const playerAnswer of playerAnswers) {
          if (correctAnswers[playerAnswer.value + "_correct"] === "true") {
            score++;
          }
        }
      }
      questionsContainer.remove(questionsContainer);
      let finalDiv = document.createElement("div");
      finalDiv.classList.add("finalDiv");
      let finalUserScore = document.createElement("h2");
      finalUserScore.innerHTML = "Your final score is: " + score;
      let playAgain = document.createElement("h4");
      let playAgainButton = document.createElement("button");
      playAgainButton.innerHTML = "Play again";
      playAgainButton.classList.add("btn");
      playAgainButton.classList.add("startBtn");
      playAgain.innerHTML = "Would you like to play again?";
      finalUserScore.append(playAgain);
      finalDiv.append(finalUserScore);
      finalDiv.append(playAgainButton);
      body.append(finalDiv);
      
      playAgainButton.addEventListener("click", function(e) {
        finalDiv.remove();
        upperDiv.classList.remove("hide");
        body.append(questionsContainer);
        questionsContainer.innerHTML = "";
      });
      console.log(score);
    }
  }
  
  let button = document.getElementById("button");
      
  button.addEventListener("click", function(e) {
    let numberOfQuestions = document.querySelector(".numberOfQuestions").value;
    upperDiv.classList.add("hide");
    //console.log(numberOfQuestions);
    fetch(`https://quizapi.io/api/v1/questions?apiKey=KCL6vlHoXucS9J3xWehrJTI9Y3JX5zrcxhwPAGTG&category=code&difficulty=Easy&limit=${numberOfQuestions}&tags=JavaScript`)
        .then(response => response.json())
        .then(data => {
            let questions = new QuestionSet(data);
            questions.list();
        });
    });
  });
