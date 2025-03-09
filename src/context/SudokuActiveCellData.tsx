"use client"
import { createContext, useContext, useEffect, useState } from "react"

interface SudokuActiveCellDataContext {
    col: number
    row: number
    square: number
    num: number
    correctValue: number
    setValue?: React.Dispatch<React.SetStateAction<number>>
    setData: React.Dispatch<React.SetStateAction<SudokuActiveCellDataContext>>
}

const SudokuActiveCellDataContext = createContext<SudokuActiveCellDataContext>({
    col: -1,
    row: -1,
    square: -1,
    num: 0,
    correctValue: 0,
    setData: () => {},
})

const SudokuActiveCellDataContextProvider = ({
    children,
    board,
}: {
    children: React.ReactNode
    board: number[][]
}) => {
    const [data, setData] = useState<SudokuActiveCellDataContext>({
        col: -1,
        row: -1,
        square: -1,
        num: 0,
        correctValue: 0,
        setData: () => {},
    })

    useEffect(() => {
        setData({
            col: -1,
            row: -1,
            square: -1,
            num: 0,
            correctValue: 0,
            setData: () => {},
        })
    }, [board])

    return (
        <SudokuActiveCellDataContext.Provider value={{ ...data, setData }}>
            {children}
        </SudokuActiveCellDataContext.Provider>
    )
}

const useSudokuActiveCellDataContext = () => {
    const context = useContext(SudokuActiveCellDataContext)
    if (!context) {
        throw new Error(
            "useSudokuActiveCellDataContext must be used within a SudokuActiveCellDataContextProvider"
        )
    }
    return context
}

export { SudokuActiveCellDataContextProvider, useSudokuActiveCellDataContext }
