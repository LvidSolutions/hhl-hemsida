/**
 * Shared constants for the homepage intro sequence (components/HomeIntro.tsx).
 *
 * Timeline (ms from mount):
 *   0          overlay visible, wordmark rises in — uniform burgundy
 *   REVEAL_DELAY_MS                       image plate starts loading in,
 *                                         rising 0→100% over REVEAL_DURATION_MS
 *   REVEAL_DELAY_MS + REVEAL_DURATION_MS  plate full; letters over it inverted
 *   …then the plate shows a new project photo every FLASH_LOOP_MS until the
 *   user scrolls (wheel / touch / key) — the panel then rolls upward over
 *   PANEL_DURATION and the scroll journey begins.
 */
export const INTRO_SESSION_KEY = "hhl-intro-played";

/** Delay before the plate starts its 0→100% rise (ms) — the name reads first. */
export const REVEAL_DELAY_MS = 1000;
/** Duration of the plate's 0→100% loading rise (ms). */
export const REVEAL_DURATION_MS = 1100;
/** Once the plate is full: a new project photo every second, until scroll. */
export const FLASH_LOOP_MS = 1000;
/** Panel lift duration (s). */
export const PANEL_DURATION = 0.8;
/** Steady, architectural panel easing — accelerate gently, settle firmly. */
export const PANEL_EASE: [number, number, number, number] = [0.7, 0, 0.3, 1];

/** True if the intro will not play again in this session/environment. */
export function introAlreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
