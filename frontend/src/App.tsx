import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import PortalPage from './pages/PortalPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ScrollToTop'
import { EventsProvider } from './lib/eventsStore'

function App() {
  useEffect(() => {
    const preventImageDrag = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault()
      }
    }

    document.addEventListener('dragstart', preventImageDrag)
    return () => document.removeEventListener('dragstart', preventImageDrag)
  }, [])

  return (
    <EventsProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </EventsProvider>
  )
}

export default App
