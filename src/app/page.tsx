import ClientGame from "@/components/ClientGame"
import ServerGame from "@/components/ServerGame"
import { cookies as setupCookies } from 'next/headers'
import { EndGameModalContextProvider } from "@/context/EndGameModal"

export default async function Home({ searchParams }: { searchParams: { game?: string } }) {
    const cookies = setupCookies()
    const { game } = searchParams
    const regenerateClient = cookies.get('regenerateClient')

    return (
        <EndGameModalContextProvider>
            {regenerateClient?.value ? <ClientGame /> : <ServerGame game={game} />}
        </EndGameModalContextProvider>
    )
}
