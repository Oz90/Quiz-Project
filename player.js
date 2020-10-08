class Player {
  constructor(name, score){
      this.name = name;
      this.score = 0;
  }
  addPlayerScore(){
      console.log(this.score);
      this.score++;
  }
}