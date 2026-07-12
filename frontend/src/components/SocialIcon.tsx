import type { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.75-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 4.2 3.55 11.1c-1.45.58-1.43 1.38-.25 1.74l4.56 1.42 1.74 5.3c.22.62.4.86.82.86.52 0 .75-.24 1.04-.52l2.5-2.42 5.2 3.83c.96.53 1.64.26 1.88-.9L22.9 5.7c.32-1.28-.48-1.86-1.3-1.5ZM9.7 13.3l9.55-6.02c.46-.29.88-.13.54.18l-7.8 7.1-.28 2.86-1.2-3.5-1.8-.62Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 7.2a2.8 2.8 0 0 0-1.97-1.98C17.74 4.8 12 4.8 12 4.8s-5.74 0-7.63.42A2.8 2.8 0 0 0 2.4 7.2 29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 1.97 1.98C6.26 19.2 12 19.2 12 19.2s5.74 0 7.63-.42a2.8 2.8 0 0 0 1.97-1.98A29.4 29.4 0 0 0 22 12a29.4 29.4 0 0 0-.4-4.8ZM10 15.5V8.5l5.5 3.5L10 15.5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5C3.88 3.5 3 4.39 3 5.5s.88 2 1.98 2 2-1.11 2-2-.9-2-2-2ZM3.5 8.75h2.98V21H3.5V8.75Zm7.25 0h2.86v1.67h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57V21h-2.98v-5.9c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.11V21h-2.98V8.75Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 4 6.74 8.96L4.2 20h2.45l5.18-5.7L15.4 20h5.6l-7.08-9.44L19.55 4h-2.45l-4.8 5.28L8.55 4H4Zm2.3 1.5h2.05l10.35 13.8H16.7L6.3 5.5Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2H13.5V9.1c0-.93.26-1.56 1.58-1.56h1.7V4.4c-.29 0-1.3-.13-2.47-.13-2.45 0-4.12 1.5-4.12 4.26V10.8H7.7v3.2h2.49V22h3.31Z" />
    </svg>
  ),
}

interface SocialIconProps {
  id: string
  className?: string
}

export default function SocialIcon({ id, className = '' }: SocialIconProps) {
  return <span className={className}>{icons[id]}</span>
}
