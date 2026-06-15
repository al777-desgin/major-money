import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins, Banknote, CreditCard, Shield, TrendingUp, PiggyBank,
  Lock, Trophy, Flame, Heart, GraduationCap, Calculator,
  Check, RotateCcw, LogOut, Sparkles, ArrowRight, X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { levels, worlds, avatarOptions, badges as allBadges, totalLevels, type Question, type AvatarId } from "@/lib/gameData";
import {
  getProfile, saveProfile, clearProfile,
  getProgress, saveProgress, resetProgress,
  touchStreak, applyCorrect, applyWrong, refillHearts,
  completeLevel, accuracy, shuffle, listUsers,
  type Profile, type Progress,
} from "@/lib/gameProgress";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Major Money Quest — Play & Learn" },
      { name: "description", content: "Major Money Quest: a 50-level financial literacy game covering budgeting, credit, investing, taxes, scams, and more." },
    ],
  }),
  component: GamePage,
});

/* ---------- Icons ---------- */

const AVATAR_ICONS: Record<AvatarId, typeof Coins> = {
  coins: Coins,
  banknote: Banknote,
  piggy: PiggyBank,
  card: CreditCard,
  trend: TrendingUp,
  shield: Shield,
};

const WORLD_ICONS = [
  GraduationCap, Calculator, PiggyBank, Banknote, CreditCard,
  Shield, TrendingUp, Calculator, Shield, Trophy,
];

/* ---------- Page ---------- */

type View =
  | { kind: "loading" }
  | { kind: "onboarding" }
  | { kind: "dashboard" }
  | { kind: "quiz"; levelId: number }
  | { kind: "complete"; levelId: number; perfect: boolean; xpGained: number; coinsGained: number }
  | { kind: "out-of-hearts"; levelId: number }
  | { kind: "finale" };

function GamePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [view, setView] = useState<View>({ kind: "loading" });

  // Bootstrap from localStorage on mount.
  useEffect(() => {
    const p = getProfile();
    if (!p) {
      setView({ kind: "onboarding" });
      return;
    }
    setProfile(p);
    const prog = touchStreak(getProgress(p.email));
    saveProgress(prog);
    setProgress(prog);
    setView({ kind: "dashboard" });
  }, []);

  const handleProfileCreated = (p: Profile) => {
    saveProfile(p);
    setProfile(p);
    const prog = touchStreak(getProgress(p.email));
    saveProgress(prog);
    setProgress(prog);
    setView({ kind: "dashboard" });
  };

  const handleSwitchProfile = () => {
    clearProfile();
    setProfile(null);
    setProgress(null);
    setView({ kind: "onboarding" });
  };

  const handleResetProgress = () => {
    if (!profile) return;
    if (!confirm("Reset all Major Money Quest progress for this profile?")) return;
    const fresh = resetProgress(profile.email);
    setProgress(fresh);
    setView({ kind: "dashboard" });
  };

  const startLevel = (levelId: number) => {
    if (!progress) return;
    let p = progress;
    if (p.hearts <= 0) {
      setView({ kind: "out-of-hearts", levelId });
      return;
    }
    if (!p.unlockedLessons.includes(levelId)) return;
    p = touchStreak(p);
    saveProgress(p);
    setProgress(p);
    setView({ kind: "quiz", levelId });
  };

  const handleQuizFinish = (levelId: number, correctCount: number, wrongCount: number) => {
    if (!progress) return;
    let p = progress;
    // Apply per-question deltas (already applied during quiz, but ensure consistency)
    const perfect = wrongCount === 0;
    p = completeLevel(p, levelId, perfect);
    saveProgress(p);
    setProgress(p);
    if (levelId === totalLevels) {
      setView({ kind: "finale" });
    } else {
      setView({
        kind: "complete",
        levelId,
        perfect,
        xpGained: 50 + (perfect ? 25 : 0) + correctCount * 10,
        coinsGained: 20 + correctCount * 5,
      });
    }
  };

  const handleHeartsLost = (levelId: number) => {
    setView({ kind: "out-of-hearts", levelId });
  };

  const applyQuizDelta = (delta: Partial<Progress>) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...delta };
      saveProgress(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <PageHeader title="Major Money Quest" subtitle="Learn money skills one mission at a time." />

        <section className="mx-auto max-w-6xl px-5 lg:px-8 pb-24">
          <AnimatePresence mode="wait">
            {view.kind === "loading" && (
              <motion.div key="loading" className="text-center py-16 text-muted-foreground">Loading your quest…</motion.div>
            )}

            {view.kind === "onboarding" && (
              <Onboarding key="onboarding" onCreate={handleProfileCreated} />
            )}

            {view.kind === "dashboard" && profile && progress && (
              <Dashboard
                key="dashboard"
                profile={profile}
                progress={progress}
                onStart={startLevel}
                onSwitch={handleSwitchProfile}
                onReset={handleResetProgress}
              />
            )}

            {view.kind === "quiz" && progress && (
              <Quiz
                key={`quiz-${view.levelId}`}
                levelId={view.levelId}
                progress={progress}
                onApply={applyQuizDelta}
                onHeartsLost={() => handleHeartsLost(view.levelId)}
                onFinish={(c, w) => handleQuizFinish(view.levelId, c, w)}
                onExit={() => setView({ kind: "dashboard" })}
              />
            )}

            {view.kind === "complete" && (
              <LevelComplete
                key={`done-${view.levelId}`}
                levelId={view.levelId}
                perfect={view.perfect}
                xpGained={view.xpGained}
                coinsGained={view.coinsGained}
                onContinue={() => setView({ kind: "dashboard" })}
                onNext={() => startLevel(view.levelId + 1)}
                hasNext={view.levelId < totalLevels}
              />
            )}

            {view.kind === "out-of-hearts" && (
              <OutOfHearts
                key="ohh"
                levelId={view.levelId}
                onReview={() => setView({ kind: "dashboard" })}
                onRefill={() => {
                  if (!progress) return;
                  const next = refillHearts(progress);
                  saveProgress(next);
                  setProgress(next);
                  setView({ kind: "dashboard" });
                }}
              />
            )}

            {view.kind === "finale" && profile && progress && (
              <Finale
                key="finale"
                profile={profile}
                progress={progress}
                onReview={() => setView({ kind: "dashboard" })}
                onReset={handleResetProgress}
              />
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Onboarding ---------- */

function Onboarding({ onCreate }: { onCreate: (p: Profile) => void }) {
  const existingUsers = useMemo(() => (typeof window !== "undefined" ? listUsers() : []), []);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [school, setSchool] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("coins");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !email.trim() || !gradeLevel.trim()) {
      setError("Please fill in your name, email, and grade level.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!agreed) {
      setError("Please confirm you understand local browser storage.");
      return;
    }
    onCreate({
      displayName: displayName.trim(),
      email: email.trim().toLowerCase(),
      gradeLevel: gradeLevel.trim(),
      school: school.trim() || undefined,
      avatar,
      createdAt: new Date().toISOString(),
    });
  };

  const useExisting = (p: Profile) => onCreate(p);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid lg:grid-cols-[1.3fr_1fr] gap-8"
    >
      <form onSubmit={submit} className="bg-surface/60 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 space-y-5">
        <h2 className="font-stencil text-2xl md:text-3xl tracking-wider">Create Player Profile</h2>
        <p className="text-sm text-muted-foreground">Progress saves in this browser. Use the same email to switch back to this profile later.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Display name">
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Alex" />
          </Field>
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Grade level">
            <Input value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} placeholder="e.g. 10th grade" />
          </Field>
          <Field label="School (optional)">
            <Input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Lincoln High" />
          </Field>
        </div>

        <div>
          <div className="text-xs font-stencil tracking-widest text-muted-foreground mb-2">CHOOSE AVATAR</div>
          <div className="grid grid-cols-6 gap-2">
            {avatarOptions.map((a) => {
              const Icon = AVATAR_ICONS[a.id];
              const active = avatar === a.id;
              return (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => setAvatar(a.id)}
                  className={`aspect-square grid place-items-center rounded-xl border transition ${
                    active ? "border-primary bg-primary/10 text-primary red-glow-sm" : "border-border hover:border-primary/60 text-foreground/80"
                  }`}
                  aria-label={a.label}
                >
                  <Icon className="size-5 md:size-6" />
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5" />
          <span>I understand this saves progress on this browser for now.</span>
        </label>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <Button type="submit" className="w-full font-stencil tracking-widest red-glow-sm" size="lg">
          CREATE PLAYER PROFILE
        </Button>
      </form>

      <div className="space-y-4">
        <div className="bg-surface/60 border border-border rounded-2xl p-6">
          <h3 className="font-stencil tracking-widest text-sm text-primary mb-3">WHAT YOU UNLOCK</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2"><Sparkles className="size-4 text-primary mt-0.5 shrink-0" /> 10 worlds · 50 missions across budgeting, credit, investing, taxes, scams, inflation.</li>
            <li className="flex gap-2"><Flame className="size-4 text-primary mt-0.5 shrink-0" /> Streaks, XP, coins, hearts.</li>
            <li className="flex gap-2"><Trophy className="size-4 text-primary mt-0.5 shrink-0" /> Badges as you finish each world.</li>
          </ul>
        </div>

        {existingUsers.length > 0 && (
          <div className="bg-surface/60 border border-border rounded-2xl p-6">
            <h3 className="font-stencil tracking-widest text-sm text-primary mb-3">CONTINUE AS</h3>
            <div className="space-y-2">
              {existingUsers.map((u) => {
                const Icon = AVATAR_ICONS[u.avatar] ?? Coins;
                return (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => useExisting(u)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-border hover:border-primary/60 hover:bg-primary/5 transition text-left"
                  >
                    <span className="size-9 grid place-items-center rounded-full bg-primary/10 text-primary"><Icon className="size-4" /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold truncate">{u.displayName}</span>
                      <span className="block text-xs text-muted-foreground truncate">{u.email}</span>
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-stencil tracking-widest text-muted-foreground mb-1.5">{label.toUpperCase()}</span>
      {children}
    </label>
  );
}

/* ---------- Dashboard ---------- */

function Dashboard({
  profile, progress, onStart, onSwitch, onReset,
}: {
  profile: Profile; progress: Progress;
  onStart: (id: number) => void;
  onSwitch: () => void;
  onReset: () => void;
}) {
  const Avatar = AVATAR_ICONS[profile.avatar] ?? Coins;
  const completedCount = progress.completedLessons.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
      {/* Header card */}
      <div className="bg-surface/60 backdrop-blur-sm border border-border rounded-2xl p-5 md:p-6 flex flex-wrap items-center gap-5">
        <div className="size-14 grid place-items-center rounded-full bg-primary/15 text-primary border border-primary/40">
          <Avatar className="size-6" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="text-xs font-stencil tracking-widest text-muted-foreground">WELCOME BACK</div>
          <div className="font-stencil text-xl md:text-2xl">{profile.displayName}</div>
          <div className="text-xs text-muted-foreground">{profile.gradeLevel}{profile.school ? ` · ${profile.school}` : ""}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onSwitch}><LogOut className="size-4" />Switch Profile</Button>
          <Button variant="outline" size="sm" onClick={onReset}><RotateCcw className="size-4" />Reset Progress</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat icon={Sparkles} label="XP" value={progress.xp.toLocaleString()} />
        <Stat icon={Coins} label="Coins" value={progress.coins.toLocaleString()} />
        <Stat icon={Flame} label="Streak" value={`${progress.streak}d`} />
        <Stat icon={Heart} label="Hearts" value={`${progress.hearts}/${progress.maxHearts}`} />
        <Stat icon={Trophy} label="Levels" value={`${completedCount}/${totalLevels}`} />
      </div>

      {/* Badges */}
      {progress.badgesEarned.length > 0 && (
        <div>
          <h3 className="font-stencil text-sm tracking-widest text-primary mb-3">BADGES EARNED</h3>
          <div className="flex flex-wrap gap-2">
            {progress.badgesEarned.map((b) => {
              const meta = allBadges.find((x) => x.id === b);
              return (
                <span key={b} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-stencil tracking-widest">
                  <Trophy className="size-3.5" />{meta?.label ?? b}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* World path */}
      <div className="space-y-10">
        {worlds.map((w) => {
          const WorldIcon = WORLD_ICONS[w.number - 1] ?? GraduationCap;
          const worldLevels = levels.filter((l) => l.world === w.number);
          return (
            <div key={w.number}>
              <div className="flex items-center gap-3 mb-5">
                <span className="size-11 grid place-items-center rounded-xl bg-primary/15 border border-primary/40 text-primary">
                  <WorldIcon className="size-5" />
                </span>
                <div>
                  <div className="text-[10px] font-stencil tracking-[0.3em] text-muted-foreground">WORLD {w.number}</div>
                  <div className="font-stencil text-lg md:text-xl tracking-wider">{w.title}</div>
                  <div className="text-xs text-muted-foreground">{w.subtitle}</div>
                </div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-5 gap-3 md:gap-5">
                {worldLevels.map((lvl, i) => {
                  const unlocked = progress.unlockedLessons.includes(lvl.id);
                  const completed = progress.completedLessons.includes(lvl.id);
                  const isCurrent = unlocked && !completed && lvl.id === progress.currentLevel;
                  // Winding offset
                  const offset = i % 2 === 0 ? "" : "translate-y-3 md:translate-y-5";
                  return (
                    <motion.button
                      key={lvl.id}
                      whileHover={unlocked ? { scale: 1.05 } : undefined}
                      whileTap={unlocked ? { scale: 0.97 } : undefined}
                      type="button"
                      disabled={!unlocked}
                      onClick={() => onStart(lvl.id)}
                      className={`relative aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 text-center ${offset} ${
                        completed
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : isCurrent
                            ? "border-primary bg-primary/15 text-primary red-glow-sm animate-pulse"
                            : unlocked
                              ? "border-border bg-surface/60 hover:border-primary/60"
                              : "border-border bg-surface/30 text-muted-foreground/60 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-[9px] font-stencil tracking-widest opacity-70">LVL {lvl.id}</span>
                      <span className="mt-1">
                        {completed ? <Check className="size-5" /> : !unlocked ? <Lock className="size-4" /> : <Sparkles className="size-5" />}
                      </span>
                      <span className="mt-1 text-[10px] leading-tight line-clamp-2">{lvl.title}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Coins; label: string; value: string }) {
  return (
    <div className="bg-surface/60 border border-border rounded-xl p-3 md:p-4 flex items-center gap-3">
      <span className="size-9 grid place-items-center rounded-lg bg-primary/15 text-primary"><Icon className="size-4" /></span>
      <div>
        <div className="text-[10px] font-stencil tracking-widest text-muted-foreground">{label.toUpperCase()}</div>
        <div className="font-stencil text-lg tabular-nums">{value}</div>
      </div>
    </div>
  );
}

/* ---------- Quiz ---------- */

type ShuffledQ = { original: Question; choices: { text: string; isCorrect: boolean }[] };

function Quiz({
  levelId, progress, onApply, onHeartsLost, onFinish, onExit,
}: {
  levelId: number;
  progress: Progress;
  onApply: (delta: Partial<Progress>) => void;
  onHeartsLost: () => void;
  onFinish: (correct: number, wrong: number) => void;
  onExit: () => void;
}) {
  const level = levels.find((l) => l.id === levelId)!;
  const shuffledQs = useMemo<ShuffledQ[]>(
    () => level.questions.map((q) => ({
      original: q,
      choices: shuffle(q.choices.map((text, idx) => ({ text, isCorrect: idx === q.correctIndex }))),
    })),
    [levelId, level.questions],
  );

  const [stage, setStage] = useState<"lesson" | "quiz">("lesson");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [localHearts, setLocalHearts] = useState(progress.hearts);

  const current = shuffledQs[qIndex];

  const choose = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const correct = current.choices[idx].isCorrect;
    if (correct) {
      setCorrectCount((c) => c + 1);
      const next = applyCorrect({ ...progress, hearts: localHearts });
      onApply({ xp: next.xp, coins: next.coins, totalCorrect: next.totalCorrect });
    } else {
      setWrongCount((w) => w + 1);
      const next = applyWrong({ ...progress, hearts: localHearts });
      setLocalHearts(next.hearts);
      onApply({ hearts: next.hearts, totalWrong: next.totalWrong });
      if (next.hearts <= 0) {
        setTimeout(onHeartsLost, 900);
        return;
      }
    }
  };

  const advance = () => {
    setSelected(null);
    setRevealed(false);
    if (qIndex + 1 < shuffledQs.length) {
      setQIndex((i) => i + 1);
    } else {
      onFinish(correctCount, wrongCount);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      {/* HUD */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onExit} className="text-xs font-stencil tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><X className="size-4" /> EXIT</button>
        <div className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1 text-primary"><Heart className="size-4 fill-primary" />{localHearts}</span>
          <span className="inline-flex items-center gap-1"><Sparkles className="size-4 text-primary" />{progress.xp}</span>
        </div>
      </div>

      <div className="text-xs font-stencil tracking-widest text-primary mb-1">WORLD {level.world} · LEVEL {level.id}</div>
      <h2 className="font-stencil text-2xl md:text-3xl mb-6">{level.title}</h2>

      {stage === "lesson" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface/60 border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <p className="text-foreground/90 leading-relaxed">{level.lesson}</p>
          <Button onClick={() => setStage("quiz")} size="lg" className="font-stencil tracking-widest red-glow-sm">START QUEST</Button>
        </motion.div>
      ) : (
        <div>
          <div className="mb-4 h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${((qIndex + (revealed ? 1 : 0)) / shuffledQs.length) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
          <div className="text-xs text-muted-foreground mb-3">Question {qIndex + 1} of {shuffledQs.length}</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-surface/60 border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="font-stencil text-lg md:text-xl mb-5">{current.original.prompt}</div>
              <div className="grid gap-2">
                {current.choices.map((c, i) => {
                  const isSel = selected === i;
                  const showCorrect = revealed && c.isCorrect;
                  const showWrong = revealed && isSel && !c.isCorrect;
                  return (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={`text-left px-4 py-3 rounded-xl border transition ${
                        showCorrect
                          ? "border-green-500/70 bg-green-500/10 text-green-300"
                          : showWrong
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : isSel
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/60 hover:bg-primary/5"
                      }`}
                    >
                      <span className="font-stencil text-xs tracking-widest text-muted-foreground mr-3">{String.fromCharCode(65 + i)}</span>
                      {c.text}
                    </motion.button>
                  );
                })}
              </div>

              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 p-4 rounded-xl border ${
                    current.choices[selected!]?.isCorrect
                      ? "border-green-500/40 bg-green-500/5 text-green-200"
                      : "border-destructive/40 bg-destructive/5"
                  }`}
                >
                  <div className="text-xs font-stencil tracking-widest mb-1">
                    {current.choices[selected!]?.isCorrect ? "CORRECT · +10 XP · +5 COINS" : "NOT QUITE · -1 HEART"}
                  </div>
                  <div className="text-sm">{current.original.feedback}</div>
                  <div className="mt-3 flex justify-end">
                    <Button onClick={advance} className="font-stencil tracking-widest">
                      {qIndex + 1 < shuffledQs.length ? "NEXT" : "FINISH"} <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/* ---------- Level Complete ---------- */

function LevelComplete({
  levelId, perfect, xpGained, coinsGained, onContinue, onNext, hasNext,
}: {
  levelId: number; perfect: boolean; xpGained: number; coinsGained: number;
  onContinue: () => void; onNext: () => void; hasNext: boolean;
}) {
  const level = levels.find((l) => l.id === levelId)!;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto text-center bg-surface/60 border border-border rounded-2xl p-8 md:p-10"
    >
      <div className="size-16 mx-auto grid place-items-center rounded-full bg-primary/15 text-primary border border-primary/40 red-glow-sm">
        <Trophy className="size-7" />
      </div>
      <div className="mt-4 text-xs font-stencil tracking-widest text-primary">LEVEL {levelId} COMPLETE</div>
      <h2 className="font-stencil text-2xl md:text-3xl mt-1">{level.title}</h2>
      {perfect && <div className="mt-2 inline-flex items-center gap-1 text-xs font-stencil tracking-widest text-primary"><Sparkles className="size-3.5" /> PERFECT RUN · +25 BONUS XP</div>}

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Stat icon={Sparkles} label="XP gained" value={`+${xpGained}`} />
        <Stat icon={Coins} label="Coins gained" value={`+${coinsGained}`} />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onContinue} className="font-stencil tracking-widest">REVIEW LESSON</Button>
        {hasNext && (
          <Button onClick={onNext} className="font-stencil tracking-widest red-glow-sm">NEXT LEVEL <ArrowRight className="size-4" /></Button>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- Out of hearts ---------- */

function OutOfHearts({ levelId, onReview, onRefill }: { levelId: number; onReview: () => void; onRefill: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto text-center bg-surface/60 border border-border rounded-2xl p-8"
    >
      <Heart className="size-10 mx-auto text-destructive" />
      <h2 className="font-stencil text-2xl mt-3">Out of hearts</h2>
      <p className="text-sm text-muted-foreground mt-2">Review the lesson and try again. Level {levelId} is still waiting.</p>
      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
        <Button variant="outline" onClick={onReview} className="font-stencil tracking-widest">REVIEW LESSON</Button>
        <Button onClick={onRefill} className="font-stencil tracking-widest red-glow-sm">REFILL & TRY AGAIN</Button>
      </div>
    </motion.div>
  );
}

/* ---------- Finale ---------- */

function Finale({ profile, progress, onReview, onReset }: { profile: Profile; progress: Progress; onReview: () => void; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto bg-surface/60 border border-primary/40 red-glow-sm rounded-2xl p-8 md:p-12 text-center"
    >
      <Trophy className="size-14 mx-auto text-primary" />
      <h2 className="font-stencil text-3xl md:text-4xl mt-4">You Completed Major Money Quest</h2>
      <p className="text-foreground/80 mt-3 max-w-xl mx-auto">
        Congrats, {profile.displayName}. You mastered the foundations of budgeting, saving, credit, debt, investing, taxes, consumer protection, and real-world money decisions. Keep building your future one smart choice at a time.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 text-left">
        <Stat icon={Sparkles} label="Total XP" value={progress.xp.toLocaleString()} />
        <Stat icon={Coins} label="Coins" value={progress.coins.toLocaleString()} />
        <Stat icon={TrendingUp} label="Accuracy" value={`${accuracy(progress)}%`} />
        <Stat icon={Flame} label="Streak" value={`${progress.streak}d`} />
      </div>

      {progress.badgesEarned.length > 0 && (
        <div className="mt-8">
          <div className="text-xs font-stencil tracking-widest text-primary mb-3">BADGES</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {progress.badgesEarned.map((b) => {
              const meta = allBadges.find((x) => x.id === b);
              return (
                <span key={b} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-stencil tracking-widest">
                  <Trophy className="size-3.5" />{meta?.label ?? b}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onReview} className="font-stencil tracking-widest">REVIEW LEVELS</Button>
        <Button onClick={onReset} className="font-stencil tracking-widest red-glow-sm">RESET AND REPLAY</Button>
      </div>
    </motion.div>
  );
}
