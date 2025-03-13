"use client"

import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

interface RestartGameContext {
    restartGame: (difficulty: SudokuBoardDifficulty) => void
    difficulty: SudokuBoardDifficulty
    canRestart: boolean
    setCanRestart: (canRestart: boolean) => void
    restarting: boolean
    setRestarting: (restarting: boolean) => void
}

const RestartGameContext = createContext<RestartGameContext>({
    restartGame: () => {},
    difficulty: "easy",
    canRestart: true,
    setCanRestart: () => {},
    restarting: false,
    setRestarting: () => {},
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
    const [restarting, setRestarting] = useState(false)

    const router = useRouter()
    const restartGame: RestartGameContext["restartGame"] = (difficulty) => {
        const difficultyCookie = `difficulty=${difficulty}`
        // eslint-disable-next-line react-compiler/react-compiler
        document.cookie = `${difficultyCookie}; path=/`

        setRestarting(true)
        router.refresh()
    }

    const [difficulty, setDifficulty] = useState<SudokuBoardDifficulty>(() => {
        const cookieSet = new Map<string, string>(
            globalThis?.document?.cookie
                .split("; ")
                .map((item) => item.split("=") as [string, string])
        )

        return (cookieSet.get("difficulty") as SudokuBoardDifficulty) ?? "easy"
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
                restarting,
                setRestarting,
            }}
        >
            {children}
        </RestartGameContext.Provider>
    )
}

export { RestartGameContextProvider, useRestartGameContext }
