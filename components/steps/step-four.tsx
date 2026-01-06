"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { EmergencyData } from "@/app/page"
import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

type AssessmentLevel = "high" | "medium" | "low"

export function StepFour({ onNext, onBack, data }: Props) {
  const [isProcessing, setIsProcessing] = useState(true)
  const [result, setResult] = useState<{
    level: AssessmentLevel
    message: string
  } | null>(null)

  useEffect(() => {
    // Simulate AI assessment
    setTimeout(() => {
      // Simple logic based on screening answers
      const urgency = data.screeningAnswers?.urgency
      const impact = data.screeningAnswers?.impact
      const immediacy = data.screeningAnswers?.immediacy

      let level: AssessmentLevel = "medium"
      let message = ""

      if (
        (urgency === "3days" || urgency === "week") &&
        impact === "severe" &&
        (immediacy === "immediate" || immediacy === "urgent")
      ) {
        level = "high"
        message = "根據您提供的資訊,您的狀況屬於高度緊急。我們建議您立即尋求協助,並會優先處理您的申請。"
      } else if (impact === "severe" || immediacy === "immediate") {
        level = "medium"
        message = "您的狀況需要儘快處理。我們會在 3-5 個工作天內聯繫您,並提供適當的協助方案。"
      } else {
        level = "low"
        message = "感謝您的說明。根據初步評估,建議您可以先參考一般申請流程。我們會在 7-10 個工作天內回覆您。"
      }

      setResult({ level, message })
      setIsProcessing(false)
    }, 2000)
  }, [data])

  const levelConfig = {
    high: {
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      label: "高度緊急",
    },
    medium: {
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      label: "需要協助",
    },
    low: {
      icon: CheckCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      label: "一般申請",
    },
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h3 className="text-lg font-semibold text-foreground">正在分析您的狀況</h3>
        <p className="text-sm text-muted-foreground">這可能需要幾秒鐘...</p>
      </div>
    )
  }

  if (!result) return null

  const config = levelConfig[result.level]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">初步評估結果</h2>
        <p className="text-muted-foreground">這是根據您提供的資訊進行的初步判斷</p>
      </div>

      <div className={`p-6 rounded-lg border-2 ${config.borderColor} ${config.bgColor} space-y-4`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${config.color}`}>{config.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              評估等級: {result.level === "high" ? "優先處理" : result.level === "medium" ? "一般處理" : "標準流程"}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-foreground leading-relaxed">{result.message}</p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          重要提醒
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-7">
          <li>• 這是初步評估,最終資格將由專業人員審核</li>
          <li>• 您可以繼續完成後續步驟以獲得更多協助資訊</li>
          <li>• 如果情況緊急,建議同時撥打緊急聯絡專線</li>
        </ul>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          返回修改
        </Button>
        <Button onClick={() => onNext({ assessmentResult: result })} className="flex-1">
          查看建議行動
        </Button>
      </div>
    </div>
  )
}
