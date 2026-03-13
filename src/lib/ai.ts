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
