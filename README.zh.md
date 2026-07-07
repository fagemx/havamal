# Hávamál（哈瓦瑪爾）

> **你的 agent 每開一個新 session，就忘記一次「這個專案為什麼這樣判斷」。**
> Havamal 把專案用代價換來的判斷力——疤痕、品味、不可退讓的底線——變成 agent 可載入的姿勢。
> 4 個檔案、30 分鐘起步。

_原名 `project-doctrine`（舊連結自動轉跳）。改名取自北歐《埃達》中的〈高人箴言〉（Hávamál）——薩迦記載發生了什麼，箴言教你怎麼判斷。這正是本 repo 關心的那條分界：_

> **工作要接續，用 handoff。
> 判斷要接續，用 doctrine。**
>
> _Handoff 告訴代理發生了什麼。
> Doctrine 教代理怎麼判斷。_

> 英文版 README：[`README.md`](README.md)

## 從這裡開始：最小可行 Doctrine（30 分鐘）

> **先建立 MVD。感到缺席才擴充。**
>
> _第一份 doctrine 不需要完整。它只需要救下一個 session。_

Repo 看起來大，但**第一次上手很小**。**Minimum Viable Doctrine（MVD，最小可行 Doctrine）** 就是：

- **4 個檔案，30 分鐘填完：**
  1. `state-snapshot.md` — 專案現在在哪
  2. `layer-1-ideology.md` — 什麼必須保持為真（3 條）
  3. `failure-memory.md` — 什麼錯不能再犯（3 條）
  4. `bootstrap-prompt.md` — 下一個代理怎麼載入這個專案
- **一行引用**加到 runtime config（CLAUDE.md / AGENTS.md / GEMINI.md）
- **一次測試**——新代理 session 能答出：當前狀態、一條不可變心法、一個誘人錯誤

**就這樣。** MVD 不是「不完整」——它是**足夠有用**。其他全部之後再說。

→ **[`docs/getting-started.zh.md`](docs/getting-started.zh.md)** / English: **[`docs/getting-started.md`](docs/getting-started.md)**

**兩條規則：**
- **某個檔案的缺席沒在傷你，就讓它空著。**
- **不要製造 doctrine debt**——不要用空話填模板、不要在沒有真實 scar 的情況下寫 L6。

---

## 為什麼是 doctrine，不只是 handoff？

大部分 AI 代理的 handoff 只告訴下一個代理**發生了什麼**。Havamal 教下一個代理**怎麼判斷**。

Handoff 會說：

> 我們 merge 了 PR #42。下一步，實作 renderer。

Doctrine 會說：

> 這個專案把語義生成和 UI 渲染分開。LLM 可以提結構，但 button、callback、state 轉換、信任邊界是 deterministic runtime 的責任。

這個差異很重要。

---

## 這是什麼

Havamal 是一種方法：把專案付過代價的經驗，轉成可重用的**姿態載入器（posture loader）**給 AI 代理。

它保存：

- 專案心法（ideology）
- 當前狀態（current state）
- 已驗證的方法（validated methods）
- 操作流程（SOPs）
- 思考模式（thinking modes）
- 失敗記憶（failure memory）
- 品味案例（taste examples）
- 學徒檢核（apprenticeship checks）

目標不是**總結專案**。目標是**讓未來的代理做出更 project-native 的判斷，而且不必讓使用者重新教一次。**

---

## 為什麼 handoff 不夠

Handoff 有用，但衰退得快。

它通常回答：

- 發生了什麼？
- 改了什麼？
- 下一步是什麼？

它常常**不**回答：

- 為什麼選這個方向？
- 什麼誘人的路徑該避開？
- 什麼樣的 output 屬於這個專案？
- 這個專案已經付過哪些代價的失敗？
- 未來的代理應該**拒絕**做什麼？
- 新代理怎麼證明自己理解這個專案？

Havamal 補這個缺口。

---

## 核心概念

每個認真做下去的專案，最後都會長出一個**派別（school）**。

一個派別有：

- 信念
- 禁忌
- 品味
- 方法
- 疤痕
- 語言
- 判斷力

Havamal 把這個派別**明確寫下來**。

---

## 六層模型

Project doctrine 用六層組織。完整說明：[`docs/six-layer-model.md`](docs/six-layer-model.md)。

### L1 — 理念（Ideology）

