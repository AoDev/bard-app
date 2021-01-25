import collectionUtils from './collectionUtils'

const {
  findClosest,
  findClosestProp,
  findMinMaxBy,
  distinctByProp,
  distinctByPropRight,
} = collectionUtils

describe('collectionUtils', () => {
  describe('distinctByProp()', () => {
    it('should work when array is empty', () => {
      expect(distinctByProp([], 'someProp')).toEqual([])
    })

    describe('max argument', () => {
      it('should return all distinct if max is not provided', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
          {someProp: 'c'},
          {someProp: 'd'},
          {someProp: 'e'},
        ]
        expect(distinctByProp(mock, 'someProp')).toEqual([
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
          {someProp: 'd'},
          {someProp: 'e'},
        ])
      })

      it('should return a limited result to max, when provided', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
          {someProp: 'c'},
          {someProp: 'd'},
          {someProp: 'e'},
        ]
        expect(distinctByProp(mock, 'someProp', 3)).toEqual([
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
        ])
      })

      it('should return a result even when distinct < max', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'b'},
          {someProp: 'b'},
          {someProp: 'b'},
        ]
        expect(distinctByProp(mock, 'someProp', 5)).toEqual([{someProp: 'a'}, {someProp: 'b'}])
      })
    })
  })

  describe('distinctByPropRight()', () => {
    it('should work when array is empty', () => {
      expect(distinctByPropRight([], 'someProp')).toEqual([])
    })

    describe('max argument', () => {
      it('should return all distinct if max is not provided', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
          {someProp: 'c'},
          {someProp: 'd'},
          {someProp: 'e'},
        ]
        expect(distinctByPropRight(mock, 'someProp')).toEqual([
          {someProp: 'e'},
          {someProp: 'd'},
          {someProp: 'c'},
          {someProp: 'b'},
          {someProp: 'a'},
        ])
      })

      it('should return a limited result to max, when provided', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'c'},
          {someProp: 'c'},
          {someProp: 'd'},
          {someProp: 'e'},
        ]
        expect(distinctByPropRight(mock, 'someProp', 3)).toEqual([
          {someProp: 'e'},
          {someProp: 'd'},
          {someProp: 'c'},
        ])
      })

      it('should return a result even when distinct < max', () => {
        const mock = [
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'a'},
          {someProp: 'b'},
          {someProp: 'b'},
          {someProp: 'b'},
          {someProp: 'b'},
        ]
        expect(distinctByPropRight(mock, 'someProp', 5)).toEqual([{someProp: 'b'}, {someProp: 'a'}])
      })
    })
  })

  describe('findClosest()', () => {
    it('should find the closest value in an array', () => {
      const values = [10, 0, 12, 24, 30]
      expect(findClosest(values, 9)).toBe(10)
      expect(findClosest(values, 10)).toBe(10)
      expect(findClosest(values, 11)).toBe(10)
      expect(findClosest(values, 0)).toBe(0)
      expect(findClosest(values, 30)).toBe(30)
    })
  })

  describe('findClosestProp()', () => {
    it('should find the closest value in an array', () => {
      const values = [10, 0, 12, 24, 30].map((value) => ({x: value}))
      expect(findClosestProp(values, 9, 'x')).toEqual({x: 10})
      expect(findClosestProp(values, 10, 'x')).toEqual({x: 10})
      expect(findClosestProp(values, 11, 'x')).toEqual({x: 10})
      expect(findClosestProp(values, 0, 'x')).toEqual({x: 0})
      expect(findClosestProp(values, 30, 'x')).toEqual({x: 30})
    })

    it.skip('should do something if props does not exist', () => {
      // TODO: validate what should we do when the data has some issue
      // const values = [0, 10, 12, 24, 30].map((value) => ({x: value}))
      // expect(findClosestProp(values, 9, 'y')).toBe(undefined)
    })
  })

  describe('findMinMaxBy', () => {
    it('should find the min and max value in a collection', () => {
      const values = [1000, 10, 12, -5, 30].map((value) => ({x: value}))
      expect(findMinMaxBy(values, 'x')).toEqual([-5, 1000])
    })

    it('should return the same value if there is only one item', () => {
      const values = [1].map((value) => ({x: value}))
      expect(findMinMaxBy(values, 'x')).toEqual([1, 1])
    })

    it('should return "undefined" if the collection is empty', () => {
      expect(findMinMaxBy([], 'x')).toBeUndefined()
    })
  })

  describe('orderByNumber', () => {
    it('should order an array given a property', () => {
      const collection = [
        {id: 1, value: 10},
        {id: 2, value: -5},
        {id: 5, value: 5},
      ]

      const expected = [
        {id: 2, value: -5},
        {id: 5, value: 5},
        {id: 1, value: 10},
      ]

      expect(collectionUtils.orderByNumber(collection, 'value', 'asc')).toEqual(expected)
    })

    it('should use -Infinity as fallback if an item has the property undefined', () => {
      const collection = [{id: 1, value: 10}, {id: 2}, {id: 5, value: 5}]

      const expected = [{id: 1, value: 10}, {id: 5, value: 5}, {id: 2}]

      expect(collectionUtils.orderByNumber(collection, 'value', 'desc')).toEqual(expected)
    })
  })

  describe('composeFilters()', () => {
    it('should filter', () => {
      const someArray = [
        {side: 'buy', amount: 1000},
        {side: 'buy', amount: 2000},
        {side: 'sell', amount: 1000},
      ]

      const filterBuy = (item) => item.side === 'buy'
      const filterAmount = (item) => item.amount > 1000
      const composedFilters = collectionUtils.composeFilters([filterBuy, filterAmount])
      const result = someArray.filter(composedFilters)
      expect(result).toHaveLength(1)
      expect(result).toEqual([{side: 'buy', amount: 2000}])
    })
  })
})
