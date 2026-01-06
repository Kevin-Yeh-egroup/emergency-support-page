"use client"
import type { EmergencyData } from "@/app/page"
import { TrendingDown, Heart, Home, UserX } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  data: EmergencyData
}

const scenarios = [
  {
    id: "income-loss",
    icon: TrendingDown,
    title: "突然沒了收入，生活費撐不下去",
    shortTitle: "主要收入突然中斷（失業／停工）",
    story: "我原本靠這份工作維持全家的生活，但最近因為裁員、公司倒閉或臨時停工，我的收入在短時間內突然中斷了。房租、水電、孩子的生活費接踵而來，我手邊的現金已經快用完，不知道接下來該怎麼撐下去。",
  },
  {
    id: "medical-emergency",
    icon: Heart,
    title: "一場生病，打亂整個家庭",
    shortTitle: "突發醫療事件，支出瞬間暴增",
    story: "我的家人或我自己突然住院、需要手術，我原本沒有預期會發生這樣的醫療狀況。除了醫療費用，也因為需要照顧，我暫時無法正常工作，家庭收入與支出同時失衡，已經影響到我的基本生活。",
  },
  {
    id: "disaster-accident",
    icon: Home,
    title: "家裡突然不能住了",
    shortTitle: "天災／事故，居住與生活受影響",
    story: "因為火災、淹水、地震或其他意外事故，我原本居住的地方短時間內無法使用了。我需要臨時安置、修繕，同時還要負擔額外支出，讓我的生活一下子陷入混亂，不知道能向誰求助。",
  },
  {
    id: "family-crisis",
    icon: UserX,
    title: "撐著全家的那個人突然不在了",
    shortTitle: "家庭支柱突發變故（過世／失聯）",
    story: "我們家庭主要的經濟來源或照顧者，因為過世、意外或突然失聯，讓我的家庭在短時間內失去支撐。原本分工清楚的生活，突然全部落在我身上，經濟與照顧壓力同時湧現，我不知道該如何面對。",
  },
]

export function StepZero({ onNext, data }: Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請選擇您目前面臨的情況</h2>
        <p className="text-muted-foreground">這能幫助我們更快了解您的需求，請選擇最接近的情境</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon
          return (
            <button
              key={scenario.id}
              onClick={() => onNext({ scenario: scenario.id })}
              className="relative flex flex-col gap-4 p-8 rounded-xl border-2 border-transparent hover:border-primary/40 transition-all bg-gradient-to-br from-[#fef2f2] via-[#fff7ed] to-[#fff7ed] hover:from-[#fee2e2] hover:via-[#fed7aa] hover:to-[#fed7aa] text-left group shadow-sm hover:shadow-lg min-h-[180px]"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center group-hover:from-[#fda4af] group-hover:to-[#fb923c] transition-all shadow-sm">
                  <Icon className="w-8 h-8 text-[#e11d48] group-hover:text-[#be123c] transition-colors" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-xl text-foreground group-hover:text-[#be185d] transition-colors leading-tight">
                    {scenario.title}
                  </h3>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500 ease-in-out">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                      {scenario.story}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
