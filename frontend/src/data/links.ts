export const signupFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSfy1Ojw_amXBH5G0nLbF3AplMvpDtqy_z2lVG70SAaJcdJs-g/viewform'

export const speakerFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeKL4J6UC7O9-NMIMLAypHuPXuK0Idg4BWnFYXpHCVUaUfC-Q/viewform'

export const communityCtaLabel = 'Entrar na comunidade'

export interface SiteNavLink {
  label: string
  href: string
  external?: boolean
}

export const siteNavLinks: SiteNavLink[] = [
  { label: 'Sobre nós', href: '/sobre' },
  { label: 'Eventos', href: '/eventos' },
  {
    label: 'Quero palestrar',
    href: speakerFormUrl,
    external: true,
  },
]
