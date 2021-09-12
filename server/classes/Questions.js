const { v4: uuidv4 } = require('uuid');

class Question {
	constructor(text, answer, playerId){
        this.text = text
        this.answer = answer
        this.playerId = playerId
        this.id = uuidv4()
	}

    getQuestionData(){
        return {
            questionText: this.text,
            questionType: this.type,
            playerId: this.playerId
        }
    }
    
    compareAnswer(answer) {
        return answer == this.answer
    }
}

class InputQuestion extends Question {
    static type = 'input'
	constructor({ text, answer }, playerId) {
        super(text, answer, playerId)
	}
    compareAnswer(answer) {
        console.log('think of a way to compare two manual inputs for equality (??)')
    }
}

class ChoiceQuestion extends Question {
    static type = 'choice'
	constructor({ text, answer, wrongOptions }, playerId) {
        super(text, answer, playerId)
        this.wrongOptions = wrongOptions
	}

    getQuestionData(){
        return {
            questionText: this.text,
            questionType: this.type,
            questionOptions: shuffle([this.answer, ...this.wrongOptions]),
            playerId: this.playerId
        }
    }
}

class EstimationQuestion extends Question {
    static type = 'estimation'
    constructor({ text, answer, maxOffset }, playerId) {
        super(text, answer, playerId)
        this.lowerLimit = answer - maxOffset
        this.upperLimit = answer + maxOffset
    }

    compareAnswer(answer) {
        return answer >= this.lowerLimit && answer <= this.upperLimit
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

module.exports = {InputQuestion, ChoiceQuestion, EstimationQuestion}