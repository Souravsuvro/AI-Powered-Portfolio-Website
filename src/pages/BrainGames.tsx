import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton,
  TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton,
} from "react-share";

type Difficulty = "easy" | "medium" | "hard";
type GameId = "memory" | "reaction" | "math" | "simon";
type GameProps = {
  difficulty: Difficulty;
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
};

const triggerHaptic = (pattern: number | number[] = 40) => {
  try { navigator.vibrate?.(pattern); } catch { /* unsupported */ }
};

let audioCtx: AudioContext | null = null;
const unlockAudio = () => {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
};

const playTone = (freq: number, duration = 0.16) => {
  const ac = unlockAudio();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration + 0.02);
};

const SYMBOLS = ["N", "E", "S", "W", "A", "B", "C", "D", "K", "M", "P", "R"];

const MemoryMatch: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const pairs = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10;
  const [cards, setCards] = useState<{ id: number; symbol: string }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const lock = useRef(false);

  useEffect(() => {
    const chosen = SYMBOLS.slice(0, pairs);
    const deck = [...chosen, ...chosen].sort(() => Math.random() - 0.5).map((symbol, id) => ({ id, symbol }));
    setCards(deck); setFlipped([]); setMatched([]); setScore(0); setMoves(0); lock.current = false;
  }, [pairs]);

  const handleFlip = (index: number) => {
    if (lock.current || flipped.includes(index) || matched.includes(index)) return;
    unlockAudio(); triggerHaptic(20); playTone(280 + index * 12, 0.08);
    const next = [...flipped, index];
    setFlipped(next);
    if (next.length < 2) return;
    lock.current = true;
    setMoves((m) => m + 1);
    const [a, b] = next;
    if (cards[a].symbol === cards[b].symbol) {
      const nextMatched = [...matched, a, b];
      const nextScore = score + 100;
      setMatched(nextMatched); setScore(nextScore); onScoreChange(nextScore); setFlipped([]); lock.current = false; playTone(620, 0.12);
      if (nextMatched.length === cards.length) window.setTimeout(() => onGameOver(nextScore), 400);
    } else {
      playTone(140, 0.12);
      window.setTimeout(() => { setFlipped([]); lock.current = false; }, 650);
    }
  };

  return (
    <div className="px-4 text-center">
      <div className="mx-auto mb-6 flex max-w-2xl justify-between text-sm text-gray-400">
        <span>Score {score}</span><span>Moves {moves}</span>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
        {cards.map((card, i) => {
          const show = flipped.includes(i) || matched.includes(i);
          return (
            <button key={card.id} type="button" onClick={() => handleFlip(i)}
              className={`flex aspect-square items-center justify-center rounded-2xl border-2 text-2xl font-semibold transition ${
                show ? "border-indigo-400 bg-gray-800" : "border-gray-700 bg-gray-900"}`}>{show ? card.symbol : ""}</button>
          );
        })}
      </div>
    </div>
  );
};

const ReactionTime: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "done">("idle");
  const [ms, setMs] = useState(0);
  const start = useRef(0);
  const timer = useRef<number>(0);
  const windowMs = difficulty === "easy" ? 2800 : difficulty === "medium" ? 1800 : 1100;

  const arm = () => {
    unlockAudio(); window.clearTimeout(timer.current); setPhase("wait");
    timer.current = window.setTimeout(() => {
      start.current = performance.now(); setPhase("go"); playTone(540, 0.1); triggerHaptic(20);
    }, 900 + Math.random() * windowMs);
  };

  const tap = () => {
    if (phase === "wait") { window.clearTimeout(timer.current); setPhase("early"); playTone(110, 0.18); return; }
    if (phase === "go") {
      const elapsed = Math.round(performance.now() - start.current);
      const nextScore = Math.max(0, 1000 - elapsed);
      setMs(elapsed); setPhase("done"); onScoreChange(nextScore); onGameOver(nextScore); playTone(720, 0.12);
    }
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button type="button" onClick={phase === "idle" || phase === "early" ? arm : tap}
      className={`mx-auto flex min-h-72 w-full max-w-lg flex-col items-center justify-center rounded-3xl border-2 border-gray-700 p-8 text-3xl font-semibold ${
        phase === "go" ? "bg-indigo-500 text-white" : "bg-gray-900"}`}>
      {phase === "idle" && "Tap to arm"}{phase === "wait" && "Wait…"}{phase === "go" && "Now"}
      {phase === "early" && "Too soon — tap to retry"}{phase === "done" && `${ms} ms`}
    </button>
  );
};

