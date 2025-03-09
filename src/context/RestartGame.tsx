"use client"

import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

interface RestartGameContext {
    restartGame: (difficulty: SudokuBoardDifficulty) => void
    difficulty: SudokuBoardDifficulty
    canRestart: boolean
    setCanRestart: (canRestart: boolean) => void
}

const RestartGameContext = createContext<RestartGameContext>({
    restartGame: () => {},
    difficulty: "easy",
    canRestart: true,
    setCanRestart: () => {},
})

const useRestartGameContext = () => {
    const context = useContext(RestartGameContext)

    if (context === undefined) {
        throw new Error(
            "useRestartGameContext must be used within a RestartGameContextProvider"
        )
    }

    return context
}

const RestartGameContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()
    const restartGame: RestartGameContext["restartGame"] = (difficulty) => {
        if (document) {
            // eslint-disable-next-line react-compiler/react-compiler
            document.cookie = `difficulty=${difficulty}; path=/`
        }

        router.refresh()
    }

    const [difficulty, setDifficulty] = useState<SudokuBoardDifficulty>(() => {
        if (globalThis?.document) {
            const difficulty = document.cookie
                .split("; ")
                .find((item) => item.startsWith("difficulty="))
                ?.split("=")[1]
            return (difficulty as SudokuBoardDifficulty) ?? "easy"
        }
        return "easy"
    })
    const [canRestart, setCanRestart] = useState(true)
    const restartGameHandler = (difficulty: SudokuBoardDifficulty) => {
        setDifficulty(difficulty)
        restartGame(difficulty)
        setCanRestart(true)
    }

    return (
        <RestartGameContext.Provider
            value={{
                restartGame: restartGameHandler,
                difficulty,
                canRestart,
                setCanRestart,
            }}
        >
            {children}
        </RestartGameContext.Provider>
    )
}

export { RestartGameContextProvider, useRestartGameContext }
