import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal'



export default function SubmitArea() {
    //const { game, ready, toggleReady, openNewQuestionModal, questionActive } = useGameData()
    const isAdmin = useSelector(state => state.players.byId[state.info.id]?.isAdmin ?? false)

    const [canAddQuestion, setCanAddQuestion ] = useState(true)

    const [showNewQuestionModal, setShowNewQuestionModal] = useState(false)

    const openNewQuestionModal = () => setShowNewQuestionModal(true)
    const closeNewQuestionModal = () => setShowNewQuestionModal(false)
    
    /* useEffect(() => {
        if(!socket) return
        socket.on('questions-complete', () => {
            console.log("'questions-complete' received")
            setCanAddQuestion(false)
        })
        return () => socket.off('questions-complete')
    }, [socket]) */

    const questionsToSubmitArea = 
        <div>
            <p> But first you have to submit some questions 
                of your own. Use the button below.</p>
            <button onClick={() => openNewQuestionModal()}>Add Question</button>
        </div>

    const noQuestionsToSubmitArea = isAdmin ?
        <div>
            <p>You submitted all questions, wait for the other players to be ready to be able to start the game.</p>
        </div> :
        <div>
            <p>You submitted all questions, wait for the other players to be ready and the game to start.</p>
            {/* <button onClick={() => toggleReady()}>{!ready ? "Ready" : "Not ready"}</button> */}
        </div>

    return (
        <>
            <NewQuestionModal showModal={showNewQuestionModal} closeModal={closeNewQuestionModal}/>
            {canAddQuestion ? questionsToSubmitArea : noQuestionsToSubmitArea}
        </>
        
    )
}
