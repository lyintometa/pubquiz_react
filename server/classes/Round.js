import { shuffle } from '../util/helper.js'

export default class Round {
    constructor(socket, number, players) {
        this.number = number
        this.questionNumber = 0
        this.socket = socket
        this.questions = shuffle(players.map(player => player.questions[number - 1]))
        this.answers = this.initAnswerStructure(players)
        this.questionActive = false
    }

    questionLeft = () => this.questions.length >=  this.questionNumber 

    askQuestion(){
        if (this.questionActive) return
        this.questionNumber++
        console.log(`Round ${this.number}: Question ${this.questionNumber} asked`)
        const questionData = this.questions[this.questionNumber - 1].getQuestionData()
        questionData.roundNumber = this.number
        questionData.questionNumber = this.questionNumber
        this.socket.emit('ask-question', questionData)
        this.questionActive = true
    }

    revealAnswer(){
        this.questionActive = false
        const questionAnswer = this.questions[this.questionNumber - 1].answer
        this.socket.emit('reveil-answer', { questionAnswer })
        if (this.questionLeft()) return
        this.socket.emit('round-over')
    }

    initAnswerStructure(players){
        const answers = players.map(player => ({playerId: player.id, roundNumber: this.number, playerAnswers: []}))
        answers.forEach(answ => {
            for (let i = 0; i < players.length; i++){
                answ.playerAnswers[i] = {
                    questionId: this.questions[i].id,
                    ownQuestion: this.questions[i].playerId === answ.playerId
                }
            }
        })
        return answers
    }

    getNumCorrectAnswers(id){
        const currentPlayer = this.answers.find(answ => answ.playerId === id)
        const correctAnswers = currentPlayer.playerAnswers.filter(playerAnswer => playerAnswer.correct);
        return correctAnswers.length
    }

    setAnswer(id, answer){
        if (!this.questionActive) return
        const currentPlayer = this.answers.find(answ => answ.playerId === id)
        currentPlayer.playerAnswers[this.questionNumber - 1].answer = answer
        const currentQuestion = this.questions[this.questionNumber - 1]
        if (currentQuestion.type === "input") return
        currentAnswer.playerAnswers[this.questionNumber - 1].correct = currentQuestion.compareAnswer(answer)
    }

    overrideAnswerCorrect(id, value){
        const currentPlayer = this.answers.find(answ => answ.playerId === id)
        currentPlayer.playerAnswers[this.questionNumber - 1].correct = value
    }
}