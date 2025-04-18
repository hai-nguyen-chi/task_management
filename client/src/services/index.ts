import axios from 'axios'

const configHeaders = () => {
  return {
    Authorization: `Bearer ${window.localStorage.getItem('access_token') || ''}`,
    TimeZone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`
  }
}

const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export { configHeaders, apiService }
