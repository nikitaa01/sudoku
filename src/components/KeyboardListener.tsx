'use client'

import { useSudokuGameStateContext } from "@/context/SudokuGameState"
import { useEffect } from "react"

export default function KeyboardListener() {
    const { setPaused } = useSudokuGameStateContext()

    useEffect(() => {
        const buttons = document.querySelectorAll<HTMLButtonElement>('#action-buttons button')

        const handleKeyDown = (e: KeyboardEvent) => {
            const button = buttons[+e.key - 1]
            if (button) {
                button.click()
            }
            if (e.key === ' ' || e.key === 'Spacebar') {
                setPaused(prev => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
    }, [setPaused])

    return null
}