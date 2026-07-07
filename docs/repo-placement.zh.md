# Repo 放置與隱私邊界

> **Havamal 是專案資產。跟專案一起 version-control。
> 但不是所有想法都該進 main。**

Doctrine 該放哪？該進 repo 嗎？什麼進 `main`、什麼留分支、什麼根本不該 commit？這份文件回答這些。

---

## TL;DR

- **預設：doctrine 跟專案一起放 repo。** 它影響專案怎麼被開發、review、維護——所以屬於專案。
- **建議路徑：`docs/project-doctrine/`**（agent-neutral）。runtime-specific 的 adapter 像 `.claude/skills/` 或 `.codex/skills/` 之後可以再加。
- **三層：**
  - `main` — 穩定、可分享、可公開
  - branches — 草稿、incubation、進行中
  - repo 外 — 敏感、個人、推測性
- **公開 / 開源 repo：** 只放公開決策相關的內容。Archaeology Mode 對個人的推論**永遠不公開**。
- **個人專案的 doctrine 也該進 repo** — 只是 repo 設 private，或用 private branch。

---

## 一句話判準

> **只要這條 doctrine 會影響專案怎麼開發、review、維護，它就應該跟專案一起 version-control。**

穩定、可分享的放 repo。私密、敏感、推測性高的放 repo 外或 private branch。

---

## 三層

### Layer 1 — 共用 doctrine（放 `main`）

穩定、可分享的核心。放 `main`，像 source code 一樣 version-control。

內容：

- `state-snapshot.md`
- `layer-1-ideology.md`
- `failure-memory.md`
- `taste-examples.md`
- `layer-5-thinking-modes.md`
- `layer-6-heart-methods.md`
- `bootstrap-prompt.md`
- `provenance.md`
- `apprenticeship-check.md`

Team Mode 再加：

- `governance.md`
- `decision-records.md`

**為什麼這些進 main：**

- 未來 session 會載入
- 其他代理會讀
- 新 contributor 用它 onboarding
- Code reviewer 會引用
- 開源協作者會受益

如果 doctrine 只留在某一個代理的 memory、或某個開發者的本機 `.codex/`，**一半的價值就丟了**。

### Layer 2 — 草稿與 incubation（分支，或 `references/incubation.md`）

還沒準備好進 `main`。

- `references/incubation.md` — 還沒升格的候選條目
- `doctrine/` 分支 — 進行中的 doctrine 更新、大型 failure-memory 加入、正在 review 的 archaeology report
- 第二輪 plan review 的 input，當 plan 本身屬於 doctrine-adjacent

分支範例：

```bash
git checkout -b doctrine/mvd                          # 第一次 bootstrap
git checkout -b doctrine/failure-memory-llm-actions   # 加特定 FM 條目
git checkout -b doctrine/archaeology-<project>        # archaeology 分析進行中
```

等條目穩定、confidence 高再 merge 到 main。

### Layer 3 — 敏感 / repo 外

有些內容**不該** commit（或只能在 private repo）。

例子：

- 對特定個人的判斷
- 內部政治
- 非公開商業策略
- 客戶資料、API token、secret
- 太個人的自我提醒
- 還沒公開的產品方向
- Archaeology Mode 對動機的揣測

放在：

- `.private/project-doctrine/`（local-only，`.gitignore`）
- `~/.codex/memories/<project>-private-doctrine.md`（user 層，跨專案）
- Private repo 或 private branch
- 完全不在任何 repo 的本機檔案

**公開 repo 永遠不放這些。**

---

## 什麼進 `main`

| 類別 | 例子 |
|---|---|
| 穩定的專案身分 | L1 ideology 配 violation test |
| 已知失敗模式 | L6 heart methods、failure-memory 條目 |
| Review 相關的品味 | taste-examples |
| Onboarding 用的現況 | state-snapshot |
| 代理 bootstrap loader | bootstrap-prompt |
| 團隊 governance | governance.md（team mode） |
| 正式決策 | decision-records.md（team mode） |
| Doctrine 溯源 | provenance.md |

## 什麼**不**進 `main`（但可以進分支）

| 類別 | 放哪 |
|---|---|
| 還沒驗證的候選 doctrine | `references/incubation.md`（commit 但標「candidate」） |
| 在 review 的 doctrine 更新 | `doctrine/*` 分支 + PR |
| 待驗證的 archaeology report | `doctrine/archaeology-*` 分支 |
| 待審 plan 的 round-2 評論 | PR 留言，不是 doctrine |

