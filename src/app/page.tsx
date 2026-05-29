"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { JudgeResult } from "@/types/debate";
import { JudgeMascot } from "@/components/JudgeMascot";

type MascotState = "idle" | "thinking" | "happy" | "confused";

const PHRASES: Record<MascotState, string[]> = {
  idle: [
    "Ready when you are!",
    "Got a transcript? Let's judge.",
    "What motion are we tackling today?",
    "I'm sharp and ready to call this round.",
    "Show me a good debate!",
  ],
  thinking: [
    "Hmm, let me weigh the clashes...",
    "Working through the extensions...",
    "Comparing the opening half to the closing half...",
    "Mapping the burdens... almost there.",
    "This is the fun part.",
  ],
  happy: [
    "Good job, all teams! Here's my call.",
    "Solid round! Let's break it down.",
    "Great engagement — let me explain my decision.",
    "Nice debate. Here's how it shook out.",
    "Done! Tab through the breakdown below.",
  ],
  confused: [
    "Oh no… something went sideways. Don't be sad — try again!",
    "Unfortunately the AI hit a snag. Refresh and retry?",
    "Hmm, that didn't work out. Have another go.",
    "Something tripped me up. One more try?",
  ],
};

function pickPhrase(state: MascotState, seed: number): string {
  const pool = PHRASES[state];
  return pool[seed % pool.length];
}

