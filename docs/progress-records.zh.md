# 進度紀錄（Progress Records）

> **Doctrine 固定的是判斷怎麼被提煉。
> 進度紀錄是彈性的。**

採用 Havamal 常見的疑問：「我是不是 state-snapshot、narrative log、decision record、provenance 全都要有？」

**不用。** 你只要**能保存你想帶進未來的判斷的最小紀錄集合**就好。這份文件盤一下各種紀錄形式、各自的用途，以及它們怎麼餵 doctrine。

---

## TL;DR

- **不同紀錄服務不同時間尺度。** State snapshot 是「今天」。Handoff 是「下一小時」。Narrative log 是「這週這段弧線」。Decision record 是「這個已決事項」。Provenance 是「這條 doctrine 的來源」。
- **用能保存判斷的最小紀錄形式。** 不是每個更新都要變成 doctrine。
- **Promotion path 是固定的，格式不是：** 原始進度 → 敘事 → 決策 → doctrine。
- **Solo / Team / Archaeology 三個模式倚重不同紀錄。** 紀錄集要配合模式。

---

## 核心紀錄類型

從短到長排。

長任務的執行狀態（大戰役是什麼、下一個可做單元、停機條件）屬於運行中的軟體不屬於 markdown：用 [edda](https://github.com/fagemx/edda)。退役的手養方法保留在 [`archive/`](archive/)。

### 1. State snapshot — 「現在」

**用途：** 讓新 session 快速知道當前真的是什麼狀態。

**放：**
- 當前階段
- 最近幾天 ship 的 commit / PR
- 活躍的 blocker
- 下一步可能動作
- 字面讀會誤導的 stale docs
- 當前 owner / 當前 branch

**不放：**
- 長篇敘事歷史
- 為什麼一路走到這
- 完整決策路徑
- 心法

**短、可覆寫、低敘事。** 每週或有狀態變更時更新。Header 要日期。

**它是「現在地圖」，不是日記。**

### 2. Handoff — 「下一個 session」

**用途：** 讓下個 session 接續某個具體在途任務。

**放：**
- 我剛剛做到哪
- 哪個 test 過 / 沒過
- 哪個 branch
- 下一個 command
- 要小心某個坑

**比 state-snapshot 更短命。** Handoff 是「這一跑的交棒」。它不承擔 doctrine。

**如果把 handoff 和 snapshot 併成一份，handoff 很快會被忘記。** 兩者都重要的話，分開放。

### 3. Narrative log — 「一段弧線」

**用途：** 保存某段時間內「判斷怎麼形成的」。

**放：**
- 一個方向怎麼被推翻
- 一個概念怎麼變清楚
- 代理一開始怎麼誤讀、後來怎麼修正
- 為什麼當前 frame 比舊的好
- 哪些詞沿路被重新定義

**沒有 doctrine 那麼壓縮，也沒有 snapshot 那麼短。** 它是 doctrine 之後會萃取出來的**原料**。

範例：

```markdown
# Narrative Log: Renderer 的 producer/consumer 切分

一開始某份舊 plan 想讓 assistant 直接在 reply 裡發出互動 surface 指令。
看起來很吸引人，因為 button 感覺自然。

但它模糊了一個信任邊界：生成的文字會變成 UI 行為。

後來切分浮現：
- 第二階段 LLM 產出 semantic blocks
- Runtime code 決定性地渲染互動元素
- Channel adapter 只消費 trusted view model

Doctrine candidate：
LLM 產生語義材料。Runtime 擁有 trusted action surface。
```

Narrative log 在**高脈絡長 session 後**特別有價值——那種時候會發生「轉化」，而「轉化」就是之後壓縮成 L6 的材料。

### 4. Decision record — 「已決事項」

**用途：** 記錄特定決策 + 被拒絕的替代方案。

**放：**
- 決策
- 被拒絕的替代（具體命名，不要稻草人）
- 為什麼（證據或原則）
- Doctrine 影響
- 證據連結

**比 narrative log 更正式、更短。** 它是判決書，不是故事。

Team Mode 特別有用——避免同一個決策每幾個月重吵一遍。

個人專案比較少用；通常一次架構轉向配一兩個 DR 就夠。

### 5. Provenance — 「doctrine 的來源」

**用途：** 把每條 durable doctrine 條目連回它的來源。

**放：**
- L1 / L6 / failure-memory / taste 條目
- 新增日期
- 來源（session、PR、incident）
- 證據（commit、PR#、retro 文件）
- 狀態（active / retired）

Provenance 讓未來的代理能分辨**「我們付過代價」**和**「某人一次寫下的」**的差別。對 L6 和核心 failure-memory 是必需的。

---

## 時間尺度對照表

| 紀錄 | 時間尺度 | 用途 |
|---|---|---|
| **State snapshot** | 現在 | 今天是什麼狀態 |
| **Handoff** | 下一個 session | 怎麼接續某個具體工作 |
| **Execution state** | 大戰役 | 目前戰役、下一個可做單元、停機條件 |
| **Narrative log** | 一段弧線（session / 週） | 判斷怎麼形成 |
| **Decision record** | 已決事項 | 決了什麼、拒絕了什麼 |
| **Provenance** | doctrine 生命週期 | doctrine 條目從哪來 |

---

## Core / 建議 / 選配

不是每個專案每種都要。

### Core（幾乎一定）

- `state-snapshot.md`
- `failure-memory.md`
- `taste-examples.md`
- L1 / L5 / L6

這是 **minimum viable doctrine**。少了這些，doctrine 做不了它該做的事。

### 強烈建議

- `provenance.md`
- `bootstrap-prompt.md`
- `apprenticeship-check.md`

這些讓 doctrine **代理用得起來**，而不只是寫它的人自己看。

### 選配——看模式和專案節奏

- `handoff.md` — 如果你的工作流是 session-to-session 重 handoff 的
- `narrative-log/`（目錄）— 如果你做長高脈絡 session，想保存轉化過程
- `decision-records.md` — 如果你的專案有值得正式化的爭議決策（team mode 倚重）
- `incubation.md` — 如果你常遇到「可能是 doctrine，但不確定」的時刻
- `weekly-retro.md` — 如果團隊有定期 retro、想接到 doctrine 更新

**不要預先把這些都建起來。** 某個紀錄的缺席真的在傷害你的時候，才加。

---

## 三個模式倚重什麼

紀錄集合會隨模式變。

### Solo Mode

**重：**
- `narrative-log/` — 你做長 session；保留轉化
- L6 心法 — 可以直接從 narrative log 萃取
- `state-snapshot.md`

**輕：**
- `decision-records.md` — 個人用正式 DR 太重
- `governance.md` — 不需要

**為什麼：** 很多 solo doctrine 條目一開始是故事（「我本來要做 X，結果發現 Y」）。Narrative log 是自然的第一手捕捉。Doctrine 條目在每週掃描時從 narrative log 萃取。

### Team Mode

**重：**
- `decision-records.md` — 避免重吵
- `provenance.md` — 多人編輯需要可追溯
- `governance.md` — 必要
- `state-snapshot.md`

**輕：**
- `narrative-log/` — 可以有，但要標 `exploratory / not doctrine`，不要讓讀者當成團隊共識

**為什麼：** 團隊需要可審查，比需要轉化故事重要。敘事太重的團隊 doctrine 會滑向「某個人的回憶錄」。

### Archaeology Mode

**重：**
- `archaeology-report.md`
- `contribution-strategy.md`
- `review-risk-map.md`
- `evidence-log.md`（需要的話）— 每條推論都要連到支撐它的 PR / issue / comment

**不適用：**
- 你自己的 narrative log — 你在分析別人的專案，不是你的旅程

**為什麼：** 考古是推論；**沒有證據的推論是揣測**。證據密度是輸出可信的關鍵。

---

## Promotion path（升格路徑）

有多種紀錄形式的重點不是追蹤全部——是**用定義好的路徑把原始事件匯進 doctrine**。

```
長 session / PR / 使用者糾正 / incident
   ↓
Narrative log（捕捉原始轉化）
   ↓
Doctrine candidates（incubation.md）
   ↓
Failure memory / taste examples / L6 / L1
   ↓
Provenance.md 更新來源
```

每個箭頭都問：這條準備好再往前一步了嗎，還是該在當前層多留一會？

- Narrative log 條目一直堆、沒有升格——你在囤原料
- Doctrine 長大但 provenance 空的——audit trail 在流失
- Provenance 指向的證據找不到——doctrine 技術上存在但沒根

---

## 決策流：這筆資訊該放哪？

有新東西出現、不確定往哪記時：

| 它是… | 放這裡 |
|---|---|
| 只是當前狀態 | `state-snapshot.md` |
| 下個 session 需要接的東西 | `handoff.md` |
| 某個 session 內判斷怎麼形成 | `narrative-log/<topic>.md` |
| 特定決策 + 被拒絕的替代 | `decision-records.md` |
| 反覆出現的錯誤 pattern | `failure-memory.md` |
| 好/壞對照 | `taste-examples.md` |
| 附 violation test 的 durable 原則 | L1 |
| 有疤痕的壓縮教訓 | L6 |
| doctrine 條目的來源指標 | `provenance.md` |
| 可能是 doctrine 但不確定 | `incubation.md` |
| git 已經有、不需要再提煉 | 留在 git |

如果多列都成立，選**讀者**需要的那列。找 doctrine 的 contributor 要的是判斷。明天要接續的 session 要的是 handoff。兩者可以指向同一個底層事件。

---

## 反模式

- **每個 session 結束都做出 doctrine 條目。** 大部分 session 不產出 doctrine。一份好的 narrative log 通常就夠。
- **有 doctrine 但沒 state-snapshot。** 代理會在「已經 ship 的東西」這件事上靠過期假設運作。
- **Narrative log 從不 promote。** 好幾個月都沒東西被壓縮成 doctrine，那 log 是日記，不是 doctrine 來源。
- **Decision record 只是複述已 merge 的東西。** 沒命名「被拒絕替代」的 DR，只是 PR body 的抄本。
- **Provenance 對證據打馬虎眼。** 「基於團隊討論」不是證據。連訊息、PR、commit。
- **把 handoff 和 state-snapshot 合成一份。** 兩者衰退速率不同；都重要時分開放。

---

## 統攝原則

> **用能保存判斷的最小紀錄形式。**
>
> Use the smallest record that preserves the needed judgment.

State-snapshot 夠就不要寫 narrative log。Handoff 夠就不要寫 decision record。Git 已經有夠脈絡的就不要複製進 doctrine。

**Doctrine 不是 archive。它是覆蓋在 archive 之上的精煉層——archive 這件事 git 已經在做了。**

---

## Havamal 規定什麼 / 不規定什麼

**規定：**

- 六層結構（L1-L6）
- Promotion path（敘事 → 候選 → doctrine → provenance）
- 考古模式的倫理邊界
- 維護紀律（Keep / Promote / Archive / Delete）

**不規定：**

- 你有沒有維持 narrative log
- 你用不用 decision record
- Handoff 放檔案裡還是放聊天 pin
- State-snapshot 是每週還是事件驅動
- Incubation 是檔案還是心裡記一下

**把格式配合你專案的節奏。** 重點是**原始事件最後變成判斷**，不是中途用了哪套儀式。

---

## 各模式 quick cheat-sheet

**Solo Mode** — 實際要維護的：
```
state-snapshot.md
layer-1-ideology.md
layer-5-thinking-modes.md
layer-6-heart-methods.md
failure-memory.md
taste-examples.md
bootstrap-prompt.md
narrative-log/  （鬆散、per-arc）
```

**Team Mode** — 加：
```
provenance.md
decision-records.md
governance.md
```

**Archaeology Mode** — 不用上面那些，用 per-target-project：
```
archaeology-report.md
contribution-strategy.md
review-risk-map.md
evidence-log.md（選配）
```

---

## 最短版

> **Havamal 不規定進度一定怎麼記。
> 它規定的是：原始進度如何被提煉成判斷。**
>
> Havamal does not prescribe one progress-log format.
> It prescribes a promotion path: raw progress → narrative → decision → doctrine.

這個差異就是整件事的重點。

---

## 相關

- [`maintenance.zh.md`](maintenance.zh.md) — 進到 doctrine 之後，怎麼維持它的尖
- [`six-layer-model.md`](six-layer-model.md) — 升格後的 doctrine 條目長什麼樣
- [`solo-mode.md`](solo-mode.md) — 個人模式的紀錄重心（narrative-heavy）
- [`team-mode.md`](team-mode.md) — 團隊模式的紀錄重心（DR-heavy）
- [`archaeology-mode.zh.md`](archaeology-mode.zh.md) — 證據-heavy
- 英文版：[`progress-records.md`](progress-records.md)
