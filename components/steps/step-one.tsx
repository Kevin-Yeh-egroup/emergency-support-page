"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { EmergencyData } from "@/app/page"
import { Upload, FileText, X, TrendingDown, Heart, Home, UserX, HelpCircle, Mic, MicOff } from "lucide-react"

// 語音識別 API 類型定義
interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition
    }
    webkitSpeechRecognition: {
      new (): SpeechRecognition
    }
  }
}

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

const scenarioMap: Record<string, { title: string; icon: React.ComponentType<{ className?: string }> }> = {
  "income-loss": {
    title: "突然沒了收入，生活費撐不下去",
    icon: TrendingDown,
  },
  "medical-emergency": {
    title: "一場生病，打亂整個家庭",
    icon: Heart,
  },
  "disaster-accident": {
    title: "家裡突然不能住了",
    icon: Home,
  },
  "family-crisis": {
    title: "撐著全家的那個人突然不在了",
    icon: UserX,
  },
  "other": {
    title: "其他急難困難",
    icon: HelpCircle,
  },
}

export function StepOne({ onNext, onBack, data }: Props) {
  const [input, setInput] = useState(data.freeInput || "")
  const [files, setFiles] = useState<File[]>(data.files || [])
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // 初始化語音識別
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = "zh-TW"
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let transcript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            transcript += result[0].transcript
            if (result.isFinal) {
              transcript += " "
            }
          }

          setInput((prev) => {
            // 移除之前的臨時結果標記
            const baseText = prev.replace(/\s*\[正在錄音...\]\s*$/, "")
            // 如果是最終結果，追加並加上空格；如果是臨時結果，顯示並加上標記
            const isFinal = event.results[event.results.length - 1]?.isFinal
            if (isFinal) {
              return baseText + transcript
            } else {
              return baseText + transcript + " [正在錄音...]"
            }
          })
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("語音識別錯誤:", event.error)
          setIsRecording(false)
        }

        recognition.onend = () => {
          setIsRecording(false)
          // 清除臨時結果標記
          setInput((prev) => prev.replace(/\s*\[正在錄音...\]\s*$/, ""))
        }

        recognitionRef.current = recognition
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleFileUpload = () => {
    // 模擬上傳：創建一個虛擬文件
    const mockFile = new File([], "相關文件.pdf", { type: "application/pdf" })
    setFiles([...files, mockFile])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("您的瀏覽器不支援語音輸入功能")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const handleSubmit = () => {
    onNext({ freeInput: input, files })
  }

  // 至少需要填寫文字或上傳文件其中一項
  const canSubmit = input.trim().length > 0 || files.length > 0

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請說明您的狀況</h2>
        <p className="text-muted-foreground">
          用您自己的話,告訴我們現在最急需要協助的事情。不需要擔心格式,想到什麼就寫什麼。
        </p>
      </div>

      {/* 顯示選擇的情境 */}
      {(() => {
        const scenarioIds = Array.isArray(data.scenario) 
          ? data.scenario 
          : data.scenario 
            ? [data.scenario] 
            : []
        
        if (scenarioIds.length === 0) return null

        return (
          <div className="p-4 rounded-lg bg-gradient-to-br from-[#fef2f2] via-[#fff7ed] to-[#fff7ed] border border-[#fecdd3]/40">
            <p className="text-xs text-muted-foreground mb-2">您選擇的情境</p>
            <div className="flex flex-wrap gap-2">
              {scenarioIds.map((id) => {
                const scenario = scenarioMap[id]
                if (!scenario) return null
                const Icon = scenario.icon
                return (
                  <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-[#fecdd3]/40">
                    <Icon className="w-4 h-4 text-[#e11d48]" />
                    <span className="text-sm font-medium text-foreground">{scenario.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      <div className="space-y-6">
        {/* 文字輸入 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">請告訴我的的困境</label>
          <div className="relative">
            <Textarea
              placeholder="例如:我昨天突然被公司解雇,現在沒有收入,下個月的房租付不出來..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] resize-none pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              className={`absolute top-2 right-2 ${
                isRecording
                  ? "text-destructive animate-pulse"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={isRecording ? "點擊停止錄音" : "點擊開始語音輸入"}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">字數不限,請盡量詳細說明</p>
        </div>

        {/* 文件上傳 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">上傳參考/佐證文件</label>
          {files.length === 0 ? (
            <div
              onClick={handleFileUpload}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30"
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground mb-1">點擊上傳文件</p>
              <p className="text-xs text-muted-foreground">支援任何類型的文件 (診斷書、通知書等)</p>
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{file.name}</span>
                      <p className="text-xs text-muted-foreground">已上傳</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <div
                onClick={handleFileUpload}
                className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30"
              >
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">點擊繼續上傳更多文件</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  )
}
