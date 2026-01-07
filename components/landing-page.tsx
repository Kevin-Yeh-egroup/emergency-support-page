"use client"

import { Heart, Shield, Users, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onStart: () => void
}

const services = [
  {
    icon: Shield,
    title: "財務風險評估",
    description: "專業評估您的財務狀況，找出潛在風險",
  },
  {
    icon: Users,
    title: "免費線上諮詢",
    description: "隨時提供專業諮詢服務，陪伴您度過難關",
  },
  {
    icon: Heart,
    title: "轉介急難救助單位",
    description: "協助連結相關救助資源",
  },
]

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef2f2] via-[#fff7ed] to-[#fff7ed] flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full space-y-16">
        {/* 主標題區 */}
        <div className="text-center space-y-8">
          {/* 大圖標 */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] rounded-full blur-3xl opacity-60 animate-pulse"></div>
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <Heart className="w-24 h-24 md:w-28 md:h-28 text-[#e11d48]" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* 標題 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            急難狀況
            <br />
            <span className="bg-gradient-to-r from-[#e11d48] to-[#f97316] bg-clip-text text-transparent">
              我們來幫忙
            </span>
          </h1>
          
          {/* 暖心語句 */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
              當生活突然遇到困難，您不需要一個人面對
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              我們在這裡，陪伴您一起度過難關，找到解決的方向
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed pt-4 italic">
              💝 每一個困難都有解決的方法，我們與您同行
            </p>
          </div>
        </div>

        {/* 服務項目 */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-8">
            我們提供的服務
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#fecdd3]/40 hover:border-[#fda4af]/60 hover:scale-105 transform transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-[#e11d48]" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* 開始按鈕 */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onStart}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-[#e11d48] to-[#f97316] hover:from-[#be123c] hover:to-[#ea580c] text-white text-xl font-semibold px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 min-w-[240px] h-auto"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              點我開始
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fda4af] to-[#fb923c] opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </Button>
        </div>
      </div>
    </div>
  )
}

