  const questionsContainer = document.querySelector(".questions");
    
  class QuestionSet{
    constructor(questions){
      this.questions = [];
      for (let question of questions) {
        this.questions.push(new Question(question));
      }
    }

    // Add player method creates a new object of the player class.
    // passes the playername input as a parameter.
    addPlayer() {
    let playerName = document.getElementById("playerNameInput").value;
    let newPlayer = new Player(playerName);

    this.list(newPlayer);
    }
    
    //The list method lists everything in the browser, creates the DOM for the questions
    // and answers.
    // Is called when a player presses the start quiz button.
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
      // Declaring a variable for all "question class" elements
      // Question is a HTML-class is the div that includes a question and it's answers.
      let questions = document.querySelectorAll(".question");
  
      // Looping through every question on the page.
      // questionId is checking the specific ID of a question (parseInt changes a string to a number)
      // playerAnswers is checking which checkboxes a palyer has checked (the answers)
      for (const question of questions) {
        const questionId = parseInt(question.getAttribute("data-id"));
        const playerAnswers = question.querySelectorAll("[type='checkbox']:checked");
        let answerScore = 0;
        let scoreIsValid = false;
        
        // currentQuestion makes the questions object to an array (consisting of 5 questions) 
        // and filters that array to make a new array of every single question 
        const currentQuestion = Object.values(this.questions).filter(function (question) {
          return question.id === questionId;
        });
  
        // correctAnswers holds the correct_answers part of the question object (true/false/false/false)
        const correctAnswers = currentQuestion[0].correct_answers;

        //This loop checks every checkbox the player has chosen
        //and if that checkbox matches the correct_answer it will add a score to the player.
        for (const playerAnswer of playerAnswers) {
          if (correctAnswers[playerAnswer.value + "_correct"] === "true") {
            answerScore++;
            scoreIsValid = true;
          } else {
            scoreIsValid = false;
            break;
          }
        }

        if(scoreIsValid === true){
          newPlayer.addPlayerScore(answerScore);
        }
      }
      

      // Here I remove the questionsContainer with all questions and create new elements
      // That shows the players score and asks if they want to play again.
      const body = document.querySelector("body"); 
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
      finalDiv.append(finalUserScore);
      finalDiv.append(playAgain);
      finalDiv.append(playAgainButton);
      body.append(finalDiv);
      
      // Event listener on the play again button to re-create the DOM with the "select questions div".
      let topContainer = document.querySelector(".topContainer");
      playAgainButton.addEventListener("click", function(e) {
        finalDiv.remove();
        topContainer.classList.remove("hide");
        body.append(questionsContainer);
        questionsContainer.innerHTML = "";
      });
    }
  }
