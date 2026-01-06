"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronLeft } from "lucide-react"
import type { EmergencyData } from "@/app/page"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

const questions = [
  {
    id: "income-support",
    question: "收入是否能支撐基本生活",
    description: "如果家庭主要收入突然減少一半，三個月內的生活會是：",
    options: [
      { value: "10", label: "基本生活仍能維持，不需借錢" },
      { value: "7", label: "需要明顯縮減開支，但還撐得住" },
      { value: "3", label: "很快出現生活困難" },
      { value: "0", label: "幾乎立刻無法負擔生活" },
    ],
  },
  {
    id: "income-stability",
    question: "收入穩定程度",
    description: "目前家庭主要收入來源是：",
    options: [
      { value: "10", label: "穩定固定收入" },
      { value: "7", label: "大致穩定但偶有波動" },
      { value: "3", label: "臨時、接案或零工為主" },
      { value: "0", label: "目前沒有穩定收入" },
    ],
  },
  {
    id: "savings",
    question: "儲蓄／緊急預備金",
    description: "若現在沒有收入，家庭儲蓄可支撐：",
    options: [
      { value: "10", label: "超過 3 個月生活費" },
      { value: "7", label: "1–3 個月" },
      { value: "3", label: "不到 1 個月" },
      { value: "0", label: "幾乎沒有儲蓄" },
    ],
  },
  {
    id: "debt-pressure",
    question: "債務壓力程度",
    description: "目前家庭的債務狀況是：",
    options: [
      { value: "10", label: "幾乎無債，或完全可掌控" },
      { value: "7", label: "有債務但可正常繳款" },
      { value: "3", label: "債務常影響生活安排" },
      { value: "0", label: "債務造成高度壓力或逾期" },
    ],
  },
  {
    id: "emergency-expense",
    question: "面對突發支出的能力",
    description: "若突然需要 NT$10,000–30,000 的緊急支出：",
    options: [
      { value: "10", label: "可用儲蓄或預備金處理" },
      { value: "7", label: "需向親友協助或調度" },
      { value: "3", label: "需借貸或刷卡" },
      { value: "0", label: "幾乎無法處理" },
    ],
  },
  {
    id: "risk-protection",
    question: "風險保障準備",
    description: "面對疾病、意外或重大風險時：",
    options: [
      { value: "10", label: "有足夠保險或安排，較安心" },
      { value: "7", label: "有基本保障，但仍擔心" },
      { value: "3", label: "只有健保" },
      { value: "0", label: "幾乎沒有任何準備" },
    ],
  },
  {
    id: "financial-services",
    question: "金融服務使用能力",
    description: "使用銀行或金融服務的情況是：",
    options: [
      { value: "10", label: "熟悉轉帳、繳費、帳戶管理" },
      { value: "7", label: "會基本操作" },
      { value: "3", label: "不太會用，常覺得困難" },
      { value: "0", label: "幾乎沒有使用" },
    ],
  },
  {
    id: "financial-management",
    question: "日常財務管理習慣",
    description: "關於家庭用錢的管理方式：",
    options: [
      { value: "10", label: "有預算或清楚掌握支出" },
      { value: "7", label: "偶爾記錄或討論" },
      { value: "3", label: "大多憑感覺使用" },
      { value: "0", label: "經常月底才發現錢不夠" },
    ],
  },
  {
    id: "support-resources",
    question: "可動用的支持資源",
    description: "當家庭遇到經濟困難時：",
    options: [
      { value: "10", label: "有可信任的人或單位可商量" },
      { value: "7", label: "有少數人可幫忙" },
      { value: "3", label: "幾乎沒有可依靠對象" },
      { value: "0", label: "完全只能自己承擔" },
    ],
  },
  {
    id: "psychological-resilience",
    question: "心理韌性與未來信心",
    description: "整體而言，你對家庭未來經濟的感受是：",
    options: [
      { value: "10", label: "雖有壓力，但有方向與希望" },
      { value: "7", label: "有些不安，但仍撐得住" },
      { value: "3", label: "常感焦慮、無力" },
      { value: "0", label: "對未來感到非常擔心或絕望" },
    ],
  },
]

export function StepTwo({ onNext, onBack, data }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // 不從 data 中恢復答案，每次都從空白開始，避免預設選擇
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  // 確保只有當答案存在且不為空字符串時才使用，否則為 undefined
  const currentAnswer = answers[currentQuestion.id] && answers[currentQuestion.id].trim() 
    ? answers[currentQuestion.id] 
    : undefined
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // 延遲300毫秒後自動進入下一題
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setIsTransitioning(false)
      } else {
        // 最後一題，完成問卷
        setIsTransitioning(false)
        onNext({ screeningAnswers: newAnswers })
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      onBack()
    }
  }

  return (
    <div className="space-y-6">
      {/* 標題和進度 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">快速快篩</h2>
          <p className="text-muted-foreground">請回答以下幾個簡單問題，幫助我們初步了解您的狀況</p>
        </div>

        {/* 進度條 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              第 {currentQuestionIndex + 1} 題 / 共 {questions.length} 題
            </span>
            <span className="text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* 當前題目 */}
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        <div className="space-y-6 p-8 rounded-xl bg-gradient-to-br from-[#fef2f2]/50 via-[#fff7ed]/50 to-[#fff7ed]/50 border border-[#fecdd3]/30 shadow-lg">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-[#e11d48]">{currentQuestionIndex + 1}</span>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-xl text-foreground mb-2">{currentQuestion.question}</h3>
                {currentQuestion.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{currentQuestion.description}</p>
                )}
              </div>
              
              <RadioGroup 
                value={currentAnswer || undefined} 
                onValueChange={(value) => {
                  if (value) {
                    handleAnswer(currentQuestion.id, value)
                  }
                }}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, optionIndex) => {
                  // 只有當 currentAnswer 明確存在且等於 option.value 時才視為選中
                  const isSelected = currentAnswer !== undefined && currentAnswer === option.value
                  return (
                    <div
                      key={option.value}
                      className={`relative flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                      }`}
                      onClick={() => {
                        // 明確設置答案
                        handleAnswer(currentQuestion.id, option.value)
                      }}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`${currentQuestion.id}-${option.value}`} 
                          className="mt-0.5"
                        />
                        <Label 
                          htmlFor={`${currentQuestion.id}-${option.value}`} 
                          className="font-normal cursor-pointer flex-1 leading-relaxed text-base"
                        >
                          {option.label}
                        </Label>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {/* 導航按鈕 */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {currentQuestionIndex === 0 ? "上一步" : "上一題"}
        </Button>
      </div>
    </div>
  )
}
