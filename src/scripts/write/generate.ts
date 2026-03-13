/**
 * generate.ts
 * -----------------------------------------------------------------
 * Handles the "Generate with AI" flow.
 * -----------------------------------------------------------------
 * Flow:
 *   1. User clicks "Generate with AI" button
 *   2. GenerateModal opens (src/components/write/GenerateModal.astro)
 *      — pre-filled with user's input (read-only preview)
 *      — pre-filled with the step's default prompt (editable)
 *   3. User reviews/edits prompt and clicks "Send to Claude"
 *   4. Spinner shows while waiting for API response
 *   5. Result appears in the AI Output Card
 *   6. Modal closes
 * -----------------------------------------------------------------
 * API call goes to: src/pages/api/generate.ts (mode: "generate")
 * Modal HTML lives in: src/components/write/GenerateModal.astro
 * Spinner helpers from: helpers.ts
 * -----------------------------------------------------------------
 */

import { sessionData, currentStepIndex } from "./state";
import { callGenerate, spinnerOn, spinnerOff } from "./helpers";

export function initGenerate() {
  // Open modal when "Generate with AI" is clicked
  document.getElementById("generate-btn")?.addEventListener("click", () => {
    const userInput = (
      document.getElementById("user-input") as HTMLTextAreaElement
    ).value.trim();
    if (!userInput) {
      alert("Please fill in your input first.");
      return;
    }

    // Pre-fill modal with current values
    document.getElementById("modal-user-input-preview")!.textContent =
      userInput;
    (
      document.getElementById("modal-prompt-text") as HTMLTextAreaElement
    ).value = (
      document.getElementById("prompt-text") as HTMLTextAreaElement
    ).value;

    document.getElementById("generate-modal")!.classList.remove("hidden");
  });

  // Close modal — X button
  document
    .getElementById("generate-modal-close")
    ?.addEventListener("click", closeModal);

  // Close modal — Cancel button
  document
    .getElementById("generate-modal-cancel")
    ?.addEventListener("click", closeModal);

  // Close modal — clicking the backdrop
  document.getElementById("generate-modal")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("generate-modal")) closeModal();
  });

  // Send to Claude
  document
    .getElementById("generate-modal-send")
    ?.addEventListener("click", async () => {
      const userInput = (
        document.getElementById("user-input") as HTMLTextAreaElement
      ).value.trim();
      const prompt = (
        document.getElementById("modal-prompt-text") as HTMLTextAreaElement
      ).value;

      spinnerOn(
        "generate-modal-send",
        "generate-modal-send-label",
        "generate-modal-spinner",
        "Generating...",
      );

      try {
        const result = await callGenerate({
          mode: "generate",
          userInput,
          prompt,
          tone: sessionData.tone,
          audience: sessionData.audience,
          language: sessionData.language,
        });

        sessionData.steps[currentStepIndex].aiGenerated = result;
        document.getElementById("ai-output")!.textContent = result;
        document.getElementById("output-card")!.classList.remove("hidden");
        closeModal();
      } catch (err: any) {
        alert(err.message);
      } finally {
        spinnerOff(
          "generate-modal-send",
          "generate-modal-send-label",
          "generate-modal-spinner",
          "✦ Send to Claude",
        );
      }
    });
}

function closeModal() {
  document.getElementById("generate-modal")!.classList.add("hidden");
}
