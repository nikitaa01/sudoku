'use client'

import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useEffect } from "react"

export default function UpdateSearchParams({ newSearchParams }: { newSearchParams: { game: string, difficulty: SudokuBoardDifficulty } }) {
    useEffect(() => {
        const searchParams = new URLSearchParams()
        Object.entries(newSearchParams).forEach(([key, value]) => {
            searchParams.set(key, value)
        })

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        globalThis?.window?.history?.replaceState(null, "", newUrl)
    }, [newSearchParams])

    return null
}