type Op = "+" | "-" | "*";
const compute = (a: number, op: Op, b: number) => (op === "+" ? a + b : op === "-" ? a - b : a * b);
const nextMath = (difficulty: Difficulty) => {
  const ops: Op[] = difficulty === "easy" ? ["+", "-"] : ["+", "-", "*"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const max = difficulty === "hard" ? 30 : 20;
  let a = 1 + Math.floor(Math.random() * max);
  let b = 1 + Math.floor(Math.random() * (op === "*" ? 12 : max));
  if (op === "-" && b > a) [a, b] = [b, a];
  return { a, op, b, answer: compute(a, op, b) };
};

const MathSprint: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const seconds = difficulty === "easy" ? 45 : difficulty === "medium" ? 35 : 25;
  const [left, setLeft] = useState(seconds);
  const [q, setQ] = useState(() => nextMath(difficulty));
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const ended = useRef(false);

  useEffect(() => {
    ended.current = false; setLeft(seconds); setScore(0); setCorrect(0); setQ(nextMath(difficulty)); setValue("");
  }, [difficulty, seconds]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          if (!ended.current) { ended.current = true; onGameOver(score); }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [difficulty, onGameOver, score]);

  const submit = () => {
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n)) return;
    unlockAudio(); triggerHaptic(30);
    if (n === q.answer) {
      const next = score + 40; setScore(next); setCorrect((c) => c + 1); onScoreChange(next); playTone(660, 0.1);
    } else playTone(160, 0.12);
    setQ(nextMath(difficulty)); setValue("");
  };

  return (
    <div className="mx-auto max-w-md px-4 text-center">
      <div className="mb-8 flex justify-between text-lg text-gray-400"><span>Score {score}</span><span>{left}s</span></div>
      <p className="mb-8 min-h-[80px] text-5xl font-bold">{q.a} {q.op === "*" ? "×" : q.op} {q.b}</p>
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <input value={value} onChange={(e) => setValue(e.target.value.replace(/[^\d-]/g, ""))}
          className="w-full border-b-4 border-indigo-500 bg-transparent py-4 text-center text-4xl outline-none"
          inputMode="numeric" aria-label="Answer" autoFocus />
        <button type="submit" className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg">Check · {correct} correct</button>
      </form>
    </div>
  );
};

const PADS = [
  { color: "#ef4444", freq: 329.63 }, { color: "#3b82f6", freq: 392 },
  { color: "#22c55e", freq: 261.63 }, { color: "#eab308", freq: 440 },
];

const SimonSays: React.FC<GameProps> = ({ difficulty, onScoreChange, onGameOver }) => {
  const pace = difficulty === "easy" ? 700 : difficulty === "medium" ? 520 : 380;
  const [seq, setSeq] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"ready" | "watch" | "repeat">("ready");
  const lock = useRef(true);
  const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

  const playback = useCallback(async (next: number[]) => {
    setStatus("watch"); lock.current = true;
    for (const idx of next) {
      await wait(pace); setLit(idx); playTone(PADS[idx].freq, 0.18); triggerHaptic(40);
      await wait(Math.max(180, pace - 120)); setLit(null);
    }
    setStatus("repeat"); setStep(0); lock.current = false;
  }, [pace]);

  const start = () => {
    unlockAudio();
    const first = [Math.floor(Math.random() * 4)];
    setSeq(first); setScore(0); void playback(first);
  };

  const press = (index: number) => {
    if (lock.current || status !== "repeat") return;
    setLit(index); playTone(PADS[index].freq, 0.16); triggerHaptic(30);
    window.setTimeout(() => setLit(null), 140);
    if (index !== seq[step]) { onGameOver(score); return; }
    const nextStep = step + 1;
    if (nextStep === seq.length) {
      const nextScore = score + seq.length * 50;
      setScore(nextScore); onScoreChange(nextScore);
      const grown = [...seq, Math.floor(Math.random() * 4)];
      setSeq(grown); void playback(grown);
    } else setStep(nextStep);
  };

  return (
    <div className="px-4 text-center">
      <p className="mb-6 text-3xl font-bold">Score {score}</p>
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-4">
        {PADS.map((pad, index) => (
          <button key={pad.color} type="button" onClick={() => press(index)}
            className="h-28 rounded-3xl shadow-2xl transition active:scale-95 md:h-36"
            style={{ backgroundColor: pad.color, opacity: lit === index ? 1 : 0.7 }}
            aria-label={`Pad ${index + 1}`} />
        ))}
      </div>
      {status === "ready" ? (
        <button type="button" onClick={start} className="mt-8 rounded-2xl bg-indigo-600 px-8 py-4 text-lg">Start sequence</button>
      ) : (
        <p className="mt-6 text-sm text-gray-400">{status === "watch" ? "Watch" : "Your turn"}</p>
      )}
    </div>
  );
};

