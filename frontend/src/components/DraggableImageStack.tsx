import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DRAG_START_PX,
  frontDragTransform,
  getStackPosition,
  STACK_LAYERS,
  SWIPE_THRESHOLD_PX,
  TAP_THRESHOLD_PX,
  VISIBLE_STACK_DEPTH,
  type StackImage,
} from '../lib/imageStack'
import styles from './DraggableImageStack.module.css'

interface DraggableImageStackProps {
  images: StackImage[]
  size?: 'hero' | 'timeline'
  showHint?: boolean
  interactive?: boolean
  maxVisible?: number
  ariaLabel?: string
}

type DragState = {
  pointerId: number
  startX: number
  startY: number
  moved: boolean
}

export default function DraggableImageStack({
  images,
  size = 'timeline',
  showHint = false,
  interactive = true,
  maxVisible = VISIBLE_STACK_DEPTH,
  ariaLabel = 'Pilha de fotos. Deslize ou clique para ver mais fotos.',
}: DraggableImageStackProps) {
  const uniqueImages = useMemo(
    () =>
      images.filter((image, index, list) => {
        const firstIndex = list.findIndex((item) => item.src === image.src)
        return firstIndex === index
      }),
    [images],
  )

  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const rafRef = useRef<number | null>(null)
  const pendingOffsetRef = useRef({ x: 0, y: 0 })

  const total = uniqueImages.length

  const clearDragVisual = useCallback(() => {
    dragRef.current = null
    setIsDragging(false)
    pendingOffsetRef.current = { x: 0, y: 0 }
    setDragOffset({ x: 0, y: 0 })

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const scheduleDragUpdate = useCallback((x: number, y: number) => {
    pendingOffsetRef.current = { x, y }

    if (rafRef.current !== null) return

    rafRef.current = window.requestAnimationFrame(() => {
      setDragOffset(pendingOffsetRef.current)
      rafRef.current = null
    })
  }, [])

  const finishDrag = useCallback(
    (clientX: number, clientY: number) => {
      const drag = dragRef.current
      if (!drag) return

      const dx = clientX - drag.startX
      const dy = clientY - drag.startY
      const distance = Math.hypot(dx, dy)
      const isTap = !drag.moved || distance <= TAP_THRESHOLD_PX
      const isHorizontalSwipe =
        Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy) * 0.75

      clearDragVisual()

      if (isTap || isHorizontalSwipe) {
        setIndex((current) => (current + 1) % total)
      }
    },
    [clearDragVisual, total],
  )

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      const x = event.clientX - drag.startX
      const y = event.clientY - drag.startY
      const distance = Math.hypot(x, y)

      if (!drag.moved && distance >= DRAG_START_PX) {
        drag.moved = true
        setIsDragging(true)
      }

      if (drag.moved) {
        event.preventDefault()
        scheduleDragUpdate(x, y)
      }
    }

    const onPointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      event.preventDefault()

      const root = rootRef.current
      if (root?.hasPointerCapture(event.pointerId)) {
        try {
          root.releasePointerCapture(event.pointerId)
        } catch {
          /* already released */
        }
      }

      finishDrag(event.clientX, event.clientY)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerEnd, { passive: false })
    window.addEventListener('pointercancel', onPointerEnd, { passive: false })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      clearDragVisual()
    }
  }, [clearDragVisual, finishDrag, scheduleDragUpdate])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || event.button !== 0 || total === 0) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    }

    event.preventDefault()
    rootRef.current?.setPointerCapture(event.pointerId)
  }

  const advance = useCallback(() => {
    if (total === 0) return
    setIndex((current) => (current + 1) % total)
    clearDragVisual()
  }, [clearDragVisual, total])

  const goBack = useCallback(() => {
    if (total === 0) return
    setIndex((current) => (current - 1 + total) % total)
    clearDragVisual()
  }, [clearDragVisual, total])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      advance()
      return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      advance()
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      goBack()
    }
  }

  if (total === 0) return null

  const stackClassName = [
    styles.stack,
    styles[size],
    interactive ? '' : styles.stackStatic,
    isDragging ? styles.stackDragging : '',
  ]
    .filter(Boolean)
    .join(' ')

  const frontImage = uniqueImages[index]

  return (
    <div
      ref={rootRef}
      className={stackClassName}
      data-photo-stack={interactive ? 'interactive' : 'static'}
      role={interactive ? 'region' : 'group'}
      aria-roledescription={interactive ? 'carrossel' : undefined}
      aria-label={ariaLabel}
      tabIndex={interactive ? 0 : undefined}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
    >
      {interactive ? (
        <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
          Foto {index + 1} de {total}. Use arrastar, toque, Enter ou as setas para navegar.
        </p>
      ) : null}

      {uniqueImages.map((image, imageIndex) => {
        const stackPosition = getStackPosition(imageIndex, index, total)

        if (stackPosition >= maxVisible) {
          return null
        }

        const layer = STACK_LAYERS[Math.min(stackPosition, STACK_LAYERS.length - 1)]
        const isFront = stackPosition === 0

        let transform: string = layer.transform

        if (isFront && (isDragging || dragOffset.x !== 0 || dragOffset.y !== 0)) {
          transform = frontDragTransform(dragOffset.x, dragOffset.y)
        }

        const cardClassName = [
          styles.card,
          isFront ? styles.cardFront : '',
          isFront && isDragging ? styles.cardDragging : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div
            key={image.src}
            className={cardClassName}
            style={{ zIndex: layer.zIndex, transform }}
            aria-hidden={!isFront}
          >
            <img
              src={image.src}
              alt={isFront ? image.alt : ''}
              className={styles.image}
              draggable={false}
              loading={isFront ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        )
      })}

      {showHint && interactive ? (
        <p className={styles.hint}>Deslize ou clique para ver mais fotos</p>
      ) : null}

      <span className={styles.srOnly}>Foto atual: {frontImage.alt}</span>
    </div>
  )
}
