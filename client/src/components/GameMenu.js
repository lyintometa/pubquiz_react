import { useGame } from '../contexts/GameProvider'
import { useQuestions } from '../contexts/QuestionsProvider'
import NewQuestionModal from './NewQuestionModal'
import '../stylesheets/GameMenu.css'

export default function GameMenu({ isAdmin }) {
    const { addQuestion, showNewQuestionModal, openNewQuestionModal, closeNewQuestionModal, canAddQuestion } = useQuestions()
    const { startGame, readyState, setReadyState } = useGame()

    function toggleReadyState(){
        if (readyState == false) {
            setReadyState(true)
            return
        }
        setReadyState(false)
    }

    const readyButton = <button onClick={() => toggleReadyState()}>{!readyState ? "Ready" : "Not ready"}</button>

    return (
        <>
            <NewQuestionModal showNewQuestionModal={showNewQuestionModal} closeNewQuestionModal={closeNewQuestionModal} addQuestion={addQuestion}/>
            <div className="game-menu-container">
                <p>Welcome to Quarantäne Pubquiz.<br/>In this Area you will be able to answer the questions 
                which the other players in your team will ask. But first you have to submit some questions 
                of your own. Use the button below. <br/>Good luck!</p>
                {canAddQuestion ? <button onClick={() => openNewQuestionModal()}>Add Question</button> : readyButton}
                
                {isAdmin ? 
                <div>
                    {/* <input type="number"/> */}
                    {/* add "mode" selection */}
                    <p>Here are also your admin controls, you can use them to start the game (and soon to change the 
                    game settings).</p>
                    <button onClick={startGame}>Start Game</button>
                </div> : null
                }
            </div>
            
        </>
    )
}