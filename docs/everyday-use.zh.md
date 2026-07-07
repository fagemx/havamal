# 平常怎麼用（Everyday Use）

> **工作要接續，用 handoff。
> 判斷要接續，用 doctrine。**

你不用每天「管理 doctrine」。只有在需要讓專案累積下來的判斷力介入時，才把它載入。

絕大多數時候，你只要跟代理講：

> 先讀 project doctrine。

就結束了。代理會去讀 load-protocol 裡的檔案，重新進入這個專案的姿態，再做你請它做的事。你不需要記六層架構、bootstrap 流程、檔案路徑——你只要知道：**需要判斷的時候，讓 doctrine 被載入。**

---

## TL;DR

- 開發者不直接用 doctrine，是透過代理用。
- 平常只需要講一句：「先讀 doctrine」。
- 代理要在判斷密度高的時刻自動載入，瑣事跳過。
- 核心價值集中在 9 種時機（下面列）。
- 好的 doctrine 檢驗標準：你發現自己說「先讀 doctrine」比「重新解釋專案」還多。

---

## 開發者平常怎麼用

你不會某天早上想「我今天要用 Havamal」。你早上會對你的代理說：

- 「接著做。」
- 「你先看一下這個專案。」
- 「幫我 review 這個 plan。」
- 「這個方向對嗎？」
- 「不要再犯上次那個錯。」
- 「我開新 session 了，你自己接上。」

這些話應該都要觸發代理去讀 doctrine。

設計層面的任務是：讓你的代理**知道**這些要求意味著「先讀 doctrine」。用 bootstrap-prompt、CLAUDE.md / AGENTS.md / GEMINI.md 的 pointer、apprenticeship-check 把這個反射訓練起來。

訓練完之後，這件事會變成隱形的。你不用再重新解釋專案，代理會繼承姿態。

---

## 9 種載入 doctrine 會有價值的時機

每一種：**開發者會怎麼講** → **代理該做什麼** → **為什麼重要**。

### 1. 開新 session 時

**開發者講：**
- 「新 session，先讀 doctrine。」
- 「你先接上這個專案。」

**代理做：**
1. 讀 `SKILL.md`
2. 讀 `state-snapshot.md`
3. 讀 L1 / L5 / L6
4. 讀 `failure-memory.md`
5. 簡短回報：
   - 目前狀態
   - 不可變心法
   - 過期脈絡（文件裡哪些已經不是真的了）
   - 下一步可能動作

**為什麼重要：** 這是 handoff 最常見的替代場景。不用每個 session 重講一遍專案怎麼想。代理從檔案繼承姿態。

### 2. 開始新功能前

**開發者講：**
- 「我要做下一個功能，先用 doctrine 幫我判斷方向。」
- 「這種 feature 要怎麼切才符合我們的做法？」

**代理做：** 讀 L1（心法）、L3（方法）、L5（思考模式）、failure-memory、taste-examples。然後回答：
- 這個任務屬於哪一層？
- 最小安全切片是什麼？
- 哪些方向不要做？
- 需要什麼 gate（flag、kill-switch、review）？

**為什麼重要：** 避免「一上來就做太大、做歪」。把新功能關在學派裡。

### 3. 寫 plan 前

**開發者講：**
- 「幫我寫 implementation plan，但先按 project doctrine 檢查 scope。」

**代理做：**
1. 讀 doctrine
2. 對照 failure-memory，找可能重蹈覆轍的 pattern
3. 寫 plan 時加入這些明確段落：
   - Invariants
   - Forbidden list（本 plan 承諾不會做的事）
   - Acceptance gates
   - Stale-context warning
   - What not to do

**為什麼重要：** 多代理並行時特別有價值。執行前通過 doctrine-check 的 plan，比事後 review 安全。

### 4. Review plan 時

**開發者講：**
- 「用 doctrine review 這份 plan。」
- 「這符合我們的判斷方式嗎？」

**代理做：** 不只是技術 review，多問：
- 有沒有違反任何 L1 心法？
- 是不是用了舊 framing（L2 stale）？
- 是不是把暫時狀態當 durable doctrine？
- 是不是重複 failure-memory 裡的 pattern？
- 是不是引入這個專案已經拒絕過的信任邊界？
- 是不是 generic best practice，其實不適合這個專案？

**為什麼重要：** 抓到純技術 review 抓不到的 drift。

### 5. PR / merge 後

**開發者講：**
- 「這個 PR merge 了，幫我更新 doctrine。」