const SAMPLE_TRANSCRIPT = `Motion: This House Would Implement a Universal Basic Income, Set at the Poverty Line, in All Developed Economies

--- Opening Government (OG): LSE A ---

PM (Amara Okonkwo):
Thank you, Chair. We propose that all developed economies introduce a Universal Basic Income — a regular, unconditional cash payment to every adult citizen, set at the official poverty line of each jurisdiction, replacing the most paternalistic and conditional elements of existing welfare while leaving in place programmes that address specific needs like disability support.

Our case rests on two principal arguments. First, structural change in labour markets. Automation, precarious gig work, and the decline of stable full-time employment have eroded the post-war assumption that everyone can earn enough to survive through wages alone. UBI rebuilds the floor that wages once provided. It frees workers to refuse exploitative jobs, to retrain, to care for children or elderly parents, to start businesses — the things our current system implicitly punishes by tethering survival to whatever job you can grab.

Second, the dignity argument. The existing welfare system is built on suspicion. To get help, you must prove your poverty, accept surveillance, attend assessments, perform deservingness. This produces an enormous bureaucracy that exists not to help people but to police them — and it leaves the working poor with nothing because they earn just above the means-tested cut-off. UBI replaces a system that humiliates with one that trusts. Every adult gets the same payment, no questions asked. That changes the relationship between citizens and the state from suspicion to solidarity.

The opposition will say this is unaffordable, or that it kills work incentives. I will preempt: the cost is recoverable from existing welfare bureaucracy, from progressive taxation, and from the gains of liberating people to do more productive work. And the evidence from pilots — Finland, Kenya, Stockton California — shows that recipients do not stop working. They make better choices about work.

--- Opening Opposition (OO): Oxford A ---

LO (Daniel Foster):
Thank you. The PM has painted UBI as compassionate trust. We will show it is a regressive failure that does less for the poor than the system it replaces, while quietly subsidising the comfortable.

First, the targeting problem. The PM admitted UBI replaces "the most paternalistic" parts of welfare. But the paternalism is not the bug — it is the feature. Means-testing exists because resources are finite, and we want more help going to those who need it most. A flat payment at the poverty line gives the same cash to a billionaire's adult son as to a single mother. To fund that giveaway, you must either raise taxes massively or — far more likely in practice — cut the targeted programmes that actually move people out of poverty: housing benefits, childcare subsidies, healthcare for chronic conditions. The PM's "UBI plus targeted programmes" is fantasy maths. In any real fiscal scenario, UBI cannibalises the programmes that were doing the heavy lifting.

Second, the work disincentive matters more than the PM admits. The pilots she cites were small, time-limited, and crucially funded externally — participants knew the money would stop. A permanent universal payment changes incentives at the margin. We are not saying everyone quits work. We are saying *some* people, in *some* jobs, at *some* margins, reduce hours or exit. Care work, low-wage essential work — these are the jobs most likely to lose workers. That is not liberation; that is a wage subsidy to the employers who get to keep paying badly while the state covers the gap.

DLO (Priya Sharma):
Daniel has shown UBI is regressive and weakens labour markets. I want to address the dignity argument directly, because it is the government's emotional centrepiece.

The dignity argument inverts the actual mechanism of dignity. Dignity for the working poor does not come from a state cheque arriving each month — it comes from a job that pays enough, a union that protects you, a society that values your work. UBI is a *concession* to the failure of those institutions. It says: we have given up on making work pay, we have given up on collective bargaining, so here is a cheque to make the disappointment bearable. That is not dignity. That is managed decline.

Worse: UBI gives the political right exactly what they have wanted for decades — a single, simple, easily-cut welfare system. Once you have replaced housing benefit, jobseeker's allowance, child tax credit, and a dozen other targeted programmes with one number, every future government can adjust that number downward without anyone noticing which group is being hurt. The current messy welfare state is harder to dismantle precisely because each programme has a constituency. UBI hands the dismantlers a single dial.

--- Closing Government (CG): SOAS A ---

MG (Kwame Mensah):
The opening half has debated targeting versus universality, and incentives. We extend on terrain neither team has touched: the *power* argument.

The single greatest determinant of bad work — long hours, unsafe conditions, sexual harassment, wage theft — is the inability of the worker to walk away. If you cannot afford to lose this job for two months, you cannot say no to anything. UBI changes that. It is not primarily a poverty reduction tool. It is a *bargaining power* tool. With a basic income guaranteed, workers can refuse the shift, file the complaint, leave the abusive employer, hold out for a union contract. That is the fundamental shift the opening teams missed.

This rebuilds Daniel's argument against him. He says UBI is a subsidy to bad employers. The opposite is true: bad employers exist because their workers cannot leave. Give workers exit, and bad employers either improve or die. UBI is the most effective pro-labour intervention available in a deregulated economy precisely because it works through the labour market rather than against it.

And to Priya: yes, UBI is simple. That is why it cannot be cut quietly. Cutting "housing benefit" affects a constituency most voters don't think they belong to. Cutting "the basic income everyone gets" is electoral suicide. Universality is the *protection*, not the vulnerability.

GW (Lucia Romano):
Let me crystallise. There are three live clashes after eight minutes of debate.

On targeting: the opening opposition said UBI is regressive because billionaires get it. But — and they did not engage with this — the *funding* side does the targeting. A UBI paid to everyone but funded through progressive taxation is net-redistributive. The Oxford team treated the payment in isolation and ignored the tax structure. That is not analysis; that is half a calculator.

On incentives: the opposition wants you to believe small pilots tell us nothing. But every long-running comparable transfer — the Alaska Permanent Fund, the US Earned Income Tax Credit, Brazil's Bolsa Familia — shows the same pattern: people do not stop working, they make better work choices. The opposition needs a positive theory of why this specific intervention would be different. They have not provided one.

On power — our extension — neither opposition team has rebutted it. They cannot, because it is true. The single most pro-worker thing you can do in a deregulated economy is guarantee that workers can walk away. UBI does that. We win first because we have the strongest argument on the most important currency in the debate, which is what actually happens to the worst-off when this policy passes.

--- Closing Opposition (CO): Cambridge A ---

MO (Yusuf Ahmed):
Lucia frames the round as "the worst-off." Good — we accept that framing. The extension we bring is about *what the worst-off actually need*, and why UBI gives them something different and worse.

The worst-off in our societies are not the marginally employed who need bargaining power. They are people with chronic illness, disabilities that prevent steady work, fleeing domestic violence, in housing crises, caring full-time for severely disabled relatives. For these people, the poverty-line UBI is *catastrophically* insufficient. Their needs — medical, housing, support workers — vastly exceed the poverty line. Under current systems, targeted programmes acknowledge that and provide more. Under UBI, the government tells them: here is the same flat sum we give everyone, your needs are no longer the state's concern.

This is the cruelty hidden in universality. To treat everyone the same is, when needs differ, to treat the most vulnerable worst. The opening government promised UBI "plus" targeted programmes. The closing government has not defended that "plus" — and Kwame's power argument is silent on the people whose problem is not bargaining power because they cannot work in the first place. The bench has split, and both halves abandon the most vulnerable.

OW (Eleanor Whitfield):
Let me bring this round home. Four clashes have run.

On *targeting versus universality*: the government bench eventually argued that progressive taxation does the targeting. But this concedes our point. If you must rebuild the means-testing machinery through the tax code to make UBI net-redistributive, you have not eliminated bureaucracy — you have moved it. And you have introduced a new failure mode: every adjustment to the tax-and-UBI system now has to win two political battles instead of one. Our framing of targeted welfare is more honest, more administratively efficient, and more responsive to varied need.

On *incentives*: the government's evidence base remains pilot studies under conditions that do not match permanent universal implementation. We do not need to prove disaster — we need only show real risk in a transition costing trillions. That risk is enough to favour the proven, incremental alternative.

On *power*: the closing government's extension is intellectually serious, and we credit them for raising it. But it solves the problem of one specific group — the marginally-employed worker in unsafe conditions — by impoverishing the support systems for everyone else. A bargaining-power floor for some, paid for by gutting the targeted help that keeps disabled, sick, and caring people afloat, is not progress. It is reallocation from the most vulnerable to the slightly-less vulnerable.

On *political durability*: SOAS argued universality is the protection. We argued it is the vulnerability. The truth depends on whether the right or left controls the future. Stake your most vulnerable citizens on that bet at your peril.

The opposition wins because we have shown UBI's appeal — simplicity, universality, dignity — is the same thing as its danger. We have offered the better account of targeted welfare, of work, and most importantly, of who actually loses when this policy passes.`;

