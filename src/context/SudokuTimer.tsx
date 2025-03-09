"use client"

import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react"
import { useRestartGameContext } from "./RestartGame"
import { useSudokuGameStateContext } from "./SudokuGameState"

interface SudokuTimerContext {
    counter: { s: number; m: number }
    setCounter: React.Dispatch<React.SetStateAction<{ s: number; m: number }>>
}

const SudokuTimerContext = createContext<SudokuTimerContext>({
    counter: { s: 0, m: 0 },
    setCounter: () => {},
})

export const useSudokuTimerContext = () => {
    const context = useContext(SudokuTimerContext)
    if (!context) {
        throw new Error(
            "useSudokuTimerContext must be used within a SudokuTimerContextProvider"
        )
    }
    return context
}

export const SudokuTimerContextProvider = ({ children }: PropsWithChildren) => {
    const [counter, setCounter] = useState({ s: 0, m: 0 })
    const { isSolved, paused } = useSudokuGameStateContext()
    const { restarting } = useRestartGameContext()

    useEffect(() => {
        if (isSolved || paused || restarting) return

        const interval = setInterval(() => {
            setCounter((prev) =>
                prev.s === 59
                    ? { s: 0, m: prev.m + 1 }
                    : { s: prev.s + 1, m: prev.m }
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [isSolved, paused, restarting])

    useEffect(() => {
        if (restarting) {
            setCounter({ s: 0, m: 0 })
        }
    }, [restarting])

    return (
        <SudokuTimerContext.Provider value={{ counter, setCounter }}>
            {children}
        </SudokuTimerContext.Provider>
    )
}
