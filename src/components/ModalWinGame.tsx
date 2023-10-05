export default function ModalWinGame() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">¡Felicidades!</h1>
            <p className="text-xl font-semibold">Has completado el sudoku</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">Aceptar</button>
        </div>
    )
}