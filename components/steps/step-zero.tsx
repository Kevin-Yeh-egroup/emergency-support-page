"use client"
import type { EmergencyData } from "@/app/page"
import { AlertCircle, Home, Heart, DollarSign, Briefcase, HelpCircle } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  data: EmergencyData
}

const scenarios = [
  {
    id: "medical",
    icon: Heart,
    title: "醫療急難",
    description: "突發疾病、意外受傷需要醫療協助",
  },
  {
    id: "housing",
    icon: Home,
    title: "居住問題",
    description: "面臨無家可歸或住所危機",
  },
  {
    id: "financial",
    icon: DollarSign,
    title: "經濟困難",
    description: "突然失去收入或面臨重大支出",
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "就業危機",
    description: "突然失業或工作權益受損",
  },
  {
    id: "other",
    icon: HelpCircle,
    title: "不確定／其他",
    description: "不確定屬於哪一類或有其他緊急狀況",
  },
]

export function StepZero({ onNext, data }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請選擇您目前面臨的情況</h2>
        <p className="text-muted-foreground">這能幫助我們更快了解您的需求,請選擇最接近的情境</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon
          return (
            <button
              key={scenario.id}
              onClick={() => onNext({ scenario: scenario.id })}
              className="flex items-start gap-4 p-6 rounded-lg border-2 border-border hover:border-primary transition-colors bg-card hover:bg-accent text-left group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">選擇情境只是為了幫助我們更了解您的狀況,不會影響您的申請資格</p>
      </div>
    </div>
  )
}
