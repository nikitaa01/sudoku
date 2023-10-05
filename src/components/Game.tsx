import SudokuData from "@/types/sudokuData"
import UpdateSearchParams from "@/components/UpdateSearchParams"
import SudokuCell from "@/components/SudokuCell"
import { SudokuActiveCellDataContextProvider } from "@/context/SudokuActiveCellData"
import DiagonalDisplayGridAnimation from "@/components/DiagonalDisplayGridAnimation"
import SudokuActionButton from "@/components/SudokuActionButton"
import { SudokuGameStateContextProvider } from "@/context/SudokuGameState"
import CheckIsSolved from "@/components/CheckIsSolved"
import Timer from "@/components/Timer"
import Mistakes from "@/components/Mistakes"
import KeyboardListener from "@/components/KeyboardListener"
import { MessageContextProvider } from "@/context/MessageContext"


export default function Game({ board, boardStr, resolvedBoard, onCancelModal }: SudokuData & { boardStr: string, onCancelModal?: () => void }) {
    return (
        <>
            <UpdateSearchParams
                newSearchParams={{ game: boardStr }}
            />
            <main className="w-screen h-screen flex justify-center items-center">
                <SudokuGameStateContextProvider
                    board={board}
                >
                    <SudokuActiveCellDataContextProvider>
                        <div className="flex flex-col">
                            <div className="flex justify-between py-2">
                                <Mistakes />
                                <Timer />
                            </div>
                            <div id="grid-cells" className="grid grid-cols-9 grid-rows-9">
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
                                <div id="action-buttons" className="grid grid-cols-9 py-4">
                                    {
                                        new Array(9).fill(0).map((_, index) => <SudokuActionButton
                                            key={index}
                                            value={index + 1}
                                        />)
                                    }
                                </div>
                                <CheckIsSolved onCancelModal={onCancelModal} />
                            </MessageContextProvider>
                        </div>
                        <KeyboardListener />
                    </SudokuActiveCellDataContextProvider>
                </SudokuGameStateContextProvider>
            </main>
            <DiagonalDisplayGridAnimation />
        </>
    )

}