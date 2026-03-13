import type { APIRoute } from "astro";
import { connectDB } from "../../../lib/db";
import { UserProfile } from "../../../lib/models";

export const GET: APIRoute = async ({ locals }) => {
  const { userId } = locals.auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  const profile = await UserProfile.findOne({ userId }).lean();

  return new Response(JSON.stringify(profile || {}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
