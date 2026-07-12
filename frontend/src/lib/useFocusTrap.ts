import { useEffect, type RefObject } from 'react'

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  useEffect(() => {
    if (!active || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const previousFocus = document.activeElement as HTMLElement | null

    const getFocusableElements = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'))

    const focusable = getFocusableElements()
    focusable[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape?.()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const elements = getFocusableElements()

      if (elements.length === 0) {
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [active, containerRef, onEscape])
}
