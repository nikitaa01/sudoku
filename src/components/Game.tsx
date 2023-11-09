import CheckIsSolved from "@/components/CheckIsSolved"
import DiagonalDisplayGridAnimation from "@/components/DiagonalDisplayGridAnimation"
import KeyboardListener from "@/components/KeyboardListener"
import Mistakes from "@/components/Mistakes"
import SudokuCell from "@/components/SudokuCell"
import Timer from "@/components/Timer"
import UpdateSearchParams from "@/components/UpdateSearchParams"
import { MessageContextProvider } from "@/context/MessageContext"
import { SudokuActiveCellDataContextProvider } from "@/context/SudokuActiveCellData"
import { SudokuGameStateContextProvider } from "@/context/SudokuGameState"
import SudokuData from "@/types/sudokuData"
import SudokuActionButtonsRoot from "./SudokuActionButtonsRoot"


export default function Game({ board, boardStr, resolvedBoard, difficulty }: SudokuData & { boardStr: string }) {
    return (
        <>
            <UpdateSearchParams
                newSearchParams={{ game: boardStr, difficulty }}
            />
            <main className="w-screen h-screen flex justify-center items-center">
                <SudokuActiveCellDataContextProvider>
                    <SudokuGameStateContextProvider
                        board={board}
                    >
                        <div className="flex flex-col">
                            <div className="flex justify-between py-2">
                                <Mistakes />
                                <Timer />
                            </div>
                            <div id="grid-cells" className="grid grid-cols-9 grid-rows-9 relative">
                                {
                                    board.map((row, rowIndex) => row.map((item, colIndex) => <SudokuCell
                                        key={rowIndex * 9 + colIndex}
                                        index={rowIndex * 9 + colIndex}
                                        row={rowIndex}
                                        col={colIndex}
                                        value={item}
                                        correctValue={resolvedBoard[rowIndex][colIndex]}
                                    />)
                                    )}
                            </div>
                            <MessageContextProvider>
                                <SudokuActionButtonsRoot />
                                <CheckIsSolved />
                            </MessageContextProvider>
                        </div>
                        <KeyboardListener />
                        <DiagonalDisplayGridAnimation />
                    </SudokuGameStateContextProvider>
                </SudokuActiveCellDataContextProvider>
            </main>
        </>
    )

}