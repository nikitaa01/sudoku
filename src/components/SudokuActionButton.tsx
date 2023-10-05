'use client'

import { useSudokuActiveCellDataContext } from "@/context/SudokuActiveCellData"
import { useSudokuGameStateContext } from "@/context/SudokuGameState"
import { useMessageContext } from "@/context/MessageContext"

export default function SudokuActionButton({ value }: { value: number }) {
    const { correctValue, setValue, setData, num } = useSudokuActiveCellDataContext()
    const { setEachNumberLeft, setIsSolved, eachNumberLeft, setErrors } = useSudokuGameStateContext()
    const { addMessage } = useMessageContext()

    const handleClick = () => {
        if (correctValue === num) {
            // TODO message to user that the cell is already correct
            addMessage('The cell is already correct')
            return
        }
        if (value === correctValue) {
            // TODO message to user that the cell is correct
            setValue && setValue(value)
            setData(prev => {
                const { col, row, square, correctValue, setValue } = prev
                return { col, row, square, num: value, correctValue, setValue, setData }
            })
            setEachNumberLeft(prev => {
                const newEachNumberLeft = [...prev]
                newEachNumberLeft[value - 1]--
                if (newEachNumberLeft.every(item => item === 0)) {
                    setIsSolved(1)
                }
                return newEachNumberLeft
            })
        } else {
            // TODO message to user that the cell is incorrect
            addMessage('The cell is incorrect')
            setValue && setValue(value)
            setErrors(prev => {
                const newErrors = prev + 1
                if (newErrors === 3) {
                    setIsSolved(-1)
                }
                return newErrors
            })
        }
    }

    return (
        <>
            <button
                onClick={handleClick}
                className={`rounded-sm aspect-square w-full text-3xl md:text-4xl text-black/80 flex justify-center items-center font-extralight transition-all hover:bg-gray-200/80 hover:shadow ${eachNumberLeft[value - 1] === 0 ? 'invisible' : ''}`}
            >
                {value}
            </button>
        </>
    )
}