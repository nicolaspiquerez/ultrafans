import { useState, useEffect } from "react";

// ── Configuration ──────────────────────────────────────────────
// Change EPOCH to reset the counter. The counter will read as
// BASE_COUNT at this exact moment and grow from there.
const EPOCH = new Date("2026-03-04T12:00:00Z").getTime();
const BASE_COUNT = 2500;
const GAIN_PER_DAY = 500;              // ~500 signups per 24 h
const TICK_SLOT_SECONDS = 60;          // one "slot" = 60 s

// ── Deterministic pseudo-random (splitmix32) ───────────────────
// Gives a repeatable 0-1 float for any integer seed so every
// visitor computes the same sequence.
function splitmix32(seed: number): number {
  seed |= 0;
  seed = (seed + 0x9e3779b9) | 0;
  let t = seed ^ (seed >>> 16);
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ (t >>> 15);
  t = Math.imul(t, 0x735a2d97);
  t = t ^ (t >>> 15);
  return (t >>> 0) / 4294967296;       // 0 … 1
}

// ── Core: compute count at a given timestamp ───────────────────
// Walks every 60-s slot since EPOCH. Each slot has a ~40 % chance
// of adding 1 signup and a ~8 % chance of adding 2, yielding
// roughly 500 / day on average. The daily total is hard-capped so
// it never exceeds GAIN_PER_DAY in any calendar-day window.
const SLOTS_PER_DAY = (86_400 / TICK_SLOT_SECONDS); // 1440

function countAt(now: number): number {
  if (now <= EPOCH) return BASE_COUNT;

  const elapsedMs = now - EPOCH;
  const totalSlots = Math.floor(elapsedMs / (TICK_SLOT_SECONDS * 1000));
  const fullDays = Math.floor(totalSlots / SLOTS_PER_DAY);
  const remainderSlots = totalSlots % SLOTS_PER_DAY;

  // Full days: each adds exactly GAIN_PER_DAY (cap is always hit)
  let total = BASE_COUNT + fullDays * GAIN_PER_DAY;

  // Current partial day: walk only today's slots (max 1440)
  const dayOffset = fullDays * SLOTS_PER_DAY;
  let dayAdded = 0;

  for (let i = 0; i < remainderSlots; i++) {
    if (dayAdded >= GAIN_PER_DAY) break;

    const r = splitmix32(dayOffset + i + 1);
    let inc = 0;
    if (r < 0.08) inc = 2;       // ~8 % → +2
    else if (r < 0.40) inc = 1;  // ~32 % → +1

    inc = Math.min(inc, GAIN_PER_DAY - dayAdded);
    total += inc;
    dayAdded += inc;
  }

  return total;
}

// ── React hook ─────────────────────────────────────────────────
// Recomputes every ~30-60 s so the number ticks up in front of
// the visitor. All visitors see the same value at the same moment.
export function useWaitlistCounter() {
  const [count, setCount] = useState(() => countAt(Date.now()));

  useEffect(() => {
    const refresh = () => setCount(countAt(Date.now()));

    const schedule = () => {
      // Next tick in 30-60 s (random per visitor for visual variety,
      // but the resulting count is still deterministic).
      const delay = 30_000 + Math.random() * 30_000;
      return setTimeout(() => {
        refresh();
        timeoutId = schedule();
      }, delay);
    };

    let timeoutId = schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  return { count };
}
