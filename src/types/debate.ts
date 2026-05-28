export interface Speech {
  speaker: string;
  team: string;
  role: string;
  content: string;
}

export interface Debate {
  transcript: string;
  motion: string;
  speeches: Speech[];
}

export interface Score {
  speaker: string;
  team: string;
  role: string;
  content: number;
  style: number;
  strategy: number;
  total: number;
}

export interface Feedback {
  speaker: string;
  team: string;
  strengths: string[];
  improvements: string[];
  summary: string;
}

export interface Clash {
  title: string;
  description: string;
  teams_involved: string[];
}

export interface TeamRanking {
  rank: number;
  team: string;
  position: string;
  justification: string;
}

export interface JudgeResult {
  motion: string;
  general_feedback: string;
  rankings: TeamRanking[];
  ranking_justification: string;
  clashes: Clash[];
  scores: Score[];
  feedback: Feedback[];
}
