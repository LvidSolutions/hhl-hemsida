/**
 * Shared constants for the homepage intro sequence (Features 2A + 2B).
 * HomeIntro (the text intro + curtain panel) and HeroReveal (the hero's
 * counter-settle) coordinate through these — no context provider needed.
 */
export const INTRO_SESSION_KEY = "hhl-intro-played";
export const INTRO_EXIT_EVENT = "hhl:intro-exit";

/** Total hold before the panel lifts (ms). */
export const INTRO_HOLD_MS = 3000;
/** Curtain lift duration (s). */
export const PANEL_DURATION = 1.0;
/** Steady, architectural panel easing — accelerate gently, settle firmly. */
export const PANEL_EASE: [number, number, number, number] = [0.7, 0, 0.3, 1];

/** True if the intro will not play in this session/environment. */
export function introAlreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
