// 財務韌性問卷計算邏輯

export type DimensionScores = {
  收入與穩定性: number
  儲蓄與突發應對: number
  債務壓力與風險保障: number
  金錢管理與金融使用: number
  支持資源與連結: number
  心理韌性與未來感: number
}

export type StructureType = "A" | "B" | "C" | "D" | "E"

export type PriorityDirection =
  | "緊急經濟援助"
  | "債務管理"
  | "儲蓄培養"
  | "金融教育"
  | "就業支持"
  | "金融服務連結"
  | "社會網絡建立"
  | "心理支持"

// 計算總分
export function calculateTotalScore(answers: Record<string, string>): number {
  const scores = Object.values(answers).map((value) => parseInt(value) || 0)
  return scores.reduce((sum, score) => sum + score, 0)
}

// 計算六構面分數
export function calculateDimensionScores(answers: Record<string, string>): DimensionScores {
  // 題目對應：
  // 1. 收入是否能支撐基本生活 (income-support)
  // 2. 收入穩定程度 (income-stability)
  // 3. 儲蓄／緊急預備金 (savings)
  // 4. 債務壓力程度 (debt-pressure)
  // 5. 面對突發支出的能力 (emergency-expense)
  // 6. 風險保障準備 (risk-protection)
  // 7. 金融服務使用能力 (financial-services)
  // 8. 日常財務管理習慣 (financial-management)
  // 9. 可動用的支持資源 (support-resources)
  // 10. 心理韌性與未來信心 (psychological-resilience)

  const q1 = parseInt(answers["income-support"] || "0")
  const q2 = parseInt(answers["income-stability"] || "0")
  const q3 = parseInt(answers["savings"] || "0")
  const q4 = parseInt(answers["debt-pressure"] || "0")
  const q5 = parseInt(answers["emergency-expense"] || "0")
  const q6 = parseInt(answers["risk-protection"] || "0")
  const q7 = parseInt(answers["financial-services"] || "0")
  const q8 = parseInt(answers["financial-management"] || "0")
  const q9 = parseInt(answers["support-resources"] || "0")
  const q10 = parseInt(answers["psychological-resilience"] || "0")

  return {
    收入與穩定性: ((q1 + q2) / 2) * 10, // 題目 1、2 的平均分 × 10
    儲蓄與突發應對: ((q3 + q5) / 2) * 10, // 題目 3、5 的平均分 × 10
    債務壓力與風險保障: ((q4 + q6) / 2) * 10, // 題目 4、6 的平均分 × 10
    金錢管理與金融使用: ((q7 + q8) / 2) * 10, // 題目 7、8 的平均分 × 10
    支持資源與連結: q9 * 10, // 題目 9 的分數 × 10
    心理韌性與未來感: q10 * 10, // 題目 10 的分數 × 10
  }
}

// 判斷結構型（A-E，必須擇一）
export function determineStructureType(dimensions: DimensionScores): StructureType {
  const {
    收入與穩定性,
    儲蓄與突發應對,
    債務壓力與風險保障,
    金錢管理與金融使用,
    支持資源與連結,
    心理韌性與未來感,
  } = dimensions

  // E 型｜壓力集中結構（優先判斷）
  if (
    儲蓄與突發應對 < 50 &&
    債務壓力與風險保障 < 50 &&
    支持資源與連結 < 50 &&
    心理韌性與未來感 < 50
  ) {
    return "E"
  }

  // A 型｜單一支撐結構
  if (收入與穩定性 >= 70) {
    const lowCount = [
      儲蓄與突發應對,
      債務壓力與風險保障,
      金錢管理與金融使用,
      支持資源與連結,
      心理韌性與未來感,
    ].filter((score) => score < 50).length

    if (lowCount >= 3) {
      return "A"
    }
  }

  // B 型｜撐著運作結構
  if (
    儲蓄與突發應對 < 50 &&
    金錢管理與金融使用 < 50 &&
    心理韌性與未來感 < 70
  ) {
    return "B"
  }

  // C 型｜人脈承接結構
  if (支持資源與連結 >= 70 && 心理韌性與未來感 >= 70) {
    return "C"
  }

  // D 型｜多元支撐結構（預設）
  return "D"
}

// 判斷優先討論方向（可複選）
export function determinePriorities(answers: Record<string, string>): PriorityDirection[] {
  const priorities: PriorityDirection[] = []

  const q1 = parseInt(answers["income-support"] || "0")
  const q2 = parseInt(answers["income-stability"] || "0")
  const q3 = parseInt(answers["savings"] || "0")
  const q4 = parseInt(answers["debt-pressure"] || "0")
  const q5 = parseInt(answers["emergency-expense"] || "0")
  const q6 = parseInt(answers["risk-protection"] || "0")
  const q7 = parseInt(answers["financial-services"] || "0")
  const q8 = parseInt(answers["financial-management"] || "0")
  const q9 = parseInt(answers["support-resources"] || "0")
  const q10 = parseInt(answers["psychological-resilience"] || "0")

  // 緊急經濟援助（題 1 或題 5 ≤ 3 分）
  if (q1 <= 3 || q5 <= 3) {
    priorities.push("緊急經濟援助")
  }

  // 債務管理（題 4 ≤ 3 分）
  if (q4 <= 3) {
    priorities.push("債務管理")
  }

  // 儲蓄培養（題 3 ≤ 3 分）
  if (q3 <= 3) {
    priorities.push("儲蓄培養")
  }

  // 金融教育（題 7 或題 8 ≤ 3 分）
  if (q7 <= 3 || q8 <= 3) {
    priorities.push("金融教育")
  }

  // 就業支持（題 2 ≤ 3 分）
  if (q2 <= 3) {
    priorities.push("就業支持")
  }

  // 金融服務連結（題 6 ≤ 3 分）
  if (q6 <= 3) {
    priorities.push("金融服務連結")
  }

  // 社會網絡建立（題 9 ≤ 3 分）
  if (q9 <= 3) {
    priorities.push("社會網絡建立")
  }

  // 心理支持（題 10 ≤ 3 分）
  if (q10 <= 3) {
    priorities.push("心理支持")
  }

  return priorities
}

// 結構型名稱和文字（固定文案）
export const structureInfo: Record<
  StructureType,
  { name: string; description: string }
> = {
  A: {
    name: "單一支撐結構",
    description:
      "目前家庭的財務狀況，主要仰賴單一條件來維持穩定。\n當這個支撐點運作順利時，生活尚能撐住；\n但一旦出現變動，其他可承接的空間相對有限。",
  },
  B: {
    name: "撐著運作結構",
    description:
      "目前家庭是在努力維持生活運作的狀態，\n多數調整仰賴當下的撐持與應付。\n當狀況穩定時可以繼續前進，但面對突發事件時，調整空間較小。",
  },
  C: {
    name: "人脈承接結構",
    description:
      "雖然目前的財務條件帶來一定壓力，\n但你並不是孤立面對問題。\n願意行動的心態與可連結的支持，\n讓家庭在條件不利時，仍保有調整與修復的可能。",
  },
  D: {
    name: "多元支撐結構",
    description:
      "家庭的財務狀況並非完全沒有壓力，\n但同時具備多個可以相互支撐的面向。\n即使其中一項條件出現變動，\n仍有其他力量能協助承接與調整。",
  },
  E: {
    name: "壓力集中結構",
    description:
      "目前有多個重要面向同時承受壓力，\n使家庭在面對變動時較難有餘裕調整。\n這樣的狀態，代表需要更多支持與陪伴，\n才能慢慢把壓力拆解開來。",
  },
}

