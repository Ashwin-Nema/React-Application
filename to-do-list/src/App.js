import React from 'react';
import './index.css'
import { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import {ListItem} from './Components'

function App() {
  const [inputsearcbarvalue, changeinputsearchbarvalue] = useState("")
  const [itemslist, changeitemslist] = useState({})
  const [currentitemid, changeitemid] = useState(0)
  const [modal, showmodal] = useState(false)

  const hidemodal = () => {
    showmodal(false)
  }

  const addnewitem = () => {
    if (inputsearcbarvalue.trim() === "") {
      showmodal(true)
      return
    }
    const newitemslist = { ...itemslist }
    newitemslist[currentitemid] = { content: inputsearcbarvalue, time: Date.now() }
    changeitemslist({ ...newitemslist })
    changeitemid(previd => previd + 1)
    changeinputsearchbarvalue("")
  }

  return (
    <div className="mt-5">
      <h3 className="text-center">To do list</h3>

      <div className="userinputgrid mt-5 mb-3">
        <div className="d-flex justify-content-center w-100">
          <input value={inputsearcbarvalue} onChange={(e) => changeinputsearchbarvalue(e.target.value)} type="text" className="form-control"></input>
        </div>
        <i onClick={addnewitem} className="bi bi-plus-circle hover"></i>
      </div>

      {
        Object.keys(itemslist).map((item, index) => {
          return (
            <div key={index} className="d-flex justify-content-center">
              <ListItem id={item} itemslist={itemslist} changeitemslist={changeitemslist} />            
              </div>
        
          )
        })
      }
      <Modal contentClassName="transparent" show={modal} onHide={hidemodal} centered={true} >
        <Alert variant="danger">
          <i className="bi bi-exclamation-circle-fill me-3"></i>
          Input field cannot be empty
        </Alert>
      </Modal>
    </div>
  );
}

export default App;