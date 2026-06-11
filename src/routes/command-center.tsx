import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, Send, Languages, Globe } from "lucide-react";
import { Shell, PageHeader } from "@/components/netra/Shell";

export const Route = createFileRoute("/command-center")({
  head: () => ({
    meta: [
      { title: "Multilingual Command Center · NETRA-RAIL" },
      { name: "description", content: "Voice and text command center supporting 230+ languages for operators across Indian Railways." },
    ],
  }),
  component: CommandCenter,
});

type Msg = { who: "user" | "bot"; text: string; lang: string };

const seedMsgs: Msg[] = [
  { who: "user", lang: "Hindi", text: "Section 7 mein kya slow zone active hai?" },
  { who: "bot", lang: "Hindi", text: "Haan, Section 7 Vadodara-Surat corridor mein slow zone active hai. Pillar C ne vibration anomaly detect ki hai. Drone inspection chal rahi hai. ETA: 12 minutes." },
  { who: "user", lang: "Tamil", text: "freight train status என்ன?" },
  { who: "bot", lang: "Tamil", text: "தற்போது 23 சரக்கு ரயில்கள் இயங்குகின்றன. JNPT–Tata Steel வழித்தடம் சீராக உள்ளது. அடுத்த அனுப்புதல்: 15:10." },
];

const responses = [
  "Acknowledged. Pillar B has re-prioritised the corridor. New ETA delta: -7 minutes.",
  "Maintenance Order #MR-44821 dispatched to the local crew. ETA on site: 18 minutes.",
  "Throughput on the Western DFC has stabilised at 94 trains/hr.",
  "Translating across 230 languages — your request was handled in your selected language.",
];

const langs = ["English", "हिन्दी", "தமிழ்", "বাংলা", "मराठी", "ગુજરાતી", "ਪੰਜਾਬੀ", "ଓଡ଼ିଆ", "తెలుగు", "ಕನ್ನಡ", "اردو"];

export function CommandCenter({ noShell = false }: { noShell?: boolean }) {
  const [lang, setLang] = useState("English");
  const [msgs, setMsgs] = useState<Msg[]>(seedMsgs);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [mic, setMic] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send() {
    if (!draft.trim()) return;
    const text = draft.trim();
    setMsgs((m) => [...m, { who: "user", lang, text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { who: "bot", lang, text: responses[Math.floor(Math.random() * responses.length)] }]);
      setTyping(false);
    }, 1400);
  }

  const content = (
    <>
      <PageHeader
        eyebrow="Command Center"
        title="Voice & Language Command Center"
        description="Operators in any of 230+ languages talk to NETRA-RAIL directly — text or voice — and receive replies in their native script."
        icon={<Globe className="w-6 h-6" />}
      />

      <section className="mx-auto max-w-5xl px-6 grid gap-5">
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-cream-bg">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">NETRA-RAIL · 230+ Languages</span>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-sm rounded-full border border-border bg-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {langs.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div ref={scrollRef} className="h-[480px] overflow-y-auto px-5 py-6 space-y-4 bg-white">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.who === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.who === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-cream-bg text-foreground rounded-bl-sm border border-border"}`}>
                  <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">{m.lang}</div>
                  {m.text}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-cream-bg border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider opacity-70 mr-2">NETRA-RAIL is responding</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-3 flex items-center gap-2 bg-white">
            <button
              onClick={() => setMic((x) => !x)}
              className={`relative w-10 h-10 rounded-full grid place-items-center border ${mic ? "bg-saffron text-saffron-foreground border-saffron" : "bg-white text-primary border-border"}`}
              aria-label="Toggle microphone"
            >
              <Mic className="w-4 h-4" />
              {mic ? <span className="absolute inset-0 rounded-full live-dot" style={{ background: "transparent" }} /> : null}
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={`Ask in ${lang}…`}
              className="flex-1 px-4 py-2 rounded-full border border-border bg-cream-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button onClick={send} className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Languages</div>
            <div className="text-2xl font-display font-bold">230+</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Indian Languages</div>
            <div className="text-2xl font-display font-bold">22</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Modalities</div>
            <div className="text-2xl font-display font-bold">Voice + Text</div>
          </div>
        </div>
      </section>
    </>
  );

  if (noShell) return content;
  return <Shell>{content}</Shell>;
}
