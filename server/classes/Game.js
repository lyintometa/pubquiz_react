const Round = require('./Round')

class Game {
    constructor(room) {
        this.isRunning = false
        this.questionInProgress = false
        this.roundInProgress = false
        this.room = room
        this.numRounds = 1
        this.rounds = []

        this.currentRound = 0
        this.currentQuestion = 0
    }

    startGame() {
        if (this.isRunning || !this.checkPlayersReady()) return
        console.log(`Game started.`)
        this.generateRounds()
        this.isRunning = true
        this.startRound()
    }

    startRound() {
        if (this.roundInProgress) return
        console.log(`Round ${this.currentRound} started.`)
        this.roundInProgress = true
        this.currentQuestion = 0
        this.startQuestion()
    }

    startQuestion() {
        if (this.questionInProgress) return
        this.questionInProgress = true
        this.room.players.forEach(player => {
            player.setAnswer('')
        })
        const question = this.rounds[this.currentRound].askQuestion()
        setTimeout(() => {this.endQuestion(question)}, 10000)
    }

    endQuestion(question) {
        if (!this.questionInProgress) return
        console.log(`Question ${this.currentQuestion} of Round ${this.currentRound} ended.`)
        this.questionInProgress = false
        this.room.players.forEach(player => {
            player.socket.emit('reveil-answer', question.answer)
            if(question.compareAnswer(player.answers[this.currentRound][this.currentQuestion])) player.addScore(1)
        })
        this.currentQuestion++
        if (this.rounds[this.currentRound].hasNextQuestion()) {
            setTimeout(() => {this.startQuestion()}, 10000)            
        } else {
            this.endRound()
        }
    }

    endRound() {
        if (!this.roundInProgress) return
        console.log(`Round ${this.currentRound} ended.`)
        this.roundInProgress = false
        this.currentRound++
        if (this.rounds.length > this.currentRound) {
            this.startRound()
        } else {
            this.endGame()
        }
    }

    endGame() {
        if (!this.isRunning) return
        this.room.players.forEach(player => {
            player.socket.emit('end-game')
        })
        console.log(`Game ended.`)
        this.isRunning = false
    }

    checkPlayersReady(){
        return this.room.players.every(player => player.enoughQuestions(this.numRounds))
    }


    generateRounds() {
        for (let i = 0; i < this.numRounds; i++) {
            this.rounds.push(new Round(i, this.room.players.filter(player => player.connected)))
        }
    }

}


module.exports = Game

/* class Game {
	constructor(room){
	this.round = 0
	this.isRunning = false
	this.roundInProgress = false
	this.questions = []
	this.room = room
	console.log("New game created")
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
