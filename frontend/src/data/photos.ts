export type PhotoCategory = 'hero' | 'about' | 'events' | 'community' | 'general'

export interface CommunityPhoto {
  id: string
  file: string
  alt: string
  description: string
  suggestedUse: PhotoCategory[]
  tags: string[]
}

/**
 * Fotos da comunidade PyLadies Floripa.
 * Coloque os arquivos em frontend/public/photos/ com os nomes abaixo.
 */
export const communityPhotos: CommunityPhoto[] = [
  {
    id: 'grupo-sala-branca-20',
    file: '/photos/grupo-sala-branca-20.jpg',
    alt: 'Grupo de mulheres da PyLadies Floripa em sala branca',
    description: 'Cerca de 20 mulheres posando em sala clara com piso claro.',
    suggestedUse: ['hero', 'about', 'general'],
    tags: ['grupo', 'indoor', 'formal'],
  },
  {
    id: 'grupo-janelas-crianca',
    file: '/photos/grupo-janelas-crianca.jpg',
    alt: 'Comunidade PyLadies Floripa reunida em sala com janelas',
    description: 'Grupo de cerca de 27 mulheres e uma criança, piso amadeirado e cortinas.',
    suggestedUse: ['hero', 'about', 'community'],
    tags: ['grupo', 'indoor', 'familia'],
  },
  {
    id: 'grupo-sala-branca-21',
    file: '/photos/grupo-sala-branca-21.jpg',
    alt: 'Mulheres da PyLadies Floripa em formação de grupo',
    description: 'Cerca de 21 mulheres em duas fileiras, algumas agachadas na frente.',
    suggestedUse: ['about', 'community', 'general'],
    tags: ['grupo', 'indoor'],
  },
  {
    id: 'grupo-cafe-mesa',
    file: '/photos/grupo-cafe-mesa.jpg',
    alt: 'Encontro da PyLadies Floripa em café com mesa redonda',
    description: 'Cerca de 15 mulheres ao redor de mesa redonda, ambiente colorido com parede verde.',
    suggestedUse: ['events', 'community'],
    tags: ['grupo', 'indoor', 'social', 'pybook'],
  },
  {
    id: 'grupo-escritorio-9',
    file: '/photos/grupo-escritorio-9.jpg',
    alt: 'Nove mulheres da PyLadies Floripa em escritório',
    description: 'Nove mulheres em escritório, uma com camiseta "Tecnologia para o Humano".',
    suggestedUse: ['about', 'events', 'community'],
    tags: ['grupo', 'indoor', 'workshop'],
  },
  {
    id: 'grupo-externo-coelhinha',
    file: '/photos/grupo-externo-coelhinha.jpg',
    alt: 'Grupo grande da PyLadies Floripa em área externa',
    description: 'Cerca de 35 mulheres ao ar livre, algumas com orelhas de coelho.',
    suggestedUse: ['events', 'community'],
    tags: ['grupo', 'outdoor', 'evento'],
  },
  {
    id: 'grupo-bleachers-selfie',
    file: '/photos/grupo-bleachers-selfie.jpg',
    alt: 'Selfie do grupo PyLadies Floripa em assentos escalonados',
    description: 'Cerca de 25 a 30 mulheres em assentos de madeira em espaço moderno.',
    suggestedUse: ['hero', 'community', 'general'],
    tags: ['grupo', 'indoor', 'selfie'],
  },
  {
    id: 'grupo-escultura-externo',
    file: '/photos/grupo-escultura-externo.jpg',
    alt: 'Grupo da PyLadies Floripa em frente a escultura de madeira',
    description: '11 pessoas posando ao ar livre com arquitetura moderna ao fundo.',
    suggestedUse: ['about', 'events'],
    tags: ['grupo', 'outdoor'],
  },
  {
    id: 'festa-junina',
    file: '/photos/festa-junina.jpg',
    alt: 'Celebração de Festa Junina da PyLadies Floripa',
    description: 'Cerca de 20 mulheres em festa junina com bandeirinhas e toalha xadrez.',
    suggestedUse: ['events', 'community'],
    tags: ['grupo', 'indoor', 'festa', 'social'],
  },
  {
    id: 'grupo-sala-branca-kneel',
    file: '/photos/grupo-sala-branca-kneel.jpg',
    alt: 'Comunidade PyLadies Floripa reunida em sala ampla',
    description: 'Cerca de 21 mulheres sorrindo, algumas ajoelhadas na frente, sala minimalista.',
    suggestedUse: ['hero', 'about', 'general'],
    tags: ['grupo', 'indoor'],
  },
]

export function getPhotosByUse(category: PhotoCategory): CommunityPhoto[] {
  return communityPhotos.filter((photo) => photo.suggestedUse.includes(category))
}

export function getPhotoById(id: string): CommunityPhoto | undefined {
  return communityPhotos.find((photo) => photo.id === id)
}

export function toStackImages(
  photos: CommunityPhoto[],
): { src: string; alt: string }[] {
  return photos.map((photo) => ({
    src: photo.file,
    alt: photo.alt,
  }))
}

export function getStackImagesByIds(ids: string[]): { src: string; alt: string }[] {
  return ids
    .map((id) => getPhotoById(id))
    .filter((photo): photo is CommunityPhoto => Boolean(photo))
    .map((photo) => ({ src: photo.file, alt: photo.alt }))
}
