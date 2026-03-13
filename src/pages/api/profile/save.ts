import type { APIRoute } from "astro";
import { connectDB } from "../../../lib/db";
import { UserProfile } from "../../../lib/models";

export const POST: APIRoute = async ({ locals, request }) => {
  const { userId } = locals.auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();

  await connectDB();
  await UserProfile.findOneAndUpdate(
    { userId },
    {
      userId,
      apiKeys: {
        claude: body.claudeKey || null,
        openai: body.openaiKey || null,
      },
      preferences: {
        defaultTone: body.defaultTone || null,
        defaultLanguage: body.defaultLanguage || "en",
        defaultAudience: body.defaultAudience || null,
      },
      updatedAt: new Date(),
    },
    { upsert: true, new: true },
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
