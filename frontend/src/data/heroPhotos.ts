import { getStackImagesByIds } from './photos'

export interface HeroPhoto {
  src: string
  alt: string
}

export const heroPhotos: HeroPhoto[] = getStackImagesByIds([
  'grupo-bleachers-selfie',
  'grupo-escritorio-9',
  'grupo-sala-branca-21',
  'grupo-cafe-mesa',
  'festa-junina',
])
