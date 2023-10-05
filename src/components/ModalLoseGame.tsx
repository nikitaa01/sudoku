export default function ModalLoseGame() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold">¡Lo sentimos!</h1>
            <p className="text-xl font-semibold">Has perdido el sudoku</p>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">Aceptar</button>
        </div>
    )
}