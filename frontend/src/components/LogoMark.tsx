import styles from './LogoMark.module.css'

interface LogoMarkProps {
  size?: number
  className?: string
  contained?: boolean
}

export default function LogoMark({
  size = 48,
  className = '',
  contained = false,
}: LogoMarkProps) {
  return (
    <span
      className={`${styles.wrapper} ${contained ? styles.wrapperContained : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src="/assets/logo.png"
        alt=""
        className={contained ? styles.imageContained : styles.image}
      />
    </span>
  )
}
