"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { EmergencyData } from "@/app/page"
import { Upload, FileText, X } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

export function StepOne({ onNext, onBack, data }: Props) {
  const [input, setInput] = useState(data.freeInput || "")
  const [files, setFiles] = useState<File[]>(data.files || [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    onNext({ freeInput: input, files })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">請說明您的狀況</h2>
        <p className="text-muted-foreground">
          用您自己的話,告訴我們現在最急需要協助的事情。不需要擔心格式,想到什麼就寫什麼。
        </p>
      </div>

      <div className="space-y-4">
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

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">相關文件 (選填)</label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
            <input type="file" id="file-upload" multiple onChange={handleFileChange} className="hidden" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground mb-1">點擊上傳文件</p>
              <p className="text-xs text-muted-foreground">支援任何類型的文件 (診斷書、通知書等)</p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
        <Button onClick={handleSubmit} disabled={!input.trim()} className="flex-1">
          繼續
        </Button>
      </div>
    </div>
  )
}
