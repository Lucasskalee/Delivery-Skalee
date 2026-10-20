# Rules: Parallel Subagent-Driven Development (Google Antigravity)

## Problem

The base subagent-driven-development pattern dispatches one implementer at a
time. That default is safe — but slow when a plan contains genuinely
independent tasks. The naive fix, dispatching every task in parallel via `invoke_subagent`, is
risky when ownership and resource use are unclear:

- Two agents can edit the same file concurrently, and one's write silently
  clobbers the other's.
- Two agents can race each other to `git commit`, interleaving unrelated
  changes into a single commit or committing against a stale HEAD.
- Builds and tests can collide through shared output directories, ports,
  databases, or services even when source files differ.

This rule reduces known coordination risks; it does not guarantee that
parallel execution is as safe as serial execution.

## Why this override is safe

The following ownership rules address known failure modes:

- **File collisions** are prevented by only ever forming a wave from tasks
  whose file sets are fully disjoint. If two tasks might touch the same
  file, they never run in the same wave.
- **Commit races** are prevented by removing self-committing from
  implementers entirely. Implementers leave their changes in the working
  tree; when commits are authorized, the controller commits every task's
  changes itself, one at a time, after the wave finishes.
- **Resource collisions** require independent mutable resources for each task,
  including checks, or serialization of the affected work. Worktrees alone
  do not isolate ports, test databases, or external services.

## Task tagging

At plan time, every task gets three fields:

- **`Files:`** — the exact file paths or globs the task will create or
  modify.
- **`Resources:`** — ports, build directories, test databases, and services
  used by the task or its checks, with their isolation or `none`.
- **`Depends-on:`** — the IDs of tasks whose output this task consumes, or
  `none`.

If any field is missing, or there's genuine uncertainty about what a
task touches or depends on, treat the task as depending on everything
before it. This is the fail-safe: an under-specified task silently
degrades to serial execution instead of risking a false-parallel bug.
Never guess a narrower scope than you actually know.

## Wave formation rule

Two tasks belong in the same wave only if **all** hold:

1. Neither task is in the other's `Depends-on` chain, even transitively.
2. Their `Files` sets are fully disjoint.
3. Their mutable resources are independent or explicitly isolated.

If any condition fails or is uncertain, the later or colliding task moves to a
subsequent wave.

## Per-wave execution loop in Google Antigravity

For each wave, in order:

1. Write one task brief per task with files, dependencies, resources,
   acceptance criteria, and checks.
2. Dispatch every implementer in the wave in a single `invoke_subagent` call (`Model: "inherit"` unless the user explicitly requests another tier).
3. Implementers do **not** commit. Each one leaves its changes in the
   working tree and reports back which files it touched.
4. When authorized, the controller commits per task, in wave order — capturing the current
   HEAD fresh immediately before each commit, never a stale or hardcoded
   ref.
5. Dispatch that wave's task reviewers (`TypeName: "research"` for read-only inspection) against exact base/head commits plus
   connected callers, contracts, and tests. Without commit authorization, use
   recorded working-tree snapshots. Reviewers remain read-only; run them together
   only when their checks use independent mutable resources.
6. Make exactly one controller-owned log or ledger write for the whole
   wave, not one per task.

## Worker failure and recovery

The controller retains the authorized scope when a worker fails. Confirm via `manage_subagents` (`Action: "list"`) that the worker has stopped before taking over or reassigning its files. Inspect partial changes and resume from a verified state. While ownership is uncertain, continue only independent work on other files. Retry only with new evidence, within permissions and cost/time/attempt limits; otherwise report the blocker and the condition for resuming.

