import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Message from './Message'

export default function MessageRoot({ messages, isRemoving }: { messages: { text: string | React.ReactElement, id: number }[], isRemoving: boolean }) {
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
        <div className={`fixed inset-0 w-screen h-screen flex justify-start items-center flex-col z-10 ${isRemoving ? '-translate-y-[44px] transition-transform duration-300 ease-in-out' : ''}`}
            style={{ pointerEvents: 'none', animationFillMode: 'forwards' }}
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