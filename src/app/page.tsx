import ClientGame from "@/components/ClientGame"
import GameSkeleton from "@/components/GameSkeleton"
import Navbar from "@/components/Navbar"
import ServerGame from "@/components/ServerGame"
import { EndGameModalContextProvider } from "@/context/EndGameModal"
import { RestartGameContextProvider } from "@/context/RestartGame"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { cookies as setupCookies } from 'next/headers'
import { Suspense } from "react"

export default async function Home({ searchParams }: { searchParams: { game?: string, difficulty: SudokuBoardDifficulty } }) {
    const cookies = setupCookies()
    const { game, difficulty: difficultySearchParam } = searchParams
    const regenerateClient = cookies.get('regenerateClient')
    const difficultyCookie = cookies.get('difficulty')
    const difficulty = difficultyCookie?.value as SudokuBoardDifficulty | undefined

    return (
        <RestartGameContextProvider>
            <Navbar />
            <EndGameModalContextProvider>
                {regenerateClient?.value
                    ? <ClientGame difficulty={difficulty} />
                    : (
                        <Suspense fallback={<GameSkeleton />}>
                            <ServerGame game={game} />
                        </Suspense>
                    )
                }
            </EndGameModalContextProvider>
        </RestartGameContextProvider>
    )
}
