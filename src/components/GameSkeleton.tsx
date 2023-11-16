import Mistakes from "./Mistakes"
import SudokuActionButtonsRoot from "./SudokuActionButtonsRoot"
import Timer from "./Timer"

export default function GameSkeleton() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div
        className="absolute w-full h-full opacity-50 z-10 bg-white"
      />
      <div className="flex flex-col">
        <div className="flex justify-between py-2">
          <Mistakes />
          <Timer />
        </div>
        <div id="grid-cells" className="z-20 w-[360px] h-[360px] md:w-[432px] md:h-[432px] grid grid-cols-7 grid-rows-7 animate-pulse gap-2">
          {new Array(49).fill(null).map(() => (
            <div
              key={Math.random()}
              className="bg-gray-300 rounded-md"
            />
          ))}
        </div>
        <SudokuActionButtonsRoot />
      </div>
    </main>
  )
}