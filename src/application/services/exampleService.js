class Counter {
  count = 0

  increment() {
    this.count++
    return this.count
  }

  decrement() {
    this.count--
    return this.count
  }
}

export default new Counter()
