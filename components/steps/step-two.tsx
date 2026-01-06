"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { EmergencyData } from "@/app/page"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

const questions = [
  {
    id: "urgency",
    question: "這個狀況是在什麼時候發生的?",
    options: [
      { value: "3days", label: "最近 3 天內" },
      { value: "week", label: "一週內" },
      { value: "month", label: "一個月內" },
      { value: "longer", label: "更早之前" },
    ],
  },
  {
    id: "impact",
    question: "這個狀況對您的生活造成多大影響?",
    options: [
      { value: "severe", label: "嚴重影響基本生活(食、衣、住)" },
      { value: "moderate", label: "造成困擾但仍可維持" },
      { value: "mild", label: "有壓力但影響不大" },
    ],
  },
  {
    id: "immediacy",
    question: "您認為需要多快獲得協助?",
    options: [
      { value: "immediate", label: "立即(今天或明天)" },
      { value: "urgent", label: "這週內" },
      { value: "soon", label: "這個月內" },
      { value: "flexible", label: "可以等待" },
    ],
  },
]

export function StepTwo({ onNext, onBack, data }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(data.screeningAnswers || {})

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const allAnswered = questions.every((q) => answers[q.id])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">快速快篩</h2>
        <p className="text-muted-foreground">請回答以下幾個簡單問題,幫助我們初步了解您的狀況</p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-medium text-foreground">{question.question}</h3>
                <RadioGroup value={answers[question.id]} onValueChange={(value) => handleAnswer(question.id, value)}>
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
        <Button onClick={() => onNext({ screeningAnswers: answers })} disabled={!allAnswered} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  )
}
