const { v4: uuidv4 } = require('uuid');

class Question {
	constructor(questionText, answer){
        this.questionText = questionText
        this.answer = answer
        this.id = uuidv4()
	}
    
    compareAnswer(answer) {
        return answer == this.answer
    }
}

class InputQuestion extends Question {
	constructor({ questionText, answer }) {
        super(questionText, answer)
        this.type = "input"
	}
    compareAnswer(answer) {
        console.log("think of a way to compare two manual inputs for equality (??)")
    }
}

class ChoiceQuestion extends Question {
	constructor({ questionText, answer, wrongOptions }) {
        super(questionText, answer)
        this.type = "choice"
        this.wrongOptions = wrongOptions
	}
    getShuffledChoices(){
        return shuffle([this.answer, ...this.wrongOptions])
    }
}

class EstimationQuestion extends Question {
    constructor({ questionText, answer, maxOffset }) {
        super(questionText, answer)
        this.type = "estimation"
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

module.exports = [InputQuestion, ChoiceQuestion, EstimationQuestion]