# 什麼時候該建立 Havamal（When to Use）

> **有骨架之後，脈絡散掉之前。**
>
> 太早，doctrine 只是願景。
> 太晚，doctrine 變成考古。

Havamal 最適合在專案有骨架、有幾次高脈絡長 session 之後建立——但要在脈絡散進太多舊 plan、半記得的決策、散落的對話紀錄之前。

那個中間窗口，是原料最豐富、又還壓得下來的時刻。

---

## TL;DR

- **不要**第一天就建 doctrine。
- **要**在專案有可運作骨架 + 真實判斷痕跡之後建。
- 如果太晚，還可以建，但要用「考古模式」（成本更高）。
- 最好的原料是**幾次高品質長 session**，不是短 handoff。
- 不確定時，跑下面那個 readiness rubric。

---

## 三個階段

### 階段 1 — 太早：不要建

專案開始時，通常只有：

- 一個 idea
- 幾段對話
- 還沒穩定的架構
- 還沒踩坑
- 還沒拒絕過什麼誘惑方向
- 還沒累積品味

**這時候不要建 doctrine。** 你會寫出泛泛的口號：

- 「我們要有高品質。」
- 「我們要簡潔。」
- 「我們使用者優先。」
- 「我們要可擴展。」

讀起來 OK，寫起來零成本，但**教不到未來的代理**任何東西。這些是想像出來的心法，不是付過代價的。

這個階段需要的是：

- README
- 初始 plan
- 短 handoff
- decision notes

把建 doctrine 的力氣留到專案有 scar 的時候。

### 階段 2 — 正好：現在就建

這是最佳時機。從這些信號可以辨認：

- 專案有可運作的骨架（v0 已上線或接近）
- 已經有幾個有實質的 spec / plan / PR
- 至少拒絕過一個誘惑方向
- 代理反覆犯同樣錯誤，你一直在修正
- 使用者開始說「不對，不是這樣——是這樣」
- 至少一次高脈絡長 session 讓專案形狀變清楚
- 你能明確說「這個專案不是 X，而是 Y」
- 一些舊 handoff 或文件開始誤導新代理
- 新代理只讀 README 已經沒辦法安全接下去

這時候 doctrine 的材料**最充足而且最壓得下來**。現在就寫。

**一句話的判準：**

> 當你開始感覺 handoff 不夠、而 README 又太冷——就是 doctrine 的時機。

### 階段 3 — 太晚：考古模式建

如果專案已經長大、但沒有 doctrine，還是可以建，但這不是「新蓋」，比較像「考古」。

你會遇到：

- 很多舊 spec（有些 superseded，有些不清楚）
- commit 歷史很長
- 代理讀舊文件、接錯脈絡
- 團隊口頭共識多，但從沒落進文字
- 很多判斷只存在某 2-3 個人腦中

考古模式的建 doctrine 流程不同：

1. **當前狀態盤點** — 現在真的為真的是什麼？
2. **標 stale 文件** — 哪些文件按字面讀會誤導？
3. **挖出 5-10 個關鍵決策**——從 commit history / 聊天紀錄 / retro
4. **整理 5 個重複失敗**，作為 failure-memory 的材料
5. **從最近的 review / 糾正中**整理 3-5 個 taste examples
6. **然後才**寫 doctrine（L1 / L5 / L6 / failure-memory / taste-examples）

不要一上來就 L1-L6。少了考古這一步，寫出來的抽象不會 fire。

---

## 什麼時候可以建（YES 信號）

把這個 checklist 放進你自己的 `when-to-use` 文件，決定要不要建 doctrine 前先過一遍。

Yes signals：

- 專案已有可運作骨架
- 已完成幾次長、高脈絡的代理 session
- 有你不想再解釋的重複糾正
- 一些舊 plan 或 handoff 開始誤導新代理
- 專案已拒絕過一些誘惑方向
- 你能說出「這個專案不是 X，而是 Y」
- 腦中至少有 3 個真實失敗記憶
- 至少有 3 個可以寫下來的品味案例
- 只讀 README 的新代理已經無法安全接續

如果上述有 **6 條以上**符合，就是時機。

