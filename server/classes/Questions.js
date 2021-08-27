const { v4: uuidv4 } = require('uuid');

class Question {
	constructor(text, answer){
        this.text = text
        this.answer = answer
        this.id = uuidv4()
	}
    
    compareAnswer(answer) {
        return answer == this.answer
    }
}

class InputQuestion extends Question {
    static type = 'input'
	constructor({ text, answer }) {
        super(text, answer)
	}
    compareAnswer(answer) {
        console.log('think of a way to compare two manual inputs for equality (??)')
    }
}

class ChoiceQuestion extends Question {
    static type = 'choice'
	constructor({ text, answer, wrongOptions }) {
        super(text, answer)
        this.wrongOptions = wrongOptions
	}

    getShuffledChoices(){
        return shuffle([this.answer, ...this.wrongOptions])
    }
}

class EstimationQuestion extends Question {
    static type = 'estimation'
    constructor({ text, answer, maxOffset }) {
        super(text, answer)
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