'use client'

import { useEffect } from "react"
import { useSudokuGameStateContext } from "@/context/SudokuGameState"
import confetti from 'canvas-confetti'
import { useMessageContext } from "@/context/MessageContext"
import { useRouter } from "next/navigation"
import { useEndGameModalContext } from "@/context/EndGameModal"
import ModalLoseGame from "./ModalLoseGame"
import ModalWinGame from "./ModalWinGame"

export default function CheckIsSolved({ onCancelModal }: { onCancelModal?: () => void }) {
    const { isSolved } = useSudokuGameStateContext()
    const { setMessages } = useMessageContext()
    const { refresh } = useRouter()

    const { setModalData } = useEndGameModalContext()
    
    const handleCancel = () => {
        if (onCancelModal) return onCancelModal()
        // TODO reset the game
        const newUrl = `${window.location.pathname}`
        window.history.replaceState(null, "", newUrl)
        document.cookie = 'regenerateClient=true'
        refresh()
    }

    useEffect(() => {
        if (isSolved === 0) return
        setMessages([])
        if (isSolved === 1) {
            confetti({
                particleCount: 100,
                spread: 150,
                origin: { y: 1 }
            })
            setModalData({
                open: true,
                onCancel: handleCancel,
                modalChildren: <ModalWinGame />
            })
        }
        if (isSolved === -1) {
            setModalData({
                open: true,
                onCancel: handleCancel,
                modalChildren: <ModalLoseGame />
            })
        }
    }, [isSolved, setMessages, setModalData])


    return null
}