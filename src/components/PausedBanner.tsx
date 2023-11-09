import { useSudokuGameStateContext } from "@/context/SudokuGameState"

export default function PausedBanner() {
  const { setPaused } = useSudokuGameStateContext()

  return (
    <div className='absolute inset-0 w-full h-full flex justify-center items-center flex-col gap-4'>
      <div className='text-4xl font-bold text-center' >Paused</div>
      <div className='text-2xl flex items-center justify-center gap-2'>
        Press
        <kbd
          onClick={() => setPaused(false)}
          className="px-4 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:ring hover:ring-blue-300/80 transition-all">
          Spacebar
        </kbd>
        to continue
      </div>
    </div>
  )
}