**什麼必須保持為真。** 長期信念、產品哲學、信任邊界、不可妥協的底線。

### L2 — 知識（Knowledge）

**當前的真實在哪裡。** 當前階段、已 ship 狀態、活躍的 spec、近期 commit、open 的 blocker、過期的舊文件。

### L3 — 方法（Methods）

**什麼方法被驗證過有用。** 已經在這個專案裡測試過、成功過的規劃 / review / 實作 / 測試 / 修正方式。

### L4 — SOP（操作流程）

**什麼該被重複。** 針對反覆出現情境的操作配方。

### L5 — 思考模式（Thinking Modes）

**怎麼推理。** 這個專案需要的姿態：證據優先、辯證、deterministic、品味 review、safety gate。

### L6 — 心法（Heart Methods）

**這個專案付過代價學到了什麼。** 壓縮的教訓、疤痕、格言、帶具體來源的判斷規則。

**L6 不是勵志口號。** 沒有疤痕的條目，不屬於 L6。

---

## Doctrine vs Docs vs Memory vs Handoff

| Artifact | 用途 |
|---|---|
| README | 說明這個專案**是什麼** |
| 架構文件 | 說明系統**怎麼運作** |
| Handoff | 說明**剛剛發生了什麼** |
| Memory | 保存重要事實與偏好 |
| **Doctrine** | **教未來的代理怎麼判斷** |

好的專案四種都需要。但不該混在一起。

完整對照：[`docs/doctrine-vs-handoff.md`](docs/doctrine-vs-handoff.md)

---

## doctrine skill 長什麼樣

典型的 doctrine skill 結構：

