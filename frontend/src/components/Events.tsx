import { Link } from 'react-router-dom'
import { getUpcomingEvents } from '../data/events'
import { useEvents } from '../lib/eventsStore'
import EventCard from './EventCard'
import Button from './Button'
import Reveal from './Reveal'
import { communityCtaLabel, signupFormUrl } from '../data/links'
import { revealItemDelay } from '../lib/revealMotion'
import styles from './Events.module.css'

export default function Events() {
  const { events } = useEvents()
  const upcomingEvents = getUpcomingEvents(events).slice(0, 3)
  const hasEvents = upcomingEvents.length > 0

  return (
    <section className={`section ${styles.events}`} id="eventos">
      <div className="container">
        <Reveal variant="up">
          <div className={styles.header}>
            <h2 className={styles.title}>Próximos eventos</h2>
            <Link to="/eventos" className={styles.viewAll}>
              Ver todos os eventos
            </Link>
          </div>
        </Reveal>

        {hasEvents ? (
          <div className={styles.grid}>
            {upcomingEvents.map((event, eventIndex) => (
              <Reveal key={event.id} variant="up" delay={revealItemDelay(eventIndex)}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal variant="up">
            <div className={`${styles.empty} interactiveCard`}>
              <div className={styles.emptyIcon} aria-hidden="true">
                <img src="/assets/icon-events.svg" alt="" />
              </div>
              <p className={styles.emptyTitle}>Nenhum evento agendado no momento</p>
              <p className={styles.emptyText}>
                Estamos organizando novos encontros. Entre na lista da comunidade
                para receber os convites antes de todo mundo. Você também pode ver
                o que já aconteceu.
              </p>
              <div className={styles.emptyActions}>
                <Button href={signupFormUrl}>{communityCtaLabel}</Button>
                <Link to="/eventos" className={styles.viewAll}>
                  Ver eventos realizados
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
