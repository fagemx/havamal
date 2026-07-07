> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# 執行控制（Execution Control）

> 當專案一直用很多小 package 推進，使用者已經看不出大方向時，用這套。

Havamal 已經區分 doctrine 和 handoff。Execution control 補的是長任務代理工作中間缺的那層：

```text
state-snapshot = 專案現在在哪
handoff = 這個具體任務下次怎麼接
execution-control = 目前大戰役是什麼、下一個可做什麼、什麼時候要停
```

它不是 doctrine 的替代品。它是一份 live control file，避免代理一直推小 commit，卻把追蹤成本丟給使用者。

---

## 快速開始

1. 複製模板：

```powershell
Copy-Item "<project-doctrine-路徑>\templates\execution-state.md" `
  "docs\product\<project>-execution-state.md"
```

如果專案使用 doctrine skill，則使用：

```text
templates/havamal-skill/references/execution-state.md
```

2. 第一次只填這幾塊：

- `North star`
- `Current position`
- `Next queue`
- `Active stop conditions`

3. 工作 session 開始時，對代理說：

```text
讀 execution-state 和 state-snapshot。取 Next Queue 第一個未阻塞項目。
做能推進它的最小 package。驗證後更新 execution-state。
```

4. Session 結束時，檢查代理有沒有更新：

- last completed package；
- current focus，如果有變；
- next queue，如果有變；
- friction，如果使用者糾正了方向；
- verification baseline，如果有變。

這些沒更新，session 就還沒收尾。

---

## 什麼時候加

只有在缺席真的造成痛點時才加：

- 專案有很多小 incremental package；
- 使用者開始問「現在到底往哪裡走？」；
- 代理每次只前進一點，沒有更新大地圖；
- 工作跨多個 session 或多個代理；
- 下一步來自一個 queue，不是單次 handoff。

如果小專案用 `state-snapshot.md` 和 `handoff.md` 就夠，不要加。

---

## 三個組件

Execution control 是 Havamal 自己的方法，由三個組件構成。

### 1. Loop control

Loop discipline：

```text
讀狀態
取一張 issue
先審做法
實作
驗證
記 friction
停或繼續
```

放到 Havamal 裡：

- **loop** 變成「working rule for future agents」；
- **backlog** 變成「next queue」；
- **friction** 變成「current friction」；
- **hard stop conditions** 變成「active stop conditions」。

### 2. Resumable state

可恢復性 discipline：

```text
current focus
last completed unit
next eligible unit
session log
不靠聊天記憶也能恢復
```

放到 Havamal 裡：

- 文件必須寫明 current focus；
- 必須寫明 last completed package；
- 必須用順序列出 next queue；
- 必須讓新代理只靠檔案就能接續。

### 3. Quality gates

品質紀律：

```text
done when
quality threshold
pack health
reviewer challenge
不要什麼都建
```

放到 Havamal 裡：

- 每個 queue item 都要有 `Done When`；
- 文件要寫明暫時不要建什麼；
- 階段前進需要 review 或 verification 條件；
- 「做了更多事」不等於「大戰役真的前進」。

---

## 建議檔案

專案文件裡：

```text
docs/product/<project>-execution-state.md
```

或 doctrine skill 裡：

```text
docs/skills/<project>-doctrine/references/execution-state.md
```

保持短到代理真的會讀。

---

## 必要章節

### 1. How to use this file

寫明什麼時候必讀、什麼時候必更新。

### 2. Control method

寫明這個專案借用了哪些方法，以及怎麼套用。

### 3. North star

用一個簡短 flow 或 goal 說明大戰役。

### 4. Current position

current focus、last completed package、latest proof、validation baseline。

### 5. Next queue

用表格：

| Order | Package | Goal | Done When |
|---:|---|---|---|

代理預設只取第一個未阻塞項目。

### 6. Active stop conditions

哪些事情必須先問使用者。

### 7. Current friction

什麼正在讓進度難追，現在怎麼處理。

### 8. Session log

最近 package 或控制層變更的短紀錄。

### 9. Working rule for future agents

未來代理必須遵守的明確 checklist。

---

## 更新規則

Session 開始：

1. 讀 execution state。
2. 讀 state snapshot。
3. 只讀第一個未阻塞 queue item 需要的文件。

Session 結束：

1. 如果有 ship，更新 last completed package。
2. 如果方向變了，更新 current focus。
3. 如果優先序變了，更新 next queue。
4. 如果使用者糾正流程，記進 friction。
5. 如果驗證基準變了，更新 baseline。

不要把每個小 commit 都升格成 doctrine。Execution state 是 volatile；大戰役變了就可以覆寫。

---

## 反模式

- **用 git log 當專案管理。** 使用者要讀 commit 才知道進度，就是 execution control 失敗。
- **queue 無限長。** Next queue 不是 wishlist，只放接下來幾個可行 package。
- **沒有 Done When。** 沒有停止條件的 queue 會變成無止盡動作。
- **進度只在聊天裡。** 狀態只存在對話裡，下一個代理一定會丟失。
- **太早自動化。** 手動 file discipline 還沒穩，不要先做 dispatcher。

---

## 模板

複製：

```text
templates/execution-state.md
```

只有在普通 state snapshot 已經不夠用時才填。

---

## 下一層（選用）

如果 markdown 執行狀態本身擠不下一個螢幕、或第二個讀者（status 命令、外部 agent、姊妹 session）需要同一份狀態，就加**機器可讀的控制平面（control plane）**。
看 [`control-plane.zh.md`](control-plane.zh.md)，template 在 [`../templates/control-plane.json`](../templates/control-plane.json)。

控制平面是 opt-in。Markdown 執行狀態仍是敘事來源；JSON 是它的結構化對應。
