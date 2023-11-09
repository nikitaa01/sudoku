'use client'

import MessageRoot from "@/components/MessageRoot"
import useMessage from "@/hooks/useMessage"
import { ReactElement, createContext, useContext } from "react"

interface MessageContext {
    addMessage: (text: string | ReactElement, timeout?: number) => void,
    messages: { text: string | ReactElement, id: number }[],
    setMessages: React.Dispatch<React.SetStateAction<{ text: string | React.ReactElement; id: number; closing?: true; }[]>>
}

const MessageContext = createContext<MessageContext>({
    addMessage: () => { },
    messages: [],
    setMessages: () => { },
})

const useMessageContext = () => {
    const context = useContext(MessageContext)
    if (context === undefined) {
        throw new Error('useMessageContext must be used within a MessageContextProvider')
    }
    return context
}

const MessageContextProvider = ({ children }: {
    children: React.ReactNode,
}) => {
    const { messages, addMessage, setMessages, isRemoving } = useMessage()
    return (
        <MessageContext.Provider value={{ addMessage, messages, setMessages }}>
            <MessageRoot
                isRemoving={isRemoving}
                messages={messages}
            />
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContextProvider, useMessageContext }
