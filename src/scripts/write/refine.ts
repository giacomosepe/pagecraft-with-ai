/**
 * refine.ts
 * -----------------------------------------------------------------
 * Handles the "Refine" flow on the AI Output Card.
 * -----------------------------------------------------------------
 * Flow:
 *   1. AI has already generated content (output card is visible)
 *   2. User types refinement instructions in the textarea
 *   3. Clicks "↺ Refine" — spinner shows while waiting
 *   4. Claude rewrites the existing AI output based on instructions
 *   5. Output card updates with new content
 *   6. Refinement textarea resets
 * -----------------------------------------------------------------
 * Difference from Improve:
 *   - Refine works on AI-generated content (aiGenerated)
 *   - Improve works on the user's own written text (userInput)
 * -----------------------------------------------------------------
 * API call goes to: src/pages/api/generate.ts (mode: "refine")
 * Spinner helpers from: helpers.ts
 * -----------------------------------------------------------------
 */

import { sessionData, currentStepIndex } from "./state";
import { callGenerate } from "./helpers";

export function initRefine() {
  document.getElementById("refine-btn")?.addEventListener("click", async () => {
    const instructions = (
      document.getElementById("refinement-input") as HTMLTextAreaElement
    ).value.trim();
    if (!instructions) {
      alert("Tell AI what to refine first.");
      return;
    }

    // Simple button spinner — refine button has no separate label/spinner elements
    const btn = document.getElementById("refine-btn") as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "Refining...";

    try {
      const result = await callGenerate({
        mode: "refine",
        // Passes the existing AI output as the base to refine from
        aiOutput: sessionData.steps[currentStepIndex].aiGenerated,
        instructions,
        tone: sessionData.tone,
        audience: sessionData.audience,
        language: sessionData.language,
      });

      sessionData.steps[currentStepIndex].aiGenerated = result;
      document.getElementById("ai-output")!.textContent = result;
      (
        document.getElementById("refinement-input") as HTMLTextAreaElement
      ).value = "";
    } catch (err: any) {
      alert(err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "↺ Refine";
    }
  });
}
