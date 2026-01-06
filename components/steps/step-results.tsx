"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TransitionAnimation } from "./transition-animation"
import {
  calculateTotalScore,
  calculateDimensionScores,
  determineStructureType,
  determinePriorities,
  structureInfo,
  type DimensionScores,
  type StructureType,
  type PriorityDirection,
} from "@/lib/scoring"
import type { EmergencyData } from "@/app/page"
import { Sparkles, Building2, Network, Layers, AlertTriangle, Columns } from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"

type Props = {
  onNext: (data: Partial<EmergencyData>) => void
  onBack: () => void
  data: EmergencyData
}

// 分數區間配置
const scoreRanges = {
  green: { min: 75, max: 100, label: "財務韌性良好", color: "text-green-600", bgColor: "bg-green-500/10", borderColor: "border-green-500/30" },
  yellow: { min: 60, max: 74, label: "接近韌性", color: "text-yellow-600", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
  orange: { min: 40, max: 59, label: "財務較脆弱", color: "text-orange-600", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30" },
  red: { min: 0, max: 39, label: "高度脆弱", color: "text-red-600", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" },
}

function getScoreRange(score: number) {
  if (score >= 75) return scoreRanges.green
  if (score >= 60) return scoreRanges.yellow
  if (score >= 40) return scoreRanges.orange
  return scoreRanges.red
}

export function StepResults({ onNext, onBack, data }: Props) {
  const [showTransition, setShowTransition] = useState(true)
  const [result, setResult] = useState<{
    totalScore: number
    dimensions: DimensionScores
    structureType: StructureType
    priorities: PriorityDirection[]
  } | null>(null)

  useEffect(() => {
    if (!showTransition) {
      // 計算結果
      const answers = data.screeningAnswers || {}
      const totalScore = calculateTotalScore(answers)
      const dimensions = calculateDimensionScores(answers)
      const structureType = determineStructureType(dimensions)
      const priorities = determinePriorities(answers)

      setResult({
        totalScore,
        dimensions,
        structureType,
        priorities,
      })
    }
  }, [showTransition, data])

  // 顯示轉換動畫
  if (showTransition) {
    return <TransitionAnimation onComplete={() => setShowTransition(false)} />
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-muted-foreground">載入中...</p>
      </div>
    )
  }

  const scoreRange = getScoreRange(result.totalScore)

  // 準備雷達圖資料
  const radarData = [
    { dimension: "收入與穩定性", value: result.dimensions.收入與穩定性 },
    { dimension: "儲蓄與突發應對", value: result.dimensions.儲蓄與突發應對 },
    { dimension: "債務壓力與風險保障", value: result.dimensions.債務壓力與風險保障 },
    { dimension: "金錢管理與金融使用", value: result.dimensions.金錢管理與金融使用 },
    { dimension: "支持資源與連結", value: result.dimensions.支持資源與連結 },
    { dimension: "心理韌性與未來感", value: result.dimensions.心理韌性與未來感 },
  ]

  const chartConfig = {
    財務韌性: {
      label: "財務韌性",
      color: "hsl(var(--chart-1))",
    },
  }

  // 結構判讀顯示組件
  const StructureDisplay = ({ structureType }: { structureType: StructureType }) => {
    const structure = structureInfo[structureType]
    
    // 不同結構對應的圖標
    const structureIcons: Record<StructureType, React.ComponentType<{ className?: string }>> = {
      A: Columns, // 單一支撐結構 - 使用柱子圖標
      B: Building2, // 撐著運作結構 - 使用建築圖標
      C: Network, // 人脈承接結構 - 使用網絡圖標
      D: Layers, // 多元支撐結構 - 使用層疊圖標
      E: AlertTriangle, // 壓力集中結構 - 使用警告圖標
    }
    
    const Icon = structureIcons[structureType]
    const iconColors: Record<StructureType, string> = {
      A: "text-blue-500",
      B: "text-orange-500",
      C: "text-purple-500",
      D: "text-green-500",
      E: "text-red-500",
    }

    return (
      <div className="bg-gradient-to-br from-[#fef2f2]/50 via-[#fff7ed]/50 to-[#fff7ed]/50 border border-[#fecdd3]/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#fecdd3] to-[#fed7aa] flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${iconColors[structureType]}`} />
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="text-lg font-semibold text-foreground">{structure.name}</h4>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {structure.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 1. 整體財務韌性分數 */}
      <div className={`p-8 rounded-xl border-2 ${scoreRange.borderColor} ${scoreRange.bgColor} space-y-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-2xl font-bold ${scoreRange.color} mb-2`}>{scoreRange.label}</h3>
            <p className="text-sm text-muted-foreground">整體財務韌性分數</p>
          </div>
          <div className="text-right">
            <div className={`text-6xl font-bold ${scoreRange.color}`}>{result.totalScore}</div>
            <div className="text-sm text-muted-foreground mt-1">/ 100</div>
          </div>
        </div>
      </div>

      {/* 2. 六構面雷達圖 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">六構面財務韌性</h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar
                name="財務韌性"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.4}
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 2, stroke: "white" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </div>
      </div>

      {/* 4. 結構判讀 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">結構判讀</h3>
        <StructureDisplay structureType={result.structureType} />
      </div>

      {/* 5. 目前可優先討論的方向 */}
      {result.priorities.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">目前可優先討論的方向</h3>
            <p className="text-sm text-muted-foreground">
              以下是依據你的填答，<br />
              目前較值得被討論與整理的方向：
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {result.priorities.map((priority, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
              >
                <p className="font-medium text-foreground">{priority}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 導航按鈕 */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          返回修改
        </Button>
        <Button
          onClick={() => onNext({})}
          className="flex-1 bg-gradient-to-r from-[#e11d48] to-[#f97316] hover:from-[#be123c] hover:to-[#ea580c] text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          請提供進一步資訊
        </Button>
      </div>
    </div>
  )
}
