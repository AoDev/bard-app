import type {AxiosError} from 'axios'

/**
 * Try to get the original error message from server.
 * @param error Error from an axios request
 */
export function normalizeResponseError(error: AxiosError) {
  if (error?.response?.data) {
    const errorData = error.response.data as {message?: string; errorCode?: string}
    if (errorData.message) {
      error.message = errorData.message
    }
    if (errorData.errorCode) {
      error.code = errorData.errorCode
    }
  }
  return Promise.reject(error)
}
