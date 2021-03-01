import { InputQuestion, ChoiceQuestion, EstimationQuestion } from './Questions'

class Game {
    constructor(players) {
        this.round = 0
        this.isRunning = false
        this.roundInProgress = false
        this.players = players
        this.questions = []

    }

    addQuestion(questionData) {
        let newQuestion
        switch(type){
            case "input":
            newQuestion = new InputQuestion(questionData)
            case "choice":
            newQuestion = new ChoiceQuestion(questionData)
            case "estimation":
            newQuestion = new EstimationQuestion(questionData)
        }
    }

    startGame() {
        this.round = 1
        this.isRunning = true
        this.questions = shuffle([...this.questions])
    }

    nextRound() {

    }

}

function shuffle(array) {
    let m = array.length
    let temp
    let i
    while (m) {
      i = Math.floor(Math.random() * m--);
      temp = array[m];
      array[m] = array[i];
      array[i] = temp;
    }  
    return array;
}



/* class Game {
	constructor(room){
	this.round = 0
	this.isRunning = false
	this.roundInProgress = false
	this.questions = []
	this.room = room
	console.log("New game created")
	}
	addQuestion(questionData, type){
	let newQuestion
	switch(type){
		case "input":
		newQuestion = new InputQuestion(questionData.creator, questionData.questionText, questionData.answer)
		case "choice":
		newQuestion = new ChoiceQuestion(questionData.creator, questionData.questionText, questionData.answers, questionData.options)
	}
	this.questions.push(newQuestion)
	}
	async gameloop(){
	this.isRunning = true
	//load questions
	while(this.isRunning) {
		this.roundInProgress = true
		this.round++
		//send question
		//wait
		//evaluate answers + update score
		//if no questions left => isRunning = false
		this.isRunning = false
	}
	//display winner
	}/
} */