```
docs/skills/<project>-session-experience/
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

最重要的檔案**不一定是 state-snapshot**。

常常最有價值的是：

- `failure-memory.md`
- `taste-examples.md`
- `layer-6-heart-methods.md`
- `apprenticeship-check.md`

這些檔案**教判斷力**。

---

## 失敗記憶（Failure Memory）

Failure memory 記錄**誘人的錯誤**。

不是責備、不是 bug、不是羞恥。

好的 failure memory 條目解釋：

- 為什麼錯的那個動作看起來合理
- 它怎麼失敗
- 下次怎麼偵測
- 正確動作是什麼

例子：

### FM-3：LLM 生成的 UI actions

- **Temptation：** 讓 model 直接在 response 裡輸出 button 語法
- **How it failed：** 它模糊了語義生成和可執行 UI 之間的信任邊界
- **Future detection：** 任何讓 model 輸出變成 callback data、id、link、state 轉換的 plan
- **Correct move：** 讓 model 產出語義 block。讓 deterministic runtime code 產出 UI。

完整方法：[`docs/failure-memory.md`](docs/failure-memory.md)

---

## 品味案例（Taste Examples）

品味案例用**對照**教「好是什麼」。

形容詞很弱。例子比較強。

與其說：

> 產品應該感覺有靈魂。

不如秀：

**好：**
系統把 lifecycle state 留在 store，button 是 deterministic 渲染出來的。

**壞：**
Assistant 說「我可以幫你封存」但沒有對應的 state 轉換發生。

**為什麼好的贏：**
前者產生可回復的產品行為。後者產生對話劇場。

完整方法：[`docs/taste-examples.md`](docs/taste-examples.md)

---

## 學徒檢核（Apprenticeship Check）

新代理不應該只是**讀**doctrine。它應該**證明**自己能用。

好的學徒檢核問：

- 現在是什麼狀態？
- 什麼是 durable？
- 什麼是 stale？
- 哪個誘人的 plan 這個專案應該拒絕？
- 這個任務屬於哪一層？
- 最小安全的下一步是什麼？

如果代理回答得出這些，它已經進入專案派別。

完整流程：[`docs/apprenticeship-protocol.md`](docs/apprenticeship-protocol.md)

---

## 快速開始

1. 把 `templates/project-doctrine-skill/` 複製到你的專案（依 runtime 看放哪）
2. 先填 `state-snapshot.md`
3. 先寫 L1、L5、L6
4. 至少加 3 條 failure memory
5. 至少加 3 條 taste examples
6. 寫 apprenticeship check
7. 做新工作前先讀 doctrine

### 安裝路徑

沒 CLI、沒 package manager——就是 `git clone` + `cp -r`。複製到哪裡看你的代理 runtime：

| Runtime | 路徑 |
|---|---|
| Claude Code（專案） | `.claude/skills/<project>-doctrine/` |
| Codex / Gemini / agent-neutral | `docs/skills/<project>-doctrine/` + 從 `AGENTS.md` / `GEMINI.md` 引用 |
| Cursor | `docs/skills/<project>-doctrine/` + `.cursor/rules/` 指向 |
| 沒特定 runtime | `docs/skills/<project>-doctrine/` — 任何代理都讀得到 |

完整安裝指南（各 runtime、builder skill、考古模板、更新、移除）：[`docs/install.zh.md`](docs/install.zh.md)

填模板的逐步指南：[`docs/migration-guide.md`](docs/migration-guide.md)

---

## 平常怎麼用

不用每天「管理 doctrine」。絕大多數時候，你只要跟代理說：

> 先讀 project doctrine。

在這些時刻用：

- **開新 session** → 讀 doctrine
- **寫大 plan** → 查 doctrine
- **review 方向** → 對 doctrine
- **同樣的錯犯兩次** → 寫進 doctrine
- **重大 milestone** → 更新 doctrine

修 typo、格式、查檔——跳過。

完整指南：[`docs/everyday-use.zh.md`](docs/everyday-use.zh.md)

---

## Doctrine 該不該進 repo？

通常**要**。

> **只要這條 doctrine 會影響專案怎麼開發、review、維護，它就應該跟專案一起 version-control。**

三層：

- **`main`** — 穩定、可分享、可公開（state-snapshot、L1、failure-memory、taste-examples、bootstrap-prompt、…）
- **分支 / `references/incubation.md`** — 草稿、candidate、進行中
- **Repo 外（或 private repo）** — 敏感、個人、推測性；profile 個人的內容永不 commit

**建議預設路徑：`docs/project-doctrine/`**（agent-neutral；`.claude/skills/` 等 runtime adapter 可以用 symlink）。

**公開 / 開源 repo：** 只放公開決策相關內容。Archaeology Mode 永遠不 profile 個人。個人 doctrine 也該進版本控制——repo 設 private 就好。

完整指南（分支策略、決策流、公開/私有切分、archaeology 倫理）：[`docs/repo-placement.zh.md`](docs/repo-placement.zh.md) / English: [`docs/repo-placement.md`](docs/repo-placement.md)

## 進度紀錄是彈性的

不同紀錄服務不同時間尺度——而且沒有一個專案需要全部都用。

| 紀錄 | 時間尺度 | 用途 |
|---|---|---|
| State snapshot | 現在 | 今天是什麼狀態 |
| Handoff | 下一個 session | 怎麼接續工作 |
| Narrative log | 一段弧線 | 判斷怎麼形成 |
| Decision record | 已決事項 | 決了什麼、為什麼 |
| Provenance | doctrine 生命週期 | doctrine 條目從哪來 |

**Havamal 規定的是 promotion path，不是格式：**
`原始進度 → 敘事 → 決策 → doctrine`

**用能保存判斷的最小紀錄形式。** 不要把每個更新都變 doctrine。

完整指南（各模式用哪些紀錄、決策流、反模式）：[`docs/progress-records.zh.md`](docs/progress-records.zh.md)

長任務一直用小 package 推進、使用者看不出大方向時，加 execution control。看 [`docs/execution-control.zh.md`](docs/execution-control.zh.md) / English: [`docs/execution-control.md`](docs/execution-control.md)。

當 markdown 執行狀態本身擠不下一個螢幕、或第二個讀者（status 命令、外部 agent、姊妹 session）需要同一份狀態時，加**機器可讀的控制平面（control plane）**。這層是一個 JSON 檔加一支薄薄的 status 命令，opt-in。

看 [`docs/control-plane.zh.md`](docs/control-plane.zh.md) / English：[`docs/control-plane.md`](docs/control-plane.md)，template 在 [`templates/control-plane.json`](templates/control-plane.json) 與 [`templates/status-command.md`](templates/status-command.md)。

當專案最終需要同時跑超過一條 active track 時，控制平面有 opt-in 的 **lane 並行**擴充。看 [`docs/lane-parallelism.zh.md`](docs/lane-parallelism.zh.md) / English：[`docs/lane-parallelism.md`](docs/lane-parallelism.md)。

## 維護

**不要**什麼東西都塞進 doctrine。

> **Git 保存歷史。
> Doctrine 保存可用的判斷。**

重要事件發生時，triage 成四種命運：

- **Keep** — 還在 fire，原地留
- **Promote** — handoff 觀察 → 長期規則（failure-memory、taste、L6）
- **Archive** — 歷史性，要標記（「不要當作當前 doctrine 使用」）
- **Delete** — 重複 / 會誤導 / 沒判斷價值（需要時 git 還在）

不確定就放 `references/incubation.md`，下次 review 再決定。

統攝原則：

> **Doctrine 應該越維護越尖，不是越維護越胖。**

完整指南（lifecycle、triage 模板、review cadence、反模式）：[`docs/maintenance.zh.md`](docs/maintenance.zh.md)

---

## 三種使用模式

Havamal 支援三種模式。六層結構一樣；**判斷從哪裡來**不一樣。

### Solo Mode（個人模式）

> Doctrine 是未來的你和你的代理，用來接住現在判斷力的外接記憶。

在自己的專案裡、邊做邊建 doctrine。低儀式感。主觀語氣 OK。更新不用 PR。

完整指南：[`docs/solo-mode.md`](docs/solo-mode.md)

### Team Mode（團隊模式）

> Doctrine 是人類與代理共同使用的判斷契約。

多個人類和代理共用一個專案。需要 governance。Failure memory 要去個人化。多兩檔：`governance.md` 和 `decision-records.md`。

完整指南：[`docs/team-mode.md`](docs/team-mode.md)

### Archaeology Mode（考古模式）

> **分析決策，不分析人格。
> 推論規範，不揣測動機。**

進入既有專案——開源、legacy、繼承來的、新雇主的——從公開 artifact（PR、issue、review、release notes）推論其 doctrine。

產出 contribution hypotheses，不是官方規則。每條推論都帶 confidence + 證據。目標是降低 review cycle 浪費，不是操弄 maintainer。

完整指南：[`docs/archaeology-mode.zh.md`](docs/archaeology-mode.zh.md)

### 我該用哪個模式？

用 **Solo Mode**：你是自己專案的主要開發者、主要跟代理合作。

用 **Team Mode**：多個人類 + 代理共用 codebase，判斷需要可審查。

用 **Archaeology Mode**：你要介入外部專案，開 PR 前要理解它的公開決策模式。

**都不用**：
- 專案很小，README 就夠
- 還沒發生過真正的失敗或品味判斷
- 一次性 deliverable，沒有未來讀者

**Doctrine 在專案有 scar 之後才有用——你的 scar、你團隊的 scar、或你要加入的專案的 scar。**

---

## 什麼時候該建立？

**不要第一天就建。**

在專案有以下條件之後建：

- 有可運作的骨架
- 有幾次高脈絡的長 session
- 有反覆的代理錯誤或使用者糾正
- 有被拒絕的方向
- 有有意義的失敗記憶
- 有足夠的品味案例能表達什麼屬於、什麼不屬於

太早，doctrine 只是**願景**。
太晚，doctrine 變成**考古**。

最佳時機：**有骨架之後，脈絡散掉之前。**

完整指南 + 就緒度 rubric + 三種建立模式（lightweight / full / recovery）：[`docs/when-to-use.zh.md`](docs/when-to-use.zh.md)

---

## 範例

見 [`examples/`](examples/)：

- [`software-project/`](examples/software-project/) — 完整填好的範例（virtual B2B SaaS 專案）
- [`trading-agent/`](examples/trading-agent/) — 量化 / 交易代理專案大綱
- [`ai-short-drama-factory/`](examples/ai-short-drama-factory/) — AI 內容 pipeline 大綱
- [`research-agent/`](examples/research-agent/) — 長跑研究代理大綱

---

## 核心原則

> **不要總結專案。
> 萃取派別（school）。**

---

## 一句話定義

**Solo Mode：**
> Doctrine 是未來的你和你的代理，用來接住現在判斷力的外接記憶。

**Team Mode：**
> Doctrine 是人類與代理共同使用的判斷契約。

**Archaeology Mode：**
> 分析決策，不分析人格；推論規範，不揣測動機。

> **AI 代理越來越會做事，但它們還是不知道一個專案為什麼這樣判斷。
> Handoff 保存工作連續性。
> Havamal 保存判斷連續性。**

---

## License

MIT — 見 [`LICENSE`](LICENSE)。
