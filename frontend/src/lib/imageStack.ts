export interface StackImage {
  src: string
  alt: string
}

export const VISIBLE_STACK_DEPTH = 5

export const STACK_LAYERS = [
  { zIndex: 5, transform: 'none' },
  {
    zIndex: 4,
    transform: 'translateX(20px) translateY(-12px) scale(0.95) rotate(2.75deg)',
  },
  {
    zIndex: 3,
    transform: 'translateX(40px) translateY(-24px) scale(0.9) rotate(5.5deg)',
  },
  {
    zIndex: 2,
    transform: 'translateX(60px) translateY(-36px) scale(0.85) rotate(8.25deg)',
  },
  {
    zIndex: 1,
    transform: 'translateX(80px) translateY(-48px) scale(0.8) rotate(11deg)',
  },
] as const

export const DRAG_START_PX = 4
export const TAP_THRESHOLD_PX = 10
export const SWIPE_THRESHOLD_PX = 28
export const DRAG_ROTATION = 0.04

export function getStackPosition(
  imageIndex: number,
  frontIndex: number,
  total: number,
): number {
  return (imageIndex - frontIndex + total) % total
}

export function frontDragTransform(x: number, y: number): string {
  const rotate = x * DRAG_ROTATION
  return `translate(${x}px, ${y}px) rotate(${rotate}deg)`
}
