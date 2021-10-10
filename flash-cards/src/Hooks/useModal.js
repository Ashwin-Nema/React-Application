import { useState } from "react"
export const useModal = () => {
    const [modal , showmodal] = useState(false)
    const [message, setmessage] = useState("")

    const hidemodal = () => {
        showmodal(false)
    }

    const showmodalwithmessage = (message) => {
        setmessage(message)
        showmodal(true)
    }

    return [modal, showmodal, message, setmessage, hidemodal, showmodalwithmessage]
}