## 什麼**絕不**進公開 repo

| 類別 | 改放 |
|---|---|
| 對個人人格的揣測 | **哪裡都不要寫** |
| Archaeology 對動機的推論 | **哪裡都不要寫** |
| 能辨識客戶的失敗 | Private repo，ID 要 redact |
| 商業機密 / 戰略 | Private repo |
| 未發布的產品方向 | Private branch 直到 ready |
| 使用者 credential / token | **永遠不要 commit 到任何地方**——用 `.env` + `.gitignore` |
| 個人 rant | Private notes file，不是 doctrine |

---

## 目錄慣例

### 建議預設

```
docs/project-doctrine/
  state-snapshot.md
  layer-1-ideology.md
  failure-memory.md
  taste-examples.md
  bootstrap-prompt.md
  ...
```

**為什麼是 `docs/project-doctrine/`：**

- Agent-neutral 名字（不洩漏任何 runtime 的命名慣例）
- 在 GitHub 上像正式的專案文件
- docs-aware 工具容易找到
- 不預設 Claude Code / Codex / 任何工具

### Runtime adapter（選配、附加的）

想讓某個代理 runtime 自動載入：

```
.claude/skills/<project>-doctrine/    # Claude Code 自動 resolve
.codex/skills/<project>-doctrine/     # Codex CLI
```

這些可以是 `docs/project-doctrine/` 的 **symlink 或複本**，維持單一來源。

```bash
ln -s ../../docs/project-doctrine .claude/skills/<project>-doctrine
```

Windows 用 `mklink /D`，或維護兩份（doctrine 很小）。

### 私密補充

```
.private/project-doctrine/           # 加進 .gitignore
```

放敏感筆記——不該離開你的電腦、不該進公開 repo 的。

### 舊路徑

本 repo 早期文件用的是 `docs/skills/<project>-doctrine/`——那個路徑仍然 valid，行為一樣。看專案自己決定；不要為了改名而破壞已有設定。

---

## 公開 vs 私有 repo

### 公開 / 開源 repo

**放：**
- 所有穩定的 doctrine 層
- Failure-memory（去個人化——見 Team Mode）
- Taste examples，必要時 redact
- Governance 和 decision records（team mode）

**不放：**
- 上面 Layer 3 的所有內容
- Archaeology 對個人的推論（即使是 maintainer pattern 也必須守「分析決策、不分析人格」）
- 未發布的戰略
- 能辨識客戶的資訊

### 私有 repo（個人或團隊內部）

**放：**
- 公開 repo 能放的所有東西
- 更直白的 failure memory
- 不想被搜尋/索引的內部脈絡
- 綁定 doctrine 決策的未發布 roadmap

**個人專案的 doctrine 通常放在 private repo 或 private branch。仍然屬於版本控制——只是不在公開的地方。**

---

## Archaeology Mode：倫理上的 repo 邊界

Archaeology Mode 產生的報告是關於**別人的專案**的。這些報告放哪裡很重要：

### 可以 commit 到**你自己的** repo

- `archaeology-report-<project>.md` — 只有公開決策 pattern
- `contribution-strategy-<project>.md` — 給你自己的行動指南
- `review-risk-map-<planned-PR>.md` — 你自己送 PR 前的分析

**每條推論都要帶 confidence + 證據。** 見 [`archaeology-mode.zh.md`](archaeology-mode.zh.md) 的「實際操作中怎麼守邊界」。

### 任何地方都不要 commit

- 特定 maintainer 的人格 profile
- 揣測動機
- 任何 maintainer 讀了會覺得被侵犯的內容

**Rule of thumb：** maintainer 讀這條，會說「準確，我可以接受被引用」嗎？是 → in-bounds。不是 → 不要寫。

---

## 分支策略

### 第一次 bootstrap（MVD）

```bash
git checkout -b doctrine/mvd
# 建 docs/project-doctrine/ 放 4 檔 MVD
gh pr create --title "docs: add minimum viable project doctrine"
```

### 加一條 failure-memory

```bash
git checkout -b doctrine/failure-memory-<topic>
# 改 failure-memory.md
gh pr create --title "docs(doctrine): add failure memory for <topic>"
```

### 更新 state-snapshot

- **小團隊：** 直接 commit 到 main 可以。State-snapshot 一週更新一次。
- **大團隊：** 如 governance 要求就走 PR + owner review。

