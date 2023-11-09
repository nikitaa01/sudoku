'use client'

import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { createContext, useContext, useState } from "react"

interface RestartGameContext {
    restartGame: (difficulty: SudokuBoardDifficulty) => void,
    setRestartGame: (restartGame: (difficulty: SudokuBoardDifficulty) => void) => void,
    difficulty: SudokuBoardDifficulty,
    canRestart: boolean,
    setCanRestart: (canRestart: boolean) => void
}

const RestartGameContext = createContext<RestartGameContext>({
    restartGame: () => { },
    setRestartGame: () => { },
    difficulty: 'easy',
    canRestart: true,
    setCanRestart: () => { }
})

const useRestartGameContext = () => {
    const context = useContext(RestartGameContext)

    if (context === undefined) {
        throw new Error('useRestartGameContext must be used within a RestartGameContextProvider')
    }

    return context
}

const RestartGameContextProvider = ({ children }: {
    children: React.ReactNode,
}) => {
    const [restartGame, setRestartGame] = useState<RestartGameContext['restartGame']>(() => () => { })
    const [difficulty, setDifficulty] = useState<SudokuBoardDifficulty>(() => {
        const difficulty = globalThis?.window?.location?.search?.split('difficulty=')[1]?.split('&')[0] as SudokuBoardDifficulty | undefined
        return difficulty ?? 'easy'
    })
    const [canRestart, setCanRestart] = useState(true)
    const restartGameHandler = (difficulty: SudokuBoardDifficulty) => {
        setDifficulty(difficulty)
        restartGame(difficulty)
        setCanRestart(true)
    }


    return (
        <RestartGameContext.Provider value={{ restartGame: restartGameHandler, setRestartGame, difficulty, canRestart, setCanRestart }}>
            {children}
        </RestartGameContext.Provider>
    )
}

export { RestartGameContextProvider, useRestartGameContext }
