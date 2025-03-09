"use client"

import { useSudokuGameStateContext } from "@/context/SudokuGameState"
import { useSudokuTimerContext } from "@/context/SudokuTimer"
import Pause from "./icons/Pause"
import Play from "./icons/Play"

export default function Timer() {
    const { paused, setPaused } = useSudokuGameStateContext()
    const { counter } = useSudokuTimerContext()

    const handleClick = () => setPaused(!paused)

    return (
        <div className="flex gap-3 items-center">
            <span id="timer" className="text-black/80">
                {`${counter.m}`.padStart(2, "0")}:
                {`${counter.s}`.padStart(2, "0")}
            </span>
            <button
                id="pause-btn"
                data-paused={paused}
                onClick={handleClick}
                className="focus:outline-none"
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Spacebar") {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                }}
            >
                <div className="rounded-full border-gray-200 bg-gray-100 grid grid-cols-1 place-content-center hover:ring hover:ring-blue-300/80 transition-all">
                    {paused ? <Pause /> : <Play />}
                </div>
            </button>
        </div>
    )
}
