import DraggableImageStack from './DraggableImageStack'
import { aboutTimelinePhotos } from '../data/aboutTimelinePhotos'

export default function AboutTimelineStack() {
  return (
    <DraggableImageStack
      images={aboutTimelinePhotos}
      size="timeline"
      interactive={false}
      ariaLabel="Fotos da trajetória da PyLadies Floripa."
    />
  )
}
