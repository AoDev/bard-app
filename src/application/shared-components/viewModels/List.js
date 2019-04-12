import * as mobx from 'mobx'
import _ from 'lodash'

const {computed, action, observable} = mobx

export default class List {
  @observable currentPage = 1
  @observable.ref items = []
  @observable itemsPerPage = 10
  @observable sortBy = ''
  @observable sortOrder = 'desc'
  @observable sortByFallback
  @observable.ref filters = {}

  @computed get filteredItems () {
    let items = this.items
    if (!_.isEmpty(this.filters)) {
      items = _.filter(items, this.filters)
    }
    if (this.sortBy) {
      items = _.orderBy(items, [(item) => item[this.sortBy] || this.sortByFallback], [this.sortOrder])
    }
    return items
  }

  @computed get itemCount () {
    return this.filteredItems.length
  }

  @computed get pageCount () {
    const rest = this.itemsCount % this.itemsPerPage
    let totalPages = (this.itemsCount - rest) / this.itemsPerPage
    if (rest > 0) {
      totalPages = totalPages + 1
    }
    return totalPages
  }

  @computed get paginatedItems () {
    const chained = _(this.filteredItems)
    const offset = (this.currentPage - 1) * this.itemsPerPage
    return chained
      .slice(offset, offset + this.itemsPerPage)
      .value()
  }

  @action.bound setItems (items) {
    this.items = items
    this.currentPage = 1
  }

  /**
   * Currently supports setting only one filter
   * Set value to undefined to remove filter
   * @param {String} prop - Property to filter
   * @param {String} value - Value expected
   */
  @action.bound setFilter (prop, value) {
    this.filters = _.isUndefined(value) ? {} : {[prop]: value}
    this.currentPage = 1 // we might be on page 5 and when new filter is set, we have only 3 pages
  }

  @action.bound sort (sortBy) {
    if (sortBy !== this.sortBy) {
      this.sortBy = sortBy
    }
    else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    }
  }

  @action.bound goToPage (newPage) {
    this.currentPage = newPage
  }

  @action.bound goToNextPage () {
    this.currentPage++
  }

  @action.bound goToPreviousPage () {
    this.currentPage--
  }

  /**
   * @param {*} options
   * @param {Array} options.items
   * @param {String} options.sortBy
   */
  constructor (options) {
    Object.assign(this, options)
  }
}
