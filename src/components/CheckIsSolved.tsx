"use client"

import { useEndGameModalContext } from "@/context/EndGameModal"
import { useMessageContext } from "@/context/MessageContext"
import { useRestartGameContext } from "@/context/RestartGame"
import { useSudokuGameStateContext } from "@/context/SudokuGameState"
import confetti from "canvas-confetti"
import { useEffect } from "react"
import ModalLoseGame from "./ModalLoseGame"
import ModalWinGame from "./ModalWinGame"

export default function CheckIsSolved() {
    const { restartGame } = useRestartGameContext()
    const { isSolved } = useSudokuGameStateContext()
    const { setMessages } = useMessageContext()
    const { setModalData } = useEndGameModalContext()

    const handleCancel = () => {
        restartGame("easy")
    }
    useEffect(() => {
        setMessages([])
        if (isSolved === 0) {
            setModalData((prev) => ({ ...prev, open: false }))
            return
        }
        if (isSolved === 1) {
            confetti({
                particleCount: 100,
                spread: 150,
                origin: { y: 1 },
            })
            setModalData({
                open: true,
                onCancel: handleCancel,
                modalChildren: <ModalWinGame />,
            })
        }
        if (isSolved === -1) {
            setModalData({
                open: true,
                onCancel: handleCancel,
                modalChildren: <ModalLoseGame />,
            })
        }
    }, [isSolved, setMessages, setModalData])

    return null
}
