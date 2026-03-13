/**
 * helpers.ts
 * -----------------------------------------------------------------
 * Shared utility functions used across multiple write modules.
 * -----------------------------------------------------------------
 * Contents:
 *   - callGenerate()   — sends request to /api/generate
 *   - spinnerOn()      — disables button + shows loading state
 *   - spinnerOff()     — re-enables button + restores original text
 * -----------------------------------------------------------------
 * Used by: generate.ts, improve.ts, refine.ts
 * -----------------------------------------------------------------
 */

// ── AI CALL ──
// Sends payload to src/pages/api/generate.ts
// Returns the generated text string or throws an error
export async function callGenerate(payload: {
  mode: "generate" | "improve" | "refine";
  userInput?: string;
  prompt?: string;
  tone: string;
  audience: string;
  language: string;
  aiOutput?: string;
  instructions?: string;
}): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "Generation failed");
  }
  return data.result;
}

// ── SPINNER ON ──
// Disables a button and shows loading text + spinner icon
export function spinnerOn(
  btnId: string,
  labelId: string,
  spinnerId: string,
  loadingText: string,
) {
  const btn = document.getElementById(btnId) as HTMLButtonElement;
  const label = document.getElementById(labelId)!;
  const spinner = document.getElementById(spinnerId)!;
  btn.disabled = true;
  label.textContent = loadingText;
  spinner.classList.remove("hidden");
}

// ── SPINNER OFF ──
// Re-enables a button and restores its original label
export function spinnerOff(
  btnId: string,
  labelId: string,
  spinnerId: string,
  originalText: string,
) {
  const btn = document.getElementById(btnId) as HTMLButtonElement;
  const label = document.getElementById(labelId)!;
  const spinner = document.getElementById(spinnerId)!;
  btn.disabled = false;
  label.textContent = originalText;
  spinner.classList.add("hidden");
}
