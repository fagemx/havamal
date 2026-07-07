# Doctrine 維護指南（Maintaining Havamal）

> **Git 保存歷史。Doctrine 保存可用的判斷。**
>
> Doctrine 應該越維護越**尖**，不是越維護越**胖**。

維護是大部分 knowledge base 死掉的地方。不斷長胖直到沒人讀，然後就不再幫任何人。Doctrine 有同樣的風險——避開這個風險的紀律是：**積極 triage**。

這份文件就是那個 triage 的規則書。

---

## TL;DR

- **Git 有歷史。Doctrine 有判斷。** 不要只因為「發生過」就塞進 doctrine。
- **每條 entry 四種命運：** Keep / Promote / Archive / Delete。
- **不確定，就先 incubate。** 用 candidate 檔收留「還沒把握」的東西。
- **維護是事件驅動 + 輕量週期性掃一下。** 不是天天做。
- **健康的 doctrine 會縮小。** 每次 review 應該刪 / 合併的比新增的多。

---

## 為什麼只靠 git 不夠

Git 回答：

- 什麼改了？
- 什麼時候改？
- 誰改？
- diff 是什麼？

Git **不**回答：

- 為什麼這個方向被拒絕？
- 這個錯下次怎麼偵測？
- 這個判斷能不能轉移到其他場景？
- 這是暫時修補，還是長期原則？
- 新代理應該從這裡學到什麼？

你*可以*說「到時候讓 agent 爬 git」。可以，但：

- commit 量太多且常常很小
- PR body 常常不完整
- old plan 沒被標 superseded
- user correction 在聊天裡，不在 git 裡
- agent 會把歷史事實誤當現在規則
- agent 很難分辨「當時的權宜」和「長期心法」

更準確的說法：

> **Git 是原始地層。Doctrine 是已提煉的礦。**

不要把礦場交給每個新代理重挖。

---

## 四種命運

每條 doctrine entry 最後會走向四種命運之一。不是 keep/delete 二選一——是四選一。

### 1. Keep

還有用。原地留。

**條件：**
- 未來代理還會用到
- 還能防止重複錯誤
- 還能解釋當前架構或品味
- 還能幫助 plan review

**例：** 「LLM 不產生 trusted callback action。」（還活著的不變量。）

### 2. Promote

短期紀錄 → 長期經驗。

handoff 裡的一句話：

> 「那份 renderer plan 被 supersede，因為它把 producer 和 consumer 混在一起。」

如果這個失敗 pattern 反覆出現，就該升格到：

- `failure-memory.md`（四欄位完整條目）
- 或 `layer-5-thinking-modes.md`（推理姿態）
- 或 `layer-6-heart-methods.md`（附 scar 的壓縮格言）
- 或 `taste-examples.md`（正反對照）

**判準：** *這個 pattern 會不會重複？* 如果會，promote。

### 3. Archive

已退役，但有歷史價值。

**條件：**
- 舊架構已不在用
- superseded 的 plan
- 被取代的 convention
- 不指導當前工作，但能解釋怎麼走到現在
- 未來可能需要考古

Archive ≠ delete。Archived entries 要標：

> **Historical. Do not use as current doctrine.（歷史性。不要當作當前 doctrine 使用。）**

這點很重要，因為**舊文件最危險的是「看起來還像真的」**。沒標記的 stale entry 會誤導每個讀到它的新代理。

### 4. Delete

真的移除。

**條件：**
- 被更準確的條目取代
- 沒有判斷價值（只是 git 已有的原始歷史）
- 已經被某個更通用的條目吸收
- 錯了而且不值得保留
- **留著會誤導未來代理**

刪除不是丟失歷史——git 還在。刪除是**降低未來代理的認知污染**。

---

## 決策樹：這條怎麼處理？

```
它還會影響未來判斷嗎？
├─ 不會 → Delete 或 Archive（見下面 delete vs archive）
└─ 會 →
    ├─ 描述的是當前狀態嗎？
    │   └─ 是 → state-snapshot.md
    │
    ├─ 是反覆出現的錯誤 pattern 嗎？
    │   └─ 是 → failure-memory.md
    │
    ├─ 是具體的好/壞對照嗎？
    │   └─ 是 → taste-examples.md
    │
    ├─ 是長期原則嗎？
    │   └─ 是 → L1 / L5 / L6（按 layer guide 選）
    │
    └─ 只是歷史背景嗎？
        └─ 是 → Archive
```

白話版，問自己：

1. **這會被用來判斷未來的什麼事嗎？**
2. **如果會，判斷什麼？**
3. **它是狀態、方法、失敗、品味、心法，還是歷史？**
4. **放錯層會不會誤導人？**
5. **如果 git 已經有了，doctrine 還需要嗎？**

---

## 「之後會不會用也不知道」——incubation 的答案

