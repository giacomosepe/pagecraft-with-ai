/**
 * state.ts
 * -----------------------------------------------------------------
 * Shared state for the write page.
 * All other modules import from here — never duplicate state.
 * -----------------------------------------------------------------
 * Data source: window.__WRITE_DATA__ injected by write.astro
 * via <script define:vars={{ frameworkData, promptsData }}>
 * -----------------------------------------------------------------
 */

const { frameworkData, promptsData } = (window as any).__WRITE_DATA__;

export const framework = JSON.parse(frameworkData);
export const promptsByStep: Record<number, string> = JSON.parse(promptsData);
export const steps = framework.steps.sort(
  (a: any, b: any) => a.order - b.order,
);

// Current active step index — updated by navigation.ts
export let currentStepIndex = 0;
export function setCurrentStepIndex(i: number) {
  currentStepIndex = i;
}

// Session data — everything the user has written in this session
export const sessionData = {
  title: "Untitled",
  audience: "",
  tone: "",
  language: "en",
  steps: steps.map((s: any) => ({
    order: s.order,
    userInput: "",
    aiGenerated: "",
    customPrompt: null as string | null,
    approved: false,
    skipped: false,
  })),
};
