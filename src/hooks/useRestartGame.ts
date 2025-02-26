import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { useRouter } from "next/navigation"

export default function useRestartGame() {
    const { refresh } = useRouter()

    const restart = (difficulty: SudokuBoardDifficulty) => {
        const newUrl = `${window.location.pathname}`
        globalThis?.window?.history?.replaceState(null, "", newUrl)
        // eslint-disable-next-line react-compiler/react-compiler
        document.cookie = `difficulty=${difficulty}; path=/`
        refresh()
    }

    return { restart }
}
