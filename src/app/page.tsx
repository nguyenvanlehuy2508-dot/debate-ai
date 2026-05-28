"use client";

import { useState } from "react";
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
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case 2:
      return "bg-gray-100 text-gray-700 border-gray-300";
    case 3:
      return "bg-orange-100 text-orange-700 border-orange-300";
    default:
      return "bg-red-100 text-red-700 border-red-300";
  }
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-green-700";
  if (score >= 80) return "text-blue-700";
  if (score >= 76) return "text-emerald-700";
  if (score >= 75) return "text-slate-700";
  if (score >= 70) return "text-yellow-700";
  return "text-red-700";
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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Debate AI</h1>
          <p className="mt-2 text-muted-foreground">
            AI-powered British Parliamentary debate adjudication
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Debate Transcript</CardTitle>
            <CardDescription>
              Paste a BP debate transcript below. Include speaker names, team
              positions, and the motion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your debate transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleJudge}
                disabled={loading || !transcript.trim()}
                className="px-8"
              >
                {loading ? "Judging..." : "Judge Debate"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                disabled={loading}
              >
                Load Sample Debate
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground">
                {streamProgress === 0
                  ? "Connecting to the AI..."
                  : "Streaming adjudication from the AI..."}
              </p>
              {streamProgress > 0 && (
                <p className="mt-2 text-sm tabular-nums text-muted-foreground">
                  {streamProgress.toLocaleString()} characters received
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="py-6">
              <p className="text-destructive font-medium">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Motion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium italic">{result.motion}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="oa">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="oa">Oral Adjudication</TabsTrigger>
                <TabsTrigger value="scores">Scores</TabsTrigger>
                <TabsTrigger value="clashes">Clashes</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="oa" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>1. General Feedback</CardTitle>
                    <CardDescription>
                      Overall framing of the debate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line leading-relaxed">
                      {result.general_feedback}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2. Ranking</CardTitle>
                    <CardDescription>
                      1st through 4th placement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.rankings.map((ranking) => (
                      <div
                        key={ranking.rank}
                        className="flex items-start gap-4 rounded-lg border p-4"
                      >
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold ${getRankBadgeColor(ranking.rank)}`}
                        >
                          {ranking.rank}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {ranking.team}
                            </span>
                            <Badge variant="outline">{ranking.position}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {ranking.justification}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3. Justification for the Ranking</CardTitle>
                    <CardDescription>
                      Walkthrough of the clashes and comparative weighing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line leading-relaxed">
                      {result.ranking_justification}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scores">
                <Card>
                  <CardHeader>
                    <CardTitle>Speaker Scores</CardTitle>
                    <CardDescription>
                      Content (40%) + Style (30%) + Strategy (30%) = Total · WUDC scale: 75 = average, 80 = excellent
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left">
                            <th className="pb-3 font-semibold">Speaker</th>
                            <th className="pb-3 font-semibold">Role</th>
                            <th className="pb-3 text-center font-semibold">
                              Content
                            </th>
                            <th className="pb-3 text-center font-semibold">
                              Style
                            </th>
                            <th className="pb-3 text-center font-semibold">
                              Strategy
                            </th>
                            <th className="pb-3 text-center font-semibold">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.scores.map((score) => (
                            <tr key={score.speaker} className="border-b">
                              <td className="py-3">
                                <div className="font-medium">
                                  {score.speaker}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {score.team}
                                </div>
                              </td>
                              <td className="py-3">
                                <Badge variant="secondary">{score.role}</Badge>
                              </td>
                              <td className="py-3 text-center">
                                {score.content}
                              </td>
                              <td className="py-3 text-center">
                                {score.style}
                              </td>
                              <td className="py-3 text-center">
                                {score.strategy}
                              </td>
                              <td
                                className={`py-3 text-center text-lg font-bold ${getScoreColor(score.total)}`}
                              >
                                {score.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clashes">
                <Card>
                  <CardHeader>
                    <CardTitle>Main Clashes</CardTitle>
                    <CardDescription>
                      Key points of contention in the debate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.clashes.map((clash, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {i + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold">{clash.title}</h4>
                            <div className="mt-1 flex gap-1">
                              {clash.teams_involved.map((team) => (
                                <Badge key={team} variant="outline">
                                  {team}
                                </Badge>
                              ))}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {clash.description}
                            </p>
                          </div>
                        </div>
                        {i < result.clashes.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="space-y-4">
                  {result.feedback.map((fb) => (
                    <Card key={fb.speaker}>
                      <CardHeader>
                        <CardTitle className="text-base">
                          {fb.speaker}
                        </CardTitle>
                        <CardDescription>{fb.team}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{fb.summary}</p>
                        <Separator />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h5 className="mb-2 text-sm font-semibold text-green-700">
                              Strengths
                            </h5>
                            <ul className="space-y-1">
                              {fb.strengths.map((s, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground"
                                >
                                  + {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="mb-2 text-sm font-semibold text-orange-700">
                              Areas for Improvement
                            </h5>
                            <ul className="space-y-1">
                              {fb.improvements.map((imp, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground"
                                >
                                  - {imp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </main>
  );
}
