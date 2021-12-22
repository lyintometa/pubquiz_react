import Round from './Round.js'

export default class Game {
    static NOT_STARTED = "notStarted"
    static ROUND_IN_PROGRESS = "roundInProgress"
    static ROUND_OVER = "roundOver"
    static GAME_OVER = "over"

    constructor(room) {
        this.isRunning = false
        this.questionInProgress = false
        this.roundInProgress = false
        this.room = room
        this.socket = room.socket
        this.numRounds = 2
        this.rounds = []

        this.state = Game.NOT_STARTED
        this.currentRound = 0
        /* this.currentQuestion = 0 */
    }

    getFullData() {
        return {            
            rounds: this.numRounds,
            currentPhase: this.state,
            everyoneReady: this.room.isReady
        }
    }

    sendGameData = playerSocket => playerSocket.emit('update-game-data', this.getFullData())

    updateGame = () => this.socket.emit('update-game-data', this.getFullData())

    continueGame () {
        switch (this.state) {
            case Game.NOT_STARTED:
                this.startGame()
                this.startRound()
                this.updateGame()
                this.nextQuestion()
                break;
            case Game.ROUND_IN_PROGRESS:
                this.nextQuestion()
                break;
            case Game.ROUND_OVER:
                this.startRound()
                this.nextQuestion()
                break;
            case Game.GAME_OVER:
                //this.displayResults()
                break;
            default:
                break;
        }
    }

    startGame() {
        if (!this.room.getReady()) return
        console.log(`Game starting.`)
        this.generateRounds()
    }

    startRound(){
        if (!this.room.getReady()) return
        this.state = Game.ROUND_IN_PROGRESS
        this.currentRound++
        console.log(`Round ${this.currentRound} started.`)
    }

    nextQuestion(){
        const round = this.rounds[this.currentRound - 1]
        if (round && round.questionActive) return
        round.askQuestion()
        this.room.setReady(false)
        if (!round.questionLeft()) {
            if (this.currentRound === this.numRounds) this.state = Game.GAME_OVER
            else this.state = Game.ROUND_OVER
        }
    }

    /* startQuestion() {
        if (this.questionInProgress) return
        if (!this.checkPlayersReady()) return
        this.room.setReady(false)
        this.questionInProgress = true
        this.room.players.forEach(player => {
            player.setAnswer('')
        })
        const question = this.rounds[this.currentRound].askQuestion()
        setTimeout(() => {this.endQuestion(question)}, 10000)
    } */

    /* endQuestion(question) {
        if (!this.questionInProgress) return
        console.log(`Question ${this.currentQuestion} of Round ${this.currentRound} ended.`)
        this.questionInProgress = false
        this.room.players.forEach(player => {
            player.socket.emit('reveil-answer', question.answer)
            if(question.compareAnswer(player.answers[this.currentRound][this.currentQuestion])) player.addScore(1)
        })
        this.currentQuestion++
        if (this.rounds[this.currentRound].hasNextQuestion()) {
            //setTimeout(() => {this.startQuestion()}, 10000)            
        } else {
            this.endRound()
        }
    } */

    /* endRound() {
        if (!this.roundInProgress) return
        console.log(`Round ${this.currentRound} ended.`)
        this.roundInProgress = false
        this.currentRound++
        if (this.rounds.length > this.currentRound) {
            this.startRound()
        } else {
            this.endGame()
        }
    } */

    /* endGame() {
        if (!this.isRunning) return
        this.room.players.forEach(player => {
            player.socket.emit('end-game')
        })
        console.log(`Game ended.`)
        this.isRunning = false
    } */

    generateRounds() {
        const currentPlayers = this.room.players.filter(player => player.connected)
        for (let i = 0; i < this.numRounds; i++) {
            this.rounds.push(new Round(this.socket, i + 1, currentPlayers))
        }
    }

}
