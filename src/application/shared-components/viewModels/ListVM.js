import * as mobx from 'mobx'
import _ from 'lodash'

const {computed, action, observable} = mobx

export default class List {
  currentPage = 1
  items = []
  itemsPerPage = 10
  sortBy = ''
  sortOrder = 'desc'
  sortByFallback
  filters = {}

  get filteredItems() {
    let items = this.items
    if (!_.isEmpty(this.filters)) {
      items = _.filter(items, this.filters)
    }
    if (this.sortBy) {
      items = _.orderBy(
        items,
        [(item) => item[this.sortBy] || this.sortByFallback],
        [this.sortOrder]
      )
    }
    return items
  }

  get itemCount() {
    return this.filteredItems.length
  }

  get pageCount() {
    const rest = this.itemsCount % this.itemsPerPage
    let totalPages = (this.itemsCount - rest) / this.itemsPerPage
    if (rest > 0) {
      totalPages = totalPages + 1
    }
    return totalPages
  }

  get paginatedItems() {
    const chained = _(this.filteredItems)
    const offset = (this.currentPage - 1) * this.itemsPerPage
    return chained.slice(offset, offset + this.itemsPerPage).value()
  }

  setItems(items) {
    this.items = items
    this.currentPage = 1
  }

  /**
   * Currently supports setting only one filter
   * Set value to undefined to remove filter
   * @param {String} prop - Property to filter
   * @param {String} value - Value expected
   */
  setFilter(prop, value) {
    this.filters = _.isUndefined(value) ? {} : {[prop]: value}
    this.currentPage = 1 // we might be on page 5 and when new filter is set, we have only 3 pages
  }

  sort(sortBy) {
    if (sortBy !== this.sortBy) {
      this.sortBy = sortBy
    } else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    }
  }

  goToPage(newPage) {
    this.currentPage = newPage
  }

  goToNextPage() {
    this.currentPage++
  }

  goToPreviousPage() {
    this.currentPage--
  }

  /**
   * @param {*} options
   * @param {Array} options.items
   * @param {String} options.sortBy
   */
  constructor(options) {
    mobx.makeObservable(this, {
      currentPage: observable,
      items: observable.ref,
      itemsPerPage: observable,
      sortBy: observable,
      sortOrder: observable,
      sortByFallback: observable,
      filters: observable.ref,
      filteredItems: computed,
      itemCount: computed,
      pageCount: computed,
      paginatedItems: computed,
      setItems: action.bound,
      setFilter: action.bound,
      sort: action.bound,
      goToPage: action.bound,
      goToNextPage: action.bound,
      goToPreviousPage: action.bound,
    })

    Object.assign(this, options)
  }
}
