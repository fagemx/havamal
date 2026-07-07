# 考古模式（Archaeology Mode）

> **從既有專案反推其 doctrine。**
>
> 分析決策，不分析人格。
> 推論規範，不揣測動機。

Solo Mode 和 Team Mode 都假設你從一開始就在專案裡，邊做邊建立 doctrine。**Archaeology Mode 不同**——你是進入一個已經存在的專案：別人的開源專案、你繼承的 legacy codebase、新雇主的 repo——你需要從現成的東西反推出這個專案的判斷系統。

這份文件解釋怎麼做。

---

## TL;DR

- Archaeology Mode 讀的是**公開產物**（PR、issue、review、release notes、CONTRIBUTING），不碰私人通道。
- 它產出的是**關於決策模式的假說**，不是對人的判決。
- 最高 signal 通常在**被拒絕的 PR** 和**review 很重的 PR**，不是 merge 順的那些。
- 輸出：project-doctrine brief、contribution strategy、review-risk map。
- **每條推論都要標 confidence + 證據。** 沒標就不能用。
- 目標是**降低 review cycle 的浪費和退件率**，不是操弄 maintainer 或繞過 review。

---

## 為什麼需要這個模式

大部分代理協助進入陌生專案的方式長這樣：

> 「分析這個 codebase，告訴我你看到什麼。」

這會產出一份架構圖。架構圖回答：**這個系統怎麼運作？**

但它**不**回答：

- 什麼樣的 patch 在這裡會被接受？
- 什麼樣的改動會被默默打回票、或卡在 review？
- Reviewer 期待什麼樣的證據？
- 這個專案反覆做的 tradeoff 是什麼？
- 這裡的「好」是什麼樣子？
- 這裡的「這不是我們做事的方式」是什麼？

一個新 contributor（人類或代理）寫出技術上正確但違反專案**隱性判斷系統**的 code，還是會被拒。Code 不是錯的，**形狀**錯了。

Archaeology Mode 補這個缺口——它讀**過去判斷的紀錄**（PR、issue、review），反推專案期待的形狀。

---

## 倫理邊界

這是整份文件最重要的一段。

> **分析公開決策。不要分析私人人格。**

Archaeology Mode **可以**做：

- 讀公開的 PR / issue / review / 討論 artifact
- 整理被接受 / 被拒絕的 pattern
- 描述 reviewer 已展示過的證據期待
- 推論專案的品味和 tradeoff 優先序
- 整理貢獻者傾向遵守的規範

Archaeology Mode **不**能做：

- 對特定 maintainer 做心理分析（「某人控制欲強」、「Y 偏好 Z 是因為…」）
- 揣測私人動機
- 給個人貼人格標籤
- 建立對特定人的操弄策略
- 教使用者怎麼討好、閃避、或操作 reviewer
- 任何一個正常的 maintainer 讀了會不舒服的互動

簡短版：

> **分析決策，不分析人格。推論規範，不揣測動機。**

如果一段輸出**拿給它描述的 maintainer 看，他們會覺得不舒服**，就越線了。

---

## Archaeology Mode 讀什麼

輸入（依 signal-per-effort 排序）：

### 高 signal

- **被拒或 close-without-merge 的 PR** — 專案拒絕了什麼
- **review 很重的 PR** — 專案判斷力在來回中浮現
- **被重新打開的 issue** — 還沒被解決的爭議
- **maintainer 的 pushback 留言** — 「不要這樣」通常比「LGTM」資訊量大
- **設計辯論** — 公開的 RFC、架構討論
- **scope-reduction 討論** — maintainer 把提案砍小的地方
- **release note 的框架** — 專案認為什麼叫「重要」

### 中 signal

- **多輪才 merge 的 PR** — code 最後長成什麼形狀
- **CONTRIBUTING.md / governance docs** — 顯性規則（有用但常過期）
- **issue triage pattern** — 什麼被 label、什麼被 close 成 wontfix
- **Roadmap / milestone** — 聲明的優先序

### 較低 signal（但也不是沒用）

- **一次順 merge 的 PR** — 比有爭議的 PR 教的東西少
- **README / 頂層文件** — 正式身分，很少是摩擦來源
- **commit message 風格** — 地方習慣，不是深層判斷
- **dependency 選擇** — 技術性，很少是意識形態

**反直覺的一點：** merged PR 告訴你專案**最終**會接受什麼。rejected PR 告訴你專案**立刻**拒絕什麼。拒絕資料通常判斷密度更高。

---

## Archaeology Mode 產出什麼

不是產一份龐大的 doctrine。是幾份特定用途的報告。

### 1. `project-doctrine-brief.md`

整體推論出來的 doctrine。回答：

- 這個專案認為自己在做什麼？
- 它反覆做哪些 tradeoff？
- 它拒絕哪些方向？
- 這裡的「好」是什麼？
- 這裡的「形狀錯了」是什麼？