**代理做：** 判斷這次更動屬於：
- 單純 state update → 只改 `state-snapshot.md`
- 出現新的誘人錯誤類型 → 加進 `failure-memory.md`
- 值得保存的新品味判斷 → 加進 `taste-examples.md`
- 舊 plan 被取代 → 在 L2 標 stale、在 state-snapshot 記一筆
- 真的付過代價的教訓 → 考慮寫成 L6 心法
- 有溯源價值 → 更新 `provenance.md`

**為什麼重要：** doctrine 不更新會過期。不是每個 PR 都要更新 doctrine，但重要 PR 至少應該被**問**過這個問題。

### 6. 代理重複犯錯時

**開發者講：**
- 「你們一直犯同一個錯，把它寫進 doctrine。」

**代理做：** 把這個具體錯誤一般化，寫成 failure-memory 條目（誘惑 / 怎麼失敗 / 未來偵測 / 正確動作）。如果這個 scar 夠重，也可以壓縮成 L6 心法。

**為什麼重要：** 這是 doctrine 最有價值的時候。把「我不想再講一次」變成可繼承的規則。

### 7. 專案方向變了

**開發者講：**
- 「我們方向變了，幫我調整 doctrine，不要只更新 handoff。」

**代理做：** 編輯：
- Doctrine thesis / 身分陳述
- L1 ideology（哪些心法還成立？）
- L2 當前狀態（新的閱讀階梯）
- L5 思考模式
- `provenance.md`（記錄這次轉向）

要小心分類：仍然有效 / 需要修正 / 已經 superseded。方向變了，不代表舊心法全失效。

**為什麼重要：** 比直接重寫 README 安全。保留「這個專案曾經相信什麼、為什麼」的軌跡。

### 8. 新人 / 新代理 onboarding

**開發者講：**
- 「用 doctrine onboard 這個代理。」
- 對新成員：「不要只讀 README——先讀 doctrine。」

**代理 / 新成員做：** 跑 apprenticeship-check（6 個問題），具體於這個專案地回答。這 6 題同時測代理和 doctrine。

**為什麼重要：** 新鮮眼睛要嘛通過（已進入學派），要嘛以某種方式失敗，而失敗本身會暴露 doctrine 的缺口。兩種結果都有用。

### 9. 把方法移植到新專案

**開發者講：**
- 「用 havamal-builder 幫我的 trading agent 建一套。」

**代理做：** **不要**搬移任何其他專案的 doctrine。用 `skills/havamal-builder/` 這個 skill：
- 問這個新專案的 domain core 是什麼
- 找出它最怕變成的錯版本
- 蒐集既有 failure memory
- 蒐集 taste examples
- 為這個專案客製 apprenticeship check

**為什麼重要：** 六層結構通用，內容必須從專案自己長出來。

---

## 直接可用的指令（雙語）

把這些直接丟給代理，每一條都會觸發特定時機的 doctrine 載入。

### 開新 session

**中：**
> 先讀 project doctrine，告訴我目前狀態、不可變心法、過期脈絡、下一步可能做什麼。

**英：**
> Read the project doctrine and give me the current state, durable doctrine, stale context, and likely next moves.

### 開始新功能前

**中：**
> 做這個功能前，先讀 doctrine，告訴我最小安全切片，以及哪些方向不要做。

**英：**
> Before planning this feature, read the doctrine and tell me the smallest safe slice and what we should not do.

### Review plan

**中：**
> 用 project doctrine 審查這份 plan，重點看過期框架、信任邊界、重複犯錯、scope drift。

**英：**
> Review this plan against the project doctrine. Focus on stale framing, trust-boundary violations, repeated failure patterns, and scope drift.

### PR 後更新 doctrine

**中：**
> 這個 PR 改變了我們的判斷方式，幫我更新 doctrine：state snapshot、failure memory、taste examples、provenance，必要才改。

**英：**
> This PR changed how we think. Update the doctrine: state snapshot, failure memory, taste examples, and provenance if needed.

### 記錄重複犯的錯

**中：**
> 這個錯我們一直重複，把它寫成 failure memory。

**英：**
> We keep repeating this mistake. Turn it into a failure memory entry.

### 萃取心法成 L6

**中：**
> 這個決策好像很重要，判斷它是不是 L6 heart method；如果是，請附上證據和來源。

**英：**
> This decision feels important. Decide whether it belongs in L6 heart methods, and if yes, write the entry with evidence.

### 新代理 onboarding

**中：**
> 先跑 apprenticeship check，證明你理解這個專案，再提工作計畫。

**英：**
> Use the apprenticeship check to verify that you understand this project before proposing work.

---

## 你是哪一種情況？

Doctrine 的用法會依狀況變。對應到下面其中一種。

### A. 個人開發 + AI 代理

