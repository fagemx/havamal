> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Lane 並行（Lane Parallelism）

> 只有當控制平面（見 `docs/control-plane.zh.md`）已就位，且單軌 agent loop
> 已經乾淨地跑過多個 package 之後，才考慮加它。

控制平面預設是**單軌**。一個 `next` 項目。一個焦點。一個 loop。

某些專案最終會需要多於一條 active track —— 例如 quality 軸與 runner 軸、
governance 軸與 feature 軸、或 research 軸與 build 軸。Lane 並行是
opt-in 的擴充，讓多軸共存，又不破壞 loop 契約。

---

## TL;DR

- **單軌是預設**。Lane 並行是 opt-in。
- **一條 lane 是一條有名字的 package 軌道**。每個 package 可帶一個選用的 `lane` 欄位。
- **每條 lane 最多一個 `next`**。多個 `next` 只有在分屬不同 lane 時才允許。
- **`currentFocus` 可變成以 lane 為 key 的物件**。一條 lane 一個 focus。
- **紀律本身沒變**。每條 lane 還是挑自己第一個未卡 `next`、還是遵守所有 stop conditions、還是每完成一個 package 就更新控制平面。

---

## 什麼時候加它

只有下列條件**全部**成立才加：

- 控制平面已經跑過足夠多 package，loop 紀律已經是自動反射。
- 兩條（含以上）軌道是真正獨立的（不同檔案、不同 reviewer、不同驗證命令）。
- 操作員能用一個短句說出每條 lane 的意圖。
- 真的有某個 package 正在被「單軌排序」憑空卡住。

下列情況**不要加**：

- 工作其實是序列的，只是被包裝成並行。
- 操作員還沒決定哪些 package 屬於哪條軌道。
- Loop 在單軌模式下還沒乾淨跑通。
- Agent loop 契約還沒寫下來。

---

## Schema 擴充

控制平面 schema 加兩個選用欄位：

```jsonc
{
  "lanes": ["quality", "runner", "governance"],

  "nextQueue": [
    {
      "order": 23,
      "id": "QC11",
      "status": "next",
      "lane": "quality",
      "goal": "...",
      "doneWhen": "..."
    },
    {
      "order": 24,
      "id": "RUN3",
      "status": "next",
      "lane": "runner",
      "goal": "...",
      "doneWhen": "..."
    }
  ]
}
```

`currentFocus` 可保留字串（只有一條 lane 有 `next` 時），也可變成以 lane 為 key 的物件（多條 lane 有 `next` 時）：

```jsonc
"currentFocus": {
  "quality": "Fix the narrow extraction gap exposed by QC10.",
  "runner":  "Wire the spec-to-runtime bridge command."
}
```

啟用 lane 後，status 命令應印出 per-lane focus。

---

## Lane 紀律

每條 lane 跑同樣的 loop：

1. 在這條 lane 內挑第一個未卡的 `next`。
2. 做能推進它的最小切片。
3. 驗證。
4. 更新控制平面。

唯一變化是：

- 多條 lane 可同時有 `next`。
- 每條 lane 有自己的 focus。
- 完成一個 package 只更新自己 lane 的 focus，不動其他 lane。

一個 package 在沒有操作員明確批准前**不能改動其他 lane 的 `next`**。
跨 lane 變動屬於 governance package 的範疇。

---

## Stop conditions 仍然全域有效

stop conditions 是全域的，不是 per-lane。任何 lane 的 package 若觸到 stop-condition 類別，
仍須先過 approval package。

Lane 不是繞過 stop list 的捷徑。

---

## 衝突規則

當兩條 lane 動到同一個檔案，專案必須挑下列三種政策之一，
寫進 `docs/<project>-governance.md`：

- **順序 merge**：先完成的 lane 先 commit，第二條 rebase 並解衝突。
- **每條 lane 一個 worktree**：每條 lane 在自己的 git worktree 工作，merge 是控制平面事件。
- **平行禁動共用檔**：需要動到共用檔的 package 必須走單軌。

挑一個。不要讓專案在政策間漂移。

---

## 反面案例

- **Lane 當成標籤**。如果兩條 lane 其實是同一條 workflow 加 tag，那就不是 lane，把它們合掉。
- **超過 4 條 lane**。超過 4，人類操作員無法在一個螢幕內持有所有當前 foci。專案應該先丟一條再加。
- **跨 lane 的 package**。一個 package 同時動每條 lane = 偽裝成 feature 的 governance 變動。
- **跨 lane 的隱性依賴**。如果 lane A 暗自依賴 lane B，JSON 必須把它編碼（`dependsOn` 欄位，或維持 `status: "queued"` 直到 B 發出某個 marker）。不能有隱性耦合。
- **操作員繞過 queue**。如果操作員經常挑 `next` 以外的 package，lane 正在掩蓋一個規劃漏洞，而不是真的啟用並行。

---

## 來源

Lane 機制是在 Foundry 控制平面進到下列狀態之後才加進去：

- Conversation Quality 工作（確定性提取打磨）與 Spec-To-Runtime Bridge 工作（CLI 接線）動的檔案集不同，序列排序在浪費時間；
- 控制平面自身需要一次 governance 修改來正式化 lane 機制 —— 而這次修改本身就想成為其中一條 lane；
- 操作員想分別檢查「目前的 quality 焦點是什麼？」與「目前的 runner 焦點是什麼？」。

參考實作把一個 `GOV2` governance package 排在前面，先擴 schema 才開任何 lane —— 啟用並行這件事本身就是一個單軌 package。

參考：

- `docs/control-plane.zh.md`
- `templates/control-plane.json`
- `templates/control-plane.schema.md`
