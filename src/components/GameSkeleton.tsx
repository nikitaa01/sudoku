import Mistakes from "./Mistakes"
import SudokuActionButtonsRoot from "./SudokuActionButtonsRoot"
import Timer from "./Timer"

export default function GameSkeleton() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div
        className="absolute w-full h-full opacity-50 z-[1] bg-white"
      />
      <div className="flex flex-col">
        <div className="flex justify-between py-2">
          <Mistakes />
          <Timer />
        </div>
        <div id="grid-cells" className="z-[2] w-[360px] h-[360px] md:w-[432px] md:h-[432px] grid grid-cols-3 grid-rows-3 animate-pulse gap-4">
          {new Array(9).fill(null).map((_, i) => {
            const colors = {
              0: 'bg-blue-100',
              1: 'bg-blue-50',
              2: 'bg-blue-200',
              3: 'bg-blue-200',
              4: 'bg-blue-100',
              5: 'bg-blue-50',
              6: 'bg-blue-50',
              7: 'bg-blue-200',
              8: 'bg-blue-100',
            }
            return (
              <div
                key={Math.random()}
                // @ts-ignore
                className={`${colors[i]} rounded-md`}
              />
            )
          })}
        </div>
        <SudokuActionButtonsRoot />
      </div>
    </main>
  )
}