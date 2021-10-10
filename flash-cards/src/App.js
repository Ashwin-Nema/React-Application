import './index.css'
import { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import {useModal} from './Hooks'
import {QuestionAnswer} from './Components'

function App() {
  const [question, changequestion] = useState("")
  const [answer, changeanswer] = useState("")
  const [showquestionadder, changeshowquestionadder] = useState(false)
  const [flashcarditems, changeflashcarditems] = useState({})
  const [flashcardid, newflashcardid] = useState(0)
  const [modal,,message,, hidemodal, showmodalwithmessage] = useModal()
  const [editid, changeeditid] = useState()
  const [showcarditems, changeshowcarditems] = useState(true)

  const savequestionanswer = () => {

    if (question.trim().length === 0 ) {
      showmodalwithmessage("Question field cannot be empty")
      return
    }

    if (answer.trim().length === 0) {
      showmodalwithmessage("Answer field cannot be empty")
      return
    }

    changeflashcarditems(currentitems => {
      newflashcardid(currentid => currentid + 1)
      if (editid !== undefined) {
        currentitems[editid] = {question, answer}
        changeeditid(undefined)
        changeshowcarditems(true)
        return currentitems
      }
      currentitems[flashcardid] = {question, answer}
      
      return currentitems
    })

    changequestion("")
    changeanswer("")
  }

  return (
    <div className="mt-5 ms-5">
      <h3>Flash Card</h3>
      <button onClick={() => changeshowquestionadder(curstate => !curstate)} className="orangebutton ">Add question</button>
      {showquestionadder &&
        <div className="question p-4 w mt-3 me-5 mb-3">
          <div className="questiontext mb-3">
            <h5>Question</h5>
            <button onClick={() => changeshowquestionadder(curstate => !curstate)} className="orangebutton">X</button>
          </div>
          <textarea value={question} onChange={(e) => changequestion(e.target.value)} className="form-control mb-3 w-100">

          </textarea>
          <h5>Answer</h5>
          <textarea value={answer} onChange={(e) => changeanswer(e.target.value)} className="form-control mb-3 w-100">

          </textarea>

          <button onClick={savequestionanswer}  className="btn btn-outline-success w-50">Save</button>

        </div>
      }

      <div className="answergrid ms-3">
        {showcarditems && Object.keys(flashcarditems).map((item, index) => {
          const props = {key:index, id:item, questionanswerlist:flashcarditems, changeflashcarditems, changeeditid, changeshowcarditems}
          return (
            <QuestionAnswer {...props} />
          )
        } ) }
      </div>

      <Modal contentClassName="transparent" centered show={modal} onHide={hidemodal} >
        <Alert variant="danger" >
        <i className="bi bi-exclamation-circle-fill"></i>

          {message}
        </Alert>
      </Modal>
    </div>
  );
}

export default App;