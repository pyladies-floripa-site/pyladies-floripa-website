export const SITE_NAME = 'PyLadies Floripa'

/** Atualize em produção via VITE_SITE_URL no .env */
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://pyladiesfloripa.com.br'

export const DEFAULT_DESCRIPTION =
  'PyLadies Floripa: comunidade gratuita de mulheres em Python em Florianópolis. Workshops, meetups, mentorias e trilhas para mulheres iniciantes e para mulheres que querem entrar na área de tecnologia.'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/grupo-escritorio-9.jpg`
