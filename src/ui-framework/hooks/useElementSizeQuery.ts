import {useRef, useState} from 'react'

// Types
export type Breakpoint = [number, string]
export type MediaQueries = {
  minWidth: Breakpoint[]
}

/**
 * Find the matching minWidth mediaQuery in a list of queries and returns the associated value.
 *
 * eg: [[200, 'sm'], [300, 'md'], [400, 'lg']] -> if width === 325 -> returns 'md'
 */
export function getMqValue(mqs: MediaQueries, width: number): string {
  if (!mqs.minWidth.length) {
    return ''
  }

  // Find the largest breakpoint that's smaller than or equal to the current width
  let result = ''
  for (const [breakpoint, value] of mqs.minWidth) {
    if (width >= breakpoint) {
      result = value
    } else {
      break
    }
  }
  return result
}

/**
 * Observes an element dimension and returns a matching query value when its size changes.
 */
export function useElementSizeQuery(
  mediaQueries: MediaQueries
): [{minWidth: string}, (element: HTMLElement | null) => void] {
  const elementRef = useRef<HTMLElement | null>(null)
  const [media, setMedia] = useState({minWidth: ''})
  const mediaRef = useRef({minWidth: ''})

  const observer = useRef(
    new ResizeObserver((entries) => {
      if (!entries[0]) {
        return
      }

      const width = entries[0].contentBoxSize?.[0]?.inlineSize ?? entries[0].contentRect.width

      const newWidthValue = getMqValue(mediaQueries, width)
      if (newWidthValue !== mediaRef.current.minWidth) {
        const update = {minWidth: newWidthValue}
        mediaRef.current = update
        setMedia(update)
      }
    })
  )

  function setRef(ref: HTMLElement | null) {
    if (ref !== elementRef.current) {
      if (elementRef.current) {
        observer.current.unobserve(elementRef.current)
      }
    }
    if (ref) {
      observer.current.observe(ref)
    }
    elementRef.current = ref
  }

  return [media, setRef]
}
