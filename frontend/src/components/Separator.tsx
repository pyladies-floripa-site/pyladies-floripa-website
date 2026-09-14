import styles from './Separator.module.css'

interface SeparatorProps {
  className?: string
}

export default function Separator({ className = '' }: SeparatorProps) {
  return (
    <div className={`${styles.dotSeparator} ${className}`} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={`${styles.dot} ${styles.active}`} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  )
}