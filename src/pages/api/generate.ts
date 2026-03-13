import type { APIRoute } from "astro";
import { connectDB } from "../../lib/db";
import { UserProfile } from "../../lib/models";

export const POST: APIRoute = async ({ locals, request }) => {
  const { userId } = locals.auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Get user's Claude API key from MongoDB
  await connectDB();
  const profile = await UserProfile.findOne({ userId }).lean();
  const claudeKey = profile?.apiKeys?.claude;

  if (!claudeKey) {
    return new Response(
      JSON.stringify({
        error:
          "No Claude API key found. Please add your key in Account → Settings.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Parse request body
  const body = await request.json();
  const {
    mode, // "generate" | "improve" | "refine"
    userInput, // what the user wrote
    prompt, // the system/step prompt (editable)
    tone,
    audience,
    language,
    aiOutput, // existing AI output (for refine mode)
    instructions, // improvement instructions (for improve/refine)
  } = body;

  // Build the message based on mode
  let userMessage = "";

  if (mode === "generate") {
    userMessage = `
You are helping a writer craft a piece of content using the ${tone} tone, for this audience: ${audience}.
${language === "it" ? "Write in Italian." : "Write in English."}

Follow this instruction:
${prompt}

The writer's input for this section:
${userInput}

Write the content for this section now. Be direct, no preamble.
        `.trim();
  } else if (mode === "improve") {
    userMessage = `
You are helping a writer improve a section of their content.
Tone: ${tone}. Audience: ${audience}.
${language === "it" ? "Write in Italian." : "Write in English."}

Original text written by the user:
${userInput}

Instructions for improvement:
${instructions}

Rewrite and improve the text following those instructions. Be direct, no preamble.
        `.trim();
  } else if (mode === "refine") {
    userMessage = `
You are helping a writer refine AI-generated content.
Tone: ${tone}. Audience: ${audience}.
${language === "it" ? "Write in Italian." : "Write in English."}

Previously generated content:
${aiOutput}

Refinement instructions:
${instructions}

Rewrite the content applying those refinements. Be direct, no preamble.
        `.trim();
  } else {
    return new Response(JSON.stringify({ error: "Invalid mode" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Call Anthropic API
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(
        JSON.stringify({
          error: err?.error?.message || "Claude API error",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    return new Response(JSON.stringify({ result: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to reach Claude API" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