### 2. `contribution-strategy.md`

面向 contributor 的行動建議。回答：

- 新 contributor 應該從哪裡切入？
- 什麼 size 的 PR 容易被接受？
- 這個專案期待先開 issue 嗎？
- PR 應該帶什麼證據（測試、benchmark、遷移路徑）？
- 哪些 subsystem 比較敏感？

### 3. `review-risk-map.md`

針對特定 planned change 的前瞻性風險分析。回答：

- 這個 PR 最可能在哪裡被 pushback？
- 哪些 reviewer concern 要先處理？
- 哪些設計需要先提 RFC？
- 哪些測試是必備？

### 4. `maintainer-decision-patterns.md`（注意命名）

**Pattern**，不是人格。回答：

- reviewer 反覆強調什麼主題？
- 這個專案怎麼處理 scope creep？
- 偏好小 patch 還是大 refactor？
- 要求證據，還是接受 taste judgment？
- 對 backward compatibility 的立場？

### 5. `failure-memory-candidates.md`

不是講「專案失敗」——講**在 review 中反覆失敗的貢獻 pattern**：

- 常見的退件理由
- 專案過去拒絕的設計方向
- 新貢獻者常踩的坑

這些 candidate 之後如果你在該專案裡建自己的 doctrine，可以 promote 進去。

### 6. `taste-examples-candidates.md`

從 review 推論出來的好/壞對照：

- reviewer 說「shape is right」的 PR
- reviewer 說「不是我們這樣做」的 PR
- 兩者之間的差異

---

## 七步流程

### Step 1 — 先讀顯性 doctrine

先看專案已經明說的東西：

- `README.md`
- `CONTRIBUTING.md`
- `docs/` 目錄
- `GOVERNANCE.md`（如果有）
- `ROADMAP.md` 或類似
- 頂層的設計文件 / ADR

這是**顯性層**。假設它一部分為真、一部分已過期。標哪些可信、哪些看起來 stale。

### Step 2 — 抽樣 PR / issue 歷史

小專案讀廣一點。大專案按 subsystem 抽樣。

最小可行樣本：

- 最近 merged 的 5 個 PR
- 最近 rejected / closed-without-merge 的 5 個 PR
- review 很重的 5 個 PR（不論結果）
- 5 個設計層級的 issue
- 最近幾次 release notes / milestone summary

大專案：樣本放大、按 subsystem 分層抽。

### Step 3 — 萃取反覆出現的 review concern

把 review 留言的 pattern 分類。常見軸：

- Scope（太大、要拆）
- 缺測試
- Backward compatibility
- 效能
- API 設計
- 可維護性 / code 組織
- 安全 / 信任邊界
- 文件要求
- 使用者體驗
- 跟專案方向不合

數次數。跨多個 PR 重複出現的，就是 doctrine。

### Step 4 — 推論 doctrine 候選

把 review pattern 翻成聽起來有「規則」形狀的句子：

**原始觀察：**
> 5 個大的 parser PR 裡有 4 個被要求先寫 failing test。

**Doctrine candidate：**
> 這個專案要求 parser-behavior 改動要有 failing test 才會被接受。

每條都寫成未來 contributor 能用的規則。標**candidate**——這是推論，不是官方。

### Step 5 — 找正面案例

光看拒絕不夠。要找：

- 快速 merge 並被稱讚的 PR
- maintainer 引用成「good example of X」的
- 變成後續 PR 模板的 pattern
- reviewer 正面肯定的 shape

這些是 taste-examples 候選——「這裡的好長這樣」。

### Step 6 — 寫 contribution strategy

把 doctrine 翻成可行動的建議：

> **開 PR 前：**
> - API 級改動先開 issue
> - parser 改動附 failing test
> - 第一個 PR 盡量 300 LOC 以下
> - 不要碰 generated file
> - 改 abstraction 要附遷移說明

到這一步，archaeology 的輸出才變成有用，不只是描述性。

### Step 7 — 標 confidence 和證據

每條推論**必須**帶：

```markdown
**Confidence:** high / medium / low
**Evidence:**
- PR #123（reviewer 留言）
- PR #456（退件原因）
- issue #789（maintainer 決策）
```

沒標的話，輸出會讀起來像官方規則，會誤導使用者。**沒證據的推論是揣測。**

**Confidence 判準：**
- **High** — 5+ 個獨立 artifact 看得到，且近幾個月內
- **Medium** — 2-4 個 artifact 看得到，或較舊但沒被反駁
- **Low** — 1 個 artifact 暗示，或被另一個反駁——明確標 provisional

Low-confidence 仍然有用（作為待驗證假說），但要清楚標。

---

## 實際操作中怎麼守邊界

具體例子。

### ✅ 可以

