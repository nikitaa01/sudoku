"use client"

import { useRestartGameContext } from "@/context/RestartGame"
import { useEffect } from "react"

export function SetRestartingFalse({ board }: { board: number[][] }) {
    const { setRestarting } = useRestartGameContext()

    useEffect(() => {
        setRestarting(false)
    }, [board])

    return null
}
