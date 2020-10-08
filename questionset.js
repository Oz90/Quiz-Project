  const questionsContainer = document.querySelector(".questions");
  const body = document.querySelector("body"); 
  let topContainer = document.querySelector(".topContainer");
    
  class QuestionSet{
    constructor(questions){
      this.questions = [];
      for (let question of questions) {
        this.questions.push(new Question(question));
      }
    }
    // The list method is called when player starts the quiz
    // The list method lists all the questions from the API to the browser
    // and creates the DOM. 
    // The list method also has an event listener for the complete quiz button that calls
    // the summarizeScore
    addPlayer() {
    let playerName = document.getElementById("playerNameInput").value;
    let newPlayer = new Player(playerName);

    this.list(newPlayer);
    }

    list(newPlayer) {
      
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
        that.summarizeScore(newPlayer);
      });
    }


    // Method is called when player presses on "Complete Quiz"-button. 
    // Method checks correct answers and gives scores accordingly.
    // Also removes all the questions and creates a "final page" which lets you 
    // choose if you want to play again.
    summarizeScore(newPlayer){
      let questions = document.querySelectorAll(".question");
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
            //newPlayer.score = score++; //Varför assignas inte player klassens score? Står fortfarande 0?
            newPlayer.addPlayerScore(); //
          }
        }
        console.log(newPlayer);
      }
      

      // Here I remove the questionsContainer with all questions and create new elements
      // That shows the players score and asks if they want to play again.
      questionsContainer.remove(questionsContainer);
      let finalDiv = document.createElement("div");
      finalDiv.classList.add("finalDiv");
      let finalUserScore = document.createElement("h2");
      finalUserScore.innerHTML = `Well played ${newPlayer.name}! Your final score was: ${newPlayer.score}`;
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
      
      // Event listener on the play again button to re-create the DOM with the "select questions DIV".
      playAgainButton.addEventListener("click", function(e) {
        finalDiv.remove();
        topContainer.classList.remove("hide");
        body.append(questionsContainer);
        questionsContainer.innerHTML = "";
      });
      //console.log(score);
    }
  }
