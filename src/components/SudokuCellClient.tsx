'use client'

import { useSudokuActiveCellDataContext } from "@/context/SudokuActiveCellData"
import { useState, useMemo } from "react"

interface Props { index: number, value: number, correctValue: number, col: number, row: number }

export default function SudokuCellClient({ value: valueProp, correctValue, col, row }: Props) {
    const [value, setValue] = useState(valueProp)
    const data = useSudokuActiveCellDataContext()

    const square = useMemo(() => Math.floor(col / 3) * 3 + Math.floor(row / 3), [col, row])

    const bgColor = useMemo(() => {
        if (data.col === col && data.row === row) {
            return 'bg-blue-600/30'
        } else if (data.col === col || data.row === row || data.square === square) {
            return 'bg-blue-300/20'
        } else {
            return ''
        }
    }, [data.col, data.row, data.square, col, row, square])

    const fontWeight = useMemo(() => {
        if (value !== 0 && value === data.num) {
            return 'font-light bg-blue-600/30'
        } else {
            return ''
        }
    }, [value, data.num])

    const handleClick = () => {
        data.setData({ col, row, square, num: value, correctValue, setValue, setData: data.setData })
    }

    return (
        <button
            aria-label={`sudoku cell ${col + 1} ${row + 1}`}
            onClick={handleClick}
            className={`h-full w-full text-2xl md:text-3xl text-black/80 flex justify-center items-center font-extralight transition-all duration-75 focus:outline-none hover:bg-gray-200/80 ${bgColor} ${fontWeight}`}
        >
            {value === 0 ? (
                ""
            ) : value === valueProp ? (
                value
            ) : value === correctValue ? (
                <span className="text-blue-600 font-light">{value}</span>
            ) : (
                <span className="text-red-600 font-light">{value}</span>
            )}
        </button>
    )
}
