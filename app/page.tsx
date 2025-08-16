"use client";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setVideo(null);
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "failed");
      setVideo(data.videoUrl);
      setRecent((prev) => [data.videoUrl, ...prev].slice(0, 6));
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!video) return;
    await navigator.clipboard.writeText(video);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Prompt → Video</h1>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="A golden retriever surfing at sunset"
            className="flex-1 rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="rounded-md bg-black text-white px-4 py-2 disabled:opacity-60"
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        <div className="mt-6">
          {loading && <div className="h-64 w-full rounded-lg bg-slate-200 animate-pulse" />}
          {video && !loading && (
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <video key={video} src={video} controls autoPlay muted loop className="w-full" />
              <div className="flex gap-2 p-3 bg-slate-50 border-t border-slate-200">
                <a href={video} download className="px-3 py-1.5 rounded-md text-sm bg-black text-white">
                  Download
                </a>
                <button onClick={copy} className="px-3 py-1.5 rounded-md text-sm border border-slate-300">
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          )}
        </div>

        {recent.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-slate-600 mb-2">Recent</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {recent.map((u, i) => (
                <video key={u + i} src={u} muted loop controls className="w-full rounded-md border border-slate-200" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