這種情況會常常發生。剛發生某件有意思的事，你還沒把握它是不是 doctrine 材料。

**規則：不確定，不要立刻 promote。先 incubate。**

加一個檔案：`references/incubation.md`（或 `doctrine-inbox.md`）。格式：

```markdown
## Candidate: <短名稱>

- **Source（來源）：** <session / PR / retro>
- **Why it may matter（可能重要的原因）：** <一行>
- **Not promoted because（還沒 promote 的原因）：** <關於適配 / 重複 / 成本的不確定>
- **Revisit after（何時回來看）：** <日期或 trigger——例如「下個大功能後」或「2026-05-20」>
```

每次 review，每個 candidate 有三種結果：

- **30 天後 / 下個里程碑後仍然重要** → 升格到對應層
- **沒再出現，不再像是個模式** → delete
- **只有歷史意義** → archive

這比強迫自己當下決定、然後不小心把噪音塞進 L6 好太多。

---

## 條目 lifecycle

每條 entry 可能處於這幾種狀態：

- **candidate** — incubation 中，還不是 doctrine
- **active** — 目前還在 fire
- **superseded** — 被更新的條目取代
- **archived** — 已歷史化，有標記
- **deleted** — 已移除（需要時 git 還有）

不要過度設計。低風險條目不用加 metadata。高風險條目可以加輕量 footer：

```markdown
<!-- status: active; last-reviewed: 2026-04-20; next-review: 2026-05-20 -->
```

只對 L1 / L6 / 高影響的 failure-memory 用這種。每條 bullet 都加是 overkill。

---

## 維護節奏——三種頻率

不要天天做。維護要輕量，不要變義務。

### 1. 事件驅動（主要節奏）

這些事件觸發維護掃描：

- 有 major PR merge
- plan 被推翻
- agent 重複犯你還沒記下來的錯
- user 明確糾正了重要東西
- 長 session 結束，出現新 framing
- 實驗產生清楚的「做 / 不做」結論
- 舊文件被抓到誤導新代理

這是 doctrine 活下來的主要方式：**回應信號，不是排程維護。**

### 2. 每週 / 雙週掃描（輕量）

個人專案：1-2 週一次。
團隊專案：每週或每 sprint 一次。

問五個問題：

1. `state-snapshot.md` 有沒有過期？
2. 有沒有 incubation 候選該 promote（或 delete）？
3. 有沒有舊 plan 該 archive？
4. 有沒有 L6 條目安靜地變成 slogan（沒有真 scar）——該刪？
5. 過去一週有沒有 git-only 的事件其實該進 doctrine？

如果一個月的活躍期間都沒產生任何變更，doctrine 可能是過期了，不是完美了。

### 3. handoff-heavy 工作前

要開多代理長任務、或 onboard 新人 / 新 agent 前，做一次 focused 掃描。多代理會放大 stale context。

---

## 「三次規則」——什麼配進 doctrine

不是每件事都該進 doctrine。用兩條規則：

### 三次規則

同一類事情發生三次：

- 代理重複誤讀同一個 pattern 三次
- user 糾正同一件事三次
- plan review 提醒同一個風險三次
- 同一個錯方向不斷冒出來

→ 升格進 doctrine。

### 代價規則

即使只發生一次，但代價很高，也該進 doctrine。

一次就該升格的例子：

- 差點讓 LLM 產生 trusted action（安全 / 信任邊界）
- 差點破壞資料層
- 實驗外推結果錯了
- 被鎖定在某個失敗的模型版本
- 舊文件害某個 agent 執行 superseded plan

只要代價夠重，一次就夠。

---

## 什麼**不該**進 doctrine

邊界要明確。這些留在 git / issue / PR / handoff / 聊天就好：

- 單次小 bug
- 純進度更新（「ship 了 feature X」）
- 沒有轉移價值的聊天片段
- 當下情緒
- 沒有證據的 slogan
- 很快會變的環境資訊（package version、vendor flag）
- 一次性 workaround
- 沒有未來判斷價值的 commit 摘要

**如果你說不出「這條會被用來判斷未來什麼決策」，它就不是 doctrine。**

---

## 什麼時候該 delete

這幾種情況 delete：

1. 被更準確的條目吸收了
2. 只描述舊狀態
3. 對未來判斷沒幫助
4. 會誤導 agent 對當前狀態的理解
5. 只是 raw history，git 已有
6. 空泛 slogan
7. 重複了另一條 doctrine

**最難的是 #4：**

> **留著會誤導未來代理的條目，留著比刪掉更危險。**

有潔癖的人會抗拒刪除。抗拒這個抗拒——過胖的 doctrine 沒辦法做它的核心工作。

---

## 什麼時候該 archive（不是 delete）

這幾種情況 archive：