function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-br from-yellow-300 to-amber-500 text-white border-amber-600 shadow-md shadow-amber-300/50";
    case 2:
      return "bg-gradient-to-br from-slate-300 to-slate-500 text-white border-slate-600 shadow-md shadow-slate-300/50";
    case 3:
      return "bg-gradient-to-br from-orange-400 to-amber-700 text-white border-amber-800 shadow-md shadow-orange-300/50";
    default:
      return "bg-gradient-to-br from-rose-400 to-rose-600 text-white border-rose-700 shadow-md shadow-rose-300/50";
  }
}

function getRankCardAccent(rank: number) {
  switch (rank) {
    case 1:
      return "border-l-amber-400 bg-gradient-to-r from-amber-50/60 to-transparent";
    case 2:
      return "border-l-slate-400 bg-gradient-to-r from-slate-50/60 to-transparent";
    case 3:
      return "border-l-orange-400 bg-gradient-to-r from-orange-50/60 to-transparent";
    default:
      return "border-l-rose-400 bg-gradient-to-r from-rose-50/60 to-transparent";
  }
}

function getRankLabel(rank: number) {
  return ["1st", "2nd", "3rd", "4th"][rank - 1] ?? `${rank}th`;
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-700";
  if (score >= 80) return "text-indigo-700";
  if (score >= 76) return "text-violet-700";
  if (score >= 75) return "text-slate-600";
  if (score >= 70) return "text-amber-700";
  return "text-rose-700";
}

