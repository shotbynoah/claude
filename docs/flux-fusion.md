# FLUX FUSION — the Multi-Model Orchestration System (v2)

**What it is:** a portable, $0 orchestration system that turns several different LLMs into ONE system that produces a measurably better, lower-hallucination answer than any single model — by making them *complement* each other instead of competing. Drop it into any workspace, name your models, and run the flow. This is the upgraded v2: it now has **two axes** (breadth + depth), an **external-evidence fact-check**, a **learning loop that gets smarter every run**, and a **measured quality floor** so a merge can never make the answer worse.

**Why it beats one model:** different labs trained on different data make *different* mistakes. When models draft independently, cross-examine through *distinct lenses*, and a judge keeps only what survives — fabrications get caught (different architectures rarely hallucinate the *same* thing), gaps get filled, weak parts get rewritten. The lift is largest on **hard, open-ended, high-stakes** work and near-zero on trivial tasks — so a planner sends easy tasks solo and saves the heavy machinery for where it pays.

---

## 0. The router picks ONE of three modes per task

| Mode | When | What runs |
|---|---|---|
| **SOLO** | simple / tactical / short | one best-fit model, one shot (fast, cheap) |
| **PANEL** (breadth) | hard / multi-perspective | many models draft in parallel → cross-verify → synthesize → judge |
| **TRINITY** (depth) | hard *multi-step* (long reasoning, algorithms, gnarly debugging) | one Thinker→Worker→Verifier loop that refines until a verifier accepts |

A fast model decides mode per request. Breadth explores many angles at once; depth iterates one answer until it's verified. Most cost is saved by routing correctly.

---

## 1. The roster — each model owns ONE job (no overlap = complement)

Name your models. Pick from *different labs* — diversity is the engine. Route by **benchmarked strength**, never one model for everything.

| Seat | Use a model that's… | Owns this lens | Best for |
|---|---|---|---|
| **CORRECTNESS** | precise / agentic / tool-strong | "is this right, will it run, are the steps sound" | code, tool-use, factual rigor |
| **COMPLETENESS** | broad, low-hallucination | "what's missing, every case covered, nothing invented" | coverage, reasoning, grounded work |
| **CLARITY** | fast, clean, well-structured | "is this clear, shippable, well-organized" | writing, structure, agent steps |
| **RISK** | a sharp algorithmic/analytical reasoner | "how does it fail, edge cases, the downside" | red-teaming, math, hard algorithms |
| **JUDGE** | your single strongest, most-careful model | final authority: synthesize, fact-check, write the final | high-stakes only (held in reserve) |

> Two hard rules that drive the quality: **(1) the JUDGE never drafts** — held back so it evaluates with fresh eyes. **(2) A model that's elite at *generating* but weak at *reviewing* (e.g. a competitive-code specialist that false-positives on review) may DRAFT but must NEVER synthesize or verify** — the merge goes to your most reliable, best-presenting model.

---

## 2. The pipeline — copy-paste prompts

### STAGE 1 — PLAN (route in real time)
```
You are a routing planner. For the TASK, decide:
- mode: "solo" (simple) | "panel" (hard/multi-perspective) | "trinity" (hard multi-step needing iterative depth)
- seats: which 2-4 of CORRECTNESS / COMPLETENESS / CLARITY / RISK the task needs (panel mode)
- stakes: "routine" or "high_end" (flagship / customer-facing / ships to production)
- grounding: does a correct answer depend on external facts to look up? (true/false)
Pick the most COMPLEMENTARY team — models that each add a distinct strength, not duplicates.
Output JSON: {"mode":"...","seats":[...],"stakes":"...","grounding":bool,"reason":"..."}
TASK: <task>
```

### STAGE 2 — DRAFT (independent, parallel, strength-aware)
Send the SAME task to each seat independently (they must NOT see each other yet). Tell each model its edge:
```
You are one member of an elite multi-model panel. Your benchmarked edge: <that seat's strength>.
Produce YOUR strongest, complete answer. The others answer the same task and you'll cross-examine each
other, so make this defensible. NEVER invent specifics (numbers, names, URLs, citations, APIs) — if you
don't know, say so; abstaining beats fabricating.
TASK: <task>
```

