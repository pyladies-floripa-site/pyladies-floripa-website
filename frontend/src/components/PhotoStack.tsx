import DraggableImageStack from './DraggableImageStack'
import type { StackImage } from '../lib/imageStack'

export type StackPhoto = StackImage

interface PhotoStackProps {
  photos: StackPhoto[]
}

export default function PhotoStack({ photos }: PhotoStackProps) {
  const heroPhotos = photos.slice(0, 5)

  return (
    <DraggableImageStack
      images={heroPhotos}
      size="hero"
      interactive
      showHint
      maxVisible={5}
      ariaLabel="Galeria de fotos da comunidade. Deslize ou clique para ver mais fotos."
    />
  )
}