function getScoreBg(score: number) {
  if (score >= 85) return "bg-emerald-50 border-emerald-200";
  if (score >= 80) return "bg-indigo-50 border-indigo-200";
  if (score >= 76) return "bg-violet-50 border-violet-200";
  if (score >= 75) return "bg-slate-50 border-slate-200";
  if (score >= 70) return "bg-amber-50 border-amber-200";
  return "bg-rose-50 border-rose-200";
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenced) return fenced[1].trim();
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  return text.trim();
}

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamProgress, setStreamProgress] = useState(0);
  const [phraseSeed, setPhraseSeed] = useState(0);

  const mascotState: MascotState = loading
    ? "thinking"
    : error
      ? "confused"
      : result
        ? "happy"
        : "idle";

  useEffect(() => {
    setPhraseSeed((s) => s + 1);
  }, [mascotState]);

  const currentPhrase = useMemo(
    () => pickPhrase(mascotState, phraseSeed),
    [mascotState, phraseSeed],
  );

  async function handleJudge() {
    setLoading(true);
    setError(null);
    setResult(null);
    setStreamProgress(0);

    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const contentType = res.headers.get("content-type") ?? "";

      if (!res.ok || contentType.includes("application/json")) {
        const raw = await res.text();
        let parsed: unknown = null;
        if (raw) {
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = null;
          }
        }
        const serverMsg =
          parsed && typeof parsed === "object" && "error" in parsed
            ? String((parsed as { error: unknown }).error)
            : raw.slice(0, 300) || `Request failed with status ${res.status}`;
        throw new Error(serverMsg);
      }

      if (!res.body) {
        throw new Error("Server returned no response body.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setStreamProgress(fullText.length);
      }

      const errMatch = fullText.match(/\n\n__STREAM_ERROR__:([\s\S]+)$/);
      if (errMatch) {
        throw new Error(errMatch[1].trim());
      }

      if (!fullText.trim()) {
        throw new Error("The AI returned an empty response. Try again.");
      }

      const jsonText = extractJson(fullText);
      let parsed: JudgeResult;
      try {
        parsed = JSON.parse(jsonText);
      } catch (parseErr) {
        const parseMsg =
          parseErr instanceof Error ? parseErr.message : "unknown parse error";
        const tail = fullText.slice(-300).replace(/\n/g, " ⏎ ");
        const head = fullText.slice(0, 80).replace(/\n/g, " ⏎ ");
        throw new Error(
          `The AI returned ${fullText.length.toLocaleString()} characters but JSON parsing failed: ${parseMsg}. ` +
            `Response starts with: "${head}..." | ends with: "...${tail}". ` +
            `If the ending looks truncated mid-sentence, the output hit the token limit — try a shorter transcript.`,
        );
      }

      setResult(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-amber-50/30 to-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-xl shadow-lg shadow-violet-300/40">
              <span className="text-white">⚖️</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
                Debate AI
              </h1>
              <p className="text-xs text-muted-foreground">
                WUDC-quality adjudication, instantly
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-200">
              British Parliamentary
            </Badge>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
              Powered by Gemini
            </Badge>
          </div>
        </header>

        <section className="mb-8 grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
          <div className="flex justify-center sm:justify-start">
            <JudgeMascot mood={mascotState} size={170} />
          </div>
          <div className="relative">
            <div className="relative rounded-2xl border-2 border-violet-200 bg-white/90 px-5 py-4 shadow-md backdrop-blur sm:px-6 sm:py-5">
              <div className="absolute -left-3 top-8 hidden h-5 w-5 rotate-45 border-b-2 border-l-2 border-violet-200 bg-white sm:block" />
              <p className="text-base font-medium text-slate-800 sm:text-lg">
                {currentPhrase}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Paste a BP debate transcript and I'll give you a full <strong>Oral Adjudication</strong> —
                rankings, comparative justification, individual scores, and feedback with mechanism suggestions.
              </p>
            </div>
          </div>
        </section>

        <Card className="mb-8 border-violet-200/60 bg-white/80 shadow-lg shadow-violet-100/40 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📝</span> Debate Transcript
            </CardTitle>
            <CardDescription>
              Include the motion, speaker names, team positions (OG/OO/CG/CO), and the speeches.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Motion: This House Would…&#10;&#10;PM (Alice, OG Team A):&#10;Thank you, Chair…"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={12}
              className="font-mono text-sm border-violet-200 focus-visible:ring-violet-400"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleJudge}
                disabled={loading || !transcript.trim()}
                className="bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 px-8 shadow-md shadow-violet-300/40"
              >
                {loading ? "Judging…" : "⚖️  Judge Debate"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                disabled={loading}
                className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800"
              >
                📚 Load Sample Debate
              </Button>
              {transcript && !loading && (
                <Button
                  variant="ghost"
                  onClick={() => { setTranscript(""); setResult(null); setError(null); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {loading && (
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white shadow-md">
            <CardContent className="py-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-violet-300/30" />
                  <div className="relative h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-violet-900">
                    {streamProgress === 0
                      ? "Connecting to the judge…"
                      : "Streaming the adjudication…"}
                  </p>
                  {streamProgress > 0 && (
                    <p className="mt-1 text-sm tabular-nums text-violet-600">
                      ✨ {streamProgress.toLocaleString()} characters received
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white shadow-md">
            <CardContent className="py-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">😟</span>
                <div>
                  <p className="font-semibold text-rose-900">Unfortunately, something went wrong</p>
                  <p className="mt-1 text-sm text-rose-800/90">{error}</p>
                  <p className="mt-2 text-xs text-rose-700/70">Don't be sad — try again. Sometimes the AI just needs a moment.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            <Card className="overflow-hidden border-violet-200 bg-gradient-to-br from-violet-600 via-indigo-700 to-violet-800 text-white shadow-xl shadow-violet-300/40">
              <CardContent className="py-6">
                <div className="text-xs uppercase tracking-wider text-violet-200">Motion</div>
                <p className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{result.motion}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="oa">
              <TabsList className="grid w-full grid-cols-2 gap-1 bg-violet-100/50 p-1 sm:grid-cols-4">
                <TabsTrigger value="oa" className="data-[state=active]:bg-white data-[state=active]:text-violet-900 data-[state=active]:shadow">
                  📣 OA
                </TabsTrigger>
                <TabsTrigger value="scores" className="data-[state=active]:bg-white data-[state=active]:text-violet-900 data-[state=active]:shadow">
                  📊 Scores
                </TabsTrigger>
                <TabsTrigger value="clashes" className="data-[state=active]:bg-white data-[state=active]:text-violet-900 data-[state=active]:shadow">
                  ⚔️ Clashes
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-white data-[state=active]:text-violet-900 data-[state=active]:shadow">
                  💬 Feedback
                </TabsTrigger>
              </TabsList>

              <TabsContent value="oa" className="space-y-4">
                <Card className="border-violet-200/60 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-violet-900">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">1</span>
                      General Feedback
                    </CardTitle>
                    <CardDescription>How the round played out at a glance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line leading-relaxed text-slate-700">
                      {result.general_feedback}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-violet-200/60 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-violet-900">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">2</span>
                      The Call
                    </CardTitle>
                    <CardDescription>1st through 4th</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.rankings.map((ranking) => (
                      <div
                        key={ranking.rank}
                        className={`flex items-start gap-4 rounded-xl border border-l-4 p-4 transition-all hover:shadow-md ${getRankCardAccent(ranking.rank)}`}
                      >
                        <span
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 text-base font-extrabold ${getRankBadgeColor(ranking.rank)}`}
                        >
                          {getRankLabel(ranking.rank)}
                        </span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-bold text-slate-900">
                              {ranking.team}
                            </span>
                            <Badge variant="outline" className="border-violet-300 bg-violet-50 text-violet-700">
                              {ranking.position}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {ranking.justification}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-violet-200/60 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-violet-900">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">3</span>
                      Justification — Clash by Clash
                    </CardTitle>
                    <CardDescription>Comparative walkthrough of how the call was made</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line leading-relaxed text-slate-700">
                      {result.ranking_justification}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scores">
                <Card className="border-violet-200/60 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-violet-900">Speaker Scores</CardTitle>
                    <CardDescription>
                      Content (40%) + Style (30%) + Strategy (30%) · WUDC scale: <strong>75 = average</strong>, <strong>80 = excellent</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {result.scores.map((score) => (
                        <div
                          key={score.speaker}
                          className={`rounded-xl border p-4 transition-all hover:shadow ${getScoreBg(score.total)}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-semibold text-slate-900">{score.speaker}</div>
                              <div className="text-xs text-slate-600">{score.team}</div>
                              <Badge variant="secondary" className="mt-1 bg-white/70">
                                {score.role}
                              </Badge>
                            </div>
                            <div className={`text-3xl font-extrabold tabular-nums ${getScoreColor(score.total)}`}>
                              {score.total}
                            </div>
                          </div>
                          <div className="mt-3 flex gap-3 text-xs">
                            <div>
                              <div className="text-slate-500">Content</div>
                              <div className="font-semibold text-slate-700">{score.content}</div>
                            </div>
                            <div>
                              <div className="text-slate-500">Style</div>
                              <div className="font-semibold text-slate-700">{score.style}</div>
                            </div>
                            <div>
                              <div className="text-slate-500">Strategy</div>
                              <div className="font-semibold text-slate-700">{score.strategy}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clashes">
                <Card className="border-violet-200/60 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-violet-900">⚔️ Main Clashes</CardTitle>
                    <CardDescription>
                      The contested questions that determined the round
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.clashes.map((clash, i) => (
                      <div key={i} className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50/40 to-white p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-xs font-bold text-white shadow">
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{clash.title}</h4>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {clash.teams_involved.map((team) => (
                                <Badge key={team} variant="outline" className="border-violet-300 bg-white text-violet-700">
                                  {team}
                                </Badge>
                              ))}
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                              {clash.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="space-y-4">
                  {result.feedback.map((fb) => (
                    <Card key={fb.speaker} className="border-violet-200/60 bg-white/90 shadow-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-base text-violet-900">
                              {fb.speaker}
                            </CardTitle>
                            <CardDescription>{fb.team}</CardDescription>
                          </div>
                          <span className="text-2xl">🎙️</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="rounded-lg bg-violet-50/60 p-3 text-sm italic text-slate-700">
                          {fb.summary}
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                            <h5 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800">
                              <span>👍</span> Good jobs
                            </h5>
                            <ul className="space-y-1.5">
                              {fb.strengths.map((s, i) => (
                                <li key={i} className="text-sm text-emerald-900/90">
                                  <span className="mr-1 text-emerald-600">✓</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                            <h5 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800">
                              <span>💡</span> Areas to grow
                            </h5>
                            <ul className="space-y-1.5">
                              {fb.improvements.map((imp, i) => (
                                <li key={i} className="text-sm text-amber-900/90">
                                  <span className="mr-1 text-amber-600">→</span>
                                  {imp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {fb.suggested_mechanisms && fb.suggested_mechanisms.length > 0 && (
                          <div className="rounded-lg border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/60 to-violet-50/30 p-4">
                            <h5 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-indigo-900">
                              <span>🛠️</span> Mechanisms you could have added
                            </h5>
                            <ul className="space-y-2">
                              {fb.suggested_mechanisms.map((m, i) => (
                                <li
                                  key={i}
                                  className="rounded-md border border-indigo-100 bg-white/70 p-2.5 text-sm leading-relaxed text-indigo-950"
                                >
                                  {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <footer className="mt-16 border-t border-violet-200/60 pt-6 text-center text-xs text-muted-foreground">
          <p>
            Debate AI — practice tool for British Parliamentary debaters. Adjudication is AI-generated and intended for practice, not official results.
          </p>
        </footer>
      </div>
    </main>
  );
}
