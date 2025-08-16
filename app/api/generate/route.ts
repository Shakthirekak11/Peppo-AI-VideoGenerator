import { NextResponse } from "next/server";
import Replicate from "replicate";

const token = process.env.REPLICATE_API_TOKEN ?? "";
const rep = new Replicate({ auth: token });

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!token) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const body = await req.json();
    const text = String(body?.prompt ?? "").trim();
    const secs = Math.min(Math.max(Number(body?.duration ?? 6), 5), 10);

    if (!text) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // wait: true makes Replicate return only after job finishes
    const job = await rep.predictions.create({
      model: "minimax/video-01",
      input: { prompt: text, duration: secs },
      wait: true
    });

    let url: string | null = null;
    const out = job.output;

    if (Array.isArray(out)) url = out.find((x) => typeof x === "string") ?? null;
    else if (typeof out === "string") url = out;
    else if (out && typeof out === "object" && "video" in (out as any)) {
      const v = (out as any).video;
      url = Array.isArray(v) ? v[0] : v || null;
    }

    if (!url) {
      return NextResponse.json({ error: "No video URL" }, { status: 502 });
    }

    return NextResponse.json({ videoUrl: url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
