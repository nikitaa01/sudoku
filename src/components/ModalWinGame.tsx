'use client'
import NewGameForm from "./NewGameForm"

export default function ModalWinGame() {
    const getTimer = () => {
        const timerElement = document.getElementById('timer')
        const timer = timerElement?.textContent
        return timer
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center w-72">
            <h1 className="font-bold text-xl text-black/80">
                Congratulations! 🎉
            </h1>
            <p className="font-bold text-base text-gray-400 text-center">
                You won the game in {getTimer()}!
            </p>
            <NewGameForm />
        </div>
    )
}