/**
 * manual.ts
 * -----------------------------------------------------------------
 * Handles all manual (non-AI) step actions.
 * -----------------------------------------------------------------
 * Contents:
 *   - Save        — marks step as approved with user's own text
 *   - Skip        — marks step as skipped, moves to next
 *   - Approve & Next — approves AI-generated content, moves to next
 *   - checkComplete() — checks if all steps are done, shows complete screen
 * -----------------------------------------------------------------
 * Note on Save vs Approve:
 *   - Save: user wrote the content themselves (no AI)
 *   - Approve: user accepted AI-generated content
 *   Both mark the step as approved and advance to the next step.
 * -----------------------------------------------------------------
 * Imports navigation from: navigation.ts
 * Updates state in: state.ts
 * -----------------------------------------------------------------
 */

import { steps, sessionData, currentStepIndex } from "./state";
import { loadStep, updateStepList } from "./navigation";

export function initManual() {
  // ── SAVE ──
  // User wrote content themselves — mark approved and move on
  document.getElementById("save-btn")?.addEventListener("click", () => {
    const userInput = (
      document.getElementById("user-input") as HTMLTextAreaElement
    ).value.trim();
    if (!userInput) {
      alert("Nothing to save yet.");
      return;
    }

    sessionData.steps[currentStepIndex].userInput = userInput;
    sessionData.steps[currentStepIndex].approved = true;
    sessionData.steps[currentStepIndex].skipped = false;
    updateStepList();

    if (currentStepIndex < steps.length - 1) {
      loadStep(currentStepIndex + 1);
    } else {
      checkComplete();
    }
  });

  // ── SKIP ──
  // User skips this step — marked with ✕ in step list
  document.getElementById("skip-btn")?.addEventListener("click", () => {
    sessionData.steps[currentStepIndex].skipped = true;
    sessionData.steps[currentStepIndex].approved = false;
    updateStepList();

    if (currentStepIndex < steps.length - 1) {
      loadStep(currentStepIndex + 1);
    } else {
      checkComplete();
    }
  });

  // ── APPROVE & NEXT ──
  // User accepts AI-generated content — mark approved and move on
  document.getElementById("approve-btn")?.addEventListener("click", () => {
    sessionData.steps[currentStepIndex].approved = true;
    sessionData.steps[currentStepIndex].skipped = false;
    updateStepList();

    if (currentStepIndex < steps.length - 1) {
      loadStep(currentStepIndex + 1);
    } else {
      checkComplete();
    }
  });
}

// ── CHECK COMPLETE ──
// Called after every save/skip/approve
// Shows complete screen only when every step is resolved
export function checkComplete() {
  const allDone = sessionData.steps.every((s: any) => s.approved || s.skipped);
  if (allDone) {
    document.getElementById("write-screen")!.classList.add("hidden");
    document.getElementById("complete-screen")!.classList.remove("hidden");
  }
}
