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

const SAMPLE_TRANSCRIPT = `Motion: This House Would Ban Social Media for Children Under 16

--- Opening Government (OG): Oxford A ---

PM (Alice Chen):
Thank you, Chair. The motion before us today is clear: This House Would Ban Social Media for Children Under 16. We define "ban" as making it illegal for social media platforms to create accounts for anyone under 16, enforced through age verification.

Our case rests on two pillars. First, the mental health crisis. Study after study shows that social media use correlates with increased rates of depression, anxiety, and self-harm among young people. The US Surgeon General has called it a public health emergency. Children's brains are still developing — they lack the prefrontal cortex maturity to handle the addictive design of these platforms.

Second, the predation argument. Social media is the primary vector for child exploitation, cyberbullying, and exposure to harmful content. We have a duty of care to protect children who cannot fully protect themselves.

The opposition will say education is enough. But we don't let children drink alcohol and just "educate" them about it — we set age limits because some risks are too great to leave to individual judgment.

--- Opening Opposition (OO): Cambridge A ---

LO (James Wright):
Thank you. The government's case sounds compelling until you examine it closely.

First, correlation is not causation. The studies the PM cites show correlation between social media use and mental health issues, but they don't prove social media causes these problems. The increase in mental health issues among teens predates social media and has complex causes including academic pressure, economic anxiety, and reduced community ties.

Second, a ban is practically unenforceable. Children will use VPNs, fake IDs, or their parents' accounts. You'll push them to less regulated platforms where they're actually less safe. Prohibition has never worked — not with alcohol, not with drugs, and it won't work here.

Our counter-case: what we need is digital literacy education and platform regulation. Require platforms to disable addictive features for young users, mandate parental controls, and teach children to navigate the digital world safely. This addresses the harms without the massive costs of a ban.

DLO (Sarah Park):
Building on James's points, let me address the predation argument directly. Predators existed before social media and will exist after any ban. The solution is better platform moderation and law enforcement, not pushing children off platforms where at least their activity can be monitored. A banned child using a secret account is far more vulnerable than one using a regulated, monitored platform.

Furthermore, social media provides genuine benefits for children — connection with peers, access to educational content, creative expression, and community for marginalized youth who may not find acceptance in their physical communities. The government's case completely ignores these benefits.

--- Closing Government (CG): Oxford B ---

MG (David Liu):
The opening teams have debated enforcement and correlation. Let me bring a new dimension: the consent argument.

Children cannot meaningfully consent to having their data harvested, their attention manipulated, and their psychological profiles built by trillion-dollar corporations. We don't allow children to sign contracts because we recognize they can't fully understand the consequences. Social media terms of service are essentially contracts that trade personal data for access — contracts no child can meaningfully evaluate.

This isn't about whether social media has some benefits. Libraries have benefits too, but we don't let children wander into any section unsupervised. The question is whether the current unrestricted access model is appropriate given children's developmental stage.

GW (Emma Torres):
Let me crystallize why the government wins this debate. The opposition offers regulation as an alternative, but we've had years of self-regulation and voluntary measures from platforms — they've consistently failed. COPPA in the US has been toothless. The opposition's "regulate better" is aspirational, not practical.

The core clash is simple: the government says some risks are too significant to manage through education alone, so we set age limits — just as we do for driving, voting, drinking, and military service. The opposition says education and regulation are enough, but they cannot show us a single example where this approach has actually worked to protect children online.

--- Closing Opposition (CO): Cambridge B ---

MO (Raj Patel):
Thank you. Let me offer the extension the opposition needs: the rights-based argument.

Children have rights too — including the right to information, expression, and association, recognized in the UN Convention on the Rights of the Child. A blanket ban violates these rights disproportionately. The government treats children as objects to be protected rather than developing agents with their own autonomy.

Moreover, this ban would deepen the digital divide. Wealthy families will find workarounds; disadvantaged children will simply be cut off from an increasingly digital civic space. By 16, they'll enter the digital world with zero experience and zero resilience — they'll be more vulnerable, not less.

OW (Lisa Nakamura):
Let me bring this debate home. We've heard four key clashes today.

First, on harms: both sides agree social media poses risks. The question is proportionality. A ban is a sledgehammer where a scalpel is needed.

Second, on enforcement: the government never adequately addressed how this ban would work in practice. Unenforceable laws breed contempt for the rule of law.

Third, on alternatives: the government dismissed regulation, but their own case relies on government action — they just chose the most extreme form. Graduated, targeted regulation is more proportionate and more likely to actually protect children.

Fourth, on rights and equity: the government's framing erases children's agency and ignores distributional effects. The opposition offers a framework that respects children's developing autonomy while still protecting them from genuine harms.

The opposition wins because we offer a proportionate, practical, rights-respecting approach to a real problem, rather than the government's well-intentioned but ultimately counterproductive prohibition.`;

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
