declare const XMLHttpRequest: any

import {type AxiosAdapter, type InternalAxiosRequestConfig, getAdapter} from 'axios'
import {RateLimitPromiseQueue} from '../async/RateLimitPromiseQueue'

/**
 * If the browser has an XMLHttpRequest object, use the XHR adapter, otherwise use the HTTP
 * adapter
 * https://github.com/axios/axios/blob/649d739288c8e2c55829ac60e2345a0f3439c730/lib/defaults/index.js#L22
 */
function getDefaultAdapter() {
  return typeof XMLHttpRequest !== 'undefined' ? getAdapter('xhr') : getAdapter('http')
}

/**
 * Add rate limit management on an axios instance.
 *
 * Example:
 ```
  const _axios = require('axios')
  const axios = _axios.create({
    baseURL,
    adapter: createRateLimitAdapter({minTimeBetweenRequests: 5000})
  })
```
 * @param options {minTimeBetweenRequests: 5000}
 */
export function createRateLimitAdapter(options: {
  minTimeBetweenRequests?: number
}): AxiosAdapter {
  const minTimeBetweenTasks = options.minTimeBetweenRequests || 0
  const requestQueue = new RateLimitPromiseQueue({minTimeBetweenTasks})
  const adapter = getDefaultAdapter()

  return (config: InternalAxiosRequestConfig) => requestQueue.add(() => adapter(config))
}