## 什麼時候不要建（NO 信號）

在以下狀況不要建：

- 專案還只是一個想法
- 還沒有可運作骨架
- 還沒發生過有意義的失敗
- 你還說不出「錯掉的那個近版本」是什麼
- 只有「品質、簡潔、使用者優先」這種泛泛價值
- README + 短 handoff 已經夠用
- 你還沒發現自己在對代理重複解釋

如果上述有 **3 條以上**符合，就是太早。之後再來。

---

## 定義性的那句話

> **有骨架之後，脈絡散掉之前。（After skeleton, before sprawl.）**

這是好時機的形狀。**骨架**意味著專案有已經 ship、被 review 過、被 iterate 過的結構——不是 wireframe。**Sprawl** 意味著脈絡已經散進太多文件、聊天、記憶，一顆腦袋扛不下。

這兩點之間，是 doctrine **寫起來成本最低、讀起來槓桿最大**的區間。

---

## 最好的原料

不是所有專案歷史都同等有用。依重要性排序：

### 1. 高品質長 session（價值最高）

一次長、高脈絡、經歷過反覆糾正 / 框架重設 / 翻轉 / 收斂的 session，包含專案判斷力的**變形過程**。

這種 session 會抓到：

- 一個方向怎麼被推翻
- 使用者為什麼不滿意
- 代理怎麼誤解意圖
- 一個模糊感覺怎麼變成可執行規則
- 哪些詞被重新定義
- 哪些比喻被試過後淘汰

短 handoff 抓到的是**結果**。長 session 抓到的是**轉化**。doctrine 是從轉化建起來的。

### 2. 被 review 過的 plan（round-1 → round-2 → execution）

特別是 round-2 抓到的：

- Scope drift
- 信任邊界違反
- Stale framing
- 遺漏的 invariants

兩輪之間的修正，是結晶化的判斷。

### 3. Postmortem / findings

- 實驗結果
- 錯誤分析
- merge 後問題
- edge case 遇到的狀況

這些是**預壓縮的教訓**，等著被寫成 failure-memory。

### 4. PR summary（好的那種）

- 真的 ship 了什麼
- 什麼被刻意排除
- 什麼被 defer 到以後，為什麼

### 5. 使用者的明確糾正

使用者說：

- 「不對，不是這樣。」
- 「你太保守了。」
- 「這讀起來像公司群組。」
- 「這不是我要的那種失控。」

每一次糾正都是胚胎期的 doctrine 條目。

---

## 為什麼長 session 特別重要

高品質長 session 是最豐富的單一來源。一份 transcript 裡常常同時會出現：

- 幾個 L6 候選（session 中途翻轉產生的 scar）
- 幾個 failure-memory 條目（代理掉進的 pattern）
- 幾個 taste examples（透過 iteration 浮現的好 / 壞對照）
- 一些 L1 釐清（「這個專案是 X、不是 Y」的時刻）
- state-snapshot 更新（現狀被明確化）

如果你用**回看你最好的那次 session** 來建 doctrine，2 小時的萃取會勝過 2 週泛泛的文檔整理。

**實務訣竅：** 挑一次高品質長 session，頭到尾重讀。每一個「啊」或「不對，不是這樣」的時刻，問自己：這屬於哪一層？那就是你 doctrine 的起點。

---

## Doctrine Readiness Rubric（就緒度評分）

每題打 0-2 分（0 = 完全沒有，1 = 部分，2 = 明確有）。

| # | 問題 | 分數 |
|---|---|---|
| 1 | 有可運作骨架 | 0 / 1 / 2 |
| 2 | 有反覆的使用者糾正 | 0 / 1 / 2 |
| 3 | 發生過有意義的失敗 | 0 / 1 / 2 |
| 4 | 舊脈絡開始累積 | 0 / 1 / 2 |
| 5 | 專案拒絕過誘惑方向 | 0 / 1 / 2 |
| 6 | 有可寫的好 / 壞品味案例 | 0 / 1 / 2 |
| 7 | 新代理只靠 README 無法安全接續 | 0 / 1 / 2 |

**解讀：**

