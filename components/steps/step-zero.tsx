"use client"
import { useState } from "react"
import type { EmergencyData } from "@/app/page"
import { TrendingDown, Heart, Home, UserX, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

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
  {
    id: "other",
    icon: HelpCircle,
    title: "其他急難困難",
    shortTitle: "其他急難困難",
    story: "我面臨的困難不在上述情況中，但確實需要協助。",
  },
]

export function StepZero({ onNext, data }: Props) {
  // 從 data 中恢復已選擇的情境（支援複選）
  const initialSelected = Array.isArray(data.scenario) 
    ? data.scenario 
    : data.scenario 
      ? [data.scenario] 
      : []
  
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(initialSelected)

  const handleToggleScenario = (scenarioId: string) => {
    setSelectedScenarios((prev) => {
      if (prev.includes(scenarioId)) {
        return prev.filter((id) => id !== scenarioId)
      } else {
        return [...prev, scenarioId]
      }
    })
  }

  const handleContinue = () => {
    if (selectedScenarios.length > 0) {
      onNext({ scenario: selectedScenarios })
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請選擇您目前面臨的情況</h2>
        <p className="text-muted-foreground">這能幫助我們更快了解您的需求，可選擇多個最接近的情境</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon
          const isSelected = selectedScenarios.includes(scenario.id)
          return (
            <label
              key={scenario.id}
              className={`relative flex items-center gap-4 p-6 rounded-xl border-2 transition-all bg-gradient-to-br from-[#fef2f2] via-[#fff7ed] to-[#fff7ed] hover:from-[#fee2e2] hover:via-[#fed7aa] hover:to-[#fed7aa] cursor-pointer shadow-sm hover:shadow-lg ${
                isSelected
                  ? "border-primary bg-gradient-to-br from-[#fee2e2] via-[#fed7aa] to-[#fed7aa] shadow-md"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleToggleScenario(scenario.id)}
                className="flex-shrink-0"
              />
              
              <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center transition-all shadow-sm ${
                isSelected
                  ? "from-[#fda4af] to-[#fb923c]"
                  : ""
              }`}>
                <Icon className={`w-7 h-7 transition-colors ${
                  isSelected
                    ? "text-[#be123c]"
                    : "text-[#e11d48]"
                }`} />
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold text-lg leading-tight transition-colors ${
                  isSelected
                    ? "text-[#be185d]"
                    : "text-foreground"
                }`}>
                  {scenario.title}
                </h3>
              </div>
            </label>
          )
        })}
      </div>

      {/* 繼續按鈕 */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleContinue}
          disabled={selectedScenarios.length === 0}
          className="bg-gradient-to-r from-[#e11d48] to-[#f97316] hover:from-[#be123c] hover:to-[#ea580c] text-white px-12 py-6 text-lg"
        >
          繼續
        </Button>
      </div>
    </div>
  )
}
