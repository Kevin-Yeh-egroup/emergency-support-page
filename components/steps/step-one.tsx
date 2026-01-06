"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { EmergencyData } from "@/app/page"
import { Upload, FileText, X, TrendingDown, Heart, Home, UserX } from "lucide-react"

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
}

export function StepOne({ onNext, onBack, data }: Props) {
  const [inputType, setInputType] = useState<"text" | "file">(data.files && data.files.length > 0 ? "file" : "text")
  const [input, setInput] = useState(data.freeInput || "")
  const [files, setFiles] = useState<File[]>(data.files || [])
  
  const selectedScenario = data.scenario ? scenarioMap[data.scenario] : null
  const ScenarioIcon = selectedScenario?.icon || Heart

  const handleFileUpload = () => {
    // 模擬上傳：創建一個虛擬文件
    const mockFile = new File([], "相關文件.pdf", { type: "application/pdf" })
    setFiles([mockFile])
    setInputType("file")
    setInput("") // 清除文字輸入
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    if (files.length === 1) {
      setInputType("text")
    }
  }

  const handleInputTypeChange = (type: "text" | "file") => {
    setInputType(type)
    if (type === "text") {
      setFiles([])
    } else {
      setInput("")
      handleFileUpload()
    }
  }

  const handleSubmit = () => {
    if (inputType === "text" && input.trim()) {
      onNext({ freeInput: input, files: [] })
    } else if (inputType === "file" && files.length > 0) {
      onNext({ freeInput: "", files })
    }
  }

  const canSubmit = (inputType === "text" && input.trim()) || (inputType === "file" && files.length > 0)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請說明您的狀況</h2>
        <p className="text-muted-foreground">
          用您自己的話,告訴我們現在最急需要協助的事情。不需要擔心格式,想到什麼就寫什麼。
        </p>
      </div>

      {/* 顯示選擇的情境 */}
      {selectedScenario && (
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#fef2f2] via-[#fff7ed] to-[#fff7ed] border border-[#fecdd3]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center">
              <ScenarioIcon className="w-5 h-5 text-[#e11d48]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">您選擇的情境</p>
              <p className="text-sm font-medium text-foreground">{selectedScenario.title}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* 選擇輸入方式 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">請選擇說明方式</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleInputTypeChange("text")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                inputType === "text"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <FileText className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-foreground">文字敘述</p>
              <p className="text-xs text-muted-foreground mt-1">用文字說明您的狀況</p>
            </button>
            <button
              onClick={() => handleInputTypeChange("file")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                inputType === "file"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Upload className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium text-foreground">上傳文件</p>
              <p className="text-xs text-muted-foreground mt-1">上傳相關文件說明</p>
            </button>
          </div>
        </div>

        {/* 文字輸入 */}
        {inputType === "text" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">狀況說明</label>
            <Textarea
              placeholder="例如:我昨天突然被公司解雇,現在沒有收入,下個月的房租付不出來..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-muted-foreground">字數不限,請盡量詳細說明</p>
          </div>
        )}

        {/* 文件上傳 */}
        {inputType === "file" && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">相關文件</label>
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
              </div>
            )}
          </div>
        )}
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
