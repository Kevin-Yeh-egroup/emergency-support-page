"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StepZero } from "@/components/steps/step-zero"
import { StepOne } from "@/components/steps/step-one"
import { StepTwo } from "@/components/steps/step-two"
import { StepThree } from "@/components/steps/step-three"
import { StepFour } from "@/components/steps/step-four"
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
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<EmergencyData>({})

  const steps = ["情境選擇", "狀況說明", "快速快篩", "AI 補問", "初步結果", "行動引導", "後續支持"]

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleNext = (stepData: Partial<EmergencyData>) => {
    setData({ ...data, ...stepData })
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
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
        return <StepThree onNext={handleNext} onBack={handleBack} data={data} />
      case 4:
        return <StepFour onNext={handleNext} onBack={handleBack} data={data} />
      case 5:
        return <StepFive onNext={handleNext} onBack={handleBack} data={data} />
      case 6:
        return <StepSix data={data} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">急難救助申請</h1>
          <p className="text-muted-foreground">我們會一步一步協助您完成申請流程</p>
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
