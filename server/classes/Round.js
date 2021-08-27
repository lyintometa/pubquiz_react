const { shuffle } = require('../util/helper')
const Iterator = require('./Iterator')

class Round {
    constructor(number, players) {
        this.number = number
        this.isOver = false
        this.players
        this.playerOrder = new Iterator(shuffle([...players]))
        this.time = 10000
    }

    hasNextQuestion() {
        return this.playerOrder.hasNext()
    }

    askQuestion() {
        console.log(`Round ${this.number}: Question ${this.playerOrder.cursor} asked`)
        const player = this.playerOrder.next()
        const question = player.questions[this.number]
        player.socket.to(player.room.id).emit('ask-question', ({ yourQuestion: false, text: question.text, options: shuffle([question.answer, ...question.wrongOptions]), time: this.time }))
        player.socket.emit('ask-question', ({ yourQuestion: false, text: question.text, options: shuffle([question.answer, ...question.wrongOptions]), time: this.time }))
        return question
    }

    endQuestion() {
        this.players.forEach(player => {
            player.socket.emit('end-question')
        });
    }
}

module.exports = Round