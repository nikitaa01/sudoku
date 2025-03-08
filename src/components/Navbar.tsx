"use client"

import { useRestartGameContext } from "@/context/RestartGame"
import SudokuBoardDifficulty from "@/types/sudokuBoardDifficulty"
import { KeyboardEventHandler, useEffect, useState } from "react"
import Button from "./UI/Button"
import Modal from "./UI/Modal"

export const dynamic = "force-dynamic"

export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { restartGame, difficulty, canRestart } = useRestartGameContext()
    const [open, setOpen] = useState<SudokuBoardDifficulty | false>(false)

    useEffect(() => {
        const leftMap = {
            easy: "0",
            medium: "100%",
            hard: "200%",
            expert: "0",
        }
        document.documentElement.style.setProperty(
            "--left-navbar",
            leftMap[difficulty]
        )
        if (!mounted) setTimeout(() => setMounted(true), 150)
    }, [difficulty])

    const resetKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
    }

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const difficulty =
            (e.currentTarget.textContent?.toLocaleLowerCase() as SudokuBoardDifficulty) ??
            "easy"
        if (!canRestart) {
            const pauseBtn = globalThis?.document.getElementById("pause-btn")
            if (pauseBtn?.getAttribute("data-paused") === "false")
                pauseBtn.click()
            setOpen(difficulty)
            return
        }
        restartGame(difficulty)
    }

    return (
        <>
            <Modal open={open !== false} onCancel={() => setOpen(false)}>
                <ModalChildren
                    difficulty={open || "easy"}
                    setOpen={setOpen}
                    restartGame={restartGame}
                />
            </Modal>
            <nav className="p-1 m-2 md:my-4 md:mx-8 rounded-md grid grid-cols-3 gap-1 fixed w-64">
                <div
                    className={`z-[1] p-1 absolute h-full left-0 translate-x-[var(--left-navbar)] w-1/3 transition-all ease-in-out ${
                        !mounted ? "opacity-0" : ""
                    }`}
                >
                    <div className="w-full h-full bg-gray-100 border-gray-200 shadow rounded-md" />
                </div>
                <button
                    className={`focus:outline-none py-1 px-2 z-[2] rounded-md ${
                        !mounted
                            ? ""
                            : difficulty !== "easy"
                            ? "hover:bg-gray-100 transition-all hover:shadow"
                            : "font-bold"
                    }`}
                    onClick={handleClick}
                    onKeyDown={resetKeyDown}
                >
                    Easy
                </button>
                <button
                    className={`focus:outline-none py-1 px-2 z-[2] rounded-md ${
                        !mounted
                            ? ""
                            : difficulty !== "medium"
                            ? "hover:bg-gray-100 transition-all hover:shadow"
                            : "font-bold"
                    }`}
                    onClick={handleClick}
                    onKeyDown={resetKeyDown}
                >
                    Medium
                </button>
                <button
                    className={`focus:outline-none py-1 px-2 z-[2] rounded-md ${
                        !mounted
                            ? ""
                            : difficulty !== "hard"
                            ? "hover:bg-gray-100 transition-all hover:shadow"
                            : "font-bold"
                    }`}
                    onClick={handleClick}
                    onKeyDown={resetKeyDown}
                >
                    Hard
                </button>
            </nav>
        </>
    )
}

const ModalChildren = ({
    difficulty,
    setOpen,
    restartGame,
}: {
    difficulty: SudokuBoardDifficulty
    setOpen: (value: false | SudokuBoardDifficulty) => void
    restartGame: (difficulty: SudokuBoardDifficulty) => void
}) => {
    const handleSucces = () => {
        restartGame(difficulty)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-8 justify-center items-center w-52">
            <h1 className="font-bold text-xl text-black/80 text-center">
                Are you sure you want to start a new game?
            </h1>
            <div className="grid grid-cols-2 w-full gap-4">
                <Button onClick={handleCancel} style="secundary">
                    No
                </Button>
                <Button onClick={handleSucces}>Yes</Button>
            </div>
        </div>
    )
}
