"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LandingPage } from "@/components/landing-page"
import { StepZero } from "@/components/steps/step-zero"
import { StepOne } from "@/components/steps/step-one"
import { StepFive } from "@/components/steps/step-five"

export type EmergencyData = {
  scenario?: string | string[]
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

  const steps = ["情境選擇", "狀況說明", "建議行動"]

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
        return "建議行動"
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
        return "以下是我們為您建議的具體行動方案"
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
        return <StepFive onNext={handleNext} onBack={handleBack} data={data} />
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
