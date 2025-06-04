import {useCallback} from 'react'

/**
 * eg usage: avoid virtual keyboard covering the form on mobiles
 *
 ```tsx
  const titleRef = useRef<HTMLHeadingElement>(null)
  const scrollFormToTop = useScrollOnFocus(titleRef)
  …
  <h3 ref={titleRef}>My stuff</h3>
  <input onFocus={scrollFormToTop} />
 ```
 */
export function useScrollOnFocus(ref: React.RefObject<HTMLElement | null>) {
  const handleFocus = useCallback(() => {
    const el = ref?.current
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({behavior: 'smooth'})
      }, 125)
    }
  }, [ref])

  return handleFocus
}
