# 新手上路：最小可行 Doctrine（MVD）

> **30 分鐘。4 個檔案。一個 runtime 連上去。到此為止。**
>
> _第一份 doctrine 不需要完整。它只需要救下一個 session。_

這份文件建立一個**最小可行 Doctrine（Minimum Viable Doctrine, MVD）**。Repo 裡累積了很多方法論——**不需要**全部用上才能開始。

## MVD 是什麼

最小可行 Doctrine 是**最小的檔案集合，能幫助未來的代理不要重犯你現在的 context loss**。

它**不完整**。它**足夠有用**。

正好包含：

1. `state-snapshot.md` — 專案現在在哪
2. `layer-1-ideology.md` — 什麼必須保持為真
3. `failure-memory.md` — 什麼錯不能再犯
4. `bootstrap-prompt.md` — 下一個代理怎麼載入這個專案

按順序做，半小時就有 MVD。如果 day 1 想做「完整版」，你會卡住——**大部分失敗的 doctrine，是因為 day 1 太完整，不是太薄**。

**先建立 MVD。感到缺席才擴充。**

---

## 開始前：我準備好了嗎？

三個快速檢查。**任何一題 no 就之後再來：**

- [ ] 我的專案已經有可運作骨架（不只是一個 idea——有真的 ship 出來的 code）
- [ ] 我至少記得一次「代理誤解這個專案」或「我反覆解釋同一件事」的經驗
- [ ] 我能說出至少一個「誘人但錯的方向」專案已經拒絕過

三個都 yes → 繼續。否則看 [`when-to-use.zh.md`](when-to-use.zh.md) 的完整 readiness rubric。

---

## Step 1 — 選模式（2 分鐘）

回答一題：

**誰會編輯 doctrine？**

- **只有我（+ AI 代理）** → Solo Mode
- **多個人類（+ AI 代理）** → Team Mode
- **我在分析別人的專案，不是建自己的** → Archaeology Mode（看 [`archaeology-mode.zh.md`](archaeology-mode.zh.md)——不同路徑，這份文件先停）

這份指南假設 Solo 或 Team Mode。Team Mode 在 Step 3 多加 2 檔；其他步驟一樣。

---

## Step 2 — 複製模板（1 分鐘）

```bash
cp -r <project-doctrine-路徑>/templates/havamal-skill ./docs/skills/<your-project>-doctrine
```

Windows：

```powershell
xcopy /E /I <project-doctrine-path>\templates\havamal-skill docs\skills\<your-project>-doctrine
```

**不要擔心全部的檔案清單。** 你等下只填 4 個，其他原封不動。

完整 per-runtime 路徑選項：[`install.zh.md`](install.zh.md)。預設 `docs/skills/` 到處都通。

---

## Step 3 — 依序填 4 個檔案（25 分鐘）

### 檔案 1：`state-snapshot.md`（5 分鐘）

開 `references/state-snapshot.md`。用白話寫：

- **Last reviewed：** 今天日期
- **Current phase：** 一兩句話，講目前 ship 到什麼、在做什麼
- **Recently shipped：** 最近 3 件有意義的事 + 日期
- **Actively in progress：** 1-3 個 bullet
- **Hard boundaries：** 你知道這階段不會做的事
- **What to ignore：** 任何舊文件 / 舊 framing，現在讀會誤導的

**到此為止。不要追求完整。一個螢幕高度就夠。**

### 檔案 2：`layer-1-ideology.md`（7 分鐘）

開 `references/layer-1-ideology.md`。寫 **3 條**，每條：

- **Claim：** 一句話，講什麼必須保持為真
- **Why：** 一句話，講你付過什麼代價（或承諾）來守住它
- **Violation test：** 一句話，講違反的時候你怎麼認得出來

寫不出 3 條就寫 2 條。只寫得出 1 條也行——等你感受到更多再加。

**不要做的事：** 不要寫「我們重視品質」、「我們在乎使用者」這種泛泛價值。要寫具體 claim：「LLM 的輸出是提案，永遠不是 commit。」**如果你這條任何專案都適用，刪掉。**

