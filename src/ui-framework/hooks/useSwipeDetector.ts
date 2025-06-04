import {useCallback, useEffect, useRef} from 'react'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'

interface SwipeOptions {
  onSwipe: (direction: SwipeDirection) => void
  distanceThreshold?: number
  timeThreshold?: number
}

const isTouchDevice = 'ontouchstart' in window

export const useSwipeDetector = ({
  onSwipe,
  distanceThreshold = 50,
  timeThreshold = 200,
}: SwipeOptions) => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) {
      return
    }
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    touchStartTime.current = Date.now()
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const changedTouch = e.changedTouches[0]
      if (changedTouch) {
        const deltaX = changedTouch.clientX - touchStartX.current
        const deltaY = changedTouch.clientY - touchStartY.current

        if (
          (Math.abs(deltaX) > distanceThreshold || Math.abs(deltaY) > distanceThreshold) &&
          Date.now() - touchStartTime.current < timeThreshold
        ) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            onSwipe(deltaX > 0 ? 'right' : 'left')
          } else {
            onSwipe(deltaY > 0 ? 'down' : 'up')
          }
        }
      }
      touchStartX.current = 0
      touchStartY.current = 0
      touchStartTime.current = 0
    },
    [distanceThreshold, timeThreshold, onSwipe]
  )

  useEffect(() => {
    if (isTouchDevice) {
      const target = document

      target.addEventListener('touchstart', handleTouchStart)
      target.addEventListener('touchend', handleTouchEnd)

      return () => {
        target.removeEventListener('touchstart', handleTouchStart)
        target.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [handleTouchStart, handleTouchEnd])
}