### STAGE 3 — VERIFY (each model, its own lens, span-level)
```
You are an ADVERSARIAL reviewer through the <SEAT> lens ONLY. For each problem visible through THIS lens,
output one line: [SEVERITY high|med|low] the specific issue -> the single best fix. Flag EVERY unsupported
or likely-fabricated specific explicitly as [UNSUPPORTED]. Report every issue, even low-severity; no praise.
TASK: <task>
DRAFTS: <all drafts>
```

### STAGE 4 — SYNTHESIZE (your reliable, best-presenting model — never the weak-at-merge one)
```
You are the synthesizer. Merge the strongest material from ALL drafts and fix every VALID issue from the
lens-critiques. DROP any claim flagged [UNSUPPORTED] unless the task/context supports it. Resolve conflicts
toward the more correct option, preferring the draft from the model whose strength matches this task. Keep
every piece of real substance. Output ONLY the merged answer.
```

### STAGE 4.5 — EVIDENCE CHECK (factual tasks only — the anti-hallucination upgrade)
This is the one check cross-model agreement *cannot* give you: catch a fact that all your models are confidently wrong about. Retrieve real evidence (your docs / a search / a vector store), then:
```
You are a strict fact-checker. Given EVIDENCE and an ANSWER, extract the answer's checkable specific claims
and verdict EACH: "supported" only if directly entailed by the evidence; "unsupported" if it contradicts or
is a checkable specific absent from it; "unverifiable" if the evidence is silent (when in doubt, unverifiable).
Output JSON: {"claims":[{"claim":"...","verdict":"..."}]}
EVIDENCE: <retrieved sources>   ANSWER: <stage 4 output>
```
Then re-run the synthesizer once: *"remove or hedge ONLY these unsupported claims, change nothing else."* **Skip this entirely if you have no real evidence** — never delete a claim on thin evidence. Count the unsupported claims — that's your *measured* hallucination number.

### STAGE 5 — JUDGE (your strongest model, only on hard/divergent/high-stakes)
Run the judge when stakes are high OR the drafts **disagree** (a strong difficulty signal — measure overlap between drafts; low overlap = escalate). On easy, agreed, routine work, **skip it** and ship the synthesis (save your expensive model).
```
You are the final judge — the council's last authority and strongest single reasoner. Work through A–E
internally, output ONLY the final answer:
A) CORRECTNESS: verify the task is fully/correctly solved; for code/math mentally execute the critical path.
B) CONSENSUS vs CONFLICT: agreement = higher confidence; resolve conflicts toward the most defensible option.
C) HALLUCINATION SWEEP (span-level): check every number, name, date, citation, URL; remove/qualify anything
   unsupported or not derivable from the task/evidence.
D) COMPLETENESS + BLIND SPOTS: add what the panel missed.
E) FLOOR: your final MUST be at least as strong as the best single expert would produce alone — the panel
   may only ADD, never subtract.
TASK: <task>   CANDIDATE: <stage 4/4.5 output>
```

### TRINITY (depth mode) — the iterative alternative to the panel
For hard multi-step work, instead of breadth, loop three roles until verified:
```
THINKER: decompose the task into the key steps + what the solution MUST get right (plan only, don't solve).
WORKER:  using the plan + any verifier feedback, produce/improve the full solution.
VERIFIER: evaluate vs the task + plan. Reply "ACCEPT" if it's correct, complete, top-tier — else "REVISE"
          + the specific fixes. Loop WORKER↔VERIFIER until ACCEPT or a turn budget (e.g. 3). Carry the full
          transcript each turn. Use a DIFFERENT model as verifier than the worker (diversity).
```

---

## 3. The two upgrades that make v2 compound

