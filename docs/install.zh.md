# 安裝（Install）

Havamal 是 markdown + 模板。沒有 binary、沒有 package manager、沒有 CLI。「安裝」的意思是**把對的目錄複製到你自己專案的對的位置，然後讓你的代理 runtime 指向它。**

這份文件說明三種你可能想「安裝」的東西，以及對應各種常見代理 runtime（Claude Code、Codex、Gemini CLI、Cursor、或什麼都不用）該怎麼放。

---

## TL;DR

| 你想做什麼 | 怎麼做 |
|---|---|
| **讀方法論** | `git clone` 或直接在 GitHub 看。不用裝。 |
| **給自己專案建 doctrine** | 把 [`templates/havamal-skill/`](../templates/havamal-skill/) 複製到你的專案 |
| **給代理裝「doctrine-builder」skill** | 把 [`skills/havamal-builder/`](../skills/havamal-builder/) 複製到你 runtime 的 skill 目錄 |
| **對別人的專案跑考古模式** | 按需複製三份 [`templates/archaeology-report.md`](../templates/archaeology-report.md)、[`contribution-strategy.md`](../templates/contribution-strategy.md)、[`review-risk-map.md`](../templates/review-risk-map.md) |

沒有一個安裝步驟比 `git clone` + `cp -r` 複雜。

---

## 三種可能的「安裝」

Havamal 裡有三個 artifact。你要裝哪個看你要做什麼。

### 1. 方法論文件

`docs/` 目錄下的檔案：philosophy、six-layer-model、failure-memory、taste-examples 等等。

**安裝方式：** 讀它們。它們是 markdown。想要本地副本就：

```bash
git clone https://github.com/fagemx/project-doctrine
```

或直接在 GitHub 上看。沒有其他動作。

### 2. havamal-skill 模板

目錄：`templates/havamal-skill/` — 14 檔骨架（SKILL.md + 13 references + team mode 用的 governance / decision-records）。

