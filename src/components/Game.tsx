import CheckIsSolved from "@/components/CheckIsSolved"
import DiagonalDisplayGridAnimation from "@/components/DiagonalDisplayGridAnimation"
import KeyboardListener from "@/components/KeyboardListener"
import Mistakes from "@/components/Mistakes"
import Timer from "@/components/Timer"
import { EndGameModalContextProvider } from "@/context/EndGameModal"
import { MessageContextProvider } from "@/context/MessageContext"
import { SudokuActiveCellDataContextProvider } from "@/context/SudokuActiveCellData"
import { SudokuGameStateContextProvider } from "@/context/SudokuGameState"
import { SudokuTimerContextProvider } from "@/context/SudokuTimer"
import SudokuData from "@/types/sudokuData"
import { GameGrid } from "./GameGrid"
import { SetRestartingFalse } from "./SetRestartingFalse"
import SudokuActionButtonsRoot from "./SudokuActionButtonsRoot"
import SudokuCell from "./SudokuCell"
import { UpdateCookies } from "./UpdateCookies"

export default async function Game({
    board,
    difficulty,
    resolvedBoard,
}: SudokuData) {
    return (
        <main className="w-screen h-dvh flex justify-center items-center">
            <UpdateCookies difficulty={difficulty} />
            <SetRestartingFalse board={board} />
            <EndGameModalContextProvider>
                <SudokuActiveCellDataContextProvider board={board}>
                    <SudokuGameStateContextProvider board={board}>
                        <SudokuTimerContextProvider>
                            <div className="flex flex-col">
                                <div className="flex justify-between py-2">
                                    <Mistakes />
                                    <Timer />
                                </div>
                                <GameGrid>
                                    <div
                                        id="grid-cells"
                                        className="grid grid-cols-9 grid-rows-9 relative"
                                    >
                                        {board.map((row, rowIndex) =>
                                            row.map((item, colIndex) => (
                                                <SudokuCell
                                                    key={
                                                        rowIndex * 9 + colIndex
                                                    }
                                                    index={
                                                        rowIndex * 9 + colIndex
                                                    }
                                                    row={rowIndex}
                                                    col={colIndex}
                                                    value={item}
                                                    correctValue={
                                                        resolvedBoard[rowIndex][
                                                            colIndex
                                                        ]
                                                    }
                                                    board={board}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <DiagonalDisplayGridAnimation
                                        board={board}
                                    />
                                </GameGrid>
                                <MessageContextProvider>
                                    <SudokuActionButtonsRoot />
                                    <CheckIsSolved />
                                </MessageContextProvider>
                            </div>
                            <KeyboardListener />
                        </SudokuTimerContextProvider>
                    </SudokuGameStateContextProvider>
                </SudokuActiveCellDataContextProvider>
            </EndGameModalContextProvider>
        </main>
    )
}
