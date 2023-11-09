import { useRestartGameContext } from "@/context/RestartGame"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useState } from "react"
import Button from "./UI/Button"

export default function NewGameForm() {
    const [activeDifficulty, setActiveDifficulty] = useState<SudokuBoardDifficulty>(() => {
        const value = getComputedStyle(document.documentElement).getPropertyValue('--left-new-game')
        const difficultyMap = {
            '0': 'easy',
            '100%': 'medium',
            '200%': 'hard'
        }
        return difficultyMap[value as '0' | '100%' | '200%'] as SudokuBoardDifficulty ?? 'easy'
    })
    const { restartGame } = useRestartGameContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const difficulty = e.currentTarget.textContent?.toLocaleLowerCase() as SudokuBoardDifficulty ?? 'easy'
        setActiveDifficulty(difficulty)
        const leftMap = {
            'easy': '0',
            'medium': '100%',
            'hard': '200%',
            'expert': '0'
        }
        document.documentElement.style.setProperty('--left-new-game', leftMap[difficulty])
    }

    const handlePlay = () => {
        restartGame(activeDifficulty)
    }

    return (
        <div className="w-full grid grid-cols-1 gap-2 place-content-center mt-4">
            <h2 className="text-center font-bold text-black/80">New Game?</h2>
            <div className="p-1 bg-gray-200/80 rounded-md grid grid-cols-3 gap-1 w-full relative">
                <div className="z-10 p-1 absolute h-full left-0 translate-x-[var(--left-new-game)] w-1/3 transition-all ease-in-out" >
                    <div className="w-full h-full bg-white shadow rounded-md" />
                </div>
                <button
                    className={`py-1 px-2 z-20 rounded-md ${activeDifficulty !== 'easy' ? 'hover:bg-gray-300/80 transition-all hover:shadow' : ''}`}
                    onClick={handleClick}
                >
                    Easy
                </button>
                <button
                    className={`py-1 px-2 z-20 rounded-md ${activeDifficulty !== 'medium' ? 'hover:bg-gray-300/80 transition-all hover:shadow' : ''}`}
                    onClick={handleClick}
                >
                    Medium
                </button>
                <button
                    className={`py-1 px-2 z-20 rounded-md ${activeDifficulty !== 'hard' ? 'hover:bg-gray-300/80 transition-all hover:shadow' : ''}`}
                    onClick={handleClick}
                >
                    Hard
                </button>
            </div>
            <Button
                onClick={handlePlay}
            >
                Play
            </Button>
        </div>
    )
}