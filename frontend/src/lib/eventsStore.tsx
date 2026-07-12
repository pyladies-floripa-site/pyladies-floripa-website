import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { allEvents as defaultEvents, type Event } from '../data/events'

const STORAGE_KEY = 'pyladies-floripa-events'

function loadStoredEvents(): Event[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return defaultEvents
    }

    const parsed = JSON.parse(raw) as Event[]

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultEvents
    }

    return parsed
  } catch {
    return defaultEvents
  }
}

function persistEvents(events: Event[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

interface EventsContextValue {
  events: Event[]
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: string) => void
}

const EventsContext = createContext<EventsContextValue | null>(null)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => loadStoredEvents())

  useEffect(() => {
    persistEvents(events)
  }, [events])

  const addEvent = useCallback((event: Event) => {
    setEvents((current) => [...current, event])
  }, [])

  const updateEvent = useCallback((event: Event) => {
    setEvents((current) =>
      current.map((item) => (item.id === event.id ? event : item)),
    )
  }, [])

  const deleteEvent = useCallback((id: string) => {
    setEvents((current) => current.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      events,
      addEvent,
      updateEvent,
      deleteEvent,
    }),
    [events, addEvent, updateEvent, deleteEvent],
  )

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const context = useContext(EventsContext)

  if (!context) {
    throw new Error('useEvents must be used within EventsProvider')
  }

  return context
}
