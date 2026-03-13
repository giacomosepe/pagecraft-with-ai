/**
 * export.ts
 * -----------------------------------------------------------------
 * Handles exporting the completed page.
 * -----------------------------------------------------------------
 * Contents:
 *   - Export as .md   — downloads a markdown file to the user's computer
 *   - Copy to clipboard — copies markdown text to clipboard
 * -----------------------------------------------------------------
 * Export logic:
 *   Loops through all steps in order.
 *   For each step, uses aiGenerated content if available,
 *   otherwise falls back to the user's own written input.
 *   Skipped steps with no content are ignored.
 * -----------------------------------------------------------------
 * Reads state from: state.ts
 * Shown on: complete screen (write.astro)
 * -----------------------------------------------------------------
 */

import { steps, sessionData } from "./state";

// Builds the full markdown string from all approved steps
function buildMarkdown(): string {
  let md = `# ${sessionData.title}\n\n`;
  sessionData.steps.forEach((s: any, i: number) => {
    const content = s.aiGenerated || s.userInput;
    if (content) {
      md += `## ${steps[i].title}\n\n${content}\n\n`;
    }
  });
  return md;
}

export function initExport() {
  // ── EXPORT AS .MD ──
  // Creates a markdown file and triggers a browser download
  document.getElementById("export-md-btn")?.addEventListener("click", () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sessionData.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // ── COPY TO CLIPBOARD ──
  // Copies markdown text and briefly changes button label to confirm
  document.getElementById("copy-btn")?.addEventListener("click", () => {
    const md = buildMarkdown();
    navigator.clipboard.writeText(md).then(() => {
      const btn = document.getElementById("copy-btn") as HTMLButtonElement;
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = original), 2000);
    });
  });
}
