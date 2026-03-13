/**
 * improve.ts
 * -----------------------------------------------------------------
 * Handles the "Improve with AI" flow.
 * -----------------------------------------------------------------
 * Flow:
 *   1. User writes something in the main textarea
 *   2. User clicks "Improve with AI"
 *   3. ImproveBox opens (src/components/write/ImproveBox.astro)
 *      — top field pre-filled with user's own text (editable)
 *      — bottom field for improvement instructions (empty)
 *   4. User edits their text and/or adds instructions
 *   5. Clicks "Improve" — spinner shows while waiting
 *   6. Result appears in the AI Output Card
 *   7. ImproveBox closes and resets
 * -----------------------------------------------------------------
 * API call goes to: src/pages/api/generate.ts (mode: "improve")
 * Box HTML lives in: src/components/write/ImproveBox.astro
 * Spinner helpers from: helpers.ts
 * -----------------------------------------------------------------
 */

import { sessionData, currentStepIndex } from "./state";
import { callGenerate, spinnerOn, spinnerOff } from "./helpers";

export function initImprove() {
  // Open improve box — pre-fill with user's current text
  document.getElementById("improve-btn")?.addEventListener("click", () => {
    const userInput = (
      document.getElementById("user-input") as HTMLTextAreaElement
    ).value.trim();
    if (!userInput) {
      alert("Write something first before improving.");
      return;
    }

    // Pre-fill improve-input with the user's own text so they can edit it
    (document.getElementById("improve-input") as HTMLTextAreaElement).value =
      userInput;
    document.getElementById("improve-box")!.classList.remove("hidden");
    document.getElementById("improve-instructions")!.focus();
  });

  // Cancel — close and reset improve box
  document
    .getElementById("improve-cancel-btn")
    ?.addEventListener("click", closeImproveBox);

  // Confirm — send to Claude
  document
    .getElementById("improve-confirm-btn")
    ?.addEventListener("click", async () => {
      const userInput = (
        document.getElementById("improve-input") as HTMLTextAreaElement
      ).value.trim();
      const instructions = (
        document.getElementById("improve-instructions") as HTMLTextAreaElement
      ).value.trim();

      if (!instructions) {
        alert("Tell AI what to improve first.");
        return;
      }

      spinnerOn(
        "improve-confirm-btn",
        "improve-label",
        "improve-spinner",
        "Improving...",
      );

      try {
        const result = await callGenerate({
          mode: "improve",
          userInput,
          instructions,
          tone: sessionData.tone,
          audience: sessionData.audience,
          language: sessionData.language,
        });

        sessionData.steps[currentStepIndex].aiGenerated = result;
        document.getElementById("ai-output")!.textContent = result;
        document.getElementById("output-card")!.classList.remove("hidden");
        closeImproveBox();
      } catch (err: any) {
        alert(err.message);
      } finally {
        spinnerOff(
          "improve-confirm-btn",
          "improve-label",
          "improve-spinner",
          "✦ Improve",
        );
      }
    });
}

function closeImproveBox() {
  document.getElementById("improve-box")!.classList.add("hidden");
  (document.getElementById("improve-input") as HTMLTextAreaElement).value = "";
  (
    document.getElementById("improve-instructions") as HTMLTextAreaElement
  ).value = "";
}
