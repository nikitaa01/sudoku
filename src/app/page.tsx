import GameSkeleton from "@/components/GameSkeleton"
import Navbar from "@/components/Navbar"
import ServerGame from "@/components/ServerGame"
import { RestartGameContextProvider } from "@/context/RestartGame"
import { Suspense } from "react"

export default function Home() {
    return (
        <RestartGameContextProvider>
            <Navbar />
            <Suspense fallback={<GameSkeleton />}>
                <ServerGame />
            </Suspense>
        </RestartGameContextProvider>
    )
}
