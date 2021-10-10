import { useEffect, useState } from "react"
export const QuestionAnswer = ({ id, questionanswerlist, changeflashcarditems, changeeditid, changeshowcarditems }) => {
    const [question, changequestion] = useState("")
    const [answer, changeanswer] = useState("")
    const [showanswer, changeshowanswer] = useState(false)

    useEffect(() => {
        if (questionanswerlist[id] !== undefined) {
            const { question, answer } = questionanswerlist[id]
            changequestion(question)
            changeanswer(answer)
            return
        }
        changequestion(undefined)
        changeanswer(undefined)
    }, [changequestion, changeanswer, id, questionanswerlist])

    const deletecard = () => {
        changeflashcarditems(currentitems => {
            delete currentitems[id]
            return currentitems
        })
        changequestion(undefined)
    }

    const editcard = () => {
        changeeditid(id)
        changeshowcarditems(false)
    }

    return (
        <>
            {
                question !== undefined && answer !== undefined &&
                <>
                <div className="border p-2 bg-white text-dark">
                    <h5>{question}</h5>
                    <p onClick={() => changeshowanswer(curstate => !curstate)} className="cursorpointer text-primary">
                        Show/Hide Answer
                    </p>

                    {showanswer && 
                    <strong>
                        <p>{answer}</p>
                    </strong>
                    }

                    <div className="questiontext">
                        <button onClick={editcard}  className="btn btn-outline-success">Edit</button>
                        <button onClick={deletecard} className="orangebutton">
                            Delete
                        </button>
                    </div>
                </div>
                </>
            }
        </>
    )
}