**最基本要維持的檔案：**
- `state-snapshot.md`
- `layer-1-ideology.md`
- `layer-5-thinking-modes.md`
- `layer-6-heart-methods.md`
- `failure-memory.md`
- `bootstrap-prompt.md`

**更新頻率：** 每週，或每個大功能後。

**平常互動：** 任何非瑣事的工作前，講一句「先讀 doctrine」。這就佔紀律的 90%。

### B. 個人開發 + 多個 AI 代理並行

**同 A，但以下要更嚴：**
- 每個代理開工前讀 doctrine
- 每次 plan-review 對照 failure-memory
- 代理一犯錯，立刻寫成 failure-memory 條目
- 代理做出好判斷，保留成 taste example

這時 doctrine 是多代理的**共同腦幹**。

### C. 團隊（多人 + 代理）

**要加：**
- `governance.md`
- `decision-records.md`
- Doctrine 更動走 PR，需 owner review
- 「Merge 這個 plan 前，檢查是不是改到 doctrine。」

**更新頻率：** 按 governance 裡定義的 cadence（每週或 milestone 後）。

**紀律轉向：** 從「快」（個人）變成「可審查的共識」（團隊）。

### D. 吃品味的專案（產品 / 設計 / 內容）

**重點檔案：**
- `taste-examples.md`（量要多）
- `layer-6-heart-methods.md`
- `apprenticeship-check.md`

因為品味不能只寫成形容詞（「高級」、「自然」、「有靈魂」），必須編碼成正反對照組。

### E. 高風險領域（交易、研究、強監管軟體）

**重點：**
- `failure-memory.md`（密度高、偵測要準）
- L3 / L5 要有 evidence rules 和對抗性檢查
- 延遲評估代替即時執行
- 每個決策邊界都要有 risk gate

Doctrine 在這個領域是**風險治理工具**，不是品味工具。

---

## 代理什麼時候該主動載入 doctrine

每件小事都讀 doctrine 會很累。完全不讀又會 drift。

平衡：**判斷重要時載入，無關緊要時跳過。**

### 自動載入的觸發點

代理應該主動說「我先讀一下 doctrine」的情境：

- 使用者說「下一步」、「接下來做什麼」
- 使用者要寫 plan
- 使用者問「這個方向對嗎？」
- 使用者要 review
- 使用者說「不要再犯這個錯」
- 使用者提到舊決策
- 任務動到 prompt、runtime、信任邊界
- 任務要建自動化 loop
- 任務要刪除或封存東西
- 開新 session
- 長任務中斷後 resume

### 不要載入的情境

以下不要預先載入 doctrine：

- 小 bug
- 格式修正
- 問局部 API / 符號
- 跑測試
- 改 typo
- 查特定檔案
- Doctrine scope 外的 one-off script

一個好用的 heuristic：如果這個任務一個有能力但沒有專案脈絡的通用代理也能做，doctrine 可以省。如果這個任務需要知道**這個專案判定什麼叫好**，那就必須讀 doctrine。

---

## 心智模型——開發者實際上要記的東西

你不需要學完整的六層理論。你只要記五個時機：

1. **開新 session** → 讀 doctrine
2. **要寫大 plan** → 查 doctrine
3. **review 方向** → 對 doctrine
4. **同樣的錯犯兩次** → 寫進 doctrine
5. **完成大事** → 更新 doctrine

就這樣。其他（六層、協定、模板）都是代理該處理的，只要 loader 接好了。

---

## 平常用法的反模式

- **每件小事都載入 doctrine。** 太重、太慢、訊號被稀釋。
- **從來不載入 doctrine。** 專案的判斷力會一個 session 一個 session 地萎縮。
- **讓 doctrine 過期不更新。** 代理讀到舊 framing，當作當下的在推理。
- **代理只是複述而不是使用。** 讀檔案不等於進入姿態——跑 apprenticeship check。
- **開發者想用腦袋維持 doctrine。** 這正是 doctrine 要取代的事。

---

## 產品化的一句話定位

> **工作要接續，用 handoff。
> 判斷要接續，用 doctrine。**

Handoff 回答**發生了什麼**。Doctrine 回答**我們怎麼判斷**。兩者互補——都要用，分開放，在不同時刻載入。

開發者的日常絕大部分是 handoff。開發者最難的時刻是 doctrine。

---

## 收尾原則

Doctrine 不是每天維護的東西。它是讓每個 session 感覺像**回來**而不是**重新開始**的那個東西。

你會知道它在 work——當你發現自己說：

> 「先讀 doctrine。」

比說：

> 「我重新解釋一下這個專案。」

還多。
