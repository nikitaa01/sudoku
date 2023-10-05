'use client'

import { useEffect } from "react"

export default function KeyboardListener() {
    useEffect(() => {
        const buttons = document.querySelectorAll<HTMLButtonElement>('#action-buttons button')

        const handleKeyDown = (e: KeyboardEvent) => {
            const button = buttons[+e.key - 1]
            if (button) {
                button.click()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
    }, [])
    
    return null
}