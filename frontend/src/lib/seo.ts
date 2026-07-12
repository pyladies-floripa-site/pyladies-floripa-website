import { useEffect } from 'react'
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site'

export interface PageSeoOptions {
  title: string
  description?: string
  path?: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article'
}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function usePageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
}: PageSeoOptions) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

    document.title = fullTitle
    upsertMeta('description', description)
    upsertMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow')
    upsertMeta('og:title', fullTitle, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:url', canonicalUrl, 'property')
    upsertMeta('og:type', ogType, 'property')
    upsertMeta('og:image', ogImage, 'property')
    upsertMeta('og:locale', 'pt_BR', 'property')
    upsertMeta('og:site_name', SITE_NAME, 'property')
    upsertMeta('twitter:card', 'summary_large_image')
    upsertMeta('twitter:title', fullTitle)
    upsertMeta('twitter:description', description)
    upsertMeta('twitter:image', ogImage)
    upsertLink('canonical', canonicalUrl)
  }, [title, description, path, noindex, ogImage, ogType])
}
