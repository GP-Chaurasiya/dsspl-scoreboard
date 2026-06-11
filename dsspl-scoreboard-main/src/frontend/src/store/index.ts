import type { Dal, Match, MatchStatus, Sport, SportId } from "@/types";
import { create } from "zustand";

// ── Sports catalogue ──────────────────────────────────────────────────────────
export const SPORTS: Sport[] = [
  {
    id: 1,
    name: "Basketball",
    slug: "basketball",
    icon: "🏀",
    category: "team",
  },
  { id: 2, name: "Football", slug: "football", icon: "⚽", category: "team" },
  { id: 3, name: "Cricket", slug: "cricket", icon: "🏏", category: "team" },
  {
    id: 4,
    name: "Volleyball",
    slug: "volleyball",
    icon: "🏐",
    category: "team",
  },
  {
    id: 5,
    name: "Badminton",
    slug: "badminton",
    icon: "🏸",
    category: "racquet",
  },
  {
    id: 6,
    name: "Table Tennis",
    slug: "table-tennis",
    icon: "🏓",
    category: "racquet",
  },
  {
    id: 7,
    name: "Athletics (100m)",
    slug: "athletics-100m",
    icon: "🏃",
    category: "track",
  },
  {
    id: 8,
    name: "Athletics (400m)",
    slug: "athletics-400m",
    icon: "🏃",
    category: "track",
  },
  {
    id: 9,
    name: "Athletics (Relay)",
    slug: "athletics-relay",
    icon: "🔁",
    category: "track",
  },
  { id: 10, name: "Kho-Kho", slug: "kho-kho", icon: "🤸", category: "team" },
  { id: 11, name: "Chess", slug: "chess", icon: "♟️", category: "individual" },
  {
    id: 12,
    name: "Carrom",
    slug: "carrom",
    icon: "🎯",
    category: "individual",
  },
  {
    id: 13,
    name: "Tug of War",
    slug: "tug-of-war",
    icon: "💪",
    category: "team",
  },
  {
    id: 14,
    name: "Long Jump",
    slug: "long-jump",
    icon: "🦘",
    category: "field",
  },
  {
    id: 15,
    name: "Javelin Throw",
    slug: "javelin-throw",
    icon: "🎿",
    category: "field",
  },
  {
    id: 16,
    name: "Discus Throw",
    slug: "discus-throw",
    icon: "🥏",
    category: "field",
  },
  { id: 17, name: "Shot Put", slug: "shot-put", icon: "⚫", category: "field" },
];

// ── Dals catalogue ────────────────────────────────────────────────────────────
export const DALS: Dal[] = [
  {
    id: 1,
    name: "Adarsh Dal",
    color: "#E53E3E",
    abbreviation: "AD",
    logo: "/assets/adarsh_dal.jpg",
  },
  {
    id: 2,
    name: "Sankalp Dal",
    color: "#3182CE",
    abbreviation: "SK",
    logo: "/assets/sankalp_dal.jpg",
  },
  {
    id: 3,
    name: "Chanakya Dal",
    color: "#38A169",
    abbreviation: "CH",
    logo: "/assets/chanakya_dal.jpg",
  },
  {
    id: 4,
    name: "Vijay Dal",
    color: "#D69E2E",
    abbreviation: "VJ",
    logo: "/assets/vijay_dal.jpg",
  },
  {
    id: 5,
    name: "Utkarsh Dal",
    color: "#805AD5",
    abbreviation: "UK",
    logo: "/assets/utkarsh_dal.jpg",
  },
  {
    id: 6,
    name: "Rakshak Dal",
    color: "#DD6B20",
    abbreviation: "RK",
    logo: "/assets/rakshak_dal.jpg",
  },
  {
    id: 7,
    name: "Shaurya Dal",
    color: "#2C7A7B",
    abbreviation: "SH",
    logo: "/assets/shaurya_dal.jpg",
  },
];

// ── Match Store ───────────────────────────────────────────────────────────────
interface MatchStore {
  matches: Match[];
  liveMatchId: string | null;
  addMatch: (match: Match) => void;
  updateScore: (matchId: string, side: "A" | "B", delta: number) => void;
  updateStatus: (matchId: string, status: MatchStatus) => void;
  setLiveMatch: (id: string | null) => void;
  removeMatch: (id: string) => void;
}

const SEED_MATCHES: Match[] = [];

export const useMatchStore = create<MatchStore>((set) => ({
  matches: SEED_MATCHES,
  liveMatchId: null,
  addMatch: (match) => set((s) => ({ matches: [match, ...s.matches] })),
  updateScore: (matchId, side, delta) =>
    set((s) => ({
      matches: s.matches.map((m) =>
        m.id === matchId
          ? side === "A"
            ? { ...m, scoreA: Math.max(0, m.scoreA + delta) }
            : { ...m, scoreB: Math.max(0, m.scoreB + delta) }
          : m,
      ),
    })),
  updateStatus: (matchId, status) =>
    set((s) => ({
      matches: s.matches.map((m) => (m.id === matchId ? { ...m, status } : m)),
    })),
  setLiveMatch: (id) => set({ liveMatchId: id }),
  removeMatch: (id) =>
    set((s) => ({ matches: s.matches.filter((m) => m.id !== id) })),
}));

// ── Timer Store ───────────────────────────────────────────────────────────────
interface TimerStore {
  elapsedSeconds: number;
  isRunning: boolean;
  intervalRef: ReturnType<typeof setInterval> | null;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  elapsedSeconds: 0,
  isRunning: false,
  intervalRef: null,
  tick: () => set((s) => ({ elapsedSeconds: s.elapsedSeconds + 1 })),
  start: () => {
    if (get().isRunning) return;
    const ref = setInterval(() => get().tick(), 1000);
    set({ isRunning: true, intervalRef: ref });
  },
  pause: () => {
    const { intervalRef } = get();
    if (intervalRef) clearInterval(intervalRef);
    set({ isRunning: false, intervalRef: null });
  },
  reset: () => {
    const { intervalRef } = get();
    if (intervalRef) clearInterval(intervalRef);
    set({ elapsedSeconds: 0, isRunning: false, intervalRef: null });
  },
}));