- **0-5 分：太早** — 繼續做事，之後再回來
- **6-9 分：建 lightweight doctrine**（見下）
- **10-14 分：建完整 doctrine**

如果打到 4 分或以下，專案太新。如果打到 13 分以上，可能已經進入考古模式——有些脈絡可能已經散掉。

---

## 三種建立模式

依就緒度分數挑模式。

### Lightweight Doctrine（6-9 分）

剛過初期。用最小可行集：

```
state-snapshot.md
doctrine-thesis.md        （或 SKILL.md — 簡短身分陳述）
failure-memory.md
taste-examples.md
bootstrap-prompt.md
```

5 個檔案。L1 / L3 / L4 先跳過。等專案累積得更多再補。

### Full Doctrine（10-14 分）

專案已進入穩定工程節奏。建完整結構：

```
SKILL.md
references/
  state-snapshot.md
  layer-1-ideology.md
  layer-2-knowledge.md
  layer-3-methods.md
  layer-4-sops.md
  layer-5-thinking-modes.md
  layer-6-heart-methods.md
  failure-memory.md
  taste-examples.md
  apprenticeship-check.md
  bootstrap-prompt.md
  provenance.md
```

團隊模式再加 `governance.md` + `decision-records.md`。

### Recovery Doctrine（14 分以上，或老專案沒有 doctrine）

Sprawl 已經發生。不要直接寫 layers，先考古：

1. **stale-doc 盤點** — 列出每份文件，標 canonical / superseded / ambiguous
2. **decision archaeology** — 找 5-10 個塑造當前狀態的決策，寫成一句摘要
3. **failure extraction** — 從 retro / revert / Slack thread 挖重複 pattern
4. **current-state 重建** — 重寫 `state-snapshot.md`，反映今天的真實，不是半年前的
5. **然後才**寫 L1 / L5 / L6 / failure-memory / taste-examples

時間預算是新建 doctrine 的 2-3 倍。

---

## 代理怎麼判斷該不該建 doctrine

當使用者問「這個專案要不要做 Havamal？」時，代理應該：

1. **誠實**跑一次 readiness rubric（不要樂觀解讀）
2. 回報分數
3. 建議：不建 / lightweight / full / recovery
4. 如果答案是「不建」，建議其他路徑（寫 README、handoff 紀律、簡短的 decision notes）

**不要因為使用者問了就推薦建 doctrine。** Doctrine 有成本，成本要和就緒度匹配。

---

## 為什麼「早建」會失敗

太早寫出來的 doctrine：

- 裝的是「價值觀」，不是「信念」
- L6 沒有 scar，會變 slogan
- 沒有真正失敗，failure-memory 是臆測
- 沒有 taste examples，品味只能寫成形容詞
- 還沒人用就先過期

Doctrine 看起來像那麼回事，但**不 fire**。代理讀完 token 變多了，但姿態沒變。

**早建的徵兆：** 回頭讀自己寫的 L6，心裡會問「這我是**付過代價**，還是**只是寫下來**？」如果是後者，刪掉。

---

## 為什麼「晚建」仍然值得

即使在考古模式，doctrine 仍然划得來：

- 新代理不會再犯舊錯（failure-memory 即使晚建也是載入核心）
- 架構轉向會被記下，不是默默忘掉
- 團隊成員不會再重複爭論同樣的決策
- 未來代理不用翻 200 條 Slack thread 才找得到「這專案怎麼想」

Recovery doctrine 成本較高，但下游省下的時間——每一個未來代理都不用重新學——會複利。

---

## 那句關鍵話

> **有骨架之後，脈絡散掉之前。（After skeleton, before sprawl.）**
>
> 太早，它變成願景。
> 太晚，它變成考古。

整篇如果只記一句，記這句。

---

## 相關

- [`everyday-use.md`](everyday-use.md) / [`everyday-use.zh.md`](everyday-use.zh.md) — doctrine 建好後日常怎麼用
- [`solo-mode.md`](solo-mode.md) — 個人開發者
- [`team-mode.md`](team-mode.md) — 團隊專案
- [`migration-guide.md`](migration-guide.md) — 實際安裝流程
- 英文版：[`when-to-use.md`](when-to-use.md)