### Archaeology 分析

```bash
git checkout -b doctrine/archaeology-<target-project>
# 產出 archaeology-report / contribution-strategy / review-risk-map
gh pr create --draft --title "docs(doctrine): archaeology of <project>"
```

用 draft PR 先討論，特別是任何推論接近邊界的時候。confidence + 證據都過了才 merge。

### Team Mode：doctrine-changing PR 像架構 PR 一樣 review

governance 細節見 [`team-mode.md`](team-mode.md)。Commit message 風格：

- `docs(doctrine): add failure memory for <class>`
- `docs(doctrine): promote <entry> to L6`
- `docs(doctrine): mark <entry> superseded`
- `docs(doctrine): archaeology report for <project>`

---

## 個人 doctrine 要不要進 repo？

**要。** 即使只有你自己用。

因為「你」不是一個受眾——是：

- 下週的你
- 全新的代理 session
- 不同的 model（Claude → Codex → Gemini）
- 不同的機器
- 長任務恢復
- 未來的考古

如果 doctrine 只留在本機代理 memory，任何環境變動都會切斷這條線。

**但是：** 如果內容私密，用 **private** repo（或 private branch、或本機 `.private/` 目錄）。**Version-control 的好處不需要公開才能得到。**

---

## Doctrine 有公開也有敏感內容怎麼辦

分成兩份：

```
docs/project-doctrine/               # 公開安全、放 main
  state-snapshot.md
  layer-1-ideology.md
  failure-memory.md
  taste-examples.md
  bootstrap-prompt.md

.private/project-doctrine/           # 加 .gitignore，或 private repo
  sensitive-notes.md
  commercial-context.md
  personal-reminders.md
```

或者用兩個 repo（public 方法論 + private 補充），用本機路徑互相 reference。

**不要混。** 一份同時裝安全和敏感內容的 doctrine 檔案，要嘛會漏，要嘛強迫整份變 private。

---

## 決策流：這個東西該 commit 嗎？

依序問：

1. **這條是不是依賴非公開資訊？** 是 → private repo 或 repo 外。
2. **這條是不是在 profile 某個人？** 是 → 哪裡都不要寫。
3. **這條是不是穩定、已驗證的觀察？** 是 → `main`。不是 → 分支或 incubation。
4. **我分析的那個專案的 maintainer 看了這條會 OK 嗎？** 不會 → 不要寫。
5. **刪掉這條會讓未來代理更容易或更不容易重犯錯誤？** 刪掉更容易重犯 → commit。

五題都過 → commit 到 main。

---

## 常見錯誤

- **Doctrine 只放 CLAUDE.md。** 綁定單一 runtime 和單一機器。外部化到 `docs/project-doctrine/` 讓任何工具都讀得到。
- **把敏感內容塞進公開 repo「反正只是內部筆記」。** 公開 repo 會被 index、mirror、爬取。**假設公開 repo 裡的東西是永久的。**
- **Doctrine 更動從不開分支。** 小更新（state-snapshot）直接 commit 到 main 可以，但大 L6 加入或 archaeology report 值得 review。
- **把 `.private/` 當成安全但沒檢查 `.gitignore`。** 一旦 commit 就進歷史了。加敏感檔案前要確認兩次。
- **把 profile 個人的 archaeology report commit 進去。** 即使出於善意。重讀 [`archaeology-mode.zh.md`](archaeology-mode.zh.md) 的「倫理邊界」。
- **個人 doctrine 完全不進 repo。** 你未來的自己是不同的受眾。不想公開就用 private repo，**但還是要進 repo**。

---

## 統攝原則

> **Havamal 是專案資產。跟專案一起 version-control。
> 但不是所有想法都該進 main，也不是所有想法都該公開。**

三層（main / branches / 外面）、一條倫理規則（分析決策、不分析人格）、一個測試：「這會幫未來代理、還是誤導他們？」

---

## 相關

- [`install.zh.md`](install.zh.md) — per-runtime 放置細節
- [`archaeology-mode.zh.md`](archaeology-mode.zh.md) — 推論條目的倫理邊界
- [`team-mode.md`](team-mode.md) — doctrine PR 的 governance
- [`maintenance.zh.md`](maintenance.zh.md) — commit 後條目怎麼老化
- 英文版：[`repo-placement.md`](repo-placement.md)
