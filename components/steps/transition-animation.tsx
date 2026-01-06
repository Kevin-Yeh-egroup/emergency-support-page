"use client"

import { useState, useEffect } from "react"

type Props = {
  onComplete: () => void
}

export function TransitionAnimation({ onComplete }: Props) {
  const [showLine1, setShowLine1] = useState(false)
  const [showLine2, setShowLine2] = useState(false)
  const [showLine3, setShowLine3] = useState(false)

  useEffect(() => {
    // 逐行顯示文字
    const timer1 = setTimeout(() => setShowLine1(true), 300)
    const timer2 = setTimeout(() => setShowLine2(true), 800)
    const timer3 = setTimeout(() => setShowLine3(true), 1300)

    // 3-5秒後自動完成
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      {/* 雙層旋轉載入動畫 */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-primary/10 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-transparent border-r-primary rounded-full animate-spin-reverse"></div>
      </div>

      {/* 文字逐行顯示 */}
      <div className="space-y-4 text-center max-w-2xl">
        <p
          className={`text-xl md:text-2xl text-foreground transition-all duration-500 ${
            showLine1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          這不是一份評分表，
        </p>
        <p
          className={`text-xl md:text-2xl text-foreground transition-all duration-500 ${
            showLine2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          而是一張幫你找出
        </p>
        <p
          className={`text-xl md:text-2xl text-foreground transition-all duration-500 ${
            showLine3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          「哪些地方在撐你、哪些地方需要被接住」的地圖。
        </p>
      </div>

      {/* 底部脈衝點 */}
      <div className="flex gap-2 mt-8">
        <div
          className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 ${
            showLine1 ? "opacity-100 scale-100" : "opacity-30 scale-75"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 delay-200 ${
            showLine2 ? "opacity-100 scale-100" : "opacity-30 scale-75"
          }`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 delay-400 ${
            showLine3 ? "opacity-100 scale-100" : "opacity-30 scale-75"
          }`}
        ></div>
      </div>
    </div>
  )
}

