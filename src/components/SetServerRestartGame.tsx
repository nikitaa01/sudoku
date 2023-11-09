'use client'

import { useRestartGameContext } from "@/context/RestartGame"
import useRestartGame from "@/hooks/useRestartGame"
import { useEffect } from "react"

export default function SetServerRestartGame() {
    const { restart } = useRestartGame()
    const { setRestartGame } = useRestartGameContext()

    useEffect(() =>
        setRestartGame(() => restart)
        , [])

    return null
}