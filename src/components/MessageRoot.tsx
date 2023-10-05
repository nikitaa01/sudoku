import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Message from './Message'

export default function MessageRoot({ messages }: { messages: {text: string, id: number}[] }) {
    const [mounted, setMounted] = useState(false)
    const messageRoot = globalThis.document && document.getElementById('message-root')

    useEffect(() => {
        setMounted(true)
        if (!document.getElementById('message-root')) {
            const newmessageRoot = document.createElement('div')
            newmessageRoot.id = 'message-root'
            document.body.appendChild(newmessageRoot)
        }
    }, [messageRoot])

    if (!mounted || !messageRoot) return null

    return createPortal(
        <div className='fixed inset-0 w-screen h-screen flex justify-start items-center gap-4 flex-col p-4 z-10'
            style={{ pointerEvents: 'none' }}
        >
            {
                messages.map(message =>
                    <Message key={message.id} {...message} />
                )
            }
        </div>,
        messageRoot
    )
}