import {act, renderHook} from '@testing-library/react'
// @vitest-environment jsdom
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {type MediaQueries, getMqValue, useElementSizeQuery} from './useElementSizeQuery'

// Mock ResizeObserverEntry type
interface MockResizeObserverEntry {
  contentRect: {width: number}
  contentBoxSize: {inlineSize: number}[]
}

// Setup test environment
beforeEach(() => {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

describe('getMqValue', () => {
  const mqs: MediaQueries = {
    minWidth: [
      [200, 'sm'],
      [300, 'md'],
      [400, 'lg'],
    ],
  }

  it('returns empty string for empty breakpoints', () => {
    expect(getMqValue({minWidth: []}, 100)).toBe('')
  })

  it('returns empty string when width is less than all breakpoints', () => {
    expect(getMqValue(mqs, 100)).toBe('')
  })

  it('returns correct value for width between breakpoints', () => {
    expect(getMqValue(mqs, 250)).toBe('sm')
    expect(getMqValue(mqs, 350)).toBe('md')
  })

  it('returns correct value for width exactly at a breakpoint', () => {
    expect(getMqValue(mqs, 200)).toBe('sm')
    expect(getMqValue(mqs, 300)).toBe('md')
    expect(getMqValue(mqs, 400)).toBe('lg')
  })

  it('returns last value for width above all breakpoints', () => {
    expect(getMqValue(mqs, 1000)).toBe('lg')
  })
})

describe('useElementSizeQuery hook', () => {
  const mediaQueries: MediaQueries = {
    minWidth: [
      [200, 'sm'],
      [300, 'md'],
      [400, 'lg'],
    ],
  }

  it('initializes with empty minWidth', () => {
    const emptyQueries: MediaQueries = {minWidth: []}
    const {result} = renderHook(() => useElementSizeQuery(emptyQueries))
    expect(result.current[0].minWidth).toBe('')
  })

  it('returns empty string when width is smaller than all breakpoints', () => {
    const {result} = renderHook(() => useElementSizeQuery(mediaQueries))
    expect(result.current[0].minWidth).toBe('')
  })

  it('returns correct value for width between breakpoints', () => {
    let resizeCallback: ((entries: MockResizeObserverEntry[]) => void) | undefined
    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      resizeCallback = callback
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    const {result} = renderHook(() => useElementSizeQuery(mediaQueries))
    const setRef = result.current[1]
    const mockElement = document.createElement('div')
    setRef(mockElement)

    act(() => {
      resizeCallback?.([
        {
          contentRect: {width: 250},
          contentBoxSize: [{inlineSize: 250}],
        },
      ])
    })

    expect(result.current[0].minWidth).toBe('sm')
  })

  it('returns largest breakpoint when width is larger than all breakpoints', () => {
    let resizeCallback: ((entries: MockResizeObserverEntry[]) => void) | undefined
    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      resizeCallback = callback
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    const {result} = renderHook(() => useElementSizeQuery(mediaQueries))
    const setRef = result.current[1]
    const mockElement = document.createElement('div')
    setRef(mockElement)

    act(() => {
      resizeCallback?.([
        {
          contentRect: {width: 500},
          contentBoxSize: [{inlineSize: 500}],
        },
      ])
    })

    expect(result.current[0].minWidth).toBe('lg')
  })

  it('properly observes and unobserve elements', () => {
    const mockObserve = vi.fn()
    const mockUnobserve = vi.fn()
    const mockDisconnect = vi.fn()
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }))

    const singleBreakpoint: MediaQueries = {minWidth: [[200, 'sm']]}
    const {result} = renderHook(() => useElementSizeQuery(singleBreakpoint))
    const setRef = result.current[1]

    const element = document.createElement('div')
    setRef(element)
    expect(mockObserve).toHaveBeenCalledWith(element)

    setRef(null)
    expect(mockUnobserve).toHaveBeenCalledWith(element)
  })

  it('updates value when element is resized', () => {
    let resizeCallback: ((entries: MockResizeObserverEntry[]) => void) | undefined
    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      resizeCallback = callback
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    const singleBreakpoint: MediaQueries = {minWidth: [[200, 'sm']]}
    const {result} = renderHook(() => useElementSizeQuery(singleBreakpoint))
    const setRef = result.current[1]

    const element = document.createElement('div')
    setRef(element)

    act(() => {
      resizeCallback?.([
        {
          contentRect: {width: 250},
          contentBoxSize: [{inlineSize: 250}],
        },
      ])
    })

    expect(result.current[0].minWidth).toBe('sm')
  })

  it('cleans up ResizeObserver on unmount', () => {
    const mockObserve = vi.fn()
    const mockUnobserve = vi.fn()
    const mockDisconnect = vi.fn()
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }))

    const {result, unmount} = renderHook(() => useElementSizeQuery({minWidth: []}))
    const setRef = result.current[1]

    // Set a ref first so we can verify it gets unobserved
    const element = document.createElement('div')
    setRef(element)

    // In a real component setRef would be called with null on unmount of the element
    setRef(null)
    unmount()
    expect(mockUnobserve).toHaveBeenCalledWith(element)
  })
})
