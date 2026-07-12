export interface Event {
  id: string
  title: string
  /** ISO date YYYY-MM-DD for sorting and filtering */
  startsAt: string
  /** Human-readable date shown in the UI */
  displayDate: string
  location: string
  image: string
  description: string
  signupUrl?: string
}

const todayIso = () => new Date().toISOString().slice(0, 10)

export const allEvents: Event[] = [
  {
    id: 'workshop-flask-jul-2026',
    title: 'Workshop Flask na Prática',
    startsAt: '2026-07-25',
    displayDate: '25 Jul 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-escritorio-9.jpg',
    description:
      'Oficina hands-on para construir uma API simples com Flask e publicar localmente.',
    signupUrl: 'https://example.com/inscricao-flask',
  },
  {
    id: 'meetup-carreira-ago-2026',
    title: 'Meetup Carreira em Tecnologia',
    startsAt: '2026-08-12',
    displayDate: '12 Ago 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-bleachers-selfie.jpg',
    description:
      'Roda de conversa sobre transição de carreira, currículo e entrevistas na área de tecnologia.',
    signupUrl: 'https://example.com/inscricao-carreira',
  },
  {
    id: 'pyladies-bar-set-2026',
    title: 'PyLadies Bar',
    startsAt: '2026-09-20',
    displayDate: '20 Set 2026',
    location: 'Centro, Florianópolis',
    image: '/photos/grupo-cafe-mesa.jpg',
    description:
      'Encontro descontraído para bater papo e se conhecer melhor.',
    signupUrl: 'https://example.com/inscricao-bar',
  },
  {
    id: 'escola-linux-out-2026',
    title: 'Escola PyLadies: Linux Básico',
    startsAt: '2026-10-18',
    displayDate: '18 Out 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-sala-branca-21.jpg',
    description:
      'Primeiro módulo da Escola PyLadies Floripa com fundamentos de terminal, arquivos e permissões.',
    signupUrl: 'https://example.com/inscricao-linux',
  },
  {
    id: 'workshop-pandas-jun-2026',
    title: 'Workshop: Análise de Dados com Pandas',
    startsAt: '2026-06-28',
    displayDate: '28 Jun 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-janelas-crianca.jpg',
    description:
      'Introdução à manipulação de dados com Pandas, do CSV à visualização básica.',
  },
  {
    id: 'meetup-git-jun-2026',
    title: 'Meetup: Git para Iniciantes',
    startsAt: '2026-06-05',
    displayDate: '5 Jun 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-sala-branca-20.jpg',
    description:
      'Comandos essenciais de Git e fluxo de trabalho em equipe para mulheres que estão começando.',
  },
  {
    id: 'festa-junina-jun-2026',
    title: 'Festa Junina da Comunidade',
    startsAt: '2026-05-10',
    displayDate: '10 Mai 2026',
    location: 'Florianópolis',
    image: '/photos/festa-junina.jpg',
    description:
      'Celebração junina com comidas típicas, música e integração entre integrantes do grupo.',
  },
  {
    id: 'pybook-abr-2026',
    title: 'PyBook: Clean Code',
    startsAt: '2026-04-20',
    displayDate: '20 Abr 2026',
    location: 'Online',
    image: '/photos/grupo-cafe-mesa.jpg',
    description:
      'Encontro do clube do livro com discussão de boas práticas e legibilidade em Python.',
  },
  {
    id: 'workshop-python-mar-2026',
    title: 'Workshop Introdução ao Python',
    startsAt: '2026-03-15',
    displayDate: '15 Mar 2026',
    location: 'Florianópolis',
    image: '/photos/grupo-sala-branca-kneel.jpg',
    description:
      'Primeiros passos em Python com exercícios guiados para mulheres iniciantes na programação.',
  },
  {
    id: 'meetup-externo-fev-2026',
    title: 'Encontro ao Ar Livre',
    startsAt: '2026-02-08',
    displayDate: '8 Fev 2026',
    location: 'Lagoa da Conceição',
    image: '/photos/grupo-externo-coelhinha.jpg',
    description:
      'Passeio e foto de grupo para integrar novas participantes e celebrar o início do ano.',
  },
]

export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const label = new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return label.replace('.', '')
}

export function createEventId(title: string, startsAt: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${slug}-${startsAt}`
}

export function isUpcomingEvent(event: Event, referenceDate = todayIso()): boolean {
  return event.startsAt >= referenceDate
}

export function getUpcomingEvents(
  events: Event[] = allEvents,
  referenceDate = todayIso(),
): Event[] {
  return events
    .filter((event) => isUpcomingEvent(event, referenceDate))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
}

export function getPastEvents(
  events: Event[] = allEvents,
  referenceDate = todayIso(),
): Event[] {
  return events
    .filter((event) => !isUpcomingEvent(event, referenceDate))
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt))
}

/** @deprecated Use getUpcomingEvents() */
export const upcomingEvents = getUpcomingEvents()

export type EventPeriodFilter = 'all' | 'upcoming' | 'past'

export function formatEventMonth(value: string): string {
  const [year, month] = value.split('-').map(Number)
  const label = new Date(year, month - 1, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function getEventMonthOptions(events: Event[]): { value: string; label: string }[] {
  const uniqueMonths = [...new Set(events.map((event) => event.startsAt.slice(0, 7)))]

  return uniqueMonths
    .sort((a, b) => b.localeCompare(a))
    .map((value) => ({
      value,
      label: formatEventMonth(value),
    }))
}

export type EventSortOption = 'recent' | 'alphabetical'

export function sortEvents(events: Event[], sortBy: EventSortOption): Event[] {
  const sorted = [...events]

  if (sortBy === 'alphabetical') {
    return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
  }

  return sorted.sort((a, b) => b.startsAt.localeCompare(a.startsAt))
}

export function filterEvents(
  events: Event[],
  {
    query = '',
    period = 'all',
    month = '',
    referenceDate = todayIso(),
  }: {
    query?: string
    period?: EventPeriodFilter
    month?: string
    referenceDate?: string
  },
): Event[] {
  const normalizedQuery = query.trim().toLowerCase()

  return events
    .filter((event) => {
      if (period === 'upcoming' && !isUpcomingEvent(event, referenceDate)) {
        return false
      }

      if (period === 'past' && isUpcomingEvent(event, referenceDate)) {
        return false
      }

      if (month && !event.startsAt.startsWith(month)) {
        return false
      }

      if (!normalizedQuery) return true

      const haystack = [
        event.title,
        event.location,
        event.description,
        event.displayDate,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
    .sort((a, b) => {
      const aUpcoming = isUpcomingEvent(a, referenceDate)
      const bUpcoming = isUpcomingEvent(b, referenceDate)

      if (aUpcoming !== bUpcoming) {
        return aUpcoming ? -1 : 1
      }

      return aUpcoming
        ? a.startsAt.localeCompare(b.startsAt)
        : b.startsAt.localeCompare(a.startsAt)
    })
}
