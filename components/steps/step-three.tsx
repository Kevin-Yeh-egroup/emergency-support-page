"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { EmergencyData } from "@/app/page"
import { Loader2 } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

type AIQuestion = {
  id: string
  question: string
  type: "text" | "number"
}

export function StepThree({ onNext, onBack, data }: Props) {
  const [questions, setQuestions] = useState<AIQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>(data.clarificationAnswers || {})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI generating questions based on previous data
    setTimeout(() => {
      const generatedQuestions: AIQuestion[] = []

      // Generate contextual questions based on scenario
      // 處理複選情境：檢查是否包含相關情境
      const scenarioIds = Array.isArray(data.scenario) 
        ? data.scenario 
        : data.scenario 
          ? [data.scenario] 
          : []
      
      if (scenarioIds.includes("income-loss") || scenarioIds.includes("financial")) {
        generatedQuestions.push({
          id: "income",
          question: "您目前每月的收入大約是多少?(可以是 0)",
          type: "number",
        })
        generatedQuestions.push({
          id: "dependents",
          question: "您需要負擔幾位家人的生活?",
          type: "number",
        })
      }

      if (scenarioIds.includes("disaster-accident") || scenarioIds.includes("housing")) {
        generatedQuestions.push({
          id: "current_housing",
          question: "您目前的居住狀況是?",
          type: "text",
        })
      }

      // Always ask about support network
      generatedQuestions.push({
        id: "support",
        question: "您身邊有可以協助的親友嗎?(簡單說明即可)",
        type: "text",
      })

      setQuestions(generatedQuestions)
      setIsLoading(false)
    }, 1500)
  }, [data])

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const allAnswered = questions.every((q) => answers[q.id]?.trim())

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">AI 正在根據您的狀況準備問題...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">補充資料</h2>
        <p className="text-muted-foreground">根據您剛才提供的資訊，我們需要了解一些額外細節</p>
        <p className="text-sm text-muted-foreground italic mt-2">
          💡 之後會放上引導式問答
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {index + 1}
              </span>
              {question.question}
            </label>
            <Input
              type={question.type}
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder="請輸入您的回答"
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          💡 這些問題是為了更準確評估您的狀況。如果某些問題不方便回答,可以簡單說明原因。
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
        <Button onClick={() => onNext({ clarificationAnswers: answers })} disabled={!allAnswered} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  )
}
