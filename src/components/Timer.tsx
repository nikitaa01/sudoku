'use client'

import { useSudokuGameStateContext } from "@/context/SudokuGameState"

export default function Timer() {
    const { counter } = useSudokuGameStateContext()

    return (
        <span className="text-black/80">{`${counter.m}`.padStart(2, '0')}:{`${counter.s}`.padStart(2, '0')}</span>
    )
}