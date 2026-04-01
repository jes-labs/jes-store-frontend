import axios from 'axios'

/**
 * Extract a human-readable error message from an Axios error or unknown error.
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (typeof data === 'string' && data.trim()) return data.trim()
    return data?.message ?? data?.detail ?? error.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}
