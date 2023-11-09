import { ReactElement, useEffect, useState } from 'react'

const useMessage = () => {
    const [messages, setMessages] = useState<{ text: string | ReactElement, id: number }[]>([])
    const [closingQueue, setClosingQueue] = useState<number[]>([])
    const [isRemoving, setIsRemoving] = useState(false)

    const addMessage = (text: string | ReactElement, timeout = 3000) => {
        const message = { id: Date.now(), text }

        setMessages((prevMessages) => [...prevMessages, message])

        setTimeout(() => {
            setClosingQueue((prevClosingQueue) => [...prevClosingQueue, message.id])
        }, timeout)
    }

    useEffect(() => {
        if (closingQueue.length === 0 || isRemoving) return

        setIsRemoving(true)
        const removeNextMessage = async () => {
            const messageId = closingQueue.shift() as number
            await removeMessage(messageId)
            setIsRemoving(false)
        }

        removeNextMessage()
    }, [closingQueue, isRemoving])

    const removeMessage = (id: number) => new Promise<void>(resolve => {
        setTimeout(() => {
            setMessages((prevMessages) =>
                prevMessages
                    .filter((message) => message.id !== id)
            )
            resolve()
        }, 500)
    })

    return { messages, addMessage, removeMessage, setMessages, isRemoving }
}

export default useMessage