**A measured floor (a merge can't make it worse).** Score the final answer in the same blind batch as the raw drafts. If the merged final scored materially *below* the best raw draft, the merge regressed it — revert to that draft. A free safety net against the known failure where aggregation corrupts a correct draft.

**A learning loop that gets smarter every run.** After each panel, have a *neutral* model (not one of the drafters — no self-scoring) score the drafts, and record which model won for that task-kind. Route future tasks of that kind toward the proven winner, while still occasionally sampling the others (so an improved model gets re-discovered). **And distill a one-line lesson on every failed run** ("the recurring mistake + the fix"), then inject those known failure modes into future prompts — so the system stops *repeating* mistakes, not just re-picking models. This is the part whose value grows with every cycle.

---

## 4. Routing — send each work-type to its strength
- **Repo / real-world code** (features, refactor, integration) → your best *agentic* coder leads; others verify. (A competitive-code specialist is NOT the best here — it's weak at real-world/repo code and at review.)
- **Algorithmic / competitive code, math** → your competitive-code/math specialist drafts; a reliable model synthesizes the write-up.
- **Strategy / writing / analysis** → your broad low-hallucination model leads; the sharp reasoner critiques.
- **Cheap / mechanical** (classify, summarize, extract) → skip the whole thing; one cheap model, one shot.

## 5. Cost discipline (why it's affordable)
- The PLAN call is cheap; easy tasks exit at `solo` → you rarely pay for the panel on trivial work.
- Mechanical calls go to the cheapest model. The expensive judge fires only on high-stakes OR genuine draft disagreement — and *skips* on easy consensus, a net saving.
- A hard per-model wall-timeout means a slow/cold model drops from the panel instead of stalling it.

## 6. Why it works (the mechanism, not magic)
1. **Independent drafts** → diverse candidates, no anchoring.
2. **Lens-specific critique** → each model's strength becomes the others' error-detector.
3. **Synthesis** → keeps only what survives every lens.
4. **External-evidence check** → catches *correlated* hallucinations cross-model agreement can't (the one verification axis intrinsic methods miss).
5. **Judge + hallucination sweep** → strips unsupported specifics.
6. **Measured floor + learning loop** → the merge can't regress, and the router gets sharper every cycle.

**Honest note:** the lift is real but *task-dependent* — big on hard/open-ended work, ~zero on trivial tasks (which is why the planner sends those solo). Don't take a number on faith — measure it on YOUR tasks with a blind A/B: generate one answer solo, one with the full flow, and have a *different* model score both 0-10 without knowing which is which. Trust the number you measure.

---

## How this compares to renting an orchestrator (e.g. Sakana Fugu)

In June 2026, Sakana AI shipped **Fugu / Fugu Ultra** — a multi-model *orchestrator-as-a-product*. Its own published benchmarks make the case for this entire approach: **Fugu Ultra scores ~73.7 on SWE-bench Pro — ahead of the strongest single frontier models** (e.g. Claude Opus 4.8 at 69.2), and matches the top closed models on hard engineering/reasoning. In other words, **Fugu's results prove that orchestrating many models beats even the best single model** — better than relying on any one flagship alone.

FLUX FUSION is built on that exact insight — and then goes further on the things that actually matter when you're *building* with it:

| | Sakana Fugu (rented) | **FLUX FUSION (this)** |
|---|---|---|
| **Cost** | metered API (~$5/$30 per 1M; up to ~$10/heavy message) or a monthly plan | **$0 marginal** — runs on the model memberships/plans you already have |
| **Control** | hidden, **non-auditable** routing; a **fixed pool you can't exclude models from** | **you see + control every model, lens, and route** — and can swap any model out |
| **What you get** | a black box you send a prompt to | a **system you own and can modify** — every stage prompt is yours |
| **Depth** | one orchestration mode | **two axes: panel (breadth) + trinity (depth, refine-until-verified)** |
| **Hallucinations** | internal only | **+ an external-evidence fact-check** that catches the *correlated* hallucinations cross-model agreement can't |
| **Gets smarter** | fixed | a **learning loop** that adapts routing to *your* tasks every run |
| **Data** | your prompts leave to a third party | **stays in your stack** — route nothing sensitive to models you don't trust |

**The honest version:** Fugu's headline numbers are Sakana's own (a launch benchmark), and we're not claiming a head-to-head benchmark win — that's not the point. The point is that **the orchestration approach Fugu validated is something you can own outright with FLUX FUSION**: same core idea (a pool of models beating any single one), but **$0, fully auditable, in your control, extensible, and with depth + evidence-checking + self-learning that a rented black box doesn't hand you.** Fugu proved the ceiling is higher than any one model — FLUX FUSION lets you reach for it on your own terms.

---
*FLUX FUSION v2 — many models, one answer, measurably better and lower-hallucination. Build it once; run it on every high-stakes output. Works with any models from any vendors.*
