import { useMemo, useState } from 'react'
import PageLayout from '../components/PageLayout'
import EventCard from '../components/EventCard'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import {
  filterEvents,
  getEventMonthOptions,
  getPastEvents,
  getUpcomingEvents,
  type EventPeriodFilter,
} from '../data/events'
import { useEvents } from '../lib/eventsStore'
import { usePageSeo } from '../lib/seo'
import { buildEventsListStructuredData } from '../lib/structuredData'
import { REVEAL_COLUMN_DELAY, revealItemDelay } from '../lib/revealMotion'
import styles from './EventsPage.module.css'

const periodOptions: { value: EventPeriodFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'upcoming', label: 'Próximos' },
  { value: 'past', label: 'Já realizados' },
]

export default function EventsPage() {
  const { events } = useEvents()
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState<EventPeriodFilter>('all')
  const [month, setMonth] = useState('')

  usePageSeo({
    title: 'Eventos e workshops',
    description:
      'Agenda de workshops, meetups e encontros da PyLadies Floripa em Florianópolis e online. Inscreva-se nos próximos eventos.',
    path: '/eventos',
  })

  const upcomingCount = getUpcomingEvents(events).length
  const pastCount = getPastEvents(events).length
  const monthOptions = useMemo(() => getEventMonthOptions(events), [events])

  const filteredEvents = useMemo(
    () => filterEvents(events, { query, period, month }),
    [events, query, period, month],
  )

  const structuredData = useMemo(() => buildEventsListStructuredData(events), [events])

  const hasActiveFilters = Boolean(query.trim() || period !== 'all' || month)

  const clearFilters = () => {
    setQuery('')
    setPeriod('all')
    setMonth('')
  }

  return (
    <PageLayout>
      <JsonLd id="events" data={structuredData} />
      <section className={styles.page}>
        <div className="container">
          <Reveal variant="up" immediate>
            <p className={styles.label}>Eventos</p>
            <h1 className={styles.title}>Agenda de eventos</h1>
            <p className={styles.subtitle}>
              Workshops, meetups e encontros em Florianópolis e online. Busque por
              nome, período ou mês.
            </p>

            <div className={styles.stats}>
              <span>
                {upcomingCount} {upcomingCount === 1 ? 'evento próximo' : 'eventos próximos'}
              </span>
              <span className={styles.statsDot}>•</span>
              <span>
                {pastCount} {pastCount === 1 ? 'já realizado' : 'já realizados'}
              </span>
            </div>
          </Reveal>

          <Reveal variant="up" delay={REVEAL_COLUMN_DELAY}>
            <div className={styles.toolbar}>
              <label className={styles.searchField}>
                <span className={styles.srOnly}>Buscar eventos</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por título, local ou tema..."
                  className={styles.searchInput}
                />
              </label>

              <div className={styles.filters}>
                <div className={styles.periodFilters} role="group" aria-label="Filtrar por período">
                  {periodOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.filterButton} ${
                        period === option.value ? styles.filterButtonActive : ''
                      }`}
                      aria-pressed={period === option.value}
                      onClick={() => setPeriod(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <label className={styles.monthField}>
                  <span className={styles.srOnly}>Filtrar por mês</span>
                  <select
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                    className={`${styles.monthSelect} ${month ? styles.monthSelectActive : ''}`}
                  >
                    <option value="">Todos os meses</option>
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                {hasActiveFilters ? (
                  <button type="button" className={styles.clearButton} onClick={clearFilters}>
                    Limpar filtros
                  </button>
                ) : null}
              </div>
            </div>
          </Reveal>

          {filteredEvents.length > 0 ? (
            <div className={styles.grid}>
              {filteredEvents.map((event, index) => (
                <Reveal key={event.id} variant="up" delay={revealItemDelay(index)}>
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
                <p className={styles.emptyTitle}>Nenhum evento corresponde à busca</p>
                <p className={styles.emptyText}>
                  Tente outro termo, escolha “Todos” no período ou limpe os filtros
                  para ver a agenda completa.
                </p>
                {hasActiveFilters ? (
                  <button type="button" className={styles.clearButton} onClick={clearFilters}>
                    Limpar filtros
                  </button>
                ) : null}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
