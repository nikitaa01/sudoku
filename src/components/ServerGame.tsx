import Game from "@/components/Game"
import { getSudokuData } from "@/controllers/sudokuBoard"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { cookies } from "next/headers"
import GameSkeleton from "./GameSkeleton"

export default async function ServerGame() {
    const awaitedCookies = await cookies()

    const difficulty =
        (awaitedCookies.get("difficulty")?.value as SudokuBoardDifficulty) ??
        "easy"

    const res = getSudokuData({
        difficulty,
    })

    if (!res) return <GameSkeleton />

    return <Game {...res} />
}
