/**
 * index.ts
 * -----------------------------------------------------------------
 * Entry point for all write page client scripts.
 * This is the only file imported by write.astro.
 * -----------------------------------------------------------------
 * Load order matters:
 *   1. state.ts       — must be first, all others depend on it
 *   2. navigation.ts  — sets up step list and loadStep()
 *   3. generate.ts    — Generate modal
 *   4. improve.ts     — Improve box
 *   5. refine.ts      — Refine flow
 *   6. manual.ts      — Save, Skip, Approve
 *   7. export.ts      — Export .md and Copy
 * -----------------------------------------------------------------
 * Also handles the Setup Screen transition here because it needs
 * to write to sessionData (state.ts) AND call loadStep (navigation.ts)
 * making it the natural place where both are already imported.
 * -----------------------------------------------------------------
 * Imported by: src/pages/dashboard/write.astro
 *   <script src="../../scripts/write/index.ts"></script>
 * -----------------------------------------------------------------
 */

import { sessionData } from "./state";
import { initNavigation, loadStep } from "./navigation";
import { initGenerate } from "./generate";
import { initImprove } from "./improve";
import { initRefine } from "./refine";
import { initManual } from "./manual";
import { initExport } from "./export";

// ── SETUP SCREEN ──
// Collects title, audience, tone, language before writing begins.
// On Start: hides setup screen, shows write screen, loads first step.
document.getElementById("start-btn")?.addEventListener("click", () => {
  const audience = (
    document.getElementById("setup-audience") as HTMLInputElement
  ).value.trim();
  const tone = (document.getElementById("setup-tone") as HTMLSelectElement)
    .value;

  if (!audience || !tone) {
    alert("Please fill in audience and tone before starting.");
    return;
  }

  // Write collected values into shared session state
  sessionData.title =
    (document.getElementById("setup-title") as HTMLInputElement).value.trim() ||
    "Untitled";
  sessionData.audience = audience;
  sessionData.tone = tone;
  sessionData.language = (
    document.getElementById("setup-language") as HTMLSelectElement
  ).value;

  // Transition from setup screen to write screen
  document.getElementById("setup-screen")!.classList.add("hidden");
  document.getElementById("write-screen")!.classList.remove("hidden");

  // Load the first step
  loadStep(0);
});

// ── INITIALISE ALL MODULES ──
initNavigation();
initGenerate();
initImprove();
initRefine();
initManual();
initExport();
