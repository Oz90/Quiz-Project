/* Tankar kring koden
 En array som sparar alla svar användaren har valt, 
 för att sedan jämföra mot en array med de rätta svaren för att se om de är rätt?
 Något som uppdaterar "round count" på hemsidan varje gång man trycker på knappen "Ny fråga".
 Varje gång man trycker på knappen "ny fråga" 
 (Kanske byta till "Starta spel" och gråa ut den när man tryckt?) ska följande ske:
 1. En ny fråga kommer in under h3 taggens innerHTML. Hämtas från data[i].question
 2. Alla svarsalternativ kommer upp under respektive paragraf tagg. Hur löses detta?
 2 (forts). Möjligtvis en loop som loopar alla svarsalternativ data[i].answers[j]?
 3. Man ska kunna trycka på en knapp för nästa fråga 
 3 (forts). Ska det vara en separat knapp? Kanske två knappar så man kan gå fram och tillbaka mellan frågorna?
 4. På sista frågan (10) ska man kunna trycka på en Submit answers knapp.
 4 (forts). Hur progarmmerar man på bästa sätt för att få fram den knappen när man kommit till fråga 10?
 5. När man är färdig ska man kunna se hur många poäng man fick. Hur lösa detta?
 6. När man är färdig ska "Starta spel" knappen bli aktiv igen så man kan starta nytt spel.
 7. Ska användaren kunna välja hur många frågor som ska visas? 5-10?
*/

window.addEventListener("DOMContentLoaded", function(e) {
let theQuestion = document.getElementById("theQuiz");
let answerChoices = Array.from(document.getElementsByClassName("answerChoice"));
let rounds = document.getElementById("rounds");
let totalScore = document.getElementById("totalScore");

let currentQuestion = {};
let counter = 0;
let score = 0;
let totalQuestions = "";

let rightPoints = 1;

class Question {
  constructor(question) {
    this.id = question.id;
    this.question = question.question;
    this.answers = question.answers;
    this.correct_answers = question.correct_answers;
  }
}

class QuestionSet{
  constructor(questions){
    this.questions = [];
    for (let question of questions) {
      this.questions.push(new Question(question));
    }
  }
  list() {
    const questionsContainer = document.querySelector(".questions");
    
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
    console.log(score);
  }
}

let button = document.getElementById("button");
    
button.addEventListener("click", function(e) {
  let numberOfQuestions = document.querySelector(".numberOfQuestions").value;
  document.querySelector(".questions").innerHTML = "";
  button.classList.add("hide");
  //console.log(numberOfQuestions);
  fetch(`https://quizapi.io/api/v1/questions?apiKey=KCL6vlHoXucS9J3xWehrJTI9Y3JX5zrcxhwPAGTG&category=code&difficulty=Easy&limit=${numberOfQuestions}&tags=JavaScript`)
      .then(response => response.json())
      .then(data => {
          let questions = new QuestionSet(data);
          questions.list();
      });
  });
});




/* Kod på hur vi löste att hämta data från API på lektionen

window.addEventListener("DOMContentLoaded", function (e) {
    class User {
      constructor(name, lastname, mail) {
        this.name = name;
        this.lastname = lastname;
        this.mail = mail;
        this.addUser();
      }
  
      addUser() {
        let newRow = document.createElement("tr");
        let table = document.getElementById("table");
        table.appendChild(newRow);
  
        let newTdName = document.createElement("td");
        newTdName.innerHTML = this.name;
        newRow.appendChild(newTdName);
  
        let newTdLastname = document.createElement("td");
        newTdLastname.innerHTML = this.lastname;
        newRow.appendChild(newTdLastname);
  
        let newTdMail = document.createElement("td");
        newTdMail.innerHTML = this.mail;
        newRow.appendChild(newTdMail);
  
        let newTdDelete = document.createElement("td");
        newRow.appendChild(newTdDelete);
  
        let addDeleteBtn = document.createElement("button");
        addDeleteBtn.className = "btn btn-dark btn-sm float-right delete";
        addDeleteBtn.innerHTML = "X";
        newTdDelete.append(addDeleteBtn);
      }
    }
  
  
    let confirmBtn = document.getElementById("confirmBtn");
    confirmBtn.addEventListener("click", function (e) {
      let firstname_value = document.getElementById("input_name").value;
      let lastname_value = document.getElementById("input_lastname").value;
      let mail_value = document.getElementById("input_mail").value;
  
      let user = new User(firstname_value, lastname_value, mail_value);
    });
  
    let fetchBtn = document.getElementById("fetchBtn");
  
    fetchBtn.addEventListener("click", function (e) {
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => {
          let first = data.results[0].name.first;
          let last = data.results[0].name.last;
          let mail = data.results[0].email;
  
          let randomUser = new User(first, last, mail);
        });
    });
  
    let selectUsers = document.getElementById("totalUsers");
  
    selectUsers.addEventListener("change", function (e) {
      fetch("https://randomuser.me/api/?results=5")
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < Number(selectUsers.value); i++) {
            let gen_first = data.results[i].name.first;
            console.log(gen_first);
            let gen_last = data.results[i].name.last;
            console.log(gen_last);
            let gen_mail = data.results[i].email;
            console.log(gen_mail);
            let random_user = new User(gen_first, gen_last, gen_mail);
          }
        });
    });
  });*/