- 方向曾經重要
- 未來代理可能需要理解為什麼沒走那條路
- 它能解釋一次重大轉向
- 它是已經正式 supersede 的 proposal
- 有考古價值，但不該指導當前工作

Archived entries 必須標：

> **Historical only. Do not use as current doctrine.**

沒標的 archive 和沒清的 stale doctrine 一樣危險。

---

## 什麼時候該 promote

Promotion 是最有價值的維護動作。你在把觀察壓縮成長期規則。

**Promote 的信號：**

- 看似事件，其實是 pattern
- 能防止未來錯誤，不只是解釋過去的
- 能幫代理做更好判斷
- 能跨場景轉移
- 可以寫成一條 durable rule

**升格範例：**

事件：
> 「renderer feature v0.1 不該讓 LLM 生成 button。」

升格後：
> 「LLM produces semantic material; deterministic runtime produces trusted UI actions.」

後者是 doctrine。前者是 handoff。

---

## 代理怎麼幫忙維護

維護不該完全壓在開發者身上。代理應該在**對的時機**主動提出更新建議——不是每個時刻。

### 代理**應該**主動浮現 doctrine 候選的時機

- user 說「又來了」/「我們一直遇到這個」
- user 明確糾正結構性的東西
- 某個 plan 被推翻
- postmortem 做完
- 代理 review 找到結構性問題
- 長 session 結束
- 某個 PR 改變了架構或產品方向

### 代理**不該**主動浮現的時機

- typo / 格式修正
- 沒有系統性意義的小 bug
- 例行 merge
- 跑測試
- 查本地 code
- 日常執行工作

### 提議格式

代理看到 doctrine 材料時可以這樣提：

> 「這看起來是 doctrine 材料。我可以：
> 1. 留在 handoff（本次 session only）
> 2. 加進 failure memory
> 3. 加進 taste examples
> 4. 升格到 L5 / L6
> 5. 標舊文件為 archive」

**不要每次都問。在對的時機問**——見上面的 trigger 清單。

---

## Doctrine triage 模板

對於一時無法決定命運的候選，用 triage 紀錄。見：

- [`templates/doctrine-triage.md`](../templates/doctrine-triage.md) — 每個 candidate 一份的 copy-paste 模板
- [`templates/havamal-skill/references/incubation.md`](../templates/havamal-skill/references/incubation.md) — 長期收集 candidate 的檔案

---

## 反模式：doctrine 變胖（doctrine obesity）

大部分專案掉進的失敗模式：

- Doctrine 每週變長
- 什麼都不刪
- L6 充滿沒 scar 的 slogan
- failure-memory 變成 bug log
- taste-examples 變成 style guide
- 新代理讀一大堆、吸收不到什麼
- 維護變成沒人做的雜事

**變胖的徵兆：** 你不再建議別人「先讀 doctrine」，因為你對它的狀態有點不好意思。

**解藥：**

- 每次 review 至少有時候要刪 / 合併的比新增的多
- 每次重讀 L6 都問：「這我是真的付過代價，還是只是寫下來？」
- 每條 failure-memory 都過一次：「那個偵測 heuristic 真的 fire 嗎？」
- 每條 taste-example 都過一次：「這個對照現在還教得到東西嗎，還是已經過時？」

---

## 統攝性原則

> **Doctrine 應該越維護越尖，不是越維護越胖。**

大部分維護是**壓縮**，不是累積。如果你這個月 review 加了 3 條、刪了 0 條，就開始在 drift 了。

---

## 快速參考表

| 狀況 | 動作 |
|---|---|
| 條目還在 fire | Keep |
| handoff 等級的觀察現在重複出現了 | Promote |
| 舊了但值得記住原因 | Archive（加 "historical" 標記）|
| 重複 / 會誤導 / 沒判斷價值 | Delete |
| 還不確定 | Incubate（candidate 檔）|
| Git 已經有了、doctrine 不加值 | 留在 git |
| 短期 workaround | 放 handoff，不是 doctrine |
| 單次便宜的 bug | 放 issue / PR，不是 doctrine |
| 單次高代價的坑 | 立刻 promote（一次規則的成本版）|
| 同樣 pattern 第 3 次出現 | 升格（三次規則）|

---

## 相關

- [`everyday-use.md`](everyday-use.md) / [`everyday-use.zh.md`](everyday-use.zh.md) — 平常怎麼載入 doctrine
- [`when-to-use.md`](when-to-use.md) / [`when-to-use.zh.md`](when-to-use.zh.md) — 什麼時候該建 doctrine
- [`six-layer-model.md`](six-layer-model.md) — 六層定義
- [`failure-memory.md`](failure-memory.md) — 怎麼寫 failure-memory
- [`taste-examples.md`](taste-examples.md) — 怎麼寫 taste examples
- 英文版：[`maintenance.md`](maintenance.md)
