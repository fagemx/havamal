# 控制平面（Control Plane）

> 當 `execution-state.md` 不再夠用時才加 —— 例如外部 agent 必須用一個命令回答「我們現在在哪？」，
> 或必須讓多於一個 agent 讀同一份 campaign 狀態。

Havamal 預設用 markdown 的執行狀態（execution state）。對許多專案來說這已經夠了。
有些專案會長出超出 markdown 容量的需求。

```text
state-snapshot      = 專案現在的位置
execution-state.md  = 目前的 campaign、下一步（人類可讀）
control-plane.json  = 同樣的 campaign 狀態，機器可讀（選用）
```

控制平面**不是取代** markdown 執行狀態。它是一個平行的介面，讓 status 命令、MCP 工具或全新 agent
能不靠讀散文就載入 campaign 狀態。

它是 **opt-in**。如果專案沒感受到缺它的痛，就不要加。

---

## TL;DR

- **當散文執行狀態擠不下一個螢幕，或第二個讀者（外部 agent、姊妹 session、status 命令）需要同一份狀態時，加。**
- **兩個檔、一個命令**：`control-plane.json` + 一支薄薄的 `<project>:status` 命令，在 30 行內印出五個問題的答案。
- **Markdown 執行狀態還在**。它承載敘事，JSON 承載結構。兩者必須一致。
- **控制平面是 doctrine 之上的一層，不是 markdown 之上**。Doctrine MVD 仍然是判斷力載入器。

---

## 什麼時候加它

只在下列至少一項成立時加：

- 操作員開始用 `git log` 來判斷專案在哪。
- 第二個 agent 或姊妹 session 需要讀同一份 campaign 狀態。
- Markdown 執行狀態長出單螢幕，已經不能一眼掃完。
- 專案需要 status 命令支援 `--json` 輸出（見 `templates/status-command.md`）。
- 專案想開 opt-in 並行 lane（見 `docs/lane-parallelism.md`）。

下列情況**不要加**：

- Markdown 執行狀態仍然一個螢幕內，唯一讀者是同一位 agent。
- Campaign 短到 handoff 就夠用。
- 專案連 MVD doctrine 都還沒做完。

---

## 五個問題

控制平面存在的目的是用一個命令回答這五個問題：

1. 現在的焦點是什麼？
2. 剛剛完成了什麼？
3. 下一個是什麼？
4. 哪些動作該停下來先問？
5. 驗證基準是什麼？

status 命令讀 `control-plane.json` 之後印出這五個答案，並讓外部 agent 也能以 JSON 形式拿到。

如果 status 命令需要超過 30 行，那控制平面正在背載應該放別處（doctrine、evidence、code）的東西。

---

## 檔案配置

```text
docs/
  product/
    <project>-execution-state.md   ← 敘事、friction、session log
    <project>-control-plane.json   ← 機器可讀的對應
  state-snapshot.md                 ← 仍然擁有專案易變狀態
scripts/
  <project>Status.<lang>            ← 印出五個問題
```

如果專案用 doctrine skill 形式，JSON 可放在：

```text
docs/skills/<project>-doctrine/references/control-plane.json
```

命名沒有強制。紀律才有強制。

---

## 與 markdown 執行狀態的一致性

JSON 與 markdown 必須在三件事上一致：

- 當前焦點；
- 最近一個完成的 package；
- nextQueue（id、order、status）。

如果不一致，專案必須先停下、把兩邊對齊，再做下一個 package。
不一致是 governance 失敗，不是正常狀態。

Markdown 擁有 JSON 無法承載的散文 —— friction 故事、session log、敘事解釋。
JSON 擁有結構 —— queue 陣列、status 列舉、驗證基準的資料化形式。

---

## 更新規則

session 開始時：

1. 跑 status 命令（或直接讀 JSON）。
2. 如果 status 命令不清楚，才去讀 markdown 執行狀態。
3. 如果這是全新 agent，讀 doctrine MVD。

session 結束時：

1. 如果有東西完成，更新 `lastCompletedPackage`。
2. 如果焦點變了，更新 `currentFocus`。
3. 如果 package 換 status，更新 `nextQueue`。
4. 如果操作員需要矯正流程，附加一則 `friction`。
5. 把 markdown 執行狀態同步成一致。

這些動作沒做，session 沒有真正結束。

---

## 這一層不是什麼

- **不是專案管理工具**。控制平面是當前狀態的一個螢幕，不是 roadmap。
- **不是 roadmap**。長線規劃留給產品文件。
- **不是 doctrine 的替代品**。stopConditions 只是短指標；每一條背後的理由放在 failure memory。
- **不是被推升為 canonical 的方法**。這層是 opt-in 升級。許多專案永遠不需要，沒關係。

---

## 反面案例

- **用 git commit 自動同步 JSON**。一個 package 是判斷單位，不是 commit 單位。Commit 推不出 status。
- **把 `friction` 當成 changelog**。Friction 記的是判斷力轉折，不是每次 code 變動。
- **讓 `stopConditions` 退化成口號**。每一條都必須是專案已經真實付過代價的失敗模式。
- **跳過 markdown**。JSON 是結構，不是故事。沒了故事，未來 agent 看不懂目前的形狀為什麼長這樣。
- **紀律還沒穩就先做 dispatcher**。能自動挑下一個 package 的排程器，只有在人類驅動的 loop 已經跑乾淨之後才會有用。

---

## 來源

這層在 Mission Runtime 專案（"Foundry"）跨多個 session、上百個小 package 的實戰中被打磨出來。
Markdown 執行狀態一開始夠用。當下列三件事同時發生時，就不再夠用：

- 第二個讀者（一個 status 命令，然後外部 agent）需要同一份狀態；
- queue 項目開始承載 lane 元資料，因為要做並行工作；
- 操作員想在專案對話之外問「下一個焦點是什麼？」。

Foundry 的實作（`docs/product/mission-runtime-control.json` + `npm run mission:status`）是參考實現。
這裡的 template 是它的一般化形式。

參考：

- `templates/control-plane.json`
- `templates/control-plane.schema.md`
- `templates/status-command.md`
- `docs/lane-parallelism.md`
