import { DALS, SPORTS, useMatchStore } from "@/store";
/**
 * DSSPL API client — wraps actor calls via React Query hooks.
 * All methods return the canonical types from @/types.
 */
import type {
  CreateMatchInput,
  LeaderboardEntry,
  Match,
  MedalTallyEntry,
} from "@/types";

// ── Read helpers ──────────────────────────────────────────────────────────────

export function getAllMatches(): Match[] {
  return useMatchStore.getState().matches;
}

export function getLiveMatches(): Match[] {
  return useMatchStore.getState().matches.filter((m) => m.status === "live");
}

export function getMatchById(id: string): Match | undefined {
  return useMatchStore.getState().matches.find((m) => m.id === id);
}

export function getMatchesBySport(sportId: number): Match[] {
  return useMatchStore.getState().matches.filter((m) => m.sportId === sportId);
}

// ── Write helpers ─────────────────────────────────────────────────────────────

export function createMatch(input: CreateMatchInput): Match {
  const match: Match = {
    id: `m${Date.now()}`,
    ...input,
    scoreA: 0,
    scoreB: 0,
    status: "upcoming",
    createdAt: Date.now(),
  };
  useMatchStore.getState().addMatch(match);
  return match;
}

export function updateMatchScore(
  matchId: string,
  side: "A" | "B",
  delta: number,
): void {
  useMatchStore.getState().updateScore(matchId, side, delta);
}

export function setMatchStatus(matchId: string, status: Match["status"]): void {
  useMatchStore.getState().updateStatus(matchId, status);
}

// ── Derived analytics ─────────────────────────────────────────────────────────

export function computeLeaderboard(): LeaderboardEntry[] {
  const matches = useMatchStore
    .getState()
    .matches.filter((m) => m.status === "completed");

  const dalMap = new Map<
    number,
    Omit<LeaderboardEntry, "rank" | "winPercentage">
  >();

  for (const dal of DALS) {
    dalMap.set(dal.id, {
      dalId: dal.id,
      dalName: dal.name,
      points: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      matchesPlayed: 0,
    });
  }

  for (const m of matches) {
    const a = dalMap.get(m.dalAId)!;
    const b = dalMap.get(m.dalBId)!;
    a.matchesPlayed++;
    b.matchesPlayed++;
    if (m.scoreA > m.scoreB) {
      a.wins++;
      a.points += 3;
      b.losses++;
    } else if (m.scoreB > m.scoreA) {
      b.wins++;
      b.points += 3;
      a.losses++;
    } else {
      a.draws++;
      a.points += 1;
      b.draws++;
      b.points += 1;
    }
  }

  return Array.from(dalMap.values())
    .map((d) => ({
      ...d,
      winPercentage: d.matchesPlayed
        ? Math.round((d.wins / d.matchesPlayed) * 100)
        : 0,
      rank: 0,
    }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((d, i) => ({ ...d, rank: i + 1 }));
}

export function computeMedalTally(): MedalTallyEntry[] {
  const matches = useMatchStore
    .getState()
    .matches.filter((m) => m.status === "completed");

  const medalMap = new Map<number, Omit<MedalTallyEntry, "rank" | "total">>();

  for (const dal of DALS) {
    medalMap.set(dal.id, {
      dalId: dal.id,
      dalName: dal.name,
      gold: 0,
      silver: 0,
      bronze: 0,
    });
  }

  // Group matches by sport — top 3 dals earn gold/silver/bronze
  const bySport = new Map<number, Match[]>();
  for (const m of matches) {
    const arr = bySport.get(m.sportId) ?? [];
    arr.push(m);
    bySport.set(m.sportId, arr);
  }

  for (const [, sportMatches] of bySport) {
    // Accumulate wins per dal within this sport
    const sportWins = new Map<number, number>();
    for (const m of sportMatches) {
      if (m.scoreA > m.scoreB) {
        sportWins.set(m.dalAId, (sportWins.get(m.dalAId) ?? 0) + 1);
      } else if (m.scoreB > m.scoreA) {
        sportWins.set(m.dalBId, (sportWins.get(m.dalBId) ?? 0) + 1);
      }
    }
    const sorted = [...sportWins.entries()].sort((a, b) => b[1] - a[1]);
    if (sorted[0]) medalMap.get(sorted[0][0])!.gold++;
    if (sorted[1]) medalMap.get(sorted[1][0])!.silver++;
    if (sorted[2]) medalMap.get(sorted[2][0])!.bronze++;
  }

  return Array.from(medalMap.values())
    .map((d) => ({ ...d, total: d.gold + d.silver + d.bronze, rank: 0 }))
    .sort(
      (a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze,
    )
    .map((d, i) => ({ ...d, rank: i + 1 }));
}

export { SPORTS, DALS };
