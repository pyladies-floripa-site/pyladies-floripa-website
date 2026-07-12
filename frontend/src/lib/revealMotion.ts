/** Shared reveal animation tokens */
export const REVEAL_DURATION = 650

/** Second column in split layouts (text + image) */
export const REVEAL_COLUMN_DELAY = 80

/** Stagger step for grid/list children */
export const REVEAL_ITEM_STAGGER = 70

/** Hero second block on initial page load */
export const REVEAL_HERO_SECOND_DELAY = 100

export function revealItemDelay(index: number): number {
  return index * REVEAL_ITEM_STAGGER
}
