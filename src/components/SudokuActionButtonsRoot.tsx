'use client'

import SudokuActionButton from "./SudokuActionButton"

export default function SudokuActionButtonsRoot() {
    const handleMouseLeave = () => {
        document.documentElement.style.removeProperty('--left-action-button')
        document.documentElement.style.removeProperty('--width-action-button')
        document.documentElement.style.removeProperty('--opacity-action-button')
    }

    return (
        <div id="action-buttons" className="grid grid-cols-9 py-4" onMouseLeave={handleMouseLeave}>
            <div className="absolute transition-all ease-in-out left-[var(--left-action-button)] w-[var(--width-action-button)] opacity-[var(--opacity-action-button)] aspect-square bg-gray-200/80 shadow -z-10" />
            {
                new Array(9).fill(0).map((_, index) => <SudokuActionButton
                    key={index}
                    value={index + 1}
                />)
            }
        </div>
    )
}