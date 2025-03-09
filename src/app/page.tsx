import GameSkeleton from "@/components/GameSkeleton"
import Navbar from "@/components/Navbar"
import ServerGame from "@/components/ServerGame"
import { EndGameModalContextProvider } from "@/context/EndGameModal"
import { RestartGameContextProvider } from "@/context/RestartGame"
import { Suspense } from "react"

export const experimental_ppr = true

export default function Home() {
    return (
        <RestartGameContextProvider>
            <Navbar />
            <EndGameModalContextProvider>
                <Suspense fallback={<GameSkeleton />}>
                    <ServerGame />
                </Suspense>
            </EndGameModalContextProvider>
        </RestartGameContextProvider>
    )
}
