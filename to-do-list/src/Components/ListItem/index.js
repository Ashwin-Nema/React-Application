import { useEffect, useState } from 'react';
import {  Alert } from 'react-bootstrap';
export const ListItem = ({id, itemslist, changeitemslist}) => {
    const [content, changecontent] = useState("")

    useEffect(() => {
        if (itemslist[id] !== undefined) {
            changecontent(itemslist[id].content)
        }
        
    }, [itemslist, id, content])

    const edititem = (e) => {
        if (itemslist[id] !== undefined) {
            changeitemslist(currentlist => {
                currentlist[id].content = e.target.value
                return currentlist
            })
        }
        changecontent(e.target.value)
    }

    const deleteitem = () => {
        changeitemslist(currentlist => {
            delete currentlist[id]
            return currentlist
        })
        changecontent(undefined)
    }
    

    return (
        <>
            {itemslist[id] !== undefined && content !== undefined &&
            <Alert className="listitemgrid text-break" variant="warning">
            <div>
                <input className="listiteminput" type="text" value={content} onChange={edititem}></input>
            </div>
            <div>
            <i onClick={deleteitem} className="bi bi-trash-fill hover"></i>

            </div>
        </Alert>
            }
            

        </>
    )
}