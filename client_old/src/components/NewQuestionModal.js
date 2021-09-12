import { useRef, useState, useEffect } from 'react'
import Modal from './Modal'
import '../stylesheets/NewQuestionModal.css'

export default function NewQuestionModal({ showNewQuestionModal, closeNewQuestionModal, addQuestion }) {
    const [duplicateOptions, setDuplicateOptions] = useState([])
    const [questionComplete, setQuestionComplete] = useState(false)
    const [text, setText] = useState("")
    const [options, setOptions] = useState(["", "", "", ""])

    function handleSubmit(e) {
        e.preventDefault()
        var trimmedOptions = options.map(option => option.trim())
        const questionData = {
            type: 'choice',
            text: text.trim(),
            answer : trimmedOptions[0],
            wrongOptions: trimmedOptions.slice(1)
        }
        addQuestion(questionData)
        clearModal()
        closeNewQuestionModal()
    }

    function clearModal(){
        setText("")
        setOptions(["", "", "", ""])
        setDuplicateOptions([])
        setQuestionComplete(false)
    }

    function testQuestion() {
        const questionData = {
            type: 'choice',
            text:'text',
            answer: 'answer',
            wrongOptions: ['option1', 'option2', 'option3']
        }
        addQuestion(questionData)
        clearModal()
        closeNewQuestionModal()
    }

    function checkDuplicates(){
        let duplicates = []
        for(let i = 0; i < options.length; i++){
            for(let j = 0; j < options.length; j++){
                if (i === j || options[i].trim() != options[j].trim() || options[i].trim() == "") continue
                if (duplicates.some(item => item === i)) continue
                duplicates.push(i)
            }
        }
        setDuplicateOptions(duplicates)
        return duplicates.length != 0
    }

    useEffect(() => {
        var trimmedOptions = options.map(option => option.trim())
        
        if (checkDuplicates() || [text, ...trimmedOptions].some(item => item === "")) {
            setQuestionComplete(false)
            return
        }
        setQuestionComplete(true)
    }, [text, options])
    
    function updateOption(index, value) {
        var newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    function getClassNameDuplicate(index){
        if (duplicateOptions.some(item => item === index)) return " duplicate"
        return ""
    }

    return (
        <Modal isOpen={showNewQuestionModal} closeModal={() => {}}>
                <p className="modal-text">This is an Choice Question. Input the text, correct answer and wrong options into the fields below.</p>
                <form className="question-form" onSubmit={handleSubmit}>
                    <textarea className="question-input" value={text} onChange={e => setText(e.target.value)} placeholder="Question Text" />
                    <div className="options-input-container">
                        <input className={"answer-input" + getClassNameDuplicate(0)} value={options[0]} onChange={e => updateOption(0, e.target.value)} placeholder="correct"/>
                        <input className={"wrong-input" + getClassNameDuplicate(1)} value={options[1]} onChange={e => updateOption(1, e.target.value)} placeholder="false"/>
                        <input className={"wrong-input" + getClassNameDuplicate(2)} value={options[2]} onChange={e => updateOption(2, e.target.value)} placeholder="false"/>
                        <input className={"wrong-input" + getClassNameDuplicate(3)} value={options[3]} onChange={e => updateOption(3, e.target.value)} placeholder="false"/>
                    </div>
                    <div className="modal-btn-container">
                        <button className="modal-btn" type="submit" disabled={!questionComplete}>Submit</button>
                        <button className="modal-btn" type="button" onClick={() => closeNewQuestionModal()}>Close</button>
                        <button className="modal-btn" onClick={() => testQuestion()}>TestQuestion</button>
                    </div>
                </form>
                
        </Modal>
    )
}
