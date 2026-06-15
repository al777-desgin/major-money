// LocalStorage helpers for Major Money Quest.
// All localStorage I/O lives here so the UI never touches storage directly.

import { levels, type AvatarId, type BadgeId } from "./gameData";

export const PROFILE_KEY = "majorMoneyQuestProfile";
export const PROGRESS_KEY = "majorMoneyQuestProgress";
export const USERS_KEY = "majorMoneyQuestUsers";

export type Profile = {
  displayName: string;
  email: string;
  gradeLevel: string;
  school?: string;
  avatar: AvatarId;
  createdAt: string;
};

export type Progress = {
  currentUserEmail: string;
  xp: number;
  coins: number;
  streak: number;
  hearts: number;
  maxHearts: number;
  completedLessons: number[]; // level ids
  unlockedLessons: number[]; // level ids
  currentLevel: number;
  lastPlayedDate: string; // YYYY-MM-DD
  totalCorrect: number;
  totalWrong: number;
  badgesEarned: BadgeId[];
};

const isBrowser = () => typeof window !== "undefined";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

/* ----- Profile (active) ----- */

export function getProfile(): Profile | null {
  if (!isBrowser()) return null;
  return safeParse<Profile>(localStorage.getItem(PROFILE_KEY));
}

export function saveProfile(p: Profile) {
  if (!isBrowser()) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  // Track this user in the multi-profile registry.
  const users = listUsers();
  const without = users.filter((u) => u.email !== p.email);
  localStorage.setItem(USERS_KEY, JSON.stringify([...without, p]));
}

export function clearProfile() {
  if (!isBrowser()) return;
  localStorage.removeItem(PROFILE_KEY);
}

export function listUsers(): Profile[] {
  if (!isBrowser()) return [];
  return safeParse<Profile[]>(localStorage.getItem(USERS_KEY)) ?? [];
}

/* ----- Progress ----- */

function emptyProgress(email: string): Progress {
  return {
    currentUserEmail: email,
    xp: 0,
    coins: 0,
    streak: 0,
    hearts: 5,
    maxHearts: 5,
    completedLessons: [],
    unlockedLessons: [1],
    currentLevel: 1,
    lastPlayedDate: "",
    totalCorrect: 0,
    totalWrong: 0,
    badgesEarned: [],
  };
}

function progressKeyFor(email: string) {
  return `${PROGRESS_KEY}:${email.toLowerCase()}`;
}

export function getProgress(email: string): Progress {
  if (!isBrowser()) return emptyProgress(email);
  const stored = safeParse<Progress>(localStorage.getItem(progressKeyFor(email)));
  if (stored) return { ...emptyProgress(email), ...stored };
  return emptyProgress(email);
}

export function saveProgress(p: Progress) {
  if (!isBrowser()) return;
  localStorage.setItem(progressKeyFor(p.currentUserEmail), JSON.stringify(p));
}

export function resetProgress(email: string): Progress {
  const fresh = emptyProgress(email);
  saveProgress(fresh);
  return fresh;
}

/* ----- Game logic ----- */

const todayStr = () => new Date().toISOString().slice(0, 10);

export function touchStreak(p: Progress): Progress {
  const today = todayStr();
  if (p.lastPlayedDate === today) return p;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const newStreak = p.lastPlayedDate === yesterday ? p.streak + 1 : 1;
  return { ...p, streak: newStreak, lastPlayedDate: today };
}

export function applyCorrect(p: Progress): Progress {
  return { ...p, xp: p.xp + 10, coins: p.coins + 5, totalCorrect: p.totalCorrect + 1 };
}

export function applyWrong(p: Progress): Progress {
  return { ...p, hearts: Math.max(0, p.hearts - 1), totalWrong: p.totalWrong + 1 };
}

export function refillHearts(p: Progress): Progress {
  return { ...p, hearts: p.maxHearts };
}

export function completeLevel(p: Progress, levelId: number, perfect: boolean): Progress {
  const completed = Array.from(new Set([...p.completedLessons, levelId]));
  const next = levelId + 1;
  const unlocked = next <= levels.length
    ? Array.from(new Set([...p.unlockedLessons, next]))
    : p.unlockedLessons;
  const bonus = perfect ? 25 : 0;
  let updated: Progress = {
    ...p,
    xp: p.xp + 50 + bonus,
    coins: p.coins + 20,
    completedLessons: completed,
    unlockedLessons: unlocked,
    currentLevel: Math.min(next, levels.length),
  };
  updated = evaluateBadges(updated);
  return updated;
}

/* ----- Badges ----- */

function worldComplete(p: Progress, world: number) {
  const ids = levels.filter((l) => l.world === world).map((l) => l.id);
  return ids.every((id) => p.completedLessons.includes(id));
}

export function evaluateBadges(p: Progress): Progress {
  const earned = new Set<BadgeId>(p.badgesEarned);
  if (p.completedLessons.length >= 1) earned.add("first-mission");
  if (worldComplete(p, 2)) earned.add("budget-builder");
  if (worldComplete(p, 3)) earned.add("saver-strong");
  if (worldComplete(p, 5)) earned.add("credit-climber");
  if (worldComplete(p, 6)) earned.add("debt-destroyer");
  if (worldComplete(p, 7)) earned.add("investment-rookie");
  if (worldComplete(p, 8)) earned.add("tax-ready");
  if (worldComplete(p, 9)) earned.add("scam-shield");
  if (p.completedLessons.includes(46)) earned.add("inflation-fighter");
  if (p.completedLessons.length === levels.length) earned.add("major-money-master");
  return { ...p, badgesEarned: Array.from(earned) };
}

export function accuracy(p: Progress): number {
  const total = p.totalCorrect + p.totalWrong;
  if (total === 0) return 0;
  return Math.round((p.totalCorrect / total) * 100);
}

/* ----- Helpers ----- */

export function shuffle<T>(arr: T[]): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
