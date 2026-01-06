import { Button } from "@/components/ui/button"
import type { EmergencyData } from "@/app/page"
import { Heart, Home, Briefcase, BookOpen, CheckCircle } from "lucide-react"

type Props = {
  data: EmergencyData
}

const supportResources = [
  {
    icon: Heart,
    title: "心理健康支持",
    description: "免費心理諮詢與情緒支持服務",
    link: "了解更多",
  },
  {
    icon: Home,
    title: "長期住宅協助",
    description: "社會住宅申請與租屋補助資訊",
    link: "了解更多",
  },
  {
    icon: Briefcase,
    title: "就業培訓服務",
    description: "職業訓練與就業媒合計畫",
    link: "了解更多",
  },
  {
    icon: BookOpen,
    title: "教育與技能",
    description: "免費線上課程與證照培訓",
    link: "了解更多",
  },
]

export function StepSix({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">流程已完成</h2>
            <p className="text-muted-foreground">感謝您完成申請流程</p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
        <h3 className="font-semibold text-foreground text-lg">🎯 接下來會發生什麼?</h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>我們會在 3-5 個工作天內與您聯繫</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>社工將進行詳細評估並安排後續協助</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>您會收到申請進度的通知(簡訊或Email)</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">可能對您有幫助的其他資源</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {supportResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={index}
                className="p-5 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{resource.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                  {resource.link} →
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent">
            返回首頁
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            查看申請進度
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>如有任何問題，請聯繫我們：</p>
        <p className="font-medium text-foreground mt-1">聯絡信箱：service@familyfinhealth.com</p>
      </div>
    </div>
  )
}
