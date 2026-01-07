"use client"

import { Button } from "@/components/ui/button"
import type { EmergencyData } from "@/app/page"
import { FileText, ExternalLink } from "lucide-react"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

export function StepFive({ onNext, onBack, data }: Props) {
  const consultationUrl = "https://www.familyfinhealth.com/online-consultation"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">建議行動</h2>
        <p className="text-muted-foreground">根據您的狀況，以下是我們建議的下一步行動</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-6 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-[#fef2f2]/50 via-[#fff7ed]/50 to-[#fff7ed]/50 hover:from-[#fee2e2]/60 hover:via-[#fed7aa]/60 hover:to-[#fed7aa]/60 transition-colors group shadow-md">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center group-hover:from-[#fda4af] group-hover:to-[#fb923c] transition-all shadow-sm">
            <FileText className="w-7 h-7 text-[#e11d48] group-hover:text-[#be123c] transition-colors" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold text-xl text-foreground">進行線上財務諮詢</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              與專業社工進行一對一線上諮詢，獲得個人化的財務協助建議
            </p>
            <Button
              asChild
              size="lg"
              className="mt-3 bg-gradient-to-r from-[#e11d48] to-[#f97316] hover:from-[#be123c] hover:to-[#ea580c] text-white text-lg px-8 py-6"
            >
              <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                前往線上諮詢
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          上一步
        </Button>
      </div>
    </div>
  )
}
