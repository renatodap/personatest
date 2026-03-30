"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Screen = "landing" | "q1" | "q2" | "q3" | "loading" | "surprise";
type SurprisePhase = "result-card" | "card-fadeout" | "photo-reveal";

const questions: {
  screen: Screen;
  question: string;
  options: { emoji: string; label: string }[];
}[] = [
  {
    screen: "q1",
    question: "What environment energizes you most?",
    options: [
      { emoji: "\u{1F30A}", label: "Ocean" },
      { emoji: "\u{1F333}", label: "Forest" },
      { emoji: "\u{1F3D9}\uFE0F", label: "City" },
      { emoji: "\u26F0\uFE0F", label: "Mountains" },
    ],
  },
  {
    screen: "q2",
    question: "How do you handle pressure?",
    options: [
      { emoji: "\u{1F9CA}", label: "Freeze & analyze" },
      { emoji: "\u26A1", label: "React first" },
      { emoji: "\u{1F91D}", label: "Ask for help" },
      { emoji: "\u{1F6A2}", label: "Ignore & push through" },
    ],
  },
  {
    screen: "q3",
    question: "What drives you most?",
    options: [
      { emoji: "\u{1F30D}", label: "Adventure" },
      { emoji: "\u{1F495}", label: "Connection" },
      { emoji: "\u{1F3C6}", label: "Achievement" },
      { emoji: "\u{1F54A}\uFE0F", label: "Peace" },
    ],
  },
];

function TypewriterText({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 70);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse-slow">|</span>}
    </span>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [transitioning, setTransitioning] = useState(false);

  // Surprise phase states
  const [surprisePhase, setSurprisePhase] = useState<SurprisePhase>("result-card");
  const [showName, setShowName] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  const goTo = useCallback((next: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 300);
  }, []);

  // Loading → surprise transition
  useEffect(() => {
    if (screen === "loading") {
      const timer = setTimeout(() => goTo("surprise"), 3500);
      return () => clearTimeout(timer);
    }
  }, [screen, goTo]);

  // Surprise phase orchestration
  useEffect(() => {
    if (screen !== "surprise") return;

    if (surprisePhase === "result-card") {
      // Show name after 1 second
      const nameTimer = setTimeout(() => setShowName(true), 1000);
      return () => clearTimeout(nameTimer);
    }
  }, [screen, surprisePhase]);

  useEffect(() => {
    if (!showName) return;
    // After name appears, wait 1.5s then fade out card
    const fadeTimer = setTimeout(() => setSurprisePhase("card-fadeout"), 1500);
    return () => clearTimeout(fadeTimer);
  }, [showName]);

  useEffect(() => {
    if (surprisePhase !== "card-fadeout") return;
    // After fade-out animation (1.5s), show photo
    const revealTimer = setTimeout(() => setSurprisePhase("photo-reveal"), 1500);
    return () => clearTimeout(revealTimer);
  }, [surprisePhase]);

  // Typewriter → second line
  useEffect(() => {
    if (typewriterDone) {
      const timer = setTimeout(() => setShowSecondLine(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [typewriterDone]);

  const questionIndex =
    screen === "q1" ? 0 : screen === "q2" ? 1 : screen === "q3" ? 2 : -1;
  const nextScreen: Record<string, Screen> = {
    q1: "q2",
    q2: "q3",
    q3: "loading",
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen px-6">
      <div
        className={`w-full max-w-lg transition-opacity duration-300 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Landing */}
        {screen === "landing" && (
          <div className="animate-fade-in flex flex-col items-center text-center gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Persona<span className="text-violet-400">Test</span>
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Discover your personality in 3 questions.
              </p>
            </div>
            <button
              onClick={() => goTo("q1")}
              className="px-8 py-3.5 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl transition-colors text-lg cursor-pointer"
            >
              Start Quiz &rarr;
            </button>
            <p className="text-xs text-zinc-600">Takes less than 30 seconds</p>
          </div>
        )}

        {/* Questions */}
        {questionIndex >= 0 && (
          <div className="animate-fade-in flex flex-col items-center gap-8">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-12 rounded-full transition-colors ${
                    i <= questionIndex ? "bg-violet-500" : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-zinc-500 font-medium">
              {questionIndex + 1} / 3
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-center leading-snug">
              {questions[questionIndex].question}
            </h2>

            <div className="grid grid-cols-2 gap-3 w-full">
              {questions[questionIndex].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => goTo(nextScreen[screen])}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-violet-500/60 hover:bg-violet-500/10 transition-all cursor-pointer"
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-sm font-medium text-zinc-300">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {screen === "loading" && (
          <div className="animate-fade-in flex flex-col items-center gap-6">
            <h2 className="text-xl font-semibold">Analyzing your profile...</h2>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full animate-progress" />
            </div>
            <p className="text-sm text-zinc-500 animate-pulse-slow">
              Matching personality patterns
            </p>
          </div>
        )}

        {/* Surprise — Phase 1: Result Card */}
        {screen === "surprise" && surprisePhase !== "photo-reveal" && (
          <div
            className={`animate-fade-in flex flex-col items-center transition-opacity duration-[1500ms] ${
              surprisePhase === "card-fadeout" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-full max-w-md border border-zinc-800 rounded-2xl bg-zinc-900/70 p-8 sm:p-10 text-center">
              <p className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase">
                Your Personality Type
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                The One <span className="text-violet-400">&#10022;</span>
              </h2>

              <p className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-violet-400/80 uppercase">
                Rarest Type &bull; Top 0.1%
              </p>

              <div className="my-6 h-px bg-zinc-800" />

              <div className="flex flex-col gap-3 text-left text-sm text-zinc-300">
                <p>
                  <span className="text-violet-400">&#10022;</span> Authentic to
                  the core
                </p>
                <p>
                  <span className="text-violet-400">&#10022;</span> Impossible
                  to ignore
                </p>
                <p>
                  <span className="text-violet-400">&#10022;</span> Highest
                  compatibility match found
                </p>
              </div>

              <div className="my-6 h-px bg-zinc-800" />

              <p className="text-sm text-zinc-500">
                Highest compatibility with:
              </p>
              <div className="h-10 flex items-center justify-center">
                {showName && (
                  <p className="text-2xl font-bold text-white animate-fade-in">
                    Renato
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Surprise — Phase 2: Photo Reveal */}
        {screen === "surprise" && surprisePhase === "photo-reveal" && (
          <div className="animate-fade-in-slow flex flex-col items-center gap-8 text-center">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10">
              <Image
                src="/foto.jpg"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-2xl sm:text-3xl font-semibold">
                <TypewriterText
                  text="tu eres mi favorita ❤️"
                  onComplete={() => setTypewriterDone(true)}
                />
              </p>

              {showSecondLine && (
                <p className="text-xl text-zinc-400 animate-fade-in-delayed">
                  te quiero
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
