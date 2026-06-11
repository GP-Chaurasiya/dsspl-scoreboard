import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    wins: bigint;
    losses: bigint;
    dalName: string;
    winPercentage: number;
    matchesPlayed: bigint;
    dalId: DalId;
    draws: bigint;
    points: bigint;
}
export type Timestamp = bigint;
export interface Sport {
    id: SportId;
    name: SportName;
}
export type SportId = bigint;
export type DalId = bigint;
export interface MatchPublic {
    id: MatchId;
    startTime?: Timestamp;
    status: MatchStatus;
    dalAId: DalId;
    dalBId: DalId;
    venue: string;
    scoreA: bigint;
    scoreB: bigint;
    sportName: string;
    isLive: boolean;
    dalBName: string;
    durationMinutes: bigint;
    elapsedSeconds: bigint;
    sportId: SportId;
    dalAName: string;
}
export interface Dal {
    id: DalId;
    name: string;
}
export interface CreateMatchInput {
    dalAId: DalId;
    dalBId: DalId;
    venue: string;
    isLive: boolean;
    durationMinutes: bigint;
    sportId: SportId;
}
export type SportName = string;
export interface MedalTallyEntry {
    total: bigint;
    bronze: bigint;
    gold: bigint;
    dalName: string;
    silver: bigint;
    dalId: DalId;
}
export type MatchId = bigint;
export enum MatchStatus {
    scheduled = "scheduled",
    live = "live",
    completed = "completed"
}
export interface backendInterface {
    completeMatch(matchId: MatchId): Promise<boolean>;
    createMatch(input: CreateMatchInput): Promise<bigint>;
    decrementScoreA(matchId: MatchId): Promise<boolean>;
    decrementScoreB(matchId: MatchId): Promise<boolean>;
    getAllMatches(): Promise<Array<MatchPublic>>;
    getDals(): Promise<Array<Dal>>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getLeaderboardBySport(sportId: SportId): Promise<Array<LeaderboardEntry>>;
    getLiveMatches(): Promise<Array<MatchPublic>>;
    getMatch(id: MatchId): Promise<MatchPublic | null>;
    getMatchStats(): Promise<{
        scheduled: bigint;
        total: bigint;
        live: bigint;
        completed: bigint;
        todayCount: bigint;
    }>;
    getMatchesBySport(sportId: SportId): Promise<Array<MatchPublic>>;
    getMedalTally(): Promise<Array<MedalTallyEntry>>;
    getRecentMatches(limit: bigint): Promise<Array<MatchPublic>>;
    getSports(): Promise<Array<Sport>>;
    getUpcomingMatches(limit: bigint): Promise<Array<MatchPublic>>;
    incrementScoreA(matchId: MatchId): Promise<boolean>;
    incrementScoreB(matchId: MatchId): Promise<boolean>;
    pauseMatch(matchId: MatchId): Promise<boolean>;
    resetMatch(matchId: MatchId): Promise<boolean>;
    setMatchLive(matchId: MatchId, isLive: boolean): Promise<boolean>;
    startMatch(matchId: MatchId): Promise<boolean>;
}