### 檔案 3：`failure-memory.md`（10 分鐘）

開 `references/failure-memory.md`。寫 **3 條**，每條 4 個欄位：

- **Temptation：** 用「會犯這個錯的代理的聲音」寫
- **How it failed：** 具體症狀，bullet
- **Future detection：** 未來代理要看什麼 pattern
- **Correct move：** 可行的替代動作

挑你最常煩的 3 件事。「代理老是想做 X 而不是 Y」就是完美起手條目。

### 檔案 4：`bootstrap-prompt.md`（3 分鐘）

開 `references/bootstrap-prompt.md`。把全部的 `<project>` 換成你專案名字。這檔是 copy-paste loader——模板原地改一改就好，完成。

---

## Step 4 — 接到 runtime（2 分鐘）

開你 runtime 的 config 檔（CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/*`）。加：

```markdown
## Havamal

這個專案有 Havamal，位置 `docs/skills/<your-project>-doctrine/SKILL.md`。

**任何非瑣事的工作前**，依 load protocol 讀：
1. `docs/skills/<your-project>-doctrine/references/state-snapshot.md`
2. `docs/skills/<your-project>-doctrine/references/layer-1-ideology.md`
3. `docs/skills/<your-project>-doctrine/references/failure-memory.md`

**不要**把 doctrine 複述回來。進入姿態。
```

這就是整個 wire-up。代理下次 session 開始讀 config 的時候，就會在非瑣事工作前載入 doctrine。

---

## Step 5 — 測試（5 分鐘）

開一個全新代理 session（新 terminal、新 Claude Code window、隨便）。說：

> 「讀 project doctrine，然後告訴我當前狀態、一條不可變心法、一個我們見過的誘人錯誤。」

能運作的 doctrine 會給出**專案特定**的答案。太泛的 doctrine 會產生泛泛的 fluff——這是個信號：你的 3 條 L1 或 3 條 failure-memory 還不夠具體。改。

---

## 完成

這是最小可行 doctrine。你現在有：

- 一個活的 state snapshot
- 3 條 durable 心法
- 3 個誘人錯誤被捕捉
- 一個 bootstrap prompt
- Runtime 接好了

你下一個 session 會有感——不是因為 doctrine 完整，而是因為代理**有一個可以進入的姿態**。

---

## Day 1 不要做的事

Day 1 **不要**建立下面這些檔案，除非對應條件成立：

- **L2（knowledge）** — 除非專案有很多權威來源文件、代理一直讀錯
- **L3（methods）** — 除非有方法在 ≥ 2 個情境被驗證過
- **L4（SOPs）** — 除非有重複流程已經出現 3 次以上
- **L5（thinking modes）** — 除非你能說出一個你主動在用的推理姿態
- **L6（heart methods）** — 除非真的有 scar。**沒 scar 就沒 L6。**
- **taste-examples** — 除非你腦中已經有明確的好/壞對照
- **apprenticeship-check**（客製版）— 模板預設的 v0 就夠
- **provenance** — 除非已經有 doctrine 條目升格、需要追溯
- **governance**（Team Mode）— 除非有團隊**且**需要 owner
- **decision-records**（Team Mode）— 除非決策真的需要 review
- **incubation** — 除非你已經有待決 candidate

**某個檔案的缺席沒在傷害你，就讓它空著。**

### 不要製造 doctrine debt

「doctrine 不夠多」的反面失敗模式是 **doctrine debt**——塞滿空話的檔案、沒有 scar 的 L6 條目、其實只是 style rule 的 taste examples。Debt 比缺席更糟，因為：

- 未來代理浪費注意力在低訊號內容上
- Doctrine 失去可信度（「這些條目為什麼在這？」）
- 維護成本增加，維護價值不增加

**不要只因為模板有位置就去填。** 一個有 comment「等到 X 發生時才填」的空檔案，比一個塞滿 placeholder 心法的檔案好。

**寫不出具體到位的條目，就是它還沒準備好。**

---

## 擴充路徑——接下來幾週

**只在感到缺席的時候加東西。** 典型節奏：

### Week 1
- 加 1-2 條 `layer-5-thinking-modes.md`（你發現自己用的推理姿態）
- 下次「不對，不是這樣」的時刻發生時，加 3 條 `taste-examples.md`

### Month 1
- 加 1-3 條 `layer-6-heart-methods.md`——這個月每個真的疤痕配一條
- 給 L6 條目加 `provenance.md`，讓疤痕可追溯
- 寫真正的 `apprenticeship-check.md`（模板預設那 6 題常常直接就能用）

### 等你感到缺席

- `layer-2-knowledge.md` — 當你發現代理一直讀 stale 文件。指它們讀 canonical。
- `layer-3-methods.md` — 當你有一個方法跨 ≥ 2 個情境驗證過。
- `layer-4-sops.md` — 當某個具體流程第 3 次重複。
- `handoff.md` — 當 session 之間的連續性開始混亂。
- 執行狀態 — 長任務多小包、state-snapshot 看不出大方向時，用 [edda](https://github.com/fagemx/edda)（狀態管理是軟體的活不是 markdown 的活；舊方法在 `docs/archive/`）。
- `narrative-log/` — 當你的長 session 裡有值得保存的轉化。
- `incubation.md` — 當你一直有「可能是 doctrine、不確定」的時刻。

### 只有 Team Mode 才需要
- `governance.md` — 當團隊需要 owner / review cadence
- `decision-records.md` — 當你第一次有「有爭議但已決」的決策

**規則：加一個檔案是因為它的缺席是真問題，不是因為模板有那個位置。**

---

## 代理在設置時要注意

如果使用者說「幫我設置 project-doctrine」或「幫我專案建 doctrine」：

1. **先檢查 readiness**（上面 3 題 yes/no）。任何 no 就如實說，建議晚點再來。
2. **辨識模式**（一題：誰編輯這個？）。不要三個模式長篇介紹。
3. **預設走 4 檔最小版。** **不要**帶使用者跑 14 檔全集。
4. **條目要跟使用者一起寫**，不是替他們寫。條目必須來自他們的經驗，不是泛泛模板。
5. **4 個檔案能用就停。** Doctrine 現在 live 了。
6. **明確講出你「沒做」的事。** 說：「我故意把 L5/L6/taste-examples/... 留空。等你感到缺席再加。」
7. **用使用者自己的專案脈絡測試。** 跑 apprenticeship 問題（「現在狀態、durable 心法、誘人錯誤」）驗證 doctrine 會 fire。

**要避免的失敗模式：** day 1 用 14 檔模板 + 10 篇方法論把使用者淹了。**30 分鐘的最小可行 doctrine 勝過三週還沒 ship 的完整版。**

---

## 什麼時候擴充

Doctrine 是活文件。你會知道該加檔案是因為：

- 你發現自己想「這個好像該記在哪」
- 你的 state-snapshot 一直變長，因為沒別的地方可以放
- 代理以某種方式誤讀 doctrine，而新的一層剛好會抓到
- 長 session 產出了超過「狀態更新」但還不到 doctrine 的東西

**這是信號。** 不是「模板有這個位置，填起來」。

---

## 相關

- [`when-to-use.zh.md`](when-to-use.zh.md) — 完整 readiness check（開始前）
- [`install.zh.md`](install.zh.md) — 詳細安裝（per-runtime 路徑、builder skill）
- [`migration-guide.md`](migration-guide.md) — 完整版 bootstrap walkthrough（如果你要詳細版）
- [`everyday-use.zh.md`](everyday-use.zh.md) — 安裝完怎麼平常用
- [`progress-records.zh.md`](progress-records.zh.md) — 什麼時候加哪種選配紀錄
- [`maintenance.zh.md`](maintenance.zh.md) — doctrine 長大後怎麼維持尖
- 英文版：[`getting-started.md`](getting-started.md)

---

## 一行版

> **最小可行 doctrine = 4 檔案 + 30 分鐘。
> 先 ship 那個，之後只在感到某個檔案缺席時才擴充。**
