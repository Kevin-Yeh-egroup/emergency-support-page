"use client"

import { Button } from "@/components/ui/button"
import type { EmergencyData } from "@/app/page"
import { FileText, Phone, MapPin, Users, ExternalLink } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

export function StepFive({ onNext, onBack, data }: Props) {
  const level = data.assessmentResult?.level || "medium"

  const actions =
    level === "high"
      ? [
          {
            icon: Phone,
            title: "立即聯繫緊急專線",
            description: "24小時服務,立即為您安排協助",
            action: "撥打 1957",
            variant: "default" as const,
          },
          {
            icon: FileText,
            title: "提交完整申請表",
            description: "填寫詳細資料以加速審核",
            action: "前往填寫",
            variant: "outline" as const,
          },
          {
            icon: MapPin,
            title: "尋找就近服務據點",
            description: "親自前往可獲得即時協助",
            action: "查看地圖",
            variant: "outline" as const,
          },
        ]
      : [
          {
            icon: FileText,
            title: "完成正式申請",
            description: "填寫完整資料以便後續處理",
            action: "開始填寫",
            variant: "default" as const,
          },
          {
            icon: Users,
            title: "諮詢社工服務",
            description: "預約專業社工進行評估",
            action: "預約諮詢",
            variant: "outline" as const,
          },
          {
            icon: Phone,
            title: "聯繫服務專線",
            description: "了解更多可用資源",
            action: "查看聯絡方式",
            variant: "outline" as const,
          },
        ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">建議行動</h2>
        <p className="text-muted-foreground">根據您的狀況,以下是我們建議的下一步行動</p>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <Button variant={action.variant} size="sm" className="mt-2">
                  {action.action}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 space-y-3">
        <h4 className="font-medium text-foreground">📋 您的申請摘要已保存</h4>
        <p className="text-sm text-muted-foreground">您填寫的資訊已經儲存。您可以隨時返回查看或繼續完成申請。</p>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm">
            下載摘要 PDF
          </Button>
          <Button variant="outline" size="sm">
            寄送至信箱
          </Button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
        <Button onClick={() => onNext({})} className="flex-1">
          查看更多支持資源
        </Button>
      </div>
    </div>
  )
}
