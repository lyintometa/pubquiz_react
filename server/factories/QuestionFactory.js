import { InputQuestion, ChoiceQuestion, EstimationQuestion } from "../classes/Questions.js";
import { QUESTION_TYPE } from "../constants/questions.js";

export default class QuestionFactory{

    constructor(){
        if (QuestionFactory._instance) return QuestionFactory._instance
        QuestionFactory._instance = this;
    }

    createQuestion = questionData => {
        let question
        switch(questionData.type){
            case QUESTION_TYPE.INPUT:
                question = new InputQuestion(questionData, this.id)
                break;
            case QUESTION_TYPE.CHOICE:
				question = new ChoiceQuestion(questionData, this.id)
                break;
            case QUESTION_TYPE.ESTIMATION:
				question = new EstimationQuestion(questionData, this.id)
                break;
			default:
                throw "Error in function 'createQuestion': Undefined question type requested."
        }
        return question
    }
}