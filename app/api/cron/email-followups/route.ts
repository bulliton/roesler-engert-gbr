import { NextResponse } from "next/server";
import { processEmailFollowUps } from "@/lib/leads/follow-ups";
import { getCronSecret } from "@/lib/resend/config";

export async function GET(request: Request) {
  const secret = getCronSecret();
  const auth = request.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processEmailFollowUps();
    return NextResponse.json({
      ok: true,
      sent: result.sent,
      errors: result.errors,
    });
  } catch (error) {
    console.error("Cron follow-up error:", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 },
    );
  }
}
