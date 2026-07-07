> **ARCHIVED (2026-07-08) — out of scope.**
> Session orchestration is not havamal's job (havamal = judgment extraction, not state or session management). Kept for provenance — do not use as current method.

# Triad Development — 三角開發法

Status: **draft**（2026-07-02，蒸餾自一個多月期 solo 產品開發的實戰紀錄）
Restoration note: 本檔於 2026-07-06 前後被另一 session 在無 supersession
註記的情況下刪除（該 session 同時提出 `agent-role-distinction.md` 的
roles/ 結構提案），2026-07-06 由原作者 session 依記憶原文恢復。若
roles/ 提案被操作員接受，本檔的角色卡部分可遷移；遷移須留轉址。
晉升條件：此方法在兩個不同性質的真實案例中存活後，用
`havamal-builder` 收割成正式 skill。方法自己也要過驗收。

## 一句話

一個人類加三種模型，各守一個推理形狀；狀態檔是唯一介質；
提案到正式狀態只有一條路——人的點頭。

## 四張角色卡

### 判斷層（fresh-eyes；由當代最強推理級模型擔任）
- 職責：讀原始文件後給獨立判斷、紅隊、命名與落地（grounding pass）、
  起草大型提案；擅長翻案與跨域綜合。
- 失效模式：從不完整上下文做過度自信綜合，新資料一來就翻。
- 約束：每份分析標注第幾次讀 raw；first-pass 低權重。
  上下文不足時只准輸出「殘餘＋不落地清單」，不准命名。
- 寫入權：只寫 proposals／incubation 新檔；不碰 control plane。

### 編排層（strategic thread；由長對話、擅承接脈絡的模型擔任）
- 職責：control plane 的**唯一寫入者**；把多方輸出整合成帶預設值的
  decision memo 送操作員；排 queue、記 friction、維護 session log。
- 失效模式：沿既有推理直推、不自發懷疑 spec；寫 PM-prose 缺視覺語言。
- 約束：送給操作員的裁決必須全白話（看不懂的裁決不算裁決）；
  品味類產出必附契約。

### 執行層（executor；由擅長逐項完成的 coding 模型擔任）
- 職責：讀 queue → 照契約做 → 跑測試 → 產 evidence → commit。
- 失效模式：把 spec 的自由度用最字面、最保險的解讀填滿。
- 約束：只消費**可打勾的斷言契約**；模糊輸入不得直達執行層
  （必先過判斷層的 grounding pass）。

### 操作員（唯一 authority；人類）
- 職責：裁決（accept／reject／waiver）、品味、對外接觸、想新概念。
- 權利：所有裁決以白話呈現；一行回覆即生效；宣告 outbound 模式後
  全系統收縮至單 lane。
- 唯一的 cross-cutting 角色；也是唯一能看見語義漂移的人。

## 介質規則

- 狀態檔是介質，agent 之間不直接對話。
- 檔案所有權表：每份狀態檔恰有一個寫入者；發現不一致者記
  mismatch note，由 owner 修，不就地改。
- 提案 → 驗證 → 人點頭 → 正式狀態。無例外。
- 承重事實附來源與查核日；無來源標 `assumption:`。

## 儀式

| 儀式 | 何時 | 產物 |
|---|---|---|
| Decision memo | 需要操作員裁決時 | 預設值＋異議欄，白話 |
| Grounding pass | 模糊／品味輸入出現時 | 命名·落點·殘餘·最小原則·不落地清單 |
| 契約 | 品味類產出開工前 | 可打勾斷言＋操作員眼球為終 gate |
| 演習 | 每能力一次（中斷／調整／併行／回滾） | 演習 evidence＋friction |
| Friction log | 每次卡住 | 一條 entry（solo 最低硬性收成） |
| Fresh-eyes 複審 | 承重決策後 | 獨立 session 對同題，diff 分歧點 |

## 已知失效模式（實戰記錄）

1. **Spec 四問缺一即出事**：長什麼樣／給誰的眼睛／住哪個房間／
   時刻怎麼流——執行層會用最字面解讀補上缺的維度。
2. **Lost update**：多 session 寫同一 mutable 檔；所有權表為解。
3. **同血統共識**：多個同家族模型一致同意的證據力弱於體感；
   現實（使用者、真實執行）是第四個 reviewer。
4. **術語洩漏**：內部詞彙出現在操作員面前的裁決或使用者面前的
   介面即為缺陷。
5. **翻案抖動**：新資訊觸發的翻案各自合理，累積燒毀執行層工時；
   解法是決策凍結窗＋抖動記 friction。
6. **Session 疲勞**：編排層 session 過長後開始重問已決問題、
   把既有決定包裝成新選項、提出與自己維護的紀錄矛盾的定位。
   徵兆出現時不與該 session 辯論——狀態檔存在的意義就是讓
   session 可拋棄：從 control plane 重啟新 session。已決事項
   立成 decision record，讓任何 session 都無從重問。
7. **無註記刪除**（2026-07-06 實例）：session 依自己的結構判斷
   刪除他人檔案而不留 supersession 註記、不搬內容、不通知
   creator——即使結構判斷正確，程序也構成資料損失。規則：
   **重組可以，消滅不行**；任何移除必留轉址與內容去向。

## Bootstrap（每角色一份開場 prompt）

見 `strong-session-bootstrap.md`（判斷層）與
`orchestrator-session-bootstrap.md`（編排層）。執行層版待補。

## 與自動化的關係

此方法的每個儀式都可以被工具逐步自動化：decision memo 可以變成
驗收對話、friction log 可以變成證據流、契約可以變成 gate 標準、
點頭可以變成一鍵晉升。能自動化的就讓工具吃掉；吃不掉的部分——
品味、裁決、新概念——就是人類位置的定義。方法先於工具存在，
工具追趕方法。
