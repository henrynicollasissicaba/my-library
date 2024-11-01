import { NumberTickerBook } from "./NumberTickerBook"

interface DashboardDataInterface {
  h2: string
  fontColor: string
  p: string
  className: string
  span?: number
}

export const dashboardData: DashboardDataInterface[] = [
  { h2: "Você possui", fontColor: "text-blue-600", p: "livros cadastrados", className: "md:col-span-6 border-blue-600" },
  { h2: "Você já leu", fontColor: "text-yellow-300", p: "livros", className: "md:col-span-3 border-yellow-300" },
  { h2: "Você tem", fontColor: "text-red-600", p: "livros para serem lidos", className: "md:col-span-3 border-red-600" },
]

export const DashboardData = ({h2, span, fontColor, p, className}: DashboardDataInterface) => {
  return (
    <div className={`${className} rounded-2xl bg-[#585858] p-4 border-l-[6px]
    shadow-md text-[#ecebeb]
    flex items-center justify-center flex-col gap-3 text-center`}
    >
        <h2 className="text-xl sm:text-2xl font-bold text-[#ecebeb]">
          {h2}
        </h2>
        {span !== undefined ? <NumberTickerBook value={span} fontColor={fontColor} /> : null}
        <p className="text-xl sm:text-2xl font-bold text-[#ecebeb]">{p}</p>
    </div>
  )
}