**安裝方式：** 複製到你的專案。見下面 [把模板放進你的專案](#把模板放進你的專案)。

這是最常見的情況。如果你的專案累積了夠多 scar 值得建 doctrine（見 [`when-to-use.zh.md`](when-to-use.zh.md)），就是複製這一份。

### 3. havamal-builder skill

目錄：`skills/havamal-builder/` — 教代理怎麼幫使用者建 doctrine 的 meta-skill。

**安裝方式：** 複製到你代理 runtime 的 skill 目錄。見下面 [安裝 builder skill](#安裝-builder-skill)。

選裝。如果你希望有一個代理能帶你跑 bootstrap 流程，裝這個。你也可以只直接引用方法論文件、跳過這個 skill。

---

## 把模板放進你的專案

複製模板、改名成你專案的、然後讓代理 runtime 指向它。

```bash
# 在你專案 repo 根目錄執行
cp -r <project-doctrine-路徑>/templates/havamal-skill ./docs/skills/<your-project>-doctrine
```

Windows：

```powershell
xcopy /E /I <project-doctrine-path>\templates\havamal-skill docs\skills\<your-project>-doctrine
```

然後按 [`migration-guide.md`](migration-guide.md) 把模板填起來。

### 放在哪裡

doctrine 目錄放哪裡，看你用的代理 runtime。

| Runtime | 建議路徑 | 原因 |
|---|---|---|
| **Claude Code**（專案層） | `.claude/skills/<project>-doctrine/` | Claude Code 的 skill resolver 會自動載入 |
| **Claude Code**（runtime 中立） | `docs/skills/<project>-doctrine/` | 留在 `docs/` 下，不綁死工具 |
| **Codex CLI** | `docs/skills/<project>-doctrine/` + 從 `AGENTS.md` 引用 | Codex 讀 `AGENTS.md`；doctrine 以 plain docs 形式存在 |
| **Gemini CLI** | `docs/skills/<project>-doctrine/` + 從 `GEMINI.md` 引用 | 同 Codex 的概念 |
| **Cursor** | `docs/skills/<project>-doctrine/` + 從 `.cursor/rules/` 指向 | Cursor rules 引用 doctrine 路徑 |
| **沒有特定 runtime** | `docs/project-doctrine/` 或 `docs/skills/<project>-doctrine/` | 純 markdown；任何代理都能讀 |

**不確定就放 `docs/skills/<project>-doctrine/`。** 每個 runtime 都適用（有的自動載入、有的要從 config 檔引用），也不會把你綁死在某個工具上。

### 接到 runtime 的 config

模板複製完，在 runtime 的 config 檔（CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/*`）裡告訴它 doctrine 在哪。

**範例 — CLAUDE.md 片段：**

```markdown
## Havamal

這個專案使用 Havamal，位置在 `docs/skills/<project>-doctrine/SKILL.md`。

**任何非瑣事的工作前，先按 load protocol 讀 doctrine：**

1. `docs/skills/<project>-doctrine/references/state-snapshot.md`
2. `docs/skills/<project>-doctrine/references/layer-1-ideology.md`
3. `docs/skills/<project>-doctrine/references/layer-5-thinking-modes.md`
4. `docs/skills/<project>-doctrine/references/layer-6-heart-methods.md`

然後跑 apprenticeship check：
`docs/skills/<project>-doctrine/references/apprenticeship-check.md`

**不要**把 doctrine 複述回來。進入姿態。
```

確切措辭不重要——**重要的是**代理有明確指令「非瑣事工作前先讀 doctrine」。

**範例 — AGENTS.md / GEMINI.md：** 內容一樣，只是在不同檔案。大部分代理 runtime 都會看它自己叫的那個「agent instruction file」。一樣的片段貼過去就好。

### 如果用 Claude Code：用 `.claude/skills/` 自動載入

如果你就是在用 Claude Code、希望 skill 自動被 skill tool resolve，把 doctrine 放在 `.claude/skills/<project>-doctrine/`（而不是 `docs/skills/...`）。這樣使用者或代理就能用：

```
/<project>-doctrine
```

呼叫（假設你的 runtime 支援 slash-command skill）。

如果你已經有 `docs/skills/<project>-doctrine/` 的 doctrine，也想讓 Claude Code 看得到，做 symlink：

```bash
ln -s ../../docs/skills/<project>-doctrine .claude/skills/<project>-doctrine
```

（Windows 用 `mklink /D`，或直接維護兩份——doctrine 很小。）

---

## 安裝 builder skill

**havamal-builder** skill 教代理怎麼幫使用者建 doctrine。想要有代理能帶使用者跑 bootstrap 流程的話就裝這個。

```bash
# Claude Code user-level（跨專案通用）
cp -r <project-doctrine-path>/skills/havamal-builder ~/.claude/skills/

# Claude Code project-level
cp -r <project-doctrine-path>/skills/havamal-builder ./.claude/skills/

# Codex
cp -r <project-doctrine-path>/skills/havamal-builder ./.codex/skills/
```

（確切路徑看你的 CLI 版本；查它的 skills-directory 慣例。）

**如果你的 runtime 沒有 skills 目錄：** 放到 `docs/skills/havamal-builder/`，從 runtime config 引用：

```markdown
## Havamal Builder

如果使用者要求建立、review、或維護 Havamal，載入：
`docs/skills/havamal-builder/SKILL.md`
```

這樣對任何會讀 config 檔、跟著指令做事的代理都行。

---

## 考古模式（不用安裝）

考古模式不是你「安裝進自己專案」的東西——是你**拿來分析別人的專案**。每次分析會產出 per-project 的輸出檔：

```bash
# 分析專案 X 時，在你的分析工作區：
cp <project-doctrine-路徑>/templates/archaeology-report.md ./project-X-archaeology-report.md
cp <project-doctrine-路徑>/templates/contribution-strategy.md ./project-X-contribution-strategy.md
cp <project-doctrine-路徑>/templates/review-risk-map.md ./project-X-review-risk-map.md
```

然後按 [考古模式指南](archaeology-mode.zh.md) 填。

模板留在 project-doctrine repo 裡。每次分析別的專案都可以重新複製一份模板，不要改動源。

---

## Runtime 特定說明

### Claude Code

- Skill 放在 `.claude/skills/<name>/`（專案層）或 `~/.claude/skills/<name>/`（user 層）
- CLAUDE.md session 開始時自動載入。在那裡引用 doctrine。
- Skill 的 `SKILL.md` 是進入點；references 按需載入。
- 模板的 SKILL.md body 裡的 load protocol（solo/team）可以靠人手動跟、或靠代理慣例跟。

### Codex CLI

- AGENTS.md 是主要 convention 檔。從那裡引用 doctrine 路徑。
- Codex 某些版本可能沒有一等公民的「skill」概念——把 doctrine 當成**代理受到指令時要讀的一組 markdown 文件**。
- 模板的 SKILL.md frontmatter 已經最小化成 `name` + `description`，能通過 strict Codex skill validator。

### Gemini CLI

- GEMINI.md 類比於 CLAUDE.md / AGENTS.md。從那裡引用 doctrine 路徑。
- Gemini CLI session 開始時載入 config；GEMINI.md 裡的 doctrine load-protocol 指令會自動 fire。

### Cursor

- `.cursor/rules/` 放 rule 檔。
- 加一個 rule 檔指向 doctrine 路徑，告訴代理「planning 前先載入」。

### 其他 runtime（通用）

- 選那個 runtime 的「instruction file」對應的檔案
- 把 doctrine load-protocol 片段貼過去
- 代理不需要「理解」Havamal 本身——它只要能跟著指令去讀一組 markdown 檔案即可

---

## 更新

project-doctrine 方法論本身會演化。想 pull 更新：

```bash
cd <project-doctrine-路徑>
git pull
```

**你自己專案的 doctrine 是你的**——不要用 re-copy 模板把它蓋掉。方法論文件更新是給你參考用；你填好的 doctrine 是 authoritative 版本。

### 方法論文件有實質變動時

如果 `docs/six-layer-model.md` 或其他 canonical 文件的變動會影響你 doctrine 的維護方式：

1. 讀更新後的文件
2. 判斷你現有的 doctrine 條目有沒有需要重新分類
3. 跑一次維護掃描（見 [`maintenance.zh.md`](maintenance.zh.md)）

大部分更新是 refinement，不是 breaking change。

---

## 移除

刪掉對應目錄就好。Doctrine 是純 markdown——`rm -rf` 就拆完了。代理 runtime 可能 cache 了 skill reference，restart session 就清掉。

---

## 快速參考

### 把 doctrine 裝進一個專案

```bash
cp -r templates/havamal-skill your-repo/docs/skills/<your-project>-doctrine
```

然後從 CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/` 引用。

### 給代理裝 builder skill

```bash
cp -r skills/havamal-builder ~/.claude/skills/
# 或你 runtime 對應的 skills 目錄
```

### 用考古模板做 per-analysis

```bash
cp templates/archaeology-report.md ./<target-project>-archaeology-report.md
cp templates/contribution-strategy.md ./<target-project>-contribution-strategy.md
cp templates/review-risk-map.md ./<target-project>-review-risk-map.md
```

---

## 相關

- [`migration-guide.md`](migration-guide.md) — 填 doctrine 模板的逐步指南
- [`everyday-use.zh.md`](everyday-use.zh.md) — 安裝完後，開發者日常怎麼互動
- [`when-to-use.zh.md`](when-to-use.zh.md) — 在安裝**前**，判斷你專案是否適合建 doctrine
- 英文版：[`install.md`](install.md)
