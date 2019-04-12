export function createInstance () {
  return jest.fn(() => {
    return Promise.resolve({})
  })
}

export default {
  createInstance
}
