import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'teal' | 'orange'
type ButtonSize = 'default' | 'large'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'teal',
  size = 'default',
  href,
  className = '',
  onClick,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    size === 'large' ? styles.large : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const isExternal = href.startsWith('http')

    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
