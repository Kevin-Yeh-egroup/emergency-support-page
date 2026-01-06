"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LandingPage } from "@/components/landing-page"
import { StepZero } from "@/components/steps/step-zero"
import { StepOne } from "@/components/steps/step-one"
import { StepTwo } from "@/components/steps/step-two"
import { StepResults } from "@/components/steps/step-results"
import { StepThree } from "@/components/steps/step-three"
import { StepFive } from "@/components/steps/step-five"
import { StepSix } from "@/components/steps/step-six"

export type EmergencyData = {
  scenario?: string
  freeInput?: string
  files?: File[]
  screeningAnswers?: Record<string, any>
  clarificationAnswers?: Record<string, any>
  assessmentResult?: {
    level: "high" | "medium" | "low"
    message: string
  }
}

export default function EmergencyAssistancePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<EmergencyData>({})

  const steps = ["情境選擇", "狀況說明", "快速快篩", "快篩結果", "補充資料", "建議行動", "後續支持"]

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  // 根據步驟動態設定頁面標題
  const getPageTitle = () => {
    switch (currentStep) {
      case 0:
        return "急難救助情境"
      case 1:
        return "狀況說明"
      case 2:
        return "快速快篩"
      case 3:
        return "快篩結果"
      case 4:
        return "補充資料"
      case 5:
        return "建議行動"
      case 6:
        return "後續支持"
      default:
        return "急難救助申請"
    }
  }

  const getPageDescription = () => {
    switch (currentStep) {
      case 0:
        return "請選擇最符合您目前情況的情境"
      case 1:
        return "請詳細說明您的狀況，幫助我們更了解您的需求"
      case 2:
        return "透過快速問答，協助我們評估您的急迫程度"
      case 3:
        return "根據您的快速快篩回答，我們已為您完成財務韌性評估"
      case 4:
        return "AI 會根據您的回答，提出一些補充問題"
      case 5:
        return "以下是我們為您建議的具體行動方案"
      case 6:
        return "這些資源可以持續為您提供協助"
      default:
        return "我們會一步一步協助您完成申請流程"
    }
  }

  const handleNext = (stepData: Partial<EmergencyData>) => {
    setData({ ...data, ...stepData })
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStart = () => {
    setShowLanding(false)
    setCurrentStep(0)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepZero onNext={handleNext} data={data} />
      case 1:
        return <StepOne onNext={handleNext} onBack={handleBack} data={data} />
      case 2:
        return <StepTwo onNext={handleNext} onBack={handleBack} data={data} />
      case 3:
        return <StepResults onNext={handleNext} onBack={handleBack} data={data} />
      case 4:
        return <StepThree onNext={handleNext} onBack={handleBack} data={data} />
      case 5:
        return <StepFive onNext={handleNext} onBack={handleBack} data={data} />
      case 6:
        return <StepSix data={data} />
      default:
        return null
    }
  }

  // 顯示首頁
  if (showLanding) {
    return <LandingPage onStart={handleStart} />
  }

  // 顯示流程頁面
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">
              步驟 {currentStep + 1} / {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-card border-border shadow-lg">{renderStep()}</Card>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep ? "w-8 bg-primary" : index < currentStep ? "w-2 bg-primary/60" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
