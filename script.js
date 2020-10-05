let theQuestion = document.getElementById("theQuiz");
let answerChoices = Array.from(document.getElementsByClassName("answerChoice"));
let rounds = document.getElementById("rounds");
let totalScore = document.getElementById("totalScore");

let currentQuestion = {};
let counter = 0;
let score = 0;
let totalQuestions = [];

let rightPoints = 1;

let questionsArray = [
  {
    question: "Tja där",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 1
  },
  {
    question: "Hej hej",
    choice1: "answer1",
    choice2: "answer2da",
    choice3: "answer3sadg",
    choice4: "answer4",
    choice5: "answer5gdsa",
    choice6: "answer6dgsa",
    answer: 2
  },
  {
    question: "Fråga 1",
    choice1: "answer1",
    choice2: "answer2325",
    choice3: "answer3325",
    choice4: "answer4523",
    choice5: "answer5253",
    choice6: "answer6235",
    answer: 3
  },
  {
    question: "Fråga 9",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 2
  },
  {
    question: "VagFråga 7öri",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 6
  },
  {
    question: "VagFråga 444öri",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 4
  },
  {
    question: "VagFråga 55555öri",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 5
  },
  {
    question: "VagFråga 333333öri",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 3
  },
  {
    question: "VagFråga 22222",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 2
  },
  {
    question: "VagFråga 11111",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
    choice5: "answer5",
    choice6: "answer6",
    answer: 1
  }
];
/*fetch("https://quizapi.io/api/v1/questions?apiKey=KCL6vlHoXucS9J3xWehrJTI9Y3JX5zrcxhwPAGTG&category=code&difficulty=Easy&limit=10&tags=JavaScript")
.then(response => response.json())
.then(data => {
  console.log(data)
  data.map (data => {
    let newQuestion = {
      question: data.question
    };

    let answerChoices = [... data.]
  }) 
});


startQuiz = () => {
  score = 0;
  counter = 0;
  totalQuestions = [...questionsArray];
  console.log(totalQuestions);
  nextQuestion();
};*/

nextQuestion = () => {
  if (totalQuestions.length === 0 || counter >= 10) {
    localStorage.setItem("playerScore", score);
    return window.location.assign("/score.html");
  }
  counter++;
  rounds.innerHTML = counter;
  console.log(counter);

    let questions = Math.floor(Math.random() * totalQuestions.length);
    currentQuestion = totalQuestions[questions];
    theQuestion.innerHTML = currentQuestion.question;
  
    answerChoices.forEach(choice => {
      let number = choice.dataset["number"];
      choice.innerHTML = currentQuestion["choice" + number];
    });
  
    totalQuestions.splice(questions, 1);
};

answerChoices.forEach(choice => {
  choice.addEventListener("click", e => {
    let selected = e.target;
    let pickedAnswer = selected.dataset["number"];

    let giveClass = "wrong";
    if (pickedAnswer == currentQuestion.answer) {
      giveClass = "right";
    }

    if(giveClass === "right") {
        givePoints(rightPoints);
    }
    nextQuestion();
  });
});

givePoints = num => {
    score += num;
    totalScore.innerHTML = score;
};

startQuiz();
/*window.addEventListener("DOMContentLoaded", function(e) {
    let button = document.getElementById("button");

    button.addEventListener("click", function(e) {
        
    })
})*/


/* MICKES LÖSNING
Det finns olika sätt att få in resultatet från ett fetch-anrop till en klass. 
Jag förstår att det här med promises ställer till det för er. 
Här är ett förslag på hur man skulle kunna göra. 
Nån som har ett bra await-förslag att dela med sig av?

class Question {
    constructor(question) {
        this.id = question.id;
        this.question = question.question;
        this.description = question.description;
        this.answers = question.answers;

    }
}

class QuestionSet {
    constructor(questions) {
        this.questions = [];

        for ( let question of questions ) {
            this.questions.push(new Question(question));
        }
    }

    list() {
        console.log(this.questions);
    }
}



fetch("https://quizapi.io/api/v1/questions?apiKey=KCL6vlHoXucS9J3xWehrJTI9Y3JX5zrcxhwPAGTG&category=code&difficulty=Easy&limit=10&tags=JavaScript")
    .then(response => response.json())
    .then(data => {
        let questions = new QuestionSet(data);
        questions.list();
    }) */