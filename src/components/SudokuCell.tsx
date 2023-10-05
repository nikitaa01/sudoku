import SudokuCellClient from "./SudokuCellClient"

interface Props { index: number, value: number, correctValue: number, col: number, row: number }

export default function SudokuCell({ index, value, correctValue, col, row }: Props) {
    const leftBorder = col === 0 ? 'border-l-[2px]' : index % 3 === 0 ? 'border-l-[1px]' : 'border-l-[0.2px]'
    const rightBorder = col === 8 ? 'border-r-[2px]' : index % 3 === 2 ? 'border-r-[1px]' : 'border-r-[0.2px]'
    const topBorder = row === 0 ? 'border-t-[2px]' : index % 27 < 9 ? 'border-t-[1px]' : 'border-t-[0.2px]'
    const bottomBorder = row === 8 ? 'border-b-[2px]' : index % 27 >= 18 ? 'border-b-[1px]' : 'border-b-[0.2px]'

    return (
        <div
            className={`w-10 h-10 md:w-12 md:h-12 border-black/80 ${leftBorder} ${topBorder} ${rightBorder} ${bottomBorder} scale-0 opacity-0 transition-all duration-100`}
        >
            <SudokuCellClient
                index={index}
                value={value}
                correctValue={correctValue}
                col={col}
                row={row}
            />
        </div>
    )
}
