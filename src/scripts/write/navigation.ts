/**
 * navigation.ts
 * -----------------------------------------------------------------
 * Handles step navigation for the write page.
 * -----------------------------------------------------------------
 * Responsibilities:
 *   - loadStep(index)     — loads a step into the right panel
 *   - updateStepList()    — updates left panel icons (✓ ✕ number)
 *   - Step list clicks    — clicking a step in the left panel
 *   - Progress bar        — updates width as user moves through steps
 *   - Prompt collapsible  — toggle + reset to default
 * -----------------------------------------------------------------
 * Imports state from: state.ts
 * Called by: index.ts, manual.ts, generate.ts, improve.ts, refine.ts
 * -----------------------------------------------------------------
 */

import {
  steps,
  promptsByStep,
  sessionData,
  currentStepIndex,
  setCurrentStepIndex,
} from "./state";

export function updateStepList() {
  const stepItems = document.querySelectorAll(".step-list-item");
  stepItems.forEach((item, i) => {
    const icon = item.querySelector(".step-icon") as HTMLElement;
    const isActive = i === currentStepIndex;
    const isApproved = sessionData.steps[i].approved;
    const isSkipped = sessionData.steps[i].skipped;

    (item as HTMLElement).style.color = "var(--color-muted)";
    (item as HTMLElement).style.background = "transparent";
    (item as HTMLElement).style.fontWeight = "normal";

    if (isApproved) {
      icon.textContent = "✓";
      icon.style.color = "var(--color-accent)";
    } else if (isSkipped) {
      icon.textContent = "✕";
      icon.style.color = "var(--color-error)";
    } else {
      icon.textContent = String(i + 1);
      icon.style.color = "";
    }

    if (isActive) {
      (item as HTMLElement).style.background = "var(--color-accent-light)";
      (item as HTMLElement).style.color = "var(--color-accent-text)";
      (item as HTMLElement).style.fontWeight = "500";
    }
  });
}

export function loadStep(index: number) {
  setCurrentStepIndex(index);
  const step = steps[index];

  // Progress bar
  const progress = (index / steps.length) * 100;
  (document.getElementById("progress-bar") as HTMLElement).style.width =
    progress + "%";
  document.getElementById("current-step-num")!.textContent = String(index + 1);

  // Step info in right panel
  document.getElementById("step-title")!.textContent = step.title;
  document.getElementById("step-title-top")!.textContent = step.title;
  document.getElementById("step-description")!.textContent = step.description;

  // Restore user input if they already typed something
  const userInputEl = document.getElementById(
    "user-input",
  ) as HTMLTextAreaElement;
  userInputEl.placeholder = step.placeholder || "Write your input here...";
  userInputEl.value = sessionData.steps[index].userInput || "";

  // Restore prompt (custom if edited, otherwise default)
  const defaultPrompt = promptsByStep[step.order] || "";
  (document.getElementById("prompt-text") as HTMLTextAreaElement).value =
    sessionData.steps[index].customPrompt || defaultPrompt;

  // Restore AI output if this step was already generated
  const outputCard = document.getElementById("output-card")!;
  if (sessionData.steps[index].aiGenerated) {
    document.getElementById("ai-output")!.textContent =
      sessionData.steps[index].aiGenerated;
    outputCard.classList.remove("hidden");
  } else {
    outputCard.classList.add("hidden");
  }

  // Reset improve box state
  document.getElementById("improve-box")!.classList.add("hidden");
  (document.getElementById("improve-input") as HTMLTextAreaElement).value = "";
  (
    document.getElementById("improve-instructions") as HTMLTextAreaElement
  ).value = "";

  updateStepList();
}

export function initNavigation() {
  // Step list — clicking any step jumps to it
  const stepItems = document.querySelectorAll(".step-list-item");
  stepItems.forEach((item, i) => {
    item.addEventListener("click", () => loadStep(i));
  });

  // Auto-save user input as they type
  document.getElementById("user-input")?.addEventListener("input", (e) => {
    sessionData.steps[currentStepIndex].userInput = (
      e.target as HTMLTextAreaElement
    ).value;
  });

  // Prompt collapsible toggle
  document.getElementById("toggle-prompt")?.addEventListener("click", () => {
    const container = document.getElementById("prompt-container")!;
    const chevron = document.getElementById("prompt-chevron")!;
    container.classList.toggle("hidden");
    chevron.classList.toggle("rotate-90");
  });

  // Reset prompt to step default
  document.getElementById("reset-prompt")?.addEventListener("click", () => {
    const step = steps[currentStepIndex];
    (document.getElementById("prompt-text") as HTMLTextAreaElement).value =
      promptsByStep[step.order] || "";
    sessionData.steps[currentStepIndex].customPrompt = null;
  });
}
