'use client'

import { useSudokuGameStateContext } from "@/context/SudokuGameState"

export default function Mistakes() {
    const { errors } = useSudokuGameStateContext()
    
    return (
        <span className="text-black/80">Mistakes: {errors}/3</span>
    )
}