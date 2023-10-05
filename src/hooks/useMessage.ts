import { useState } from 'react'

declare global {
    interface Document {
        startViewTransition(callback: () => void): void
    }
}

const useMessage = () => {
    const [messages, setMessages] = useState<{ text: string, id: number, closing?: true }[]>([])
    const addMessage = (text: string, timeout = 3000) => {
        const message = { id: Date.now(), text }

        setMessages((prevMessages) => [...prevMessages, message])

        setTimeout(() => {
            removeMessage(message.id)
        }, timeout)
    }

    const removeMessage = (id: number) => {
        if (!document.startViewTransition) {
            setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
            return
        }
        document.startViewTransition(() => {
            const message = document.getElementById(`message-${id}`)
            message?.style.setProperty('display', 'none')
            setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
        })
    }

    return { messages, addMessage, removeMessage, setMessages }
}

export default useMessage
