import ReactDom from 'react-dom'
import '../stylesheets/Modal.css'

export default function Modal({ isOpen, closeModal, children }) {
    if(!isOpen) return null    

    return ReactDom.createPortal(
        <>
            <div className="overlay" /* onClick={() => closeModal()} */></div>
            <div className="modal">
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}