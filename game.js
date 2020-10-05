let theQuestion = document.getElementById("theQuiz");
let answerChoices = Array.from(document.getElementsByClassName("answerChoice"));
let rounds = document.getElementById("rounds");
let totalScore = document.getElementById("totalScore");

let currentQuestion = {};
let counter = 0;
let score = 0;
let totalQuestions = [];

let rightPoints = 1;