> **推論：** 這個專案拒絕大型 cross-cutting refactor，除非能接上具體的 bug fix。
>
> **證據：** PR #442、#518、#601 都是 review 後 close，原因是 refactor-without-bug-fix pattern。PR #523（也是 refactor）merge 了，因為接著 parser 的具體 bug。
>
> **Confidence：** high

### ❌ 不可以

> **推論：** 首席 maintainer 偏好簡單 code，因為他覺得複雜 abstraction 壓力大。

這是人格揣測。不是基於證據、不是基於公開決策，不能用。

### ✅ 可以（即使提到個人）

> **推論：** Reviewer @maintainer 反覆要求 parser 改動附 benchmark 比較。
>
> **證據：** PR #201、#245、#311 的 review 留言。
>
> **對 contributor 的意義：** parser PR 要附 benchmark；這是既有期待，不是新的要求。

這樣沒問題，因為是**有證據的公開 pattern**，把它框成「要準備的期待」，而不是人格聲明或操弄策略。

### Rule of thumb

讀這條給 maintainer 聽，他們會說「對，準確，引用我沒問題」嗎？如果是，沒越線。如果不是，重寫。

---

## 代理該怎麼跑 Archaeology Mode

當使用者說：

> 「我想開始貢獻專案 X。用 archaeology mode 推論它的 doctrine。」

代理應該：

1. **確認範圍。** 使用者的目標是什麼——一個 PR、長期貢獻、完整 onboarding？深度按目標 scale。
2. **確認倫理邊界。** 「我會分析公開 artifact，產出決策 pattern 的假說。不會 profile 個別 maintainer。」拿到明確同意。
3. **跑七步流程。** 產出 3-6 個報告檔案。
4. **處處標 confidence。** 沒 confidence = 不輸出。
5. **先浮現槓桿最大的發現。** 「在開你第一個 PR 前，最能降低退件率的三件事是…」
6. **提議驗證。** 「開 PR 時，如果改動實質，這幾件事要跟 maintainer 確認。」

如果使用者推向人格分析或操弄 maintainer 的方向，代理要拒絕並重新錨回倫理邊界。

---

## 什麼時候用 Archaeology Mode

**適合：**
- 進入開源專案當新 contributor
- 繼承 legacy codebase
- 新員工 onboarding，讀 code 還不夠
- Contractor 接手別人的專案
- 自動 PR bot 學什麼會被接受
- 多代理 setup 評估陌生 repo

**不適合：**
- 你已經是 insider 的專案（用 Solo / Team Mode）
- 還沒累積 review 歷史的專案（沒東西可推）
- 公開 artifact 會主動誤導的專案（閉源規劃 + 公開表面）
- 任何想用輸出來操弄特定人的 setup——拒絕

---

## 這不是什麼

- **不是「不用跟 maintainer 溝通」的替代品。** 實質改動要聯絡他們。
- **不保證 PR 會被接受。** 降低風險，不消除風險。
- **不是官方。** 它產的是**專案規範的假說**，不是正式規則。
- **不是人格 profile。** 絕對不是。
- **不是繞過專案判斷的捷徑。** 目標是**對齊**，不是繞過。

產品化的一句話：

> **Archaeology Mode 產出 contribution hypotheses，不是官方 truth。
> 用它降低 review friction，不要用它繞過 maintainer。**

---

## 為什麼這個屬於 Havamal

Solo Mode 和 Team Mode 是在專案**內部保存**判斷。Archaeology Mode 是**推論那些付過代價但從沒寫下來**的判斷。

三者合起來是三根柱子：

1. **Solo Mode** — 給未來的自己和代理保存判斷
2. **Team Mode** — 讓團隊判斷明確、可審查
3. **Archaeology Mode** — 從既有 code、PR、issue、review 推論專案判斷

有了這三個，Havamal 就不只是「我自己的代理記憶工具」，而是**代理進入陌生專案的通用方法論**。

---

## 模板

三份可直接填的模板：

- [`templates/archaeology-report.md`](../templates/archaeology-report.md) — per-project 的 doctrine brief + pattern library
- [`templates/contribution-strategy.md`](../templates/contribution-strategy.md) — 行動導向的 contribution guide
- [`templates/review-risk-map.md`](../templates/review-risk-map.md) — 針對特定 planned change 的前瞻性 risk map

---

## 邊界，再講一次

> **分析決策，不分析人格。
> 推論規範，不揣測動機。**

整篇若只記一句，記這句。

---

## 相關

- [`solo-mode.md`](solo-mode.md) — 在自己的專案裡建 doctrine
- [`team-mode.md`](team-mode.md) — 團隊共享的 doctrine
- [`six-layer-model.md`](six-layer-model.md) — 六層定義（推論條目升格時有用）
- [`failure-memory.md`](failure-memory.md) — failure-memory 寫法（archaeology candidate 可以升格）
- [`taste-examples.md`](taste-examples.md) — taste example 寫法（同上）
- 英文版：[`archaeology-mode.md`](archaeology-mode.md)
