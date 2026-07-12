import type { Event } from '../data/events'
import { SITE_NAME, SITE_URL } from './site'

const ORGANIZATION = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
} as const

function isOnlineLocation(location: string) {
  return location.toLowerCase() === 'online'
}

export function buildEventStructuredData(event: Event) {
  const online = isOnlineLocation(event.location)

  return {
    '@type': 'Event',
    name: event.title,
    startDate: event.startsAt,
    description: event.description,
    image: event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    organizer: ORGANIZATION,
    location: online
      ? {
          '@type': 'VirtualLocation',
          url: SITE_URL,
        }
      : {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Florianópolis',
            addressRegion: 'SC',
            addressCountry: 'BR',
          },
        },
    ...(event.signupUrl ? { url: event.signupUrl } : {}),
  }
}

export function buildEventsListStructuredData(events: Event[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Eventos | ${SITE_NAME}`,
    url: `${SITE_URL}/eventos`,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildEventStructuredData(event),
    })),
  }
}

export function buildHomeStructuredData(description: string, socialUrls: string[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon-192.png`,
        description,
        sameAs: socialUrls,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Florianópolis',
          addressRegion: 'SC',
          addressCountry: 'BR',
        },
        areaServed: 'Florianópolis, SC',
        knowsAbout: ['Python', 'programação', 'diversidade na tecnologia'],
      },
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'pt-BR',
        description,
      },
    ],
  }
}

export function buildAboutStructuredData(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: `Sobre a ${SITE_NAME}`,
        url: `${SITE_URL}/sobre`,
        description,
        inLanguage: 'pt-BR',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntity: {
          ...ORGANIZATION,
          description,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sobre nós',
            item: `${SITE_URL}/sobre`,
          },
        ],
      },
    ],
  }
}