const GAME_META: { id: GameId; name: string; desc: string }[] = [
  { id: "memory", name: "Memory Match", desc: "Match pairs of cards" },
  { id: "reaction", name: "Reaction Time", desc: "Wait for the signal, then tap" },
  { id: "math", name: "Math Sprint", desc: "Solve equations against the clock" },
  { id: "simon", name: "Simon Says", desc: "Repeat the sequence" },
];

const BrainGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const names = useMemo(() => Object.fromEntries(GAME_META.map((g) => [g.id, g.name])) as Record<GameId, string>, []);

  useEffect(() => {
    try { setBestScores(JSON.parse(localStorage.getItem("brainGameBestScores") || "{}")); }
    catch { setBestScores({}); }
  }, []);

  const saveBest = (gid: GameId, sc: number) => {
    const k = `${gid}-${difficulty}`;
    const next = { ...bestScores, [k]: Math.max(bestScores[k] || 0, sc) };
    try { localStorage.setItem("brainGameBestScores", JSON.stringify(next)); } catch { /* ignore */ }
    setBestScores(next);
  };

  const handleOver = (sc: number) => {
    if (selectedGame) saveBest(selectedGame, sc);
    setCurrentScore(sc); setGameOver(true);
  };

  const reset = () => { setSelectedGame(null); setGameOver(false); setCurrentScore(0); };
  const shareUrl = `${siteUrl}/games`;
  const shareTitle = selectedGame ? `Scored ${currentScore} on ${names[selectedGame]} (${difficulty}) at Sourav Sarker Labs` : "";

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="mb-8 inline-flex text-indigo-400 hover:text-indigo-300">Home</Link>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">Brain Games</h1>
          <p className="text-xl text-gray-400">Challenge yourself. Beat records. Share victories.</p>
        </div>
        {!selectedGame ? (
          <div className="grid gap-6 md:grid-cols-2">
            {GAME_META.map((g) => (
              <div key={g.id} className="rounded-3xl border border-gray-700 bg-gray-900 p-8">
                <h3 className="mb-3 text-3xl font-bold">{g.name}</h3>
                <p className="mb-8 text-gray-400">{g.desc}</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["easy", "medium", "hard"] as const).map((d) => (
                    <button key={d} type="button" onClick={() => {
                      unlockAudio(); setSelectedGame(g.id); setDifficulty(d); setGameOver(false); setCurrentScore(0);
                    }} className="rounded-2xl border border-gray-700 py-4 text-sm font-semibold capitalize hover:bg-white hover:text-black">{d}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[500px] rounded-3xl bg-gray-900 p-8 md:p-12">
            <button type="button" onClick={reset} className="mb-6 text-sm text-gray-400 hover:text-white">All games</button>
            {selectedGame === "memory" && <MemoryMatch difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === "reaction" && <ReactionTime difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === "math" && <MathSprint difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
            {selectedGame === "simon" && <SimonSays difficulty={difficulty} onScoreChange={setCurrentScore} onGameOver={handleOver} />}
          </div>
        )}
        {gameOver && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4">
            <div className="w-full max-w-lg rounded-3xl border border-indigo-500/40 bg-gray-900 p-10 text-center">
              <h2 className="mb-4 text-4xl font-bold">Result</h2>
              <div className="mb-8 font-mono text-7xl text-indigo-400">{currentScore}</div>
              <div className="mb-10 flex justify-center gap-4">
                <TwitterShareButton url={shareUrl} title={shareTitle}><TwitterIcon size={48} round /></TwitterShareButton>
                <FacebookShareButton url={shareUrl} title={shareTitle}><FacebookIcon size={48} round /></FacebookShareButton>
                <LinkedinShareButton url={shareUrl} title={shareTitle}><LinkedinIcon size={48} round /></LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareTitle}><WhatsappIcon size={48} round /></WhatsappShareButton>
              </div>
              <button type="button" onClick={reset} className="rounded-2xl bg-white px-12 py-5 text-xl font-bold text-black">Play again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrainGames;
