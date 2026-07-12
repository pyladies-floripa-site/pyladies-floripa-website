import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { REVEAL_DURATION } from '../lib/revealMotion'
import styles from './Reveal.module.css'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'

interface RevealProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  immediate?: boolean
  as?: 'div' | 'section' | 'article' | 'li'
}

export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration = REVEAL_DURATION,
  immediate = false,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(immediate)

  useEffect(() => {
    if (immediate) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [immediate])

  const motionStyle = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
  } as CSSProperties

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${styles[variant]} ${visible ? styles.visible : ''} ${className}`}
      style={motionStyle}
    >
      {children}
    </Tag>
  )
}
