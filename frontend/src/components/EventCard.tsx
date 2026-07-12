import type { Event } from '../data/events'
import { isUpcomingEvent } from '../data/events'
import { sanitizeHttpUrl } from '../lib/safeUrl'
import styles from './EventCard.module.css'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const upcoming = isUpcomingEvent(event)
  const signupUrl = sanitizeHttpUrl(upcoming ? event.signupUrl : undefined)
  const isClickable = Boolean(signupUrl)
  const imageAlt = `${event.title}, ${event.displayDate}, ${event.location}`

  const content = (
    <>
      <div className={styles.imageWrapper}>
        <img src={event.image} alt={imageAlt} className={styles.image} loading="lazy" decoding="async" />
        <span
          className={`${styles.badge} ${upcoming ? styles.badgeUpcoming : styles.badgePast}`}
        >
          {upcoming ? 'Em breve' : 'Encerrado'}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{event.displayDate}</span>
          <span className={styles.dot}>•</span>
          <span>{event.location}</span>
        </div>

        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.description}>{event.description}</p>

        {isClickable ? <span className={styles.signup}>Fazer inscrição</span> : null}
      </div>
    </>
  )

  if (isClickable && signupUrl) {
    return (
      <a
        href={signupUrl}
        className={`${styles.card} ${styles.cardLink}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Fazer inscrição em ${event.title} (abre em nova aba)`}
      >
        {content}
      </a>
    )
  }

  return <article className={styles.card}>{content}</article>
}
