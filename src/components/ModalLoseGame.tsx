import NewGameForm from "./NewGameForm"

export default function ModalLoseGame() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-black/80">Game Over</h1>
            <p className="font-bold text-base text-gray-400 text-center">You have made 3 mistakes and lost this game</p>
            <NewGameForm />
        </div>
    )
}