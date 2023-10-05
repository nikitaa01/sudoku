'use client'

import { createContext, useContext, useEffect, useState } from "react"

// TODO: change is solved to -1, 0, 1 instead of true/false

interface SudokuGameStateContext {
    counter: { s: number, m: number },
    setCounter: React.Dispatch<React.SetStateAction<{ s: number, m: number }>>,
    errors: number,
    setErrors: React.Dispatch<React.SetStateAction<number>>,
    eachNumberLeft: number[],
    setEachNumberLeft: React.Dispatch<React.SetStateAction<number[]>>,
    isSolved: -1 | 0 | 1,
    setIsSolved: React.Dispatch<React.SetStateAction<-1 | 0 | 1>>,
}

const SudokuGameStateContext = createContext<SudokuGameStateContext>({
    counter: { s: 0, m: 0 },
    setCounter: () => { },
    errors: 0,
    setErrors: () => { },
    eachNumberLeft: [],
    setEachNumberLeft: () => { },
    isSolved: 0,
    setIsSolved: () => { },
})


const useSudokuGameStateContext = () => {
    const context = useContext(SudokuGameStateContext)
    if (context === undefined) {
        throw new Error('useSudokuGameStateContext must be used within a SudokuGameStateContextProvider')
    }
    return context
}

const SudokuGameStateContextProvider = ({ board, children }: {
    board: number[][],
    children: React.ReactNode,
}) => {
    const [eachNumberLeft, setEachNumberLeft] = useState<number[]>(() => {
        const countEachNumber = Array(9).fill(0)
        for (const row of board) {
            for (const item of row) {
                if (item !== 0) {
                    countEachNumber[item - 1]++
                }
            }
        }
        return countEachNumber.map(item => 9 - item)
    })
    const [isSolved, setIsSolved] = useState<-1 | 0 | 1>(0)
    const [counter, setCounter] = useState({ s: 0, m: 0 })
    const [errors, setErrors] = useState(0)

    useEffect(() => {
        if (isSolved) {
            return
        }
        const interval = setInterval(async () => {
            setCounter(prev => {
                if (prev.s === 59) {
                    return { s: 0, m: prev.m + 1 }
                }
                return { s: prev.s + 1, m: prev.m }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [isSolved])


    return (
        <SudokuGameStateContext.Provider value={{ eachNumberLeft, setEachNumberLeft, isSolved, setIsSolved, counter, setCounter, errors, setErrors }}>
            {children}
        </SudokuGameStateContext.Provider>
    )
}

export { SudokuGameStateContextProvider, useSudokuGameStateContext }