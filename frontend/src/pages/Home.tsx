import { useMemo } from 'react'
import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'
import Events from '../components/Events'
import About from '../components/About'
import Activities from '../components/Activities'
import Impact from '../components/Impact'
import JsonLd from '../components/JsonLd'
import Partners from '../components/Partners'
import { usePageSeo } from '../lib/seo'
import { buildHomeStructuredData } from '../lib/structuredData'
import { DEFAULT_DESCRIPTION } from '../lib/site'
import { socialLinks } from '../data/socialLinks'

export default function Home() {
  usePageSeo({
    title: 'Comunidade de Python para mulheres em Florianópolis',
    description: DEFAULT_DESCRIPTION,
    path: '/',
  })

  const structuredData = useMemo(
    () => buildHomeStructuredData(
      DEFAULT_DESCRIPTION,
      socialLinks.map((link) => link.href),
    ),
    [],
  )

  return (
    <>
      <JsonLd id="home" data={structuredData} />
      <PageLayout withGlows>
        <Hero />
        <Events />
        <About />
        <Activities />
        <Impact />
        <Partners />
      </PageLayout>
    </>
  )
}
