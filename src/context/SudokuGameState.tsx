"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRestartGameContext } from "./RestartGame"
import { useSudokuActiveCellDataContext } from "./SudokuActiveCellData"

interface SudokuGameStateContext {
    errors: number
    setErrors: React.Dispatch<React.SetStateAction<number>>
    eachNumberLeft: number[]
    setEachNumberLeft: React.Dispatch<React.SetStateAction<number[]>>
    paused: boolean
    setPaused: React.Dispatch<React.SetStateAction<boolean>>
    isSolved: -1 | 0 | 1
    setIsSolved: React.Dispatch<React.SetStateAction<-1 | 0 | 1>>
}

const SudokuGameStateContext = createContext<SudokuGameStateContext>({
    errors: 0,
    setErrors: () => {},
    eachNumberLeft: [],
    setEachNumberLeft: () => {},
    paused: false,
    setPaused: () => {},
    isSolved: 0,
    setIsSolved: () => {},
})

const useSudokuGameStateContext = () => {
    const context = useContext(SudokuGameStateContext)
    if (!context) {
        throw new Error(
            "useSudokuGameStateContext must be used within a SudokuGameStateContextProvider"
        )
    }
    return context
}

const SudokuGameStateContextProvider = ({
    board,
    children,
}: {
    board: number[][]
    children: React.ReactNode
}) => {
    const getInitialEachNumberLeft = () => {
        const countEachNumber = Array(9).fill(0)
        for (const row of board) {
            for (const item of row) {
                if (item !== 0) {
                    countEachNumber[item - 1]++
                }
            }
        }
        return countEachNumber.map((item) => 9 - item)
    }

    const [eachNumberLeft, setEachNumberLeft] = useState<number[]>(
        getInitialEachNumberLeft
    )
    const [isSolved, setIsSolved] = useState<-1 | 0 | 1>(0)
    const [errors, setErrors] = useState(0)
    const [paused, setPaused] = useState(false)
    const activeCellData = useSudokuActiveCellDataContext()
    const { canRestart, setCanRestart } = useRestartGameContext()

    useEffect(() => {
        setEachNumberLeft(getInitialEachNumberLeft())
        setIsSolved(0)
        setErrors(0)
        setPaused(false)
    }, [board])

    useEffect(() => {
        if (
            canRestart &&
            (JSON.stringify(getInitialEachNumberLeft()) !==
                JSON.stringify(eachNumberLeft) ||
                errors > 0)
        ) {
            setCanRestart(false)
        }
    }, [eachNumberLeft, errors, canRestart, setCanRestart])

    useEffect(() => {
        const handlePause = () => {
            setPaused(true)
        }
        document.addEventListener("visibilitychange", handlePause)
        window.addEventListener("blur", handlePause)
    }, [])

    useEffect(() => {
        if (paused)
            activeCellData.setData((prev) => ({
                ...prev,
                row: -1,
                col: -1,
                square: -1,
                num: -1,
                setValue: () => {},
            }))
    }, [paused])

    return (
        <SudokuGameStateContext.Provider
            value={{
                eachNumberLeft,
                setEachNumberLeft,
                isSolved,
                setIsSolved,
                errors,
                setErrors,
                paused,
                setPaused,
            }}
        >
            {children}
        </SudokuGameStateContext.Provider>
    )
}

export { SudokuGameStateContextProvider, useSudokuGameStateContext }
