'use client'

import { useMessageContext } from "@/context/MessageContext"
import { useSudokuActiveCellDataContext } from "@/context/SudokuActiveCellData"
import { useSudokuGameStateContext } from "@/context/SudokuGameState"

export default function SudokuActionButton({ value }: { value: number }) {
    const { correctValue, setValue, setData, num } = useSudokuActiveCellDataContext()
    const { setEachNumberLeft, setIsSolved, eachNumberLeft, setErrors, isSolved, paused } = useSudokuGameStateContext()
    const { addMessage } = useMessageContext()

    const handleClick = () => {
        if (isSolved !== 0 || paused || correctValue === 0) {
            return
        }
        if (correctValue === num) {
            addMessage('The cell is already correct')
            return
        }
        if (value === correctValue) {
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
                if (newEachNumberLeft[value - 1] === 0) {
                    addMessage(<>Congratulations! You have completed <strong>the number {value}</strong></>)
                }
                return newEachNumberLeft
            })
        } else {
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

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        document.documentElement.style.setProperty('--left-action-button', `${left}px`)
        document.documentElement.style.setProperty('--width-action-button', `${width}px`)
        document.documentElement.style.setProperty('--opacity-action-button', '1')
    }

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={`aspect-square w-full text-3xl md:text-4xl text-black/80 flex justify-center items-center font-extralight transition-all ${eachNumberLeft[value - 1] === 0 ? 'invisible' : ''}`}
        >
            {value}
        </button>
    )
}