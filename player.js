class Player {
  constructor(name, score){
      this.name = name;
      this.score = 0;
  }

  // This method is called inside the QuestionSet class (summarizeScore method).
  // Simply increments the player score by one for each correct answer.
  addPlayerScore(){
      console.log(this.score);
      this.score++;
  }
}